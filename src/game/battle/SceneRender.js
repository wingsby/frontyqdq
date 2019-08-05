var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 战斗场景显示对象
 */
var battle;
(function (battle) {
    var SceneRender = (function (_super) {
        __extends(SceneRender, _super);
        /**
         * 构造函数
         */
        function SceneRender() {
            var _this = _super.call(this) || this;
            // 图像对象
            _this._bgBack = null;
            _this._bgFront = null;
            // 图像名
            _this._bgBackRes = "";
            _this._bgFrontRes = "";
            // 是否暂停
            _this._isPause = true;
            // 关卡信息
            _this._sceneId = 0;
            // 是否在舞台上
            _this._isOnStage = false;
            _this._frontSpeed = 0;
            _this.init();
            return _this;
        }
        /**
         * 初始化
         */
        SceneRender.prototype.init = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        /**
         * 响应加入场景
         * @param e
         */
        SceneRender.prototype.onAddToStage = function (e) {
            // 设置是否在舞台状态
            this._isOnStage = true;
            // 设定位置和大小
            this.y = DEFINE.SCENE_BG_TOP;
            this.width = DEFINE.SCENE_BG_WIDTH;
            this.height = DEFINE.SCENE_BG_HEIGHT;
            // 重置场景
            this.resetScene();
        };
        /**
         * 响应从场景中删除
         * @param e
         */
        SceneRender.prototype.onRemoveFromStage = function (e) {
            // 设置是否在舞台状态
            this._isOnStage = false;
            this.removeChild(this._bgBack);
            this.removeChild(this._bgFront);
            ObjectPool.getPool(battle.ScrollableSprite).recycleObject(this._bgBack);
            ObjectPool.getPool(battle.ScrollableSprite).recycleObject(this._bgFront);
            this._bgBack = null;
            this._bgFront = null;
        };
        SceneRender.prototype.setSceneByLevel = function (stageId, parent) {
            // 读取关卡信息
            var level_info = Template.level.get(stageId);
            if (level_info == undefined) {
                egret.error("no level: " + stageId);
                return;
            }
            this.setScene(level_info.Scene, parent);
        };
        /**
         * 设定场景
         */
        SceneRender.prototype.setScene = function (sceneId, parent) {
            var _this = this;
            // 读取场景信息
            var scene_info = Template.scene.get(sceneId);
            if (scene_info == undefined) {
                egret.error("no scene: " + sceneId);
            }
            // 检查是否有变化
            var has_change = (this._bgBackRes != scene_info.bgBack || this._bgFrontRes != scene_info.bgFront);
            this._bgBackRes = scene_info.bgBack;
            this._bgFrontRes = scene_info.bgFront;
            this._frontSpeed = scene_info.bgFrontSpeed;
            // 设定场景Id
            if (sceneId) {
                this._sceneId = sceneId;
            }
            else if (!this._sceneId) {
                egret.error("Can't set scene, you must give a stageId in initialization.");
            }
            if (has_change) {
                // 黑幕过场动画
                Singleton.Get(battle.RenderManager).cutBlackMask(function () {
                    // 移除再添加
                    if (parent) {
                        if (parent.contains(_this)) {
                            parent.removeChild(_this);
                        }
                        parent.addChildAt(_this, 0);
                    }
                });
            }
        };
        /**
         * 重置场景
         */
        SceneRender.prototype.resetScene = function () {
            // 没有则创建
            if (this._bgBack == null) {
                this._bgBack = ObjectPool.getPool(battle.ScrollableSprite).getObject();
            }
            if (this._bgFront == null) {
                this._bgFront = ObjectPool.getPool(battle.ScrollableSprite).getObject();
            }
            var stageInfo = Template.scene.get(this._sceneId);
            if (stageInfo == undefined) {
                console.log("Can't reset scene because of wrong Scene_Id: " + this._sceneId);
                return;
            }
            // 初始化图片
            this._bgBack.initSprite(stageInfo.bgBack, stageInfo.bgBackSpeed, false);
            this._bgFront.initSprite(stageInfo.bgFront, stageInfo.bgFrontSpeed, true);
            // 不在舞台则加入舞台
            if (!this.contains(this._bgBack)) {
                this.addChild(this._bgBack);
            }
            if (!this.contains(this._bgFront)) {
                this.addChild(this._bgFront);
            }
            // 设置前景位置
            // this._bgFront.y = DEFINE.SCENE_BG_HEIGHT - this._bgFront.height;
        };
        /**
         * 暂停
         */
        SceneRender.prototype.stop = function () {
            this._isPause = true;
            this._bgBack.stop();
            this._bgFront.stop();
        };
        /**
         * 播放
         */
        SceneRender.prototype.play = function () {
            this._isPause = false;
            this._bgBack.play();
            this._bgFront.play();
            // 初始化自身位置 避免震动出界
            this.x = 0;
            this.y = DEFINE.SCENE_BG_TOP;
        };
        SceneRender.prototype.frontSpeed = function () {
            return this._frontSpeed;
        };
        return SceneRender;
    }(egret.Sprite));
    battle.SceneRender = SceneRender;
    __reflect(SceneRender.prototype, "battle.SceneRender");
})(battle || (battle = {}));
//# sourceMappingURL=SceneRender.js.map