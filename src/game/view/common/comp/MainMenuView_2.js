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
    var MainMenuView_2 = (function (_super) {
        __extends(MainMenuView_2, _super);
        function MainMenuView_2() {
            var _this = _super.call(this) || this;
            _this.m_last_tick = 0;
            _this.m_btns = [];
            _this.m_sort = [];
            _this.m_is_hide = true;
            _this.m_is_animate = false;
            _this.m_last_toggle = 0;
            _this.skinName = "yw.comp.MainSubMenu_2";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        MainMenuView_2.prototype.onAddToStage = function () {
            this.refreshExBtnsStatus();
            this.labBtn9.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.MAIL).Name);
            this.labBtn10.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.RANKLIST).Name);
            this.labBtn11.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.DMG).Name);
            this.labBtn12.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.VIP).Name);
            this.labBtn13.text = Template.getGUIText(Template.iconBtn.get(ui.E_MAIN_ICON.ACT_EX_ROLE).Name);
            this.btnMail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMail, this);
            this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRank, this);
            this.btnDmg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDmg, this);
            this.btnVipShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnVipShop, this);
            this.btnExRole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExRole, this);
            this.btnToggle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnToggle, this);
            this.loadSetting();
            if (this.m_is_hide) {
                this.resetAsHide();
            }
            else {
                this.imgToggle.scaleX = -1;
            }
            Singleton.Get(RegisterUpdate).register(this);
        };
        MainMenuView_2.prototype.onRemoveFromStage = function () {
            this.btnMail.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMail, this);
            this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRank, this);
            this.btnDmg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDmg, this);
            this.btnVipShop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnVipShop, this);
            this.btnExRole.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExRole, this);
            this.btnToggle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnToggle, this);
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        MainMenuView_2.prototype.update = function () {
            var now = UtilsGame.Now();
            if (now - this.m_last_tick > DEFINE.ALARM_MAIN_UPDATE_DURATION) {
                this.m_last_tick = now;
                this.refreshBtnDmgNew();
                this.refreshExBtnsStatus();
                if (!this.m_is_hide) {
                    this.sortIcons();
                }
                if (!this.m_is_animate) {
                    if (this.m_is_hide) {
                        this.imgToggleNew.visible = this.imgMailNew.visible || this.imgDmgNew.visible || this.imgExRoleNew.visible;
                    }
                    else {
                        this.imgToggleNew.visible = false;
                    }
                }
            }
        };
        // region 红点刷新
        MainMenuView_2.prototype.refreshBtnDmgNew = function () {
            this.imgDmgNew.visible = OpenManager.CheckOpen(OpenType.Dmg) && Singleton.Get(DmgManager).getDmgInfo().al_rewards;
        };
        MainMenuView_2.prototype.refreshBtnMailNew = function () {
            this.imgMailNew.visible = Singleton.Get(MailManager).getIsUnread();
        };
        MainMenuView_2.prototype.refreshExBtnsStatus = function () {
            var is_open = ActivityUtil.isActOpen(E_ACT_DESIGN_TYPE.ExRole).open && OpenManager.CheckOpen(OpenType.ActExRole);
            if (is_open) {
                this.m_sort = Template.config.SubmenuSort2;
                this.m_btns = [this.btnMail, this.btnRank, this.btnDmg, this.btnVipShop, this.btnExRole];
                this.btnExRole.visible = true;
                this.groupBtn.x = 8;
            }
            else {
                var idx = Template.config.SubmenuSort2.indexOf(ui.E_MAIN_ICON.ACT_EX_ROLE);
                if (idx >= 0) {
                    var sort = UtilsArray.duplicate(Template.config.SubmenuSort2);
                    sort.splice(idx, 1);
                    this.m_sort = sort;
                }
                this.m_btns = [this.btnMail, this.btnRank, this.btnDmg, this.btnVipShop];
                this.btnExRole.visible = false;
                this.groupBtn.x = 8 + 58;
            }
        };
        // endregion
        MainMenuView_2.prototype.onClick_btnMail = function (e) {
            UtilsEffect.buttonEffect(this.btnMail, function () {
                Singleton.Get(LayerManager).getView(ui.MailView).open();
            }, this);
        };
        MainMenuView_2.prototype.onClick_btnRank = function (e) {
            UtilsEffect.buttonEffect(this.btnRank, function () {
                if (!OpenManager.CheckOpenWithInfo(OpenType.Rank)) {
                    return;
                }
                var layer = Singleton.Get(LayerManager);
                var return_to_school = layer.isViewOnStage(layer.getView(ui.SchoolView));
                Singleton.Get(ui.MainView).onClick_btnCastle(undefined);
                Singleton.Get(LayerManager).getView(ui.RankView).open();
                Singleton.Get(LayerManager).getView(ui.RankView).return_to_school = return_to_school;
            }, this);
        };
        MainMenuView_2.prototype.onClick_btnDmg = function () {
            UtilsEffect.buttonEffect(this.btnDmg, function () {
                if (OpenManager.CheckOpenWithInfo(OpenType.Dmg)) {
                    Singleton.Get(LayerManager).getView(ui.DmgView).open();
                }
            }, this);
        };
        MainMenuView_2.prototype.onClick_btnVipShop = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnVipShop, function () {
                var shop_entity = Template.shop.get(2);
                if (shop_entity == undefined) {
                    return;
                }
                switch (shop_entity.TellType) {
                    case 1:
                        var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
                        if (my_vip < shop_entity.TellPar) {
                            Singleton.Get(DialogControler).showString("VIP" + shop_entity.TellPar + "\u89E3\u9501\u8BE5\u5546\u5E97");
                            return;
                        }
                        break;
                    case 2:
                        if (!ShopUtil.isShopUnlocked(shop_entity.Id)) {
                            return;
                        }
                        break;
                }
                var back_to_battle = Singleton.Get(LayerManager).getView(ui.MainView).imgBtnBattleActive.visible;
                var layer = Singleton.Get(LayerManager);
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                layer.getView(ui.ShopListView).open(shop_entity, false, function () {
                    if (back_to_battle) {
                        Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(undefined);
                    }
                    else {
                        Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnCastle(undefined);
                    }
                }, _this);
            }, this);
        };
        MainMenuView_2.prototype.onClick_btnExRole = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnExRole)];
                        case 1:
                            _a.sent();
                            Singleton.Get(LayerManager).getView(ui.ActSpExRoleView).open();
                            this.imgExRoleNew.visible = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        MainMenuView_2.prototype.onClick_btnToggle = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var now;
                return __generator(this, function (_a) {
                    now = UtilsGame.Now();
                    if (now - this.m_last_toggle < 1000) {
                        return [2 /*return*/];
                    }
                    if (!this.m_is_hide) {
                        this.m_is_hide = true;
                        this.saveSetting(true);
                        this.m_last_toggle = now;
                        this.playToggle();
                    }
                    else {
                        this.m_last_toggle = now;
                        this.imgToggleNew.visible = false;
                        this.m_is_animate = true;
                        this.playReToggle(function () {
                            _this.m_is_animate = false;
                            _this.m_is_hide = false;
                            _this.saveSetting(false);
                        }, this);
                    }
                    return [2 /*return*/];
                });
            });
        };
        // region 列表排序
        MainMenuView_2.prototype.sortIcons = function () {
            var rule = this.m_sort;
            if (rule.length != this.m_btns.length) {
                console.error("can't sort icons, rule is illegal.");
                return;
            }
            var order = 0;
            for (var i = 0; i < this.m_btns.length; i++) {
                var idx = this.getBtnIdx(rule[i]);
                if (idx < 0 || idx > this.m_btns.length - 1) {
                    continue;
                }
                var target = this.m_btns[idx];
                if (!target.visible) {
                    continue;
                }
                target.x = 29 + 58 * order;
                order++;
            }
            this.btnToggle.x = 29 + 58 * order;
        };
        MainMenuView_2.prototype.getBtnIdx = function (type) {
            return type - 1 - 8;
        };
        // endregion
        // region 收缩动画
        /**
         * 播放收缩
         */
        MainMenuView_2.prototype.playToggle = function () {
            var pos_xs = this.getPosis();
            for (var i = 0; i < this.m_btns.length; i++) {
                var id = i;
                var target = this.m_btns[id];
                var tw = egret.Tween.get(target);
                if (!tw) {
                    continue;
                }
                tw.wait(i * 80).to({ x: pos_xs[id] + 58, alpha: 0 }, 240, egret.Ease.sineOut);
            }
            var tw_toggle = egret.Tween.get(this.btnToggle);
            tw_toggle.to({ x: 29 + 58 * this.m_btns.length }, 600, egret.Ease.sineOut);
            var tw_toggle_img = egret.Tween.get(this.imgToggle);
            tw_toggle_img.to({ scaleX: 1 }, 180, egret.Ease.bounceOut);
        };
        /**
         * 播放扩展
         */
        MainMenuView_2.prototype.playReToggle = function (callback, thisObj) {
            var pos_xs = this.getPosis();
            for (var i = 0; i < this.m_btns.length; i++) {
                var id = i;
                var target = this.m_btns[id];
                var tw = egret.Tween.get(target);
                if (!tw) {
                    continue;
                }
                tw.wait((this.m_btns.length - 1 - i) * 80).to({ x: pos_xs[id], alpha: 1 }, 240, egret.Ease.sineOut);
            }
            var tw_toggle = egret.Tween.get(this.btnToggle);
            tw_toggle.to({ x: 29 + 58 * this.m_btns.length }, 600, egret.Ease.sineOut);
            var tw_toggle_img = egret.Tween.get(this.imgToggle);
            tw_toggle_img.to({ scaleX: -1 }, 180, egret.Ease.bounceOut);
            Singleton.Get(UpdateTimer).addAndStart(800, function () {
                if (callback) {
                    callback.call(thisObj);
                }
            }, this);
        };
        MainMenuView_2.prototype.resetAsHide = function () {
            var pos_xs = this.getPosis();
            for (var i = 0; i < this.m_btns.length; i++) {
                var target = this.m_btns[i];
                if (!target) {
                    continue;
                }
                target.alpha = 0;
                target.x = pos_xs[i] + 58;
            }
            this.imgToggle.scaleX = 1;
            this.btnToggle.x = 29 + 58 * this.m_btns.length;
        };
        MainMenuView_2.prototype.getPosis = function () {
            var result = [];
            var rule = this.m_sort;
            if (rule.length != this.m_btns.length) {
                console.error("can't sort icons, rule is illegal.");
                return;
            }
            var order = 0;
            for (var i = 0; i < this.m_btns.length; i++) {
                var idx = this.getBtnIdx(rule[i]);
                if (idx < 0 || idx > this.m_btns.length - 1) {
                    continue;
                }
                var target = this.m_btns[idx];
                if (!target.visible) {
                    result.push(0);
                    continue;
                }
                var pos_x = 29 + 58 * order;
                result.push(pos_x);
                order++;
            }
            result.push(29 + 58 * order);
            return result;
        };
        MainMenuView_2.prototype.getMinIdx = function (idx_min, arr) {
            var target = UtilsArray.duplicate(arr);
            var min_id = 0;
            for (var i = 0; i < (idx_min + 1); i++) {
                var min = -1;
                for (var i_1 = 0; i_1 < target.length; i_1++) {
                    if (min == -1) {
                        min = target[i_1];
                        min_id = i_1;
                        continue;
                    }
                    if (target[i_1] < min) {
                        min = target[i_1];
                        min_id = i_1;
                    }
                }
                target.splice(i, 1);
            }
            return min_id;
        };
        // endregion
        // region 设置保存
        MainMenuView_2.prototype.saveSetting = function (value) {
            localStorage.setItem(DEFINE.MENU_STATUS_SAVE_KEY, value ? "1" : "0");
        };
        MainMenuView_2.prototype.loadSetting = function () {
            var status = localStorage.getItem(DEFINE.MENU_STATUS_SAVE_KEY);
            if (status != undefined) {
                this.m_is_hide = parseInt(status) == 1 ? true : false;
            }
            else {
                var team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
                if (team_lv > 30) {
                    this.m_is_hide = false;
                    this.saveSetting(false);
                }
                else {
                    this.m_is_hide = true;
                    this.saveSetting(true);
                }
            }
        };
        return MainMenuView_2;
    }(eui.Component));
    ui.MainMenuView_2 = MainMenuView_2;
    __reflect(MainMenuView_2.prototype, "ui.MainMenuView_2", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=MainMenuView_2.js.map