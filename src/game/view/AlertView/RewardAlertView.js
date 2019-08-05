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
    var RewardAlertView = (function (_super) {
        __extends(RewardAlertView, _super);
        /**
         * 构造函数
         */
        function RewardAlertView() {
            var _this = _super.call(this, "yw.RewardAlertSkin") || this;
            _this.m_groupRoot_height = [314, 420, 474];
            _this.m_imgBg_height = [234, 340, 394];
            _this.m_listReward_height = [100, 206, 260];
            _this.m_btnHandler_y = [244, 350, 404];
            return _this;
        }
        /**
         * 响应子元素创建
         */
        RewardAlertView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 响应组件生成
         */
        RewardAlertView.prototype.componentCreated = function () {
            this.init();
        };
        /**
         * 初始化
         */
        RewardAlertView.prototype.init = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
            this.dgReward.itemRenderer = ui.RewardItemIcon;
        };
        /**
         * 销毁
         */
        RewardAlertView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        /**
         * 帧更新
         * @param time
         */
        RewardAlertView.prototype.onUpdate = function (time) {
        };
        /**
         * 打开界面
         */
        RewardAlertView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            // this.groupRoot.alpha = 0;
            // let tw: egret.Tween = egret.Tween.get(this.groupRoot);
            // tw.to({ alpha: 1 }, 150);
            var guide_mgr = Singleton.Get(GuideManager);
            if (guide_mgr.is_task_update_enable) {
                guide_mgr.is_task_update_enable = false;
            }
        };
        /**
         * 关闭界面
         */
        RewardAlertView.prototype.close = function () {
            // this.groupRoot.alpha = 1;
            // let tw: egret.Tween = egret.Tween.get(this.groupRoot);
            // tw.to({ alpha: 0 }, 100).call(() => {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            // });
            // 如果引导检查处于关闭状态 重启引导检查
            var guide_mgr = Singleton.Get(GuideManager);
            if (!guide_mgr.is_task_update_enable) {
                guide_mgr.is_task_update_enable = true;
                guide_mgr.onTaskUpdate();
            }
        };
        /**
         * 初始化内容,特殊的物品没法统一处理。。。
         */
        RewardAlertView.prototype.initContent = function (title, exp, gold, diamond, items, dusty) {
            var _this = this;
            this.labTitle.text = title;
            this.labTitleGrey.text = title;
            var ds_list_rewards = [];
            this.dgReward.dataProvider = new eui.ArrayCollection(ds_list_rewards);
            var item_type_count = 0;
            // 经验
            if (exp && exp != 0) {
                ds_list_rewards.push({
                    idx: item_type_count,
                    item_id: 0,
                    imgTier: DEFINE.UI_ALERT_INFO.exp.tierPNG,
                    icon: DEFINE.UI_ALERT_INFO.exp.resPNG,
                    item_count: exp,
                    item_name: DEFINE.UI_ALERT_INFO.exp.name,
                });
                item_type_count++;
            }
            // 金币
            if (gold && gold != 0) {
                ds_list_rewards.push({
                    idx: item_type_count,
                    item_id: 0,
                    imgTier: DEFINE.UI_ALERT_INFO.gold.tierPNG,
                    icon: DEFINE.UI_ALERT_INFO.gold.resPNG,
                    item_count: gold,
                    item_name: DEFINE.UI_ALERT_INFO.gold.name,
                });
                item_type_count++;
            }
            // 钻石
            if (diamond && diamond != 0) {
                ds_list_rewards.push({
                    idx: item_type_count,
                    item_id: 0,
                    imgTier: DEFINE.UI_ALERT_INFO.diamond.tierPNG,
                    icon: DEFINE.UI_ALERT_INFO.diamond.resPNG,
                    item_count: diamond,
                    item_name: DEFINE.UI_ALERT_INFO.diamond.name,
                });
                item_type_count++;
            }
            // 道具
            if (items && items.size() != 0 || diamond > 0) {
                items.foreachKey(function (key) {
                    var it = Template.item.get(key);
                    if (it == undefined) {
                        return;
                    }
                    ds_list_rewards.push({
                        idx: item_type_count,
                        item_id: key,
                        // imgTier: Common.getItemTierBgRes(it.iStar),  /// 暂用
                        item_count: items.get(key),
                    });
                    item_type_count++;
                    // Singleton.Get(DialogControler).showString("获得了物品\r\n[Id] " + key + ",[数量]" + items[key] + "。"); // 不应该显示该数量
                }, this);
            }
            // 自适应高度
            var height_idx = 0;
            if (item_type_count <= 4) {
                height_idx = 0;
            }
            else if (item_type_count <= 8) {
                height_idx = 1;
            }
            else {
                height_idx = 2;
                for (var i = 0; i < ds_list_rewards.length; i++) {
                    ds_list_rewards[i].idx = -1;
                }
            }
            this.imgBg.height = this.m_imgBg_height[height_idx];
            this.groupRoot.height = this.m_groupRoot_height[height_idx];
            this.groupItems.height = this.m_listReward_height[height_idx];
            this.dgReward.height = this.m_listReward_height[height_idx];
            this.groupItems.validateNow();
            this.dgReward.validateNow();
            this.btnHandler.y = this.m_btnHandler_y[height_idx];
            this.btnHandler.alpha = 0;
            var tw = egret.Tween.get(this.btnHandler);
            tw.wait(80).to({ alpha: 1 }, 200).call(function () {
                egret.Tween.removeTweens(_this.btnHandler);
            });
            this.setDusty(false);
        };
        RewardAlertView.prototype.setDusty = function (dusty) {
            this.groupTitleColorful.visible = !dusty;
            this.groupTitleGrey.visible = dusty;
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        RewardAlertView.prototype.onAddToStage = function (e) {
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        RewardAlertView.prototype.onRemoveFromStage = function (e) {
        };
        /**
         * 响应点击事件
         * @param e
         */
        RewardAlertView.prototype.onClick_btnHandler = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnHandler, function () {
                _this.close();
                Singleton.Get(LayerManager).getView(ui.PrivLvgiftView).tryAutoOpen();
            }, this);
        };
        return RewardAlertView;
    }(PopupUI));
    ui.RewardAlertView = RewardAlertView;
    __reflect(RewardAlertView.prototype, "ui.RewardAlertView");
})(ui || (ui = {}));
//# sourceMappingURL=RewardAlertView.js.map