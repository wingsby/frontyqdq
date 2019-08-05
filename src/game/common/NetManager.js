var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 网络管理器
 */
var NetManager = (function () {
    /**
     * 构造函数
     */
    function NetManager() {
    }
    /**
     * 设定连接
     */
    NetManager.prototype.setConnection = function (ip, port) {
        HttpClient.httpId = ip;
        HttpClient.httpPort = port;
    };
    return NetManager;
}());
__reflect(NetManager.prototype, "NetManager");
//# sourceMappingURL=NetManager.js.map