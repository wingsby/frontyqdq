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
    var RoleLineupHeroItemView = (function (_super) {
        __extends(RoleLineupHeroItemView, _super);
        /**
         * 构造函数
         */
        function RoleLineupHeroItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleLineupHeroItemSkin";
            _this.touchEnabled = true;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        /**
         * 响应创建子对象
         */
        RoleLineupHeroItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 响应添加到舞台
         */
        RoleLineupHeroItemView.prototype.onAddToStage = function () {
            this.btnAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        /**
         * 响应从舞台移除
         */
        RoleLineupHeroItemView.prototype.onRemoveFromStage = function () {
            this.btnAvatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        /**
         * 响应数据更新
         */
        RoleLineupHeroItemView.prototype.dataChanged = function () {
            if (this.data == undefined) {
                return;
            }
            if (!this.m_old_data) {
                this.m_old_data = {};
            }
            // 初始化角色信息
            this.setRole(this.data.lup, this.data.role_id);
            // 选中状态
            this.setActive(this.data.sel);
            // 存下上次的data
            this.m_old_data = UtilsGame.cloneObject(this.data);
            var ani_idx = this.data.lup;
            // 动画
            /**
            if (Singleton.Get(LayerManager).getView(ui.RoleLineupView).ani_active) {
                this.groupRoot.alpha = 0;
                this.groupRoot.y = -70;
                this.groupRoot.scaleX = 1.8;
                this.groupRoot.scaleY = 1.8;
                const tw: egret.Tween = egret.Tween.get(this.groupRoot);
                tw.wait(60 * ani_idx).to({alpha: 1, y: 0, scaleX: 1, scaleY: 1}, 120, egret.Ease.sineOut);
            }
             */
            // 红点
            this.imgNew.visible = Singleton.Get(RoleManager).getRolesInfo().hasAnyRoleIdle();
        };
        /**
         * 设定角色信息
         * @param lup
         * @param role_id
         */
        RoleLineupHeroItemView.prototype.setRole = function (lup, role_id) {
            this.imgBond.visible = false;
            this.groupLineup.visible = false;
            // 未解锁
            var unlocked_count = RoleUtil.GetMaxHeroCounts();
            if (lup + 1 > unlocked_count) {
                this.groupNormal.visible = false;
                this.groupEmpty.visible = false;
                this.groupLocked.visible = true;
                // 显示X级解锁
                var unlock_lv = Template.config.Join[lup];
                this.labUnlock.text = "队伍" + unlock_lv + "级";
                return;
            }
            // 无角色
            if (role_id <= 0) {
                this.groupNormal.visible = false;
                this.groupLocked.visible = false;
                this.groupEmpty.visible = true;
                return;
            }
            // 有角色
            this.groupLocked.visible = false;
            this.groupEmpty.visible = false;
            this.groupNormal.visible = true;
            var role_info = Template.role.get(role_id);
            if (role_info == undefined) {
                YWLogger.error("can't find role, role id: " + role_id);
                return;
            }
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (my_role == undefined) {
                YWLogger.error("can't get player role. role id: " + role_id);
                return;
            }
            this.labLv.text = my_role.lv.toString();
            if (this.m_old_data.role_id != this.data.role_id) {
                ResManager.AsyncSetTexture(this.imgAvatar, role_info.Icon);
                ResManager.AsyncSetTexture(this.imgTierBg, Common.getRoleTierBgResEx(my_role.getTier()));
                ResManager.AsyncSetTexture(this.imgTierSub, Common.getRoleTierSubResEx(my_role.getTier()));
            }
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(my_role.getAwakenStar(), my_role.getAwakenActiveStar()), undefined, undefined, true);
        };
        RoleLineupHeroItemView.prototype.setActive = function (active) {
            if (this.imgSelect.visible == active) {
                return;
            }
            this.imgSelect.visible = active;
            if (active && !Singleton.Get(LayerManager).getView(ui.RoleLineupView).ani_active) {
                this.imgSelect.alpha = 0.5;
                this.imgSelect.scaleX = 1.4;
                this.imgSelect.scaleY = 1.4;
                var tw = egret.Tween.get(this.imgSelect);
                tw.to({ alpha: 1, scaleX: 1, scaleY: 1 }, 80, egret.Ease.sineOut);
            }
        };
        /**
         * 响应点击
         * @param e
         */
        RoleLineupHeroItemView.prototype.onClick = function (e) {
            /**
            // 未解锁
            let unlocked_count: number = RoleUtil.GetMaxHeroCounts();
            if(this.data.lup + 1 > unlocked_count) {
                // 显示X级解锁
                let unlock_lv: number = Template.config.Join[this.data.lup];
                Singleton.Get(DialogControler).showString(unlock_lv + "级解锁");
                return;
            }

            // 无角色
            if(this.data.role_id <= 0) {
                Singleton.Get(LayerManager).getView(ui.RoleSelectHeroAlertView).openByLineupId(this.data.lup);
                return;
            }

            Singleton.Get(LayerManager).getView(ui.RoleLineupView).selHero(this.data.lup);
            Singleton.Get(LayerManager).getView(ui.RoleLineupView).selCardEf(this.data.lup);
             */
            RoleUtil.handleLineupHeroGo(this.data.lup, this.data.role_id);
        };
        return RoleLineupHeroItemView;
    }(eui.ItemRenderer));
    ui.RoleLineupHeroItemView = RoleLineupHeroItemView;
    __reflect(RoleLineupHeroItemView.prototype, "ui.RoleLineupHeroItemView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleLineupHeroItemView.js.map