var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UtilsArray = (function () {
    function UtilsArray() {
    }
    /**
     * 数组求和
     * @param arr
     * @returns {number}
     */
    UtilsArray.sum = function (arr) {
        if (!arr || arr.length <= 0) {
            return 0;
        }
        var r = 0;
        for (var i = 0; i < arr.length; i++) {
            r += arr[i];
        }
        return r;
    };
    /**
     * 数组包含
     * @param arr
     * @param obj
     * @returns {boolean}
     */
    UtilsArray.contains = function (arr, obj) {
        if (!arr || arr.length <= 0) {
            return false;
        }
        return arr.indexOf(obj) >= 0;
    };
    /**
     * 数组子集
     * @param main
     * @param sub
     */
    UtilsArray.subset = function (main, sub) {
        if (!main || !sub) {
            return false;
        }
        for (var i = 0; i < sub.length; i++) {
            if (main.indexOf(sub[i]) < 0) {
                return false;
            }
        }
        return true;
    };
    /**
     * 数组元素相等
     * @param arr1
     * @param arr2
     */
    UtilsArray.elementEqual = function (arr1, arr2) {
        if (!arr1 || !arr2) {
            if (arr1 === arr2) {
                return true;
            }
            return false;
        }
        if (UtilsArray.subset(arr1, arr2) && UtilsArray.subset(arr2, arr1)) {
            return true;
        }
        return false;
    };
    /**
     * 拷贝数组
     * @param arr
     */
    UtilsArray.duplicate = function (arr) {
        if (!arr) {
            return;
        }
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            result.push(arr[i]);
        }
        return result;
    };
    /**
     * 合并数组（取两数组的并集）
     * @param arr1
     * @param arr2
     * @return {T[]}
     */
    UtilsArray.combine = function (arr1, arr2) {
        if (!arr1 && !arr2) {
            return;
        }
        else if (!arr1 && arr2) {
            return UtilsArray.duplicate(arr2);
        }
        else if (arr1 && !arr2) {
            return UtilsArray.duplicate(arr1);
        }
        var result = UtilsArray.duplicate(arr1);
        for (var i = 0; i < arr2.length; i++) {
            if (!UtilsArray.contains(arr1, arr2[i])) {
                result.push(arr2[i]);
            }
        }
        return result;
    };
    return UtilsArray;
}());
__reflect(UtilsArray.prototype, "UtilsArray");
//# sourceMappingURL=UtilsArray.js.map