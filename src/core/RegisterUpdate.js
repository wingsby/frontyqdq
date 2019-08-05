var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 帧更新
 * @author
 *
 */
var RegisterUpdate = (function () {
    function RegisterUpdate() {
        this.classesCollection = [];
    }
    /**注册更新 */
    RegisterUpdate.prototype.register = function (classes) {
        this.classesCollection.push(classes);
        egret.startTick(this.update, this);
    };
    /**更新事件 */
    RegisterUpdate.prototype.update = function (time) {
        this.classesCollection.forEach(function (obj) {
            obj.update(time);
        }, this);
        return true;
    };
    /**移除更新 */
    RegisterUpdate.prototype.unRegister = function (classes) {
        var index = this.classesCollection.indexOf(classes);
        if (index >= 0)
            this.classesCollection.splice(index, 1);
        if (this.classesCollection.length <= 0)
            egret.stopTick(this.update, this);
    };
    return RegisterUpdate;
}());
__reflect(RegisterUpdate.prototype, "RegisterUpdate");
//# sourceMappingURL=RegisterUpdate.js.map