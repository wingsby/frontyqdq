var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var battle;
(function (battle) {
    var FollowEffect = (function (_super) {
        __extends(FollowEffect, _super);
        /**
         * 构造函数
         */
        function FollowEffect(mcName, mcJson, textureName) {
            return _super.call(this, mcName, mcJson, textureName) || this;
        }
        FollowEffect.prototype.UpdateBullet = function () {
            if (this.m_startShoot) {
                this.m_targetPosx = this.m_target.x;
                this.m_targetPosy = this.m_target.y - this.m_target.m_roleCenter;
                this.CalDirectionAndSpeed(true); /// 默认要转向
                /// 更新位移
                _super.prototype.UpdateBullet.call(this);
            }
        };
        return FollowEffect;
    }(battle.BulletEffect));
    battle.FollowEffect = FollowEffect;
    __reflect(FollowEffect.prototype, "battle.FollowEffect");
})(battle || (battle = {}));
//# sourceMappingURL=FollowEffect.js.map