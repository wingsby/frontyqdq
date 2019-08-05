var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UtilsEnum = (function () {
    function UtilsEnum() {
    }
    UtilsEnum.getNamesAndValues = function (e) {
        return UtilsEnum.getNames(e).map(function (n) { return ({ name: n, value: e[n] }); });
    };
    UtilsEnum.getNames = function (e) {
        return UtilsEnum.getObjValues(e).filter(function (v) { return typeof v === "string"; });
    };
    UtilsEnum.getValues = function (e) {
        return UtilsEnum.getObjValues(e).filter(function (v) { return typeof v === "number"; });
    };
    UtilsEnum.getObjValues = function (e) {
        return Object.keys(e).map(function (k) { return e[k]; });
    };
    return UtilsEnum;
}());
__reflect(UtilsEnum.prototype, "UtilsEnum");
//# sourceMappingURL=UtilsEnum.js.map