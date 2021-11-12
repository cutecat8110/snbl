<template>
  <div class="home-container">
    <div class="order-information-wrapper">
      <a
        class="btn order-btn w-100"
        data-bs-toggle="collapse"
        href="#order-information"
        role="button"
        aria-expanded="false"
        aria-controls="order-information"
        @click="orderInfor = !orderInfor"
      >
        <div>合計&nbsp;NT$&nbsp;{{ $filters.currency(cart.final_total + conveyanceCost) }}</div>
        <div>
          購物清單 ({{ qty }})
          <i class="fas fa-caret-up" v-if="orderInfor"></i>
          <i class="fas fa-caret-down" v-if="!orderInfor"></i>
        </div>
      </a>
      <div class="collapse" id="order-information">
        <div class="web">
          <div class="list-head">
            <div>商品</div>
            <div></div>
            <div>數量</div>
            <div>單價</div>
            <div>小計</div>
          </div>
          <div class="list-card" v-for="item in showCart" :key="item.id">
            <!-- 商品資訊 -->
            <img class="img-fluid rounded" :src="item.product.imageUrl" />
            <div class="product-infor">
              <div class="title">{{ item.product.title }}</div>
              <div class="color"><span> COLOR : &nbsp;</span>{{ item.selected[0].color }}</div>
              <div class="size"><span>SIZE : &nbsp;</span>{{ item.selected[0].size }}</div>
            </div>
            <!-- 數量 -->
            <div class="align-box">
              {{ item.selected[0].qty }}
            </div>
            <!-- 售價 -->
            <div class="align-box">
              {{ $filters.currency(item.product.price) }}
            </div>
            <!-- 小計 -->
            <div class="align-box">
              {{ $filters.currency(item.product.price * item.selected[0].qty) }}
            </div>
          </div>
        </div>
        <div class="mobile">
          <div class="list-card" v-for="item in showCart" :key="item.id">
            <!-- 商品圖 -->
            <div class="img-box">
              <img class="img-fluid rounded" :src="item.product.imageUrl" />
            </div>
            <!-- 商品資訊 -->
            <div class="product-infor">
              <div class="title">
                {{ item.product.title }}
              </div>
              <div class="infor-text"><span> COLOR : &nbsp;</span>{{ item.selected[0].color }}</div>
              <div class="infor-text"><span>SIZE : &nbsp;</span>{{ item.selected[0].size }}</div>
            </div>
            <!-- 數量 -->
            <div class="qty-box">數量&nbsp;x&nbsp;{{ item.selected[0].qty }}</div>
            <!-- 價格-->
            <div class="product-price">
              <div class="price-text">
                <span>單價 &nbsp;</span>
                {{ $filters.currency(item.product.price) }}
              </div>
              <div class="price-text">
                <span>小計 &nbsp;</span>
                {{ $filters.currency(item.product.price * item.selected[0].qty) }}
              </div>
            </div>
          </div>
        </div>
        <div class="order-price">
          <div class="item-wrapper">
            <div class="item-body">
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
            </div>
          </div>
        </div>
        <a
          class="btn order-btn w-100"
          data-bs-toggle="collapse"
          href="#order-information"
          role="button"
          aria-expanded="false"
          aria-controls="order-information"
          @click="orderInfor = !orderInfor"
        >
          <i class="fas fa-caret-up" v-if="orderInfor"></i>
          <i class="fas fa-caret-down" v-if="!orderInfor"></i>
        </a>
      </div>
    </div>
    <Form ref="form" v-slot="{ errors }" @submit="createOrder">
      <div class="item-group-wrapper">
        <div class="item-group">
          <div class="item-wrapper">
            <h2>訂購人信息</h2>
            <div class="item-body">
              <!-- 姓名 -->
              <div class="form-group">
                <label for="name" class="form-label">姓名<span class="text-red">﹡</span></label>
                <div class="form-input-group" :class="form.user.name ? 'inputClear' : ''">
                  <Field
                    id="name"
                    name="姓名"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder=""
                    rules="required"
                    v-model="form.user.name"
                  ></Field>
                  <button
                    v-if="form.user.name"
                    type="button"
                    class="btn-close"
                    v-on:click="
                      form.user.name = '';
                      clearFocus('name');
                    "
                  ></button>
                  <error-message name="姓名" class="invalid-feedback"></error-message>
                </div>
              </div>
              <!-- 電話 -->
              <div class="form-group">
                <label for="tel" class="form-label">電話<span class="text-red">﹡</span></label>
                <div class="form-input-group" :class="form.user.tel ? 'inputClear' : ''">
                  <Field
                    id="tel"
                    name="電話"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="ex. 0980123456"
                    rules="required|min:8"
                    v-model="form.user.tel"
                  ></Field>
                  <button
                    v-if="form.user.tel"
                    type="button"
                    class="btn-close"
                    v-on:click="
                      form.user.tel = '';
                      clearFocus('tel');
                    "
                  ></button>
                  <error-message name="電話" class="invalid-feedback"></error-message>
                </div>
              </div>
              <!-- Email -->
              <div class="form-group">
                <label for="email" class="form-label">Email<span class="text-red">﹡</span></label>
                <div class="form-input-group" :class="form.user.email ? 'inputClear' : ''">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    placeholder="sample@snbl.com"
                    rules="email|required"
                    v-model="form.user.email"
                  ></Field>
                  <button
                    v-if="form.user.email"
                    type="button"
                    class="btn-close"
                    v-on:click="
                      form.user.email = '';
                      clearFocus('email');
                    "
                  ></button>
                  <error-message name="email" class="invalid-feedback"></error-message>
                </div>
              </div>
              <!-- 地址 -->
              <div class="form-group">
                <label for="address" class="form-label">地址<span class="text-red">﹡</span></label>
                <div class="form-input-group" :class="form.user.address ? 'inputClear' : ''">
                  <Field
                    id="address"
                    name="地址"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['地址'] }"
                    placeholder=""
                    rules="required"
                    v-model="form.user.address"
                  ></Field>
                  <button
                    v-if="form.user.address"
                    type="button"
                    class="btn-close"
                    v-on:click="
                      form.user.address = '';
                      clearFocus('address');
                    "
                  ></button>
                  <error-message name="地址" class="invalid-feedback"></error-message>
                </div>
              </div>
            </div>
          </div>
          <div class="item-wrapper">
            <h2>備註</h2>
            <div class="item-body">
              <!-- 備註-->
              <div class="form-group">
                <div class="form-input-group">
                  <textarea
                    id="message"
                    class="form-control"
                    cols="30"
                    rows="5"
                    placeholder="有什麼想告訴我們嗎?"
                    v-model="form.message.message"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-group-wrapper">
        <div class="item-group">
          <div class="item-wrapper">
            <h2>收件信息</h2>
            <div class="item-body">
              <!-- 同訂購人 -->
              <div class="form-group">
                <label class="form-check-group">
                  <input class="form-check-input" type="checkbox" v-model="userRecipient" />
                  <span class="text-decoration-underline">
                    收件人同訂購人
                  </span>
                </label>
              </div>
              <!-- 運送方式 -->
              <div class="form-group">
                運送方式 : &nbsp;<span class="text-gray">{{
                  form.message.payment.conveyance
                }}</span>
              </div>
              <!-- 姓名 -->
              <div class="form-group" :class="userRecipient ? 'disabled' : ''">
                <label for="recipient-name" class="form-label"
                  >收件人姓名<span class="text-red">﹡</span></label
                >
                <div
                  class="form-input-group"
                  :class="form.message.recipient.name ? 'inputClear' : ''"
                >
                  <Field
                    id="recipient-name"
                    name="收件人姓名"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['收件人姓名'] }"
                    placeholder=""
                    rules="required"
                    v-model="form.message.recipient.name"
                    :readonly="userRecipient"
                  ></Field>
                  <button
                    v-if="form.message.recipient.name"
                    type="button"
                    class="btn-close"
                    v-on:click="
                      form.message.recipient.name = '';
                      clearFocus('recipient-name');
                    "
                  ></button>
                  <error-message name="收件人姓名" class="invalid-feedback"></error-message>
                </div>
              </div>
              <!-- 電話 -->
              <div class="form-group" :class="userRecipient ? 'disabled' : ''">
                <label for="recipient-tel" class="form-label"
                  >收件人電話<span class="text-red">﹡</span></label
                >
                <div
                  class="form-input-group"
                  :class="form.message.recipient.tel ? 'inputClear' : ''"
                >
                  <Field
                    id="recipient-tel"
                    name="收件人電話"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['收件人電話'] }"
                    placeholder=""
                    rules="required"
                    v-model="form.message.recipient.tel"
                    :readonly="userRecipient"
                  ></Field>
                  <button
                    v-if="form.message.recipient.tel"
                    type="button"
                    class="btn-close"
                    v-on:click="
                      form.message.recipient.tel = '';
                      clearFocus('recipient-tel');
                    "
                  ></button>
                  <error-message name="收件人電話" class="invalid-feedback"></error-message>
                </div>
              </div>
              <template
                v-if="
                  form.message.payment.conveyance == '新竹物流' ||
                    form.message.payment.conveyance == '國際配送'
                "
              >
                <div class="form-group">
                  運送地點 : &nbsp;<span class="text-gray">{{ showCountry }}</span>
                </div>
                <!-- 地址 -->
                <div class="form-group">
                  <label for="recipient-address" class="form-label"
                    >運送地址<span class="text-red">﹡</span></label
                  >
                  <div
                    class="form-input-group"
                    :class="form.message.recipient.address ? 'inputClear' : ''"
                  >
                    <Field
                      id="recipient-address"
                      name="運送地址"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['運送地址'] }"
                      placeholder=""
                      rules="required"
                      v-model="form.message.recipient.address"
                    ></Field>
                    <button
                      v-if="form.message.recipient.address"
                      type="button"
                      class="btn-close"
                      v-on:click="
                        form.message.recipient.address = '';
                        clearFocus('recipient-address');
                      "
                    ></button>
                    <error-message name="運送地址" class="invalid-feedback"></error-message>
                  </div>
                </div>
                <!-- 時段 -->
                <div class="form-group">
                  <label class="form-label">
                    到貨時段
                  </label>
                  <div class="form-input-group">
                    <select class="form-select" v-model="form.message.recipient.timePeriod">
                      <option value="" disabled>請選擇</option>
                      <option v-for="(item, index) in timePeriod" :key="index" :value="item">
                        {{ item }}
                      </option>
                    </select>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="form-group">
                  <div class="form-label">
                    <img
                      v-if="form.message.payment.conveyance == '7-11 超商取貨'"
                      src="@/assets/sevenEleven.png"
                      alt="sevenEleven.png"
                    />
                    <img v-else src="@/assets/familyMart.jpg" alt="familyMart.jpg" />
                    選擇門市
                  </div>
                </div>
                <div class="form-group" v-if="!conveyance">
                  <a class="btn conveyance-btn w-100" @click.prevent="addConveyance">
                    搜尋門市
                  </a>
                </div>
                <template v-else>
                  <template v-for="(item, index) in tempConveyance" :key="index">
                    <template
                      v-if="
                        (form.message.payment.conveyance == '7-11 超商取貨' && index == 0) ||
                          (form.message.payment.conveyance == '全家 超商取貨' && index == 1)
                      "
                    >
                      <div class="form-group">
                        已選擇門市 : &nbsp;<span class="text-gray">{{ item.name }}</span>
                      </div>
                      <div class="form-group">
                        店號 : &nbsp;<span class="text-gray">{{ item.number }}</span>
                      </div>
                      <div class="form-group">
                        地址 : &nbsp;<span class="text-gray">{{ item.address }}</span>
                      </div>
                    </template>
                  </template>
                  <div class="form-group">
                    <a class="btn conveyance-btn w-100" @click.prevent="addConveyance">
                      修改
                    </a>
                  </div>
                </template>
              </template>
            </div>
          </div>
          <div class="item-wrapper">
            <h2>付款方式</h2>
            <div class="item-body">
              <div class="form-group">
                付款方式 : &nbsp;<span class="text-gray">{{ form.message.payment.method }}</span>
              </div>
              <div
                v-if="form.message.payment.method == '信用卡（Visa, Master, JCB付款）'"
                class="card-group"
              >
                <!-- 信用卡號碼-->
                <div class="form-group disabled">
                  <label for="card-number" class="form-label"
                    >信用卡號碼<span class="text-red">﹡</span></label
                  >
                  <div class="form-input-group" :class="card.number ? 'inputClear' : ''">
                    <Field
                      id="card-number"
                      name="信用卡號碼"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['信用卡號碼'] }"
                      rules="required"
                      v-model="card.number"
                      readonly
                    ></Field>
                    <button
                      v-if="card.number"
                      type="button"
                      class="btn-close"
                      v-on:click="
                        card.number = '';
                        clearFocus('card-number');
                      "
                    ></button>
                    <error-message name="信用卡號碼" class="invalid-feedback"></error-message>
                  </div>
                </div>
                <!-- 持卡人姓名-->
                <div class="form-group disabled">
                  <label for="card-name" class="form-label"
                    >持卡人姓名<span class="text-red">﹡</span></label
                  >
                  <div class="form-input-group" :class="card.name ? 'inputClear' : ''">
                    <Field
                      id="card-name"
                      name="持卡人姓名"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['持卡人姓名'] }"
                      rules="required"
                      v-model="card.name"
                      readonly
                    ></Field>
                    <button
                      v-if="card.name"
                      type="button"
                      class="btn-close"
                      v-on:click="
                        card.name = '';
                        clearFocus('card-name');
                      "
                    ></button>
                    <error-message name="持卡人姓名" class="invalid-feedback"></error-message>
                  </div>
                </div>
                <!-- 有效日期-->
                <div class="form-group disabled">
                  <label for="card-date" class="form-label"
                    >有效日期<span class="text-red">﹡</span></label
                  >
                  <div class="form-input-group" :class="card.date ? 'inputClear' : ''">
                    <Field
                      id="card-date"
                      name="有效日期"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['有效日期'] }"
                      rules="required"
                      v-model="card.date"
                      readonly
                    ></Field>
                    <button
                      v-if="card.date"
                      type="button"
                      class="btn-close"
                      v-on:click="
                        card.date = '';
                        clearFocus('card-date');
                      "
                    ></button>
                    <error-message name="有效日期" class="invalid-feedback"></error-message>
                  </div>
                </div>
                <!-- 安全碼(CVC)-->
                <div class="form-group disabled">
                  <label for="card-code" class="form-label"
                    >安全碼(CVC)<span class="text-red">﹡</span></label
                  >
                  <div class="form-input-group" :class="card.code ? 'inputClear' : ''">
                    <Field
                      id="card-code"
                      name="安全碼(CVC)"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['安全碼(CVC)'] }"
                      rules="required"
                      v-model="card.code"
                      readonly
                    ></Field>
                    <button
                      v-if="card.code"
                      type="button"
                      class="btn-close"
                      v-on:click="
                        card.code = '';
                        clearFocus('card-code');
                      "
                    ></button>
                    <error-message name="安全碼(CVC)" class="invalid-feedback"></error-message>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout-wrapper">
        <div class="link-wrapper">
          <div></div>
          <div class="form-check-group-wrapper">
            <div class="form-check-group">
              <Field
                id="agree-term"
                name="服務條款"
                type="checkbox"
                class="form-check-input"
                :class="{ 'is-invalid': errors['服務條款'] }"
                :rules="agreeTerm"
                value="true"
                v-model="agree.term"
              ></Field>
              <div class="text-gray">
                我同意接受&nbsp;
                <router-link to="/terms" class="text-decoration-underline" target="_blank">
                  服務條款</router-link
                >
                &nbsp;和&nbsp;
                <router-link to="/terms" class="text-decoration-underline" target="_blank">
                  隱私政策</router-link
                >
                &nbsp;
              </div>
              <error-message name="服務條款" class="invalid-feedback ms-4 mt-1"> </error-message>
            </div>
            <div class="form-check-group">
              <input class="form-check-input" type="checkbox" v-model="agree.member" />
              <div class="text-gray">
                成為 森女部落 的會員
              </div>
            </div>
            <div class="form-check-group">
              <input class="form-check-input" type="checkbox" v-model="agree.plan" />
              <div class="text-gray">
                我想收到最新資訊及優惠方案
              </div>
            </div>
          </div>
        </div>
        <div class="link-wrapper">
          <div class="d-flex align-items-center">
            <a href="#" class="text-reset" @click.prevent="$router.go(-1)">
              <i class="fas fa-arrow-left"></i>
              返回購物清單
            </a>
          </div>
          <button type="submit" class="btn w-100 checkout">確認購買</button>
        </div>
      </div>
      <div class="remark-message">
        <ul>
          <li>
            賣場商品採現貨及預購，預購商品需等候7-14個工作天(不含假日)。
          </li>
          <li>
            賣場無法合併訂單，若欲湊滿免運門檻，請在結帳前確認完畢。
          </li>
          <li>
            若有折價券，請於結帳時點選【使用優惠代碼】輸入後點選【套用】，訂單成立後無法修改。
          </li>
          <li>
            請注意！訂單成立後無法修改/異動，若需修改訂單請聯繫【客服】取消訂單，再自行重新訂購，原訂單享有之活動優惠/庫存，需以再次訂購之當時活動為準。
          </li>
          <li>
            『本店支援 LINE Pay 付款，歡迎使用 LINE Pay 進行結帳』
          </li>
        </ul>
      </div>
    </Form>
  </div>
</template>

<script>
export default {
  inject: ['emitter'],
  data() {
    return {
      agree: {
        term: false,
        member: true,
        plan: false,
      },
      card: {
        number: '5632 8947 2519 6375',
        name: '森女',
        date: '12/08',
        code: '518',
      },
      userRecipient: false,
      orderInfor: false,
      conveyance: false,
      tempConveyance: [
        { name: '民生門市', number: '186700', address: '台中市南區復興路三段322號324號326號' },
        { name: '全家台中忠孝夜店', number: 'F010256', address: '台中市南區忠孝路102號' },
      ],
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
      qty: 0,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: {
          payment: {
            country: 'TW',
            conveyance: '7-11 超商取貨',
            method: '超商取貨付款 (COD)',
          },
          message: '',
          recipient: {
            name: '',
            tel: '',
            address: '',
            timePeriod: '不指定',
          },
        },
      },
      cart: {},
      showCart: [],
      tempShowCart: [],
      conveyanceCost: 0,
      timePeriod: ['09:00~13:00', '13:00~17:00', '17:00-20:00', '不指定'],
    };
  },
  computed: {
    showCountry() {
      return this.country.filter((item) => item.value.match(this.form.message.payment.country))[0]
        .name;
    },
  },
  watch: {
    userRecipient() {
      if (this.userRecipient) {
        this.form.message.recipient.name = JSON.parse(JSON.stringify(this.form.user.name));
        this.form.message.recipient.tel = JSON.parse(JSON.stringify(this.form.user.tel));
      }
    },
    form: {
      handler() {
        if (this.userRecipient) {
          this.form.message.recipient.name = JSON.parse(JSON.stringify(this.form.user.name));
          this.form.message.recipient.tel = JSON.parse(JSON.stringify(this.form.user.tel));
        }
      },
      deep: true,
    },
  },
  methods: {
    createOrder() {
      this.emitter.emit('emitCreateOrder', this.form);
    },
    clearFocus(ref) {
      document.getElementById(ref).focus();
    },
    addConveyance() {
      if (this.conveyance) {
        this.conveyance = !this.conveyance;
      } else {
        this.emitter.emit('isLoading', true);
        setTimeout(() => {
          this.emitter.emit('isLoading', false);
          this.conveyance = !this.conveyance;
        }, 1500);
      }
    },
    agreeTerm(value) {
      return value ? true : '服務條款 和 隱私政策 須同意接受';
    },
  },
  activated() {
    this.emitter.emit('upDatePayment');
  },
  created() {
    this.emitter.on('emitToAdd', (item) => {
      this.form.message.payment = JSON.parse(JSON.stringify(item[0]));
      this.conveyanceCost = JSON.parse(JSON.stringify(item[1]));
    });
    this.emitter.emit('upDatePayment');
    this.emitter.on('upDateCart', (item) => {
      this.cart = JSON.parse(JSON.stringify(item[0]));
      this.showCart = JSON.parse(JSON.stringify(item[1]));
      this.tempShowCart = JSON.parse(JSON.stringify(item[2]));
    });
    this.emitter.on('upDateQty', (qty) => {
      this.qty = qty;
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

.home-container {
  display: grid;
  grid-gap: 2.5rem;
  grid-template-columns: 1fr;

  .order-information-wrapper {
    border: 1px solid $gray-250;
    border-radius: 0.25rem;

    .order-btn {
      font-weight: 500;
      @include font-xl;

      transition: box-shadow 150ms ease-in-out, color 150ms ease-in-out;

      &:focus {
        box-shadow: none;
      }

      &:hover {
        color: $gray-600;
      }

      &:active {
        color: $gray-900;
        box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
      }

      div {
        &:last-child {
          font-weight: 400;
          @include font-lg;
        }
      }
    }

    .web {
      @include sm {
        display: none;
      }

      .list-head,
      .list-card {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: 10rem 3fr 10rem 1fr 1fr;
      }

      .list-head {
        border-top: 1px solid $gray-250;
        border-bottom: 1px solid $gray-250;
        padding: 0.25rem 1rem;

        & > div {
          text-align: center;
        }
      }

      .list-card {
        position: relative;

        margin: -1px;
        border: 1px solid transparent;
        border-bottom: 1px solid $gray-250;
        padding: 1rem;

        transition: border 150ms ease-in-out;

        .product-infor {
          display: flex;
          flex-direction: column;
          justify-content: center;

          .title {
            margin-bottom: 0.5rem;
            font-weight: 500;
            white-space: normal;
            @include font-md;
          }

          .color,
          .size {
            font-weight: 500;
            color: $gray-600;
            @include font-sm;

            span {
              font-weight: 400;
            }
          }

          .color {
            margin-bottom: 0.125rem;
          }
        }

        .align-box {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .mobile {
      display: none;

      @include sm {
        display: grid;

        border-top: 1px solid $gray-250;
      }

      .list-card {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: 8rem 1fr 5rem;

        border-bottom: 1px solid $gray-250;
        padding: 1rem;
        @include xs {
          grid-gap: 0.5rem;
          grid-template-columns: 8rem 1fr;
        }

        .img-box {
          display: flex;
          align-items: center;
          grid-row-start: 1;
          grid-row-end: 3;

          @include xs {
            align-items: flex-start;
            grid-row-end: 2;
          }
        }

        .product-infor {
          grid-row-start: 1;
          grid-row-end: 2;
          grid-column-start: 2;
          grid-column-end: 4;

          @include xs {
            grid-column-end: 3;
          }

          .title {
            margin-bottom: 1rem;
            font-weight: 500;
            white-space: normal;
            @include font-md;
          }

          .infor-text {
            font-weight: 500;
            color: $gray-600;
            @include font-sm;

            span {
              font-weight: 400;
            }
          }
        }

        .qty-box {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .product-price {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          grid-row-start: 1;
          grid-row-end: 3;
          grid-column-start: 3;
          grid-column-end: 4;

          @include xs {
            grid-row-start: 2;
            grid-row-end: 3;
            grid-column-start: 2;
            grid-column-end: 3;
          }

          .price-text {
            display: flex;
            justify-content: space-between;

            span {
              color: $gray-600;
            }
          }
        }
      }
    }

    .order-price {
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: 3fr 2fr;

      border-bottom: 1px solid $gray-250;
      @include lg {
        grid-template-columns: 1fr 1fr;
      }
      @include md {
        grid-template-columns: 1fr 2fr;
      }
      @include sm {
        grid-template-columns: 1fr;
      }

      .item-wrapper {
        grid-column-start: 2;
        grid-column-end: 3;

        @include sm {
          grid-column-start: 1;
          grid-column-end: 2;
        }

        .item-body {
          padding: 1rem;
          color: $gray-600;

          .text-content,
          .total {
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

            .oder-text {
              align-items: baseline;

              .text-oder {
                @include font-lg;
              }
            }
          }
        }
      }
    }
  }

  form {
    display: grid;
    grid-column-gap: 2rem;
    grid-row-gap: 2.5rem;
    grid-template-columns: repeat(2, 1fr);

    @include sm {
      grid-template-columns: 1fr;
      grid-gap: 1.5rem;
    }

    .item-group {
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: 1fr;
      @include sm {
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

            &.divider {
              border-bottom: 1px solid $gray-250;
              padding-bottom: 1rem;
            }

            &.disabled {
              pointer-events: none;
            }

            .text-red {
              color: $red-500;
            }

            .text-gray {
              font-weight: 500;
              color: $gray-900;
            }

            .form-input-group {
              position: relative;

              &.inputClear:hover {
                .btn-close {
                  visibility: visible;

                  opacity: 1;

                  transition: visibility 150ms ease-in-out, opacity 150ms ease-in-out;
                }
              }

              .form-control,
              .form-select {
                border-color: $gray-250;
                padding-right: 32px;
                font-weight: 500;
                color: $gray-900;

                transition: border 150ms ease-in-out, box-shadow 150ms ease-in-out;

                &::placeholder {
                  font-weight: 400;
                  color: $gray-500;
                }

                &:hover {
                  border-color: $color-border-active;
                }

                &:focus {
                  border-color: $color-border-active;
                  box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
                }

                &:focus + .btn-close {
                  visibility: visible;

                  opacity: 1;

                  transition: visibility 150ms ease-in-out, opacity 150ms ease-in-out;
                }

                &.is-invalid {
                  border-color: #dc3545;
                  padding-right: calc(1.5em + 32px);

                  &:hover {
                    border-color: #dc3545;
                  }

                  &:focus {
                    border-color: #dc3545;
                    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
                  }
                }

                &.is-invalid + .btn-close {
                  margin-right: calc(1.5em + 4px);
                }
              }

              .btn-close {
                visibility: hidden;
                position: absolute;
                top: 1.1875rem;
                right: 0;

                margin-right: 4px;
                opacity: 0;
                transform: translateY(-50%);

                transition: visibility 150ms ease-in-out, opacity 150ms ease-in-out,
                  box-shadow 150ms ease-in-out;

                &:active {
                  box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
                }
              }
            }
          }

          .form-label {
            display: flex;
            align-items: center;

            img {
              width: 1.5rem;
              height: 1.5rem;
              margin-right: 0.5rem;
            }
          }

          .conveyance-btn {
            color: #ffffff;
            background: $gray-500;

            transition: opacity 150ms ease-in-out, box-shadow 150ms ease-in-out;

            &:focus {
              box-shadow: none;
            }

            &:hover {
              opacity: 0.7;
            }

            &:active {
              opacity: 1;
              box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
            }
          }

          .card-group {
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            margin-top: 1rem;

            gap: 1rem;

            .form-group {
              margin: 0;
            }
          }

          .form-check-group {
            display: flex;
            align-items: center;

            color: $color-main;

            transition: color 150ms ease-in-out;

            &:hover {
              color: $color-main-light-hover;
            }

            &:active {
              color: $color-main-active;
            }

            .form-check-input {
              margin-right: 0.5rem;
              border-color: $gray-500;

              &:focus {
                border-color: none;
                box-shadow: none;
              }

              &:checked {
                border-color: $color-main;
                background-color: $color-main;
              }
            }

            .text-decoration-underline {
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .checkout-wrapper {
    grid-column-start: 1;
    grid-column-end: 3;

    border: 1px solid $gray-250;
    border-radius: 0.25rem;
    @include sm {
      grid-column-start: 1;
      grid-column-end: 2;
    }

    .form-check-group {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      color: $gray-600;

      transition: color 150ms ease-in-out;
      &:not(:first-child) {
        margin-top: 0.25rem;
      }

      .form-check-input {
        margin-right: 0.5rem;

        &:focus {
          border-color: #adb5bd;
          box-shadow: none;
        }

        &:checked {
          border-color: $color-main;
          background-color: $color-main;
        }
      }

      .text-decoration-underline {
        color: $color-main;

        cursor: pointer;
      }
    }

    .link-wrapper {
      display: grid;
      grid-gap: 4.5rem;
      grid-template-columns: repeat(2, 1fr);

      padding: 1rem;
      @include sm {
        grid-template-columns: 1fr;
        grid-gap: 0;
        button {
          grid-row-start: 1;
          grid-row-end: 2;
        }
        .d-flex {
          justify-content: center;
          margin-top: 1rem;
        }
      }

      &:last-child {
        border-top: 1px solid $gray-250;
      }

      .checkout {
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
      .d-flex {
        color: $gray-600;
        .text-reset {
          transition: opacity 150ms ease-in-out;
          i {
            margin-right: 0.5rem;
          }

          &:hover {
            opacity: 0.7;
          }

          &:active {
            opacity: 1;
          }
        }
      }
    }
  }

  .remark-message {
    grid-column-start: 1;
    grid-column-end: 3;

    border: 1px solid $gray-250;
    border-radius: 0.25rem;
    padding: 1rem;
    white-space: normal;
    color: $gray-600;
    @include sm {
      grid-column-start: 1;
      grid-column-end: 2;
    }

    ul {
      margin: 0;
      padding: 0 0 0 1.07rem;
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
  }
}
</style>
