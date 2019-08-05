var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SendViewHandler = (function () {
    function SendViewHandler() {
    }
    SendViewHandler.openMain = function () {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).showSchoolSubPanel();
        layer.getView(ui.SchoolView).close();
        layer.getView(ui.SendView).open();
    };
    SendViewHandler.closeAll = function () {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.SendView).close();
        layer.getView(ui.SendLogView).close();
        layer.getView(ui.SendRobView).close();
    };
    SendViewHandler.closeAfter = function () {
        Singleton.Get(LayerManager).getView(ui.SchoolSubView).close();
        Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
    };
    SendViewHandler.openRob = function (quest_id) {
    };
    SendViewHandler.openLog = function () {
        Singleton.Get(LayerManager).getView(ui.SendLogView).open();
    };
    SendViewHandler.openBattleRob = function (inf_team) {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).hide();
        layer.getView(ui.MainView).showBattlePanel();
        layer.getView(ui.BattleView).showArenaMode();
        layer.getView(ui.ArenaBattleView).open();
        layer.getView(ui.ArenaBattleView).initContentDirect(inf_team.username, null, battle.BattleType.SEND_ROB, { e_uid: inf_team.uid, e_zid: inf_team.zid });
        Singleton.Get(PveManager).cleanRewardHash();
    };
    SendViewHandler.reOpenRob = function (quest_id, status) {
        // 切换界面状态
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).show();
        layer.getView(ui.MainView).onClick_btnCastle(undefined);
        layer.getView(ui.MainView).closeBattlePanel();
        layer.getView(ui.MainView).showSchoolSubPanel();
        layer.getView(ui.SchoolView).close();
        layer.getView(ui.ArenaBattleView).close();
        layer.getView(ui.BattleView).showPveMode();
        layer.getView(ui.SendView).open();
        layer.getView(ui.SendRobView).open(quest_id, status);
    };
    SendViewHandler.openBattleLog = function (inf_log) {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).hide();
        layer.getView(ui.MainView).showBattlePanel();
        layer.getView(ui.BattleView).showArenaMode();
        layer.getView(ui.ArenaBattleView).open();
        layer.getView(ui.ArenaBattleView).initContentNoPlayer(battle.BattleType.SEND_LOG, inf_log.atk_name, null, inf_log.def_name, null, { my_uid: inf_log.atk_uid, my_zid: inf_log.atk_zid, e_uid: inf_log.def_uid, e_zid: inf_log.def_zid });
        Singleton.Get(PveManager).cleanRewardHash();
    };
    SendViewHandler.reOpenLog = function () {
        // 切换界面状态
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).show();
        layer.getView(ui.MainView).onClick_btnCastle(undefined);
        layer.getView(ui.MainView).closeBattlePanel();
        layer.getView(ui.MainView).showSchoolSubPanel();
        layer.getView(ui.SchoolView).close();
        layer.getView(ui.ArenaBattleView).close();
        layer.getView(ui.BattleView).showPveMode();
        layer.getView(ui.SendView).open();
        layer.getView(ui.SendLogView).open();
    };
    return SendViewHandler;
}());
__reflect(SendViewHandler.prototype, "SendViewHandler");
//# sourceMappingURL=SendViewHandler.js.map