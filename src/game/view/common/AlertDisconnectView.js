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
    var AlertDisconnectView = (function (_super) {
        __extends(AlertDisconnectView, _super);
        function AlertDisconnectView() {
            var _this = _super.call(this, "yw.AlertDisconnectSkin") || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        AlertDisconnectView.prototype.componentCreated = function () {
        };
        AlertDisconnectView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        AlertDisconnectView.prototype.onUpdate = function (time) {
        };
        AlertDisconnectView.prototype.open = function (id) {
            this.labContent.text = "与服务器断开连接，请重新登录" + "(" + id + ")"; // Template.getGUIText("info_1166");
            Singleton.Get(LayerManager).getPopup().addPopup(this);
        };
        AlertDisconnectView.prototype.openCheat = function (id) {
            this.labContent.text = "与服务器断开连接 " + "(" + id + ")"; // Template.getGUIText("info_1166");
            Singleton.Get(LayerManager).getPopup().addPopup(this);
        };
        AlertDisconnectView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        AlertDisconnectView.prototype.onAddToStage = function (e) {
            this.labTxtOk.text = "确定";
            this.labTitle.text = "提示";
            this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOk, this);
        };
        AlertDisconnectView.prototype.onRemoveFromStage = function (e) {
            this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOk, this);
        };
        AlertDisconnectView.prototype.onClick_btnOk = function (e) {
            Singleton.Get(LoginManager).reload();
        };
        return AlertDisconnectView;
    }(PopupUI));
    ui.AlertDisconnectView = AlertDisconnectView;
    __reflect(AlertDisconnectView.prototype, "ui.AlertDisconnectView");
})(ui || (ui = {}));
//# sourceMappingURL=AlertDisconnectView.js.map