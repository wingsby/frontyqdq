var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    /**
     * 剧情对话
     */
    var Dialogue = (function () {
        function Dialogue() {
        }
        return Dialogue;
    }());
    Entity.Dialogue = Dialogue;
    __reflect(Dialogue.prototype, "Entity.Dialogue");
})(Entity || (Entity = {}));
//# sourceMappingURL=Dialogue.js.map