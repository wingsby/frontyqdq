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
    var ActInnerInvestBasicView = (function (_super) {
        __extends(ActInnerInvestBasicView, _super);
        /**
         * @constructor
         */
        function ActInnerInvestBasicView() {
            var _this = _super.call(this) || this;
            _this.m_last_tick = 0;
            _this.m_act_id = 0;
            _this.skinName = "yw.ActInnerBasicSkin_Invest";
            _this.arr_entries = new eui.ArrayCollection();
            _this.dgRoot.dataProvider = _this.arr_entries;
            _this.dgRoot.itemRenderer = ui.ActInnerItemView;
            return _this;
        }
        /**
         * 设定视图数据
         */
        ActInnerInvestBasicView.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.initInfo();
        };
        /**
         * 设定投资基本信息
         */
        ActInnerInvestBasicView.prototype.initInfo = function () {
            this.imgInvest.source = undefined;
            this.labBuy.text = Template.getGUIText("ui_activity31");
        };
        /**
         * 设定购买状态
         */
        ActInnerInvestBasicView.prototype.initBuy = function (is_buy) {
            if (is_buy) {
                this.btnBuy.visible = false;
            }
            else {
                this.btnBuy.visible = true;
            }
        };
        /**
         * 设定价格
         */
        ActInnerInvestBasicView.prototype.initPrice = function (price) {
            var inf_p = Singleton.Get(PlayerInfoManager);
            this.labPrice.text = UtilsGame.numberToString(price);
            this.labPrice.textColor = inf_p.getDiamond() >= price ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
        };
        ActInnerInvestBasicView.prototype.update = function () {
            var now = UtilsGame.Now();
            if (now - this.m_last_tick > DEFINE.TIME_MILLISECOND_PER_SECOND) {
                this.m_last_tick = now;
                if (this.m_act_id > 0) {
                    if (ActivityUtil.isInvest(this.m_act_id) && ActivityUtil.isInvestPermanent(this.m_act_id)) {
                        this.labCountdown.text = UtilsGame.stringHander(Template.getGUIText("ui_activity34"));
                    }
                    else {
                        var type = ActivityUtil.isActOpenNoMutex(this.m_act_id, E_ACT_TYPE.BEGIN) ? E_ACT_TYPE.BEGIN : E_ACT_TYPE.BASIC;
                        this.labCountdown.text = UtilsGame.stringHander("限时：$1", ActivityUtil.getCountdownStr(this.m_act_id, type));
                    }
                }
            }
        };
        ActInnerInvestBasicView.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
            Singleton.Get(RegisterUpdate).register(this);
        };
        ActInnerInvestBasicView.prototype.onRemoveFromStage = function () {
            _super.prototype.onRemoveFromStage.call(this);
            Singleton.Get(RegisterUpdate).unRegister(this);
            this.m_last_tick = 0;
        };
        return ActInnerInvestBasicView;
    }(ui.ActInnerBasicView));
    ui.ActInnerInvestBasicView = ActInnerInvestBasicView;
    __reflect(ActInnerInvestBasicView.prototype, "ui.ActInnerInvestBasicView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=ActInnerInvestBasicView.js.map