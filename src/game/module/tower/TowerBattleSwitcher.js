var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TowerBattleSwitcher = (function () {
    function TowerBattleSwitcher() {
        this.type = battle.E_BATTLE_TYPE.TOWER;
        this.cb_list = new Dictionary();
        this.cb_list.add(battle.E_BATTLE_TYPE.PVE, this.toPve);
        Singleton.Get(battle.BattleStateGateway).regSwitcher(this);
    }
    TowerBattleSwitcher.prototype.toPve = function (callback, thisObj) {
        var cur_level = Singleton.Get(PveManager).getCurLevel();
        Singleton.Get(battle.RenderManager).setSceneByLevel(cur_level);
        Singleton.Get(LayerManager).getView(ui.InstanceBattleView).close();
        Singleton.Get(LayerManager).getView(ui.MainView).show();
        Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnCastle(undefined);
        Singleton.Get(LayerManager).getView(ui.MainView).closeBattlePanel();
        Singleton.Get(LayerManager).getView(ui.TowerView).open();
        Singleton.Get(LayerManager).getView(ui.BattleView).showPveMode();
        // 播放背景音乐
        Singleton.Get(MusicManager).play(MUSICTYPE.MT_INGAME);
        Singleton.Get(PveManager).actBattlePve(true);
        // 执行回调
        if (callback) {
            callback.call(thisObj);
        }
    };
    return TowerBattleSwitcher;
}());
__reflect(TowerBattleSwitcher.prototype, "TowerBattleSwitcher", ["battle.IBattleSwitcher"]);
//# sourceMappingURL=TowerBattleSwitcher.js.map