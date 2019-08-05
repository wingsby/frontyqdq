var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuideManager = (function () {
    function GuideManager() {
        this.m_view = undefined;
        // 响应任务更新
        this.is_task_update_enable = true;
        this.wait_callback = undefined;
        this.wait_thisObj = undefined;
        this.wait_args = undefined;
        this.wait_trigger = false;
        this.wait_cur_id = -1;
        this.m_info = new PlayerGuideInfo();
        this.m_view = Singleton.Get(LayerManager).getView(ui.GuideView);
    }
    GuideManager.prototype.onGameLoaded = function () {
        Singleton.Get(LayerManager).getView(ui.LevelQuickAlertView).openAlert();
        Singleton.Get(LayerManager).getView(ui.LevelQuickAlertView).closeAlert();
    };
    GuideManager.prototype.getGuideInfo = function () {
        return this.m_info;
    };
    GuideManager.prototype.onTaskUpdate = function () {
        if (!this.is_task_update_enable) {
            return;
        }
        var task = Singleton.Get(TaskManager).getTaskInfo();
        var entity = task.getCurEntity();
        if (this.m_info.last_update_task == entity.ID) {
            if (task.is_finish) {
                var guide_id = this.m_info.cur_guide_id;
                if (guide_id <= 0) {
                    // 如果任务id在80以内并且没有下一引导 自动添加任务按钮引导
                    var task_id = Singleton.Get(TaskManager).getTaskInfo().cur_id;
                    if (task_id > 0 && task_id < 80) {
                        this.startGuide(900001);
                        return;
                    }
                }
            }
            return;
        }
        this.m_info.last_update_task = entity.ID;
        var next_guide_id = GuideUtil.getGuideIdByTask(entity.ID);
        if (next_guide_id == undefined || next_guide_id <= 0) {
            this.endGuide();
            this.m_info.setGuide(next_guide_id);
            return;
        }
        this.startGuide(next_guide_id);
    };
    // region 引导绑定
    GuideManager.prototype.startGuide = function (guide_id) {
        // console.log("开始引导：" + guide_id);
        this.m_info.setGuide(guide_id);
        if (guide_id <= 0) {
            return;
        }
        var entity = this.m_info.getCurEntity();
        if (entity == undefined) {
            egret.error("Can't get guide entity, guide id: " + guide_id);
            return;
        }
        // 重置延迟点击
        this.wait_callback = undefined;
        this.wait_thisObj = undefined;
        this.wait_args = undefined;
        this.wait_trigger = false;
        this.wait_cur_id = -1;
        // 获取引导对象
        var view = GuideUtil.getView(guide_id);
        var handler = GuideUtil.getHandler(guide_id);
        // 引导对象判空
        if (!view || !handler) {
            console.error("Guide target is not existed.");
            this.m_view.activateTip(false);
            return;
        }
        // 绑定舞台事件
        if (entity.typevalue[0] != "BattleView") {
            view.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onTargetAddToStage, this);
            view.addEventListener(egret.Event.ADDED_TO_STAGE, this.onTargetAddToStage, this);
            view.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onTargetRemoveFromStage, this);
        }
        else {
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.MainView).addBattleViewListenser(eui.UIEvent.CREATION_COMPLETE, this.onTargetAddToStage, this);
            layer.getView(ui.MainView).addBattleViewListenser(eui.UIEvent.ADDED_TO_STAGE, this.onTargetAddToStage, this);
            layer.getView(ui.MainView).addBattleViewListenser(egret.Event.REMOVED_FROM_STAGE, this.onTargetRemoveFromStage, this);
        }
        // 绑定点击事件
        handler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTargetClick, this, false, 99);
        // 根据视图是否显示激活Tip
        if (entity.typevalue[0] != "BattleView") {
            if (view.stage != undefined) {
                this.onTargetFirstAdd();
            }
            else {
                this.onTargetFirstRemove();
            }
        }
        else {
            var main_view = Singleton.Get(LayerManager).getView(ui.MainView);
            if (main_view.is_bv_visible) {
                this.onTargetFirstAdd();
                if (Singleton.Get(LayerManager).getPopup().getCurrentPopupUI()) {
                    Singleton.Get(LayerManager).getView(ui.GuideView).visible = false;
                }
            }
            else {
                this.onTargetFirstRemove();
            }
        }
    };
    GuideManager.prototype.nextGuide = function (cur) {
        this.endGuide();
        this.m_info.cur_guide_id = cur;
        var is_end = this.m_info.nextGuide();
        if (cur <= 0) {
            this.m_info.setGuide(0);
            return;
        }
        if (!is_end) {
            this.startGuide(this.m_info.cur_guide_id);
        }
    };
    GuideManager.prototype.endGuide = function () {
        // 检查当前是否有引导
        var entity = this.m_info.getCurEntity();
        if (entity == undefined) {
            return;
        }
        // console.log("结束【" + this.m_info.cur_guide_id + "】");
        // 获取引导对象
        var view = GuideUtil.getView(entity.guideID);
        var handler = GuideUtil.getHandler(entity.guideID);
        // 引导对象判空
        if (!view || !handler) {
            console.error("Guide target is not existed.");
            this.m_view.activateTip(false);
            return;
        }
        // 解绑引导相关事件
        if (entity.typevalue[0] != "BattleView") {
            view.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onTargetAddToStage, this);
            view.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.onTargetAddToStage, this);
            view.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onTargetRemoveFromStage, this);
        }
        else {
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.MainView).removeBattleViewListenser(egret.Event.ADDED_TO_STAGE);
            layer.getView(ui.MainView).removeBattleViewListenser(eui.UIEvent.CREATION_COMPLETE);
            layer.getView(ui.MainView).removeBattleViewListenser(egret.Event.REMOVED_FROM_STAGE);
        }
        // 解绑点击事件
        handler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTargetClick, this);
        // 隐藏Tip
        this.m_view.activateTip(false);
    };
    GuideManager.prototype.backToFirst = function () {
        var entity = this.m_info.getCurEntity();
        if (entity == undefined) {
            return;
        }
        // 如果当前进行的任务就是第一个 不回退
        if (entity.backID == entity.guideID) {
            return;
        }
        this.endGuide();
        this.startGuide(entity.backID);
    };
    // endregion
    // region 引导事件
    GuideManager.prototype.onTargetAddToStage = function (e) {
        // console.log(this.m_info.cur_guide_id + " " + this.getGuideInfo().getCurEntity().typevalue[0] + "." + this.getGuideInfo().getCurEntity().typevalue[1] + "加入舞台 onTargetAddToStage() ");
        this.initAgent();
        this.m_view.setTip();
        this.m_view.setMcHandler();
        this.m_view.activateTip(true);
    };
    GuideManager.prototype.onTargetFirstAdd = function () {
        // console.log(this.m_info.cur_guide_id + " " + this.getGuideInfo().getCurEntity().typevalue[0] + "." + this.getGuideInfo().getCurEntity().typevalue[1] + "首次激活 onTargetFirstAdd() ");
        this.initAgent();
        this.m_view.setTip();
        this.m_view.setMcHandler();
        this.m_view.activateTip(true);
    };
    GuideManager.prototype.onTargetRemoveFromStage = function (e) {
        // console.log(this.m_info.cur_guide_id + " " + this.getGuideInfo().getCurEntity().typevalue[0] + "." + this.getGuideInfo().getCurEntity().typevalue[1] + "移除舞台 onTargetRemoveFromStage() ");
        this.m_view.activateTip(false);
        // 如果离开界面时 离开了当前引导所在的界面 返回第一个引导
        if (e.target != undefined) {
            var target = e.target;
            if (Object.getPrototypeOf(target) != undefined && Object.getPrototypeOf(target).hasOwnProperty("__class__")) {
                if (this.m_info.getCurEntity() != undefined) {
                    if (Object.getPrototypeOf(target).__class__ == "ui." + this.m_info.getCurEntity().typevalue[0]) {
                        this.backToFirst();
                    }
                }
            }
        }
        else {
            console.error("target is null");
            console.log(e);
        }
    };
    GuideManager.prototype.onTargetFirstRemove = function () {
        // console.log(this.m_info.cur_guide_id + " " + this.getGuideInfo().getCurEntity().typevalue[0] + "." + this.getGuideInfo().getCurEntity().typevalue[1] + "首次关闭 onTargetFirstRemove() ");
        this.m_view.activateTip(false);
    };
    GuideManager.prototype.onTargetClick = function (e) {
        // console.log(this.m_info.cur_guide_id + " " + this.getGuideInfo().getCurEntity().typevalue[0] + "." + this.getGuideInfo().getCurEntity().typevalue[1] + "响应完成 onTargetClick() ");
        var cur_id = 0;
        if (this.wait_cur_id < 0) {
            cur_id = this.m_info.cur_guide_id;
        }
        else {
            cur_id = this.wait_cur_id;
        }
        if (this.wait_callback != undefined) {
            this.wait_trigger = true;
            this.wait_callback.call(this.wait_thisObj, this.wait_args);
        }
        // 如果该引导是为了完成任务 不进入下一步引导
        var entity = this.getGuideInfo().getCurEntity();
        if (entity != undefined) {
            if (entity.typevalue[1] == "btnTaskReward") {
                var task = Singleton.Get(TaskManager).getTaskInfo();
                if (task.is_finish) {
                    this.endGuide();
                    return;
                }
            }
        }
        this.nextGuide(cur_id);
    };
    GuideManager.prototype.CouldYouPleaseWaitForMe = function (view, handler, callback, thisObj) {
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        if (this.wait_trigger) {
            return false;
        }
        var entity = this.m_info.getCurEntity();
        if (entity == undefined) {
            return false;
        }
        var cur_view = entity.typevalue[0];
        var cur_handler = entity.typevalue[1];
        if (cur_view != view || handler != cur_handler) {
            return false;
        }
        this.wait_callback = callback;
        this.wait_thisObj = thisObj;
        this.wait_args = args;
        this.wait_cur_id = this.m_info.cur_guide_id;
        return true;
    };
    // endregion
    // region 设定代理
    GuideManager.prototype.initAgent = function () {
        var entity = this.getGuideInfo().getCurEntity();
        if (entity == undefined)
            return;
        if (entity.list > 0) {
            switch (entity.typevalue[0]) {
                case "InstanceNewListView":
                    Singleton.Get(LayerManager).getView(ui.InstanceNewListView).initAgent(entity.list);
                    Singleton.Get(LayerManager).getView(ui.InstanceNewListView).btnAgent.validateNow();
                    break;
                case "RoleLineupView":
                    switch (entity.typevalue[1]) {
                        case "btnAgent":
                            Singleton.Get(LayerManager).getView(ui.RoleLineupView).initAgent(entity.list);
                            Singleton.Get(LayerManager).getView(ui.RoleLineupView).btnAgent.validateNow();
                            break;
                        case "btnAgentBackup":
                            Singleton.Get(LayerManager).getView(ui.RoleLineupView).initAgentBackup(entity.list);
                            Singleton.Get(LayerManager).getView(ui.RoleLineupView).btnAgentBackup.validateNow();
                            break;
                    }
                    break;
                case "RoleListView":
                    Singleton.Get(LayerManager).getView(ui.RoleListView).initAgent(entity.list);
                    Singleton.Get(LayerManager).getView(ui.RoleListView).btnAgent.validateNow();
                    break;
                case "RoleLineupRecView":
                    Singleton.Get(LayerManager).getView(ui.RoleLineupRecView).initAgent(entity.list);
                    Singleton.Get(LayerManager).getView(ui.RoleLineupRecView).btnAgent.validateNow();
                    break;
                case "ArenaRewardPanelView":
                    Singleton.Get(LayerManager).getView(ui.ArenaRewardPanelView).initAgent(entity.list);
                    Singleton.Get(LayerManager).getView(ui.ArenaRewardPanelView).btnAgent.validateNow();
                    break;
                case "DuelScorePanelView":
                    Singleton.Get(LayerManager).getView(ui.DuelScorePanelView).initAgent(entity.list);
                    Singleton.Get(LayerManager).getView(ui.DuelScorePanelView).btnAgent.validateNow();
                    break;
                case "DailyRewardPanelView":
                    Singleton.Get(LayerManager).getView(ui.DailyRewardPanelView).initAgent(entity.list);
                    Singleton.Get(LayerManager).getView(ui.DailyRewardPanelView).btnAgent.validateNow();
                    break;
                case "TowerRewardPanelView":
                    Singleton.Get(LayerManager).getView(ui.TowerRewardPanelView).initAgent(entity.list);
                    Singleton.Get(LayerManager).getView(ui.TowerRewardPanelView).btnAgent.validateNow();
                    break;
                case "RoleSelectHeroAlertView":
                    Singleton.Get(LayerManager).getView(ui.RoleSelectHeroAlertView).initAgent(entity.list);
                    Singleton.Get(LayerManager).getView(ui.RoleSelectHeroAlertView).btnAgent.validateNow();
                    break;
                case "RoleSelectBackupPanelView":
                    Singleton.Get(LayerManager).getView(ui.RoleSelectBackupPanelView).validateNow();
                    Singleton.Get(LayerManager).getView(ui.RoleSelectBackupPanelView).initAgent(entity.list);
                    Singleton.Get(LayerManager).getView(ui.RoleSelectBackupPanelView).btnAgent.validateNow();
                    break;
                case "ArenaEnemyListView":
                    Singleton.Get(LayerManager).getView(ui.ArenaEnemyListView).initAgent();
                    Singleton.Get(LayerManager).getView(ui.ArenaEnemyListView).btnAgent.validateNow();
                    break;
                case "DmgRewardPanelView":
                    Singleton.Get(LayerManager).getView(ui.DmgRewardPanelView).initAgent(entity.list);
                    Singleton.Get(LayerManager).getView(ui.DmgRewardPanelView).btnAgent.validateNow();
                    break;
                case "WishSelHeroView":
                    Singleton.Get(LayerManager).getView(ui.WishSelHeroView).initAgent(entity.list);
                    Singleton.Get(LayerManager).getView(ui.WishSelHeroView).btnAgent.validateNow();
                    break;
            }
        }
    };
    // endregion
    // region 弹出层屏蔽
    GuideManager.prototype.onPopupAdded = function (pname) {
        var entity = this.getGuideInfo().getCurEntity();
        if (entity == undefined)
            return;
        var view = GuideUtil.getView(entity.guideID);
        if (view == undefined) {
            return;
        }
        if (Object.getPrototypeOf(view).__class__ != pname) {
            Singleton.Get(LayerManager).getView(ui.GuideView).visible = false;
        }
    };
    GuideManager.prototype.onPopupRemoved = function (pname) {
        var entity = this.getGuideInfo().getCurEntity();
        if (entity == undefined)
            return;
        var view = GuideUtil.getView(entity.guideID);
        if (view == undefined) {
            return;
        }
        var cur_pui = Singleton.Get(LayerManager).getPopup().getCurrentPopupUI();
        if (!cur_pui) {
            if (Object.getPrototypeOf(view).__class__ != pname) {
                Singleton.Get(LayerManager).getView(ui.GuideView).visible = true;
            }
        }
        else {
            if (Object.getPrototypeOf(cur_pui).__class__ == Object.getPrototypeOf(view).__class__) {
                Singleton.Get(LayerManager).getView(ui.GuideView).visible = true;
            }
            else {
                Singleton.Get(LayerManager).getView(ui.GuideView).visible = false;
            }
        }
    };
    // endregion
    // region 临时屏蔽
    GuideManager.prototype.hideGuide = function (view, handler) {
        var entity = this.m_info.getCurEntity();
        if (entity == undefined) {
            return false;
        }
        var cur_view = entity.typevalue[0];
        var cur_handler = entity.typevalue[1];
        if (cur_view != view || handler != cur_handler) {
            return false;
        }
        Singleton.Get(LayerManager).getView(ui.GuideView).setShow(false);
        return true;
    };
    GuideManager.prototype.showGuide = function (view, handler) {
        var entity = this.m_info.getCurEntity();
        if (entity == undefined) {
            return false;
        }
        var cur_view = entity.typevalue[0];
        var cur_handler = entity.typevalue[1];
        if (cur_view != view || handler != cur_handler) {
            return false;
        }
        Singleton.Get(LayerManager).getView(ui.GuideView).setShow(true);
        return true;
    };
    return GuideManager;
}());
__reflect(GuideManager.prototype, "GuideManager");
//# sourceMappingURL=GuideManager.js.map