var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Entity;
(function (Entity) {
    var Scene = (function () {
        function Scene() {
        }
        return Scene;
    }());
    Entity.Scene = Scene;
    __reflect(Scene.prototype, "Entity.Scene");
})(Entity || (Entity = {}));
//# sourceMappingURL=Scene.js.map