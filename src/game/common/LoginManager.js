/**
 * 登陆管理器
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerInfo = (function () {
    function ServerInfo(s1, s2, n1) {
        this.serverName = undefined;
        this.serverAddress = undefined;
        this.serverPort = undefined;
        this.serverName = s1;
        this.serverAddress = s2;
        this.serverPort = n1;
    }
    return ServerInfo;
}());
__reflect(ServerInfo.prototype, "ServerInfo");
var LoginManager = (function () {
    /**
     * 构造函数
     */
    function LoginManager() {
        this.isLogin = false;
        this.m_serverlist = [];
        this.m_notice = undefined;
        this.m_currentServerID = 0;
    }
    LoginManager.prototype.onGameInit = function () {
        this.onServerListMsg();
    };
    LoginManager.prototype.onServerListMsg = function (data) {
        ///从服务器 获取公告和区服列表信息
        // var result: msg.DrawCardMsg = data.body.draw_card;
        // if (result) {
        // }
        /// 暂时写死数据在这
        /// 获取公告
        this.m_notice = "Server notice: Default.";
        /// 获取区服列表
        this.m_serverlist.push(new ServerInfo("Outer 241", "192.168.1.241", 9302));
        this.m_serverlist.push(new ServerInfo("Inner 134", "120.132.77.134", 9302));
        this.m_serverlist.push(new ServerInfo("Tencent Cloud 118", "118.89.146.148", 9302));
        this.m_serverlist.push(new ServerInfo("Localhost 127", "127.0.0.1", 9302));
    };
    /**
     * 请求登陆
     * @param username 登录服用户唯一id
     */
    LoginManager.prototype.reqLogin = function (username) {
        var _this = this;
        console.log("login: " + username + " ......");
        // 构造请求消息体
        var sendMsg = new msg.CommonMsg();
        sendMsg.body.playerLogin = new msg.PlayerLoginMsg();
        sendMsg.body.playerLogin.username = username;
        // 判断是否联机
        if (Singleton.Get(MainManager).m_is_single) {
            // 直接构造假的玩家信息
            Singleton.Get(DialogControler).showString("Enter standa-lone mode.");
            this.loginInfo = new msg.PlayerLoginMsg();
            this.loginInfo.username = username;
            this.loginInfo.icon_url = Template.config.Head[0];
            this.loginInfo.nickname = username;
            this.loginInfo.diamond = Template.config.iniDiamond;
            this.loginInfo.gold = Template.config.iniGold;
            this.loginInfo.is_new = false;
            this.loginInfo.team_current_fighting = 0;
            this.loginInfo.team_exp = 0;
            this.loginInfo.team_lv = 1;
            this.loginInfo.vip_level = 0;
            this.resLogin(this.loginInfo);
        }
        else {
            // 登录验证
            HttpClient.HandlRequestAsWait(NetConst.PLAYER_LOGIN, sendMsg, this, function (data) {
                if (data.header.rt == msg.MsgCode.SUCCESS) {
                    _this.login_data = data;
                    window.onerror = MainManager.OnWindowError;
                    RES.getResByUrl("http://" + HttpClient.httpId + ":" + HttpClient.httpPort + "/netBase/jsonzip?v=" + Date.now(), _this.loadJsonConfigFinish, _this, RES.ResourceItem.TYPE_BIN);
                }
                else {
                    Singleton.Get(DialogControler).showString(Template.getGUIText("ui_login_4"));
                }
            }, false);
        }
    };
    /**新版登陆 */
    LoginManager.prototype.newLogin = function (ser) {
        var _this = this;
        Singleton.Get(NetManager).setConnection(ser.dress, undefined);
        Singleton.Get(login.LoginDataManager).zid = ser.zid;
        var send_msg = new msg.CommonMsg();
        send_msg.header.mkey = Singleton.Get(login.LoginDataManager).mkey;
        send_msg.header.zid = ser.zid;
        HttpClient.HandlRequestAsWait(NetConst.PLAYER_PLATLOGIN, send_msg, this, function (data) {
            if (data.header.rt == msg.MsgCode.SUCCESS) {
                _this.login_data = data;
                window.onerror = MainManager.OnWindowError;
                RES.getResByUrl("http://" + HttpClient.httpId + "/netBase/jsonzip?v=" + Date.now(), _this.loadJsonConfigFinish, _this, RES.ResourceItem.TYPE_BIN);
            }
            else {
                Singleton.Get(DialogControler).showString(Template.getGUIText("ui_login_4"));
            }
        }, false);
    };
    LoginManager.prototype.loadJsonConfigFinish = function (zip_data) {
        if (zip_data) {
            Singleton.Get(AnalyzeConfig).initConfigByZip(zip_data);
            console.log(UtilsGame.stringHander("[LOGIN] username: $1, nickname: $2, guid: $3 ;", this.login_data.body.playerLogin.username, this.login_data.body.playerLogin.nickname, this.login_data.body.playerLogin.guid));
            // console.log("[uid: " + this.login_data.body.playerLogin._id + "]" + " new role: " + this.login_data.body.playerLogin.is_new);
            this.uid = this.login_data.body.playerLogin._id;
            this.resLogin(this.login_data.body.playerLogin);
            // 其他模块 begin
            Singleton.Get(DrawCardManager).onLogin(this.login_data);
            // 其他模块 end
            // 初始化websocket
            if (Singleton.Get(login.LoginDataManager).loginData) {
                Singleton.Get(WsClient).initWs(E_WsConnectType.url, "ws://" + Singleton.Get(login.LoginDataManager).loginData.chatUrl + "/client");
                Singleton.Get(WsClient).initConnect();
            }
        }
        else {
            Singleton.Get(DialogControler).showString("jsonzip ERROR!");
        }
    };
    /**
     * 响应登陆结果
     * @param uid
     */
    LoginManager.prototype.resLogin = function (data) {
        if (!data.username) {
            egret.error("Login Failed, uid: " + data.username);
            return;
        }
        // 记录登录数据
        this.loginInfo = new msg.PlayerLoginMsg();
        for (var prop in data) {
            if (data.hasOwnProperty(prop)) {
                this.loginInfo[prop] = data[prop];
            }
        }
        // 设置登录状态
        this.isLogin = true;
        UtilsGame.SetServerNowAtLogin(data.server_now);
        UtilsGame.SetServerStartAtLogin(data.server_start);
        UtilsGame.SetPlayerLifetimeStartAtLogin(data.create_time);
        // 分发通知
        this.notifyPlayerInfo();
        this.notifyRoles();
        this.notifyBag();
        this.notifyScroll();
        this.notifyInstance();
        this.notifyAlarm();
        // 直接通知
        Singleton.Get(PveManager).login_cur_level = this.loginInfo.current_level_id > 0 ? this.loginInfo.current_level_id : Template.config.InitialLevel;
        // 如果没有角色，则进入角色创建界面
        if (data.need_create) {
            Singleton.Get(LayerManager).getView(ui.LoginView).loadCreateRole();
            return;
        }
        // 加载主类
        this.loadMain();
    };
    /**
     * 请求创建角色
     * @param uid
     */
    LoginManager.prototype.reqCreateRole = function (nickname, icon) {
        var _this = this;
        var sendMsg = new msg.CommonMsg();
        sendMsg.body.playerLogin = new msg.PlayerLoginMsg();
        sendMsg.body.playerLogin.nickname = nickname;
        sendMsg.body.playerLogin.icon_url = icon;
        HttpClient.HandlRequestAsWait(NetConst.PLAYER_CREATE, sendMsg, this, function (data) {
            if (data.header.rt == msg.MsgCode.SUCCESS) {
                var zid = Singleton.Get(login.LoginDataManager).zid;
                Singleton.Get(PlatformSDK).createRole(_this.loginInfo.username, _this.loginInfo.nickname, zid, Singleton.Get(login.LoginDataManager).serls.get(zid).name);
                // 登陆成功，加载主界面
                _this.loginInfo.nickname = nickname;
                _this.loginInfo.icon_url = icon;
                // Singleton.Get(DialogControler).showString(Template.getGUIText("ui_login_5"));
                Singleton.Get(LayerManager).removeView(Singleton.Get(LayerManager).getView(ui.CreateRoleView));
                _this.loadMain();
            }
            else {
                Singleton.Get(DialogControler).showString(Template.getGUIText("ui_login_6"));
            }
        }, true);
    };
    /**
     * 登录完成，加载主界面
     */
    LoginManager.prototype.loadMain = function () {
        // 判断剧情状态 根据剧情状态判断战斗
        var rec = this.login_data.body.playerLogin;
        // if (rec.fin_battle && rec.fin_dialog) {
        Singleton.Get(battle.BattleResLoader).init();
        // } else {
        //     // Singleton.Get(battle.BattleResLoader).init();
        //     Singleton.Get(DramaManager).getFlow().onEnterDramaFlow(rec.fin_dialog, rec.fin_battle);
        // }
        var zid = Singleton.Get(login.LoginDataManager).zid;
        var ser = Singleton.Get(login.LoginDataManager).serls.get(zid);
        Singleton.Get(PlatformSDK).loginRole(this.loginInfo.username, this.loginInfo.nickname, ser.zid, ser.name);
    };
    /**
     * 生成随机角色名
     */
    LoginManager.getRandomName = function () {
        var randFirst = UtilsGame.getRandomInt(0, Template.randName.size() - 1);
        var randLast = UtilsGame.getRandomInt(0, Template.randName.size() - 1);
        return Template.randName.values[randFirst].Surname + Template.randName.values[randLast].Name;
    };
    // region 通知登录信息
    /**
     * 通知用户信息模块登录完成
     * 客户端根据登陆信息主动构造同步内容
     */
    LoginManager.prototype.notifyPlayerInfo = function () {
        var sync_msg = new msg.SyncPlayerInfoMsg();
        for (var prop in sync_msg) {
            if (this.loginInfo.hasOwnProperty(prop)) {
                sync_msg[prop] = this.loginInfo[prop];
            }
        }
        // 两个消息体exp名称不一致 手动写入
        sync_msg.exp = this.loginInfo.team_exp;
        Singleton.Get(PlayerInfoManager).onSyncRewrite(sync_msg);
    };
    /**
     * 通知角色模块登陆完成
     */
    LoginManager.prototype.notifyRoles = function () {
        Singleton.Get(RoleManager).onSyncRewrite(this.loginInfo.roles);
    };
    /**
     * 通知背包模块登录完成
     */
    LoginManager.prototype.notifyBag = function () {
        Singleton.Get(BagManager).onSyncRewrite(this.loginInfo.bag);
        Singleton.Get(BagManager).onEquipSyncRewrite(this.loginInfo.equip_bag);
    };
    /**
     * 通知挑战券模块登陆完成
     */
    LoginManager.prototype.notifyScroll = function () {
        Singleton.Get(ScrollManager).onSyncRewrite(this.loginInfo.scroll);
    };
    /**
     * 通知副本模块登录完成
     */
    LoginManager.prototype.notifyInstance = function () {
        Singleton.Get(InstanceManager).onSyncRewrite(this.loginInfo.instance);
    };
    /**
     * 通知红点刷新
     */
    LoginManager.prototype.notifyAlarm = function () {
        Singleton.Get(EquipManager).onNotifyAlarm();
    };
    /**
     * 刷新重新登陆
     */
    LoginManager.prototype.reload = function () {
        var logindata = Singleton.Get(login.LoginDataManager).loginData;
        switch (logindata.pid) {
            case I_Platform.p_xx:
                location.reload();
                break;
            case I_Platform.p_4177:
                var extend = Singleton.Get(login.LoginDataManager).extend;
                var param = JSON.parse(extend);
                SDK_4177.logout(param.open_id);
                break;
            default:
                location.href = logindata.gameUrl_login;
                break;
        }
    };
    return LoginManager;
}());
__reflect(LoginManager.prototype, "LoginManager");
//# sourceMappingURL=LoginManager.js.map