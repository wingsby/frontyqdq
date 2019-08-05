var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildWarManager = (function () {
    function GuildWarManager() {
        this.is_play_log = false;
        // region 请求消息
        /**
         * 获取公会战基本信息
         */
        this.m_last_req_info = 0;
        /**
         * 请求公会战敌人列表
         */
        this.m_last_req_enemy = 0;
        /**
         * 请求公会战队友列表
         */
        this.m_last_req_my = 0;
        /**
         * 请求公会战排行
         */
        this.m_last_req_war_rank = 0;
        this.info = new GuildWarInfo();
    }
    GuildWarManager.prototype.getInfo = function () {
        return this.info;
    };
    GuildWarManager.prototype.onGameLoaded = function () {
    };
    GuildWarManager.prototype.reqInfo = function (callback, thisObj, sync) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 防止反复重发
        var info = Singleton.Get(GuildManager).getInfo();
        if (UtilsGame.Now() - this.m_last_req_info <= 5000) {
            if (callback != undefined) {
                callback.call(thisObj);
            }
            return;
        }
        this.m_last_req_info = UtilsGame.Now();
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_WAR_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild_war;
            if (rec && rec.success) {
                _this.info.updateInfo(rec);
            }
            else {
                _this.info.status = rec.status;
            }
            if (callback != undefined) {
                callback.call.apply(callback, [thisObj].concat(args));
            }
        }, sync);
    };
    /**
     * 获取公会战比分信息
     */
    GuildWarManager.prototype.reqScore = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_WAR_SCORE, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild_war;
            if (rec && rec.success) {
                _this.info.updateScore(rec);
                if (callback != undefined) {
                    callback.call(thisObj, _this.info.my_score, _this.info.ene_score);
                }
            }
        }, false);
    };
    GuildWarManager.prototype.reqListEnemy = function (is_lock, callback, thisObj) {
        var _this = this;
        // 防止反复重发
        var info = Singleton.Get(GuildManager).getInfo();
        if (UtilsGame.Now() - this.m_last_req_enemy <= 5000) {
            if (callback != undefined) {
                callback.call(thisObj);
            }
            return;
        }
        this.m_last_req_enemy = UtilsGame.Now();
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_WAR_LIST_ENEMY, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild_war;
            if (rec && rec.success) {
                _this.info.updateEnePlayers(rec);
                if (callback != undefined) {
                    callback.call(thisObj);
                }
            }
        }, is_lock);
    };
    GuildWarManager.prototype.reqListMy = function (callback, thisObj) {
        var _this = this;
        // 防止反复重发
        var info = Singleton.Get(GuildManager).getInfo();
        if (UtilsGame.Now() - this.m_last_req_my <= 5000) {
            if (callback != undefined) {
                callback.call(thisObj);
            }
            return;
        }
        this.m_last_req_my = UtilsGame.Now();
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_WAR_LIST_MY, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild_war;
            if (rec && rec.success) {
                _this.info.updateMyPlayers(rec);
                if (callback != undefined) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求玩家信息
     */
    GuildWarManager.prototype.reqPlayer = function (is_enemy, uid, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild_war = new msg.GuildWarMsg();
        send_msg.body.guild_war.uid = uid;
        send_msg.body.guild_war.guild_id = is_enemy ? this.getInfo().g_info.id : Singleton.Get(GuildManager).getMyGuild().id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_WAR_PLAYER, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild_war;
            if (rec && rec.success) {
                rec.player.uid = uid;
                _this.info.addExtPlayer(uid, rec.player);
                _this.info.updateLog(rec.player.uid, rec.logs);
                if (callback != undefined) {
                    callback.call(thisObj, rec.player, rec.logs);
                }
            }
        }, true);
    };
    /**
     * 请求播放战报
     */
    GuildWarManager.prototype.reqLogPlay = function (id, callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild_war = new msg.GuildWarMsg();
        send_msg.body.guild_war.log_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_WAR_LOG_PLAY, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild_war;
            if (rec && rec.success) {
                // TODO 播放录像
                if (callback != undefined) {
                    callback.call(thisObj, rec.player, rec.logs);
                }
            }
        }, true);
    };
    /**
     * 请求同步玩家个人信息
     */
    GuildWarManager.prototype.reqMyself = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_WAR_MYSELF, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild_war;
            if (rec && rec.success) {
                _this.info.updateCsd(rec);
                if (callback != undefined) {
                    callback.call(thisObj, rec.player, rec.logs);
                }
            }
        }, true);
    };
    GuildWarManager.prototype.reqWarRank = function (callback, thisObj) {
        // 防止反复重发
        var info = Singleton.Get(GuildManager).getInfo();
        if (UtilsGame.Now() - this.m_last_req_war_rank <= 5000) {
            if (callback != undefined) {
                callback.call(thisObj, info.war_list);
            }
            return;
        }
        this.m_last_req_war_rank = UtilsGame.Now();
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.RANK_LIST_GUILD_WAR, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.rank;
            if (rec && rec.success) {
                info.updateWarRank(rec.guilds);
                if (callback != undefined) {
                    callback.call(thisObj, rec.guilds);
                }
            }
        }, true);
    };
    // endregion
    // region 通知提示
    GuildWarManager.prototype.checkAlarm = function (callback, thisObj) {
        if (!Singleton.Get(GuildManager).getInfo().hasGuild()) {
            if (callback) {
                callback.call(thisObj, this.isAlarm());
            }
            return;
        }
        if (!this.getInfo().isStatusValid()) {
            var gd_id = Singleton.Get(GuildManager).getInfo().gd_id;
            if (!gd_id || gd_id == "") {
                return;
            }
            this.reqInfo(callback, thisObj, false, this.isAlarm());
            return;
        }
        if (callback) {
            callback.call(thisObj, this.isAlarm());
        }
    };
    GuildWarManager.prototype.isAlarm = function () {
        if (!Singleton.Get(GuildManager).getInfo().hasGuild()) {
            return false;
        }
        if (!GuildWarUtil.isWarTime()) {
            return false;
        }
        if (!this.getInfo().isWarOpen()) {
            return false;
        }
        if (this.getInfo().getCurCsd() >= Template.config.GuildDekaron) {
            return false;
        }
        return true;
    };
    // endregion
    // region 战斗切换
    /**
     * 切换至公会战斗
     * @param rank
     */
    GuildWarManager.prototype.actBattleGuild = function (uid, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild_war = new msg.GuildWarMsg();
        send_msg.body.guild_war.uid = uid;
        // 发送请求消息
        QueuedGateway.addRequest(QueuedGatewayType.BATTLE, NetConst.GUILD_WAR_ATTACK, send_msg, this, function (rec_msg) {
            // 检查返回消息
            var rec = rec_msg.body.guild_war;
            if (!rec) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("guild battle data is empty.");
                return;
            }
            // 进入战斗不成功
            if (!rec.success) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("enter battle failed.");
                return;
            }
            // 记录战斗结果造成的影响
            _this.getInfo().setLoseStar(uid, rec.r_stars);
            _this.getInfo().setGetStar(Singleton.Get(LoginManager).loginInfo._id, rec.r_stars);
            _this.getInfo().getPlayerByUid(uid).avatar = rec.player.avatar;
            _this.getInfo().getPlayerByUid(uid).username = rec.player.username;
            _this.getInfo().getPlayerByUid(uid).vip = rec.player.vip;
            // 准备战斗数据
            var battle_wrapper = new msg.BattleResultMsg();
            battle_wrapper.pack = rec.battle_data;
            _this.is_play_log = false;
            // 切换黑屏后加载新战斗
            Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.GUILD, battle.E_BATTLE_FLOW.PLAYING);
            Singleton.Get(battle.RoundManager).CutScene(false, function () {
                Singleton.Get(battle.RoundManager).Enter(battle_wrapper, _this.handleGuildBattleEnd, _this, [rec.battle_data, rec.r_stars, rec.r_dnt]);
            }, _this);
            Singleton.Get(LayerManager).getView(ArenaBattleView).setExitParams([rec.battle_data, rec.r_stars, rec.r_dnt]);
            // 执行回调
            if (callback) {
                callback.call(thisObj);
            }
        }, true);
    };
    /**
     * 切换至公会战报战斗
     * @param rank
     */
    GuildWarManager.prototype.actBattleGuildLog = function (id, uid, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild_war = new msg.GuildWarMsg();
        send_msg.body.guild_war.log_id = id;
        // 发送请求消息
        QueuedGateway.addRequest(QueuedGatewayType.BATTLE, NetConst.GUILD_WAR_LOG_PLAY, send_msg, this, function (rec_msg) {
            // 检查返回消息
            var rec = rec_msg.body.guild_war;
            if (!rec) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("guild battle log data is empty.");
                return;
            }
            // 进入战斗不成功
            if (!rec.success) {
                Singleton.Get(battle.BattleStateMachine).reset();
                console.log("enter battle failed.");
                return;
            }
            var battle_wrapper = new msg.BattleResultMsg();
            battle_wrapper.pack = rec.battle_data;
            _this.is_play_log = true;
            // 切换黑屏后加载新战斗
            Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.GUILD_LOG, battle.E_BATTLE_FLOW.PLAYING);
            Singleton.Get(battle.RoundManager).CutScene(false, function () {
                Singleton.Get(battle.RoundManager).Enter(battle_wrapper, _this.handleLogBattleEnd, _this, [uid]);
            }, _this);
            Singleton.Get(LayerManager).getView(ArenaBattleView).setExitParams([uid]);
            // 执行回调
            if (callback) {
                callback.call(thisObj, rec.player.username, rec.player.avatar, rec.player_2p.username, rec.player_2p.avatar);
            }
        }, true);
    };
    GuildWarManager.prototype.handleGuildBattleEnd = function (params) {
        // 参数类型符合战报播放范式时 视为处理战报播放结束
        // if (!params || params.length < 2) {
        //     this.handleLogBattleEnd(params); // Don't touch! It's a magic.
        //     return;
        // }
        var b_pack = params[0];
        GuildWarViewHandler.openResultPanel(b_pack.m_result == 1, params[1], b_pack.l_dead, params[2]);
        // 战败时 弹出战斗失败提示框
        if (params[0].m_result <= 0) {
            Singleton.Get(DialogControler).showAlertLose();
        }
        // 切换至PVE战斗
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.GUILD, battle.E_BATTLE_FLOW.FINISH);
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    GuildWarManager.prototype.handleLogBattleEnd = function (params) {
        var cur_uid = params[0];
        if (!!cur_uid && cur_uid != "") {
            var is_enemy = this.getInfo().getUidIsEnemy(cur_uid);
            Singleton.Get(LayerManager).getView(ui.GuildWarPlayerView).open(is_enemy, cur_uid);
        }
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.GUILD_LOG, battle.E_BATTLE_FLOW.FINISH);
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    return GuildWarManager;
}());
__reflect(GuildWarManager.prototype, "GuildWarManager");
//# sourceMappingURL=GuildWarManager.js.map