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
    var UIDialogAlert = (function (_super) {
        __extends(UIDialogAlert, _super);
        function UIDialogAlert() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.comp.DialogAlertSkin";
            return _this;
        }
        Object.defineProperty(UIDialogAlert.prototype, "text", {
            get: function () {
                if (this.labTalk) {
                    return this.labTalk.text;
                }
                else {
                    return "";
                }
            },
            set: function (text) {
                this.labTalk.text = text;
            },
            enumerable: true,
            configurable: true
        });
        UIDialogAlert.prototype.playAni = function () {
            egret.Tween.removeTweens(this.groupRoot);
            egret.Tween.removeTweens(this.groupTalk);
            this.groupRoot.alpha = 0;
            var tw_empty = egret.Tween.get(this.groupRoot);
            tw_empty.to({ alpha: 1 }, 320, egret.Ease.sineOut);
            this.groupTalk.alpha = 0;
            this.groupTalk.x = 100;
            var tw_talk = egret.Tween.get(this.groupTalk);
            tw_talk.wait(160).to({ alpha: 1, x: 142 }, 160, egret.Ease.sineOut);
        };
        return UIDialogAlert;
    }(eui.Component));
    ui.UIDialogAlert = UIDialogAlert;
    __reflect(UIDialogAlert.prototype, "ui.UIDialogAlert");
})(ui || (ui = {}));
//# sourceMappingURL=UIDialogAlert.js.map