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
    var RoleJewelryEvolutionView = (function (_super) {
        __extends(RoleJewelryEvolutionView, _super);
        function RoleJewelryEvolutionView() {
            var _this = _super.call(this, "yw.RoleJewelryEvolutionSkin") || this;
            _this.m_cur_pos = 0;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        RoleJewelryEvolutionView.prototype.componentCreated = function () { };
        RoleJewelryEvolutionView.prototype.onDestroy = function () { };
        RoleJewelryEvolutionView.prototype.onUpdate = function (time) { };
        RoleJewelryEvolutionView.prototype.onAddToStage = function () {
            this.btnSubmit.text = "提升";
            this.btnSubmitEx.text = "一键直升";
            this.posRing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posRing, this);
            this.posNecklace.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posNecklace, this);
            this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
            this.btnSubmitEx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmitEx, this);
            this.mcSelectedBack.setCallback(this.onEffectEnd, this);
            this.mcRingBack.setCallback(this.onEffectEnd, this);
            this.mcNecklaceBack.setCallback(this.onEffectEnd, this);
        };
        RoleJewelryEvolutionView.prototype.onRemoveFromStage = function () {
            this.posRing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posRing, this);
            this.posNecklace.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posNecklace, this);
            this.btnSubmit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
            this.btnSubmitEx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmitEx, this);
        };
        RoleJewelryEvolutionView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.initJewelryInfo();
            this.initCurPos(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurJewPos());
            Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
        };
        RoleJewelryEvolutionView.prototype.openPos = function (pos) {
            Singleton.Get(LayerManager).addView(this);
            this.initJewelryInfo();
            this.initCurPos(pos);
            Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
        };
        RoleJewelryEvolutionView.prototype.close = function () {
            Singleton.Get(LayerManager).removeView(this);
        };
        RoleJewelryEvolutionView.prototype.refresh = function (reset) {
            if (reset === void 0) { reset = true; }
            if (Singleton.Get(LayerManager).isViewOnStage(this)) {
                this.initJewelryInfo();
                if (reset || this.m_cur_pos < EquipPos.Ring) {
                    this.initCurPos(EquipPos.Ring);
                }
                else {
                    this.initCurPos(this.m_cur_pos);
                }
            }
        };
        RoleJewelryEvolutionView.prototype.initJewelryInfo = function () {
            // 获取当前选中的角色
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (!inf_role) {
                console.error("no my role: " + role_id);
                return;
            }
            // 获取角色基本配置
            var cfg_role = Template.role.get(role_id);
            if (!cfg_role) {
                console.error("no role: " + role_id);
                return;
            }
            // 具体逻辑
            var my_ring = inf_role.getJewelryByPos(EquipPos.Ring);
            // this.labRingStar.text = my_ring.evo_lv.toString();
            this.imgRingNew.visible = my_ring.isEvoAble();
            this.groupRingItem.visible = true;
            ResManager.AsyncSetTexture(this.imgRingIcon, my_ring.getJewInfo().Icon[my_ring.evo_lv]);
            ResManager.AsyncSetTexture(this.imgRingTier, Common.getJewTierBgRes(my_ring.evo_lv));
            var my_necklace = inf_role.getJewelryByPos(EquipPos.Necklace);
            // this.labNecklaceStar.text = my_necklace.evo_lv.toString();
            this.imgNecklaceNew.visible = my_necklace.isEvoAble();
            this.groupNecklaceItem.visible = true;
            ResManager.AsyncSetTexture(this.imgNecklaceIcon, my_necklace.getJewInfo().Icon[my_necklace.evo_lv]);
            ResManager.AsyncSetTexture(this.imgNecklaceTier, Common.getJewTierBgRes(my_necklace.evo_lv));
        };
        RoleJewelryEvolutionView.prototype.initCurPos = function (pos) {
            if (pos === void 0) { pos = EquipPos.Null; }
            if (pos == EquipPos.Null) {
                pos = this.m_cur_pos;
            }
            if (pos == EquipPos.Null || pos < EquipPos.Ring) {
                console.error("wrong pos: " + pos);
                return;
            }
            this.m_cur_pos = pos;
            this.activatePos(this.m_cur_pos);
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            var inf_jew = inf_role.getJewelryByPos(pos);
            ResManager.AsyncSetTexture(this.imgSelected, Common.getEquipPosRes(pos));
            this.labSelectedStar.text = Template.getGUIText(inf_jew.getJewInfo().Name) + " " + inf_jew.evo_lv + "阶";
            this.labSelectedStr.text = "Lv." + inf_jew.stg_lv.toString();
            // this.labSelectedEvo.text = inf_jew.evo_lv.toString();
            this.groupSelectedItem.visible = true;
            ResManager.AsyncSetTexture(this.imgSelectedIcon, inf_jew.getJewInfo().Icon[inf_jew.evo_lv]);
            ResManager.AsyncSetTexture(this.imgSelectedTier, Common.getJewTierBgRes(inf_jew.evo_lv));
            // 经验值进度条
            var cfg_eup = Template.equipup.get(inf_jew.evo_lv);
            var next_exp = cfg_eup.JewelryExp;
            if (next_exp <= 0) {
                this.progExp.value = 100;
                this.labExp.text = "MAX";
            }
            else {
                var cur_exp = inf_jew.evo_exp;
                this.progExp.value = cur_exp / next_exp * 100;
                this.labExp.text = UtilsGame.numberToString(cur_exp) + "/" + UtilsGame.numberToString(next_exp);
            }
            // 计算属性
            var evo_attr = inf_jew.getCurAttr();
            var next_evo_attr = inf_jew.getNextEvoAttr();
            this.labTxtCurAttr1.text = RoleUtil.GetAttrPrefixString(evo_attr[0][0]);
            this.labCurAttr1.text = Common.attrValueHandlerWithPct(evo_attr[0][1], evo_attr[0][0]);
            this.labTxtNextAttr1.text = RoleUtil.GetAttrPrefixString(next_evo_attr[0][0]);
            this.labNextAttr1.text = Common.attrValueHandlerWithPct(next_evo_attr[0][1], next_evo_attr[0][0]);
            if (evo_attr.length >= 2) {
                this.labTxtCurAttr2.text = RoleUtil.GetAttrPrefixString(evo_attr[1][0]);
                this.labCurAttr2.text = Common.attrValueHandlerWithPct(evo_attr[1][1], evo_attr[1][0]);
                this.labTxtNextAttr2.text = RoleUtil.GetAttrPrefixString(next_evo_attr[1][0]);
                this.labNextAttr2.text = Common.attrValueHandlerWithPct(next_evo_attr[1][1], next_evo_attr[0][0]);
            }
            else {
                this.labTxtCurAttr2.text = "";
                this.labCurAttr2.text = "";
                this.labTxtNextAttr2.text = "";
                this.labNextAttr2.text = "";
            }
            if (evo_attr.length >= 3) {
                this.labTxtCurAttr3.text = RoleUtil.GetAttrPrefixString(evo_attr[2][0]);
                this.labCurAttr3.text = Common.attrValueHandlerWithPct(evo_attr[2][1], evo_attr[2][0]);
                this.labTxtNextAttr3.text = RoleUtil.GetAttrPrefixString(next_evo_attr[2][0]);
                this.labNextAttr3.text = Common.attrValueHandlerWithPct(next_evo_attr[2][1], next_evo_attr[0][0]);
            }
            else {
                this.labTxtCurAttr3.text = "";
                this.labCurAttr3.text = "";
                this.labTxtNextAttr3.text = "";
                this.labNextAttr3.text = "";
            }
            // 已达最高进阶等级
            if (inf_jew.isEvoMax()) {
                this.groupOper.visible = false;
                this.groupMax.visible = true;
                this.groupNextLv.visible = false;
                this.groupNextAttr.visible = false;
                this.imgTrans.visible = false;
                this.labNeedLv.visible = false;
            }
            else {
                this.groupOper.visible = true;
                this.groupMax.visible = false;
                this.groupNextLv.visible = true;
                this.groupNextAttr.visible = true;
                this.imgTrans.visible = true;
                var team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
                this.labNeedLv.visible = true;
                this.labNeedLv.text = "需要等级：" + inf_jew.getEvoLevel();
                this.labNeedLv.textColor = team_lv >= inf_jew.getEvoLevel() ? DEFINE_COLOR.OK_GREEN : DEFINE_COLOR.WARN_RED;
                // 普通进阶按钮
                var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
                var cost_item_id = inf_jew.getEvoUpItem();
                var my_cost_item = Singleton.Get(BagManager).getItemCount(cost_item_id);
                var cfg_cost_item = Template.item.get(cost_item_id);
                var once_item_enough = (my_cost_item >= inf_jew.getEvoUpCost());
                // const once_dmd_enough: boolean = (my_diamond >= inf_jew.getEvoUpCost() * cfg_cost_item.Cost);
                this.btnSubmit.active = inf_jew.isEvoLevel();
                this.btnSubmitEx.active = inf_jew.isEvoLevel();
                // if (!once_item_enough && once_dmd_enough) {
                //     this.btnSubmit.icon = DEFINE.UI_ALERT_INFO.diamond.resPNG;
                //     this.btnSubmit.cost = UtilsGame.numberToString(inf_jew.getEvoUpCost() * cfg_cost_item.Cost);
                //     this.btnSubmit.enough = once_dmd_enough;
                // } else {
                this.btnSubmit.icon = cfg_cost_item.iIcon;
                this.btnSubmit.cost = UtilsGame.numberToString(my_cost_item) + "/" + UtilsGame.numberToString(inf_jew.getEvoUpCost());
                this.btnSubmit.enough = once_item_enough;
                // }
                // 钻石进阶按钮
                var ex_cost_item = inf_jew.getEvoUpOnekeyCost();
                var ex_cost_diamond = cfg_cost_item.Cost * ex_cost_item;
                var ex_item_enough = my_cost_item >= ex_cost_item;
                var ex_dmd_enough = my_diamond >= ex_cost_diamond;
                if (!ex_item_enough) {
                    this.btnSubmitEx.icon = DEFINE.UI_ALERT_INFO.diamond.resPNG;
                    this.btnSubmitEx.cost = UtilsGame.numberToString(ex_cost_diamond);
                    this.btnSubmitEx.enough = ex_dmd_enough;
                }
                else {
                    this.btnSubmitEx.icon = cfg_cost_item.iIcon;
                    this.btnSubmitEx.cost = UtilsGame.numberToString(my_cost_item) + "/" + UtilsGame.numberToString(ex_cost_item);
                    this.btnSubmitEx.enough = ex_item_enough;
                }
            }
        };
        // region 特效
        /**
         * 播放强化成功特效
         */
        RoleJewelryEvolutionView.prototype.playEffect = function (multi, pos_ex, up) {
            if (multi === void 0) { multi = false; }
            if (pos_ex === void 0) { pos_ex = []; }
            if (up === void 0) { up = false; }
            if (up) {
                Singleton.Get(LayerManager).getView(ui.EffectUpView).open();
                Singleton.Get(LayerManager).getView(ui.EffectUpView).play(Template.getGUIText("ui_role39"));
            }
            if (!multi) {
                this.playEffectBack(this.mcSelectedBack);
                this.playEffectFront(this.mcSelectedFront);
                return;
            }
            for (var i = 0; i < pos_ex.length; i++) {
                switch (pos_ex[i]) {
                    case EquipPos.Ring:
                        this.playEffectBack(this.mcRingBack);
                        this.playEffectFront(this.mcRingFront);
                        break;
                    case EquipPos.Necklace:
                        this.playEffectBack(this.mcNecklaceBack);
                        this.playEffectFront(this.mcNecklaceFront);
                        break;
                }
            }
        };
        /**
         * 清空强化成功特效
         */
        RoleJewelryEvolutionView.prototype.clearEffect = function () {
            this.onEffectEnd();
            this.mcSelectedBack.clearMovieClip();
            this.mcSelectedFront.clearMovieClip();
            this.mcRingBack.clearMovieClip();
            this.mcRingFront.clearMovieClip();
            this.mcNecklaceBack.clearMovieClip();
            this.mcNecklaceFront.clearMovieClip();
        };
        /**
         * 响应特效播放完成
         */
        RoleJewelryEvolutionView.prototype.onEffectEnd = function () {
            this.groupSuccess.visible = false;
            this.mcSelectedBack.visible = false;
            this.mcSelectedFront.visible = false;
            this.mcRingBack.visible = false;
            this.mcRingFront.visible = false;
            this.mcNecklaceBack.visible = false;
            this.mcNecklaceFront.visible = false;
        };
        RoleJewelryEvolutionView.prototype.playEffectBack = function (mc) {
            mc.visible = true;
            mc.clearMovieClip();
            mc.setMovieClip("ui_ten");
            mc.gotoAndPlay("ui_ten", 1);
        };
        RoleJewelryEvolutionView.prototype.playEffectFront = function (mc) {
            mc.visible = true;
            mc.clearMovieClip();
            mc.setMovieClip("ui_ten1");
            mc.gotoAndPlay("ui_ten1", 1);
        };
        // endregion
        // region 点击事件
        RoleJewelryEvolutionView.prototype.onClick_posRing = function () {
            this.initCurPos(EquipPos.Ring);
        };
        RoleJewelryEvolutionView.prototype.onClick_posNecklace = function () {
            this.initCurPos(EquipPos.Necklace);
        };
        RoleJewelryEvolutionView.prototype.activatePos = function (pos) {
            this.imgRingActive.visible = false;
            this.imgNecklaceActive.visible = false;
            switch (pos) {
                case EquipPos.Ring:
                    this.imgRingActive.visible = true;
                    break;
                case EquipPos.Necklace:
                    this.imgNecklaceActive.visible = true;
                    break;
            }
            Singleton.Get(LayerManager).getView(ui.RoleBaseView).updateCurJewPos(pos);
        };
        RoleJewelryEvolutionView.prototype.checkLv = function () {
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var pos = this.m_cur_pos;
            var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            var inf_jew = inf_role.getJewelryByPos(pos);
            return inf_jew.isEvoLevel();
        };
        RoleJewelryEvolutionView.prototype.checkDmd = function (is_onekey) {
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var pos = this.m_cur_pos;
            var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            var inf_jew = inf_role.getJewelryByPos(pos);
            var cost_item_id = inf_jew.getEvoUpItem();
            var my_cost_item = Singleton.Get(BagManager).getItemCount(cost_item_id);
            var cfg_cost_item = Template.item.get(cost_item_id);
            var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
            var cost_item_num = (is_onekey ? inf_jew.getEvoUpOnekeyCost() : inf_jew.getEvoUpCost());
            var cost_dmd_num = cost_item_num * cfg_cost_item.Cost;
            return (my_diamond >= cost_dmd_num);
        };
        RoleJewelryEvolutionView.prototype.checkMater = function (is_onekey) {
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var pos = this.m_cur_pos;
            var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            var inf_jew = inf_role.getJewelryByPos(pos);
            var cost_item_id = inf_jew.getEvoUpItem();
            var my_cost_item = Singleton.Get(BagManager).getItemCount(cost_item_id);
            var cfg_cost_item = Template.item.get(cost_item_id);
            return (my_cost_item >= (is_onekey ? inf_jew.getEvoUpOnekeyCost() : inf_jew.getEvoUpCost()));
        };
        RoleJewelryEvolutionView.prototype.getMaterId = function () {
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var pos = this.m_cur_pos;
            var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            var inf_jew = inf_role.getJewelryByPos(pos);
            return inf_jew.getEvoUpItem();
        };
        RoleJewelryEvolutionView.prototype.onClick_btnSubmit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var role_id, pos, cur_evo_lv;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnSubmit)];
                        case 1:
                            _a.sent();
                            role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
                            pos = this.m_cur_pos;
                            if (!this.checkLv()) {
                                Singleton.Get(DialogControler).showInfo(1209);
                                return [2 /*return*/];
                            }
                            if (!this.checkMater(false)) {
                                Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(this.getMaterId());
                                return [2 /*return*/];
                            }
                            cur_evo_lv = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id).getJewelryByPos(pos).evo_lv;
                            Singleton.Get(JewelryManager).reqEvo(role_id, pos, function () {
                                var after_evo_lv = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id).getJewelryByPos(pos).evo_lv;
                                _this.refresh(false);
                                _this.playEffect(true, [_this.m_cur_pos], cur_evo_lv != after_evo_lv);
                                Singleton.Get(LayerManager).getView(ui.RoleBaseView).onAlarmJewelry();
                                Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
                                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
                            }, this);
                            return [2 /*return*/];
                    }
                });
            });
        };
        RoleJewelryEvolutionView.prototype.onClick_btnSubmitEx = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var role_id, pos;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnSubmitEx)];
                        case 1:
                            _a.sent();
                            role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
                            pos = this.m_cur_pos;
                            if (!this.checkLv()) {
                                Singleton.Get(DialogControler).showInfo(1209);
                                return [2 /*return*/];
                            }
                            if (!this.checkDmd(true) && !this.checkMater(true)) {
                                // Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(this.getMaterId());
                                Singleton.Get(DialogControler).showInfo(1005, this, function () {
                                    Singleton.Get(LayerManager).getView(ui.PayView).open();
                                });
                                return [2 /*return*/];
                            }
                            Singleton.Get(JewelryManager).reqEvoAuto(role_id, pos, function () {
                                _this.refresh(false);
                                _this.playEffect(true, [_this.m_cur_pos], true);
                                Singleton.Get(LayerManager).getView(ui.RoleBaseView).onAlarmJewelry();
                                Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
                                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
                            }, this);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return RoleJewelryEvolutionView;
    }(BaseUI));
    ui.RoleJewelryEvolutionView = RoleJewelryEvolutionView;
    __reflect(RoleJewelryEvolutionView.prototype, "ui.RoleJewelryEvolutionView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleJewelryEvolutionView.js.map