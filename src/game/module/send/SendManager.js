var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
var SendManager = (function () {
    function SendManager() {
        this.m_info = new PlayerSendInfo();
    }
    SendManager.prototype.getInfo = function () {
        return this.m_info;
    };
    SendManager.prototype.onGameLoaded = function () {
        this.reqQuestInfo();
    };
    // region 外派任务
    SendManager.prototype.reqQuestInfo = function (sync) {
        if (sync === void 0) { sync = false; }
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!SendValidator.needQuestInfo()) {
                            return [2 /*return*/];
                        }
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.SEND_QUEST_INFO, sync)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), SendManager.MSG_GROUP])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().updateQuests(rec.quests);
                        return [2 /*return*/];
                }
            });
        });
    };
    SendManager.prototype.reqQuestRefresh = function (no_scr_cb, thisObj) {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!SendValidator.canQuestRefresh(no_scr_cb, thisObj)) {
                            return [2 /*return*/, new Promise(function (resolve, reject) { return; })];
                        }
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.SEND_QUEST_REFRESH, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), SendManager.MSG_GROUP])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().updateQuests(rec.quests);
                        return [2 /*return*/];
                }
            });
        });
    };
    SendManager.prototype.reqQuestExec = function (quest_id, roles, type) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!SendValidator.canQuestExec(quest_id, roles, type)) {
                            return [2 /*return*/, new Promise(function (resolve, reject) { return; })];
                        }
                        send = new msg.CommonMsg();
                        send.body.send = new msg.SendMsg();
                        send.body.send.quest_id = quest_id;
                        send.body.send.roles = roles;
                        send.body.send.type = type;
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.SEND_QUEST_EXEC, true, send)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), SendManager.MSG_GROUP])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().getQuest(quest_id).setQuestRun(roles, type);
                        return [2 /*return*/];
                }
            });
        });
    };
    SendManager.prototype.reqQuestOpinion = function (quest_id, roles) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!SendValidator.canQuestOpinion(quest_id, roles)) {
                            return [2 /*return*/, new Promise(function (resolve, reject) { return; })];
                        }
                        send = new msg.CommonMsg();
                        send.body.send = new msg.SendMsg();
                        send.body.send.quest_id = quest_id;
                        send.body.send.roles = roles;
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.SEND_QUEST_OPINION, true, send)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), SendManager.MSG_GROUP])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().getQuest(quest_id).updateOpinion(roles);
                        return [2 /*return*/];
                }
            });
        });
    };
    SendManager.prototype.reqQuestReward = function (quest_id) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec_all, rec;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!SendValidator.canQuestReward(quest_id)) {
                            return [2 /*return*/, new Promise(function (resolve, reject) { return; })];
                        }
                        send = new msg.CommonMsg();
                        send.body.send = new msg.SendMsg();
                        send.body.send.quest_id = quest_id;
                        return [4 /*yield*/, HttpAsync.req(NetConst.SEND_QUEST_REWARD, true, send)];
                    case 1:
                        rec_all = _a.sent();
                        return [4 /*yield*/, HttpAsync.assert(rec_all, SendManager.MSG_GROUP)];
                    case 2:
                        rec = _a.sent();
                        Singleton.Get(DialogControler).showAlertRewardByMsg(Template.getGUIText("ui_tower11"), rec_all.body.reward);
                        this.getInfo().getQuest(quest_id).reset(rec.send_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    SendManager.prototype.reqQuestQuick = function (quest_id) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.send = new msg.SendMsg();
                        send.body.send.quest_id = quest_id;
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.SEND_QUEST_QUICK, true, send)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), SendManager.MSG_GROUP])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().getQuest(quest_id).setQuestQuick();
                        return [2 /*return*/];
                }
            });
        });
    };
    // endregion
    // region 掠夺复仇
    SendManager.prototype.reqRobTeams = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!SendValidator.needRobTeams()) {
                            return [2 /*return*/];
                        }
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.SEND_ROB_TEAMS, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), SendManager.MSG_GROUP])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().updateRobTeam(rec.teams);
                        return [2 /*return*/];
                }
            });
        });
    };
    SendManager.prototype.reqRobRefresh = function (no_scr_cb, thisObj) {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!SendValidator.canRobRefresh(no_scr_cb, thisObj)) {
                            return [2 /*return*/, new Promise(function (resolve, reject) { return; })];
                        }
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.SEND_ROB_REFRESH, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), SendManager.MSG_GROUP])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().updateRobTeam(rec.teams);
                        return [2 /*return*/];
                }
            });
        });
    };
    SendManager.prototype.reqRobRevengers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!SendValidator.needRobRevengers()) {
                            return [2 /*return*/];
                        }
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.SEND_ROB_REVENGERS)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), SendManager.MSG_GROUP])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().updateRevTeam(rec.teams);
                        return [2 /*return*/];
                }
            });
        });
    };
    SendManager.prototype.actRobExec = function (quest_id, uid, zid, ene_quest_id, rob_type, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send = new msg.CommonMsg();
        send.body.send = new msg.SendMsg();
        send.body.send.quest_id = quest_id;
        send.body.send.uid = uid;
        send.body.send.zid = zid;
        send.body.send.ene_quest_id = ene_quest_id;
        send.body.send.rob_type = rob_type;
        // 发送请求消息
        QueuedGateway.addRequest(QueuedGatewayType.BATTLE, NetConst.SEND_ROB_EXEC, send, this, function (rec_msg) {
            // 检查返回消息
            var rec = rec_msg.body.send;
            if (!rec) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("send rob battle data is empty.");
                return;
            }
            // 进入战斗不成功
            if (!rec.success) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("enter battle failed.");
                return;
            }
            var battle_wrapper = new msg.BattleResultMsg();
            battle_wrapper.pack = rec.battle;
            // 切换黑屏后加载新战斗
            Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.SEND_ROB, battle.E_BATTLE_FLOW.PLAYING);
            Singleton.Get(battle.RoundManager).CutScene(false, function () {
                Singleton.Get(battle.RoundManager).Enter(battle_wrapper, _this.onRobEnd, _this, [quest_id, rob_type, rec, rec_msg.body.reward]);
            }, _this);
            Singleton.Get(LayerManager).getView(ArenaBattleView).setExitParams([quest_id, rob_type, rec, rec_msg.body.reward]);
            _this.getInfo().getQuest(quest_id).setRobOnce();
            if (rec.teams) {
                _this.getInfo().updateRobTeam(rec.teams);
            }
            // 执行回调
            if (callback) {
                callback.call(thisObj);
            }
        }, true);
    };
    SendManager.prototype.onRobEnd = function (_a) {
        var quest_id = _a[0], rob_type = _a[1], rec = _a[2], reward = _a[3], args = _a.slice(4);
        if (!rec) {
            console.error("no rec: " + rec);
            return;
        }
        // 重新打开外派界面
        SendViewHandler.reOpenRob(quest_id, rob_type);
        if (rec.battle.m_result >= 1) {
            Singleton.Get(DialogControler).showAlertRewardByMsg(Template.getGUIText("ui_tower11"), reward);
        }
        else {
            Singleton.Get(DialogControler).showAlertLose();
        }
        // 切换至PVE战斗
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.SEND_ROB, battle.E_BATTLE_FLOW.FINISH);
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    // endregion
    // region 防守日志
    SendManager.prototype.reqLogList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!SendValidator.needLogList()) {
                            return [2 /*return*/];
                        }
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.SEND_LOG_LIST)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), SendManager.MSG_GROUP])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().updateRobLog(rec.logs);
                        return [2 /*return*/];
                }
            });
        });
    };
    SendManager.prototype.actLogReplay = function (log_id, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send = new msg.CommonMsg();
        send.body.send = new msg.SendMsg();
        send.body.send.log_id = log_id;
        // 发送请求消息
        QueuedGateway.addRequest(QueuedGatewayType.BATTLE, NetConst.SEND_LOG_REPLAY, send, this, function (rec_msg) {
            // 检查返回消息
            var rec = rec_msg.body.send;
            if (!rec) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("send rob battle data is empty.");
                return;
            }
            // 进入战斗不成功
            if (!rec.success) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("enter battle failed.");
                return;
            }
            var battle_wrapper = new msg.BattleResultMsg();
            battle_wrapper.pack = rec.battle;
            // 切换黑屏后加载新战斗
            Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.SEND_LOG, battle.E_BATTLE_FLOW.PLAYING);
            Singleton.Get(battle.RoundManager).CutScene(false, function () {
                Singleton.Get(battle.RoundManager).Enter(battle_wrapper, _this.onLogReplayEnd, _this, [log_id, rec, rec_msg.body.reward]);
            }, _this);
            Singleton.Get(LayerManager).getView(ArenaBattleView).setExitParams([log_id, rec, rec_msg.body.reward]);
            // 执行回调
            if (callback) {
                callback.call(thisObj);
            }
        }, true);
    };
    SendManager.prototype.onLogReplayEnd = function (_a) {
        var log_id = _a[0], rec = _a[1], reward = _a[2], args = _a.slice(3);
        if (!rec) {
            console.error("no rec: " + rec);
            return;
        }
        // 重新打开外派界面
        SendViewHandler.reOpenLog();
        // 切换至PVE战斗
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.SEND_LOG, battle.E_BATTLE_FLOW.FINISH);
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    // endregion
    // region 是否有红点提示
    SendManager.prototype.isAlarm = function () {
        var has_scr = (Singleton.Get(ScrollManager).getScrollActual(Template.config.Send)[0] > 0);
        var info = this.m_info;
        var cur_send_num = 0;
        for (var _i = 0, _a = this.m_info.quests; _i < _a.length; _i++) {
            var quest = _a[_i];
            // 有完成可领取的任务立即领取
            if (quest.getStatus() == E_SEND_STATUS.END) {
                return true;
            }
            else if (quest.getStatus() == E_SEND_STATUS.ONGOING) {
                cur_send_num++;
            }
        }
        // 有次数且当前外派数小于指定值
        if (has_scr && cur_send_num < Template.config.SendNum) {
            return true;
        }
        return false;
    };
    return SendManager;
}());
SendManager.MSG_GROUP = "send";
__reflect(SendManager.prototype, "SendManager");
//# sourceMappingURL=SendManager.js.map