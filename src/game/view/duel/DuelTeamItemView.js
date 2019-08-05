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
    var DuelTeamItemView = (function (_super) {
        __extends(DuelTeamItemView, _super);
        function DuelTeamItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.DuelTeamItemSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        DuelTeamItemView.prototype.dataChanged = function () {
            if (this.data == null) {
                return;
            }
            this.initView(this.data);
        };
        DuelTeamItemView.prototype.initView = function (team_id) {
            var duel = Singleton.Get(DuelManager).getDuels();
            var fighting = duel.getTeamFighting(team_id);
            var hero_id = duel.getTeamFirstHero(team_id);
            this.labName.text = Common.getDuelTeamName(team_id);
            this.labFighting.text = fighting.toString();
            if (hero_id != 0) {
                this.groupRole.visible = true;
                this.groupPlus.visible = false;
                var role_id = hero_id;
                var role_info = Template.role.get(role_id);
                if (role_info == null) {
                    console.error("Can't get role info, role id: " + role_id);
                    return;
                }
                var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
                if (my_role == null) {
                    console.error("Can't get player role info, role id: " + role_id);
                    return;
                }
                this.labLv.text = my_role.lv.toString();
                ResManager.AsyncSetTexture(this.imgIcon, role_info.Icon);
                ResManager.AsyncSetTexture(this.imgTierBg, Common.getRoleTierBgResEx(my_role.getTier()));
                ResManager.AsyncSetTexture(this.imgTierSub, Common.getRoleTierSubResEx(my_role.getTier()));
                ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(my_role.getAwakenStar(), my_role.getAwakenActiveStar()));
            }
            else {
                this.groupRole.visible = false;
                this.groupPlus.visible = true;
            }
        };
        DuelTeamItemView.prototype.onAddToStage = function () {
            this.groupPlus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRole, this);
            this.groupRole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRole, this);
        };
        DuelTeamItemView.prototype.onRemoveFromStage = function () {
            this.groupPlus.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRole, this);
            this.groupRole.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRole, this);
        };
        DuelTeamItemView.prototype.onClick_btnRole = function (e) {
            Singleton.Get(LayerManager).getView(ui.DuelView).close();
            Singleton.Get(LayerManager).getView(ui.DuelLineupView).open();
        };
        return DuelTeamItemView;
    }(eui.ItemRenderer));
    ui.DuelTeamItemView = DuelTeamItemView;
    __reflect(DuelTeamItemView.prototype, "ui.DuelTeamItemView");
})(ui || (ui = {}));
//# sourceMappingURL=DuelTeamItemView.js.map