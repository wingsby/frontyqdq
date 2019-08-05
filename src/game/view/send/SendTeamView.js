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
    var SendTeamView = (function (_super) {
        __extends(SendTeamView, _super);
        function SendTeamView() {
            var _this = _super.call(this, "yw.SendTeamSkin") || this;
            _this.m_team = [];
            _this.m_quest_id = 0;
            return _this;
        }
        SendTeamView.prototype.componentCreated = function () {
            this.m_role_entries = new eui.ArrayCollection();
            this.dgRoles.itemRenderer = ui.SendTeamItemRenderer;
            this.dgRoles.dataProvider = this.m_role_entries;
            this.dgRoles.useVirtualLayout = false;
        };
        ;
        SendTeamView.prototype.onDestroy = function () { };
        ;
        SendTeamView.prototype.onUpdate = function () { };
        ;
        SendTeamView.prototype.open = function (quest_id) {
            this.m_quest_id = quest_id;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.m_team = [-1, -1, -1, -1, -1];
            this.refresh();
        };
        SendTeamView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        SendTeamView.prototype.refresh = function () {
            this.initView();
        };
        SendTeamView.prototype.onAddToStage = function () {
            this.labTitle.text = "外派队伍";
            this.labTxtOpinion.text = Template.getGUIText("ui_send35");
            this.labTxtLineup.text = Template.getGUIText("ui_send36");
            this.labTxtExtreme.text = Template.getGUIText("ui_send37");
            this.labTxtGo.text = Template.getGUIText("ui_send38");
            this.labTxtExtremeDes.text = Template.getGUIText("ui_send39");
            this.labTxtGoing.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText("ui_send40"));
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnOpinion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.btnLineup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLineup, this);
            this.btnExtreme.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExtreme, this);
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
        };
        SendTeamView.prototype.onRemoveFromStage = function () {
            this.m_quest_id = 0;
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnOpinion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.btnLineup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLineup, this);
            this.btnExtreme.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExtreme, this);
            this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
        };
        SendTeamView.prototype.initView = function () {
            var quest_id = this.m_quest_id;
            var inf_quest = Singleton.Get(SendManager).getInfo().getQuest(quest_id);
            if (!inf_quest) {
                console.error("no inf quest: " + quest_id);
                return;
            }
            var source = [];
            if (inf_quest.getStatus() == E_SEND_STATUS.PREPARE) {
                this.currentState = SendTeamView.STATUS_NORMAL;
                this.labTxtOpinion.text = "下阵"; // 下阵
                for (var i = 0; i < this.m_team.length; i++) {
                    source.push({
                        role_id: this.m_team[i],
                        pos: i,
                        allow_change: true
                    });
                }
                this.labFighting.text = "" + RoleUtil.getFighting(this.m_team);
            }
            else {
                this.currentState = SendTeamView.STATUS_SEND;
                this.labTxtOpinion.text = Template.getGUIText("ui_send35"); // 布阵
                for (var i = 0; i < inf_quest.roles.length; i++) {
                    source.push({
                        role_id: inf_quest.roles[i],
                        pos: i,
                        allow_change: false
                    });
                }
                this.labFighting.text = "" + RoleUtil.getFighting(inf_quest.roles);
            }
            this.m_role_entries.source = source;
            var cfg_send = Template.send.get(inf_quest.send_id);
            if (!cfg_send) {
                console.error("no send: " + inf_quest.send_id);
                return;
            }
            this.labExtremeCost.text = "" + cfg_send.VipSend;
            this.labExtremeCost.textColor = Singleton.Get(PlayerInfoManager).getDiamond() >= cfg_send.VipSend ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
        };
        SendTeamView.prototype.changeRole = function (pos, role_id) {
            this.m_team[pos] = role_id;
            this.refresh();
        };
        SendTeamView.prototype.getCurTeam = function () {
            return this.m_team;
        };
        SendTeamView.prototype.onClick_btnClose = function () {
            this.close();
        };
        SendTeamView.prototype.onClick_btnOpinion = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var quest_id, inf_quest, team;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnOpinion)];
                        case 1:
                            _a.sent();
                            quest_id = this.m_quest_id;
                            inf_quest = Singleton.Get(SendManager).getInfo().getQuest(quest_id);
                            if (inf_quest.getStatus() == E_SEND_STATUS.PREPARE) {
                                /**
                                if (SendUtil.getValidRoles(this.m_team).length <= 0) {
                                    // INFO 先选择斗士后才能布阵
                                    return;
                                }
                                const team: Dictionary<number, number> = RoleUtil.genPveTeam(this.m_team);
                                Singleton.Get(LayerManager).getView(ui.RoleOpinionView).open();
                                Singleton.Get(LayerManager).getView(ui.RoleOpinionView).initRoles(team, (result: number[]) => {
                                    this.m_team = result;
                                    this.refresh();
                                }, this);
                                 */
                                // 下阵功能
                                this.m_team = [-1, -1, -1, -1, -1];
                                this.refresh();
                            }
                            else {
                                team = RoleUtil.genPveTeam(inf_quest.roles);
                                Singleton.Get(LayerManager).getView(ui.RoleOpinionView).open();
                                Singleton.Get(LayerManager).getView(ui.RoleOpinionView).initRoles(team, function (result) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, Singleton.Get(SendManager).reqQuestOpinion(this.m_quest_id, result)];
                                            case 1:
                                                _a.sent();
                                                Singleton.Get(DialogControler).showString(Template.getGUIText("ui_send41"));
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, this);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendTeamView.prototype.onClick_btnLineup = function () {
            return __awaiter(this, void 0, void 0, function () {
                var quest_id, inf_quest, roles, occupied, result, re_idx, _i, roles_1, role_id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnLineup)];
                        case 1:
                            _a.sent();
                            quest_id = this.m_quest_id;
                            inf_quest = Singleton.Get(SendManager).getInfo().getQuest(quest_id);
                            roles = RoleUtil.genRolesByFighting();
                            occupied = Singleton.Get(SendManager).getInfo().occupiedRoles();
                            result = [-1, -1, -1, -1, -1];
                            re_idx = 0;
                            for (_i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
                                role_id = roles_1[_i];
                                if (re_idx > result.length - 1) {
                                    break;
                                }
                                if (occupied.indexOf(role_id) >= 0) {
                                    continue;
                                }
                                result[re_idx] = role_id;
                                re_idx++;
                            }
                            if (re_idx == 0) {
                                Singleton.Get(DialogControler).showInfo(1232);
                            }
                            this.m_team = result;
                            this.refresh();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendTeamView.prototype.onClick_btnExtreme = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnExtreme)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Singleton.Get(SendManager).reqQuestExec(this.m_quest_id, this.m_team, E_SEND_RUN_TYPE.EXTREME)];
                        case 2:
                            _a.sent();
                            Singleton.Get(LayerManager).getView(ui.SendView).refreshItem(this.m_quest_id);
                            this.close();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendTeamView.prototype.onClick_btnGo = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnGo)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Singleton.Get(SendManager).reqQuestExec(this.m_quest_id, this.m_team, E_SEND_RUN_TYPE.NORMAL)];
                        case 2:
                            _a.sent();
                            Singleton.Get(LayerManager).getView(ui.SendView).refreshItem(this.m_quest_id);
                            this.close();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return SendTeamView;
    }(PopupUI));
    SendTeamView.STATUS_NORMAL = "normal";
    SendTeamView.STATUS_SEND = "send";
    ui.SendTeamView = SendTeamView;
    __reflect(SendTeamView.prototype, "ui.SendTeamView");
})(ui || (ui = {}));
//# sourceMappingURL=SendTeamView.js.map