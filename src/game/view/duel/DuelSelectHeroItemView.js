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
    var DuelSelectHeroItemView = (function (_super) {
        __extends(DuelSelectHeroItemView, _super);
        /**
         * @constructor
         */
        function DuelSelectHeroItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.DuelSelectHeroItemSkin";
            _this.btnSubmit.text = "上阵";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        /**
         * 组建创建完成
         */
        DuelSelectHeroItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 响应数据变化
         */
        DuelSelectHeroItemView.prototype.dataChanged = function () {
            if (this.data == null) {
                return;
            }
            var role_id = this.data.role_id;
            var role_info = Template.role.get(role_id);
            if (role_info == null) {
                console.error("can't load role config, role id: " + role_id);
                return;
            }
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (my_role == null) {
                console.error("can't get player role info, role id: " + role_id);
                return;
            }
            var talent_info = Template.talent.get(my_role.talent);
            if (talent_info == null) {
                console.error("can't get role talent info, role id: " + my_role + ", talent id: " + my_role.talent);
                return;
            }
            var duel = Singleton.Get(DuelManager).getDuels();
            // 上阵状态
            var my_role_status = duel.getRoleTeamPos(role_id);
            if (my_role_status[0] >= 0) {
                this.labDes.text = "第" + (my_role_status[0] + 1) + "队成员";
            }
            else {
                this.labDes.text = "";
            }
            this.labName.text = RoleUtil.GetFullRoleName(role_id);
            this.labName.textColor = RoleUtil.GetRoleNameColor(my_role.getTier());
            this.labLv.text = my_role.lv.toString();
            this.labFight.text = "战力：" + my_role.fighting;
            ResManager.AsyncSetTexture(this.imgIcon, role_info.Icon);
            ResManager.AsyncSetTexture(this.imgTierBg, Common.getRoleTierBgResEx(my_role.getTier()));
            ResManager.AsyncSetTexture(this.imgTierSub, Common.getRoleTierSubResEx(my_role.getTier()));
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(my_role.getAwakenStar(), my_role.getAwakenActiveStar()));
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        DuelSelectHeroItemView.prototype.onAddToStage = function (e) {
            this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        DuelSelectHeroItemView.prototype.onRemoveFromStage = function (e) {
            this.btnSubmit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
        };
        /**
         * 响应点击
         */
        DuelSelectHeroItemView.prototype.onClick_btnSubmit = function (e) {
            // 发送~
            Singleton.Get(DuelManager).reqTeamChange(this.data.team_id, this.data.pos, this.data.role_id, function () {
                Singleton.Get(LayerManager).getView(ui.DuelSelectHeroView).close();
                Singleton.Get(LayerManager).getView(ui.DuelLineupView).refresh();
            }, this);
        };
        return DuelSelectHeroItemView;
    }(eui.ItemRenderer));
    ui.DuelSelectHeroItemView = DuelSelectHeroItemView;
    __reflect(DuelSelectHeroItemView.prototype, "ui.DuelSelectHeroItemView");
})(ui || (ui = {}));
//# sourceMappingURL=DuelSelectHeroItemView.js.map