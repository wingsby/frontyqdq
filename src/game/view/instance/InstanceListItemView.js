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
    var InstanceListItemView = (function (_super) {
        __extends(InstanceListItemView, _super);
        /**
         * 构造函数
         */
        function InstanceListItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.InstanceListItemSkin";
            //this.cacheAsBitmap = true;
            _this.initGuiText();
            _this.initEvents();
            return _this;
        }
        /**
         * 响应创建子对象
         */
        InstanceListItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 响应事件
         */
        InstanceListItemView.prototype.initEvents = function () {
            this.listItem.itemRendererSkinName = "yw.comp.ItemIconSkin_S";
            this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEnter, this);
            this.btnRaid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRaid, this);
            this.btnAddChance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAddChance, this);
        };
        InstanceListItemView.prototype.dispose = function () {
            this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEnter, this);
            this.btnRaid.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRaid, this);
            this.btnAddChance.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAddChance, this);
        };
        /**
         * 初始化UI文字
         */
        InstanceListItemView.prototype.initGuiText = function () {
            this.btnEnter.text = "挑  战";
            this.btnRaid.text = "扫  荡";
        };
        /**
         * 刷新
         */
        InstanceListItemView.prototype.refresh = function () {
            this.dataChanged();
        };
        /**
         * 响应数据变化
         */
        InstanceListItemView.prototype.dataChanged = function () {
            // 获取data
            if (this.data == null) {
                return;
            }
            // 获取副本基本信息
            var instance_id = this.data.instanceId;
            var instance_info = Template.instance.get(instance_id);
            if (instance_info == null) {
                egret.error("no instanceId: " + instance_id);
            }
            // 获取副本类型
            var fbtype_info = Template.fbtype.get(instance_info.Type);
            if (fbtype_info == null) {
                egret.error("no fbtypeId: " + instance_info.Type);
                return;
            }
            // 获取玩家副本信息
            var my_instance_info = Singleton.Get(InstanceManager).getInstanceInfo().getInstanceInfo(instance_id);
            if (my_instance_info == null) {
                egret.error("no instanceId: " + instance_id);
                return;
            }
            var last_chance = my_instance_info.chance; // 剩余挑战次数
            var is_chance_enough = last_chance > 0; // 是否还有挑战次数
            var is_instance_raid_open = my_instance_info.raid_open; // 是否曾经通关过
            var is_instance_avaliable = my_instance_info.is_open; // 是否解锁
            // 填充界面元素
            this.labTitle.text = Template.getGUIText(instance_info.Name);
            ResManager.AsyncSetTexture(this.imgIcon, instance_info.Icon);
            // this.imgIcon.source = instance_info.Icon;
            this.labChance.text = "当日次数: " + last_chance + "/" + instance_info.FBchallenge;
            this.labChance.textColor = is_chance_enough ? DEFINE_COLOR.TEXT_BLACK : DEFINE_COLOR.WARN_RED;
            this.btnEnter.cost = UtilsGame.numberToString(instance_info.CScroll);
            // 挑战券数量
            var scroll_detail = Singleton.Get(ScrollManager).getScrollActual(fbtype_info.Consume);
            this.btnEnter.enough = scroll_detail[0] >= instance_info.CScroll; // 挑战券是否足够
            // 挑战券图标
            var scroll_info = Template.scroll.get(fbtype_info.Consume);
            if (scroll_info == null) {
                egret.error("no scrollId: " + fbtype_info.Consume);
                return;
            }
            this.btnEnter.icon = scroll_info.Icon + "_png";
            // 剩余挑战次数
            if (is_chance_enough) {
                this.btnAddChance.visible = false;
            }
            else {
                this.btnAddChance.visible = true;
            }
            // 扫荡按钮
            if (my_instance_info.raid_open) {
                this.btnRaid.active = true;
                this.groupRaidLock.visible = false;
            }
            else {
                var raid_vip_lv = Template.config.MUPVip;
                this.btnRaid.active = false;
                this.groupRaidLock.visible = true;
                this.labRaidLock.text = (my_instance_info.raid_openVip) ? Template.getGUIText("append_164") : UtilsGame.stringHander(Template.getGUIText("shop_33"), raid_vip_lv);
            }
            // 挑战按钮
            if (is_instance_avaliable) {
                this.btnEnter.active = true;
                this.groupEnterLock.visible = false;
            }
            else {
                this.btnEnter.active = false;
                this.groupEnterLock.visible = true;
                this.labEnterLock.text = (my_instance_info.is_openPveLevel) ? "未解锁" : UtilsGame.stringHander(Template.getGUIText("ui_activity11"), Common.getLevelName(instance_info.OpenLevel));
            }
            // 展示道具信息
            if (instance_info.ItemIcon != null) {
                var ds_list_items = [];
                this.listItem.dataProvider = new eui.ArrayCollection(ds_list_items);
                for (var i = 0; i < instance_info.ItemIcon.length; i++) {
                    // 读取物品信息
                    var item_id = instance_info.ItemIcon[i];
                    var item_info = Template.item.get(item_id);
                    if (item_info == null) {
                        egret.error("no itemId: " + item_id);
                        continue;
                    }
                    //console.log('读取物品信息, id: ' + item_id + ", star: " + item_info.iStar);
                    // 生成物品列表
                    ds_list_items.push({
                        imgTier: Common.getItemTierBgRes(item_info.iStar),
                        icon: item_info.iIcon,
                        count: ""
                    });
                }
            }
        };
        /**
         * 响应点击进入按钮
         */
        InstanceListItemView.prototype.onClick_btnEnter = function () {
            /*let is_cut_ready: boolean = Singleton.Get(PveManager).reqCutBattle();
            if(!is_cut_ready){
                return;
            }*/
            var my_instance = Singleton.Get(InstanceManager).getInstanceInfo().getInstanceInfo(this.data.instanceId);
            if (my_instance == null) {
                egret.error("no instanceId: " + my_instance);
                return;
            }
            if (my_instance.chance <= 0) {
                Singleton.Get(DialogControler).showInfo(1110);
                return;
            }
            // Singleton.Get(InstanceManager).onReqBattle(this.data.instanceId);
        };
        /**
         * 响应扫荡按钮
         */
        InstanceListItemView.prototype.onClick_btnRaid = function () {
            // 获取玩家副本信息
            var my_instance_info = Singleton.Get(InstanceManager).getInstanceInfo().getInstanceInfo(this.data.instanceId);
            if (my_instance_info == null) {
                egret.error("no instanceId: " + this.data.instanceId);
                return;
            }
            if (!my_instance_info.raid_openVip) {
                Singleton.Get(DialogControler).showInfo(1129);
                return;
            }
            if (!my_instance_info.raid_openTeamLevel) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_166"));
                return;
            }
            UtilsEffect.buttonEffect(this.btnRaid);
            Singleton.Get(InstanceManager).onReqRaid(this.data.instanceId);
        };
        /**
         * 响应点击购买次数按钮
         */
        InstanceListItemView.prototype.onClick_btnAddChance = function () {
            // 挑战次数已不用 所以此处注释掉
            /**
            // 获取VIP信息
            let my_vip_lv: number = Singleton.Get(PlayerInfoManager).getVipLevel();
            let vip_info: Entity.Vip = Template.vip.get(my_vip_lv);
            if (vip_info == null) {
                egret.error("no vipId: " + my_vip_lv);
            }

            let all_instance_info: PlayerInstanceInfo = Singleton.Get(InstanceManager).getInstanceInfo();
            let once_count: number = Template.config.BuyQuantity;
            let surplus_buy_chance: number = vip_info.FBCNext - all_instance_info.challenge_buy_cnt;

            // 判断挑战购买次数
            if (surplus_buy_chance <= 0) {
                Singleton.Get(DialogControler).showString("今日副本挑战购买次数已全部用完");
                return;
            }

            let price: number = Template.config.FBFprice + Template.config.OverlayPrice * all_instance_info.challenge_buy_cnt;

            Singleton.Get(DialogControler).showBuy(UtilsGame.stringHander(Template.getGUIText("ui_pve_29"), price, once_count, my_vip_lv, surplus_buy_chance),
                "", price, DEFINE.UI_ALERT_INFO.diamond, () => {
                    Singleton.Get(InstanceManager).onReqBuyChance(this.data.instanceId);
                }, this);
                 */
        };
        return InstanceListItemView;
    }(eui.ItemRenderer));
    ui.InstanceListItemView = InstanceListItemView;
    __reflect(InstanceListItemView.prototype, "ui.InstanceListItemView");
})(ui || (ui = {}));
//# sourceMappingURL=InstanceListItemView.js.map