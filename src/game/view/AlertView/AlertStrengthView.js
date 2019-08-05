var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AlertStrengthView = (function (_super) {
    __extends(AlertStrengthView, _super);
    function AlertStrengthView() {
        var _this = _super.call(this) || this;
        _this.skinName = "yw.AlertStrengthSkin";
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    AlertStrengthView.prototype.setString = function (str) {
        this.labText.text = str;
        this.labText.validateNow();
        this.imgIcon.horizontalCenter = -(this.labText.width / 2 + 6);
    };
    return AlertStrengthView;
}(eui.Component));
__reflect(AlertStrengthView.prototype, "AlertStrengthView");
var AlertStrength = (function (_super) {
    __extends(AlertStrength, _super);
    function AlertStrength() {
        var _this = _super.call(this) || this;
        _this.currentLabels = [];
        _this.cache = new egret.Recycler();
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    AlertStrength.startTween = function (lb, initHeight, waitTime, OnLabelDisplay, recycleLable, thisobject) {
        egret.Tween.get(lb)
            .wait(waitTime)
            .to({ alpha: 1, factor: 1 }, 200) /// 先半透到显示 100秒
            .call(OnLabelDisplay, thisobject, [lb])
            .to({ y: initHeight - 150, factor: 0 }, 2000, egret.Ease.quadIn) /// 上升
            .to({ y: initHeight - 180, alpha: 0 }, 300) /// 上升消失
            .call(recycleLable, thisobject, [lb]); /// 销毁
    };
    AlertStrength.prototype.showString = function (str) {
        var initHeight = this.currentLabels.length * 25 - 14;
        var waitTime = this.currentLabels.length * 100;
        var strength_view = this.createStrength();
        strength_view.setString(str);
        strength_view.y = initHeight;
        this.addChild(strength_view);
        this.currentLabels.push(strength_view);
        AlertStrength.startTween(strength_view, initHeight, waitTime, this.OnLabelDisplay, this.recycleStrength, this);
    };
    AlertStrength.prototype.OnLabelDisplay = function (lb) {
        if (lb.parent != null && lb.parent.contains(lb)) {
            var index = this.currentLabels.indexOf(lb);
            if (index >= 0) {
                this.currentLabels.splice(index, 1);
            }
        }
    };
    AlertStrength.prototype.createStrength = function () {
        if (this.cache.length > 0)
            return this.cache.pop();
        else
            return new AlertStrengthView();
    };
    AlertStrength.prototype.recycleStrength = function (lb) {
        if (lb.parent != null && lb.parent.contains(lb))
            lb.parent.removeChild(lb);
        egret.Tween.removeTweens(lb);
        this.cache.push(lb);
    };
    return AlertStrength;
}(eui.Component));
__reflect(AlertStrength.prototype, "AlertStrength");
//# sourceMappingURL=AlertStrengthView.js.map