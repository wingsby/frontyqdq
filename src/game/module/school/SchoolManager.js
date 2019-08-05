var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 学校管理器
 */
var SchoolManager = (function () {
    function SchoolManager() {
    }
    /**
     * 检查学校红点提醒
     */
    SchoolManager.prototype.checkRemind = function () {
        // 副本
        if (Singleton.Get(InstanceManager).checkRemind()) {
            return true;
        }
        // 一骑当千
        if (Singleton.Get(DuelManager).getDuels().isAlarm() && OpenManager.CheckOpen(OpenType.Duel)) {
            return true;
        }
        // 竞技场
        if (Singleton.Get(ArenaManager).isAlarm() && OpenManager.CheckOpen(OpenType.Arena)) {
            return true;
        }
        // 爬塔
        if (Singleton.Get(TowerManager).getTowerInfo().alarm_tower && OpenManager.CheckOpen(OpenType.Tower)) {
            return true;
        }
        // 许愿
        if (Singleton.Get(WishManager).getInfo().hasAlarm() && OpenManager.CheckOpen(OpenType.Wish)) {
            return true;
        }
        // 公会战
        Singleton.Get(GuildWarManager).checkAlarm(function () { }, this);
        if (Singleton.Get(GuildWarManager).isAlarm()) {
            return true;
        }
        // 外派
        if (Singleton.Get(SendManager).isAlarm() && OpenManager.CheckOpen(OpenType.Send)) {
            return true;
        }
        return false;
    };
    return SchoolManager;
}());
__reflect(SchoolManager.prototype, "SchoolManager");
//# sourceMappingURL=SchoolManager.js.map