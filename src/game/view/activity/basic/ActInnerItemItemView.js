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
    /**
     * 活动通用列表道具ICON
     */
    var ActInnerItemItemView = (function (_super) {
        __extends(ActInnerItemItemView, _super);
        /**
         * @constructor
         */
        function ActInnerItemItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ActInnerItemItemSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        ActInnerItemItemView.prototype.onAddToStage = function () {
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ActInnerItemItemView.prototype.onRemoveFromStage = function () {
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        /**
         * 响应数据变更
         */
        ActInnerItemItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            // 设定道具图标
            this.setItem(this.data.item_id, this.data.count);
            // 播放入场动画
            // this.playAni();
        };
        /**
         * 设定道具
         */
        ActInnerItemItemView.prototype.setItem = function (item_id, count) {
            this.mcEff.clearMovieClip();
            // 获取道具配置
            var cfg_item = Template.item.get(item_id);
            if (!cfg_item) {
                if (item_id == -1) {
                    ResManager.AsyncSetTexture(this.imgTier, DEFINE.UI_ALERT_INFO.gold.tierPNG, undefined, undefined, true);
                    ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.gold.resPNG, undefined, undefined, true);
                    this.labName.text = DEFINE.UI_ALERT_INFO.gold.name;
                    this.labName.textColor = Common.getItemNameColor(5);
                }
                else if (item_id == -2) {
                    ResManager.AsyncSetTexture(this.imgTier, DEFINE.UI_ALERT_INFO.diamond.tierPNG, undefined, undefined, true);
                    ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.diamond.resPNG, undefined, undefined, true);
                    this.labName.text = DEFINE.UI_ALERT_INFO.diamond.name;
                    this.labName.textColor = Common.getItemNameColor(5);
                }
                else {
                    console.log("no item: " + item_id);
                }
                this.imgFrag.visible = false;
            }
            else {
                // 设定道具信息
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(cfg_item.iStar), undefined, undefined, true);
                ResManager.AsyncSetTexture(this.imgIcon, cfg_item.iIcon);
                // 设定碎片状态
                this.imgFrag.visible = (cfg_item.iType == ItemType.EquipFragment) || (cfg_item.iType == ItemType.RoleFragment);
                // 设定道具名称
                this.labName.text = Template.getGUIText(cfg_item.iName);
                this.labName.textColor = Common.getItemNameColor(cfg_item.iStar);
                // 设定图标特效
                var eff_name = Common.getItemEffName(cfg_item.iStar);
                if (eff_name.length > 0) {
                    this.mcEff.setMovieClip(eff_name);
                    this.mcEff.gotoAndPlay(eff_name, -1);
                }
            }
            // 设定道具数量
            if (this.data.count) {
                this.labCount.visible = true;
                this.labCount.text = UtilsGame.stringHander(Template.getGUIText("ui_activity1"), UtilsGame.numberToString(count));
            }
            else {
                this.labCount.visible = false;
            }
        };
        /**
         * 播放入场动画
         */
        ActInnerItemItemView.prototype.playAni = function () {
            this.groupRoot.alpha = 0;
            this.groupRoot.scaleX = 1.5;
            this.groupRoot.x = 60;
            var tw_root = egret.Tween.get(this.groupRoot);
            tw_root.wait((this.data.id + 1) * 50).to({ x: 0, alpha: 1, scaleX: 1 }, 80, egret.Ease.sineOut);
        };
        ActInnerItemItemView.prototype.onClick = function () {
            DropUtil.openDrop(this.data.item_id);
        };
        return ActInnerItemItemView;
    }(eui.ItemRenderer));
    ui.ActInnerItemItemView = ActInnerItemItemView;
    __reflect(ActInnerItemItemView.prototype, "ui.ActInnerItemItemView");
})(ui || (ui = {}));
//# sourceMappingURL=ActInnerItemItemView.js.map