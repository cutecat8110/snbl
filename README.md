# Snbl - 電商網站

![Node](https://img.shields.io/badge/Node.js-v16.20.2-brightgreen.svg)
![Vue](https://img.shields.io/badge/Vue.js-v3-blue.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-v5-purple.svg)

> 這是一個以「少女時尚」為主題的電商平台，提供多元服飾選擇與便捷購物體驗，主要功能有商品瀏覽、下單、後台管理及訂單追蹤等。

![](https://cutecat8110.github.io/snbl/demo.png)


## 📋 專案概述

此專案旨在提升 Vue Options API 技術熟練度，從企劃、設計到前端皆獨立開發。<br />執行流程涵蓋網站架構、流程功能規劃、RWD 網頁設計、切版與動效實現，以及 API 串接與整合等。

* [API 文件](https://github.com/hexschool/vue3-course-api-wiki/wiki)
* [Demo](https://cutecat8110.github.io/snbl/) 


## 🌸 啟動指南

```bash
# 取得專案
git clone https://github.com/cutecat8110/snbl.git

# 安裝依賴
npm ci

# 啟動開發伺服器
npm run serve
```

## QA 與本機驗證

本輪修正位於 `portfolio/qa`，完整問題、重現步驟、測試範圍與限制請看 [QA_CHANGELOG.md](QA_CHANGELOG.md)。保留原設計、商品內容及六角學院 API；沒有改為假資料展示站。

使用專案原有 Node.js **16.20.2 / npm 8**，先 `npm ci`。開發網址為 `http://localhost:8080/snbl/`，Router 使用 hash 路徑。

```bash
npm run serve
npm run lint -- --no-fix
npm test
npm run build
```

`.env` 的 `VUE_APP_API` 是 API 根網址（含結尾 `/`），`VUE_APP_PATH` 是課程 API 路徑。後台須使用對應的六角學院帳號登入；不要把密碼或 token 寫入儲存庫。可用 `.env.local` 設定自己的路徑。

`npm test` 使用 jsdom 與實際 Vue 元件進行回歸測試，HTTP 以測試替身隔離，不會寫入既有 API。若要手動測試新增、刪除、優惠碼及結帳，另開兩個終端：

```bash
# 終端一：只在 127.0.0.1 開放的記憶體 API，重啟即清空
node tests/mock-api.js

# 終端二：獨立 QA 網址 http://127.0.0.1:8081/snbl/
VUE_APP_API=http://127.0.0.1:8787/ npm run serve -- --host 127.0.0.1 --port 8081
```

**一般預覽：8080，連六角 API，可登入後台；隔離測試：8081 → 8787，只能測前台，不提供管理員登入。完成隔離測試後請關閉這兩個終端服務。**

隔離環境只有兩件公開商品的測試樣本，使用 `QA10` 可測九折，`reset` 取消折扣。它不會轉送請求到六角 API，也不代表真實後端寫入、登入或資料庫測試已通過。表單僅填虛構資料。一般 `npm run serve` 與正式建置仍連原 API。

部署沿用 `vue.config.js`：建置輸出 `docs/`，資源基底 `/snbl/`，適合現有 GitHub Pages。上線前須由 QA 分支重新建置並提交 `docs/`，再設定發布來源；本輪只推送程式與 QA 紀錄，不改現有 Pages 設定。若只驗證建置，可用 `npm run build -- --dest /tmp/snbl-preview/snbl`，再 `python3 -m http.server 8082 --bind 127.0.0.1 --directory /tmp/snbl-preview`，開啟 `http://127.0.0.1:8082/snbl/`。

## 🔨 核心技術

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://vuejs.org/" >
          Vue 3
        </a>
      </td>
      <td>JavaScript 框架</td>
    </tr>
    <tr>
      <td>
        <a href="https://www.npmjs.com/package/vue-axios" >
          Vue Axios
        </a>
      </td>
      <td>HTTP 請求工具</td>
    </tr>
    <tr>
      <td>
        <a href="https://getbootstrap.com/" >
          Bootstrap 5
        </a>
      </td>
      <td>CSS/HTML 框架</td>
    </tr>
  </tbody>
</table>


## 🛠️ 擴展套件

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://www.npmjs.com/package/mitt/">
          mitt
        </a>
      </td>
      <td>處理組件間事件交互</td>
    </tr>
    <tr>
      <td>
        <a href="https://sweetalert2.github.io/">
          SweetAlert 2
        </a>
      </td>
      <td>可定製訊息彈框</td>
    </tr>
    <tr>
      <td>
        <a href="https://www.npmjs.com/package/vue-loading-overlay">
          Vue Loading Overlay
        </a>
      </td>
      <td>loading 效果組件</td>
    </tr>
    <tr>
      <td>
        <a href="https://swiperjs.com/">
          Swiper
        </a>
      </td>
      <td>輪播/滑動組件</td>
    </tr>
    <tr>
      <td>
        <a href="https://vee-validate.logaretm.com/v4/">
          VeeValidate
        </a>
      </td>
      <td>表單驗證庫</td>
    </tr>
    <tr>
      <td>
        <a href="https://fontawesome.com/">
          Font Awesome
        </a>
      </td>
      <td>大量開源向量圖標</td>
    </tr>
    <tr>
      <td>
        <a href="https://fonts.google.com/icons">
          Material Design Icons
        </a>
      </td>
      <td>Google 開源圖標</td>
    </tr>
  </tbody>
</table>
