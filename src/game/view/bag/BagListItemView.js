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
    var BagListItemView = (function (_super) {
        __extends(BagListItemView, _super);
        /**
         * 构造函数
         */
        function BagListItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.BagListItemSkin";
            _this.imgNew.visible = false;
            return _this;
        }
        /**
         * 响应创建子对象
         */
        BagListItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 响应数据变化
         */
        BagListItemView.prototype.dataChanged = function () {
            // 获取data
            if (!this.data) {
                egret.error("cant initBagListItemView, data is null.");
                return;
            }
            var item_id = this.data.item_id;
            var item_info = Template.item.get(item_id);
            if (!item_info) {
                console.log("no itemId: " + item_id);
                return;
            }
            // this.imgTier.source = Common.getItemTierBgRes(item_info.iStar);
            // this.imgIcon.source = item_info.iIcon;
            ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(item_info.iStar));
            ResManager.AsyncSetTexture(this.imgIcon, item_info.iIcon);
            this.imgFrag.visible = (item_info.iType == ItemType.EquipFragment || item_info.iType == ItemType.RoleFragment);
            this.labName.text = Template.getGUIText(item_info.iName);
            if (item_info.iType != ItemType.Equip) {
                this.labCount.text = "x" + UtilsGame.numberToString(Singleton.Get(BagManager).getItemCount(item_id));
            }
            else {
                this.labCount.text = "";
            }
            if (this.data.active != undefined) {
                this.imgInactive.visible = !this.data.active;
            }
            if (this.data.ani_idx >= 0) {
                if (Singleton.Get(LayerManager).getView(ui.BagBaseView).allow_ani) {
                    this.playInitAni(this.data.ani_idx);
                }
            }
            // 礼包、装备碎片红点
            switch (item_info.iType) {
                case ItemType.EquipFragment:
                    var need = item_info.Synthesis;
                    this.imgNew.visible = (Singleton.Get(BagManager).getItemCount(item_id) >= need);
                    break;
                case ItemType.Gift:
                case ItemType.SimpleGift:
                case ItemType.RandomGift:
                    this.imgNew.visible = true;
                    break;
                default:
                    this.imgNew.visible = false;
                    break;
            }
        };
        BagListItemView.prototype.playInitAni = function (offset) {
            /**
            this.groupRoot.alpha = 0;
            this.groupRoot.y = 70;
            // this.groupRoot.scaleX = 1.8;
            this.groupRoot.scaleY = 1.4;
            const tw: egret.Tween = egret.Tween.get(this.groupRoot);
            tw.wait(20 * (1 + offset)).to({alpha: 1, y: 0, scaleY: 1}, 100, egret.Ease.sineOut);
            */
            /**
            this.groupRoot.alpha = 0;
            this.groupRoot.scaleY = 1.6;
            const tw: egret.Tween = egret.Tween.get(this.groupRoot);
            tw.wait((offset + 1) * 22).to({alpha: 1, scaleY: 1}, 70, egret.Ease.sineIn);
             */
        };
        return BagListItemView;
    }(eui.ItemRenderer));
    ui.BagListItemView = BagListItemView;
    __reflect(BagListItemView.prototype, "ui.BagListItemView");
})(ui || (ui = {}));
//# sourceMappingURL=BagListItemView.js.map