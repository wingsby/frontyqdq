var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 日程调度
 * 注册后，日程调度实现的onSchedule()方法会在每日指定时间调用一次
 * created by WYM 2017/1/24
 */
var Schedule = (function () {
    function Schedule() {
        this.collection = [];
        this.exec_time = [];
        this.duration = 200;
        this.timer = new egret.Timer(30 * 1000, -1);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
    }
    Schedule.prototype.onTimer = function () {
        for (var i = 0; i < this.collection.length; i++) {
            // const s_p: any = this.collection[i];
            // console.log("[Schedule] 日程检查: " + s_p.__proto__.__class__ + "：+ " + (this.exec_time[i] - UtilsGame.Now()) + " - " + this.duration);
            if ((this.exec_time[i] - UtilsGame.Now()) < this.duration) {
                // console.log("[Schedule] 日程: " + s_p.__proto__.__class__ + " 被触发。");
                this.collection[i].onSchedule();
                this.exec_time[i] += 1000 * 60 * 60 * 24; // 将下次执行时间设为明天
            }
        }
    };
    Schedule.prototype.register = function (s, time) {
        this.collection.push(s);
        // const s_p: any = s;
        // console.log("[Schedule] 登记了日程: " + s_p.__proto__.__class__);
        if (UtilsGame.TodayStart() + time < UtilsGame.Now()) {
            this.exec_time.push(UtilsGame.TodayStart() + time + 1000 * 60 * 60 * 24);
        }
        else {
            this.exec_time.push(UtilsGame.TodayStart() + time);
        }
    };
    Schedule.prototype.unRegister = function (s) {
        for (var i = 0; i < this.collection.length; i++) {
            if (this.collection[i] == s) {
                this.collection.splice(i, 1);
                this.exec_time.splice(i, 1);
                break;
            }
        }
    };
    return Schedule;
}());
__reflect(Schedule.prototype, "Schedule");
//# sourceMappingURL=Schedule.js.map