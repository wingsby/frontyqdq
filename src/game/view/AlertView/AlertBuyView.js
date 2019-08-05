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
    var AlertBuyView = (function (_super) {
        __extends(AlertBuyView, _super);
        /**
         * 构造函数
         */
        function AlertBuyView() {
            var _this = _super.call(this, "yw.AlertBuySkin") || this;
            // 回调函数
            _this.callback = null;
            _this.callbackThisObj = null;
            return _this;
        }
        /**
         * 响应子元素创建
         */
        AlertBuyView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 响应组件生成
         */
        AlertBuyView.prototype.componentCreated = function () {
            this.init();
        };
        /**
         * 初始化
         */
        AlertBuyView.prototype.init = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
        };
        /**
         * 销毁
         */
        AlertBuyView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
        };
        /**
         * 帧更新
         * @param time
         */
        AlertBuyView.prototype.onUpdate = function (time) {
        };
        /**
         * 打开界面
         */
        AlertBuyView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
        };
        /**
         * 关闭界面
         */
        AlertBuyView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        AlertBuyView.prototype.onAddToStage = function (e) {
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        AlertBuyView.prototype.onRemoveFromStage = function (e) {
        };
        /**
         * 初始化内容
         */
        AlertBuyView.prototype.initContent = function (desc, tip, price, costType, callBack, thisObj, isBag, buttonName) {
            if (isBag === void 0) { isBag = false; }
            this.labDesc.text = desc;
            this.labTip.text = tip;
            this.labCost.text = price.toString();
            this.imgCostIcon = costType['resPNG'];
            this.callback = callBack;
            this.callbackThisObj = thisObj;
            this.labBtnConfirm.text = (buttonName != null) ? buttonName : "购买";
        };
        /**
         * 响应点击事件
         * @param e
         */
        AlertBuyView.prototype.onClick_btnClose = function (e) {
            this.close();
        };
        /**
         * 响应点击事件
         * @param e
         */
        AlertBuyView.prototype.onClick_btnConfirm = function (e) {
            if (this.callback != null) {
                this.callback.call(this.callbackThisObj);
            }
            this.close();
        };
        return AlertBuyView;
    }(PopupUI));
    ui.AlertBuyView = AlertBuyView;
    __reflect(AlertBuyView.prototype, "ui.AlertBuyView");
})(ui || (ui = {}));
//# sourceMappingURL=AlertBuyView.js.map