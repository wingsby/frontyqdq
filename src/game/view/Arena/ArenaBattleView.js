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
    var ArenaBattleView = (function (_super) {
        __extends(ArenaBattleView, _super);
        function ArenaBattleView() {
            var _this = _super.call(this, "yw.ArenaBattleSkin") || this;
            _this.last_duel_start = 0;
            _this.enter_time = 0;
            _this.player_cur_hp = 0;
            _this.player_mx = 1;
            _this.enemy_cur_hp = 0;
            _this.enemy_mx = 1;
            // endregion
            // region 点击事件
            _this.exit_args = undefined;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        ArenaBattleView.prototype.componentCreated = function () {
            // 禁用血条缓动效果
            this.pbEnemy.slideDuration = 0;
            this.pbPlayer.slideDuration = 0;
            this.my_team_arr = new eui.ArrayCollection();
            this.groupMyTeam.itemRenderer = ui.DuelBattleAvatarView;
            this.groupMyTeam.dataProvider = this.my_team_arr;
            this.enemy_team_arr = new eui.ArrayCollection();
            this.groupEnemyTeam.itemRenderer = ui.DuelBattleAvatarView;
            this.groupEnemyTeam.dataProvider = this.enemy_team_arr;
            this.setTeamsActive(false);
        };
        ArenaBattleView.prototype.onDestroy = function () { };
        ArenaBattleView.prototype.onUpdate = function (time) { };
        ArenaBattleView.prototype.onAddToStage = function () {
            this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExit, this);
            Singleton.Get(RegisterUpdate).register(this);
        };
        ArenaBattleView.prototype.onRemoveFromStage = function () {
            this.btnExit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExit, this);
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        ArenaBattleView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.resetHpBar();
            Singleton.Get(LayerManager).getView(ui.GuideView).setShow(false);
            this.enter_time = UtilsGame.Now();
            this.playOpenAni();
        };
        ArenaBattleView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            this.groupCountdown.visible = false;
            Singleton.Get(LayerManager).getView(ui.GuideView).setShow(true);
            this.exit_args = undefined;
        };
        ArenaBattleView.prototype.update = function () {
            switch (this.cur_e_type) {
                case battle.BattleType.DUEL:
                    var now = UtilsGame.Now();
                    var duration = now - this.enter_time;
                    var delta = Template.config.SkipCd * 1000 - duration;
                    var priv = Singleton.Get(PrivManager).getInfo();
                    if (delta > 0 && !priv.has_lifetime_card) {
                        this.labExit.text = "\u8DF3\u8FC7\u6218\u6597(" + Math.floor(delta / 1000) + ")";
                        this.setExitActive(false);
                    }
                    else {
                        this.labExit.text = "\u8DF3\u8FC7\u6218\u6597";
                        this.setExitActive(true);
                    }
                    break;
            }
        };
        ArenaBattleView.prototype.setExitActive = function (active) {
            if (active) {
                this.imgExitActive.visible = true;
                this.imgExitInactive.visible = false;
            }
            else {
                this.imgExitActive.visible = false;
                this.imgExitInactive.visible = true;
            }
        };
        ArenaBattleView.prototype.initContent = function (enemy, e_type) {
            this.initContentDirect(enemy.nickname, enemy.avatar_img, e_type);
        };
        ArenaBattleView.prototype.initContentDirect = function (e_name, e_avatar, e_type, args) {
            // console.log("initContentDirect(), e_type: " + e_type + ", e_name: " + e_name + ", e_avatar: " + e_avatar);
            // 设定当前战斗类型状态
            this.cur_e_type = e_type;
            // 设定玩家信息
            var login_info = Singleton.Get(LoginManager).loginInfo;
            ResManager.asyncsetHeadImg(login_info.icon_url, this.imgPlayerAvatar, this);
            this.labPlayerName.text = login_info.nickname;
            // 设定对手信息
            this.labEnemyName.text = e_name;
            switch (e_type) {
                case battle.BattleType.DUEL:
                    this.btnExit.visible = true;
                    ResManager.asyncsetHeadImg(e_avatar, this.imgEnemyAvatar, this);
                    break;
                case battle.BattleType.ARENA:
                    this.btnExit.visible = true;
                    ResManager.asyncsetHeadImg(e_avatar, this.imgEnemyAvatar, this);
                    break;
                case battle.BattleType.GUILD:
                    this.btnExit.visible = false;
                    ResManager.asyncsetHeadImg(e_avatar, this.imgEnemyAvatar, this);
                    break;
                case battle.BattleType.SEND_ROB:
                case battle.BattleType.SEND_LOG:
                    this.btnExit.visible = true;
                    ResManager.setAvatarCrossServer(args.e_uid, args.e_zid, this.imgEnemyAvatar, this);
                    break;
            }
            this.imgPlayerAvatarBg.mask = this.maskPlayerAvatar;
            this.imgEnemyAvatarBg.mask = this.maskEnemyAvatar;
            this.labExit.text = Template.getGUIText("append_84");
        };
        ArenaBattleView.prototype.initContentNoPlayer = function (e_type, my_name, my_avatar, e_name, e_avatar, args) {
            // 设定当前战斗类型状态
            this.cur_e_type = e_type;
            // 设定对手信息
            this.labPlayerName.text = my_name;
            this.labEnemyName.text = e_name;
            switch (e_type) {
                case battle.BattleType.GUILD:
                    ResManager.asyncsetHeadImg(my_avatar, this.imgPlayerAvatar, this);
                    ResManager.asyncsetHeadImg(e_avatar, this.imgEnemyAvatar, this);
                    break;
                case battle.BattleType.SEND_ROB:
                case battle.BattleType.SEND_LOG:
                    ResManager.setAvatarCrossServer(args.my_uid, args.my_zid, this.imgPlayerAvatar, this);
                    ResManager.setAvatarCrossServer(args.e_uid, args.e_zid, this.imgEnemyAvatar, this);
                    break;
            }
            this.imgPlayerAvatar.mask = this.maskPlayerAvatar;
            this.imgEnemyAvatar.mask = this.maskEnemyAvatar;
            this.btnExit.visible = true;
            this.labExit.text = Template.getGUIText("append_85");
        };
        /**
         * 重置血条
         */
        ArenaBattleView.prototype.resetHpBar = function () {
            this.pbPlayer.value = 100;
            this.pbEnemy.value = 100;
        };
        // region 玩家血条控制
        ArenaBattleView.prototype.setPlayerHpPct = function (pct) {
            // 血条血量
            this.pbPlayer.value = pct * 100;
            // 刷新血条
            this.updatePlayerHp();
        };
        ArenaBattleView.prototype.setPlayerHpMax = function (v) {
            this.setPlayerHpPct(1);
            // this.player_cur_hp = v;
            this.player_mx = v;
        };
        ArenaBattleView.prototype.setPlayerHp = function (cur) {
            this.setPlayerHpPct(cur / this.player_mx);
            this.player_cur_hp = cur;
        };
        ArenaBattleView.prototype.updatePlayerHp = function () {
            // 防御性设值
            if (this.pbPlayer.value < 0) {
                this.pbPlayer.value = 0;
            }
            else if (this.pbPlayer.value > 100) {
                this.pbPlayer.value = 100;
            }
            // 刷新文字数值
            this.labPlayerHpPct.text = Math.floor(this.pbPlayer.value) + "%"; // + " " + this.player_cur_hp + "/" + this.player_mx;
        };
        // endregion
        // region 敌人血条控制
        ArenaBattleView.prototype.setEnemyHpPct = function (pct) {
            // 血条血量
            this.pbEnemy.value = pct * 100;
            // 刷新血条
            this.updateEnemyHp();
        };
        ArenaBattleView.prototype.setEnemyHpMax = function (v) {
            this.setEnemyHpPct(1);
            // this.enemy_cur_hp = v;
            this.enemy_mx = v;
        };
        ArenaBattleView.prototype.setEnemyHp = function (cur) {
            this.setEnemyHpPct(cur / this.enemy_mx);
            this.enemy_cur_hp = cur;
        };
        ArenaBattleView.prototype.updateEnemyHp = function () {
            // 防御性设值
            if (this.pbEnemy.value < 0) {
                this.pbEnemy.value = 0;
            }
            else if (this.pbEnemy.value > 100) {
                this.pbEnemy.value = 100;
            }
            // 刷新文字数值
            this.labEnemyHpPct.text = Math.floor(this.pbEnemy.value) + "%"; // + " " + this.enemy_cur_hp + "/" + this.enemy_mx;
        };
        // endregion
        // region 连战队伍信息
        ArenaBattleView.prototype.setTeamsActive = function (active) {
            this.groupTeams.visible = active;
        };
        ArenaBattleView.prototype.setMyTeams = function (my_roles, is_dead) {
            var arr = [];
            for (var i = 0; i < my_roles.length; i++) {
                arr.push({
                    is_left: true,
                    ani_idx: i,
                    my_role: my_roles[i],
                    is_dead: is_dead[i]
                });
            }
            arr = arr.reverse(); // 我方队伍逆向显示
            this.my_team_arr.source = arr;
        };
        ArenaBattleView.prototype.setEnemyTeams = function (my_roles, is_dead) {
            var arr = [];
            for (var i = 0; i < my_roles.length; i++) {
                arr.push({
                    is_left: false,
                    ani_idx: i,
                    my_role: my_roles[i],
                    is_dead: is_dead[i]
                });
            }
            this.enemy_team_arr.source = arr;
        };
        ArenaBattleView.prototype.setExitParams = function (args) {
            this.exit_args = args;
        };
        ArenaBattleView.prototype.onClick_btnExit = function () {
            /*let is_cut_ready: boolean = Singleton.Get(PveManager).reqCutBattle();
            if(!is_cut_ready){
                return;
            }*/
            var _this = this;
            UtilsEffect.buttonEffect(this.btnExit, function () {
                var priv = Singleton.Get(PrivManager).getInfo();
                switch (_this.cur_e_type) {
                    case battle.BattleType.ARENA:
                        if (priv.has_lifetime_card) {
                            if (UtilsGame.Now() - _this.enter_time < DEFINE.BATTLE_SKIP_MIN_WAIT) {
                                return;
                            }
                            Singleton.Get(ArenaManager).handleBattleEnd(_this.exit_args);
                            _this.close();
                        }
                        else {
                            Singleton.Get(DialogControler).showInfo(1186);
                            return;
                        }
                        break;
                    case battle.BattleType.DUEL:
                        if (!priv.has_lifetime_card) {
                            var now = UtilsGame.Now();
                            var duration = now - _this.enter_time;
                            var delta = Template.config.SkipCd * 1000 - duration;
                            if (delta > 0) {
                                Singleton.Get(DialogControler).showString(UtilsGame.stringHander(Template.getGUIText("skip"), Math.floor(delta / 1000)));
                                return;
                            }
                        }
                        Singleton.Get(DuelManager).getBattleCtrl().onAllFinished();
                        _this.close();
                        break;
                    case battle.BattleType.SEND_ROB:
                        Singleton.Get(SendManager).onRobEnd(_this.exit_args);
                        break;
                    case battle.BattleType.SEND_LOG:
                        Singleton.Get(SendManager).onLogReplayEnd(_this.exit_args);
                        break;
                    case battle.BattleType.GUILD:
                        if (Singleton.Get(GuildWarManager).is_play_log) {
                            Singleton.Get(GuildWarManager).handleLogBattleEnd(_this.exit_args);
                        }
                        else {
                            Singleton.Get(GuildWarManager).handleGuildBattleEnd(_this.exit_args);
                        }
                        break;
                }
            }, this);
            /**
            const my_vip_lv: number = Singleton.Get(PlayerInfoManager).getVipLevel();
            const jump_need_vip_lv: number = Template.config.ArenaVip;

            if (my_vip_lv < jump_need_vip_lv) {
                Singleton.Get(DialogControler).showString("VIP" + Template.config.ArenaVip + Template.getGuiText("append_86"));
                return;
            }
             **/
        };
        // endregion
        // region 倒计时
        /**
         * 设定BOSS倒计时
         * @param elapsedMs 已经过毫秒数
         * @param maxMs 倒计时总毫秒数
         */
        ArenaBattleView.prototype.setBossCountdown = function (elapsedMs, maxMs) {
            if (!this.groupCountdown.visible) {
                this.groupCountdown.visible = true;
                this.groupCountdown.y = 0;
                this.groupCountdown.alpha = 0.4;
                var tw = egret.Tween.get(this.groupCountdown);
                tw.to({ y: 86, alpha: 1 }, 200, egret.Ease.sineOut);
            }
            // 计算剩余毫秒数
            var lastMs = maxMs - elapsedMs;
            // 防御除数为零
            if (lastMs <= 0) {
                return;
            }
            // 设定倒计时
            this.labCountdown.text = UtilsGame.timeToString_MS(lastMs);
        };
        // endregion
        // region 动态效果
        ArenaBattleView.prototype.playOpenAni = function () {
            egret.Tween.removeTweens(this.groupTop);
            egret.Tween.removeTweens(this.groupBottom);
            this.groupTop.y = -80;
            this.groupTop.alpha = 0.5;
            var tw_top = egret.Tween.get(this.groupTop);
            tw_top.to({ y: 0, alpha: 1 }, 300, egret.Ease.sineOut);
            this.groupBottom.y = 800;
            this.groupBottom.alpha = 0.5;
            var tw_bottom = egret.Tween.get(this.groupBottom);
            tw_bottom.to({ y: 706, alpha: 1 }, 300, egret.Ease.sineOut);
        };
        return ArenaBattleView;
    }(BaseUI));
    ui.ArenaBattleView = ArenaBattleView;
    __reflect(ArenaBattleView.prototype, "ui.ArenaBattleView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=ArenaBattleView.js.map