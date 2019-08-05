var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * http请求
 */
var httpRequest = (function () {
    function httpRequest() {
        this.errorCount = 0;
    }
    Object.defineProperty(httpRequest.prototype, "httpUrl", {
        /**
         * 获取httpUrl
         * @returns {string}
         */
        get: function () {
            var value = "http://" + HttpClient.httpId;
            if (HttpClient.httpPort != null && HttpClient.httpPort != 0) {
                value += ":" + HttpClient.httpPort;
            }
            return value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * HTTP GET请求
     * @param mod 模块名 枚举 Http.Access
     * @param fun 数据处理方法
     * @param params 参数
     */
    httpRequest.prototype.sendGetRequest = function (mod, fun, params) {
        var _this = this;
        if (Singleton.Get(HttpChecker).isDisconnected()) {
            YWLogger.error("Connection Lost.", LogType.Network);
            return;
        }
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var url = this.httpUrl + params;
        loader.addEventListener(egret.Event.COMPLETE, function (e) { return _this.onRequestComplete(e, mod, fun); }, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onRequestIOError, this);
        loader.load(new egret.URLRequest(url));
    };
    /**
     * HTTP POST请求
     * @param mod 模块名 枚举 Http.Access
     * @param fun 数据处理方法
     * @param params 访问所需参数
     */
    httpRequest.prototype.sendPostRequest = function (mod, fun, params) {
        var _this = this;
        if (Singleton.Get(HttpChecker).isDisconnected()) {
            YWLogger.error("Connection Lost.", LogType.Network);
            return;
        }
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, function (e) { return _this.onRequestComplete(e, mod, fun); }, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) { return _this.onRequestIOError(e, mod, fun); }, this);
        // 在 Egret 4.0.3 以上版本中，不能设置 Header，否则会导致 method 变为 OPTIONS
        var request = new egret.URLRequest(this.httpUrl + mod);
        request.method = egret.URLRequestMethod.POST;
        request.data = new egret.URLVariables("param=" + params);
        loader.load(request);
    };
    // 收到数据
    httpRequest.prototype.onRequestComplete = function (event, mod, fun) {
        var loader = event.target;
        var data = loader.data;
        if (data == null) {
            YWLogger.error("Http data exception: " + mod, LogType.Network);
            return;
        }
        this.clearRequst(loader);
        fun(mod, data.toString());
    };
    // 请求数据错误
    httpRequest.prototype.onRequestIOError = function (event, mod, fun) {
        fun(mod, "error");
        Singleton.Get(HttpChecker).regHttpError();
        YWLogger.error("Http IO Error captured: " + mod, LogType.Network);
        this.clearRequst(event.target);
    };
    httpRequest.prototype.clearRequst = function (loader) {
        if (loader != null) {
            loader.removeEventListener(egret.Event.COMPLETE, this.onRequestComplete, this);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onRequestIOError, this);
            loader._request = null;
            loader = null;
        }
    };
    return httpRequest;
}());
__reflect(httpRequest.prototype, "httpRequest");
//# sourceMappingURL=HttpRequest.js.map