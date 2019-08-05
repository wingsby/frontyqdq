var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var battle;
(function (battle) {
    /**
     * 战斗资源加载器
     */
    var BattleResLoader = (function () {
        function BattleResLoader() {
            this.battle_progress = 0;
            this.ui_progress = 0;
            this.actor_progress = 0;
            this.rep_all_st = 0;
            this.rep_battle_st = 0;
            this.rep_ui_st = 0;
            this.rep_actor_st = 0;
            this.rep_all_end = 0;
            this.rep_battle_ed = 0;
            this.rep_ui_ed = 0;
            this.rep_actor_ed = 0;
            // region 预加载
            this.pre_basic_ok = false;
            this.pre_battle_ok = false;
            this.pre_actor_ok = false;
            /**
             * 响应UI资源加载完成
             * @param e
             */
            this.ui_finish = false;
            /**
             * 响应战斗资源加载完成
             * @param e
             */
            this.battle_finish = false;
            /**
             * 响应角色资源加载完成
             * @param e
             */
            this.actor_finish = false;
        }
        /**
         * 预加载
         */
        BattleResLoader.prototype.preload = function () {
            var _this = this;
            RESGroupLoad.getInstance().loadGroup("ui_basic", this, function () {
                _this.pre_basic_ok = true;
            });
            RESGroupLoad.getInstance().loadGroup("battle_basic", this, function () {
                _this.pre_battle_ok = true;
            });
            this.loadActorRes(this, function () {
                _this.pre_actor_ok = true;
            });
        };
        // endregion
        /**
         * 响应加载
         */
        BattleResLoader.prototype.init = function (cb, cbt) {
            // 所有预加载都已完成 则不再显示加载界面
            if (this.pre_basic_ok && this.pre_battle_ok && this.pre_actor_ok) {
                this.onAllFinish(cb, cbt);
                return;
            }
            Singleton.Get(LayerManager).addView(Singleton.Get(LayerManager).getView(ui.LoadingView));
            RESGroupLoad.getInstance().loadGroup("ui_basic", this, this.onUILoadComplete, this.onUILoadProgress, this.onLoadError);
            RESGroupLoad.getInstance().loadGroup("battle_basic", this, this.onBattleLoadComplete, this.onBattleLoadProgress, this.onLoadError);
            this.loadActorRes(this, this.onActorLoadComplete, this.onActorLoadProgress, this.onLoadError);
            var now = new Date().getTime();
            this.rep_battle_st = now;
            this.rep_ui_st = now;
            this.rep_actor_st = now;
            this.rep_all_st = now;
            if (cb) {
                cb.call(cbt);
            }
        };
        BattleResLoader.prototype.onAllFinish = function (cb, cbt) {
            this.rep_all_end = new Date().getTime();
            // 载入游戏本体
            Singleton.Get(MainManager).loadGame(cb, cbt);
            // 触发登录完成UI回调
            Singleton.Get(LayerManager).getView(ui.MainView).onLoginComplete();
            // 如果新用户 直接进入开场介绍小乔
            if (Singleton.Get(LoginManager).loginInfo.current_level_id <= 1) {
                Singleton.Get(LayerManager).getView(ui.GuideNewbieView).open();
            }
            this.loadDelayRes();
        };
        /**
         * 加载延迟加载资源
         */
        BattleResLoader.prototype.loadDelayRes = function () {
            // RESGroupLoad.getInstance().loadGroup("ui_delay", this, () => {
            //     console.log("DelayRes is Loaded");
            // }, undefined);
        };
        /**
         * 响应加载出错
         */
        BattleResLoader.prototype.onLoadError = function () {
            Singleton.Get(DialogControler).showString("An error occured with resources. Please try again.");
            return;
        };
        /**
         * 检查所有资源是否加载完成
         */
        BattleResLoader.prototype.checkAllFinished = function () {
            if (this.actor_finish && this.battle_finish && this.ui_finish)
                this.onAllFinish();
        };
        /**
         * 更新进度条
         */
        BattleResLoader.prototype.updateProgress = function () {
            Singleton.Get(LayerManager).getView(ui.LoadingView).UpdateProgress(this.battle_progress + this.ui_progress + this.actor_progress, 3);
        };
        // region UI资源
        /**
         * 响应加载进度 UI
         * @param e
         */
        BattleResLoader.prototype.onUILoadProgress = function (e) {
            this.ui_progress = e.itemsLoaded / e.itemsTotal;
            this.updateProgress();
        };
        BattleResLoader.prototype.onUILoadComplete = function (e) {
            this.rep_ui_ed = new Date().getTime();
            this.ui_finish = true;
            this.checkAllFinished();
        };
        // endregion
        // region 战斗资源
        /**
         * 响应加载进度 战斗
         * @param e
         */
        BattleResLoader.prototype.onBattleLoadProgress = function (e) {
            this.battle_progress = e.itemsLoaded / e.itemsTotal;
            this.updateProgress();
        };
        BattleResLoader.prototype.onBattleLoadComplete = function (e) {
            this.rep_battle_ed = new Date().getTime();
            this.battle_finish = true;
            this.checkAllFinished();
        };
        // endregion
        // region 角色资源
        BattleResLoader.prototype.loadActorRes = function (thisObj, loadComplete, loadProgress, loadError) {
            var res_list = UtilsArray.combine(UtilsGame.getTeamActorRes(), UtilsGame.getAddtionalRes());
            if (res_list && res_list.length > 0) {
                RESGroupLoad.getInstance().loadGroupByList("actor_basic", res_list, thisObj, loadComplete, loadProgress, loadError);
            }
            else {
                console.log("team actor res_list is empty.");
                this.onActorLoadComplete(undefined);
            }
        };
        /**
         * 响应加载进度 角色资源
         * @param e
         */
        BattleResLoader.prototype.onActorLoadProgress = function (e) {
            this.actor_progress = e.itemsLoaded / e.itemsTotal;
            this.updateProgress();
        };
        BattleResLoader.prototype.onActorLoadComplete = function (e) {
            this.rep_actor_ed = new Date().getTime();
            this.actor_finish = true;
            this.checkAllFinished();
        };
        return BattleResLoader;
    }());
    battle.BattleResLoader = BattleResLoader;
    __reflect(BattleResLoader.prototype, "battle.BattleResLoader");
})(battle || (battle = {}));
//# sourceMappingURL=BattleResLoader.js.map