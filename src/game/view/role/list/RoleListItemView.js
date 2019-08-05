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
    var RoleListItemView = (function (_super) {
        __extends(RoleListItemView, _super);
        /**
         * 构造函数
         */
        function RoleListItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleListItemSkin";
            return _this;
        }
        /**
         * 响应创建子对象
         */
        RoleListItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return RoleListItemView;
    }(eui.Component));
    ui.RoleListItemView = RoleListItemView;
    __reflect(RoleListItemView.prototype, "ui.RoleListItemView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleListItemView.js.map