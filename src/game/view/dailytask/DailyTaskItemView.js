var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var DailyTaskItemView = (function (_super) {
        __extends(DailyTaskItemView, _super);
        /**
         * @constructor
         */
        function DailyTaskItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.DailyTaskItemSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        /**
         * 响应数据变更
         * data {task_id: number}
         */
        DailyTaskItemView.prototype.dataChanged = function () {
            if (this.data == undefined) {
                return;
            }
            var task_id = this.data.task_id;
            this.initView(task_id);
        };
        /**
         * 初始化视图
         */
        DailyTaskItemView.prototype.initView = function (task_id) {
            this.labGo.text = "点击前往";
            var task_info = Template.dailyTask.get(task_id);
            this.labReward.text = task_info.TaskReward + Template.getGUIText(Template.item.get(Template.config.CharmItem).iName);
            this.labTitle.text = Template.getGUIText(task_info.Txt);
            var my_task = Singleton.Get(DailyTaskManager).getData().getTask(task_id);
            if (my_task != undefined) {
                this.labTimes.text = my_task.cnt + "/" + task_info.MaxNumber;
                this.setGoActive(!my_task.checkCompletedMax());
            }
            else {
                this.labTimes.text = 0 + "/" + task_info.MaxNumber;
                this.setGoActive(true);
            }
        };
        /**
         * 设定前往按钮状态
         * @param active
         */
        DailyTaskItemView.prototype.setGoActive = function (active) {
            this.btnGo.visible = active;
            this.groupHideGo.visible = !active;
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        DailyTaskItemView.prototype.onAddToStage = function (e) {
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        DailyTaskItemView.prototype.onRemoveFromStage = function (e) {
            this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
        };
        /**
         * 响应点击前往按钮
         * @param e
         */
        DailyTaskItemView.prototype.onClick_btnGo = function (e) {
            var my_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
            var instance_pass = true;
            var f_cfg = null;
            switch (this.data.task_id) {
                case DailyTaskType.ARENA:
                    if (OpenManager.CheckOpenWithInfo(OpenType.Arena) == false)
                        return;
                    break;
                case DailyTaskType.DUEL:
                    if (OpenManager.CheckOpenWithInfo(OpenType.Duel) == false)
                        return;
                    break;
                case DailyTaskType.INSTANCE_Mat:
                    f_cfg = Template.fbtype.get(102);
                    break;
                case DailyTaskType.INSTANCE_Equip:
                    f_cfg = Template.fbtype.get(101);
                    break;
                case DailyTaskType.INSTANCE_Gold:
                    f_cfg = Template.fbtype.get(104);
                    break;
                case DailyTaskType.INSTANCE_Hero:
                    f_cfg = Template.fbtype.get(103);
                    break;
                case DailyTaskType.TOWER_RESET:
                    if (OpenManager.CheckOpenWithInfo(OpenType.Tower) == false)
                        return;
                case DailyTaskType.WISH:
                    if (OpenManager.CheckOpenWithInfo(OpenType.Wish) == false)
                        return;
                    break;
            }
            if (f_cfg != null && f_cfg.OpenLv > my_lv) {
                Singleton.Get(DialogControler).showInfo(1169, this, null, null, f_cfg.OpenLv);
                return;
            }
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.DailyTaskView).close();
            switch (this.data.task_id) {
                case DailyTaskType.ARENA:
                    layer.getView(ui.MainView).onClick_btnCastle(undefined);
                    layer.getView(ui.ArenaBaseView).open();
                    layer.getView(ui.ArenaBaseView).openEnemyListPanel();
                    layer.getView(ui.ArenaEnemyListView).return_to_daily = true;
                    break;
                case DailyTaskType.DRAW:
                    layer.getView(ui.MainView).onClick_btnShop(undefined);
                    layer.getView(ui.DrawBaseView).return_to_daily = true;
                    break;
                case DailyTaskType.DUEL:
                    layer.getView(ui.MainView).onClick_btnCastle(undefined);
                    layer.getView(ui.DuelView).open();
                    layer.getView(ui.DuelView).return_to_daily = true;
                    break;
                case DailyTaskType.INSTANCE_Mat:
                    layer.getView(ui.MainView).onClick_btnCastle(undefined);
                    layer.getView(ui.InstanceNewBaseView).open();
                    layer.getView(ui.InstanceNewBaseView).openSecondaryMenu();
                    layer.getView(ui.InstanceNewListView).open(102);
                    layer.getView(ui.InstanceNewListView).return_to_daily = true;
                    break;
                case DailyTaskType.INSTANCE_Equip:
                    layer.getView(ui.MainView).onClick_btnCastle(undefined);
                    layer.getView(ui.InstanceNewBaseView).open();
                    layer.getView(ui.InstanceNewBaseView).openSecondaryMenu();
                    layer.getView(ui.InstanceNewListView).open(101);
                    layer.getView(ui.InstanceNewListView).return_to_daily = true;
                    break;
                case DailyTaskType.INSTANCE_Gold:
                    layer.getView(ui.MainView).onClick_btnCastle(undefined);
                    layer.getView(ui.InstanceNewBaseView).open();
                    layer.getView(ui.InstanceNewBaseView).openSecondaryMenu();
                    layer.getView(ui.InstanceNewListView).open(104);
                    layer.getView(ui.InstanceNewListView).return_to_daily = true;
                    break;
                case DailyTaskType.INSTANCE_Hero:
                    layer.getView(ui.MainView).onClick_btnCastle(undefined);
                    layer.getView(ui.InstanceNewBaseView).open();
                    layer.getView(ui.InstanceNewBaseView).openSecondaryMenu();
                    layer.getView(ui.InstanceNewListView).open(103);
                    layer.getView(ui.InstanceNewListView).return_to_daily = true;
                    break;
                case DailyTaskType.PVE_BOSS:
                case DailyTaskType.QUICK_PVE:
                    layer.getView(ui.MainView).onClick_btnBattle(undefined, false);
                    break;
                case DailyTaskType.BUY_GOLD:
                    layer.getView(ui.MainView).onClick_btnBattle(undefined, false);
                    layer.getView(ui.ShopGoldBuyPanelView).open();
                    break;
                case DailyTaskType.TOWER_RESET:
                    layer.getView(ui.MainView).onClick_btnCastle(undefined);
                    Singleton.Get(LayerManager).getView(ui.TowerView).open();
                    break;
                case DailyTaskType.WISH:
                    if (OpenManager.CheckOpenWithInfo(OpenType.Wish)) {
                        layer.getView(ui.MainView).onClick_btnCastle(undefined);
                        Singleton.Get(LayerManager).getView(ui.WishView).open();
                    }
                    break;
            }
        };
        return DailyTaskItemView;
    }(eui.ItemRenderer));
    ui.DailyTaskItemView = DailyTaskItemView;
    __reflect(DailyTaskItemView.prototype, "ui.DailyTaskItemView");
})(ui || (ui = {}));
//# sourceMappingURL=DailyTaskItemView.js.map