var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity;
(function (Entity) {
    var Skill = (function () {
        function Skill() {
        }
        return Skill;
    }());
    Entity.Skill = Skill;
    __reflect(Skill.prototype, "Entity.Skill");
})(Entity || (Entity = {}));
//# sourceMappingURL=Skill.js.map