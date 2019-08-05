var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var E_PayType;
(function (E_PayType) {
    E_PayType[E_PayType["MONTH"] = 1] = "MONTH";
    E_PayType[E_PayType["LIFETIME"] = 2] = "LIFETIME";
    E_PayType[E_PayType["ROME"] = 3] = "ROME";
    E_PayType[E_PayType["INVEST"] = 4] = "INVEST";
    E_PayType[E_PayType["LVGIFT"] = 5] = "LVGIFT"; // 限时礼包
})(E_PayType || (E_PayType = {}));
var FirstPayStatus;
(function (FirstPayStatus) {
    FirstPayStatus[FirstPayStatus["NOT_FIRST_BILL"] = 0] = "NOT_FIRST_BILL";
    FirstPayStatus[FirstPayStatus["NOT_GET_FRIST_AWARD"] = 1] = "NOT_GET_FRIST_AWARD";
    FirstPayStatus[FirstPayStatus["AREALY_GET_AWARD"] = 2] = "AREALY_GET_AWARD"; // 已经领过奖励
})(FirstPayStatus || (FirstPayStatus = {}));
// 限时礼包状态
var E_LVGIFT_STATUS;
(function (E_LVGIFT_STATUS) {
    E_LVGIFT_STATUS[E_LVGIFT_STATUS["ONSALE"] = 0] = "ONSALE";
    E_LVGIFT_STATUS[E_LVGIFT_STATUS["HOLDING"] = 1] = "HOLDING";
    E_LVGIFT_STATUS[E_LVGIFT_STATUS["OUT"] = 2] = "OUT";
    E_LVGIFT_STATUS[E_LVGIFT_STATUS["FINISH"] = 3] = "FINISH";
    E_LVGIFT_STATUS[E_LVGIFT_STATUS["LOCKED"] = 4] = "LOCKED"; // 未解锁
})(E_LVGIFT_STATUS || (E_LVGIFT_STATUS = {}));
// 特权卡类型
var E_PRIV_CARD_TYPE;
(function (E_PRIV_CARD_TYPE) {
    E_PRIV_CARD_TYPE[E_PRIV_CARD_TYPE["MONTH"] = 1] = "MONTH";
    E_PRIV_CARD_TYPE[E_PRIV_CARD_TYPE["LIFETIME"] = 2] = "LIFETIME";
})(E_PRIV_CARD_TYPE || (E_PRIV_CARD_TYPE = {}));
var PrivUtils = (function () {
    function PrivUtils() {
    }
    return PrivUtils;
}());
__reflect(PrivUtils.prototype, "PrivUtils");
//# sourceMappingURL=PrivUtils.js.map