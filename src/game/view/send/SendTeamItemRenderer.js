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
    var SendTeamItemRenderer = (function (_super) {
        __extends(SendTeamItemRenderer, _super);
        function SendTeamItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.SendTeamItemRenderer";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        SendTeamItemRenderer.prototype.onAddToStage = function () {
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        SendTeamItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        SendTeamItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var role_id = this.data.role_id;
            console.log("role_id: " + role_id);
            if (role_id <= 0) {
                this.currentState = SendTeamItemRenderer.STATUS_EMPTY;
                return;
            }
            var cfg_role = Template.role.get(role_id);
            if (!cfg_role) {
                console.error("no role: " + role_id);
                return;
            }
            var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (!inf_role) {
                console.error("no inf role: " + role_id);
                return;
            }
            this.currentState = SendTeamItemRenderer.STATUS_ROLE;
            this.imgTier.texture = null;
            this.imgTierSub.texture = null;
            this.imgIcon.texture = null;
            ResManager.setTexture(this.imgTier, Common.getRoleTierBgResEx(cfg_role.Star));
            ResManager.setTexture(this.imgTierSub, Common.getRoleTierSubResEx(cfg_role.Star));
            ResManager.setTexture(this.imgIcon, cfg_role.Icon);
            this.labLv.text = "" + inf_role.lv;
        };
        SendTeamItemRenderer.prototype.onClick_btnHandler = function () {
            if (!this.data.allow_change) {
                return;
            }
            Singleton.Get(LayerManager).getView(ui.SendSelectHeroView).open(this.data.pos, SendUtil.getValidRoles(Singleton.Get(LayerManager).getView(ui.SendTeamView).getCurTeam()));
        };
        return SendTeamItemRenderer;
    }(eui.ItemRenderer));
    SendTeamItemRenderer.STATUS_EMPTY = "empty";
    SendTeamItemRenderer.STATUS_ROLE = "role";
    ui.SendTeamItemRenderer = SendTeamItemRenderer;
    __reflect(SendTeamItemRenderer.prototype, "ui.SendTeamItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=SendTeamItemRenderer.js.map