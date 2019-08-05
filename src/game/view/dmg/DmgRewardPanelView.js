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
    var DmgRewardPanelView = (function (_super) {
        __extends(DmgRewardPanelView, _super);
        function DmgRewardPanelView() {
            var _this = _super.call(this, "yw.DuelScorePanelSkin") || this;
            // region 引导
            _this.agent_reward_id = 0;
            _this.reward_arr = new eui.ArrayCollection();
            _this.listReward.dataProvider = _this.reward_arr;
            return _this;
        }
        DmgRewardPanelView.prototype.open = function () {
            this.initView();
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().addPopup(this);
        };
        DmgRewardPanelView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.DmgView).refreshNew();
            layer.getPopup().removePopup(this);
            this.btnAgent.visible = false;
        };
        DmgRewardPanelView.prototype.componentCreated = function () {
            this.labTitle.text = Template.getGUIText("ui_damage13");
            this.labTxtMyScore.text = Template.getGUIText("ui_damage12");
            this.listReward.itemRenderer = ui.DmgRewardPanelItemView;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        DmgRewardPanelView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        DmgRewardPanelView.prototype.onUpdate = function (time) {
        };
        DmgRewardPanelView.prototype.refresh = function () {
            this.initView();
        };
        DmgRewardPanelView.prototype.initView = function () {
            var dmg_info = Singleton.Get(DmgManager).getDmgInfo();
            this.labMyScore.text = dmg_info.getDmgMax().toString();
            var data_arr = [];
            var rewards = Template.damageReward.values;
            for (var i = 0; i < rewards.length; i++) {
                var reward_id = rewards[i].Id;
                data_arr.push({
                    reward_id: reward_id,
                    is_received: dmg_info.checkRewardReceived(reward_id),
                    is_available: dmg_info.checkRewardAvailable(reward_id),
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
        DmgRewardPanelView.prototype.onClick_btnClose = function (e) {
            this.close();
        };
        DmgRewardPanelView.prototype.initAgent = function (idx) {
            this.agent_reward_id = this.reward_arr.source[idx - 1].reward_id;
            this.btnAgent.visible = true;
            this.btnAgent.y = 84 + (81 + 6) * (idx - 1);
        };
        DmgRewardPanelView.prototype.onClick_btnAgent = function (e) {
            Singleton.Get(DmgManager).reqReward(this.agent_reward_id, function () {
                Singleton.Get(LayerManager).getView(ui.DmgRewardPanelView).refresh();
                Singleton.Get(LayerManager).getView(ui.DmgView).refreshNew();
            }, this);
        };
        return DmgRewardPanelView;
    }(PopupUI));
    ui.DmgRewardPanelView = DmgRewardPanelView;
    __reflect(DmgRewardPanelView.prototype, "ui.DmgRewardPanelView");
})(ui || (ui = {}));
//# sourceMappingURL=DmgRewardPanelView.js.map