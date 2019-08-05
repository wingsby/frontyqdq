var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 支持自动滚动的Sprite
 */
var battle;
(function (battle) {
    var ScrollableSprite = (function (_super) {
        __extends(ScrollableSprite, _super);
        /**
         * 构造函数
         */
        function ScrollableSprite() {
            var _this = _super.call(this) || this;
            // 图像对象
            _this._bg1 = null; // 滚动背景对象
            _this._bg2 = null; // 滚动背景对象
            _this._bgTex = null; // 图片贴图
            // 运行时参数
            _this._isPause = true; // 是否暂停
            _this._lastTickTime = 0; // 上次Tick时间戳
            // 图像参数
            _this._resName = ""; // 贴图名称
            _this._rollSpeed = 0; // 滚动速度，默认为0（单位：像素/秒）
            _this._is_load_complete = false;
            _this._is_front = false;
            _this.initEvent();
            return _this;
        }
        /**
         * 初始化事件
         */
        ScrollableSprite.prototype.initEvent = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        /**
         * 响应加入场景
         * @param e
         */
        ScrollableSprite.prototype.onAddToStage = function (e) {
            // 重置场景
            this.reset();
            Singleton.Get(RegisterUpdate).register(this);
        };
        /**
         * 响应从场景中删除
         * @param e
         */
        ScrollableSprite.prototype.onRemoveFromStage = function (e) {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        /**
         * 帧率无关的帧刷新
         * @param time
         */
        ScrollableSprite.prototype.update = function () {
            // 获取距离上次时间
            var time = egret.getTimer();
            var deltaTime = time - this._lastTickTime;
            this._lastTickTime = time;
            // 帧率过低时，不允许一次性滚动过长
            if (deltaTime > DEFINE.FRAME_TIME_TOLERANCE_LIMIT) {
                deltaTime = DEFINE.FRAME_TIME_TOLERANCE_REPLACE;
            }
            // 如果暂停则不执行位移
            if (this._isPause) {
                return;
            }
            if (!this._is_load_complete) {
                return;
            }
            // 进行位移
            this._bg1.x -= deltaTime * this._rollSpeed / DEFINE.TIME_MILLISECOND_PER_SECOND;
            this._bg2.x = this._bg1.x + this._bg1.width;
            // 交换bg身份实现循环
            if (this._bg2.x < 0 && this._bg1.x < 0) {
                var nextBg = this._bg1;
                this._bg1 = this._bg2;
                this._bg2 = nextBg;
            }
        };
        /**
         * 初始化滚动对象
         * @param tex 贴图
         * @param speed 移动速度（单位： 像素/秒）
         */
        ScrollableSprite.prototype.initSprite = function (tex, speed, isFront) {
            if (isFront === void 0) { isFront = false; }
            this._resName = tex;
            this._rollSpeed = speed;
            this._is_front = isFront;
        };
        /**
         * 重置滚动对象
         */
        ScrollableSprite.prototype.reset = function () {
            // 刷新Tick时间
            this._lastTickTime = egret.getTimer();
            // 检查存在性
            if (!this.contains(this._bg1) && this._bg1 == null) {
                this._bg1 = ObjectPool.getPool(egret.Bitmap).getObject();
            }
            if (!this.contains(this._bg2) && this._bg2 == null) {
                this._bg2 = ObjectPool.getPool(egret.Bitmap).getObject();
            }
            // 初始化
            this._bg1.x = 0;
            this._bg1.y = 0;
            this.addChild(this._bg1);
            this._bg2.x = 0;
            this._bg2.y = 0;
            this.addChild(this._bg2);
            // 设定贴图
            //this.setTexture(this._resName);
            ResManager.getResAsync(this._resName, this.setTexture, this);
        };
        /**
         * 设定场景贴图
         */
        ScrollableSprite.prototype.setTexture = function (texture) {
            this._bgTex = texture;
            this.height = this._bgTex.textureHeight;
            this._bg1.texture = this._bgTex;
            this._bg1.width = this._bgTex.textureWidth;
            this._bg1.height = this._bgTex.textureHeight;
            this._bg2.texture = this._bgTex;
            this._bg2.width = this._bgTex.textureWidth;
            this._bg2.height = this._bgTex.textureHeight;
            this._is_load_complete = true;
            if (this._is_front) {
                // this.y = DEFINE.SCENE_BG_HEIGHT - this.height;
                this.y = DEFINE.SCENE_BG_HEIGHT - this.height + 30;
            }
            else {
                this.y = 0 - 30;
            }
        };
        /**
         * 暂停播放
         */
        ScrollableSprite.prototype.stop = function () {
            this._isPause = true;
        };
        /**
         * 继续播放
         */
        ScrollableSprite.prototype.play = function () {
            this._isPause = false;
        };
        return ScrollableSprite;
    }(egret.Sprite));
    battle.ScrollableSprite = ScrollableSprite;
    __reflect(ScrollableSprite.prototype, "battle.ScrollableSprite", ["IUpdate"]);
})(battle || (battle = {}));
//# sourceMappingURL=ScrollableSprite.js.map