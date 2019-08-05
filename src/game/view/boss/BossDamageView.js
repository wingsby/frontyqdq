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
    var BossDamageView = (function (_super) {
        __extends(BossDamageView, _super);
        function BossDamageView() {
            var _this = _super.call(this, "yw.BossDamageSkin") || this;
            _this.data = {
                text: {
                    title: ""
                }
            };
            return _this;
        }
        BossDamageView.prototype.componentCreated = function () {
            this.m_entries = new eui.ArrayCollection();
            this.dgItems.itemRendererSkinName = "yw.BossListItemSkin";
            this.dgItems.dataProvider = this.m_entries;
        };
        BossDamageView.prototype.onDestroy = function () { };
        BossDamageView.prototype.onUpdate = function (time) { };
        BossDamageView.prototype.open = function (id) {
            this.data.text.title = Template.getGUIText("ui_bosswar18");
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initView(id);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        BossDamageView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        BossDamageView.prototype.initView = function (id) {
            var _this = this;
            this.m_entries.source = [];
            Singleton.Get(BossManager).reqFullDamage(id, function (players, damage) {
                var source = [];
                source.push({
                    col1: Template.getGUIText("ui_bosswar14"),
                    col2: Template.getGUIText("ui_bosswar15"),
                    col3: Template.getGUIText("ui_bosswar16")
                });
                for (var i = 0; i < players.length; i++) {
                    source.push({
                        col1: i + 1,
                        col2: players[i].nickname,
                        col3: UtilsGame.numberToString(players[i].damage)
                    });
                }
                _this.m_entries.source = source;
            }, this);
        };
        BossDamageView.prototype.onClick_btnClose = function () {
            this.close();
        };
        return BossDamageView;
    }(PopupUI));
    ui.BossDamageView = BossDamageView;
    __reflect(BossDamageView.prototype, "ui.BossDamageView");
})(ui || (ui = {}));
//# sourceMappingURL=BossDamageView.js.map