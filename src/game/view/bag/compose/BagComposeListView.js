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
    var BagComposeListView = (function (_super) {
        __extends(BagComposeListView, _super);
        function BagComposeListView() {
            return _super.call(this, "yw.BagComposeListSkin") || this;
        }
        BagComposeListView.prototype.onDestroy = function () { };
        ;
        BagComposeListView.prototype.onUpdate = function (time) { };
        ;
        BagComposeListView.prototype.componentCreated = function () {
            this.m_entries = new eui.ArrayCollection();
            this.dgItems.dataProvider = this.m_entries;
            this.dgItems.itemRenderer = ui.BagComposeListItemRenderer;
        };
        ;
        BagComposeListView.prototype.open = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.refresh();
        };
        BagComposeListView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        BagComposeListView.prototype.refresh = function () {
            this.initView();
        };
        BagComposeListView.prototype.onAddToStage = function () {
            this.labTitle.text = "合成";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        BagComposeListView.prototype.onRemoveFromStage = function () {
            this.m_entries.source = [];
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        BagComposeListView.prototype.initView = function () {
            var cfg_crafts = Template.craft.keys;
            if (!cfg_crafts || cfg_crafts.length <= 0) {
                console.error("crafts not existed.");
                return;
            }
            var source = [];
            for (var i = 0; i < cfg_crafts.length; i++) {
                source.push({ comp_id: cfg_crafts[i] });
            }
            this.m_entries.source = source;
        };
        BagComposeListView.prototype.onClick_btnClose = function () {
            this.close();
        };
        return BagComposeListView;
    }(PopupUI));
    ui.BagComposeListView = BagComposeListView;
    __reflect(BagComposeListView.prototype, "ui.BagComposeListView");
})(ui || (ui = {}));
//# sourceMappingURL=BagComposeListView.js.map