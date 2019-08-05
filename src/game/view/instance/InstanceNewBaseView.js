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
    var InstanceNewBaseView = (function (_super) {
        __extends(InstanceNewBaseView, _super);
        function InstanceNewBaseView() {
            var _this = _super.call(this, "yw.InstanceNewBaseSkin") || this;
            _this.initEvent();
            return _this;
        }
        InstanceNewBaseView.prototype.componentCreated = function () {
        };
        InstanceNewBaseView.prototype.onDestroy = function () {
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnBackSecondary.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackSecondary, this);
        };
        InstanceNewBaseView.prototype.onUpdate = function (time) {
        };
        InstanceNewBaseView.prototype.initEvent = function () {
            this.btnTitle.text = Template.getGUIText("ui_ex_instance_1");
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnBackSecondary.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackSecondary, this);
        };
        InstanceNewBaseView.prototype.open = function (no_senior) {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            if (!no_senior) {
                this.openSeniorMenu();
            }
            layerManager.getView(ui.MainView).showSchoolSubPanel();
            layerManager.getView(ui.SchoolView).close();
            this.initContent();
        };
        InstanceNewBaseView.prototype.close = function () {
            // 关闭当前界面
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            this.hideAllSubPanel();
        };
        InstanceNewBaseView.prototype.openSeniorMenu = function () {
            this.groupBtnSenior.visible = true;
            this.groupBtnSecondary.visible = false;
            this.btnTitle.active = false;
            Singleton.Get(LayerManager).getView(ui.InstanceNewListView).close();
            Singleton.Get(LayerManager).getView(ui.InstanceNewChapterView).open();
            Common.playStackAni(this.btnBack, [this.btnTitle]);
        };
        InstanceNewBaseView.prototype.openSecondaryMenu = function () {
            this.groupBtnSenior.visible = false;
            this.groupBtnSecondary.visible = true;
            this.btnChapterName.active = false;
            Common.playStackAni(this.btnBackSecondary, [this.btnChapterName]);
            Singleton.Get(LayerManager).getView(ui.InstanceNewChapterView).close();
        };
        InstanceNewBaseView.prototype.hideAllSubPanel = function () {
            Singleton.Get(LayerManager).getView(ui.InstanceNewChapterView).close();
            Singleton.Get(LayerManager).getView(ui.InstanceNewListView).close();
            // TODO 另一个内页界面
        };
        InstanceNewBaseView.prototype.initContent = function () {
        };
        /**
         * 战斗开始时打开战斗界面
         */
        InstanceNewBaseView.prototype.onBattleBegin = function (instance_id) {
            YWLogger.log("InstanceNewBaseView onBattleBegin()", LogLevel.INFO, LogType.Instance);
            this.close();
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.MainView).hide();
            layer.getView(ui.MainView).showBattlePanel();
            layer.getView(ui.BattleView).showInstanceMode();
            layer.getView(ui.InstanceBattleView).open(instance_id);
            Singleton.Get(PveManager).cleanRewardHash();
        };
        /**
         * 战斗结束后打开界面
         */
        InstanceNewBaseView.prototype.onBattleEnd = function () {
            YWLogger.log("InstanceNewBaseView onBattleEnd()", LogLevel.INFO, LogType.Instance);
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.InstanceBattleView).close();
            layer.getView(ui.MainView).show();
            layer.getView(ui.MainView).onClick_btnCastle(undefined);
            layer.getView(ui.InstanceNewBaseView).open();
            layer.getView(ui.InstanceNewBaseView).openSecondaryMenu();
            layer.getView(ui.InstanceNewListView).openDefault();
            // this.hideAllbutMeSenior(this.btnPrincipal);
            // this.openChapter(this.cur_chapter_idx);
        };
        InstanceNewBaseView.prototype.onClick_btnBack = function (e) {
            Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
            this.close();
        };
        InstanceNewBaseView.prototype.onClick_btnBackSecondary = function (e) {
            if (Singleton.Get(LayerManager).getView(ui.InstanceNewListView).return_to_daily) {
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(undefined, false);
                Singleton.Get(LayerManager).getView(ui.DailyTaskView).open();
                this.close();
                return;
            }
            this.openSeniorMenu();
        };
        return InstanceNewBaseView;
    }(BaseUI));
    ui.InstanceNewBaseView = InstanceNewBaseView;
    __reflect(InstanceNewBaseView.prototype, "ui.InstanceNewBaseView");
})(ui || (ui = {}));
//# sourceMappingURL=InstanceNewBaseView.js.map