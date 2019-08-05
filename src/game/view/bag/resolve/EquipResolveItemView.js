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
    var EquipResolveItemView = (function (_super) {
        __extends(EquipResolveItemView, _super);
        function EquipResolveItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.EquipResolveItemSkin";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
            return _this;
        }
        EquipResolveItemView.prototype.dataChanged = function () {
            var _this = this;
            if (this.data == null) {
                return;
            }
            var e_bag = Singleton.Get(BagManager).m_equip_bag;
            var equip_id = (this.data.bag_equip_idx >= 0) ? e_bag[this.data.bag_equip_idx] : -1;
            this.setItem(equip_id);
            var tw = egret.Tween.get(this);
            tw.wait(this.data.idx * 30).call(function () {
                UtilsEffect.buttonEffect(_this.imgIcon);
            }, this);
        };
        EquipResolveItemView.prototype.setItem = function (item_id) {
            if (item_id < 0) {
                this.groupEmpty.visible = true;
                this.groupIcon.visible = false;
                this.labName.visible = false;
                return;
            }
            this.groupEmpty.visible = false;
            this.groupIcon.visible = true;
            this.labName.visible = true;
            var item_entity = Template.item.get(item_id);
            if (item_entity == null) {
                egret.error("can't get item entity, item id: " + item_id);
                return;
            }
            ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(item_entity.iStar));
            ResManager.AsyncSetTexture(this.imgIcon, item_entity.iIcon);
            this.labName.text = Template.getGUIText(item_entity.iName);
        };
        EquipResolveItemView.prototype.onClick = function (e) {
            Singleton.Get(LayerManager).getView(ui.EquipResolveSelView).open();
        };
        return EquipResolveItemView;
    }(eui.ItemRenderer));
    ui.EquipResolveItemView = EquipResolveItemView;
    __reflect(EquipResolveItemView.prototype, "ui.EquipResolveItemView");
})(ui || (ui = {}));
//# sourceMappingURL=EquipResolveItemView.js.map