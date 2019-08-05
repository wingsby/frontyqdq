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
    var RoleSelectBackupPanelItemView = (function (_super) {
        __extends(RoleSelectBackupPanelItemView, _super);
        function RoleSelectBackupPanelItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleSelectBackupPanelItemSkin";
            _this.init();
            return _this;
        }
        RoleSelectBackupPanelItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 初始化
         */
        RoleSelectBackupPanelItemView.prototype.init = function () {
            this.initGuiText();
        };
        /**
         * 初始化UI文字内容
         */
        RoleSelectBackupPanelItemView.prototype.initGuiText = function () {
            this.btnSelect.text = "更换";
        };
        return RoleSelectBackupPanelItemView;
    }(eui.ItemRenderer));
    ui.RoleSelectBackupPanelItemView = RoleSelectBackupPanelItemView;
    __reflect(RoleSelectBackupPanelItemView.prototype, "ui.RoleSelectBackupPanelItemView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleSelectBackupPanelItemView.js.map