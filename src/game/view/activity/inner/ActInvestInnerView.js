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
    var ActInvestInnerView = (function (_super) {
        __extends(ActInvestInnerView, _super);
        /**
         * @constructor
         */
        function ActInvestInnerView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ActInnerBasicSkin_Pic";
            _this.arr_entries = new eui.ArrayCollection();
            _this.dgRoot.dataProvider = _this.arr_entries;
            _this.dgRoot.itemRenderer = ui.ActInnerItemView;
            return _this;
        }
        /**
         * 设定视图数据
         */
        ActInvestInnerView.prototype.initView = function () {
            var _this = this;
            _super.prototype.initView.call(this);
            Singleton.Get(LayerManager).getView(ui.ActivityView).initSp(E_ACT_DESIGN_TYPE.Invest);
            var info = Singleton.Get(ActivityManager).getInfo();
            var entries = [];
            var cfg_inv = Template.invest.values;
            var _loop_1 = function (i) {
                var cfg = cfg_inv[i];
                // 基本信息
                var n = new ui.ActInnerItemData();
                n.id = i;
                n.item_id = cfg.ID;
                // 数据信息
                var status_1 = info.getRewardStatus_Invest(cfg.ID);
                var my_team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
                var mark = "";
                if (status_1 == E_REWARD_STATUS.AVAILABLE || status_1 == E_REWARD_STATUS.DISABLE) {
                    mark = UtilsGame.stringHander(Template.getGUIText("ui_activity12"), my_team_lv, cfg.ID);
                }
                n.status = status_1;
                n.context = {
                    title: UtilsGame.stringHander(Template.getGUIText("ui_activity13"), cfg.ID),
                    mark: mark,
                };
                // 设置回调
                n.callback = function () {
                    if (!info.has_invest) {
                        Singleton.Get(DialogControler).showInfo(1178);
                    }
                    if (info.getRewardStatus_Invest(cfg.ID) == E_REWARD_STATUS.AVAILABLE) {
                        Singleton.Get(ActivityManager).reqReward_Invest(cfg.ID, function () {
                            _this.refresh();
                            Singleton.Get(LayerManager).getView(ui.ActivityView).refreshMenu();
                        }, _this);
                    }
                };
                n.thisObj = this_1;
                // 道具信息
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
            for (var i = 0; i < cfg_inv.length; i++) {
                _loop_1(i);
            }
            // 只有已投资才进行排序
            if (info.has_invest) {
                // 列表排序
                entries.sort(ActivityUtil.sortList);
                // 重置排序后的id
                for (var i = 0; i < entries.length; i++) {
                    entries[i].id = i;
                }
            }
            this.arr_entries.source = entries;
        };
        /**
         * 响应添加到舞台
         */
        ActInvestInnerView.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
        };
        return ActInvestInnerView;
    }(ui.ActInnerBasicView));
    ui.ActInvestInnerView = ActInvestInnerView;
    __reflect(ActInvestInnerView.prototype, "ui.ActInvestInnerView");
})(ui || (ui = {}));
//# sourceMappingURL=ActInvestInnerView.js.map