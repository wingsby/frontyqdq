var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 外派掠夺类型
var E_SEND_ROB_TYPE;
(function (E_SEND_ROB_TYPE) {
    E_SEND_ROB_TYPE[E_SEND_ROB_TYPE["NORMAL"] = 0] = "NORMAL";
    E_SEND_ROB_TYPE[E_SEND_ROB_TYPE["REVENGE"] = 1] = "REVENGE"; // 仇人
})(E_SEND_ROB_TYPE || (E_SEND_ROB_TYPE = {}));
// 外派探险类型
var E_SEND_RUN_TYPE;
(function (E_SEND_RUN_TYPE) {
    E_SEND_RUN_TYPE[E_SEND_RUN_TYPE["NORMAL"] = 0] = "NORMAL";
    E_SEND_RUN_TYPE[E_SEND_RUN_TYPE["EXTREME"] = 1] = "EXTREME"; // 至尊
})(E_SEND_RUN_TYPE || (E_SEND_RUN_TYPE = {}));
// 外派任务状态
var E_SEND_STATUS;
(function (E_SEND_STATUS) {
    E_SEND_STATUS[E_SEND_STATUS["PREPARE"] = 0] = "PREPARE";
    E_SEND_STATUS[E_SEND_STATUS["ONGOING"] = 1] = "ONGOING";
    E_SEND_STATUS[E_SEND_STATUS["END"] = 2] = "END";
})(E_SEND_STATUS || (E_SEND_STATUS = {}));
var SendUtil = (function () {
    function SendUtil() {
    }
    /**
     * 将宽容格式的角色数组转换为严格格式（填满5个，无角色均-1）
     * @param roles
     */
    SendUtil.genRoles = function (roles) {
        if (!roles) {
            roles = [];
        }
        var result = UtilsArray.duplicate(roles);
        if (result.length < 5) {
            for (var i = result.length; i < 5; i++) {
                result.push(-1);
            }
        }
        for (var i = 0; i < result.length; i++) {
            if (result[i] == 0) {
                result[i] = -1;
            }
        }
        return result;
    };
    /**
     * 获取数组中的有效角色
     * @param roles
     */
    SendUtil.getValidRoles = function (roles) {
        var result = [];
        if (!roles) {
            return result;
        }
        for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
            var role_id = roles_1[_i];
            if (role_id > 0) {
                result.push(role_id);
            }
        }
        return result;
    };
    return SendUtil;
}());
SendUtil.SCROLL_QUEST_REFRESH = 1000;
SendUtil.SCROLL_ROB_REFRESH = 1001;
__reflect(SendUtil.prototype, "SendUtil");
//# sourceMappingURL=SendUtil.js.map