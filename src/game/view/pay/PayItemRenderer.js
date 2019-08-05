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
    var PayItemRenderer = (function (_super) {
        __extends(PayItemRenderer, _super);
        function PayItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.PayItemRendererSkin";
            _this.horizontalCenter = 0;
            return _this;
        }
        PayItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.payClickHander, this);
        };
        PayItemRenderer.prototype.dataChanged = function () {
            this.pay = this.data;
            this.lb_price.text = "￥" + this.pay.monetaryAmount;
            if (this.pay.award > 0) {
                this.lb_otherdiamod.text = "送" + this.pay.award + "钻";
            }
            else {
                this.lb_otherdiamod.text = "";
            }
            if (this.pay.type < 3) {
                // 月卡终身卡
                this.g_double.visible = false;
                this.lb_diamod.text = this.pay.name;
            }
            else {
                // 已首冲不显示双倍
                var finish_first = Singleton.Get(PrivManager).getInfo().finishedFirstPay(this.pay.itemId);
                this.g_double.visible = !finish_first;
                this.lb_diamod.text = "x " + this.pay.diamondsNum;
            }
            ResManager.AsyncSetTexture(this.img_icon, this.pay.icon + "_png");
        };
        PayItemRenderer.prototype.payClickHander = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.img_icon, function () {
                var priv = Singleton.Get(PrivManager);
                if (priv.isClickEnable()) {
                    priv.setLastPayClick();
                    var loginM = Singleton.Get(login.LoginDataManager);
                    if (loginM.loginData) {
                        // 判断平台
                        switch (loginM.loginData.pid) {
                            case I_Platform.p_wanba:
                                Singleton.Get(DialogControler).showInfo(1213, _this, function () {
                                    Singleton.Get(PlatformSDK).Pay(_this.pay.itemId);
                                }, function () { }, _this.pay.name, _this.pay.monetaryAmount * 10);
                                break;
                            default:
                                Singleton.Get(PlatformSDK).Pay(_this.pay.itemId);
                                break;
                        }
                    }
                }
                else {
                }
            }, this);
        };
        return PayItemRenderer;
    }(eui.ItemRenderer));
    ui.PayItemRenderer = PayItemRenderer;
    __reflect(PayItemRenderer.prototype, "ui.PayItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=PayItemRenderer.js.map