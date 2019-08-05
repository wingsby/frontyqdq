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
    /**
     * 登陆界面
     */
    var LoginView = (function (_super) {
        __extends(LoginView, _super);
        /**
         * 构造函数
         */
        function LoginView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.LoginSkin";
            _this.initEvent();
            return _this;
        }
        /**
         * 初始化事件绑定
         */
        LoginView.prototype.initEvent = function () {
            var _this = this;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.btnServerList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButton_ServerList, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onServerListbtnClose, this);
            this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButton_login, this);
            //this.btnNetMode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButton_single, this);
            this.inputUsername.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { UtilsEffect.buttonEffect(_this.inputUsername); }, this);
            this.inputIpAddr.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { UtilsEffect.buttonEffect(_this.inputIpAddr); _this.inputIpAddr.text = ""; }, this);
        };
        /**
         * 响应组件初始化完成
         */
        LoginView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initView();
        };
        LoginView.prototype.initView = function () {
            this.m_serverArry = new eui.ArrayCollection();
            this.serverListData.dataProvider = this.m_serverArry;
            this.serverListData.itemRenderer = ui.ServerListElement;
            this.scroller.viewport = this.serverListData;
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        LoginView.prototype.onAddToStage = function (e) {
            this.btnLogin.alpha = 0;
            this.labUsername.alpha = 0;
            this.inputUsername.alpha = 0;
            //this.btnNetMode.alpha = 0;
            var twLab = egret.Tween.get(this.labUsername);
            twLab.to({ alpha: 1 }, 300);
            var twInput = egret.Tween.get(this.inputUsername);
            twInput.to({ alpha: 1 }, 300);
            var twLogin = egret.Tween.get(this.btnLogin);
            twLogin.wait(80).to({ alpha: 1 }, 500);
            //let twNetMode = egret.Tween.get(this.btnNetMode);
            //twNetMode.wait(80).to({ alpha: 1 }, 500);
            // 默认选择联机版
            this.onButton_single();
            var loginMng = Singleton.Get(LoginManager);
            Singleton.Get(DialogControler).showString(loginMng.m_notice);
            this.serverName.text = loginMng.m_serverlist[loginMng.m_currentServerID].serverName;
            this.refreshServerListData();
            // 循环播放背景音乐 默认关闭
            Singleton.Get(MusicManager).play(MUSICTYPE.MT_LOGIN);
        };
        LoginView.prototype.refreshServerName = function () {
            var loginMng = Singleton.Get(LoginManager);
            this.serverName.text = loginMng.m_serverlist[loginMng.m_currentServerID].serverName;
            this.scroller.visible = false;
        };
        /// 可能需要reload
        LoginView.prototype.refreshServerListData = function () {
            this.m_serverArry.removeAll();
            var _arr = [];
            var loginMng = Singleton.Get(LoginManager);
            for (var i = 0; i < loginMng.m_serverlist.length; ++i) {
                _arr.push({
                    number: i,
                    name: loginMng.m_serverlist[i].serverName,
                    info: loginMng.m_serverlist[i].serverAddress
                });
            }
            this.m_serverArry.source = _arr;
        };
        /**
         * 响应点击登录按钮
         * @param e
         */
        LoginView.prototype.onButton_login = function (e) {
            UtilsEffect.buttonEffect(this.btnLogin);
            if (this.inputUsername.text.length <= 0) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("ui_login_7"));
                return;
            }
            // // 设定测试服务器地址
            // if (this.inputIpAddr.text.length <= 0) {
            //     Singleton.Get(NetManager).setConnection(DEFINE.NET_MAIN_SERVER_LOCAL_IP, DEFINE.NET_MAIN_SERVER_LOCAL_PORT);
            // } else {
            //     let serverArr: string[] = this.inputIpAddr.text.split(":");
            //     let serverIp: string = serverArr[0];
            //     let serverPort: number = serverArr.length > 1 ? parseInt(serverArr[1]) : DEFINE.NET_MAIN_SERVER_PORT;
            //     Singleton.Get(NetManager).setConnection(serverIp, serverPort);
            // }
            var loginMng = Singleton.Get(LoginManager);
            Singleton.Get(NetManager).setConnection(loginMng.m_serverlist[loginMng.m_currentServerID].serverAddress, loginMng.m_serverlist[loginMng.m_currentServerID].serverPort);
            Singleton.Get(LoginManager).reqLogin(this.inputUsername.text);
        };
        LoginView.prototype.onButton_ServerList = function (e) {
            this.scroller.visible = true;
        };
        LoginView.prototype.onServerListbtnClose = function (e) {
            this.scroller.visible = false;
        };
        /**
         * 响应点击切换联机版本按钮
         * @param e
         */
        LoginView.prototype.onButton_single = function (e) {
            // UtilsEffect.buttonEffect(this.btnNetMode);
            // var main = Singleton.Get(MainManager);
            // main.m_is_single = !main.m_is_single;
            // if (main.m_is_single) {
            //     this.labelNetMode.text = "单机版";
            //     this.inputIpAddr.text = "无";
            // }
            // else {
            //     this.labelNetMode.text = "联网版";
            //     // this.inputIpAddr.text = DEFINE.NET_MAIN_SERVER_IP + ":" + DEFINE.NET_MAIN_SERVER_PORT;
            // }
        };
        /**
         * 加载创建角色界面
         * 登陆完成，没有角色
         */
        LoginView.prototype.loadCreateRole = function () {
            var layer = Singleton.Get(LayerManager);
            layer.addView(layer.getView(ui.CreateRoleView));
        };
        return LoginView;
    }(ui.UIView));
    ui.LoginView = LoginView;
    __reflect(LoginView.prototype, "ui.LoginView");
})(ui || (ui = {}));
//# sourceMappingURL=LoginView.js.map