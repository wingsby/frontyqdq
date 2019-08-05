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
    var SendItemRenderer = (function (_super) {
        __extends(SendItemRenderer, _super);
        function SendItemRenderer() {
            var _this = _super.call(this) || this;
            _this.m_last_tick = 0;
            _this.skinName = "yw.SendItemRenderer";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        SendItemRenderer.prototype.onAddToStage = function () {
            this.labTxtRewardPreview.text = Template.getGUIText("ui_send25");
            this.labTxtGo.text = Template.getGUIText("ui_send26");
            this.labTxtQuick.text = Template.getGUIText("ui_send27");
            this.labTxtReward.text = Template.getGUIText("ui_send28");
            this.labTxtRob.text = Template.getGUIText("ui_send29");
            this.m_star_entities = new eui.ArrayCollection();
            this.dgStars.dataProvider = this.m_star_entities;
            this.dgStars.itemRenderer = ui.SendStarItemRenderer;
            this.dgStars.useVirtualLayout = false;
            this.m_reward_entities = new eui.ArrayCollection();
            this.dgRewards.dataProvider = this.m_reward_entities;
            this.dgRewards.itemRenderer = ui.SendRewardItemRenderer;
            this.dgRewards.useVirtualLayout = false;
            this.m_last_tick = 0;
            Singleton.Get(RegisterUpdate).register(this);
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
            this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAdd, this);
            this.btnQuick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnQuick, this);
            this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.btnRob.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRob, this);
        };
        SendItemRenderer.prototype.onRemoveFromStage = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
            this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
            this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAdd, this);
            this.btnQuick.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnQuick, this);
            this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.btnRob.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRob, this);
        };
        SendItemRenderer.prototype.update = function () {
            var now = UtilsGame.Now();
            if (now - this.m_last_tick < 1000) {
                return;
            }
            this.m_last_tick = now;
            var quest = Singleton.Get(SendManager).getInfo().getQuest(this.data.quest_id);
            if (!quest) {
                console.error("no quest: " + this.data.quest_id);
                return;
            }
            var status = quest.getStatus();
            var updated = false;
            if (status != this.cur_status) {
                updated = true;
                this.cur_status = status;
            }
            this.setTimeAndText(quest, null, updated);
        };
        SendItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var quest = Singleton.Get(SendManager).getInfo().getQuest(this.data.quest_id);
            if (!quest) {
                console.error("no quest: " + this.data.quest_id);
                return;
            }
            // 获取任务信息
            var cfg_send = Template.send.get(quest.send_id);
            if (!cfg_send) {
                console.error("no send: " + quest.send_id);
                return;
            }
            // 设定状态
            this.cur_status = quest.getStatus();
            this.compScene.setQuest(this.data.quest_id);
            this.compScene.setStatus(this.cur_status);
            this.setTimeAndText(quest, cfg_send, true);
            // 设定任务星级
            var source_stars = [];
            for (var i = 0; i < cfg_send.Quality; i++) {
                source_stars.push(0);
            }
            this.m_star_entities.source = source_stars;
        };
        SendItemRenderer.prototype.setTimeAndText = function (inf_quest, cfg_send, updated) {
            if (!cfg_send) {
                cfg_send = Template.send.get(inf_quest.send_id);
                if (!cfg_send) {
                    console.error("no send: " + inf_quest.send_id);
                    return;
                }
            }
            switch (this.cur_status) {
                case E_SEND_STATUS.END:
                    this.labTxtSituation.text = Template.getGUIText("ui_send30");
                    this.labTime.text = Template.getGUIText("ui_send31");
                    this.currentState = "end";
                    break;
                case E_SEND_STATUS.ONGOING:
                    this.labTxtSituation.text = UtilsGame.stringHander(Template.getGUIText("ui_send32"), inf_quest.cnt_be_rob);
                    this.labTime.text = UtilsGame.stringHander(Template.getGUIText("ui_send33"), UtilsGame.timeToString(inf_quest.end_t - UtilsGame.Now()));
                    this.currentState = "ongoing";
                    var quick_cost = Template.config.SendMoney * inf_quest.getLastMinutes();
                    this.labQuickCost.text = "" + quick_cost;
                    this.labQuickCost.textColor = Singleton.Get(PlayerInfoManager).getDiamond() >= quick_cost ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
                    this.labRobCount.text = "" + inf_quest.getLastRobTimes();
                    break;
                default:
                    this.labTime.text = UtilsGame.stringHander(Template.getGUIText("ui_send34"), UtilsGame.timeToString(cfg_send.Time));
                    this.setReward(inf_quest, cfg_send);
                    this.currentState = "prepare";
                    break;
            }
            if (updated) {
                this.setReward(inf_quest, cfg_send);
                this.compScene.setStatus(this.cur_status);
            }
        };
        SendItemRenderer.prototype.setReward = function (inf_quest, cfg_send) {
            if (!cfg_send) {
                cfg_send = Template.send.get(inf_quest.send_id);
                if (!cfg_send) {
                    console.error("no send: " + inf_quest.send_id);
                    return;
                }
            }
            var source = [];
            var cfg_max_reward = 2; // 最多显示2个道具
            var is_double = inf_quest.type == E_SEND_RUN_TYPE.EXTREME;
            for (var i = 0; i < cfg_send.Item.length; i++) {
                if (source.length >= cfg_max_reward) {
                    break;
                }
                source.push({
                    item_id: cfg_send.Item[i],
                    count: inf_quest.getStatus() == E_SEND_STATUS.PREPARE ? cfg_send.Quantity[i] : cfg_send.Quantity[i] - cfg_send.RobItem[i] * inf_quest.cnt_be_rob,
                    double: is_double
                });
            }
            if (source.length < cfg_max_reward) {
                if (cfg_send.Jewel[0] > 0) {
                    source.push({
                        item_id: -1,
                        count: inf_quest.getStatus() == E_SEND_STATUS.PREPARE ? cfg_send.Jewel[0] : cfg_send.Jewel[0] - cfg_send.Jewel[1] * inf_quest.cnt_be_rob,
                        double: is_double
                    });
                }
            }
            if (source.length < cfg_max_reward) {
                if (cfg_send.Gold[0] > 0) {
                    source.push({
                        item_id: -2,
                        count: inf_quest.getStatus() == E_SEND_STATUS.PREPARE ? cfg_send.Gold[0] : cfg_send.Gold[0] - cfg_send.Gold[1] * inf_quest.cnt_be_rob,
                        double: is_double
                    });
                }
            }
            if (source.length < cfg_max_reward) {
                if (cfg_send.Exp[0] > 0) {
                    source.push({
                        item_id: -3,
                        count: inf_quest.getStatus() == E_SEND_STATUS.PREPARE ? cfg_send.Exp[0] : cfg_send.Exp[0] - cfg_send.Exp[1] * inf_quest.cnt_be_rob,
                        double: is_double
                    });
                }
            }
            this.m_reward_entities.source = source;
        };
        SendItemRenderer.prototype.onClick_btnGo = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnGo)];
                        case 1:
                            _a.sent();
                            Singleton.Get(LayerManager).getView(ui.SendTeamView).open(this.data.quest_id);
                            Singleton.Get(LayerManager).getView(ui.SendView).refresh();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendItemRenderer.prototype.onClick_btnAdd = function () {
            return __awaiter(this, void 0, void 0, function () {
                var quest;
                return __generator(this, function (_a) {
                    quest = Singleton.Get(SendManager).getInfo().getQuest(this.data.quest_id);
                    Singleton.Get(LayerManager).getView(ui.SendTeamView).open(this.data.quest_id);
                    return [2 /*return*/];
                });
            });
        };
        SendItemRenderer.prototype.onClick_btnQuick = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnQuick)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Singleton.Get(SendManager).reqQuestQuick(this.data.quest_id)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendItemRenderer.prototype.onClick_btnReward = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnReward)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Singleton.Get(SendManager).reqQuestReward(this.data.quest_id)];
                        case 2:
                            _a.sent();
                            this.dataChanged(); // 领奖后立即进行一次刷新
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendItemRenderer.prototype.onClick_btnRob = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnRob)];
                        case 1:
                            _a.sent();
                            Singleton.Get(LayerManager).getView(ui.SendRobView).open(this.data.quest_id);
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendItemRenderer.prototype.playRefresh = function () {
            this.tgRefresh.stop();
            this.tgRefresh.play();
        };
        return SendItemRenderer;
    }(eui.ItemRenderer));
    ui.SendItemRenderer = SendItemRenderer;
    __reflect(SendItemRenderer.prototype, "ui.SendItemRenderer", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=SendItemRenderer.js.map