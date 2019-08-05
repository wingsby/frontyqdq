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
    var BagDropPanelItemView = (function (_super) {
        __extends(BagDropPanelItemView, _super);
        /**
         * 构造函数
         */
        function BagDropPanelItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.BagDropPanelItemSkin";
            _this.btnCheck.text = Template.getGUIText("ui_role10");
            _this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnCheck, _this);
            return _this;
        }
        /**
         * 响应创建子对象
         */
        BagDropPanelItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 响应数据变化
         */
        BagDropPanelItemView.prototype.dataChanged = function () {
            // 获取data
            if (this.data == null) {
                egret.error("cant init BagDropPanelItemView, data is null.");
                return;
            }
            this.labText.textFlow = new egret.HtmlTextParser().parser(DropUtil.getDes(this.data.type, this.data.arg, this.data.text));
            this.btnCheck.visible = this.data.type != ItemWayType.NoJump;
        };
        /**
         * 响应来源按钮点击
         * @param e
         */
        BagDropPanelItemView.prototype.onClick_btnCheck = function (e) {
            DropUtil.gotoDrop(this.data.type, this.data.arg);
            Singleton.Get(LayerManager).getPopup().removePopup(Singleton.Get(ui.BagDropPanelView));
        };
        return BagDropPanelItemView;
    }(eui.ItemRenderer));
    ui.BagDropPanelItemView = BagDropPanelItemView;
    __reflect(BagDropPanelItemView.prototype, "ui.BagDropPanelItemView");
})(ui || (ui = {}));
//# sourceMappingURL=BagDropPanelItemView.js.map