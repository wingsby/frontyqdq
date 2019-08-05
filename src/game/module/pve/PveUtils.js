var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PveUtils = (function () {
    function PveUtils() {
    }
    /**
     * 获取关卡名称
     * @param level
     */
    PveUtils.getLevelName = function (level) {
        var req_lv_info = Template.level.get(level);
        return Template.getGUIText(req_lv_info.Name) + " " + req_lv_info.ID;
    };
    return PveUtils;
}());
__reflect(PveUtils.prototype, "PveUtils");
//# sourceMappingURL=PveUtils.js.map