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
    var WishSelHeroItemView = (function (_super) {
        __extends(WishSelHeroItemView, _super);
        function WishSelHeroItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.WishSelHeroItemSkin";
            _this.btnSelect.text = Template.getGUIText("ui_wish20");
            _this.labNotOpen.text = Template.getGUIText("ui_wish19");
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        WishSelHeroItemView.prototype.onAddToStage = function () {
            this.btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSelect, this);
        };
        WishSelHeroItemView.prototype.onRemoveFromStage = function () {
            this.btnSelect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSelect, this);
        };
        WishSelHeroItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.setRole(this.data.role_id);
        };
        WishSelHeroItemView.prototype.setRole = function (role_id) {
            var cfg_role = Template.role.get(role_id);
            if (!cfg_role) {
                return;
            }
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (!my_role) {
                return;
            }
            // 角色头像
            ResManager.AsyncSetTexture(this.imgTier, Common.getRoleTierBgResEx(cfg_role.Star));
            ResManager.AsyncSetTexture(this.imgTierSub, Common.getRoleTierSubResEx(cfg_role.Star));
            ResManager.AsyncSetTexture(this.imgIcon, cfg_role.Icon);
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(my_role.getAwakenStar(), my_role.getAwakenActiveStar()));
            this.labLv.text = my_role.lv.toString();
            // 角色属性
            this.labName.text = RoleUtil.GetFullRoleName(role_id);
            this.labName.textColor = RoleUtil.GetRoleNameColor(my_role.getTier());
            // 所需能量
            var my_stamina = Singleton.Get(WishManager).getInfo().stamina;
            if (my_stamina >= cfg_role.WishCost) {
                this.labCost.textColor = DEFINE_COLOR.TEXT_BLUE;
                this.labCost.textFlow = new egret.HtmlTextParser().parser(UtilsGame.stringHander(Template.getGUIText("ui_wish21"), cfg_role.WishCost));
            }
            else {
                this.labCost.textColor = DEFINE_COLOR.WARN_RED;
                this.labCost.textFlow = new egret.HtmlTextParser().parser(UtilsGame.stringHander(Template.getGUIText("ui_wish22"), cfg_role.WishCost));
            }
            // 是否开放许愿
            if (cfg_role.Wish) {
                this.labNotOpen.visible = false;
                this.btnSelect.visible = true;
            }
            else {
                this.labNotOpen.visible = true;
                this.btnSelect.visible = false;
            }
        };
        WishSelHeroItemView.prototype.onClick_btnSelect = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnSelect, function () {
                var cfg_role = Template.role.get(_this.data.role_id);
                if (!cfg_role) {
                    return;
                }
                // 判断是否有足够的能量
                var my_stamina = Singleton.Get(WishManager).getInfo().stamina;
                if (my_stamina < cfg_role.WishCost) {
                    Singleton.Get(DialogControler).showInfo(1189);
                    return;
                }
                // 请求 成功后关闭界面并刷新许愿界面
                Singleton.Get(WishManager).reqSelRole(_this.data.role_id, function () {
                    Singleton.Get(LayerManager).getView(ui.WishSelHeroView).close();
                    Singleton.Get(LayerManager).getView(ui.WishView).refresh();
                    Singleton.Get(LayerManager).getView(ui.WishView).playCardAni();
                }, _this);
            }, this);
        };
        return WishSelHeroItemView;
    }(eui.ItemRenderer));
    ui.WishSelHeroItemView = WishSelHeroItemView;
    __reflect(WishSelHeroItemView.prototype, "ui.WishSelHeroItemView");
})(ui || (ui = {}));
//# sourceMappingURL=WishSelHeroItemView.js.map