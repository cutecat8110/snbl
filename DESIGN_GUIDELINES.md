# SNBL｜介面設計規範

以目前實作為基準，保留作品自己的視覺。更新日期：2026-10-18。

| 層級 | 規則與維護位置 |
| --- | --- |
| 基礎來源 | src/assets/stylesheets/custom/_variable.scss、helpers/_variables.scss、custom/_reuse.scss。 |
| 色彩、字級與尺寸 | 主色 #DB4D6D、hover #C9385A、active #BD2B4D；字級 mixin 14／16／20／24／30px。沿用 Bootstrap 斷點與商品圖比例。 |
| 共用元件 | FavoriteButton 統一 ProductCard／ProductForm 收藏；Front Pagination 管理分頁；CartList 與 ProductForm／ProductFormModal 數量控制使用一致中文名稱。 |
| 互動狀態與例外 | 收藏為原生按鈕並提供 aria-pressed，鍵盤 Space／Enter 可切換。分頁使用 disabled 與 aria-current；關閉及增減數量不朗讀套件英文圖示名稱。 |

## 修改原則

- 同類元件先改共用層；只有用途不同才保留密度或尺寸例外。
- 保留操作所需的欄位名稱、錯誤、等待、停用與離頁提醒，不在產品頁放設計／製作說明。
- 檢查鍵盤焦點、長文字、空資料、錯誤、桌面／手機切換；視覺修正需同時核對正常狀態。
- 不以整站換色、換框架或大量重構代替局部缺陷修正。

## 本輪核對

商品列表／詳情與手機選項浮層；原收藏為沒有明確名稱的連結，分頁停用主要靠外觀。

UI-20261018-01：抽出收藏按鈕、中文名稱與選取狀態；UI-20261018-02：分頁原生停用、當前頁語意；關閉與數量圖示補中文標籤。34 項回歸、lint、Node 16 正式建置通過。收藏切換後還原、分頁 1→2→1。

尺寸：320、390、768、1024、1440px。macOS Codex 內建瀏覽器、正式產物預覽；尺寸模擬，不是真機測試。這份文件是維護規範，並不代表所有可能狀態均已驗證。
