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
    var GuildWarPlayerView = (function (_super) {
        __extends(GuildWarPlayerView, _super);
        function GuildWarPlayerView() {
            var _this = _super.call(this, "yw.GuildWarPlayerSkin") || this;
            _this.m_stars = [];
            _this.m_is_enemy = false;
            _this.m_uid = "";
            _this.m_log_entries = new eui.ArrayCollection;
            _this.dgLog.dataProvider = _this.m_log_entries;
            _this.dgLog.itemRenderer = ui.GuildWarLogItemRenderer;
            return _this;
        }
        GuildWarPlayerView.prototype.componentCreated = function () { };
        GuildWarPlayerView.prototype.onDestroy = function () { };
        GuildWarPlayerView.prototype.onUpdate = function (time) { };
        GuildWarPlayerView.prototype.open = function (is_enemy, uid) {
            var _this = this;
            this.labCantAtk.text = Template.getGUIText("ui_guildwar28");
            this.m_stars = [this.imgMyStar0, this.imgMyStar1, this.imgMyStar2, this.imgMyStar3, this.imgMyStar4];
            this.m_is_enemy = is_enemy;
            this.m_uid = uid;
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initEmptyView();
            Singleton.Get(GuildWarManager).reqPlayer(is_enemy, this.m_uid, function () {
                _this.initView();
            }, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnStart, this);
        };
        GuildWarPlayerView.prototype.close = function () {
            this.m_stars = [];
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.m_is_enemy = false;
            this.m_uid = "";
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnStart, this);
        };
        GuildWarPlayerView.prototype.onClick_btnClose = function () {
            this.close();
        };
        GuildWarPlayerView.prototype.onClick_btnStart = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnStart, function () {
                // 如果敌方剩余星数为0 则无法挑战
                var inf_player = Singleton.Get(GuildWarManager).getInfo().getPlayerByUid(_this.m_uid);
                if (inf_player.star_lost >= 5) {
                    return;
                }
                // 剩余次数不足
                var my_cst = Singleton.Get(GuildWarManager).getInfo().getCurCsd();
                if (my_cst >= Template.config.GuildDekaron) {
                    Singleton.Get(DialogControler).showString(Template.getGUIText("append_156"));
                    return;
                }
                Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.GUILD, battle.E_BATTLE_BEHAVIOR.POSITIVE, undefined, undefined, _this.m_uid);
            }, this);
        };
        GuildWarPlayerView.prototype.initEmptyView = function () {
            this.groupEmpty.visible = true;
            this.groupContent.visible = false;
        };
        GuildWarPlayerView.prototype.initView = function () {
            this.groupEmpty.visible = false;
            this.groupContent.visible = true;
            var inf_player = Singleton.Get(GuildWarManager).getInfo().getPlayerByUid(this.m_uid);
            this.labName.text = (inf_player.username != "") ? inf_player.username : "？？？";
            this.labFighting.text = (inf_player.fighting > 0) ? inf_player.fighting.toString() : "？？？";
            this.setLife(5 - inf_player.star_lost);
            this.setScore(inf_player.star_gain);
            this.setBtnStart(this.m_is_enemy, 5 - inf_player.star_lost);
            this.initLogs(this.m_uid);
        };
        /**
         * 设定剩余生命值
         */
        GuildWarPlayerView.prototype.setLife = function (num) {
            if (num > 5) {
                num = 5;
            }
            if (num < 0) {
                num = 0;
            }
            if (num == 5) {
                ResManager.AsyncSetTexture(this.imgHouse, "gonghuizhan_jianzhu_png");
            }
            else if (num == 0) {
                ResManager.AsyncSetTexture(this.imgHouse, "gonghuizhan_jianzhu2_png");
            }
            else {
                ResManager.AsyncSetTexture(this.imgHouse, "gonghuizhan_jianzhu1_png");
            }
            for (var i = 0; i < this.m_stars.length; i++) {
                if (num > 0) {
                    num--;
                    ResManager.AsyncSetTexture(this.m_stars[i], "gonghuizhan_xing1_png");
                }
                else {
                    ResManager.AsyncSetTexture(this.m_stars[i], "gonghuizhan_xing3_png");
                }
            }
        };
        /**
         * 设定积分（掠夺星数）
         */
        GuildWarPlayerView.prototype.setScore = function (num) {
            this.labScore.text = "x" + num;
        };
        /**
         * 设定挑战按钮状态
         */
        GuildWarPlayerView.prototype.setBtnStart = function (is_enemy, life) {
            if (!is_enemy) {
                this.btnStart.visible = false;
                this.labCantAtk.visible = false;
            }
            else {
                if (life > 0) {
                    this.btnStart.visible = true;
                    this.labCantAtk.visible = false;
                }
                else {
                    this.btnStart.visible = false;
                    this.labCantAtk.visible = true;
                }
            }
        };
        /**
         * 设定Log状态
         */
        GuildWarPlayerView.prototype.initLogs = function (uid) {
            // 根据uid获取战报列表
            var logs = Singleton.Get(GuildWarManager).getInfo().getLogsByUid(uid);
            if (!logs) {
                logs = [];
            }
            var source = [];
            for (var i = logs.length - 1; i >= 0; i--) {
                source.push({
                    uid: uid,
                    log_id: logs[i].id
                });
            }
            this.m_log_entries.removeAll();
            this.m_log_entries.source = source;
        };
        return GuildWarPlayerView;
    }(PopupUI));
    ui.GuildWarPlayerView = GuildWarPlayerView;
    __reflect(GuildWarPlayerView.prototype, "ui.GuildWarPlayerView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildWarPlayerView.js.map