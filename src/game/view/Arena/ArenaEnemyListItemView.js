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
    var ArenaEnemyListItemType;
    (function (ArenaEnemyListItemType) {
        ArenaEnemyListItemType[ArenaEnemyListItemType["Left"] = 0] = "Left";
        ArenaEnemyListItemType[ArenaEnemyListItemType["Right"] = 1] = "Right";
    })(ArenaEnemyListItemType = ui.ArenaEnemyListItemType || (ui.ArenaEnemyListItemType = {}));
    var ArenaEnemyListItemView = (function (_super) {
        __extends(ArenaEnemyListItemView, _super);
        function ArenaEnemyListItemView(type) {
            var _this = _super.call(this) || this;
            _this.skinName = type == ArenaEnemyListItemType.Left ? "yw.ArenaEnemyListItemLeftSkin" : "yw.ArenaEnemyListItemRightSkin";
            return _this;
        }
        ArenaEnemyListItemView.prototype.setEnemy = function (enemy) {
            this.ae.setArenaEnemy(enemy);
        };
        return ArenaEnemyListItemView;
    }(eui.Component));
    ui.ArenaEnemyListItemView = ArenaEnemyListItemView;
    __reflect(ArenaEnemyListItemView.prototype, "ui.ArenaEnemyListItemView");
})(ui || (ui = {}));
//# sourceMappingURL=ArenaEnemyListItemView.js.map