var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var ArenaRewardItemView = (function (_super) {
        __extends(ArenaRewardItemView, _super);
        function ArenaRewardItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ArenaRewardItemSkin";
            return _this;
        }
        ArenaRewardItemView.prototype.setInfo = function (icon, count) {
            this.labCount.text = "x" + count.toString();
            ResManager.AsyncSetTexture(this.imgIcon, icon);
        };
        return ArenaRewardItemView;
    }(eui.Component));
    ui.ArenaRewardItemView = ArenaRewardItemView;
    __reflect(ArenaRewardItemView.prototype, "ui.ArenaRewardItemView");
})(ui || (ui = {}));
//# sourceMappingURL=ArenaRewardItemView.js.map