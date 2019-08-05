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
    var RoleEquipExchangeView = (function (_super) {
        __extends(RoleEquipExchangeView, _super);
        function RoleEquipExchangeView() {
            var _this = _super.call(this, "yw.RoleEquipExchangeSkin") || this;
            _this.m_sel_id_0 = 0;
            _this.m_sel_id_1 = 0;
            _this.labAttrs0 = [_this.labEquipStr0, _this.labEquipRefine0, _this.labEquipEnchant0, _this.labRingStr0, _this.labRingEvo0, _this.labNecklaceStr0, _this.labNecklaceEvo0];
            _this.labAttrs1 = [_this.labEquipStr1, _this.labEquipRefine1, _this.labEquipEnchant1, _this.labRingStr1, _this.labRingEvo1, _this.labNecklaceStr1, _this.labNecklaceEvo1];
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        RoleEquipExchangeView.prototype.componentCreated = function () { };
        ;
        RoleEquipExchangeView.prototype.onDestroy = function () { };
        ;
        RoleEquipExchangeView.prototype.onUpdate = function (time) { };
        ;
        RoleEquipExchangeView.prototype.onAddToStage = function () {
            this.data = {
                txt_equip_str: Template.getGUIText("ui_huhuan3"),
                txt_equip_rfn: Template.getGUIText("ui_huhuan4"),
                txt_equip_eht: Template.getGUIText("ui_huhuan5"),
                txt_ring_str: Template.getGUIText("ui_huhuan6"),
                txt_ring_evo: Template.getGUIText("ui_huhuan7"),
                txt_necklace_str: Template.getGUIText("ui_huhuan8"),
                txt_necklace_evo: Template.getGUIText("ui_huhuan9"),
                txt_no_role: "未选择斗士",
                txt_rule: "说 明"
            };
            this.ar1.scaleX = -1;
            this.btnChange0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange0, this);
            this.btnChange1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange1, this);
            this.btnExchange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExchange, this);
            this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRule, this);
        };
        RoleEquipExchangeView.prototype.onRemoveFromStage = function () {
            this.btnChange0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange0, this);
            this.btnChange1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange1, this);
            this.btnExchange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExchange, this);
            this.btnRule.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRule, this);
        };
        RoleEquipExchangeView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
        };
        RoleEquipExchangeView.prototype.close = function () {
            this.resetExchange();
            Singleton.Get(LayerManager).removeView(this);
        };
        RoleEquipExchangeView.prototype.refresh = function (type) {
            switch (type) {
                case 0:
                    this.initChara0();
                    break;
                case 1:
                    this.initChara1();
                    break;
                default:
                    this.initChara0();
                    this.initChara1();
                    break;
            }
            this.initExchange();
            this.initButton();
        };
        RoleEquipExchangeView.prototype.initExchange = function () {
            var is_changable = this.is_sel_anyrole;
            this.btnExchange.visible = is_changable;
            this.groupTrans.visible = is_changable;
            this.groupNoRole.visible = !is_changable;
            if (this.groupTrans.visible) {
                this.tgTrans.stop();
                this.tgTrans.play();
            }
            for (var i = 0; i < this.labAttrs0.length; i++) {
                var val_0 = parseInt(this.labAttrs0[i].text);
                var val_1 = parseInt(this.labAttrs1[i].text);
                if (val_0 > val_1) {
                    this.labAttrs0[i].textColor = DEFINE_COLOR.UP_GREEN;
                    this.labAttrs1[i].textColor = DEFINE_COLOR.DOWN_RED;
                }
                else if (val_0 < val_1) {
                    this.labAttrs1[i].textColor = DEFINE_COLOR.UP_GREEN;
                    this.labAttrs0[i].textColor = DEFINE_COLOR.DOWN_RED;
                }
                else {
                    this.labAttrs1[i].textColor = 0x624C30;
                    this.labAttrs0[i].textColor = 0x624C30;
                }
            }
        };
        RoleEquipExchangeView.prototype.resetExchange = function () {
            if (this.is_sel_anyrole) {
                this.ar0.clearMovieClip();
                this.ar1.clearMovieClip();
            }
            this.sel_id_0 = 0;
            this.sel_id_1 = 0;
            for (var i = 0; i < this.labAttrs0.length; i++) {
                this.labAttrs0[i].text = "0";
                this.labAttrs1[i].text = "0";
            }
        };
        RoleEquipExchangeView.prototype.initChara0 = function () {
            var role_id = this.sel_id_0;
            if (role_id <= 0) {
                this.groupAttr0.visible = false;
                this.btnChange0.text = Template.getGUIText("ui_huhuan10");
            }
            else {
                this.groupAttr0.visible = true;
                this.btnChange0.text = Template.getGUIText("ui_huhuan11");
                var cfg_role = Template.role.get(role_id);
                if (!cfg_role) {
                    console.error("no cfg role: " + role_id);
                    return;
                }
                var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
                if (!inf_role) {
                    console.error("no inf role: " + role_id);
                    return;
                }
                this.ar0.setMovieClip(cfg_role.Res, battle.ActionType.AT_wait);
                this.ar0.doAction(UtilsGame.getRandomInt(0, 1) == 0 ? battle.ActionType.AT_attack : battle.ActionType.AT_skill);
                this.labName0.text = Template.getGUIText(cfg_role.Name);
                this.labEquipStr0.text = inf_role.getAllEquipStr().toString();
                this.labEquipRefine0.text = inf_role.getAllEquipRefine().toString();
                this.labEquipEnchant0.text = inf_role.getAllEquipEnchant().toString();
                var eq_ring = inf_role.getJewelryByPos(EquipPos.Ring);
                var eq_necklace = inf_role.getJewelryByPos(EquipPos.Necklace);
                if (!eq_ring || !eq_necklace) {
                    console.error("no ring or no necklace", { ring: eq_ring, necklace: eq_necklace });
                    return;
                }
                this.labRingStr0.text = eq_ring.stg_lv.toString();
                this.labRingEvo0.text = eq_ring.evo_lv.toString();
                this.labNecklaceStr0.text = eq_necklace.stg_lv.toString();
                this.labNecklaceEvo0.text = eq_necklace.evo_lv.toString();
            }
        };
        RoleEquipExchangeView.prototype.initChara1 = function () {
            var role_id = this.sel_id_1;
            if (role_id <= 1) {
                this.groupAttr1.visible = false;
                this.btnChange1.text = Template.getGUIText("ui_huhuan10");
            }
            else {
                this.groupAttr1.visible = true;
                this.btnChange1.text = Template.getGUIText("ui_huhuan11");
                var cfg_role = Template.role.get(role_id);
                if (!cfg_role) {
                    console.error("no cfg role: " + role_id);
                    return;
                }
                var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
                if (!inf_role) {
                    console.error("no inf role: " + role_id);
                    return;
                }
                this.ar1.setMovieClip(cfg_role.Res, battle.ActionType.AT_wait);
                this.ar1.doAction(UtilsGame.getRandomInt(0, 1) == 0 ? battle.ActionType.AT_attack : battle.ActionType.AT_skill);
                this.labName1.text = Template.getGUIText(cfg_role.Name);
                this.labEquipStr1.text = inf_role.getAllEquipStr().toString();
                this.labEquipRefine1.text = inf_role.getAllEquipRefine().toString();
                this.labEquipEnchant1.text = inf_role.getAllEquipEnchant().toString();
                var eq_ring = inf_role.getJewelryByPos(EquipPos.Ring);
                var eq_necklace = inf_role.getJewelryByPos(EquipPos.Necklace);
                if (!eq_ring || !eq_necklace) {
                    console.error("no ring or no necklace", { ring: eq_ring, necklace: eq_necklace });
                    return;
                }
                this.labRingStr1.text = eq_ring.stg_lv.toString();
                this.labRingEvo1.text = eq_ring.evo_lv.toString();
                this.labNecklaceStr1.text = eq_necklace.stg_lv.toString();
                this.labNecklaceEvo1.text = eq_necklace.evo_lv.toString();
            }
        };
        RoleEquipExchangeView.prototype.initButton = function () {
            var cost_num = Template.config.Exchange;
            this.btnExchange.text = Template.getGUIText("ui_huhuan12");
            this.btnExchange.icon = DEFINE.UI_ALERT_INFO.diamond.resPNG;
            this.btnExchange.cost = UtilsGame.numberToString(cost_num);
            var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
            this.btnExchange.enough = my_diamond >= cost_num;
        };
        RoleEquipExchangeView.prototype.onClick_btnChange0 = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnChange0)];
                        case 1:
                            _a.sent();
                            Singleton.Get(LayerManager).getView(ui.RoleSelectView).open(this.exclude, this.onSelect, this, 0);
                            return [2 /*return*/];
                    }
                });
            });
        };
        RoleEquipExchangeView.prototype.onClick_btnChange1 = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnChange1)];
                        case 1:
                            _a.sent();
                            Singleton.Get(LayerManager).getView(ui.RoleSelectView).open(this.exclude, this.onSelect, this, 1);
                            return [2 /*return*/];
                    }
                });
            });
        };
        RoleEquipExchangeView.prototype.onClick_btnExchange = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var cost_diamond, my_diamond;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnExchange)];
                        case 1:
                            _a.sent();
                            if (this.sel_id_0 <= 0 || this.sel_id_1 <= 0) {
                                Singleton.Get(DialogControler).showInfo(1215);
                                return [2 /*return*/];
                            }
                            cost_diamond = Template.config.Exchange;
                            my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
                            if (my_diamond < cost_diamond) {
                                Singleton.Get(MessageManager).handleRtSub(1005);
                                return [2 /*return*/];
                            }
                            Singleton.Get(DialogControler).showInfo(1214, this, function () {
                                Singleton.Get(EquipManager).onReqExchange(_this.sel_id_0, _this.sel_id_1, function () {
                                    Singleton.Get(LayerManager).getView(ui.EffectUpView).open();
                                    Singleton.Get(LayerManager).getView(ui.EffectUpView).play(Template.getGUIText("ui_huhuan13"));
                                    _this.resetExchange();
                                }, _this);
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        RoleEquipExchangeView.prototype.onSelect = function (role_id, args) {
            switch (args[0]) {
                case 0:
                    this.sel_id_0 = role_id;
                    break;
                case 1:
                    this.sel_id_1 = role_id;
                    break;
                default:
                    console.error("cant apply onSelect(), incorrect pos: " + args[0]);
                    break;
            }
        };
        ;
        RoleEquipExchangeView.prototype.onClick_btnRule = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnRule)];
                        case 1:
                            _a.sent();
                            Singleton.Get(LayerManager).getView(ui.RoleEquipExchangeRuleView).open();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(RoleEquipExchangeView.prototype, "is_sel_anyrole", {
            get: function () {
                return (this.sel_id_0 > 0 || this.sel_id_1 > 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleEquipExchangeView.prototype, "exclude", {
            get: function () {
                var result = [];
                if (this.sel_id_0 > 0) {
                    result.push(this.sel_id_0);
                }
                if (this.sel_id_1 > 0) {
                    result.push(this.sel_id_1);
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleEquipExchangeView.prototype, "sel_id_0", {
            get: function () {
                return this.m_sel_id_0;
            },
            set: function (value) {
                this.m_sel_id_0 = value;
                this.refresh(0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleEquipExchangeView.prototype, "sel_id_1", {
            get: function () {
                return this.m_sel_id_1;
            },
            set: function (value) {
                this.m_sel_id_1 = value;
                this.refresh(1);
            },
            enumerable: true,
            configurable: true
        });
        return RoleEquipExchangeView;
    }(BaseUI));
    ui.RoleEquipExchangeView = RoleEquipExchangeView;
    __reflect(RoleEquipExchangeView.prototype, "ui.RoleEquipExchangeView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleEquipExchangeView.js.map