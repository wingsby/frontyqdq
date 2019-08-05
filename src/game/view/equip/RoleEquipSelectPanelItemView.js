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
    var RoleEquipSelectPanelItemView = (function (_super) {
        __extends(RoleEquipSelectPanelItemView, _super);
        /**
         * 构造函数
         */
        function RoleEquipSelectPanelItemView() {
            var _this = _super.call(this) || this;
            _this.equip_id = 0;
            _this.role_id = 0;
            _this.skinName = "yw.RoleEquipSelectPanelItemSkin";
            _this.cacheAsBitmap = true;
            _this.init();
            return _this;
        }
        /**
         * 响应创建子对象
         */
        RoleEquipSelectPanelItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 初始化
         */
        RoleEquipSelectPanelItemView.prototype.init = function () {
            this.btnEquip.text = Template.getGUIText("ui_equip10");
            this.btnEquip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquip, this);
        };
        /**
         * 析构（手动调用）
         */
        RoleEquipSelectPanelItemView.prototype.dispose = function () {
            this.btnEquip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquip, this);
        };
        /**
         * 响应数据变化
         */
        RoleEquipSelectPanelItemView.prototype.dataChanged = function () {
            // 获取data
            if (this.data == null) {
                return;
            }
            this.role_id = this.data.role_id;
            this.equip_id = this.data.equip_id;
            if (this.equip_id <= 0) {
                egret.error("no equipId: " + this.equip_id);
                return;
            }
            var item_info = Template.item.get(this.equip_id);
            if (item_info == null) {
                egret.error("no itemId: " + this.equip_id);
                return;
            }
            var equip_info = Template.equip.get(this.equip_id);
            if (equip_info == null) {
                egret.error("no equipId: " + this.equip_id);
                return;
            }
            ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(item_info.iStar));
            ResManager.AsyncSetTexture(this.imgIcon, item_info.iIcon);
            this.labName.text = Template.getGUIText(item_info.iName);
            this.labName.textColor = Common.getItemNameColor(item_info.iStar);
            if (equip_info.Basics[0] > 0) {
                this.labAttr1.text = UtilsGame.stringHander(RoleUtil.GetAttrString(equip_info.Basics[0]), equip_info.BasicsValue[0]);
            }
            else {
                this.labAttr1.text = "";
            }
            if (equip_info.Basics[1] > 0) {
                this.labAttr2.text = UtilsGame.stringHander(RoleUtil.GetAttrString(equip_info.Basics[1]), equip_info.BasicsValue[1]);
            }
            else {
                this.labAttr2.text = "";
            }
        };
        /**
         * 响应点击装备按钮
         */
        RoleEquipSelectPanelItemView.prototype.onClick_btnEquip = function () {
            Singleton.Get(EquipManager).onReqChange(this.role_id, this.equip_id);
            Singleton.Get(LayerManager).getView(ui.RoleEquipSelectPanelView).close();
        };
        return RoleEquipSelectPanelItemView;
    }(eui.ItemRenderer));
    ui.RoleEquipSelectPanelItemView = RoleEquipSelectPanelItemView;
    __reflect(RoleEquipSelectPanelItemView.prototype, "ui.RoleEquipSelectPanelItemView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleEquipSelectPanelItemView.js.map