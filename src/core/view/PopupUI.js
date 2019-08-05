var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PopupUI = (function (_super) {
    __extends(PopupUI, _super);
    function PopupUI(skinName) {
        var _this = _super.call(this) || this;
        _this.skinName = skinName;
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        _this.touchEnabled = false; // 默认禁用点击事件
        return _this;
    }
    /**关闭回调 */
    PopupUI.prototype.registerDestroy = function (thisobj, func) {
        this.destroyObj = thisobj;
        this.destroyFunc = func;
    };
    PopupUI.prototype.childrenCreated = function () {
        this.componentCreated();
    };
    /**移除UI */
    PopupUI.prototype.dispose = function () {
        this.onDestroy();
        egret.Tween.get(this).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 200).call(this.removethis);
    };
    PopupUI.prototype.removethis = function () {
        this.destroyFunc && this.destroyFunc.call(this.destroyObj);
        var fileName = egret.getDefinitionByName(this.constructor.prototype.__class__);
        ObjectPool.getPool(fileName).recycleObject(this);
    };
    return PopupUI;
}(eui.Component));
__reflect(PopupUI.prototype, "PopupUI", ["IView"]);
//# sourceMappingURL=PopupUI.js.map