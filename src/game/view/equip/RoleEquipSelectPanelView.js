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
     * 主将选择界面
     */
    var RoleEquipSelectPanelView = (function (_super) {
        __extends(RoleEquipSelectPanelView, _super);
        // endregion
        // region 生命周期管理
        function RoleEquipSelectPanelView() {
            var _this = _super.call(this, "yw.RoleEquipSelectPanelSkin") || this;
            // 状态变量
            _this.role_id = 0; // 穿戴装备的角色id
            _this.pos = 0; // 装备槽位id
            _this.init();
            _this.initGuiText();
            return _this;
        }
        RoleEquipSelectPanelView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        RoleEquipSelectPanelView.prototype.componentCreated = function () {
        };
        /**
         * 初始化
         */
        RoleEquipSelectPanelView.prototype.init = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.listEquips.itemRenderer = ui.RoleEquipSelectPanelItemView;
        };
        RoleEquipSelectPanelView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        RoleEquipSelectPanelView.prototype.onUpdate = function (time) {
        };
        RoleEquipSelectPanelView.prototype.initGuiText = function () {
            this.labTitle.text = "选择装备"; //todo 字典
        };
        /**
         * 响应添加到舞台
         */
        RoleEquipSelectPanelView.prototype.onAddToStage = function () {
        };
        /**
         * 响应从舞台中移除
         */
        RoleEquipSelectPanelView.prototype.onRemoveFromStage = function () {
        };
        // endregion
        // region 显示隐藏
        /**
         * 显示
         */
        RoleEquipSelectPanelView.prototype.open = function (role_id, pos) {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.role_id = role_id;
            this.pos = pos;
            this.initList();
            if (this.compEmpty.visible) {
                this.compEmpty.playAni();
            }
        };
        /**
         * 隐藏
         */
        RoleEquipSelectPanelView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        /**
         * 响应点击关闭按钮
         */
        RoleEquipSelectPanelView.prototype.onClick_btnClose = function () {
            this.close();
        };
        // endregion
        // region 装备信息
        /**
         * 初始化装备信息
         */
        RoleEquipSelectPanelView.prototype.initList = function () {
            var equips = Singleton.Get(BagManager).getEquipBagByPos(this.pos);
            equips.sort(Common.sortItems);
            equips.reverse();
            var ds_list_items = [];
            this.listEquips.dataProvider = new eui.ArrayCollection(ds_list_items);
            for (var i = 0; i < equips.length; i++) {
                ds_list_items.push({
                    role_id: this.role_id,
                    equip_id: equips[i]
                });
            }
            this.checkEmpty(ds_list_items);
        };
        // region 空包提示
        RoleEquipSelectPanelView.prototype.checkEmpty = function (data) {
            if (!data || data.length <= 0) {
                this.compEmpty.visible = true;
                this.compEmpty.text = "没有可选择的装备";
            }
            else {
                this.compEmpty.visible = false;
            }
        };
        return RoleEquipSelectPanelView;
    }(PopupUI));
    ui.RoleEquipSelectPanelView = RoleEquipSelectPanelView;
    __reflect(RoleEquipSelectPanelView.prototype, "ui.RoleEquipSelectPanelView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleEquipSelectPanelView.js.map