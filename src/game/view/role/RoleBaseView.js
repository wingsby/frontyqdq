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
    var RoleBaseViewMenuSenior;
    (function (RoleBaseViewMenuSenior) {
        RoleBaseViewMenuSenior[RoleBaseViewMenuSenior["Lineup"] = 1] = "Lineup";
        RoleBaseViewMenuSenior[RoleBaseViewMenuSenior["List"] = 2] = "List";
        RoleBaseViewMenuSenior[RoleBaseViewMenuSenior["Exchange"] = 3] = "Exchange";
    })(RoleBaseViewMenuSenior || (RoleBaseViewMenuSenior = {}));
    var RoleBaseView = (function (_super) {
        __extends(RoleBaseView, _super);
        // region 事件绑定
        /**
         * 构造函数
         */
        function RoleBaseView() {
            var _this = _super.call(this, "yw.RoleBaseSkin") || this;
            _this.cur_active_role_id = 0;
            _this.cur_jew_pos = EquipPos.Ring;
            _this.initEvent();
            return _this;
        }
        /**
         * 响应创建子对象
         */
        RoleBaseView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 相应对象创建完成
         */
        RoleBaseView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleBaseView.prototype.onDestroy = function () {
            this.disposeEvent();
        };
        /**
         * 帧更新
         * @param time
         */
        RoleBaseView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化事件
         */
        RoleBaseView.prototype.initEvent = function () {
            // 基本事件
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            // 一级切页按钮
            this.btnList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnList, this);
            this.btnLineup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLineup, this);
            this.btnExchange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExchange, this);
            // 二级切页按钮
            this.btnLevelup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLevelup, this);
            this.btnBreach.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBreach, this);
            this.btnTalent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTalent, this);
            this.btnAwaken.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAwaken, this);
            // 装备切页按钮
            this.btnEquipStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquipStrength, this);
            this.btnEquipRefine.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquipRefine, this);
            this.btnEquipEnchant.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquipEnchant, this);
            // 饰品切页按钮
            this.btnJewelryStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnJewelryStrength, this);
            this.btnJewelryEvolution.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnJewelryEvolution, this);
            // 回退按钮
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnBackSenior.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackSenior, this);
            this.btnBackEquip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackEquip, this);
            this.btnBackJewelry.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackJewelry, this);
            // ItemRender
            this.listAvatars.itemRenderer = ui.RoleSimpleAvatarView;
            this.listAvatars.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listAvatars, this);
        };
        /**
         * 回收事件
         */
        RoleBaseView.prototype.disposeEvent = function () {
            // 基本事件
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            // 一级切页按钮
            this.btnList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnList, this);
            this.btnLineup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLineup, this);
            this.btnExchange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExchange, this);
            // 二级切页按钮
            this.btnLevelup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLevelup, this);
            this.btnBreach.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBreach, this);
            this.btnTalent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTalent, this);
            this.btnAwaken.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAwaken, this);
            // 装备切页按钮
            this.btnEquipStrength.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquipStrength, this);
            this.btnEquipRefine.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquipRefine, this);
            this.btnEquipEnchant.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquipEnchant, this);
            // 饰品切页按钮
            this.btnJewelryStrength.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnJewelryStrength, this);
            this.btnJewelryEvolution.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnJewelryEvolution, this);
            // 回退按钮
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnBackSenior.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackSenior, this);
            this.btnBackEquip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackEquip, this);
            this.btnBackJewelry.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackJewelry, this);
            // ItemRender
            this.listAvatars.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listAvatars, this);
        };
        /**
         * 响应添加到舞台
         */
        RoleBaseView.prototype.onAddToStage = function () {
            this.attachToHook();
            this.initGuiText();
        };
        /**
         * 响应从舞台删除
         */
        RoleBaseView.prototype.onRemoveFromStage = function () {
        };
        /**
         * 将UI依附到主界面挂点
         */
        RoleBaseView.prototype.attachToHook = function () {
            var mainView = Singleton.Get(ui.MainView);
            if (!mainView.groupRoleHook) {
                egret.error("UI hook mainView.groupRoleHook is not existed");
                return;
            }
            var hook = mainView.groupRoleHook;
            this.x = hook.x;
            this.y = hook.y;
            this.top = hook.top;
            this.anchorOffsetX = hook.anchorOffsetX;
            this.anchorOffsetY = hook.anchorOffsetY;
            this.horizontalCenter = hook.horizontalCenter;
            this.verticalCenter = hook.verticalCenter;
        };
        /**
         * 初始化UI文字
         * TODO 加到字典表
         */
        RoleBaseView.prototype.initGuiText = function () {
            this.btnList.text = "斗士"; // todo 字典 Template.getGUIText();
            this.btnLineup.text = "阵容"; // todo 字典
            this.btnExchange.text = "互换";
            this.btnLevelup.text = Template.getGUIText("ui_role1");
            this.btnBreach.text = Template.getGUIText("ui_role12");
            this.btnTalent.text = Template.getGUIText("ui_role3");
            this.btnAwaken.text = Template.getGUIText("ui_role4");
            this.btnEquipStrength.text = Template.getGUIText("ui_equip1");
            this.btnEquipRefine.text = Template.getGUIText("ui_equip2");
            this.btnEquipEnchant.text = "附魔";
            this.btnJewelryStrength.text = Template.getGUIText("ui_equip1");
            this.btnJewelryEvolution.text = Template.getGUIText("ui_role3");
        };
        /**
         * 显示大框
         * @param is_large
         */
        RoleBaseView.prototype.showFrame = function (is_large) {
            this.group_Frame.visible = is_large;
            this.group_FrameSmall.visible = !is_large;
            this.groupAvatars.visible = !is_large;
            this.initAvatars();
        };
        /**
         * 打开界面
         */
        RoleBaseView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            // 重新打开时 清空布阵界面记忆的选中角色
            Singleton.Get(LayerManager).getView(ui.RoleLineupView).cleanResume();
            this.openSeniorMenu();
            this.showFrame(true);
        };
        /**
         * 关闭界面
         */
        RoleBaseView.prototype.close = function () {
            // 关闭当前界面
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            // 当前打开页置空
            this.m_active_panel_button_senior_index = undefined;
            // 隐藏所有子界面
            this.hideAllPanel();
        };
        /**
         * 刷新界面
         */
        RoleBaseView.prototype.refresh = function () {
            this.onAlarmEquip();
            this.onAlarmJewelry();
            this.initAvatars();
            this.refreshAlarmSenior();
            this.refreshAlarmSecoundary();
        };
        // endregion
        // region 一级/二级/三级 切页按钮切换
        /**
         * 响应点击一级回退按钮
         * @param e
         */
        RoleBaseView.prototype.onClick_btnBackSenior = function (e) {
            Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(undefined, false);
        };
        /**
         * 响应点击二级回退按钮
         * @param e
         */
        RoleBaseView.prototype.onClick_btnBack = function (e) {
            this.openSeniorMenu();
        };
        /**
         * 响应点击三级（装备）回退按钮
         * @param e
         */
        RoleBaseView.prototype.onClick_btnBackEquip = function (e) {
            this.closeEquipPanel();
        };
        /**
         * 响应点击三级（饰品）回退按钮
         */
        RoleBaseView.prototype.onClick_btnBackJewelry = function () {
            this.closeEquipPanel();
        };
        /**
         * 打开一级菜单
         */
        RoleBaseView.prototype.openSeniorMenu = function () {
            this.groupBtnSenior.visible = true;
            this.groupBtnSecondary.visible = false;
            this.groupBtnEquip.visible = false;
            this.groupBtnJewelry.visible = false;
            if (this.m_active_panel_button_senior_index == RoleBaseViewMenuSenior.List) {
                this.hideAllbutMeSenior(this.btnList);
                RoleBaseView.openListPanel();
            }
            else {
                this.hideAllbutMeSenior(this.btnLineup);
                RoleBaseView.openLineupPanel();
            }
            this.showFrame(true);
            Common.playStackAni(this.btnBackSenior, [this.btnLineup, this.btnList, this.btnExchange]);
        };
        /**
         * 打开二级菜单
         */
        RoleBaseView.prototype.openSecondaryMenu = function () {
            this.groupBtnSenior.visible = false;
            this.groupBtnSecondary.visible = true;
            this.groupBtnEquip.visible = false;
            this.groupBtnJewelry.visible = false;
            this.hideAllbutMeScondary(this.btnLevelup);
            this.showFrame(false);
            Common.playStackAni(this.btnBack, [this.btnLevelup, this.btnBreach, this.btnTalent, this.btnAwaken]);
            // 检查是否要加锁
            if (OpenManager.CheckOpen(OpenType.RoleBreach) == false) {
                this.lockBreach.visible = true;
                this.lockBreach.setLock(OpenType.RoleBreach);
            }
            else {
                this.lockBreach.visible = false;
            }
            // 检查是否要加锁
            if (OpenManager.CheckOpen(OpenType.RoleTalent) == false) {
                this.lockTalent.visible = true;
                this.lockTalent.setLock(OpenType.RoleTalent);
            }
            else {
                this.lockTalent.visible = false;
            }
        };
        /**
         * 打开三级（装备）菜单
         */
        RoleBaseView.prototype.openEquipMenu = function () {
            this.onAlarmEquip();
            this.groupBtnSenior.visible = false;
            this.groupBtnSecondary.visible = false;
            this.groupBtnEquip.visible = true;
            this.groupBtnJewelry.visible = false;
            this.showFrame(false);
            Common.playStackAni(this.btnBackEquip, [this.btnEquipStrength, this.btnEquipRefine, this.btnEquipEnchant]);
        };
        /**
         * 打开三级（饰品）菜单
         */
        RoleBaseView.prototype.openJewelryMenu = function () {
            this.onAlarmJewelry();
            this.groupBtnSenior.visible = false;
            this.groupBtnSecondary.visible = false;
            this.groupBtnEquip.visible = false;
            this.groupBtnJewelry.visible = true;
            this.showFrame(false);
            Common.playStackAni(this.btnBackJewelry, [this.btnJewelryStrength, this.btnJewelryEvolution]);
        };
        /**
         * 隐藏所有子界面
         */
        RoleBaseView.prototype.hideAllPanel = function () {
            // 关闭一级层
            RoleBaseView.closeListPanel();
            RoleBaseView.closeLineupPanel();
            RoleBaseView.closeExchangePanel();
            // 关闭二级层
            this.closeLevelupPanel();
            this.closeAwakenPanel();
            this.closeBreachPanel();
            this.closeTalentPanel();
            // 关闭三级层（装备）
            RoleBaseView.closeEquipRefinePanel();
            RoleBaseView.closeEquipStrengthPanel();
            RoleBaseView.closeEquipEnchantPanel();
            // 关闭三级层（饰品）
            RoleBaseView.closeJewelryStrengthPanel();
            RoleBaseView.closeJewelryEvolutionPanel();
        };
        // endregion
        // region 斗士/阵容 切换
        /**
         * 响应点击斗士按钮
         * @param e
         */
        RoleBaseView.prototype.onClick_btnList = function () {
            UtilsEffect.tabEffect(this.btnList);
            RoleBaseView.closeLineupPanel();
            RoleBaseView.openListPanel();
            RoleBaseView.closeExchangePanel();
            this.btnList.active = true;
            this.btnLineup.active = false;
            this.btnExchange.active = false;
            this.m_active_panel_button_senior_index = RoleBaseViewMenuSenior.List;
        };
        /**
         * 响应点击阵容按钮
         * @param e
         */
        RoleBaseView.prototype.onClick_btnLineup = function () {
            UtilsEffect.tabEffect(this.btnLineup);
            RoleBaseView.closeListPanel();
            RoleBaseView.openLineupPanel();
            RoleBaseView.closeExchangePanel();
            this.btnLineup.active = true;
            this.btnList.active = false;
            this.btnExchange.active = false;
            this.m_active_panel_button_senior_index = RoleBaseViewMenuSenior.Lineup;
        };
        /**
         * 响应点击互换按钮
         * @param e
         */
        RoleBaseView.prototype.onClick_btnExchange = function () {
            UtilsEffect.tabEffect(this.btnExchange);
            RoleBaseView.closeListPanel();
            RoleBaseView.closeLineupPanel();
            RoleBaseView.openExchangePanel();
            this.btnLineup.active = false;
            this.btnList.active = false;
            this.btnExchange.active = true;
            this.m_active_panel_button_senior_index = RoleBaseViewMenuSenior.Lineup;
        };
        /**
         * 打开斗士面板
         */
        RoleBaseView.openListPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleListView).open();
        };
        /**
         * 关闭斗士面板
         */
        RoleBaseView.closeListPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleListView).close();
        };
        /**
         * 打开阵容面板
         */
        RoleBaseView.openLineupPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleLineupView).open();
        };
        /**
         * 关闭阵容面板
         */
        RoleBaseView.closeLineupPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleLineupView).close();
            Singleton.Get(LayerManager).getView(ui.RoleLineupRecView).close();
        };
        /**
         * 打开互换面板
         */
        RoleBaseView.openExchangePanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleEquipExchangeView).open();
        };
        /**
         * 关闭互换面板
         */
        RoleBaseView.closeExchangePanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleEquipExchangeView).close();
        };
        /**
         * 关闭所有
         * @param me
         */
        RoleBaseView.prototype.hideAllbutMeSenior = function (me) {
            // 隐藏所有子界面
            this.hideAllPanel();
            // 设定切页按钮状态
            this.btnList.active = me == this.btnList;
            this.btnLineup.active = me == this.btnLineup;
            this.btnExchange.active = me == this.btnExchange;
            this.refreshAlarmSenior();
        };
        // endregion
        // region 提升/突破/升阶/觉醒 切换
        /**
         * 打开角色二级菜单
         */
        RoleBaseView.prototype.openRole = function (role_id) {
            this.cur_active_role_id = role_id;
            this.openSecondaryMenu();
            this.openLevelupPanel();
            this.scrSelAvatar();
        };
        /**
         * 关闭角色二级菜单
         */
        RoleBaseView.prototype.closeRole = function (role_id) {
            this.openSeniorMenu();
            this.cur_active_role_id = 0;
        };
        /**
         * 获取当前激活的RoleId
         * @returns {number}
         */
        RoleBaseView.prototype.getCurActiveRoleId = function () {
            return this.cur_active_role_id;
        };
        /**
         * 响应打开提升面板
         */
        RoleBaseView.prototype.openLevelupPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleLevelupView).open();
        };
        /**
         * 响应关闭提升面板
         */
        RoleBaseView.prototype.closeLevelupPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleLevelupView).close();
        };
        /**
         * 响应打开突破面板
         */
        RoleBaseView.prototype.openBreachPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleBreachView).open();
        };
        /**
         * 响应关闭突破面板
         */
        RoleBaseView.prototype.closeBreachPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleBreachView).close();
        };
        /**
         * 响应打开升阶按钮
         */
        RoleBaseView.prototype.openTalentPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleTalentView).open();
        };
        /**
         * 响应关闭升阶按钮
         */
        RoleBaseView.prototype.closeTalentPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleTalentView).close();
        };
        /**
         * 响应打开觉醒面板
         */
        RoleBaseView.prototype.openAwakenPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleAwakenView).open();
        };
        /**
         * 响应关闭觉醒面板
         */
        RoleBaseView.prototype.closeAwakenPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleAwakenView).close();
        };
        /**
         * 响应点击提升按钮
         * @param e
         */
        RoleBaseView.prototype.onClick_btnLevelup = function (e) {
            UtilsEffect.tabEffect(this.btnLevelup);
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(layer.getView(ui.RoleBreachView))) {
                layer.getView(ui.RoleLevelupView).playCardDynamicFromBreach();
            }
            else if (layer.isViewOnStage(layer.getView(ui.RoleTalentView))) {
                layer.getView(ui.RoleLevelupView).playCardDynamicFromTalent();
            }
            this.hideAllbutMeScondary(this.btnLevelup);
            this.openLevelupPanel();
        };
        /**
         * 响应点击突破按钮
         * @param e
         */
        RoleBaseView.prototype.onClick_btnBreach = function (e) {
            UtilsEffect.tabEffect(this.btnBreach);
            if (OpenManager.CheckOpen(OpenType.RoleBreach)) {
                var layer = Singleton.Get(LayerManager);
                if (layer.isViewOnStage(layer.getView(ui.RoleLevelupView))) {
                    layer.getView(ui.RoleBreachView).playCardDynamicFromLevelup();
                }
                else if (layer.isViewOnStage(layer.getView(ui.RoleTalentView))) {
                    layer.getView(ui.RoleBreachView).playCardDynamicFromTalent();
                }
                this.hideAllbutMeScondary(this.btnBreach);
                this.openBreachPanel();
            }
        };
        /**
         * 响应点击升阶按钮
         * @param e
         */
        RoleBaseView.prototype.onClick_btnTalent = function (e) {
            UtilsEffect.tabEffect(this.btnTalent);
            if (OpenManager.CheckOpen(OpenType.RoleTalent)) {
                var layer = Singleton.Get(LayerManager);
                if (layer.isViewOnStage(layer.getView(ui.RoleLevelupView))) {
                    layer.getView(ui.RoleTalentView).playCardDynamicFromLevelup();
                }
                else if (layer.isViewOnStage(layer.getView(ui.RoleBreachView))) {
                    layer.getView(ui.RoleTalentView).playCardDynamicFromBreach();
                }
                this.hideAllbutMeScondary(this.btnTalent);
                this.openTalentPanel();
            }
        };
        /**
         * 响应点击觉醒按钮
         * @param e
         */
        RoleBaseView.prototype.onClick_btnAwaken = function (e) {
            UtilsEffect.tabEffect(this.btnAwaken);
            this.hideAllbutMeScondary(this.btnAwaken);
            this.openAwakenPanel();
        };
        /**
         * 关闭所有
         * @param me
         */
        RoleBaseView.prototype.hideAllbutMeScondary = function (me) {
            // 隐藏所有子界面
            this.hideAllPanel();
            // 设定切页按钮状态
            this.btnLevelup.active = me == this.btnLevelup;
            this.btnBreach.active = me == this.btnBreach;
            this.btnTalent.active = me == this.btnTalent;
            this.btnAwaken.active = me == this.btnAwaken;
            this.refreshAlarmSecoundary();
        };
        // endregion
        // region 装备 强化/精炼 切换
        RoleBaseView.prototype.openEquipPanel = function () {
            this.openEquipMenu();
            this.hideAllbutMeEquip(this.btnEquipStrength);
            RoleBaseView.openEquipStrengthPanel();
            // 检查是否要加锁
            if (OpenManager.CheckOpen(OpenType.EquipRefine) == false) {
                this.lockEquipRefine.visible = true;
                this.lockEquipRefine.setLock(OpenType.EquipRefine);
            }
            else {
                this.lockEquipRefine.visible = false;
            }
            // 检查是否要加锁
            if (OpenManager.CheckOpen(OpenType.EquipEnchant) == false) {
                this.lockEquipEnchant.visible = true;
                this.lockEquipEnchant.setLock(OpenType.EquipEnchant);
            }
            else {
                this.lockEquipEnchant.visible = false;
            }
        };
        RoleBaseView.prototype.closeEquipPanel = function () {
            this.openRole(this.cur_active_role_id);
        };
        RoleBaseView.openEquipStrengthPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleEquipStrengthView).open();
        };
        RoleBaseView.closeEquipStrengthPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleEquipStrengthView).close();
        };
        RoleBaseView.openEquipRefinePanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleEquipRefineView).open();
        };
        RoleBaseView.closeEquipRefinePanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleEquipRefineView).close();
        };
        RoleBaseView.openEquipEnchantPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleEquipEnchantView).open();
        };
        RoleBaseView.closeEquipEnchantPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleEquipEnchantView).close();
        };
        RoleBaseView.prototype.onClick_btnEquipStrength = function () {
            UtilsEffect.tabEffect(this.btnEquipStrength);
            this.hideAllbutMeEquip(this.btnEquipStrength);
            RoleBaseView.openEquipStrengthPanel();
        };
        RoleBaseView.prototype.onClick_btnEquipRefine = function () {
            UtilsEffect.tabEffect(this.btnEquipRefine);
            if (OpenManager.CheckOpen(OpenType.EquipRefine)) {
                this.hideAllbutMeEquip(this.btnEquipRefine);
                RoleBaseView.openEquipRefinePanel();
            }
        };
        RoleBaseView.prototype.onClick_btnEquipEnchant = function () {
            UtilsEffect.tabEffect(this.btnEquipEnchant);
            if (OpenManager.CheckOpen(OpenType.EquipEnchant)) {
                this.hideAllbutMeEquip(this.btnEquipEnchant);
                RoleBaseView.openEquipEnchantPanel();
            }
        };
        /**
         * 关闭所有装备界面
         * @param me
         */
        RoleBaseView.prototype.hideAllbutMeEquip = function (me) {
            // 隐藏所有子界面
            this.hideAllPanel();
            // 设定切页按钮状态
            this.btnEquipStrength.active = me == this.btnEquipStrength;
            this.btnEquipRefine.active = me == this.btnEquipRefine;
            this.btnEquipEnchant.active = me == this.btnEquipEnchant;
        };
        // endregion
        // region 饰品 强化/进阶 切换
        RoleBaseView.prototype.openJewelryPanel = function () {
            this.openJewelryMenu();
            this.hideAllbutMeJewelry(this.btnJewelryStrength);
            RoleBaseView.openJewelryStrengthPanel();
        };
        RoleBaseView.openJewelryStrengthPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleJewelryStrengthView).open();
        };
        RoleBaseView.closeJewelryStrengthPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleJewelryStrengthView).close();
        };
        RoleBaseView.openJewelryEvolutionPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleJewelryEvolutionView).open();
        };
        RoleBaseView.closeJewelryEvolutionPanel = function () {
            Singleton.Get(LayerManager).getView(ui.RoleJewelryEvolutionView).close();
        };
        RoleBaseView.prototype.onClick_btnJewelryStrength = function () {
            UtilsEffect.tabEffect(this.btnJewelryStrength);
            this.hideAllbutMeJewelry(this.btnJewelryStrength);
            RoleBaseView.openJewelryStrengthPanel();
        };
        RoleBaseView.prototype.onClick_btnJewelryEvolution = function () {
            UtilsEffect.tabEffect(this.btnJewelryEvolution);
            this.hideAllbutMeJewelry(this.btnJewelryEvolution);
            RoleBaseView.openJewelryEvolutionPanel();
        };
        /**
         * 关闭所有装备界面
         * @param me
         */
        RoleBaseView.prototype.hideAllbutMeJewelry = function (me) {
            // 隐藏所有子界面
            this.hideAllPanel();
            // 设定切页按钮状态
            this.btnJewelryStrength.active = me == this.btnJewelryStrength;
            this.btnJewelryEvolution.active = me == this.btnJewelryEvolution;
        };
        // endregion
        // region 角色头像
        /**
         * 初始化角色头像
         */
        RoleBaseView.prototype.initAvatars = function () {
            this.scrAvatars.validateNow();
            var scr_h = this.scrAvatars.viewport.scrollH;
            // 初始化对应关系表
            this.unlocked_list_roles = [];
            // 初始化数据源
            var ds_list_unlocked = [];
            this.listAvatars.dataProvider = new eui.ArrayCollection(ds_list_unlocked);
            // 遍历已拥有角色
            var pve_team = Singleton.Get(RoleManager).getRolesInfo().pve_team;
            var my_roles_info = Singleton.Get(RoleManager).getRolesInfo();
            // let my_roles = Singleton.Get(RoleManager).getRolesInfo().roles;
            var my_roles_id = RoleBaseView.getMyRoles();
            for (var i = 0; i < my_roles_id.length; i++) {
                var role_id = my_roles_id[i];
                var my_role_info = my_roles_info.GetRole(role_id);
                // 获取角色信息
                var role_info = Template.role.get(role_id);
                if (!role_info) {
                    egret.error("no roleId: " + role_id);
                    return;
                }
                // 获取资质信息
                var my_role_talent = Template.talent.get(my_role_info.talent);
                if (!my_role_talent) {
                    egret.error("no talent, roleId: " + role_id + ", talentId: " + my_role_info.talent);
                    return;
                }
                // 获取觉醒信息
                var my_role_awaken = Template.awaken.get(my_role_info.awaken);
                if (!my_role_awaken) {
                    egret.error("no awaken, roleId: " + role_id + ", awakenId: " + my_role_info.awaken);
                    return;
                }
                // 判断是否出阵
                var is_lineup = pve_team.containsValue(role_id);
                // 构造数据
                ds_list_unlocked.push({
                    roleId: role_id,
                    heroLevel: my_role_info.lv,
                    icon: role_info.Icon,
                    heroTama: Common.getRoleTamaResEx(my_role_info.getAwakenStar(), my_role_info.getAwakenActiveStar()),
                    heroTierBg: Common.getRoleTierBgResEx(my_role_info.getTier()),
                    heroTierSub: Common.getRoleTierSubResEx(my_role_info.getTier()),
                    newAlpha: 0,
                    lineupAlpha: is_lineup ? 1 : 0,
                    roleAlpha: 0,
                    selectAlpha: role_id == this.cur_active_role_id ? 1 : 0
                });
                // 添加对应关系
                this.unlocked_list_roles.push(role_id);
            }
            this.scrAvatars.validateNow();
            this.scrAvatars.viewport.scrollH = scr_h;
        };
        /**
         * 获取我的Roles
         * @returns {number[]}
         */
        RoleBaseView.getMyRoles = function () {
            var my_roles = Singleton.Get(RoleManager).getRolesInfo().roles;
            var my_roles_id = [];
            for (var i = 0; i < my_roles.length; i++) {
                my_roles_id.push(my_roles[i].role_id);
            }
            return Singleton.Get(ui.RoleListView).sortRolesList(my_roles_id); // TODO 写成工具方法
        };
        /**
         * 滚动条滚动至选中的角色头像
         */
        RoleBaseView.prototype.scrSelAvatar = function () {
            var idx = -1;
            for (var i = 0; i < this.unlocked_list_roles.length; i++) {
                if (this.unlocked_list_roles[i] == this.cur_active_role_id) {
                    idx = i;
                }
            }
            if (idx < 0) {
                console.error("no role avatar: " + this.cur_active_role_id);
                return;
            }
            this.scrAvatars.validateNow();
            var scroll_h = (6 * (idx - 1) + 70 * idx) - (this.scrAvatars.width / 2.5) + 2;
            var max_h = (6 * (this.unlocked_list_roles.length - 6 - 1) + 70 * (this.unlocked_list_roles.length - 6)) - 10;
            if (scroll_h <= 184) {
                this.scrAvatars.viewport.scrollH = 0;
            }
            else if (scroll_h > max_h) {
                this.scrAvatars.viewport.scrollH = max_h;
            }
            else {
                this.scrAvatars.viewport.scrollH = scroll_h;
            }
        };
        /**
         * 响应角色头像列表点击事件
         * @param e
         */
        RoleBaseView.prototype.onClick_listAvatars = function (e) {
            this.cur_active_role_id = e.item.roleId;
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(layer.getView(ui.RoleLevelupView))) {
                layer.getView(ui.RoleLevelupView).refresh();
                layer.getView(ui.RoleLevelupView).playCardDynamic();
            }
            if (layer.isViewOnStage(layer.getView(ui.RoleBreachView))) {
                layer.getView(ui.RoleBreachView).refresh();
                layer.getView(ui.RoleBreachView).playCardDynamic();
            }
            if (layer.isViewOnStage(layer.getView(ui.RoleTalentView))) {
                layer.getView(ui.RoleTalentView).refresh();
                layer.getView(ui.RoleTalentView).playCardDynamic();
            }
            if (layer.isViewOnStage(layer.getView(ui.RoleAwakenView))) {
                layer.getView(ui.RoleAwakenView).refresh();
            }
            if (layer.isViewOnStage(layer.getView(ui.RoleEquipStrengthView))) {
                layer.getView(ui.RoleEquipStrengthView).refresh();
                RoleUtil.checkRoleEquipable(this.cur_active_role_id);
            }
            if (layer.isViewOnStage(layer.getView(ui.RoleEquipRefineView))) {
                layer.getView(ui.RoleEquipRefineView).refresh();
                RoleUtil.checkRoleEquipable(this.cur_active_role_id);
            }
            if (layer.isViewOnStage(layer.getView(ui.RoleEquipEnchantView))) {
                layer.getView(ui.RoleEquipEnchantView).refresh();
            }
            if (layer.isViewOnStage(layer.getView(ui.RoleJewelryStrengthView))) {
                layer.getView(ui.RoleJewelryStrengthView).refresh();
            }
            if (layer.isViewOnStage(layer.getView(ui.RoleJewelryEvolutionView))) {
                layer.getView(ui.RoleJewelryEvolutionView).refresh();
            }
            this.onAlarmEquip();
            this.onAlarmJewelry();
            this.refreshAlarmSecoundary();
            // 显示选中框
            for (var i = 0; i < this.listAvatars.dataProvider.length; i++) {
                this.listAvatars.dataProvider.getItemAt(i).selectAlpha = i == e.itemIndex ? 1 : 0;
            }
        };
        // endregion
        // region 红点提示
        /**
         * 更新饰品红点信息
         */
        RoleBaseView.prototype.onAlarmJewelry = function () {
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(this.cur_active_role_id);
            if (!my_role) {
                return;
            }
            this.btnJewelryStrength.isNew = my_role.checkJewelryStrAble();
            this.btnJewelryEvolution.isNew = my_role.checkJewelryEvoAble();
        };
        /**
         * 更新装备红点信息
         */
        RoleBaseView.prototype.onAlarmEquip = function () {
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(this.cur_active_role_id);
            if (!my_role) {
                return;
            }
            this.btnEquipStrength.isNew = my_role.checkEquipStrengthAble();
            this.btnEquipRefine.isNew = my_role.checkEquipRefineAble();
            this.btnEquipEnchant.isNew = my_role.checkEquipEnchantAble();
        };
        RoleBaseView.prototype.refreshAlarmSenior = function () {
            var info = Singleton.Get(RoleManager).getRolesInfo();
            this.btnList.isNew = info.al_role || info.al_compose;
            this.btnLineup.isNew = info.al_hero || info.al_backup;
            // console.log("notify al_role: " + info.al_role + " | al_compose: " + info.al_compose + " | al_hero: " + info.al_hero + " | al_backup: " + info.al_backup);
        };
        RoleBaseView.prototype.refreshAlarmSecoundary = function () {
            var info = Singleton.Get(RoleManager).getRolesInfo();
            var role_id = this.cur_active_role_id;
            if (role_id <= 0) {
                this.btnBreach.isNew = false;
                this.btnTalent.isNew = false;
                this.btnAwaken.isNew = false;
                return;
            }
            var role = info.GetRole(role_id);
            this.btnBreach.isNew = role.alarm.al_breach;
            this.btnTalent.isNew = role.alarm.al_talent;
            this.btnAwaken.isNew = role.alarm.al_awaken;
            this.btnLevelup.isNew = Singleton.Get(ui.RoleLevelupView).onAlarm();
        };
        // endregion
        // region 饰品位保存
        RoleBaseView.prototype.updateCurJewPos = function (pos) {
            this.cur_jew_pos = pos;
            console.log("updateCurJewPos(): " + this.cur_jew_pos);
        };
        RoleBaseView.prototype.getCurJewPos = function () {
            console.log("getCurJewPos(): " + this.cur_jew_pos);
            return this.cur_jew_pos;
        };
        return RoleBaseView;
    }(BaseUI));
    ui.RoleBaseView = RoleBaseView;
    __reflect(RoleBaseView.prototype, "ui.RoleBaseView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleBaseView.js.map