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
    var LevelQuickAlertView = (function (_super) {
        __extends(LevelQuickAlertView, _super);
        function LevelQuickAlertView() {
            return _super.call(this, "yw.LevelQuickAlertSkin") || this;
        }
        LevelQuickAlertView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // 注册事件侦听
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
            this.initGuiText();
        };
        LevelQuickAlertView.prototype.componentCreated = function () {
        };
        LevelQuickAlertView.prototype.onDestroy = function () {
            // 回收事件侦听
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        LevelQuickAlertView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化UI文字
         */
        LevelQuickAlertView.prototype.initGuiText = function () {
            this.labTxt1.text = Template.getGUIText("ui_pve_10");
            this.labTxt2.text = Template.getGUIText("ui_pve_11");
            this.labTxt3.text = Template.getGUIText("ui_pve_12");
            this.labTxt4.text = Template.getGUIText("ui_pve_13");
            this.labTxt5.text = Template.getGUIText("ui_pve_14");
            this.labBtnBuy.text = Template.getGUIText("ui_pve_15");
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        LevelQuickAlertView.prototype.onAddToStage = function (e) {
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        LevelQuickAlertView.prototype.onRemoveFromStage = function (e) {
            //this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            //this.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
        };
        /**
         * 刷新文本内容
         */
        LevelQuickAlertView.prototype.refreshContent = function () {
            var pve = Singleton.Get(PveManager);
            var daily_limit = pve.getPveInfo().today_quick_limit;
            var daily_count = pve.getPveInfo().today_quick_count;
            var all_count = pve.getPveInfo().all_quick_count;
            var time_offset_minute = ((all_count * 60) > Template.config.QCULTime) ? Math.floor(Template.config.QCULTime / 60) : all_count;
            var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
            this.labTip.text = UtilsGame.stringHander(Template.getGUIText("ui_pve_16"), my_vip.toString(), daily_limit >= 0 ? (daily_limit - daily_count) : "无限");
            this.labTime.text = (Template.config.QCITime / 60) + "(+" + time_offset_minute + ")";
            this.labCost.text = UtilsGame.numberToString(pve.getPveInfo().quick_next_price);
        };
        /**
         * 响应点击关闭按钮
         * @param e
         */
        LevelQuickAlertView.prototype.onClick_btnClose = function (e) {
            this.closeAlert();
        };
        /**
         * 响应点击确认购买
         * @param e
         */
        LevelQuickAlertView.prototype.onClick_btnConfirm = function (e) {
            if (Singleton.Get(PveManager).getQuickLastCount() > 0) {
                Singleton.Get(PveManager).reqQuick();
                this.closeAlert();
            }
            else {
                Singleton.Get(DialogControler).showInfo(1101);
            }
        };
        /**
         * 打开对话框
         */
        LevelQuickAlertView.prototype.openAlert = function () {
            this.refreshContent();
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().addPopup(layer.getView(ui.LevelQuickAlertView));
            var tw = egret.Tween.get(this.groupRoot);
            tw.to({ alpha: 1 }, 50).call(function () {
                Singleton.Get(LayerManager).getView(ui.GuideView).guideVaildateNow();
            });
        };
        /**
         * 关闭对话框
         */
        LevelQuickAlertView.prototype.closeAlert = function () {
            // this.groupRoot.alpha = 1;
            // let tw: egret.Tween = egret.Tween.get(this.groupRoot);
            // tw.to({alpha:0}, 100).call(()=>{
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(layer.getView(ui.LevelQuickAlertView));
            // });
        };
        return LevelQuickAlertView;
    }(PopupUI));
    ui.LevelQuickAlertView = LevelQuickAlertView;
    __reflect(LevelQuickAlertView.prototype, "ui.LevelQuickAlertView");
})(ui || (ui = {}));
//# sourceMappingURL=LevelQuickAlertView.js.map