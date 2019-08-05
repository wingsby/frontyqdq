var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Http状态检查器
 */
var HttpChecker = (function () {
    function HttpChecker() {
        this.all_err_count = 0; // 本次登入后发生请求错误的次数
        this.err_count = 0; // 有效时间内发生请求错误的次数
        this.last_check_time = 0;
        this.cfg_countdown = 30000; // 每多少毫秒清除一个错误
        this.cfg_tolerance = 5; // 最大错误容忍值
        this.is_disconnected = false; // 是否已经掉线
        Singleton.Get(RegisterUpdate).register(this);
    }
    HttpChecker.prototype.update = function (time) {
        var now = new Date().getTime();
        if (now - this.last_check_time > this.cfg_countdown) {
            this.last_check_time = now;
            this.err_count--;
            if (this.err_count < 0) {
                this.err_count = 0;
            }
        }
    };
    /**
     * 注册一个错误
     */
    HttpChecker.prototype.regHttpError = function () {
        this.err_count += 1;
        this.all_err_count += 1;
        console.log("[HTTPChecker] err_count: " + this.err_count + ", all_err: " + this.all_err_count);
        if (this.err_count > this.cfg_tolerance) {
            this.is_disconnected = true;
            Singleton.Get(RegisterUpdate).unRegister(this);
            MessageManager.handleDisconnect(2);
        }
    };
    /**
     * 是否已经掉线
     */
    HttpChecker.prototype.isDisconnected = function () {
        return this.is_disconnected;
    };
    return HttpChecker;
}());
__reflect(HttpChecker.prototype, "HttpChecker", ["IUpdate"]);
//# sourceMappingURL=HttpChecker.js.map