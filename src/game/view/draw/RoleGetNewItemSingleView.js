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
    var RoleGetNewItemSingleView = (function (_super) {
        __extends(RoleGetNewItemSingleView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleGetNewItemSingleView() {
            var _this = _super.call(this, "yw.RoleGetNewItemSingleSkin") || this;
            //this.touchEnabled = true;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleGetNewItemSingleView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleGetNewItemSingleView.prototype.onDestroy = function () {
        };
        /**
         * 帧更新
         * @param time
         */
        RoleGetNewItemSingleView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleGetNewItemSingleView.prototype.init = function () {
            this.btn_close.text = Template.getGUIText("info1");
            this.btn_again.text = Template.getGUIText("ui_card4");
            this.item_list.itemRenderer = ui.ItemBtnWithNameView;
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn_Again, this);
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleGetNewItemSingleView.prototype.open = function (item_id, item_count, type) {
            if (type === void 0) { type = DrawCardType.Item; }
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.draw_type = type;
            this.initInfo(item_id, item_count);
        };
        /**
         * 关闭本界面
         */
        RoleGetNewItemSingleView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
        };
        // endregion
        // region 填充数据
        RoleGetNewItemSingleView.prototype.initInfo = function (item_id, item_count) {
            var i_cfg = Template.item.get(item_id);
            if (!i_cfg) {
                console.log("No Item id " + item_id);
            }
            // 只有4星以上斗士碎片显示边框特效
            var eff = undefined;
            if (i_cfg.iType == ItemType.RoleFragment) {
                if (i_cfg.iStar >= 4) {
                    eff = DEFINE.EFF_ITEM_FRAME_TOP;
                }
            }
            var data = [];
            this.item_list.dataProvider = new eui.ArrayCollection(data);
            ui.ItemBtnWithNameView.fillItem(item_id, item_count, data, eff, undefined);
            this.refreshAgain();
            this.initEffect();
        };
        /**
         * 初始化特效
         */
        RoleGetNewItemSingleView.prototype.initEffect = function () {
            this.playEffectBack(this.mcItemBack);
            this.playEffectFront(this.mcItemFront);
        };
        RoleGetNewItemSingleView.prototype.playEffectBack = function (mc) {
            mc.visible = true;
            mc.clearMovieClip();
            mc.setMovieClip("ui_ten");
            mc.gotoAndPlay("ui_ten", 1);
        };
        RoleGetNewItemSingleView.prototype.playEffectFront = function (mc) {
            mc.visible = true;
            mc.clearMovieClip();
            mc.setMovieClip("ui_ten1");
            mc.gotoAndPlay("ui_ten1", 1);
        };
        RoleGetNewItemSingleView.prototype.refreshAgain = function () {
            switch (this.draw_type) {
                case DrawCardType.Item:
                    {
                        var item = Template.item.get(Template.config.CardItem[0]);
                        this.btn_again.icon = item.iIcon;
                        var scroll_info = Singleton.Get(ScrollManager).getScroll(DrawCardManager.FREE_ITEM_SCROLL_ID);
                        if (scroll_info && scroll_info.count > 0) {
                            var s_cfg = Template.scroll.get(scroll_info.id);
                            // todo 字典
                            this.btn_again.cost = "免费 " + UtilsGame.numberToString(scroll_info.count) + "/" + UtilsGame.numberToString(s_cfg.UpperL);
                            this.btn_again.enough = true;
                        }
                        else {
                            var current_has = Singleton.Get(BagManager).getItemCount(Template.config.CardItem[0]);
                            var one_cost = Template.config.CardItem[1];
                            this.btn_again.cost = UtilsGame.numberToString(current_has) + "/" + UtilsGame.numberToString(one_cost);
                            this.btn_again.enough = current_has >= one_cost;
                        }
                    }
                    break;
                case DrawCardType.Dmd:
                    {
                        var current_has = Singleton.Get(PlayerInfoManager).getDiamond();
                        var one_cost = Template.config.CardDiamonds;
                        var info = Singleton.Get(DrawCardManager).getInfo();
                        var free = true;
                        if (info) {
                            free = PlayerDrawCardInfo.GetCurrentFreeDmd(info);
                        }
                        if (free) {
                            this.btn_again.enough = true;
                            this.btn_again.cost = "免费"; // todo 字典
                        }
                        else {
                            this.btn_again.cost = UtilsGame.numberToString(one_cost);
                            this.btn_again.enough = current_has >= one_cost;
                        }
                        this.btn_again.icon = DEFINE.UI_ALERT_INFO.diamond.res;
                    }
                    break;
                case DrawCardType.Lmt:
                    {
                        var current_has = Singleton.Get(PlayerInfoManager).getDiamond();
                        var one_cost = Template.config.CardLimited;
                        this.btn_again.cost = UtilsGame.numberToString(one_cost);
                        this.btn_again.enough = current_has >= one_cost;
                        this.btn_again.icon = DEFINE.UI_ALERT_INFO.diamond.res;
                    }
                    break;
            }
        };
        RoleGetNewItemSingleView.prototype.onBtn_Again = function () {
            this.close();
            switch (this.draw_type) {
                case DrawCardType.Item:
                    Singleton.Get(DrawCardManager).onReqItemOne();
                    break;
                case DrawCardType.Dmd:
                    Singleton.Get(DrawCardManager).onReqDmdOne();
                    break;
                case DrawCardType.Lmt:
                    Singleton.Get(DrawCardManager).onReqLmtOne();
                    break;
            }
        };
        return RoleGetNewItemSingleView;
    }(PopupUI));
    ui.RoleGetNewItemSingleView = RoleGetNewItemSingleView;
    __reflect(RoleGetNewItemSingleView.prototype, "ui.RoleGetNewItemSingleView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleGetNewItemSingleView.js.map