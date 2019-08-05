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
    var ActCheckInInnerView = (function (_super) {
        __extends(ActCheckInInnerView, _super);
        /**
         * @constructor
         */
        function ActCheckInInnerView() {
            var _this = _super.call(this) || this;
            _this.sp_rewards = [];
            _this.skinName = "yw.ActInnerBasicSkin_CheckIn";
            _this.arr_entries = new eui.ArrayCollection();
            _this.dgRoot.dataProvider = _this.arr_entries;
            _this.dgRoot.itemRenderer = ui.ActInnerItemView_CheckIn;
            _this.initRewardArr();
            for (var i = 0; i < _this.sp_rewards.length; i++) {
                _this.sp_rewards[i].groupBox.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_groupBox, _this);
            }
            return _this;
        }
        /**
         * 刷新界面
         */
        ActCheckInInnerView.prototype.refresh = function () {
            var last_scr_v = this.scrRoot.viewport.scrollV;
            _super.prototype.refresh.call(this);
            this.scrRoot.validateNow();
            this.scrRoot.viewport.scrollV = last_scr_v;
        };
        /**
         * 设定视图数据
         */
        ActCheckInInnerView.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var info = Singleton.Get(ActivityManager).getInfo();
            var entries = [];
            var date = new Date(UtilsGame.Now());
            var day_counts = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            for (var i = 0; i < day_counts; i++) {
                var n = new ui.ActInnerItemData();
                n.id = i;
                n.item_id = (date.getMonth() + 1) * 100 + (i + 1);
                n.status = info.isCheckIn(n.item_id) ? E_REWARD_STATUS.RECEIVED : E_REWARD_STATUS.AVAILABLE;
                // 加入列表
                entries.push(n);
            }
            this.arr_entries.source = entries;
            this.initRewards();
            // 设定初始位置
            var today_date = UtilsGame.getNowDate();
            this.scrRoot.validateNow();
            if (today_date.d > 15) {
                this.scrRoot.viewport.scrollV = 92 * 2 + 6;
            }
            else {
                this.scrRoot.viewport.scrollV = 0;
            }
        };
        /**
         * 设定累计签到奖励数据
         */
        ActCheckInInnerView.prototype.initRewards = function () {
            // 奖励宝箱
            var aggs = Template.aggregate.values;
            var info = Singleton.Get(ActivityManager).getInfo();
            for (var i = 0; i < aggs.length; i++) {
                var spr = this.sp_rewards[i];
                var cfg_agg = aggs[i];
                var status_1 = info.getRewardStatus_CheckIn(cfg_agg.ID);
                // 设定UI状态
                spr.labTimes.text = UtilsGame.stringHander(Template.getGUIText("ui_activity8"), cfg_agg.ID);
                spr.labBox.visible = (status_1 == E_REWARD_STATUS.AVAILABLE);
                ResManager.AsyncSetTexture(spr.imgBox, Common.getRewardBoxIcon(i, status_1));
            }
            // 进度条
            this.progressWins.value = this.clacAggPercentage(info.getCheckInCount(), Template.aggregate.keys) * 100;
        };
        /**
         * 响应添加到舞台
         */
        ActCheckInInnerView.prototype.onAddToStage = function () {
            this.initView();
        };
        /**
         * 初始化奖励对象数组
         */
        ActCheckInInnerView.prototype.initRewardArr = function () {
            this.sp_rewards = [{
                    groupBox: this.groupBox1,
                    imgBox: this.imgBox1,
                    labBox: this.labBox1,
                    labTimes: this.labTimes1
                }, {
                    groupBox: this.groupBox2,
                    imgBox: this.imgBox2,
                    labBox: this.labBox2,
                    labTimes: this.labTimes2
                }, {
                    groupBox: this.groupBox3,
                    imgBox: this.imgBox3,
                    labBox: this.labBox3,
                    labTimes: this.labTimes3
                }, {
                    groupBox: this.groupBox4,
                    imgBox: this.imgBox4,
                    labBox: this.labBox4,
                    labTimes: this.labTimes4
                }, {
                    groupBox: this.groupBox5,
                    imgBox: this.imgBox5,
                    labBox: this.labBox5,
                    labTimes: this.labTimes5
                }];
        };
        /**
         * 响应累计奖励宝箱点击事件
         */
        ActCheckInInnerView.prototype.onClick_groupBox = function (e) {
            var _this = this;
            var reward_idx = -1;
            for (var i = 0; i < this.sp_rewards.length; i++) {
                if (e.currentTarget == this.sp_rewards[i].groupBox) {
                    reward_idx = i;
                    break;
                }
            }
            if (reward_idx < 0) {
                console.log("no any rewards.");
                return;
            }
            var info = Singleton.Get(ActivityManager).getInfo();
            var aggs = Template.aggregate.values;
            var cfg_agg = aggs[reward_idx];
            var status = info.getRewardStatus_CheckIn(cfg_agg.ID);
            switch (status) {
                case E_REWARD_STATUS.AVAILABLE:
                    UtilsEffect.buttonEffect(this.sp_rewards[reward_idx].imgBox, function () {
                        Singleton.Get(ActivityManager).reqReward_CheckIn(cfg_agg.ID, function () {
                            _this.initRewards();
                            Singleton.Get(LayerManager).getView(ui.ActivityView).refreshMenu();
                        }, _this);
                    });
                    break;
                case E_REWARD_STATUS.DISABLE:
                    UtilsEffect.buttonEffect(this.sp_rewards[reward_idx].imgBox, function () {
                        var rewards = [];
                        if (cfg_agg.Item != 0) {
                            var reward = new msg.SyncBagItem();
                            reward.id = cfg_agg.Item;
                            reward.count = cfg_agg.Quantity;
                            rewards.push(reward);
                        }
                        Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_activity10"), 0, cfg_agg.Gold, cfg_agg.Jewel, rewards);
                    });
                    break;
            }
        };
        /**
         * 计算胜利次数累计进度条百分比
         * @param cur 当前累计次数
         * @param stages 奖励阶段次数[]
         * @param max_win_num 最大奖励数量
         * @returns {number} 返回百分比，0-1
         */
        ActCheckInInnerView.prototype.clacAggPercentage = function (cur, stages) {
            var ratio = 1 / stages.length;
            for (var i = 0; i < stages.length; i++) {
                if (cur > stages[i]) {
                    continue;
                }
                if (i == 0) {
                    return ratio * cur / stages[i];
                }
                else {
                    return ratio * i + ratio * (cur - stages[i - 1]) / (stages[i] - stages[i - 1]);
                }
            }
            return 1;
        };
        return ActCheckInInnerView;
    }(ui.ActInnerBasicView));
    ui.ActCheckInInnerView = ActCheckInInnerView;
    __reflect(ActCheckInInnerView.prototype, "ui.ActCheckInInnerView");
})(ui || (ui = {}));
//# sourceMappingURL=ActCheckInInnerView.js.map