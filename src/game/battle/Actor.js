var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 角色渲染类
 *
 * 所有跟位移相关的都在这，ActorRender一直在此对象的原点
 */
var battle;
(function (battle) {
    //////////////////////////////////////////////////////////////
    var Actor = (function (_super) {
        __extends(Actor, _super);
        /**
         * 构造函数
         */
        function Actor(mcName, mcJson, textureName) {
            var _this = _super.call(this) || this;
            _this.m_onPosChangeFun = null;
            /// 移动数据，move或follow
            _this.m_bInMoving = false;
            _this.m_bstartMoving = false;
            _this.m_MoveToParam = null;
            _this.m_followParam = null;
            _this.m_bInFollowing = false;
            _this.m_bstartFollowing = false;
            _this.m_needEscape = false;
            _this.m_posID = -1; /// use to debug
            /// 角色离锚点的偏移值
            _this.m_roleCenter = 0;
            /// 父节点，不通过单件了
            _this.m_parentBattleRender = null;
            // 角色挂载物
            _this.m_hpBar = null; // 血条显示对象
            _this.zorderAdd = 0;
            // 角色Shadow
            // private m_shadowTex: egret.Texture = null; // 图片贴图
            _this.m_shadowBmp = null; // 滚动背景对象
            _this.m_actorRender = null;
            /// 
            _this.m_bPause = false;
            _this.m_currentCmdIndex = 0;
            _this.m_ActionCmds = [];
            /// 此角色维护的特效缓存,未来实现对象池
            _this.m_allEffects = [];
            _this.m_actorRender = new battle.ActorRender(mcName, mcJson, textureName, _this.setHpBarPos, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            _this.m_MoveToParam = new battle.MoveToParam;
            _this.m_followParam = new battle.FollowPapam;
            _this.m_actorRender.SetActionEventCallBack(_this.processActionEventCallback, _this);
            return _this;
        }
        Object.defineProperty(Actor.prototype, "HpBar", {
            get: function () {
                return this.m_hpBar;
            },
            enumerable: true,
            configurable: true
        });
        /**获取zorder排序值 */
        Actor.prototype.getZorder = function () {
            return this.zorderAdd + this.y;
        };
        Actor.prototype.setMaskZorder = function (b) {
            if (b) {
                this.zorderAdd = SORT_CONST.ZOREDER_EFFECT_MAX;
            }
            else {
                this.zorderAdd = 0;
            }
        };
        Actor.prototype.InitInfo = function (br, roleInfo, id) {
            this.m_parentBattleRender = br;
            this.m_posID = id;
            this.m_roleCenter = roleInfo.center;
        };
        Actor.prototype.onAddToStage = function (e) {
            this.AddShadowToStage();
            this.addChild(this.m_actorRender);
            // 添加血条对象
            this.m_hpBar = ObjectPool.getPool(ui.HpBarView).getObject();
            this.addChild(this.m_hpBar);
            // this.setChildIndex( this.m_hpBar, 99);
            this.setHpBarPos(); // modified by WYM 2017/1/3
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        Actor.prototype.onRemoveFromStage = function (e) {
            // 回收血条对象
            this.removeChild(this.m_hpBar);
            this.m_hpBar.reset();
            ObjectPool.getPool(ui.HpBarView).recycleObject(this.m_hpBar);
            this.m_hpBar = null;
            /// 回收影子
            if (this.m_shadowBmp != null) {
                this.removeChild(this.m_shadowBmp);
                ObjectPool.getPool(egret.Bitmap).recycleObject(this.m_shadowBmp);
            }
            /// 回收特效
            this.m_allEffects.length = 0;
            this.removeChildren();
            this.m_parentBattleRender = null;
        };
        /// 重置血条坐标
        Actor.prototype.setHpBarPos = function () {
            if (!this.m_hpBar) {
                return;
            }
            this.m_hpBar.anchorOffsetX = this.m_hpBar.width / 2;
            this.m_hpBar.anchorOffsetY = this.m_hpBar.height;
            this.m_hpBar.y = -this.m_roleCenter * 2.36;
        };
        Actor.prototype.AddShadowToStage = function () {
            ResManager.getResAsync(DEFINE.RES_ROLE_BG_SHADOW, this.onShadowRes, this);
        };
        Actor.prototype.onShadowRes = function (shadowTex) {
            this.m_shadowBmp = ObjectPool.getPool(egret.Bitmap).getObject();
            this.m_shadowBmp.texture = shadowTex;
            this.m_shadowBmp.width = shadowTex.textureWidth;
            this.m_shadowBmp.height = shadowTex.textureHeight;
            this.m_shadowBmp.anchorOffsetX = shadowTex.textureWidth / 2;
            this.m_shadowBmp.anchorOffsetY = shadowTex.textureHeight / 2;
            this.addChild(this.m_shadowBmp);
        };
        /// 获取角色的绘制器
        Actor.prototype.getActorRender = function () {
            return this.m_actorRender;
        };
        Actor.prototype.Pause = function (bPause) {
            this.m_bPause = bPause;
            if (bPause) {
                this.m_actorRender.stop();
            }
            else {
                this.m_actorRender.play();
            }
            /// 暂停所有特效
            this.m_allEffects.forEach(function (element) {
                element.Pause(bPause);
            });
        };
        /// 由父节点控制更新
        Actor.prototype.DoUpdate = function (time) {
            if (!this.m_bPause) {
                this.ProcessActionCmds();
                this.UpdateFollowing();
            }
        };
        Actor.prototype.SetDirection = function (rd) {
            this.m_actorRender.SetDirection(rd);
        };
        /// 播放动作 attack和skill需要传actionID,@@@待实现
        Actor.prototype.DoAction = function (at, pAttackParam, force) {
            if (force != undefined && force)
                this.m_actorRender.m_canBreak = true;
            /// 当前暂停状态
            if (!this.m_actorRender.m_canBreak) {
                this.addAActionCmd(at, null, null, pAttackParam);
                return;
            }
            this.m_actorRender.DoAction(at, pAttackParam, force);
        };
        /// 因为由m_actorRender来控制是否要移动
        /// 返回值表示是否需要follow， 当已经在角色攻击范围内时，不需要follow
        Actor.prototype.followActor = function (prenderable, collisionRange, speed, listener) {
            // this.moveTo( prenderable.x, prenderable.y,  speed, listener, collisionRange);
            // return ;
            var tmp_followParam = new battle.FollowPapam();
            if (listener != undefined) {
                tmp_followParam.m_arriveFun = listener;
            }
            if (speed != undefined && speed != null) {
                tmp_followParam.m_speed = speed;
            }
            if (collisionRange != undefined && collisionRange != null) {
                tmp_followParam.m_Collision = collisionRange;
            }
            /// 判断是否可follow
            var finalX = prenderable.x;
            var finalY = prenderable.y;
            var dis = UtilsGame.getDistance(this.x, this.y, finalX, finalY);
            if (dis < Math.max(5, tmp_followParam.m_Collision)) {
                /// 如果是近战，Y轴的距离>20%的范围，才需要follow
                /// 远程，不需要follow
                /// 近程的话，如果距离小于20&,也不需要follow
                if (tmp_followParam.m_Collision > DEFINE.FOLLOW_ROMOTE_DISTANCE ||
                    Math.abs(finalY - this.y) < tmp_followParam.m_Collision * DEFINE.FOLLOW_DISTANCE_YPERCENT) {
                    return false;
                }
            }
            this.m_bInFollowing = true;
            tmp_followParam.m_renderable = prenderable;
            if (this.m_actorRender.m_canBreak) {
                this.startFollowing(tmp_followParam);
            }
            else {
                this.m_bstartFollowing = false;
                this.addAActionCmd(battle.ActionType.AT_move, null, tmp_followParam);
            }
            return true;
        };
        Actor.prototype.onBattleEnd = function () {
            /// 清空follow
            this.m_bInFollowing = false;
            this.m_bstartFollowing = false;
            /// 清空消息队列
            this.m_ActionCmds = [];
            this.m_currentCmdIndex = 0;
        };
        Actor.prototype.moveTo = function (x, y, speed, listener, auto_dir, collisionRange) {
            if (auto_dir === void 0) { auto_dir = false; }
            var tmp_MoveToParam = new battle.MoveToParam();
            if (x != undefined && x != null) {
                tmp_MoveToParam.m_finalX = x;
            }
            if (y != undefined && y != null) {
                tmp_MoveToParam.m_finalY = y;
            }
            if (listener != undefined) {
                tmp_MoveToParam.m_arriveFun = listener;
            }
            if (speed != undefined && speed != null) {
                tmp_MoveToParam.m_speed = speed;
            }
            if (collisionRange != undefined && collisionRange != null) {
                tmp_MoveToParam.m_Collision = collisionRange;
            }
            //// moveTo使用Tween来实现，且不可倍打断。也不能暂停
            {
                var dis = UtilsGame.getDistance(this.x, this.y, tmp_MoveToParam.m_finalX, tmp_MoveToParam.m_finalY);
                var time = dis * 1000 / speed / 2;
                var t = egret.Tween.get(this);
                if (auto_dir)
                    this.UpdateDirection(tmp_MoveToParam.m_finalX);
                var t1 = t.to({ x: tmp_MoveToParam.m_finalX, y: tmp_MoveToParam.m_finalY }, time);
                if (listener != undefined)
                    t1.call(listener.m_fun, listener.thisobject, listener.argu);
            }
            // if (this.m_actorRender.m_canBreak) {
            // this.startMoving(tmp_MoveToParam);
            // }
            // else {
            //     this.m_bstartMoving = false;
            //     this.addAActionCmd(ActionType.AT_move, tmp_MoveToParam, null);
            // }
        };
        Actor.prototype.ProcessActionCmds = function () {
            // if (!this.m_actorRender.m_canBreak) {
            //     return;
            // }
            while (this.m_actorRender.m_canBreak) {
                if (this.m_ActionCmds.length <= this.m_currentCmdIndex) {
                    break;
                }
                else {
                    var tmpActionAmd = this.m_ActionCmds[this.m_currentCmdIndex];
                    var at = tmpActionAmd.m_aType;
                    this.DoAction(at, tmpActionAmd.m_cmdAttackParam);
                    if (at == battle.ActionType.AT_move) {
                        if (this.m_bInFollowing && tmpActionAmd.m_cmdFollowPapam != null) {
                            this.startFollowing(tmpActionAmd.m_cmdFollowPapam);
                        }
                        if (this.m_bInMoving && tmpActionAmd.m_cmdMoveToParam != null) {
                            this.startMoving(tmpActionAmd.m_cmdMoveToParam);
                        }
                    }
                    /// 垃圾回收
                    if (this.m_currentCmdIndex > 1) {
                        this.m_ActionCmds[this.m_currentCmdIndex - 1] = null;
                    }
                    this.m_currentCmdIndex++;
                }
            }
        };
        Actor.prototype.addAActionCmd = function (at, mparam, fparam, AttackParam) {
            var acmd = new battle.ActionCommond();
            acmd.m_aType = at;
            acmd.m_cmdFollowPapam = fparam;
            acmd.m_cmdMoveToParam = mparam;
            acmd.m_cmdAttackParam = AttackParam;
            this.m_ActionCmds.push(acmd);
        };
        Actor.prototype.startMoving = function (tmp_MoveToParam) {
            this.m_MoveToParam.CloneValue(tmp_MoveToParam);
            this.CaleMoveRadian();
            this.m_bInMoving = true;
            this.m_bstartMoving = true;
        };
        /// 当距离上来就小于碰撞的时候，直接做远离！
        Actor.prototype.startFollowing = function (tmp_followParam) {
            this.m_followParam.CloneValue(tmp_followParam);
            this.m_bstartFollowing = true;
            var finalX = this.m_followParam.m_renderable.x;
            var finalY = this.m_followParam.m_renderable.y;
            /// 阻挡
            var dis = UtilsGame.getDistance(this.x, this.y, finalX, finalY);
            if (dis < this.m_followParam.m_Collision) {
                /// 到达目标的位置
                this.m_needEscape = true;
            }
        };
        // escape
        Actor.prototype.UpdateDirection = function (finalX) {
            var offsetX = finalX - this.x;
            if (offsetX != 0)
                this.m_actorRender.FaceToDirection(offsetX > 0);
        };
        /// 计算最终的坐标
        Actor.prototype.calPixelPreFramexy = function (finalX, finalY, pixelPreFrame) {
            var res = [];
            var radian = UtilsGame.getRadian(this.x, this.y, finalX, finalY);
            res.push(pixelPreFrame * Math.abs(Math.cos(radian)) * ((finalX > this.x) ? 1 : -1));
            res.push(pixelPreFrame * Math.abs(Math.sin(radian)) * ((finalY > this.y) ? 1 : -1));
            return res;
        };
        Actor.prototype.CaleMoveRadian = function () {
            var pixelPreFrame = this.m_MoveToParam.m_speed / DEFINE.CURRENT_FPS;
            var res = this.calPixelPreFramexy(this.m_MoveToParam.m_finalX, this.m_MoveToParam.m_finalY, pixelPreFrame);
            this.m_MoveToParam.pixelPreFramex = res[0];
            this.m_MoveToParam.pixelPreFramey = res[1];
        };
        Actor.prototype.calcFinalFollowPos = function () {
            var res = [];
            var x1 = this.m_followParam.m_renderable.x;
            var y1 = this.m_followParam.m_renderable.y;
            var d = UtilsGame.getDistance(this.x, this.y, x1, y1);
            var r = this.m_followParam.m_Collision - 10;
            var x2 = (x1 - this.x) / d * Math.abs(d - r) + this.x;
            var y2 = (y1 - this.y) / d * Math.abs(d - r) + this.y;
            if (this.m_followParam.m_Collision < DEFINE.FOLLOW_ROMOTE_DISTANCE &&
                Math.abs(y2 - y1) > r * DEFINE.FOLLOW_DISTANCE_YPERCENT) {
                if (y2 > y1)
                    y2 = y1 + r * DEFINE.FOLLOW_DISTANCE_YPERCENT;
                else {
                    y2 = y1 - r * DEFINE.FOLLOW_DISTANCE_YPERCENT;
                }
            }
            res.push(x2);
            res.push(y2);
            return res;
        };
        Actor.prototype.OnUpdateJianZhanFollowing = function () {
            var pixelPreFrame = this.m_followParam.m_speed / DEFINE.CURRENT_FPS;
            var x1 = this.m_followParam.m_renderable.x;
            var y1 = this.m_followParam.m_renderable.y;
            var d = UtilsGame.getDistance(this.x, this.y, x1, y1);
            var r = this.m_followParam.m_Collision;
            var x2 = 0;
            var y2 = 0;
            if (d > r) {
                x2 = (x1 - this.x) / d * Math.abs(d - r) + this.x;
                y2 = (y1 - this.y) / d * Math.abs(d - r) + this.y;
                if (Math.abs(y2 - y1) > r * DEFINE.FOLLOW_DISTANCE_YPERCENT) {
                    if (y2 > y1)
                        y2 = y1 + r * DEFINE.FOLLOW_DISTANCE_YPERCENT;
                    else {
                        y2 = y1 - r * DEFINE.FOLLOW_DISTANCE_YPERCENT;
                    }
                }
                var res = this.calPixelPreFramexy(x2, y2, pixelPreFrame);
                var pixelPreFramex = res[0];
                var pixelPreFramey = res[1];
                this.UpdateDirection(this.x + pixelPreFramex);
                this.x += pixelPreFramex;
                this.y += pixelPreFramey;
                d = UtilsGame.getDistance(this.x, this.y, x1, y1);
            }
            else {
                if (y1 > this.y) {
                    this.y += pixelPreFrame;
                }
                else {
                    this.y -= pixelPreFrame;
                }
                if (Math.abs(y1 - this.y) < r * DEFINE.FOLLOW_DISTANCE_YPERCENT) {
                    /// 到达目标的位置
                    this.followArriveFunction();
                    return;
                }
            }
        };
        Actor.prototype.OnUpdateRemoteFollow = function () {
            var pixelPreFrame = this.m_followParam.m_speed / DEFINE.CURRENT_FPS;
            var finalX = this.m_followParam.m_renderable.x;
            var finalY = this.m_followParam.m_renderable.y;
            /// 计算索敌时的距离
            var dis = UtilsGame.getDistance(this.x, this.y, finalX, finalY);
            {
            }
            var res = this.calPixelPreFramexy(finalX, finalY, pixelPreFrame);
            var pixelPreFramex = res[0];
            var pixelPreFramey = res[1];
            this.UpdateDirection(this.x + pixelPreFramex);
            if (dis < Math.max(5, this.m_followParam.m_Collision)) {
                /// 如果是近战，且Y轴的距离大于20%，则继续跟随
                if (this.m_followParam.m_Collision < DEFINE.FOLLOW_ROMOTE_DISTANCE &&
                    Math.abs(finalY - this.y) > this.m_followParam.m_Collision * DEFINE.FOLLOW_DISTANCE_YPERCENT) {
                    this.y += pixelPreFramey;
                    return;
                }
                else {
                    /// 到达目标的位置
                    this.followArriveFunction();
                    return;
                }
            }
            this.x += pixelPreFramex;
            this.y += pixelPreFramey;
        };
        Actor.prototype.UpdateFollowing = function () {
            if (!this.m_actorRender.m_canMove)
                return;
            if (this.m_bInFollowing && this.m_bstartFollowing) {
                if (this.m_followParam.m_Collision < DEFINE.FOLLOW_ROMOTE_DISTANCE) {
                    this.OnUpdateJianZhanFollowing();
                }
                else {
                    this.OnUpdateRemoteFollow();
                }
            }
            if (this.m_bInMoving && this.m_bstartMoving) {
                /// 计算MoveTo时的距离
                var dis = UtilsGame.getDistance(this.x, this.y, this.m_MoveToParam.m_finalX, this.m_MoveToParam.m_finalY);
                if (dis <= Math.max(5, this.m_MoveToParam.m_Collision)) {
                    /// 到达目标的位置
                    this.moveToArraiveFunction();
                    return;
                }
                this.UpdateDirection(this.x + this.m_MoveToParam.pixelPreFramex);
                this.x += this.m_MoveToParam.pixelPreFramex;
                this.y += this.m_MoveToParam.pixelPreFramey;
            }
        };
        Actor.prototype.SetOnPosChangeFun = function (fun) {
            this.m_onPosChangeFun = fun;
        };
        /// 技能和攻击播放结束回待机
        Actor.prototype.followArriveFunction = function () {
            this.m_bInFollowing = false;
            this.m_bstartFollowing = false;
            this.m_actorRender.DoAction(battle.ActionType.AT_wait);
            if (this.m_followParam.m_arriveFun != null) {
                this.m_followParam.m_arriveFun.call();
            }
        };
        Actor.prototype.moveToArraiveFunction = function () {
            this.m_bInMoving = false;
            this.m_bstartMoving = false;
            this.m_actorRender.DoAction(battle.ActionType.AT_wait);
            this.m_actorRender.FixWaitDirection();
            if (this.m_MoveToParam.m_arriveFun != null) {
                this.m_MoveToParam.m_arriveFun.call();
            }
        };
        ///////////////////////////////// 动作关键帧回调：
        Actor.prototype.AddEffectToStage = function (pEffect) {
            this.addChild(pEffect);
            /// 调整血条的层级
            if (this.m_hpBar != null)
                this.setChildIndex(this.m_hpBar, this.numChildren);
            {
            }
        };
        Actor.prototype.AddNormalEffect = function (name) {
            var pEffect = new battle.EffectBase(name);
            this.m_allEffects.push(pEffect);
            this.AddEffectToStage(pEffect);
            pEffect.addEventListener(egret.Event.COMPLETE, this.effectPlayComplete, this);
            return pEffect;
        };
        // private AddBulletEffect(name: string): BulletEffect {
        //     var pEffect: BulletEffect = new BulletEffect(name);
        //     this.m_allEffects.push(pEffect);
        //     return pEffect;
        // }
        // private AddFollowEffect(name: string): FollowEffect {
        //     var pEffect: FollowEffect = new FollowEffect(name);
        //     this.m_allEffects.push(pEffect);
        //     return pEffect;
        // }
        /// 立即播放结束
        Actor.prototype.effectPlayComplete = function (e) {
            var tar = e.currentTarget;
            this.ReleaseEffect(tar);
        };
        /// 获取特效播放的位置
        Actor.prototype.GetPosition = function (pos, dir) {
            var res = [];
            switch (pos) {
                case battle.EffectCastPosition.ECP_TOP:
                    res.push(0);
                    /// 黄金分割的2.3倍
                    res.push(-this.m_roleCenter * 2.3);
                    break;
                case battle.EffectCastPosition.ECP_Bottom:
                    res.push(0);
                    res.push(0);
                    break;
                case battle.EffectCastPosition.ECP_CENTER:
                    res.push(0);
                    res.push(-this.m_roleCenter);
                    break;
                case battle.EffectCastPosition.ECP_SAME_BATTLE_FIELD:
                    if (dir == battle.BattleSide.Left) {
                        res.push(Template.config.effectPos[0]);
                        res.push(Template.config.effectPos[1]);
                    }
                    else {
                        res.push(Template.config.effectPos[2]);
                        res.push(Template.config.effectPos[3]);
                    }
                    break;
                case battle.EffectCastPosition.ECP_OTHER_BATTLE_FIELD:
                    if (dir == battle.BattleSide.Right) {
                        res.push(Template.config.effectPos[0]);
                        res.push(Template.config.effectPos[1]);
                    }
                    else {
                        res.push(Template.config.effectPos[2]);
                        res.push(Template.config.effectPos[3]);
                    }
                    break;
                case battle.EffectCastPosition.ECP_GLOBAL_ONACTORPOS:
                    res.push(this.x);
                    res.push(this.y - this.m_roleCenter);
                    break;
                default:
                    break;
            }
            if (dir == battle.BattleSide.Right) {
                res.push(-1);
            }
            else {
                res.push(1);
            }
            return res;
        };
        /// 循环特效，外部控制生命周期，使用此函数回收。
        Actor.prototype.ReleaseEffect = function (classes) {
            var index = this.m_allEffects.indexOf(classes);
            if (index >= 0) {
                this.removeChild(classes);
                this.m_allEffects.splice(index, 1);
            }
        };
        /**
         * 播放特效
         * @param playTimes?: number 播放次数，-1表示循环播放，使用返回值控制Stop,默认播放一次
         * scale   1 或者 -1, 为镜像
         * @ 返回值，为pEffect
         */
        /// 播放一般的特效
        Actor.prototype.PlayEffect = function (resName, effectName, pos, dir, playTimes, scale) {
            /// 是否镜像
            if (scale == undefined)
                scale = 1;
            // 判空 避免中途切换战斗时Render被释放 modified by WYM 2016/12/23
            if (this.m_parentBattleRender == null) {
                return;
            }
            ///
            var pEffect = null;
            if (pos <= battle.EffectCastPosition.ECP_Bottom) {
                pEffect = this.AddNormalEffect(resName);
            }
            else {
                pEffect = this.m_parentBattleRender.AddNormalEffect(resName);
                pEffect.SetMaxZOrder(true);
            }
            var res = this.GetPosition(pos, dir);
            pEffect.x = res[0];
            pEffect.y = res[1];
            /// 修正方向 ,特效同时缩放1.5倍，2016,11,23
            /// scale 带方向
            pEffect.scaleX = Math.abs(pEffect.scaleX) * res[2] * scale * 1.5;
            pEffect.scaleY = pEffect.scaleY * 1.5 * Math.abs(scale);
            if (playTimes != undefined) {
                pEffect.gotoAndPlay(effectName, playTimes);
            }
            else {
                pEffect.gotoAndPlay(effectName, 1);
            }
            return pEffect;
        };
        /// 获取指定ID的table数据
        Actor.prototype.GetEntitySkill = function (currentSkillID) {
            var pSkillData = Template.skill.get(currentSkillID);
            if (pSkillData == null) {
                egret.error("can't found skill id: " + this.name + currentSkillID);
            }
            return pSkillData;
        };
        /// 自身播放被击特效
        Actor.prototype.ExecuteHitEffect = function (currentSkillID) {
            /// 战斗界面在焦点范围内时
            if (Singleton.Get(LayerManager).getView(ui.BattleView).visible) {
                /// 1、被击中闪烁
                this.m_actorRender.playBlinkColorFilter(1, 100, 100);
                var pSkillData = this.GetEntitySkill(currentSkillID);
                /// 2、 异步播放特写音效
                if (pSkillData.HitSound != "") {
                    Singleton.Get(SoundManager).play(pSkillData.HitSound);
                }
            }
            /// 3、异步播放被击特效
            if (pSkillData && pSkillData.HitE.length > 1) {
                var pos = pSkillData.HitP;
                var resName = pSkillData.HitE[0];
                var effectName = pSkillData.HitE[1];
                this.PlayEffect(resName, effectName, pos, this.getActorRender().m_defaultDir, 1, -1);
            }
        };
        /// 自身播放攻击特效
        Actor.prototype.ExecuteCastEffect = function (currentSkillID) {
            var pSkillData = this.GetEntitySkill(currentSkillID);
            if (pSkillData && pSkillData.CastE.length > 1) {
                var pos = pSkillData.CastP;
                var resName = pSkillData.CastE[0];
                var effectName = pSkillData.CastE[1];
                this.PlayEffect(resName, effectName, pos, this.getActorRender().m_defaultDir);
            }
        };
        /// 自身播放投掷特效,投掷特效放在上级中
        Actor.prototype.ExecuteThrowEffect = function (currentSkillID, ptargetActor) {
            var pSkillData = this.GetEntitySkill(currentSkillID);
            if (pSkillData && pSkillData.Throw.length > 1 && this.m_parentBattleRender) {
                var resName = pSkillData.Throw[0];
                var effectName = pSkillData.Throw[1];
                var bRotate = true;
                if (pSkillData.Throw.length == 3) {
                    if (pSkillData.Throw[2] == "2") {
                        bRotate = false;
                    }
                }
                var pos = pSkillData.HitP;
                if (pos > battle.EffectCastPosition.ECP_Bottom) {
                    if (true) {
                        egret.error("call MainDesigner, skill is throwable, but HITP is fullscreen, skillid: " + currentSkillID);
                    }
                }
                var pEffect = this.m_parentBattleRender.AddBulletEffect(resName);
                pEffect.x = this.x;
                pEffect.y = this.y - this.m_roleCenter; // this.height / 2;
                this.m_parentBattleRender.addChild(pEffect);
                pEffect.SetTarget(ptargetActor, currentSkillID, this.m_parentBattleRender, bRotate);
                pEffect.gotoAndPlay(effectName);
            }
        };
        Actor.prototype.processActionEventCallback = function (pActor, ae, currentSkillID, targetActorID, behitTarget) {
            var args = [];
            for (var _i = 5; _i < arguments.length; _i++) {
                args[_i - 5] = arguments[_i];
            }
            /// 同时播放特效
            switch (ae) {
                case battle.ActionEvent.AE_attack_cast: //CastE CastP
                case battle.ActionEvent.AE_skill_cast:
                    pActor.ExecuteCastEffect(currentSkillID);
                    break;
                case battle.ActionEvent.AE_attack_hit: // HitE HitP
                case battle.ActionEvent.AE_skill_hit:
                    // if (behitTarget.length > 1) {
                    var pSkillData = pActor.GetEntitySkill(currentSkillID);
                    if (pSkillData != null) {
                        var pos = pSkillData.HitP;
                        if (pos <= battle.EffectCastPosition.ECP_Bottom) {
                            behitTarget.forEach(function (element) {
                                var targetActor = Singleton.Get(battle.RenderManager).getBattle().getActor(element);
                                if (targetActor)
                                    targetActor.ExecuteHitEffect(currentSkillID);
                            });
                        }
                        else {
                            var targetActor = Singleton.Get(battle.RenderManager).getBattle().getActor(targetActorID);
                            if (targetActor)
                                targetActor.ExecuteHitEffect(currentSkillID);
                        }
                    }
                    break;
                case battle.ActionEvent.AE_attack_throw:
                case battle.ActionEvent.AE_skill_throw:
                    behitTarget.forEach(function (element) {
                        /// 创建投掷特效 Throw 朝向xx投掷
                        var targetActor = Singleton.Get(battle.RenderManager).getBattle().getActor(element);
                        if (targetActor)
                            pActor.ExecuteThrowEffect(currentSkillID, targetActor);
                    });
                    // else {
                    //     /// 创建投掷特效 Throw 朝向xx投掷
                    //     var targetActor: Actor = Singleton.Get(RenderManager).getBattle().getActor(targetActorID);
                    //     if (targetActor)
                    //         pActor.ExecuteThrowEffect(currentSkillID, targetActor);
                    // }
                    break;
                default:
                    break;
            }
        };
        return Actor;
    }(egret.DisplayObjectContainer));
    battle.Actor = Actor;
    __reflect(Actor.prototype, "battle.Actor", ["ISortElement"]);
})(battle || (battle = {}));
//# sourceMappingURL=Actor.js.map