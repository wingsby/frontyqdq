var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DuelUtil = (function () {
    function DuelUtil() {
    }
    DuelUtil.eliminateRolesInList = function (role_list, elimination) {
        if (role_list == null) {
            return;
        }
        var result = [];
        for (var i = 0; i < role_list.length; i++) {
            if (!DuelUtil.elementInArray(role_list[i], elimination)) {
                result.push(role_list[i]);
            }
        }
        return result;
    };
    DuelUtil.elementInArray = function (e, arr) {
        if (arr == null) {
            return;
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == e) {
                return true;
            }
        }
        return false;
    };
    return DuelUtil;
}());
__reflect(DuelUtil.prototype, "DuelUtil");
//# sourceMappingURL=DuelUtil.js.map