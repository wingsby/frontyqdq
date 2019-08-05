var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 对象池类
*/
var ObjectPool = (function () {
    function ObjectPool(className) {
        this.destroyTime = 500;
        this.className = className;
        this.list = new egret.Recycler(this.destroyTime);
    }
    /**获取对象*/
    ObjectPool.prototype.getObject = function () {
        if (this.list.length > 0) {
            return this.list.pop();
        }
        else {
            var clazz = egret.getDefinitionByName(this.className);
            return new clazz();
        }
    };
    /**回收对象*/
    ObjectPool.prototype.recycleObject = function (value) {
        /// DEBUG 判断
        {
            var className = value.__proto__.__class__;
            if (this.className != className) {
                egret.error("recycle Object Error, target (" + className + ") has different difination with (" + this.className + ").");
            }
        }
        this.list.push(value);
    };
    /**清除缓存 */
    ObjectPool.prototype.dispose = function () {
        this.list.dispose();
    };
    /**
     * 获取对象池，如果不存在则新建一个
     * @param target 对象类名
     * @param initNum 初始化对象池数量
     * @return {any}
     */
    ObjectPool.getPool = function (target, initNum) {
        if (initNum === void 0) { initNum = 0; }
        var className = target.prototype.__class__;
        if (!ObjectPool.pool[className]) {
            ObjectPool.pool[className] = new ObjectPool(className);
            if (initNum != 0) {
                var clazz = egret.getDefinitionByName(className);
                var pool = ObjectPool.pool[className];
                for (var i = 0; i < initNum; i++) {
                    pool.recycleObject(new clazz());
                }
            }
        }
        return ObjectPool.pool[className];
    };
    return ObjectPool;
}());
/**存储对象池的Object*/
ObjectPool.pool = {};
__reflect(ObjectPool.prototype, "ObjectPool");
//# sourceMappingURL=ObjectPool.js.map