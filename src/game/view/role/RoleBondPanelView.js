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
    var RoleBondPanelView = (function (_super) {
        __extends(RoleBondPanelView, _super);
        /**
         * 构造函数
         */
        function RoleBondPanelView() {
            var _this = _super.call(this, "yw.RoleBondPanelSkin") || this;
            _this.init();
            return _this;
        }
        /**
         * 响应创建子对象
         */
        RoleBondPanelView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        RoleBondPanelView.prototype.componentCreated = function () {
        };
        RoleBondPanelView.prototype.onDestroy = function () {
            // TODO 回收事件
            //this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        RoleBondPanelView.prototype.onUpdate = function (time) {
        };
        RoleBondPanelView.prototype.init = function () {
            this.initGuiText();
            this.initEvents();
        };
        RoleBondPanelView.prototype.initGuiText = function () {
            this.labText.text = "拥有对应斗士，即可激活上阵斗士的羁绊"; // TODO 加到文字表
        };
        RoleBondPanelView.prototype.initEvents = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        // region 显示隐藏
        /**
         * 显示
         */
        RoleBondPanelView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(Singleton.Get(LayerManager).getView(ui.RoleBondPanelView));
            this.initContent();
        };
        /**
         * 隐藏
         */
        RoleBondPanelView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(Singleton.Get(LayerManager).getView(ui.RoleBondPanelView));
        };
        /**
         * 响应点击关闭按钮
         */
        RoleBondPanelView.prototype.onClick_btnClose = function () {
            this.close();
        };
        // endregion
        // region 内容构造
        RoleBondPanelView.prototype.initContent = function () {
            this.clearAll();
            this.generateData();
            this.groupAttr.validateNow();
        };
        /**
         * 构造包含所有羁绊的数据
         */
        RoleBondPanelView.prototype.generateData = function () {
            var _this = this;
            var all_roles = Template.role;
            var roles_info = Singleton.Get(RoleManager).getRolesInfo();
            var pve_team = roles_info.pve_team;
            pve_team.foreachValue(function (role_id) {
                if (role_id <= 0) {
                    return;
                }
                // 获取角色信息
                var role_info = all_roles.get(role_id);
                // 只读取玩家可获得角色内容
                if (role_info.Type != RoleType.Player) {
                    return;
                }
                // 获取羁绊列表
                var bond_list = RoleUtil.GetBondList(role_id);
                if (bond_list == null) {
                    egret.error("no bond, roleId: " + role_id);
                    return;
                }
                // 获取玩家已拥有角色信息
                var my_role = roles_info.GetRole(role_id);
                if (my_role != null) {
                    // 玩家有该角色
                    var active_bond_1 = roles_info.ActiveBonds(role_id);
                    _this.createTitle(role_id);
                    bond_list.foreachKey(function (bond_id) {
                        // 检查羁绊激活
                        var is_active = false;
                        for (var i = 0; i < active_bond_1.length; i++) {
                            if (active_bond_1[i] == bond_id) {
                                is_active = true;
                                break;
                            }
                        }
                        _this.createAttrs(bond_id, is_active, bond_list.get(bond_id), role_id);
                    }, _this);
                }
                else {
                    // 玩家没有该角色
                    _this.createTitle(role_id);
                    bond_list.foreachKey(function (bond_id) {
                        _this.createAttrs(bond_id, false, bond_list.get(bond_id), role_id);
                    }, _this);
                }
            }, this);
            /**
            all_roles.foreachKey((role_id: number) => {
                // 获取角色信息
                let role_info: Entity.Role = all_roles.get(role_id);

                // 只读取玩家可获得角色内容
                if(role_info.Type != RoleType.Player){
                    return;
                }

                // 获取羁绊列表
                let bond_list: Dictionary<number, number[]> = RoleUtil.GetBondList(role_id);
                if(bond_list == null){
                    egret.error("no bond, roleId: " + role_id);
                    return;
                }

                // 获取玩家已拥有角色信息
                let my_role: RoleInfo = roles_info.GetRole(role_id);
                if(my_role != null){
                    // 玩家有该角色
                    let active_bond: number[] = roles_info.ActiveBonds(role_id);
                    this.createTitle(role_id);
                    bond_list.foreachKey((bond_id: number) => {

                        // 检查羁绊激活
                        let is_active: boolean = false;
                        for(let i: number = 0; i < active_bond.length; i++){
                            if(active_bond[i] == bond_id){
                                is_active = true;
                                break;
                            }
                        }

                        this.createAttrs(bond_id, is_active, bond_list.get(bond_id), role_id);
                    }, this);
                }
                else{
                    // 玩家没有该角色
                    this.createTitle(role_id);
                    bond_list.foreachKey((bond_id: number) => {
                        this.createAttrs(bond_id, false, bond_list.get(bond_id), role_id);
                    }, this);
                }


            }, this);
            **/
        };
        /**
         * 创建标题
         * @param role_id
         */
        RoleBondPanelView.prototype.createTitle = function (role_id) {
            var title = new ui.RoleBondPanelTitleItemView(RoleUtil.GetFullRoleName(role_id));
            this.groupAttr.addChild(title);
            this.all_titles.push(title);
        };
        /**
         * 创建具体属性
         */
        RoleBondPanelView.prototype.createAttrs = function (bond_id, isActive, role_names, hero_id) {
            var cfg_bond = Template.bond.get(bond_id);
            if (!cfg_bond) {
                egret.error("no bondId: " + bond_id);
                return;
            }
            var bond_name = Template.getGUIText(cfg_bond.BondName);
            var bond_des = RoleUtil.genBondDes(bond_id, role_names, hero_id);
            var attr = new ui.RoleBondPanelAttrItemView(bond_name, bond_des);
            attr.setActive(isActive);
            this.groupAttr.addChild(attr);
            this.all_attrs.push(attr);
        };
        /**
         * 全部清理
         */
        RoleBondPanelView.prototype.clearAll = function () {
            if (this.all_attrs != null) {
                for (var i = 0; i < this.all_attrs.length; i++) {
                    try {
                        this.groupAttr.removeChild(this.all_attrs[i]);
                    }
                    catch (e) {
                        console.log("Exception occurred when clear RoleBondPanel attrs.");
                        console.log(e);
                    }
                }
            }
            if (this.all_titles != null) {
                for (var i = 0; i < this.all_titles.length; i++) {
                    try {
                        this.groupAttr.removeChild(this.all_titles[i]);
                    }
                    catch (e) {
                        console.log("Exception occurred when clear RoleBondPanel subtitles.");
                        console.log(e);
                    }
                }
            }
            this.all_attrs = [];
            this.all_titles = [];
        };
        return RoleBondPanelView;
    }(PopupUI));
    ui.RoleBondPanelView = RoleBondPanelView;
    __reflect(RoleBondPanelView.prototype, "ui.RoleBondPanelView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleBondPanelView.js.map