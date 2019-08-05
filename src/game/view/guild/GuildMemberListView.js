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
     * 公会成员列表
     */
    var GuildMemberListView = (function (_super) {
        __extends(GuildMemberListView, _super);
        function GuildMemberListView() {
            return _super.call(this, "yw.GuildMemberListSkin") || this;
        }
        GuildMemberListView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.m_entries = new eui.ArrayCollection();
            this.dg.dataProvider = this.m_entries;
            this.dg.itemRenderer = ui.GuildMemberItemRenderer;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        GuildMemberListView.prototype.componentCreated = function () {
        };
        GuildMemberListView.prototype.onDestroy = function () {
        };
        GuildMemberListView.prototype.onUpdate = function (time) {
        };
        GuildMemberListView.prototype.onAddToStage = function () {
            this.btnExit.text = "退出公会";
            this.btnDissolve.text = "解散公会";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExit, this);
            this.btnDissolve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDissolve, this);
        };
        GuildMemberListView.prototype.onRemoveFromStage = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnExit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExit, this);
            this.btnDissolve.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDissolve, this);
        };
        GuildMemberListView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.refresh();
        };
        GuildMemberListView.prototype.refresh = function (verbose, force) {
            var _this = this;
            if (verbose === void 0) { verbose = false; }
            if (force === void 0) { force = false; }
            if (force) {
                Singleton.Get(GuildManager).reqInfoMembers(function () {
                    _this.initView();
                    _this.initOpers();
                }, this);
            }
            else {
                Singleton.Get(GuildManager).reqInfoMembersLazy(verbose, function () {
                    _this.initView();
                    _this.initOpers();
                }, this);
            }
        };
        GuildMemberListView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        GuildMemberListView.prototype.onClick_btnClose = function () {
            this.close();
        };
        GuildMemberListView.prototype.initView = function () {
            // 成员列表
            var source = [];
            var inf_mg = Singleton.Get(GuildManager).getMyGuild();
            for (var i = 0; i < inf_mg.members.length; i++) {
                source.push({
                    inf: inf_mg.members[i]
                });
            }
            source.sort(this.sort);
            this.m_entries.source = source;
            // 成员数
            this.labMemberCount.text = inf_mg.members.length + "/" + GuildUtil.getGuildMaxMember(inf_mg.lv);
        };
        GuildMemberListView.prototype.initOpers = function () {
            var my_place = Singleton.Get(GuildManager).getMyGuild().getMyPlace();
            switch (my_place) {
                case E_GUILD_PLACE.LEADER:
                    this.btnDissolve.visible = true;
                    this.btnExit.visible = false;
                    break;
                case E_GUILD_PLACE.RULER:
                case E_GUILD_PLACE.ELITE:
                case E_GUILD_PLACE.MEMBER:
                    this.btnDissolve.visible = false;
                    this.btnExit.visible = true;
                    break;
                default:
                    this.btnDissolve.visible = false;
                    this.btnExit.visible = false;
                    break;
            }
        };
        GuildMemberListView.prototype.sort = function (a, b) {
            var inf_mg = Singleton.Get(GuildManager).getMyGuild();
            var a_place = inf_mg.getMemberPlace(a.inf.uid);
            var b_place = inf_mg.getMemberPlace(b.inf.uid);
            if (a_place != b_place) {
                if (a_place > b_place) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            if (a.inf.dnt != b.inf.dnt) {
                if (a.inf.dnt > b.inf.dnt) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            if (a.inf.dnt_kyo != b.inf.dnt_kyo) {
                if (a.inf.dnt_kyo > b.inf.dnt_kyo) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            if (a.inf.team_lv != b.inf.team_lv) {
                if (a.inf.team_lv > b.inf.team_lv) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            return 0;
        };
        GuildMemberListView.prototype.onClick_btnExit = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnExit, function () {
                Singleton.Get(DialogControler).showInfo(1161, _this, function () {
                    Singleton.Get(GuildManager).reqHrExit(function () {
                        _this.close();
                        GuildViewHandler.openMain();
                    }, _this);
                });
            }, this);
        };
        GuildMemberListView.prototype.onClick_btnDissolve = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnDissolve, function () {
                var my_place = Singleton.Get(GuildManager).getMyGuild().getMyPlace();
                if (my_place != E_GUILD_PLACE.LEADER) {
                    // 不是会长 无权操作
                    return;
                }
                Singleton.Get(DialogControler).showInfo(1159, _this, function () {
                    Singleton.Get(GuildManager).reqDissolve(function () {
                        _this.close();
                        GuildViewHandler.openMain();
                    }, _this);
                });
            }, this);
        };
        return GuildMemberListView;
    }(PopupUI));
    ui.GuildMemberListView = GuildMemberListView;
    __reflect(GuildMemberListView.prototype, "ui.GuildMemberListView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildMemberListView.js.map