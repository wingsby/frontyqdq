var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BossViewHandler = (function () {
    function BossViewHandler() {
    }
    BossViewHandler.open = function () {
        var info = Singleton.Get(GuildManager).getInfo();
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).showSchoolSubPanel();
        Singleton.Get(LayerManager).getView(ui.BossBaseView).open();
    };
    BossViewHandler.close = function () {
        Singleton.Get(LayerManager).getView(ui.BossBaseView).close();
    };
    BossViewHandler.refresh = function () {
        Singleton.Get(LayerManager).getView(ui.BossBaseView).refresh();
    };
    BossViewHandler.closeAfter = function () {
        Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(undefined);
    };
    BossViewHandler.openSingle = function (id) {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).hide();
        layer.getView(ui.MainView).showBattlePanel();
        layer.getView(ui.BattleView).showInstanceMode();
        layer.getView(ui.InstanceBattleView).openBossSingle(id);
        Singleton.Get(PveManager).cleanRewardHash();
    };
    BossViewHandler.openFull = function (id) {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).hide();
        layer.getView(ui.MainView).showBattlePanel();
        layer.getView(ui.BattleView).showInstanceMode();
        layer.getView(ui.InstanceBattleView).openBossFull(id);
        Singleton.Get(PveManager).cleanRewardHash();
    };
    BossViewHandler.closeBattle = function () {
        Singleton.Get(LayerManager).getView(ui.InstanceBattleView).close();
    };
    return BossViewHandler;
}());
__reflect(BossViewHandler.prototype, "BossViewHandler");
//# sourceMappingURL=BossViewHandler.js.map