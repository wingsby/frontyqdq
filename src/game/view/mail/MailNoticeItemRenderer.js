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
    var MailNoticeItemRenderer = (function (_super) {
        __extends(MailNoticeItemRenderer, _super);
        function MailNoticeItemRenderer() {
            var _this = _super.call(this) || this;
            ////////////////////////////exml2class:结束替换声明区域///////////////////////////////
            _this.m_mail = null;
            _this.skinName = "yw.MailNoticeItemRendererSkin";
            _this.verticalCenter = 0;
            return _this;
        }
        MailNoticeItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        MailNoticeItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var mail = this.data.mail;
            this.m_mail = mail;
            if (mail) {
                this.lb_title.text = mail.getMailTitle();
                this.lb_content.textFlow = (new egret.HtmlTextParser).parser(mail.getMailContent());
                this.img_new.visible = !mail.isRead();
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
            }
        };
        MailNoticeItemRenderer.prototype.onClick = function (e) {
            this.img_new.visible = false;
            Singleton.Get(LayerManager).getView(ui.NoticeView).open(this.m_mail);
            Singleton.Get(MailManager).readMail(this.m_mail.m_id);
            Singleton.Get(LayerManager).getView(ui.MailView).refreshTabNew();
            Singleton.Get(LayerManager).getView(ui.MainView).menu2.refreshBtnMailNew();
        };
        return MailNoticeItemRenderer;
    }(eui.ItemRenderer));
    ui.MailNoticeItemRenderer = MailNoticeItemRenderer;
    __reflect(MailNoticeItemRenderer.prototype, "ui.MailNoticeItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=MailNoticeItemRenderer.js.map