var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 轻量级等待时钟
 * 等待一段时间后执行回调，相当于setTimeout()
 */
var UpdateTimer = (function () {
    /**
     * @constructor
     */
    function UpdateTimer() {
        this.last_time = 0;
        this.dict = [];
        this.last_time = new Date().getTime();
        Singleton.Get(RegisterUpdate).register(this);
    }
    /**
     * @dispose
     */
    UpdateTimer.prototype.dispose = function () {
        this.last_time = new Date().getTime();
        Singleton.Get(RegisterUpdate).unRegister(this);
    };
    /**
     * 帧刷新
     * 遍历检查现有时钟时间条件，执行并销毁满足条件的时钟
     * @param time
     */
    UpdateTimer.prototype.update = function (time) {
        var now = new Date().getTime();
        for (var i = 0; i < this.dict.length; i++) {
            var t_obj = this.dict[i];
            if (now - t_obj.start > t_obj.duration) {
                if (t_obj.callback) {
                    t_obj.callback.call(t_obj.thisObj);
                }
                this.dict.splice(i, 1);
            }
        }
    };
    /**
     * 添加一个延迟执行的回调方法
     * @param duration 等待时间，从当前时间开始计时
     * @param callback
     * @param thisObj
     */
    UpdateTimer.prototype.addAndStart = function (duration, callback, thisObj) {
        var t_obj = new UpdateTimerObj();
        t_obj.start = new Date().getTime();
        t_obj.duration = duration;
        t_obj.callback = callback;
        t_obj.thisObj = thisObj;
        this.dict.push(t_obj);
    };
    return UpdateTimer;
}());
__reflect(UpdateTimer.prototype, "UpdateTimer", ["IUpdate"]);
/**
 * 等待时钟对象
 */
var UpdateTimerObj = (function () {
    function UpdateTimerObj() {
    }
    return UpdateTimerObj;
}());
__reflect(UpdateTimerObj.prototype, "UpdateTimerObj");
//# sourceMappingURL=UpdateTimer.js.map