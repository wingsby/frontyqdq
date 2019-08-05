var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dictionary = (function () {
    function Dictionary() {
        this._keys = [];
        this._values = [];
    }
    Dictionary.prototype.size = function () {
        if (this._keys == undefined) {
            return 0;
        }
        return this._keys.length;
    };
    Dictionary.prototype.add = function (key, value) {
        if (!this.containsKey(key)) {
            this._keys.push(key);
            this._values.push(value);
            return true;
        }
        else {
            console.log("Duplicated key: " + key);
            return false;
        }
    };
    Dictionary.prototype.update = function (key, value) {
        if (this.containsKey(key)) {
            var index = this._keys.indexOf(key);
            this._values[index] = value;
        }
        else {
            this.add(key, value);
        }
    };
    Dictionary.prototype.remove = function (key) {
        var index = this._keys.indexOf(key);
        if (index != -1) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
        }
    };
    Object.defineProperty(Dictionary.prototype, "keys", {
        get: function () {
            return this._keys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Dictionary.prototype.foreachKey = function (func, thisobj) {
        this._keys.forEach(func, thisobj);
    };
    Dictionary.prototype.foreachValue = function (func, thisobj) {
        this._values.forEach(func, thisobj);
    };
    Dictionary.prototype.clear = function () {
        this._keys.length = 0;
        this._values.length = 0;
    };
    Dictionary.prototype.get = function (key) {
        var index = this._keys.indexOf(key);
        if (index != -1) {
            return this._values[index];
        }
        return undefined;
    };
    Dictionary.prototype.containsKey = function (key) {
        return this._keys.indexOf(key) != -1;
    };
    Dictionary.prototype.containsValue = function (val) {
        return this._values.indexOf(val) != -1;
    };
    Dictionary.prototype.cloneValues = function () {
        return this._values.slice();
    };
    Dictionary.prototype.cloneKeys = function () {
        return this._keys.slice();
    };
    Dictionary.prototype.keyIterator = function () {
        return this.Iterator(this._keys);
    };
    Dictionary.prototype.valueIterator = function () {
        return this.Iterator(this._values);
    };
    Dictionary.prototype.Iterator = function (array) {
        var nextIndex = 0;
        return {
            next: function () {
                return array[nextIndex++];
            },
            hasNext: function () {
                return nextIndex < array.length;
            }
        };
    };
    Dictionary.prototype.subset = function (array) {
        var result = new Dictionary();
        for (var i = 0; i < array.length; i++) {
            var key = array[i];
            var val = this.get(key);
            if (val) {
                result.update(key, val);
            }
        }
        return result;
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary");
//# sourceMappingURL=Dictionary.js.map