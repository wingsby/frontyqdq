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
    var VipView = (function (_super) {
        __extends(VipView, _super);
        function VipView() {
            var _this = _super.call(this, "yw.VipSkin") || this;
            ////////////////////////////exml2class:结束替换声明区域///////////////////////////////
            _this.curSelectVip = 0;
            // private vipPressMask: egret.Shape;
            _this.arrayaward = new eui.ArrayCollection();
            return _this;
        }
        /**创建界面时执行*/
        VipView.prototype.componentCreated = function () {
            this.labBuy.text = Template.getGUIText("ui_ex_vip_8");
            this.labPay.text = Template.getGUIText("ui_ex_vip_7");
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHander, this);
            this.btn_pay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHander, this);
            this.btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHander, this);
            this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHander, this);
            this.btn_buygift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHander, this);
            this.maxVipLv = Template.vip.size() - 1;
            // 顶部图片mask
            /**
            this.vipPressMask = UtilsGame.createMask(this.img_press);
            this.img_press.parent.addChild(this.vipPressMask);
            this.vipPressMask.x = this.img_press.x;
            this.vipPressMask.y = this.img_press.y;
            this.img_press.mask = this.vipPressMask;
             */
            this.g_award.dataProvider = this.arrayaward;
            this.g_award.itemRenderer = ui.VipAwardItemRenderer;
            this.curSelectVip = Singleton.Get(PlayerInfoManager).getVipLevel();
            this.initVipInfo();
            this.updateSelfVip();
        };
        VipView.prototype.btnOnClickHander = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(e.currentTarget);
            switch (e.currentTarget) {
                case this.btn_pay:
                    this.close();
                    Singleton.Get(ui.PayView).open();
                    break;
                case this.btn_right:
                    UtilsEffect.buttonEffect(this.btn_right);
                    if (this.curSelectVip >= this.maxVipLv) {
                        this.curSelectVip = 0;
                    }
                    else {
                        this.curSelectVip++;
                    }
                    this.initVipInfo();
                    break;
                case this.btn_left:
                    UtilsEffect.buttonEffect(this.btn_left);
                    if (this.curSelectVip <= 0)
                        this.curSelectVip = this.maxVipLv;
                    else
                        this.curSelectVip--;
                    this.initVipInfo();
                    break;
                case this.btn_buygift:
                    UtilsEffect.buttonEffect(this.btn_buygift);
                    var info_mgr = Singleton.Get(PlayerInfoManager);
                    var vip = Template.vip.get(this.curSelectVip);
                    var my_vip = info_mgr.getVipLevel();
                    if (my_vip < vip.ID) {
                        Singleton.Get(DialogControler).showInfo(1129);
                        return;
                    }
                    // 钻石的判断由服务端处理
                    Singleton.Get(PrivManager).reqVipGift(this.curSelectVip, function () {
                        // this.updateSelfVip();
                        _this.initVipInfo();
                    }, this);
                    break;
                case this.btn_back:
                    this.close();
                    break;
                default:
                    break;
            }
        };
        /**
         * 更新自己VIP信息
         */
        VipView.prototype.updateSelfVip = function () {
            // 临时数据
            var info_mgr = Singleton.Get(PlayerInfoManager);
            var cur_vip = info_mgr.getVipLevel();
            var cur_pay = info_mgr.getAccRmb();
            var vip = Template.vip.get(cur_vip);
            this.lb_vipLv.text = cur_vip.toString();
            var vip_next = Template.vip.get(cur_vip + 1);
            if (vip_next != undefined) {
                var press = cur_pay / vip.Rmb;
                if (press > 1) {
                    press = 1;
                }
                // this.vipPressMask.x = this.img_press.x - (1 - press) * this.img_press.width;
                this.img_press.width = 180 * press;
                this.lb_press.text = cur_pay + "/" + vip.Rmb;
                this.lb_pressDesc.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_vip_1"), vip.Rmb - cur_pay, vip.ID + 1);
            }
            else {
                this.img_press.width = 180;
                this.lb_press.text = "" + cur_pay;
                this.lb_pressDesc.text = Template.getGUIText("ui_ex_vip_2");
            }
        };
        VipView.prototype.initVipInfo = function () {
            var _this = this;
            var vip = Template.vip.get(this.curSelectVip);
            this.lb_viptitle.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_vip_3"), vip.ID);
            this.lb_vipdesc.textFlow = (new egret.HtmlTextParser).parser(Template.getGUIText(vip.Txt));
            this.scroller_vipdesc.viewport.scrollV = 0;
            this.lb_vipgiftDesc.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_vip_4"), vip.ID);
            this.lb_priPrice.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_vip_5"), vip.OriginalCost);
            this.lb_newPrice.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_vip_6"), vip.Cost);
            // 礼包道具
            this.arrayaward.removeAll();
            vip.ItemId.forEach(function (value, index) {
                _this.arrayaward.addItem({ id: value, num: vip.ItemNum[index] });
            });
            if (vip.Diamonds > 0) {
                this.arrayaward.addItem({ id: 0, num: vip.Diamonds });
            }
            if (vip.Money > 0) {
                this.arrayaward.addItem({ id: 1, num: vip.Money });
            }
            this.arrayaward.refresh();
            // 已购买后隐藏购买按钮 显示已购买
            var info_mgr = Singleton.Get(PlayerInfoManager);
            var gift_wasted = info_mgr.checkVipGiftWasted(this.curSelectVip);
            this.btn_buygift.visible = !gift_wasted;
            this.imgGiftNew.visible = !gift_wasted && (info_mgr.getVipLevel() >= this.curSelectVip);
            this.lb_vipgiftWasted.text = Template.getGUIText("ui_ex_vip_9");
            this.lb_vipgiftWasted.visible = gift_wasted;
            this.imgLeftNew.visible = this.isVipGiftAvailable(0, this.curSelectVip - 1);
            this.imgRightNew.visible = this.isVipGiftAvailable(this.curSelectVip + 1, Template.vip.values[Template.vip.values.length - 1].ID);
        };
        VipView.prototype.onDestroy = function () {
            this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHander, this);
            this.btn_pay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHander, this);
            this.btn_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHander, this);
            this.btn_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHander, this);
            this.btn_buygift.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHander, this);
        };
        VipView.prototype.onUpdate = function (time) { };
        VipView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            // 开界面时初始化一次
            this.curSelectVip = Singleton.Get(PlayerInfoManager).getVipLevel();
            this.initVipInfo();
            this.updateSelfVip();
        };
        VipView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        VipView.prototype.isVipGiftAvailable = function (min, max) {
            if (max < min) {
                return false;
            }
            var info_mgr = Singleton.Get(PlayerInfoManager);
            var my_vip = info_mgr.getVipLevel();
            for (var i = min; i <= max; i++) {
                if (my_vip < i) {
                    continue;
                }
                if (!info_mgr.checkVipGiftWasted(i)) {
                    return true;
                }
            }
            return false;
        };
        return VipView;
    }(PopupUI));
    ui.VipView = VipView;
    __reflect(VipView.prototype, "ui.VipView");
})(ui || (ui = {}));
//# sourceMappingURL=VipView.js.map