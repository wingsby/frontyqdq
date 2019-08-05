var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Send = (function () {
        function Send() {
        }
        return Send;
    }());
    Entity.Send = Send;
    __reflect(Send.prototype, "Entity.Send");
})(Entity || (Entity = {}));
//# sourceMappingURL=Send.js.map