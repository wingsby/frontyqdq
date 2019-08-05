var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var E_WsConnectType;
(function (E_WsConnectType) {
    /**ip port connect*/
    E_WsConnectType[E_WsConnectType["ip_port"] = 0] = "ip_port";
    /**url connect */
    E_WsConnectType[E_WsConnectType["url"] = 1] = "url";
})(E_WsConnectType || (E_WsConnectType = {}));
var WsRequest = (function () {
    function WsRequest() {
        /**socket是否处于正在连接状态，防止多次请求连接 */
        this.isConnecting = false;
        /**
         * ws是否连接成功
         */
        this.isConnect = false;
    }
    WsRequest.prototype.registerCallBack = function (backFun, backObj) {
        this.backFun = backFun;
        this.backObj = backObj;
    };
    WsRequest.prototype.connect = function () {
        console.log("start connect websocket...");
        if (this.webSocket == null) {
            this.webSocket = new egret.WebSocket();
            this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
            this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketConnect, this);
            this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        }
        if (this.isConnecting == false) {
            this.isConnecting = true;
            if (this.connectType == E_WsConnectType.ip_port) {
                this.webSocket.connect(this.IP, this.port);
            }
            else {
                this.webSocket.connectByUrl(this.url);
            }
            this.startTimer();
        }
    };
    WsRequest.prototype.onSocketConnect = function () {
        console.log("websocket connect success...");
        this.isConnecting = false;
        this.isConnect = true;
        this.stopTimer();
        if (this.connectComplateFun)
            this.connectComplateFun();
        if (this.dataBuffer != null) {
            this.send(this.dataBuffer);
            this.dataBuffer = null;
        }
    };
    WsRequest.prototype.onSocketData = function () {
        var data = this.webSocket.readUTF();
        if (this.backFun != null)
            this.backFun.call(this.backObj, data);
    };
    WsRequest.prototype.onSocketError = function () {
        // console.log("websocket connent error...");
        this.isConnecting = false;
        this.stopTimer();
        this.dataBuffer = null;
        this.isConnect = false;
    };
    WsRequest.prototype.onSocketClose = function () {
        // console.log("close websocket...");
        this.isConnecting = false;
        this.isConnect = false;
        this.stopTimer();
        this.dataBuffer = null;
    };
    WsRequest.prototype.send = function (data) {
        YWLogger.info("WS发送数据：\r\n " + data, LogType.WebSocket);
        if (this.webSocket && this.webSocket.connected) {
            this.webSocket.writeUTF(data);
            this.webSocket.flush();
        }
        else if (this.isConnecting == false) {
            YWLogger.info("WS建立连接");
            this.isConnect = false;
            this.dataBuffer = data;
            this.connect();
        }
    };
    WsRequest.prototype.close = function () {
        if (this.webSocket) {
            this.dataBuffer = null;
            this.isConnecting = false;
            this.isConnect = false;
            this.stopTimer();
            this.webSocket.close();
        }
    };
    WsRequest.prototype.startTimer = function () {
        if (this.timer == null) {
            this.timer = new egret.Timer(10000);
        }
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.timer.reset();
        this.timer.start();
    };
    WsRequest.prototype.stopTimer = function () {
        if (this.timer != null) {
            this.timer.stop();
        }
    };
    WsRequest.prototype.onTimerComplete = function () {
        this.close();
    };
    return WsRequest;
}());
__reflect(WsRequest.prototype, "WsRequest");
//# sourceMappingURL=WsRequest.js.map