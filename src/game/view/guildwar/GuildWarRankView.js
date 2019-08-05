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
    var GuildWarRankView = (function (_super) {
        __extends(GuildWarRankView, _super);
        function GuildWarRankView() {
            return _super.call(this, "yw.GuildWarRankSkin") || this;
        }
        GuildWarRankView.prototype.componentCreated = function () {
            this.m_entries = new eui.ArrayCollection();
            this.dgList.dataProvider = this.m_entries;
            this.dgList.itemRenderer = ui.GuildItemRenderer;
            this.compEmpty.text = "还没有公会上榜哦";
        };
        GuildWarRankView.prototype.onDestroy = function () { };
        GuildWarRankView.prototype.onUpdate = function (time) { };
        GuildWarRankView.prototype.open = function () {
            var _this = this;
            Singleton.Get(GuildWarManager).reqWarRank(function () {
                Singleton.Get(LayerManager).getPopup().addPopup(_this);
                _this.initView();
                _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnClose, _this);
            }, this);
        };
        GuildWarRankView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        GuildWarRankView.prototype.onClick_btnClose = function () {
            this.close();
        };
        GuildWarRankView.prototype.initView = function () {
            var _this = this;
            var inf_dat = Singleton.Get(GuildManager).getInfo().war_list;
            if (!inf_dat) {
                inf_dat = [];
            }
            var source = [];
            for (var i = 0; i < inf_dat.length; i++) {
                source.push({
                    gid: inf_dat[i].id,
                    show_btn: false,
                    war_first: true
                });
            }
            this.m_entries.removeAll();
            this.m_entries.source = source;
            this.setEmpty();
            // 显示公会名次
            Singleton.Get(GuildWarManager).reqWarRank(function () {
                _this.initRank();
            }, this);
            this.labMyGuild.text = UtilsGame.stringHander("我的公会：$1 Lv.$2", Singleton.Get(GuildManager).getMyGuild().name, Singleton.Get(GuildManager).getMyGuild().lv);
        };
        GuildWarRankView.prototype.initRank = function () {
            var my_rank = Singleton.Get(GuildManager).getInfo().getMyGuildWarRank();
            this.labMyRank.text = Template.getGUIText("append_158") + "：" + ((my_rank > 0) ? my_rank.toString() : Template.getGUIText("ui_pve_35"));
        };
        GuildWarRankView.prototype.setEmpty = function () {
            if (this.m_entries.length > 0) {
                this.compEmpty.visible = false;
            }
            else {
                this.compEmpty.visible = true;
                this.compEmpty.playAni();
            }
        };
        return GuildWarRankView;
    }(PopupUI));
    ui.GuildWarRankView = GuildWarRankView;
    __reflect(GuildWarRankView.prototype, "ui.GuildWarRankView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildWarRankView.js.map