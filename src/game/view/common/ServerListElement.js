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
    var ServerListElement = (function (_super) {
        __extends(ServerListElement, _super);
        ////////////////////////////exml2class:开始替换声明区域///////////////////////////////
        ////////////////////////////exml2class:结束替换声明区域///////////////////////////////
        function ServerListElement() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ServerListElement";
            return _this;
        }
        ServerListElement.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHander, this);
        };
        ServerListElement.prototype.tapHander = function (e) {
            Singleton.Get(LoginManager).m_currentServerID = parseInt(e.currentTarget.data.number);
            Singleton.Get(LayerManager).getView(ui.LoginView).refreshServerName();
        };
        ServerListElement.prototype.dataChanged = function () {
            // this.setDataChange(this.data);
        };
        return ServerListElement;
    }(eui.ItemRenderer));
    ui.ServerListElement = ServerListElement;
    __reflect(ServerListElement.prototype, "ui.ServerListElement");
})(ui || (ui = {}));
//# sourceMappingURL=ServerListElement.js.map