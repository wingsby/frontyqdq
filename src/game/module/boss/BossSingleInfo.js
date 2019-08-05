var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BossSingleInfo = (function () {
    function BossSingleInfo() {
        this.reward_hash = "";
    }
    BossSingleInfo.prototype.setRewardHash = function (value) {
        this.reward_hash = value;
    };
    BossSingleInfo.prototype.getRewardHash = function () {
        return this.reward_hash;
    };
    return BossSingleInfo;
}());
__reflect(BossSingleInfo.prototype, "BossSingleInfo");
//# sourceMappingURL=BossSingleInfo.js.map