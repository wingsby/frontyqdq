var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RankManager = (function () {
    function RankManager() {
        // 竞技场排行榜缓存
        this.m_last_arena_refresh_time = 0;
        this.m_last_arena_players = undefined;
        // 关卡排行榜缓存
        this.m_last_pve_refresh_time = 0;
        this.m_last_pve_players = undefined;
        // 爬塔排行榜缓存
        this.m_last_tower_refresh_time = 0;
        this.m_last_tower_players = undefined;
        // 战队等级排行榜缓存
        this.m_last_team_lv_refresh_time = 0;
        this.m_last_team_lv_players = undefined;
        // 公会排行榜缓存
        this.m_last_guild_refresh_time = 0;
        this.m_last_guilds = undefined;
    }
    // region 请求收发
    /**
     * 获取玩家个人排行位置信息
     */
    RankManager.prototype.reqMyRank = function (callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.RANK_ME, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.rank)
                return;
            if (rec_msg.body.rank.success) {
                if (callback) {
                    callback.call(thisObj, rec_msg.body.rank.my_rank);
                }
            }
        });
    };
    /**
     * 请求竞技场排行榜列表
     * @param callback
     * @param thisObj
     */
    RankManager.prototype.reqArenaList = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.RANK_LIST_ARENA, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.rank)
                return;
            if (rec_msg.body.rank.success) {
                var rank_players = rec_msg.body.rank.players;
                if (!rank_players) {
                    rank_players = [];
                }
                _this.m_last_arena_refresh_time = UtilsGame.Now();
                _this.m_last_arena_players = rank_players;
                var my_rank = _this.getMyRank(RankListType.ARENA);
                if (callback) {
                    callback.call(thisObj, rank_players, my_rank);
                }
            }
        });
    };
    /**
     * 请求关卡排行榜列表
     * @param callback
     * @param thisObj
     */
    RankManager.prototype.reqPveList = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.RANK_LIST_PVE, send_msg, this, function (rec_msg) {
            if (rec_msg.body.rank == undefined)
                return;
            if (rec_msg.body.rank.success) {
                var rank_players = rec_msg.body.rank.players;
                if (rank_players == undefined) {
                    rank_players = [];
                }
                _this.m_last_pve_refresh_time = UtilsGame.Now();
                _this.m_last_pve_players = rank_players;
                var my_rank = _this.getMyRankByRankPlayers(rank_players);
                if (callback) {
                    callback.call(thisObj, rank_players, my_rank);
                }
            }
        });
    };
    /**
     * 请求爬塔排行榜列表
     * @param callback
     * @param thisObj
     */
    RankManager.prototype.reqTowerList = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.RANK_LIST_TOWER, send_msg, this, function (rec_msg) {
            if (rec_msg.body.rank == undefined)
                return;
            if (rec_msg.body.rank.success) {
                // console.log("=====RANK=====");
                // console.log(rec_msg.body.rank);
                var rank_players = rec_msg.body.rank.players;
                if (rank_players == undefined) {
                    rank_players = [];
                }
                _this.m_last_tower_refresh_time = UtilsGame.Now();
                _this.m_last_tower_players = rank_players;
                var my_rank = _this.getMyRankByRankPlayers(rank_players);
                if (callback) {
                    callback.call(thisObj, rank_players, my_rank);
                }
            }
        });
    };
    /**
     * 请求等级排行榜列表
     * @param callback
     * @param thisObj
     */
    RankManager.prototype.reqTeamLvList = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.RANK_LIST_TEAM_LV, send_msg, this, function (rec_msg) {
            if (rec_msg.body.rank == undefined)
                return;
            if (rec_msg.body.rank.success) {
                // console.log("=====TEAM LV RANK=====");
                // console.log(rec_msg.body.rank);
                var rank_players = rec_msg.body.rank.players;
                if (rank_players == undefined) {
                    rank_players = [];
                }
                _this.m_last_team_lv_refresh_time = UtilsGame.Now();
                _this.m_last_team_lv_players = rank_players;
                var my_rank = _this.getMyRankByRankPlayers(rank_players);
                if (callback) {
                    callback.call(thisObj, rank_players, my_rank);
                }
            }
        });
    };
    /**
     * 请求公会排行榜
     */
    RankManager.prototype.reqGuildList = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.RANK_LIST_GUILD, send_msg, this, function (rec_msg) {
            if (rec_msg.body.rank == undefined)
                return;
            if (rec_msg.body.rank.success) {
                // console.log("=====GUILD RANK=====");
                // console.log(rec_msg.body.rank);
                var rank_guilds = rec_msg.body.rank.guilds;
                if (rank_guilds == undefined) {
                    rank_guilds = [];
                }
                _this.m_last_guild_refresh_time = UtilsGame.Now();
                _this.m_last_guilds = rank_guilds;
                var my_rank = _this.getMyGuildRank(_this.m_last_guilds);
                if (callback) {
                    callback.call(thisObj, rank_guilds, my_rank);
                }
            }
        });
    };
    /**
     * 请求玩家信息
     * @param callback
     * @param thisObj
     */
    RankManager.prototype.reqPlayerInfo = function (uid, callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.rank = new msg.RankMsg();
        send_msg.body.rank.uid = uid;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.RANK_INFO, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.rank)
                return;
            if (rec_msg.body.rank.success) {
                var rank_player_roles = rec_msg.body.rank.roles;
                if (!rank_player_roles) {
                    return;
                }
                rank_player_roles = RoleUtil.convSyncToInfo(rank_player_roles);
                rank_player_roles.pve_team = RoleUtil.fillPveTeamArray(rank_player_roles.pve_team);
                if (callback) {
                    callback.call(thisObj, rec_msg.body.rank.players[0], rank_player_roles);
                }
            }
        });
    };
    // endregion
    // region 工具方法
    /**
     * 根据RankPlayerInfo数组获取玩家排名
     * @param rank_players
     */
    RankManager.prototype.getMyRankByRankPlayers = function (rank_players) {
        var my_uid = Singleton.Get(LoginManager).loginInfo._id;
        var my_rank = -1;
        if (!rank_players) {
            return my_rank;
        }
        for (var i = 0; i < rank_players.length; i++) {
            if (rank_players[i].uid == my_uid) {
                my_rank = rank_players[i].ranking;
                break;
            }
        }
        return my_rank;
    };
    /**
     * 获取玩家所在公会排名
     */
    RankManager.prototype.getMyGuildRank = function (list) {
        var my_gd_id = Singleton.Get(GuildManager).getInfo().gd_id;
        if (!list || !my_gd_id || my_gd_id == "") {
            return 0;
        }
        for (var i = 0; i < list.length; i++) {
            var inf_guild = list[i];
            if (inf_guild.id == my_gd_id) {
                return inf_guild.rank;
            }
        }
        return 0;
    };
    /**
     * 获取玩家当前排名（必须在获取过排行榜内容后调用，否则为-1）
     * @param type
     * @returns {number}
     */
    RankManager.prototype.getMyRank = function (type) {
        switch (type) {
            case RankListType.ARENA:
                var my_rank = this.getMyRankByRankPlayers(this.m_last_arena_players);
                if (my_rank <= 0) {
                    my_rank = Singleton.Get(ArenaManager).getMyCurRank();
                }
                return my_rank;
            case RankListType.PVE:
                return this.getMyRankByRankPlayers(this.m_last_pve_players);
            case RankListType.TOWER:
                return this.getMyRankByRankPlayers(this.m_last_tower_players);
            case RankListType.TEAM_LV:
                return this.getMyRankByRankPlayers(this.m_last_team_lv_players);
            case RankListType.GUILD:
                return this.getMyGuildRank(this.m_last_guilds);
            default:
                break;
        }
        return -1;
    };
    /**
     * 获取排行榜内容
     * 如果本地没有或过期则请求服务器去获取
     *
     * @param type
     * @param callback
     * @param thisObj
     */
    RankManager.prototype.getRank = function (type, callback, thisObj) {
        switch (type) {
            case RankListType.ARENA:
                if ((UtilsGame.Now() - this.m_last_arena_refresh_time) < DEFINE.RANK_ARENA_REFRESH_DURATION && this.m_last_arena_players != undefined) {
                    callback.call(thisObj, this.m_last_arena_players, this.getMyRank(RankListType.ARENA));
                    return;
                }
                this.reqArenaList(callback, thisObj);
                break;
            case RankListType.PVE:
                if ((UtilsGame.Now() - this.m_last_pve_refresh_time) < DEFINE.RANK_PVE_REFRESH_DURATION && this.m_last_pve_players != undefined) {
                    callback.call(thisObj, this.m_last_pve_players, this.getMyRank(RankListType.PVE));
                    return;
                }
                this.reqPveList(callback, thisObj);
                break;
            case RankListType.TOWER:
                if ((UtilsGame.Now() - this.m_last_tower_refresh_time) < DEFINE.RANK_TOWER_REFRESH_DURATION && this.m_last_tower_players != undefined) {
                    callback.call(thisObj, this.m_last_tower_players, this.getMyRank(RankListType.TOWER));
                    return;
                }
                this.reqTowerList(callback, thisObj);
                break;
            case RankListType.TEAM_LV:
                if ((UtilsGame.Now() - this.m_last_team_lv_refresh_time) < DEFINE.RANK_TEAM_LV_REFRESH_DURATION && this.m_last_team_lv_players != undefined) {
                    callback.call(thisObj, this.m_last_team_lv_players, this.getMyRank(RankListType.TEAM_LV));
                    return;
                }
                this.reqTeamLvList(callback, thisObj);
                break;
            case RankListType.GUILD:
                if ((UtilsGame.Now() - this.m_last_guild_refresh_time) < DEFINE.RANK_GUILD_REFRESH_DURATION && this.m_last_guilds != undefined) {
                    callback.call(thisObj, this.m_last_guilds, this.getMyRank(RankListType.GUILD));
                    return;
                }
                this.reqGuildList(callback, thisObj);
                break;
            default:
                egret.error("cant getRank, rankListType: " + type);
                break;
        }
    };
    return RankManager;
}());
__reflect(RankManager.prototype, "RankManager");
//# sourceMappingURL=RankManager.js.map