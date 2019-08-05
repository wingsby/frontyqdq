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
    var EffectCastPosition;
    (function (EffectCastPosition) {
        EffectCastPosition[EffectCastPosition["ECP_TOP"] = 0] = "ECP_TOP";
        EffectCastPosition[EffectCastPosition["ECP_CENTER"] = 1] = "ECP_CENTER";
        EffectCastPosition[EffectCastPosition["ECP_Bottom"] = 2] = "ECP_Bottom";
        EffectCastPosition[EffectCastPosition["ECP_SAME_BATTLE_FIELD"] = 3] = "ECP_SAME_BATTLE_FIELD";
        EffectCastPosition[EffectCastPosition["ECP_OTHER_BATTLE_FIELD"] = 4] = "ECP_OTHER_BATTLE_FIELD";
        EffectCastPosition[EffectCastPosition["ECP_GLOBAL_ONACTORPOS"] = 5] = "ECP_GLOBAL_ONACTORPOS";
        EffectCastPosition[EffectCastPosition["ECP_END"] = 6] = "ECP_END";
    })(EffectCastPosition = battle.EffectCastPosition || (battle.EffectCastPosition = {}));
    /// 动画类型
    var ActionType;
    (function (ActionType) {
        ActionType[ActionType["AT_wait"] = 0] = "AT_wait";
        ActionType[ActionType["AT_move"] = 1] = "AT_move";
        ActionType[ActionType["AT_attack"] = 2] = "AT_attack";
        ActionType[ActionType["AT_skill"] = 3] = "AT_skill";
        ActionType[ActionType["AT_NULL"] = 4] = "AT_NULL";
    })(ActionType = battle.ActionType || (battle.ActionType = {}));
    /// 动画关键帧
    var ActionEvent;
    (function (ActionEvent) {
        ActionEvent[ActionEvent["AE_attack_cast"] = 0] = "AE_attack_cast";
        ActionEvent[ActionEvent["AE_attack_hit"] = 1] = "AE_attack_hit";
        ActionEvent[ActionEvent["AE_attack_throw"] = 2] = "AE_attack_throw";
        ActionEvent[ActionEvent["AE_skill_cast"] = 3] = "AE_skill_cast";
        ActionEvent[ActionEvent["AE_skill_hit"] = 4] = "AE_skill_hit";
        ActionEvent[ActionEvent["AE_skill_throw"] = 5] = "AE_skill_throw";
        ActionEvent[ActionEvent["AE_COUNT"] = 6] = "AE_COUNT";
    })(ActionEvent = battle.ActionEvent || (battle.ActionEvent = {}));
    ///////////////////////////////////////////////////// 命令参数
    var ActionCommond = (function () {
        function ActionCommond() {
            this.m_aType = ActionType.AT_wait;
            this.m_targetRenderable = null;
            this.m_cmdMoveToParam = null;
            this.m_cmdFollowPapam = null;
            this.m_cmdAttackParam = null;
            this.param = null;
        }
        return ActionCommond;
    }());
    battle.ActionCommond = ActionCommond;
    __reflect(ActionCommond.prototype, "battle.ActionCommond");
    var FunctionStruct = (function () {
        function FunctionStruct() {
            this.m_fun = null;
            this.thisobject = null;
            this.argu = null;
        }
        FunctionStruct.prototype.CloneValue = function (other) {
            this.m_fun = other.m_fun;
            this.thisobject = other.thisobject;
            this.argu = other.argu;
        };
        FunctionStruct.prototype.call = function () {
            if (this.m_fun)
                this.m_fun.call(this.thisobject, this.argu);
        };
        return FunctionStruct;
    }());
    battle.FunctionStruct = FunctionStruct;
    __reflect(FunctionStruct.prototype, "battle.FunctionStruct");
    var MoveParam = (function () {
        function MoveParam() {
            this.m_speed = 1;
            this.m_Collision = 5;
            this.m_arriveFun = null;
        }
        MoveParam.prototype.CloneValue = function (other) {
            this.m_speed = other.m_speed;
            this.m_Collision = other.m_Collision;
            this.m_arriveFun = other.m_arriveFun;
            // if (this.m_arriveFun)
            //     this.m_arriveFun.CloneValue(other.m_arriveFun);
        };
        return MoveParam;
    }());
    battle.MoveParam = MoveParam;
    __reflect(MoveParam.prototype, "battle.MoveParam");
    var MoveToParam = (function (_super) {
        __extends(MoveToParam, _super);
        function MoveToParam() {
            var _this = _super.apply(this, arguments) || this;
            _this.m_finalX = 0;
            _this.m_finalY = 0;
            _this.pixelPreFramex = 0;
            _this.pixelPreFramey = 0;
            return _this;
        }
        MoveToParam.prototype.CloneValue = function (other) {
            _super.prototype.CloneValue.call(this, other);
            this.m_finalX = other.m_finalX;
            this.m_finalY = other.m_finalY;
            this.pixelPreFramex = other.pixelPreFramex;
            this.pixelPreFramey = other.pixelPreFramey;
        };
        return MoveToParam;
    }(MoveParam));
    battle.MoveToParam = MoveToParam;
    __reflect(MoveToParam.prototype, "battle.MoveToParam");
    var AttackFuntionStruct = (function () {
        function AttackFuntionStruct() {
            this.m_attackFunc = null;
            this.args = [];
        }
        return AttackFuntionStruct;
    }());
    battle.AttackFuntionStruct = AttackFuntionStruct;
    __reflect(AttackFuntionStruct.prototype, "battle.AttackFuntionStruct");
    var AttackParam = (function () {
        function AttackParam() {
            this.attacktarget = -1;
            this.skillID = -1;
            /// 发动被击特效的多个目标，用于AOE技能，多目标投掷物。
            this.behitTarget = [];
            /// 特效播放层的延时间隔时间
            this.delayTime = 0;
            /// 六个函数回调+参数  ActionEvent
            this.m_attackFunc = [null, null, null, null, null, null];
        }
        return AttackParam;
    }());
    battle.AttackParam = AttackParam;
    __reflect(AttackParam.prototype, "battle.AttackParam");
    var FollowPapam = (function (_super) {
        __extends(FollowPapam, _super);
        function FollowPapam() {
            var _this = _super.apply(this, arguments) || this;
            _this.m_renderable = null;
            return _this;
        }
        FollowPapam.prototype.CloneValue = function (other) {
            _super.prototype.CloneValue.call(this, other);
            this.m_renderable = other.m_renderable;
        };
        return FollowPapam;
    }(MoveParam));
    battle.FollowPapam = FollowPapam;
    __reflect(FollowPapam.prototype, "battle.FollowPapam");
})(battle || (battle = {}));
//# sourceMappingURL=ActorRenderDataDefine.js.map