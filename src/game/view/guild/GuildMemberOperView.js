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
     * 成员操作
     */
    var GuildMemberOperView = (function (_super) {
        __extends(GuildMemberOperView, _super);
        function GuildMemberOperView() {
            var _this = _super.call(this, "yw.GuildMemberOperSkin") || this;
            _this.m_uid = "";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        GuildMemberOperView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        GuildMemberOperView.prototype.componentCreated = function () {
        };
        GuildMemberOperView.prototype.onDestroy = function () {
        };
        GuildMemberOperView.prototype.onUpdate = function (time) {
        };
        GuildMemberOperView.prototype.onAddToStage = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnTransLeader.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTransLeader, this);
            this.btnSetRuler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSetRuler, this);
            this.btnDismiss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDismiss, this);
        };
        GuildMemberOperView.prototype.onRemoveFromStage = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnTransLeader.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTransLeader, this);
            this.btnSetRuler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSetRuler, this);
            this.btnDismiss.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDismiss, this);
        };
        GuildMemberOperView.prototype.open = function (uid) {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.m_uid = uid;
            this.initView();
        };
        GuildMemberOperView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.m_uid = "";
        };
        GuildMemberOperView.prototype.initView = function () {
            // 根据玩家职位设定显示按钮的状态
            var my_place = Singleton.Get(GuildManager).getMyGuild().getMyPlace();
            switch (my_place) {
                case E_GUILD_PLACE.LEADER:
                    this.currentState = "leader";
                    break;
                case E_GUILD_PLACE.RULER:
                    this.currentState = "ruler";
                    break;
                default:
                    this.currentState = "member";
                    break;
            }
            // 设定副会长任命撤销按钮状态
            var target_place = Singleton.Get(GuildManager).getMyGuild().getMemberPlace(this.m_uid);
            if (target_place != E_GUILD_PLACE.RULER) {
                this.btnSetRuler.text = "设为副会长";
            }
            else {
                this.btnSetRuler.text = "撤销副会长";
            }
            // 设定其他按钮文字
            this.btnTransLeader.text = "转让会长";
            this.btnDismiss.text = "开 除";
        };
        GuildMemberOperView.prototype.onClick_btnClose = function () {
            this.close();
        };
        GuildMemberOperView.prototype.onClick_btnTransLeader = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnTransLeader, function () {
                Singleton.Get(GuildManager).reqHrLeaderSet(_this.m_uid, function () {
                    _this.close();
                    GuildViewHandler.refreshMembers(false, true);
                }, _this);
            }, this);
        };
        GuildMemberOperView.prototype.onClick_btnSetRuler = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnSetRuler, function () {
                // 根据目标当前职位决定是任命还是撤职
                var target_place = Singleton.Get(GuildManager).getMyGuild().getMemberPlace(_this.m_uid);
                if (target_place != E_GUILD_PLACE.RULER) {
                    Singleton.Get(GuildManager).reqHrRulerSet(_this.m_uid, function () {
                        _this.close();
                        GuildViewHandler.refreshMembers(false, true);
                    }, _this);
                }
                else {
                    Singleton.Get(GuildManager).reqHrRulerRelieve(_this.m_uid, function () {
                        _this.close();
                        GuildViewHandler.refreshMembers(false, true);
                    }, _this);
                }
            }, this);
        };
        GuildMemberOperView.prototype.onClick_btnDismiss = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnDismiss, function () {
                Singleton.Get(DialogControler).showInfo(1160, _this, function () {
                    Singleton.Get(GuildManager).reqHrDismiss(_this.m_uid, function () {
                        _this.close();
                        GuildViewHandler.refreshMembers(false, true);
                    }, _this);
                });
            }, this);
        };
        return GuildMemberOperView;
    }(PopupUI));
    ui.GuildMemberOperView = GuildMemberOperView;
    __reflect(GuildMemberOperView.prototype, "ui.GuildMemberOperView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildMemberOperView.js.map