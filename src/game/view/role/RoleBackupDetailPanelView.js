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
     * 副将详情界面
     */
    var RoleBackupDetailPanelView = (function (_super) {
        __extends(RoleBackupDetailPanelView, _super);
        // endregion
        // region 生命周期管理
        function RoleBackupDetailPanelView() {
            var _this = _super.call(this, "yw.RoleBackupDetailPanelSkin") || this;
            // 状态变量
            _this.m_cur_idx = 0; // 副将所在位置
            _this.m_cur_pos = 0; // 副将对应的主将座位号
            _this.m_backup_role_id = 0; // 副将的角色id
            _this.init();
            return _this;
        }
        RoleBackupDetailPanelView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        RoleBackupDetailPanelView.prototype.componentCreated = function () {
        };
        RoleBackupDetailPanelView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        RoleBackupDetailPanelView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleBackupDetailPanelView.prototype.init = function () {
            this.labBackupWord0.text = Template.getGUIText("ui_role86");
            this.labBackupWord1.text = Template.getGUIText("ui_role87");
            this.btnChange.text = Template.getGUIText("ui_role64");
            this.btnDevelop.text = Template.getGUIText("ui_role63");
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnDevelop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDevelop, this);
            this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
        };
        /**
         * 响应添加到舞台
         */
        RoleBackupDetailPanelView.prototype.onAddToStage = function () {
        };
        /**
         * 响应从舞台中移除
         */
        RoleBackupDetailPanelView.prototype.onRemoveFromStage = function () {
        };
        // endregion
        // region 显示隐藏
        /**
         * 显示
         */
        RoleBackupDetailPanelView.prototype.open = function (idx, pos) {
            if (!idx) {
                egret.error("incorrect backup idx: " + idx);
                return;
            }
            this.m_cur_idx = idx;
            this.m_cur_pos = pos;
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initContent();
        };
        /**
         * 隐藏
         */
        RoleBackupDetailPanelView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        // endregion
        // region 列表逻辑
        /**
         * 初始化斗士列表
         */
        RoleBackupDetailPanelView.prototype.initContent = function () {
            var roles_info = Singleton.Get(RoleManager).getRolesInfo();
            var cur_pos_backup_dict = roles_info.backup_info.get(this.m_cur_pos);
            // 获取副将角色id
            var backup_id = 0;
            if (cur_pos_backup_dict) {
                backup_id = cur_pos_backup_dict.get(this.m_cur_idx);
                this.m_backup_role_id = backup_id;
            }
            else {
                egret.error("no bakcup, pos: [" + this.m_cur_idx + ", " + this.m_cur_pos + "]");
                return;
            }
            // 获取副将基本信息
            var backup_role_info = Template.role.get(backup_id);
            if (!backup_role_info) {
                egret.error("no backup roleId: " + backup_id);
                return;
            }
            // 获取副将角色信息
            var my_backup_info = roles_info.GetRole(backup_id);
            if (!my_backup_info) {
                egret.error("no player roleId: " + backup_id);
                return;
            }
            // 获取副将觉醒信息
            var backup_awaken = Template.awaken.get(my_backup_info.awaken);
            if (!backup_awaken) {
                egret.error("no awakenId: " + my_backup_info.awaken);
                return;
            }
            // 获取副将天赋信息
            var backup_talent = Template.talent.get(my_backup_info.talent);
            if (!backup_talent) {
                egret.error("no talentId: " + my_backup_info.talent);
            }
            // 填充斗士头像
            ResManager.AsyncSetTexture(this.imgAvatar, backup_role_info.Icon);
            ResManager.AsyncSetTexture(this.imgAvatarTama, Common.getRoleTamaResEx(my_backup_info.getAwakenStar(), my_backup_info.getAwakenActiveStar()));
            ResManager.AsyncSetTexture(this.imgAvatarTierBg, Common.getRoleTierBgResEx(my_backup_info.getTier()));
            ResManager.AsyncSetTexture(this.imgAvatarTierFg, Common.getRoleTierSubResEx(my_backup_info.getTier()));
            this.labAvatarLevel.text = my_backup_info.lv.toString();
            // 填充斗士基本信息
            this.labBackupName.text = RoleUtil.GetFullRoleName(backup_id);
            this.labBackupName.textColor = RoleUtil.GetRoleNameColor(my_backup_info.getTier());
            this.labFighting.text = "战力：" + my_backup_info.fighting.toString();
            // 副将当前效果
            var str_attrs = RoleUtil.genBackupAttrStrs(backup_id);
            this.labAllAttr1.text = "主将" + str_attrs[0];
            this.labAllAttr2.text = str_attrs[1] ? "主将" + str_attrs[1] : "";
            // 填充副将效果
            this.clearEffectList();
            var check_id_list = [RoleAttrType.Crit_Rate, RoleAttrType.Crit_Damage, RoleAttrType.Damage_Reduce, RoleAttrType.Crit_Res];
            var max_active_fighting_idx = -1; // 最大已激活战力索引
            for (var i = 0; i < backup_role_info.BackupId.length; i++) {
                var effect_id = backup_role_info.BackupId[i];
                var effect_info = Template.backup.get(effect_id);
                if (!effect_info) {
                    egret.error("no roleId: " + backup_id + "，backupId: " + effect_id);
                    continue;
                }
                var need_force = backup_role_info.BackupForce[i];
                var is_active = my_backup_info.fighting >= need_force;
                var attr_id_0 = effect_info.BackupAtt[0];
                var attr_val_0 = effect_info.BackupAttvalue[0];
                if (attr_val_0 && check_id_list.indexOf(attr_id_0) != -1)
                    attr_val_0 /= 10;
                var attr_id_1 = effect_info.BackupAtt[1];
                var attr_val_1 = effect_info.BackupAttvalue[1];
                if (attr_val_1 && check_id_list.indexOf(attr_id_1) != -1)
                    attr_val_1 /= 10;
                this.addEffectListItem(UtilsGame.stringHander("战力达到$2，主将$3，$4", Template.getGUIText(backup_role_info.Name), need_force, UtilsGame.stringHander(RoleUtil.GetAttrString(attr_id_0), attr_val_0), UtilsGame.stringHander(RoleUtil.GetAttrString(attr_id_1), attr_val_1)), is_active);
                if (is_active) {
                    max_active_fighting_idx = i;
                }
            }
            // 计算战力
            var next_active_fighting_idx = -1;
            if ((max_active_fighting_idx + 1 + 1) > backup_role_info.BackupId.length) {
                next_active_fighting_idx = max_active_fighting_idx;
            }
            else {
                next_active_fighting_idx = max_active_fighting_idx + 1;
            }
            // 填充所需战力
            var next_active_fighting = backup_role_info.BackupForce[next_active_fighting_idx]; // 下级所需战力
            this.labBackupBarValue.text = my_backup_info.fighting + "/" + next_active_fighting;
            this.progressFight.value = my_backup_info.fighting / next_active_fighting * 100;
        };
        /**
         * 清空效果列表
         */
        RoleBackupDetailPanelView.prototype.clearEffectList = function () {
            if (!this.m_effect_list) {
                this.m_effect_list = [];
                return;
            }
            if (this.m_effect_list.length > 0) {
                for (var i = 0; i < this.m_effect_list.length; i++) {
                    this.groupDetails.removeChild(this.m_effect_list[i]);
                }
            }
            this.m_effect_list = [];
        };
        /**
         * 添加副将效果列表元素
         */
        RoleBackupDetailPanelView.prototype.addEffectListItem = function (text, active) {
            var effect_lab = new eui.Label();
            effect_lab.size = 16;
            effect_lab.bold = true;
            effect_lab.width = 370;
            effect_lab.textColor = active ? DEFINE_COLOR.TEXT_ORANGE : DEFINE_COLOR.TEXT_GRAY;
            effect_lab.text = text;
            this.m_effect_list.push(effect_lab);
            this.groupDetails.addChild(effect_lab);
        };
        // endregion
        // region 响应按钮点击事件
        /**
         * 响应点击关闭按钮
         */
        RoleBackupDetailPanelView.prototype.onClick_btnClose = function () {
            this.close();
        };
        /**
         * 响应更换按钮点击事件
         */
        RoleBackupDetailPanelView.prototype.onClick_btnChange = function () {
            Singleton.Get(LayerManager).getView(ui.RoleSelectBackupPanelView).open(this.m_cur_idx, this.m_cur_pos);
            this.close();
        };
        /**
         * 响应培养按钮点击事件
         */
        RoleBackupDetailPanelView.prototype.onClick_btnDevelop = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.RoleBaseView).openRole(this.m_backup_role_id);
            this.close();
        };
        return RoleBackupDetailPanelView;
    }(PopupUI));
    ui.RoleBackupDetailPanelView = RoleBackupDetailPanelView;
    __reflect(RoleBackupDetailPanelView.prototype, "ui.RoleBackupDetailPanelView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleBackupDetailPanelView.js.map