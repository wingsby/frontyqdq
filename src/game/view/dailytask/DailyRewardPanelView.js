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
    var DailyRewardPanelView = (function (_super) {
        __extends(DailyRewardPanelView, _super);
        function DailyRewardPanelView() {
            var _this = _super.call(this, "yw.DuelScorePanelSkin") || this;
            // region 引导
            _this.agent_reward_id = 0;
            _this.reward_arr = new eui.ArrayCollection();
            _this.listReward.dataProvider = _this.reward_arr;
            return _this;
        }
        DailyRewardPanelView.prototype.open = function () {
            this.initView();
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().addPopup(this);
        };
        DailyRewardPanelView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
            // this.onDestroy();
            this.btnAgent.visible = false;
            // 引导
            var guide_entity = Singleton.Get(GuideManager).getGuideInfo().getCurEntity();
            if (guide_entity != undefined) {
                if (guide_entity.typevalue[0] != "DailyTaskView" && guide_entity.typevalue[0] != "DailyRewardPanelView") {
                    Singleton.Get(LayerManager).getView(ui.GuideView).visible = false;
                }
            }
        };
        DailyRewardPanelView.prototype.componentCreated = function () {
            this.labTitle.text = Template.getGUIText("ui_dailytask15");
            this.labTxtMyScore.text = "当前魅力等级";
            this.listReward.itemRenderer = ui.DailyRewardPanelItemView;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        DailyRewardPanelView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        DailyRewardPanelView.prototype.onUpdate = function (time) {
        };
        DailyRewardPanelView.prototype.refresh = function () {
            this.initView();
        };
        DailyRewardPanelView.prototype.initView = function () {
            this.labMyScore.text = Singleton.Get(RoleManager).getRolesInfo().m_mei_li_lv.toString(); // Singleton.Get(BagManager).getItemCount(Template.config.CharmItem).toString();
            var daily = Singleton.Get(DailyTaskManager).getData();
            var data_arr = [];
            var rewards = Template.taskLvReward.values;
            for (var i = 0; i < rewards.length; i++) {
                var reward_id = rewards[i].Id;
                data_arr.push({
                    reward_id: reward_id,
                    is_received: daily.checkRewardReceived(reward_id),
                    is_available: daily.checkRewardAvailable(reward_id),
                    parent: this
                });
            }
            data_arr.sort(function (a, b) {
                if (a.is_received && !b.is_received) {
                    return 1;
                }
                else if (!a.is_received && b.is_received) {
                    return -1;
                }
                if (a.reward_id > b.reward_id) {
                    return 1;
                }
                else if (a.reward_id < b.reward_id) {
                    return -1;
                }
                return 0;
            });
            this.reward_arr.source = data_arr;
            this.reward_arr.refresh();
        };
        DailyRewardPanelView.prototype.onClick_btnClose = function (e) {
            Singleton.Get(LayerManager).getView(ui.DailyTaskView).refresh();
            this.close();
        };
        DailyRewardPanelView.prototype.initAgent = function (idx) {
            this.agent_reward_id = this.reward_arr.source[idx - 1].reward_id;
            this.btnAgent.visible = true;
            this.btnAgent.y = 84 + (81 + 6) * (idx - 1);
        };
        DailyRewardPanelView.prototype.onClick_btnAgent = function (e) {
            Singleton.Get(DailyTaskManager).reqReward(this.agent_reward_id, function () {
                Singleton.Get(LayerManager).getView(ui.DailyRewardPanelView).refresh();
            }, this);
        };
        return DailyRewardPanelView;
    }(PopupUI));
    ui.DailyRewardPanelView = DailyRewardPanelView;
    __reflect(DailyRewardPanelView.prototype, "ui.DailyRewardPanelView");
})(ui || (ui = {}));
//# sourceMappingURL=DailyRewardPanelView.js.map