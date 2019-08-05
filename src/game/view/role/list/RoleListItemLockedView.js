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
    var RoleListItemLockedView = (function (_super) {
        __extends(RoleListItemLockedView, _super);
        /**
         * 构造函数
         */
        function RoleListItemLockedView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleListItemLockedSkin";
            return _this;
        }
        /**
         * 响应创建子对象
         */
        RoleListItemLockedView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        RoleListItemLockedView.prototype.dataChanged = function () {
            // this.playAni(this.data.ani_idx);
            var role_id = this.data.roleId;
            var role_info = Template.role.get(role_id);
            if (!role_info) {
                egret.error("no roleId: " + role_id);
                return;
            }
            var awaken_info = Template.awaken.get(role_info.AwakenID);
            if (!awaken_info) {
                egret.error("no roleId: " + role_id + "，awakenId: " + role_info.AwakenID);
                return;
            }
            var my_role = new RoleInfo();
            my_role.InitByRoleConfigIdAndLv(role_id, 1);
            // 碎片进度
            var frag_count = Singleton.Get(BagManager).getItemCount(role_info.Fragment);
            this.progFrag.slideDuration = 0;
            this.progFrag.value = Math.floor(frag_count / role_info.RoleSynthesis * 100);
            this.progFrag.validateNow();
            this.progFrag.alpha = UtilsGame.getRandomInt(99000, 100000) * 0.00001;
            this.labFrag.text = frag_count + "/" + role_info.RoleSynthesis;
            // 初始勾玉
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(awaken_info.AwakenStar, 0));
            // this.imgTama.horizontalCenter = Common.getRoleListTamaHorizontalCenter(awaken_info.AwakenStar);
            // 角色原画
            this.imgCard.source = "kp_bm_png";
            ResManager.AsyncSetTexture(this.imgCard, Common.getRoleListLockedRes(role_id));
            // 角色名
            this.labName.text = RoleUtil.GetFullRoleName(role_id);
            this.labName.textColor = RoleUtil.GetRoleNameColor(my_role.getTier(), true);
            // 边框
            ResManager.AsyncSetTexture(this.imgBorder, Common.getRoleListBorderRes(role_info.Star));
            // 战力
            this.labFighting.text = my_role.fighting.toString();
        };
        RoleListItemLockedView.prototype.playAni = function (id) {
            this.groupRoot.alpha = 0;
            this.groupRoot.scaleY = 1.4;
            this.groupRoot.y = 120;
            var tw = egret.Tween.get(this.groupRoot);
            tw.wait(id * 50).to({ alpha: 1, scaleY: 1, y: 0 }, 100, egret.Ease.sineOut);
            this.groupName.alpha = 0;
            var tw_name = egret.Tween.get(this.groupName);
            tw_name.wait(id * 50 + 80).to({ alpha: 1 }, 100, egret.Ease.sineOut);
        };
        return RoleListItemLockedView;
    }(eui.ItemRenderer));
    ui.RoleListItemLockedView = RoleListItemLockedView;
    __reflect(RoleListItemLockedView.prototype, "ui.RoleListItemLockedView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleListItemLockedView.js.map