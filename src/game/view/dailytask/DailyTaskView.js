var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var DailyTaskView = (function (_super) {
        __extends(DailyTaskView, _super);
        /**
         * @constructor
         */
        function DailyTaskView() {
            var _this = _super.call(this, "yw.DailyTaskSkin") || this;
            _this.m_disable_click = false;
            _this.m_is_talking = false;
            _this.m_last_talk_time = 0;
            _this.m_cfg_talking_time = 2000;
            _this.task_activate = false;
            return _this;
        }
        DailyTaskView.prototype.componentCreated = function () {
            this.btnTitle.text = Template.getGUIText("ui_dailytask17");
            this.btnTitle.active = false;
            this.labTxtAttr.text = Template.getGUIText("ui_dailytask7");
            this.labTxtBtnReward.text = Template.getGUIText("ui_dailytask15");
            this.labTxtTitle.text = Template.getGUIText("ui_dailytask10");
            this.labTxtTimes.text = Template.getGUIText("ui_dailytask11");
            this.labTxtReward.text = Template.getGUIText("ui_dailytask12");
            this.labTxtGo.text = Template.getGUIText("ui_dailytask13");
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnUpgrade, this);
            this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.btnChestHandler.touchEnabled = true;
            this.btnChestHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChestHandler, this);
            this.btnCharaHandler.touchEnabled = true;
            this.btnCharaHandler.touchThrough = true;
            this.btnCharaHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCharaHandler, this);
            this.m_arr_tasks = new eui.ArrayCollection();
            this.dgTasks.itemRenderer = ui.DailyTaskItemView;
            this.dgTasks.dataProvider = this.m_arr_tasks;
            this.m_arr_items = new eui.ArrayCollection();
            this.dgItems.itemRenderer = ui.DailyTaskRewardItemView;
            this.dgItems.dataProvider = this.m_arr_items;
            this.initEffect();
            this.groupNpcDialog.visible = false;
            this.groupNpcDialog.alpha = 1;
        };
        DailyTaskView.prototype.onDestroy = function () {
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnUpgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnUpgrade, this);
            this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.btnChestHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChestHandler, this);
            this.btnCharaHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCharaHandler, this);
        };
        DailyTaskView.prototype.onUpdate = function (time) {
        };
        DailyTaskView.prototype.update = function (time) {
            var _this = this;
            if (this.m_is_talking && UtilsGame.Now() - this.m_last_talk_time > this.m_cfg_talking_time) {
                this.m_is_talking = false;
                var tw = egret.Tween.get(this.groupNpcDialog);
                tw.to({ alpha: 0 }, 200).call(function (obj) {
                    _this.groupNpcDialog.visible = false;
                    _this.groupNpcDialog.alpha = 1;
                }, this);
            }
        };
        DailyTaskView.prototype.open = function () {
            var _this = this;
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            layerManager.getView(ui.MainView).showSchoolSubPanel();
            Singleton.Get(DailyTaskManager).reqInfo(function () {
                _this.initView();
            }, this);
            Singleton.Get(RegisterUpdate).register(this);
            this.m_is_talking = false;
            Common.playStackAni(this.btnBack, [this.btnTitle]);
            // 引导
            var guide_entity = Singleton.Get(GuideManager).getGuideInfo().getCurEntity();
            if (guide_entity != undefined) {
                if (guide_entity.typevalue[0] != "DailyTaskView" && guide_entity.typevalue[0] != "DailyRewardPanelView") {
                    Singleton.Get(LayerManager).getView(ui.GuideView).visible = false;
                }
            }
            // 主线任务
            this.task_activate = layerManager.getView(ui.BattleView).groupTask.visible;
            layerManager.getView(ui.BattleView).activateTask(false);
        };
        DailyTaskView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            Singleton.Get(RegisterUpdate).unRegister(this);
            Singleton.Get(LayerManager).getView(ui.DailyRewardPanelView).close();
            Singleton.Get(LayerManager).getView(ui.GuideView).visible = true;
            layer.getView(ui.BattleView).activateTask(true);
        };
        DailyTaskView.prototype.refresh = function () {
            this.initView();
        };
        DailyTaskView.prototype.initView = function () {
            this.initEffect();
            this.initUpgrade();
            this.initTasks();
            this.initChara();
            this.initAlarm();
        };
        DailyTaskView.prototype.initUpgrade = function () {
            var dt_info = Singleton.Get(DailyTaskManager).getData();
            var my_charm_lv = dt_info.getCharmLv();
            var charm_entity = dt_info.getCharmEntity();
            // 属性加成
            this.labCharm.text = UtilsGame.stringHander(Template.getGUIText("ui_dailytask9"), my_charm_lv);
            this.labAttrHp.text = "+" + charm_entity.Hp.toString();
            this.labAttrAtk.text = "+" + charm_entity.Atk.toString();
            this.labAttrAtkSp.text = "+" + charm_entity.AtkSp.toString();
            // 魅力升级进度
            var charm_point = dt_info.getCharmPoint();
            this.progCharm.value = charm_point / charm_entity.Exp * 100;
            this.labProgCharm.text = charm_point + "/" + charm_entity.Exp;
            // 升级奖励
            this.initRewards();
        };
        DailyTaskView.prototype.initRewards = function () {
            var dt_info = Singleton.Get(DailyTaskManager).getData();
            var charm_entity = dt_info.getCharmEntity();
            var arr = [];
            if (charm_entity.Diamonds > 0) {
                arr.push({
                    item_id: -1,
                    item_count: charm_entity.Diamonds
                });
            }
            if (charm_entity.Money > 0) {
                arr.push({
                    item_id: -2,
                    item_count: charm_entity.Money
                });
            }
            for (var i = 0; i < charm_entity.ItemId.length; i++) {
                // 忽略id为0或数量为0的物品
                if (charm_entity.ItemId[i] == 0 || charm_entity.ItemNum[i] == 0) {
                    continue;
                }
                // 最多只显示3个道具
                if (arr.length >= 3) {
                    break;
                }
                arr.push({
                    item_id: charm_entity.ItemId[i],
                    item_count: charm_entity.ItemNum[i]
                });
            }
            // 没有任何物品时 隐藏升级奖励
            this.groupItems.visible = arr.length > 0;
            this.m_arr_items.source = arr;
        };
        DailyTaskView.prototype.initAlarm = function () {
            this.imgRewardNew.visible = Singleton.Get(DailyTaskManager).getData().checkAnyRewardAvailable();
            this.imgUpgradeNew.visible = Singleton.Get(DailyTaskManager).getData().checkCharmLvUpgrade();
        };
        DailyTaskView.prototype.initTasks = function () {
            var dt_info = Singleton.Get(DailyTaskManager).getData();
            var tasks = UtilsGame.cloneObject(Template.dailyTask.values);
            tasks = tasks.sort(this.sortTasks);
            var arr = [];
            for (var i = 0; i < tasks.length; i++) {
                arr.push({
                    task_id: tasks[i].ID
                });
            }
            this.m_arr_tasks.source = arr;
        };
        DailyTaskView.prototype.sortTasks = function (a, b) {
            var dt_info = Singleton.Get(DailyTaskManager).getData();
            var a_task = dt_info.getTask(a.ID);
            var b_task = dt_info.getTask(b.ID);
            if (a_task == null || b_task == null) {
                if (a_task == null && b_task == null) {
                    return 0;
                }
                else if (a_task == null) {
                    var b_completed = b_task.checkCompletedMax();
                    if (b_completed) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    var a_completed = a_task.checkCompletedMax();
                    if (a_completed) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            else {
                var a_completed = a_task.checkCompletedMax();
                var b_completed = b_task.checkCompletedMax();
                if ((a_completed && b_completed) || (!a_completed && !b_completed)) {
                    return 0;
                }
                else if (a_completed) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
        };
        DailyTaskView.prototype.initChara = function () {
            this.playCharaCompleted();
        };
        // region 角色立绘
        DailyTaskView.prototype.playCharaCompleted = function () {
            var dt_mgr = Singleton.Get(DailyTaskManager);
            this.showTalk(dt_mgr.getNpc().getTalk(DailyTaskDialogType.Complete, dt_mgr.getData().getTodayCompleteCount()));
        };
        DailyTaskView.prototype.playCharaClick = function () {
            var dt_mgr = Singleton.Get(DailyTaskManager);
            this.showTalk(dt_mgr.getNpc().getTalk(DailyTaskDialogType.Click), true);
        };
        DailyTaskView.prototype.playCharaUpgrade = function () {
            var dt_mgr = Singleton.Get(DailyTaskManager);
            this.showTalk(dt_mgr.getNpc().getTalk(DailyTaskDialogType.Upgrade));
        };
        /**
         * 播放乳摇
         */
        DailyTaskView.prototype.playWobbler = function () {
            egret.Tween.removeTweens(this.imgChest);
            var tw = egret.Tween.get(this.imgChest);
            tw.to({ x: 42, y: 128, scaleX: 1.1, scaleY: 1.1 }, 80);
            tw.to({ x: 48, y: 135, scaleX: 1, scaleY: 1 }, 80).call(function (obj) { if (obj != null)
                egret.Tween.removeTweens(obj); });
        };
        // endregion
        // region NPC对话
        DailyTaskView.prototype.showTalk = function (text_id, not_scale) {
            if (not_scale === void 0) { not_scale = false; }
            if (!not_scale) {
                var tw = egret.Tween.get(this.groupChara);
                tw.to({ scaleX: 1.05, scaleY: 1.05 }, 150).to({ scaleX: 1, scaleY: 1 }, 100).call(function (obj) { if (obj != null)
                    egret.Tween.removeTweens(obj); });
                var tw2 = egret.Tween.get(this.imgChest);
                tw2.to({ x: 42, y: 120 }, 150).to({ x: 48, y: 135 }, 100).call(function (obj) { if (obj != null)
                    egret.Tween.removeTweens(obj); });
                var tw3 = egret.Tween.get(this.imgNpcBlink);
                tw3.to({ x: 88, y: 148 }, 150).to({ x: 94, y: 165 }, 100).call(function (obj) { if (obj != null)
                    egret.Tween.removeTweens(obj); });
            }
            this.labNpcDialog.text = Template.getGUIText(text_id);
            if (!this.m_is_talking) {
                this.m_is_talking = true;
                this.groupNpcDialog.visible = true;
                this.groupNpcDialog.alpha = 0;
                var tw = egret.Tween.get(this.groupNpcDialog);
                tw.to({ alpha: 1 }, 200);
            }
            this.m_last_talk_time = UtilsGame.Now();
        };
        // endregion
        // region 升级特效
        DailyTaskView.prototype.initEffect = function () {
            this.groupCharm.visible = false;
            this.mcCharmFront.visible = false;
            this.imgNpcBlink.visible = false;
        };
        DailyTaskView.prototype.playUpgradeEffect = function (callback, thisObj) {
            var _this = this;
            this.m_disable_click = true;
            this.mcCharmFront.visible = true;
            this.groupCharm.visible = true;
            this.groupCharm.alpha = 0;
            this.groupCharm.scaleX = 0;
            this.groupCharm.scaleY = 0;
            var tw = egret.Tween.get(this.groupCharm);
            this.mcCharmFront.clearMovieClip();
            this.mcCharmFront.setMovieClip("meili2");
            this.mcCharmFront.gotoAndPlay("meili2", 1);
            this.mcCharmFront.setScale(2);
            tw.wait(250).call(function () {
                _this.playBlink();
            }).to({
                alpha: 1,
                scaleX: 1,
                scaleY: 1
            }, 200).call(function () {
                _this.mcCharmBack.clearMovieClip();
                _this.mcCharmBack.setMovieClip("meili1");
                _this.mcCharmBack.gotoAndPlay("meili1", 1);
                _this.mcCharmBack.setScale(2);
            }, this).wait(1100).call(function () {
                _this.m_disable_click = false;
                _this.mcCharmFront.visible = false;
                _this.groupCharm.visible = false;
                if (callback != null) {
                    callback.call(thisObj);
                }
            }, this);
        };
        DailyTaskView.prototype.playBlink = function () {
            var _this = this;
            var tw = egret.Tween.get(this.imgNpcBlink);
            tw.call(function () {
                _this.imgNpcBlink.visible = true;
            }, this).wait(150).call(function (obj) {
                _this.imgNpcBlink.visible = false;
                if (obj != null)
                    egret.Tween.removeTweens(obj);
            });
        };
        // endregion
        // region 响应点击事件
        DailyTaskView.prototype.onClick_btnBack = function () {
            if (this.m_disable_click) {
                return;
            }
            //Singleton.Get(LayerManager).getView(ui.SchoolSubView).close();
            //Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
            Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(null, false);
            this.close();
        };
        DailyTaskView.prototype.onClick_btnUpgrade = function () {
            var _this = this;
            if (this.m_disable_click) {
                return;
            }
            UtilsEffect.buttonEffect(this.btnUpgrade, function () {
                // 魅力已满级
                if (Singleton.Get(DailyTaskManager).getData().checkCharmLvMax()) {
                    Singleton.Get(DialogControler).showInfo(1139);
                    return;
                }
                // 碎片不足
                if (!Singleton.Get(DailyTaskManager).getData().checkCharmLvUpgrade()) {
                    Singleton.Get(DialogControler).showInfo(1140);
                    return;
                }
                Singleton.Get(DailyTaskManager).reqUpgrade(function (callback, thisObj) {
                    _this.initView();
                    _this.playCharaUpgrade();
                    _this.playUpgradeEffect(callback, thisObj);
                }, _this);
            }, this);
        };
        DailyTaskView.prototype.onClick_btnReward = function () {
            if (this.m_disable_click) {
                return;
            }
            UtilsEffect.buttonEffect(this.btnReward, function () {
                var layer = Singleton.Get(LayerManager);
                layer.getView(ui.DailyRewardPanelView).open();
            }, this);
        };
        DailyTaskView.prototype.onClick_btnChestHandler = function (e) {
            if (this.m_disable_click) {
                return;
            }
            this.playCharaClick();
            this.playWobbler();
        };
        DailyTaskView.prototype.onClick_btnCharaHandler = function (e) {
            //this.playCharaClick();
        };
        return DailyTaskView;
    }(BaseUI));
    ui.DailyTaskView = DailyTaskView;
    __reflect(DailyTaskView.prototype, "ui.DailyTaskView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=DailyTaskView.js.map