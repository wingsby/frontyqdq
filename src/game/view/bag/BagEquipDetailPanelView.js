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
     * 装备详情界面
     */
    var BagEquipDetailPanelView = (function (_super) {
        __extends(BagEquipDetailPanelView, _super);
        // endregion
        // region 生命周期管理
        function BagEquipDetailPanelView() {
            var _this = _super.call(this, "yw.BagEquipDetailPanelSkin") || this;
            // 状态变量
            _this.role_id = 0; // 穿戴装备的角色id
            _this.equip_id = 0; // 装备id
            _this.roles = null;
            _this.init();
            _this.initGuiText();
            return _this;
        }
        BagEquipDetailPanelView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        BagEquipDetailPanelView.prototype.componentCreated = function () {
        };
        /**
         * 初始化
         */
        BagEquipDetailPanelView.prototype.init = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnStrength, this);
            this.btnRefine.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRefine, this);
            this.btnUnload.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnUnload, this);
            this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
            this.listSuitItems.itemRenderer = ui.BagListItemView;
            this.listSuitItems.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
        };
        BagEquipDetailPanelView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnStrength.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnStrength, this);
            this.btnRefine.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRefine, this);
            this.btnUnload.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnUnload, this);
            this.btnChange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
            this.listSuitItems.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
        };
        BagEquipDetailPanelView.prototype.onUpdate = function (time) {
        };
        BagEquipDetailPanelView.prototype.initGuiText = function () {
            this.labTitle.text = Template.getGUIText("ui_equip31");
            this.btnStrength.text = Template.getGUIText("ui_equip16");
            this.btnRefine.text = Template.getGUIText("ui_equip2");
            this.btnUnload.text = Template.getGUIText("ui_equip24");
            this.btnChange.text = Template.getGUIText("ui_equip23");
        };
        /**
         * 响应添加到舞台
         */
        BagEquipDetailPanelView.prototype.onAddToStage = function () {
            // TODO 初始化列表
        };
        /**
         * 响应从舞台中移除
         */
        BagEquipDetailPanelView.prototype.onRemoveFromStage = function () {
        };
        // endregion
        // region 显示隐藏
        /**
         * 显示
         */
        BagEquipDetailPanelView.prototype.open = function (equip_id, role_id, roles) {
            if (role_id === void 0) { role_id = 0; }
            if (roles === void 0) { roles = undefined; }
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.equip_id = equip_id;
            this.role_id = role_id;
            this.roles = roles;
            this.initDetail();
        };
        /**
         * 隐藏
         */
        BagEquipDetailPanelView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        /**
         * 响应点击关闭按钮
         */
        BagEquipDetailPanelView.prototype.onClick_btnClose = function () {
            this.close();
        };
        // endregion
        // region 装备信息
        /**
         * 初始化装备信息
         */
        BagEquipDetailPanelView.prototype.initDetail = function () {
            var role_id = this.role_id;
            if (role_id <= 0) {
                this.initBagEquipDetail();
            }
            else {
                this.initRoleEquipDetail();
            }
            var item_info = Template.item.get(this.equip_id);
            if (!item_info) {
                egret.error("no itemId: " + this.equip_id);
                return;
            }
            var equip_info = Template.equip.get(this.equip_id);
            if (!equip_info) {
                egret.error("no equipId: " + this.equip_id);
                return;
            }
            this.labEquipName.text = Template.getGUIText(item_info.iName);
            this.labEquipName.textColor = Common.getItemNameColor(item_info.iStar);
            ResManager.AsyncSetTexture(this.imgEquipTier, Common.getItemTierBgRes(item_info.iStar));
            ResManager.AsyncSetTexture(this.imgEquipIcon, item_info.iIcon);
        };
        /**
         * 初始化已装备的装备信息
         */
        BagEquipDetailPanelView.prototype.initRoleEquipDetail = function () {
            var role_id = this.role_id;
            var my_role = undefined;
            if (!this.roles) {
                my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            }
            else {
                my_role = this.roles.GetRole(role_id);
            }
            if (my_role == undefined) {
                egret.error("no roleId: " + role_id);
                return;
            }
            var equip_id = this.equip_id;
            var my_equip = my_role.getEquipById(equip_id);
            if (!my_equip) {
                egret.error("no equipId: " + equip_id);
                return;
            }
            if (!this.roles) {
                this.btnStrength.visible = true;
                this.btnRefine.visible = OpenManager.CheckOpen(OpenType.EquipRefine);
                this.btnUnload.visible = true;
                this.btnChange.visible = true;
                this.imgBgLong.visible = true;
                this.imgBgShort.visible = false;
            }
            else {
                this.btnStrength.visible = false;
                this.btnRefine.visible = false;
                this.btnUnload.visible = false;
                this.btnChange.visible = false;
                this.imgBgLong.visible = false;
                this.imgBgShort.visible = true;
            }
            var str_attr = my_equip.str_attr;
            this.labStrengthLv.text = my_equip.stg_lv.toString() + "/" + Singleton.Get(EquipManager).getMaxStrengthLv();
            this.labTxtStrengthAttr1.text = RoleUtil.GetAttrPrefixString(str_attr[0][0]);
            this.labStrengthAttr1.text = "+" + Common.attrValueHandlerWithPct(str_attr[0][1], str_attr[0][0]);
            if (str_attr.length >= 2) {
                this.labTxtStrengthAttr2.text = RoleUtil.GetAttrPrefixString(str_attr[1][0]);
                this.labStrengthAttr2.text = "+" + Common.attrValueHandlerWithPct(str_attr[1][1], str_attr[1][0]);
            }
            this.setAttrStr2Visible(str_attr);
            // 精炼属性
            if (my_equip.rfn_lv > 0) {
                var refine_attr = my_equip.refine_attr;
                this.labRefineLv.text = my_equip.rfn_lv.toString() + "/" + Singleton.Get(EquipManager).getMaxRefineLv();
                this.labTxtRefineAttr1.text = RoleUtil.GetAttrPrefixString(refine_attr[0][0]);
                this.labRefineAttr1.text = "+" + Common.attrValueHandlerWithPct(refine_attr[0][1], refine_attr[0][0]);
                if (refine_attr.length >= 2) {
                    this.labTxtRefineAttr2.visible = true;
                    this.labRefineAttr2.visible = true;
                    this.labTxtRefineAttr2.text = RoleUtil.GetAttrPrefixString(refine_attr[1][0]);
                    this.labRefineAttr2.text = "+" + Common.attrValueHandlerWithPct(refine_attr[1][1], refine_attr[1][0]);
                }
                else {
                    this.labTxtRefineAttr2.visible = false;
                    this.labRefineAttr2.visible = false;
                }
                this.setAttrRefine2Visible(refine_attr);
            }
            else {
                this.labRefineLv.text = "无";
                this.labTxtRefineAttr1.text = "";
                this.labRefineAttr1.text = "";
                this.labTxtRefineAttr2.text = "";
                this.labRefineAttr2.text = "";
            }
            var suit_info = Template.suit.get(my_equip.equip_info.SuitID);
            if (!suit_info) {
                egret.error("no suitId: " + my_equip.equip_info.SuitID);
                return;
            }
            this.labSuitName.text = Template.getGUIText(suit_info.Name);
            this.labSuitName.textColor = Common.getItemNameColor(suit_info.SuitStar);
            var ds_list_items = [];
            this.listSuitItems.dataProvider = new eui.ArrayCollection(ds_list_items);
            for (var i = 0; i < my_equip.equip_info.EquipSuit.length; i++) {
                var suit_item_id = my_equip.equip_info.EquipSuit[i];
                var is_active = my_role.getEquipById(suit_item_id) != undefined;
                ds_list_items.push({
                    item_id: my_equip.equip_info.EquipSuit[i],
                    active: is_active
                });
            }
            var suit_count = my_role.getSuitCount(equip_id);
            this.labTxtSuitAttr1.text = Template.getGUIText("ui_equip20");
            this.labSuitAttr1.text = this.generateAttr(suit_info.SuitAtt1, suit_info.SuitAttvalue1);
            this.labTxtSuitAttr1.textColor = this.labSuitAttr1.textColor = suit_count >= 2 ? DEFINE_COLOR.TEXT_ORANGE : DEFINE_COLOR.TEXT_GRAY;
            this.labTxtSuitAttr2.text = Template.getGUIText("ui_equip21");
            this.labSuitAttr2.text = this.generateAttr(suit_info.SuitAtt2, suit_info.SuitAttvalue2);
            this.labTxtSuitAttr2.textColor = this.labSuitAttr2.textColor = suit_count >= 3 ? DEFINE_COLOR.TEXT_ORANGE : DEFINE_COLOR.TEXT_GRAY;
            this.labTxtSuitAttr3.text = Template.getGUIText("ui_equip22");
            this.labSuitAttr3.text = this.generateAttr(suit_info.SuitAtt3, suit_info.SuitAttvalue3);
            this.labTxtSuitAttr3.textColor = this.labSuitAttr3.textColor = suit_count >= 4 ? DEFINE_COLOR.TEXT_ORANGE : DEFINE_COLOR.TEXT_GRAY;
        };
        /**
         * 初始化未装备的装备信息
         */
        BagEquipDetailPanelView.prototype.initBagEquipDetail = function () {
            var equip_id = this.equip_id;
            var my_equip = new EquipInfo();
            my_equip.equip_id = equip_id;
            my_equip.stg_lv = 0;
            my_equip.rfn_lv = 0;
            my_equip = my_equip.Clone();
            this.btnStrength.visible = false;
            this.btnRefine.visible = false;
            this.btnUnload.visible = false;
            this.btnChange.visible = false;
            this.imgBgLong.visible = false;
            this.imgBgShort.visible = true;
            var str_attr = my_equip.str_attr;
            this.labStrengthLv.text = my_equip.stg_lv.toString() + "/" + Singleton.Get(EquipManager).getMaxStrengthLv();
            this.labTxtStrengthAttr1.text = RoleUtil.GetAttrPrefixString(str_attr[0][0]);
            this.labStrengthAttr1.text = "+" + Common.attrValueHandlerWithPct(str_attr[0][1], str_attr[0][0]);
            if (str_attr.length >= 2) {
                this.labTxtStrengthAttr2.text = RoleUtil.GetAttrPrefixString(str_attr[1][0]);
                this.labStrengthAttr2.text = "+" + Common.attrValueHandlerWithPct(str_attr[1][1], str_attr[1][0]);
            }
            this.labRefineLv.text = "无";
            this.labTxtRefineAttr1.text = "";
            this.labRefineAttr1.text = "";
            this.labTxtRefineAttr2.text = "";
            this.labRefineAttr2.text = "";
            this.setAttrStr2Visible(str_attr);
            var suit_info = Template.suit.get(my_equip.equip_info.SuitID);
            if (!suit_info) {
                egret.error("no suitId: " + my_equip.equip_info.SuitID);
                return;
            }
            this.labSuitName.text = Template.getGUIText(suit_info.Name);
            this.labSuitName.textColor = Common.getItemNameColor(suit_info.SuitStar);
            var ds_list_items = [];
            this.listSuitItems.dataProvider = new eui.ArrayCollection(ds_list_items);
            for (var i = 0; i < my_equip.equip_info.EquipSuit.length; i++) {
                ds_list_items.push({
                    item_id: my_equip.equip_info.EquipSuit[i],
                    ani_idx: i,
                    active: false
                });
            }
            this.labTxtSuitAttr1.text = Template.getGUIText("ui_equip20");
            this.labSuitAttr1.text = this.generateAttr(suit_info.SuitAtt1, suit_info.SuitAttvalue1);
            this.labTxtSuitAttr1.textColor = this.labSuitAttr1.textColor = DEFINE_COLOR.TEXT_GRAY;
            this.labTxtSuitAttr2.text = Template.getGUIText("ui_equip21");
            this.labSuitAttr2.text = this.generateAttr(suit_info.SuitAtt2, suit_info.SuitAttvalue2);
            this.labTxtSuitAttr2.textColor = this.labSuitAttr2.textColor = DEFINE_COLOR.TEXT_GRAY;
            this.labTxtSuitAttr3.text = Template.getGUIText("ui_equip22");
            this.labSuitAttr3.text = this.generateAttr(suit_info.SuitAtt3, suit_info.SuitAttvalue3);
            this.labTxtSuitAttr3.textColor = this.labSuitAttr3.textColor = DEFINE_COLOR.TEXT_GRAY;
        };
        /**
         * 生成属性字符串
         * @param attrs 属性类型，需要和values一一对应
         * @param values 属性值
         * @returns {string}
         */
        BagEquipDetailPanelView.prototype.generateAttr = function (attrs, values) {
            var result = "";
            for (var i = 0; i < attrs.length; i++) {
                if (i > 0) {
                    result += "，";
                }
                result += UtilsGame.stringHander(RoleUtil.GetAttrString(attrs[i]), Common.attrValueHandler(values[i], attrs[i]));
            }
            return result;
        };
        /**
         * 设定第二条强化属性显隐
         * @param attrs
         */
        BagEquipDetailPanelView.prototype.setAttrStr2Visible = function (attrs) {
            if (attrs.length < 2) {
                this.labStrengthAttr2.visible = false;
                this.labTxtStrengthAttr2.visible = false;
            }
            else {
                this.labStrengthAttr2.visible = true;
                this.labTxtStrengthAttr2.visible = true;
            }
        };
        /**
         * 设定第二条精炼属性显隐
         * @param attrs
         */
        BagEquipDetailPanelView.prototype.setAttrRefine2Visible = function (attrs) {
            if (attrs.length < 2) {
                this.labRefineAttr2.visible = false;
                this.labTxtRefineAttr2.visible = false;
            }
            else {
                this.labRefineAttr2.visible = true;
                this.labTxtRefineAttr2.visible = true;
            }
        };
        // endregion
        // region 响应按钮点击事件
        /**
         * 响应点击强化按钮
         */
        BagEquipDetailPanelView.prototype.onClick_btnStrength = function () {
            this.close();
            var equip_info = Template.equip.get(this.equip_id);
            if (!equip_info) {
                egret.error("no equipId: " + this.equip_id);
                return;
            }
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.RoleBaseView).openEquipPanel();
            layer.getView(ui.RoleBaseView).onClick_btnEquipStrength();
            layer.getView(ui.RoleEquipStrengthView).initCurPos(equip_info.Position);
        };
        /**
         * 响应点击精炼按钮
         */
        BagEquipDetailPanelView.prototype.onClick_btnRefine = function () {
            if (OpenManager.CheckOpen(OpenType.EquipRefine) == false)
                return;
            this.close();
            var equip_info = Template.equip.get(this.equip_id);
            if (!equip_info) {
                egret.error("no equipId: " + this.equip_id);
                return;
            }
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.RoleBaseView).openEquipPanel();
            layer.getView(ui.RoleBaseView).onClick_btnEquipRefine();
            layer.getView(ui.RoleEquipRefineView).initCurPos(equip_info.Position);
        };
        /**
         * 响应点击卸下按钮
         */
        BagEquipDetailPanelView.prototype.onClick_btnUnload = function () {
            this.close();
            var equip_info = Template.equip.get(this.equip_id);
            if (!equip_info) {
                egret.error("no equipId: " + this.equip_id);
                return;
            }
            if (Singleton.Get(BagManager).checkEquipBagFull()) {
                Singleton.Get(DialogControler).showInfo(1125);
                return;
            }
            Singleton.Get(EquipManager).onReqUnload(this.role_id, equip_info.Position);
        };
        /**
         * 响应点击更换按钮
         */
        BagEquipDetailPanelView.prototype.onClick_btnChange = function () {
            this.close();
            var equip_info = Template.equip.get(this.equip_id);
            if (!equip_info) {
                egret.error("no equipId: " + this.equip_id);
                return;
            }
            Singleton.Get(LayerManager).getView(ui.RoleEquipSelectPanelView).open(this.role_id, equip_info.Position);
        };
        /**
         * 响应点击装备列表
         * @param e
         */
        BagEquipDetailPanelView.prototype.onClick_listItems = function (e) {
            if (e.item.active != undefined) {
                if (!e.item.active) {
                    var equip_id = e.item.item_id;
                    var cfg_item = Template.item.get(equip_id);
                    if (!cfg_item) {
                        console.error("no equip: " + equip_id);
                        return;
                    }
                    Singleton.Get(ui.BagDropPanelView).openEquipFrag(cfg_item.ID, false);
                }
            }
        };
        return BagEquipDetailPanelView;
    }(PopupUI));
    ui.BagEquipDetailPanelView = BagEquipDetailPanelView;
    __reflect(BagEquipDetailPanelView.prototype, "ui.BagEquipDetailPanelView");
})(ui || (ui = {}));
//# sourceMappingURL=BagEquipDetailPanelView.js.map