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
    var RoleAvatarView = (function (_super) {
        __extends(RoleAvatarView, _super);
        /**
         * 构造函数
         */
        function RoleAvatarView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleAvatarSkin";
            return _this;
        }
        /**
         * 响应创建子对象
         */
        RoleAvatarView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        Object.defineProperty(RoleAvatarView.prototype, "role_head", {
            set: function (value) {
                // this.imgIcon.source = value;
                ResManager.AsyncSetTexture(this.imgIcon, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleAvatarView.prototype, "role_tier", {
            set: function (value) {
                if (value < 0) {
                    this.imgTierBg.visible = false;
                    this.imgTierSub.visible = false;
                }
                else {
                    this.imgTierBg.visible = true;
                    this.imgTierSub.visible = true;
                }
                ResManager.AsyncSetTexture(this.imgTierBg, Common.getRoleTierBgResEx(value));
                // this.imgTierBg.source = Common.getRoleTierBgRes(value);
                ResManager.AsyncSetTexture(this.imgTierSub, Common.getRoleTierSubResEx(value));
                // this.imgTierSub.source = Common.getRoleTierSubRes(value);
            },
            enumerable: true,
            configurable: true
        });
        RoleAvatarView.prototype.setTama = function (count, active) {
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(count, active));
        };
        Object.defineProperty(RoleAvatarView.prototype, "role_lv", {
            set: function (value) {
                this.labLv.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleAvatarView.prototype, "is_new", {
            set: function (value) {
                this.imgNew.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleAvatarView.prototype, "is_lineup", {
            set: function (value) {
                this.groupLineup.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleAvatarView.prototype, "is_bond", {
            set: function (value) {
                this.groupBond.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleAvatarView.prototype, "is_select", {
            set: function (value) {
                this.imgSelect.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleAvatarView.prototype, "is_not_lineup", {
            set: function (value) {
                this.groupNotLineup.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        RoleAvatarView.prototype.deactive_tip = function () {
            this.is_lineup = false;
            this.is_bond = false;
            this.is_new = false;
        };
        return RoleAvatarView;
    }(eui.Component));
    ui.RoleAvatarView = RoleAvatarView;
    __reflect(RoleAvatarView.prototype, "ui.RoleAvatarView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleAvatarView.js.map