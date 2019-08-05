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
    var DmgRewardPanelItemView = (function (_super) {
        __extends(DmgRewardPanelItemView, _super);
        function DmgRewardPanelItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ArenaRewardPanelRankItemSkin";
            _this.listItems.touchEnabled = true;
            _this.listItems.itemRenderer = ui.CommonItemRenderer;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        DmgRewardPanelItemView.prototype.onAddToStage = function (e) {
            this.listItems.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
            this.btnReq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReq, this);
        };
        DmgRewardPanelItemView.prototype.onRemoveFromStage = function (e) {
            this.listItems.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
            this.btnReq.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReq, this);
        };
        DmgRewardPanelItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var reward_id = this.data.reward_id;
            var reward_info = Template.damageReward.get(reward_id);
            if (!reward_info) {
                egret.error("no damage reward, id: " + reward_id);
                return;
            }
            this.labTitle.text = UtilsGame.stringHander(Template.getGUIText("ui_damage14"), reward_info.Damage);
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
            if (reward_info.Money > 0) {
                ds_list_reward.push({
                    item_id: -2,
                    count: reward_info.Money
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
        DmgRewardPanelItemView.prototype.onClick_listItems = function (e) {
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
        DmgRewardPanelItemView.prototype.onClick_btnReq = function () {
            if (!this.btnReq.active) {
                Singleton.Get(DialogControler).showString("未达成领取条件");
                return;
            }
            UtilsEffect.buttonEffect(this.btnReq);
            Singleton.Get(DmgManager).reqReward(this.data.reward_id, function () {
                Singleton.Get(LayerManager).getView(ui.DmgRewardPanelView).refresh();
                Singleton.Get(LayerManager).getView(ui.DmgView).refreshNew();
            }, this);
        };
        return DmgRewardPanelItemView;
    }(eui.ItemRenderer));
    ui.DmgRewardPanelItemView = DmgRewardPanelItemView;
    __reflect(DmgRewardPanelItemView.prototype, "ui.DmgRewardPanelItemView");
})(ui || (ui = {}));
//# sourceMappingURL=DmgRewardPanelItemView.js.map