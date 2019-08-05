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
    var SchoolView = (function (_super) {
        __extends(SchoolView, _super);
        /**
         * 构造函数
         */
        function SchoolView() {
            var _this = _super.call(this, "yw.SchoolSkin") || this;
            _this.initGuiText();
            _this.initEvent();
            _this.touchEnabled = false;
            return _this;
        }
        /**
         * 相应对象创建完成
         */
        SchoolView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        SchoolView.prototype.onDestroy = function () {
            this.releaseEvent();
        };
        /**
         * 帧更新
         * @param time
         */
        SchoolView.prototype.onUpdate = function (time) {
        };
        /**
         * 打开本界面
         */
        SchoolView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            var i = Singleton.Get(DrawCardManager).getInfo();
            if (i) {
                this.showDrawCardNew(i.dmd_is_free == 1);
            }
            this.checkRemind();
            Singleton.Get(LayerManager).getView(ui.SchoolSubView).open();
            this.activateTask(true);
            Singleton.Get(TaskManager).reqInfoLazy();
        };
        /**
         * 关闭本界面
         */
        SchoolView.prototype.close = function () {
            Singleton.Get(LayerManager).getView(ui.SchoolSubView).close();
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**
         * 关闭所有子面板
         */
        SchoolView.prototype.closeAllSubPanel = function () {
            // Singleton.Get(LayerManager).getView(ui.InstanceBaseView).close();
            Singleton.Get(LayerManager).getView(ui.ArenaBaseView).close();
            Singleton.Get(LayerManager).getView(ui.InstanceNewBaseView).close();
            Singleton.Get(LayerManager).getView(ui.WishView).close();
            GuildViewHandler.closeAll();
            SendViewHandler.closeAll();
        };
        SchoolView.prototype.showDrawCardNew = function (show) {
            // todo this.drawCard.isNew = show;
        };
        SchoolView.prototype.initGuiText = function () {
            /**
            this.labMainInstance.text = "主线副本";
            this.labMaterialInstance.text = "材料副本";
            this.labArena.text = "竞技场";
            this.labDuel.text = "一骑当千";
            this.labMail.text = "邮  件";
            this.labDrawCard.text = "商  店";
            this.labRank.text = "排行榜";
            this.labDuel.text = "一骑当千";
            this.labDailyTask.text = "历  练";
             */
            this.labBtn1.text = Template.getGUIText("ui_ex_main_1");
            this.labBtn2.text = Template.getGUIText("ui_ex_main_2");
            this.labBtn3.text = Template.getGUIText("ui_ex_main_3");
            this.labBtn4.text = Template.getGUIText("ui_ex_main_4");
            this.labBtn5.text = Template.getGUIText("ui_ex_main_5");
            this.labBtn6.text = Template.getGUIText("ui_ex_main_6");
            this.labBtn7.text = Template.getGUIText("ui_ex_main_7");
            this.labBtn8.text = Template.getGUIText("ui_ex_main_8");
        };
        SchoolView.prototype.initEvent = function () {
            this.btn_Shop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Shop, this);
            this.btnTower.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTower, this);
            this.btnMaterialInstance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_MaterialInstance, this);
            this.btnArena.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnArena, this);
            this.btnDuel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDuel, this);
            this.btnDailyTask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDailyTask, this);
            this.btnWish.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnWish, this);
            this.btnGuild.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGuild, this);
            this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSend, this);
            this.btnTaskReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTaskReward, this);
        };
        SchoolView.prototype.releaseEvent = function () {
            this.btn_Shop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Shop, this);
            this.btnTower.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTower, this);
            this.btnMaterialInstance.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_MaterialInstance, this);
            this.btnArena.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnArena, this);
            this.btnDuel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDuel, this);
            this.btnDailyTask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDailyTask, this);
            this.btnWish.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnWish, this);
            this.btnGuild.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGuild, this);
            this.btnSend.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSend, this);
            this.btnTaskReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTaskReward, this);
        };
        SchoolView.prototype.onClick_Shop = function (e) {
            if (e) {
                UtilsEffect.buttonEffect(this.btn_Shop, function () {
                    Singleton.Get(LayerManager).getView(ui.ShopView).open();
                }, this);
            }
            else {
                Singleton.Get(LayerManager).getView(ui.ShopView).open();
            }
        };
        SchoolView.prototype.onClick_btnTower = function (e) {
            if (e) {
                UtilsEffect.buttonEffect(this.btnTower, function () {
                    // Singleton.Get(DialogControler).showString(Template.getGUIText("append_152"));
                    // Singleton.Get(LayerManager).getView(ui.InstanceBaseView).openWithPrincipal();
                    if (OpenManager.CheckOpenWithInfo(OpenType.Tower))
                        Singleton.Get(LayerManager).getView(ui.TowerView).open();
                }, this);
            }
            else {
                if (OpenManager.CheckOpenWithInfo(OpenType.Tower))
                    Singleton.Get(LayerManager).getView(ui.TowerView).open();
            }
        };
        SchoolView.prototype.onClick_MaterialInstance = function (e) {
            if (e) {
                UtilsEffect.buttonEffect(this.btnMaterialInstance, function () {
                    Singleton.Get(LayerManager).getView(ui.InstanceNewBaseView).open();
                }, this);
            }
            else {
                Singleton.Get(LayerManager).getView(ui.InstanceNewBaseView).open();
            }
        };
        SchoolView.prototype.onClick_btnArena = function (e) {
            var _this = this;
            if (e) {
                UtilsEffect.buttonEffect(this.btnArena, function () {
                    if (OpenManager.CheckOpenWithInfo(OpenType.Arena)) {
                        Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open(DEFINE.SYNC_LOADING_DURATION);
                        ResManager.getResAsync("BG_jingjizhuye_png", function () {
                            ResManager.getResAsync("yuanhua_jingji_png", function () {
                                Singleton.Get(LayerManager).getView(ui.SyncLoadingView).cancleOpen();
                                Singleton.Get(LayerManager).getView(ui.ArenaBaseView).open();
                            }, _this);
                        }, _this);
                    }
                }, this);
            }
            else {
                if (OpenManager.CheckOpenWithInfo(OpenType.Arena)) {
                    Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open(DEFINE.SYNC_LOADING_DURATION);
                    ResManager.getResAsync("BG_jingjizhuye_png", function () {
                        ResManager.getResAsync("yuanhua_jingji_png", function () {
                            Singleton.Get(LayerManager).getView(ui.SyncLoadingView).cancleOpen();
                            Singleton.Get(LayerManager).getView(ui.ArenaBaseView).open();
                        }, _this);
                    }, this);
                }
            }
        };
        SchoolView.prototype.onClick_btnWish = function (e) {
            if (e) {
                UtilsEffect.buttonEffect(this.btnWish, function () {
                    if (OpenManager.CheckOpenWithInfo(OpenType.Wish)) {
                        Singleton.Get(LayerManager).getView(ui.WishView).open();
                    }
                }, this);
            }
            else {
                if (OpenManager.CheckOpenWithInfo(OpenType.Wish)) {
                    Singleton.Get(LayerManager).getView(ui.WishView).open();
                }
            }
        };
        SchoolView.prototype.onClick_btnDuel = function (e) {
            if (e) {
                UtilsEffect.buttonEffect(this.btnDuel, function () {
                    if (OpenManager.CheckOpenWithInfo(OpenType.Duel))
                        Singleton.Get(LayerManager).getView(ui.DuelView).open();
                }, this);
            }
            else {
                if (OpenManager.CheckOpenWithInfo(OpenType.Duel))
                    Singleton.Get(LayerManager).getView(ui.DuelView).open();
            }
        };
        SchoolView.prototype.onClick_btnGuild = function (e) {
            if (e) {
                UtilsEffect.buttonEffect(this.btnGuild, function () {
                    if (OpenManager.CheckOpenWithInfo(OpenType.Guild))
                        GuildViewHandler.openMain();
                }, this);
            }
            else {
                if (OpenManager.CheckOpenWithInfo(OpenType.Guild))
                    GuildViewHandler.openMain();
            }
        };
        SchoolView.prototype.onClick_btnSend = function (e) {
            if (e) {
                UtilsEffect.buttonEffect(this.btnSend, function () {
                    if (OpenManager.CheckOpenWithInfo(OpenType.Send))
                        SendViewHandler.openMain();
                }, this);
            }
            else {
                if (OpenManager.CheckOpenWithInfo(OpenType.Send))
                    SendViewHandler.openMain();
            }
        };
        SchoolView.prototype.onClick_btnDailyTask = function () {
            UtilsEffect.buttonEffect(this.btnDailyTask, function () {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_152"));
                // Singleton.Get(LayerManager).getView(ui.DailyTaskView).open();
            }, this);
        };
        // region 红点检测
        SchoolView.prototype.checkRemind = function () {
            var _this = this;
            // this.imgMainInstanceNew.visible = Singleton.Get(InstanceManager).checkPrincipalInstanceRemind();
            this.imgMaterialInstanceNew.visible = Singleton.Get(InstanceManager).checkRemind();
            this.imgTowerNew.visible = Singleton.Get(TowerManager).getTowerInfo().alarm_tower && OpenManager.CheckOpen(OpenType.Tower);
            this.imgDuelNew.visible = Singleton.Get(DuelManager).getDuels().isAlarm() && OpenManager.CheckOpen(OpenType.Duel);
            this.imgArenaNew.visible = Singleton.Get(ArenaManager).isAlarm() && OpenManager.CheckOpen(OpenType.Arena);
            this.imgWishNew.visible = Singleton.Get(WishManager).getInfo().hasAlarm() && OpenManager.CheckOpen(OpenType.Wish);
            this.imgSendNew.visible = Singleton.Get(SendManager).isAlarm() && OpenManager.CheckOpen(OpenType.Send);
            Singleton.Get(GuildWarManager).checkAlarm(function (is_alarm) {
                _this.imgGuildNew.visible = is_alarm;
            }, this);
            // this.imgDailyTaskNew.visible = Singleton.Get(DailyTaskManager).getData().checkAnyRewardAvailable();
        };
        // endregion
        // region 任务宝箱
        SchoolView.prototype.activateTask = function (active) {
            // this.groupTask.visible = active;
            this.groupTask.visible = false; // TODO 开发测试用
            if (active) {
                this.checkTask();
            }
        };
        SchoolView.prototype.checkTask = function () {
            Singleton.Get(TaskManager).reqInfoLazy();
        };
        /*
        public initTaskView(): void {
            let task: PlayerTaskInfo = Singleton.Get(TaskManager).getTaskInfo();

            if(task.isAllFinished()) {
                this.labTaskTxt.text = "没有可完成的任务";
                this.labTaskReward.text = "奖励：无";
                this.labTaskGet.visible = false;
                return;
            }

            let task_id: number = task.cur_id;
            let entity: Entity.Task = task.getCurEntity();
            if (entity == null) {
                YWLogger.error("can't load task entity, task id: " + task_id, LogType.Default);
                return;
            }

            if(task.is_finish) {
                this.playTaskEffect();
                this.labTaskTxt.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText(entity.Name) + '<font color="#33DD33">(完成)</font>');
            } else {
                this.stopTaskEffect();
                switch (entity.Type) {
                    case TaskType.DUEL:
                    case TaskType.EQUIP_STR:
                    case TaskType.EQUIP_REFINE:
                    case TaskType.ROLE_LV_UP:
                    case TaskType.ROLE_BREACH:
                    case TaskType.ROLE_TALENT:
                    case TaskType.ROLE_AWAKEN:
                    case TaskType.INSTANCE_MAT:
                        this.labTaskTxt.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText(entity.Name) + '<font color="#33DD33">(' + task.arg + '/' + entity.Condition + ')</font>');
                        break;
                    default:
                        this.labTaskTxt.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText(entity.Name));
                        break;

                }
            }
            this.labTaskReward.text = "奖励：" + Template.getGUIText(entity.Des);

            this.labTaskGet.visible = task.is_finish;

        }
        */
        SchoolView.prototype.playTaskEffect = function () {
            this.mcTaskReward.visible = true;
            this.mcTaskReward.clearMovieClip();
            this.mcTaskReward.setMovieClip("ui_battle_encircle"); // TODO move it
            this.mcTaskReward.gotoAndPlay("ui_battle_encircle", -1);
        };
        SchoolView.prototype.stopTaskEffect = function () {
            this.mcTaskReward.visible = false;
            this.mcTaskReward.clearMovieClip();
        };
        SchoolView.prototype.onClick_btnTaskReward = function (e) {
            UtilsEffect.buttonEffect(this.imgTaskReward);
            var task = Singleton.Get(TaskManager).getTaskInfo();
            if (task.isAllFinished()) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_111"));
                return;
            }
            if (task.is_finish) {
                Singleton.Get(TaskManager).reqReward();
            }
            else {
                TaskUtils.goto(task.getCurEntity().Type);
            }
        };
        return SchoolView;
    }(BaseUI));
    ui.SchoolView = SchoolView;
    __reflect(SchoolView.prototype, "ui.SchoolView");
})(ui || (ui = {}));
//# sourceMappingURL=SchoolView.js.map