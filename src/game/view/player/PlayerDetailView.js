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
    var PlayerDetailView = (function (_super) {
        __extends(PlayerDetailView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function PlayerDetailView() {
            var _this = _super.call(this, "yw.PlayerDetailSkin") || this;
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnClose, _this);
            _this.btnChangeName.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnChangeName, _this);
            _this.btnCode.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnCode, _this);
            _this.btnSound.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnSound, _this);
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        PlayerDetailView.prototype.componentCreated = function () {
        };
        /**
         * 帧更新
         * @param time
         */
        PlayerDetailView.prototype.onUpdate = function (time) {
        };
        /**
         * 响应销毁
         */
        PlayerDetailView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnChangeName.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChangeName, this);
            this.btnCode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCode, this);
            this.btnSound.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSound, this);
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        PlayerDetailView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initView();
        };
        /**
         * 关闭本界面
         */
        PlayerDetailView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
        };
        /**
         * 刷新界面
         */
        PlayerDetailView.prototype.refresh = function () {
            this.initView();
        };
        // endregion
        // region 内容更新
        PlayerDetailView.prototype.initAvatarMask = function () {
            this.imgAvatar.mask = this.imgAvatarMask;
        };
        PlayerDetailView.prototype.initView = function () {
            var login = Singleton.Get(LoginManager).loginInfo;
            var info = Singleton.Get(PlayerInfoManager);
            ResManager.asyncsetHeadImg(login.icon_url, this.imgAvatar, this);
            // 头像遮罩
            this.initAvatarMask();
            // VIP等级
            this.labVipLevel.text = info.getVipLevel().toString();
            this.groupVip.visible = info.getVipLevel() > 0;
            // this.groupVip.visible = info.getVipLevel() > 0;
            this.labTitle.text = Template.getGUIText("ui_ex_player_1");
            // 玩家名称
            this.labName.text = login.nickname;
            // 玩家等级
            this.labLv.text = Template.getGUIText("ui_ex_player_7") + info.getTeamLv();
            // 玩家ID
            this.labId.text = Template.getGUIText("ui_ex_player_8") + login.username;
            // 按钮名称
            this.btnChangeName.text = Template.getGUIText("ui_ex_player_2");
            this.btnCode.text = Template.getGUIText("ui_ex_player_3");
            this.btnSound.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_player_4"), (Singleton.Get(SoundManager).getIsTurnOn() ? "开" : "关"));
        };
        // endregion
        // region 响应点击事件
        /**
         * 响应关闭按钮点击事件
         */
        PlayerDetailView.prototype.onClick_btnClose = function () {
            this.close();
        };
        PlayerDetailView.prototype.onClick_btnChangeName = function () {
            UtilsEffect.buttonEffect(this.btnChangeName, function () {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_189"));
            }, this);
        };
        PlayerDetailView.prototype.onClick_btnCode = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnCode, function () {
                _this.close();
                Singleton.Get(LayerManager).getView(ui.ActivityView).open(E_ACT_TYPE.BASIC);
                Singleton.Get(LayerManager).getView(ui.ActivityView).onClick_btnMenu(E_ACT_DESIGN_TYPE.CDkey);
                var scrMenu = Singleton.Get(LayerManager).getView(ui.ActivityView).scrMenu;
                scrMenu.validateNow();
                scrMenu.viewport.scrollH = scrMenu.viewport.width;
            }, this);
        };
        PlayerDetailView.prototype.onClick_btnSound = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnSound, function () {
                Singleton.Get(SoundManager).TurnOn(!Singleton.Get(SoundManager).getIsTurnOn());
                if (Singleton.Get(SoundManager).getIsTurnOn()) {
                    Singleton.Get(MusicManager).SetPlaySound(true);
                }
                else {
                    Singleton.Get(MusicManager).SetPlaySound(false);
                }
                _this.initView();
            }, this);
        };
        return PlayerDetailView;
    }(PopupUI));
    ui.PlayerDetailView = PlayerDetailView;
    __reflect(PlayerDetailView.prototype, "ui.PlayerDetailView");
})(ui || (ui = {}));
//# sourceMappingURL=PlayerDetailView.js.map