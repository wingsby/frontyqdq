var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var InstanceBattleSwitcher = (function () {
    function InstanceBattleSwitcher() {
        this.type = battle.E_BATTLE_TYPE.INSTANCE;
        this.cb_list = new Dictionary();
        this.cb_list.add(battle.E_BATTLE_TYPE.PVE, this.toPve);
        Singleton.Get(battle.BattleStateGateway).regSwitcher(this);
    }
    InstanceBattleSwitcher.prototype.toPve = function () {
        var cur_level = Singleton.Get(PveManager).getCurLevel();
        Singleton.Get(battle.RenderManager).setSceneByLevel(cur_level);
        Singleton.Get(LayerManager).getView(ui.MainView).closeBattlePanel();
        Singleton.Get(LayerManager).getView(ui.BattleView).showPveMode();
        // 播放背景音乐
        Singleton.Get(MusicManager).play(MUSICTYPE.MT_INGAME);
        Singleton.Get(PveManager).actBattlePve(true);
    };
    return InstanceBattleSwitcher;
}());
__reflect(InstanceBattleSwitcher.prototype, "InstanceBattleSwitcher", ["battle.IBattleSwitcher"]);
//# sourceMappingURL=InstanceBattleSwitcher.js.map