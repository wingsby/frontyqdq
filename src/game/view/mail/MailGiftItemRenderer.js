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
    var MailGiftItemRenderer = (function (_super) {
        __extends(MailGiftItemRenderer, _super);
        function MailGiftItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.MailGiftItemRendererSkin";
            _this.verticalCenter = 0;
            return _this;
        }
        MailGiftItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.btn_get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGet, this);
        };
        MailGiftItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var mail = this.data.mail;
            this.m_mail = mail;
            if (!mail) {
                return;
            }
            this.btn_get.text = "领取";
            this.lb_title.text = mail.getMailTitle();
            this.lb_content.textFlow = (new egret.HtmlTextParser).parser(mail.getMailContent());
            ResManager.AsyncSetTexture(this.img_gift, mail.getMailEntity().Icon);
            ResManager.AsyncSetTexture(this.img_quality, Common.getItemTierBgRes(mail.getMailEntity().iStar));
            var remain_time = this.m_mail.getRemainingTime();
            if (remain_time <= 1000 * 60 * 60 * 24) {
                this.lb_time.textColor = DEFINE_COLOR.TEXT_ORANGE;
                if (remain_time <= 1000 * 60 * 60) {
                    this.lb_time.text = UtilsGame.timeToStringDate(remain_time);
                }
                else {
                    this.lb_time.text = UtilsGame.timeToHour(remain_time);
                }
            }
            else {
                this.lb_time.textColor = DEFINE_COLOR.TEXT_BLUE;
                this.lb_time.text = UtilsGame.timeToDay(remain_time);
            }
        };
        MailGiftItemRenderer.prototype.onClick_btnGet = function (e) {
            Singleton.Get(MailManager).rewardMail(this.m_mail.m_id, function () {
                Singleton.Get(LayerManager).getView(ui.MailView).menuUpdate(false);
                Singleton.Get(LayerManager).getView(ui.MailView).refreshTabNew();
                Singleton.Get(LayerManager).getView(ui.MainView).menu2.refreshBtnMailNew();
            }, this);
        };
        return MailGiftItemRenderer;
    }(eui.ItemRenderer));
    ui.MailGiftItemRenderer = MailGiftItemRenderer;
    __reflect(MailGiftItemRenderer.prototype, "ui.MailGiftItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=MailGiftItemRenderer.js.map