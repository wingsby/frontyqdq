var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildWarInfo = (function () {
    function GuildWarInfo() {
        this.status = E_GUILD_WAR_STATUS.NOT_OPEN;
        this.match_type = E_GUILD_WAR_MATCH_TYPE.IN_SERVER;
        this.g_info = undefined;
        this.last_update = 0;
        this.my_score = 0;
        this.ene_score = 0;
        this.my_seed = 0;
        this.my_players = [];
        this.ene_seed = 0;
        this.ene_players = [];
        this.ext_players = [];
        this.my_csd = 0;
        this.last_csd = 0;
        this.player_logs = new Dictionary();
        // this.prepareTestData(); // 预备测试假数据
    }
    GuildWarInfo.prototype.updateInfo = function (rec) {
        this.status = rec.status;
        this.match_type = rec.match_type;
        this.g_info = rec.g_info;
        if (!this.g_info) {
            this.g_info = new msg.GuildSoloMsg();
        }
        this.last_update = UtilsGame.Now();
    };
    GuildWarInfo.prototype.updateScore = function (rec) {
        this.my_score = rec.my_score;
        this.ene_score = rec.ene_score;
    };
    GuildWarInfo.prototype.updateMyPlayers = function (rec) {
        if (!rec.seed || !rec.players) {
            return;
        }
        this.my_seed = rec.seed;
        this.my_players = [];
        for (var i = 0; i < rec.players.length; i++) {
            this.my_players.push(this.processPlayer(rec.players[i]));
        }
    };
    GuildWarInfo.prototype.updateEnePlayers = function (rec) {
        if (!rec.seed || !rec.players) {
            return;
        }
        this.ene_seed = rec.seed;
        this.ene_players = [];
        for (var i = 0; i < rec.players.length; i++) {
            this.ene_players.push(this.processPlayer(rec.players[i]));
        }
    };
    GuildWarInfo.prototype.updateCsd = function (rec) {
        this.my_csd = rec.csd;
        this.last_csd = rec.last_csd;
    };
    GuildWarInfo.prototype.processPlayer = function (player) {
        if (!player.username) {
            player.username = "";
        }
        if (!player.tries) {
            player.tries = 0;
        }
        if (!player.star_gain) {
            player.star_gain = 0;
        }
        if (!player.star_lost) {
            player.star_lost = 0;
        }
        if (!player.star_gain) {
            player.star_gain = 0;
        }
        return player;
    };
    /**
     * 公会战是否开启
     */
    GuildWarInfo.prototype.isWarOpen = function () {
        return this.status == E_GUILD_WAR_STATUS.OPEN && this.g_info != undefined && this.g_info.id != "";
    };
    /**
     * 检查公会战状态是否还有效
     * （上次状态检查时间是否跨过特殊时间点）
     */
    GuildWarInfo.prototype.isStatusValid = function () {
        var now = UtilsGame.Now();
        var start = GuildWarUtil.getStartTime();
        var end = GuildWarUtil.getEndTime();
        if (this.last_update < UtilsGame.TodayStart()) {
            return false;
        }
        else if (this.last_update < start) {
            if (now >= start) {
                return false;
            }
        }
        else if (this.last_update >= start && this.last_update < end) {
            if (now >= end) {
                return false;
            }
        }
        return true;
    };
    // region 玩家信息
    /**
     * 通过uid来获取玩家信息
     */
    GuildWarInfo.prototype.getPlayerByUid = function (uid) {
        for (var i = 0; i < this.ext_players.length; i++) {
            if (this.ext_players[i].uid == uid) {
                return this.ext_players[i];
            }
        }
        for (var i = 0; i < this.ene_players.length; i++) {
            if (this.ene_players[i].uid == uid) {
                return this.ene_players[i];
            }
        }
        for (var i = 0; i < this.my_players.length; i++) {
            if (this.my_players[i].uid == uid) {
                return this.my_players[i];
            }
        }
        return undefined;
    };
    /**
     * 通过uid获取所有该玩家相关的公会战Player信息
     */
    GuildWarInfo.prototype.getPlayersByUid = function (uid) {
        var result = [];
        for (var i = 0; i < this.ext_players.length; i++) {
            if (this.ext_players[i].uid == uid) {
                result.push(this.ext_players[i]);
            }
        }
        for (var i = 0; i < this.ene_players.length; i++) {
            if (this.ene_players[i].uid == uid) {
                result.push(this.ene_players[i]);
            }
        }
        for (var i = 0; i < this.my_players.length; i++) {
            if (this.my_players[i].uid == uid) {
                result.push(this.my_players[i]);
            }
        }
        return result;
    };
    /**
     * uid是否是敌人
     */
    GuildWarInfo.prototype.getUidIsEnemy = function (uid) {
        for (var i = 0; i < this.ene_players.length; i++) {
            if (this.ene_players[i].uid == uid) {
                return true;
            }
        }
        return false;
    };
    /**
     * 获取我方战士uid列表
     */
    GuildWarInfo.prototype.getMyWarriorList = function (offset, count) {
        var result = [];
        for (var i = 0; i < this.my_players.length; i++) {
            result.push(this.my_players[i].uid);
        }
        var r = this.sortBySeed(this.my_seed, result);
        return r.slice(offset, offset + count);
    };
    /**
     * 获取敌方战士uid列表
     */
    GuildWarInfo.prototype.getEneWarriorList = function (offset, count) {
        var result = [];
        for (var i = 0; i < this.ene_players.length; i++) {
            result.push(this.ene_players[i].uid);
        }
        var r = this.sortBySeed(this.my_seed, result);
        return r.slice(offset, offset + count);
    };
    /**
     * 根据种子排序
     */
    GuildWarInfo.prototype.sortBySeed = function (seed, source) {
        if (!seed || !source) {
            console.error("sortBySeed() incorrect seed or source");
            return;
        }
        // 预先按uid排序一遍 避免服务器下发的顺序有变
        source.sort(function (a, b) {
            if (a != b) {
                if (parseInt(a) > parseInt(b)) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            return 0;
        });
        // 生成排序用的权重值
        var weights = {}; // 权重索引
        for (var i = 0; i < source.length; i++) {
            var s = (seed * (i + 1)).toString();
            var t = parseInt((parseInt(s.charAt(3)) + s.charCodeAt(5)) + s.charAt(7));
            weights[source[i]] = t;
        }
        // 根据权重排序
        var result = UtilsArray.duplicate(source);
        result.sort(function (a, b) {
            var t_a = weights[a];
            var t_b = weights[b];
            if (t_a != t_b) {
                if (t_a > t_b) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            return 0;
        });
        return result;
    };
    /**
     * 增加一个详细的玩家信息
     */
    GuildWarInfo.prototype.addExtPlayer = function (uid, player) {
        if (!player) {
            return;
        }
        // console.log("增加一个详细的玩家信息 addExtPlayer(), uid: " + uid + ", player: " + player.username);
        for (var i = 0; i < this.ext_players.length; i++) {
            // console.log("查到玩家 " + this.ext_players[i].username + "[" + this.ext_players[i].uid + "]" + ((this.ext_players[i].uid == player.uid) ? "匹配" : "不匹配"));
            if (this.ext_players[i].uid == uid) {
                // console.log("替换匹配到的玩家 " + this.ext_players[i].username + "[" + this.ext_players[i].uid + "]");
                this.ext_players[i] = this.processPlayer(player);
                return;
            }
        }
        // console.log("没有找到玩家 写入新玩家 [" + player.uid + "] => [" + uid + "]");
        player.uid = uid;
        this.ext_players.push(this.processPlayer(player));
    };
    // endregion
    // region 挑战次数
    /**
     * 获取今日已挑战次数
     */
    GuildWarInfo.prototype.getCurCsd = function () {
        if (UtilsGame.isRToday(this.last_csd)) {
            return this.my_csd;
        }
        else {
            return 0;
        }
    };
    /**
     * 增加一次今日已挑战次数
     */
    GuildWarInfo.prototype.addCsd = function () {
        if (UtilsGame.isRToday(this.last_csd)) {
            this.my_csd += 1;
        }
        else {
            this.last_csd = UtilsGame.Now();
            this.my_csd = 1;
        }
    };
    // endregion
    // region 战报数据
    /**
     * 更新一条战报
     */
    GuildWarInfo.prototype.updateLog = function (uid, rec) {
        if (!rec) {
            return;
        }
        this.player_logs.update(uid, rec);
    };
    /**
     * 获取一个玩家的所有战报
     */
    GuildWarInfo.prototype.getLogsByUid = function (uid) {
        // console.log("获取战报：" + uid);
        console.log(this.player_logs);
        return this.player_logs.get(uid);
    };
    /**
     * 根据战报id获取一条战报数据
     */
    GuildWarInfo.prototype.getLogById = function (log_id) {
        var p_logs = this.player_logs.values;
        for (var i = 0; i < p_logs.length; i++) {
            var one_logs = p_logs[i];
            for (var j = 0; j < one_logs.length; j++) {
                if (one_logs[j].id == log_id) {
                    return one_logs[j];
                }
            }
        }
        return undefined;
    };
    // endregion
    // region 积分更新
    /**
     * 记录某人又失去了星星
     */
    GuildWarInfo.prototype.setLoseStar = function (uid, star) {
        var loser = this.getPlayersByUid(uid);
        for (var i = 0; i < loser.length; i++) {
            loser[i].star_lost += star;
        }
    };
    /**
     * 记录某人又获得了星星
     */
    GuildWarInfo.prototype.setGetStar = function (uid, star) {
        var winner = this.getPlayersByUid(uid);
        for (var i = 0; i < winner.length; i++) {
            winner[i].star_gain += star;
        }
    };
    // endregion
    /**
     * 准备测试用的假数据
     */
    GuildWarInfo.prototype.prepareTestData = function () {
        this.status = E_GUILD_WAR_STATUS.OPEN;
        this.match_type = E_GUILD_WAR_MATCH_TYPE.IN_SERVER;
        this.g_info = new msg.GuildSoloMsg();
        this.g_info.name = LoginManager.getRandomName() + "公会";
        this.g_info.rank = 8;
        this.g_info.id = UtilsGame.getRandomInt(10000000, 99999999).toString();
        this.g_info.guild_lv = 3;
        this.g_info.cnt_member = 11;
        this.g_info.zid = 1;
        this.g_info.fighting = UtilsGame.getRandomInt(300000, 500000);
        this.g_info.score = 480;
        this.g_info.chairman_uid = UtilsGame.getRandomInt(10000000, 99999999).toString();
        this.g_info.chairman_name = LoginManager.getRandomName();
        this.last_update = UtilsGame.Now();
        this.my_score = 102;
        this.ene_score = 96;
        this.my_seed = UtilsGame.getRandomInt(10000000, 99999999);
        this.ene_seed = UtilsGame.getRandomInt(10000000, 99999999);
        this.my_csd = 0;
        this.last_csd = UtilsGame.Now();
        var my_players_uid = [];
        for (var i = 0; i < 13; i++) {
            my_players_uid.push(UtilsGame.getRandomInt(10000000, 99999999).toString());
        }
        var ene_players_uid = [];
        for (var i = 0; i < 13; i++) {
            ene_players_uid.push(UtilsGame.getRandomInt(10000000, 99999999).toString());
        }
        this.my_players = [];
        for (var i = 0; i < 13; i++) {
            var p = new msg.GuildWarPlayerMsg();
            p.uid = my_players_uid[i];
            p.vip = UtilsGame.getRandomInt(1, 5) != 5 ? UtilsGame.getRandomInt(1, 5) : 0;
            p.avatar = Singleton.Get(LoginManager).loginInfo.icon_url;
            p.username = LoginManager.getRandomName();
            p.team_lv = UtilsGame.getRandomInt(52, 60);
            p.fighting = UtilsGame.getRandomInt(30000, 50000);
            p.star_lost = UtilsGame.getRandomInt(0, 5);
            p.star_gain = UtilsGame.getRandomInt(0, 15);
            p.tries = UtilsGame.getRandomInt(0, 3);
            var p_logs = [];
            var p_log_count = UtilsGame.getRandomInt(0, 8);
            for (var j = 0; j < p_log_count; j++) {
                var log = new msg.GuildWarLogMsg();
                log.id = UtilsGame.getRandomInt(10000000, 99999999).toString();
                log.result = UtilsGame.getRandomInt(0, 1);
                log.is_atk = UtilsGame.getRandomInt(0, 1) == 0;
                if (log.is_atk) {
                    log.atk_uid = p.uid;
                    log.atk_name = p.username;
                    log.def_uid = ene_players_uid[UtilsGame.getRandomInt(0, ene_players_uid.length - 1)];
                    log.def_name = "";
                }
                else {
                    log.atk_uid = ene_players_uid[UtilsGame.getRandomInt(0, ene_players_uid.length - 1)];
                    log.atk_name = "";
                    log.def_uid = p.uid;
                    log.def_name = p.username;
                }
                log.star = UtilsGame.getRandomInt(0, 3);
                p_logs.push(log);
            }
            this.updateLog(p.uid, p_logs);
            this.my_players.push(p);
        }
        this.ene_players = [];
        for (var i = 0; i < 18; i++) {
            var p = new msg.GuildWarPlayerMsg();
            var is_hide = UtilsGame.getRandomInt(1, 2) == 1;
            p.uid = ene_players_uid[i];
            p.vip = is_hide ? 0 : UtilsGame.getRandomInt(1, 5) != 5 ? UtilsGame.getRandomInt(1, 5) : 0;
            p.avatar = is_hide ? "" : Singleton.Get(LoginManager).loginInfo.icon_url;
            p.username = is_hide ? "" : LoginManager.getRandomName();
            p.team_lv = is_hide ? 0 : UtilsGame.getRandomInt(20, 30);
            p.fighting = is_hide ? 0 : UtilsGame.getRandomInt(10000, 30000);
            p.star_lost = UtilsGame.getRandomInt(0, 5);
            p.star_gain = UtilsGame.getRandomInt(0, 15);
            p.tries = UtilsGame.getRandomInt(0, 3);
            var p_logs = [];
            var p_log_count = UtilsGame.getRandomInt(0, 8);
            for (var j = 0; j < p_log_count; j++) {
                var log = new msg.GuildWarLogMsg();
                log.id = UtilsGame.getRandomInt(10000000, 99999999).toString();
                log.result = UtilsGame.getRandomInt(0, 1);
                log.is_atk = UtilsGame.getRandomInt(0, 1) == 0;
                if (log.is_atk) {
                    log.atk_uid = p.uid;
                    log.atk_name = p.username;
                    log.def_uid = my_players_uid[UtilsGame.getRandomInt(0, my_players_uid.length - 1)];
                    log.def_name = "";
                }
                else {
                    log.atk_uid = my_players_uid[UtilsGame.getRandomInt(0, my_players_uid.length - 1)];
                    log.atk_name = "";
                    log.def_uid = p.uid;
                    log.def_name = p.username;
                }
                log.star = UtilsGame.getRandomInt(0, 3);
                p_logs.push(log);
            }
            this.updateLog(p.uid, p_logs);
            this.ene_players.push(p);
        }
    };
    return GuildWarInfo;
}());
__reflect(GuildWarInfo.prototype, "GuildWarInfo");
//# sourceMappingURL=GuildWarInfo.js.map