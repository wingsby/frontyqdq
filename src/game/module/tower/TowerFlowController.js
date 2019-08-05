var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 爬塔流程状态
 */
var TowerView = ui.TowerView;
var E_TOWER_FLOW;
(function (E_TOWER_FLOW) {
    E_TOWER_FLOW[E_TOWER_FLOW["NULL"] = 0] = "NULL";
    E_TOWER_FLOW[E_TOWER_FLOW["WAIT"] = 1] = "WAIT";
    E_TOWER_FLOW[E_TOWER_FLOW["BATTLE"] = 2] = "BATTLE";
    E_TOWER_FLOW[E_TOWER_FLOW["REWARD"] = 3] = "REWARD";
    E_TOWER_FLOW[E_TOWER_FLOW["COMPLETED"] = 4] = "COMPLETED";
    E_TOWER_FLOW[E_TOWER_FLOW["FUTURE"] = 5] = "FUTURE";
})(E_TOWER_FLOW || (E_TOWER_FLOW = {}));
/**
 * 爬塔流程控制器
 */
var TowerFlowController = (function () {
    function TowerFlowController() {
        this.cur_status = E_TOWER_FLOW.NULL; // 当前流程状态
        this.opr_lock = false; // 操作忙锁
        this.is_auto = false; // 自动挑战是否开启
    }
    /**
     * 根据数据初始化当前流程状态
     */
    TowerFlowController.prototype.init = function () {
        this.cur_status = Singleton.Get(TowerManager).getTowerInfo().getCurFlowStatus();
        this.setLock(false);
        this.setAuto(false);
    };
    /**
     * 获取当前流程状态
     */
    TowerFlowController.prototype.getCurStatus = function () {
        return this.cur_status;
    };
    /**
     * 执行下一步流程
     */
    TowerFlowController.prototype.goNext = function () {
        if (this.opr_lock) {
            return;
        }
        switch (this.cur_status) {
            case E_TOWER_FLOW.WAIT:
            case E_TOWER_FLOW.BATTLE:
                // 区分处理BOSS的情况
                this.setLock(true);
                Singleton.Get(ui.TowerView).btnFight.visible = false;
                this.cur_status = E_TOWER_FLOW.BATTLE; // 设为战斗状态
                if (Singleton.Get(TowerManager).getTowerInfo().isCurLvBoss()) {
                    Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.TOWER, battle.E_BATTLE_BEHAVIOR.POSITIVE, undefined, undefined, this.onBatWinBoss, this.onBatLoseBoss, this);
                }
                else {
                    Singleton.Get(TowerManager).reqBat(this.onBatWin, this.onBatLose, this);
                }
                break;
            case E_TOWER_FLOW.REWARD:
                this.setLock(true);
                Singleton.Get(TowerManager).reqUpstairs(this.onUpstairs, this);
                break;
        }
    };
    /**
     * 响应战斗胜利
     */
    TowerFlowController.prototype.onBatWin = function () {
        var _this = this;
        this.cur_status = E_TOWER_FLOW.REWARD;
        Singleton.Get(ui.TowerView).sp_stage_active.playAttack(true, function () {
            _this.setLock(false);
            Singleton.Get(DialogControler).showString(Template.getGUIText("ui_tower10"));
            Singleton.Get(ui.TowerView).initBtnStatus();
            _this.setLock(true);
            Singleton.Get(TowerManager).reqUpstairs(_this.onUpstairs, _this);
        }, this);
    };
    /**
     * 响应战斗失败
     */
    TowerFlowController.prototype.onBatLose = function () {
        var _this = this;
        Singleton.Get(ui.TowerView).initBtnStatus();
        Singleton.Get(ui.TowerView).sp_stage_active.playAttack(false, function () {
            _this.cur_status = E_TOWER_FLOW.WAIT;
            _this.setLock(false);
            _this.setAuto(false);
            Singleton.Get(ui.TowerView).initBtnStatus();
            Singleton.Get(ui.TowerLoseView).open(Singleton.Get(TowerManager).getTowerInfo().out_cur_lv); // 打开失败提示
        }, this);
    };
    /**
     * 响应BOSS战斗胜利
     */
    TowerFlowController.prototype.onBatWinBoss = function () {
        this.cur_status = E_TOWER_FLOW.REWARD;
        Singleton.Get(TowerView).refresh();
        this.setLock(false);
        this.execAuto();
    };
    /**
     * 响应BOSS战斗失败
     */
    TowerFlowController.prototype.onBatLoseBoss = function () {
        var _this = this;
        this.cur_status = E_TOWER_FLOW.WAIT;
        Singleton.Get(ui.TowerView).initBtnStatus();
        Singleton.Get(ui.AlertLoseView).open();
        Singleton.Get(ui.TowerView).sp_stage_active.playAttack(false, function () {
            _this.setLock(false);
            _this.setAuto(false);
            Singleton.Get(ui.TowerView).initBtnStatus();
            // 弹出失败提示
            // Singleton.Get(DialogControler).showAlertLose();
        }, this);
    };
    /**
     * 响应通过一层
     */
    TowerFlowController.prototype.onUpstairs = function () {
        var _this = this;
        this.cur_status = E_TOWER_FLOW.WAIT;
        Singleton.Get(ui.TowerView).sp_stage_active.playBox(function () {
            Singleton.Get(ui.TowerView).nextFloor(function () {
                Singleton.Get(ui.TowerView).sp_stage_active.playEnter(function () {
                    _this.setLock(false);
                    _this.execAuto();
                    Singleton.Get(GuideManager).showGuide("MainView", "btnBattle");
                    Singleton.Get(GuideManager).showGuide("TowerView", "btnReward");
                });
            });
        }, this);
    };
    /**
     * 设置操作锁定状态
     */
    TowerFlowController.prototype.setLock = function (lock) {
        this.opr_lock = lock;
    };
    // region 自动挑战
    /**
     * 设定自动挑战状态
     */
    TowerFlowController.prototype.setAuto = function (auto) {
        var or_auto = this.is_auto;
        this.is_auto = auto;
        if (or_auto != auto) {
        }
    };
    /**
     * 执行自动挑战
     */
    TowerFlowController.prototype.execAuto = function () {
        if (this.is_auto) {
            this.goNext();
        }
    };
    // endregion
    // region 中途退出
    /**
     * 流程执行中退出爬塔
     */
    TowerFlowController.prototype.onInterrupt = function () {
        this.setAuto(false);
        this.setLock(false);
        Singleton.Get(GuideManager).showGuide("MainView", "btnBattle");
        Singleton.Get(GuideManager).showGuide("TowerView", "btnReward");
    };
    TowerFlowController.prototype.setLastReward = function (gold, diamond, items) {
        this.last_reward = { gold: gold, diamond: diamond, items: items };
    };
    TowerFlowController.prototype.clearLastReward = function () {
        this.last_reward = undefined;
    };
    return TowerFlowController;
}());
__reflect(TowerFlowController.prototype, "TowerFlowController");
//# sourceMappingURL=TowerFlowController.js.map