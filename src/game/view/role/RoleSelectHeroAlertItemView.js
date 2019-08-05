var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoleSelectHeroAlertItemView = (function (_super) {
    __extends(RoleSelectHeroAlertItemView, _super);
    function RoleSelectHeroAlertItemView() {
        var _this = _super.call(this) || this;
        _this.skinName = "yw.comp.RoleSelectHeroAlertItemSkin";
        _this.init();
        return _this;
    }
    RoleSelectHeroAlertItemView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    /**
     * 初始化
     */
    RoleSelectHeroAlertItemView.prototype.init = function () {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    /**
     * 响应添加到舞台
     */
    RoleSelectHeroAlertItemView.prototype.onAddToStage = function () {
        this.initGuiText();
        this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    /**
     * 响应从舞台上移除
     * TODO 应该回收事件侦听器
     */
    RoleSelectHeroAlertItemView.prototype.onRemoveFromStage = function () {
        this.btnSubmit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    /**
     * 初始化UI文字内容
     */
    RoleSelectHeroAlertItemView.prototype.initGuiText = function () {
        this.btnSubmit.text = "上 阵";
    };
    /**
     * 响应点击事件
     */
    RoleSelectHeroAlertItemView.prototype.onClick = function (e) {
        if (Singleton.Get(GuideManager).CouldYouPleaseWaitForMe("RoleSelectHeroAlertView", "listHeros", this.onClick, this, e)) {
            return;
        }
        var parent = Singleton.Get(LayerManager).getView(ui.RoleSelectHeroAlertView);
        parent.onReqChangeHero(parseInt(this.labRoleId.text));
        parent.close();
    };
    return RoleSelectHeroAlertItemView;
}(eui.ItemRenderer));
__reflect(RoleSelectHeroAlertItemView.prototype, "RoleSelectHeroAlertItemView");
//# sourceMappingURL=RoleSelectHeroAlertItemView.js.map