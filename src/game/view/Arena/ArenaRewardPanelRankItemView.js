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
    var ArenaRewardPanelRankItemView = (function (_super) {
        __extends(ArenaRewardPanelRankItemView, _super);
        function ArenaRewardPanelRankItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ArenaRewardPanelRankItemSkin";
            _this.listItems.touchEnabled = true;
            _this.listItems.itemRenderer = ui.CommonItemRenderer;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        ArenaRewardPanelRankItemView.prototype.onAddToStage = function (e) {
            this.listItems.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
            this.btnReq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReq, this);
        };
        ArenaRewardPanelRankItemView.prototype.onRemoveFromStage = function (e) {
            this.listItems.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
            this.btnReq.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReq, this);
        };
        ArenaRewardPanelRankItemView.prototype.dataChanged = function () {
            if (this.data == null) {
                return;
            }
            var rank_reward_id = this.data.rank_reward_id;
            var rank_reward_info = Template.rankaward.get(rank_reward_id);
            if (rank_reward_info == null) {
                egret.error("no rankAwardId: " + rank_reward_id);
                return;
            }
            this.labTitle.text = "排名 " + rank_reward_info.ID;
            // 控制按鈕狀態
            if (this.data.is_aquired) {
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
            // 如果隐藏按钮 则不显示按钮
            if (this.data.hide_btns) {
                this.btnReq.visible = false;
                this.groupBtnHide.visible = false;
            }
            // 生成獎勵物品信息
            var ds_list_reward = [];
            this.listItems.dataProvider = new eui.ArrayCollection(ds_list_reward);
            if (rank_reward_info.Type > 0) {
                ds_list_reward.push({
                    item_id: -1,
                    count: rank_reward_info.Type // 虽然不知道为什么，但是Type字段的意义是钻石数量
                });
            }
            for (var i = 0; i < rank_reward_info.ItemId.length; i++) {
                ds_list_reward.push({
                    item_id: rank_reward_info.ItemId[i],
                    count: rank_reward_info.ItemNum[i]
                });
            }
        };
        /**
         * 响应点击物品列表
         * @param e
         */
        ArenaRewardPanelRankItemView.prototype.onClick_listItems = function (e) {
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
        ArenaRewardPanelRankItemView.prototype.onClick_btnReq = function () {
            UtilsEffect.buttonEffect(this.btnReq);
            if (!this.btnReq.active) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_91"));
                return;
            }
            Singleton.Get(ArenaManager).onHandleRankReward(this.data.rank_reward_id);
        };
        return ArenaRewardPanelRankItemView;
    }(eui.ItemRenderer));
    ui.ArenaRewardPanelRankItemView = ArenaRewardPanelRankItemView;
    __reflect(ArenaRewardPanelRankItemView.prototype, "ui.ArenaRewardPanelRankItemView");
})(ui || (ui = {}));
//# sourceMappingURL=ArenaRewardPanelRankItemView.js.map