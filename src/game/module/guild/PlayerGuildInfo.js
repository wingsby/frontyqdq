var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerGuildInfo = (function () {
    function PlayerGuildInfo() {
        this.gd_id = ""; // 当前工会id
        this.quit_t = 0; // 上次退出公会的时间戳，用于冷却申请
        this.in_t = 0; // 加入公会时间戳
        this.daily_gold_dnt_cnt = 0; // 当天金币已经捐献的次数
        this.last_gold_dnt_t = 0; // 上一次捐献时间
        this.daily_dmd_dnt_cnt = 0; // 当天钻石已经捐献的次数
        this.last_dmd_dnt_t = 0; // 上一次捐献时间
        // endregion
    }
    /**
     * 更新玩家公会数据
     */
    PlayerGuildInfo.prototype.updateData = function (rec) {
        if (!rec) {
            return;
        }
        this.onGuildChange(this.gd_id);
        this.gd_id = rec.gd_id;
        this.in_t = rec.in_t;
        this.quit_t = rec.quit_t;
        this.daily_gold_dnt_cnt = rec.daily_gold_dnt_cnt;
        this.last_gold_dnt_t = rec.last_gold_dnt_t;
        this.daily_dmd_dnt_cnt = rec.daily_dmd_dnt_cnt;
        this.last_dmd_dnt_t = rec.last_dmd_dnt_t;
    };
    /**
     * 响应当前公会变更
     */
    PlayerGuildInfo.prototype.onGuildChange = function (guild_id) {
        WsClient.sendChangeGuildMe(guild_id);
    };
    // region 入会申请
    /**
     * 检查玩家当前是否有公会
     */
    PlayerGuildInfo.prototype.hasGuild = function () {
        return this.gd_id && this.gd_id.length > 0;
    };
    /**
     * 是否已获取过申请数据
     */
    PlayerGuildInfo.prototype.hasAppliesData = function () {
        return (this.my_applies != undefined && this.my_appliable != undefined);
    };
    /**
     * 更新申请列表
     */
    PlayerGuildInfo.prototype.updateApplies = function (rec) {
        this.my_appliable = rec.guild_list;
        this.my_applies = rec.apply_list;
    };
    /**
     * 获取列表公会信息
     */
    PlayerGuildInfo.prototype.getGuildInfo = function (gid) {
        if (this.my_applies) {
            var my_applies = this.my_applies;
            for (var i = 0; i < my_applies.length; i++) {
                if (my_applies[i].id == gid) {
                    return my_applies[i];
                }
            }
        }
        if (this.my_appliable) {
            var my_appliable = this.my_appliable;
            for (var i = 0; i < my_appliable.length; i++) {
                if (my_appliable[i].id == gid) {
                    return my_appliable[i];
                }
            }
        }
        if (this.my_search) {
            var my_search = this.my_search;
            for (var i = 0; i < my_search.length; i++) {
                if (my_search[i].id == gid) {
                    return my_search[i];
                }
            }
        }
        if (Singleton.Get(RankManager).m_last_guilds) {
            var my_ranks = Singleton.Get(RankManager).m_last_guilds;
            for (var i = 0; i < my_ranks.length; i++) {
                if (my_ranks[i].id == gid) {
                    return my_ranks[i];
                }
            }
        }
        if (this.war_list) {
            var war_list = this.war_list;
            for (var i = 0; i < war_list.length; i++) {
                if (war_list[i].id == gid) {
                    return war_list[i];
                }
            }
        }
        return;
    };
    /**
     * 获取公会战公会信息
     */
    PlayerGuildInfo.prototype.getGuildInfoWar = function (gid) {
        if (this.war_list) {
            var war_list = this.war_list;
            for (var i = 0; i < war_list.length; i++) {
                if (war_list[i].id == gid) {
                    return war_list[i];
                }
            }
        }
    };
    /**
     * 公会是否已申请
     */
    PlayerGuildInfo.prototype.isGuildApplied = function (gid) {
        var my_applies = this.my_applies;
        for (var i = 0; i < my_applies.length; i++) {
            if (my_applies[i].id == gid) {
                return true;
            }
        }
        return false;
    };
    /**
     * 申请成功 将目标公会列入申请列表
     */
    PlayerGuildInfo.prototype.handleGuildApply = function (gid) {
        var my_appliable = this.my_appliable;
        var target = undefined;
        for (var i = 0; i < my_appliable.length; i++) {
            if (my_appliable[i].id == gid) {
                target = my_appliable.splice(i, 1)[0];
                break;
            }
        }
        if (target) {
            this.my_applies.push(target);
        }
    };
    /**
     * 撤销申请成功 将目标公会从申请列表移除
     */
    PlayerGuildInfo.prototype.handleGuildRevoke = function (gid) {
        var my_applies = this.my_applies;
        var target = undefined;
        for (var i = 0; i < my_applies.length; i++) {
            if (my_applies[i].id == gid) {
                target = my_applies.splice(i, 1)[0];
                break;
            }
        }
        if (target) {
            this.my_appliable.push(target);
        }
    };
    // endregion
    // region 捐献次数
    /**
     * 获取当日金币捐赠次数
     */
    PlayerGuildInfo.prototype.getGoldDntCnt = function () {
        if (UtilsGame.isRToday(this.last_gold_dnt_t)) {
            return this.daily_gold_dnt_cnt;
        }
        else {
            return 0;
        }
    };
    /**
     * 记录一次金币捐赠
     */
    PlayerGuildInfo.prototype.dntGoldOnce = function () {
        this.daily_gold_dnt_cnt = this.getGoldDntCnt() + 1;
        this.last_gold_dnt_t = UtilsGame.Now();
    };
    /**
     * 获取当日钻石捐赠次数
     */
    PlayerGuildInfo.prototype.getDmdDntCnt = function () {
        if (UtilsGame.isRToday(this.last_dmd_dnt_t)) {
            return this.daily_dmd_dnt_cnt;
        }
        else {
            return 0;
        }
    };
    /**
     * 记录一次钻石捐赠
     */
    PlayerGuildInfo.prototype.dntDmdOnce = function () {
        this.daily_dmd_dnt_cnt = this.getDmdDntCnt() + 1;
        this.last_dmd_dnt_t = UtilsGame.Now();
    };
    // endregion
    // region 加入退出
    /**
     * 退出公会后操作
     */
    PlayerGuildInfo.prototype.onExitGuild = function () {
        this.gd_id = "";
        this.quit_t = UtilsGame.Now();
        this.my_applies = undefined;
        this.my_appliable = undefined;
    };
    /**
     * 获取加入公会剩余冷却时间
     */
    PlayerGuildInfo.prototype.getEntranceDelta = function () {
        var cdt = this.quit_t + 1000 * 60 * 60 * Template.config.GuildCd;
        return cdt - UtilsGame.Now();
    };
    // endregion
    // region 公会搜索
    PlayerGuildInfo.prototype.updateSearch = function (guilds) {
        if (!guilds) {
            return;
        }
        this.my_search = guilds;
    };
    // endregion
    // region 公会战排行
    PlayerGuildInfo.prototype.updateWarRank = function (guilds) {
        if (!guilds) {
            return;
        }
        this.war_list = guilds;
    };
    PlayerGuildInfo.prototype.getMyGuildWarRank = function () {
        var guild_id = this.gd_id;
        if (!guild_id || guild_id == "" || !this.war_list) {
            return 0;
        }
        for (var i = 0; i < this.war_list.length; i++) {
            if (this.war_list[i].id == guild_id) {
                return i + 1;
            }
        }
        return 0;
    };
    return PlayerGuildInfo;
}());
__reflect(PlayerGuildInfo.prototype, "PlayerGuildInfo");
//# sourceMappingURL=PlayerGuildInfo.js.map