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
    var ActLimitGiftInnerView = (function (_super) {
        __extends(ActLimitGiftInnerView, _super);
        /**
         * @constructor
         */
        function ActLimitGiftInnerView() {
            var _this = _super.call(this) || this;
            _this.dgRoot.itemRenderer = ui.ActInnerItemView_Gift;
            return _this;
        }
        /**
         * 设定视图数据
         */
        ActLimitGiftInnerView.prototype.initView = function () {
            var _this = this;
            _super.prototype.initView.call(this);
            var info = Singleton.Get(ActivityManager).getInfo();
            var entries = [];
            var cfg_gift = Template.gift.values;
            var _loop_1 = function (i) {
                var cfg = cfg_gift[i];
                if (cfg.Type != E_GIFT_TYPE.LIMIT) {
                    return "continue";
                }
                // 基本信息
                var n = new ui.ActInnerItemData();
                n.id = i;
                n.item_id = cfg.ID;
                // 数据信息
                var discount = Math.floor(cfg.Price / cfg.OriginalPrice * 10);
                var cfg_item = Template.item.get(cfg.Item[0]);
                var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
                n.status = info.getItemStatus_LimitGift(cfg.ID);
                n.context = {
                    title: Template.getGUIText(cfg_item.iName) + Template.getGUIText("ui_shop" + discount),
                    mark: UtilsGame.stringHander(Template.getGUIText("ui_pve_52"), info.getItemBuyCount_LimitGift(cfg.ID), cfg.Next),
                    cost_icon: DEFINE.UI_ALERT_INFO.diamond.resPNG,
                    price: cfg.Price,
                    price_orig: cfg.OriginalPrice,
                    cost_enough: (my_diamond >= cfg.Price)
                };
                // 设置回调
                n.callback = function () {
                    if (info.getItemStatus_LimitGift(cfg.ID) == E_REWARD_STATUS.AVAILABLE) {
                        Singleton.Get(ActivityManager).reqBuy_LimitGift(cfg.ID, function () {
                            _this.refresh();
                            Singleton.Get(LayerManager).getView(ui.ActivityView).refreshMenu();
                        }, _this);
                    }
                };
                n.thisObj = this_1;
                // 道具信息
                n.items = [];
                for (var j = 0; j < cfg.Item.length; j++) {
                    n.items.push({
                        id: j,
                        item_id: cfg.Item[j],
                        count: cfg.Quantity[j]
                    });
                }
                // 加入列表
                entries.push(n);
            };
            var this_1 = this;
            for (var i = 0; i < cfg_gift.length; i++) {
                _loop_1(i);
            }
            // 列表排序
            entries.sort(ActivityUtil.sortList);
            // 重置排序后的id
            for (var i = 0; i < entries.length; i++) {
                entries[i].id = i;
            }
            this.arr_entries.source = entries;
        };
        return ActLimitGiftInnerView;
    }(ui.ActInnerBasicView));
    ui.ActLimitGiftInnerView = ActLimitGiftInnerView;
    __reflect(ActLimitGiftInnerView.prototype, "ui.ActLimitGiftInnerView");
})(ui || (ui = {}));
//# sourceMappingURL=ActLimitGiftInnerView.js.map