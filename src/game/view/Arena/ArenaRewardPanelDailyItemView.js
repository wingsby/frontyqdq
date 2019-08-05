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
    var ArenaRewardPanelDailyItemView = (function (_super) {
        __extends(ArenaRewardPanelDailyItemView, _super);
        function ArenaRewardPanelDailyItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ArenaRewardPanelDailyItemSkin";
            return _this;
        }
        /**
         * 数据变化
         */
        ArenaRewardPanelDailyItemView.prototype.dataChanged = function () {
            if (this.data == null) {
                return;
            }
            if (this.reward_items == null) {
                this.reward_items = [];
            }
            if (this.reward_items.length > 0) {
                for (var i = 0; i < this.reward_items.length; i++) {
                    this.groupItems.removeChild(this.reward_items[i]);
                }
                this.reward_items = [];
            }
            var arena_id = this.data.arena_id;
            var arena_info = Template.arena.get(arena_id);
            if (arena_info == null) {
                egret.error("no arena: " + arena_id);
                return;
            }
            // 生成标题
            if (arena_info.ArenaNum[1] < 0) {
                this.labTitle.text = arena_info.ArenaNum[0] + " 名以后";
            }
            else {
                if (arena_info.ArenaNum[0] == arena_info.ArenaNum[1]) {
                    this.labTitle.text = "排名 " + arena_info.ArenaNum[0];
                }
                else {
                    this.labTitle.text = "排名 " + arena_info.ArenaNum[0] + "-" + arena_info.ArenaNum[1];
                }
            }
            var reward_item_diamond = new ui.ArenaRewardItemView();
            reward_item_diamond.setInfo(DEFINE.UI_ALERT_INFO.diamond.res, arena_info.RankDiamonds);
            this.groupItems.addChild(reward_item_diamond);
            this.reward_items.push(reward_item_diamond);
            var reward_item_point = new ui.ArenaRewardItemView();
            var point_item = Template.item.get(SpecialItem.ArenaPoint);
            reward_item_point.setInfo(point_item.iIcon, arena_info.RankPoints);
            this.groupItems.addChild(reward_item_point);
            this.reward_items.push(reward_item_point);
        };
        return ArenaRewardPanelDailyItemView;
    }(eui.ItemRenderer));
    ui.ArenaRewardPanelDailyItemView = ArenaRewardPanelDailyItemView;
    __reflect(ArenaRewardPanelDailyItemView.prototype, "ui.ArenaRewardPanelDailyItemView");
})(ui || (ui = {}));
//# sourceMappingURL=ArenaRewardPanelDailyItemView.js.map