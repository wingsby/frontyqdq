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
    var RoleBackupItemView = (function (_super) {
        __extends(RoleBackupItemView, _super);
        function RoleBackupItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleBackupItemSkin";
            _this.init();
            return _this;
        }
        RoleBackupItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 初始化
         */
        RoleBackupItemView.prototype.init = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.groupAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Avatar, this);
            this.groupPlus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Avatar, this);
            this.groupBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnView, this);
        };
        /**
         * 响应添加到舞台
         */
        RoleBackupItemView.prototype.onAddToStage = function () {
            this.initGuiText();
        };
        /**
         * 响应从舞台上移除
         * TODO 应该回收事件侦听器
         */
        RoleBackupItemView.prototype.onRemoveFromStage = function () {
        };
        /**
         * 初始化UI文字内容
         */
        RoleBackupItemView.prototype.initGuiText = function () {
        };
        /**
         * 响应点击头像
         */
        RoleBackupItemView.prototype.onClick_Avatar = function () {
            // 未达到解锁等级
            if (this.data.roleId < 0) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_201"));
                return;
            }
            var cur_seat_id = 1; //Singleton.Get(LayerManager).getView(ui.RoleLineupView).getCurSeatId();
            // 已解锁无角色
            Singleton.Get(LayerManager).getView(ui.RoleSelectBackupPanelView).open(this.data.idx, cur_seat_id);
        };
        /**
         * 响应点击查看按钮
         */
        RoleBackupItemView.prototype.onClick_btnView = function () {
            //Singleton.Get(LayerManager).getView(ui.RoleDetailView).open(this.data.roleId);
            var cur_seat_id = 1; //Singleton.Get(LayerManager).getView(ui.RoleLineupView).getCurSeatId();
            Singleton.Get(LayerManager).getView(ui.RoleBackupDetailPanelView).open(this.data.idx, cur_seat_id);
        };
        return RoleBackupItemView;
    }(eui.ItemRenderer));
    ui.RoleBackupItemView = RoleBackupItemView;
    __reflect(RoleBackupItemView.prototype, "ui.RoleBackupItemView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleBackupItemView.js.map