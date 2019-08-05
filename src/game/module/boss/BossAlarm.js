var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BossAlarm = (function () {
    function BossAlarm() {
    }
    BossAlarm.isSingle = function () {
        var mgr_scroll = Singleton.Get(ScrollManager);
        var my_team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
        var cfgs_sgs = Template.singleBoss.values;
        for (var i = 0; i < cfgs_sgs.length; i++) {
            var cfg_sgs = cfgs_sgs[i];
            if (cfg_sgs.OpenLv > my_team_lv) {
                continue;
            }
            if (mgr_scroll.getScrollActual(cfg_sgs.FBchallenge)[0] > 0) {
                return true;
            }
        }
        return false;
    };
    BossAlarm.isFull = function () {
        var scr_id = 801;
        var scr_amount = Singleton.Get(ScrollManager).getScrollActual(scr_id)[0];
        return scr_amount > 0;
    };
    return BossAlarm;
}());
__reflect(BossAlarm.prototype, "BossAlarm");
//# sourceMappingURL=BossAlarm.js.map