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
    var RoleCardView = (function (_super) {
        __extends(RoleCardView, _super);
        function RoleCardView() {
            var _this = _super.call(this) || this;
            _this.res_name = "";
            _this.border_name = "";
            _this.skinName = "yw.RoleCardSkin";
            return _this;
        }
        RoleCardView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        Object.defineProperty(RoleCardView.prototype, "role_res", {
            set: function (value) {
                var _this = this;
                this.imgRes.source = "kp_bm_png";
                ResManager.AsyncSetTexture(this.imgRes, "kp_bm_png", function () {
                    _this.res_name = value + "_png";
                    ResManager.getResAsync(_this.res_name, function (res, resName) {
                        if (resName == _this.res_name) {
                            _this.imgRes.texture = res;
                        }
                    }, _this);
                }, this, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleCardView.prototype, "role_tier", {
            set: function (value) {
                var _this = this;
                this.border_name = Common.getRoleTierCardBorderResEx(value);
                ResManager.getResAsync(this.border_name, function (res, resName) {
                    if (resName == _this.border_name) {
                        _this.imgBorder.texture = res;
                    }
                }, this);
                this.labName.textColor = RoleUtil.GetRoleNameColor(value);
                // this.imgBorder.source = Common.getRoleTierCardBorderRes(value) + "_png"; 
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleCardView.prototype, "role_name", {
            set: function (value) {
                this.labName.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleCardView.prototype, "role_lv", {
            set: function (value) {
                this.labLv.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleCardView.prototype, "role_fighting", {
            set: function (value) {
                this.labFighting.text = value;
                this.labFighting.validateNow();
                this.labTxtFighting.right = 28 + this.labFighting.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleCardView.prototype, "role_breach", {
            set: function (value) {
                this.labBreach.text = value;
            },
            enumerable: true,
            configurable: true
        });
        RoleCardView.prototype.setTama = function (count, active) {
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(count, active), undefined, undefined, true);
            // this.imgTama.x = Common.getRoleListTamaLeft(count);
        };
        Object.defineProperty(RoleCardView.prototype, "tama_visible", {
            set: function (value) {
                this.imgTama.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        return RoleCardView;
    }(eui.Component));
    ui.RoleCardView = RoleCardView;
    __reflect(RoleCardView.prototype, "ui.RoleCardView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleCardView.js.map