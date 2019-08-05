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
    var ActPveRankInnerView = (function (_super) {
        __extends(ActPveRankInnerView, _super);
        /**
         * @constructor
         */
        function ActPveRankInnerView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ActInnerBasicSkin_Rank";
            _this.arr_entries = new eui.ArrayCollection();
            _this.dgRoot.dataProvider = _this.arr_entries;
            _this.dgRoot.itemRenderer = ui.ActInnerItemView_Rank;
            return _this;
        }
        /**
         * 设定视图数据
         */
        ActPveRankInnerView.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var entries = [];
            var cfg_lvs = Template.hdRankStage.values;
            for (var i = 1; i <= cfg_lvs.length; i++) {
                var proxy_i = i;
                if (proxy_i == cfg_lvs.length) {
                    proxy_i = 0;
                }
                var cfg = cfg_lvs[proxy_i];
                // 基本信息
                var n = new ui.ActInnerItemData();
                n.id = i;
                n.item_id = cfg.id;
                // 数据信息
                n.status = E_REWARD_STATUS.RECEIVED;
                n.context = {
                    title: ((cfg.rank[0] == (cfg.rank[1])) ? cfg.rank[0] : (cfg.rank[0] + "-" + cfg.rank[1])).toString(),
                    mark: "",
                    rank: cfg.rank[0],
                    rank_type: RankListType.PVE
                };
                // 设置回调
                n.callback = function () { };
                n.thisObj = this;
                // 活动开启天数
                var start_time = ActivityUtil.getActStartTime(E_ACT_DESIGN_TYPE.PveRank, E_ACT_TYPE.BEGIN);
                var start_zero = UtilsGame.SomeDayStart(start_time);
                var days = 0;
                if (start_zero != 0) {
                    days = (UtilsGame.Now() - start_zero) / (1000 * 60 * 60 * 24);
                }
                var reward_idx = 0;
                if (days > Template.config.ranktime[1]) {
                    reward_idx = 2;
                }
                else if (days > Template.config.ranktime[0]) {
                    reward_idx = 1;
                }
                // 道具信息
                var cfg_mail = Template.mail.get(cfg.mail[reward_idx]);
                n.gold = cfg_mail.mMoney;
                n.diamond = cfg_mail.mDiamond;
                n.items = [];
                for (var j = 0; j < cfg_mail.mItem.length; j++) {
                    n.items.push({
                        id: j,
                        item_id: cfg_mail.mItem[j],
                        count: cfg_mail.mNum[j]
                    });
                }
                // 加入列表
                entries.push(n);
            }
            this.arr_entries.source = entries;
        };
        /**
         * 响应添加到舞台
         */
        ActPveRankInnerView.prototype.onAddToStage = function () {
            this.initView();
        };
        return ActPveRankInnerView;
    }(ui.ActInnerBasicView));
    ui.ActPveRankInnerView = ActPveRankInnerView;
    __reflect(ActPveRankInnerView.prototype, "ui.ActPveRankInnerView");
})(ui || (ui = {}));
//# sourceMappingURL=ActPveRankInnerView.js.map