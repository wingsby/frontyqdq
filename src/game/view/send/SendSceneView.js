var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var E_SEND_SCENE_POS;
    (function (E_SEND_SCENE_POS) {
        E_SEND_SCENE_POS[E_SEND_SCENE_POS["ATTACK"] = 0] = "ATTACK";
        E_SEND_SCENE_POS[E_SEND_SCENE_POS["WAIT"] = 1] = "WAIT";
        E_SEND_SCENE_POS[E_SEND_SCENE_POS["OUTSCENE"] = 2] = "OUTSCENE";
    })(E_SEND_SCENE_POS = ui.E_SEND_SCENE_POS || (ui.E_SEND_SCENE_POS = {}));
    var SendSceneView = (function (_super) {
        __extends(SendSceneView, _super);
        function SendSceneView() {
            var _this = _super.call(this) || this;
            _this.m_quest_id = 0;
            _this.m_send_id = 0;
            _this.m_last_tick = 0;
            _this.m_player_pos = [104];
            _this.m_enemy_pos = [186, 336, 746];
            _this.is_flow_playing = false; // 是否有任何过程动画在播放
            _this.skinName = "yw.SendSceneSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        SendSceneView.prototype.onAddToStage = function () {
            this.m_bg_playing = false;
            Singleton.Get(RegisterUpdate).register(this);
            this.tgBg.addEventListener(egret.Event.COMPLETE, this.onComplete_tgBg, this);
        };
        SendSceneView.prototype.onRemoveFromStage = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
            this.tgBg.removeEventListener(egret.Event.COMPLETE, this.onComplete_tgBg, this);
        };
        SendSceneView.prototype.update = function () {
            var now = UtilsGame.Now();
            if (now - this.m_last_tick > 1000) {
                this.m_last_tick = now;
                // 检查当前是否播完，如果播完且有变化则播放过渡后进入下一场
                if (this.is_flow_playing == false) {
                    if (this.status != this.last_played_status) {
                        this.play(this.status);
                    }
                    else if (this.status == E_SEND_STATUS.ONGOING) {
                        this.play(this.status);
                    }
                }
                this.last_played_status = this.status;
            }
        };
        SendSceneView.prototype.onComplete_tgBg = function () {
            if (this.m_bg_playing) {
                this.tgBg.stop();
                this.tgBg.play();
            }
        };
        SendSceneView.prototype.playBgScroll = function () {
            this.m_bg_playing = true;
            this.tgBg.play();
        };
        SendSceneView.prototype.stopBgScroll = function () {
            this.m_bg_playing = false;
            this.tgBg.pause();
        };
        SendSceneView.prototype.setQuest = function (quest_id) {
            this.m_quest_id = quest_id;
            var inf_quest = Singleton.Get(SendManager).getInfo().getQuest(quest_id);
            this.m_send_id = inf_quest.send_id;
            var cfg_send = Template.send.get(this.m_send_id);
            this.imgBg0.texture = null;
            this.imgBg1.texture = null;
            ResManager.setTexture(this.imgBg0, cfg_send.Print);
            ResManager.setTexture(this.imgBg1, cfg_send.Print);
        };
        SendSceneView.prototype.setStatus = function (status) {
            this.status = status;
            this.last_played_status = status;
            if (!this.is_flow_playing) {
                this.play(status);
            }
        };
        SendSceneView.prototype.play = function (status) {
            switch (status) {
                case E_SEND_STATUS.ONGOING:
                    this.playBattle();
                    break;
                case E_SEND_STATUS.END:
                    this.PlayEnd();
                    break;
                default:
                    this.playPrepare();
                    break;
            }
        };
        SendSceneView.prototype.playPrepare = function () {
            this.stopBgScroll();
            this.tgBg.stop();
            this.groupRolePlayer.visible = false;
            this.arPlayer.clearMovieClip();
            this.groupRoleEnemy.visible = false;
            this.groupRoleEnemy.x = this.m_enemy_pos[E_SEND_SCENE_POS.WAIT];
            var cfg_send = Template.send.get(this.m_send_id);
            var res_ene_role = cfg_send.Model[0];
            this.arEnemy.clearMovieClip();
            this.is_flow_playing = false;
        };
        SendSceneView.prototype.playBattle = function () {
            var _this = this;
            this.playBgScroll();
            var inf_quest = Singleton.Get(SendManager).getInfo().getQuest(this.m_quest_id);
            var cfg_send = Template.send.get(this.m_send_id);
            var role_id = SendUtil.getValidRoles(inf_quest.roles)[0];
            var cfg_role = Template.role.get(role_id);
            this.groupRolePlayer.visible = true;
            this.arPlayer.clearMovieClip();
            this.arPlayer.setMovieClip(cfg_role.Res, battle.ActionType.AT_move);
            this.arPlayer.doAction(battle.ActionType.AT_move);
            this.groupRoleEnemy.visible = true;
            this.groupRoleEnemy.x = this.m_enemy_pos[E_SEND_SCENE_POS.OUTSCENE];
            this.arEnemy.alpha = 1;
            this.arEnemy.clearMovieClip();
            this.arEnemy.setMovieClip(cfg_send.Model[UtilsGame.getRandomInt(0, cfg_send.Model.length - 1)], battle.ActionType.AT_wait);
            this.is_flow_playing = true;
            var tw_enemy = egret.Tween.get(this.groupRoleEnemy);
            tw_enemy.to({ x: this.m_enemy_pos[E_SEND_SCENE_POS.ATTACK] }, 4000)
                .call(function () {
                _this.stopBgScroll();
                _this.arPlayer.doAction(battle.ActionType.AT_wait);
                _this.arEnemy.doAction(battle.ActionType.AT_wait);
            }, this).wait(400).call(function () {
                _this.arPlayer.doAction(UtilsGame.getRandomInt(0, 3) > 0 ? battle.ActionType.AT_attack : battle.ActionType.AT_skill);
                _this.arEnemy.doAction(UtilsGame.getRandomInt(0, 3) > 0 ? battle.ActionType.AT_attack : battle.ActionType.AT_skill);
            }).wait(1000).call(function () {
                _this.arPlayer.doAction(battle.ActionType.AT_wait);
                _this.arEnemy.doAction(battle.ActionType.AT_wait);
            }).call(function () {
                var tw_mc_enemy = egret.Tween.get(_this.arEnemy);
                tw_mc_enemy.to({ alpha: 0 }, 1000);
            }, this).wait(1200).call(function () {
                _this.is_flow_playing = false;
            }, this);
        };
        SendSceneView.prototype.PlayEnd = function () {
            this.stopBgScroll();
            var inf_quest = Singleton.Get(SendManager).getInfo().getQuest(this.m_quest_id);
            this.groupRolePlayer.visible = true;
            var role_id = SendUtil.getValidRoles(inf_quest.roles)[0];
            var cfg_role = Template.role.get(role_id);
            this.arPlayer.setMovieClip(cfg_role.Res);
            this.arPlayer.doAction(battle.ActionType.AT_wait);
            this.groupRoleEnemy.visible = false;
            this.groupRoleEnemy.x = this.m_enemy_pos[E_SEND_SCENE_POS.WAIT];
            this.arEnemy.clearMovieClip();
            this.is_flow_playing = false;
        };
        return SendSceneView;
    }(eui.Component));
    ui.SendSceneView = SendSceneView;
    __reflect(SendSceneView.prototype, "ui.SendSceneView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=SendSceneView.js.map