var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * httpURL请求
 */
var HttpRequestByURL = (function () {
    function HttpRequestByURL() {
    }
    /**
     * http url请求
     */
    HttpRequestByURL.prototype.sendGetRequest = function (url, fun) {
        var _this = this;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.addEventListener(egret.Event.COMPLETE, function (e) { return _this.onRequestComplete(e, url, fun); }, this);
        request.send();
    };
    //收到数据       
    HttpRequestByURL.prototype.onRequestComplete = function (event, mod, fun) {
        var req = event.target;
        this.clearRequst(req);
        fun(mod, req.response);
    };
    HttpRequestByURL.prototype.clearRequst = function (req) {
        if (req != null) {
            req.removeEventListener(egret.Event.COMPLETE, this.onRequestComplete, this);
            req = null;
        }
    };
    return HttpRequestByURL;
}());
__reflect(HttpRequestByURL.prototype, "HttpRequestByURL");
//# sourceMappingURL=HttpRequestByURL.js.map