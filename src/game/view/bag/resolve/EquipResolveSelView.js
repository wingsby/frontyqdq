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
    var EquipResolveSelView = (function (_super) {
        __extends(EquipResolveSelView, _super);
        function EquipResolveSelView() {
            var _this = _super.call(this, "yw.EquipResolveSelSkin") || this;
            _this.m_arr_equips = null;
            _this.sel_equips = [];
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        EquipResolveSelView.prototype.componentCreated = function () {
        };
        EquipResolveSelView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        EquipResolveSelView.prototype.onUpdate = function (time) {
        };
        EquipResolveSelView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initView();
            if (this.compEmpty.visible) {
                this.compEmpty.playAni();
            }
        };
        EquipResolveSelView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        EquipResolveSelView.prototype.onAddToStage = function (e) {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCancel, this);
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
            this.sel_equips = UtilsGame.cloneObject(Singleton.Get(BagManager).m_resolve_equips);
            this.m_arr_equips = new eui.ArrayCollection();
            this.dgEquips.dataProvider = this.m_arr_equips;
            this.dgEquips.itemRenderer = ui.EquipResolveSelItemView;
        };
        EquipResolveSelView.prototype.onRemoveFromStage = function (e) {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCancel, this);
            this.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
            this.sel_equips = [];
            this.m_arr_equips.removeAll();
        };
        EquipResolveSelView.prototype.initView = function () {
            var bag = Singleton.Get(BagManager);
            // 是否显示为空提示
            this.compEmpty.visible = (bag.m_equip_bag.length <= 0);
            this.compEmpty.text = "背包中没有可分解的装备";
            var arr = [];
            for (var i = 0; i < bag.m_equip_bag.length; i++) {
                arr.push({
                    idx: i,
                    bag_equip_idx: i,
                    is_sel: !(this.getSelId(i) < 0) // 小于0即为未选中
                });
            }
            arr.sort(function (a, b) {
                // 选中的在前 未选中的在后
                if (a.is_sel && !b.is_sel) {
                    return -1;
                }
                if (!a.is_sel && b.is_sel) {
                    return 1;
                }
                // 品质低的在前 品质高的在后
                var a_item_id = bag.m_equip_bag[a.bag_equip_idx];
                var b_item_id = bag.m_equip_bag[b.bag_equip_idx];
                var a_info = Template.item.get(a_item_id);
                var b_info = Template.item.get(b_item_id);
                var a_star = a_info.iStar > 100 ? a_info.iStar - 100 : a_info.iStar;
                var b_star = b_info.iStar > 100 ? b_info.iStar - 100 : b_info.iStar;
                if (a_star > b_star) {
                    return 1;
                }
                else if (a_star < b_star) {
                    return -1;
                }
                if (a_info.iStar > b_info.iStar) {
                    return 1;
                }
                else if (a_info.iStar < b_info.iStar) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                else if (a < b) {
                    return -1;
                }
                return 0;
            });
            this.m_arr_equips.source = arr;
            // 更新已选中装备数量文字
            this.updateSelCount();
        };
        EquipResolveSelView.prototype.getSelId = function (bag_equip_idx) {
            for (var i = 0; i < this.sel_equips.length; i++) {
                if (this.sel_equips[i] == bag_equip_idx) {
                    return i;
                }
            }
            return -1;
        };
        EquipResolveSelView.prototype.checkSelMax = function () {
            return (this.sel_equips.length >= DEFINE.EQUIP_RESOLVE_MAX_ONCE);
        };
        EquipResolveSelView.prototype.setSel = function (bag_equip_idx, is_sel) {
            var selId = this.getSelId(bag_equip_idx);
            if (selId < 0) {
                // 装备未选中
                if (is_sel) {
                    this.sel_equips.push(bag_equip_idx);
                }
                else {
                    egret.error("select an unselected equip.");
                }
            }
            else {
                if (!is_sel) {
                    this.sel_equips.splice(selId, 1);
                }
                else {
                    egret.error("select an selected equip.");
                }
            }
            // 更新已选中装备数量文字
            this.updateSelCount();
            /**
            let log: string = "当前选择的装备：";
            for(let i: number = 0; i < this.sel_equips.length; i++) {
                let item_id: number = Singleton.Get(BagManager).m_equip_bag[this.sel_equips[i]];
                let item_entity: Entity.Item = Template.item.get(item_id);
                log += Template.getGUIText(item_entity.iName) + "[" + this.sel_equips[i] + "," + item_id + "], ";
            }
            console.log(log);
             **/
        };
        EquipResolveSelView.prototype.updateSelCount = function () {
            this.labSelCount.text = "已选中：" + this.sel_equips.length;
        };
        EquipResolveSelView.prototype.onClick_btnClose = function (e) {
            this.close();
        };
        EquipResolveSelView.prototype.onClick_btnCancel = function (e) {
            this.close();
        };
        EquipResolveSelView.prototype.onClick_btnConfirm = function (e) {
            Singleton.Get(BagManager).m_resolve_equips = UtilsGame.cloneObject(this.sel_equips);
            Singleton.Get(LayerManager).getView(ui.EquipResolveView).refresh();
            this.close();
        };
        return EquipResolveSelView;
    }(PopupUI));
    ui.EquipResolveSelView = EquipResolveSelView;
    __reflect(EquipResolveSelView.prototype, "ui.EquipResolveSelView");
})(ui || (ui = {}));
//# sourceMappingURL=EquipResolveSelView.js.map