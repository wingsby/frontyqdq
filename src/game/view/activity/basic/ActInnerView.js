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
    var ActInnerView = (function (_super) {
        __extends(ActInnerView, _super);
        /**
         * @constructor
         */
        function ActInnerView() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        ActInnerView.prototype.onAddToStage = function () {
            this.initView();
        };
        ActInnerView.prototype.onRemoveFromStage = function () {
        };
        ActInnerView.prototype.refresh = function () {
            this.initView();
        };
        ActInnerView.prototype.initView = function () {
        };
        return ActInnerView;
    }(eui.Component));
    ui.ActInnerView = ActInnerView;
    __reflect(ActInnerView.prototype, "ui.ActInnerView");
})(ui || (ui = {}));
//# sourceMappingURL=ActInnerView.js.map