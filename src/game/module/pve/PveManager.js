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
/**
 * PVE关卡流程管理器
 */
var PveManager = (function () {
    // endregion
    // region 初始化
    /**
     * 构造函数
     */
    function PveManager() {
        // 喜从天降相关变量
        this.m_treasure_active = false;
        // 自动挑战相关变量
        this.m_auto_active = false; // 是否激活了自动挑战
        // 登录时的当前关
        this.login_cur_level = 1;
        // 是否初始化完成
        this.m_is_inited = false;
        // 上次自动挑战BOSS是否非法
        this.m_is_last_auto_illegal = false;
        this.init();
    }
    /**
     * 初始化
     */
    PveManager.prototype.init = function () {
    };
    /**
     * 响应游戏加载完成
     */
    PveManager.prototype.onGameLoaded = function (callback, thisObj) {
        // 单机版
        if (Singleton.Get(MainManager).m_is_single) {
            console.log("offline mode removed.");
            return;
        }
        // 联机版本
        this.reqPveInfo(callback, thisObj);
        // 战斗重发
        Singleton.Get(battle.BattleStateMachine).regResetCallback(this.handleErrToPve, this);
    };
    /**
     * 响应游戏完全进入主界面
     * @param callback
     * @param thisObj
     */
    PveManager.prototype.onSceneLoaded = function (callback, thisObj) {
        // 显示离线收益结算
        var login_mgr = Singleton.Get(LoginManager);
        if (login_mgr.loginInfo.pve_offline) {
            this.onRecOffline(login_mgr.loginInfo.pve_offline);
            login_mgr.loginInfo.pve_offline = undefined;
        }
    };
    // endregion
    // region 基本信息
    /**
     * 请求PVE基本信息
     */
    PveManager.prototype.reqPveInfo = function (callback, thisObj) {
        var _this = this;
        var send_msg = new msg.CommonMsg();
        HttpClient.HandlRequestAsWait(NetConst.PVE_INFO, send_msg, this, function (data) {
            var rec_msg = data.body.pveInfo;
            if (!rec_msg) {
                console.log("PveInfoMsg not received.");
                return;
            }
            _this.onPveInfo(rec_msg);
            if (!_this.m_is_inited) {
                _this.m_is_inited = true;
                Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.POSITIVE, callback, thisObj);
            }
            else {
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, false);
    };
    /**
     * 响应收到PVE基本信息
     * @param rec_msg
     */
    PveManager.prototype.onPveInfo = function (rec_msg) {
        this.m_pve_info = rec_msg;
        this.updateLevel(rec_msg.cur_level);
        var view_battle = Singleton.Get(LayerManager).getView(ui.BattleView);
        view_battle.setAutoActive(this.authAutoBoss());
        view_battle.setQuickStatus(this.getQuickLastCount());
    };
    /**
     * 获取当前关卡数
     */
    PveManager.prototype.getCurLevel = function () {
        if (this.m_pve_info != undefined) {
            return this.m_pve_info.cur_level;
        }
        return this.login_cur_level;
    };
    // endregion
    // region 一般战斗
    /**
     * 切换至PVE战斗
     * @param callback
     * @param thisObj
     */
    PveManager.prototype.actBattlePve = function (cut_scene, callback, thisObj) {
        var _this = this;
        if (cut_scene === void 0) { cut_scene = false; }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.pveBattleResult = new msg.PveBattleResultMsg();
        send_msg.body.pveBattleResult.reward_hash = this.m_last_reward_hash; // 带上上一次的奖励哈希以领取奖励
        // 发送请求并处理回调
        QueuedGateway.addRequest(QueuedGatewayType.BATTLE, NetConst.PVE_REQ_BATTLE, send_msg, this, function (data) {
            // 解析收到的消息
            var rec_msg = data.body.pveBattleResult;
            var rec_reward_msg = data.body.pveReward;
            // 判断战斗时间合法性 不合法则5秒后重试
            if (data.header.rt_sub == msg.MsgCode.PVE_ILLEGAL) {
                Singleton.Get(battle.BattleStateMachine).reset();
                return;
            }
            // 如果失败 退出自动挑战
            if (rec_msg.script.pack.m_result <= 0) {
                _this.exitAutoBoss();
            }
            // 处理获得奖励信息
            if (rec_reward_msg) {
                _this.onReward(rec_reward_msg);
            }
            // 检查下一次是否要自动挑战Boss
            if (!_this.m_is_last_auto_illegal) {
                if (_this.checkAutoWillMeetBoss()) {
                    Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_FLOW.FINISH);
                    Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.BOSS, battle.E_BATTLE_BEHAVIOR.PASSIVE);
                    return;
                }
            }
            else {
                _this.m_is_last_auto_illegal = false;
            }
            // 记录奖励id
            if (rec_msg.reward_hash) {
                _this.m_last_reward_hash = rec_msg.reward_hash;
            }
            // 是否切屏进入战斗
            Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_FLOW.PLAYING);
            if (cut_scene) {
                Singleton.Get(battle.RoundManager).CutScene(true, function () {
                    Singleton.Get(battle.RoundManager).Enter(rec_msg.script, _this.onNormalBattleFinished, _this);
                }, _this);
            }
            else {
                Singleton.Get(battle.RoundManager).Enter(rec_msg.script, _this.onNormalBattleFinished, _this);
            }
            console.log("======== \u6302\u673A\u6218\u6597[" + UtilsGame.dateToStr(UtilsGame.Now()) + "] ========");
            console.log(rec_msg.script.pack);
            console.log("===============================================");
            // 回调
            if (callback) {
                callback.call(thisObj);
            }
        }, false);
    };
    /**
     * 响应普通战斗结束
     */
    PveManager.prototype.onNormalBattleFinished = function () {
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_FLOW.FINISH);
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    /**
     * 响应特殊战斗结束
     */
    PveManager.prototype.onSpecialBattleFinished = function () {
        // 请求下一场战斗
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    /**
     * 清空奖励hash（用于其他模块打断当前战斗）
     */
    PveManager.prototype.cleanRewardHash = function () {
        this.m_last_reward_hash = "";
    };
    /**
     * 检查是否正在自动挑战并且满足挑战BOSS条件
     */
    PveManager.prototype.checkAutoWillMeetBoss = function () {
        if (this.getCurLevel() > Template.config.RushBoss) {
            if (this.m_auto_active && this.m_enemy_killed >= DEFINE.PVE_BOSS_LIMIT) {
                return true;
            }
        }
        else {
            if (this.m_auto_active) {
                return true;
            }
        }
        return false;
    };
    // endregion
    // region BOSS战斗
    /**
     * 切换至BOSS战斗
     */
    PveManager.prototype.actBattleBoss = function () {
        var _this = this;
        // 清空奖励信息
        this.cleanRewardHash();
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求并处理回调
        QueuedGateway.addRequest(QueuedGatewayType.BATTLE, NetConst.PVE_REQ_BOSS, send_msg, this, function (data) {
            var rec_msg = data.body.pveBossResult;
            if (!rec_msg) {
                // 挑战BOSS条件不满足 但却请求了挑战BOSS 使其下一场请求普通战斗
                _this.m_is_last_auto_illegal = true;
                Singleton.Get(battle.BattleStateMachine).reset();
                return;
            }
            Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.BOSS, battle.E_BATTLE_FLOW.PLAYING);
            // 记录奖励hash
            if (rec_msg.reward_hash) {
                _this.m_last_reward_hash = rec_msg.reward_hash;
            }
            // 设定为BOSS战斗状态
            _this.m_challenging_boss = true;
            // 设定按钮状态
            Singleton.Get(LayerManager).getView(ui.BattleView).setBossPlaying(true);
            // 切换黑屏后加载新战斗
            Singleton.Get(battle.RoundManager).CutScene(true, function () {
                // 记录秒伤数据
                Singleton.Get(DmgManager).getDmgInfo().saveDmg(E_DMG_STAT_TYPE.BOSS, rec_msg.script.pack);
                // 挑战成功
                if (rec_msg.script.pack.m_result > 0) {
                    Singleton.Get(battle.RoundManager).Enter(rec_msg.script, _this.onBossBattleFinished, _this);
                }
                else {
                    Singleton.Get(battle.RoundManager).Enter(rec_msg.script, _this.onBossBattleFailed, _this);
                }
            }, _this);
            console.log("======== BOSS\u6218\u6597[" + UtilsGame.dateToStr(UtilsGame.Now()) + "] ========");
            console.log(rec_msg.script.pack);
            console.log("===============================================");
        }, false);
        /// 播放挑战BOSS背景音乐,首次加载声音比较耗时，放在发送网络数据之后
        Singleton.Get(MusicManager).play(MUSICTYPE.MT_BOSSBATTLE);
    };
    /**
     * 响应结束BOSS战斗
     */
    PveManager.prototype.onBossBattleFinished = function (is_positive) {
        if (is_positive === void 0) { is_positive = false; }
        // 设定状态完成
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.BOSS, battle.E_BATTLE_FLOW.FINISH);
        // 播放背景音乐
        Singleton.Get(MusicManager).play(MUSICTYPE.MT_INGAME);
        // 请求下一场战斗
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, is_positive ? battle.E_BATTLE_BEHAVIOR.POSITIVE : battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    /**
     * 响应失败BOSS战斗
     */
    PveManager.prototype.onBossBattleFailed = function () {
        this.exitAutoBoss();
        // 结束战斗
        this.onBossBattleFinished();
        // 弹出失败提示
        Singleton.Get(DialogControler).showAlertLose();
    };
    /**
     * 中途退出BOSS战斗
     */
    PveManager.prototype.exitBossBattle = function () {
        // 清空奖励哈希，不允许领取BOSS奖励
        this.cleanRewardHash();
        // 如果正在播放Warning动画，停止动画
        Singleton.Get(battle.RenderManager).hideCloseupBoss();
        // 如果正在自动挑战，关闭自动挑战
        if (this.m_auto_active) {
            this.exitAutoBoss();
        }
        // 结束Boss战斗
        this.onBossBattleFinished(true);
    };
    // endregion
    // region 奖励信息
    /**
     * 响应请求奖励
     * @param rec_msg
     */
    PveManager.prototype.onReward = function (rec_msg) {
        var _this = this;
        /**
         * 挑战胜利
         */
        // if (rec_msg.enemy_killed < this.m_enemy_killed) { // 挑战BOSS胜利
        if (this.m_challenging_boss) {
            Singleton.Get(LayerManager).getView(ui.RewardAlertView).initContent(Template.getGUIText("ui_pve_26"), rec_msg.exp, rec_msg.gold, 0, Common.convBagItemsToDict(rec_msg.bag_items));
            Singleton.Get(LayerManager).getView(ui.RewardAlertView).open();
        }
        else {
            if (rec_msg.gold > 0) {
                Singleton.Get(DialogControler).showCommonAlert(DEFINE.UI_ALERT_INFO.gold.name, rec_msg.gold, DEFINE.UI_ALERT_INFO.gold.res);
            }
            if (rec_msg.exp > 0) {
                Singleton.Get(DialogControler).showCommonAlert(DEFINE.UI_ALERT_INFO.exp.name, rec_msg.exp, DEFINE.UI_ALERT_INFO.exp.res);
            }
            if (rec_msg.diamond > 0) {
                Singleton.Get(DialogControler).showCommonAlert(DEFINE.UI_ALERT_INFO.diamond.name, rec_msg.diamond, DEFINE.UI_ALERT_INFO.diamond.res);
            }
        }
        // 更新关卡
        var need_pve_reinfo = (rec_msg.cur_level != this.m_pve_info.cur_level);
        this.m_pve_info.cur_level = rec_msg.cur_level;
        // 更新BOSS进度
        this.m_enemy_killed = rec_msg.enemy_killed;
        Singleton.Get(LayerManager).getView(ui.BattleView).setBossProgress(this.m_enemy_killed);
        // 更新完整关卡信息
        if (need_pve_reinfo) {
            this.reqPveInfo(function () {
                // 喜从天降
                if (rec_msg.fly_treasure) {
                    _this.onShowTreasure();
                }
            }, this);
        }
    };
    // endregion
    // region 快速战斗
    /**
     * 请求进行快速战斗
     */
    PveManager.prototype.reqQuick = function () {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求并处理回调
        HttpClient.HandlRequestAsWait(NetConst.PVE_REQ_QUICK, send_msg, this, function (data) {
            var rec_msg = data.body.pveQuick;
            if (rec_msg == undefined || !rec_msg.success) {
                return;
            }
            // 更新快速战斗相关变量参数
            _this.m_pve_info.all_quick_count = rec_msg.all_quick_count;
            _this.m_pve_info.today_quick_count = rec_msg.today_quick_count;
            _this.m_pve_info.quick_next_price = rec_msg.quick_next_price;
            // 输出快速战斗结果（临时）
            Singleton.Get(LayerManager).getView(ui.RewardAlertView).initContent(Template.getGUIText("ui_pve_25"), rec_msg.exp, rec_msg.gold, 0);
            Singleton.Get(LayerManager).getView(ui.RewardAlertView).open();
            // 更新快速战斗UI状态
            Singleton.Get(LayerManager).getView(ui.BattleView).setQuickStatus(_this.getQuickLastCount());
            // 任务：注册任务更新
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.QUICK_BATTLE_CNT);
        }, true);
    };
    /**
     * 获取总计使用快速战斗次数
     * @returns {number}
     */
    PveManager.prototype.getAllQuickCount = function () {
        return this.m_pve_info.all_quick_count;
    };
    /**
     * 获取快速战斗可用次数
     * @returns {number}
     */
    PveManager.prototype.getQuickLastCount = function () {
        return this.m_pve_info.today_quick_limit - this.m_pve_info.today_quick_count;
    };
    // endregion
    // region 离线收益
    /**
     * 响应收到离线收益数据
     * @param rec_msg
     */
    PveManager.prototype.onRecOffline = function (rec_msg) {
        Singleton.Get(PlayerInfoManager).reqSyncPlayer(function () {
            if (rec_msg.offline_time < 5 * 60) {
                Singleton.Get(PrivManager).tryShowLoginAlert();
                return;
            }
            // 初始化离线对话框
            var offline_view = Singleton.Get(LayerManager).getView(ui.OfflineResultAlertView);
            offline_view.initData(rec_msg);
            Singleton.Get(LayerManager).getPopup().addPopup(offline_view);
        }, this);
    };
    // endregion
    // region 自动挑战
    /**
     * 获取自动挑战权限
     */
    PveManager.prototype.authAutoBoss = function () {
        return OpenManager.CheckOpen(OpenType.Auto);
    };
    /**
     * 获取自动挑战BOSS状态
     */
    PveManager.prototype.getAutoBossStatus = function () {
        return this.m_auto_active;
    };
    /**
     * 开启自动挑战BOSS
     */
    PveManager.prototype.enterAutoBoss = function () {
        if (!this.m_auto_active) {
            Singleton.Get(DialogControler).showInfo(1106);
        }
        this.m_auto_active = true;
        Singleton.Get(LayerManager).getView(ui.BattleView).updateAutoStatus();
    };
    /**
     * 退出自动挑战BOSS
     */
    PveManager.prototype.exitAutoBoss = function () {
        if (this.m_auto_active) {
            Singleton.Get(DialogControler).showInfo(1107);
        }
        this.m_auto_active = false;
        Singleton.Get(LayerManager).getView(ui.BattleView).updateAutoStatus();
    };
    /**
     * 处理从错误切换战斗中回来的情况
     */
    PveManager.prototype.handleErrToPve = function () {
        // 重置BOSS挑战状态
        Singleton.Get(PveManager).m_challenging_boss = false;
        Singleton.Get(LayerManager).getView(ui.BattleView).setBossPlaying(false);
        Singleton.Get(UpdateTimer).addAndStart(5000, function () {
            Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.PASSIVE);
        }, this);
    };
    // endregion
    // region 喜从天降
    /**
     * 喜从天降触发器
     */
    PveManager.prototype.onShowTreasure = function () {
        if (this.m_treasure_active) {
            return;
        }
        this.m_treasure_active = true;
        var ui_treasure = Singleton.Get(LayerManager).getView(ui.FlyTreasure);
        ui_treasure.bindCallback(this.onReqTreasure, this, undefined);
        Singleton.Get(ui.BattleView).addChild(ui_treasure);
    };
    /**
     * 响应请求喜从天降奖励
     * @param args
     */
    PveManager.prototype.onReqTreasure = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var rec;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, HttpAsync.req(NetConst.PVE_TREASURE, true)];
                    case 1:
                        rec = _a.sent();
                        if (!rec || !rec.body.pveTreasure) {
                            console.log("pveTreasure is null.");
                            return [2 /*return*/];
                        }
                        this.m_treasure_active = false;
                        Singleton.Get(LayerManager).getView(ui.RewardAlertView).initContent(Template.getGUIText("ui_pve_24"), 0, rec.body.pveTreasure.gold, 0);
                        Singleton.Get(LayerManager).getView(ui.RewardAlertView).open();
                        return [2 /*return*/];
                }
            });
        });
    };
    // endregion
    // region 辅助方法
    /**
     * 关卡信息
     * @param level 目标关卡
     * @param force 是否强制改变
     */
    PveManager.prototype.updateLevel = function (level) {
        // 如果还未收到，不更新
        if (this.m_pve_info.cur_level == undefined) {
            return false;
        }
        // 更新关卡
        this.m_pve_info.cur_level = level;
        // 更新关卡信息
        Singleton.Get(LayerManager).getView(ui.MainView).setLevel(level, this.m_pve_info.exp_per_hour, this.m_pve_info.gold_per_hour);
        // 更新背景图
        Singleton.Get(battle.RenderManager).setSceneByLevel(level);
        // 注册相关任务更新
        Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_PVE);
        Singleton.Get(ActivityManager).getAlarm().onUpdate_GkGrow();
    };
    /**
     * 获取PVE信息
     * @returns {msg.PveInfoMsg}
     */
    PveManager.prototype.getPveInfo = function () {
        return this.m_pve_info;
    };
    return PveManager;
}());
__reflect(PveManager.prototype, "PveManager");
//# sourceMappingURL=PveManager.js.map