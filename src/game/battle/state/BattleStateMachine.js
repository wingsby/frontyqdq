var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var battle;
(function (battle) {
    /**
     * 战斗类型
     */
    var E_BATTLE_TYPE;
    (function (E_BATTLE_TYPE) {
        E_BATTLE_TYPE[E_BATTLE_TYPE["PVE"] = 0] = "PVE";
        E_BATTLE_TYPE[E_BATTLE_TYPE["BOSS"] = 1] = "BOSS";
        E_BATTLE_TYPE[E_BATTLE_TYPE["INSTANCE"] = 2] = "INSTANCE";
        E_BATTLE_TYPE[E_BATTLE_TYPE["ARENA"] = 3] = "ARENA";
        E_BATTLE_TYPE[E_BATTLE_TYPE["DUEL"] = 4] = "DUEL";
        E_BATTLE_TYPE[E_BATTLE_TYPE["TOWER"] = 5] = "TOWER";
        E_BATTLE_TYPE[E_BATTLE_TYPE["DRAMA"] = 6] = "DRAMA";
        E_BATTLE_TYPE[E_BATTLE_TYPE["GUILD"] = 7] = "GUILD";
        E_BATTLE_TYPE[E_BATTLE_TYPE["GUILD_LOG"] = 8] = "GUILD_LOG";
        E_BATTLE_TYPE[E_BATTLE_TYPE["WORLD_SB"] = 9] = "WORLD_SB";
        E_BATTLE_TYPE[E_BATTLE_TYPE["WORLD_FB"] = 10] = "WORLD_FB";
        E_BATTLE_TYPE[E_BATTLE_TYPE["SEND_ROB"] = 11] = "SEND_ROB";
        E_BATTLE_TYPE[E_BATTLE_TYPE["SEND_LOG"] = 12] = "SEND_LOG"; // 斗士外派-防守日志
    })(E_BATTLE_TYPE = battle.E_BATTLE_TYPE || (battle.E_BATTLE_TYPE = {}));
    /**
     * 战斗流程
     */
    var E_BATTLE_FLOW;
    (function (E_BATTLE_FLOW) {
        E_BATTLE_FLOW[E_BATTLE_FLOW["BEFORE"] = 0] = "BEFORE";
        E_BATTLE_FLOW[E_BATTLE_FLOW["PLAYING"] = 1] = "PLAYING";
        E_BATTLE_FLOW[E_BATTLE_FLOW["FINISH"] = 2] = "FINISH"; // 战斗结束
    })(E_BATTLE_FLOW = battle.E_BATTLE_FLOW || (battle.E_BATTLE_FLOW = {}));
    /**
     * 战斗切换类型
     */
    var E_BATTLE_BEHAVIOR;
    (function (E_BATTLE_BEHAVIOR) {
        E_BATTLE_BEHAVIOR[E_BATTLE_BEHAVIOR["PASSIVE"] = 0] = "PASSIVE";
        E_BATTLE_BEHAVIOR[E_BATTLE_BEHAVIOR["POSITIVE"] = 1] = "POSITIVE"; // 主动
    })(E_BATTLE_BEHAVIOR = battle.E_BATTLE_BEHAVIOR || (battle.E_BATTLE_BEHAVIOR = {}));
    /**
     * 战斗状态机
     */
    var BattleStateMachine = (function () {
        function BattleStateMachine() {
            this.m_cur_type = E_BATTLE_TYPE.DRAMA;
            this.m_cur_flow = E_BATTLE_FLOW.FINISH;
            this.m_enter_time = 0;
        }
        BattleStateMachine.prototype.getCurType = function () {
            return this.m_cur_type;
        };
        BattleStateMachine.prototype.setCurType = function (type) {
            this.m_cur_type = type;
        };
        BattleStateMachine.prototype.getCurFlow = function () {
            return this.m_cur_flow;
        };
        BattleStateMachine.prototype.setCurFlow = function (type, flow) {
            if (this.m_cur_type != type) {
                console.log("[BattleStateMachine] can't set cur flow, curType: " + type + ", curFlow: " + this.m_cur_flow + ", toType: " + type + ", toFlow: " + flow);
                return;
            }
            this.m_cur_flow = flow;
        };
        BattleStateMachine.prototype.reset = function () {
            this.m_cur_type = E_BATTLE_TYPE.PVE;
            this.m_cur_flow = E_BATTLE_FLOW.FINISH;
            if (this.m_reset_callback) {
                this.m_reset_callback.call(this.m_reset_this);
            }
        };
        BattleStateMachine.prototype.regResetCallback = function (callback, thisObj) {
            if (!callback) {
                return;
            }
            this.m_reset_callback = callback;
            this.m_reset_this = thisObj;
        };
        /**
         * 检查当前是否可切换至某类战斗
         * @param to
         * @param behavior
         * @return {boolean}
         */
        BattleStateMachine.prototype.check = function (to, behavior) {
            // 未完成准备前不允许任何切换请求
            if (this.m_cur_flow == E_BATTLE_FLOW.BEFORE) {
                console.log("[BattleStateMachine] check() this.m_cur_flow == E_BATTLE_FLOW.BEFORE");
                // Singleton.Get(ReportManager).reqReportObj("BSM-CF571", {
                //     cur: this.m_cur_type,
                //     to: to,
                //     behavior: behavior
                // });
                return false;
            }
            // 切换规则白名单过滤
            var allow = this.checkSwitchTable(this.m_cur_type, to, behavior);
            // 根据战斗类型判断
            switch (behavior) {
                case E_BATTLE_BEHAVIOR.PASSIVE:
                    if (this.m_cur_flow == E_BATTLE_FLOW.FINISH) {
                        if (!allow) {
                        }
                        return allow;
                    }
                    else {
                        console.log("[BattleStateMachine] check() PASSIVE not finish");
                        // Singleton.Get(ReportManager).reqReportObj("BSM-CF572", {
                        //     cur: this.m_cur_type,
                        //     to: to,
                        //     behavior: behavior
                        // });
                        return false;
                    }
                case E_BATTLE_BEHAVIOR.POSITIVE:
                    if (!allow) {
                    }
                    return allow;
            }
        };
        /**
         * 切换当前战斗状态
         * @param to
         * @param behavior
         * @param args
         * @return {boolean}
         */
        BattleStateMachine.prototype.change = function (to, behavior, callback, thisObj) {
            // console.log("[BattleStateMachine] change, cur: " + this.m_cur_type + ", to: " + to + ", behavior: " + behavior);
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            // 切换至挑战BOSS时，忽略所有检查
            var gateway = Singleton.Get(battle.BattleStateGateway);
            // 检查是否允许切换
            if (!this.check(to, behavior)) {
                // Singleton.Get(ReportManager).reqReportObj("BSM-CF560", {
                //     cur: this.m_cur_type,
                //     to: to,
                //     behavior: behavior
                // });
                // MessageManager.handleDisconnect(560);
                console.log("[BattleStateMachine] check failed, cur: " + this.m_cur_type + ", to: " + to + ", behavior: " + behavior);
                return false;
            }
            // 检查是否有对应的切换方法
            if (!gateway.cbExist(this.m_cur_type, to)) {
                Singleton.Get(ReportManager).reqReportObj("BSM-CF561", {
                    cur: this.m_cur_type,
                    to: to,
                    behavior: behavior
                });
                MessageManager.handleDisconnect(561);
                console.log("[BattleStateMachine] no change function, cur: " + this.m_cur_type + ", to: " + to + ", behavior: " + behavior);
                return false;
            }
            // 调用切换方法 并检查是否成功
            var result = gateway.callGateway.apply(gateway, [this.m_cur_type, to].concat(args));
            if (result) {
                // 记录进入战斗的时间
                this.m_enter_time = UtilsGame.Now();
                // 记录新战斗类型状态
                this.setCurType(to);
                this.m_cur_flow = E_BATTLE_FLOW.BEFORE;
                // 执行回调
                if (callback) {
                    callback.call(thisObj);
                }
            }
            else {
                // Singleton.Get(ReportManager).reqReportObj("BSM-CF562", {
                //     cur: this.m_cur_type,
                //     to: to,
                //     behavior: behavior
                // });
                MessageManager.handleDisconnect(562);
                console.log("[BattleStateMachine] can't change status: " + this.m_cur_type + ", to: " + to + ", behavior: " + E_BATTLE_BEHAVIOR);
            }
        };
        /**
         * 检查战斗切换是否有对应规则
         * @param from
         * @param to
         * @param behavior
         * @return {boolean}
         */
        BattleStateMachine.prototype.checkSwitchTable = function (from, to, behavior) {
            // 初始化白名单
            var allow = {
                pas: [],
                pos: []
            };
            // 根据来源类型生成白名单
            switch (from) {
                case E_BATTLE_TYPE.PVE:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    allow.pos.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS, E_BATTLE_TYPE.INSTANCE, E_BATTLE_TYPE.DUEL, E_BATTLE_TYPE.TOWER, E_BATTLE_TYPE.ARENA, E_BATTLE_TYPE.GUILD, E_BATTLE_TYPE.GUILD_LOG, E_BATTLE_TYPE.WORLD_SB, E_BATTLE_TYPE.WORLD_FB, E_BATTLE_TYPE.SEND_ROB, E_BATTLE_TYPE.SEND_LOG);
                    break;
                case E_BATTLE_TYPE.BOSS:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    allow.pos.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS, E_BATTLE_TYPE.INSTANCE, E_BATTLE_TYPE.DUEL, E_BATTLE_TYPE.TOWER, E_BATTLE_TYPE.ARENA, E_BATTLE_TYPE.GUILD, E_BATTLE_TYPE.GUILD_LOG, E_BATTLE_TYPE.WORLD_SB, E_BATTLE_TYPE.WORLD_FB, E_BATTLE_TYPE.SEND_ROB, E_BATTLE_TYPE.SEND_LOG);
                    break;
                case E_BATTLE_TYPE.INSTANCE:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    allow.pos.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    break;
                case E_BATTLE_TYPE.ARENA:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    allow.pos.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    break;
                case E_BATTLE_TYPE.DUEL:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    allow.pos.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    break;
                case E_BATTLE_TYPE.TOWER:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    allow.pos.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    break;
                case E_BATTLE_TYPE.DRAMA:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.DRAMA);
                    allow.pos.push(E_BATTLE_TYPE.PVE);
                    break;
                case E_BATTLE_TYPE.GUILD:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    allow.pos.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    break;
                case E_BATTLE_TYPE.GUILD_LOG:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    allow.pos.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    break;
                case E_BATTLE_TYPE.WORLD_SB:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    allow.pos.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    break;
                case E_BATTLE_TYPE.WORLD_FB:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    allow.pos.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    break;
                case E_BATTLE_TYPE.SEND_ROB:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    allow.pos.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    break;
                case E_BATTLE_TYPE.SEND_LOG:
                    allow.pas.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    allow.pos.push(E_BATTLE_TYPE.PVE, E_BATTLE_TYPE.BOSS);
                    break;
            }
            // 根据行为类型生成目标白名单
            var allow_cur = [];
            switch (behavior) {
                case E_BATTLE_BEHAVIOR.PASSIVE:
                    allow_cur = allow.pas;
                    break;
                case E_BATTLE_BEHAVIOR.POSITIVE:
                    allow_cur = allow.pos;
                    break;
            }
            return UtilsArray.contains(allow_cur, to);
        };
        return BattleStateMachine;
    }());
    battle.BattleStateMachine = BattleStateMachine;
    __reflect(BattleStateMachine.prototype, "battle.BattleStateMachine");
})(battle || (battle = {}));
//# sourceMappingURL=BattleStateMachine.js.map