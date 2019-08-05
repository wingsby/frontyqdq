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
    var RoleLevelupView = (function (_super) {
        __extends(RoleLevelupView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleLevelupView() {
            var _this = _super.call(this, "yw.RoleLevelupSkin") || this;
            _this.touchEnabled = false;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleLevelupView.prototype.componentCreated = function () {
        };
        /**
         * 初始化
         */
        RoleLevelupView.prototype.init = function () {
            this.initGuiText();
            this.initEvent();
        };
        /**
         * 初始化UI文字
         */
        RoleLevelupView.prototype.initGuiText = function () {
            this.btnLevelup.text = Template.getGUIText("ui_role16");
            this.btnLevelupEx.text = Template.getGUIText("ui_role17");
            this.btnAutoStr.text = Template.getGUIText("ui_equip5");
            this.btnAutoEquip.text = Template.getGUIText("ui_equip4");
        };
        /**
         * 初始化事件绑定
         */
        RoleLevelupView.prototype.initEvent = function () {
            this.btnLevelup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLevelup, this);
            this.btnLevelupEx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLevelupEx, this);
            this.compCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_compCard, this);
            this.btnAutoEquip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAutoEquip, this);
            this.btnAutoStr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAutoStr, this);
            this.btnDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDetail, this);
            this.posWeapon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posWeapon, this);
            this.posChest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posChest, this);
            this.posLeg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posLeg, this);
            this.posShoe.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posShoe, this);
            this.posRing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posRing, this);
            this.posNecklace.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posNecklace, this);
        };
        /**
         * 响应销毁
         */
        RoleLevelupView.prototype.onDestroy = function () {
            this.btnLevelup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLevelup, this);
            this.btnLevelupEx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLevelupEx, this);
            this.compCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_compCard, this);
            this.btnAutoEquip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAutoEquip, this);
            this.btnAutoStr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAutoStr, this);
            this.btnDetail.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDetail, this);
            this.posWeapon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posWeapon, this);
            this.posChest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posChest, this);
            this.posLeg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posLeg, this);
            this.posShoe.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posShoe, this);
            this.posRing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posRing, this);
            this.posNecklace.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posNecklace, this);
        };
        /**
         * 帧更新
         * @param time
         */
        RoleLevelupView.prototype.onUpdate = function (time) {
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleLevelupView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.initRoleInfo();
            this.onAlarm();
        };
        /**
         * 关闭本界面
         */
        RoleLevelupView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**
         * 刷新
         */
        RoleLevelupView.prototype.refresh = function () {
            if (Singleton.Get(LayerManager).isViewOnStage(this)) {
                this.initRoleInfo();
            }
        };
        // endregion
        // region 展示
        /**
         * 初始化角色Info
         */
        RoleLevelupView.prototype.initRoleInfo = function () {
            // 获取当前选中的角色
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            // 判空
            if (!my_info) {
                console.error("no player roleId: " + role_id);
                return;
            }
            // 获取角色基本配置
            var cfg_role = Template.role.get(role_id);
            // 判空
            if (!cfg_role) {
                console.error("no roleId: " + role_id);
                return;
            }
            // 获取角色技能配置
            var cfg_skill = Template.skill.get(cfg_role.Skill);
            // 判空
            if (!cfg_skill) {
                console.error("no skill, roleId: " + role_id + ", skillId: " + cfg_role.Skill);
                return;
            }
            // 获取角色羁绊配置
            var bond = cfg_role.BondRoleId;
            var bond_active = Singleton.Get(RoleManager).getRolesInfo().ActiveBonds(role_id);
            var bond_attrs = [];
            // 计算羁绊信息
            for (var i = 0; i < bond.length; i++) {
                var is_bond_active = false;
                for (var j = 0; j < bond_active.length; j++) {
                    if (bond[i] == bond_active[j]) {
                        is_bond_active = true;
                        break;
                    }
                }
                var cfg_bond = Template.bond.get(bond[i]);
                if (!cfg_bond) {
                    console.error("no bondId: " + bond[i]);
                    continue;
                }
                if (is_bond_active) {
                    bond_attrs.push("<font color='#68ec46'>" + Template.getGUIText(cfg_bond.BondName) + "</font>");
                }
                else {
                    bond_attrs.push(Template.getGUIText(cfg_bond.BondName));
                }
            }
            // 计算升级价格
            var role_lv = my_info.lv;
            if (role_lv >= cfg_role.LvMax) {
                this.groupMax.visible = false;
                this.groupBottomBtn.visible = false;
            }
            else {
                this.groupMax.visible = false;
                this.groupBottomBtn.visible = true;
                var price_1 = my_info.GetLevelupPrice(Singleton.Get(PlayerInfoManager).getTeamLv(), 1);
                var price_5 = my_info.GetLevelupPrice(Singleton.Get(PlayerInfoManager).getTeamLv(), 5);
                var my_gold_count = Singleton.Get(PlayerInfoManager).getGold();
                this.btnLevelup.cost = UtilsGame.numberToString(price_1);
                this.btnLevelup.enough = (price_1 < my_gold_count);
                this.btnLevelupEx.cost = UtilsGame.numberToString(price_5);
                this.btnLevelupEx.enough = (price_5 < my_gold_count);
            }
            Common.fillRoleCard(role_id, this.compCard);
            this.labTalent.text = "资 质：" + my_info.getTalentNum();
            this.labAttrHp.text = my_info.max_hp.toString();
            this.labAttrDef.text = my_info.def.toString();
            this.labAttrAtk.text = my_info.atk.toString();
            this.labAttrDefSp.text = my_info.skill_def.toString();
            this.labAttrAtkSp.text = my_info.skill_atk.toString();
            this.labAttrSkill.text = "Lv." + my_info.skill_lv + " " + Template.getGUIText(cfg_skill.Name);
            var bond_str = bond_attrs.join(" ");
            this.labAttrBond.textFlow = (new egret.HtmlTextParser).parser(bond_str);
            this.initEmptyEquip();
            this.initEquipInfo();
            this.initJewelryInfo();
        };
        /**
         * 初始化装备信息
         */
        RoleLevelupView.prototype.initEquipInfo = function () {
            // 获取当前选中的角色
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (!inf_role) {
                console.error("no player roleId: " + role_id);
                return;
            }
            // 获取角色基本配置
            var role_info = Template.role.get(role_id);
            if (!role_info) {
                console.error("no roleId: " + role_id);
                return;
            }
            // 获取角色装备信息
            var inf_equips = inf_role.equips;
            for (var i = 0; i < inf_equips.length; i++) {
                var inf_equip = inf_equips[i];
                switch (inf_equip.pos) {
                    case EquipPos.Weapon:
                        this.posWeapon.equip = inf_equip;
                        break;
                    case EquipPos.Chest:
                        this.posChest.equip = inf_equip;
                        break;
                    case EquipPos.Leg:
                        this.posLeg.equip = inf_equip;
                        break;
                    case EquipPos.Shoe:
                        this.posShoe.equip = inf_equip;
                        break;
                }
            }
        };
        /**
         * 初始化饰品信息
         */
        RoleLevelupView.prototype.initJewelryInfo = function () {
            // 等级不足不显示饰品
            if (!OpenManager.CheckOpen(OpenType.EquipJewelry)) {
                this.labLockRing.text = OpenManager.GetLockStr(OpenType.EquipJewelry);
                this.labLockNecklace.text = OpenManager.GetLockStr(OpenType.EquipJewelry);
                this.groupEquipRing.visible = false;
                this.groupEquipRingLocked.visible = true;
            }
            else {
                this.groupEquipRing.visible = true;
                this.groupEquipRingLocked.visible = false;
            }
            // 获取当前选中的角色
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (!inf_role) {
                console.error("no player roleId: " + role_id);
                return;
            }
            // 获取角色基本配置
            var role_info = Template.role.get(role_id);
            if (!role_info) {
                console.error("no roleId: " + role_id);
                return;
            }
            // 获取角色装备信息
            var inf_jewelries = inf_role.jewelries;
            for (var i = 0; i < inf_jewelries.length; i++) {
                var inf_jew = inf_jewelries[i];
                switch (inf_jew.pos) {
                    case EquipPos.Ring:
                        this.posRing.jewelry = inf_jew;
                        this.posRing.isNew = inf_jew.isOperAble();
                        break;
                    case EquipPos.Necklace:
                        this.posNecklace.jewelry = inf_jew;
                        this.posNecklace.isNew = inf_jew.isOperAble();
                        break;
                }
            }
        };
        /**
         * 初始化空装备槽
         */
        RoleLevelupView.prototype.initEmptyEquip = function () {
            this.posWeapon.reset(EquipPos.Weapon);
            this.posChest.reset(EquipPos.Chest);
            this.posLeg.reset(EquipPos.Leg);
            this.posShoe.reset(EquipPos.Shoe);
            this.posRing.reset(EquipPos.Ring);
            this.posNecklace.reset(EquipPos.Necklace);
        };
        RoleLevelupView.prototype.playCardDynamic = function () {
            egret.Tween.removeTweens(this.groupCard);
            this.groupCard.rotation = -20;
            this.groupCard.x = -36;
            this.groupCard.scaleX = 1.2;
            this.groupCard.scaleY = 1.2;
            this.groupCard.alpha = 0.4;
            var tw_card = egret.Tween.get(this.groupCard);
            tw_card.to({ x: 6, rotation: 0, scaleX: 1, scaleY: 1, alpha: 1 }, 240, egret.Ease.backOut);
        };
        RoleLevelupView.prototype.playCardDynamicFromBreach = function () {
            egret.Tween.removeTweens(this.groupCard);
            this.groupCard.x = 142;
            this.groupCard.y = 252;
            this.groupCard.scaleX = 0.64;
            this.groupCard.scaleY = 0.64;
            var tw_card = egret.Tween.get(this.groupCard);
            tw_card.to({ x: 6, y: 378, scaleX: 1, scaleY: 1, rotation: 0 }, 240, egret.Ease.sineOut);
        };
        RoleLevelupView.prototype.playCardDynamicFromTalent = function () {
            egret.Tween.removeTweens(this.groupCard);
            this.groupCard.x = 36;
            this.groupCard.y = 264;
            this.groupCard.scaleX = 0.64;
            this.groupCard.scaleY = 0.64;
            var tw_card = egret.Tween.get(this.groupCard);
            tw_card.to({ x: 6, y: 378, scaleX: 1, scaleY: 1, rotation: 0 }, 240, egret.Ease.sineOut);
        };
        RoleLevelupView.prototype.playCardDynamicFromFather = function () {
            egret.Tween.removeTweens(this.groupCard);
            this.groupCard.x = 84;
            this.groupCard.y = 414;
            this.groupCard.scaleX = 0.795;
            this.groupCard.scaleY = 0.795;
            var tw_card = egret.Tween.get(this.groupCard);
            tw_card.to({ x: 6, y: 378, scaleX: 1, scaleY: 1, rotation: 0 }, 240, egret.Ease.sineOut);
        };
        // endregion
        // region 升级请求
        /**
         * 响应升级按钮点击事件
         */
        RoleLevelupView.prototype.onClick_btnLevelup = function () {
            UtilsEffect.buttonEffect(this.btnLevelup, function () {
                Singleton.Get(RoleManager).onReqLevelup(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId());
            }, this);
        };
        /**
         * 响应升级5次按钮点击事件
         */
        RoleLevelupView.prototype.onClick_btnLevelupEx = function () {
            UtilsEffect.buttonEffect(this.btnLevelupEx, function () {
                Singleton.Get(RoleManager).onReqLevelup5(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId());
            }, this);
        };
        /**
         * 响应点击卡牌
         */
        RoleLevelupView.prototype.onClick_compCard = function () {
            var paint = Singleton.Get(LayerManager).getView(ui.RolePaintView);
            paint.open(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId());
        };
        // endregion
        // region 特殊按钮
        /**
         * 响应点击一键穿戴
         */
        RoleLevelupView.prototype.onClick_btnAutoEquip = function () {
            UtilsEffect.buttonEffect(this.btnAutoEquip, function () {
                // 没有任何装备则弹出装备获取提示
                if (!Singleton.Get(BagManager).hasAnyEquip()) {
                    RoleUtil.showEquipNotify();
                    return;
                }
                Singleton.Get(EquipManager).onReqChangeAuto(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId());
            });
        };
        /**
         * 响应点击装备提升
         */
        RoleLevelupView.prototype.onClick_btnAutoStr = function () {
            UtilsEffect.buttonEffect(this.btnAutoStr, function () {
                var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
                var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
                if (!my_role.hasAnyEquip()) {
                    Singleton.Get(DialogControler).showInfo(1121);
                    return;
                }
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).openEquipPanel();
            }, this);
        };
        /**
         * 响应点击详细信息
         */
        RoleLevelupView.prototype.onClick_btnDetail = function () {
            UtilsEffect.buttonEffect(this.btnDetail);
            Singleton.Get(LayerManager).getView(ui.RoleDetailView).open(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId());
        };
        // endregion
        // region 角色装备
        RoleLevelupView.prototype.onClick_posWeapon = function () {
            this.onClick_pos(EquipPos.Weapon);
        };
        RoleLevelupView.prototype.onClick_posChest = function () {
            this.onClick_pos(EquipPos.Chest);
        };
        RoleLevelupView.prototype.onClick_posLeg = function () {
            this.onClick_pos(EquipPos.Leg);
        };
        RoleLevelupView.prototype.onClick_posShoe = function () {
            this.onClick_pos(EquipPos.Shoe);
        };
        RoleLevelupView.prototype.onClick_posRing = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.RoleBaseView).openJewelryPanel();
            layer.getView(ui.RoleJewelryStrengthView).initCurPos(EquipPos.Ring);
        };
        RoleLevelupView.prototype.onClick_posNecklace = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.RoleBaseView).openJewelryPanel();
            layer.getView(ui.RoleJewelryStrengthView).initCurPos(EquipPos.Necklace);
        };
        RoleLevelupView.prototype.onClick_pos = function (pos) {
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var equip_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id).getEquipByPos(pos);
            if (equip_info.equip_id <= 0) {
                // 没有任何符合该位置的装备则弹出装备获取提示
                if (!Singleton.Get(BagManager).hasAnyEquipPos(pos)) {
                    RoleUtil.showEquipNotify();
                    return;
                }
                // 打开选择装备界面
                Singleton.Get(LayerManager).getView(ui.RoleEquipSelectPanelView).open(role_id, pos);
                return;
            }
            Singleton.Get(LayerManager).getView(ui.BagEquipDetailPanelView).open(equip_info.equip_id, role_id);
        };
        // endregion
        // region 红点提示
        /**
         * 刷新自动装备红点
         */
        RoleLevelupView.prototype.onAlarm = function () {
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            this.btnAutoEquip.isNew = my_role.checkHasBetterEquip();
            this.btnAutoStr.isNew = (my_role.checkEquipRefineAble() || my_role.checkEquipStrengthAble() || my_role.checkEquipEnchantAble()) && my_role.hasAnyEquip();
            // 检查每个空装备位是否有可穿戴装备
            this.posWeapon.isNew = my_role.checkEmptyEquipChangable(EquipPos.Weapon);
            this.posChest.isNew = my_role.checkEmptyEquipChangable(EquipPos.Chest);
            this.posLeg.isNew = my_role.checkEmptyEquipChangable(EquipPos.Leg);
            this.posShoe.isNew = my_role.checkEmptyEquipChangable(EquipPos.Shoe);
            // 检查每个饰品是否可强化
            this.posRing.isNew = my_role.getJewelryByPos(EquipPos.Ring).isOperAble();
            this.posNecklace.isNew = my_role.getJewelryByPos(EquipPos.Necklace).isOperAble();
            return this.btnAutoEquip.isNew || this.btnAutoStr.isNew || this.posRing.isNew || this.posNecklace.isNew;
        };
        return RoleLevelupView;
    }(BaseUI));
    ui.RoleLevelupView = RoleLevelupView;
    __reflect(RoleLevelupView.prototype, "ui.RoleLevelupView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleLevelupView.js.map