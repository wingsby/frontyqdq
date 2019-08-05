var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AnalyzeConfig = (function () {
    function AnalyzeConfig() {
    }
    // 读取客户端本地配置
    AnalyzeConfig.prototype.initConfig = function () {
        /*Template.config = ResManager.getResSync("config_json");
        this.analyGenericConfig(Template.role, "role_json");
        this.analyGenericConfig(Template.buff, "buff_json");
        this.analyGenericConfig(Template.skill, "skill_json");
        this.analyGenericConfig(Template.level, "level_json");
        this.analyGenericConfig(Template.wordConfig, "wordconfig_json");
        this.analyGenericConfig(Template.info, "info_json");
        this.analyGenericConfig(Template.randName, "name_json", "Surname");
        this.analyGenericConfig(Template.grade, "grade_json", "Level");
        this.analyGenericConfig(Template.scene, "scene_json");
        this.analyGenericConfig(Template.item, "item_json");
        this.analyGenericConfig(Template.award, "award_json");
        this.analyGenericConfig(Template.equip, "equip_json");
        this.analyGenericConfig(Template.vip, "vip_json");
        this.analyGenericConfig(Template.prize, "prize_json");
        this.analyGenericConfig(Template.talent, "talent_json", "TalentID");
        this.analyGenericConfig(Template.awaken, "awaken_json", "AwakenID");
        this.analyGenericConfig(Template.bond, "bond_json", "BondID");
        this.analyGenericConfig(Template.breach, "breach_json", "BreachID");
        this.analyGenericConfig(Template.instance, "instance_json");
        this.analyGenericConfig(Template.fbtype, "fbtype_json");
        this.analyGenericConfig(Template.scroll, "scroll_json");
        this.analyGenericConfig(Template.backup, "backup_json", "BackupID");
        this.analyGenericConfig(Template.card, "card_json", "CardId");
        this.analyGenericConfig(Template.equipup, "equipup_json", "Level");
        this.analyGenericConfig(Template.suit, "suit_json", "SuitID");
        this.analyGenericConfig(Template.robot, "robot_json", "Id");
        this.analyGenericConfig(Template.rankaward, "rankaward_json");
        this.analyGenericConfig(Template.arena, "arena_json", "id");
        this.analyGenericConfig(Template.shop, "shop_json", "Id");
        this.analyGenericConfig(Template.itemshop, "itemshop_json", "Booth");
        this.analyGenericConfig(Template.itemgood, "itemgood_json", "Id");
        this.analyGenericConfig(Template.mail, "mail_json", "mID");*/
        ///销毁单例
        Singleton.Destroy(AnalyzeConfig);
    };
    /**
     * 解析json
     * @param hashMap
     * @param confName
     * @param key
     */
    AnalyzeConfig.prototype.analyGenericConfig = function (hashMap, confName, key) {
        if (key === void 0) { key = "ID"; }
        hashMap.clear();
        var confs = ResManager.getResSync(confName);
        if (confs != undefined) {
            var len = confs.length;
            for (var i = 0; i < len; ++i) {
                var temp = confs[i];
                hashMap.add(temp[key], temp);
            }
        }
    };
    // 读取服务器下发的zip配置
    AnalyzeConfig.prototype.initConfigByZip = function (data) {
        this.jsonzip = new JSZip(data);
        Template.filter = this.jsonzip.file("fitlerwords.txt").asText();
        Template.config = this.transToJsonObj("config.json");
        this.analyGenericConfigByZip(Template.role, "role.json");
        this.analyGenericConfigByZip(Template.lineup, "lineup.json");
        this.analyGenericConfigByZip(Template.buff, "buff.json");
        this.analyGenericConfigByZip(Template.skill, "skill.json");
        this.analyGenericConfigByZip(Template.level, "level.json");
        this.analyGenericConfigByZip(Template.wordConfig, "wordconfig.json");
        this.analyGenericConfigByZip(Template.info, "info.json");
        this.analyGenericConfigByZip(Template.randName, "name.json", "Surname");
        this.analyGenericConfigByZip(Template.grade, "grade.json", "Level");
        this.analyGenericConfigByZip(Template.scene, "scene.json");
        this.analyGenericConfigByZip(Template.item, "item.json");
        this.analyGenericConfigByZip(Template.award, "award.json");
        this.analyGenericConfigByZip(Template.equip, "equip.json");
        this.analyGenericConfigByZip(Template.vip, "vip.json");
        this.analyGenericConfigByZip(Template.prize, "prize.json");
        this.analyGenericConfigByZip(Template.talent, "talent.json", "TalentID");
        this.analyGenericConfigByZip(Template.awaken, "awaken.json", "AwakenID");
        this.analyGenericConfigByZip(Template.bond, "bond.json", "BondID");
        this.analyGenericConfigByZip(Template.breach, "breach.json", "BreachID");
        this.analyGenericConfigByZip(Template.instance, "instance.json");
        this.analyGenericConfigByZip(Template.fbtype, "fbtype.json");
        this.analyGenericConfigByZip(Template.scroll, "scroll.json");
        this.analyGenericConfigByZip(Template.backup, "backup.json", "BackupID");
        this.analyGenericConfigByZip(Template.card, "card.json", "CardId");
        this.analyGenericConfigByZip(Template.equipup, "equipup.json", "Level");
        this.analyGenericConfigByZip(Template.suit, "suit.json", "SuitID");
        this.analyGenericConfigByZip(Template.robot, "robot.json", "Id");
        this.analyGenericConfigByZip(Template.rankaward, "rankaward.json");
        this.analyGenericConfigByZip(Template.arena, "arena.json", "id");
        this.analyGenericConfigByZip(Template.shop, "shop.json", "Id");
        this.analyGenericConfigByZip(Template.itemshop, "itemshop.json", "Booth");
        this.analyGenericConfigByZip(Template.itemgood, "itemgood.json", "Id");
        this.analyGenericConfigByZip(Template.mail, "mail.json", "mID");
        Template.duel = this.transToJsonObj("duel.json");
        this.analyGenericConfigByZip(Template.katsuji, "katsuji.json");
        this.analyGenericConfigByZip(Template.maward, "maward.json");
        this.analyGenericConfigByZip(Template.victory, "victory.json");
        this.analyGenericConfigByZip(Template.dailyTask, "dailytask.json");
        this.analyGenericConfigByZip(Template.taskLv, "tasklv.json", "Lv");
        this.analyGenericConfigByZip(Template.taskLvReward, "tasklvreward.json", "Id");
        this.analyGenericConfigByZip(Template.taskNpc, "tasknpc.json", "Id");
        this.analyGenericConfigByZip(Template.task, "task.json");
        this.analyGenericConfigByZip(Template.guide, "guide.json", "guideID");
        this.analyGenericConfigByZip(Template.open, "open.json");
        this.analyGenericConfigByZip(Template.monthcard, "monthcard.json", "id");
        this.analyGenericConfigByZip(Template.enchant, "enchant.json");
        this.analyGenericConfigByZip(Template.activity, "activity.json");
        this.analyGenericConfigByZip(Template.basicActivity, "basicactivity.json");
        this.analyGenericConfigByZip(Template.beginActivity, "beginactivity.json");
        this.analyGenericConfigByZip(Template.tower, "tower.json");
        this.analyGenericConfigByZip(Template.towerAward, "toweraward.json");
        this.analyGenericConfigByZip(Template.accumulation, "accumulation.json", "id");
        this.analyGenericConfigByZip(Template.draward, "draward.json");
        this.analyGenericConfigByZip(Template.hdRankingLv, "hdrankinglv.json", "id");
        this.analyGenericConfigByZip(Template.hdRankStage, "hdrankstage.json", "id");
        this.analyGenericConfigByZip(Template.lvGrow, "lvgrow.json");
        this.analyGenericConfigByZip(Template.gkGrow, "gkgrow.json");
        this.analyGenericConfigByZip(Template.invest, "invest.json");
        this.analyGenericConfigByZip(Template.registration, "registration.json");
        this.analyGenericConfigByZip(Template.aggregate, "aggregate.json");
        this.analyGenericConfigByZip(Template.gift, "gift.json");
        this.analyGenericConfigByZip(Template.consume, "consume.json");
        this.analyGenericConfigByZip(Template.dayPay, "daypay.json");
        this.analyGenericConfigByZip(Template.turnplate, "turnplate.json");
        this.analyGenericConfigByZip(Template.duration, "duration.json");
        this.analyGenericConfigByZip(Template.diamondPlate, "diamondplate.json");
        this.analyGenericConfigByZip(Template.damageReward, "damagereward.json", "Id");
        this.analyGenericConfigByZip(Template.wish, "wish.json", "Lv");
        Template.drama = this.transToJsonObj("drama.json");
        this.analyGenericConfigByZip(Template.dialogue, "dialogue.json");
        this.analyGenericConfigByZip(Template.lvgift, "lvgift.json");
        this.analyGenericConfigByZip(Template.spay, "spay.json");
        this.analyGenericConfigByZip(Template.guild, "guild.json", "GuildLv");
        this.analyGenericConfigByZip(Template.hubmap, "hubmap.json");
        this.analyGenericConfigByZip(Template.warRank, "warrank.json", "id");
        this.analyGenericConfigByZip(Template.jewelry, "jewelry.json");
        this.analyGenericConfigByZip(Template.jewelryUp, "jewelryup.json");
        this.analyGenericConfigByZip(Template.invite, "invite.json");
        this.analyGenericConfigByZip(Template.singleBoss, "singleboss.json");
        this.analyGenericConfigByZip(Template.fullBoss, "fullboss.json");
        this.analyGenericConfigByZip(Template.vipBonus, "vipbonus.json", "VIP");
        this.analyGenericConfigByZip(Template.vipGift, "vipgift.json");
        this.analyGenericConfigByZip(Template.investVip, "investvip.json");
        this.analyGenericConfigByZip(Template.tech, "tech.json");
        this.analyGenericConfigByZip(Template.techUp, "techup.json", "Level");
        this.analyGenericConfigByZip(Template.exRole, "exrole.json");
        this.analyGenericConfigByZip(Template.craft, "craft.json");
        this.analyGenericConfigByZip(Template.send, "send.json", "SendId");
        this.analyGenericConfigByZip(Template.iconBtn, "iconbtn.json");
        ///销毁单例
        Singleton.Destroy(AnalyzeConfig);
    };
    AnalyzeConfig.prototype.transToJsonObj = function (name) {
        // 将鼠标置于前一行的name位置，可以查看出错的配置表名称
        // 如果在这里报错 通常是配置表格式不正确或配置表不存在
        try {
            var xx = this.jsonzip.file(name).asText().replace(/\r\n/g, "");
            return JSON.parse(xx);
        }
        catch (e) {
            console.error("Configuration file [" + name + "] is out-of-date or not existed.");
            console.log(e);
        }
    };
    AnalyzeConfig.prototype.analyGenericConfigByZip = function (hashMap, filename, key) {
        if (key === void 0) { key = "ID"; }
        hashMap.clear();
        var confs = this.transToJsonObj(filename);
        if (confs != undefined) {
            var len = confs.length;
            for (var i = 0; i < len; ++i) {
                var temp = confs[i];
                var res = hashMap.add(temp[key], temp);
                if (!res) {
                    egret.warn("Duplicated key: " + temp[key] + " in " + filename);
                }
            }
        }
    };
    return AnalyzeConfig;
}());
__reflect(AnalyzeConfig.prototype, "AnalyzeConfig");
//# sourceMappingURL=AnalyzeConfig.js.map