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
     * 消耗按钮
     */
    var CostGoldButton = (function (_super) {
        __extends(CostGoldButton, _super);
        function CostGoldButton() {
            var _this = _super.call(this) || this;
            _this.icon_name = "";
            return _this;
        }
        /**
         * 响应创建子对象
         */
        CostGoldButton.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.active = true;
        };
        Object.defineProperty(CostGoldButton.prototype, "text", {
            get: function () {
                if (!this.labDisplay) {
                    return "";
                }
                return this.labDisplay.text;
            },
            set: function (value) {
                this.labDisplay.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CostGoldButton.prototype, "cost", {
            get: function () {
                if (!this.labCost) {
                    return "";
                }
                return this.labCost.text;
            },
            set: function (value) {
                this.labCost.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CostGoldButton.prototype, "icon", {
            get: function () {
                return this.icon_name;
            },
            set: function (value) {
                // 设定头像
                if (this.icon_name != value) {
                    ResManager.AsyncSetTexture(this.imgIcon, value);
                    this.icon_name = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CostGoldButton.prototype, "enough", {
            set: function (value) {
                this.labCost.textColor = value ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CostGoldButton.prototype, "active", {
            set: function (value) {
                this.groupActive.visible = value;
                this.groupInactive.visible = !value;
            },
            enumerable: true,
            configurable: true
        });
        return CostGoldButton;
    }(eui.Component));
    ui.CostGoldButton = CostGoldButton;
    __reflect(CostGoldButton.prototype, "ui.CostGoldButton");
})(ui || (ui = {}));
//# sourceMappingURL=CostGoldButton.js.map