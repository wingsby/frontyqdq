var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var E_GUILD_PLACE;
(function (E_GUILD_PLACE) {
    E_GUILD_PLACE[E_GUILD_PLACE["NOT_MEMBER"] = 0] = "NOT_MEMBER";
    E_GUILD_PLACE[E_GUILD_PLACE["MEMBER"] = 1] = "MEMBER";
    E_GUILD_PLACE[E_GUILD_PLACE["ELITE"] = 2] = "ELITE";
    E_GUILD_PLACE[E_GUILD_PLACE["RULER"] = 3] = "RULER";
    E_GUILD_PLACE[E_GUILD_PLACE["LEADER"] = 4] = "LEADER"; // 会长
})(E_GUILD_PLACE || (E_GUILD_PLACE = {}));
var GuildInfo = (function () {
    function GuildInfo() {
        this.tech_ids = []; // 科技ID列表
        this.tech_lvs = []; // 科技对应等级列表,初始0级
        // endregion
    }
    /**
     * 更新公会数据
     */
    GuildInfo.prototype.updateData = function (rec) {
        if (!rec) {
            return;
        }
        this.id = rec.id;
        this.name = rec.name;
        this.creat_t = rec.creat_t;
        this.lv = rec.lv;
        this.exp = rec.exp;
        this.lv_t = rec.lv_t;
        this.words = rec.words;
        this.funds = rec.funds;
        this.ceo_id = rec.ceo_id;
        this.vp_ids = rec.vp_ids;
        this.tech_ids = rec.tech_ids ? rec.tech_ids : [];
        this.tech_lvs = rec.tech_lvs ? rec.tech_lvs : [];
    };
    /**
     * 更新经验值和等级
     */
    GuildInfo.prototype.updateExp = function (rec) {
        if (!rec) {
            return;
        }
        this.lv = rec.lv;
        this.exp = rec.exp;
    };
    /**
     * 检查成员列表数据是否被初始化
     */
    GuildInfo.prototype.hasMembersData = function () {
        return !!this.members;
    };
    /**
     * 更新成员列表数据
     */
    GuildInfo.prototype.updateMembers = function (rec) {
        if (!rec) {
            return;
        }
        var members = [];
        for (var i = 0; i < rec.length; i++) {
            members.push(rec[i]);
        }
        this.members = members;
    };
    /**
     * 检查入会申请数据是否被初始化
     */
    GuildInfo.prototype.hasAppliesData = function () {
        return !!this.applies;
    };
    /**
     * 检查是否有未处理的入会申请
     */
    GuildInfo.prototype.hasAnyApply = function () {
        if (this.applies) {
            return this.applies.length > 0;
        }
        return false;
    };
    /**
     * 更新入会申请数据
     */
    GuildInfo.prototype.updateApplies = function (rec) {
        if (!rec) {
            return;
        }
        var applies = [];
        for (var i = 0; i < rec.length; i++) {
            applies.push(rec[i]);
        }
        this.applies = applies;
    };
    /**
     * 移除一份申请
     */
    GuildInfo.prototype.removeApply = function (uid) {
        var applies = this.applies;
        for (var i = 0; i < this.applies.length; i++) {
            if (applies[i].uid == uid) {
                this.applies.splice(i, 1);
                return;
            }
        }
    };
    /**
     * 移除所有申请
     */
    GuildInfo.prototype.removeAllApply = function () {
        this.applies = [];
    };
    /**
     * 清空一批申请
     */
    GuildInfo.prototype.removeApplies = function (uid_list) {
        if (!this.applies) {
            return;
        }
        for (var i = 0; i < uid_list.length; i++) {
            var uid = uid_list[i];
            for (var j = 0; j < this.applies.length; j++) {
                if (this.applies[j].uid == uid) {
                    this.applies.splice(j, 1);
                    break;
                }
            }
        }
    };
    /**
     * 是否有指定uid的申请
     */
    GuildInfo.prototype.hasUidApply = function (uid) {
        if (!this.applies) {
            return false;
        }
        for (var i = 0; i < this.applies.length; i++) {
            if (this.applies[i].uid == uid) {
                return true;
            }
        }
        return false;
    };
    /**
     * 更新公会公告
     */
    GuildInfo.prototype.updateAnnounce = function (words) {
        this.words = words;
    };
    // region 公会权限
    /**
     * 获取一个成员的身份类型
     */
    GuildInfo.prototype.getMemberPlace = function (uid) {
        if (uid == this.ceo_id) {
            return E_GUILD_PLACE.LEADER;
        }
        if (this.vp_ids.indexOf(uid) >= 0) {
            return E_GUILD_PLACE.RULER;
        }
        // 暂不做非会员判断
        /**
        const members = this.members;
        for (let i = 0; i < members.length; i++) {
            if (members[i].uid == uid) {
                return E_GUILD_PLACE.MEMBER;
            }
        }

        return E_GUILD_PLACE.NOT_MEMBER;
         */
        return E_GUILD_PLACE.MEMBER;
    };
    /**
     * 获取玩家自身的身份类型
     */
    GuildInfo.prototype.getMyPlace = function () {
        return this.getMemberPlace(Singleton.Get(LoginManager).uid);
    };
    /**
     * 转让会长
     */
    GuildInfo.prototype.setLeader = function (uid) {
        if (!this.members) {
            return;
        }
        for (var i = 0; i < this.members.length; i++) {
            if (uid == this.members[i].uid) {
                this.ceo_id = uid;
                break;
            }
        }
    };
    /**
     * 设为副会长
     */
    GuildInfo.prototype.addRuler = function (uid) {
        if (this.vp_ids.indexOf(uid) < 0) {
            this.vp_ids.push(uid);
        }
    };
    /**
     * 移除副会长
     */
    GuildInfo.prototype.removeRuler = function (uid) {
        var idx = this.vp_ids.indexOf(uid);
        if (idx >= 0) {
            this.vp_ids.splice(idx, 1);
        }
    };
    /**
     * 移除会员
     */
    GuildInfo.prototype.removeMember = function (uid) {
        // 如果该成员是副会长 同时在副会长队列中移除该成员
        this.removeRuler(uid);
        if (this.members) {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].uid == uid) {
                    this.members.splice(i, 1);
                    break;
                }
            }
        }
    };
    // endregion
    // region 加入退出
    GuildInfo.prototype.onExitGuild = function () {
        this.applies = undefined;
        this.members = undefined;
    };
    // endregion
    // region 公会科技
    /**
     * 获取公会科技等级
     */
    GuildInfo.prototype.getTechLv = function (tech_id) {
        var tech_ids = this.tech_ids;
        for (var i = 0; i < tech_ids.length; i++) {
            if (tech_ids[i] == tech_id) {
                return this.tech_lvs[i];
            }
        }
        return 0;
    };
    /**
     * 提升公会科技等级1级
     */
    GuildInfo.prototype.upgradeTech = function (tech_id) {
        var tech_ids = this.tech_ids;
        for (var i = 0; i < tech_ids.length; i++) {
            if (tech_ids[i] == tech_id) {
                this.tech_lvs[i]++;
                return;
            }
        }
        this.tech_ids.push(tech_id);
        this.tech_lvs.push(1);
    };
    return GuildInfo;
}());
__reflect(GuildInfo.prototype, "GuildInfo");
//# sourceMappingURL=GuildInfo.js.map