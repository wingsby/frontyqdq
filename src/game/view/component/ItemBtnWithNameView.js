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
    var ItemBtnWithNameView = (function (_super) {
        __extends(ItemBtnWithNameView, _super);
        function ItemBtnWithNameView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ItemBtnWithNameSkin";
            return _this;
        }
        ItemBtnWithNameView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.touchEnabled = false;
            this.no_effect_obj.touchEnabled = false;
            this.no_effect_obj.touchChildren = false;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        ItemBtnWithNameView.prototype.dataChanged = function () {
            var _this = this;
            this.eff_bottom.clearMovieClip();
            if (this.data.eff_name_bottom) {
                this.eff_bottom.setMovieClip(this.data.eff_name_bottom);
                this.eff_bottom.gotoAndPlay(this.data.eff_name_bottom, -1);
            }
            this.eff_top.clearMovieClip();
            if (this.data.eff_name_top) {
                if (this.data.eff_name_top == Common.getItemEffName(6)) {
                    this.eff_top.scaleX = 1.1;
                    this.eff_top.scaleY = 1.1;
                }
                else {
                    this.eff_top.scaleX = 1;
                    this.eff_top.scaleY = 1;
                }
                this.eff_top.setMovieClip(this.data.eff_name_top);
                this.eff_top.gotoAndPlay(this.data.eff_name_top, -1);
            }
            this.eff_play.clearMovieClip();
            egret.Tween.removeTweens(this.no_effect_obj);
            if (this.data.show_idx) {
                this.no_effect_obj.alpha = 0;
                var t = egret.Tween.get(this.no_effect_obj);
                t.wait(150 * this.data.show_idx)
                    .call(function () {
                    _this.eff_play.setMovieClip("ui_ten1");
                    _this.eff_play.gotoAndPlay("ui_ten1", 1);
                }, this)
                    .to({ alpha: 1 }, 150);
            }
            else {
                this.no_effect_obj.alpha = 1;
            }
            this.labType.visible = this.data.show_type_lab;
            if (this.data.type_lab) {
                this.labType.textFlow = new egret.HtmlTextParser().parser(this.data.type_lab);
            }
        };
        ItemBtnWithNameView.fillRole = function (role_id, data, is_rare, top_name, bottom_name, show_idx_input, show_type_lab) {
            var r_cfg = Template.role.get(role_id);
            if (!r_cfg) {
                console.log("fillRole NO ROLE " + role_id);
                return;
            }
            //var rare = is_rare ? DEFINE.RARE_CORNER : "";
            var rare = r_cfg.AwakenID >= 20 ? DEFINE.RARE_CORNER : "";
            var awaken_info = Template.awaken.get(r_cfg.AwakenID);
            var a = Common.getRoleTamaResEx(awaken_info.AwakenStar, 0);
            // var tier = 5;
            // if (r_cfg.AwakenID == 10)
            //	   tier = 4;
            if (r_cfg) {
                data.push({
                    tierBg: Common.getRoleTierBgResEx(r_cfg.Star),
                    icon: r_cfg.Icon,
                    rare_icon: rare,
                    count: "",
                    awaken_img: a,
                    name: Template.getGUIText(r_cfg.Name),
                    arg_id: r_cfg.ID,
                    arg_is_role: true,
                    frag_icon: "",
                    eff_name_top: r_cfg.Star >= 4 ? Common.getItemEffName(6) : top_name,
                    eff_name_bottom: bottom_name,
                    show_idx: show_idx_input,
                    type_lab: Template.getGUIText(r_cfg.Position),
                    show_type_lab: show_type_lab
                });
            }
        };
        ItemBtnWithNameView.fillItem = function (item_id, count, data, top_name, show_idx_input) {
            var r_cfg = Template.item.get(item_id);
            if (!r_cfg) {
                console.log("fillItem NO item " + item_id);
                return;
            }
            if (r_cfg) {
                data.push({
                    tierBg: Common.getItemTierBgRes(r_cfg.iStar),
                    icon: r_cfg.iIcon,
                    rare_icon: "",
                    count: "x" + count,
                    awaken_img: "",
                    name: Template.getGUIText(r_cfg.iName),
                    arg_id: r_cfg.ID,
                    arg_is_role: false,
                    frag_icon: (r_cfg.iType == ItemType.EquipFragment || r_cfg.iType == ItemType.RoleFragment) ? DEFINE.FRAG_ICON : "",
                    eff_name_top: top_name,
                    show_idx: show_idx_input
                });
            }
        };
        ItemBtnWithNameView.prototype.onAddToStage = function () {
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        ItemBtnWithNameView.prototype.onRemoveFromStage = function () {
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        ItemBtnWithNameView.prototype.onClick_btnHandler = function () {
            console.log("btnHandler onClick: " + this.data.arg_id);
            if (this.data.arg_is_role) {
                Singleton.Get(LayerManager).getView(ui.RoleDetailView).open(this.data.arg_id, true, true);
            }
        };
        return ItemBtnWithNameView;
    }(eui.ItemRenderer));
    ui.ItemBtnWithNameView = ItemBtnWithNameView;
    __reflect(ItemBtnWithNameView.prototype, "ui.ItemBtnWithNameView");
})(ui || (ui = {}));
//# sourceMappingURL=ItemBtnWithNameView.js.map