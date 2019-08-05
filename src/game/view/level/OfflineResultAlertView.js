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
    var OfflineResultAlertView = (function (_super) {
        __extends(OfflineResultAlertView, _super);
        /**
         * 构造函数
         */
        function OfflineResultAlertView() {
            return _super.call(this, "yw.OfflineResultAlertSkin") || this;
        }
        /**
         * 组建常
         */
        OfflineResultAlertView.prototype.componentCreated = function () {
        };
        /**
         * 释放
         */
        OfflineResultAlertView.prototype.onDestroy = function () {
            this.dispose();
        };
        /**
         * 帧更新
         * @param time
         */
        OfflineResultAlertView.prototype.onUpdate = function (time) {
        };
        /**
         * 响应子对象创建完成
         */
        OfflineResultAlertView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // 注册事件侦听
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
        };
        /**
         * 析构函数（手动调用）
         */
        OfflineResultAlertView.prototype.dispose = function () {
            // 解除事件侦听
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnConfirm, this);
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        OfflineResultAlertView.prototype.onAddToStage = function (e) {
            this.initGuiText();
            Singleton.Get(LayerManager).getView(ui.GuideView).setShow(false);
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        OfflineResultAlertView.prototype.onRemoveFromStage = function (e) {
            Singleton.Get(LayerManager).getView(ui.GuideView).setShow(true);
        };
        /**
         * 初始化UI文字
         */
        OfflineResultAlertView.prototype.initGuiText = function () {
            // TODO UI文字写入配置表
            this.labTitle.text = Template.getGUIText("ui_pve_1");
            this.labTxtTime.text = Template.getGUIText("ui_pve_2");
            this.labTxtLevel.text = Template.getGUIText("ui_pve_3");
            this.labTxtCount.text = Template.getGUIText("ui_pve_4");
            this.labTxtGold.text = Template.getGUIText("ui_pve_5");
            this.labTxtGoldSp.text = Template.getGUIText("ui_pve_7");
            this.labTxtExp.text = Template.getGUIText("ui_pve_6");
            this.labTxtExpSp.text = Template.getGUIText("ui_pve_7");
            this.labTxtTip.text = Template.getGUIText("ui_pve_8");
            this.labConfirm.text = Template.getGUIText("ui_pve_9");
        };
        /**
         * 初始化数据
         */
        OfflineResultAlertView.prototype.initData = function (rec_msg) {
            // console.log(rec_msg.offline_time);
            this.labTime.text = UtilsGame.stringHander(this.labTime.text, UtilsGame.timeToStringDate(rec_msg.offline_time * 1000));
            this.labLevel.text = UtilsGame.stringHander(this.labLevel.text, PveUtils.getLevelName(rec_msg.cur_level));
            this.labBattleCount.text = UtilsGame.stringHander(this.labBattleCount.text, rec_msg.win_count);
            this.labGold.text = UtilsGame.stringHander(this.labGold.text, rec_msg.base_gold);
            this.labExp.text = UtilsGame.stringHander(this.labExp.text, rec_msg.base_exp);
            // 显示月卡终生卡额外收益
            this.labExpSp.text = Template.getGUIText("ui_ex_pve_1") + "+" + UtilsGame.numberToString(rec_msg.sp_month_exp);
            this.labExpSp2.text = Template.getGUIText("ui_ex_pve_2") + "+" + UtilsGame.numberToString(rec_msg.sp_life_exp);
            this.labGoldSp.text = Template.getGUIText("ui_ex_pve_1") + "+" + UtilsGame.numberToString(rec_msg.sp_month_gold);
            this.labGoldSp2.text = Template.getGUIText("ui_ex_pve_2") + "+" + UtilsGame.numberToString(rec_msg.sp_life_gold);
            // 月卡终生卡都有则不提示购买
            this.labTxtTip.visible = !(rec_msg.sp_month_gold && rec_msg.sp_life_gold);
        };
        /**
         * 响应点击确认按钮
         * @param e
         */
        OfflineResultAlertView.prototype.onClick_btnConfirm = function (e) {
            Singleton.Get(LayerManager).getPopup().removePopup(Singleton.Get(LayerManager).getView(ui.OfflineResultAlertView));
            Singleton.Get(PrivManager).tryShowLoginAlert();
        };
        return OfflineResultAlertView;
    }(PopupUI));
    ui.OfflineResultAlertView = OfflineResultAlertView;
    __reflect(OfflineResultAlertView.prototype, "ui.OfflineResultAlertView");
})(ui || (ui = {}));
//# sourceMappingURL=OfflineResultAlertView.js.map