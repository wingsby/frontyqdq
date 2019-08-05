var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TaskType;
(function (TaskType) {
    TaskType[TaskType["HAS_PVE"] = 1] = "HAS_PVE";
    TaskType[TaskType["EQUIP_STR"] = 2] = "EQUIP_STR";
    TaskType[TaskType["EQUIP_REFINE"] = 3] = "EQUIP_REFINE";
    TaskType[TaskType["ROLE_LV_UP"] = 4] = "ROLE_LV_UP";
    TaskType[TaskType["ROLE_TALENT"] = 5] = "ROLE_TALENT";
    TaskType[TaskType["ROLE_BREACH"] = 6] = "ROLE_BREACH";
    TaskType[TaskType["ROLE_AWAKEN"] = 7] = "ROLE_AWAKEN";
    TaskType[TaskType["INSTANCE_EQUIP"] = 8] = "INSTANCE_EQUIP";
    TaskType[TaskType["INSTANCE_GOLD"] = 9] = "INSTANCE_GOLD";
    TaskType[TaskType["DUEL"] = 10] = "DUEL";
    TaskType[TaskType["HAS_ROLE_LV"] = 11] = "HAS_ROLE_LV";
    TaskType[TaskType["HAS_EQUIP_STR"] = 12] = "HAS_EQUIP_STR";
    TaskType[TaskType["HAS_INSTANCE_EQUIP"] = 13] = "HAS_INSTANCE_EQUIP";
    TaskType[TaskType["HAS_INSTANCE_GOLD"] = 14] = "HAS_INSTANCE_GOLD";
    TaskType[TaskType["HAS_EQUIP_REFINE"] = 15] = "HAS_EQUIP_REFINE";
    TaskType[TaskType["HAS_ROLE_BREACH"] = 16] = "HAS_ROLE_BREACH";
    TaskType[TaskType["HAS_ROLE_ID"] = 17] = "HAS_ROLE_ID";
    TaskType[TaskType["HAS_ROLE_PVE_CNT"] = 18] = "HAS_ROLE_PVE_CNT";
    TaskType[TaskType["DMD_DRAW_FREE_CNT"] = 19] = "DMD_DRAW_FREE_CNT";
    TaskType[TaskType["QUICK_BATTLE_CNT"] = 20] = "QUICK_BATTLE_CNT";
    TaskType[TaskType["HAS_CHARM_LV"] = 21] = "HAS_CHARM_LV";
    TaskType[TaskType["HAS_ROLE_EQUIP_CNT"] = 22] = "HAS_ROLE_EQUIP_CNT";
    TaskType[TaskType["HAS_PLAYER_LEVEL"] = 23] = "HAS_PLAYER_LEVEL";
    TaskType[TaskType["HAS_ROLE_LV_ALL_ROLE"] = 24] = "HAS_ROLE_LV_ALL_ROLE";
    TaskType[TaskType["ARENA_CNT"] = 25] = "ARENA_CNT";
    TaskType[TaskType["HAS_HISTORY_FIGHT"] = 26] = "HAS_HISTORY_FIGHT";
    TaskType[TaskType["HAS_GET_ARENA_AWARD_ID"] = 27] = "HAS_GET_ARENA_AWARD_ID";
    TaskType[TaskType["HAS_GET_CHARM_LV_AWARD_ID"] = 28] = "HAS_GET_CHARM_LV_AWARD_ID";
    TaskType[TaskType["HAS_GET_DUEL_AWARD_ID"] = 29] = "HAS_GET_DUEL_AWARD_ID";
    TaskType[TaskType["INSTANCE_HERO"] = 30] = "INSTANCE_HERO";
    TaskType[TaskType["INSTANCE_MAT"] = 31] = "INSTANCE_MAT";
    TaskType[TaskType["HAS_INSTANCE_HERO"] = 32] = "HAS_INSTANCE_HERO";
    TaskType[TaskType["HAS_INSTANCE_MAT"] = 33] = "HAS_INSTANCE_MAT";
    TaskType[TaskType["HAS_ENCHANT_ROLE"] = 34] = "HAS_ENCHANT_ROLE";
    TaskType[TaskType["HAS_TOWER_LV"] = 35] = "HAS_TOWER_LV";
    TaskType[TaskType["GOLD_BUY_CNT"] = 36] = "GOLD_BUY_CNT";
    TaskType[TaskType["HAS_FIRST_DMD_DRAW"] = 37] = "HAS_FIRST_DMD_DRAW";
    TaskType[TaskType["HAS_ONE_BACKUP"] = 38] = "HAS_ONE_BACKUP";
    TaskType[TaskType["HAS_GET_TOWER_AWARD_ID"] = 39] = "HAS_GET_TOWER_AWARD_ID";
    TaskType[TaskType["HAS_GET_DMG_AWARD_ID"] = 40] = "HAS_GET_DMG_AWARD_ID";
    TaskType[TaskType["HAS_GET_LINEUP_AWARD_ID"] = 41] = "HAS_GET_LINEUP_AWARD_ID";
    TaskType[TaskType["WISH_CNT"] = 42] = "WISH_CNT";
    TaskType[TaskType["HAS_WISH_LV"] = 43] = "HAS_WISH_LV"; // 许愿池等级：领取任务后许愿池等级是否达到XXX级，类型43
})(TaskType || (TaskType = {}));
var TaskUtils = (function () {
    function TaskUtils() {
    }
    /**
     * 根据不同的任务跳转到不同的位置
     * @param type
     */
    TaskUtils.goto = function (type) {
        var layer = Singleton.Get(LayerManager);
        switch (type) {
            case TaskType.HAS_PVE:
                layer.getView(ui.MainView).onClick_btnBattle(undefined, false);
                break;
            case TaskType.QUICK_BATTLE_CNT:
                layer.getView(ui.MainView).onClick_btnBattle(undefined, false);
                layer.getView(ui.LevelQuickAlertView).openAlert();
                break;
            case TaskType.EQUIP_STR:
            case TaskType.HAS_EQUIP_STR:
                layer.getView(ui.MainView).onClick_btnRole(undefined);
                layer.getView(ui.RoleBaseView).openRole(Singleton.Get(RoleManager).getRolesInfo().getStrongestTeamRoleId());
                // layer.getView(ui.RoleLevelupView).onClick_btnAutoStr();
                // layer.getView(ui.RoleBaseView).onClick_btnEquipStrength();
                break;
            case TaskType.EQUIP_REFINE:
            case TaskType.HAS_EQUIP_REFINE:
                layer.getView(ui.MainView).onClick_btnRole(undefined);
                layer.getView(ui.RoleBaseView).openRole(Singleton.Get(RoleManager).getRolesInfo().getStrongestTeamRoleId());
                // layer.getView(ui.RoleLevelupView).onClick_btnAutoStr();
                // layer.getView(ui.RoleBaseView).onClick_btnEquipRefine();
                break;
            case TaskType.ROLE_LV_UP:
            case TaskType.HAS_ROLE_LV:
                layer.getView(ui.MainView).onClick_btnRole(undefined);
                break;
            case TaskType.HAS_ROLE_EQUIP_CNT:
                layer.getView(ui.MainView).onClick_btnRole(undefined);
                layer.getView(ui.RoleBaseView).openRole(Singleton.Get(RoleManager).getRolesInfo().getStrongestTeamRoleId());
                // layer.getView(ui.RoleBaseView).onClick_btnLevelup(undefined);
                break;
            case TaskType.ROLE_TALENT:
                layer.getView(ui.MainView).onClick_btnRole(undefined);
                layer.getView(ui.RoleBaseView).openRole(Singleton.Get(RoleManager).getRolesInfo().getStrongestTeamRoleId());
                // layer.getView(ui.RoleBaseView).onClick_btnTalent(null);
                break;
            case TaskType.ROLE_BREACH:
            case TaskType.HAS_ROLE_BREACH:
                layer.getView(ui.MainView).onClick_btnRole(undefined);
                layer.getView(ui.RoleBaseView).openRole(Singleton.Get(RoleManager).getRolesInfo().getStrongestTeamRoleId());
                // layer.getView(ui.RoleBaseView).onClick_btnBreach(null);
                break;
            case TaskType.ROLE_AWAKEN:
                layer.getView(ui.MainView).onClick_btnRole(undefined);
                layer.getView(ui.RoleBaseView).openRole(1006); // 固定打开孙策角色 modified by WYM 2017/3/1
                // layer.getView(ui.RoleBaseView).openRole(Singleton.Get(RoleManager).getRolesInfo().getStrongestTeamRoleId());
                // layer.getView(ui.RoleBaseView).onClick_btnAwaken(null);
                break;
            case TaskType.INSTANCE_EQUIP:
            case TaskType.INSTANCE_GOLD:
            case TaskType.HAS_INSTANCE_EQUIP:
            case TaskType.HAS_INSTANCE_GOLD:
            case TaskType.INSTANCE_HERO:
            case TaskType.INSTANCE_MAT:
            case TaskType.HAS_INSTANCE_HERO:
            case TaskType.HAS_INSTANCE_MAT:
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                layer.getView(ui.SchoolView).onClick_MaterialInstance(undefined);
                break;
            case TaskType.DUEL:
            case TaskType.HAS_GET_DUEL_AWARD_ID:
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                layer.getView(ui.SchoolView).onClick_btnDuel(undefined);
                break;
            case TaskType.HAS_ROLE_ID:
                layer.getView(ui.MainView).onClick_btnRole(undefined);
                layer.getView(ui.RoleBaseView).onClick_btnList();
                break;
            case TaskType.HAS_ROLE_PVE_CNT:
            case TaskType.HAS_ROLE_LV_ALL_ROLE:
            case TaskType.HAS_HISTORY_FIGHT:
            case TaskType.HAS_ONE_BACKUP:
                layer.getView(ui.MainView).onClick_btnRole(undefined);
                layer.getView(ui.RoleBaseView).onClick_btnLineup();
                break;
            case TaskType.DMD_DRAW_FREE_CNT:
            case TaskType.HAS_FIRST_DMD_DRAW:
                layer.getView(ui.MainView).onClick_btnShop(undefined);
                break;
            case TaskType.HAS_CHARM_LV:
            case TaskType.HAS_GET_CHARM_LV_AWARD_ID:
                // layer.getView(ui.SchoolView).open();
                // layer.getView(ui.SchoolView).onClick_btnDailyTask();
                layer.getView(ui.BattleView).onClick_btnDailyTask(undefined);
                break;
            case TaskType.HAS_PLAYER_LEVEL:
                var my_team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
                if (my_team_lv >= 20) {
                    Singleton.Get(LayerManager).getView(ui.BattleView).onClick_btnQuick(undefined);
                }
                break;
            case TaskType.ARENA_CNT:
            case TaskType.HAS_GET_ARENA_AWARD_ID:
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                layer.getView(ui.SchoolView).onClick_btnArena(undefined);
                break;
            case TaskType.HAS_ENCHANT_ROLE:
                if (OpenManager.CheckOpenWithInfo(OpenType.EquipEnchant)) {
                    layer.getView(ui.MainView).onClick_btnRole(undefined);
                    layer.getView(ui.RoleBaseView).openRole(Singleton.Get(RoleManager).getRolesInfo().getStrongestTeamRoleId());
                }
                break;
            case TaskType.HAS_TOWER_LV:
            case TaskType.HAS_GET_TOWER_AWARD_ID:
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                layer.getView(ui.SchoolView).onClick_btnTower(undefined);
                break;
            case TaskType.GOLD_BUY_CNT:
                layer.getView(ui.ShopGoldBuyPanelView).open();
                break;
            case TaskType.HAS_GET_DMG_AWARD_ID:
                if (OpenManager.CheckOpenWithInfo(OpenType.Dmg)) {
                    layer.getView(ui.DmgView).open();
                }
                break;
            case TaskType.HAS_GET_LINEUP_AWARD_ID:
                layer.getView(ui.MainView).onClick_btnRole(undefined);
                break;
            case TaskType.WISH_CNT:
            case TaskType.HAS_WISH_LV:
                if (OpenManager.CheckOpenWithInfo(OpenType.Wish)) {
                    layer.getView(ui.MainView).onClick_btnCastle(undefined);
                    layer.getView(ui.SchoolView).onClick_btnWish(undefined);
                }
                break;
        }
    };
    return TaskUtils;
}());
__reflect(TaskUtils.prototype, "TaskUtils");
//# sourceMappingURL=TaskUtils.js.map