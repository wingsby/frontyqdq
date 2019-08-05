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
    var WishLevelupView = (function (_super) {
        __extends(WishLevelupView, _super);
        function WishLevelupView() {
            return _super.call(this, "yw.WishLevelupSkin") || this;
        }
        WishLevelupView.prototype.componentCreated = function () {
            this.labTitle.text = Template.getGUIText("ui_ex_wish_1");
            this.btnUpItem.text = Template.getGUIText("ui_wish13");
            this.btnUpOnekey.text = Template.getGUIText("ui_wish14");
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnUpItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnUpItem, this);
            this.btnUpOnekey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnUpOnekey, this);
            this.groupSuccess.visible = false;
        };
        WishLevelupView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnUpItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnUpItem, this);
            this.btnUpOnekey.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnUpOnekey, this);
        };
        WishLevelupView.prototype.onUpdate = function (time) {
        };
        WishLevelupView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initView();
            this.playInitAni();
        };
        WishLevelupView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
            if (layer.isViewOnStage(layer.getView(ui.WishView))) {
                layer.getView(ui.WishView).refresh();
            }
        };
        WishLevelupView.prototype.refresh = function () {
            this.initView();
        };
        WishLevelupView.prototype.initView = function () {
            var info = Singleton.Get(WishManager).getInfo();
            // 许愿基本信息
            var wish_lv = info.lv; // 当前许愿等级
            var wish_chip = Template.config.WishChip; // 许愿一次能够获得的碎片数量
            // 获取许愿等级信息
            var cfg_wish = Template.wish.get(wish_lv);
            if (!cfg_wish) {
                return;
            }
            // 升级经验
            var need_exp = cfg_wish.Exp; // 下级所需经验值
            var cur_exp = info.exp; // 当前经验值
            var pct_exp = cur_exp / need_exp * 100; // 升级进度百分比
            // 能量相关信息
            var cur_stamina = info.stamina; // 当前剩余能量
            var max_stamina = cfg_wish.WishMax; // 最大能量
            var pct_stamina = cur_stamina / max_stamina * 100; // 剩余能量百分比
            // 显示许愿当前级信息
            this.labWishLv.text = UtilsGame.stringHander(Template.getGUIText("ui_wish9"), wish_lv);
            this.progExp.value = pct_exp;
            this.labProg.text = UtilsGame.stringHander(Template.getGUIText("ui_wish11"), cur_exp, need_exp);
            // 获取下级许愿信息
            var cfg_wish_next = Template.wish.get(wish_lv + 1);
            // 下级能量效果
            var wish_lv_next = cfg_wish_next ? wish_lv + 1 : wish_lv; // 下一许愿等级
            var max_stamina_next = cfg_wish_next ? cfg_wish_next.WishMax : max_stamina; // 下级能量上限
            var stamina_recover = cfg_wish.WishRe; // 下级恢复能量
            this.labWishLvCur.text = UtilsGame.stringHander(Template.getGUIText("ui_wish9"), wish_lv);
            this.labWishStaCur.text = UtilsGame.stringHander(Template.getGUIText("ui_wish15"), max_stamina);
            this.labWishLvNext.text = UtilsGame.stringHander(Template.getGUIText("ui_wish9"), wish_lv_next);
            this.labWishStaNext.text = UtilsGame.stringHander(Template.getGUIText("ui_wish15"), max_stamina_next);
            this.labAttr.text = UtilsGame.stringHander(Template.getGUIText("ui_wish16"), stamina_recover);
            // 最大等级处理
            if (!cfg_wish_next) {
                this.imgMax.visible = true;
                this.btnUpOnekey.visible = false;
                this.btnUpItem.visible = false;
                this.labAttr.visible = false;
                return;
            }
            else {
                this.imgMax.visible = false;
                this.btnUpOnekey.visible = true;
                this.btnUpItem.visible = true;
                this.labAttr.visible = true;
            }
            // 消耗道具信息
            var item_id = Template.config.WishItem;
            var cfg_item = Template.item.get(item_id);
            if (!cfg_item) {
                console.error("wish item isn't exist: " + item_id);
                return;
            }
            var cost_num = 1;
            var item_enough = Singleton.Get(BagManager).hasEnough(item_id, cost_num);
            this.btnUpItem.icon = cfg_item.iIcon;
            this.btnUpItem.cost = Singleton.Get(BagManager).getItemCount(item_id) + "/" + cost_num;
            this.btnUpItem.enough = item_enough;
            var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
            var need_vip = Template.config.WishVip;
            if (my_vip >= need_vip) {
                // 指定VIP等级玩家道具不足时可用钻石升级
                if (!item_enough) {
                    this.btnUpItem.icon = DEFINE.UI_ALERT_INFO.diamond.res;
                    this.btnUpItem.cost = Template.config.WishUpNum.toString();
                    this.btnUpItem.enough = Singleton.Get(PlayerInfoManager).getDiamond() >= Template.config.WishUpNum;
                }
                // VIP可用直升一级
                this.btnUpOnekey.visible = true;
                this.btnUpOnekey.icon = DEFINE.UI_ALERT_INFO.diamond.res;
                this.btnUpOnekey.cost = info.getOnekeyLvupDiamondPrice().toString();
                this.btnUpOnekey.enough = Singleton.Get(PlayerInfoManager).getDiamond() >= info.getOnekeyLvupDiamondPrice();
                // 有直升一级 居右
                this.btnUpItem.horizontalCenter = 118;
            }
            else {
                // 隐藏直升一级
                this.btnUpOnekey.visible = false;
                // 无直升一级 居中
                this.btnUpItem.horizontalCenter = 0;
            }
        };
        WishLevelupView.prototype.playInitAni = function () {
            egret.Tween.removeTweens(this.imgTrans);
            this.imgTrans.alpha = 0;
            this.imgTrans.x = 176;
            var tw_trans = egret.Tween.get(this.imgTrans);
            tw_trans.to({ x: 204, alpha: 1 }, 300, egret.Ease.sineOut);
        };
        WishLevelupView.prototype.playLevelup = function () {
            var _this = this;
            egret.Tween.removeTweens(this.groupSuccess);
            this.groupSuccess.visible = true;
            this.groupSuccess.alpha = 0;
            var tw = egret.Tween.get(this.groupSuccess);
            tw.to({ alpha: 1 }, 160).wait(1200).to({ alpha: 0 }, 160).call(function () {
                _this.groupSuccess.visible = false;
            }, this);
        };
        // region 按钮点击事件
        WishLevelupView.prototype.onClick_btnUpItem = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnUpItem, function () {
                var cost_num = 1;
                var item_id = Template.config.WishItem;
                var item_enough = Singleton.Get(BagManager).hasEnough(item_id, cost_num);
                var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
                var need_vip = Template.config.WishVip;
                if (item_enough) {
                    Singleton.Get(WishManager).reqLvupItem(function () {
                        _this.initView();
                    }, _this);
                }
                else {
                    // 道具数量不足
                    if (my_vip >= need_vip) {
                        // VIP等级足够可用钻石支付
                        Singleton.Get(WishManager).reqLvupDiamond(function () {
                            _this.initView();
                        }, _this);
                    }
                    else {
                        // 道具不足 VIP等级也不够
                        _this.close();
                        Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(Template.config.WishItem);
                    }
                }
            }, this);
        };
        WishLevelupView.prototype.onClick_btnUpOnekey = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnUpOnekey, function () {
                var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
                var need_diamond = Singleton.Get(WishManager).getInfo().getOnekeyWishStaminaPrice();
                if (my_diamond < need_diamond) {
                    Singleton.Get(DialogControler).showInfo(1005, _this, function () {
                        Singleton.Get(LayerManager).getView(ui.PayView).open();
                    });
                    return;
                }
                Singleton.Get(DialogControler).showInfo(1191, _this, function () {
                    Singleton.Get(WishManager).reqLvupOnekey(function () {
                        _this.initView();
                    }, _this);
                }, function () {
                    console.log("WishLevelupView onClick_btnUpOnekey() user cancled.");
                }, Singleton.Get(WishManager).getInfo().getOnekeyLvupDiamondPrice());
            }, this);
        };
        WishLevelupView.prototype.onClick_btnClose = function () {
            this.close();
        };
        return WishLevelupView;
    }(PopupUI));
    ui.WishLevelupView = WishLevelupView;
    __reflect(WishLevelupView.prototype, "ui.WishLevelupView");
})(ui || (ui = {}));
//# sourceMappingURL=WishLevelupView.js.map