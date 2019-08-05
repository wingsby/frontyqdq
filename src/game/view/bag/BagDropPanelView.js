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
    var BagDropPanelView = (function (_super) {
        __extends(BagDropPanelView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function BagDropPanelView() {
            var _this = _super.call(this, "yw.BagDropPanelSkin") || this;
            _this.m_cur_role_id = 0;
            _this.m_cur_item_id = 0;
            _this.touchEnabled = false;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        BagDropPanelView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        BagDropPanelView.prototype.onDestroy = function () {
            //this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            //this.btnView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnView, this);
        };
        /**
         * 帧更新
         * @param time
         */
        BagDropPanelView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        BagDropPanelView.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnViewRole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnViewRole, this);
            this.btnViewEquip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnViewEquip, this);
            this.btnViewRoleFrag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnViewRoleFrag, this);
            this.listDrops.itemRenderer = ui.BagDropPanelItemView;
            this.initGuiText();
        };
        /**
         * 初始化UI文字
         */
        BagDropPanelView.prototype.initGuiText = function () {
            this.btnViewRole.text = Template.getGUIText("ui_role9");
            this.btnViewEquip.text = Template.getGUIText("ui_equip8");
            this.btnViewRoleFrag.text = "预 览";
        };
        /**
         * 析构（手动调用）
         */
        BagDropPanelView.prototype.dispose = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnViewRole.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnViewRole, this);
            this.btnViewEquip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnViewEquip, this);
            this.btnViewRoleFrag.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnViewRoleFrag, this);
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        BagDropPanelView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
        };
        /**
         * 打开材料（普通道具）获取途径
         * @param item_id
         */
        BagDropPanelView.prototype.openMaterial = function (item_id) {
            this.open();
            this.initMaterial(item_id);
        };
        /**
         * 打开装备碎片获取途径
         * @param item_id
         * @param show_compose
         */
        BagDropPanelView.prototype.openEquipFrag = function (item_id, show_compose) {
            if (show_compose === void 0) { show_compose = false; }
            this.open();
            this.initEquipFrag(item_id);
            this.btnViewEquip.visible = show_compose;
        };
        /**
         * 打开角色获取途径
         * @param role_id
         */
        BagDropPanelView.prototype.openRole = function (role_id) {
            this.open();
            this.initRoleInfo(role_id);
        };
        /**
         * 打开角色碎片获取途径
         * @param item_id
         */
        BagDropPanelView.prototype.openRoleFrag = function (item_id) {
            this.open();
            this.initMaterial(item_id);
            this.imgInfoFrag.visible = true;
        };
        /**
         * 关闭本界面
         */
        BagDropPanelView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
        };
        // endregion
        // region 获取途径
        /**
         * 初始化材料（普通道具）
         * @param item_id
         */
        BagDropPanelView.prototype.initMaterial = function (item_id) {
            this.m_cur_item_id = item_id;
            this.groupInfoItem.visible = true;
            this.groupInfoEquip.visible = false;
            this.groupInfoRole.visible = false;
            this.imgInfoFrag.visible = false;
            // 获取道具信息
            var item_info = Template.item.get(item_id);
            if (item_info == null) {
                egret.error("no itemId: " + item_id);
                return;
            }
            this.labInfoItemName.text = Template.getGUIText(item_info.iName);
            this.labInfoItemDes.text = Template.getGUIText(item_info.itemTxt);
            this.btnViewRoleFrag.visible = item_info.iType == ItemType.RoleFragment;
            // 生成掉落信息
            this.initItemIcon(item_info);
            this.initDropWays(item_info);
        };
        /**
         * 初始化装备碎片
         * @param item_id
         */
        BagDropPanelView.prototype.initEquipFrag = function (item_id) {
            this.m_cur_item_id = item_id;
            this.groupInfoItem.visible = false;
            this.groupInfoEquip.visible = true;
            this.groupInfoRole.visible = false;
            this.imgInfoFrag.visible = true;
            // 获取道具信息
            var item_info = Template.item.get(item_id);
            if (item_info == null) {
                egret.error("no itemId: " + item_id);
                return;
            }
            this.labInfoEquipName.text = Template.getGUIText(item_info.iName);
            this.labProgressInfoEquip.text = Singleton.Get(BagManager).getItemCount(item_id).toString() + "/" + item_info.Synthesis;
            this.progressInfoEquip.value = Singleton.Get(BagManager).getItemCount(item_id) / item_info.Synthesis * 100;
            // 生成掉落信息
            this.initItemIcon(item_info);
            this.initDropWays(item_info);
        };
        /**
         * 初始化角色碎片
         */
        BagDropPanelView.prototype.initRoleInfo = function (role_id) {
            this.m_cur_role_id = role_id;
            this.groupInfoItem.visible = false;
            this.groupInfoEquip.visible = false;
            this.groupInfoRole.visible = true;
            this.imgInfoFrag.visible = true;
            // 加载角色信息
            var role_info = Template.role.get(role_id);
            if (role_info == null) {
                egret.error("no roleId: " + role_id);
                return;
            }
            // 获取道具信息
            var item_info = Template.item.get(role_info.Fragment);
            if (item_info == null) {
                egret.error("no itemId: " + role_info.Fragment);
                return;
            }
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            this.labInfoRoleLv.text = RoleUtil.GetFullRoleName(role_id);
            // this.labInfoRoleLv.text = "等级：" + ((my_role == null) ? 1 : my_role.lv);
            var frag_count = Singleton.Get(BagManager).getItemCount(role_info.Fragment);
            this.labProgressInfoRole.text = frag_count + "/" + role_info.RoleSynthesis;
            this.progressInfoRole.value = frag_count / role_info.RoleSynthesis * 100;
            // 生成掉落信息
            this.initItemIcon(item_info);
            this.initDropWays(item_info);
        };
        /**
         * 初始化道具图标
         * @param item_info
         */
        BagDropPanelView.prototype.initItemIcon = function (item_info) {
            ResManager.AsyncSetTexture(this.imgInfoIcon, item_info.iIcon);
            ResManager.AsyncSetTexture(this.imgInfoTier, Common.getItemTierBgRes(item_info.iStar));
        };
        /**
         * 初始化获取途径展示
         */
        BagDropPanelView.prototype.initDropWays = function (item_info) {
            // 初始化数据源
            var ds_list_ways = [];
            this.listDrops.dataProvider = new eui.ArrayCollection(ds_list_ways);
            // 无获取途径
            if (item_info == undefined || item_info.iWay == "0") {
                return;
            }
            // 解析来源字符串
            var way_str = item_info.iWay;
            var way_arr = way_str.split(";");
            // 构造来源信息
            for (var i = 0; i < way_arr.length; i++) {
                var s_arr = way_arr[i].split(":");
                var s_type = parseInt(s_arr[0]);
                var s_attr = s_arr[1];
                ds_list_ways.push({
                    type: s_type,
                    arg: s_attr,
                    text: item_info.itemTxt1.split(",")[i]
                });
            }
        };
        // endregion
        // region 响应点击事件
        /**
         * 响应关闭按钮点击事件
         */
        BagDropPanelView.prototype.onClick_btnClose = function () {
            this.close();
        };
        /**
         * 响应查看角色按钮点击事件
         */
        BagDropPanelView.prototype.onClick_btnViewRole = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnViewRole, function () {
                Singleton.Get(LayerManager).getView(ui.RoleDetailView).open(_this.m_cur_role_id);
            }, this);
        };
        /**
         * 响应合成装备按钮点击事件
         */
        BagDropPanelView.prototype.onClick_btnViewEquip = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnViewEquip, function () {
                Singleton.Get(EquipManager).onReqCompose(_this.m_cur_item_id, function () {
                    _this.close();
                }, _this);
            }, this);
        };
        /**
         * 响应查看角色碎片点击事件
         */
        BagDropPanelView.prototype.onClick_btnViewRoleFrag = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnViewRoleFrag, function () {
                var roles = Template.role.values;
                for (var i = 0; i < roles.length; i++) {
                    var cfg_role = roles[i];
                    if (cfg_role.Type != RoleType.Player) {
                        continue;
                    }
                    if (cfg_role.Fragment == _this.m_cur_item_id) {
                        Singleton.Get(LayerManager).getView(ui.RoleDetailView).open(cfg_role.ID, true, true);
                        return;
                    }
                }
            }, this);
        };
        return BagDropPanelView;
    }(PopupUI));
    ui.BagDropPanelView = BagDropPanelView;
    __reflect(BagDropPanelView.prototype, "ui.BagDropPanelView");
})(ui || (ui = {}));
//# sourceMappingURL=BagDropPanelView.js.map