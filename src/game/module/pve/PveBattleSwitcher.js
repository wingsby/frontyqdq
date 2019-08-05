var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PveBattleSwitcher = (function () {
    function PveBattleSwitcher() {
        this.type = battle.E_BATTLE_TYPE.PVE;
        this.cb_list = new Dictionary();
        this.cb_list.add(battle.E_BATTLE_TYPE.PVE, this.toPve);
        this.cb_list.add(battle.E_BATTLE_TYPE.BOSS, this.toBoss);
        this.cb_list.add(battle.E_BATTLE_TYPE.INSTANCE, this.toInstance);
        this.cb_list.add(battle.E_BATTLE_TYPE.ARENA, this.toArena);
        this.cb_list.add(battle.E_BATTLE_TYPE.DUEL, this.toDuel);
        this.cb_list.add(battle.E_BATTLE_TYPE.TOWER, this.toTower);
        this.cb_list.add(battle.E_BATTLE_TYPE.GUILD, this.toGuild);
        this.cb_list.add(battle.E_BATTLE_TYPE.GUILD_LOG, this.toGuildLog);
        this.cb_list.add(battle.E_BATTLE_TYPE.WORLD_SB, this.toWorldSingle);
        this.cb_list.add(battle.E_BATTLE_TYPE.WORLD_FB, this.toWorldFull);
        this.cb_list.add(battle.E_BATTLE_TYPE.SEND_ROB, this.toSendRob);
        this.cb_list.add(battle.E_BATTLE_TYPE.SEND_LOG, this.toSendLog);
        Singleton.Get(battle.BattleStateGateway).regSwitcher(this);
    }
    PveBattleSwitcher.prototype.toPve = function () {
        Singleton.Get(PveManager).actBattlePve(false);
    };
    PveBattleSwitcher.prototype.toBoss = function () {
        Singleton.Get(PveManager).actBattleBoss();
    };
    PveBattleSwitcher.prototype.toInstance = function (id) {
        Singleton.Get(InstanceManager).actBattleInstance(id, function () {
            var instance_info = Template.instance.get(id);
            if (!instance_info) {
                console.error("no instance: " + id);
                return;
            }
            Singleton.Get(battle.RenderManager).setSceneDirectly(instance_info.Scene);
            Singleton.Get(ui.InstanceNewBaseView).onBattleBegin(id);
        }, this);
    };
    PveBattleSwitcher.prototype.toArena = function (enemy) {
        Singleton.Get(ArenaManager).actBattleArena(enemy, function () {
            Singleton.Get(ArenaManager).onBattleBegin(enemy);
            Singleton.Get(battle.RenderManager).setSceneDirectly(Template.config.ArenaScene);
        }, this);
    };
    PveBattleSwitcher.prototype.toDuel = function (callback, thisObj) {
        Singleton.Get(DuelManager).actBattleDuel(function (rec_duel) {
            if (callback) {
                callback.call(thisObj);
            }
            // 通知BattleController开始处理战斗
            if (rec_duel) {
                var bat_ctrl = Singleton.Get(DuelManager).getBattleCtrl();
                bat_ctrl.init(rec_duel.battle);
                bat_ctrl.initReward(rec_duel.r_items);
                bat_ctrl.run();
            }
        }, this);
    };
    PveBattleSwitcher.prototype.toTower = function (cb_win, cb_lose, thisObj) {
        Singleton.Get(TowerManager).actBattleTower(cb_win, cb_lose, thisObj, function () {
            Singleton.Get(TowerManager).getBattleCtrl().onBattleBegin();
        }, this);
    };
    PveBattleSwitcher.prototype.toGuild = function (uid) {
        Singleton.Get(GuildWarManager).actBattleGuild(uid, function () {
            GuildWarViewHandler.closeGuildWar();
            GuildWarViewHandler.openBattle(uid);
            Singleton.Get(battle.RenderManager).setSceneDirectly(Template.config.ArenaScene);
        }, this);
    };
    PveBattleSwitcher.prototype.toGuildLog = function (log_id, uid) {
        Singleton.Get(GuildWarManager).actBattleGuildLog(log_id, uid, function (my_name, my_avatar, ene_name, ene_avatar) {
            GuildWarViewHandler.closeGuildWar();
            GuildWarViewHandler.openBattleLog(my_name, my_avatar, ene_name, ene_avatar);
            Singleton.Get(battle.RenderManager).setSceneDirectly(Template.config.ArenaScene);
        }, this);
    };
    PveBattleSwitcher.prototype.toWorldSingle = function (id) {
        var _this = this;
        var cfg_sgs = Template.singleBoss.get(id);
        var cfg_scene = Template.scene.get(cfg_sgs.Scene);
        Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open(DEFINE.SYNC_LOADING_DURATION);
        ResManager.getResAsync(cfg_scene.bgBack, function () {
            ResManager.getResAsync(cfg_scene.bgFront, function () {
                Singleton.Get(BossManager).actBattleSingle(id, function () {
                    BossViewHandler.close();
                    BossViewHandler.openSingle(id);
                    Singleton.Get(battle.RenderManager).setSceneDirectly(cfg_sgs.Scene);
                }, _this);
            }, _this);
        }, this);
    };
    PveBattleSwitcher.prototype.toWorldFull = function (id) {
        var _this = this;
        var cfg_fls = Template.fullBoss.get(id);
        var cfg_scene = Template.scene.get(cfg_fls.Scene);
        Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open(DEFINE.SYNC_LOADING_DURATION);
        ResManager.getResAsync(cfg_scene.bgBack, function () {
            ResManager.getResAsync(cfg_scene.bgFront, function () {
                Singleton.Get(BossManager).actBattleFull(id, function () {
                    BossViewHandler.close();
                    BossViewHandler.openFull(id);
                    Singleton.Get(battle.RenderManager).setSceneDirectly(cfg_fls.Scene);
                }, _this);
            }, _this);
        }, this);
    };
    PveBattleSwitcher.prototype.toSendRob = function (quest_id, team_id, type) {
        var _this = this;
        var info = Singleton.Get(SendManager).getInfo();
        var inf_team;
        if (type == E_SEND_ROB_TYPE.REVENGE) {
            inf_team = info.getRevTeam(team_id);
        }
        else {
            inf_team = info.getRobTeam(team_id);
        }
        if (!inf_team) {
            console.error("no team: " + team_id + ", type: " + type);
            return;
        }
        var cfg_ene_send = Template.send.get(inf_team.quest.send_id);
        var cfg_scene = Template.scene.get(cfg_ene_send.Scene);
        Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open(DEFINE.SYNC_LOADING_DURATION);
        ResManager.getResAsync(cfg_scene.bgBack, function () {
            ResManager.getResAsync(cfg_scene.bgFront, function () {
                Singleton.Get(SendManager).actRobExec(quest_id, inf_team.uid, inf_team.zid, inf_team.quest_id, type, function () {
                    SendViewHandler.closeAll();
                    SendViewHandler.openBattleRob(inf_team);
                    Singleton.Get(battle.RenderManager).setSceneDirectly(cfg_ene_send.Scene);
                });
            }, _this);
        }, this);
    };
    PveBattleSwitcher.prototype.toSendLog = function (log_id) {
        var _this = this;
        var info = Singleton.Get(SendManager).getInfo();
        var inf_log = info.getRobLog(log_id);
        if (!inf_log) {
            console.error("no log: " + log_id);
            return;
        }
        var cfg_send = Template.send.get(inf_log.send_id);
        var cfg_scene = Template.scene.get(cfg_send.Scene);
        Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open(DEFINE.SYNC_LOADING_DURATION);
        ResManager.getResAsync(cfg_scene.bgBack, function () {
            ResManager.getResAsync(cfg_scene.bgFront, function () {
                Singleton.Get(SendManager).actLogReplay(log_id, function () {
                    SendViewHandler.closeAll();
                    SendViewHandler.openBattleLog(inf_log);
                    Singleton.Get(battle.RenderManager).setSceneDirectly(cfg_send.Scene);
                });
            }, _this);
        }, this);
    };
    return PveBattleSwitcher;
}());
__reflect(PveBattleSwitcher.prototype, "PveBattleSwitcher", ["battle.IBattleSwitcher"]);
//# sourceMappingURL=PveBattleSwitcher.js.map