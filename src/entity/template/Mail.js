var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Mail = (function () {
        function Mail() {
        }
        return Mail;
    }());
    Entity.Mail = Mail;
    __reflect(Mail.prototype, "Entity.Mail");
})(Entity || (Entity = {}));
//# sourceMappingURL=Mail.js.map