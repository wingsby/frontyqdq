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
    var ArenaEnemyListPrimeView = (function (_super) {
        __extends(ArenaEnemyListPrimeView, _super);
        function ArenaEnemyListPrimeView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ArenaEnemyListPrimeSkin";
            return _this;
        }
        ArenaEnemyListPrimeView.prototype.setEnemy = function (enemies) {
            if (enemies == null || enemies.length < 3) {
                return;
            }
            this.ae1.setArenaEnemy(enemies[0]);
            this.ae2.setArenaEnemy(enemies[1]);
            this.ae3.setArenaEnemy(enemies[2]);
        };
        return ArenaEnemyListPrimeView;
    }(eui.Component));
    ui.ArenaEnemyListPrimeView = ArenaEnemyListPrimeView;
    __reflect(ArenaEnemyListPrimeView.prototype, "ui.ArenaEnemyListPrimeView");
})(ui || (ui = {}));
//# sourceMappingURL=ArenaEnemyListPrimeView.js.map