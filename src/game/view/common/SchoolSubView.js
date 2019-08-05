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
    var SchoolSubView = (function (_super) {
        __extends(SchoolSubView, _super);
        function SchoolSubView() {
            return _super.call(this, "yw.SchoolSubSkin") || this;
        }
        SchoolSubView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.top = 0;
            this.y = 0;
            this.anchorOffsetX = 0;
            this.anchorOffsetY = 0;
            this.horizontalCenter = 0;
            this.verticalCenter = null;
        };
        SchoolSubView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        SchoolSubView.prototype.componentCreated = function () {
        };
        SchoolSubView.prototype.onDestroy = function () {
        };
        SchoolSubView.prototype.onUpdate = function (time) {
        };
        return SchoolSubView;
    }(BaseUI));
    ui.SchoolSubView = SchoolSubView;
    __reflect(SchoolSubView.prototype, "ui.SchoolSubView");
})(ui || (ui = {}));
//# sourceMappingURL=SchoolSubView.js.map