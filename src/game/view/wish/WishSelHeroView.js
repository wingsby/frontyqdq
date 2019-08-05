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
    var WishSelHeroView = (function (_super) {
        __extends(WishSelHeroView, _super);
        function WishSelHeroView() {
            var _this = _super.call(this, "yw.WishSelHeroSkin") || this;
            // region 引导
            _this.agent_reward_id = 0;
            return _this;
        }
        WishSelHeroView.prototype.componentCreated = function () {
            this.labTitle.text = Template.getGUIText("ui_wish17");
            this.labDes.text = Template.getGUIText("ui_wish18");
            this.m_entries = new eui.ArrayCollection();
            this.listHeros.dataProvider = this.m_entries;
            this.listHeros.itemRenderer = ui.WishSelHeroItemView;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        WishSelHeroView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        WishSelHeroView.prototype.onUpdate = function (time) {
        };
        WishSelHeroView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initView();
        };
        WishSelHeroView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.btnAgent.visible = false;
        };
        WishSelHeroView.prototype.refresh = function () {
            this.initView();
        };
        WishSelHeroView.prototype.initView = function () {
            var roles = Singleton.Get(RoleManager).getRolesInfo().roles;
            var result = [];
            for (var i = 0; i < roles.length; i++) {
                var cfg_role = Template.role.get(roles[i].role_id);
                if (!cfg_role) {
                    continue;
                }
                result.push({
                    role_id: cfg_role.ID,
                    star: cfg_role.Star
                });
            }
            result.sort(function (a, b) {
                if (a.star > b.star) {
                    return -1;
                }
                else if (a.star < b.star) {
                    return 1;
                }
                return 0;
            });
            this.m_entries.source = result;
            if (result.length > 0) {
                this.compEmpty.visible = false;
            }
            else {
                this.compEmpty.visible = true;
                this.compEmpty.playAni();
            }
        };
        WishSelHeroView.prototype.onClick_btnClose = function () {
            this.close();
        };
        WishSelHeroView.prototype.initAgent = function (idx) {
            this.initView();
            this.agent_reward_id = this.m_entries.source[idx - 1].role_id;
            this.btnAgent.visible = true;
            this.btnAgent.y = 150 + (98 + 4) * (idx - 1);
        };
        WishSelHeroView.prototype.onClick_btnAgent = function (e) {
            var cfg_role = Template.role.get(this.agent_reward_id);
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
            Singleton.Get(WishManager).reqSelRole(this.agent_reward_id, function () {
                Singleton.Get(LayerManager).getView(ui.WishSelHeroView).close();
                Singleton.Get(LayerManager).getView(ui.WishView).refresh();
                Singleton.Get(LayerManager).getView(ui.WishView).playCardAni();
            }, this);
        };
        return WishSelHeroView;
    }(PopupUI));
    ui.WishSelHeroView = WishSelHeroView;
    __reflect(WishSelHeroView.prototype, "ui.WishSelHeroView");
})(ui || (ui = {}));
//# sourceMappingURL=WishSelHeroView.js.map