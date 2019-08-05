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
    var TowerRewardPanelView = (function (_super) {
        __extends(TowerRewardPanelView, _super);
        function TowerRewardPanelView() {
            var _this = _super.call(this, "yw.DuelScorePanelSkin") || this;
            // region 引导
            _this.agent_reward_id = 0;
            _this.reward_arr = new eui.ArrayCollection();
            _this.listReward.dataProvider = _this.reward_arr;
            return _this;
        }
        TowerRewardPanelView.prototype.open = function () {
            this.initView();
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().addPopup(this);
        };
        TowerRewardPanelView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
            // this.onDestroy();
            this.btnAgent.visible = false;
            // 引导
            var guide_entity = Singleton.Get(GuideManager).getGuideInfo().getCurEntity();
            if (guide_entity != undefined) {
                if (guide_entity.typevalue[0] != "TowerView" && guide_entity.typevalue[0] != "TowerRewardPanelView") {
                    Singleton.Get(LayerManager).getView(ui.GuideView).visible = false;
                }
            }
        };
        TowerRewardPanelView.prototype.componentCreated = function () {
            this.labTitle.text = Template.getGUIText("ui_ex_tower_4");
            this.labTxtMyScore.text = Template.getGUIText("ui_ex_tower_2");
            this.listReward.itemRenderer = ui.TowerRewardPanelItemView;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        TowerRewardPanelView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        TowerRewardPanelView.prototype.onUpdate = function (time) {
        };
        TowerRewardPanelView.prototype.refresh = function () {
            this.initView();
            Singleton.Get(LayerManager).getView(ui.TowerView).initAlarm();
        };
        TowerRewardPanelView.prototype.initView = function () {
            var tower = Singleton.Get(TowerManager).getTowerInfo();
            this.labMyScore.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_tower_3"), tower.history_box.toString());
            var data_arr = [];
            var rewards = Template.towerAward.values;
            for (var i = 0; i < rewards.length; i++) {
                var reward_id = rewards[i].ID;
                data_arr.push({
                    reward_id: reward_id,
                    is_received: tower.checkRewardReceived(reward_id),
                    is_available: tower.checkRewardAvailable(reward_id),
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
        TowerRewardPanelView.prototype.onClick_btnClose = function (e) {
            this.close();
        };
        TowerRewardPanelView.prototype.initAgent = function (idx) {
            this.agent_reward_id = this.reward_arr.source[idx - 1].reward_id;
            this.btnAgent.visible = true;
            this.btnAgent.y = 84 + (81 + 6) * (idx - 1);
        };
        TowerRewardPanelView.prototype.onClick_btnAgent = function (e) {
            var _this = this;
            Singleton.Get(TowerManager).reqReward(this.agent_reward_id, function () {
                _this.refresh();
            }, this);
        };
        return TowerRewardPanelView;
    }(PopupUI));
    ui.TowerRewardPanelView = TowerRewardPanelView;
    __reflect(TowerRewardPanelView.prototype, "ui.TowerRewardPanelView");
})(ui || (ui = {}));
//# sourceMappingURL=TowerRewardPanelView.js.map