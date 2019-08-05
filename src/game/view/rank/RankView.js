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
    var RankView = (function (_super) {
        __extends(RankView, _super);
        function RankView() {
            var _this = _super.call(this, "yw.RankSkin") || this;
            _this.curIndex = 0;
            _this.return_to_school = false;
            _this.return_to_arena = false;
            _this.return_to_activity = false;
            _this.return_to_guild = false; // TODO
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            return _this;
        }
        /**创建界面时执行*/
        RankView.prototype.componentCreated = function () {
            this.initView();
        };
        RankView.prototype.initView = function () {
            this.groupBtnTower.visible = false;
            this.groupBtn.visible = true;
            this.btnTap_0.text = Template.getGUIText("ui_ex_rank_1");
            this.btnTap_1.text = Template.getGUIText("ui_ex_rank_2");
            this.btnTap_2.text = Template.getGUIText("ui_ex_rank_3");
            this.btnTap_3.text = Template.getGUIText("ui_ex_rank_4");
            this.btnTap_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMenu, this);
            this.btnTap_0.name = (RankListType.TEAM_LV + "");
            this.btnTap_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMenu, this);
            this.btnTap_1.name = (RankListType.PVE + "");
            this.btnTap_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMenu, this);
            this.btnTap_2.name = (RankListType.ARENA + "");
            this.btnTap_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMenu, this);
            this.btnTap_3.name = (RankListType.GUILD + "");
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.arry = new eui.ArrayCollection();
            this.dg_data.dataProvider = this.arry;
            this.dg_data.itemRenderer = ui.RankItemRenderer;
            this.scroller.viewport = this.dg_data;
            this.arry_guilds = new eui.ArrayCollection();
            this.dgGuilds.dataProvider = this.arry_guilds;
            this.dgGuilds.itemRenderer = ui.GuildItemRenderer;
            this.scrGuilds.viewport = this.dgGuilds;
        };
        RankView.prototype.updateData = function () {
            var _this = this;
            // 按钮状态
            this.lockTap3.visible = !OpenManager.CheckOpen(OpenType.Guild);
            this.lockTap3.setLock(OpenType.Guild);
            // 数据内容
            this.arry.removeAll();
            this.arry_guilds.removeAll();
            if (this.curIndex != RankListType.GUILD) {
                Singleton.Get(RankManager).getRank(this.curIndex, function (rank_players, my_rank) {
                    var arr = [];
                    for (var i = 0; i < rank_players.length; i++) {
                        arr.push({
                            type: _this.curIndex,
                            info: rank_players[i]
                        });
                    }
                    _this.lb_rank.text = Template.getGUIText("ui_pve_34") + ((my_rank > 0) ? my_rank.toString() : Template.getGUIText("ui_pve_35"));
                    // 停止滚动
                    _this.scroller.stopAnimation();
                    _this.arry.source = arr;
                    _this.scroller.viewport.scrollH = 0;
                    _this.scroller.validateNow();
                    _this.scroller.visible = true;
                    _this.scrGuilds.visible = false;
                }, this);
            }
            else {
                Singleton.Get(RankManager).getRank(this.curIndex, function (rank_guilds, my_rank) {
                    var arr = [];
                    for (var i = 0; i < rank_guilds.length; i++) {
                        arr.push({
                            type: _this.curIndex,
                            gid: rank_guilds[i].id,
                            rank: rank_guilds[i].rank,
                            show_btn: false
                        });
                    }
                    _this.lb_rank.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_rank_10"), ((my_rank > 0) ? my_rank.toString() : Template.getGUIText("ui_pve_35")));
                    // 停止滚动
                    _this.scrGuilds.stopAnimation();
                    _this.arry_guilds.source = arr;
                    _this.scrGuilds.viewport.scrollH = 0;
                    _this.scrGuilds.validateNow();
                    _this.scroller.visible = false;
                    _this.scrGuilds.visible = true;
                }, this);
            }
        };
        /*
        private genArenaData(): any[] {
            let arr: Array<any> = new Array<any>();
            for (var i: number = 1; i < 1000; ++i) {
                arr.push(i);
            }
            return arr;
        }

        private genPveData(): any[] {
            let arr: Array<any> = new Array<any>();

            Singleton.Get(RankManager).getRank(RankListType.PVE, (rank_players: RankPlayerInfo[], my_rank: number) => {
                for(let i: number = 0; i < rank_players.length; i++){
                    arr.push({

                    });
                }
            }, this);

            for (var i: number = 1; i < 1000; ++i) {
                arr.push(i);
            }
            return arr;
        }
        */
        RankView.prototype.updateTap = function () {
            if (this.curIndex == RankListType.TEAM_LV) {
                this.btnTap_0.active = true;
                this.btnTap_1.active = false;
                this.btnTap_2.active = false;
                this.btnTap_3.active = false;
                this.lb_rank.visible = true;
                this.lb_power.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_rank_9"), Singleton.Get(PlayerInfoManager).getTeamLv());
            }
            else if (this.curIndex == RankListType.PVE) {
                this.btnTap_0.active = false;
                this.btnTap_1.active = true;
                this.btnTap_2.active = false;
                this.btnTap_3.active = false;
                this.lb_rank.visible = true;
                this.lb_power.text = UtilsGame.stringHander(Template.getGUIText("ui_pve_37"), Common.getLevelName(Singleton.Get(PveManager).getCurLevel()));
            }
            else if (this.curIndex == RankListType.ARENA) {
                this.btnTap_0.active = false;
                this.btnTap_1.active = false;
                this.btnTap_2.active = true;
                this.btnTap_3.active = false;
                this.lb_rank.visible = true;
                this.lb_power.text = UtilsGame.stringHander(Template.getGUIText("ui_pve_36"), Singleton.Get(PlayerInfoManager).getTeamCurrentFighting());
            }
            else if (this.curIndex == RankListType.GUILD) {
                this.btnTap_0.active = false;
                this.btnTap_1.active = false;
                this.btnTap_2.active = false;
                this.btnTap_3.active = true;
                if (Singleton.Get(GuildManager).getInfo().gd_id != "") {
                    this.lb_rank.visible = true;
                    this.lb_power.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_rank_11"), Singleton.Get(GuildManager).getMyGuild().name, Singleton.Get(GuildManager).getMyGuild().lv);
                }
                else {
                    this.lb_rank.visible = false;
                    this.lb_power.text = Template.getGUIText("ui_pve_38");
                }
            }
        };
        RankView.prototype.onClick_btnMenu = function (e) {
            UtilsEffect.tabEffect(e.currentTarget);
            var index = parseInt(e.currentTarget.name);
            if (this.curIndex == index)
                return;
            if (index == RankListType.GUILD) {
                if (!OpenManager.CheckOpenWithInfo(OpenType.Guild)) {
                    return;
                }
            }
            this.curIndex = index;
            this.updateTap();
            this.updateData();
        };
        RankView.prototype.open = function (type) {
            var layer = Singleton.Get(LayerManager);
            this.return_to_school = layer.isViewOnStage(layer.getView(ui.SchoolView));
            layer.addView(this);
            layer.getView(ui.MainView).showSchoolSubPanel();
            layer.getView(ui.SchoolView).close();
            this.curIndex = type ? type : RankListType.TEAM_LV; // 默认打开的排行榜类型
            this.updateTap();
            this.updateData();
            if (this.return_to_activity) {
                Singleton.Get(LayerManager).getView(ui.GuideView).visible = false;
            }
            Common.playStackAni(this.btn_back, [this.btnTap_0, this.btnTap_1, this.btnTap_2, this.btnTap_3]);
        };
        /**销毁界面时执行*/
        RankView.prototype.onDestroy = function () {
            this.btnTap_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMenu, this);
            this.btnTap_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMenu, this);
            this.btnTap_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMenu, this);
            this.btnTap_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMenu, this);
            this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        };
        RankView.prototype.onClose = function () {
            if (this.return_to_activity) {
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(undefined, false);
                Singleton.Get(LayerManager).getView(ui.ActivityView).open();
                this.return_to_activity = false;
            }
            else if (this.return_to_arena) {
                Singleton.Get(LayerManager).getView(ui.ArenaBaseView).open();
                this.return_to_arena = false;
            }
            else if (this.return_to_school) {
                Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
                this.return_to_school = false;
            }
            else if (this.return_to_guild) {
                GuildViewHandler.openMain();
                this.return_to_guild = false;
            }
            else {
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(undefined, false);
            }
            this.close();
        };
        RankView.prototype.close = function () {
            this.return_to_arena = false;
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**更新UI */
        RankView.prototype.onUpdate = function (time) {
        };
        return RankView;
    }(BaseUI));
    ui.RankView = RankView;
    __reflect(RankView.prototype, "ui.RankView");
})(ui || (ui = {}));
//# sourceMappingURL=RankView.js.map