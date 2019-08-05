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
    var RoleBackupRecView = (function (_super) {
        __extends(RoleBackupRecView, _super);
        function RoleBackupRecView() {
            return _super.call(this, "yw.RoleBackupRecSkin") || this;
        }
        RoleBackupRecView.prototype.componentCreated = function () {
            this.initGuiText();
            this.m_entries = new eui.ArrayCollection();
            this.listItem.dataProvider = this.m_entries;
            this.listItem.itemRenderer = ui.RoleBackupRecItemView;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        RoleBackupRecView.prototype.initGuiText = function () {
            this.labBackupWord.text = "";
            this.labTitle.text = Template.getGUIText("ui_role92");
        };
        RoleBackupRecView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        RoleBackupRecView.prototype.onUpdate = function (time) {
        };
        RoleBackupRecView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initContent();
        };
        RoleBackupRecView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.m_entries.removeAll();
        };
        RoleBackupRecView.prototype.initContent = function () {
            var source = [];
            var cfg_roles = Template.role.values;
            var pur_id = 0;
            for (var i = 0; i < cfg_roles.length; i++) {
                if (cfg_roles[i].Type != RoleType.Player) {
                    continue;
                }
                source.push({
                    id: pur_id,
                    role_id: cfg_roles[i].ID,
                    star: cfg_roles[i].Star
                });
                pur_id++;
            }
            source.sort(function (a, b) {
                if (a.star > b.star) {
                    return -1;
                }
                else if (b.star > a.star) {
                    return 1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                else if (a.id < b.id) {
                    return -1;
                }
                return 0;
            });
            this.m_entries.source = source;
        };
        RoleBackupRecView.prototype.onClick_btnClose = function () {
            this.close();
        };
        return RoleBackupRecView;
    }(PopupUI));
    ui.RoleBackupRecView = RoleBackupRecView;
    __reflect(RoleBackupRecView.prototype, "ui.RoleBackupRecView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleBackupRecView.js.map