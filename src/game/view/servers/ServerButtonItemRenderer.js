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
    var ServerButtonItemRenderer = (function (_super) {
        __extends(ServerButtonItemRenderer, _super);
        function ServerButtonItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ServerButtonItemRendererSkin";
            return _this;
        }
        ServerButtonItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHander, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
        };
        ServerButtonItemRenderer.prototype.dataChanged = function () {
            this.curIndex = this.data;
            var pageSize = ui.ServersView.serPageSize;
            var serCount = ui.ServersView.serMaxCount;
            var min = pageSize * (this.curIndex - 1) + 1;
            var max = pageSize * this.curIndex;
            max = Math.min(serCount, max);
            this.lb_serName.text = min == max ? min + "区" : min + "-" + max + "区";
        };
        ServerButtonItemRenderer.prototype.clickHander = function (e) {
            this.parent.dispatchEventWith(ui.ServersView.event_btnSelect, false, this.curIndex);
        };
        ServerButtonItemRenderer.prototype.dispose = function (e) {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHander, this);
        };
        return ServerButtonItemRenderer;
    }(eui.ItemRenderer));
    ui.ServerButtonItemRenderer = ServerButtonItemRenderer;
    __reflect(ServerButtonItemRenderer.prototype, "ui.ServerButtonItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=ServerButtonItemRenderer.js.map