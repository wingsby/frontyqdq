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
    var ActInnerBasicView = (function (_super) {
        __extends(ActInnerBasicView, _super);
        /**
         * @constructor
         */
        function ActInnerBasicView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ActInnerBasicSkin";
            _this.arr_entries = new eui.ArrayCollection();
            _this.dgRoot.dataProvider = _this.arr_entries;
            _this.dgRoot.itemRenderer = ui.ActInnerItemView;
            return _this;
        }
        ActInnerBasicView.prototype.refresh = function () {
            var scr_v = this.scrRoot.viewport.scrollV;
            _super.prototype.refresh.call(this);
            this.scrRoot.validateNow();
            this.scrRoot.viewport.scrollV = scr_v;
        };
        return ActInnerBasicView;
    }(ui.ActInnerView));
    ui.ActInnerBasicView = ActInnerBasicView;
    __reflect(ActInnerBasicView.prototype, "ui.ActInnerBasicView");
})(ui || (ui = {}));
//# sourceMappingURL=ActInnerBasicView.js.map