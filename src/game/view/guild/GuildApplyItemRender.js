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
    var E_GUILD_APPLY_STATUS;
    (function (E_GUILD_APPLY_STATUS) {
        E_GUILD_APPLY_STATUS[E_GUILD_APPLY_STATUS["NOT_HANDLE"] = 0] = "NOT_HANDLE";
        E_GUILD_APPLY_STATUS[E_GUILD_APPLY_STATUS["APPLY"] = 1] = "APPLY";
        E_GUILD_APPLY_STATUS[E_GUILD_APPLY_STATUS["REJECT"] = 2] = "REJECT"; // 已拒绝
    })(E_GUILD_APPLY_STATUS = ui.E_GUILD_APPLY_STATUS || (ui.E_GUILD_APPLY_STATUS = {}));
    /**
     * 入会申请列表 ItemRenderer
     */
    var GuildApplyItemRender = (function (_super) {
        __extends(GuildApplyItemRender, _super);
        function GuildApplyItemRender() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.GuildApplyItemRenderSkin";
            _this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        GuildApplyItemRender.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.btnApply.text = Template.getGUIText("ui_guild31");
            this.btnReject.text = Template.getGUIText("ui_guild32");
        };
        GuildApplyItemRender.prototype.onAddToStage = function () {
            this.btnApply.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnApply, this);
            this.btnReject.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReject, this);
        };
        GuildApplyItemRender.prototype.onRemoveFromStage = function () {
            this.btnApply.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnApply, this);
            this.btnReject.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReject, this);
        };
        GuildApplyItemRender.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.setPlayer(this.data.inf);
        };
        GuildApplyItemRender.prototype.setPlayer = function (inf) {
            ResManager.asyncsetHeadImg(inf.avatar, this.imgAvatar, this);
            // 基本信息
            this.labName.text = inf.username;
            this.labLv.text = inf.team_lv.toString();
            this.labFighting.text = inf.fighting.toString();
            // VIP等级
            if (inf.vip > 0) {
                this.groupVip.visible = true;
                this.labVipLevel.text = inf.vip.toString();
            }
            else {
                this.groupVip.visible = false;
            }
            // 操作按钮
            switch (this.data.status) {
                case E_GUILD_APPLY_STATUS.NOT_HANDLE:
                    var inf_mg = Singleton.Get(GuildManager).getMyGuild();
                    var place = inf_mg.getMyPlace();
                    switch (place) {
                        case E_GUILD_PLACE.LEADER:
                        case E_GUILD_PLACE.RULER:
                            this.groupResult.visible = false;
                            this.groupOper.visible = true;
                            break;
                        default:
                            this.groupResult.visible = false;
                            this.groupOper.visible = false;
                            break;
                    }
                    break;
                case E_GUILD_APPLY_STATUS.APPLY:
                    this.labResult.textFlow = new egret.HtmlTextParser().parser('<font color="#' + DEFINE_COLOR.OK_GREEN.toString(16) + '">已批准</font>');
                    this.groupResult.visible = true;
                    this.groupOper.visible = false;
                    break;
                case E_GUILD_APPLY_STATUS.REJECT:
                    this.labResult.textFlow = new egret.HtmlTextParser().parser('<font color="#' + DEFINE_COLOR.WARN_RED.toString(16) + '">已拒绝</font>');
                    this.groupResult.visible = true;
                    this.groupOper.visible = false;
                    break;
            }
        };
        GuildApplyItemRender.prototype.onClick_btnApply = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnApply, function () {
                Singleton.Get(GuildManager).reqHrHandle(_this.data.inf.uid, function () {
                    Singleton.Get(LayerManager).getView(ui.GuildApplyView).setItemStatus(_this.data.id, E_GUILD_APPLY_STATUS.APPLY);
                }, _this);
            }, this);
        };
        GuildApplyItemRender.prototype.onClick_btnReject = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnReject, function () {
                Singleton.Get(GuildManager).reqHrReject(_this.data.inf.uid, function () {
                    Singleton.Get(LayerManager).getView(ui.GuildApplyView).setItemStatus(_this.data.id, E_GUILD_APPLY_STATUS.REJECT);
                }, _this);
            }, this);
        };
        return GuildApplyItemRender;
    }(eui.ItemRenderer));
    ui.GuildApplyItemRender = GuildApplyItemRender;
    __reflect(GuildApplyItemRender.prototype, "ui.GuildApplyItemRender");
})(ui || (ui = {}));
//# sourceMappingURL=GuildApplyItemRender.js.map