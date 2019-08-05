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
    var RoleSimpleAvatarView = (function (_super) {
        __extends(RoleSimpleAvatarView, _super);
        /**
         * 构造函数
         */
        function RoleSimpleAvatarView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleSimpleAvatarSkin";
            _this.touchEnabled = true;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        /**
         * 响应创建子对象
         */
        RoleSimpleAvatarView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 响应添加到舞台
         */
        RoleSimpleAvatarView.prototype.onAddToStage = function () {
        };
        /**
         * 响应从舞台移除
         * 因为eui.ItemRenderer不支持手动析构，所以析构也应写在此处
         */
        RoleSimpleAvatarView.prototype.onRemoveFromStage = function () {
            // TODO 暂时禁用
            //this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            //this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            //this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        /**
         * 设定角色
         */
        RoleSimpleAvatarView.prototype.setRole = function (roleId) {
            var r_info = Template.role.get(roleId);
            if (!r_info) {
                egret.error("RoleSimpleAvatarView incorrect roleId: " + roleId);
                return;
            }
            this.roleId = roleId;
            this.setAvatar(r_info.Icon);
        };
        /**
         * 设定角色头像
         */
        RoleSimpleAvatarView.prototype.setAvatar = function (res_name) {
            ResManager.AsyncSetTexture(this.imgAvatar, res_name + "_png");
            // ResManager.getResAsync(res_name + "_png", (res: any, resName: string) => { this.imgAvatar.texture = res; }, this);
        };
        /**
         * 设定角色等级
         * @param lv
         */
        RoleSimpleAvatarView.prototype.setLevel = function (lv) {
            this.labLevel.text = lv.toString();
        };
        Object.defineProperty(RoleSimpleAvatarView.prototype, "isEmpty", {
            /**
             * 检查是否为空
             * @returns {boolean}
             */
            get: function () {
                if (!this.groupEmpty) {
                    return false;
                }
                return this.groupEmpty.visible;
            },
            /**
             * 置空
             */
            set: function (isEmpty) {
                this.groupEmpty.visible = isEmpty;
                this.groupRole.visible = !isEmpty;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 刷新通知提示
         */
        RoleSimpleAvatarView.prototype.refreshNew = function () {
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(this.data.roleId);
            if (!my_role) {
                return;
            }
            var layer = Singleton.Get(LayerManager);
            if (layer.isAnyViewOnStage([layer.getView(ui.RoleEquipStrengthView), layer.getView(ui.RoleEquipRefineView), layer.getView(ui.RoleEquipEnchantView)])) {
                this.imgNew.visible = my_role.checkEquipUpAble();
            }
            else if (layer.isAnyViewOnStage([layer.getView(ui.RoleJewelryStrengthView), layer.getView(ui.RoleJewelryEvolutionView)])) {
                this.imgNew.visible = my_role.checkJewelryAlarm();
            }
            else {
                this.imgNew.visible = my_role.alarm.al_role;
            }
        };
        RoleSimpleAvatarView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.refreshNew();
        };
        return RoleSimpleAvatarView;
    }(eui.ItemRenderer));
    ui.RoleSimpleAvatarView = RoleSimpleAvatarView;
    __reflect(RoleSimpleAvatarView.prototype, "ui.RoleSimpleAvatarView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleSimpleAvatarView.js.map