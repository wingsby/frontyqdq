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
    var DailyTaskRewardItemView = (function (_super) {
        __extends(DailyTaskRewardItemView, _super);
        /**
         * @constructor
         */
        function DailyTaskRewardItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.DailyTaskRewardItemSkin";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
            return _this;
        }
        /**
         * 响应数据变更
         * data {item_id: number, item_count: number}
         */
        DailyTaskRewardItemView.prototype.dataChanged = function () {
            if (this.data == null) {
                return;
            }
            this.setItem(this.data.item_id, this.data.item_count);
        };
        /**
         * 设置物品信息
         * item_id为-1时，代表钻石
         * item_id为-2时，代表金币
         * @param item_id
         * @param item_count
         */
        DailyTaskRewardItemView.prototype.setItem = function (item_id, item_count) {
            this.labName.visible = false;
            if (item_id == -1) {
                ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.diamond.resPNG);
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(5));
                this.labName.textColor = Common.getItemNameColor(5);
                this.labName.text = DEFINE.UI_ALERT_INFO.diamond.name;
            }
            else if (item_id == -2) {
                ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.gold.resPNG);
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(5));
                this.labName.textColor = Common.getItemNameColor(5);
                this.labName.text = DEFINE.UI_ALERT_INFO.gold.name;
            }
            else {
                var item_info = Template.item.get(item_id);
                if (item_info == null) {
                    egret.error("Can't get item entity, item id: " + item_id);
                    return;
                }
                ResManager.AsyncSetTexture(this.imgIcon, item_info.iIcon);
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(item_info.iStar));
                this.labName.text = Template.getGUIText(item_info.iName);
                this.labName.textColor = Common.getItemNameColor(item_info.iStar);
            }
            this.labCount.text = "x" + item_count;
        };
        DailyTaskRewardItemView.prototype.onClick = function (e) {
            if (this.data.item_id <= 0) {
                return;
            }
            Singleton.Get(ui.BagDropPanelView).openMaterial(this.data.item_id);
        };
        return DailyTaskRewardItemView;
    }(eui.ItemRenderer));
    ui.DailyTaskRewardItemView = DailyTaskRewardItemView;
    __reflect(DailyTaskRewardItemView.prototype, "ui.DailyTaskRewardItemView");
})(ui || (ui = {}));
//# sourceMappingURL=DailyTaskRewardItemView.js.map