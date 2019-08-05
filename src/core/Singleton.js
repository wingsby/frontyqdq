var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 单例
 */
var Singleton = (function () {
    function Singleton() {
    }
    Singleton.Get = function (target) {
        if (!Singleton.maps.containsKey(target)) {
            Singleton.maps.add(target, new target());
        }
        return Singleton.maps.get(target);
    };
    Singleton.Destroy = function (target) {
        if (Singleton.maps.containsKey(target)) {
            Singleton.maps.remove(target);
        }
    };
    Singleton.Clear = function () {
        Singleton.maps.clear();
    };
    Singleton.Exist = function (target) {
        return Singleton.maps.containsKey(target);
    };
    return Singleton;
}());
Singleton.maps = new Dictionary();
__reflect(Singleton.prototype, "Singleton");
//# sourceMappingURL=Singleton.js.map