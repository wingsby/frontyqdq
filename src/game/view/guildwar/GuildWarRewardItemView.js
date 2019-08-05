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
    var GuildWarRewardItemView = (function (_super) {
        __extends(GuildWarRewardItemView, _super);
        function GuildWarRewardItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.GuildWarRewardItemSkin";
            _this.listItems.touchEnabled = true;
            _this.listItems.itemRenderer = ui.CommonItemRenderer;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        GuildWarRewardItemView.prototype.onAddToStage = function (e) {
            this.listItems.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
        };
        GuildWarRewardItemView.prototype.onRemoveFromStage = function (e) {
            this.listItems.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
        };
        GuildWarRewardItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            // 获取奖励配置
            var reward_id = this.data.reward_id;
            var cfg_reward = Template.warRank.get(reward_id);
            if (!cfg_reward) {
                console.error("no WarRankId: " + reward_id);
                return;
            }
            var cfg_reward_next = Template.warRank.get(reward_id + 1);
            var cfg_mail = Template.mail.get(cfg_reward.RankMail);
            if (!cfg_mail) {
                console.error("no mail id: " + cfg_reward.RankMail);
                return;
            }
            // 生成排名区间
            if (cfg_reward_next) {
                if (cfg_reward.ArenaNum[0] == cfg_reward.ArenaNum[1]) {
                    this.labTitle.text = "排名 " + cfg_reward.ArenaNum[0];
                }
                else {
                    this.labTitle.text = "排名 " + cfg_reward.ArenaNum[0] + "-" + cfg_reward.ArenaNum[1];
                }
            }
            else {
                this.labTitle.text = cfg_reward.ArenaNum[0] + " 名以后";
            }
            // 生成奖励物品信息
            var ds_list_reward = [];
            this.listItems.dataProvider = new eui.ArrayCollection(ds_list_reward);
            if (cfg_mail.mDiamond > 0) {
                ds_list_reward.push({
                    item_id: -1,
                    count: cfg_mail.mDiamond
                });
            }
            if (cfg_mail.mMoney > 0) {
                ds_list_reward.push({
                    item_id: -2,
                    count: cfg_mail.mMoney
                });
            }
            for (var i = 0; i < cfg_mail.mItem.length; i++) {
                if (cfg_mail.mItem[i] <= 0) {
                    continue;
                }
                ds_list_reward.push({
                    item_id: cfg_mail.mItem[i],
                    count: cfg_mail.mNum[i]
                });
            }
        };
        /**
         * 响应点击物品列表
         * @param e
         */
        GuildWarRewardItemView.prototype.onClick_listItems = function (e) {
            if (!e.item) {
                return;
            }
            if (e.item.item_id < 0) {
                return;
            }
            Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(e.item.item_id);
        };
        return GuildWarRewardItemView;
    }(eui.ItemRenderer));
    ui.GuildWarRewardItemView = GuildWarRewardItemView;
    __reflect(GuildWarRewardItemView.prototype, "ui.GuildWarRewardItemView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildWarRewardItemView.js.map