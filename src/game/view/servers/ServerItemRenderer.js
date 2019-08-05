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
    var ServerItemRenderer = (function (_super) {
        __extends(ServerItemRenderer, _super);
        ////////////////////////////exml2class:结束替换声明区域///////////////////////////////
        function ServerItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ServerItemRendererSkin";
            return _this;
        }
        ServerItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHander, this);
        };
        ServerItemRenderer.prototype.dataChanged = function () {
            var server = Singleton.Get(login.LoginDataManager).serls.get(this.data);
            this.lb_Name.text = server.name;
            this.lb_new.visible = (server.isNew == 1);
            //0:维护中 1:爆满 2:拥挤 3:良好*/
            this.img_status.source = login.LoginDataManager.serStatus[server.status];
        };
        ServerItemRenderer.prototype.clickHander = function (e) {
            this.parent.dispatchEventWith(ui.ServersView.event_serSelect, false, this.data);
        };
        return ServerItemRenderer;
    }(eui.ItemRenderer));
    ui.ServerItemRenderer = ServerItemRenderer;
    __reflect(ServerItemRenderer.prototype, "ui.ServerItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=ServerItemRenderer.js.map