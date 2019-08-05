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
    var GuildWarListItemView = (function (_super) {
        __extends(GuildWarListItemView, _super);
        function GuildWarListItemView() {
            var _this = _super.call(this) || this;
            _this.m_engs = [];
            _this.m_stars = [];
            _this.data = {};
            _this.skinName = "yw.comp.GuildWarListItemSkin";
            return _this;
        }
        GuildWarListItemView.prototype.init = function () {
            this.m_engs = [this.imgEng0, this.imgEng1, this.imgEng2];
            this.m_stars = [this.imgStar0, this.imgStar1, this.imgStar2, this.imgStar3, this.imgStar4];
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        GuildWarListItemView.prototype.recycle = function () {
            this.x = 0;
            this.y = 0;
            this.m_engs = [];
            this.m_stars = [];
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        GuildWarListItemView.prototype.onAddToStage = function () {
            var inf_player = Singleton.Get(GuildWarManager).getInfo().getPlayerByUid(this.data.uid);
            if (inf_player) {
                this.visible = true;
            }
            else {
                this.visible = false;
                return;
            }
            this.currentState = this.data.is_enemy ? "enemy" : "my";
            this.setName(inf_player.username);
            this.setEng(Template.config.GuildDekaron - inf_player.tries);
            this.setLife(5 - inf_player.star_lost);
            this.setScore(inf_player.star_gain);
        };
        GuildWarListItemView.prototype.onRemoveFromStage = function () {
        };
        GuildWarListItemView.prototype.dataChanged = function () {
        };
        /**
         * 设定玩家名
         */
        GuildWarListItemView.prototype.setName = function (name) {
            this.labName.text = name != "" ? name : "？？？";
            this.labName.textColor = this.data.is_enemy ? DEFINE_COLOR.WARN_RED : DEFINE_COLOR.OK_GREEN;
            this.labName.validateNow();
            this.groupName.width = this.labName.width + 12;
        };
        /**
         * 设定能量余额
         */
        GuildWarListItemView.prototype.setEng = function (num) {
            if (num > 3) {
                num = 3;
            }
            if (num < 0) {
                num = 0;
            }
            for (var i = 0; i < this.m_engs.length; i++) {
                if (num > 0) {
                    num--;
                    ResManager.AsyncSetTexture(this.m_engs[i], "icon_xingdongli1_png");
                }
                else {
                    ResManager.AsyncSetTexture(this.m_engs[i], "icon_xingdongli2_png");
                }
            }
        };
        /**
         * 设定剩余生命值
         */
        GuildWarListItemView.prototype.setLife = function (num) {
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
        GuildWarListItemView.prototype.setScore = function (num) {
            this.labScore.text = "x" + num;
        };
        /**
         * 播放点击动画
         */
        GuildWarListItemView.prototype.playClickAni = function (callback, thisObj) {
            UtilsEffect.buttonEffect(this.groupName, callback, thisObj);
        };
        return GuildWarListItemView;
    }(eui.ItemRenderer));
    ui.GuildWarListItemView = GuildWarListItemView;
    __reflect(GuildWarListItemView.prototype, "ui.GuildWarListItemView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildWarListItemView.js.map