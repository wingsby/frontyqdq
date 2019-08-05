var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AlertMessage = (function (_super) {
    __extends(AlertMessage, _super);
    function AlertMessage() {
        var _this = _super.call(this) || this;
        _this.skinName = DEFINE.ALERTWINDOW;
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        //单键
        _this.g_button.removeChild(_this.btn_cancel);
        _this.g_button.validateNow();
        return _this;
    }
    AlertMessage.prototype.childrenCreated = function () {
        this.isInit = true;
        if (this.isWait)
            this.initView();
    };
    AlertMessage.prototype.initData = function (info, thisobj, sureCallBack) {
        this.info = info;
        this.thisObj = thisobj;
        this.sureCallBack = sureCallBack;
        if (this.isInit) {
            this.initView();
        }
        else {
            this.isWait = true;
        }
    };
    AlertMessage.prototype.initView = function () {
        this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickHander, this);
        this.lbContent.textFlow = (new egret.HtmlTextParser).parser(this.info);
        this.lbBtnSureName.text = "确定";
        this.lb_title.text = "提示";
    };
    AlertMessage.prototype.OnClickHander = function (e) {
        this.btn_sure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickHander, this);
        if (this.sureCallBack != null)
            this.sureCallBack.call(this.thisObj);
        Singleton.Get(LayerManager).GetAlertLayer().removeChild(this);
        Singleton.Get(LayerManager).GetAlertLayer().touchEnabled = false;
    };
    return AlertMessage;
}(eui.Component));
__reflect(AlertMessage.prototype, "AlertMessage");
//# sourceMappingURL=AlertMessage.js.map