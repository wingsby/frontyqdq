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
    var GuildWarRewardView = (function (_super) {
        __extends(GuildWarRewardView, _super);
        function GuildWarRewardView() {
            var _this = _super.call(this, "yw.DuelScorePanelSkin") || this;
            _this.reward_arr = new eui.ArrayCollection();
            _this.listReward.dataProvider = _this.reward_arr;
            return _this;
        }
        GuildWarRewardView.prototype.open = function () {
            this.initView();
            this.btnAgent.visible = false;
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().addPopup(this);
        };
        GuildWarRewardView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
        };
        GuildWarRewardView.prototype.componentCreated = function () {
            this.labTitle.text = Template.getGUIText("ui_guildwar31");
            this.listReward.itemRenderer = ui.GuildWarRewardItemView;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        GuildWarRewardView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        GuildWarRewardView.prototype.onUpdate = function (time) {
        };
        GuildWarRewardView.prototype.refresh = function () {
            this.initView();
        };
        GuildWarRewardView.prototype.initView = function () {
            var _this = this;
            this.labMyScore.text = Template.getGUIText("ui_guildwar38");
            this.labTxtMyScore.text = "";
            Singleton.Get(GuildWarManager).reqWarRank(function () {
                _this.initRank();
            }, this);
            var data_arr = [];
            var warrank = Template.warRank.values;
            for (var i = 0; i < warrank.length; i++) {
                data_arr.push({
                    reward_id: warrank[i].id,
                    parent: this
                });
            }
            this.reward_arr.source = data_arr;
            this.reward_arr.refresh();
        };
        GuildWarRewardView.prototype.initRank = function () {
            var rank = Singleton.Get(GuildManager).getInfo().getMyGuildWarRank();
            if (rank > 0) {
                this.labTxtMyScore.text = "当前排名：" + rank;
            }
            else {
                this.labTxtMyScore.text = "当前排名：未上榜";
            }
        };
        GuildWarRewardView.prototype.onClick_btnClose = function (e) {
            this.close();
        };
        return GuildWarRewardView;
    }(PopupUI));
    ui.GuildWarRewardView = GuildWarRewardView;
    __reflect(GuildWarRewardView.prototype, "ui.GuildWarRewardView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildWarRewardView.js.map