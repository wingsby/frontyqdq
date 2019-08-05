var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TowerUtil = (function () {
    function TowerUtil() {
    }
    /**
     * 计算当前层对应爬塔表的哪个配置
     * @param floor
     */
    TowerUtil.clacTowerId = function (floor) {
        return {
            id: Math.ceil(floor / TowerUtil.cfg_floor_per_entity),
            sub_floor: floor % TowerUtil.cfg_boss_floor // 该条的第几层（从1起计）
        };
    };
    /**
     * 获取当前层配置
     * @param floor
     */
    TowerUtil.getFloorCfg = function (floor) {
        var cfg_tf = TowerUtil.clacTowerId(floor);
        var cfg_tower = Template.tower.get(cfg_tf.id);
        if (!cfg_tower) {
            // console.log("getFloorCfg() no tower cfg, id: " + cfg_tf.id);
            return undefined;
        }
        // 判断是否是BOSS关
        if (cfg_tf.sub_floor === 0) {
            // const cfg_tower: Entity.Tower = Template.tower.get(cfg_tf.id - 1);
            // if (!cfg_tower) {
            //     return undefined;
            // }
            // console.log("[BOSS] floor: " + floor + ", 当前读取id: " + cfg_tf.id + ", -1读取id: " + (cfg_tf.id - 1));
            return {
                floor: floor,
                id: cfg_tf.id,
                sub_floor: cfg_tf.sub_floor,
                is_boss: true,
                boss_res: cfg_tower.Model,
                name: cfg_tower.Name,
                mon: undefined,
                mon_fighting: 0
            };
        }
        else {
            return {
                floor: floor,
                id: cfg_tf.id,
                sub_floor: cfg_tf.sub_floor,
                is_boss: false,
                boss_res: cfg_tower.Model,
                name: cfg_tower.Name,
                mon: cfg_tower.TowerMon[cfg_tf.sub_floor - 1],
                mon_fighting: cfg_tower.TowerMonFC[cfg_tf.sub_floor - 1]
            };
        }
    };
    /**
     * 输出当前层配置
     * @param floor
     */
    TowerUtil.traceFloorCfg = function (floor) {
        console.log("=====================");
        var cfg = TowerUtil.getFloorCfg(floor);
        if (!cfg) {
            console.log("floor %d, no configuration.", floor);
            return;
        }
        console.log("floor %d, [%s]", floor, Template.getGUIText(cfg.name));
        console.log("is_boss: %s", cfg.is_boss);
        console.log("tower_id: %d, sub_floor: %d", cfg.id, cfg.sub_floor);
        console.log("enemy: %s, fighting: %d", cfg.mon, cfg.mon_fighting);
    };
    return TowerUtil;
}());
TowerUtil.cfg_floor_per_entity = 10; // 爬塔配置表每条数据对应多少层
TowerUtil.cfg_boss_floor = 10; // BOSS层在每条数据的第几层
__reflect(TowerUtil.prototype, "TowerUtil");
//# sourceMappingURL=TowerUtil.js.map