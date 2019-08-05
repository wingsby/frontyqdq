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
    var ActInnerItemView_ItemWithName = (function (_super) {
        __extends(ActInnerItemView_ItemWithName, _super);
        function ActInnerItemView_ItemWithName() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ActInnerItemSkin_ItemWithName";
            return _this;
        }
        ActInnerItemView_ItemWithName.prototype.dataChanged = function () {
            if (!this.data) {
                return;
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
        ActInnerItemView_ItemWithName.prototype.setInfo = function (item_id, count) {
            this.mcEff.clearMovieClip();
            if (item_id == -1) {
                ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.diamond.resPNG);
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(5));
                this.imgFrag.visible = false;
                this.labName.text = DEFINE.UI_ALERT_INFO.diamond.name;
            }
            else if (item_id == -2) {
                ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.gold.resPNG);
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(5));
                this.imgFrag.visible = false;
                this.labName.text = DEFINE.UI_ALERT_INFO.gold.name;
            }
            else {
                var cfg_item = Template.item.get(item_id);
                if (cfg_item == undefined) {
                    egret.error("no itemId: " + item_id);
                    return;
                }
                ResManager.AsyncSetTexture(this.imgIcon, cfg_item.iIcon);
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(cfg_item.iStar));
                this.imgFrag.visible = Common.isItemFrag(cfg_item.iType);
                this.labName.text = Template.getGUIText(cfg_item.iName);
                // 设定图标特效
                var eff_name = Common.getItemEffName(cfg_item.iStar);
                if (eff_name.length > 0) {
                    this.mcEff.setMovieClip(eff_name);
                    this.mcEff.gotoAndPlay(eff_name, -1);
                }
            }
            this.labCount.text = "x" + UtilsGame.numberToString(count);
            this.labCount.visible = this.data.count > 0;
        };
        return ActInnerItemView_ItemWithName;
    }(eui.ItemRenderer));
    ui.ActInnerItemView_ItemWithName = ActInnerItemView_ItemWithName;
    __reflect(ActInnerItemView_ItemWithName.prototype, "ui.ActInnerItemView_ItemWithName");
})(ui || (ui = {}));
//# sourceMappingURL=ActInnerItemView_ItemWithName.js.map