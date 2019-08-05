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
    var RoleEquipPosView = (function (_super) {
        __extends(RoleEquipPosView, _super);
        function RoleEquipPosView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleEquipPosSkin";
            _this.reset();
            _this.activate(false);
            return _this;
        }
        Object.defineProperty(RoleEquipPosView.prototype, "isNew", {
            get: function () {
                return this.imgNew.visible;
            },
            set: function (value) {
                this.imgNew.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleEquipPosView.prototype, "item_id", {
            get: function () {
                return this.m_item_id;
            },
            set: function (value) {
                var item_info = Template.item.get(value);
                if (!item_info) {
                    this.groupIcon.visible = false;
                    this.groupStr.visible = false;
                    this.groupRefine.visible = false;
                    return;
                }
                this.m_item_id = item_info.ID;
                // this.imgIcon.source = item_info.iIcon;
                ResManager.AsyncSetTexture(this.imgIcon, item_info.iIcon);
                // this.imgTier.source = Common.getItemTierBgRes(item_info.iStar);
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(item_info.iStar));
                this.groupIcon.visible = true;
            },
            enumerable: true,
            configurable: true
        });
        RoleEquipPosView.prototype.setJewItemID = function (value, evo) {
            var cfg_jew = Template.jewelry.get(value);
            if (!cfg_jew) {
                this.groupIcon.visible = false;
                this.groupStr.visible = false;
                this.groupRefine.visible = false;
                return;
            }
            this.m_item_id = cfg_jew.ID;
            ResManager.AsyncSetTexture(this.imgIcon, cfg_jew.Icon[evo]);
            ResManager.AsyncSetTexture(this.imgTier, Common.getJewTierBgRes(evo));
            this.groupIcon.visible = true;
        };
        Object.defineProperty(RoleEquipPosView.prototype, "equip", {
            set: function (value) {
                this.item_id = value.equip_id;
                this.labStr.text = "Lv." + value.stg_lv.toString();
                this.labRefine.text = value.rfn_lv.toString();
                this.groupStr.visible = value.stg_lv > 0 && this.groupIcon.visible;
                this.groupRefine.visible = value.rfn_lv > 0 && this.groupIcon.visible;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleEquipPosView.prototype, "jewelry", {
            set: function (value) {
                this.setJewItemID(value.getJewId(), value.evo_lv);
                this.labStr.text = "Lv." + value.stg_lv.toString();
                this.labRefine.text = value.evo_lv.toString();
                this.groupStr.visible = value.stg_lv > 0 && this.groupIcon.visible;
                this.groupRefine.visible = false; // value.evo_lv > 0 && this.groupIcon.visible;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleEquipPosView.prototype, "pos", {
            get: function () {
                return this.m_pos;
            },
            set: function (value) {
                this.m_pos = value;
                ResManager.AsyncSetTexture(this.imgBg, Common.getEquipPosRes(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleEquipPosView.prototype, "iconVisible", {
            set: function (value) {
                this.groupIcon.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleEquipPosView.prototype, "strVisible", {
            set: function (value) {
                this.groupStr.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleEquipPosView.prototype, "refineVisible", {
            set: function (value) {
                this.groupRefine.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        RoleEquipPosView.prototype.reset = function (pos) {
            this.isNew = false;
            this.groupIcon.visible = false;
            this.groupStr.visible = false;
            this.groupRefine.visible = false;
            this.labStr.text = "Lv.0";
            this.labRefine.text = "0";
            if (pos > 0) {
                this.pos = pos;
            }
        };
        RoleEquipPosView.prototype.activate = function (is_active) {
            this.imgActive.visible = is_active;
        };
        return RoleEquipPosView;
    }(eui.Component));
    ui.RoleEquipPosView = RoleEquipPosView;
    __reflect(RoleEquipPosView.prototype, "ui.RoleEquipPosView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleEquipPosView.js.map