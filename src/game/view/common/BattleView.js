var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ui;
(function (ui) {
    var E_BATTLE_VIEW_MODE;
    (function (E_BATTLE_VIEW_MODE) {
        E_BATTLE_VIEW_MODE[E_BATTLE_VIEW_MODE["PVE"] = 0] = "PVE";
        E_BATTLE_VIEW_MODE[E_BATTLE_VIEW_MODE["ARENA"] = 1] = "ARENA";
        E_BATTLE_VIEW_MODE[E_BATTLE_VIEW_MODE["DUEL"] = 2] = "DUEL";
        E_BATTLE_VIEW_MODE[E_BATTLE_VIEW_MODE["INSTANCE"] = 3] = "INSTANCE";
        E_BATTLE_VIEW_MODE[E_BATTLE_VIEW_MODE["TOWER"] = 4] = "TOWER";
    })(E_BATTLE_VIEW_MODE = ui.E_BATTLE_VIEW_MODE || (ui.E_BATTLE_VIEW_MODE = {}));
    /**
     * 战斗控制UI
     */
    var BattleView = (function (_super) {
        __extends(BattleView, _super);
        function BattleView() {
            var _this = _super.call(this, "yw.BattleSkin") || this;
            _this.m_boss_avaliable = false;
            _this.m_boss_playing = false;
            _this.m_boss_last_click = 0;
            _this.cur_mode = E_BATTLE_VIEW_MODE.PVE;
            _this.m_auto_avaliable = false;
            _this.m_quick_avaliable = false;
            _this.last_tick_time = 0;
            _this.cur_value = 0;
            _this.max_value = 0;
            _this.last_alarm_time = 0;
            // this.skinName = "yw.BattleSkin";
            _this.init();
            return _this;
        }
        BattleView.prototype.init = function () {
            this.groupRoot.touchEnabled = false;
            this.initEvent();
        };
        BattleView.prototype.initGuiText = function () {
            this.labBtnQuick.text = Template.getGUIText("ui_pve_19");
            this.labBtnAutoVIP.text = Template.getGUIText("ui_pve_23");
            this.labBtnDailyTask.text = Template.getGUIText("ui_ex_main_17");
            this.labBtnAuto.text = Template.getGUIText("ui_ex_main_18");
            this.labBossTxt.text = Template.getGUIText("ui_ex_main_15");
            this.labTaskGet.text = Template.getGUIText("ui_ex_task_1");
        };
        BattleView.prototype.initEvent = function () {
            this.m_mgr = Singleton.Get(PveManager);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnQuick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnQuick, this);
            this.btnBossActive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBoss, this);
            this.btnBossInactive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBoss, this);
            this.btnAuto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAuto, this);
            this.btnTaskReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTaskReward, this);
            this.btnDailyTask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDailyTask, this);
            this.btnFPay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnFPay, this);
            this.btnSPay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSPay, this);
            this.btnLvgift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLvgift, this);
            this.btnWorldBoss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnWorldBoss, this);
            this.mcBtnAuto.touchEnabled = false;
            // 设定文字状态
            this.labBtnBossExit.text = Template.getGUIText("ui_pve_21");
            this.btnBossInactive.visible = false;
        };
        BattleView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 响应添加到场景中
         */
        BattleView.prototype.onAddToStage = function (e) {
            this.attachToHook();
            this.refreshEffect();
            this.initGuiText();
            this.last_tick_time = UtilsGame.Now();
            Singleton.Get(RegisterUpdate).register(this);
            this.activateTask(true);
            Singleton.Get(TaskManager).regInfoCallback(this.initTaskView, this);
            Singleton.Get(TaskManager).regInfoCallback2(Singleton.Get(GuideManager).onTaskUpdate, Singleton.Get(GuideManager));
            Singleton.Get(TaskManager).reqInfoLazy();
            this.initTaskView();
            this.mcFTBoom.visible = false;
            this.btnLvgift.visible = false;
            this.btnFPay.setBlick(true);
            this.btnFPay.play();
            this.btnSPay.setBlick(true);
            this.btnSPay.play();
        };
        /**
         * 响应从场景中移除
         */
        BattleView.prototype.onRemoveFromStage = function (e) {
            Singleton.Get(RegisterUpdate).unRegister(this);
            Singleton.Get(TaskManager).unRegInfoCallback();
            Singleton.Get(TaskManager).unRegInfoCallback2();
        };
        /**
         * 将UI依附到主界面挂点
         */
        BattleView.prototype.attachToHook = function () {
            var mainView = Singleton.Get(ui.MainView);
            if (!mainView.groupBattleHook) {
                egret.error("UI hook mainView.groupBattleHook not existed.");
                return;
            }
            var hook = mainView.groupBattleHook;
            this.x = hook.x;
            this.y = hook.y;
            this.top = hook.top;
            this.anchorOffsetX = hook.anchorOffsetX;
            this.anchorOffsetY = hook.anchorOffsetY;
            this.horizontalCenter = hook.horizontalCenter;
            this.verticalCenter = hook.verticalCenter;
        };
        // region 血条控制
        /**
         * 显示Boss血条
         * @param isShow 显示还是隐藏
         */
        BattleView.prototype.showBossHpBar = function (isShow) {
            this.groupBoss.alpha = isShow ? 1 : 0;
        };
        /**
         * 重置Boss血条
         */
        BattleView.prototype.initBossHp = function () {
            this.progressBossHp.value = 100;
        };
        /**
         * 设定当前Boss血量百分比
         * @param pct 扣减百分比(0.5=50%)
         */
        BattleView.prototype.setBossHpPct = function (pct) {
            // 血条血量
            this.progressBossHp.value = pct * 100;
            // 刷新血条
            this.updateBossHp();
        };
        BattleView.prototype.getBossHpPct = function () {
            return this.progressBossHp.value;
        };
        /**
         * 扣减Boss血量百分比
         * @param deltaPct 扣减百分比(0.5=50%)
         */
        BattleView.prototype.subBossHpPct = function (deltaPct) {
            // 扣减血条血量
            this.progressBossHp.value -= deltaPct * 100;
            // 刷新血条
            this.updateBossHp();
        };
        BattleView.prototype.setBossHpMax = function (v) {
            this.setBossHpPct(1);
            this.cur_value = v;
            this.max_value = v;
        };
        BattleView.prototype.setBossHp = function (cur, max) {
            this.cur_value = cur;
            this.max_value = max;
            this.setBossHpPct(cur / max);
        };
        /**
         * 刷新Boss血条
         */
        BattleView.prototype.updateBossHp = function () {
            // 防御性设值
            if (this.progressBossHp.value < 0) {
                this.progressBossHp.value = 0;
            }
            else if (this.progressBossHp.value > 100) {
                this.progressBossHp.value = 100;
            }
            // 刷新文字数值
            this.labProgressBossHp.text = Math.floor(this.progressBossHp.value) + "%";
        };
        /**
         * 设定BOSS倒计时
         * @param elapsedMs 已经过毫秒数
         * @param maxMs 倒计时总毫秒数
         */
        BattleView.prototype.setBossCountdown = function (elapsedMs, maxMs) {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(layer.getView(ui.ArenaBattleView))) {
                layer.getView(ui.ArenaBattleView).setBossCountdown(elapsedMs, maxMs);
            }
            // 计算剩余毫秒数
            var lastMs = maxMs - elapsedMs;
            // 防御除数为零
            if (lastMs <= 0) {
                return;
            }
            // 设定倒计时
            this.labProgressBossCountdown.text = UtilsGame.timeToString_MS(lastMs);
            this.progressBossCountdown.value = lastMs / maxMs * 100;
        };
        // endregion
        // region BOSS控制
        /**
         * 设定挑战BOSS解锁进度
         * @param prog
         */
        BattleView.prototype.setBossProgress = function (prog) {
            var cur_level = Singleton.Get(PveManager).getCurLevel();
            if (cur_level > Template.config.RushBoss) {
                if (prog <= 0) {
                    this.btnBossActive.setProgress(ui.E_BTN_BOSS_STATUS.PRO_0);
                    this.m_boss_avaliable = false;
                }
                else {
                    this.btnBossActive.setProgress(ui.E_BTN_BOSS_STATUS.ACTIVE);
                    this.m_boss_avaliable = true;
                    var is_auto = Singleton.Get(PveManager).getAutoBossStatus();
                }
            }
            else {
                this.btnBossActive.setProgress(ui.E_BTN_BOSS_STATUS.ACTIVE);
                this.m_boss_avaliable = true;
                var is_auto = Singleton.Get(PveManager).getAutoBossStatus();
            }
        };
        /**
         * 设定BOSS挑战状态
         * @param is_playing
         */
        BattleView.prototype.setBossPlaying = function (is_playing) {
            this.btnBossActive.visible = !is_playing;
            this.btnBossActive.verticalCenter = !is_playing ? 0 : -1600;
            this.btnBossInactive.visible = is_playing;
            this.btnBossInactive.verticalCenter = is_playing ? 0 : -1600;
            this.m_boss_playing = is_playing;
        };
        /**
         * 响应挑战BOSS的点击事件
         */
        BattleView.prototype.onClick_btnBoss = function (e) {
            var _this = this;
            UtilsEffect.buttonEffects([this.btnBossActive, this.btnBossInactive], function () {
                // 判断是否可挑战
                if (!_this.m_boss_avaliable) {
                    Singleton.Get(DialogControler).showInfo(1102);
                    return;
                }
                // 判断频繁操作
                if (_this.m_boss_last_click + 500 > UtilsGame.Now()) {
                    Singleton.Get(DialogControler).showInfo(1103);
                    return;
                }
                // 记录上次挑战操作时间
                _this.m_boss_last_click = UtilsGame.Now();
                // 正在挑战则退出
                if (_this.m_boss_playing) {
                    Singleton.Get(PveManager).exitBossBattle();
                    return;
                }
                // 开始挑战BOSS
                Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.BOSS, battle.E_BATTLE_BEHAVIOR.POSITIVE);
            }, this);
        };
        // endregion
        // region 自动挑战
        /**
         * 设定自动挑战按钮激活状态
         * @param active
         */
        BattleView.prototype.setAutoActive = function (active) {
            this.lockBtnAuto.visible = false;
            this.m_auto_avaliable = active;
        };
        /**
         * 响应自动挑战点击事件
         * @param e
         */
        BattleView.prototype.onClick_btnAuto = function (e) {
            UtilsEffect.buttonEffect(this.btnAuto);
            if (OpenManager.CheckOpenWithInfo(OpenType.Auto) == false) {
                return;
            }
            var status = this.m_mgr.getAutoBossStatus();
            if (!status) {
                this.m_mgr.enterAutoBoss();
            }
            else {
                this.m_mgr.exitAutoBoss();
            }
        };
        /**
         * 更新自动挑战状态
         */
        BattleView.prototype.updateAutoStatus = function () {
            var is_active = this.m_mgr.getAutoBossStatus();
            this.setMcAuto(is_active);
        };
        // endregion
        // region 快速战斗
        /**
         * 设定快速战斗按钮状态
         * @param last_count
         */
        BattleView.prototype.setQuickStatus = function (last_count) {
            var is_active = last_count > 0;
            this.imgBtnQuick.visible = true;
            this.imgBtnQuickInactive.visible = false;
            this.groupBtnQuickTimes.visible = is_active && OpenManager.CheckOpen(OpenType.PveQuick);
            this.labBtnQuickTimes.visible = false;
            this.labBtnQuickTimes.text = last_count.toString();
            this.m_quick_avaliable = is_active;
        };
        /**
         * 响应快速战斗的点击事件
         */
        BattleView.prototype.onClick_btnQuick = function (e) {
            if (e) {
                UtilsEffect.buttonEffect(this.btnQuick, function () {
                    if (false == OpenManager.CheckOpenWithInfo(OpenType.PveQuick)) {
                        return;
                    }
                    Singleton.Get(LayerManager).getView(ui.LevelQuickAlertView).openAlert();
                }, this);
            }
            else {
                if (false == OpenManager.CheckOpenWithInfo(OpenType.PveQuick)) {
                    return;
                }
                Singleton.Get(LayerManager).getView(ui.LevelQuickAlertView).openAlert();
            }
            /// for test
            // DEFINE.g_useBattlePause = !DEFINE.g_useBattlePause;
            // Singleton.Get(DialogControler).showString("TEST:特写时暂停标志" + DEFINE.g_useBattlePause);
        };
        // endregion
        // region 显示状态切换
        BattleView.prototype.showPveMode = function () {
            // TODO 开启Earning
            // this.groupEarning.visible = true;
            // this.groupBtn.visible = true;
            this.groupBts.visible = true;
            this.groupBoss.visible = true;
            this.btnQuick.visible = true;
            this.activateTask(true);
            this.cur_mode = E_BATTLE_VIEW_MODE.PVE;
            Singleton.Get(LayerManager).getView(ui.PrivLvgiftView).tryAutoOpen();
            this.groupInfo.y = 152;
            Singleton.Get(LayerManager).getView(ui.FlyTreasure).visible = true;
        };
        BattleView.prototype.showInstanceMode = function () {
            // TODO 关闭Earning
            // this.groupEarning.visible = false;
            // this.groupBtn.visible = false;
            this.groupBts.visible = false;
            this.groupBoss.visible = true;
            this.btnQuick.visible = false;
            this.activateTask(false);
            this.cur_mode = E_BATTLE_VIEW_MODE.INSTANCE;
            this.groupInfo.y = 36;
            Singleton.Get(LayerManager).getView(ui.FlyTreasure).visible = false;
        };
        BattleView.prototype.showArenaMode = function () {
            // TODO 关闭Earning
            // this.groupEarning.visible = false;
            // this.groupBtn.visible = false;
            this.groupBts.visible = false;
            this.groupBoss.visible = false;
            this.btnQuick.visible = false;
            this.activateTask(false);
            this.cur_mode = E_BATTLE_VIEW_MODE.ARENA;
            this.groupInfo.y = 36;
            Singleton.Get(LayerManager).getView(ui.FlyTreasure).visible = false;
        };
        /**
         * 自动挑战按钮特效开关
         * @param show
         */
        BattleView.prototype.setMcAuto = function (show) {
            if (show) {
                this.mcBtnAuto.visible = true;
                this.mcBtnAuto.setMovieClip(DEFINE.GEAR_BTN_EFF);
                this.mcBtnAuto.gotoAndPlay(DEFINE.GEAR_BTN_EFF, -1);
            }
            else {
                this.mcBtnAuto.visible = false;
                this.mcBtnAuto.clearMovieClip();
            }
        };
        BattleView.prototype.refreshEffect = function () {
            // if (this.mcBtnBoss.visible) {
            //    this.mcBtnBoss.clearMovieClip();
            //    this.mcBtnBoss.setMovieClip(BattleView.BOSS_BTN_EFF);
            //    this.mcBtnBoss.gotoAndPlay(BattleView.BOSS_BTN_EFF, -1);
            // }
            if (this.mcBtnAuto.visible) {
                this.mcBtnAuto.clearMovieClip();
                this.mcBtnAuto.setMovieClip(DEFINE.GEAR_BTN_EFF);
                this.mcBtnAuto.gotoAndPlay(DEFINE.GEAR_BTN_EFF, -1);
            }
        };
        // endregion
        // region 任务宝箱
        BattleView.prototype.activateTask = function (active) {
            // 如果全部完成 隐藏任务框
            var task = Singleton.Get(TaskManager).getTaskInfo();
            if (task.isAllFinished()) {
                this.groupTask.visible = false;
                return;
            }
            // 设定任务UI激活状态
            this.groupTask.visible = active;
            if (active) {
                this.checkTask();
            }
        };
        BattleView.prototype.checkTask = function () {
            Singleton.Get(TaskManager).reqInfoLazy();
        };
        BattleView.prototype.initTaskView = function () {
            var task = Singleton.Get(TaskManager).getTaskInfo();
            if (task.isAllFinished()) {
                this.groupTask.visible = false;
                this.labTaskTxt.text = Template.getGUIText("ui_ex_task_2");
                this.labTaskReward.text = Template.getGUIText("ui_ex_task_3");
                this.labTaskGet.visible = false;
                return;
            }
            this.groupTask.visible = true;
            var task_id = task.cur_id;
            var entity = task.getCurEntity();
            if (!entity) {
                YWLogger.error("can't load task entity, task id: " + task_id, LogType.Default);
                return;
            }
            if (task.is_finish) {
                this.playTaskEffect();
                this.labTaskTxt.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText(entity.Name) + '\r\n<font color="#33DD33">(' + Template.getGUIText("ui_ex_task_4") + ')</font>');
            }
            else {
                this.stopTaskEffect();
                switch (entity.Type) {
                    case TaskType.DUEL:
                    case TaskType.EQUIP_STR:
                    case TaskType.EQUIP_REFINE:
                    case TaskType.ROLE_LV_UP:
                    case TaskType.ROLE_BREACH:
                    case TaskType.ROLE_TALENT:
                    case TaskType.ROLE_AWAKEN:
                    case TaskType.INSTANCE_GOLD:
                    case TaskType.INSTANCE_HERO:
                    case TaskType.INSTANCE_EQUIP:
                    case TaskType.INSTANCE_MAT:
                    case TaskType.DMD_DRAW_FREE_CNT:
                    case TaskType.QUICK_BATTLE_CNT:
                        this.labTaskTxt.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText(entity.Name) + '\r\n<font color="#33DD33">(' + task.arg + "/" + entity.Condition + ")</font>");
                        break;
                    default:
                        this.labTaskTxt.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText(entity.Name));
                        break;
                }
            }
            this.labTaskReward.text = "奖励：" + Template.getGUIText(entity.Des);
            this.labTaskGet.visible = task.is_finish;
            /**
            // 奖励道具信息
            if(entity.Item[0] > 0) {
                let item: Entity.Item = Template.item.get(entity.Item[0]);
                ResManager.AsyncSetTexture(this.imgTaskTier, Common.getItemTierBgRes(item.iStar));
                ResManager.AsyncSetTexture(this.imgTaskIcon, item.iIcon);
                this.labTaskCount.text = "x" + entity.ItemN[0];
            } else if (entity.Jewel > 0) {
                ResManager.AsyncSetTexture(this.imgTaskTier, Common.getItemTierBgRes(5));
                ResManager.AsyncSetTexture(this.imgTaskIcon, DEFINE.UI_ALERT_INFO.gold.resPNG);
                this.labTaskCount.text = "x" + entity.Jewel;
            } else {
                ResManager.AsyncSetTexture(this.imgTaskTier, Common.getItemTierBgRes(5));
                ResManager.AsyncSetTexture(this.imgTaskIcon, DEFINE.UI_ALERT_INFO.diamond.resPNG);
                this.labTaskCount.text = "x" + entity.Gold;
            }*/
            // 奖励道具信息
            // const item: Entity.Item = Template.item.get(entity.Iocn[0]);
            // ResManager.AsyncSetTexture(this.imgTaskTier, Common.getItemTierBgRes(item.iStar));
            // ResManager.AsyncSetTexture(this.imgTaskIcon, item.iIcon);
            // this.imgTaskFrag.visible = Common.isItemFrag(item.iType);
            // this.labTaskCount.text = "x" + entity.Iocn[1];
            // this.labTaskTxt.size = (this.labTaskTxt.text.length >= 8) ? (this.labTaskTxt.text.length >= 10) ? 11 : 12 : 14;
            // this.labTaskReward.size = (this.labTaskReward.text.length >= 8) ? (this.labTaskReward.text.length >= 10) ? 11 : 12 : 14;
        };
        BattleView.prototype.playTaskEffect = function () {
            this.mcTaskReward.visible = true;
            this.mcTaskReward.clearMovieClip();
            this.mcTaskReward.setMovieClip("ui_battle_encircle"); // TODO move it
            this.mcTaskReward.gotoAndPlay("ui_battle_encircle", -1);
            this.mcTaskReward.scaleX = 1.1;
            this.mcTaskReward.scaleY = 1.1;
        };
        BattleView.prototype.stopTaskEffect = function () {
            this.mcTaskReward.visible = false;
            this.mcTaskReward.clearMovieClip();
        };
        BattleView.prototype.onClick_btnTaskReward = function (e) {
            UtilsEffect.buttonEffect(this.btnTaskReward);
            var task = Singleton.Get(TaskManager).getTaskInfo();
            var t_cfg = Template.task.get(task.cur_id);
            if (t_cfg) {
                var open_type = OpenType.Null;
                switch (t_cfg.Type) {
                    case TaskType.ROLE_BREACH:
                    case TaskType.HAS_ROLE_BREACH:
                        open_type = OpenType.RoleBreach;
                        break;
                    case TaskType.ROLE_TALENT:
                        open_type = OpenType.RoleTalent;
                        break;
                    case TaskType.EQUIP_REFINE:
                    case TaskType.HAS_EQUIP_REFINE:
                        open_type = OpenType.EquipRefine;
                        break;
                    case TaskType.ARENA_CNT:
                    case TaskType.HAS_GET_ARENA_AWARD_ID:
                        open_type = OpenType.Arena;
                        break;
                    case TaskType.DUEL:
                    case TaskType.HAS_GET_DUEL_AWARD_ID:
                        open_type = OpenType.Duel;
                        break;
                    case TaskType.HAS_TOWER_LV:
                    case TaskType.HAS_GET_TOWER_AWARD_ID:
                        open_type = OpenType.Tower;
                        break;
                }
                if (open_type != OpenType.Null) {
                    if (OpenManager.CheckOpenWithInfo(open_type) == false)
                        return;
                }
            }
            if (task.isAllFinished()) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_111"));
                return;
            }
            if (task.is_finish) {
                Singleton.Get(TaskManager).reqReward();
                // 如果引导检查处于开启状态 暂时禁用引导检查
                var guide_mgr = Singleton.Get(GuideManager);
                if (guide_mgr.is_task_update_enable) {
                    guide_mgr.is_task_update_enable = false;
                }
            }
            else {
                TaskUtils.goto(task.getCurEntity().Type);
            }
        };
        // endregion
        // region 喜从天降特效
        BattleView.prototype.playFTBoomEffect = function (x, y, callback, thisObj) {
            var _this = this;
            this.mcFTBoom.visible = true;
            this.mcFTBoom.x = x;
            this.mcFTBoom.y = y;
            this.mcFTBoom.setMovieClip("ui_ten1");
            this.mcFTBoom.gotoAndPlay("ui_ten1", 1);
            if (callback) {
                var tw = egret.Tween.get(this.mcFTBoom);
                tw.wait(500).call(function () {
                    callback.call(thisObj);
                }, this).wait(250).call(function () {
                    _this.stopFTBoomEffect();
                }, this);
            }
        };
        BattleView.prototype.stopFTBoomEffect = function () {
            this.mcFTBoom.clearMovieClip();
            this.mcFTBoom.visible = false;
        };
        // endregion
        // region 魅力任务
        BattleView.prototype.onClick_btnDailyTask = function (e) {
            UtilsEffect.buttonEffect(this.btnDailyTask, function () {
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnCastle(undefined);
                Singleton.Get(LayerManager).getView(ui.DailyTaskView).open();
            }, this);
        };
        // endregion
        // region 首充惊喜
        BattleView.prototype.setFPayActive = function (is_active) {
            // this.btnFPay.setBlick(is_active);
            this.btnFPay.setBlick(true);
            this.btnSPay.setBlick(true);
        };
        BattleView.prototype.setFPayAlive = function (is_alive) {
            this.btnSPay.visible = is_alive;
            if (!Template.config.FPaySwitch) {
                this.btnFPay.visible = false;
                return;
            }
            this.btnFPay.visible = is_alive;
        };
        BattleView.prototype.onClick_btnFPay = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnFPay, function () {
                Singleton.Get(ui.PrivFirstPayView).open();
                _this.setFPayActive(false);
            }, this, 0.8);
        };
        BattleView.prototype.onClick_btnSPay = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnSPay, function () {
                Singleton.Get(ui.PrivSpayView).open();
                _this.setFPayActive(false);
            }, this, 0.8);
        };
        BattleView.prototype.onClick_btnLvgift = function () {
            UtilsEffect.buttonEffect(this.btnLvgift, function () {
                Singleton.Get(LayerManager).getView(ui.PrivLvgiftView).open();
            }, this, 0.8);
        };
        // endregion
        BattleView.prototype.update = function () {
            var delta_time = UtilsGame.Now() - this.last_tick_time;
            this.last_tick_time = UtilsGame.Now();
            if (this.m_mgr.getAutoBossStatus()) {
                this.imgAutoGear.rotation += 0.15 * delta_time;
                if (this.imgAutoGear.rotation > 360) {
                    this.imgAutoGear.rotation = 0;
                }
                this.imgAutoGear.validateNow();
            }
            if (UtilsGame.Now() - this.last_alarm_time > 1000) {
                this.last_alarm_time = UtilsGame.Now();
                this.onAlarm();
                this.btnLvgift.visible = Singleton.Get(LvgiftManager).getInfo().getActiveGift() > 0;
            }
        };
        BattleView.prototype.onAlarm = function () {
            // 每日任务Alarm
            this.imgBtnDailyTaskNew.visible = Singleton.Get(DailyTaskManager).getData().checkAnyRewardAvailable() || Singleton.Get(DailyTaskManager).getData().checkCharmLvUpgrade();
            // 新首充Alarm
            this.imgSpayNew.visible = Singleton.Get(PrivManager).getInfo().isSpayAlarm() && Singleton.Get(PrivManager).getInfo().isSpayActive();
            this.setFPayAlive(Singleton.Get(PrivManager).getInfo().isSpayActive());
            // 世界BOSS Alarm
            this.btnWorldBoss.visible = OpenManager.CheckOpen(OpenType.WorldBoss);
            this.imgWorldBossNew.visible = BossAlarm.isSingle() || BossAlarm.isFull();
            if (this.btnSPay.visible) {
                this.btnWorldBoss.x = 106;
            }
            else {
                this.btnWorldBoss.x = 16;
            }
        };
        // region 世界BOSS
        BattleView.prototype.onClick_btnWorldBoss = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffect(this.btnWorldBoss)];
                        case 1:
                            _a.sent();
                            BossViewHandler.open();
                            this.groupWorldBossTip.visible = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        BattleView.prototype.setWorldBossTip = function (name) {
            if (OpenManager.CheckOpen(OpenType.WorldBoss)) {
                this.labWorldBossTip.text = name + Template.getGUIText("ui_ex_boss_1");
                this.groupWorldBossTip.visible = true;
            }
        };
        // endregion
        /**创建界面时执行*/
        BattleView.prototype.componentCreated = function () { };
        /**销毁界面时执行*/
        BattleView.prototype.onDestroy = function () { };
        /**更新UI */
        BattleView.prototype.onUpdate = function (time) { };
        return BattleView;
    }(BaseUI));
    BattleView.BOSS_BTN_EFF = "ui_battle_boss";
    ui.BattleView = BattleView;
    __reflect(BattleView.prototype, "ui.BattleView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=BattleView.js.map