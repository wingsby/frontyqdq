var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var E_COMMON_ITEM_RENDERER_SIZE;
    (function (E_COMMON_ITEM_RENDERER_SIZE) {
        E_COMMON_ITEM_RENDERER_SIZE[E_COMMON_ITEM_RENDERER_SIZE["XS"] = 0] = "XS";
        E_COMMON_ITEM_RENDERER_SIZE[E_COMMON_ITEM_RENDERER_SIZE["S64"] = 1] = "S64";
        E_COMMON_ITEM_RENDERER_SIZE[E_COMMON_ITEM_RENDERER_SIZE["S"] = 2] = "S";
        E_COMMON_ITEM_RENDERER_SIZE[E_COMMON_ITEM_RENDERER_SIZE["M"] = 3] = "M";
        E_COMMON_ITEM_RENDERER_SIZE[E_COMMON_ITEM_RENDERER_SIZE["LEFT_M"] = 4] = "LEFT_M";
    })(E_COMMON_ITEM_RENDERER_SIZE = ui.E_COMMON_ITEM_RENDERER_SIZE || (ui.E_COMMON_ITEM_RENDERER_SIZE = {}));
    var CommonItemRenderer = (function (_super) {
        __extends(CommonItemRenderer, _super);
        function CommonItemRenderer() {
            return _super.call(this) || this;
        }
        CommonItemRenderer.prototype.dataChanged = function () {
            if (this.data == undefined) {
                return;
            }
            switch (this.data.size) {
                case E_COMMON_ITEM_RENDERER_SIZE.LEFT_M:
                    this.skinName = "yw.comp.CommonItemSkin_LEFT_M";
                    break;
                case E_COMMON_ITEM_RENDERER_SIZE.M:
                    this.skinName = "yw.comp.CommonItemSkin_M";
                    break;
                case E_COMMON_ITEM_RENDERER_SIZE.S64:
                    this.skinName = "yw.comp.CommonItemSkin_S64";
                    break;
                case E_COMMON_ITEM_RENDERER_SIZE.S:
                    this.skinName = "yw.comp.CommonItemSkin_S";
                    break;
                default:
                    this.skinName = "yw.comp.CommonItemSkin_XS";
                    break;
            }
            this.setInfo(this.data.item_id, this.data.count);
        };
        /**
         * 设定物品信息
         * item_id为-1时，代表钻石
         * item_id为-2时，代表金币
         * @param item_id
         * @param count
         */
        CommonItemRenderer.prototype.setInfo = function (item_id, count) {
            if (item_id == -1) {
                ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.diamond.resPNG);
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(5));
                this.imgFrag.visible = false;
            }
            else if (item_id == -2) {
                ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.gold.resPNG);
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(5));
                this.imgFrag.visible = false;
            }
            else if (item_id == -3) {
                ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.exp.resPNG);
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(5));
                this.imgFrag.visible = false;
            }
            else {
                var item_info = Template.item.get(item_id);
                if (item_info == undefined) {
                    egret.error("no itemId: " + item_id);
                    return;
                }
                ResManager.AsyncSetTexture(this.imgIcon, item_info.iIcon);
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(item_info.iStar));
                this.imgFrag.visible = Common.isItemFrag(item_info.iType);
            }
            this.labCount.text = "x" + UtilsGame.numberToString(count);
            this.labCount.visible = this.data.count > 0;
        };
        return CommonItemRenderer;
    }(eui.ItemRenderer));
    ui.CommonItemRenderer = CommonItemRenderer;
    __reflect(CommonItemRenderer.prototype, "ui.CommonItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=CommonItemRenderer.js.map