/**
 * 飘Item提示
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var alertTextEx = (function (_super) {
    __extends(alertTextEx, _super);
    function alertTextEx() {
        var _this = _super.call(this) || this;
        _this.m_label = null;
        _this.skinName = "yw.AlertItemEx";
        _this.m_label = new eui.Label();
        _this.m_label.y = 5;
        _this.m_label.textAlign = egret.HorizontalAlign.CENTER;
        _this.addChild(_this.m_label);
        return _this;
    }
    alertTextEx.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return alertTextEx;
}(eui.Component));
__reflect(alertTextEx.prototype, "alertTextEx");
/**
 * 飘字提示
 * @author Only
 *
 */
var AlertTextWindow = (function (_super) {
    __extends(AlertTextWindow, _super);
    function AlertTextWindow() {
        var _this = _super.call(this) || this;
        _this.currentLabels = [];
        _this.cache = new egret.Recycler();
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    AlertTextWindow.prototype.showInfo = function (info, args) {
        this.showString(Template.getGUIText(info.Contents), args);
    };
    AlertTextWindow.prototype.showString = function (info, args) {
        var str = info;
        var initHeight = this.currentLabels.length * 25;
        var waitTime = this.currentLabels.length * 100;
        if (args != null)
            str = UtilsGame.stringHanderEx(str, args);
        var lb = this.createLable();
        lb.m_label.text = info;
        lb.m_label.textAlign = egret.HorizontalAlign.CENTER;
        lb.m_label.stroke = 1;
        lb.m_label.lineSpacing = 4;
        lb.m_label.strokeColor = 0x111111;
        lb.m_label.textColor = 0xffd800;
        lb.m_label.fontFamily = DEFINE.UI_FONT_FAMILY;
        lb.m_label.bold = true;
        lb.m_label.size = 24;
        lb.x = 0;
        lb.y = 0 + initHeight;
        lb.scaleX = 1;
        lb.scaleY = 1;
        // lb.m_label.y= 5;
        lb.width = DEFINE.BATTLE_FIELD_WIDTH;
        lb.alpha = 0;
        lb.m_label.width = DEFINE.BATTLE_FIELD_WIDTH;
        lb.m_label.textAlign = egret.HorizontalAlign.CENTER;
        lb.m_label.textFlow = (new egret.HtmlTextParser).parser(str);
        lb.height = lb.back.height = lb.m_label.height;
        this.addChild(lb);
        this.currentLabels.push(lb);
        AlertText.startTween(lb, initHeight, waitTime, this.OnLabelDisplay, this.recycleLable, this);
    };
    AlertTextWindow.prototype.OnLabelDisplay = function (lb) {
        if (lb.parent != null && lb.parent.contains(lb)) {
            var index = this.currentLabels.indexOf(lb);
            if (index >= 0) {
                this.currentLabels.splice(index, 1);
            }
        }
    };
    AlertTextWindow.prototype.createLable = function () {
        if (this.cache.length > 0)
            return this.cache.pop();
        else
            return new alertTextEx();
    };
    AlertTextWindow.prototype.recycleLable = function (lb) {
        if (lb.parent != null && lb.parent.contains(lb))
            lb.parent.removeChild(lb);
        egret.Tween.removeTweens(lb);
        this.cache.push(lb);
    };
    return AlertTextWindow;
}(eui.Component));
__reflect(AlertTextWindow.prototype, "AlertTextWindow");
//# sourceMappingURL=AlertTextEx.js.map