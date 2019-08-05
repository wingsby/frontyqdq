var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 飘字提示
 * @author Only
 *
 */
var AlertText = (function (_super) {
    __extends(AlertText, _super);
    function AlertText() {
        var _this = _super.call(this) || this;
        _this.currentLabels = [];
        _this.cache = new egret.Recycler();
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    AlertText.startTween = function (lb, initHeight, waitTime, OnLabelDisplay, recycleLable, thisobject) {
        egret.Tween.get(lb)
            .wait(waitTime)
            .to({ alpha: 1, factor: 1 }, 200) /// 先半透到显示 100秒
            .call(OnLabelDisplay, thisobject, [lb])
            .to({ y: initHeight - 150, factor: 0 }, 2000, egret.Ease.quadIn) /// 上升
            .to({ y: initHeight - 180, alpha: 0 }, 300) /// 上升消失
            .call(recycleLable, thisobject, [lb]); /// 销毁
    };
    AlertText.prototype.showInfo = function (info, args) {
        this.showString(Template.getGUIText(info.Contents), args);
    };
    AlertText.prototype.showString = function (info) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var str = info;
        var initHeight = this.currentLabels.length * 25;
        var waitTime = this.currentLabels.length * 100;
        if (args != null)
            str = UtilsGame.stringHanderEx(str, args);
        var lb = this.createLable();
        lb.text = info;
        lb.stroke = 2;
        lb.strokeColor = 0x111111;
        lb.textColor = 0xffd800;
        lb.fontFamily = DEFINE.UI_FONT_FAMILY;
        lb.bold = true;
        lb.size = 24;
        lb.x = 0;
        lb.y = 0 + initHeight;
        lb.scaleX = 1;
        lb.scaleY = 1;
        lb.width = 480;
        lb.alpha = 0;
        lb.textAlign = egret.HorizontalAlign.CENTER;
        lb.textFlow = (new egret.HtmlTextParser).parser(str);
        lb.height;
        this.addChild(lb);
        this.currentLabels.push(lb);
        AlertText.startTween(lb, initHeight, waitTime, this.OnLabelDisplay, this.recycleLable, this);
    };
    AlertText.prototype.OnLabelDisplay = function (lb) {
        if (lb.parent != null && lb.parent.contains(lb)) {
            var index = this.currentLabels.indexOf(lb);
            if (index >= 0) {
                this.currentLabels.splice(index, 1);
            }
        }
    };
    AlertText.prototype.createLable = function () {
        if (this.cache.length > 0)
            return this.cache.pop();
        else
            return new eui.Label();
    };
    AlertText.prototype.recycleLable = function (lb) {
        if (lb.parent != null && lb.parent.contains(lb))
            lb.parent.removeChild(lb);
        egret.Tween.removeTweens(lb);
        this.cache.push(lb);
    };
    return AlertText;
}(eui.Component));
__reflect(AlertText.prototype, "AlertText");
//# sourceMappingURL=AlertText.js.map