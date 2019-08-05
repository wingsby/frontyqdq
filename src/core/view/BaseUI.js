var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI(skinName) {
        var _this = _super.call(this) || this;
        _this.skinName = skinName;
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        _this.touchEnabled = false; // 默认禁用点击事件
        return _this;
    }
    BaseUI.prototype.childrenCreated = function () {
        this.componentCreated();
    };
    /**移除UI(手动调用) */
    BaseUI.prototype.dispose = function () {
        this.onDestroy();
        var fileName = egret.getDefinitionByName(this.constructor.prototype.__class__);
        ObjectPool.getPool(fileName).recycleObject(this);
    };
    return BaseUI;
}(eui.Component));
__reflect(BaseUI.prototype, "BaseUI", ["IView"]);
//# sourceMappingURL=BaseUI.js.map