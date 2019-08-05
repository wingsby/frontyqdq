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
    var RoleListView = (function (_super) {
        __extends(RoleListView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleListView() {
            var _this = _super.call(this, "yw.RoleListSkin") || this;
            _this.m_ds_list_unlocked = [];
            _this.m_array_unlocked = new eui.ArrayCollection();
            _this.m_ds_list_locked = [];
            _this.m_array_locked = new eui.ArrayCollection();
            _this.need_refresh = false;
            /**
             * 响应已有角色的点击事件
             * @param e
             */
            _this.last_cypwfm_role_id = 0;
            // endregion
            // region 引导-主将列表
            _this.agent_hero_id = 0;
            _this.touchEnabled = false;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleListView.prototype.componentCreated = function () {
            // 初始化数据源
            this.listLocked.dataProvider = this.m_array_locked;
            this.listUnlocked.dataProvider = this.m_array_unlocked;
            this.listLocked.useVirtualLayout = true;
            this.listUnlocked.useVirtualLayout = true;
        };
        /**
         * 响应销毁
         */
        RoleListView.prototype.onDestroy = function () {
            this.listUnlocked.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_unlockedRoles, this);
            this.listLocked.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_lockedRoles, this);
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
            this.listUnlocked.dataProvider = undefined;
            this.listLocked.dataProvider = undefined;
        };
        /**
         * 帧更新
         * @param time
         */
        RoleListView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleListView.prototype.init = function () {
            this.listUnlocked.itemRenderer = ui.RoleListItemUnlockedView;
            this.listUnlocked.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_unlockedRoles, this);
            this.listLocked.itemRenderer = ui.RoleListItemLockedView;
            this.listLocked.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_lockedRoles, this);
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleListView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            var ani_idx = this.initUnlockedList(false);
            // this.initSplit(ani_idx);
            this.initLockedList(false, ani_idx);
            this.refresh();
        };
        /**
         * 关闭本界面
         */
        RoleListView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            this.btnAgent.visible = false;
            this.btnAgent.x = -360;
        };
        /**
         * 刷新界面
         */
        RoleListView.prototype.refresh = function () {
            if (this.need_refresh) {
                this.execRefreshReq();
            }
        };
        /**
         * 请求下次打开时刷新界面
         */
        RoleListView.prototype.reqRefresh = function () {
            this.need_refresh = true;
        };
        /**
         * 执行刷新请求
         */
        RoleListView.prototype.execRefreshReq = function () {
            this.need_refresh = false;
            if (Singleton.Get(LayerManager).isViewOnStage(this)) {
                var ani_idx = this.initUnlockedList(true);
                // this.initSplit(ani_idx);
                this.initLockedList(true, ani_idx);
            }
        };
        // endregion
        // region 已拥有角色
        RoleListView.prototype.initSplit = function (ani_idx) {
            this.groupLine.scaleY = 0.6;
            this.groupLine.alpha = 0;
            var tw = egret.Tween.get(this.groupLine);
            tw.wait(ani_idx * 60).to({ alpha: 1, scaleY: 1 }, 100);
        };
        /**
         * 初始化已拥有角色列表
         */
        RoleListView.prototype.initUnlockedList = function (needRefresh) {
            // if (this.need_refresh || needRefresh || this.m_ds_list_unlocked.length == 0) {
            this.m_ds_list_unlocked = [];
            var bag_mgr = Singleton.Get(BagManager);
            var pve_team = Singleton.Get(RoleManager).getRolesInfo().pve_team;
            var my_roles_group = Singleton.Get(RoleManager).getRolesInfo();
            var my_roles_list = this.generateRolesList();
            // 遍历未拥有的可合成角色
            var ani_idx = 0;
            var locked_roles = Singleton.Get(RoleManager).getLockedRoles();
            for (var i = 0; i < locked_roles.length; i++) {
                var role_id = locked_roles[i];
                var role_info = Template.role.get(role_id);
                if (!role_info) {
                    egret.error("no roleId: " + role_id);
                    return;
                }
                // 未达合成条件的角色不显示在已获得角色列表中
                var frag_count = bag_mgr.getItemCount(role_info.Fragment);
                var is_composable = (frag_count >= role_info.RoleSynthesis);
                if (!is_composable) {
                    continue;
                }
                this.m_ds_list_unlocked.push({
                    roleId: role_id,
                    is_composable: true,
                    ani_idx: ani_idx
                });
                ani_idx += 1;
            }
            // 遍历已拥有角色
            for (var i = 0; i < my_roles_list.length; i++) {
                var role_id = my_roles_list[i];
                var role_info = Template.role.get(role_id);
                var my_role_info = my_roles_group.GetRole(role_id);
                // 判空
                if (!role_info) {
                    egret.error("no roleId: " + role_id);
                    return;
                }
                // 获取觉醒信息
                var my_awaken_info = Template.awaken.get(my_role_info.awaken);
                if (!my_awaken_info) {
                    egret.error("no roleId: " + role_id + "，awakenId: " + role_info.AwakenID);
                    return;
                }
                // 获取资质信息
                var my_talent_info = Template.talent.get(my_role_info.talent);
                if (!my_talent_info) {
                    egret.error("no roleId: " + role_id + "，talentId: " + my_role_info.talent);
                    return;
                }
                this.m_ds_list_unlocked.push({
                    roleId: role_id,
                    is_composable: false,
                    ani_idx: ani_idx
                });
                ani_idx += 1;
            }
            // 刷新数据源
            this.m_array_unlocked.removeAll();
            this.m_array_unlocked.replaceAll(this.m_ds_list_unlocked);
            this.m_array_unlocked.refresh();
            // }
            return ani_idx;
        };
        /**
         * 生成已解锁的角色列表
         * @returns {number[]}
         */
        RoleListView.prototype.generateRolesList = function () {
            var result = [];
            var my_roles = Singleton.Get(RoleManager).getRolesInfo().roles;
            for (var i = 0; i < my_roles.length; i++) {
                result.push(my_roles[i].role_id);
            }
            result = this.sortRolesList(result);
            return result;
        };
        /**
         * 对已解锁角色列表排序
         */
        RoleListView.prototype.sortRolesList = function (list) {
            var result = list;
            list.sort(function (a, b) {
                var roles_info = Singleton.Get(RoleManager).getRolesInfo();
                // 根据是否出阵排序
                var a_is_hero = roles_info.IsHero(a);
                var b_is_hero = roles_info.IsHero(b);
                if ((a_is_hero && !b_is_hero) || (b_is_hero && !a_is_hero)) {
                    if (a_is_hero) {
                        return -1;
                    }
                    if (b_is_hero) {
                        return 1;
                    }
                }
                // 根据角色品质排序
                var cfg_role_a = Template.role.get(a);
                var cfg_role_b = Template.role.get(b);
                if (cfg_role_a && cfg_role_b) {
                    if (cfg_role_a.Star != cfg_role_b.Star) {
                        if (cfg_role_a.Star > cfg_role_b.Star) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                }
                // 根据战力排序
                var a_my_role = roles_info.GetRole(a);
                var b_my_role = roles_info.GetRole(b);
                var result = 1;
                if (a_my_role.fighting > b_my_role.fighting) {
                    result = -1;
                }
                return result;
            });
            return result;
        };
        RoleListView.prototype.onClick_unlockedRoles = function (e) {
            if (e && e.item) {
                this.last_cypwfm_role_id = e.item.roleId;
            }
            if (Singleton.Get(GuideManager).CouldYouPleaseWaitForMe("RoleListView", "groupRoot", this.onClick_unlockedRoles, this, e)) {
                return;
            }
            var role_id = this.last_cypwfm_role_id;
            this.handleClickUnlocked(role_id);
        };
        // endregion
        // region 未拥有角色
        /**
         * 初始化未解锁的角色列表
         */
        RoleListView.prototype.initLockedList = function (needRefresh, ani_idx) {
            // if (this.need_refresh || needRefresh || this.m_ds_list_locked.length == 0) {
            this.m_ds_list_locked = [];
            // 获取未解锁的斗士
            var locked_roles = Singleton.Get(RoleManager).getLockedRoles();
            var bag_mgr = Singleton.Get(BagManager);
            // 遍历未拥有角色
            for (var i = 0; i < locked_roles.length; i++) {
                var role_id = locked_roles[i];
                var role_info = Template.role.get(role_id);
                if (!role_info) {
                    egret.error("no roleId: " + role_id);
                    return;
                }
                // 已达合成条件的角色不显示在未获得角色列表中
                var frag_count = bag_mgr.getItemCount(role_info.Fragment);
                // console.log("{frag} Status: " + (frag_count >= role_info.RoleSynthesis) + " Count: " + frag_count + ", Need: " + role_info.RoleSynthesis);
                if (frag_count >= role_info.RoleSynthesis) {
                    continue;
                }
                // 未获得过碎片的角色不显示在未获得角色列表中
                if (frag_count <= 0) {
                    continue;
                }
                this.m_ds_list_locked.push({
                    roleId: role_id,
                    frag_count: frag_count,
                });
            }
            // 按已拥有碎片数排序
            // this.m_ds_list_locked.sort((a: any, b: any) => {
            //    return (a.frag_count > b.frag_count) ? -1 : 1;
            // });
            // 生成序列号
            ani_idx += 1;
            for (var i = 0; i < this.m_ds_list_locked.length; i++) {
                this.m_ds_list_locked[i]["ani_idx"] = ani_idx;
                ani_idx += 1;
            }
            // 刷新数据源
            this.m_array_locked.removeAll();
            this.m_array_locked.replaceAll(this.m_ds_list_locked);
            this.m_array_locked.refresh();
            // 全部解锁则隐藏分割线
            if (this.m_array_locked.length <= 0) {
                this.groupLine.visible = false;
                return;
            }
            else {
                this.groupLine.visible = true;
            }
            // }
        };
        /**
         * 响应未拥有角色的点击事件
         * @param e
         */
        RoleListView.prototype.onClick_lockedRoles = function (e) {
            /*
            let is_compose_enable: boolean = RoleUtil.checkRoleCompose(e.item.roleId);
            if (is_compose_enable) {
                Singleton.Get(RoleManager).onReqCompose(e.item.roleId);
            } else {
            */
            // 弹出获取途径
            Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openRole(e.item.roleId);
            /*
            }
            */
        };
        RoleListView.prototype.initAgent = function (idx) {
            this.initUnlockedList(true);
            this.agent_hero_id = this.m_ds_list_unlocked[idx - 1].roleId;
            this.btnAgent.visible = true;
            // 计算引导所在行列
            var col = (idx % 3); // 列 从1起
            if (col == 0) {
                col = 3;
            }
            var row = Math.ceil(idx / 3); // 行 从1起
            // 计算引导位置
            this.btnAgent.x = 22 + (144 + 4) * (col - 1);
            this.btnAgent.y = 102 + (226 + 5) * (row - 1);
        };
        RoleListView.prototype.onClick_btnAgent = function (e) {
            this.handleClickUnlocked(this.agent_hero_id);
        };
        RoleListView.prototype.handleClickUnlocked = function (role_id) {
            // 如果已经拥有，进入
            if (Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id)) {
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).openRole(role_id);
                return;
            }
            // 如果可合成 进行合成
            var is_compose_enable = RoleUtil.checkRoleCompose(role_id);
            if (is_compose_enable) {
                Singleton.Get(RoleManager).onReqCompose(role_id);
                return;
            }
        };
        return RoleListView;
    }(BaseUI));
    ui.RoleListView = RoleListView;
    __reflect(RoleListView.prototype, "ui.RoleListView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleListView.js.map