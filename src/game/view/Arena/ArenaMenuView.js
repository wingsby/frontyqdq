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
    var ArenaMenuView = (function (_super) {
        __extends(ArenaMenuView, _super);
        // region 事件绑定
        /**
         * 构造函数
         */
        function ArenaMenuView() {
            var _this = _super.call(this, "yw.ArenaMenuSkin") || this;
            _this.lastTickTime = 0;
            _this.initEvent();
            _this.initGuiText();
            return _this;
        }
        /**
         * 响应创建子对象
         */
        ArenaMenuView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 相应对象创建完成
         */
        ArenaMenuView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        ArenaMenuView.prototype.onDestroy = function () {
            this.disposeEvent();
        };
        /**
         * 帧更新
         * @param time
         */
        ArenaMenuView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化事件
         */
        ArenaMenuView.prototype.initEvent = function () {
            // 基本事件
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnChallenge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChallenge, this);
            this.btnRanking.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRanking, this);
            this.btnShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnShop, this);
            this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRule, this);
            this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.btnRankReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRankReward, this);
            this.imgChest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_imgChest, this);
            this.imgBg.mask = this.imgBgMask;
        };
        /**
         * 回收事件
         */
        ArenaMenuView.prototype.disposeEvent = function () {
            // 基本事件
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnChallenge.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChallenge, this);
            this.btnRanking.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRanking, this);
            this.btnShop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnShop, this);
            this.btnRule.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRule, this);
            this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.btnRankReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRankReward, this);
            this.imgChest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_imgChest, this);
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        ArenaMenuView.prototype.onAddToStage = function (e) {
        };
        /**
         * 响应从舞台删除
         * @param e
         */
        ArenaMenuView.prototype.onRemoveFromStage = function (e) {
        };
        /**
         * 初始化UI文字
         */
        ArenaMenuView.prototype.initGuiText = function () {
            this.labTextRule.text = Template.getGUIText("ui_arena1");
            this.labTextReward.text = Template.getGUIText("ui_arena16");
            this.labTextChallenge.text = Template.getGUIText("ui_arena17");
            this.labTextRanking.text = Template.getGUIText("ui_arena18");
            this.labTextShop.text = Template.getGUIText("ui_arena19");
            this.labMyTip.text = Template.getGUIText("ui_arena10");
            this.labTextRankReward.text = "每日奖励";
        };
        /**
         * 打开界面
         */
        ArenaMenuView.prototype.open = function () {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            Common.playStackAni(undefined, [this.btnInfo, this.btnChallenge, this.btnRanking]);
            this.initView();
            this.initAlarm();
            this.playInitAni();
        };
        /**
         * 关闭界面
         */
        ArenaMenuView.prototype.close = function () {
            // 关闭当前界面
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeViewEx(this);
                layer.destoryView(ArenaMenuView);
            }
        };
        /**
         * 刷新界面
         */
        ArenaMenuView.prototype.refresh = function () {
            this.initView();
        };
        /**
         * 刷新红点
         */
        ArenaMenuView.prototype.initAlarm = function () {
            this.imgRewardNew.visible = Singleton.Get(ArenaManager).checkAnyRewardAvaliable();
        };
        /**
         * 初始化界面数据
         */
        ArenaMenuView.prototype.initView = function () {
            // 我的排名
            var my_rank = Singleton.Get(ArenaManager).getMyCurRank();
            // 当前排名奖励
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
            // my_rank, my_reward_diamond, my_reward_point
            // 玩家个人信息
            this.labMyRank.text = my_rank.toString();
            this.labMyDiamond.text = "x" + my_reward_diamond.toString();
            this.labMyPoint.text = "x" + my_reward_point.toString();
        };
        // endregion
        // region 响应按钮点击
        /**
         * 响应点击规则按钮
         * @param e
         */
        ArenaMenuView.prototype.onClick_btnRule = function (e) {
            UtilsEffect.buttonEffect(this.btnRule, function () {
                Singleton.Get(LayerManager).addPopup(ui.ArenaRulePanelView);
            }, this);
        };
        /**
         * 响应点击奖励按钮
         * @param e
         */
        ArenaMenuView.prototype.onClick_btnReward = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnReward, function () {
                if (Singleton.Get(GuideManager).CouldYouPleaseWaitForMe("ArenaMenuView", "btnReward", _this.onClick_btnReward, _this, e)) {
                    return;
                }
                Singleton.Get(LayerManager).getView(ui.ArenaRewardPanelView).openWith(ui.E_ARENA_REWARD_TAB.RANK);
            }, this);
        };
        /**
         * 响应点击每日奖励按钮
         * @param e
         */
        ArenaMenuView.prototype.onClick_btnRankReward = function (e) {
            UtilsEffect.buttonEffect(this.btnRankReward, function () {
                Singleton.Get(LayerManager).getView(ui.ArenaRewardPanelView).openWith(ui.E_ARENA_REWARD_TAB.DAILY);
            }, this);
        };
        /**
         * 响应点击竞技场挑战
         * @param e
         */
        ArenaMenuView.prototype.onClick_btnChallenge = function (e) {
            var _this = this;
            Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open(DEFINE.SYNC_LOADING_DURATION);
            UtilsEffect.buttonEffect(this.btnChallenge, function () {
                ResManager.getResAsync("BG_paihang_png", function () {
                    Singleton.Get(LayerManager).getView(ui.SyncLoadingView).cancleOpen();
                    Singleton.Get(LayerManager).getView(ui.ArenaBaseView).openEnemyListPanel();
                }, _this);
            }, this);
        };
        /**
         * 响应点击竞技场排行
         * @param e
         */
        ArenaMenuView.prototype.onClick_btnRanking = function (e) {
            UtilsEffect.buttonEffect(this.btnRanking, function () {
                if (!OpenManager.CheckOpenWithInfo(OpenType.Rank)) {
                    return;
                }
                Singleton.Get(LayerManager).getView(ui.ArenaBaseView).close();
                Singleton.Get(LayerManager).getView(ui.RankView).return_to_arena = true;
                Singleton.Get(LayerManager).getView(ui.RankView).open(RankListType.ARENA);
            }, this);
        };
        /**
         * 响应点击竞技场商店
         * @param e
         */
        ArenaMenuView.prototype.onClick_btnShop = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnShop, function () {
                if (!ShopUtil.isShopUnlocked(3)) {
                    return;
                }
                var shop = Template.shop.get(3); // TODO JJC商店id读表
                Singleton.Get(LayerManager).getView(ui.ShopListView).open(shop, false, function () {
                    Singleton.Get(LayerManager).getView(ui.ArenaBaseView).open();
                }, _this);
                Singleton.Get(LayerManager).getView(ui.ArenaBaseView).close();
            }, this);
        };
        /**
         * 响应点击角色乳房
         * @param e
         */
        ArenaMenuView.prototype.onClick_imgChest = function (e) {
            this.playWobbler();
        };
        // endregion
        // region 特殊效果
        /**
         * 播放立绘乳摇
         */
        ArenaMenuView.prototype.playWobbler = function () {
            var tw = egret.Tween.get(this.imgChest);
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 80);
            tw.to({ scaleX: 1, scaleY: 1 }, 80).call(function (obj) { if (obj)
                egret.Tween.removeTweens(obj), obj; });
            // UtilsEffect.buttonEffect(this.imgChest);
            /**
            let tw: egret.Tween = egret.Tween.get(this.imgChest);
            tw.to({scaleX: 1.12, scaleY: 1.16, rotation: 8, skewX: -6, skewY: 0}, 90)
                .to({scaleX: 0.98, scaleY: 0.96, rotation: -8, skewX: 6, skewY: 3}, 90)
                .to({scaleX: 1.04, scaleY: 1.1, rotation: 3, skewX: -2, skewY: 0}, 65)
                .to({scaleX: 0.99, scaleY: 0.98, rotation: -3, skewX: 2, skewY: 1}, 65)
                .to({scaleX: 1, scaleY: 1, skewX: 0, skewY: 0}, 30);
             **/
        };
        ArenaMenuView.prototype.playInitAni = function () {
            var _this = this;
            this.groupStand.alpha = 0;
            this.groupStand.x = 140;
            var tw_stand = egret.Tween.get(this.groupStand);
            tw_stand.wait(80).to({ x: 205, alpha: 1 }, 250, egret.Ease.sineOut).call(function () {
                _this.playWobbler();
            }, this);
            this.imgBg.alpha = 1;
            this.imgBg.scaleX = 1.4;
            this.imgBg.scaleY = 1.4;
            var tw_bg = egret.Tween.get(this.imgBg);
            tw_bg.to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.sineOut);
        };
        return ArenaMenuView;
    }(BaseUI));
    ui.ArenaMenuView = ArenaMenuView;
    __reflect(ArenaMenuView.prototype, "ui.ArenaMenuView");
})(ui || (ui = {}));
//# sourceMappingURL=ArenaMenuView.js.map