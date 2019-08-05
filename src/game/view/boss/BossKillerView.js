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
    var BossKillerView = (function (_super) {
        __extends(BossKillerView, _super);
        function BossKillerView() {
            var _this = _super.call(this, "yw.BossKillerSkin") || this;
            _this.data = {
                text: {
                    title: ""
                }
            };
            return _this;
        }
        BossKillerView.prototype.componentCreated = function () {
            this.m_entries = new eui.ArrayCollection();
            this.dgItems.itemRendererSkinName = "yw.BossListItemSkin";
            this.dgItems.dataProvider = this.m_entries;
        };
        BossKillerView.prototype.onDestroy = function () { };
        BossKillerView.prototype.onUpdate = function (time) { };
        BossKillerView.prototype.open = function (id) {
            this.data.text.title = Template.getGUIText("ui_bosswar12");
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initView(id);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        BossKillerView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        BossKillerView.prototype.initView = function (id) {
            var _this = this;
            this.m_entries.source = [];
            Singleton.Get(BossManager).reqFullKiller(id, function (players) {
                var source = [];
                source.push({
                    col1: Template.getGUIText("ui_bosswar17"),
                    col2: Template.getGUIText("ui_bosswar15"),
                    col3: Template.getGUIText("append_118"),
                });
                for (var i = 0; i < players.length; i++) {
                    source.push({
                        col1: UtilsGame.dateToStr(players[i].timeline, "hh:mm:ss"),
                        col2: players[i].nickname,
                        col3: players[i].fighting
                    });
                }
                _this.m_entries.source = source;
            }, this);
        };
        BossKillerView.prototype.onClick_btnClose = function () {
            this.close();
        };
        return BossKillerView;
    }(PopupUI));
    ui.BossKillerView = BossKillerView;
    __reflect(BossKillerView.prototype, "ui.BossKillerView");
})(ui || (ui = {}));
//# sourceMappingURL=BossKillerView.js.map