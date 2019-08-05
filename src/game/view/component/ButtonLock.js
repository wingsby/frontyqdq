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
    var ButtonLock = (function (_super) {
        __extends(ButtonLock, _super);
        function ButtonLock() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.comp.ButtonLock";
            return _this;
        }
        ButtonLock.prototype.setLock = function (open) {
            this.labLock.text = OpenManager.GetLockStr(open);
        };
        ButtonLock.prototype.setText = function (str) {
            this.labLock.text = str;
        };
        return ButtonLock;
    }(eui.Component));
    ui.ButtonLock = ButtonLock;
    __reflect(ButtonLock.prototype, "ui.ButtonLock");
})(ui || (ui = {}));
//# sourceMappingURL=ButtonLock.js.map