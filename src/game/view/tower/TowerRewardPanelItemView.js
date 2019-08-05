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
    var TowerRewardPanelItemView = (function (_super) {
        __extends(TowerRewardPanelItemView, _super);
        function TowerRewardPanelItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ArenaRewardPanelRankItemSkin";
            _this.listItems.touchEnabled = true;
            _this.listItems.itemRenderer = ui.CommonItemRenderer;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        TowerRewardPanelItemView.prototype.onAddToStage = function (e) {
            this.listItems.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
            this.btnReq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReq, this);
        };
        TowerRewardPanelItemView.prototype.onRemoveFromStage = function (e) {
            this.listItems.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
            this.btnReq.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReq, this);
        };
        TowerRewardPanelItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var reward_id = this.data.reward_id;
            var reward_info = Template.towerAward.get(reward_id);
            if (!reward_info) {
                egret.error("no towerAward: " + reward_id);
                return;
            }
            this.labTitle.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_tower_5"), reward_info.ID);
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
            if (reward_info.Diamonds > 0) {
                ds_list_reward.push({
                    item_id: -1,
                    count: reward_info.Diamonds
                });
            }
            for (var i = 0; i < reward_info.ItemId.length; i++) {
                if (reward_info.ItemId[i] <= 0) {
                    continue;
                }
                ds_list_reward.push({
                    item_id: reward_info.ItemId[i],
                    count: reward_info.ItemNum[i]
                });
            }
        };
        /**
         * 响应点击物品列表
         * @param e
         */
        TowerRewardPanelItemView.prototype.onClick_listItems = function (e) {
            if (!e.item) {
                return;
            }
            if (e.item.item_id < 0) {
                return;
            }
            Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(e.item.item_id);
        };
        /**
         * 响应点击获取按钮
         */
        TowerRewardPanelItemView.prototype.onClick_btnReq = function () {
            var _this = this;
            if (!this.btnReq.active) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_91")); // TODO 配到文字表
                return;
            }
            UtilsEffect.buttonEffect(this.btnReq, function () {
                Singleton.Get(TowerManager).reqReward(_this.data.reward_id, function () {
                    Singleton.Get(LayerManager).getView(ui.TowerRewardPanelView).refresh();
                }, _this);
            }, this);
        };
        return TowerRewardPanelItemView;
    }(eui.ItemRenderer));
    ui.TowerRewardPanelItemView = TowerRewardPanelItemView;
    __reflect(TowerRewardPanelItemView.prototype, "ui.TowerRewardPanelItemView");
})(ui || (ui = {}));
//# sourceMappingURL=TowerRewardPanelItemView.js.map