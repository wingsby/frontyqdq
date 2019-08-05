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
    var ActGkGrowInnerView = (function (_super) {
        __extends(ActGkGrowInnerView, _super);
        /**
         * @constructor
         */
        function ActGkGrowInnerView() {
            return _super.call(this) || this;
        }
        /**
         * 设定视图数据
         */
        ActGkGrowInnerView.prototype.initView = function () {
            var _this = this;
            _super.prototype.initView.call(this);
            var entries = [];
            var cfg_gkg = Template.gkGrow.values;
            var _loop_1 = function (i) {
                var cfg = cfg_gkg[i];
                var info = Singleton.Get(ActivityManager).getInfo();
                // 基本信息
                var n = new ui.ActInnerItemData();
                n.id = i;
                n.item_id = cfg.ID;
                // 数据信息
                var status_1 = info.getRewardStatus_GkGrow(cfg.ID);
                var my_pve_lv = Singleton.Get(PveManager).getCurLevel();
                var mark = "";
                if (status_1 == E_REWARD_STATUS.AVAILABLE || status_1 == E_REWARD_STATUS.DISABLE) {
                    mark = UtilsGame.stringHander(Template.getGUIText("ui_activity12"), (my_pve_lv - 1), cfg.ID);
                }
                n.status = status_1;
                n.context = {
                    title: UtilsGame.stringHander(Template.getGUIText("ui_activity11"), Common.getLevelName(cfg.ID)),
                    mark: mark,
                };
                // 设置回调
                n.callback = function () {
                    if (info.getRewardStatus_GkGrow(cfg.ID) == E_REWARD_STATUS.AVAILABLE) {
                        Singleton.Get(ActivityManager).reqReward_GkGrow(cfg.ID, function () {
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
            for (var i = 0; i < cfg_gkg.length; i++) {
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
        ActGkGrowInnerView.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
        };
        return ActGkGrowInnerView;
    }(ui.ActInnerBasicView));
    ui.ActGkGrowInnerView = ActGkGrowInnerView;
    __reflect(ActGkGrowInnerView.prototype, "ui.ActGkGrowInnerView");
})(ui || (ui = {}));
//# sourceMappingURL=ActGkGrowInnerView.js.map