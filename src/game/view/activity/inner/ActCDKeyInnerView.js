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
    var ActCDKeyInnerView = (function (_super) {
        __extends(ActCDKeyInnerView, _super);
        /**
         * @constructor
         */
        function ActCDKeyInnerView() {
            var _this = _super.call(this) || this;
            /**
             * 响应点击兑换按钮
             */
            _this.m_last_submit = 0;
            _this.skinName = "yw.ActInnerBasicSkin_CDKey";
            return _this;
        }
        /**
         * 刷新界面
         */
        ActCDKeyInnerView.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
        };
        /**
         * 设定视图数据
         */
        ActCDKeyInnerView.prototype.initView = function () {
            _super.prototype.initView.call(this);
            // 文字内容
            this.btnGo.text = Template.getGUIText("ui_activity24");
        };
        /**
         * 响应添加到舞台
         */
        ActCDKeyInnerView.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
            this.initView();
            this.inputText.text = "";
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
        };
        /**
         * 响应从舞台移除
         */
        ActCDKeyInnerView.prototype.onRemoveFromStage = function () {
            _super.prototype.onRemoveFromStage.call(this);
            this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
            this.inputText.text = "";
            this.inputText.textDisplay.text = "";
        };
        ActCDKeyInnerView.prototype.onClick_btnGo = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnGo, function () {
                var now = UtilsGame.Now();
                if (now - _this.m_last_submit > 2000) {
                    _this.m_last_submit = UtilsGame.Now();
                    Singleton.Get(ActivityManager).reqExec_CDKey(_this.inputText.text.trim(), function () {
                        _this.inputText.text = "";
                        _this.inputText.textDisplay.text = "";
                    }, _this);
                }
            }, this);
        };
        return ActCDKeyInnerView;
    }(ui.ActInnerBasicView));
    ui.ActCDKeyInnerView = ActCDKeyInnerView;
    __reflect(ActCDKeyInnerView.prototype, "ui.ActCDKeyInnerView");
})(ui || (ui = {}));
//# sourceMappingURL=ActCDKeyInnerView.js.map