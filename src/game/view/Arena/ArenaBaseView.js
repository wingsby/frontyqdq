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
    var ArenaBaseView = (function (_super) {
        __extends(ArenaBaseView, _super);
        // region 事件绑定
        /**
         * 构造函数
         */
        function ArenaBaseView() {
            var _this = _super.call(this, "yw.ArenaBaseSkin") || this;
            _this.initEvent();
            return _this;
        }
        /**
         * 响应创建子对象
         */
        ArenaBaseView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 相应对象创建完成
         */
        ArenaBaseView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        ArenaBaseView.prototype.onDestroy = function () {
            this.disposeEvent();
        };
        /**
         * 帧更新
         * @param time
         */
        ArenaBaseView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化事件
         */
        ArenaBaseView.prototype.initEvent = function () {
            // 基本事件
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            // 回退按钮
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnBackSecondary.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackSecondary, this);
        };
        /**
         * 回收事件
         */
        ArenaBaseView.prototype.disposeEvent = function () {
            // 基本事件
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            // 回退按钮
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnBackSecondary.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackSecondary, this);
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        ArenaBaseView.prototype.onAddToStage = function (e) {
            this.initGuiText();
        };
        /**
         * 响应从舞台删除
         * @param e
         */
        ArenaBaseView.prototype.onRemoveFromStage = function (e) {
        };
        /**
         * 初始化UI文字
         * TODO 加到字典表
         */
        ArenaBaseView.prototype.initGuiText = function () {
            this.btnArena.text = Template.getGUIText("ui_arena15");
            this.btnArena.active = false;
            this.btnArenaList.text = Template.getGUIText("ui_arena21");
            this.btnArenaList.active = false;
        };
        /**
         * 打开界面
         */
        ArenaBaseView.prototype.open = function () {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            layerManager.getView(ui.MainView).showSchoolSubPanel();
            layerManager.getView(ui.SchoolView).close();
            this.openMenuPanel();
        };
        /**
         * 关闭界面
         */
        ArenaBaseView.prototype.close = function () {
            // 关闭当前界面
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            this.closeAllSubPanel();
        };
        /**
         * 刷新界面
         */
        ArenaBaseView.prototype.refresh = function () {
            // TODO
        };
        // endregion
        // region 切页按钮切换
        /**
         * 打开一级菜单
         */
        ArenaBaseView.prototype.openSeniorMenu = function () {
            this.groupBtnSenior.visible = true;
            this.groupBtnSecondary.visible = false;
            Common.playStackAni(this.btnBack, [this.btnArena]);
        };
        /**
         * 打开二级菜单
         */
        ArenaBaseView.prototype.openSecondaryMenu = function () {
            this.groupBtnSenior.visible = false;
            this.groupBtnSecondary.visible = true;
            this.closeMenuPanel();
            Common.playStackAni(this.btnBackSecondary, [this.btnArenaList]);
        };
        // endregion
        // region 切换
        /**
         * 打开竞技场菜单面板
         */
        ArenaBaseView.prototype.openMenuPanel = function () {
            Singleton.Get(LayerManager).getView(ui.ArenaMenuView).open();
            this.openSeniorMenu();
        };
        /**
         * 关闭竞技场菜单面板
         */
        ArenaBaseView.prototype.closeMenuPanel = function () {
            Singleton.Get(LayerManager).getView(ui.ArenaMenuView).close();
        };
        /**
         * 打开对手列表面板
         */
        ArenaBaseView.prototype.openEnemyListPanel = function () {
            Singleton.Get(LayerManager).getView(ui.ArenaEnemyListView).open();
            this.openSecondaryMenu();
        };
        /**
         * 关闭对手列表面板
         */
        ArenaBaseView.prototype.closeEnemyListPanel = function () {
            Singleton.Get(LayerManager).getView(ui.ArenaEnemyListView).close();
        };
        /**
         * 隐藏所有子界面
         */
        ArenaBaseView.prototype.closeAllSubPanel = function () {
            var layer = Singleton.Get(LayerManager);
            // 关闭主界面
            layer.getView(ui.ArenaMenuView).close();
            // 关闭对手列表
            layer.getView(ui.ArenaEnemyListView).close();
        };
        /**
         * 战斗开始时打开战斗界面
         */
        /*
        public onBattleBegin(instance_id: number){
            let layer = Singleton.Get(LayerManager);
            layer.getView(ui.MainView).hide();

            layer.getView(ui.MainView).showBattlePanel();
            layer.getView(ui.BattleView).showInstanceMode();
            layer.getView(ui.InstanceBattleView).open(instance_id);

            Singleton.Get(PveManager).cleanRewardHash();

            this.close();
        }
        */
        /**
         * 战斗结束后打开界面
         */
        /*
        public onBattleEnd(){
            Singleton.Get(LayerManager).getView(ui.InstanceBattleView).close();
            Singleton.Get(LayerManager).getView(MainView).show();
            Singleton.Get(LayerManager).getView(MainView).onClick_btnCastle(null);
            this.open();
            this.hideAllbutMeSenior(this.btnPrincipal);
            this.openChapter(this.cur_chapter_idx);
        }
        */
        // endregion
        // region 响应按钮点击
        /**
         * 响应点击主界面回退按钮
         * @param e
         */
        ArenaBaseView.prototype.onClick_btnBack = function (e) {
            Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
            this.close();
        };
        /**
         * 响应点击内页回退按钮
         * @param e
         */
        ArenaBaseView.prototype.onClick_btnBackSecondary = function (e) {
            if (Singleton.Get(LayerManager).getView(ui.ArenaEnemyListView).return_to_daily) {
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(undefined, false);
                Singleton.Get(LayerManager).getView(ui.DailyTaskView).open();
                this.close();
                return;
            }
            this.closeEnemyListPanel();
            this.openMenuPanel();
        };
        return ArenaBaseView;
    }(BaseUI));
    ui.ArenaBaseView = ArenaBaseView;
    __reflect(ArenaBaseView.prototype, "ui.ArenaBaseView");
})(ui || (ui = {}));
//# sourceMappingURL=ArenaBaseView.js.map