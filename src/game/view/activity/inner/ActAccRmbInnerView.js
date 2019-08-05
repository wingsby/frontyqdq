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
    var ActAccRmbInnerView = (function (_super) {
        __extends(ActAccRmbInnerView, _super);
        /**
         * @constructor
         */
        function ActAccRmbInnerView() {
            return _super.call(this) || this;
        }
        /**
         * 设定视图数据
         */
        ActAccRmbInnerView.prototype.initView = function () {
            var _this = this;
            _super.prototype.initView.call(this);
            var entries = [];
            var cfg_accs = Template.accumulation.values;
            var _loop_1 = function (i) {
                var cfg = cfg_accs[i];
                var info = Singleton.Get(ActivityManager).getInfo();
                // 基本信息
                var n = new ui.ActInnerItemData();
                n.id = i;
                n.item_id = cfg.id;
                // 数据信息
                n.status = info.getRewardStatus_AccRmb(cfg.id);
                n.context = {
                    title: UtilsGame.stringHander(Template.getGUIText("ui_activity4"), cfg.rmb),
                    mark: (n.status == E_REWARD_STATUS.DISABLE) ? UtilsGame.stringHander(Template.getGUIText("ui_activity5"), (cfg.rmb - info.acc_bill_rmb)) : "",
                    btn_text: [Template.getGUIText("ui_activity6"), Template.getGUIText("ui_activity2")],
                    btn_status: [true, true]
                };
                // 设置回调
                n.callback = function () {
                    if (info.getRewardStatus_AccRmb(cfg.id) == E_REWARD_STATUS.AVAILABLE) {
                        Singleton.Get(ActivityManager).reqReward_AccRmb(cfg.id, function () {
                            _this.refresh();
                            Singleton.Get(LayerManager).getView(ui.ActivityView).refreshMenu();
                        }, _this);
                    }
                    if (info.getRewardStatus_AccRmb(cfg.id) == E_REWARD_STATUS.DISABLE) {
                        Singleton.Get(LayerManager).getView(ui.ActivityView).close();
                        Singleton.Get(LayerManager).getView(ui.PayView).open();
                    }
                };
                n.thisObj = this_1;
                // 道具信息
                n.gold = cfg.gold;
                n.diamond = cfg.diamond;
                n.items = [];
                for (var j = 0; j < cfg.item.length; j++) {
                    n.items.push({
                        id: j,
                        item_id: cfg.item[j],
                        count: cfg.quantity[j]
                    });
                }
                // 加入列表
                entries.push(n);
            };
            var this_1 = this;
            for (var i = 0; i < cfg_accs.length; i++) {
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
        ActAccRmbInnerView.prototype.onAddToStage = function () {
            var _this = this;
            Singleton.Get(ActivityManager).reqInfoDelay_AccRmb(function () {
                _this.initView();
            }, this);
        };
        return ActAccRmbInnerView;
    }(ui.ActInnerBasicView));
    ui.ActAccRmbInnerView = ActAccRmbInnerView;
    __reflect(ActAccRmbInnerView.prototype, "ui.ActAccRmbInnerView");
})(ui || (ui = {}));
//# sourceMappingURL=ActAccRmbInnerView.js.map