var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Talent = (function () {
        function Talent() {
        }
        return Talent;
    }());
    Entity.Talent = Talent;
    __reflect(Talent.prototype, "Entity.Talent");
})(Entity || (Entity = {}));
//# sourceMappingURL=Talent.js.map