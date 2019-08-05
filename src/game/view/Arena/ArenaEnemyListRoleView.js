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
    var ArenaEnemyListRoleView = (function (_super) {
        __extends(ArenaEnemyListRoleView, _super);
        function ArenaEnemyListRoleView() {
            var _this = _super.call(this) || this;
            _this.enemy_info = undefined;
            _this.skinName = "yw.ArenaEnemyListRoleSkin";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            _this.btnChallenge.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnChallenge, _this);
            _this.btnChallengeEx.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnChallenge, _this);
            _this.btnChallengeSEx.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnChallengeSEx, _this);
            return _this;
        }
        ArenaEnemyListRoleView.prototype.onRemoveFromStage = function () {
            this.enemy_info = undefined;
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnChallenge.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChallenge, this);
            this.btnChallengeEx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChallenge, this);
            this.btnChallengeSEx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChallengeSEx, this);
        };
        /**
         * 设定对手信息
         * @param enemy
         */
        ArenaEnemyListRoleView.prototype.setArenaEnemy = function (enemy) {
            if (!enemy) {
                console.error("cant init arena enemy: " + enemy);
                return;
            }
            if (enemy.type == ArenaPlayerType.Robot) {
                enemy = this.convRobotToTrueman(enemy);
            }
            this.setPlayerEnemy(enemy);
            this.enemy_info = enemy;
        };
        ArenaEnemyListRoleView.prototype.convRobotToTrueman = function (enemy) {
            var enemy_uid_pure = enemy.uid.replace("Rbt", " ");
            var robot_info = Template.robot.get(parseInt(enemy_uid_pure));
            if (!robot_info) {
                console.error("cant find arena robot: " + enemy_uid_pure);
                return;
            }
            // 计算战斗力
            var fighting = 0;
            var valid_role_id = 0;
            for (var i = 0; i < robot_info.Teams.length; i++) {
                if (robot_info.Teams[i] <= 0) {
                    continue;
                }
                if (valid_role_id <= 0) {
                    valid_role_id = robot_info.Teams[i];
                }
                var robot_role = new RoleInfo();
                robot_role.InitByRoleConfigIdAndLv(robot_info.Teams[i], robot_info.Lv[i]);
                fighting += robot_role.fighting;
            }
            enemy.role_id = valid_role_id;
            enemy.vip_lv = 0;
            enemy.avatar_img = robot_info.Icon;
            enemy.team_lv = robot_info.Lv[0];
            enemy.team_fighting = fighting;
            enemy.nickname = Template.getGUIText(robot_info.Name);
            return enemy;
        };
        /**
         * 设定玩家对手信息
         * @param enemy
         */
        ArenaEnemyListRoleView.prototype.setPlayerEnemy = function (enemy) {
            var my_ranking = Singleton.Get(ArenaManager).getMyCurRank();
            // 读取领队角色信息
            var role_info = Template.role.get(enemy.role_id);
            if (!role_info) {
                console.error("cant find arena enemy role: " + enemy.role_id);
                return;
            }
            // 设定领队角色
            this.mcRole.setMovieClip(role_info.Res, battle.ActionType.AT_wait);
            // 设定战斗力和等级
            this.labFighting.text = UtilsGame.stringHander("战力：$1", enemy.team_fighting);
            this.labName.text = UtilsGame.stringHander("Lv.$1 $2", enemy.team_lv, enemy.nickname);
            // 设定头像
            ResManager.asyncsetHeadImg(enemy.avatar_img, this.imgAvatar, this);
            // 设定排名 （前三名不显示文字）
            if (enemy.ranking <= 3) {
                this.labRank.visible = false;
                this.fxTop3.visible = true;
                if (enemy.ranking == 1) {
                    this.imgThrone.visible = false;
                    this.fxTop3.clearMovieClip();
                    this.fxTop3.setMovieClip(DEFINE.EFF_JINGJI1);
                    this.fxTop3.gotoAndPlay(DEFINE.EFF_JINGJI1, -1);
                    this.fxTop3.scaleX = 1.5;
                    this.fxTop3.scaleY = 1.5;
                    this.fxTop3.y = 69;
                }
                else {
                    this.imgThrone.visible = true;
                    this.fxTop3.clearMovieClip();
                    this.fxTop3.setMovieClip(DEFINE.EFF_JINGJI2);
                    this.fxTop3.gotoAndPlay(DEFINE.EFF_JINGJI2, -1);
                }
            }
            this.labRank.text = "排行：" + enemy.ranking.toString();
            // 是否可挑战
            if (enemy.challengable) {
                if (enemy.ranking < my_ranking) {
                    this.groupBtnNr.visible = true;
                    this.groupBtnEx.visible = false;
                }
                else {
                    this.groupBtnNr.visible = false;
                    this.groupBtnEx.visible = true;
                }
            }
            else {
                this.groupBtnNr.visible = false;
                this.groupBtnEx.visible = false;
            }
            // 自己标签
            var my_uid = Singleton.Get(LoginManager).loginInfo._id;
            this.imgSelf.visible = enemy.uid == my_uid;
            if (this.imgSelf.visible) {
                ResManager.AsyncSetTexture(this.imgThrone, "BG_renwudi_zj_png");
            }
            else {
                ResManager.AsyncSetTexture(this.imgThrone, "BG_renwudi_1_png");
            }
            // vip等级
            if (enemy.vip_lv <= 0) {
                this.groupVip.visible = false;
            }
            else {
                this.groupVip.visible = true;
                this.labVip.text = enemy.vip_lv.toString();
            }
        };
        // region 按钮点击事件
        /**
         * 响应点击挑战按钮
         */
        ArenaEnemyListRoleView.prototype.onClick_btnChallenge = function () {
            /*let is_cut_ready: boolean = Singleton.Get(PveManager).reqCutBattle();
            if(!is_cut_ready){
                return;
            }*/
            var _this = this;
            var scroll_id = Template.config.ArenaScroll;
            var my_scroll_info = Singleton.Get(ScrollManager).getScrollActual(scroll_id);
            if (!my_scroll_info) {
                console.error("no scroll: " + scroll_id);
                return;
            }
            // 判断挑战券购买次数
            if (my_scroll_info[0] <= 0) {
                Singleton.Get(ArenaManager).showBuyScroll(function () {
                    _this.onClick_btnChallenge();
                }, this);
                return;
            }
            Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.ARENA, battle.E_BATTLE_BEHAVIOR.POSITIVE, undefined, undefined, this.enemy_info);
        };
        /**
         * 响应点击扫荡5次
         */
        ArenaEnemyListRoleView.prototype.onClick_btnChallengeSEx = function () {
            var _this = this;
            var scroll_id = Template.config.ArenaScroll;
            var my_scroll_info = Singleton.Get(ScrollManager).getScrollActual(scroll_id);
            if (!my_scroll_info) {
                console.error("no scroll: " + scroll_id);
                return;
            }
            // 判断挑战券购买次数
            if (my_scroll_info[0] <= 0) {
                Singleton.Get(ArenaManager).showBuyScroll(function () {
                    _this.onClick_btnChallengeSEx();
                }, this);
                return;
            }
            Singleton.Get(ArenaManager).reqRaid(function () {
                Singleton.Get(LayerManager).getView(ui.ArenaEnemyListView).refreshScroll();
            }, this);
        };
        return ArenaEnemyListRoleView;
    }(eui.Component));
    ui.ArenaEnemyListRoleView = ArenaEnemyListRoleView;
    __reflect(ArenaEnemyListRoleView.prototype, "ui.ArenaEnemyListRoleView");
})(ui || (ui = {}));
//# sourceMappingURL=ArenaEnemyListRoleView.js.map