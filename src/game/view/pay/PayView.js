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
    /**
     * 测试用
     */
    var PayView = (function (_super) {
        __extends(PayView, _super);
        function PayView() {
            return _super.call(this, "yw.PaySKin") || this;
        }
        /**创建界面时执行*/
        PayView.prototype.componentCreated = function () {
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Hander, this);
            this.btn_vip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Hander, this);
            this.arry = new eui.ArrayCollection();
            this.arrylist = new eui.ArrayCollection();
            this.dg_viplist.dataProvider = this.arry;
            this.dg_viplist.itemRenderer = ui.PayItemRenderer;
            this.dg_paylist.dataProvider = this.arrylist;
            this.dg_paylist.itemRenderer = ui.PayItemRenderer;
            this.refresh();
        };
        PayView.prototype.onClick_Hander = function (e) {
            if (e.currentTarget == this.btn_back) {
                this.close();
            }
            else if (e.currentTarget == this.btn_vip) {
                this.close();
                Singleton.Get(ui.VipView).open();
            }
        };
        PayView.prototype.showLs = function () {
            var loginM = Singleton.Get(login.LoginDataManager);
            if (!loginM.loginData) {
                return;
            }
            var ls = loginM.loginData.shops;
            var card_source = [];
            for (var i = 0; i < ls.length; i++) {
                if (ls[i].type < 3) {
                    // 已购买终生卡 不显示
                    if (ls[i].type == 2 && Singleton.Get(PrivManager).getInfo().has_lifetime_card) {
                        continue;
                    }
                    card_source.push(ls[i]);
                }
            }
            this.arry.source = card_source;
            this.arry.refresh();
            var cfg_pays = Template.payItem;
            var item_source = [];
            for (var i = 0; i < cfg_pays.length; i++) {
                var cfg_pay = cfg_pays[i];
                if (cfg_pay.type != E_PayType.ROME) {
                    continue;
                }
                item_source.push(cfg_pay);
            }
            item_source.sort(function (a, b) {
                if (a.monetaryAmount > b.monetaryAmount) {
                    return 1;
                }
                else if (a.monetaryAmount < b.monetaryAmount) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            this.arrylist.source = item_source;
            this.arrylist.refresh();
        };
        PayView.prototype.open = function () {
            Singleton.Get(PopupManager).addPopup(this);
            this.refresh();
        };
        /**
         * 响应点击关闭按钮
         */
        PayView.prototype.close = function () {
            Singleton.Get(PopupManager).removePopup(this);
        };
        /**销毁界面时执行*/
        PayView.prototype.onDestroy = function () {
            this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Hander, this);
            this.btn_vip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Hander, this);
        };
        /**更新UI */
        PayView.prototype.onUpdate = function (time) {
        };
        /**
         * 更新UI
         */
        PayView.prototype.refresh = function () {
            this.showLs();
        };
        return PayView;
    }(PopupUI));
    ui.PayView = PayView;
    __reflect(PayView.prototype, "ui.PayView");
})(ui || (ui = {}));
//# sourceMappingURL=PayView.js.map