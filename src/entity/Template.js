var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Template = (function () {
    function Template() {
    }
    Object.defineProperty(Template, "payItem", {
        /**充值道具表 */
        get: function () {
            return Singleton.Get(login.LoginDataManager).loginData.shops;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取字典表字段
     * @param wordId
     */
    Template.getGUIText = function (wordId) {
        /// 策划表中引用到-1的字典，直接返回空字符串
        if (wordId == "-1") {
            return "";
        }
        // 读取文字信息
        var str = Template.wordConfig.get(wordId);
        if (!str) {
            console.error("Fetch wordconfig failed with wrong id: " + wordId);
            return wordId;
        }
        return str.word_cn;
    };
    Template.getNetworkJsonCfg = function (finish, thisObj) {
        RES.getResByUrl("http://" + HttpClient.httpId + ":" + HttpClient.httpPort + "/json.z", finish, thisObj);
    };
    return Template;
}());
/**角色表 */
Template.role = new Dictionary();
/**阵容推荐表 */
Template.lineup = new Dictionary();
/**buff表 */
Template.buff = new Dictionary();
/**技能表 */
Template.skill = new Dictionary();
/**关卡表 */
Template.level = new Dictionary();
/**字典表 */
Template.wordConfig = new Dictionary();
/**弹出信息表 */
Template.info = new Dictionary();
/**随机名字表 */
Template.randName = new Dictionary();
/**等级表 */
Template.grade = new Dictionary();
/**场景表 */
Template.scene = new Dictionary();
/**道具表 */
Template.item = new Dictionary();
/**奖励表 */
Template.award = new Dictionary();
/**装备表 */
Template.equip = new Dictionary();
/**VIP表 */
Template.vip = new Dictionary();
/**Prize表 */
Template.prize = new Dictionary();
/**角色突破表 */
Template.breach = new Dictionary();
/**角色资质表 */
Template.talent = new Dictionary();
/**角色觉醒表 */
Template.awaken = new Dictionary();
/**角色羁绊表 */
Template.bond = new Dictionary();
/**副将表 */
Template.backup = new Dictionary();
/**副本表 */
Template.instance = new Dictionary();
/**副本类型表 */
Template.fbtype = new Dictionary();
/**门票表 */
Template.scroll = new Dictionary();
/**抽卡表 */
Template.card = new Dictionary();
/**装备养成表 */
Template.equipup = new Dictionary();
/**装备套装表 */
Template.suit = new Dictionary();
/**机器人表 */
Template.robot = new Dictionary();
/**竞技场奖励表 */
Template.rankaward = new Dictionary();
/**竞技场表 */
Template.arena = new Dictionary();
/**商店表 */
Template.shop = new Dictionary();
/**商铺表 */
Template.itemshop = new Dictionary();
/**商品表 */
Template.itemgood = new Dictionary();
/**邮件表 */
Template.mail = new Dictionary();
/**一骑当千 配置表 */
Template.duel = undefined;
/**一骑当千 胜利次表 */
Template.katsuji = new Dictionary();
/**一骑当千 功勋奖励表 */
Template.maward = new Dictionary();
/**一骑当千 胜利奖励表 */
Template.victory = new Dictionary();
/**一骑当千 胜利奖励表 */
Template.dailyTask = new Dictionary();
/**一骑当千 胜利奖励表 */
Template.taskLv = new Dictionary();
/**一骑当千 胜利奖励表 */
Template.taskLvReward = new Dictionary();
/**一骑当千 胜利奖励表 */
Template.taskNpc = new Dictionary();
/**任务表 */
Template.task = new Dictionary();
/**新手引导表 */
Template.guide = new Dictionary();
/**功能开启表 */
Template.open = new Dictionary();
/**月卡终生卡表 */
Template.monthcard = new Dictionary();
/**装备附魔表 */
Template.enchant = new Dictionary();
/**活动简介表 */
Template.activity = new Dictionary();
/**活动表 */
Template.basicActivity = new Dictionary();
/**开服活动表 */
Template.beginActivity = new Dictionary();
/**试炼塔表 */
Template.tower = new Dictionary();
/**试炼塔首通奖励表 */
Template.towerAward = new Dictionary();
/**活动累计充值表 */
Template.accumulation = new Dictionary();
/**活动登入奖励表 */
Template.draward = new Dictionary();
/**活动等级排行表 */
Template.hdRankingLv = new Dictionary();
/**活动关卡排行表 */
Template.hdRankStage = new Dictionary();
/**活动等级成长奖励表 */
Template.lvGrow = new Dictionary();
/**活动关卡成长奖励表 */
Template.gkGrow = new Dictionary();
/**活动成长基金表 */
Template.invest = new Dictionary();
/**活动签到表 */
Template.registration = new Dictionary();
/**活动签到累计表 */
Template.aggregate = new Dictionary();
/**活动超值礼包表 */
Template.gift = new Dictionary();
/**活动超值礼包表 */
Template.consume = new Dictionary();
/**活动日充值表 */
Template.dayPay = new Dictionary();
/**活动幸运转盘表 */
Template.turnplate = new Dictionary();
/**活动在线奖励表 */
Template.duration = new Dictionary();
/**活动在线奖励表 */
Template.lvgift = new Dictionary();
/**活动一元夺宝表 */
Template.diamondPlate = new Dictionary();
/**活动EX角色表 */
Template.exRole = new Dictionary();
/**伤害统计奖励表 */
Template.damageReward = new Dictionary();
/**许愿等级表 */
Template.wish = new Dictionary();
/**剧情对话表 */
Template.dialogue = new Dictionary();
/**SPA表 */
Template.spay = new Dictionary();
/**公会配置表 */
Template.guild = new Dictionary();
/**挂载服务器索引表 */
Template.hubmap = new Dictionary();
/**公会战排行表 */
Template.warRank = new Dictionary();
/**饰品配置表 */
Template.jewelry = new Dictionary();
/**饰品提升配置表 */
Template.jewelryUp = new Dictionary();
/**邀请配置表 */
Template.invite = new Dictionary();
/**个人BOSS配置表 */
Template.singleBoss = new Dictionary();
/**全服BOSS配置表 */
Template.fullBoss = new Dictionary();
/**Vip礼包活动表 */
Template.vipGift = new Dictionary();
/**Vip福利活动表 */
Template.vipBonus = new Dictionary();
/**Vip特殊投资计划表 */
Template.investVip = new Dictionary();
/**公会科技配置表 */
Template.tech = new Dictionary();
/**公会科技升级配置表 */
Template.techUp = new Dictionary();
/**物品合成配置表 */
Template.craft = new Dictionary();
/**斗士外派配置表 */
Template.send = new Dictionary();
/**物品合成配置表 */
Template.iconBtn = new Dictionary();
__reflect(Template.prototype, "Template");
//# sourceMappingURL=Template.js.map