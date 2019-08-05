var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 爬塔战斗控制器
 */
var TowerBattleController = (function () {
    function TowerBattleController() {
        // 退出回调参数
        this.is_win = false; // 该场战斗是否胜利
        this.is_auto_temp = false; // 进战斗前的自动挑战状态
    }
    // region 流程控制
    /**
     * 切换进入战斗
     */
    TowerBattleController.prototype.onBattleBegin = function () {
        // 暂存进战斗前的自动挑战状态
        this.is_auto_temp = Singleton.Get(TowerManager).getFlowCtrl().is_auto;
        // 设定战斗关联界面状态
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).hide();
        layer.getView(ui.MainView).showBattlePanel();
        layer.getView(ui.BattleView).showInstanceMode();
        // 打开战斗界面
        layer.getView(ui.InstanceBattleView).openTower();
        // 清理关卡hash
        Singleton.Get(PveManager).cleanRewardHash();
        // 关闭已打开的爬塔界面
        Singleton.Get(LayerManager).getView(ui.TowerView).closeNotStop();
    };
    /**
     * 处理战斗结束
     */
    TowerBattleController.prototype.handleBattleEnd = function (is_positive) {
        var _this = this;
        if (is_positive === void 0) { is_positive = false; }
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.TOWER, battle.E_BATTLE_FLOW.FINISH);
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, is_positive ? battle.E_BATTLE_BEHAVIOR.POSITIVE : battle.E_BATTLE_BEHAVIOR.PASSIVE, undefined, undefined, function () {
            // 重设自动挑战状态
            Singleton.Get(TowerManager).getFlowCtrl().is_auto = _this.is_auto_temp;
        }, this);
        // 触发战斗结束回调
        this.callExitCallback();
    };
    /**
     * 处理中途退出战斗
     */
    TowerBattleController.prototype.handleExitBattle = function () {
        this.handleBattleEnd(true);
    };
    /**
     * 设定中断回调
     */
    TowerBattleController.prototype.setExitCallback = function (is_win, cb_win, cb_lose, thisObj) {
        this.is_win = is_win;
        this.cb_win = cb_win;
        this.cb_lose = cb_lose;
        this.cb_this = thisObj;
    };
    /**
     * 触发关闭回调
     */
    TowerBattleController.prototype.callExitCallback = function () {
        // 触发回调
        if (this.is_win) {
            // 挑战胜利
            Singleton.Get(TowerManager).getTowerInfo().win = true;
            if (this.cb_win != undefined) {
                this.cb_win.call(this.cb_this);
            }
        }
        else {
            // 挑战失败
            if (this.cb_lose != undefined) {
                this.cb_lose.call(this.cb_this);
            }
        }
    };
    return TowerBattleController;
}());
__reflect(TowerBattleController.prototype, "TowerBattleController");
//# sourceMappingURL=TowerBattleController.js.map