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
    var NoticeView = (function (_super) {
        __extends(NoticeView, _super);
        ////////////////////////////exml2class:结束替换声明区域///////////////////////////////
        function NoticeView() {
            return _super.call(this, "yw.NoticeSkin") || this;
        }
        /**创建界面时执行*/
        NoticeView.prototype.componentCreated = function () {
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
        };
        /**销毁界面时执行*/
        NoticeView.prototype.onDestroy = function () { };
        /**更新UI */
        NoticeView.prototype.onUpdate = function (time) { };
        NoticeView.prototype.open = function (notice) {
            Singleton.Get(PopupManager).addPopup(this);
            if (typeof notice == "string") {
                this.showNotice(notice);
            }
            else if (egret.getQualifiedClassName(notice) == "MailInfo") {
                this.updateData(notice);
            }
        };
        NoticeView.prototype.onClick_btnClose = function (e) {
            Singleton.Get(PopupManager).removePopup(this);
        };
        NoticeView.prototype.onClick_btnConfirm = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnConfirm, function () {
                Singleton.Get(PopupManager).removePopup(_this);
            }, this);
        };
        NoticeView.prototype.updateData = function (notice) {
            if (notice == null) {
                egret.error("notice is null.");
                return;
            }
            var str = notice.getMailContent();
            this.lbContent.textFlow = (new egret.HtmlTextParser).parser(str);
            this.scroller.viewport.scrollV = 0;
        };
        /**显示公告 */
        NoticeView.prototype.showNotice = function (notcie) {
            this.lbContent.textFlow = (new egret.HtmlTextParser).parser(notcie);
            this.scroller.viewport.scrollV = 0;
        };
        return NoticeView;
    }(PopupUI));
    ui.NoticeView = NoticeView;
    __reflect(NoticeView.prototype, "ui.NoticeView");
})(ui || (ui = {}));
//# sourceMappingURL=NoticeView.js.map