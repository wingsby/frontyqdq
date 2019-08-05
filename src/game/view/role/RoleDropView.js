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
    var RoleDropView = (function (_super) {
        __extends(RoleDropView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleDropView() {
            var _this = _super.call(this, "yw.RoleDropSkin") || this;
            _this.m_cur_role_id = 0;
            _this.touchEnabled = false;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleDropView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleDropView.prototype.onDestroy = function () {
            //this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            //this.btnView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnView, this);
        };
        /**
         * 帧更新
         * @param time
         */
        RoleDropView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleDropView.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnView, this);
            this.listDrops.itemRenderer = ui.RoleDropItemView;
            this.initGuiText();
        };
        /**
         * 初始化UI文字
         */
        RoleDropView.prototype.initGuiText = function () {
            this.btnView.text = Template.getGUIText("ui_role9");
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleDropView.prototype.open = function (role_id) {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initRoleInfo(role_id);
        };
        /**
         * 关闭本界面
         */
        RoleDropView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
        };
        // endregion
        // region 获取途径
        /**
         * 初始化角色信息
         */
        RoleDropView.prototype.initRoleInfo = function (role_id) {
            this.m_cur_role_id = role_id;
            // 加载角色信息
            var role_info = Template.role.get(role_id);
            if (role_info == null) {
                egret.error("no roleId: " + role_id);
                return;
            }
            ResManager.AsyncSetTexture(this.imgAvatar, role_info.Icon);
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (my_role == null) {
                // 填充角色信息
                // this.labLv.text = "等级：" + 1;
                ResManager.AsyncSetTexture(this.imgAvatarTierBg, Common.getRoleTierBgResEx(role_info.Star));
                ResManager.AsyncSetTexture(this.imgAvatarTierFg, Common.getRoleTierSubResEx(role_info.Star));
                this.labAvatarLevel.text = "1";
            }
            else {
                // 填充角色信息
                // this.labLv.text = "等级：" + my_role.lv;
                var breach_info = Template.talent.get(my_role.talent);
                ResManager.AsyncSetTexture(this.imgAvatarTierBg, Common.getRoleTierBgResEx(my_role.getTier()));
                ResManager.AsyncSetTexture(this.imgAvatarTierFg, Common.getRoleTierSubResEx(my_role.getTier()));
                this.labAvatarLevel.text = my_role.lv.toString();
            }
            // 填充角色名
            this.labLv.text = RoleUtil.GetFullRoleName(role_id);
            // 填充角色头像
            ResManager.AsyncSetTexture(this.imgAvatar, role_info.Icon);
            var frag_count = Singleton.Get(BagManager).getItemCount(role_info.Fragment);
            this.labProgressBar.text = frag_count + "/" + role_info.RoleSynthesis;
            this.progressBar.value = frag_count / role_info.RoleSynthesis * 100;
            // 生成掉落信息
            this.initDropWays(role_id);
        };
        /**
         * 初始化获取途径展示
         */
        RoleDropView.prototype.initDropWays = function (role_id) {
            // 获取角色信息
            var role_info = Template.role.get(role_id);
            if (role_info == null) {
                egret.error("no roleId: " + role_id);
                return;
            }
            // 获取碎片信息
            var frag_info = Template.item.get(role_info.Fragment);
            if (frag_info == null) {
                egret.error("no frag itemId: " + role_info.Fragment);
                return;
            }
            // 初始化数据源
            var ds_list_ways = [];
            this.listDrops.dataProvider = new eui.ArrayCollection(ds_list_ways);
            // 解析来源字符串
            var way_str = frag_info.iWay;
            var way_arr = way_str.split(";");
            // 构造来源信息
            for (var i = 0; i < way_arr.length; i++) {
                var s_arr = way_arr[i].split(":");
                var s_type = parseInt(s_arr[0]);
                var s_attr = s_arr[1];
                ds_list_ways.push({
                    type: s_type,
                    arg: s_attr,
                    text: frag_info.itemTxt1.split(",")[i]
                });
            }
        };
        // endregion
        // region 响应点击事件
        /**
         * 响应关闭按钮点击事件
         */
        RoleDropView.prototype.onClick_btnClose = function () {
            this.close();
        };
        /**
         * 响应查看按钮点击事件
         */
        RoleDropView.prototype.onClick_btnView = function () {
            Singleton.Get(LayerManager).getView(ui.RoleDetailView).open(this.m_cur_role_id);
        };
        return RoleDropView;
    }(PopupUI));
    ui.RoleDropView = RoleDropView;
    __reflect(RoleDropView.prototype, "ui.RoleDropView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleDropView.js.map