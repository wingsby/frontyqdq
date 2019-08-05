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
    var DuelLineupView = (function (_super) {
        __extends(DuelLineupView, _super);
        function DuelLineupView() {
            return _super.call(this, "yw.DuelLineupSkin") || this;
        }
        DuelLineupView.prototype.componentCreated = function () {
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnChangeAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChangeAll, this);
            this.btnTitle.text = "编队";
            this.btnTitle.active = false;
            this.team_arr = new eui.ArrayCollection();
            this.team_arr.source = [0, 1, 2];
            this.dgTeams.dataProvider = this.team_arr;
            this.dgTeams.itemRenderer = ui.DuelLineupTeamView;
            this.initView();
        };
        DuelLineupView.prototype.onDestroy = function () {
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnChangeAll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChangeAll, this);
        };
        DuelLineupView.prototype.open = function () {
            var layer = Singleton.Get(LayerManager);
            layer.addView(this);
            Common.playStackAni(this.btnBack, [this.btnTitle]);
        };
        DuelLineupView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**更新UI */
        DuelLineupView.prototype.onUpdate = function (time) { };
        DuelLineupView.prototype.refresh = function () {
            this.initView();
        };
        DuelLineupView.prototype.initView = function () {
            this.team_arr.refresh();
            this.labFighting.text = "总战力：" + Singleton.Get(DuelManager).getDuels().clacAllFighting(); // TODO 加到字典表
        };
        // region 响应点击事件
        DuelLineupView.prototype.onClick_btnClose = function () {
            Singleton.Get(LayerManager).getView(ui.SchoolSubView).close();
            Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
            Singleton.Get(LayerManager).getView(ui.DuelView).open();
            this.close();
        };
        DuelLineupView.prototype.onClick_btnChangeAll = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnChangeAll);
            Singleton.Get(DuelManager).reqTeamChangeAll(function () {
                _this.refresh();
            }, this);
        };
        return DuelLineupView;
    }(BaseUI));
    ui.DuelLineupView = DuelLineupView;
    __reflect(DuelLineupView.prototype, "ui.DuelLineupView");
})(ui || (ui = {}));
//# sourceMappingURL=DuelLineupView.js.map