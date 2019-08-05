var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SendRobBattleSwitcher = (function () {
    function SendRobBattleSwitcher() {
        this.type = battle.E_BATTLE_TYPE.SEND_ROB;
        this.cb_list = new Dictionary();
        this.cb_list.add(battle.E_BATTLE_TYPE.PVE, this.toPve);
        Singleton.Get(battle.BattleStateGateway).regSwitcher(this);
    }
    SendRobBattleSwitcher.prototype.toPve = function () {
        // 切换关卡背景
        var cur_level = Singleton.Get(PveManager).getCurLevel();
        Singleton.Get(battle.RenderManager).setSceneByLevel(cur_level);
        // 播放背景音乐
        Singleton.Get(MusicManager).play(MUSICTYPE.MT_INGAME);
        // 将战斗切换至关卡
        Singleton.Get(PveManager).actBattlePve(true);
    };
    return SendRobBattleSwitcher;
}());
__reflect(SendRobBattleSwitcher.prototype, "SendRobBattleSwitcher", ["battle.IBattleSwitcher"]);
//# sourceMappingURL=SendRobBattleSwitcher.js.map