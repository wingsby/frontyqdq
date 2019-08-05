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
    var ArenaEnemyListView = (function (_super) {
        __extends(ArenaEnemyListView, _super);
        function ArenaEnemyListView() {
            var _this = _super.call(this, "yw.ArenaEnemyListSkin") || this;
            _this.return_to_daily = false;
            /**
             * 初始化列表内容
             * @param args
             */
            _this.m_is_me_top3 = false;
            _this.m_last_enemy_info = undefined;
            return _this;
        }
        /**
         * 打开界面
         */
        ArenaEnemyListView.prototype.open = function () {
            var _this = this;
            var layer = Singleton.Get(LayerManager);
            Singleton.Get(ArenaManager).reqEnemies(function (args) {
                _this.initContent(args);
                layer.addView(_this);
                // 如果不是前三名，自动滚动到底部
                if (!_this.m_is_me_top3) {
                    _this.scroller.validateNow();
                    _this.scroller.viewport.scrollV = _this.scroller.viewport.contentHeight - _this.scroller.viewport.height;
                }
            }, this);
            this.playInitAni();
        };
        /**
         * 关闭界面
         */
        ArenaEnemyListView.prototype.close = function () {
            this.return_to_daily = false;
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeViewEx(this);
            }
            this.btnAgent.visible = false;
            this.btnAgent.x = 0;
            this.btnAgent.y = 0;
            // layer.destoryView(ui.ArenaEnemyListView);
            // this.onDestroy();
        };
        ArenaEnemyListView.prototype.componentCreated = function () {
            this.btnRefresh.text = Template.getGUIText("ui_arena12"); // TODO 加到字典
            this.btnOpinion.text = "布阵";
            this.btnOpinion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.btnRefresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRefresh, this);
            this.btnBuyScroll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuyScroll, this);
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
            this.imgBg.mask = this.imgBgMask;
        };
        ArenaEnemyListView.prototype.onDestroy = function () {
            this.btnOpinion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.btnRefresh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRefresh, this);
            this.btnBuyScroll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuyScroll, this);
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        ArenaEnemyListView.prototype.onUpdate = function (time) {
        };
        ArenaEnemyListView.prototype.playInitAni = function () {
            this.imgBg.scaleX = 1.4;
            this.imgBg.scaleY = 1.4;
            var tw_bg = egret.Tween.get(this.imgBg);
            tw_bg.to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.sineOut);
        };
        /**
         * 刷新挑战次数信息
         */
        ArenaEnemyListView.prototype.refreshScroll = function () {
            this.initScrollInfo();
        };
        ArenaEnemyListView.prototype.cleanContent = function () {
            if (this.enemies_childs == undefined) {
                this.enemies_childs = [];
            }
            if (this.enemies_childs.length > 0) {
                for (var i = 0; i < this.enemies_childs.length; i++) {
                    this.groupEnemies.removeChild(this.enemies_childs[i]);
                }
                this.enemies_childs = [];
            }
            if (this.enemies_prime != undefined) {
                this.groupEnemiesPrime.removeChild(this.enemies_prime);
                this.enemies_prime = undefined;
            }
        };
        ArenaEnemyListView.prototype.initContent = function (args) {
            // 挑战券信息
            this.initScrollInfo();
            // 执行清理
            this.cleanContent();
            // 提取敌人信息
            var enemies = args[0];
            if (enemies == undefined) {
                return;
            }
            // 插入前三
            var prime = new ui.ArenaEnemyListPrimeView();
            prime.setEnemy([enemies[0], enemies[1], enemies[2]]);
            this.groupEnemiesPrime.addChild(prime);
            this.enemies_prime = prime;
            // 获取玩家信息
            var my_uid = Singleton.Get(LoginManager).loginInfo._id;
            var my_cur_arena_rank = Singleton.Get(ArenaManager).getMyCurRank();
            var is_player_inserted = (enemies[0].uid == my_uid) || (enemies[1].uid == my_uid) || (enemies[2].uid == my_uid);
            var is_me_top3 = false;
            // 插入所有敌人
            var direction_idx = 0;
            for (var i = 3; i < enemies.length; i++) {
                // 插入玩家
                if (enemies[i].ranking > my_cur_arena_rank && !is_player_inserted) {
                    is_player_inserted = true;
                    this.insertPlayerSelf((direction_idx % 2 == 0) ? ui.ArenaEnemyListItemType.Left : ui.ArenaEnemyListItemType.Right);
                    direction_idx++;
                }
                // 插入敌人
                var item_enemy = new ui.ArenaEnemyListItemView((direction_idx % 2 == 0) ? ui.ArenaEnemyListItemType.Left : ui.ArenaEnemyListItemType.Right);
                item_enemy.setEnemy(enemies[i]);
                this.groupEnemies.addChild(item_enemy);
                this.enemies_childs.push(item_enemy);
                direction_idx++;
                this.m_last_enemy_info = enemies[i];
            }
            // 对列表元素进行排序
            /**
            for(let i: number = this.enemies_childs.length - 1; i > 0; i--){
                this.groupEnemies.setChildIndex(this.enemies_childs[i], this.enemies_childs.length - i);
            }
             */
            // 如果玩家还未被插入，则插入玩家
            if (!is_player_inserted) {
                this.insertPlayerSelf((direction_idx % 2 == 0) ? ui.ArenaEnemyListItemType.Left : ui.ArenaEnemyListItemType.Right);
            }
            this.m_is_me_top3 = is_me_top3;
        };
        /**
         * 初始化挑战券信息
         */
        ArenaEnemyListView.prototype.initScrollInfo = function () {
            var scroll_id = Template.config.ArenaScroll;
            var scroll_info = Template.scroll.get(scroll_id);
            if (scroll_info == undefined) {
                egret.error("no scroll: " + scroll_id);
                return;
            }
            var my_scroll = Singleton.Get(ScrollManager).getScrollActual(scroll_id);
            if (my_scroll == undefined) {
                egret.error("no scroll: " + scroll_id);
                return;
            }
            this.labScrollCount.text = UtilsGame.stringHander(Template.getGUIText("ui_arena11"), my_scroll[0], scroll_info.InitialP);
        };
        /**
         * 插入玩家自身
         */
        ArenaEnemyListView.prototype.insertPlayerSelf = function (direction) {
            var item_player = new ui.ArenaEnemyListItemView(direction);
            item_player.setEnemy(this.generateMyEnemyInfo());
            this.groupEnemies.addChild(item_player);
            this.enemies_childs.push(item_player);
        };
        /**
         * 生成玩家自己的敌人信息
         * @returns {ArenaEnemyInfo}
         */
        ArenaEnemyListView.prototype.generateMyEnemyInfo = function () {
            var player_info_mgr = Singleton.Get(PlayerInfoManager);
            var login_info = Singleton.Get(LoginManager).loginInfo;
            var enemy_info = new ArenaEnemyInfo();
            enemy_info.type = ArenaPlayerType.Player;
            enemy_info.uid = login_info._id;
            enemy_info.ranking = Singleton.Get(ArenaManager).getMyCurRank();
            enemy_info.role_id = Singleton.Get(RoleManager).getRolesInfo().getFirstRoleId();
            enemy_info.vip_lv = player_info_mgr.getVipLevel();
            enemy_info.avatar_img = Singleton.Get(LoginManager).loginInfo.icon_url;
            enemy_info.team_lv = player_info_mgr.getTeamLv();
            enemy_info.team_fighting = player_info_mgr.getTeamCurrentFighting();
            enemy_info.nickname = Singleton.Get(LoginManager).loginInfo.nickname;
            enemy_info.challengable = false;
            return enemy_info;
        };
        // region 点击事件
        ArenaEnemyListView.prototype.onClick_btnRefresh = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnRefresh, function () {
                var is_refresh_time_ok = Singleton.Get(ArenaManager).checkEnemiesRefreshTime();
                if (!is_refresh_time_ok) {
                    Singleton.Get(DialogControler).showInfo(1172, _this, undefined, undefined, Singleton.Get(ArenaManager).getEnemiesRefreshTime().toString());
                    return;
                }
                Singleton.Get(ArenaManager).reqEnemies(_this.initContent, _this);
            }, this);
        };
        ArenaEnemyListView.prototype.onClick_btnOpinion = function () {
            UtilsEffect.buttonEffect(this.btnOpinion, function () {
                RoleUtil.openHeroOpinion();
            }, this);
        };
        ArenaEnemyListView.prototype.onClick_btnBuyScroll = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnBuyScroll, function () {
                Singleton.Get(ArenaManager).showBuyScroll(_this.initScrollInfo, _this);
            }, this);
        };
        // endregion
        // region 引导
        ArenaEnemyListView.prototype.initAgent = function () {
            this.btnAgent.visible = true;
            if (this.enemies_childs.length >= 6) {
                this.btnAgent.x = 288;
                this.btnAgent.y = 216;
            }
            else {
                this.btnAgent.x = 288;
                this.btnAgent.y = 358;
            }
        };
        ArenaEnemyListView.prototype.onClick_btnAgent = function (e) {
            Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.ARENA, battle.E_BATTLE_BEHAVIOR.POSITIVE, undefined, undefined, this.m_last_enemy_info);
        };
        return ArenaEnemyListView;
    }(BaseUI));
    ui.ArenaEnemyListView = ArenaEnemyListView;
    __reflect(ArenaEnemyListView.prototype, "ui.ArenaEnemyListView");
})(ui || (ui = {}));
//# sourceMappingURL=ArenaEnemyListView.js.map