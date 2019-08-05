var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DramaFlowController = (function () {
    /**
     * @constructor
     */
    function DramaFlowController() {
    }
    /**
     * 进入剧情流程
     */
    DramaFlowController.prototype.onEnterDramaFlow = function (fin_dialog, fin_battle) {
        var _this = this;
        // 清理登录界面
        MainManager.cleanLogin();
        // 加载剧情所需资源
        Singleton.Get(DramaResLoader).init(function () {
            // 开始预加载游戏资源
            Singleton.Get(battle.BattleResLoader).preload();
            // 任何情况都从头开始
            _this.EnterDialog();
            /**
            // 进入剧情流程
            if (!fin_dialog && !fin_battle) {
                // 从未进入过剧情 从头开始
                this.EnterDialog();
            } else {
                // 进入过战斗 直接从战斗开始
                this.EnterBattle();
            }
             */
        }, this);
    };
    /**
     * 进入对话流程
     */
    DramaFlowController.prototype.EnterDialog = function () {
        Singleton.Get(LayerManager).getView(ui.DramaDialogView).setBg(false);
        Singleton.Get(LayerManager).getView(ui.DramaDialogView).setBlackBg(true);
        Singleton.Get(DramaManager).getDialog().begin(E_DIALOG_TYPE.DRAMA, this.EndDialog, this);
        // this.EnterBattle();
    };
    /**
     * 结束对话流程
     */
    DramaFlowController.prototype.EndDialog = function () {
        var _this = this;
        Singleton.Get(DramaManager).reqFinDialog(function () {
            _this.EnterBattle();
        }, this);
    };
    /**
     * 进入战斗流程
     */
    DramaFlowController.prototype.EnterBattle = function () {
        MainManager.cleanLogin();
        // 初始化战斗层
        Singleton.Get(battle.RenderManager).init(Template.drama.Scene);
        // 初始化特写
        var layer = Singleton.Get(LayerManager);
        layer.addView(layer.GetCloseUpLayer());
        // 打开战斗界面
        layer.getView(ui.DramaBattleView).open();
        // 请求战斗
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.DRAMA, battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    /**
     * 结束战斗流程
     */
    DramaFlowController.prototype.EndBattle = function () {
        this.EnterBlack();
    };
    /**
     * 进入黑暗流程
     * @constructor
     */
    DramaFlowController.prototype.EnterBlack = function () {
        var _this = this;
        Singleton.Get(LayerManager).getView(ui.DramaDialogView).setBg(false);
        Singleton.Get(LayerManager).getView(ui.DramaDialogView).setBlackBg(true);
        Singleton.Get(PveManager).reqPveInfo(function () {
            Singleton.Get(DramaManager).getDialog().begin(E_DIALOG_TYPE.BLACK, _this.EndBlack, _this);
        });
    };
    /**
     * 结束黑暗流程
     * @constructor
     */
    DramaFlowController.prototype.EndBlack = function () {
        Singleton.Get(DramaManager).reqFinBattle(function () {
            Singleton.Get(battle.BattleResLoader).init(function () {
                Singleton.Get(LayerManager).getView(ui.DramaDialogView).setBlackBg(false);
                Singleton.Get(LayerManager).getView(ui.DramaBattleView).close();
                Singleton.Get(LayerManager).getView(ui.DramaDialogView).close();
            });
        }, this);
    };
    /**
     * 跳过战斗
     */
    DramaFlowController.prototype.handleSkip = function () {
        var _this = this;
        Singleton.Get(LayerManager).CutCoverMask(function () {
            Singleton.Get(DramaManager).reqFinDialog(function () {
                Singleton.Get(DramaManager).reqFinBattle(function () {
                    Singleton.Get(battle.RoundManager).CutScene(false, function () {
                        Singleton.Get(LayerManager).getView(ui.SyncLoadingView).cancleOpen();
                    });
                    _this.EndBlack();
                }, _this);
            }, _this);
        }, function () { }, this);
    };
    return DramaFlowController;
}());
__reflect(DramaFlowController.prototype, "DramaFlowController");
//# sourceMappingURL=DramaFlowController.js.map