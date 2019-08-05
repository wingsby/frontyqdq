var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerInstanceInfo = (function () {
    // endregion
    function PlayerInstanceInfo() {
    }
    /**
     * 获取副本信息
     * @param instance_id
     */
    PlayerInstanceInfo.prototype.getInstanceInfo = function (instance_id) {
        var instance_info = Template.instance.get(instance_id);
        if (instance_info == null) {
            egret.error("no instance info: " + instance_id);
            return null;
        }
        var fbtype_info = Template.fbtype.get(instance_info.Type);
        if (fbtype_info == null) {
            egret.error("no fbtype: " + instance_info.Type);
            return null;
        }
        var far_win_id = this.far_win_id.containsKey(instance_info.Type) ? this.far_win_id.get(instance_info.Type) : 0;
        // 遍历查询胜利关状态
        var ergodic_instance_id = fbtype_info.Fbinitial;
        var ergodic_idx = 1;
        var cur_instance_eid = 0;
        var cur_win_eid = 0;
        while (ergodic_instance_id > 0) {
            var ergodic_instance_info = Template.instance.get(ergodic_instance_id);
            if (ergodic_instance_info.ID == instance_info.ID) {
                cur_instance_eid = ergodic_idx;
            }
            if (ergodic_instance_info.ID == far_win_id) {
                cur_win_eid = ergodic_idx;
            }
            ergodic_instance_id = ergodic_instance_info.LowLevel;
            ergodic_idx++;
        }
        // 构造结果
        var result = new InstanceInfo();
        // 解锁判断
        //let my_team_lv: number = Singleton.Get(PlayerInfoManager).getTeamLv();
        var my_pve_lv = Singleton.Get(PveManager).getCurLevel();
        if (my_pve_lv > instance_info.OpenLevel) {
            result.is_open = cur_win_eid >= (cur_instance_eid - 1);
            result.is_openPveLevel = true;
            result.is_openPrevLevel = result.is_open;
        }
        else {
            result.is_open = false;
            result.is_openPrevLevel = cur_win_eid >= (cur_instance_eid - 1);
            result.is_openPveLevel = false;
        }
        // 扫荡判断
        var my_vip_lv = Singleton.Get(PlayerInfoManager).getVipLevel();
        var req_vip_lv = Template.config.MUPVip;
        result.raid_openVip = my_vip_lv >= req_vip_lv;
        if (cur_win_eid == 0) {
            result.raid_open = false;
            result.raid_openTeamLevel = false;
        }
        else {
            result.raid_openTeamLevel = cur_win_eid >= cur_instance_eid;
            if (result.raid_openVip && result.raid_openTeamLevel) {
                result.raid_open = true;
            }
            else {
                result.raid_open = false;
            }
        }
        // 剩余次数判断
        if (result.is_open) {
            result.chance = this.instance_count.containsKey(instance_id) ? this.instance_count.get(instance_id) : instance_info.FBchallenge;
        }
        else {
            result.chance = instance_info.FBchallenge;
        }
        return result;
    };
    return PlayerInstanceInfo;
}());
__reflect(PlayerInstanceInfo.prototype, "PlayerInstanceInfo");
//# sourceMappingURL=PlayerInstanceInfo.js.map