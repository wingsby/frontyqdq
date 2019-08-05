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
    /**
     * 公会创建
     */
    var GuildCreateView = (function (_super) {
        __extends(GuildCreateView, _super);
        function GuildCreateView() {
            return _super.call(this, "yw.GuildCreateSkin") || this;
        }
        GuildCreateView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**创建界面时执行*/
        GuildCreateView.prototype.componentCreated = function () {
            this.btnCreate.text = Template.getGUIText("ui_guild9");
            this.labTitle.text = Template.getGUIText("ui_guild5");
            this.labTxtCondition.text = Template.getGUIText("ui_guild8");
            this.edtName.prompt = Template.getGUIText("ui_guild28");
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnCreate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCreate, this);
        };
        /**销毁界面时执行*/
        GuildCreateView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnCreate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCreate, this);
        };
        /**更新UI */
        GuildCreateView.prototype.onUpdate = function (time) {
        };
        GuildCreateView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
        };
        GuildCreateView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        GuildCreateView.prototype.onClick_btnClose = function () {
            this.close();
        };
        GuildCreateView.prototype.onClick_btnCreate = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnCreate, function () {
                var validated = GuildUtil.validateGuildCreate(_this.edtName.text, true);
                if (validated) {
                    Singleton.Get(GuildManager).reqCreate(_this.edtName.text, function () {
                        _this.close();
                        GuildViewHandler.onCreateCompleted();
                    }, _this);
                }
            }, this);
        };
        return GuildCreateView;
    }(PopupUI));
    ui.GuildCreateView = GuildCreateView;
    __reflect(GuildCreateView.prototype, "ui.GuildCreateView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildCreateView.js.map