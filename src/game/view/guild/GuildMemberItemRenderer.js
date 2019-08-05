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
     * 公会成员列表ItemRenderer
     */
    var GuildMemberItemRenderer = (function (_super) {
        __extends(GuildMemberItemRenderer, _super);
        function GuildMemberItemRenderer() {
            var _this = _super.call(this) || this;
            _this.m_last_tick = 0;
            _this.skinName = "yw.GuildMemberItemRendererSkin";
            return _this;
        }
        GuildMemberItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.btnOper.text = "操作";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        GuildMemberItemRenderer.prototype.onAddToStage = function () {
            this.m_last_tick = 0;
            // Singleton.Get(RegisterUpdate).register(this);
            this.btnOper.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOper, this);
        };
        GuildMemberItemRenderer.prototype.onRemoveFromStage = function () {
            // Singleton.Get(RegisterUpdate).unRegister(this);
            this.btnOper.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOper, this);
        };
        GuildMemberItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.setPlayer(this.data.inf);
        };
        GuildMemberItemRenderer.prototype.update = function (time) {
            // 更新在线状态/离线时间
            if (UtilsGame.Now() - this.m_last_tick > 30000) {
                this.m_last_tick = UtilsGame.Now();
                this.setOnline();
            }
        };
        GuildMemberItemRenderer.prototype.setPlayer = function (inf) {
            ResManager.asyncsetHeadImg(inf.avatar, this.imgAvatar, this);
            // 基本信息
            this.setOnline();
            this.setDonation();
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
            // 身份
            var inf_mg = Singleton.Get(GuildManager).getMyGuild();
            var place = inf_mg.getMemberPlace(inf.uid);
            this.imgLeader.visible = false;
            this.imgRuler.visible = false;
            switch (place) {
                case E_GUILD_PLACE.LEADER:
                    this.imgLeader.visible = true;
                    break;
                case E_GUILD_PLACE.RULER:
                    this.imgRuler.visible = true;
                    break;
                default:
                    break;
            }
            // 设定操作按钮
            this.setOper(place);
        };
        GuildMemberItemRenderer.prototype.setOnline = function () {
            var last_time = this.data.inf.last_btt;
            var delta = UtilsGame.Now() - last_time;
            var str_ol = "<font color='#" + DEFINE_COLOR.OK_GREEN.toString(16) + "'>（在线）</font>";
            if (delta > (Template.config.battlelimit + Template.config.battletime + Template.config.addspeed) * 2) {
                str_ol = "<font color='#" + DEFINE_COLOR.TEXT_GRAY.toString(16) + "'>（离线" + UtilsGame.dateToReadable(delta) + "）</font>";
            }
            this.labName.textFlow = new egret.HtmlTextParser().parser(this.data.inf.username + " " + str_ol);
        };
        GuildMemberItemRenderer.prototype.setDonation = function () {
            var dnt = UtilsGame.numberToString(this.data.inf.dnt);
            var dnt_kyo = UtilsGame.numberToString(this.data.inf.dnt_kyo);
            this.labDonation.text = UtilsGame.stringHander("$1（今日：$2）", dnt, dnt_kyo);
        };
        GuildMemberItemRenderer.prototype.setOper = function (place) {
            var inf_mg = Singleton.Get(GuildManager).getMyGuild();
            var my_place = inf_mg.getMyPlace();
            this.btnOper.visible = false;
            switch (my_place) {
                case E_GUILD_PLACE.LEADER:
                    if (place < E_GUILD_PLACE.LEADER) {
                        this.btnOper.visible = true;
                    }
                    break;
                case E_GUILD_PLACE.RULER:
                    if (place < E_GUILD_PLACE.RULER) {
                        this.btnOper.visible = true;
                    }
                    break;
            }
        };
        GuildMemberItemRenderer.prototype.onClick_btnOper = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnOper, function () {
                GuildViewHandler.openMemberOper(_this.data.inf.uid);
            }, this);
        };
        return GuildMemberItemRenderer;
    }(eui.ItemRenderer));
    ui.GuildMemberItemRenderer = GuildMemberItemRenderer;
    __reflect(GuildMemberItemRenderer.prototype, "ui.GuildMemberItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=GuildMemberItemRenderer.js.map