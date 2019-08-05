var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AlertWindow = (function (_super) {
    __extends(AlertWindow, _super);
    function AlertWindow(type) {
        var _this = _super.call(this) || this;
        _this.skinName = DEFINE.ALERTWINDOW;
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        // 单键
        if (type == 2) {
            _this.g_button.removeChild(_this.btn_cancel);
            _this.g_button.validateNow();
        }
        return _this;
    }
    AlertWindow.prototype.childrenCreated = function () {
        this.isInit = true;
        if (this.isWait)
            this.initView();
    };
    AlertWindow.prototype.initData = function (info, thisobj, sureCallBack, cancelCallBack, args) {
        this.info = info;
        this.thisObj = thisobj;
        this.args = args;
        this.sureCallBack = sureCallBack;
        this.cancelCallBack = cancelCallBack;
        if (this.isInit) {
            this.initView();
        }
        else {
            this.isWait = true;
        }
    };
    AlertWindow.prototype.initView = function () {
        this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickHander, this);
        this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickHander, this);
        var str = Template.getGUIText(this.info.Contents);
        if (this.args != null)
            str = UtilsGame.stringHanderEx(str, this.args);
        this.lbContent.textFlow = (new egret.HtmlTextParser).parser(str);
        this.lbBtnSureName.text = Template.getGUIText(this.info.Button1);
        this.lbBtnCancelName.text = Template.getGUIText(this.info.Button2);
        this.lb_title.text = Template.getGUIText(this.info.Headline);
    };
    AlertWindow.prototype.OnClickHander = function (e) {
        var _this = this;
        this.btn_sure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickHander, this);
        this.btn_cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickHander, this);
        if (e.currentTarget == this.btn_sure) {
            UtilsEffect.buttonEffect(this.btn_sure, function () {
                if (_this.sureCallBack)
                    _this.sureCallBack.call(_this.thisObj);
            }, this);
        }
        else {
            UtilsEffect.buttonEffect(this.btn_cancel, function () {
                if (_this.cancelCallBack)
                    _this.cancelCallBack.call(_this.thisObj);
            }, this);
        }
        Singleton.Get(LayerManager).GetAlertLayer().removeChild(this);
        Singleton.Get(LayerManager).GetAlertLayer().touchEnabled = false;
    };
    return AlertWindow;
}(eui.Component));
__reflect(AlertWindow.prototype, "AlertWindow");
//# sourceMappingURL=AlertWindow.js.map