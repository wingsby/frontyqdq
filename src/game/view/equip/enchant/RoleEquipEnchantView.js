var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ui;
(function (ui) {
    var RoleEquipEnchantView = (function (_super) {
        __extends(RoleEquipEnchantView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleEquipEnchantView() {
            var _this = _super.call(this, "yw.RoleEquipEnchantSkin") || this;
            _this.cur_pos = EquipPos.Null; // 当前选中的装备槽位
            _this.touchEnabled = false;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleEquipEnchantView.prototype.componentCreated = function () {
        };
        /**
         * 初始化
         */
        RoleEquipEnchantView.prototype.init = function () {
            this.initGuiText();
            this.initEvent();
        };
        /**
         * 初始化UI文字
         */
        RoleEquipEnchantView.prototype.initGuiText = function () {
            this.btnSubmit.text = Template.getGUIText("ui_fumo1");
            this.btnBreach.text = Template.getGUIText("ui_role12");
            this.btnBreachDiamond.text = Template.getGUIText("ui_fumo19");
            this.btnOneKey.text = "一键附魔"; // TODO 加到文字表
            this.labTxtChange.text = Template.getGUIText("ui_fumo2");
            this.labConstText.text = Template.getGUIText("ui_fumo20");
        };
        /**
         * 初始化事件绑定
         */
        RoleEquipEnchantView.prototype.initEvent = function () {
            this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
            this.btnBreach.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBreach, this);
            this.btnBreachDiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBreachDiamond, this);
            this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
            this.btnConst.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConst, this);
            this.btnOneKey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOneKey, this);
            this.posWeapon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posWeapon, this);
            this.posChest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posChest, this);
            this.posLeg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posLeg, this);
            this.posShoe.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posShoe, this);
            this.mcWeaponBack.setCallback(this.onEffectEnd, this);
            this.mcChestBack.setCallback(this.onEffectEnd, this);
            this.mcLegBack.setCallback(this.onEffectEnd, this);
            this.mcShoeBack.setCallback(this.onEffectEnd, this);
        };
        /**
         * 响应销毁
         */
        RoleEquipEnchantView.prototype.onDestroy = function () {
            this.btnSubmit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
            this.btnBreach.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBreach, this);
            this.btnBreachDiamond.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBreachDiamond, this);
            this.btnChange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
            this.btnConst.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConst, this);
            this.btnOneKey.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOneKey, this);
            this.posWeapon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posWeapon, this);
            this.posChest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posChest, this);
            this.posLeg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posLeg, this);
            this.posShoe.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posShoe, this);
        };
        /**
         * 帧更新
         * @param time
         */
        RoleEquipEnchantView.prototype.onUpdate = function (time) {
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleEquipEnchantView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.initEquipInfo();
            this.initCurPos(EquipPos.Weapon);
            this.playOpenAni();
            Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
        };
        /**
         * 打开并直接选中某一位置
         * @param pos
         */
        RoleEquipEnchantView.prototype.openPos = function (pos) {
            Singleton.Get(LayerManager).addView(this);
            this.initEquipInfo();
            this.initCurPos(pos);
            this.playOpenAni();
        };
        /**
         * 关闭本界面
         */
        RoleEquipEnchantView.prototype.close = function () {
            this.clearEffect();
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**
         * 刷新
         */
        RoleEquipEnchantView.prototype.refresh = function (reset) {
            if (reset === void 0) { reset = true; }
            if (Singleton.Get(LayerManager).isViewOnStage(this)) {
                this.initEquipInfo();
                if (reset || this.cur_pos <= 0) {
                    this.initCurPos(EquipPos.Weapon);
                    this.playOpenAni();
                }
                else {
                    this.initCurPos(this.cur_pos);
                }
            }
        };
        /**
         * 播放开启动画
         */
        RoleEquipEnchantView.prototype.playOpenAni = function () {
            // Common.playStackAni(undefined, [this.posSelected, this.posWeapon, this.posChest, this.posLeg, this.posShoe], undefined, undefined, 2);
        };
        // endregion
        // region 展示
        /**
         * 初始化装备Info
         */
        RoleEquipEnchantView.prototype.initEquipInfo = function () {
            // 获取当前选中的角色
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (!my_info) {
                egret.error("no player roleId: " + role_id);
                return;
            }
            // 获取角色基本配置
            var role_info = Template.role.get(role_id);
            if (!role_info) {
                egret.error("no roleId: " + role_id);
                return;
            }
            // 具体逻辑
            var my_weapon = my_info.getEquipByPos(EquipPos.Weapon);
            this.labWeaponStar.text = "Lv." + my_weapon.eht_full_lv.toString();
            this.imgWeaponNew.visible = my_weapon.isEnchantAble();
            var my_chest = my_info.getEquipByPos(EquipPos.Chest);
            this.labChestStar.text = "Lv." + my_chest.eht_full_lv.toString();
            this.imgChestNew.visible = my_chest.isEnchantAble();
            var my_leg = my_info.getEquipByPos(EquipPos.Leg);
            this.labLegStar.text = "Lv." + my_leg.eht_full_lv.toString();
            this.imgLegNew.visible = my_leg.isEnchantAble();
            var my_shoe = my_info.getEquipByPos(EquipPos.Shoe);
            this.labShoeStar.text = "Lv." + my_shoe.eht_full_lv.toString();
            this.imgShoeNew.visible = my_shoe.isEnchantAble();
        };
        /**
         * 初始化选中槽位的装备
         */
        RoleEquipEnchantView.prototype.initCurPos = function (pos) {
            if (pos === void 0) { pos = EquipPos.Null; }
            if (pos == EquipPos.Null) {
                pos = this.cur_pos;
            }
            if (pos == EquipPos.Null) {
                return;
            }
            this.activatePos(pos);
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            var my_equip = my_info.getEquipByPos(pos);
            this.cur_pos = pos;
            ResManager.AsyncSetTexture(this.imgSelected, Common.getEquipPosRes(pos));
            this.labSelectedStar.text = "Lv." + my_equip.eht_full_lv;
            // 控制至尊洗练入口开关 (有相关道具且附魔等级大于0时显示)
            this.btnConst.visible = Singleton.Get(BagManager).hasAnyOfType(ItemType.EnchantConst) && my_equip.eht_full_lv > 0;
            // 更换附魔属性消耗
            this.groupChangeCost.visible = false;
            /**
            const change_cost: number = Template.config.EnchantChangeNum;
            const my_change_count: number = Singleton.Get(BagManager).getItemCount(Template.config.EnchantChange);
            ResManager.AsyncSetTexture(this.imgChangeIcon, Template.item.get(Template.config.EnchantChange).iIcon);
            this.labChangeCost.text = my_change_count + "/" + UtilsGame.numberToString(change_cost);
            this.labChangeCost.textColor = my_change_count >= change_cost ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
             */
            // 附魔属性1
            var attr1_cfg = Template.enchant.get(my_equip.eht_ids[0]);
            this.labAttr1Name.text = RoleUtil.GetAttrPrefixString(attr1_cfg.EnchantBasics);
            this.labAttr1Name.textColor = Common.getItemNameColor(attr1_cfg.EnchantStar);
            this.labAttr1Num.text = "+" + Common.attrValueHandlerWithPct(my_equip.getAttrValueEnchant(0), attr1_cfg.EnchantBasics);
            this.labAttr1Num.textColor = this.labAttr1Name.textColor;
            this.labAttr1Lv.text = (my_equip.eht_lvs[0] >= my_equip.cur_enchant_max_lv) ? Template.getGUIText("ui_fumo6") : "Lv." + my_equip.eht_lvs[0];
            this.labAttr1Max.text = my_equip.eht_lvs[0] + "/" + my_equip.cur_enchant_max_lv;
            this.progAttr1.value = my_equip.eht_lvs[0] / my_equip.cur_enchant_max_lv * 100;
            // 附魔属性2
            var attr2_cfg = Template.enchant.get(my_equip.eht_ids[1]);
            this.labAttr2Name.text = RoleUtil.GetAttrPrefixString(attr2_cfg.EnchantBasics);
            this.labAttr2Name.textColor = Common.getItemNameColor(attr2_cfg.EnchantStar);
            this.labAttr2Num.text = "+" + Common.attrValueHandlerWithPct(my_equip.getAttrValueEnchant(1), attr2_cfg.EnchantBasics);
            this.labAttr2Num.textColor = this.labAttr2Name.textColor;
            if (my_equip.eht_lvs[0] < Template.config.EnchantLv[0]) {
                this.labAttr2Lv.text = Template.getGUIText("ui_fumo7");
                this.labAttr2Max.text = "";
            }
            else {
                this.labAttr2Lv.text = (my_equip.eht_lvs[1] >= my_equip.cur_enchant_max_lv) ? Template.getGUIText("ui_fumo6") : "Lv." + my_equip.eht_lvs[1];
                this.labAttr2Max.text = my_equip.eht_lvs[1] + "/" + my_equip.cur_enchant_max_lv;
            }
            this.progAttr2.value = my_equip.eht_lvs[1] / my_equip.cur_enchant_max_lv * 100;
            // 附魔升级/突破/满级处理
            if (my_equip.is_enchant_max) {
                this.groupOper.visible = false;
                this.groupMax.visible = true;
            }
            else {
                this.groupOper.visible = true;
                this.groupMax.visible = false;
                if (my_equip.is_enchant_breachable) {
                    // 附魔可突破
                    this.groupOperBreach.visible = true;
                    this.btnSubmit.visible = false;
                    this.btnOneKey.visible = false;
                    // 突破所需等级
                    var my_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
                    var need_lv = my_equip.enchant_breach_need_lv;
                    this.labBreachDes.text = UtilsGame.stringHander(Template.getGUIText("ui_fumo18"), my_lv, need_lv);
                    // 不满足突破等级时 突破按钮灰显
                    if (my_lv >= need_lv) {
                        this.labBreachDes.textColor = DEFINE_COLOR.OK_GREEN;
                        this.btnBreach.active = true;
                        this.btnBreachDiamond.active = true;
                    }
                    else {
                        this.labBreachDes.textColor = DEFINE_COLOR.WARN_RED;
                        this.btnBreach.active = false;
                        this.btnBreachDiamond.active = false;
                    }
                    // 突破所需道具
                    var my_cost = Singleton.Get(BagManager).getItemCount(Template.config.EnchantBreach);
                    var breach_cost = my_equip.enchant_breach_cost;
                    this.btnBreach.icon = Template.item.get(Template.config.EnchantBreach).iIcon;
                    this.btnBreach.cost = my_cost + "/" + UtilsGame.numberToString(breach_cost);
                    this.btnBreach.enough = my_cost >= breach_cost;
                    // 突破所需钻石
                    var my_dmd = Singleton.Get(PlayerInfoManager).getDiamond();
                    var dmd_cost = my_equip.enchant_breach_cost_dmd;
                    this.btnBreachDiamond.icon = DEFINE.UI_ALERT_INFO.diamond.resPNG;
                    this.btnBreachDiamond.cost = UtilsGame.numberToString(dmd_cost);
                    this.btnBreachDiamond.enough = my_dmd >= dmd_cost;
                }
                else {
                    // 附魔可升级
                    this.groupOperBreach.visible = false;
                    this.btnSubmit.visible = true;
                    this.btnOneKey.visible = true;
                    var my_cost = Singleton.Get(BagManager).getItemCount(Template.config.EnchantItem);
                    var levelup_cost = my_equip.enchant_levelup_cost;
                    this.btnSubmit.icon = Template.item.get(Template.config.EnchantItem).iIcon;
                    this.btnSubmit.cost = my_cost + "/" + UtilsGame.numberToString(levelup_cost);
                    this.btnSubmit.enough = my_cost >= levelup_cost;
                }
            }
        };
        // endregion
        // region 响应部位点击
        RoleEquipEnchantView.prototype.onClick_posWeapon = function () {
            this.initCurPos(EquipPos.Weapon);
        };
        RoleEquipEnchantView.prototype.onClick_posChest = function () {
            this.initCurPos(EquipPos.Chest);
        };
        RoleEquipEnchantView.prototype.onClick_posLeg = function () {
            this.initCurPos(EquipPos.Leg);
        };
        RoleEquipEnchantView.prototype.onClick_posShoe = function () {
            this.initCurPos(EquipPos.Shoe);
        };
        RoleEquipEnchantView.prototype.activatePos = function (pos) {
            this.imgWeaponActive.visible = false;
            this.imgChestActive.visible = false;
            this.imgLegActive.visible = false;
            this.imgShoeActive.visible = false;
            switch (pos) {
                case EquipPos.Weapon:
                    this.imgWeaponActive.visible = true;
                    break;
                case EquipPos.Chest:
                    this.imgChestActive.visible = true;
                    break;
                case EquipPos.Leg:
                    this.imgLegActive.visible = true;
                    break;
                case EquipPos.Shoe:
                    this.imgShoeActive.visible = true;
                    break;
            }
        };
        // endregion
        // region 特效
        /**
         * 播放强化成功特效
         */
        RoleEquipEnchantView.prototype.playEffect = function (multi, pos_ex) {
            if (multi === void 0) { multi = false; }
            if (pos_ex === void 0) { pos_ex = []; }
            this.groupSuccess.visible = true;
            if (!multi) {
                return;
            }
            for (var i = 0; i < pos_ex.length; i++) {
                switch (pos_ex[i]) {
                    case EquipPos.Weapon:
                        this.playEffectBack(this.mcWeaponBack);
                        this.playEffectFront(this.mcWeaponFront);
                        break;
                    case EquipPos.Chest:
                        this.playEffectBack(this.mcChestBack);
                        this.playEffectFront(this.mcChestFront);
                        break;
                    case EquipPos.Leg:
                        this.playEffectBack(this.mcLegBack);
                        this.playEffectFront(this.mcLegFront);
                        break;
                    case EquipPos.Shoe:
                        this.playEffectBack(this.mcShoeBack);
                        this.playEffectFront(this.mcShoeFront);
                        break;
                }
            }
        };
        /**
         * 清空强化成功特效
         */
        RoleEquipEnchantView.prototype.clearEffect = function () {
            this.onEffectEnd();
            this.mcWeaponBack.clearMovieClip();
            this.mcWeaponFront.clearMovieClip();
            this.mcChestBack.clearMovieClip();
            this.mcChestFront.clearMovieClip();
            this.mcLegBack.clearMovieClip();
            this.mcLegFront.clearMovieClip();
            this.mcShoeBack.clearMovieClip();
            this.mcShoeFront.clearMovieClip();
        };
        /**
         * 响应特效播放完成
         */
        RoleEquipEnchantView.prototype.onEffectEnd = function () {
            this.groupSuccess.visible = false;
            this.mcWeaponBack.visible = false;
            this.mcWeaponFront.visible = false;
            this.mcChestBack.visible = false;
            this.mcChestFront.visible = false;
            this.mcLegBack.visible = false;
            this.mcLegFront.visible = false;
            this.mcShoeBack.visible = false;
            this.mcShoeFront.visible = false;
        };
        RoleEquipEnchantView.prototype.playEffectBack = function (mc) {
            mc.visible = true;
            mc.clearMovieClip();
            mc.setMovieClip("ui_ten");
            mc.gotoAndPlay("ui_ten", 1);
        };
        RoleEquipEnchantView.prototype.playEffectFront = function (mc) {
            mc.visible = true;
            mc.clearMovieClip();
            mc.setMovieClip("ui_ten1");
            mc.gotoAndPlay("ui_ten1", 1);
        };
        // endregion
        // region 强化请求
        // endregion
        // region 点击事件
        /**
         * 响应附魔按钮点击事件
         */
        RoleEquipEnchantView.prototype.onClick_btnSubmit = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnSubmit, function () {
                var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
                var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
                var my_equip = my_info.getEquipByPos(_this.cur_pos);
                if (!Singleton.Get(BagManager).hasEnough(Template.config.EnchantItem, my_equip.enchant_levelup_cost)) {
                    Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(Template.config.EnchantItem);
                    return;
                }
                Singleton.Get(EquipManager).onReqEnchantLv(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId(), _this.cur_pos, function () {
                    _this.refresh(false);
                    Singleton.Get(LayerManager).getView(ui.RoleBaseView).onAlarmEquip();
                    Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
                }, _this);
            }, this);
        };
        /**
         * 响应一键附魔按钮点击事件
         */
        RoleEquipEnchantView.prototype.onClick_btnOneKey = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnOneKey, function () {
                Singleton.Get(EquipManager).onReqEnchantOneKey(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId(), _this.cur_pos, function (success) {
                    if (success) {
                        _this.refresh(false);
                        Singleton.Get(LayerManager).getView(ui.RoleBaseView).onAlarmEquip();
                        Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
                    }
                    else {
                        Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(Template.config.EnchantItem);
                    }
                }, _this);
            }, this);
        };
        /**
         * 响应变更属性按钮点击事件
         */
        RoleEquipEnchantView.prototype.onClick_btnChange = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnChange, function () {
                var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
                var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
                var my_equip = my_info.getEquipByPos(_this.cur_pos);
                if (!my_equip || !my_equip.eht_lvs || my_equip.eht_full_lv <= 0) {
                    Singleton.Get(DialogControler).showInfo(1193);
                    return;
                }
                Singleton.Get(LayerManager).getView(ui.RoleEquipEnchantWashView).open(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId(), _this.cur_pos);
            }, this);
        };
        /**
         * 执行变更属性按钮逻辑
         */
        RoleEquipEnchantView.prototype.onExec_btnChange = function () {
            Singleton.Get(LayerManager).getView(ui.RoleEquipEnchantWashView).open(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId(), this.cur_pos);
            /**
            // 检查消耗道具是否足够
            if (!Singleton.Get(BagManager).hasEnough(Template.config.EnchantChange, Template.config.EnchantChangeNum)) {
                Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(Template.config.EnchantChange);
                return;
            }

            Singleton.Get(EquipManager).onReqEnchantChange(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId(), this.cur_pos, () => {
                this.refresh(false);
            }, this);
             */
        };
        /**
         * 响应突破按钮点击事件
         */
        RoleEquipEnchantView.prototype.onClick_btnBreach = function () {
            var _this = this;
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            var my_equip = my_info.getEquipByPos(this.cur_pos);
            // 突破所需等级
            var my_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
            var need_lv = my_equip.enchant_breach_need_lv;
            if (!(my_lv >= need_lv)) {
                return;
            }
            UtilsEffect.buttonEffect(this.btnBreach, function () {
                if (!Singleton.Get(BagManager).hasEnough(Template.config.EnchantBreach, my_equip.enchant_breach_cost)) {
                    Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(Template.config.EnchantBreach);
                    return;
                }
                Singleton.Get(EquipManager).onReqEnchantBreach(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId(), _this.cur_pos, function () {
                    _this.refresh(false);
                    Singleton.Get(LayerManager).getView(ui.RoleBaseView).onAlarmEquip();
                    Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
                    _this.groupSuccess.visible = true;
                    _this.groupSuccess.scaleX = 1.6;
                    _this.groupSuccess.scaleY = 1.6;
                    _this.groupSuccess.alpha = 0;
                    var tw_success = egret.Tween.get(_this.groupSuccess);
                    tw_success.to({ scaleX: 1, scaleY: 1, alpha: 1 }, 120, egret.Ease.sineOut).wait(500).to({ alpha: 0, scaleX: 0.6, scaleY: 0.6 }, 60, egret.Ease.sineOut).call(function () {
                        _this.groupSuccess.visible = false;
                    }, _this);
                }, _this);
            }, this);
        };
        RoleEquipEnchantView.prototype.onClick_btnBreachDiamond = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnBreachDiamond, function () {
                var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
                var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
                var my_equip = my_info.getEquipByPos(_this.cur_pos);
                if (!(Singleton.Get(PlayerInfoManager).getDiamond() >= my_equip.enchant_breach_cost_dmd)) {
                    Singleton.Get(DialogControler).showInfo(1209);
                    return;
                }
                Singleton.Get(EquipManager).onReqEnchantBreachDmd(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId(), _this.cur_pos, function () {
                    _this.refresh(false);
                    Singleton.Get(LayerManager).getView(ui.RoleBaseView).onAlarmEquip();
                    Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
                    _this.groupSuccess.visible = true;
                    _this.groupSuccess.scaleX = 1.6;
                    _this.groupSuccess.scaleY = 1.6;
                    _this.groupSuccess.alpha = 0;
                    var tw_success = egret.Tween.get(_this.groupSuccess);
                    tw_success.to({ scaleX: 1, scaleY: 1, alpha: 1 }, 120, egret.Ease.sineOut).wait(500).to({ alpha: 0, scaleX: 0.6, scaleY: 0.6 }, 60, egret.Ease.sineOut).call(function () {
                        _this.groupSuccess.visible = false;
                    }, _this);
                }, _this);
            }, this);
        };
        RoleEquipEnchantView.prototype.onClick_btnConst = function () {
            return __awaiter(this, void 0, void 0, function () {
                var role_id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnConst)];
                        case 1:
                            _a.sent();
                            role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
                            Singleton.Get(LayerManager).getView(ui.RoleEquipEnchantConstView).open(role_id, this.cur_pos);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return RoleEquipEnchantView;
    }(BaseUI));
    ui.RoleEquipEnchantView = RoleEquipEnchantView;
    __reflect(RoleEquipEnchantView.prototype, "ui.RoleEquipEnchantView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleEquipEnchantView.js.map