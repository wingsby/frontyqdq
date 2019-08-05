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
    var DramaBattleView = (function (_super) {
        __extends(DramaBattleView, _super);
        function DramaBattleView() {
            var _this = _super.call(this, "yw.ArenaBattleSkin") || this;
            _this.player_cur_hp = 0;
            _this.player_mx = 1;
            _this.enemy_cur_hp = 0;
            _this.enemy_mx = 1;
            return _this;
        }
        DramaBattleView.prototype.componentCreated = function () {
            // 禁用不必要的显示对象
            this.groupTeams.visible = false;
            this.groupCountdown.visible = false;
            // 禁用血条缓动效果
            this.pbEnemy.slideDuration = 0;
            this.pbPlayer.slideDuration = 0;
        };
        DramaBattleView.prototype.onDestroy = function () {
        };
        DramaBattleView.prototype.onUpdate = function (time) {
        };
        DramaBattleView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.resetHpBar();
            this.initView();
            this.btnExit.visible = true;
            this.labExit.text = "跳过剧情";
            this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExit, this);
        };
        DramaBattleView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            this.labExit.text = "跳过战斗";
            this.btnExit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExit, this);
        };
        DramaBattleView.prototype.initView = function () {
            var cfg_drama = Template.drama;
            var cfg_player = Template.role.get(cfg_drama.OurIcon);
            var cfg_enemy = Template.role.get(cfg_drama.EnemyIcon);
            if (!cfg_player || !cfg_enemy) {
                console.log("no drama battle cfg role: " + cfg_drama.OurIcon + ", " + cfg_drama.EnemyIcon);
                return;
            }
            this.labPlayerName.text = Template.getGUIText(cfg_player.Name);
            this.imgPlayerAvatar.mask = this.maskPlayerAvatar;
            ResManager.AsyncSetTexture(this.imgPlayerAvatar, cfg_player.Icon);
            this.labEnemyName.text = Template.getGUIText(cfg_enemy.Name);
            this.imgEnemyAvatar.mask = this.maskEnemyAvatar;
            ResManager.AsyncSetTexture(this.imgEnemyAvatar, cfg_enemy.Icon);
        };
        /**
         * 重置血条
         */
        DramaBattleView.prototype.resetHpBar = function () {
            this.pbPlayer.value = 100;
            this.pbEnemy.value = 100;
        };
        // region 玩家血条控制
        DramaBattleView.prototype.setPlayerHpPct = function (pct) {
            // 血条血量
            this.pbPlayer.value = pct * 100;
            // 刷新血条
            this.updatePlayerHp();
        };
        DramaBattleView.prototype.setPlayerHpMax = function (v) {
            this.setPlayerHpPct(1);
            // this.player_cur_hp = v;
            this.player_mx = v;
        };
        DramaBattleView.prototype.setPlayerHp = function (cur) {
            this.setPlayerHpPct(cur / this.player_mx);
            this.player_cur_hp = cur;
        };
        DramaBattleView.prototype.updatePlayerHp = function () {
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
        DramaBattleView.prototype.setEnemyHpPct = function (pct) {
            // 血条血量
            this.pbEnemy.value = pct * 100;
            // 刷新血条
            this.updateEnemyHp();
        };
        DramaBattleView.prototype.setEnemyHpMax = function (v) {
            this.setEnemyHpPct(1);
            // this.enemy_cur_hp = v;
            this.enemy_mx = v;
        };
        DramaBattleView.prototype.setEnemyHp = function (cur) {
            this.setEnemyHpPct(cur / this.enemy_mx);
            this.enemy_cur_hp = cur;
        };
        DramaBattleView.prototype.updateEnemyHp = function () {
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
        // region 跳过战斗
        DramaBattleView.prototype.onClick_btnExit = function () {
            UtilsEffect.buttonEffect(this.btnExit, function () {
                Singleton.Get(DramaManager).getFlow().handleSkip();
            }, this);
        };
        return DramaBattleView;
    }(BaseUI));
    ui.DramaBattleView = DramaBattleView;
    __reflect(DramaBattleView.prototype, "ui.DramaBattleView");
})(ui || (ui = {}));
//# sourceMappingURL=DramaBattleView.js.map