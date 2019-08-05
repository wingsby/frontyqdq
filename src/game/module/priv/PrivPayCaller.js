var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 充值回调触发器
 */
var PrivPayCaller = (function () {
    /**
     * @constructor
     */
    function PrivPayCaller() {
        this.running = false; // 是否正在执行请求
        this.try_times = 0; // 本次重置后已尝试请求的次数
        this.last_tick_time = 0; // 上次update时间
        this.last_pay_update_time = 0; // 上次支付Update时间
    }
    /**
     * 帧刷新
     */
    PrivPayCaller.prototype.update = function (time) {
        this.onPayUpdate();
        this.last_tick_time = UtilsGame.Now();
    };
    /**
     * 循环支付请求
     */
    PrivPayCaller.prototype.onPayUpdate = function () {
        var _this = this;
        if (!this.running) {
            return;
        }
        if ((UtilsGame.Now() - this.last_pay_update_time) > DEFINE.PAY_CHECK_DURATION) {
            // 请求超过100次后不再请求
            if (this.try_times > 100) {
                Singleton.Get(DialogControler).showString("充值信息更新失败 请重新登录");
                this.onStopPayCheck();
                return;
            }
            // 记录本次update状态
            this.last_pay_update_time = UtilsGame.Now();
            this.try_times++;
            // 请求PayBack
            Singleton.Get(PrivManager).reqPayback(function () {
                _this.onStopPayCheck();
            }, this);
        }
    };
    /**
     * 是否正在进行支付检查
     */
    PrivPayCaller.prototype.is_checking = function () {
        return this.running;
    };
    /**
     * 启动支付检查器
     */
    PrivPayCaller.prototype.onStartPayCheck = function () {
        this.running = true;
        this.last_tick_time = UtilsGame.Now();
        this.last_pay_update_time = 0;
        Singleton.Get(RegisterUpdate).register(this);
    };
    /**
     * 关闭支付检查器
     */
    PrivPayCaller.prototype.onStopPayCheck = function () {
        this.running = false;
        this.try_times = 0;
        Singleton.Get(RegisterUpdate).unRegister(this);
    };
    return PrivPayCaller;
}());
__reflect(PrivPayCaller.prototype, "PrivPayCaller", ["IUpdate"]);
//# sourceMappingURL=PrivPayCaller.js.map