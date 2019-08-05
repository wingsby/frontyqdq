var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var battle;
(function (battle) {
    var closeupMask = (function (_super) {
        __extends(closeupMask, _super);
        function closeupMask() {
            var _this = _super.call(this) || this;
            _this.skinName = "closeupMask";
            return _this;
        }
        closeupMask.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**获取zorder排序值 */
        closeupMask.prototype.getZorder = function () {
            return SORT_CONST.ZOREDER_EFFECT_MAX;
        };
        return closeupMask;
    }(eui.Component));
    battle.closeupMask = closeupMask;
    __reflect(closeupMask.prototype, "battle.closeupMask", ["ISortElement"]);
})(battle || (battle = {}));
//# sourceMappingURL=closeupMask.js.map