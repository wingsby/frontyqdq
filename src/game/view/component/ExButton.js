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
     * 自定义按钮
     */
    var ExButton = (function (_super) {
        __extends(ExButton, _super);
        function ExButton() {
            var _this = _super.call(this) || this;
            _this.imgNew = null;
            _this.imgActive = null;
            _this.imgInactive = null;
            _this.labDisplay = null;
            return _this;
        }
        /**
         * 响应创建子对象
         */
        ExButton.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.isNew = false;
            this.active = true;
        };
        Object.defineProperty(ExButton.prototype, "isNew", {
            get: function () {
                if (!this.imgNew) {
                    return false;
                }
                return this.imgNew.visible;
            },
            set: function (value) {
                this.imgNew.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExButton.prototype, "text", {
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
        Object.defineProperty(ExButton.prototype, "richText", {
            set: function (value) {
                this.labDisplay.textFlow = new egret.HtmlTextParser().parser(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExButton.prototype, "enough", {
            set: function (value) {
                this.labDisplay.textColor = value ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExButton.prototype, "active", {
            get: function () {
                if (!this.imgActive) {
                    return false;
                }
                return this.imgActive.visible;
            },
            set: function (value) {
                switch (this.skinName) {
                    case "yw.comp.ButtonSkin_RoleTab":
                        this.currentState = value ? "active" : "inactive";
                        break;
                    default:
                        this.imgActive.visible = value;
                        this.imgInactive.visible = !value;
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        return ExButton;
    }(eui.Component));
    ui.ExButton = ExButton;
    __reflect(ExButton.prototype, "ui.ExButton");
})(ui || (ui = {}));
//# sourceMappingURL=ExButton.js.map