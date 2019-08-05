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
    var RankTowerView = (function (_super) {
        __extends(RankTowerView, _super);
        function RankTowerView() {
            var _this = _super.call(this, "yw.RankSkin") || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            return _this;
        }
        RankTowerView.prototype.componentCreated = function () {
            this.initView();
        };
        RankTowerView.prototype.initView = function () {
            this.scrGuilds.visible = false;
            this.groupBtnTower.visible = true;
            this.groupBtn.visible = false;
            this.btnTap_Tower.text = Template.getGUIText("ui_tower14");
            this.btnTap_Tower.active = false;
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.arry = new eui.ArrayCollection();
            this.dg_data.dataProvider = this.arry;
            this.dg_data.itemRenderer = ui.RankItemRenderer;
            this.scroller.viewport = this.dg_data;
        };
        RankTowerView.prototype.updateData = function () {
            var _this = this;
            this.arry.removeAll();
            Singleton.Get(RankManager).getRank(RankListType.TOWER, function (rank_players, my_rank) {
                var arr = [];
                for (var i = 0; i < rank_players.length; i++) {
                    arr.push({
                        type: RankListType.TOWER,
                        info: rank_players[i]
                    });
                }
                _this.lb_rank.text = Template.getGUIText("ui_pve_34") + ((my_rank > 0) ? my_rank.toString() : Template.getGUIText("ui_pve_35"));
                // 停止滚动
                _this.scroller.stopAnimation();
                _this.arry.source = arr;
                _this.scroller.viewport.scrollH = 0;
                _this.scroller.validateNow();
            }, this);
            this.lb_power.text = UtilsGame.stringHander(Template.getGUIText("ui_pve_36"), Singleton.Get(PlayerInfoManager).getTeamCurrentFighting());
        };
        /**销毁界面时执行*/
        RankTowerView.prototype.onDestroy = function () {
            this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        RankTowerView.prototype.open = function () {
            var layer = Singleton.Get(LayerManager);
            layer.addView(this);
            layer.getView(ui.MainView).showSchoolSubPanel();
            layer.getView(ui.SchoolView).close();
            this.updateData();
            Common.playStackAni(this.btn_back, [this.btnTap_Tower]);
        };
        RankTowerView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**更新UI */
        RankTowerView.prototype.onUpdate = function (time) {
        };
        RankTowerView.prototype.onClick_btnClose = function () {
            this.close();
            Singleton.Get(ui.TowerView).open();
        };
        return RankTowerView;
    }(BaseUI));
    ui.RankTowerView = RankTowerView;
    __reflect(RankTowerView.prototype, "ui.RankTowerView");
})(ui || (ui = {}));
//# sourceMappingURL=RankTowerView.js.map