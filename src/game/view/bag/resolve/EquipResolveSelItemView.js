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
    var EquipResolveSelItemView = (function (_super) {
        __extends(EquipResolveSelItemView, _super);
        function EquipResolveSelItemView() {
            var _this = _super.call(this) || this;
            _this.is_sel = false;
            _this.skinName = "yw.EquipResolveSelItemSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            _this.setSel(false);
            return _this;
        }
        EquipResolveSelItemView.prototype.onAddToStage = function (e) {
            this.btnCb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCb, this);
        };
        EquipResolveSelItemView.prototype.onRemoveFromStage = function (e) {
            this.btnCb.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCb, this);
        };
        EquipResolveSelItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var bag_mgr = Singleton.Get(BagManager);
            var equip_id = bag_mgr.m_equip_bag[this.data.bag_equip_idx];
            this.setItem(equip_id);
            this.setSel(this.data.is_sel);
            this.alpha = 0;
            var tw = egret.Tween.get(this);
            tw.to({ alpha: 1 }, 80);
        };
        EquipResolveSelItemView.prototype.setItem = function (item_id) {
            var item_entity = Template.item.get(item_id);
            var equip_entity = Template.equip.get(item_id);
            ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(item_entity.iStar));
            ResManager.AsyncSetTexture(this.imgIcon, item_entity.iIcon);
            this.labName.text = Template.getGUIText(item_entity.iName);
            if (equip_entity.Basics[0] > 0) {
                this.labAttr1.text = UtilsGame.stringHander(RoleUtil.GetAttrString(equip_entity.Basics[0]), equip_entity.BasicsValue[0]);
            }
            else {
                this.labAttr1.text = "";
            }
            if (equip_entity.Basics[1] > 0) {
                this.labAttr2.text = UtilsGame.stringHander(RoleUtil.GetAttrString(equip_entity.Basics[1]), equip_entity.BasicsValue[1]);
            }
            else {
                this.labAttr2.text = "";
            }
        };
        EquipResolveSelItemView.prototype.setSel = function (is_sel) {
            this.imgCbS.visible = is_sel;
            this.is_sel = is_sel;
            if (this.data) {
                this.data.is_sel = is_sel;
            }
            UtilsEffect.buttonEffect(this.cb);
        };
        EquipResolveSelItemView.prototype.onClick_btnCb = function (e) {
            if (!this.is_sel) {
                if (Singleton.Get(LayerManager).getView(ui.EquipResolveSelView).checkSelMax()) {
                    Singleton.Get(DialogControler).showInfo(1145); // 选择的装备已达分解槽上限
                    return;
                }
            }
            this.setSel(!this.is_sel);
            Singleton.Get(LayerManager).getView(ui.EquipResolveSelView).setSel(this.data.bag_equip_idx, this.is_sel);
        };
        return EquipResolveSelItemView;
    }(eui.ItemRenderer));
    ui.EquipResolveSelItemView = EquipResolveSelItemView;
    __reflect(EquipResolveSelItemView.prototype, "ui.EquipResolveSelItemView");
})(ui || (ui = {}));
//# sourceMappingURL=EquipResolveSelItemView.js.map