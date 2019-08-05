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
    var DuelMarryView = (function (_super) {
        __extends(DuelMarryView, _super);
        /**
         * @constructor
         */
        function DuelMarryView() {
            var _this = _super.call(this, "yw.DuelMarrySkin") || this;
            _this.is_tick_started = false;
            _this.last_tick_time = 0;
            _this.delta_time = 0;
            _this.tick_start_time = 0;
            _this.is_bandit_active = false;
            _this.bandit_cut_timer = 0;
            _this.max_waiting_time = 0;
            _this.enemy_name = "";
            _this.enemy_fighting = 0;
            _this.enemy_icon = "";
            _this.enemy_vip = 0;
            _this.enemy_team_lv = 0;
            _this.cur_avatar_id = 0;
            return _this;
        }
        DuelMarryView.prototype.componentCreated = function () {
            this.labTitle.text = "勒令匹配";
        };
        DuelMarryView.prototype.onDestroy = function () {
        };
        DuelMarryView.prototype.onUpdate = function (time) {
        };
        DuelMarryView.prototype.open = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().addPopup(this);
            Singleton.Get(RegisterUpdate).register(this);
        };
        DuelMarryView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        DuelMarryView.prototype.update = function (time) {
            if (this.delta_time <= 0) {
                this.delta_time = UtilsGame.Now();
            }
            else {
                this.delta_time = UtilsGame.Now() - this.last_tick_time;
            }
            this.last_tick_time = UtilsGame.Now();
            if (this.is_tick_started) {
                this.onUpdateProgress();
            }
            if (this.is_bandit_active) {
                // this.onUpdateBandit_Cut(); // 直接切换
                this.onUpdateBandit_Roll(); // 滚动切换
            }
        };
        DuelMarryView.prototype.initView = function () {
            this.initMask();
            this.initMyInfo();
            this.initFakeEnemy();
            this.initBandit();
        };
        DuelMarryView.prototype.initMyInfo = function () {
            var pi_mgr = Singleton.Get(PlayerInfoManager);
            var loginInfo = Singleton.Get(LoginManager).loginInfo;
            var duel = Singleton.Get(DuelManager).getDuels();
            ResManager.asyncsetHeadImg(loginInfo.icon_url, this.imgMyAvatar, this);
            this.labMyLv.text = "ч." + pi_mgr.getTeamLv();
            this.labMyName.text = loginInfo.nickname;
            this.labMyFighting.text = duel.clacAllFighting().toString();
            var vip_lv = pi_mgr.getVipLevel();
            if (vip_lv > 0) {
                this.groupMyVip.visible = true;
                this.labMyVipLevel.text = vip_lv.toString();
            }
            else {
                this.groupMyVip.visible = false;
            }
        };
        DuelMarryView.prototype.initFakeEnemy = function () {
            this.labEnemyLv.visible = false;
            this.groupEnemyVip.visible = false;
            this.groupEnemyInfo.visible = false;
            this.groupWaiting.visible = true;
            this.progressMarry.value = 0;
            this.is_tick_started = true;
            this.max_waiting_time = Template.duel.grabbleT;
            this.is_bandit_active = true;
        };
        DuelMarryView.prototype.setEnemyData = function (name, fighting, icon, vip, team_lv) {
            this.enemy_name = name;
            this.enemy_fighting = fighting;
            this.enemy_icon = icon;
            this.enemy_vip = vip;
            this.enemy_team_lv = team_lv;
            // console.log(`setEnemyData({ name: ${name}, fighting: ${fighting}, icon: ${icon}, vip: ${vip}, team_lv: ${team_lv}})`);
            // this.imgEnemyAvatar.texture = undefined; // 清空
            ResManager.asyncsetHeadImg(this.enemy_icon, this.imgEnemyAvatar, this);
        };
        DuelMarryView.prototype.initBandit = function () {
            this.groupBandit.y = 0;
            this.groupBandit.filters = UtilsEffect.BlurFilter();
            this.imgEnemyAvatar.visible = false;
        };
        DuelMarryView.prototype.onUpdateBandit_Roll = function () {
            var elapsed_time = this.last_tick_time - this.tick_start_time;
            var last_time = this.max_waiting_time * 1.4 - elapsed_time;
            /*
            if(last_time < this.max_waiting_time * 0.6) {
                this.groupBandit.y -= last_time * 0.001 * this.delta_time;
            } else {
                this.groupBandit.y -= last_time * 0.00025 * this.delta_time;
            }
            */
            this.groupBandit.y -= last_time * 0.00025 * this.delta_time;
            if (this.groupBandit.y <= -64) {
                this.groupBandit.y = 0;
                this.imgBandit1.source = this.imgBandit2.texture;
                ResManager.AsyncSetTexture(this.imgBandit2, this.genNextAvatar());
                if (last_time < this.max_waiting_time / 4.2 * 1.4) {
                    ResManager.asyncsetHeadImg(this.enemy_icon, this.imgBandit2, this);
                }
                if (last_time < this.max_waiting_time / 2.9 * 1.4) {
                    this.is_bandit_active = false;
                    ResManager.asyncsetHeadImg(this.enemy_icon, this.imgBandit1, this);
                    this.groupBandit.filters = [];
                    return;
                }
            }
            // if(elapsed_time < this.max_waiting_time * 0.5) {
            //     this.groupBandit.y -= 0.8 * this.delta_time;
            // } else {
            // }
        };
        DuelMarryView.prototype.onUpdateBandit_Cut = function () {
            this.bandit_cut_timer += this.delta_time;
            if (this.bandit_cut_timer > 120) {
                this.bandit_cut_timer = 0;
                this.imgBandit1.source = this.genNextAvatar();
            }
            if (this.is_tick_started == false) {
                this.is_bandit_active = false;
                this.imgBandit1.source = this.imgEnemyAvatar.texture;
                this.groupBandit.filters = [];
                return;
            }
        };
        DuelMarryView.prototype.onUpdateProgress = function () {
            if (this.tick_start_time <= 0) {
                this.tick_start_time = UtilsGame.Now();
            }
            var now = UtilsGame.Now();
            this.progressMarry.value = (now - this.tick_start_time) / this.max_waiting_time * 100;
            // 进度满后归零
            if (this.tick_start_time + this.max_waiting_time < now) {
                this.is_tick_started = false;
                this.tick_start_time = 0;
                // TODO callback
                this.setEnemyInfo();
            }
        };
        DuelMarryView.prototype.setEnemyInfo = function () {
            this.labEnemyLv.visible = true;
            this.labEnemyLv.text = "ч." + this.enemy_team_lv;
            this.labEnemyName.text = this.enemy_name;
            this.labEnemyFighting.text = this.enemy_fighting.toString();
            var vip_lv = this.enemy_vip;
            if (vip_lv > 0) {
                this.groupEnemyVip.visible = true;
                this.labEnemyVipLevel.text = vip_lv.toString();
            }
            else {
                this.groupEnemyVip.visible = false;
            }
            this.groupEnemyInfo.visible = true;
            this.groupWaiting.visible = false;
            this.groupEnemyInfo.alpha = 0;
            var tw = egret.Tween.get(this.groupEnemyInfo);
            tw.to({ alpha: 1 }, 300).wait(1000).call(this.execCallback, this);
            this.imgEnemyAvatar.visible = true;
        };
        DuelMarryView.prototype.execCallback = function () {
            this.close();
            if (this.callback) {
                this.callback.call(this.callbackThisObj);
            }
        };
        DuelMarryView.prototype.initMask = function () {
            // this.addAvatarMask(this.groupMyAvatar, this.imgMyAvatar);
            // this.addAvatarMask(this.groupEnemyAvatar, this.imgEnemyAvatar);
            // this.addAvatarMask(this.groupBanditWrap, this.groupBandit);
            // this.groupBandit.mask.y = 32;
            this.imgMyAvatar.mask = this.maskMyAvatar;
            this.imgEnemyAvatar.mask = this.maskEnemyAvatar;
            this.groupBanditWrap.mask = this.maskEnemyAvatar;
        };
        /**
         * 添加头像遮罩
         * @param group
         * @param img
         */
        DuelMarryView.prototype.addAvatarMask = function (group, img) {
            var my_mask = new egret.Shape();
            my_mask.x = group.width / 2;
            my_mask.y = group.height / 2;
            my_mask.graphics.beginFill(0x000000, 1);
            my_mask.graphics.drawCircle(0, 0, 30);
            my_mask.graphics.endFill();
            group.addChild(my_mask);
            img.mask = my_mask;
        };
        /**
         * 设定回调函数
         * @param callback
         * @param thisObj
         */
        DuelMarryView.prototype.setCallback = function (callback, thisObj) {
            this.callback = callback;
            this.callbackThisObj = thisObj;
        };
        /**
         * 生成随机头像
         * @returns {string}
         */
        DuelMarryView.prototype.genRandomAvatar = function () {
            return Template.config.Head[UtilsGame.getRandomInt(0, 2)] + "_png";
        };
        DuelMarryView.prototype.genNextAvatar = function () {
            this.cur_avatar_id++;
            if (this.cur_avatar_id > 5) {
                this.cur_avatar_id = 0;
            }
            return Template.config.Head[this.cur_avatar_id] + "_png";
        };
        return DuelMarryView;
    }(PopupUI));
    ui.DuelMarryView = DuelMarryView;
    __reflect(DuelMarryView.prototype, "ui.DuelMarryView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=DuelMarryView.js.map