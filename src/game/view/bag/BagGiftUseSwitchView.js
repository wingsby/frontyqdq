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
    var BagGiftUseSwitchView = (function (_super) {
        __extends(BagGiftUseSwitchView, _super);
        function BagGiftUseSwitchView() {
            var _this = _super.call(this, "yw.BagGiftUseSwitchSkin") || this;
            _this.m_item_id = 0;
            _this.m_sel_id = 0;
            _this.m_ori_h = new Dictionary();
            return _this;
        }
        BagGiftUseSwitchView.prototype.componentCreated = function () {
            this.saveHeight(this.imgBg, "height");
            this.saveHeight(this.groupItems, "height");
            this.saveHeight(this.scrItems, "height");
            this.saveHeight(this.btnConfirm, "y");
            this.m_entries = new eui.ArrayCollection();
            this.dgItems.itemRenderer = ui.BagGiftUseSwitchItemRenderer;
            this.dgItems.dataProvider = this.m_entries;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
        };
        BagGiftUseSwitchView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
        };
        BagGiftUseSwitchView.prototype.onUpdate = function (time) {
        };
        BagGiftUseSwitchView.prototype.open = function (item_id) {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().addPopup(this);
            this.m_item_id = item_id;
            this.initView();
        };
        BagGiftUseSwitchView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
            this.m_item_id = 0;
            this.m_sel_id = 0;
        };
        BagGiftUseSwitchView.prototype.initView = function () {
            var item_id = this.m_item_id;
            var cfg_item = Template.item.get(item_id);
            if (!cfg_item) {
                console.error("no item: " + item_id);
                return;
            }
            if (!cfg_item.BonusItem || cfg_item.BonusItem.length <= 0 || cfg_item.BonusItem[0] == 0 || cfg_item.BonusItem.length != cfg_item.BonusCounts.length) {
                Singleton.Get(DialogControler).showInfo(1199);
                return;
            }
            var arr = [];
            for (var i = 0; i < cfg_item.BonusItem.length; i++) {
                arr.push({
                    idx: i,
                    item_id: cfg_item.BonusItem[i],
                    count: cfg_item.BonusCounts[i],
                    sel: i == this.m_sel_id
                });
            }
            if (arr.length > 3) {
                this.setLongMode(true);
            }
            else {
                this.setLongMode(false);
            }
            this.m_entries.source = arr;
        };
        BagGiftUseSwitchView.prototype.setSel = function (sel) {
            this.m_sel_id = sel;
            this.initView();
        };
        BagGiftUseSwitchView.prototype.setLongMode = function (is_long) {
            var offset = 130;
            if (is_long) {
                this.imgBg.height = this.m_ori_h.get(this.imgBg);
                this.groupItems.height = this.m_ori_h.get(this.groupItems);
                this.scrItems.height = this.m_ori_h.get(this.scrItems);
                this.btnConfirm.y = this.m_ori_h.get(this.btnConfirm);
            }
            else {
                this.imgBg.height = this.m_ori_h.get(this.imgBg) - offset;
                this.groupItems.height = this.m_ori_h.get(this.groupItems) - offset;
                this.scrItems.height = this.m_ori_h.get(this.scrItems) - offset;
                this.btnConfirm.y = this.m_ori_h.get(this.btnConfirm) - offset;
            }
        };
        BagGiftUseSwitchView.prototype.saveHeight = function (root, arg) {
            root.validateNow();
            if (root[arg] != undefined) {
                this.m_ori_h.update(root, root[arg]);
            }
        };
        BagGiftUseSwitchView.prototype.onClick_btnClose = function () {
            this.close();
        };
        BagGiftUseSwitchView.prototype.onClick_btnConfirm = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnConfirm, function () {
                var cfg_item = Template.item.get(_this.m_item_id);
                if (!cfg_item) {
                    console.log("no cfg_item: " + _this.m_item_id);
                    return;
                }
                Singleton.Get(BagOperManager).reqUseGiftSwitch(_this.m_item_id, cfg_item.BonusItem[_this.m_sel_id], function () {
                    Singleton.Get(LayerManager).getView(ui.BagBaseView).refresh();
                    _this.close();
                }, _this);
            }, this);
        };
        return BagGiftUseSwitchView;
    }(PopupUI));
    ui.BagGiftUseSwitchView = BagGiftUseSwitchView;
    __reflect(BagGiftUseSwitchView.prototype, "ui.BagGiftUseSwitchView");
})(ui || (ui = {}));
//# sourceMappingURL=BagGiftUseSwitchView.js.map