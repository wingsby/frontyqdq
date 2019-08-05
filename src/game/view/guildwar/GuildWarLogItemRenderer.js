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
    var GuildWarLogItemRenderer = (function (_super) {
        __extends(GuildWarLogItemRenderer, _super);
        function GuildWarLogItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.comp.GuildWarLogItemRenderSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        GuildWarLogItemRenderer.prototype.onAddToStage = function () {
            this.btnReplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReplay, this);
        };
        GuildWarLogItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnReplay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReplay, this);
        };
        GuildWarLogItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            // 生成语句
            var inf_log = Singleton.Get(GuildWarManager).getInfo().getLogById(this.data.log_id);
            if (!inf_log) {
                return;
            }
            var info = Singleton.Get(GuildWarManager).getInfo();
            var is_enemy = info.getUidIsEnemy(this.data.uid);
            var ene_name_tmp = '<font color="#E61919">$1</font>';
            var my_name_tmp = '<font color="#2CE813">$1</font>';
            var me_name_tmp = '<font color="#FF9600">你</font>';
            var atk_is_ene = info.getUidIsEnemy(inf_log.atk_uid);
            var ene_uid = "";
            var my_uid = "";
            if (atk_is_ene) {
                ene_uid = inf_log.atk_uid;
                my_uid = inf_log.def_uid;
            }
            else {
                ene_uid = inf_log.def_uid;
                my_uid = inf_log.atk_uid;
            }
            var inf_ene = info.getPlayerByUid(ene_uid);
            var ene_name = UtilsGame.stringHander(ene_name_tmp, inf_ene.username != "" ? inf_ene.username : "？？？");
            var inf_my = info.getPlayerByUid(my_uid);
            var my_is_me = Singleton.Get(LoginManager).loginInfo._id == my_uid;
            var my_name = my_is_me ? me_name_tmp : UtilsGame.stringHander(my_name_tmp, inf_my.username);
            var star_off = inf_log.star > 0;
            // 根据当前查看的玩家是否是敌人区分
            var text_res = "";
            if (is_enemy) {
                var tmp = this.getTextTmp(info.getUidIsEnemy(inf_log.atk_uid), star_off);
                text_res = UtilsGame.stringHander(UtilsGame.stringHander(tmp, ene_name, my_name, inf_log.star), ene_name, my_name, inf_log.star);
            }
            else {
                var tmp = this.getTextTmp(!info.getUidIsEnemy(inf_log.atk_uid), star_off);
                text_res = UtilsGame.stringHander(UtilsGame.stringHander(tmp, my_name, ene_name, inf_log.star), my_name, ene_name, inf_log.star);
            }
            this.labText.textFlow = new egret.HtmlTextParser().parser(text_res);
        };
        /**
         * 获取战报文字模板
         */
        GuildWarLogItemRenderer.prototype.getTextTmp = function (is_atk, star_off) {
            var result = "";
            if (is_atk) {
                if (star_off) {
                    result = "ui_guildwar15";
                }
                else {
                    result = "ui_guildwar16";
                }
            }
            else {
                if (star_off) {
                    result = "ui_guildwar14";
                }
                else {
                    result = "ui_guildwar13";
                }
            }
            return Template.getGUIText(result);
        };
        GuildWarLogItemRenderer.prototype.onClick_btnReplay = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnReplay, function () {
                Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.GUILD_LOG, battle.E_BATTLE_BEHAVIOR.POSITIVE, undefined, undefined, _this.data.log_id, _this.data.uid);
            }, this);
        };
        return GuildWarLogItemRenderer;
    }(eui.ItemRenderer));
    ui.GuildWarLogItemRenderer = GuildWarLogItemRenderer;
    __reflect(GuildWarLogItemRenderer.prototype, "ui.GuildWarLogItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=GuildWarLogItemRenderer.js.map