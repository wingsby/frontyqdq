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
    var RolePaintView = (function (_super) {
        __extends(RolePaintView, _super);
        function RolePaintView() {
            var _this = _super.call(this, "yw.RolePaintSkin") || this;
            _this.m_res_name = "";
            return _this;
        }
        RolePaintView.prototype.componentCreated = function () {
            this.imgRole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        RolePaintView.prototype.onDestroy = function () {
        };
        RolePaintView.prototype.onUpdate = function (time) {
        };
        RolePaintView.prototype.open = function (role_id) {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initRole(role_id);
        };
        /**
         * 初始化文字内容
         */
        RolePaintView.prototype.initRole = function (role_id) {
            var _this = this;
            this.imgRole.width = 0;
            this.imgRole.height = 0;
            this.imgRole.alpha = 0;
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (!my_role) {
                egret.error("no player roleId: " + role_id);
                return;
            }
            this.m_res_name = Common.getPaintResByRole(my_role) + "_png";
            // Loading动画
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.SyncLoadingView).open();
            ResManager.getResAsync(this.m_res_name, function (res) {
                _this.imgRole.texture = res;
                layer.getView(ui.SyncLoadingView).cancleOpen();
                var tw = egret.Tween.get(_this.imgRole);
                tw.to({ alpha: 1 }, 30);
                tw.to({ width: 556, height: 800 }, 100);
                _this.scroller.validateNow();
                _this.scroller.viewport.scrollH = (556 - 480) / 4;
            }, this);
        };
        /**
         * 响应关闭按钮点击事件
         */
        RolePaintView.prototype.onClick_btnClose = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.imgRole.texture = undefined;
            RES.destroyRes(this.m_res_name);
            this.m_res_name = "";
            this.onDestroy();
        };
        return RolePaintView;
    }(PopupUI));
    ui.RolePaintView = RolePaintView;
    __reflect(RolePaintView.prototype, "ui.RolePaintView");
})(ui || (ui = {}));
//# sourceMappingURL=RolePaintView.js.map