var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 分帧运算
 */
var DelayOptManager = (function () {
    function DelayOptManager() {
        this.TIME_THRESHOLD = 3; //每帧运算逻辑的时间阈值，执行代码超过这个时间就跳过到下一帧继续执行，根据实际情况调整，因为每一帧除了这里的逻辑还有别的逻辑要做对吧
        this._delayOpts = [];
    }
    DelayOptManager.getInstance = function () {
        if (!this._instance)
            this._instance = new DelayOptManager();
        return this._instance;
    };
    DelayOptManager.prototype.addDelayOptFunction = function (thisObj, fun, funPara, callBack, para) {
        this._delayOpts.push({ "fun": fun, "funPara": funPara, "thisObj": thisObj, "callBack": callBack, "para": para });
        egret.startTick(this.runCachedFun, this);
    };
    DelayOptManager.prototype.runCachedFun = function (timeStamp) {
        if (!this._delayOpts.length)
            egret.stopTick(this.runCachedFun, this);
        var timeFlag = egret.getTimer();
        var funObj;
        while (this._delayOpts.length) {
            funObj = this._delayOpts.shift();
            if (funObj.funPara)
                funObj.fun.call(funObj.thisObj, funObj.funPara);
            else
                funObj.fun.call(funObj.thisObj);
            if (funObj.callBack) {
                if (funObj.para)
                    funObj.callBack.call(funObj.thisObj, funObj.para);
                else
                    funObj.callBack();
            }
            if (egret.getTimer() - timeFlag > this.TIME_THRESHOLD)
                break;
        }
        return true;
    };
    return DelayOptManager;
}());
__reflect(DelayOptManager.prototype, "DelayOptManager");
//# sourceMappingURL=DelayOptManager.js.map