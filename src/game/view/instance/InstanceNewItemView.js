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
    var InstanceNewItemView = (function (_super) {
        __extends(InstanceNewItemView, _super);
        function InstanceNewItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.InstanceNewItemSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED, _this.onRemoveFromStage, _this);
            return _this;
        }
        InstanceNewItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.setData(this.data.id);
        };
        InstanceNewItemView.prototype.setData = function (id) {
            var item = Template.item.get(id);
            if (item == undefined) {
                egret.error("can't find item entity, item id: " + item);
                return;
            }
            ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(item.iStar));
            ResManager.AsyncSetTexture(this.imgIcon, item.iIcon);
            this.imgFrag.visible = Common.isItemFrag(item.iType);
        };
        InstanceNewItemView.prototype.onAddToStage = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        InstanceNewItemView.prototype.onRemoveFromStage = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        InstanceNewItemView.prototype.onClick = function () {
            DropUtil.openDrop(this.data.id, { ignore_equip_frag: true, ignore_role_frag: true });
        };
        return InstanceNewItemView;
    }(eui.ItemRenderer));
    ui.InstanceNewItemView = InstanceNewItemView;
    __reflect(InstanceNewItemView.prototype, "ui.InstanceNewItemView");
})(ui || (ui = {}));
//# sourceMappingURL=InstanceNewItemView.js.map