var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildWarViewHandler = (function () {
    function GuildWarViewHandler() {
    }
    GuildWarViewHandler.openGuildWar = function () {
        Singleton.Get(LayerManager).getView(ui.GuildWarView).open();
    };
    GuildWarViewHandler.closeGuildWar = function () {
        Singleton.Get(LayerManager).getView(ui.GuildWarView).close();
        Singleton.Get(LayerManager).getView(ui.GuildWarListView).close();
        Singleton.Get(LayerManager).getView(ui.GuildWarPlayerView).close();
    };
    GuildWarViewHandler.backToGuild = function () {
        Singleton.Get(LayerManager).getView(ui.GuildView).open();
    };
    GuildWarViewHandler.openRule = function () {
        Singleton.Get(LayerManager).getView(ui.GuildWarRuleView).open();
    };
    GuildWarViewHandler.openList = function () {
        Singleton.Get(LayerManager).getView(ui.GuildWarListView).open();
    };
    GuildWarViewHandler.openPlayer = function (is_enemy, uid) {
        Singleton.Get(LayerManager).getView(ui.GuildWarPlayerView).open(is_enemy, uid);
    };
    GuildWarViewHandler.openRewardPanel = function () {
        Singleton.Get(LayerManager).getView(ui.GuildWarRewardView).open();
    };
    GuildWarViewHandler.openResultPanel = function (is_win, star, my_dead, item_count) {
        Singleton.Get(LayerManager).getView(ui.GuildWarResultView).open();
        Singleton.Get(LayerManager).getView(ui.GuildWarResultView).initView(is_win, star, my_dead, item_count);
    };
    GuildWarViewHandler.openRankPanel = function () {
        Singleton.Get(LayerManager).getView(ui.GuildWarRankView).open();
    };
    GuildWarViewHandler.openBattle = function (enemy_uid) {
        // 查找敌人个人信息
        var inf_u = Singleton.Get(GuildWarManager).getInfo().getPlayerByUid(enemy_uid);
        if (!inf_u) {
            console.error("no inf_u, uid: " + enemy_uid);
            return;
        }
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).hide();
        layer.getView(ui.MainView).showBattlePanel();
        layer.getView(ui.BattleView).showArenaMode();
        layer.getView(ui.ArenaBattleView).open();
        layer.getView(ui.ArenaBattleView).initContentDirect(inf_u.username, inf_u.avatar, battle.BattleType.GUILD);
        Singleton.Get(PveManager).cleanRewardHash();
    };
    GuildWarViewHandler.openBattleLog = function (my_name, my_avatar, ene_name, ene_avatar) {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).hide();
        layer.getView(ui.MainView).showBattlePanel();
        layer.getView(ui.BattleView).showArenaMode();
        layer.getView(ui.ArenaBattleView).open();
        layer.getView(ui.ArenaBattleView).initContentNoPlayer(battle.BattleType.GUILD, my_name, my_avatar, ene_name, ene_avatar);
        Singleton.Get(PveManager).cleanRewardHash();
    };
    GuildWarViewHandler.closeBattle = function () {
        Singleton.Get(LayerManager).getView(ui.ArenaBattleView).close();
    };
    GuildWarViewHandler.setGuildChatNew = function (is_new) {
        Singleton.Get(LayerManager).getView(ui.GuildWarListView).setChatNew(is_new);
    };
    return GuildWarViewHandler;
}());
__reflect(GuildWarViewHandler.prototype, "GuildWarViewHandler");
//# sourceMappingURL=GuildWarViewHandler.js.map