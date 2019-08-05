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
    var DuelBattleAvatarView = (function (_super) {
        __extends(DuelBattleAvatarView, _super);
        /**
         * @constructor
         */
        function DuelBattleAvatarView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.DuelBattleAvatarSkin";
            return _this;
        }
        /**
         * 响应数据变更
         */
        DuelBattleAvatarView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.initAvatar(this.data.my_role);
            this.initStatus(this.data.is_dead);
            if (UtilsGame.Now() - Singleton.Get(ui.ArenaBattleView).last_duel_start < 500) {
                this.playAni(this.data.is_left, this.data.ani_idx);
            }
        };
        /**
         * 初始化头像信息
         */
        DuelBattleAvatarView.prototype.initAvatar = function (my_role) {
            var role_id = my_role.role_id;
            var role_info = Template.role.get(role_id);
            var talent_info = my_role.getTalentInfo();
            this.imgLv.text = my_role.lv.toString();
            ResManager.AsyncSetTexture(this.imgIcon, role_info.Icon);
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(my_role.getAwakenStar(), my_role.getAwakenActiveStar()));
            ResManager.AsyncSetTexture(this.imgTier, Common.getRoleTierBgResEx(role_info.Star));
            ResManager.AsyncSetTexture(this.imgTierSub, Common.getRoleTierSubResEx(role_info.Star));
        };
        /**
         * 设定是否团灭
         * @param is_dead 队伍是否团灭
         */
        DuelBattleAvatarView.prototype.initStatus = function (is_dead) {
            var _this = this;
            if (this.groupDead.visible == false && is_dead) {
                this.groupDead.visible = true;
                this.groupDead.alpha = 0;
                this.groupDead.scaleX = 3;
                this.groupDead.scaleY = 3;
                var tw = egret.Tween.get(this.groupDead);
                tw.to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineIn).call(function () {
                    egret.Tween.removeTweens(_this.groupDead);
                }, this);
            }
            else {
                this.groupDead.visible = is_dead;
            }
        };
        DuelBattleAvatarView.prototype.playAni = function (left, ani_idx) {
            this.groupRoot.alpha = 0;
            this.groupRoot.y = 50;
            this.groupRoot.x = left ? -100 : 100;
            this.groupRoot.scaleX = 2.5;
            this.groupRoot.scaleY = 2.5;
            var tw = egret.Tween.get(this.groupRoot);
            tw.wait(1000).wait(100 * (ani_idx + 1)).to({ alpha: 1, x: 0, y: 0, scaleX: 1, scaleY: 1 }, 150, egret.Ease.sineOut);
        };
        return DuelBattleAvatarView;
    }(eui.ItemRenderer));
    ui.DuelBattleAvatarView = DuelBattleAvatarView;
    __reflect(DuelBattleAvatarView.prototype, "ui.DuelBattleAvatarView");
})(ui || (ui = {}));
//# sourceMappingURL=DuelBattleAvatarSkin.js.map