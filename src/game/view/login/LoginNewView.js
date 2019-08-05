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
    var LoginNewView = (function (_super) {
        __extends(LoginNewView, _super);
        function LoginNewView() {
            var _this = _super.call(this, "yw.LoginNewSkin") || this;
            _this.is_loading = false;
            _this.last_tick_time = 0;
            _this.progress = 0;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        /**创建界面时执行*/
        LoginNewView.prototype.componentCreated = function () {
            this.btn_changeSer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeSerHander, this);
            this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginHander, this);
            this.setSelectSer(Singleton.Get(login.LoginDataManager).loginData.lastZid);
        };
        /**
         * 更换服务器
         */
        LoginNewView.prototype.changeSerHander = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btn_changeSer, function () {
                var serView = Singleton.Get(ui.ServersView);
                serView.addEventListener(ui.ServersView.event_changeSer, _this.udpateSerInfo, _this);
                serView.open();
            }, this);
        };
        LoginNewView.prototype.udpateSerInfo = function (e) {
            console.log("Server Selected: " + e.data);
            // 选中服务器信息
            this.setSelectSer(e.data);
        };
        /**设置选中服务器 */
        LoginNewView.prototype.setSelectSer = function (serId) {
            var ser = Singleton.Get(login.LoginDataManager).serls.get(serId);
            if (ser != null) {
                this.lb_sername.text = ser.name;
                this.img_serStatus.source = login.LoginDataManager.serStatus[ser.status];
                this.curSer = ser;
            }
        };
        /**更新选中服务器 */
        LoginNewView.prototype.updateSelSerInfo = function () {
            this.setSelectSer(Singleton.Get(login.LoginDataManager).loginData.lastZid);
        };
        /**
         * 登陆
         */
        LoginNewView.prototype.loginHander = function (e) {
            var _this = this;
            // 注入AudioHacker 解决iOS音频播放问题
            Singleton.Get(AudioHacker).inject();
            if (this.curSer == null) {
                egret.error("Server Data is empty.");
                return;
            }
            else {
                if (this.curSer.status == 0) {
                    DialogControler.getinstance().showInfo(1195);
                    return;
                }
            }
            //日志记录
            Singleton.Get(PlatformSDK).selectServer(this.curSer);
            UtilsEffect.buttonEffect(this.btn_login, function () {
                _this.is_loading = true;
                _this.last_tick_time = new Date().getTime();
                _this.btn_login.visible = false;
                _this.btn_changeSer.visible = false;
                _this.groupLoading.visible = true;
                _this.mcLoading.setMovieClip(DEFINE.LOGIN_MC_ROLE);
                _this.mcLoading.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_move]);
                Singleton.Get(LoginManager).newLogin(_this.curSer);
            }, this);
        };
        LoginNewView.prototype.onAddToStage = function () {
            this.is_loading = false;
            this.progress = 0;
            this.groupLoading.visible = false;
            Singleton.Get(RegisterUpdate).register(this);
            // 预载
            this.mcLoading.setMovieClip(DEFINE.LOGIN_MC_ROLE);
            this.mcLoading.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_move]);
        };
        LoginNewView.prototype.onRemoveFromStage = function () {
            this.mcLoading.clearMovieClip();
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        LoginNewView.prototype.update = function () {
            var now = new Date().getTime();
            var delta = now - this.last_tick_time;
            this.last_tick_time = now;
            if (this.is_loading) {
                if (this.progress < 1) {
                    this.progress += UtilsGame.getRandomInt(1, 5) * delta / 1000;
                }
                else {
                    this.progress = 1;
                }
            }
            this.labProgress.text = "加载" + Math.floor(this.progress * 100) + "%..."; // TODO 加到字典表
            this.progressBar.value = Math.floor(this.progress * 100);
        };
        /**销毁界面时执行*/
        LoginNewView.prototype.onDestroy = function () {
        };
        /**更新UI */
        LoginNewView.prototype.onUpdate = function (time) {
        };
        return LoginNewView;
    }(BaseUI));
    ui.LoginNewView = LoginNewView;
    __reflect(LoginNewView.prototype, "ui.LoginNewView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=LoginNewView.js.map