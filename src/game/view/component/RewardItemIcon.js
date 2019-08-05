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
    /**
     * 通用道具奖励获取弹框图标
     */
    var RewardItemIcon = (function (_super) {
        __extends(RewardItemIcon, _super);
        /**
         * 构造函数
         */
        function RewardItemIcon() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.comp.ItemIconSkin_Reward";
            return _this;
        }
        /**
         * 响应子对象创建完成
         */
        RewardItemIcon.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        RewardItemIcon.prototype.dataChanged = function () {
            var _this = this;
            if (this.data == undefined || this.data.item_id == undefined) {
                return;
            }
            if (this.data.item_id == 0) {
                this.setSpecial();
            }
            else {
                this.setItem(this.data.item_id, this.data.item_count);
            }
            if (this.data.idx > 0) {
                var duration = (120 * this.data.idx - 1);
                this.alpha = 0;
                var tw = egret.Tween.get(this);
                tw.wait(duration).to({ alpha: 1 }, 150, egret.Ease.sineIn).call(function () {
                    egret.Tween.removeTweens(_this);
                });
            }
        };
        /**
         * 设定道具图标
         * @param itemId 道具Id
         * @param count 道具数量
         */
        RewardItemIcon.prototype.setItem = function (itemId, itemcount) {
            // 获取Item信息
            var it = Template.item.get(itemId);
            // item判空
            if (!it) {
                egret.error(UtilsGame.stringHander("no itemId: $1", itemId));
                return;
            }
            this.labName.text = Template.getGUIText(it.iName);
            this.labDisplay.text = "x" + UtilsGame.numberToString(itemcount);
            ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(it.iStar));
            ResManager.AsyncSetTexture(this.imgIcon, it.iIcon);
            this.imgFrag.visible = Common.isItemFrag(it.iType);
        };
        /**
         * 设定特殊道具图标
         */
        RewardItemIcon.prototype.setSpecial = function () {
            this.labName.text = this.data.item_name;
            this.labDisplay.text = "x" + UtilsGame.numberToString(this.data.item_count);
            ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(5));
            ResManager.AsyncSetTexture(this.imgIcon, this.data.icon);
            this.imgFrag.visible = false;
        };
        return RewardItemIcon;
    }(eui.ItemRenderer));
    ui.RewardItemIcon = RewardItemIcon;
    __reflect(RewardItemIcon.prototype, "ui.RewardItemIcon");
})(ui || (ui = {}));
//# sourceMappingURL=RewardItemIcon.js.map