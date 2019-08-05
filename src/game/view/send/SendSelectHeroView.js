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
    var SendSelectHeroView = (function (_super) {
        __extends(SendSelectHeroView, _super);
        function SendSelectHeroView() {
            var _this = _super.call(this, "yw.SendSelectHeroSkin") || this;
            _this.m_pos = 0;
            _this.m_hide = [];
            return _this;
        }
        SendSelectHeroView.prototype.componentCreated = function () {
            this.m_entries = new eui.ArrayCollection();
            this.dgHeros.itemRenderer = ui.SendSelectHeroItemRenderer;
            this.dgHeros.dataProvider = this.m_entries;
            this.dgHeros.useVirtualLayout = false;
        };
        ;
        SendSelectHeroView.prototype.onDestroy = function () { };
        ;
        SendSelectHeroView.prototype.onUpdate = function () { };
        ;
        SendSelectHeroView.prototype.open = function (pos, hide) {
            if (hide === void 0) { hide = []; }
            this.m_pos = pos;
            this.m_hide = hide;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.refresh();
        };
        SendSelectHeroView.prototype.close = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        SendSelectHeroView.prototype.refresh = function () {
            this.initView();
        };
        SendSelectHeroView.prototype.onAddToStage = function () {
            this.labTitle.text = "选择斗士";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        SendSelectHeroView.prototype.onRemoveFromStage = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        SendSelectHeroView.prototype.initView = function () {
            var source = [];
            var roles = Singleton.Get(RoleManager).getRolesInfo();
            for (var _i = 0, _a = roles.roles; _i < _a.length; _i++) {
                var role = _a[_i];
                if (this.m_hide.indexOf(role.role_id) >= 0) {
                    continue;
                }
                source.push({
                    role_id: role.role_id,
                    pos: this.m_pos
                });
            }
            var inf_quest = Singleton.Get(SendManager).getInfo();
            source.sort(function (a, b) {
                var inf_a = roles.GetRole(a.role_id);
                var inf_b = roles.GetRole(b.role_id);
                var cfg_a = Template.role.get(a.role_id);
                var cfg_b = Template.role.get(b.role_id);
                if (inf_quest.isRoleOccupied(a.role_id) != inf_quest.isRoleOccupied(b.role_id)) {
                    return inf_quest.isRoleOccupied(a.role_id) ? 1 : -1;
                }
                if (cfg_a.Star != cfg_b.Star) {
                    return (cfg_a.Star > cfg_b.Star) ? -1 : 1;
                }
                if (inf_a.fighting != inf_b.fighting) {
                    return inf_a.fighting > inf_b.fighting ? -1 : 1;
                }
                return a.role_id > b.role_id ? 1 : -1;
            });
            this.m_entries.source = source;
        };
        SendSelectHeroView.prototype.onClick_btnClose = function () {
            this.close();
        };
        return SendSelectHeroView;
    }(PopupUI));
    ui.SendSelectHeroView = SendSelectHeroView;
    __reflect(SendSelectHeroView.prototype, "ui.SendSelectHeroView");
})(ui || (ui = {}));
//# sourceMappingURL=SendSelectHeroView.js.map