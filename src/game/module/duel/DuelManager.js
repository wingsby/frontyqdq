var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DuelManager = (function () {
    /**
     * @constructor
     */
    function DuelManager() {
        this.m_cri_count = 0; // 发起战斗时信息过期尝试刷新次数
        this.last_bat_id = 0; // 最后一次发起的战斗ID
        this.is_info_ok = false;
        this.m_duels_info = new PlayerDuelInfo();
        this.m_battle_ctrl = new DuelBattleController();
    }
    /**
     * 响应用户登陆完成
     */
    DuelManager.prototype.onGameLoaded = function () {
        if (OpenManager.CheckOpen(OpenType.Duel)) {
            this.is_info_ok = true;
            this.reqInfo();
        }
        // Singleton.Get(BattleStateGateway).register(battle.E_BATTLE_TYPE.DUEL, undefined, this.onBattleStateExecute, this);
    };
    /**
     * 响应执行战斗状态变更
     */
    DuelManager.prototype.onBattleStateExecute = function () {
    };
    /**
     * 打开界面
     */
    DuelManager.prototype.onViewOpen = function (callback, thisObj) {
        if (this.is_info_ok) {
            if (callback) {
                callback.call(thisObj);
            }
        }
        else {
            this.reqInfo(callback, this);
        }
    };
    // region 数据操作
    /**
     * 获取一骑当千基本信息
     * @returns {PlayerDuelInfo}
     */
    DuelManager.prototype.getDuels = function () {
        return this.m_duels_info;
    };
    /**
     * 获取一骑当千战斗控制器
     * @returns {DuelBattleController}
     */
    DuelManager.prototype.getBattleCtrl = function () {
        return this.m_battle_ctrl;
    };
    // endregion
    // region 请求收发
    /**
     * 请求一骑当千基本信息
     * @param callback
     * @param thisObj
     * @param args
     */
    DuelManager.prototype.reqInfo = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.duel = new msg.DuelMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DUEL_INFO, send_msg, this, function (rec_msg) {
            var rec_duel = rec_msg.body.duel;
            if (!rec_duel)
                return;
            if (rec_duel.success) {
                // 更新消息
                _this.getDuels().updateInfo(rec_duel.my_info);
                _this.getDuels().updateTeams(rec_duel.my_teams);
                if (callback) {
                    callback.call.apply(callback, [thisObj].concat(args));
                }
            }
        }, false);
    };
    /**
     * 请求更换上阵斗士
     * @param team_id
     * @param team_pos
     * @param role_id
     * @param callback
     * @param thisObj
     */
    DuelManager.prototype.reqTeamChange = function (team_id, team_pos, role_id, callback, thisObj) {
        var _this = this;
        // 如果基本信息过期 则先请求更新Info
        if (!this.getDuels().checkUpToDate()) {
            if (this.m_cri_count > 8) {
                this.m_cri_count = 0;
                console.error("Can't start battle, fetch info error.");
                return;
            }
            this.m_cri_count++;
            this.reqInfo(this.reqTeamChange, this, team_id, team_pos, role_id, callback, thisObj);
            return;
        }
        this.m_cri_count = 0;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.duel = new msg.DuelMsg();
        send_msg.body.duel.team_id = team_id;
        send_msg.body.duel.team_pos = team_pos;
        send_msg.body.duel.role_id = role_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DUEL_TEAM_CHANGE, send_msg, this, function (rec_msg) {
            var rec_duel = rec_msg.body.duel;
            if (!rec_duel)
                return;
            if (rec_duel.success) {
                // 更新信息
                _this.getDuels().updateTeams(rec_duel.my_teams);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求一键更换队伍
     * @param callback
     * @param thisObj
     */
    DuelManager.prototype.reqTeamChangeAll = function (callback, thisObj) {
        var _this = this;
        // 如果基本信息过期 则先请求更新Info
        if (!this.getDuels().checkUpToDate()) {
            this.reqInfo(this.reqTeamChangeAll, this, callback, thisObj);
            return;
        }
        var send_msg = new msg.CommonMsg();
        send_msg.body.duel = new msg.DuelMsg();
        send_msg.body.duel.my_teams = this.getDuels().ChangeHeroOnekey();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DUEL_TEAM_CHANGE_ALL, send_msg, this, function (rec_msg) {
            var rec_duel = rec_msg.body.duel;
            if (!rec_duel)
                return;
            if (rec_duel.success) {
                // 更新信息
                _this.getDuels().updateTeams(rec_duel.my_teams);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求更换队伍阵形
     * @param team_id
     * @param team
     * @param callback
     * @param thisObj
     */
    DuelManager.prototype.reqTeamOpinion = function (team_id, team, callback, thisObj) {
        var _this = this;
        // 如果基本信息过期 则先请求更新Info
        if (!this.getDuels().checkUpToDate()) {
            this.reqInfo(this.reqTeamOpinion, this, team_id, team, callback, thisObj);
            return;
        }
        var send_msg = new msg.CommonMsg();
        send_msg.body.duel = new msg.DuelMsg();
        send_msg.body.duel.team_id = team_id;
        send_msg.body.duel.cur_team = team;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DUEL_TEAM_OPINION, send_msg, this, function (rec_msg) {
            var rec_duel = rec_msg.body.duel;
            if (!rec_duel)
                return;
            if (rec_duel.success) {
                // 更新信息
                _this.getDuels().updateTeam(team_id, team);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求下阵队伍
     * @param team_id
     * @param callback
     * @param thisObj
     */
    DuelManager.prototype.reqTeamDrop = function (team_id, callback, thisObj) {
        var _this = this;
        // 如果基本信息过期 则先请求更新Info
        if (!this.getDuels().checkUpToDate()) {
            this.reqInfo(this.reqTeamDrop, this, team_id, callback, thisObj);
            return;
        }
        var send_msg = new msg.CommonMsg();
        send_msg.body.duel = new msg.DuelMsg();
        send_msg.body.duel.team_id = team_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DUEL_TEAM_DROP, send_msg, this, function (rec_msg) {
            var rec_duel = rec_msg.body.duel;
            if (!rec_duel)
                return;
            if (rec_duel.success) {
                // 更新信息
                _this.getDuels().dropTeam(team_id);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求切换至一骑当千战斗
     * @param callback
     * @param thisObj
     */
    DuelManager.prototype.actBattleDuel = function (callback, thisObj) {
        var _this = this;
        // 如果基本信息过期 则先请求更新Info
        if (!this.getDuels().checkUpToDate()) {
            this.reqInfo(this.actBattleDuel, this, callback, thisObj);
            return;
        }
        var send_msg = new msg.CommonMsg();
        send_msg.body.duel = new msg.DuelMsg();
        // 发送请求消息
        QueuedGateway.addRequest(QueuedGatewayType.BATTLE, NetConst.DUEL_CHALLENGE, send_msg, this, function (rec_msg) {
            var rec_duel = rec_msg.body.duel;
            if (!rec_duel)
                return;
            // 进入战斗不成功
            if (rec_duel.success == false) {
                console.log("enter duel failed.");
                Singleton.Get(battle.BattleStateMachine).reset();
                return;
            }
            // 如果胜利 记录胜利场次
            if (rec_duel.battle.is_win == BattleResult.LEFT_WIN) {
                _this.getDuels().wins++;
            }
            // 记录最大功勋
            if (rec_duel.r_items) {
                if (rec_duel.r_items[0]) {
                    if (rec_duel.r_items[0].count > 0) {
                        _this.getDuels().addMaxScore(rec_duel.r_items[0].count);
                    }
                }
            }
            if (callback) {
                callback.call(thisObj, rec_duel);
            }
            // 任务：注册任务更新
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.DUEL);
        }, true);
    };
    /**
     * 请求领取功勋奖励
     * @param score_id
     * @param callback
     * @param thisObj
     */
    DuelManager.prototype.reqScoreReward = function (score_id, callback, thisObj) {
        var _this = this;
        // 如果基本信息过期 则先请求更新Info
        if (!this.getDuels().checkUpToDate()) {
            this.reqInfo(this.reqScoreReward, this, score_id, callback, thisObj);
            return;
        }
        var send_msg = new msg.CommonMsg();
        send_msg.body.duel = new msg.DuelMsg();
        send_msg.body.duel.score_id = score_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DUEL_SCORE_REWARD, send_msg, this, function (rec_msg) {
            var rec_duel = rec_msg.body.duel;
            if (!rec_duel)
                return;
            if (rec_duel.success) {
                // 展示已获得的道具
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec_duel.r_gold, rec_duel.r_diamond, rec_duel.r_items);
                // 标记该奖励状态为已领取
                _this.getDuels().markScoreAsReceived(score_id);
                if (callback) {
                    callback.call(thisObj);
                }
            }
            // 任务：注册任务更新
            Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_GET_DUEL_AWARD_ID);
        }, true);
    };
    /**
     * 请求胜次奖励
     * @param wins_id
     * @param callback
     * @param thisObj
     */
    DuelManager.prototype.reqWinsReward = function (wins_id, callback, thisObj) {
        var _this = this;
        // 如果基本信息过期 则先请求更新Info
        if (!this.getDuels().checkUpToDate()) {
            this.reqInfo(this.reqScoreReward, this, wins_id, callback, thisObj);
            return;
        }
        var send_msg = new msg.CommonMsg();
        send_msg.body.duel = new msg.DuelMsg();
        send_msg.body.duel.wins_id = wins_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.DUEL_WINS_REWARD, send_msg, this, function (rec_msg) {
            var rec_duel = rec_msg.body.duel;
            if (!rec_duel)
                return;
            if (rec_duel.success) {
                // 展示已获得的道具
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec_duel.r_gold, rec_duel.r_diamond, rec_duel.r_items);
                // 标记该奖励状态为已领取
                _this.getDuels().markWinsAsReceived(wins_id);
                for (var i = 0; i < rec_duel.r_items.length; i++) {
                    if (rec_duel.r_items[i].id == SpecialItem.Feats) {
                        _this.getDuels().addMaxScore(rec_duel.r_items[i].count);
                        break;
                    }
                }
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    return DuelManager;
}());
__reflect(DuelManager.prototype, "DuelManager");
//# sourceMappingURL=DuelManager.js.map