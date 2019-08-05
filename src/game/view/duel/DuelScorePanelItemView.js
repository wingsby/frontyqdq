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
    var DuelScorePanelItemView = (function (_super) {
        __extends(DuelScorePanelItemView, _super);
        function DuelScorePanelItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ArenaRewardPanelRankItemSkin";
            _this.listItems.touchEnabled = true;
            _this.listItems.itemRenderer = ui.CommonItemRenderer;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        DuelScorePanelItemView.prototype.onAddToStage = function (e) {
            this.listItems.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
            this.btnReq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReq, this);
        };
        DuelScorePanelItemView.prototype.onRemoveFromStage = function (e) {
            this.listItems.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
            this.btnReq.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReq, this);
        };
        DuelScorePanelItemView.prototype.dataChanged = function () {
            if (this.data == null) {
                return;
            }
            var score_reward_id = this.data.score_reward_id;
            var score_reward_info = Template.maward.get(score_reward_id);
            if (score_reward_info == null) {
                egret.error("no rankAwardId: " + score_reward_id);
                return;
            }
            this.labTitle.text = "累计功勋 " + score_reward_info.ID;
            // 控制按钮状态
            if (this.data.is_received) {
                this.groupBtnHide.visible = true;
                this.btnReq.visible = false;
            }
            else {
                this.groupBtnHide.visible = false;
                this.btnReq.visible = true;
                if (this.data.is_available) {
                    this.btnReq.text = Template.getGUIText("ui_arena6");
                    this.btnReq.active = true;
                }
                else {
                    this.btnReq.text = Template.getGUIText("ui_arena7");
                    this.btnReq.active = false;
                }
            }
            // 生成奖励物品信息
            var ds_list_reward = [];
            this.listItems.dataProvider = new eui.ArrayCollection(ds_list_reward);
            if (score_reward_info.Jewel > 0) {
                ds_list_reward.push({
                    item_id: -1,
                    count: score_reward_info.Jewel
                });
            }
            if (score_reward_info.Gold > 0) {
                ds_list_reward.push({
                    item_id: -2,
                    count: score_reward_info.Gold // 虽然不知道为什么，但是Type字段的意义是钻石数量
                });
            }
            for (var i = 0; i < score_reward_info.Item.length; i++) {
                if (score_reward_info.Item[i] <= 0) {
                    continue;
                }
                ds_list_reward.push({
                    item_id: score_reward_info.Item[i],
                    count: score_reward_info.ItemN[i]
                });
            }
        };
        /**
         * 响应点击物品列表
         * @param e
         */
        DuelScorePanelItemView.prototype.onClick_listItems = function (e) {
            if (e.item == null) {
                return;
            }
            if (e.item.item_id < 0) {
                return;
            }
            Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(e.item.item_id);
        };
        /**
         * 響應點擊獲取按鈕
         */
        DuelScorePanelItemView.prototype.onClick_btnReq = function () {
            if (!this.btnReq.active) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_121"));
            }
            UtilsEffect.buttonEffect(this.btnReq);
            Singleton.Get(DuelManager).reqScoreReward(this.data.score_reward_id, function () {
                Singleton.Get(LayerManager).getView(ui.DuelScorePanelView).refresh();
            }, this);
        };
        return DuelScorePanelItemView;
    }(eui.ItemRenderer));
    ui.DuelScorePanelItemView = DuelScorePanelItemView;
    __reflect(DuelScorePanelItemView.prototype, "ui.DuelScorePanelItemView");
})(ui || (ui = {}));
//# sourceMappingURL=DuelScorePanelItemView.js.map