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
    var DuelScorePanelView = (function (_super) {
        __extends(DuelScorePanelView, _super);
        function DuelScorePanelView() {
            var _this = _super.call(this, "yw.DuelScorePanelSkin") || this;
            // region 引导
            _this.agent_reward_id = 0;
            _this.reward_arr = new eui.ArrayCollection();
            _this.listReward.dataProvider = _this.reward_arr;
            return _this;
        }
        DuelScorePanelView.prototype.open = function () {
            this.initView();
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().addPopup(this);
        };
        DuelScorePanelView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
            this.btnAgent.visible = false;
            // this.onDestroy();
        };
        DuelScorePanelView.prototype.componentCreated = function () {
            this.labTitle.text = "功勋奖励";
            this.labTxtMyScore.text = "当前累计功勋";
            this.listReward.itemRenderer = ui.DuelScorePanelItemView;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        DuelScorePanelView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        DuelScorePanelView.prototype.onUpdate = function (time) {
        };
        DuelScorePanelView.prototype.refresh = function () {
            this.initView();
        };
        DuelScorePanelView.prototype.initView = function () {
            var duel = Singleton.Get(DuelManager).getDuels();
            this.labMyScore.text = duel.max_score.toString(); // Singleton.Get(BagManager).getItemCount(Template.duel.FeatsID).toString();
            var data_arr = [];
            var mawards = Template.maward.values;
            for (var i = 0; i < mawards.length; i++) {
                var maward_id = mawards[i].ID;
                data_arr.push({
                    score_reward_id: maward_id,
                    is_received: duel.checkScoreRewardReceived(maward_id),
                    is_available: duel.checkScoreRewardAvailable(maward_id),
                    parent: this
                });
            }
            data_arr.sort(function (a, b) {
                if (a.is_received != b.is_received) {
                    if (a.is_received) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                if (a.is_available != b.is_available) {
                    if (a.is_available) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
                if (a.score_reward_id != b.score_reward_id) {
                    if (a.score_reward_id < b.score_reward_id) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
                return 0;
            });
            this.reward_arr.source = data_arr;
            this.reward_arr.refresh();
        };
        DuelScorePanelView.prototype.onClick_btnClose = function (e) {
            Singleton.Get(LayerManager).getView(ui.DuelView).refresh();
            this.close();
        };
        DuelScorePanelView.prototype.initAgent = function (idx) {
            this.agent_reward_id = this.reward_arr.source[idx - 1].score_reward_id;
            this.btnAgent.visible = true;
            this.btnAgent.y = 84 + (81 + 6) * (idx - 1);
        };
        DuelScorePanelView.prototype.onClick_btnAgent = function (e) {
            Singleton.Get(DuelManager).reqScoreReward(this.agent_reward_id, function () {
                Singleton.Get(LayerManager).getView(ui.DuelScorePanelView).refresh();
            }, this);
        };
        return DuelScorePanelView;
    }(PopupUI));
    ui.DuelScorePanelView = DuelScorePanelView;
    __reflect(DuelScorePanelView.prototype, "ui.DuelScorePanelView");
})(ui || (ui = {}));
//# sourceMappingURL=DuelScorePanelView.js.map