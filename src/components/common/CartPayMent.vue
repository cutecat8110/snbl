<template>
  <aside>
    <section>
      <div class="item-wrapper">
        <h2 class="item-title">付款方式</h2>
        <div class="item-body">
          <!-- 優惠碼-->
          <div class="form-group">
            <a
              href="#"
              class="coupons-toogle"
              v-if="!couponToogle"
              @click.prevent="couponToogle = true"
            >
              使用優惠代碼
            </a>
            <template v-else>
              <label class="form-label">
                優惠碼
              </label>
              <div class="form-input-group-wrapper">
                <div class="form-input-group" :class="couponCode ? 'inputClear' : ''">
                  <input
                    ref="coupons"
                    type="text"
                    class="form-control"
                    v-model="couponCode"
                    placeholder="請輸入"
                  />
                  <button
                    v-if="couponCode"
                    type="button"
                    class="btn-close position-absolute top-50 end-0 translate-middle-y"
                    v-on:click="
                      couponCode = '';
                      clearFocus('coupons');
                    "
                  ></button>
                </div>
                <button class="btn coupons-btn" type="button" @click="addCouponCode">
                  使用
                </button>
              </div>
            </template>
          </div>
          <!-- 運送區域 -->
          <div class="form-group">
            <label class="form-label">
              運送區域
            </label>
            <select class="form-select" v-model="payment.country">
              <option value="" disabled>請選擇</option>
              <option v-for="(item, index) in country" :key="index" :value="item.value">
                {{ item.name }}
              </option>
            </select>
          </div>
          <!-- 運送方式 -->
          <div class="form-group">
            <label class="form-label">
              運送方式
            </label>
            <select class="form-select" v-model="payment.conveyance">
              <option value="" disabled>請選擇</option>
              <option v-for="(item, index) in showConveyance" :key="index" :value="item.value">
                {{ item.value }}
              </option>
            </select>
          </div>
          <!-- 運送方式 - 註釋 -->
          <ul class="payment-text">
            <li v-for="(item, index) in showConveyanceText" :key="index">
              {{ item }}
            </li>
          </ul>
          <!-- 付款方式 -->
          <div class="form-group">
            <label class="form-label">
              付款方式
            </label>
            <select class="form-select" v-model="payment.method">
              <option value="" disabled>請選擇</option>
              <option v-for="(item, index) in showMethod" :key="index" :value="item.value">
                {{ item.value }}
              </option>
            </select>
          </div>
          <!-- 付款方式 - 註釋 -->
          <ul v-if="showMethoText[0] != ''" class="payment-text">
            <li v-for="(item, index) in showMethoText" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section>
      <div class="item-wrapper">
        <h2 class="item-title">訂單信息</h2>
        <div class="item-body">
          <!-- 運送區域 -->
          <div class="text-content">
            <div class="oder-text">
              <span class="text-name">總數量</span>
              <span class="text-oder"> {{ qty }} 件</span>
            </div>
            <div class="oder-text">
              <span class="text-name">商品小計</span>
              <span class="text-oder">{{ $filters.currency(cart.total) }} </span>
            </div>
            <div class="oder-text">
              <span class="text-name">運費</span>
              <span class="text-oder">
                {{ isNaN(conveyanceCost) ? '' : '+&nbsp;' }}
                {{ conveyanceCost }}
              </span>
            </div>
            <div class="oder-text">
              <span class="text-name">優惠代碼</span>
              <span class="text-oder">
                -&nbsp;{{ $filters.currency(cart.total - cart.final_total) }}
              </span>
            </div>
          </div>
          <div class="total">
            <div class="oder-text">
              <span class="text-name">合計</span>
              <span class="text-oder">
                NT$&nbsp;{{ $filters.currency(cart.final_total + conveyanceCost) }}
              </span>
            </div>
          </div>
          <router-link to="/cart/add" class="btn w-100 checkout">
            下一步
          </router-link>
        </div>
      </div>
    </section>
  </aside>
</template>

<script>
export default {
  inject: ['emitter'],
  props: ['qty'],
  data() {
    return {
      cart: {},
      country: [
        { value: 'AF', name: '阿富汗' },
        { value: 'AL', name: '阿爾巴尼亞' },
        { value: 'DZ', name: '阿爾及利亞' },
        { value: 'AS', name: '美屬薩摩亞' },
        { value: 'AD', name: '安道爾' },
        { value: 'AO', name: '安哥拉' },
        { value: 'AI', name: '安圭拉' },
        { value: 'AQ', name: '南極洲' },
        { value: 'AG', name: '安提瓜和巴布達' },
        { value: 'AR', name: '阿根廷' },
        { value: 'AM', name: '亞美尼亞' },
        { value: 'AW', name: '阿魯巴' },
        { value: 'AU', name: '澳大利亞' },
        { value: 'AT', name: '奧地利' },
        { value: 'AZ', name: '阿塞拜疆' },
        { value: 'BS', name: '巴哈馬' },
        { value: 'BH', name: '巴林' },
        { value: 'BD', name: '孟加拉國' },
        { value: 'BB', name: '巴巴多斯' },
        { value: 'BY', name: '白俄羅斯' },
        { value: 'BE', name: '比利時' },
        { value: 'BZ', name: '伯利茲' },
        { value: 'BJ', name: '貝寧' },
        { value: 'BM', name: '百慕大' },
        { value: 'BT', name: '不丹' },
        { value: 'BO', name: '玻利維亞' },
        { value: 'BA', name: '波斯尼亞和黑塞哥維那' },
        { value: 'BW', name: '博茨瓦納' },
        { value: 'BV', name: '布維特島' },
        { value: 'BR', name: '巴西' },
        { value: 'IO', name: '英屬印度洋領地' },
        { value: 'BN', name: '文萊' },
        { value: 'BG', name: '保加利亞' },
        { value: 'BF', name: '布基納法索' },
        { value: 'BI', name: '布隆迪' },
        { value: 'CV', name: '佛得角' },
        { value: 'KH', name: '柬埔寨' },
        { value: 'CM', name: '喀麥隆' },
        { value: 'CA', name: '加拿大' },
        { value: 'KY', name: '開曼群島' },
        { value: 'CF', name: '中非共和國' },
        { value: 'TD', name: '乍得' },
        { value: 'CL', name: '智利' },
        { value: 'CN', name: '中國' },
        { value: 'CX', name: '聖誕島' },
        { value: 'CC', name: '科科斯群島' },
        { value: 'CO', name: '哥倫比亞' },
        { value: 'KM', name: '科摩羅' },
        { value: 'CG', name: '剛果共和國' },
        { value: 'CD', name: '剛果民主共和國' },
        { value: 'CK', name: '庫克群島' },
        { value: 'CR', name: '哥斯達黎加' },
        { value: 'HR', name: '克羅地亞' },
        { value: 'CU', name: '古巴' },
        { value: 'CY', name: '塞浦路斯' },
        { value: 'CZ', name: '捷克共和國' },
        { value: 'CI', name: '象牙海岸' },
        { value: 'DK', name: '丹麥' },
        { value: 'DJ', name: '吉布提' },
        { value: 'DM', name: '多米尼加' },
        { value: 'DO', name: '多米尼加共和國' },
        { value: 'EC', name: '厄瓜多爾' },
        { value: 'EG', name: '埃及' },
        { value: 'SV', name: '薩爾瓦多' },
        { value: 'GQ', name: '赤道幾內亞' },
        { value: 'ER', name: '厄立特裡亞' },
        { value: 'EE', name: '愛沙尼亞' },
        { value: 'ET', name: '埃塞俄比亞' },
        { value: 'FK', name: '福克蘭群島（馬爾維納斯群島）' },
        { value: 'FO', name: '法羅群島' },
        { value: 'FJ', name: '斐濟' },
        { value: 'FI', name: '芬蘭' },
        { value: 'FR', name: '法國' },
        { value: 'GF', name: '法屬圭亞那' },
        { value: 'PF', name: '法屬波利尼西亞' },
        { value: 'TF', name: '法屬南部領土' },
        { value: 'GA', name: '加蓬' },
        { value: 'GM', name: '岡比亞' },
        { value: 'GE', name: '格魯吉亞' },
        { value: 'DE', name: '德國' },
        { value: 'GH', name: '加納' },
        { value: 'GI', name: '直布羅陀' },
        { value: 'GR', name: '希臘' },
        { value: 'GL', name: '格陵蘭' },
        { value: 'GD', name: '格林納達' },
        { value: 'GP', name: '瓜德羅普島' },
        { value: 'GU', name: '關島' },
        { value: 'GT', name: '危地馬拉' },
        { value: 'GG', name: '根西島' },
        { value: 'GN', name: '幾內亞' },
        { value: 'GW', name: '幾內亞比紹' },
        { value: 'GY', name: '圭亞那' },
        { value: 'HT', name: '海地' },
        { value: 'HM', name: '赫德與麥克唐納群島' },
        { value: 'VA', name: '梵蒂岡' },
        { value: 'HN', name: '洪都拉斯' },
        { value: 'HK', name: '香港' },
        { value: 'HU', name: '匈牙利' },
        { value: 'IS', name: '冰島' },
        { value: 'IN', name: '印度' },
        { value: 'ID', name: '印度尼西亞' },
        { value: 'IR', name: '伊朗' },
        { value: 'IQ', name: '伊拉克' },
        { value: 'IE', name: '愛爾蘭' },
        { value: 'IM', name: '曼島' },
        { value: 'IL', name: '以色列' },
        { value: 'IT', name: '意大利' },
        { value: 'JM', name: '牙買加' },
        { value: 'JP', name: '日本' },
        { value: 'JE', name: '澤西島' },
        { value: 'JO', name: '約旦' },
        { value: 'KZ', name: '哈薩克斯坦' },
        { value: 'KE', name: '肯尼亞' },
        { value: 'KI', name: '基裡巴斯' },
        { value: 'KP', name: '朝鮮' },
        { value: 'KR', name: '韓國' },
        { value: 'KW', name: '科威特' },
        { value: 'KG', name: '吉爾吉斯斯坦' },
        { value: 'LA', name: '老撾' },
        { value: 'LV', name: '拉脫維亞' },
        { value: 'LB', name: '黎巴嫩' },
        { value: 'LS', name: '萊索托' },
        { value: 'LR', name: '利比裡亞' },
        { value: 'LY', name: '利比亞' },
        { value: 'LI', name: '列支敦士登' },
        { value: 'LT', name: '立陶宛' },
        { value: 'LU', name: '盧森堡' },
        { value: 'MO', name: '澳門' },
        { value: 'MK', name: '馬其頓（前南斯拉夫的馬其頓共和國）' },
        { value: 'MG', name: '馬達加斯加' },
        { value: 'MW', name: '馬拉維' },
        { value: 'MY', name: '馬來西亞' },
        { value: 'MV', name: '馬爾代夫' },
        { value: 'ML', name: '馬裡' },
        { value: 'MT', name: '馬耳他' },
        { value: 'MH', name: '馬紹爾群島' },
        { value: 'MQ', name: '馬提尼克' },
        { value: 'MR', name: '毛裡塔尼亞' },
        { value: 'MU', name: '毛裡求斯' },
        { value: 'YT', name: '馬約特' },
        { value: 'MX', name: '墨西哥' },
        { value: 'FM', name: '密克羅尼西亞聯邦' },
        { value: 'MD', name: '摩爾多瓦' },
        { value: 'MC', name: '摩納哥' },
        { value: 'MN', name: '蒙古' },
        { value: 'ME', name: '黑山共和國' },
        { value: 'MS', name: '蒙塞拉特' },
        { value: 'MA', name: '摩洛哥' },
        { value: 'MZ', name: '莫桑比克' },
        { value: 'MM', name: '緬甸' },
        { value: 'NA', name: '納米比亞' },
        { value: 'NR', name: '瑙魯' },
        { value: 'NP', name: '尼泊爾' },
        { value: 'NL', name: '荷蘭' },
        { value: 'NC', name: '新喀裡多尼亞' },
        { value: 'NZ', name: '新西蘭' },
        { value: 'NI', name: '尼加拉瓜' },
        { value: 'NE', name: '尼日爾' },
        { value: 'NG', name: '尼日利亞' },
        { value: 'NU', name: '紐埃' },
        { value: 'NF', name: '諾福克島' },
        { value: 'MP', name: '北馬裡亞納群島' },
        { value: 'NO', name: '挪威' },
        { value: 'OM', name: '阿曼' },
        { value: 'PK', name: '巴基斯坦' },
        { value: 'PW', name: '帕勞' },
        { value: 'PS', name: '巴勒斯坦領土' },
        { value: 'PA', name: '巴拿馬' },
        { value: 'PG', name: '巴布亞新幾內亞' },
        { value: 'PY', name: '巴拉圭' },
        { value: 'PE', name: '秘魯' },
        { value: 'PH', name: '菲律賓' },
        { value: 'PN', name: '皮特凱恩群島' },
        { value: 'PL', name: '波蘭' },
        { value: 'PT', name: '葡萄牙' },
        { value: 'PR', name: '波多黎各' },
        { value: 'QA', name: '卡塔爾' },
        { value: 'RO', name: '羅馬尼亞' },
        { value: 'RU', name: '俄羅斯' },
        { value: 'RW', name: '盧旺達' },
        { value: 'RE', name: '留尼汪' },
        { value: 'BL', name: '聖巴泰勒米' },
        { value: 'SH', name: '聖赫勒拿' },
        { value: 'KN', name: '聖基茨和尼維斯' },
        { value: 'LC', name: '聖盧西亞' },
        { value: 'MF', name: '法屬聖馬丁' },
        { value: 'PM', name: '聖皮埃爾和密克隆群島' },
        { value: 'VC', name: '聖文森特和格林納丁斯' },
        { value: 'WS', name: '薩摩亞' },
        { value: 'SM', name: '聖馬力諾' },
        { value: 'ST', name: '聖多美和普林西比' },
        { value: 'SA', name: '沙特阿拉伯' },
        { value: 'SN', name: '塞內加爾' },
        { value: 'RS', name: '塞爾維亞' },
        { value: 'SC', name: '塞舌爾' },
        { value: 'SL', name: '塞拉利昂' },
        { value: 'SG', name: '新加坡' },
        { value: 'SK', name: '斯洛伐克' },
        { value: 'SI', name: '斯洛文尼亞' },
        { value: 'SB', name: '所羅門群島' },
        { value: 'SO', name: '索馬裡' },
        { value: 'ZA', name: '南非' },
        { value: 'GS', name: '南喬治亞島和南桑威齊群島' },
        { value: 'SS', name: '南蘇丹' },
        { value: 'ES', name: '西班牙' },
        { value: 'LK', name: '斯裡蘭卡' },
        { value: 'SD', name: '蘇丹' },
        { value: 'SR', name: '蘇裡南' },
        { value: 'SJ', name: '斯瓦爾巴特和揚馬延' },
        { value: 'SZ', name: '斯威士蘭' },
        { value: 'SE', name: '瑞典' },
        { value: 'CH', name: '瑞士' },
        { value: 'SY', name: '敘利亞' },
        { value: 'TW', name: '台灣' },
        { value: 'TJ', name: '塔吉克斯坦' },
        { value: 'TZ', name: '坦桑尼亞' },
        { value: 'TH', name: '泰國' },
        { value: 'TL', name: '東帝汶' },
        { value: 'TG', name: '多哥' },
        { value: 'TK', name: '托克勞' },
        { value: 'TO', name: '湯加' },
        { value: 'TT', name: '特立尼達和多巴哥' },
        { value: 'TN', name: '突尼斯' },
        { value: 'TR', name: '土耳其' },
        { value: 'TM', name: '土庫曼斯坦' },
        { value: 'TC', name: '特克斯和凱科斯群島' },
        { value: 'TV', name: '圖瓦盧' },
        { value: 'UG', name: '烏干達' },
        { value: 'UA', name: '烏克蘭' },
        { value: 'AE', name: '阿拉伯聯合酋長國' },
        { value: 'GB', name: '英國' },
        { value: 'UM', name: '美國邊遠小島' },
        { value: 'US', name: '美國' },
        { value: 'UY', name: '烏拉圭' },
        { value: 'UZ', name: '烏茲別克斯坦' },
        { value: 'VU', name: '瓦努阿圖' },
        { value: 'VE', name: '委內瑞拉' },
        { value: 'VN', name: '越南' },
        { value: 'VG', name: '英屬維京群島' },
        { value: 'VI', name: '美屬維京群島' },
        { value: 'WF', name: '瓦利斯和富圖納' },
        { value: 'EH', name: '西撒哈拉' },
        { value: 'YE', name: '也門' },
        { value: 'ZM', name: '贊比亞' },
        { value: 'ZW', name: '津巴布韋' },
        { value: 'AX', name: '奧蘭群島' },
      ],
      conveyance: [
        {
          value: '國際配送',
          text: [
            '地址請務必填寫【郵遞區號】',
            '日本地區收件資料請務必填寫英文的姓名及地址',
            '此選項為 除了 寄送【香港、澳門、新加坡、馬來西亞】以外的國家',
            '(香港、澳門、新加坡、馬來西亞地區請選擇正確選項，如未依照正確收件區域選擇，將無法享有運費優惠，運費將由收件方自行支付。)',
            '國際配送 森女部落使用【順豐速運】寄送服務( http://www.sf-express.com/tw/tc/ )',
            '實際運費多寡無法事先確定，視包裹實際的大小、重量而定，依順豐速運的收費為準，待商品貨齊包裝完畢後會請順豐速運報價，並MAIL通知您付款運費喔！',
            '請注意！若因國際運送產生之手續費、關稅費用則是商品配送時由收件方自行支付，物流人員會提供單據另外收取。',
            '溫馨提醒：訂單送出前，請再次確認收件資料(收件人、聯絡電話、收件地址需包含國家)是否填寫正確完整唷！',
          ],
        },
        {
          value: '7-11 超商取貨',
          text: [
            '訂單金額上限$20,000，若超過請選擇【宅配】。',
            '提醒您！包裹若為『取貨不付款』，取貨時請出示與包裹姓名相同的身分證件，給店員檢核後才可取貨。',
            '出貨完成配送至超商約2-3天',
          ],
        },
        {
          value: '全家 超商取貨',
          text: [
            '訂單金額上限$20,000，若超過請選擇【宅配】。',
            '提醒您！包裹若為『取貨不付款』，取貨時請出示與包裹姓名相同的身分證件，給店員檢核後才可取貨。',
            '出貨完成配送至超商約2-3天',
          ],
        },
        {
          value: '新竹物流',
          text: [
            '單筆訂單(折扣後、不含運費)未滿兩千元運費70元，滿兩千免運。',
            '此選項限定台灣地區配送(不含外島)',
            '出貨完成物流配送時間約1-2個工作天(不含假日)',
          ],
        },
      ],
      method: [
        {
          value: '超商取貨付款 (COD)',
          text: [''],
        },
        {
          value: '貨到付款(COD)(+NT$30)',
          text: [
            '單筆訂單(折扣後、不含運費)未滿兩千元運費共100元，滿兩千以上僅需負擔宅配收取的30元代收手續費。',
          ],
        },
        { value: 'LINE Pay', text: ['請於結帳時立即完成付款，若未完成訂單即失效，請重新訂購。'] },
        {
          value: '信用卡（Visa, Master, JCB付款）',
          text: [
            '支援國內外Visa, Master, JCB',
            '請於結帳時填寫正確的信用卡【付款資料】，若無立即完成付款或輸入錯誤訂單即失效，請重新訂購。',
          ],
        },
        {
          value: '信用卡分期（3期）',
          text: [
            '僅支援台灣部分銀行發行之信用卡；不支援簽帳金融卡',
            '目前支援的分期刷卡銀行：台新, 玉山, 台北富邦, 遠東, 永豐, 國泰世華, 華南, 日盛國際商銀, 台灣樂天, 安泰, 聯邦, 兆豐商銀, 台中商銀, 上海, 凱基, 匯豐, 星展, 臺灣新光, 合作金庫, 彰化, 第一, 元大, 陽信, 臺灣企銀, 華泰, 三信',
            '請於結帳時填寫正確的信用卡【付款資料】，若無立即完成付款或輸入錯誤訂單即失效，請重新訂購。',
          ],
        },
        {
          value: 'ATM 轉帳',
          text: [
            '需持虛擬代碼至實體ATM或網路銀行進行繳費',
            '當完成訂單時，系統會依您的訂單產生出您專屬的『轉帳帳號』。',
            '請於 『3 』日內完成匯款，若未完成訂單即失效，請重新訂購。',
          ],
        },
      ],
      payment: {
        country: 'TW',
        conveyance: '7-11 超商取貨',
        method: '超商取貨付款 (COD)',
      },
      couponCode: '',
      couponToogle: false,
      conveyanceCost: '',
    };
  },
  computed: {
    showConveyance() {
      const conveyance = JSON.parse(JSON.stringify(this.conveyance));
      if (this.payment.country !== 'TW') {
        conveyance.splice(1, 3);
      } else {
        conveyance.splice(0, 1);
      }
      return conveyance;
    },
    showConveyanceText() {
      const conveyanceText = this.conveyance.filter(
        (item) => item.value === this.payment.conveyance,
      )[0].text;
      return conveyanceText;
    },
    showMethod() {
      const method = JSON.parse(JSON.stringify(this.method));
      if (this.payment.conveyance === '新竹物流') {
        method.splice(0, 1);
      } else if (this.payment.conveyance === '國際配送') {
        method.splice(0, 2);
        method.pop();
      } else {
        method.splice(1, 1);
      }
      return method;
    },
    showMethoText() {
      const MethoText = this.method.filter((item) => item.value === this.payment.method)[0].text;
      return MethoText;
    },
  },
  watch: {
    showConveyance() {
      this.payment.conveyance = this.showConveyance[0].value;
    },
    showMethod() {
      this.payment.method = this.showMethod[0].value;
    },
    payment: {
      handler() {
        this.conveyanceCost = 0;
        if (this.payment.conveyance === '新竹物流') {
          if (this.cart.final_total < 2000) {
            this.conveyanceCost += 70;
          }
          if (this.payment.method === '貨到付款(COD)(+NT$30)') {
            this.conveyanceCost += 30;
          }
        } else if (this.payment.conveyance === '國際配送') {
          this.conveyanceCost = '未包含';
        } else {
          this.conveyanceCost = 0;
        }
        this.emitter.emit('emitToAdd', this.payment);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    addCouponCode() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const couponCode = {
        code: this.couponCode,
      };
      if (this.couponCode === '') {
        couponCode.code = 'reset';
      }
      this.$http.post(url, { data: couponCode }).then((res) => {
        if (res.data.success) {
          this.$swal({
            icon: 'success',
            title: '優惠碼已成功套用',
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          this.$swal({
            icon: 'question',
            title: '優惠碼不存在',
            text: '請檢查代碼是否有誤及字母大小寫是否相符。',
          });
        }
        this.emitter.emit('emitToCart');
      });
    },
    clearFocus(ref) {
      this.$refs[ref].focus();
    },
  },
  created() {
    this.emitter.on('upDateCart', (item) => {
      this.cart = JSON.parse(JSON.stringify(item[0]));
    });
    this.emitter.emit('emitToCart');
    this.emitter.on('upDatePayment', () => {
      this.emitter.emit('emitToAdd', [this.payment, this.conveyanceCost]);
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

aside {
  display: grid;
  grid-gap: 2.5rem;
  grid-template-columns: 1fr;

  @include xl {
    grid-template-columns: 2fr 1fr;
  }
  @include md {
    grid-template-columns: 3fr 2fr;
  }
  @include sm {
    grid-template-columns: 1fr;
    grid-gap: 1.5rem;
  }

  .item-wrapper {
    border: 1px solid $gray-250;
    border-radius: 0.25rem;

    h2 {
      margin: 0;
      padding: 0.25rem 1rem;
      font-weight: 500;
      line-height: 1.5;
      text-align: center;
      color: $gray-600;
      background: $gray-250;
      @include font-md;
    }

    .item-body {
      padding: 1rem;
      color: $gray-600;

      .form-group {
        &:not(:first-child) {
          margin-top: 1rem;
        }

        .coupons-toogle {
          text-decoration: underline;
          color: $color-main;

          transition: color 150ms ease-in-out;
          cursor: pointer;

          &:hover {
            color: $color-main-light-hover;
          }

          &:active {
            color: $color-main-active;
          }
        }

        .form-input-group-wrapper {
          display: grid;
          grid-gap: 0.5rem;
          grid-template-columns: 1fr 5rem;

          .form-input-group {
            position: relative;

            .btn-close {
              visibility: hidden;
              position: absolute;
              top: 50%;
              right: 0;

              margin-right: 4px;
              opacity: 0;

              transition: visibility 150ms ease-in-out, opacity 150ms ease-in-out,
                box-shadow 150ms ease-in-out;

              &:active {
                box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
              }
            }

            &.inputClear:hover {
              .btn-close {
                visibility: visible;

                opacity: 1;

                transition: visibility 150ms ease-in-out, opacity 150ms ease-in-out;
              }
            }

            input {
              padding-right: 32px;
              color: #000000;

              &::placeholder {
                font-weight: 300;
              }

              &:focus + .btn-close {
                visibility: visible;

                opacity: 1;

                transition: visibility 150ms ease-in-out, opacity 150ms ease-in-out;
              }
            }
          }

          .coupons-btn {
            border: 1px solid $gray-250;

            transition: background 150ms ease-in-out, box-shadow 150ms ease-in-out;

            &:focus {
              box-shadow: none;
            }

            &:hover {
              background: $gray-250;
            }

            &:active {
              box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
            }
          }
        }

        .form-select,
        .form-control {
          border-color: $gray-250;
          font-weight: 500;

          transition: border 150ms ease-in-out, box-shadow 150ms ease-in-out;

          &:hover {
            border-color: $color-border-active;
          }

          &:focus {
            border-color: $color-border-active;
            box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
          }
        }
      }

      .payment-text {
        margin: 0;
        padding: 0.5rem 0 0 1.07rem;
        font-weight: 300;
        white-space: normal;
        @include font-sm;

        & > li:not(:last-child) {
          margin-bottom: 0.25rem;
        }

        li {
          &::marker {
            content: '• ';

            font-weight: bold;
          }
        }
      }

      .text-content,
      .total {
        margin-bottom: 1rem;

        .oder-text {
          display: flex;
          justify-content: space-between;

          margin-bottom: 0.125rem;

          .text-oder {
            font-weight: 500;
            color: $gray-900;
          }
        }
      }

      .total {
        margin-bottom: 0;
        border-top: 1px solid $gray-250;
        padding-top: 0.5rem;

        .oder-text {
          align-items: baseline;

          .text-oder {
            @include font-lg;
          }
        }
      }

      .checkout {
        margin: 1rem 0 0 0;
        color: #ffffff;
        background: $color-main;

        transition: background 150ms ease-in-out;

        &:hover {
          background: $color-main-hover;
        }

        &:active {
          background: $color-main-active;
        }

        &:focus {
          box-shadow: none;
        }

        &:active {
          box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
        }

        &:disabled {
          background: coral;
        }
      }
    }
  }
}
</style>
