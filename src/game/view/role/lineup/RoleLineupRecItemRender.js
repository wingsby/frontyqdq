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
    var RoleLineupRecItemRender = (function (_super) {
        __extends(RoleLineupRecItemRender, _super);
        function RoleLineupRecItemRender() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleLineupRecItemRenderSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            _this.m_entries_roles = new eui.ArrayCollection();
            _this.dgRoles.dataProvider = _this.m_entries_roles;
            _this.dgRoles.itemRenderer = ui.RoleLineupRecRoleItemView;
            _this.m_entries_items = new eui.ArrayCollection();
            _this.dgItems.dataProvider = _this.m_entries_items;
            _this.dgItems.itemRenderer = ui.RoleLineupRecItemItemView;
            return _this;
        }
        RoleLineupRecItemRender.prototype.onAddToStage = function () {
            this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
        };
        RoleLineupRecItemRender.prototype.onRemoveFromStage = function () {
            this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.m_entries_roles.removeAll();
            this.m_entries_items.removeAll();
        };
        RoleLineupRecItemRender.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.initView(this.data.lup_id);
            this.playAni(this.data.id);
        };
        RoleLineupRecItemRender.prototype.initView = function (id) {
            var cfg_lup = Template.lineup.get(id);
            if (!cfg_lup) {
                return;
            }
            var info = Singleton.Get(RoleLineupRecManager).getRecInfo();
            // 基本信息
            this.labTitle.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText(cfg_lup.Txt));
            this.labReward.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText("ui_zhenrong2"));
            // 角色信息
            this.m_entries_roles.source = cfg_lup.LineupRole;
            // 道具信息
            this.setItems(cfg_lup);
            // 领取按钮状态
            if (info.checkRewardReceived(id)) {
                this.btnReward.visible = false;
                this.imgRec.visible = true;
            }
            else {
                this.btnReward.visible = true;
                this.imgRec.visible = false;
                if (info.checkRewardAvailable(id)) {
                    this.btnReward.text = "领取"; // TODO 读取文字表
                    this.btnReward.active = true;
                }
                else {
                    this.btnReward.text = "未达成"; // TODO 读取文字表
                    this.btnReward.active = false;
                }
            }
        };
        RoleLineupRecItemRender.prototype.setItems = function (cfg_lup) {
            var items = [];
            // 金币
            if (cfg_lup.Money > 0) {
                items.push({
                    item_id: -1,
                    count: cfg_lup.Money,
                });
            }
            // 钻石
            if (cfg_lup.Diamonds > 0) {
                items.push({
                    item_id: -2,
                    count: cfg_lup.Diamonds,
                });
            }
            if (cfg_lup.ItemId && cfg_lup.ItemId.length > 0 && cfg_lup.ItemId[0] > 0) {
                for (var i = 0; i < cfg_lup.ItemId.length; i++) {
                    items.push({
                        item_id: cfg_lup.ItemId[i],
                        count: cfg_lup.ItemNum[i]
                    });
                }
            }
            // 重新生成id
            for (var i = 0; i < items.length; i++) {
                items[i].id = i;
            }
            this.m_entries_items.source = items;
        };
        RoleLineupRecItemRender.prototype.playAni = function (id) {
        };
        RoleLineupRecItemRender.prototype.onClick_btnReward = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnReward, function () {
                var lup_id = _this.data.lup_id;
                var info = Singleton.Get(RoleLineupRecManager).getRecInfo();
                if (info.checkRewardReceived(lup_id)) {
                    return;
                }
                if (!info.checkRewardAvailable(lup_id)) {
                    // TODO 未满足条件时提示
                    return;
                }
                Singleton.Get(RoleLineupRecManager).reqReward(_this.data.lup_id, function () {
                    Singleton.Get(LayerManager).getView(ui.RoleLineupRecView).refresh();
                }, _this);
            }, this);
        };
        return RoleLineupRecItemRender;
    }(eui.ItemRenderer));
    ui.RoleLineupRecItemRender = RoleLineupRecItemRender;
    __reflect(RoleLineupRecItemRender.prototype, "ui.RoleLineupRecItemRender");
})(ui || (ui = {}));
//# sourceMappingURL=RoleLineupRecItemRender.js.map