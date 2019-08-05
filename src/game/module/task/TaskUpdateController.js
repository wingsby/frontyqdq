var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TaskUpdateController = (function () {
    function TaskUpdateController() {
        this.reg_dict = null;
        this.initRegDict();
    }
    TaskUpdateController.prototype.initRegDict = function () {
        this.reg_dict = new Dictionary();
        var types = UtilsEnum.getValues(TaskType);
        for (var i = 0; i < types.length; i++) {
            this.reg_dict.add(types[i], 0);
        }
    };
    TaskUpdateController.prototype.regUpdate = function (type) {
        switch (type) {
            case TaskType.HAS_PVE:
            case TaskType.QUICK_BATTLE_CNT:
            case TaskType.HAS_CHARM_LV:
            case TaskType.HAS_GET_CHARM_LV_AWARD_ID:
            case TaskType.GOLD_BUY_CNT:
            case TaskType.HAS_HISTORY_FIGHT:
            case TaskType.HAS_PLAYER_LEVEL:
            case TaskType.HAS_GET_DMG_AWARD_ID:
                Singleton.Get(TaskManager).reqInfo();
            default:
                this.reg_dict.update(type, this.reg_dict.get(type) + 1);
        }
    };
    TaskUpdateController.prototype.checkUpdate = function (type) {
        return this.reg_dict.get(type) > 0;
    };
    TaskUpdateController.prototype.resetUpdate = function () {
        this.initRegDict();
    };
    return TaskUpdateController;
}());
__reflect(TaskUpdateController.prototype, "TaskUpdateController");
//# sourceMappingURL=TaskUpdateController.js.map