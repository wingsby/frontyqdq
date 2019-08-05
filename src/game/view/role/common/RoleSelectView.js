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
    var RoleSelectView = (function (_super) {
        __extends(RoleSelectView, _super);
        function RoleSelectView() {
            var _this = _super.call(this, "yw.RoleSelectSkin") || this;
            _this.m_exclude = [];
            _this.m_entities = new eui.ArrayCollection();
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        RoleSelectView.prototype.componentCreated = function () {
            this.dgHeros.dataProvider = this.m_entities;
            this.dgHeros.itemRenderer = ui.RoleSelectItemRenderer;
        };
        ;
        RoleSelectView.prototype.onDestroy = function () { };
        ;
        RoleSelectView.prototype.onUpdate = function (time) { };
        ;
        RoleSelectView.prototype.onAddToStage = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        RoleSelectView.prototype.onRemoveFromStage = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        RoleSelectView.prototype.open = function (exclude, callback, thisObj) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            this.m_exclude = exclude;
            this.m_callback = callback;
            this.m_callback_this = thisObj;
            this.m_callback_args = args;
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.refresh();
        };
        RoleSelectView.prototype.close = function () {
            this.m_exclude = undefined;
            this.m_callback = undefined;
            this.m_callback_this = undefined;
            this.m_callback_args = undefined;
            this.m_entities.removeAll();
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        RoleSelectView.prototype.refresh = function () {
            this.initView();
            this.initEmpty();
        };
        RoleSelectView.prototype.initView = function () {
            var source = [];
            var exclude = this.m_exclude;
            var inf_roles = Singleton.Get(RoleManager).getRolesInfo();
            var ls_roles = inf_roles.roles;
            for (var i = 0; i < ls_roles.length; i++) {
                var role_id = ls_roles[i].role_id;
                if (exclude.indexOf(role_id) >= 0) {
                    continue;
                }
                source.push({
                    role_id: role_id
                });
            }
            source.sort(function (a, b) {
                var inf_a = inf_roles.GetRole(a.role_id);
                var inf_b = inf_roles.GetRole(b.role_id);
                if (!inf_a || !inf_b) {
                    if (!inf_a) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                if (inf_a.fighting != inf_b.fighting) {
                    if (inf_a.fighting > inf_b.fighting) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
                if (inf_a.role_id != inf_b.role_id) {
                    if (inf_a.role_id > inf_b.role_id) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                return 0;
            });
            this.m_entities.source = source;
        };
        RoleSelectView.prototype.initEmpty = function () {
            this.compEmpty.visible = this.m_entities.length <= 0;
            if (this.compEmpty.visible) {
                this.compEmpty.text = "没有可选择的斗士";
                this.compEmpty.playAni();
            }
        };
        RoleSelectView.prototype.onOperate = function (role_id) {
            if (this.m_callback) {
                this.m_callback.call(this.m_callback_this, role_id, this.m_callback_args);
            }
            this.close();
        };
        RoleSelectView.prototype.onClick_btnClose = function () {
            this.close();
        };
        return RoleSelectView;
    }(PopupUI));
    ui.RoleSelectView = RoleSelectView;
    __reflect(RoleSelectView.prototype, "ui.RoleSelectView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleSelectView.js.map