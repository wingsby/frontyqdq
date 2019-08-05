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
var AlertItemWindow = (function (_super) {
    __extends(AlertItemWindow, _super);
    function AlertItemWindow() {
        var _this = _super.call(this) || this;
        _this.skinName = "yw.AlertItem";
        return _this;
    }
    AlertItemWindow.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return AlertItemWindow;
}(eui.Component));
__reflect(AlertItemWindow.prototype, "AlertItemWindow");
var AlertItem = (function (_super) {
    __extends(AlertItem, _super);
    function AlertItem() {
        var _this = _super.call(this) || this;
        _this.m_currentLabels = [];
        _this.aitemCache = [];
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    AlertItem.prototype.onShowAlertItem = function (name, itemCountStr, icon) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var str = name;
        var initHeight = this.m_currentLabels.length * 40;
        var waitTime = this.m_currentLabels.length * 100;
        if (args != null)
            itemCountStr = UtilsGame.stringHander(itemCountStr, args);
        var resName = icon; // + "_png";
        ResManager.getResAsync(resName, function (res, resName) {
            var aiwindow = _this.createItemWindow();
            // aiwindow.itemName.textFlow = (new egret.HtmlTextParser).parser(str);
            // aiwindow.itemNumber.textFlow = (new egret.HtmlTextParser).parser(itemCountStr);
            aiwindow.itemName.textFlow = (new egret.HtmlTextParser).parser(str + " x " + itemCountStr);
            aiwindow.x = 0;
            aiwindow.y = 0 + initHeight;
            aiwindow.alpha = 0;
            aiwindow.itemIcon.texture = res;
            _this.addChild(aiwindow);
            _this.m_currentLabels.push(aiwindow);
            AlertText.startTween(aiwindow, initHeight, waitTime, _this.OnLabelDisplay, _this.recycleLable, _this);
        }, this);
    };
    AlertItem.prototype.showAlertItem = function (itemID, itemCountStr) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var it = Template.item.get(itemID);
        if (it != null) {
            var str = Template.getGUIText(it.iName);
            this.onShowAlertItem(str, itemCountStr, it.iIcon, args);
        }
    };
    AlertItem.prototype.OnLabelDisplay = function (lb) {
        if (lb.parent != null && lb.parent.contains(lb)) {
            var index = this.m_currentLabels.indexOf(lb);
            if (index >= 0) {
                this.m_currentLabels.splice(index, 1);
            }
        }
    };
    AlertItem.prototype.createItemWindow = function () {
        if (this.aitemCache.length > 0)
            return this.aitemCache.pop();
        else
            return new AlertItemWindow();
    };
    AlertItem.prototype.recycleLable = function (lb) {
        if (lb.parent != null && lb.parent.contains(lb))
            lb.parent.removeChild(lb);
        egret.Tween.removeTweens(lb);
        this.aitemCache.push(lb);
    };
    return AlertItem;
}(eui.Component));
__reflect(AlertItem.prototype, "AlertItem");
//# sourceMappingURL=AlertItem.js.map