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
    var BagGiftUseNormalView = (function (_super) {
        __extends(BagGiftUseNormalView, _super);
        function BagGiftUseNormalView() {
            var _this = _super.call(this, "yw.BagGiftUseNormalSkin") || this;
            _this.m_item_id = 0;
            _this.m_count = 0;
            return _this;
        }
        BagGiftUseNormalView.prototype.open = function (item_id) {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.m_item_id = item_id;
            this.setSelCount(1); // 默认选中一个
            this.refresh();
        };
        BagGiftUseNormalView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.m_item_id = 0;
            this.setSelCount(0);
        };
        BagGiftUseNormalView.prototype.refresh = function () {
            this.initView();
            this.initCount();
        };
        BagGiftUseNormalView.prototype.componentCreated = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
            this.btnSelAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSelAdd, this);
            this.btnSelMinus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSelMinus, this);
            this.btnSelMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSelMax, this);
            this.btnSelMin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSelMin, this);
        };
        BagGiftUseNormalView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
            this.btnSelAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSelAdd, this);
            this.btnSelMinus.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSelMinus, this);
            this.btnSelMax.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSelMax, this);
            this.btnSelMin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSelMin, this);
        };
        BagGiftUseNormalView.prototype.onUpdate = function (time) {
        };
        BagGiftUseNormalView.prototype.initView = function () {
            var item_id = this.m_item_id;
            var cfg_item = Template.item.get(item_id);
            if (!cfg_item) {
                console.error("no item: " + item_id);
                return;
            }
            if (cfg_item.iType == ItemType.SimpleGift) {
                if (!cfg_item.BonusItem || cfg_item.BonusItem.length <= 0 || cfg_item.BonusItem[0] == 0 || cfg_item.BonusItem.length != cfg_item.BonusCounts.length) {
                    Singleton.Get(DialogControler).showInfo(1199);
                    return;
                }
            }
            var my_count = Singleton.Get(BagManager).getItemCount(item_id);
            ResManager.AsyncSetTexture(this.imgIcon, cfg_item.iIcon);
            ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(cfg_item.iStar));
            this.imgFrag.visible = cfg_item.Synthesis > 0;
            this.labName.text = Template.getGUIText(cfg_item.iName);
            this.labDes.text = Template.getGUIText(cfg_item.itemTxt);
            this.labCount.visible = false;
            this.labCount.text = UtilsGame.numberToString(my_count);
            this.labMyCount.text = "拥有数量：" + UtilsGame.numberToString(my_count);
        };
        // region 数量操作
        BagGiftUseNormalView.prototype.onClick_btnSelAdd = function () {
            UtilsEffect.buttonEffect(this.btnSelAdd);
            var item_id = this.m_item_id;
            var my_count = Singleton.Get(BagManager).getItemCount(item_id);
            if (this.m_count >= my_count) {
                this.setSelCount(my_count);
                return;
            }
            this.setSelCount(this.m_count + 1);
        };
        BagGiftUseNormalView.prototype.onClick_btnSelMinus = function () {
            UtilsEffect.buttonEffect(this.btnSelMinus);
            if (this.m_count <= 1) {
                this.setSelCount(1);
                return;
            }
            this.setSelCount(this.m_count - 1);
        };
        BagGiftUseNormalView.prototype.onClick_btnSelMax = function () {
            UtilsEffect.buttonEffect(this.btnSelMax);
            var item_id = this.m_item_id;
            var my_count = Singleton.Get(BagManager).getItemCount(item_id);
            this.setSelCount(my_count);
        };
        BagGiftUseNormalView.prototype.onClick_btnSelMin = function () {
            UtilsEffect.buttonEffect(this.btnSelMin);
            this.setSelCount(1);
        };
        BagGiftUseNormalView.prototype.setSelCount = function (count) {
            this.m_count = count;
            this.initCount();
        };
        BagGiftUseNormalView.prototype.initCount = function () {
            this.labSelCount.text = UtilsGame.numberToString(this.m_count);
        };
        // endregion
        // region 数据操作
        BagGiftUseNormalView.prototype.onClick_btnClose = function () {
            this.close();
        };
        BagGiftUseNormalView.prototype.onClick_btnConfirm = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnConfirm, function () {
                var cfg_it = Template.item.get(_this.m_item_id);
                if (cfg_it.iType == ItemType.RandomGift) {
                    Singleton.Get(BagOperManager).reqUseGiftRandom(_this.m_item_id, _this.m_count, function () {
                        Singleton.Get(LayerManager).getView(ui.BagBaseView).refresh();
                        _this.close();
                    }, _this);
                }
                else {
                    Singleton.Get(BagOperManager).reqUseGiftNormal(_this.m_item_id, _this.m_count, function () {
                        Singleton.Get(LayerManager).getView(ui.BagBaseView).refresh();
                        _this.close();
                    }, _this);
                }
            }, this);
        };
        return BagGiftUseNormalView;
    }(PopupUI));
    ui.BagGiftUseNormalView = BagGiftUseNormalView;
    __reflect(BagGiftUseNormalView.prototype, "ui.BagGiftUseNormalView");
})(ui || (ui = {}));
//# sourceMappingURL=BagGiftUseNormalView.js.map