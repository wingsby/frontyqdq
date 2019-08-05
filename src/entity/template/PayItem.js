var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    /**
    * 充值表
    */
    var PayItem = (function () {
        function PayItem() {
        }
        return PayItem;
    }());
    Entity.PayItem = PayItem;
    __reflect(PayItem.prototype, "Entity.PayItem");
})(Entity || (Entity = {}));
//# sourceMappingURL=PayItem.js.map