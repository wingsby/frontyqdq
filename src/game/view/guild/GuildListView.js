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
    /**
     * 公会列表
     */
    var GuildListView = (function (_super) {
        __extends(GuildListView, _super);
        function GuildListView() {
            var _this = _super.call(this, "yw.GuildListSkin") || this;
            _this.m_is_search = false; // 是否在搜索中
            return _this;
        }
        GuildListView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        GuildListView.prototype.componentCreated = function () {
            this.tabTitle.active = false;
            this.tabTitle.text = Template.getGUIText("ui_guild2");
            this.btnCreate.text = Template.getGUIText("ui_guild5");
            this.btnSearch.text = Template.getGUIText("ui_guild4");
            this.btnRefresh.text = Template.getGUIText("ui_arena12");
            this.edtSearch.prompt = Template.getGUIText("ui_guild6");
            this.m_guilds = new eui.ArrayCollection();
            this.dgGuild.dataProvider = this.m_guilds;
            this.dgGuild.itemRenderer = ui.GuildItemRenderer;
            this.m_search = new eui.ArrayCollection();
            this.dgSearch.dataProvider = this.m_search;
            this.dgSearch.itemRenderer = ui.GuildItemRenderer;
            this.btnRefresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRefresh, this);
            this.btnSearch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSearch, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnCreate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCreate, this);
        };
        GuildListView.prototype.onDestroy = function () {
            this.btnRefresh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRefresh, this);
            this.btnSearch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSearch, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnCreate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCreate, this);
        };
        GuildListView.prototype.onUpdate = function (time) {
        };
        GuildListView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.refresh(true);
            this.showSearch(false);
            Common.playStackAni(this.btnBack, [this.tabTitle]);
        };
        GuildListView.prototype.close = function () {
            Singleton.Get(LayerManager).removeView(this);
        };
        GuildListView.prototype.refresh = function (renew, verbose) {
            var _this = this;
            if (verbose === void 0) { verbose = false; }
            if (renew) {
                Singleton.Get(GuildManager).reqInfoListIntededLazy(verbose, function () {
                    _this.initView();
                }, this);
            }
            else {
                this.initView();
            }
        };
        GuildListView.prototype.onClick_btnRefresh = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnRefresh, function () {
                _this.refresh(true, true);
            }, this);
        };
        GuildListView.prototype.onClick_btnSearch = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnSearch, function () {
                if (_this.edtSearch.text != "") {
                    Singleton.Get(GuildManager).reqSearch(_this.edtSearch.text, function () {
                        _this.initSearch();
                        _this.showSearch(true);
                        if (!_this.m_is_search) {
                            Common.playStackAni(_this.btnBack, [_this.tabTitle]);
                        }
                    }, _this);
                }
            }, this);
        };
        GuildListView.prototype.onClick_btnClose = function () {
            if (this.m_is_search) {
                this.refresh(true);
                this.showSearch(false);
                Common.playStackAni(this.btnBack, [this.tabTitle]);
            }
            else {
                GuildViewHandler.closeAfter();
                GuildViewHandler.closeAll();
            }
        };
        GuildListView.prototype.onClick_btnCreate = function () {
            UtilsEffect.buttonEffect(this.btnCreate, function () {
                GuildViewHandler.openCreate();
            }, this);
        };
        GuildListView.prototype.initView = function () {
            var source = [];
            var info = Singleton.Get(GuildManager).getInfo();
            for (var i = 0; i < info.my_applies.length; i++) {
                source.push({
                    gid: info.my_applies[i].id,
                    rank: info.my_applies[i].rank,
                    applied: true,
                    show_btn: true
                });
            }
            for (var i = 0; i < info.my_appliable.length; i++) {
                source.push({
                    gid: info.my_appliable[i].id,
                    rank: info.my_appliable[i].rank,
                    applied: false,
                    show_btn: true
                });
            }
            source.sort(this.sort);
            this.m_guilds.source = source;
            this.showListEmpty();
        };
        GuildListView.prototype.initSearch = function () {
            var source = [];
            var info = Singleton.Get(GuildManager).getInfo();
            for (var i = 0; i < info.my_search.length; i++) {
                source.push({
                    gid: info.my_search[i].id,
                    rank: info.my_search[i].rank,
                    applied: false,
                    show_btn: true
                });
            }
            this.m_search.source = source;
            this.showSearchEmpty();
        };
        GuildListView.prototype.showSearch = function (show) {
            this.m_is_search = show;
            if (show) {
                this.groupGuild.visible = false;
                this.groupSearch.visible = true;
                this.tabTitle.text = "公会搜索";
            }
            else {
                this.groupGuild.visible = true;
                this.groupSearch.visible = false;
                this.tabTitle.text = "公会列表";
            }
        };
        GuildListView.prototype.showSearchEmpty = function () {
            this.compSearchEmpty.visible = this.m_search.length <= 0;
            this.compSearchEmpty.text = "没有找到该公会ID";
            this.compSearchEmpty.playAni();
        };
        GuildListView.prototype.showListEmpty = function () {
            this.compListEmpty.visible = this.m_guilds.length <= 0;
            this.compListEmpty.text = "本区还没有公会";
            this.compListEmpty.playAni();
        };
        GuildListView.prototype.sort = function (a, b) {
            if (a.applied != b.applied) {
                if (a.applied) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            if (a.rank != b.rank) {
                if (!a.rank || !b.rank) {
                    if (!a.rank) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                else {
                    if (a.rank > b.rank) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
            }
            return 0;
        };
        return GuildListView;
    }(PopupUI));
    ui.GuildListView = GuildListView;
    __reflect(GuildListView.prototype, "ui.GuildListView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildListView.js.map