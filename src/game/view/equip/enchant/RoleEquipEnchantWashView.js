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
     * 装备洗练确认界面
     */
    var RoleEquipEnchantWashView = (function (_super) {
        __extends(RoleEquipEnchantWashView, _super);
        // region 生命周期管理
        function RoleEquipEnchantWashView() {
            var _this = _super.call(this, "yw.RoleEquipEnchantWashSkin") || this;
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnClose, _this);
            _this.btnWash.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnWash, _this);
            _this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnConfirm, _this);
            _this.labTitle.text = Template.getGUIText("ui_fumo2");
            _this.btnConfirm.text = Template.getGUIText("ui_fumo8");
            _this.btnWash.text = Template.getGUIText("ui_fumo11");
            _this.labAttrTitle.text = Template.getGUIText("ui_fumo10");
            _this.labAttrTitleNext.text = Template.getGUIText("ui_fumo9");
            _this.labTrans.text = Template.getGUIText("ui_fumo11");
            _this.labDes.text = Template.getGUIText("ui_fumo4") + "\r\n" + Template.getGUIText("ui_fumo5");
            return _this;
        }
        RoleEquipEnchantWashView.prototype.componentCreated = function () {
        };
        RoleEquipEnchantWashView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnWash.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnWash, this);
            this.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
        };
        RoleEquipEnchantWashView.prototype.onUpdate = function (time) {
        };
        // endregion
        // region 显示隐藏
        RoleEquipEnchantWashView.prototype.open = function (role_id, pos) {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.cur_role = role_id;
            this.cur_pos = pos;
            this.initView();
        };
        RoleEquipEnchantWashView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        RoleEquipEnchantWashView.prototype.refresh = function () {
            this.initView();
        };
        RoleEquipEnchantWashView.prototype.initView = function () {
            var role = Singleton.Get(RoleManager).getRolesInfo();
            var my_role = role.GetRole(this.cur_role);
            var my_equip = my_role.getEquipByPos(this.cur_pos);
            // 附魔属性1
            var attr1_cfg = Template.enchant.get(my_equip.eht_ids[0]);
            this.labAttr1Name.text = RoleUtil.GetAttrPrefixString(attr1_cfg.EnchantBasics);
            this.labAttr1Name.textColor = Common.getItemNameColor(attr1_cfg.EnchantStar);
            this.labAttr1Num.text = "+" + Common.attrValueHandlerWithPct(my_equip.getAttrValueEnchant(0), attr1_cfg.EnchantBasics);
            this.labAttr1Num.textColor = this.labAttr1Name.textColor;
            this.labAttr1Max.text = UtilsGame.stringHander(Template.getGUIText("ui_fumo12"), Common.attrValueHandlerWithPct(my_equip.getAttrValueEnchantMax(0), attr1_cfg.EnchantBasics));
            // 附魔属性2
            var attr2_cfg = Template.enchant.get(my_equip.eht_ids[1]);
            this.labAttr2Name.text = RoleUtil.GetAttrPrefixString(attr2_cfg.EnchantBasics);
            this.labAttr2Name.textColor = Common.getItemNameColor(attr2_cfg.EnchantStar);
            this.labAttr2Num.text = "+" + Common.attrValueHandlerWithPct(my_equip.getAttrValueEnchant(1), attr2_cfg.EnchantBasics);
            this.labAttr2Num.textColor = this.labAttr2Name.textColor;
            this.labAttr2Max.text = UtilsGame.stringHander(Template.getGUIText("ui_fumo12"), Common.attrValueHandlerWithPct(my_equip.getAttrValueEnchantMax(1), attr2_cfg.EnchantBasics));
            // 下级附魔属性1
            var attr1_cfg_ft = Template.enchant.get(my_equip.eht_temp[0]);
            if (!attr1_cfg_ft) {
                this.labTrans.visible = false;
                this.imgTrans.visible = false;
                this.labAttr1NameNext.text = "";
                this.labAttr1NumNext.text = "";
                this.groupAttr1MaxNext.visible = false;
            }
            else {
                this.labTrans.visible = true;
                this.imgTrans.visible = true;
                this.groupAttr1MaxNext.visible = true;
                this.labAttr1NameNext.text = RoleUtil.GetAttrPrefixString(attr1_cfg_ft.EnchantBasics);
                this.labAttr1NameNext.textColor = Common.getItemNameColor(attr1_cfg_ft.EnchantStar);
                this.labAttr1NumNext.text = "+" + Common.attrValueHandlerWithPct(my_equip.getAttrValueEnchantTemp(0), attr1_cfg_ft.EnchantBasics);
                this.labAttr1NumNext.textColor = this.labAttr1NameNext.textColor;
                this.labAttr1MaxNext.text = UtilsGame.stringHander(Template.getGUIText("ui_fumo12"), Common.attrValueHandlerWithPct(my_equip.getAttrValueEnchantTempMax(0), attr1_cfg_ft.EnchantBasics));
            }
            // 下级附魔属性2
            var attr2_cfg_ft = Template.enchant.get(my_equip.eht_temp[1]);
            if (!attr2_cfg_ft) {
                this.labAttr2NameNext.text = "";
                this.labAttr2NumNext.text = "";
                this.groupAttr2MaxNext.visible = false;
            }
            else {
                this.groupAttr2MaxNext.visible = true;
                this.labAttr2NameNext.text = RoleUtil.GetAttrPrefixString(attr2_cfg_ft.EnchantBasics);
                this.labAttr2NameNext.textColor = Common.getItemNameColor(attr2_cfg_ft.EnchantStar);
                this.labAttr2NumNext.text = "+" + Common.attrValueHandlerWithPct(my_equip.getAttrValueEnchantTemp(1), attr2_cfg_ft.EnchantBasics);
                this.labAttr2NumNext.textColor = this.labAttr2NameNext.textColor;
                this.labAttr2MaxNext.text = UtilsGame.stringHander(Template.getGUIText("ui_fumo12"), Common.attrValueHandlerWithPct(my_equip.getAttrValueEnchantTempMax(1), attr2_cfg_ft.EnchantBasics));
            }
            // 更换附魔属性道具消耗
            var change_cost = Template.config.EnchantChangeNum;
            var my_change_count = Singleton.Get(BagManager).getItemCount(Template.config.EnchantChange);
            var change_enough = my_change_count >= change_cost;
            // 生成说明文字
            var des_1 = Template.getGUIText("ui_fumo13");
            var des_2_id = "";
            switch (this.cur_pos) {
                case EquipPos.Weapon:
                    des_2_id = "ui_fumo14";
                    break;
                case EquipPos.Chest:
                    des_2_id = "ui_fumo15";
                    break;
                case EquipPos.Leg:
                    des_2_id = "ui_fumo16";
                    break;
                case EquipPos.Shoe:
                    des_2_id = "ui_fumo17";
                    break;
            }
            var des_2 = Template.getGUIText(des_2_id);
            this.labTierDes.textFlow = new egret.HtmlTextParser().parser(des_1);
            this.labAttrDes.textFlow = new egret.HtmlTextParser().parser(des_2);
            // 道具不足时检查VIP等级 如果符合 开启钻石洗练
            if (!change_enough) {
                var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
                if (my_vip >= Template.config.EnchantVip) {
                    var cost_diamond = Template.config.EnchantVipNum;
                    var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
                    var diamond_enough = my_diamond >= cost_diamond;
                    this.btnWash.icon = DEFINE.UI_ALERT_INFO.diamond.resPNG;
                    this.btnWash.cost = UtilsGame.numberToString(cost_diamond);
                    this.btnWash.enough = diamond_enough;
                    return;
                }
            }
            this.btnWash.icon = Template.item.get(Template.config.EnchantChange).iIcon;
            this.btnWash.cost = my_change_count + "/" + UtilsGame.numberToString(change_cost);
            this.btnWash.enough = change_enough;
        };
        // endregion
        // region 按钮点击响应
        RoleEquipEnchantWashView.prototype.onClick_btnConfirm = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnConfirm, function () {
                var role_id = _this.cur_role;
                // 检查是否有临时洗练属性 如果没有则按钮无效
                var role = Singleton.Get(RoleManager).getRolesInfo();
                var my_role = role.GetRole(role_id);
                var my_equip = my_role.getEquipByPos(_this.cur_pos);
                if (my_equip.eht_temp[0] <= 0) {
                    return;
                }
                Singleton.Get(EquipManager).onReqEnchantChange(role_id, _this.cur_pos, function () {
                    _this.close();
                    Singleton.Get(LayerManager).getView(ui.RoleEquipEnchantView).refresh(false);
                }, _this);
            }, this);
        };
        RoleEquipEnchantWashView.prototype.onClick_btnWash = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnWash, function () {
                // 检查消耗道具是否足够
                if (!Singleton.Get(BagManager).hasEnough(Template.config.EnchantChange, Template.config.EnchantChangeNum)) {
                    var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
                    if (my_vip >= Template.config.EnchantVip) {
                        var cost_diamond = Template.config.EnchantVipNum;
                        var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
                        if (my_diamond <= cost_diamond) {
                            Singleton.Get(DialogControler).showInfo(1005, _this, function () {
                                _this.close();
                                Singleton.Get(LayerManager).getView(ui.PayView).open();
                            });
                            return;
                        }
                    }
                    else {
                        Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(Template.config.EnchantChange);
                        _this.close();
                        return;
                    }
                }
                // 检查是否已有红色属性
                var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
                var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
                var my_equip = my_info.getEquipByPos(_this.cur_pos);
                if (my_equip.enchant_temp_has_precious) {
                    Singleton.Get(DialogControler).showInfo(1174, _this, function () {
                        _this.onExec_btnWash();
                    }, function () { });
                }
                else {
                    _this.onExec_btnWash();
                }
            }, this);
        };
        RoleEquipEnchantWashView.prototype.onExec_btnWash = function () {
            var _this = this;
            Singleton.Get(EquipManager).onReqEnchantWash(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId(), this.cur_pos, function () {
                _this.refresh();
            }, this);
        };
        RoleEquipEnchantWashView.prototype.onClick_btnClose = function () {
            this.close();
        };
        return RoleEquipEnchantWashView;
    }(PopupUI));
    ui.RoleEquipEnchantWashView = RoleEquipEnchantWashView;
    __reflect(RoleEquipEnchantWashView.prototype, "ui.RoleEquipEnchantWashView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleEquipEnchantWashView.js.map