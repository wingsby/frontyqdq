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
     * 公会 ItemRenderer
     */
    var GuildItemRenderer = (function (_super) {
        __extends(GuildItemRenderer, _super);
        function GuildItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.GuildItemRendererSkin";
            return _this;
        }
        GuildItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.labPeople.text = Template.getGUIText("ui_guild8");
            this.btnApply.text = Template.getGUIText("ui_guild3");
            this.btnCancel.text = Template.getGUIText("ui_guild7");
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        GuildItemRenderer.prototype.onAddToStage = function () {
            this.btnApply.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnApply, this);
            this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCancel, this);
        };
        GuildItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnApply.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnApply, this);
            this.btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCancel, this);
        };
        GuildItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var my_guild_id = Singleton.Get(GuildManager).getInfo().gd_id;
            this.imgBg.texture = undefined;
            ResManager.AsyncSetTexture(this.imgBg, (this.data.gid == my_guild_id) ? "BG_gxjiangli_1_png" : "BG_gxjiangli_png");
            var inf_guild = undefined;
            if (this.data.war_first) {
                inf_guild = Singleton.Get(GuildManager).getInfo().getGuildInfoWar(this.data.gid);
            }
            else {
                inf_guild = Singleton.Get(GuildManager).getInfo().getGuildInfo(this.data.gid);
            }
            if (!inf_guild) {
                return;
            }
            this.setRank(inf_guild.rank);
            this.labLv.text = "Lv." + inf_guild.guild_lv;
            this.labGuildName.text = inf_guild.name + (inf_guild.zid > 0 ? " (S" + inf_guild.zid + ")" : "");
            this.labLeader.text = (inf_guild.chairman_name && inf_guild.chairman_name != "") ? inf_guild.chairman_name : Template.getGUIText("ui_ex_rank_15");
            this.labMemberCount.text = inf_guild.cnt_member + "/" + GuildUtil.getGuildMaxMember(inf_guild.guild_lv);
            if (inf_guild.fighting > 0) {
                this.labGuildFighting.text = UtilsGame.stringHander(Template.getGUIText("ui_guildwar18"), inf_guild.fighting);
            }
            else {
                this.labGuildFighting.text = "";
            }
            if (inf_guild.score >= 0) {
                this.labGuildScore.text = UtilsGame.stringHander(Template.getGUIText("ui_guildwar17"), inf_guild.score);
            }
            else {
                this.labGuildScore.text = "";
            }
            if (this.data.show_btn) {
                var is_applied = Singleton.Get(GuildManager).getInfo().isGuildApplied(this.data.gid);
                this.btnApply.visible = !is_applied;
                this.btnCancel.visible = is_applied;
                this.labGuildFighting.visible = false;
                this.labGuildScore.visible = false;
            }
            else {
                this.btnApply.visible = false;
                this.btnCancel.visible = false;
                this.labGuildFighting.visible = true;
                this.labGuildScore.visible = true;
            }
        };
        GuildItemRenderer.prototype.setRank = function (rank) {
            if (rank >= 1 && rank <= 3) {
                /// source的写法改为
                ResManager.AsyncSetTexture(this.imgRank, "icon_no" + rank + "_png");
                // ResManager.AsyncSetTexture(this.imgRankBgS, "BG_icon_no" + rank + "_png", undefined, this, true);
                this.imgRank.visible = true;
                // this.imgRankBgS.visible = true;
                this.labRank.visible = false;
            }
            else if (rank > 3) {
                this.imgRank.visible = false;
                // this.imgRankBgS.visible = false;
                this.labRank.visible = true;
                this.labRank.text = rank.toString();
            }
            else {
                this.imgRank.visible = false;
                this.labRank.visible = true;
                this.labRank.text = Template.getGUIText("ui_ex_rank_14");
            }
        };
        GuildItemRenderer.prototype.onClick_btnApply = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnApply, function () {
                var en_delta = Singleton.Get(GuildManager).getInfo().getEntranceDelta();
                if (en_delta > 0) {
                    Singleton.Get(DialogControler).showInfo(1146, _this, undefined, undefined, UtilsGame.dateToReadable(en_delta));
                    return;
                }
                Singleton.Get(GuildManager).reqHrApply(_this.data.gid, function () {
                    if (_this.data.show_btn) {
                        _this.btnApply.visible = false;
                        _this.btnCancel.visible = true;
                    }
                }, _this);
            }, this);
        };
        GuildItemRenderer.prototype.onClick_btnCancel = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnCancel, function () {
                Singleton.Get(GuildManager).reqHrRevoke(_this.data.gid, function () {
                    if (_this.data.show_btn) {
                        _this.btnApply.visible = true;
                        _this.btnCancel.visible = false;
                    }
                }, _this);
            }, this);
        };
        return GuildItemRenderer;
    }(eui.ItemRenderer));
    ui.GuildItemRenderer = GuildItemRenderer;
    __reflect(GuildItemRenderer.prototype, "ui.GuildItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=GuildItemRenderer.js.map