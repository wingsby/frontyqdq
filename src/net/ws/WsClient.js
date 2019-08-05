var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WsClient = (function () {
    function WsClient() {
        this.hander = new Dictionary();
        this._lastTime = 0;
        this.hander.add(E_WsMsg.MESSAGE, new ws.ChatHander);
        this.hander.add(E_WsMsg.NOTICE, new ws.NoticeHander);
        this.hander.add(E_WsMsg.QUIT, new ws.QuitHander);
        this.hander.add(E_WsMsg.MSGLIST, new ws.MsgListHander);
        this.hander.add(E_WsMsg.C2CS_GUILD_CHANGE_OTHER, new ws.GuildChangeHander);
        this.hander.add(E_WsMsg.CS2C_PAY_CALLBACK, new ws.CSPayBackHandler);
    }
    /**
     * 初始化websocet;
     * @param type {E_WsConnectType} 连接类型
     * @param ip {string} ip(当连接类型为URL的时候，ip为websocket全地址)
     * @param port {number} 端口(当连接类型为URL的时候端口不填)
     */
    WsClient.prototype.initWs = function (type, ip, port) {
        if (type == E_WsConnectType.ip_port) {
            Singleton.Get(WsRequest).IP = ip;
            Singleton.Get(WsRequest).port = port;
        }
        else {
            Singleton.Get(WsRequest).url = ip;
        }
    };
    /**连接socket */
    WsClient.prototype.initConnect = function () {
        Singleton.Get(WsRequest).connect();
        Singleton.Get(WsRequest).registerCallBack(this.reciveHander, this);
        Singleton.Get(WsRequest).connectComplateFun = this.login;
        Singleton.Get(RegisterUpdate).register(this);
    };
    /**发送聊天 */
    WsClient.sendChat = function (msg) {
        if (Singleton.Get(WsRequest).isConnect)
            Singleton.Get(WsRequest).send(JSON.stringify(msg));
        else
            console.log("websocket is not connected!");
    };
    /**登陆 */
    WsClient.prototype.login = function () {
        var lg = Singleton.Get(LoginManager);
        var newlg = Singleton.Get(login.LoginDataManager);
        var chatlogin = new ws.ChatLogin();
        chatlogin.uid = lg.loginInfo._id;
        chatlogin.guid = lg.loginInfo.guid;
        chatlogin.msgType = E_WsMsg.LOGIN;
        chatlogin.gid = newlg.loginData.gid;
        chatlogin.zid = newlg.zid;
        chatlogin.vip = lg.loginInfo.vip_level;
        chatlogin.guildId = lg.loginInfo.guild_id; // 登入时上发公会id
        chatlogin.uImg = lg.loginInfo.icon_url;
        chatlogin.nickname = lg.loginInfo.nickname;
        Singleton.Get(WsRequest).send(JSON.stringify(chatlogin));
    };
    /**接收数据 */
    WsClient.prototype.reciveHander = function (data) {
        var msg = JSON.parse(data);
        YWLogger.info("WS收到数据：\r\n " + data, LogType.WebSocket);
        this.hander.get(msg.rt).objectHander(msg.msg);
    };
    /**心跳包 */
    WsClient.prototype.sendheart = function () {
        var chatlogin = new ws.ChatLogin();
        chatlogin.msgType = E_WsMsg.HEART;
        Singleton.Get(WsRequest).send(JSON.stringify(chatlogin));
    };
    /**
     * 发送变更公会
     */
    WsClient.sendChangeGuildMe = function (guild_id) {
        var send = new ws.ChatGuild();
        send.msgType = E_WsMsg.C2CS_GUILD_CHANGE_ME;
        send.guildId = guild_id;
        Singleton.Get(WsRequest).send(JSON.stringify(send));
    };
    /**
     * 发送变更公会
     */
    WsClient.sendChangeGuildOther = function (uids, guild_id) {
        var send = new ws.ChatGuild();
        send.msgType = E_WsMsg.C2CS_GUILD_CHANGE_ME;
        send.uids = uids;
        send.guildId = guild_id;
        Singleton.Get(WsRequest).send(JSON.stringify(send));
    };
    WsClient.prototype.update = function (time) {
        if (time - this._lastTime > 60000) {
            this._lastTime = time;
            if (!Singleton.Get(WsRequest).isConnecting) {
                this.sendheart();
            }
        }
    };
    return WsClient;
}());
__reflect(WsClient.prototype, "WsClient", ["IUpdate"]);
//# sourceMappingURL=WsClient.js.map