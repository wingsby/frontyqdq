var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HashMap = (function (_super) {
    __extends(HashMap, _super);
    function HashMap() {
        return _super.call(this) || this;
    }
    /**
     * 加入数据
     * @param key 键
     * @param value 值
     */
    HashMap.prototype.put = function (key, value) {
        this[key] = value;
    };
    /**
     * 获得数据
     * @param key 键
     */
    HashMap.prototype.get = function (key) {
        return this[key];
    };
    /**
     * 移除数据
     * @param key 键
     */
    HashMap.prototype.remove = function (key) {
        var value = this[key];
        if (value) {
            delete this[key];
        }
        return value;
    };
    /**
     * 是否存在
     * @param key 键
     */
    HashMap.prototype.contains = function (key) {
        return this[key] != null;
    };
    /**
     * 获得所有键值
     */
    HashMap.prototype.keys = function () {
        var keys = Object.keys(this);
        var index = keys.indexOf("_hashCode");
        if (index > -1) {
            keys.splice(index, 1);
        }
        return keys;
    };
    /**
     * 清空
     */
    HashMap.prototype.clear = function () {
        var keys = this.keys();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            this.remove(keys[i]);
        }
    };
    return HashMap;
}(egret.HashObject));
__reflect(HashMap.prototype, "HashMap");
//# sourceMappingURL=HashMap.js.map