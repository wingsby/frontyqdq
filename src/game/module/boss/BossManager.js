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
var BossManager = (function () {
    function BossManager() {
        // endregion
        // region 世界BOSS
        this.m_last_full_info = 0;
        this.m_single = new BossSingleInfo();
        this.m_full = new BossFullInfo();
    }
    BossManager.prototype.getSingleInfo = function () {
        return this.m_single;
    };
    BossManager.prototype.getFullInfo = function () {
        return this.m_full;
    };
    BossManager.prototype.onGameLoaded = function () {
        var _this = this;
        setTimeout(function () {
            _this.reqFullInfo(function () {
                _this.m_check = new BossChecker();
            }, _this);
        }, 2000);
    };
    // region 个人BOSS
    BossManager.prototype.reqSingleReward = function (boss_id, callback, thisObj) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec, r_boss, r_reward;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.boss = new msg.BossMsg();
                        send.body.boss.boss_id = boss_id;
                        send.body.boss.reward_hash = this.getSingleInfo().getRewardHash();
                        return [4 /*yield*/, HttpAsync.req(NetConst.BOSS_SB_REWARD, true, send)];
                    case 1:
                        rec = _a.sent();
                        if (!rec) {
                            return [2 /*return*/];
                        }
                        r_boss = rec.body.boss;
                        if (r_boss && r_boss.success) {
                        }
                        r_reward = rec.body.reward;
                        Singleton.Get(DialogControler).showAlertRewardByMsg(Template.getGUIText("ui_tower11"), r_reward);
                        if (callback) {
                            callback.call(thisObj);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 切换至个人BOSS战斗
     * @param rank
     */
    BossManager.prototype.actBattleSingle = function (boss_id, callback, thisObj) {
        var _this = this;
        var send = new msg.CommonMsg();
        send.body.boss = new msg.BossMsg();
        send.body.boss.boss_id = boss_id;
        // 发送请求消息
        QueuedGateway.addRequest(QueuedGatewayType.BATTLE, NetConst.BOSS_SB_BATTLE, send, this, function (rec_msg) {
            // 检查返回消息
            var rec = rec_msg.body.boss;
            if (!rec) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("single boss battle received, but empty.");
                return;
            }
            // 进入战斗不成功
            if (!rec.success) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("failed enter battle.");
                return;
            }
            // 准备战斗数据
            var battle_wrapper = new msg.BattleResultMsg();
            battle_wrapper.pack = rec.battle;
            // 记录 RewardHash
            _this.getSingleInfo().setRewardHash(rec.reward_hash);
            // 切换黑屏后加载新战斗
            Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.WORLD_SB, battle.E_BATTLE_FLOW.PLAYING);
            Singleton.Get(battle.RoundManager).CutScene(false, function () {
                Singleton.Get(LayerManager).getView(ui.InstanceBattleView).params = [true, boss_id, rec.battle.m_result == BattleResult.LEFT_WIN];
                Singleton.Get(battle.RoundManager).Enter(battle_wrapper, _this.handleBattleEndSingle, _this, [true, boss_id, rec.battle.m_result == BattleResult.LEFT_WIN]);
            }, _this);
            // 执行回调
            if (callback) {
                callback.call(thisObj);
            }
        }, true);
    };
    /**
     * 个人BOSS挑战完成
     */
    BossManager.prototype.handleBattleEndSingle = function (params) {
        // 请求领取奖励
        if (params && params[0]) {
            this.reqSingleReward(params[1], function () {
                BossViewHandler.refresh();
            }, this);
            if (!params[2]) {
                Singleton.Get(DialogControler).showAlertLose();
            }
        }
        // 切换至PVE战斗
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.WORLD_SB, battle.E_BATTLE_FLOW.FINISH);
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    BossManager.prototype.reqFullInfo = function (callback, thisObj) {
        return __awaiter(this, void 0, void 0, function () {
            var rec, rec_boss;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (UtilsGame.Now() - this.m_last_full_info <= 5000) {
                            if (callback) {
                                callback.call(thisObj);
                            }
                            return [2 /*return*/];
                        }
                        this.m_last_full_info = UtilsGame.Now();
                        return [4 /*yield*/, HttpAsync.req(NetConst.BOSS_FB_INFO, false)];
                    case 1:
                        rec = _a.sent();
                        rec_boss = rec.body.boss;
                        if (!rec_boss.success) {
                            if (callback) {
                                callback.call(thisObj);
                            }
                            return [2 /*return*/];
                        }
                        this.m_last_full_info = UtilsGame.Now();
                        this.getFullInfo().updateStatus(rec_boss.status);
                        if (callback) {
                            callback.call(thisObj);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BossManager.prototype.reqFullDamage = function (boss_id, callback, thisObj) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec, rec_boss;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.boss = new msg.BossMsg();
                        send.body.boss.boss_id = boss_id;
                        return [4 /*yield*/, HttpAsync.req(NetConst.BOSS_FB_DAMAGE, true, send)];
                    case 1:
                        rec = _a.sent();
                        rec_boss = rec.body.boss;
                        if (!rec_boss.success) {
                            return [2 /*return*/];
                        }
                        if (callback) {
                            callback.call(thisObj, rec_boss.players, rec_boss.damage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BossManager.prototype.reqFullKiller = function (boss_id, callback, thisObj) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec, rec_boss;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.boss = new msg.BossMsg();
                        send.body.boss.boss_id = boss_id;
                        return [4 /*yield*/, HttpAsync.req(NetConst.BOSS_FB_KILLER, true, send)];
                    case 1:
                        rec = _a.sent();
                        rec_boss = rec.body.boss;
                        if (!rec_boss.success) {
                            return [2 /*return*/];
                        }
                        if (callback) {
                            callback.call(thisObj, rec_boss.players);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 切换至世界BOSS战斗
     */
    BossManager.prototype.actBattleFull = function (boss_id, callback, thisObj) {
        var _this = this;
        var send = new msg.CommonMsg();
        send.body.boss = new msg.BossMsg();
        send.body.boss.boss_id = boss_id;
        // 发送请求消息
        QueuedGateway.addRequest(QueuedGatewayType.BATTLE, NetConst.BOSS_FB_BATTLE, send, this, function (rec_msg) {
            // 检查返回消息
            var rec = rec_msg.body.boss;
            if (!rec) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("full boss battle received, but empty.");
                return;
            }
            // 进入战斗不成功
            if (!rec.success) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("fail enter battle.");
                return;
            }
            // 准备战斗数据
            var battle_wrapper = new msg.BattleResultMsg();
            battle_wrapper.pack = rec.battle;
            // 更新最后挑战时间
            _this.getFullInfo().getBossByIdOrigin(boss_id).atk_t = UtilsGame.Now();
            // 切换黑屏后加载新战斗
            Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.WORLD_FB, battle.E_BATTLE_FLOW.PLAYING);
            Singleton.Get(battle.RoundManager).CutScene(false, function () {
                // 记录秒伤数据
                Singleton.Get(DmgManager).getDmgInfo().saveDmg(E_DMG_STAT_TYPE.WORLD, battle_wrapper.pack);
                Singleton.Get(LayerManager).getView(ui.InstanceBattleView).params = [boss_id];
                Singleton.Get(battle.RoundManager).Enter(battle_wrapper, _this.handleBattleEndFull, _this, [boss_id]);
            }, _this);
            // 执行回调
            if (callback) {
                callback.call(thisObj);
            }
        }, true);
    };
    /**
     * 世界BOSS挑战完成
     */
    BossManager.prototype.handleBattleEndFull = function (params) {
        // 打开世界BOSS结算界面
        Singleton.Get(LayerManager).getView(ui.BossRewardView).open(params[0]);
        // 切换至PVE战斗
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.WORLD_FB, battle.E_BATTLE_FLOW.FINISH);
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    return BossManager;
}());
__reflect(BossManager.prototype, "BossManager");
//# sourceMappingURL=BossManager.js.map