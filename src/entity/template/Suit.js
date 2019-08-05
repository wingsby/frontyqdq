var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Suit = (function () {
        function Suit() {
        }
        return Suit;
    }());
    Entity.Suit = Suit;
    __reflect(Suit.prototype, "Entity.Suit");
})(Entity || (Entity = {}));
//# sourceMappingURL=Suit.js.map