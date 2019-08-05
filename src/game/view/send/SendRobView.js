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
    var SendRobView = (function (_super) {
        __extends(SendRobView, _super);
        function SendRobView() {
            var _this = _super.call(this, "yw.SendRobSkin") || this;
            _this.cur_status = "";
            _this.m_quest_id = 0;
            return _this;
        }
        SendRobView.prototype.componentCreated = function () {
            this.m_entries = new eui.ArrayCollection();
            this.dgTeams.itemRenderer = ui.SendRobItemRenderer;
            this.dgTeams.dataProvider = this.m_entries;
        };
        ;
        SendRobView.prototype.onDestroy = function () { };
        ;
        SendRobView.prototype.onUpdate = function () { };
        ;
        SendRobView.prototype.open = function (quest_id, status) {
            if (status === void 0) { status = E_SEND_ROB_TYPE.NORMAL; }
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.m_quest_id = quest_id;
            this.cur_status = status == E_SEND_ROB_TYPE.NORMAL ? SendRobView.STATUS_REC : SendRobView.STATUS_REVENGER;
            this.refresh();
        };
        SendRobView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        SendRobView.prototype.onAddToStage = function () {
            this.labTitle.text = Template.getGUIText("ui_send2");
            this.tabRec.text = Template.getGUIText("ui_role93");
            this.tabRevenger.text = Template.getGUIText("ui_send12");
            this.labTxtLog.text = Template.getGUIText("ui_send13");
            this.labTxtRefresh.text = Template.getGUIText("ui_send24");
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.tabRec.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabRec, this);
            this.tabRevenger.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabRevenger, this);
            this.btnLog.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLog, this);
            this.btnRefresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRefresh, this);
        };
        SendRobView.prototype.onRemoveFromStage = function () {
            this.m_entries.source = [];
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.tabRec.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabRec, this);
            this.tabRevenger.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabRevenger, this);
            this.btnLog.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLog, this);
            this.btnRefresh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRefresh, this);
        };
        SendRobView.prototype.refresh = function () {
            this.initView();
        };
        SendRobView.prototype.initView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.cur_status;
                            switch (_a) {
                                case SendRobView.STATUS_REVENGER: return [3 /*break*/, 1];
                            }
                            return [3 /*break*/, 3];
                        case 1:
                            this.compEmpty.text = Template.getGUIText("ui_send49");
                            this.tabRec.active = false;
                            this.tabRevenger.active = true;
                            this.currentState = SendRobView.STATUS_REVENGER;
                            return [4 /*yield*/, this.initRevengers()];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            this.compEmpty.text = Template.getGUIText("ui_send50");
                            this.tabRec.active = true;
                            this.tabRevenger.active = false;
                            this.currentState = SendRobView.STATUS_REC;
                            return [4 /*yield*/, this.initRobTeams()];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 5:
                            this.checkempty();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendRobView.prototype.initRobTeams = function () {
            return __awaiter(this, void 0, void 0, function () {
                var source, teams, i, inf_scr, cfg_scr;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.compEmpty.visible = false;
                            this.m_entries.source = [];
                            return [4 /*yield*/, Singleton.Get(SendManager).reqRobTeams()];
                        case 1:
                            _a.sent();
                            source = [];
                            teams = Singleton.Get(SendManager).getInfo().rob_teams;
                            for (i = 0; i < teams.length; i++) {
                                source.push({
                                    quest_id: this.m_quest_id,
                                    rob_team_id: i,
                                    rob_type: E_SEND_ROB_TYPE.NORMAL
                                });
                            }
                            this.m_entries.source = source;
                            inf_scr = Singleton.Get(ScrollManager).getScrollActual(DEFINE.SEND_SCROLL_ROB_REFRESH);
                            cfg_scr = Template.scroll.get(DEFINE.SEND_SCROLL_ROB_REFRESH);
                            if (!cfg_scr || !inf_scr) {
                                console.error("no inf or cfg scr: " + DEFINE.SEND_SCROLL_ROB_REFRESH);
                                return [2 /*return*/];
                            }
                            this.labRefreshCost.text = inf_scr[0] + "/" + cfg_scr.UpperL;
                            this.labRefreshCost.textColor = Singleton.Get(PlayerInfoManager).getDiamond() >= inf_scr[0] ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendRobView.prototype.initRevengers = function () {
            return __awaiter(this, void 0, void 0, function () {
                var source, teams, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.compEmpty.visible = false;
                            this.m_entries.source = [];
                            return [4 /*yield*/, Singleton.Get(SendManager).reqRobRevengers()];
                        case 1:
                            _a.sent();
                            source = [];
                            teams = Singleton.Get(SendManager).getInfo().rev_teams;
                            for (i = 0; i < teams.length; i++) {
                                source.push({
                                    quest_id: this.m_quest_id,
                                    rob_team_id: i,
                                    rob_type: E_SEND_ROB_TYPE.REVENGE
                                });
                            }
                            this.m_entries.source = source;
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendRobView.prototype.onClick_btnClose = function () {
            this.close();
        };
        SendRobView.prototype.onClick_tabRec = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.tabEffectAsync(this.tabRec)];
                        case 1:
                            _a.sent();
                            if (this.cur_status != SendRobView.STATUS_REC) {
                                this.cur_status = SendRobView.STATUS_REC;
                                this.refresh();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendRobView.prototype.onClick_tabRevenger = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.tabEffectAsync(this.tabRevenger)];
                        case 1:
                            _a.sent();
                            if (this.cur_status != SendRobView.STATUS_REVENGER) {
                                this.cur_status = SendRobView.STATUS_REVENGER;
                                this.refresh();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendRobView.prototype.onClick_btnLog = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnLog)];
                        case 1:
                            _a.sent();
                            Singleton.Get(LayerManager).getView(ui.SendLogView).open();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendRobView.prototype.onClick_btnRefresh = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnRefresh)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Singleton.Get(SendManager).reqRobRefresh(function () { _this.refresh(); }, this)];
                        case 2:
                            _a.sent();
                            this.refresh();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendRobView.prototype.checkempty = function () {
            if (this.m_entries.source.length <= 0) {
                this.compEmpty.visible = true;
                this.compEmpty.playAni();
            }
            else {
                this.compEmpty.visible = false;
            }
        };
        return SendRobView;
    }(PopupUI));
    SendRobView.STATUS_REC = "rec";
    SendRobView.STATUS_REVENGER = "revenger";
    ui.SendRobView = SendRobView;
    __reflect(SendRobView.prototype, "ui.SendRobView");
})(ui || (ui = {}));
//# sourceMappingURL=SendRobView.js.map