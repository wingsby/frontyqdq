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
    var ArenaResultAlertView = (function (_super) {
        __extends(ArenaResultAlertView, _super);
        function ArenaResultAlertView() {
            return _super.call(this, "yw.ArenaResultAlertSkin") || this;
        }
        ArenaResultAlertView.prototype.componentCreated = function () {
            this.labTip.text = Template.getGUIText("ui_reward_1");
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
            this.listReward.itemRenderer = ui.RewardItemIcon;
        };
        ArenaResultAlertView.prototype.onDestroy = function () {
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        ArenaResultAlertView.prototype.onUpdate = function (time) {
        };
        ArenaResultAlertView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
        };
        ArenaResultAlertView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        ArenaResultAlertView.prototype.initContent = function (success, rank_offset, items) {
            var my_rank = Singleton.Get(ArenaManager).getMyCurRank();
            var rank_text = "";
            if (success) {
                this.groupTitleWin.visible = true;
                this.groupTitleFail.visible = false;
                rank_text = UtilsGame.stringHander(Template.getGUIText("ui_arena13"), my_rank, rank_offset);
            }
            else {
                this.groupTitleWin.visible = false;
                this.groupTitleFail.visible = true;
                rank_text = UtilsGame.stringHander(Template.getGUIText("ui_arena14"), my_rank);
            }
            this.labRank.textFlow = (new egret.HtmlTextParser).parser(rank_text);
            // 道具
            var ds_list_rewards = [];
            this.listReward.dataProvider = new eui.ArrayCollection(ds_list_rewards);
            for (var i = 0; i < items.length; i++) {
                var item_info = Template.item.get(items[i].id);
                if (item_info != null) {
                    ds_list_rewards.push({
                        item_id: items[i].id,
                        item_count: items[i].count //items[key] + "_png",`
                    });
                }
            }
        };
        ArenaResultAlertView.prototype.onClick_btnHandler = function () {
            this.close();
        };
        return ArenaResultAlertView;
    }(PopupUI));
    ui.ArenaResultAlertView = ArenaResultAlertView;
    __reflect(ArenaResultAlertView.prototype, "ui.ArenaResultAlertView");
})(ui || (ui = {}));
//# sourceMappingURL=ArenaResultAlertView.js.map