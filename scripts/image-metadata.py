"""Refresh dimensions of public catalogue images without changing the images.

Run with Python 3 and curl. Only reads public API/image URLs; no credentials.
Dimensions reserve the original layout while off-screen images load lazily.
"""
import concurrent.futures
import json
import pathlib
import struct
import subprocess

ROOT = pathlib.Path(__file__).resolve().parents[1]
PREFIX = 'https://storage.googleapis.com/vue-course-api.appspot.com/haohao/'
API = 'https://vue3-course-api.hexschool.io/api/haohao/'


def fetch(url, partial=False):
    args = ['curl', '-fsS', '--max-time', '25', '--retry', '1']
    if partial:
        args += ['--range', '0-65535']
    return subprocess.check_output(args + [url])


def dimensions(data):
    if data[:8] == b'\x89PNG\r\n\x1a\n':
        return list(struct.unpack('>II', data[16:24]))
    if data[:2] == b'\xff\xd8':
        offset = 2
        while offset + 9 < len(data):
            if data[offset] != 255:
                break
            marker = data[offset + 1]
            if marker == 255:
                offset += 1
                continue
            length = int.from_bytes(data[offset + 2:offset + 4], 'big')
            if marker in (192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207):
                height, width = struct.unpack('>HH', data[offset + 5:offset + 9])
                return [width, height]
            offset += length + 2
    raise ValueError('Unsupported image or dimensions beyond the first 64 KiB')


def inspect(url):
    return url[len(PREFIX):], dimensions(fetch(url, partial=True))


def main():
    products = json.loads(fetch(API + 'products/all'))['products']
    urls = set()
    for product in products:
        for key, value in product.items():
            if 'mage' in key:
                urls.update(v for v in (value if isinstance(value, list) else [value])
                            if isinstance(v, str) and v.startswith(PREFIX))
    for article_id in ('-MntdJ6iOSdc64gJi26G', '-Mo9YavblcdjTc7-_DRD',
                       '-MoCAPot4RFi3FXRZQCy', '-MoCdFKCkh-6S5rqfL-v', '-MoNVFrUSDDA2ZXh9gFh'):
        article = json.loads(fetch(API + 'article/' + article_id))['article']
        urls.update(u for u in article.get('articleImagesUrl', []) if u.startswith(PREFIX))
    result, failures = {}, []
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        futures = {pool.submit(inspect, url): url for url in sorted(urls)}
        for future in concurrent.futures.as_completed(futures):
            try:
                key, size = future.result()
                result[key] = size
            except Exception as error:
                failures.append({'url': futures[future], 'error': str(error)})
    if failures:
        print(json.dumps(failures, indent=2))
        raise SystemExit('Some images failed; existing metadata was not overwritten.')
    output = ROOT / 'src/assets/image-dimensions.json'
    output.write_text(json.dumps(dict(sorted(result.items())), indent=2) + '\n')
    print(f'Updated {len(result)} original image dimensions; no image files stored or modified.')


if __name__ == '__main__':
    main()
