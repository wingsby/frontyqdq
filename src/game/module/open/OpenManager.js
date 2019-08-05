var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var OpenManager = (function () {
    function OpenManager() {
    }
    OpenManager.GetOpenLv = function (open_type) {
        var o_cfg = Template.open.get(open_type);
        if (o_cfg) {
            return o_cfg.Lv;
        }
        return 0;
    };
    OpenManager.GetLockStr = function (open_type) {
        var o_cfg = Template.open.get(open_type);
        if (o_cfg) {
            return UtilsGame.stringHander(Template.getGUIText("ui_pve_44"), o_cfg.Lv.toString());
        }
        return "";
    };
    OpenManager.CheckOpen = function (open_type) {
        var o_cfg = Template.open.get(open_type);
        if (o_cfg) {
            return Singleton.Get(PlayerInfoManager).getTeamLv() >= o_cfg.Lv;
        }
        return false;
    };
    OpenManager.CheckOpenWithInfo = function (open_type) {
        var result = OpenManager.CheckOpen(open_type);
        if (false == result) {
            var o_cfg = Template.open.get(open_type);
            if (o_cfg)
                Singleton.Get(DialogControler).showInfo(1167, this, null, null, o_cfg.Lv);
        }
        return result;
    };
    OpenManager.CheckOpenWithLvAndVip = function (open_type) {
        var result = OpenManager.CheckOpen(open_type);
        // todo 检查vip
        if (false == result) {
            var o_cfg = Template.open.get(open_type);
            if (o_cfg)
                Singleton.Get(DialogControler).showInfo(1006, this, null, null, o_cfg.Lv, 1);
        }
        return result;
    };
    return OpenManager;
}());
__reflect(OpenManager.prototype, "OpenManager");
//# sourceMappingURL=OpenManager.js.map