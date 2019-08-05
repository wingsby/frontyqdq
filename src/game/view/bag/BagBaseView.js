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
    var BagBaseView = (function (_super) {
        __extends(BagBaseView, _super);
        // region 事件绑定
        /**
         * 构造函数
         */
        function BagBaseView() {
            var _this = _super.call(this, "yw.BagBaseSkin") || this;
            _this.cur_item_type = ItemType.Null; // 当前选择的背包页类型
            _this.allow_ani = false;
            _this.initGuiText();
            _this.initEvent();
            return _this;
        }
        /**
         * 响应创建子对象
         */
        BagBaseView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 相应对象创建完成
         */
        BagBaseView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        BagBaseView.prototype.onDestroy = function () {
            this.disposeEvent();
        };
        /**
         * 帧更新
         * @param time
         */
        BagBaseView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化事件
         */
        BagBaseView.prototype.initEvent = function () {
            // 基本事件
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            // 一级切页按钮
            this.btnItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnItem, this);
            this.btnEquip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquip, this);
            this.btnEquipFrag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquipFrag, this);
            this.btnGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGift, this);
            // this.btnRoleFrag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRoleFrag, this);
            // 回退按钮
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            // 道具列表 ItemRender
            this.listItems.itemRenderer = ui.BagListItemView;
            this.listItems.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
            // 装备分解按钮
            this.btnResolve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnResolve, this);
            this.btnCompose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCompose, this);
        };
        /**
         * 回收事件
         */
        BagBaseView.prototype.disposeEvent = function () {
            // 基本事件
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            // 一级切页按钮
            this.btnItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnItem, this);
            this.btnEquip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquip, this);
            this.btnEquipFrag.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEquipFrag, this);
            this.btnGift.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGift, this);
            // this.btnRoleFrag.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRoleFrag, this);
            // 回退按钮
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            // 道具列表 ItemRender
            this.listItems.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
            // 装备分解按钮
            this.btnResolve.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnResolve, this);
            this.btnCompose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCompose, this);
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        BagBaseView.prototype.onAddToStage = function (e) {
        };
        /**
         * 响应从舞台删除
         * @param e
         */
        BagBaseView.prototype.onRemoveFromStage = function (e) {
        };
        /**
         * 初始化UI文字
         */
        BagBaseView.prototype.initGuiText = function () {
            this.btnItem.text = "道具";
            this.btnEquip.text = "装备";
            this.btnEquipFrag.text = "装备碎片";
            // this.btnRoleFrag.text = "角色碎片";
            this.btnGift.text = "礼包";
            this.labTextCapacity.text = "背包上限：无";
            this.labTextCapacityEquip.text = "背包上限：";
            this.labCapacity.text = Template.getGUIText("ui_beibao");
            this.btnResolve.text = "分  解";
            this.btnCompose.text = "合  成";
        };
        /**
         * 打开界面
         */
        BagBaseView.prototype.open = function () {
            var _this = this;
            Singleton.Get(BagManager).tryReqSyncBag(function () {
                Singleton.Get(LayerManager).addView(_this);
                Common.playStackAni(_this.btnBack, [_this.btnEquip, _this.btnEquipFrag, _this.btnItem, _this.btnGift]);
                // 默认打开第一个界面
                _this.onClick_btnEquip(undefined);
                if (_this.compEmpty.visible) {
                    _this.compEmpty.playAni();
                }
            }, this);
        };
        /**
         * 关闭界面
         */
        BagBaseView.prototype.close = function () {
            // 关闭当前界面
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**
         * 刷新界面
         */
        BagBaseView.prototype.refresh = function () {
            if (Singleton.Get(LayerManager).isViewOnStage(this)) {
                this.initItemList(this.cur_item_type, true);
            }
        };
        // endregion
        // region 一级/二级 切页按钮切换
        /**
         * 响应点击回退按钮
         * @param e
         */
        //noinspection JSMethodCanBeStatic
        BagBaseView.prototype.onClick_btnBack = function (e) {
            Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(undefined, false);
        };
        // endregion
        // region 斗士/阵容 切换
        /**
         * 响应点击道具按钮
         * @param e
         */
        BagBaseView.prototype.onClick_btnItem = function (e) {
            UtilsEffect.tabEffect(this.btnItem);
            this.initItemList(ItemType.Material);
            this.hideAllbutMeSenior(this.btnItem);
        };
        /**
         * 响应点击装备按钮
         * @param e
         */
        BagBaseView.prototype.onClick_btnEquip = function (e) {
            UtilsEffect.tabEffect(this.btnEquip);
            this.initItemList(ItemType.Equip);
            this.hideAllbutMeSenior(this.btnEquip);
        };
        /**
         * 响应点击装备碎片按钮
         * @param e
         */
        BagBaseView.prototype.onClick_btnEquipFrag = function (e) {
            UtilsEffect.tabEffect(this.btnEquipFrag);
            this.initItemList(ItemType.EquipFragment);
            this.hideAllbutMeSenior(this.btnEquipFrag);
        };
        /**
         * 响应点击角色碎片按钮
         * @param e
         */
        BagBaseView.prototype.onClick_btnRoleFrag = function (e) {
            this.initItemList(ItemType.RoleFragment);
            // this.hideAllbutMeSenior(this.btnRoleFrag);
        };
        /**
         * 响应点击礼包按钮
         */
        BagBaseView.prototype.onClick_btnGift = function () {
            UtilsEffect.tabEffect(this.btnGift);
            this.initItemList(ItemType.Gift);
            this.hideAllbutMeSenior(this.btnGift);
        };
        /**
         * 关闭所有
         * @param me
         */
        BagBaseView.prototype.hideAllbutMeSenior = function (me) {
            // 设定切页按钮状态
            this.btnItem.active = me == this.btnItem;
            this.btnEquip.active = me == this.btnEquip;
            this.btnEquipFrag.active = me == this.btnEquipFrag;
            this.btnGift.active = me == this.btnGift;
            // this.btnRoleFrag.active = me == this.btnRoleFrag;
        };
        /**
         * 响应道具图标点击事件
         * @param e
         */
        BagBaseView.prototype.onClick_listItems = function (e) {
            var item_id = e.item.item_id;
            var cfg_item = Template.item.get(item_id);
            if (!cfg_item) {
                console.error("no item: " + item_id);
                return;
            }
            switch (cfg_item.iType) {
                case ItemType.Material:
                case ItemType.EnchantConst:
                    Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(item_id);
                    break;
                case ItemType.Equip:
                    Singleton.Get(LayerManager).getView(ui.BagEquipDetailPanelView).open(item_id);
                    break;
                case ItemType.EquipFragment:
                    Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openEquipFrag(item_id, true);
                    break;
                case ItemType.Gift:
                    if (!cfg_item.BonusItem || cfg_item.BonusItem.length <= 0 || cfg_item.BonusItem[0] == 0 || cfg_item.BonusItem.length != cfg_item.BonusCounts.length) {
                        Singleton.Get(DialogControler).showInfo(1199);
                        return;
                    }
                    Singleton.Get(LayerManager).getView(ui.BagGiftUseSwitchView).open(item_id);
                    break;
                case ItemType.SimpleGift:
                    if (!cfg_item.BonusItem || cfg_item.BonusItem.length <= 0 || cfg_item.BonusItem[0] == 0 || cfg_item.BonusItem.length != cfg_item.BonusCounts.length) {
                        Singleton.Get(DialogControler).showInfo(1199);
                        return;
                    }
                    Singleton.Get(LayerManager).getView(ui.BagGiftUseNormalView).open(item_id);
                    break;
                case ItemType.RandomGift:
                    if (!cfg_item.BonusItem || cfg_item.BonusItem.length <= 0 || cfg_item.BonusItem[0] == 0) {
                        Singleton.Get(DialogControler).showInfo(1199);
                        return;
                    }
                    for (var i = 0; i < cfg_item.BonusItem.length; i++) {
                        if (!Template.award.get(cfg_item.BonusItem[i])) {
                            Singleton.Get(DialogControler).showInfo(1199);
                            return;
                        }
                    }
                    Singleton.Get(LayerManager).getView(ui.BagGiftUseNormalView).open(item_id);
                    break;
                default:
                    break;
            }
        };
        // endregion
        // region 不同背包面板
        /**
         * 初始化物品列表
         * @param item_type
         */
        BagBaseView.prototype.initItemList = function (item_type, is_refresh) {
            if (is_refresh === void 0) { is_refresh = false; }
            this.cur_item_type = item_type;
            this.refreshAlarm();
            // 定义显示的道具类型
            var item_types = [];
            item_types.push(item_type);
            switch (item_type) {
                case ItemType.Gift:
                    item_types.push(ItemType.SimpleGift);
                    item_types.push(ItemType.RandomGift);
                    break;
                case ItemType.Material:
                    item_types.push(ItemType.EnchantConst);
            }
            switch (item_type) {
                case ItemType.Equip:
                    this.initEquipList(is_refresh);
                    this.btnResolve.visible = true;
                    this.btnCompose.visible = false;
                    this.groupCapacity.visible = false;
                    this.groupCapacityEquip.visible = true;
                    this.groupCapacityItem.visible = false;
                    return;
                case ItemType.Material:
                    this.labTextCapacityItem.text = "背包上限：" + UtilsGame.numberToString(Template.item.values.filter(function (v, i, arr) { return UtilsArray.contains(item_types, v.iType); }).length);
                    this.btnResolve.visible = false;
                    this.btnCompose.visible = true;
                    this.groupCapacity.visible = false;
                    this.groupCapacityEquip.visible = false;
                    this.groupCapacityItem.visible = true;
                    break;
                default:
                    this.btnResolve.visible = false;
                    this.btnCompose.visible = false;
                    this.groupCapacity.visible = true;
                    this.groupCapacityEquip.visible = false;
                    this.groupCapacityItem.visible = false;
                    break;
            }
            // 根据配置表道具总数显示背包上限
            this.labTextCapacity.text = "背包上限：" + UtilsGame.numberToString(Template.item.values.filter(function (v, i, arr) { return UtilsArray.contains(item_types, v.iType); }).length);
            // 获取当前应该显示的道具列表
            var items = Singleton.Get(BagManager).m_bag_dict;
            var cur_items = [];
            items.foreachKey(function (item_id) {
                var item_info = Template.item.get(item_id);
                if (!item_info) {
                    console.error("no itemId: " + item_id);
                    return;
                }
                var match_type = false;
                for (var i = 0; i < item_types.length; i++) {
                    if (item_info.iType == item_types[i]) {
                        match_type = true;
                        break;
                    }
                }
                if (!match_type) {
                    return;
                }
                cur_items.push(item_id);
            }, this);
            this.allow_ani = !is_refresh;
            // 排序
            cur_items.sort(Common.sortItems);
            cur_items.reverse(); // 倒序排列
            // 构造列表数据
            var ds_list_items = [];
            this.listItems.dataProvider = new eui.ArrayCollection(ds_list_items);
            for (var i = 0; i < cur_items.length; i++) {
                ds_list_items.push({
                    item_id: cur_items[i],
                    ani_idx: is_refresh ? -1 : i
                });
            }
            this.listItems.height = 562;
            this.listItems.validateNow();
            this.scrollerItems.viewport.scrollV = 0;
            this.allow_ani = false;
            this.checkEmpty(ds_list_items);
        };
        /**
         * 初始化装备列表
         */
        BagBaseView.prototype.initEquipList = function (is_refresh) {
            if (is_refresh === void 0) { is_refresh = false; }
            this.labCapacityEquip.text = Singleton.Get(BagManager).getEquipBag().length + "/" + Template.config.EquipNum;
            // 获取当前装备列表
            var cur_items = Singleton.Get(BagManager).getEquipBag();
            // 排序
            cur_items.sort(Common.sortItems);
            cur_items.reverse(); // 倒序排列
            this.allow_ani = !is_refresh;
            // 构造列表数据
            var ds_list_items = [];
            this.listItems.dataProvider = new eui.ArrayCollection(ds_list_items);
            for (var i = 0; i < cur_items.length; i++) {
                ds_list_items.push({
                    item_id: cur_items[i],
                    ani_idx: is_refresh ? -1 : i
                });
            }
            this.listItems.height = 530;
            this.listItems.validateNow();
            this.scrollerItems.viewport.scrollV = 0;
            this.allow_ani = false;
            this.checkEmpty(ds_list_items);
        };
        // endregion
        // region 功能按钮
        BagBaseView.prototype.onClick_btnResolve = function () {
            UtilsEffect.buttonEffect(this.btnResolve);
            Singleton.Get(LayerManager).getView(ui.EquipResolveView).open();
        };
        BagBaseView.prototype.onClick_btnCompose = function () {
            UtilsEffect.buttonEffect(this.btnCompose);
            Singleton.Get(LayerManager).getView(ui.BagComposeListView).open();
        };
        // endregion
        // region 红点刷新
        /**
         * 刷新界面上的红点状态
         */
        BagBaseView.prototype.refreshAlarm = function () {
            this.btnEquipFrag.isNew = Singleton.Get(BagManager).getAlarm().isAlarm(E_BAG_ALARM_TYPE.EQUIP_FRAG_COMPOSE);
            this.btnGift.isNew = Singleton.Get(BagManager).getAlarm().isAlarm(E_BAG_ALARM_TYPE.GIFT);
        };
        // endregion
        // region 空包提示
        BagBaseView.prototype.checkEmpty = function (data) {
            if (!data || data.length <= 0) {
                this.compEmpty.visible = true;
                this.compEmpty.text = "背包中没有";
                switch (this.cur_item_type) {
                    case ItemType.EquipFragment:
                        this.compEmpty.text += "装备碎片";
                        break;
                    case ItemType.Equip:
                        this.compEmpty.text += "装备";
                        break;
                    case ItemType.Material:
                        this.compEmpty.text += "道具";
                        break;
                    case ItemType.Gift:
                        this.compEmpty.text += "礼包";
                        break;
                }
            }
            else {
                this.compEmpty.visible = false;
            }
        };
        return BagBaseView;
    }(BaseUI));
    ui.BagBaseView = BagBaseView;
    __reflect(BagBaseView.prototype, "ui.BagBaseView");
})(ui || (ui = {}));
//# sourceMappingURL=BagBaseView.js.map