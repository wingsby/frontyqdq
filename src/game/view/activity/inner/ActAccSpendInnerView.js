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
    var ActAccSpendInnerView = (function (_super) {
        __extends(ActAccSpendInnerView, _super);
        /**
         * @constructor
         */
        function ActAccSpendInnerView() {
            return _super.call(this) || this;
        }
        /**
         * 设定视图数据
         */
        ActAccSpendInnerView.prototype.initView = function () {
            var _this = this;
            _super.prototype.initView.call(this);
            var entries = [];
            var cfg_csm = Template.consume.values;
            var _loop_1 = function (i) {
                var cfg = cfg_csm[i];
                var info = Singleton.Get(ActivityManager).getInfo();
                // 基本信息
                var n = new ui.ActInnerItemData();
                n.id = i;
                n.item_id = cfg.ID;
                // 数据信息
                n.status = info.getRewardStatus_AccSpend(cfg.ID);
                n.context = {
                    title: "累计消费 " + cfg.limit + " 钻石",
                    mark: (n.status == E_REWARD_STATUS.DISABLE) ? "还差 " + (cfg.limit - info.acc_spend) + " 钻石" : "",
                };
                // 设置回调
                n.callback = function () {
                    if (info.getRewardStatus_AccSpend(cfg.ID) == E_REWARD_STATUS.AVAILABLE) {
                        Singleton.Get(ActivityManager).reqReward_AccSpend(cfg.ID, function () {
                            _this.refresh();
                            Singleton.Get(LayerManager).getView(ui.ActivityView).refreshMenu();
                        }, _this);
                    }
                };
                n.thisObj = this_1;
                // 道具信息
                n.gold = cfg.Gold;
                n.diamond = cfg.Jewel;
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
            for (var i = 0; i < cfg_csm.length; i++) {
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
        /**
         * 响应添加到舞台
         */
        ActAccSpendInnerView.prototype.onAddToStage = function () {
            var _this = this;
            Singleton.Get(ActivityManager).reqInfoDelay_AccSpend(function () {
                _this.initView();
            }, this);
        };
        return ActAccSpendInnerView;
    }(ui.ActInnerBasicView));
    ui.ActAccSpendInnerView = ActAccSpendInnerView;
    __reflect(ActAccSpendInnerView.prototype, "ui.ActAccSpendInnerView");
})(ui || (ui = {}));
//# sourceMappingURL=ActAccSpendInnerView.js.map