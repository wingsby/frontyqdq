var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DuelBattleController = (function () {
    /**
     * @constructor
     */
    function DuelBattleController() {
        this.m_cur_battle_id = 0;
        this.m_my_team_dead = 0;
        this.m_enemy_team_dead = 0;
    }
    /**
     * 初始化数据
     * @param data
     */
    DuelBattleController.prototype.init = function (data) {
        this.m_data = data;
        this.m_marry_view = Singleton.Get(LayerManager).getView(ui.DuelMarryView);
        var e_team_leader = [];
        if (data != undefined) {
            for (var i = 0; i < this.m_data.e_team_leader.length; i++) {
                e_team_leader.push(RoleInfo.CloneByMsgRole(this.m_data.e_team_leader[i]));
            }
        }
        this.m_data.e_team_leader = e_team_leader;
        this.m_my_team_dead = 0;
        this.m_enemy_team_dead = 0;
    };
    /**
     * 初始化奖励信息
     * @param r_items
     */
    DuelBattleController.prototype.initReward = function (r_items) {
        this.r_items = r_items;
    };
    /**
     * 启动一场流程
     */
    DuelBattleController.prototype.run = function () {
        this.startMarry();
    };
    // region 匹配流程控制
    /**
     * 开始匹配
     */
    DuelBattleController.prototype.startMarry = function () {
        this.m_marry_view.open();
        this.m_marry_view.initView();
        this.m_marry_view.setCallback(this.onMarryFinished, this);
        if (!this.m_data.e_is_player) {
            // 随机一个机器人用来显示
            /*
            let robot_ix: number = UtilsGame.getRandomInt(0, Template.robot.size() - 1);
            let robot_id: number = Template.robot.values[robot_ix].Id;
            let robot_info: Entity.Robot = Template.robot.get(robot_id);
            if(robot_info == null) {
                console.error("Can't get robot info, robot id: " + robot_id);
                return;
            }
             */
            this.m_data.e_name = Template.getGUIText(Template.duel.RobotN[UtilsGame.getRandomInt(0, Template.duel.RobotN.length - 1)]);
            this.m_data.e_avatar = Template.duel.RobotI[UtilsGame.getRandomInt(0, Template.duel.RobotI.length - 1)];
            this.m_data.e_vip_lv = 0;
        }
        this.m_marry_view.setEnemyData(this.m_data.e_name, UtilsArray.sum(this.m_data.e_team_fighting), this.m_data.e_avatar, this.m_data.e_vip_lv, this.m_data.e_team_lv);
    };
    /**
     * 响应匹配完成
     */
    DuelBattleController.prototype.onMarryFinished = function () {
        this.onBegin();
    };
    // endregion
    // region 战斗流程控制
    /**
     * 响应开始战斗
     */
    DuelBattleController.prototype.onBegin = function () {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).hide();
        layer.getView(ui.MainView).showBattlePanel();
        layer.getView(ui.BattleView).showArenaMode();
        layer.getView(ui.ArenaBattleView).open();
        layer.getView(ui.ArenaBattleView).initContentDirect(this.m_data.e_name, this.m_data.e_avatar, battle.BattleType.DUEL);
        layer.getView(ui.ArenaBattleView).setTeamsActive(true);
        Singleton.Get(PveManager).cleanRewardHash();
        // 关闭已打开的界面
        Singleton.Get(LayerManager).getView(ui.DuelView).close();
        // 切换战斗场景
        Singleton.Get(battle.RenderManager).setSceneDirectly(Template.duel.Scene);
        // 设定战斗状态
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.DUEL, battle.E_BATTLE_FLOW.PLAYING);
        this.m_cur_battle_id = 0;
        this.playBattle(this.m_cur_battle_id);
    };
    /**
     * 播放一场战斗
     */
    DuelBattleController.prototype.playBattle = function (idx) {
        var _this = this;
        var battle_data = this.m_data.script[idx];
        if (!battle_data) {
            console.error("Can't load duel battle script, battle id: " + idx);
            this.onAllFinished();
            return;
        }
        this.updateTeamStatus(this.m_cur_battle_id);
        this.updateTeamView();
        var wrapper = new msg.BattleResultMsg();
        wrapper.pack = battle_data;
        if (idx == 0) {
            Singleton.Get(ui.ArenaBattleView).last_duel_start = UtilsGame.Now();
            Singleton.Get(battle.RoundManager).CutScene(false, function () {
                Singleton.Get(battle.RoundManager).Enter(wrapper, _this.onFinished, _this);
            }, this);
        }
        else {
            Singleton.Get(battle.RoundManager).Enter(wrapper, this.onFinished, this);
        }
    };
    /**
     * 更新队伍状态
     * @param idx 当前播放的场次
     */
    DuelBattleController.prototype.updateTeamStatus = function (idx) {
        idx = idx - 1;
        if (idx < 0) {
            this.m_my_team_dead = 0;
            this.m_enemy_team_dead = 0;
            return;
        }
        var battle_data = this.m_data.script[idx];
        if (battle_data == undefined) {
            console.error("Can't load duel battle script, battle id: " + idx);
            return;
        }
        switch (battle_data.m_result) {
            case BattleResult.LEFT_LOSE:
                this.m_my_team_dead++;
                break;
            case BattleResult.LEFT_WIN:
                this.m_enemy_team_dead++;
                break;
            case BattleResult.DRAW:
                this.m_my_team_dead++;
                this.m_enemy_team_dead++;
                break;
        }
    };
    DuelBattleController.prototype.updateTeamView = function () {
        Singleton.Get(LayerManager).getView(ui.ArenaBattleView).setMyTeams(this.getMyTeam(), this.getDeadArr(this.m_my_team_dead));
        Singleton.Get(LayerManager).getView(ui.ArenaBattleView).setEnemyTeams(this.getEnemyTeam(), this.getDeadArr(this.m_enemy_team_dead));
    };
    /**
     * 响应一场战斗完成
     */
    DuelBattleController.prototype.onFinished = function () {
        // 判断是否有下一场
        this.m_cur_battle_id++;
        if (this.m_cur_battle_id < this.m_data.script.length) {
            this.playBattle(this.m_cur_battle_id);
        }
        else {
            this.onAllFinished();
        }
    };
    /**
     * 响应所有战斗完成
     */
    DuelBattleController.prototype.onAllFinished = function () {
        // 设定战斗状态
        Singleton.Get(battle.BattleStateMachine).setCurFlow(battle.E_BATTLE_TYPE.DUEL, battle.E_BATTLE_FLOW.FINISH);
        if (this.r_items != undefined) {
            if (this.r_items[0] != undefined) {
                if (this.r_items[0].count > 0) {
                    switch (this.m_data.is_win) {
                        case BattleResult.LEFT_WIN:
                            Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_36"), 0, 0, 0, this.r_items);
                            break;
                        case BattleResult.LEFT_LOSE:
                            Singleton.Get(DialogControler).showAlertLose();
                            Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_37"), 0, 0, 0, this.r_items);
                            Singleton.Get(DialogControler).setAlertRewardDusty();
                            break;
                        case BattleResult.DRAW:
                            Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_38"), 0, 0, 0, this.r_items);
                            break;
                    }
                }
            }
        }
        Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.PVE, battle.E_BATTLE_BEHAVIOR.PASSIVE);
    };
    /**
     * 响应超时中断战斗
     */
    DuelBattleController.prototype.onTimeout = function () {
        this.onAllFinished();
    };
    // endregion
    // region 辅助方法
    DuelBattleController.prototype.getMyTeam = function () {
        var duel = Singleton.Get(DuelManager).getDuels();
        var roles = Singleton.Get(RoleManager).getRolesInfo();
        return [
            roles.GetRole(duel.getTeamFirstHero(0)),
            roles.GetRole(duel.getTeamFirstHero(1)),
            roles.GetRole(duel.getTeamFirstHero(2))
        ];
    };
    DuelBattleController.prototype.getEnemyTeam = function () {
        return this.m_data.e_team_leader;
    };
    DuelBattleController.prototype.getDeadArr = function (dead_count) {
        var arr = [];
        for (var i = 1; i <= 3; i++) {
            arr.push(i <= dead_count);
        }
        return arr;
    };
    return DuelBattleController;
}());
__reflect(DuelBattleController.prototype, "DuelBattleController");
//# sourceMappingURL=DuelBattleController.js.map