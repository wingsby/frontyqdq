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
     * 入会申请列表
     */
    var GuildApplyView = (function (_super) {
        __extends(GuildApplyView, _super);
        function GuildApplyView() {
            var _this = _super.call(this, "yw.GuildApplySkin") || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        GuildApplyView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.m_entries = new eui.ArrayCollection();
            this.dg.dataProvider = this.m_entries;
            this.dg.itemRenderer = ui.GuildApplyItemRender;
        };
        GuildApplyView.prototype.onAddToStage = function () {
            this.labTitle.text = Template.getGUIText("ui_guild18");
            this.btnApplyAll.text = Template.getGUIText("ui_guild29");
            this.btnRejectAll.text = Template.getGUIText("ui_guild30");
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnApplyAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnApplyAll, this);
            this.btnRejectAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRejectAll, this);
        };
        GuildApplyView.prototype.onRemoveFromStage = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnApplyAll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnApplyAll, this);
            this.btnRejectAll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRejectAll, this);
        };
        /**创建界面时执行*/
        GuildApplyView.prototype.componentCreated = function () {
        };
        /**销毁界面时执行*/
        GuildApplyView.prototype.onDestroy = function () {
        };
        /**更新UI */
        GuildApplyView.prototype.onUpdate = function (time) {
        };
        GuildApplyView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.refresh();
        };
        GuildApplyView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        GuildApplyView.prototype.refresh = function (verbose) {
            var _this = this;
            if (verbose === void 0) { verbose = false; }
            Singleton.Get(GuildManager).reqInfoHrListLazy(verbose, function () {
                _this.initView();
            }, this);
        };
        GuildApplyView.prototype.initView = function () {
            var source = [];
            var inf_mg = Singleton.Get(GuildManager).getMyGuild();
            var applies = inf_mg.applies;
            for (var i = 0; i < applies.length; i++) {
                source.push({
                    id: i,
                    inf: applies[i],
                    status: ui.E_GUILD_APPLY_STATUS.NOT_HANDLE
                });
            }
            this.setEmpty(source.length <= 0);
            this.m_entries.source = source;
        };
        GuildApplyView.prototype.setEmpty = function (show) {
            this.compEmpty.visible = show;
            if (show) {
                this.compEmpty.text = "暂时没有新的入会申请哦";
                this.compEmpty.playAni();
            }
        };
        GuildApplyView.prototype.onClick_btnClose = function () {
            this.close();
            GuildViewHandler.refreshMain();
        };
        GuildApplyView.prototype.onClick_btnApplyAll = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnApplyAll, function () {
                Singleton.Get(GuildManager).reqHrHandleAll(function () {
                    for (var i = 0; i < _this.m_entries.length; i++) {
                        var item = _this.m_entries.getItemAt(i);
                        if (!item) {
                            continue;
                        }
                        var is_applied = !Singleton.Get(GuildManager).getMyGuild().hasUidApply(item.inf.uid);
                        _this.setItemStatus(i, is_applied ? ui.E_GUILD_APPLY_STATUS.APPLY : ui.E_GUILD_APPLY_STATUS.NOT_HANDLE);
                    }
                }, _this);
            }, this);
        };
        GuildApplyView.prototype.onClick_btnRejectAll = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnRejectAll, function () {
                Singleton.Get(GuildManager).reqHrRejectAll(function () {
                    for (var i = 0; i < _this.m_entries.length; i++) {
                        _this.setItemStatus(i, ui.E_GUILD_APPLY_STATUS.REJECT);
                    }
                }, _this);
            }, this);
        };
        GuildApplyView.prototype.setItemStatus = function (id, status) {
            var item = this.m_entries.getItemAt(id);
            if (!item) {
                return;
            }
            item.status = status;
            this.m_entries.itemUpdated(item);
        };
        return GuildApplyView;
    }(PopupUI));
    ui.GuildApplyView = GuildApplyView;
    __reflect(GuildApplyView.prototype, "ui.GuildApplyView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildApplyView.js.map