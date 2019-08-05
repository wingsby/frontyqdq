var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildUtil = (function () {
    function GuildUtil() {
    }
    /**
     * 检查工会名合法性
     * @param name
     */
    GuildUtil.validateGuildName = function (name, with_info) {
        // 公会名不能为空
        if (!name || name == "") {
            if (with_info) {
                Singleton.Get(DialogControler).showInfo(1150);
            }
            return false;
        }
        // 公会名字数长度在1-8之间
        var len_name = name.length;
        if (len_name < 1 || len_name > 8) {
            if (with_info) {
                Singleton.Get(DialogControler).showInfo(1154);
            }
            return false;
        }
        // 公会名敏感词检查
        if (UtilsGame.containsFilter(name)) {
            if (with_info) {
                Singleton.Get(DialogControler).showInfo(1151);
            }
            return false;
        }
        return true;
    };
    /**
     * 检查创建公会资格 并验证公会名称
     */
    GuildUtil.validateGuildCreate = function (name, with_info) {
        if (with_info === void 0) { with_info = false; }
        // 创建者VIP是否达到要求
        var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
        var need_vip = Template.config.GuildVip;
        if (need_vip > my_vip) {
            if (with_info) {
                Singleton.Get(DialogControler).showInfo(1152, function () {
                    Singleton.Get(LayerManager).getView(ui.VipView).open();
                });
            }
            return false;
        }
        // 公会名称是否合法
        if (!GuildUtil.validateGuildName(name, with_info)) {
            return false;
        }
        // 是否已加入公会
        var has_guild = Singleton.Get(GuildManager).getInfo().hasGuild();
        if (has_guild) {
            if (with_info) {
                Singleton.Get(DialogControler).showInfo(1153);
            }
            return false;
        }
        // 判断钻石是否足够
        var cost_diamond = Template.config.GuildCreate;
        var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
        if (cost_diamond > my_diamond) {
            if (with_info) {
                Singleton.Get(DialogControler).showInfo(1005, this, function () {
                    Singleton.Get(LayerManager).getView(ui.PayView).open();
                });
            }
            return false;
        }
        return true;
    };
    /**
     * 根据等级获取公会最大成员数
     */
    GuildUtil.getGuildMaxMember = function (lv) {
        var cfg_guild = Template.guild.get(lv);
        if (!cfg_guild) {
            return 0;
        }
        return cfg_guild.GuildPeople;
    };
    /**
     * 根据等级获取公会下级所需经验
     */
    GuildUtil.getGuildNextExp = function (lv) {
        var cfg_guild = Template.guild.get(lv);
        if (!cfg_guild) {
            return 0;
        }
        return cfg_guild.GuildExp;
    };
    // region 公会科技
    /**
     * 计算公会科技属性加成数值
     */
    GuildUtil.getTechAttr = function (tech_id, lv) {
        if (lv <= 0) {
            return 0;
        }
        var cfg_tech = Template.tech.get(tech_id);
        if (!cfg_tech) {
            console.error("no tech: " + tech_id);
            return 0;
        }
        return cfg_tech.TechValue[0] + (lv - 1) * cfg_tech.TechUp[0];
    };
    /**
     * 获取公会科技最大等级
     */
    GuildUtil.getTechMaxLv = function (tech_id) {
        var cfg_tech = Template.tech.get(tech_id);
        if (!cfg_tech) {
            console.error("no tech: " + tech_id);
            return 0;
        }
        var cfg_tup = Template.techUp.get(cfg_tech.LvMax);
        if (!cfg_tup) {
            console.error("no techup: " + cfg_tech.LvMax);
            return 0;
        }
        return cfg_tup.TechLvUp;
    };
    return GuildUtil;
}());
__reflect(GuildUtil.prototype, "GuildUtil");
//# sourceMappingURL=GuildUtil.js.map