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
    var DuelSelectHeroView = (function (_super) {
        __extends(DuelSelectHeroView, _super);
        /**
         * @constructor
         */
        function DuelSelectHeroView() {
            var _this = _super.call(this, "yw.DuelSelectHeroSkin") || this;
            _this.labTitle.text = "选择主将";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_btnClose, _this);
            _this.listHeros.itemRenderer = ui.DuelSelectHeroItemView;
            _this.hero_arr = new eui.ArrayCollection();
            _this.listHeros.dataProvider = _this.hero_arr;
            return _this;
        }
        DuelSelectHeroView.prototype.componentCreated = function () {
        };
        DuelSelectHeroView.prototype.onDestroy = function () {
            //this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        DuelSelectHeroView.prototype.onUpdate = function (time) {
        };
        DuelSelectHeroView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
        };
        DuelSelectHeroView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.removePopup(this);
            this.onDestroy();
        };
        /**
         * 初始化数据视图
         * @param team_id
         * @param pos
         */
        DuelSelectHeroView.prototype.initView = function (team_id, pos) {
            var arr = [];
            var hide_hero = Singleton.Get(DuelManager).getDuels().getTeamRole(team_id, pos);
            var inf_roles = Singleton.Get(RoleManager).getRolesInfo();
            var roles = inf_roles.roles;
            for (var i = 0; i < roles.length; i++) {
                if (roles[i].role_id == hide_hero) {
                    continue;
                }
                arr.push({
                    role_id: roles[i].role_id,
                    team_id: team_id,
                    pos: pos
                });
            }
            arr.sort(function (a, b) {
                var inf_r_a = inf_roles.GetRole(a.role_id);
                var inf_r_b = inf_roles.GetRole(b.role_id);
                if (inf_r_a && inf_r_b) {
                    if (inf_r_a.fighting != inf_r_b.fighting) {
                        if (inf_r_a.fighting > inf_r_b.fighting) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                }
                return 0;
            });
            this.hero_arr.source = arr;
            this.hero_arr.refresh();
            //this.scroller.viewport.scrollH = 0;
            //this.scroller.validateNow();
        };
        /**
         * 响应点击关闭按钮
         * @param e
         */
        DuelSelectHeroView.prototype.onClick_btnClose = function (e) {
            this.close();
        };
        return DuelSelectHeroView;
    }(PopupUI));
    ui.DuelSelectHeroView = DuelSelectHeroView;
    __reflect(DuelSelectHeroView.prototype, "ui.DuelSelectHeroView");
})(ui || (ui = {}));
//# sourceMappingURL=DuelSelectHeroView.js.map