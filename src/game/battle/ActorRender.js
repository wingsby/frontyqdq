var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 角色显示对象
 */
var battle;
(function (battle) {
    var ActorRender = (function (_super) {
        __extends(ActorRender, _super);
        function ActorRender(mcName, mcJson, textureName, callback, thisObj) {
            var _this = _super.call(this, mcName, mcJson, textureName, callback, thisObj) || this;
            /// state
            //private m_currentState: ActionType = ActionType.AT_wait;
            //private m_nextState: ActionType = ActionType.AT_wait;
            _this.m_canBreak = true;
            _this.m_canMove = true; //在攻击或者技能动作时，不能移动
            _this.m_defaultDir = battle.BattleSide.Null;
            _this.m_actionEventCallback = null;
            _this.m_Parent = null;
            _this.m_AttackParam = null;
            return _this;
        }
        ActorRender.prototype.SetDirection = function (rd) {
            this.m_defaultDir = rd;
            this.FixWaitDirection();
        };
        ActorRender.prototype.FixWaitDirection = function () {
            switch (this.m_defaultDir) {
                case battle.BattleSide.Left:
                    this.FaceToDirection(true);
                    break;
                case battle.BattleSide.Right:
                    this.FaceToDirection(false);
                    break;
            }
        };
        ActorRender.prototype.FaceToDirection = function (normalDir) {
            if (normalDir) {
                this.scaleX = (1) * Math.abs(this.scaleX);
            }
            else {
                this.scaleX = (-1) * Math.abs(this.scaleX);
            }
        };
        ActorRender.prototype.CalDirectionUseTarget = function (targetID) {
            var targetActor = Singleton.Get(battle.RenderManager).getBattle().getActor(targetID);
            if (targetActor && targetActor.x != this.m_Parent.x)
                this.FaceToDirection((targetActor.x - this.m_Parent.x > 0) ? true : false);
            else {
                YWLogger.error(this.m_Parent.m_posID + " is attacking, but target already dead, target id: " + targetID, LogType.Battle);
                this.FixWaitDirection();
            }
        };
        /**
         * 响应加入场景
         * @param e
         */
        ActorRender.prototype.onAddToStage = function (e) {
            _super.prototype.onAddToStage.call(this, e);
            this.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onGetActionEvent, this);
        };
        /**
         * 响应从场景中删除
         * @param e
         */
        ActorRender.prototype.onRemoveFromStage = function (e) {
            _super.prototype.onRemoveFromStage.call(this, e);
            this.removeEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onGetActionEvent, this);
        };
        ActorRender.prototype.callRenderCallBack = function (e, currentbehitTarget, behitTarget, currentEvent, skillid, attacktarget) {
            var timer = e.currentTarget;
            currentbehitTarget.length = 0;
            currentbehitTarget.push(behitTarget[timer.currentCount]);
            this.m_actionEventCallback.call(this, this.m_Parent, currentEvent, skillid, attacktarget, currentbehitTarget);
            if (timer.currentCount == behitTarget.length - 1) {
                timer.stop();
                timer.removeEventListener(egret.TimerEvent.TIMER, this.callRenderCallBack, this);
            }
        };
        /// 动画事件响应函数
        ActorRender.prototype.onGetActionEvent = function (e) {
            var _this = this;
            var skillid = -1;
            var attacktarget = -1;
            var _delayTime = 0;
            var currentEvent = battle.ActionEvent.AE_COUNT;
            var behitTarget = [];
            var currentbehitTarget = [];
            for (var index = 0; index < battle.ActionEvent.AE_COUNT; ++index) {
                if (e.frameLabel.search(DEFINE.g_ActionEventName[index]) != -1) {
                    currentEvent = index;
                    /// 逻辑回调
                    if (this.m_AttackParam) {
                        /// 立即调用逻辑层的回调
                        var tmp = this.m_AttackParam.m_attackFunc[index];
                        if (tmp) {
                            tmp.m_attackFunc.call(tmp.thisObj, tmp.args);
                        }
                        skillid = this.m_AttackParam.skillID;
                        _delayTime = this.m_AttackParam.delayTime;
                        attacktarget = this.m_AttackParam.attacktarget;
                        behitTarget = this.m_AttackParam.behitTarget;
                        if (behitTarget.length == 0) {
                            behitTarget.push(attacktarget);
                        }
                    }
                    else {
                        YWLogger.warn("Found this.m_AttackParam = null: callback" + e.frameLabel, LogType.Battle);
                    }
                    // modified by WYM 2017/1/13
                    //this.callRenderCallBack(e, currentbehitTarget, behitTarget, currentEvent, skillid, attacktarget);
                    /// 通过delayTime 延时调用特效播放层的回调
                    if (this.m_actionEventCallback) {
                        if (behitTarget.length <= 1) {
                            this.m_actionEventCallback.call(this, this.m_Parent, currentEvent, skillid, attacktarget, behitTarget);
                        }
                        else {
                            currentbehitTarget.length = 0;
                            currentbehitTarget.push(behitTarget[0]);
                            this.m_actionEventCallback.call(this, this.m_Parent, currentEvent, skillid, attacktarget, currentbehitTarget);
                            ////创建一个计时器对象
                            var timer = new egret.Timer(_delayTime, behitTarget.length - 1);
                            //注册事件侦听器
                            timer.addEventListener(egret.TimerEvent.TIMER, function (e) {
                                _this.callRenderCallBack(e, currentbehitTarget, behitTarget, currentEvent, skillid, attacktarget);
                            }, this);
                            //开始计时
                            timer.start();
                        }
                    }
                }
            }
        };
        ActorRender.prototype.SetActionEventCallBack = function (callback, Parent) {
            this.m_actionEventCallback = callback;
            this.m_Parent = Parent;
        };
        /// 动作
        ActorRender.prototype.DoAction = function (at, pAttackParam, force) {
            if (force != undefined && force)
                this.m_canBreak = true;
            if (!this.m_canBreak) {
                return;
            }
            this.m_AttackParam = pAttackParam;
            switch (at) {
                case battle.ActionType.AT_wait:
                // this.gotoAndPlay(DEFINE.g_ActionTypeName[ at], -1);
                // this.m_canBreak = true;
                // // this.FixWaitDirection();
                // break;
                case battle.ActionType.AT_move:
                    this.gotoAndPlay(DEFINE.g_ActionTypeName[at], -1);
                    this.m_canBreak = true;
                    //this.FixWaitDirection();
                    break;
                case battle.ActionType.AT_attack:
                    this.gotoAndPlay(DEFINE.g_ActionTypeName[at], 1);
                    this.m_canBreak = false;
                    this.m_canMove = false;
                    if (this.m_AttackParam != undefined) {
                        this.CalDirectionUseTarget(pAttackParam.attacktarget);
                    }
                    this.addEventListener(egret.Event.COMPLETE, this.actionPlayComplete, this);
                    // this.removeEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onGetActionEvent, this);
                    // this.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onGetActionEvent, this);
                    // if (this.m_AttackParam == null) {
                    //     YWLogger.error("pAttackParam = null", LogType.Battle);
                    // }
                    break;
                case battle.ActionType.AT_skill:
                    this.gotoAndPlay(DEFINE.g_ActionTypeName[at], 1);
                    this.m_canBreak = false;
                    this.m_canMove = false;
                    if (this.m_AttackParam != undefined) {
                        this.CalDirectionUseTarget(pAttackParam.attacktarget);
                    }
                    this.addEventListener(egret.Event.COMPLETE, this.actionPlayComplete, this);
                    // this.removeEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onGetActionEvent, this);
                    // this.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onGetActionEvent, this);
                    // if (this.m_AttackParam == null) {
                    //     YWLogger.error("pAttackParam = null", LogType.Battle);
                    // }
                    break;
            }
        };
        /// 技能和攻击播放结束回待机
        ActorRender.prototype.actionPlayComplete = function (e) {
            this.removeEventListener(egret.Event.COMPLETE, this.actionPlayComplete, this);
            var tar = e.currentTarget;
            this.m_canBreak = true;
            this.m_canMove = true;
            // console.log("action:" + tar.currentLabel + " play completed");
            this.DoAction(battle.ActionType.AT_wait);
        };
        ActorRender.prototype.update = function (time) {
            _super.prototype.update.call(this, time);
        };
        return ActorRender;
    }(BaseMovieClip));
    battle.ActorRender = ActorRender;
    __reflect(ActorRender.prototype, "battle.ActorRender");
})(battle || (battle = {}));
//# sourceMappingURL=ActorRender.js.map