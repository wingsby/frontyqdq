var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WorldFullBattleSwitcher = (function () {
    function WorldFullBattleSwitcher() {
        this.type = battle.E_BATTLE_TYPE.WORLD_FB;
        this.cb_list = new Dictionary();
        this.cb_list.add(battle.E_BATTLE_TYPE.PVE, this.toPve);
        Singleton.Get(battle.BattleStateGateway).regSwitcher(this);
    }
    WorldFullBattleSwitcher.prototype.toPve = function () {
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
        BossViewHandler.closeBattle();
        BossViewHandler.open();
        // 默认打开回到世界BOSS界面
        Singleton.Get(LayerManager).getView(ui.BossBaseView).initView(ui.E_BOSS_TYPE.Full);
        // 播放背景音乐
        Singleton.Get(MusicManager).play(MUSICTYPE.MT_INGAME);
        // 将战斗切换至关卡
        Singleton.Get(PveManager).actBattlePve(true);
        // 播放世界BOSS击杀公告
        Singleton.Get(NoticeProcessor).releaseNotice(E_NOTICE_TYPE.FBOSS);
    };
    return WorldFullBattleSwitcher;
}());
__reflect(WorldFullBattleSwitcher.prototype, "WorldFullBattleSwitcher", ["battle.IBattleSwitcher"]);
//# sourceMappingURL=WorldFullBattleSwitcher.js.map