var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var InstanceType;
(function (InstanceType) {
    InstanceType[InstanceType["Null"] = 0] = "Null";
    InstanceType[InstanceType["Equip"] = 1] = "Equip";
    InstanceType[InstanceType["Gold"] = 2] = "Gold";
    InstanceType[InstanceType["Hero"] = 3] = "Hero";
    InstanceType[InstanceType["Material"] = 4] = "Material"; // 材料副本
})(InstanceType || (InstanceType = {}));
var E_FBTYPE;
(function (E_FBTYPE) {
    E_FBTYPE[E_FBTYPE["Null"] = 0] = "Null";
    E_FBTYPE[E_FBTYPE["Equip"] = 101] = "Equip";
    E_FBTYPE[E_FBTYPE["Material"] = 102] = "Material";
    E_FBTYPE[E_FBTYPE["Hero"] = 103] = "Hero";
    E_FBTYPE[E_FBTYPE["Gold"] = 104] = "Gold"; // 金币副本
})(E_FBTYPE || (E_FBTYPE = {}));
var InstanceUtil = (function () {
    function InstanceUtil() {
    }
    /**
     * 将服务器传来的SyncPlayerInstanceMsg转化为PlayerInstanceInfo
     * @param items
     * @returns {any}
     */
    InstanceUtil.convSyncToDict = function (rec_msg) {
        // 判空
        if (rec_msg == null) {
            egret.error("cant conv null to PlayerInstanceInfo");
            return null;
        }
        var result = new PlayerInstanceInfo();
        result.uid = rec_msg.uid;
        result.challenge_buy_cnt = rec_msg.challenge_buy_cnt;
        result.last_reset_time = rec_msg.last_reset_time;
        result.reward_hash = rec_msg.reward_hash;
        result.reward_instance_id = rec_msg.reward_instance_id;
        result.instance_count = Common.convObjectToDictNumberNumber(rec_msg.instance_count);
        result.farest_id = Common.convObjectToDictNumberNumber(rec_msg.farest_id);
        result.far_win_id = Common.convObjectToDictNumberNumber(rec_msg.far_win_id);
        return result;
    };
    /**
     * 获取副本推荐战力(已废弃)
     */
    InstanceUtil.clacInstanceFighting = function (ins_id) {
        var cfg_ins = Template.instance.get(ins_id);
        if (!cfg_ins) {
            return 0;
        }
        // console.log("开始计算副本[" + ins_id + "]推荐战力");
        var fightings = [];
        for (var i = 0; i < cfg_ins.Mon.length; i++) {
            if (cfg_ins.MonLv[i] <= 0 || cfg_ins.Mon[i] <= 0) {
                continue;
            }
            var mon_info = new RoleInfo();
            mon_info.InitByRoleConfigIdAndLv(cfg_ins.Mon[i], cfg_ins.MonLv[i]);
            fightings.push(mon_info.fighting);
        }
        var rec_fht = 0;
        for (var i = 0; i < fightings.length; i++) {
            rec_fht += fightings[i];
        }
        // console.log("副本[" + ins_id + "]推荐战力: " + rec_fht);
        return rec_fht;
    };
    return InstanceUtil;
}());
__reflect(InstanceUtil.prototype, "InstanceUtil");
//# sourceMappingURL=InstanceUtil.js.map