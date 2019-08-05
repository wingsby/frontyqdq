var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildWarLogBattleSwitcher = (function () {
    function GuildWarLogBattleSwitcher() {
        this.type = battle.E_BATTLE_TYPE.GUILD_LOG;
        this.cb_list = new Dictionary();
        this.cb_list.add(battle.E_BATTLE_TYPE.PVE, this.toPve);
        Singleton.Get(battle.BattleStateGateway).regSwitcher(this);
    }
    GuildWarLogBattleSwitcher.prototype.toPve = function () {
        // 切换关卡背景
        var cur_level = Singleton.Get(PveManager).getCurLevel();
        Singleton.Get(battle.RenderManager).setSceneByLevel(cur_level);
        // 切换界面状态
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).show();
        layer.getView(ui.MainView).onClick_btnCastle(undefined);
        layer.getView(ui.MainView).closeBattlePanel();
        layer.getView(ui.MainView).showSchoolSubPanel();
        layer.getView(ui.SchoolView).close();
        layer.getView(ui.BattleView).showPveMode();
        GuildWarViewHandler.closeBattle();
        GuildWarViewHandler.openList();
        // 播放背景音乐
        Singleton.Get(MusicManager).play(MUSICTYPE.MT_INGAME);
        // 将战斗切换至关卡
        Singleton.Get(PveManager).actBattlePve(true);
    };
    return GuildWarLogBattleSwitcher;
}());
__reflect(GuildWarLogBattleSwitcher.prototype, "GuildWarLogBattleSwitcher", ["battle.IBattleSwitcher"]);
//# sourceMappingURL=GuildWarLogBattleSwitcher.js.map