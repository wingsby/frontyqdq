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
    var InstanceNewListItemView = (function (_super) {
        __extends(InstanceNewListItemView, _super);
        function InstanceNewListItemView() {
            var _this = _super.call(this) || this;
            _this.m_arr_items = null;
            _this.skinName = "yw.InstanceNewListItemSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            _this.m_arr_items = new eui.ArrayCollection();
            _this.dgitems.itemRenderer = ui.InstanceNewItemView;
            _this.dgitems.dataProvider = _this.m_arr_items;
            return _this;
        }
        InstanceNewListItemView.prototype.onAddToStage = function (e) {
            this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEnter, this);
            this.btnEnterEx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEnter, this);
            if (this.data) {
                this.setData(this.data.id);
            }
        };
        InstanceNewListItemView.prototype.onRemoveFromStage = function (e) {
            this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEnter, this);
            this.btnEnterEx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEnter, this);
        };
        InstanceNewListItemView.prototype.dataChanged = function () {
            if (this.data) {
                this.setData(this.data.id);
            }
            /**
            if (this.data.ani) {
                this.playAni(this.data.ani_idx);
            }
             */
        };
        InstanceNewListItemView.prototype.setData = function (id) {
            var instance = Template.instance.get(id);
            if (!instance) {
                egret.error("can't get instance entity, instance id: " + id);
                return;
            }
            var ins_mgr = Singleton.Get(InstanceManager);
            var ins_info = ins_mgr.getInstanceInfo().getInstanceInfo(id);
            // 基本信息
            // ResManager.AsyncSetTexture(this.imgIcon, instance.Icon);
            this.labName.text = Template.getGUIText(instance.Name);
            // 奖励道具
            var arr_items = [];
            for (var i = 0; i < instance.ItemIcon.length; i++) {
                arr_items.push({
                    id: instance.ItemIcon[i]
                });
            }
            this.m_arr_items.source = arr_items;
            // 是否解锁
            if (ins_info.is_open) {
                this.groupLock.visible = false;
                this.btnEnter.active = true;
            }
            else {
                this.groupLock.visible = true;
                this.btnEnter.active = false;
                var level_name = "";
                if (!ins_info.is_openPveLevel) {
                    level_name = Common.getLevelName(instance.OpenLevel);
                    if (level_name == undefined)
                        level_name = Template.getGUIText("ui_ex_instance_8");
                }
                else {
                    level_name = Template.getGUIText("ui_ex_instance_9");
                }
                this.labLock.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_instance_5"), level_name);
                this.labLock.validateNow();
                this.imgLock.horizontalCenter = -(this.labLock.width / 2 + 26);
            }
            // 是否扫荡
            if (ins_info.raid_openTeamLevel) {
                // 可扫荡
                this.btnEnter.text = Template.getGUIText("ui_ex_instance_10");
                this.btnEnterEx.text = Template.getGUIText("ui_ex_instance_10");
            }
            else {
                // 不可扫荡
                this.btnEnter.text = Template.getGUIText("ui_ex_instance_4");
                this.btnEnterEx.text = Template.getGUIText("ui_ex_instance_4");
            }
            // 消耗物
            var fb = Template.fbtype.get(instance.Type);
            var scroll = Template.scroll.get(fb.Consume);
            this.btnEnter.cost = UtilsGame.numberToString(instance.CScroll);
            var my_scroll = Singleton.Get(ScrollManager).getScrollActual(scroll.ID);
            var use_scroll = true;
            this.btnEnter.enough = true;
            if (my_scroll[0] < instance.CScroll) {
                use_scroll = false;
                if (Singleton.Get(BagManager).getItemCount(scroll.Item) < instance.CScroll) {
                    this.btnEnter.enough = false;
                    use_scroll = true;
                }
            }
            if (use_scroll) {
                this.btnEnter.icon = scroll.Icon;
                this.btnEnter.visible = false;
                this.btnEnterEx.visible = true;
                this.groupItemCount.visible = false;
                this.labScroll.visible = true;
            }
            else {
                var i_entity = Template.item.get(scroll.Item);
                this.btnEnter.icon = i_entity.iIcon;
                this.btnEnter.visible = true;
                this.btnEnterEx.visible = false;
                this.groupItemCount.visible = true;
                this.labScroll.visible = false;
                // 挑战券代币道具数量
                ResManager.AsyncSetTexture(this.imgItemIcon, i_entity.iIcon);
                this.labItemCount.text = Singleton.Get(BagManager).getItemCount(scroll.Item).toString();
            }
            // 副本品质处理
            if (instance.Quality <= 6) {
                ResManager.AsyncSetTexture(this.imgTier, Common.getInstanceTierRes(instance.Quality));
            }
            else {
                ResManager.AsyncSetTexture(this.imgTier, Common.getInstanceTierRes(6));
            }
            // 挑战次数
            this.labScroll.text = Template.getGUIText("ui_pve_46") + my_scroll[0].toString();
            // 掉落文字
            this.labDrops.text = Template.getGUIText("ui_pve_49");
            // 推荐战力
            this.labFighting.text = Template.getGUIText("ui_ex_instance_3") + instance.Fighting;
        };
        InstanceNewListItemView.prototype.playAni = function (id) {
            this.alpha = 0;
            this.scaleY = 0.85;
            var tw = egret.Tween.get(this);
            tw.wait(80 * id).to({ alpha: 1, scaleY: 1 }, 120, egret.Ease.sineIn);
        };
        InstanceNewListItemView.prototype.onClick_btnEnter = function (e) {
            var _this = this;
            UtilsEffect.buttonEffects([this.btnEnter, this.btnEnterEx], function () {
                var ins_id = _this.data.id;
                Singleton.Get(InstanceManager).onHandleGo(ins_id);
            }, this);
        };
        return InstanceNewListItemView;
    }(eui.ItemRenderer));
    ui.InstanceNewListItemView = InstanceNewListItemView;
    __reflect(InstanceNewListItemView.prototype, "ui.InstanceNewListItemView");
})(ui || (ui = {}));
//# sourceMappingURL=InstanceNewListItemView.js.map