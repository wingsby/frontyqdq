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
    var MailView = (function (_super) {
        __extends(MailView, _super);
        function MailView() {
            var _this = _super.call(this, "yw.MailSkin") || this;
            _this.curIndex = 0;
            _this.return_to_school = false;
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            return _this;
        }
        /**创建界面时执行*/
        MailView.prototype.componentCreated = function () {
            this.initView();
        };
        MailView.prototype.initView = function () {
            this.btnTap_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
            this.btnTap_0.name = MailType.GIFT + "";
            this.btnTap_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
            this.btnTap_1.name = MailType.NOTIFY + "";
            this.btn_getAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGetAll, this);
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.array_gift = new eui.ArrayCollection();
            this.dg_gift.dataProvider = this.array_gift;
            this.dg_gift.itemRenderer = ui.MailGiftItemRenderer;
            this.scroller_gift.viewport = this.dg_gift;
            this.array_notice = new eui.ArrayCollection();
            this.dg_notice.dataProvider = this.array_notice;
            this.dg_notice.itemRenderer = ui.MailNoticeItemRenderer;
            this.scroller_notice.viewport = this.dg_notice;
        };
        MailView.prototype.updateGiftData = function () {
            var _this = this;
            this.array_gift.source = [];
            Singleton.Get(MailManager).reqList(function () {
                var mails = Singleton.Get(MailManager).getMails();
                var gift_mails = mails.getMailsByTypes([MailType.GIFT, MailType.CUSTOM_GIFT]);
                gift_mails.reverse();
                // console.log("gift_mails");
                // console.log(gift_mails);
                var source_arr = [];
                for (var i = 0; i < gift_mails.length; i++) {
                    // 不显示已过期的邮件
                    if (gift_mails[i].isExpired()) {
                        continue;
                    }
                    source_arr.push({
                        mail: gift_mails[i],
                        parent: _this
                    });
                }
                _this.array_gift.source = source_arr;
                if (source_arr.length > 0) {
                    _this.btnTap_0.isNew = true;
                    Singleton.Get(ui.MainView).menu2.refreshBtnMailNew();
                }
                _this.checkEmpty(source_arr);
            }, this);
        };
        MailView.prototype.updateNoticeData = function () {
            var _this = this;
            this.array_notice.source = [];
            Singleton.Get(MailManager).reqList(function () {
                var mails = Singleton.Get(MailManager).getMails();
                var notice_mails = mails.getMailsByTypes([MailType.NOTIFY, MailType.CUSTOM_NOTIFY]);
                // console.log("notice_mails");
                // console.log(notice_mails);
                notice_mails.reverse();
                var source_arr = [];
                for (var i = 0; i < notice_mails.length; i++) {
                    // 不显示已过期的邮件
                    if (notice_mails[i].isExpired()) {
                        continue;
                    }
                    source_arr.push({
                        mail: notice_mails[i],
                        parent: _this
                    });
                }
                _this.array_notice.source = source_arr;
                if (source_arr.length > 0) {
                    _this.btnTap_1.isNew = true;
                    Singleton.Get(ui.MainView).menu2.refreshBtnMailNew();
                }
                _this.checkEmpty(source_arr);
            }, this);
        };
        /**
         * 更新显示的数据
         */
        MailView.prototype.menuUpdate = function (reset_scroll) {
            if (this.curIndex == MailType.GIFT) {
                this.btnTap_0.active = true;
                this.btnTap_1.active = false;
                this.updateGiftData();
                if (reset_scroll)
                    this.scroller_gift.viewport.scrollV = 0;
            }
            else if (this.curIndex == MailType.NOTIFY) {
                this.btnTap_0.active = false;
                this.btnTap_1.active = true;
                this.updateNoticeData();
                if (reset_scroll)
                    this.scroller_notice.viewport.scrollV = 0;
            }
            this.viewStack.selectedIndex = this.curIndex;
            this.refreshTabNew();
        };
        MailView.prototype.open = function () {
            var layer = Singleton.Get(LayerManager);
            this.return_to_school = layer.isViewOnStage(layer.getView(ui.SchoolView));
            layer.getPopup().addPopup(this);
            layer.getView(ui.SchoolView).close();
            this.menuUpdate(true);
            Common.playStackAni(null, [this.btnTap_0, this.btnTap_1]);
            if (this.compEmpty.visible) {
                this.compEmpty.playAni();
            }
            // console.log("========== All Mails: ");
            // console.log(Singleton.Get(MailManager).getMails().m_mails);
        };
        /**
         * 刷新切页按钮new状态
         */
        MailView.prototype.refreshTabNew = function () {
            var mails = Singleton.Get(MailManager).getMails();
            this.btnTap_0.isNew = mails.is_gift_unread;
            this.btnTap_1.isNew = mails.is_notify_unread;
        };
        /**
         * 销毁界面时执行
         */
        MailView.prototype.onDestroy = function () {
            this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnTap_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
            this.btnTap_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
        };
        /**
         * 更新UI
         */
        MailView.prototype.onUpdate = function (time) { };
        /**
         * 响应点击标签页
         */
        MailView.prototype.onClick_btnTabs = function (e) {
            var index = parseInt(e.currentTarget.name);
            if (this.curIndex == index)
                return;
            this.curIndex = index;
            this.menuUpdate(true);
        };
        /**
         * 响应点击一键获取
         */
        MailView.prototype.onClick_btnGetAll = function (e) {
            var _this = this;
            Singleton.Get(MailManager).reqRewardOneKey(function () {
                _this.menuUpdate(true);
                _this.refreshTabNew();
                Singleton.Get(ui.MainView).menu2.refreshBtnMailNew();
            }, this);
        };
        /**
         * 响应点击关闭按钮
         */
        MailView.prototype.onClick_btnClose = function (e) {
            if (this.return_to_school) {
                Singleton.Get(LayerManager).getView(ui.SchoolView).open();
            }
            else {
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(undefined, false);
            }
            Singleton.Get(PopupManager).removePopup(this);
        };
        // region 空包提示
        MailView.prototype.checkEmpty = function (data) {
            if (!data || data.length <= 0) {
                this.compEmpty.visible = true;
                this.compEmpty.text = "没有";
                switch (this.curIndex) {
                    case MailType.GIFT:
                        this.compEmpty.text += "邮件";
                        break;
                    case MailType.NOTIFY:
                        this.compEmpty.text += "通知";
                        break;
                }
            }
            else {
                this.compEmpty.visible = false;
            }
        };
        return MailView;
    }(PopupUI));
    ui.MailView = MailView;
    __reflect(MailView.prototype, "ui.MailView");
})(ui || (ui = {}));
//# sourceMappingURL=MailView.js.map