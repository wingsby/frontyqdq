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
    var TowerLoseView = (function (_super) {
        __extends(TowerLoseView, _super);
        /**
         * 构造函数
         */
        function TowerLoseView() {
            return _super.call(this, "yw.TowerLoseSkin") || this;
        }
        /**
         * 响应子元素创建
         */
        TowerLoseView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 响应组件生成
         */
        TowerLoseView.prototype.componentCreated = function () {
            this.init();
        };
        /**
         * 初始化
         */
        TowerLoseView.prototype.init = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        /**
         * 销毁
         */
        TowerLoseView.prototype.onDestroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        /**
         * 帧更新
         * @param time
         */
        TowerLoseView.prototype.onUpdate = function (time) {
        };
        /**
         * 打开界面
         */
        TowerLoseView.prototype.open = function (floor) {
            // 如果已在舞台上 不再打开
            if (this.parent) {
                return;
            }
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initContent(floor);
        };
        /**
         * 关闭界面
         */
        TowerLoseView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        /**
         * 设定内容
         */
        TowerLoseView.prototype.initContent = function (floor) {
            var cfg_floor = TowerUtil.getFloorCfg(floor);
            var cfg_tower = Template.tower.get(cfg_floor.id);
            this.labTip.textFlow = new egret.HtmlTextParser().parser(UtilsGame.stringHander(Template.getGUIText("ui_tower8"), floor, cfg_tower.TowerMonFC[cfg_floor.sub_floor - 1]));
        };
        /**
         * 响应点击事件
         * @param e
         */
        TowerLoseView.prototype.onClick_btnHandler = function (e) {
            this.close();
        };
        return TowerLoseView;
    }(PopupUI));
    ui.TowerLoseView = TowerLoseView;
    __reflect(TowerLoseView.prototype, "ui.TowerLoseView");
})(ui || (ui = {}));
//# sourceMappingURL=TowerLoseView.js.map