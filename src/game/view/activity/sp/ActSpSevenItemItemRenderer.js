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
    var E_ActSpSevenItemItemRenderer_SIZE;
    (function (E_ActSpSevenItemItemRenderer_SIZE) {
        E_ActSpSevenItemItemRenderer_SIZE[E_ActSpSevenItemItemRenderer_SIZE["M"] = 0] = "M";
        E_ActSpSevenItemItemRenderer_SIZE[E_ActSpSevenItemItemRenderer_SIZE["S"] = 1] = "S";
    })(E_ActSpSevenItemItemRenderer_SIZE = ui.E_ActSpSevenItemItemRenderer_SIZE || (ui.E_ActSpSevenItemItemRenderer_SIZE = {}));
    var ActSpSevenItemItemRenderer = (function (_super) {
        __extends(ActSpSevenItemItemRenderer, _super);
        function ActSpSevenItemItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ActSpSevenItemItemRenderer_S";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        ActSpSevenItemItemRenderer.prototype.onAddToStage = function () {
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        ActSpSevenItemItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        ActSpSevenItemItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var sub_size;
            switch (this.data.size) {
                case E_ActSpSevenItemItemRenderer_SIZE.M:
                    this.skinName = "yw.ActSpSevenItemItemRenderer_M";
                    sub_size = ui.E_COMMON_ITEM_RENDERER_SIZE.S;
                    break;
                default:
                    this.skinName = "yw.ActSpSevenItemItemRenderer_S";
                    sub_size = ui.E_COMMON_ITEM_RENDERER_SIZE.XS;
                    break;
            }
            // 设定道具本体
            this.compItem.data = {
                item_id: this.data.item_id,
                count: this.data.count,
                size: sub_size
            };
            this.mcEff.clearMovieClip();
            var cfg_item = Template.item.get(this.data.item_id);
            if (!cfg_item) {
                if (this.data.item_id == -1) {
                    this.labName.text = DEFINE.UI_ALERT_INFO.diamond.name;
                    this.labName.textColor = Common.getItemNameColor(5);
                }
                else if (this.data.item_id == -2) {
                    this.labName.text = DEFINE.UI_ALERT_INFO.gold.name;
                    this.labName.textColor = Common.getItemNameColor(5);
                }
                else {
                    console.error("no item: " + this.data.item_id);
                }
            }
            else {
                // 设定道具名称
                this.labName.text = Template.getGUIText(cfg_item.iName);
                this.labName.textColor = Common.getItemNameColor(cfg_item.iStar);
                // 设定特效
                var eff_name = Common.getItemEffName(cfg_item.iStar);
                if (eff_name.length > 0) {
                    this.mcEff.setMovieClip(eff_name);
                    this.mcEff.gotoAndPlay(eff_name, -1);
                }
            }
        };
        ActSpSevenItemItemRenderer.prototype.onClick_btnHandler = function () {
            DropUtil.openDrop(this.data.item_id);
        };
        return ActSpSevenItemItemRenderer;
    }(eui.ItemRenderer));
    ui.ActSpSevenItemItemRenderer = ActSpSevenItemItemRenderer;
    __reflect(ActSpSevenItemItemRenderer.prototype, "ui.ActSpSevenItemItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=ActSpSevenItemItemRenderer.js.map