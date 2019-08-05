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
    var BulletEffect = (function (_super) {
        __extends(BulletEffect, _super);
        /**
         * 构造函数
         */
        function BulletEffect(mcName, mcJson, textureName) {
            var _this = _super.call(this, mcName, mcJson, textureName) || this;
            _this.m_target = null;
            _this.m_skillID = null;
            _this.m_targetPosx = 0;
            _this.m_targetPosy = 0;
            _this.m_pixelPreFrame = 5;
            _this.m_pixelPreFramex = 1;
            _this.m_pixelPreFramey = 1;
            _this.m_cosSpeed = 0;
            _this.m_sinSpeed = 0;
            _this.m_collision = 1;
            _this.m_direction = 1;
            _this.m_startShoot = false;
            _this.m_parentBattleRenderer = null;
            _this.m_bPause = false;
            /// 投掷物与角色锚点5个像素
            _this.m_collision = 5; //this.width / 2;
            return _this;
        }
        /**获取zorder排序值 */
        BulletEffect.prototype.getZorder = function () {
            return this.y + this.m_target.m_roleCenter;
        };
        BulletEffect.prototype.CalDirectionAndSpeed = function (bRotate) {
            var radian = UtilsGame.getRadian(this.x, this.y, this.m_targetPosx, this.m_targetPosy);
            this.m_direction = (this.m_targetPosx > this.x) ? 1 : -1;
            this.m_cosSpeed = (Math.abs(Math.cos(radian)) * (this.m_direction));
            this.m_sinSpeed = (Math.abs(Math.sin(radian)) * ((this.m_targetPosy > this.y) ? 1 : -1));
            this.m_pixelPreFrame = Template.config.throwSpeed / DEFINE.CURRENT_FPS;
            this.m_pixelPreFramex = this.m_pixelPreFrame * this.m_cosSpeed;
            this.m_pixelPreFramey = this.m_pixelPreFrame * this.m_sinSpeed;
            if (bRotate) {
                var angle = UtilsGame.getAngle(this.x, this.y, this.m_targetPosx, this.m_targetPosy);
                this.rotation = angle;
            }
        };
        /// 每200毫秒减少40，即为每1000减少200像素
        BulletEffect.prototype.UpdateSpeed = function (speedPreFrame, limitSpeed) {
            if (speedPreFrame != 0) {
                if (this.m_pixelPreFrame <= limitSpeed / DEFINE.CURRENT_FPS) {
                    this.m_pixelPreFrame = limitSpeed / DEFINE.CURRENT_FPS;
                }
                else {
                    var a = speedPreFrame / DEFINE.CURRENT_FPS;
                    this.m_pixelPreFrame += a;
                    if (this.m_pixelPreFrame < limitSpeed / DEFINE.CURRENT_FPS) {
                        this.m_pixelPreFrame = limitSpeed / DEFINE.CURRENT_FPS;
                    }
                }
                this.m_pixelPreFramex = this.m_pixelPreFrame * this.m_cosSpeed;
                this.m_pixelPreFramey = this.m_pixelPreFrame * this.m_sinSpeed;
            }
        };
        /// 设置方向，同步函数
        BulletEffect.prototype.SetTarget = function (target, skillID, parentBattleRenderer, bRotate) {
            this.m_parentBattleRenderer = parentBattleRenderer;
            this.m_target = target;
            this.m_skillID = skillID;
            this.m_targetPosx = this.m_target.x;
            /// 子弹肯定是中心到中心的
            this.m_targetPosy = this.m_target.y - this.m_target.m_roleCenter;
            this.CalDirectionAndSpeed(bRotate);
        };
        BulletEffect.prototype.onAddToStage = function (e) {
            _super.prototype.onAddToStage.call(this, e);
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        BulletEffect.prototype.onRemoveFromStage = function (e) {
            _super.prototype.onRemoveFromStage.call(this, e);
            this.reset();
        };
        BulletEffect.prototype.reset = function () {
            this.m_target = null;
            this.m_parentBattleRenderer = null;
        };
        /**更新 */
        BulletEffect.prototype.update = function (time) {
            _super.prototype.update.call(this, time);
            this.UpdateBullet();
        };
        BulletEffect.prototype.TestArrive = function () {
            var dis = UtilsGame.getDistance(this.x, this.y, this.m_targetPosx, this.m_targetPosy);
            if (dis < this.m_collision || (this.x - this.m_targetPosx) * this.m_direction > 0) {
                return true;
            }
            return false;
        };
        BulletEffect.prototype.UpdateBullet = function () {
            if (this.m_startShoot && !this.m_bPause) {
                /// 更新位移
                this.x += this.m_pixelPreFramex;
                this.y += this.m_pixelPreFramey;
                this.UpdateSpeed(-300, 500);
                if (this.TestArrive()) {
                    this.m_target.ExecuteHitEffect(this.m_skillID);
                    this.m_startShoot = false;
                    /// 销毁自己
                    // this.parent.removeChild(this);
                    this.m_parentBattleRenderer.ReleaseEffect(this);
                }
            }
        };
        /// 计算轨迹， 计算碰撞， 播放特效。
        BulletEffect.prototype.gotoAndPlay = function (frame, playTimes) {
            /// 首先循环播放特效
            _super.prototype.gotoAndPlay.call(this, frame, -1);
            this.m_startShoot = true;
        };
        BulletEffect.prototype.Pause = function (bPause) {
            _super.prototype.Pause.call(this, bPause);
            this.m_bPause = bPause;
        };
        return BulletEffect;
    }(battle.EffectBase));
    battle.BulletEffect = BulletEffect;
    __reflect(BulletEffect.prototype, "battle.BulletEffect");
})(battle || (battle = {}));
//# sourceMappingURL=BulletEffect.js.map