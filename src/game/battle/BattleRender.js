var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 战斗渲染层
 */
var battle;
(function (battle) {
    var BattleRender = (function (_super) {
        __extends(BattleRender, _super);
        /**
         * 构造函数
         */
        function BattleRender() {
            var _this = _super.call(this) || this;
            _this._Actors = null;
            _this._closeupMask = null;
            _this.m_bPause = false;
            _this.frameCount = 0;
            //////////////////////////////////////////////////////EFFECT///////////////////////////////////////////////////////////////////////
            //// 维护子弹特效，子弹特效绘制放在这一层
            /// 此角色维护的特效缓存,未来实现对象池
            _this.m_allEffects = [];
            _this._Actors = new Dictionary();
            _this.initEvent();
            _this.addCloseupMask();
            return _this;
        }
        BattleRender.prototype.addCloseupMask = function () {
            if (this._closeupMask == null) {
                this._closeupMask = new battle.closeupMask();
                this._closeupMask.y = -370; // -290;
            }
            this.addChild(this._closeupMask);
            this._closeupMask.visible = false;
        };
        BattleRender.prototype.setCloseUpMaskVisible = function (b) {
            if (this._closeupMask != null)
                this._closeupMask.visible = b;
        };
        BattleRender.prototype.Pause = function (bPause) {
            this.m_bPause = bPause;
            this._Actors.foreachValue(function (obj) {
                obj.Pause(bPause);
            }, this);
            /// 暂停所有特效
            this.m_allEffects.forEach(function (element) {
                element.Pause(bPause);
            });
        };
        BattleRender.prototype.update = function (time) {
            this.frameCount++;
            // if (this.frameCount % 5 == 0) {
            this.sortZOrder();
            // }
            if (this.m_bPause) {
                return;
            }
            this._Actors.foreachValue(function (obj) {
                obj.DoUpdate(time);
            }, this);
        };
        BattleRender.prototype.onBattleEnd = function () {
            this._Actors.foreachValue(function (obj) {
                obj.onBattleEnd();
            }, this);
        };
        /// 动态调整绘制顺序
        BattleRender.prototype.sortZOrder = function () {
            /// 使用私有函数排序  TODO:排序计算目前使用的锚点坐标来比较的，效果可能有误。
            // var allchildren: egret.DisplayObject[] = this.$children;
            var allchildren = [];
            for (var index = 0; index < this.numChildren; ++index) {
                allchildren.push(this.getChildAt(index));
            }
            allchildren.sort(function (a, b) {
                if (a.getZorder() > b.getZorder())
                    return 1;
                if (a.getZorder() < b.getZorder())
                    return -1;
                else if (a.x <= b.x)
                    return 1;
                return -1;
            });
            for (var j = 0; j < allchildren.length; j++) {
                this.setChildIndex(allchildren[j], j);
            }
        };
        /**
         * 初始化事件绑定
         */
        BattleRender.prototype.initEvent = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        BattleRender.prototype.onAddToStage = function (e) {
            this.y = Template.config.battleWalkZoneY;
            this.width = Template.config.battleWalkSize[0];
            this.height = Template.config.battleWalkSize[1];
            Singleton.Get(RegisterUpdate).register(this);
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        BattleRender.prototype.onRemoveFromStage = function (e) {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        /**
         * 添加子对象
         */
        BattleRender.prototype.addGameChild = function (child) {
            this.addChild(child);
        };
        /**
         * 添加子对象
         */
        BattleRender.prototype.removeGameChild = function (child) {
            this.removeChild(child);
        };
        /**
         * 向战斗区域中添加角色
         */
        BattleRender.prototype.addActor = function (actor) {
            var result = null;
            YWLogger.info("addActor " + actor.m_gaming_id + " " + actor.m_side, LogType.Battle);
            // 如果已存在，不添加
            if (this._Actors.containsKey(actor.m_gaming_id)) {
                this.removeActor(actor.m_gaming_id);
            }
            // 初始化显示对象
            // result = new ActorRender(actor.m_role_info.Res); // TODO 放入对象池
            var role_config = Template.role.get(actor.m_r_inf.role_id);
            result = new battle.Actor(role_config.Res); // TODO 放入对象池
            result.InitInfo(this, role_config, actor.m_gaming_id);
            /// 设置缩放设置初始动画
            var pActorrender = result.getActorRender();
            pActorrender.scaleX = role_config.Size / 1000;
            pActorrender.scaleY = role_config.Size / 1000;
            pActorrender.DoAction(battle.ActionType.AT_wait);
            // 添加到字典
            this._Actors.add(actor.m_gaming_id, result);
            // 添加到舞台
            this.addGameChild(result);
            // 注册y值改变回调
            result.SetOnPosChangeFun(function () {
            });
            return result;
        };
        /**
         * 从战斗区域移除角色
         * @param actorId
         */
        BattleRender.prototype.removeActor = function (actorId) {
            if (!this._Actors.containsKey(actorId)) {
                YWLogger.error("Can't remove actor from stage: " + actorId, LogType.Battle);
                return false;
            }
            // 获取对象
            var render = this._Actors.get(actorId);
            // 从字典移除
            this._Actors.remove(actorId);
            // 从舞台移除
            this.removeGameChild(render);
        };
        /**
         * 获取Actor渲染对象
         * @param actorId
         */
        BattleRender.prototype.getActor = function (actorId) {
            if (!this._Actors.containsKey(actorId)) {
                return null;
            }
            return this._Actors.get(actorId);
        };
        BattleRender.prototype.removeAllActorRender = function () {
            this._Actors.clear();
            this.removeChildren();
            this.m_allEffects.length = 0;
            this.addCloseupMask();
        };
        BattleRender.prototype.AddNormalEffect = function (name) {
            var pEffect = new battle.EffectBase(name);
            this.m_allEffects.push(pEffect);
            this.addChild(pEffect);
            pEffect.addEventListener(egret.Event.COMPLETE, this.effectPlayComplete, this);
            return pEffect;
        };
        BattleRender.prototype.ReleaseEffect = function (classes) {
            var index = this.m_allEffects.indexOf(classes);
            if (index >= 0) {
                this.removeChild(classes);
                this.m_allEffects.splice(index, 1);
            }
        };
        BattleRender.prototype.AddBulletEffect = function (name) {
            var pEffect = new battle.BulletEffect(name);
            this.m_allEffects.push(pEffect);
            this.addChild(pEffect);
            return pEffect;
        };
        BattleRender.prototype.AddFollowEffect = function (name) {
            var pEffect = new battle.FollowEffect(name);
            this.m_allEffects.push(pEffect);
            this.addChild(pEffect);
            return pEffect;
        };
        /// 立即播放结束
        BattleRender.prototype.effectPlayComplete = function (e) {
            var tar = e.currentTarget;
            this.ReleaseEffect(tar);
        };
        BattleRender.prototype.getActorByPos = function (side, pos) {
            var s = null;
            for (var i = 0; i < this._Actors.values.length; ++i) {
                if (this._Actors.values[i].m_logic_pos == pos &&
                    this._Actors.values[i].m_logic_side == side) {
                    return this._Actors.values[i];
                }
            }
            return null;
        };
        return BattleRender;
    }(egret.DisplayObjectContainer));
    battle.BattleRender = BattleRender;
    __reflect(BattleRender.prototype, "battle.BattleRender", ["IUpdate"]);
})(battle || (battle = {}));
//# sourceMappingURL=BattleRender.js.map