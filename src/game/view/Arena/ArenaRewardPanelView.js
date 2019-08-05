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
    var E_ARENA_REWARD_TAB;
    (function (E_ARENA_REWARD_TAB) {
        E_ARENA_REWARD_TAB[E_ARENA_REWARD_TAB["RANK"] = 0] = "RANK";
        E_ARENA_REWARD_TAB[E_ARENA_REWARD_TAB["DAILY"] = 1] = "DAILY";
    })(E_ARENA_REWARD_TAB = ui.E_ARENA_REWARD_TAB || (ui.E_ARENA_REWARD_TAB = {}));
    var ArenaRewardPanelView = (function (_super) {
        __extends(ArenaRewardPanelView, _super);
        function ArenaRewardPanelView() {
            var _this = _super.call(this, "yw.ArenaRewardPanelSkin") || this;
            /**
             * 初始化排行奖励标签页
             */
            _this.ds_list_reward = [];
            // endregion
            // region 引导
            _this.agent_rank_id = 0;
            return _this;
        }
        /**
         * 打开不带标签页的界面
         * @param tab 默认选中的标签页
         */
        ArenaRewardPanelView.prototype.openWith = function (tab) {
            var _this = this;
            this.labTitle.visible = true;
            this.groupTab.visible = false;
            Singleton.Get(ArenaManager).reqRewardInfo(function () {
                switch (tab) {
                    case E_ARENA_REWARD_TAB.RANK:
                        _this.switchTabRank();
                        break;
                    case E_ARENA_REWARD_TAB.DAILY:
                        _this.switchTabDaily();
                        break;
                }
            }, this);
            this.execOpen();
        };
        /**
         * 打开带标签页的界面
         */
        ArenaRewardPanelView.prototype.open = function () {
            var _this = this;
            this.labTitle.visible = false;
            this.groupTab.visible = true;
            Singleton.Get(ArenaManager).reqRewardInfo(function () {
                _this.switchTabRank();
            }, this);
            this.execOpen();
        };
        /**
         * 执行打开界面
         */
        ArenaRewardPanelView.prototype.execOpen = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().addPopup(this);
            this.initContent();
        };
        /**
         * 关闭界面
         */
        ArenaRewardPanelView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.removePopup(this);
            this.btnAgent.visible = false;
            if (layer.isViewOnStage(layer.getView(ui.ArenaMenuView))) {
                layer.getView(ui.ArenaMenuView).initAlarm();
            }
            // this.onDestroy();
        };
        ArenaRewardPanelView.prototype.componentCreated = function () {
            this.btnRank.text = Template.getGUIText("ui_arena3");
            this.btnDaily.text = Template.getGUIText("ui_arena4");
            this.labMyReward.text = Template.getGUIText("ui_arena9");
            this.labTip.text = Template.getGUIText("ui_arena10");
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRank, this);
            this.btnDaily.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDaily, this);
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
            this.listDaily.itemRenderer = ui.ArenaRewardPanelDailyItemView;
            this.listRankReward.itemRenderer = ui.ArenaRewardPanelRankItemView;
            // this.initContent();
            this.btnDaily.active = false;
        };
        ArenaRewardPanelView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRank, this);
            this.btnDaily.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDaily, this);
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        ArenaRewardPanelView.prototype.onUpdate = function (time) {
        };
        // region 数据刷新
        /**
         * 初始化内容
         */
        ArenaRewardPanelView.prototype.initContent = function () {
            Common.playStackAni(undefined, [this.btnRank, this.btnDaily]);
        };
        /**
         * 初始化个人排名信息（仅每日奖励需要）
         */
        ArenaRewardPanelView.prototype.initMyRank = function () {
            var my_rank = Singleton.Get(ArenaManager).getMyCurRank();
            this.labMyRank.text = Template.getGUIText("ui_arena8") + my_rank;
            // TODO 更新个人排名信息
            if (!this.my_reward_items) {
                this.my_reward_items = [];
            }
            if (this.my_reward_items.length > 0) {
                for (var i = 0; i < this.my_reward_items.length; i++) {
                    this.groupMyReward.removeChild(this.my_reward_items[i]);
                }
                this.my_reward_items = [];
            }
            var my_reward_diamond = 0;
            var my_reward_point = 0;
            var arena_dict = Template.arena;
            for (var i = 0; i < arena_dict.values.length; i++) {
                var arena_info = arena_dict.values[i];
                if (my_rank >= arena_info.ArenaNum[0] && my_rank <= arena_info.ArenaNum[1]) {
                    my_reward_diamond = arena_info.RankDiamonds;
                    my_reward_point = arena_info.RankPoints;
                    break;
                }
            }
            var reward_item_diamond = new ui.ArenaRewardItemView();
            reward_item_diamond.setInfo(DEFINE.UI_ALERT_INFO.diamond.resPNG, my_reward_diamond);
            this.groupMyReward.addChild(reward_item_diamond);
            this.my_reward_items.push(reward_item_diamond);
            var reward_item_point = new ui.ArenaRewardItemView();
            var point_item = Template.item.get(SpecialItem.ArenaPoint);
            reward_item_point.setInfo(point_item.iIcon, my_reward_point);
            this.groupMyReward.addChild(reward_item_point);
            this.my_reward_items.push(reward_item_point);
        };
        ArenaRewardPanelView.prototype.initTabRank = function () {
            var _this = this;
            var arena_mgr = Singleton.Get(ArenaManager);
            var rank_rewards = Template.rankaward;
            this.ds_list_reward = [];
            this.listRankReward.dataProvider = new eui.ArrayCollection(this.ds_list_reward);
            rank_rewards.foreachValue(function (rank_reward_info) {
                _this.ds_list_reward.push({
                    rank_reward_id: rank_reward_info.ID,
                    is_aquired: arena_mgr.checkRankRewardAquired(rank_reward_info.ID),
                    is_available: arena_mgr.checkRankRewardAvailable(rank_reward_info.ID),
                    parent: _this
                });
            }, this);
            this.ds_list_reward.sort(function (a, b) {
                if (a.is_aquired && !b.is_aquired) {
                    return 1;
                }
                else if (!a.is_aquired && b.is_aquired) {
                    return -1;
                }
                if (a.rank_reward_id > b.rank_reward_id) {
                    return -1;
                }
                else if (a.rank_reward_id < b.rank_reward_id) {
                    return 1;
                }
                return 0;
            });
            // 反转列表内容（暂不需要）
            // ds_list_reward.reverse();
            this.listRankReward.validateNow();
        };
        /**
         * 初始化每日奖励标签页
         */
        ArenaRewardPanelView.prototype.initTabDaily = function () {
            this.initMyRank();
            var ds_list_reward = [];
            this.listDaily.dataProvider = new eui.ArrayCollection(ds_list_reward);
            var arena_rewards = Template.arena;
            arena_rewards.foreachKey(function (key) {
                ds_list_reward.push({
                    arena_id: key
                });
            }, this);
        };
        // endregion
        // region 切页按钮
        /**
         * 选择排行奖励标签页
         */
        ArenaRewardPanelView.prototype.switchTabRank = function () {
            this.labTitle.text = Template.getGUIText("ui_arena3");
            this.btnRank.active = true;
            this.btnDaily.active = false;
            this.groupRank.visible = true;
            this.groupDaily.visible = false;
            this.initTabRank();
        };
        /**
         * 选择每日奖励标签页
         */
        ArenaRewardPanelView.prototype.switchTabDaily = function () {
            this.labTitle.text = Template.getGUIText("ui_arena4");
            this.btnRank.active = false;
            this.btnDaily.active = true;
            this.groupRank.visible = false;
            this.groupDaily.visible = true;
            this.initTabDaily();
        };
        /**
         * 响应点击排行奖励标签页
         * @param e
         */
        ArenaRewardPanelView.prototype.onClick_btnRank = function (e) {
            UtilsEffect.tabEffect(this.btnRank);
            this.switchTabRank();
        };
        /**
         * 响应点击每日奖励标签页
         * @param e
         */
        ArenaRewardPanelView.prototype.onClick_btnDaily = function (e) {
            UtilsEffect.tabEffect(this.btnDaily);
            this.switchTabDaily();
        };
        /**
         * 响应点击关闭按钮
         * @param e
         */
        ArenaRewardPanelView.prototype.onClick_btnClose = function (e) {
            this.close();
        };
        ArenaRewardPanelView.prototype.initAgent = function (idx) {
            this.initTabRank(); // 预先初始化
            this.agent_rank_id = this.ds_list_reward[idx - 1].rank_reward_id;
            this.btnAgent.visible = true;
            this.btnAgent.y = 84 + (81 + 6) * (idx - 1);
        };
        ArenaRewardPanelView.prototype.onClick_btnAgent = function (e) {
            Singleton.Get(ArenaManager).onHandleRankReward(this.agent_rank_id);
        };
        return ArenaRewardPanelView;
    }(PopupUI));
    ui.ArenaRewardPanelView = ArenaRewardPanelView;
    __reflect(ArenaRewardPanelView.prototype, "ui.ArenaRewardPanelView");
})(ui || (ui = {}));
//# sourceMappingURL=ArenaRewardPanelView.js.map