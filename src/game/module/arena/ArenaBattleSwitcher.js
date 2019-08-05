var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArenaBattleSwitcher = (function () {
    function ArenaBattleSwitcher() {
        this.type = battle.E_BATTLE_TYPE.ARENA;
        this.cb_list = new Dictionary();
        this.cb_list.add(battle.E_BATTLE_TYPE.PVE, this.toPve);
        Singleton.Get(battle.BattleStateGateway).regSwitcher(this);
    }
    ArenaBattleSwitcher.prototype.toPve = function () {
        var cur_level = Singleton.Get(PveManager).getCurLevel();
        Singleton.Get(battle.RenderManager).setSceneByLevel(cur_level);
        Singleton.Get(LayerManager).getView(ui.MainView).show();
        Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnCastle(undefined);
        Singleton.Get(LayerManager).getView(ui.MainView).closeBattlePanel();
        Singleton.Get(LayerManager).getView(ui.BattleView).showPveMode();
        Singleton.Get(LayerManager).getView(ui.ArenaBaseView).open();
        Singleton.Get(LayerManager).getView(ui.ArenaBaseView).openEnemyListPanel();
        Singleton.Get(LayerManager).getView(ui.ArenaBattleView).close();
        // 播放背景音乐
        Singleton.Get(MusicManager).play(MUSICTYPE.MT_INGAME);
        Singleton.Get(PveManager).actBattlePve(true);
    };
    return ArenaBattleSwitcher;
}());
__reflect(ArenaBattleSwitcher.prototype, "ArenaBattleSwitcher", ["battle.IBattleSwitcher"]);
//# sourceMappingURL=ArenaBattleSwitcher.js.map