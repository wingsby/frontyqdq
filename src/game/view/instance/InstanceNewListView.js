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
    var InstanceNewListView = (function (_super) {
        __extends(InstanceNewListView, _super);
        function InstanceNewListView() {
            var _this = _super.call(this, "yw.InstanceNewListSkin") || this;
            _this.m_arr_instance = undefined;
            _this.cur_scroll = 0;
            _this.cur_fid = -1;
            _this.last_scroll_num = -1;
            _this.return_to_daily = false;
            // endregion
            // region 引导
            _this.agent_ins_id = 0;
            _this.initEvent();
            return _this;
        }
        InstanceNewListView.prototype.componentCreated = function () {
            this.labTextScrollRecovery.text = Template.getGUIText("ui_pve_45");
        };
        InstanceNewListView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnOpinion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.btnAddScroll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAddScroll, this);
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        InstanceNewListView.prototype.onUpdate = function (time) {
        };
        InstanceNewListView.prototype.onAddToStage = function (e) {
            Singleton.Get(RegisterUpdate).register(this);
        };
        InstanceNewListView.prototype.onRemoveFromStage = function (e) {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        InstanceNewListView.prototype.update = function (time) {
            this.onRefreshScroll();
        };
        InstanceNewListView.prototype.initEvent = function () {
            this.m_arr_instance = new eui.ArrayCollection();
            this.listList.itemRenderer = ui.InstanceNewListItemView;
            this.listList.dataProvider = this.m_arr_instance;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btnOpinion.text = Template.getGUIText("ui_ex_instance_7");
            this.btnOpinion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.btnAddScroll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAddScroll, this);
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        InstanceNewListView.prototype.openDefault = function () {
            this.open(this.cur_fid);
        };
        InstanceNewListView.prototype.open = function (fid) {
            if (fid != this.cur_fid) {
                this.initContent(fid);
            }
            this.cur_fid = fid;
            this.setScroll();
            this.last_scroll_num = -1;
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
        };
        InstanceNewListView.prototype.close = function () {
            this.return_to_daily = false;
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            this.btnAgent.visible = false;
            this.btnAgent.y = -800;
        };
        InstanceNewListView.prototype.refresh = function (ani) {
            if (ani === void 0) { ani = false; }
            var scr_v = this.scroller.viewport.scrollV;
            this.initContent(this.cur_fid, ani);
            this.scroller.validateNow();
            this.scroller.viewport.scrollV = scr_v;
        };
        InstanceNewListView.prototype.initContent = function (fid, ani) {
            if (ani === void 0) { ani = true; }
            var fb = Template.fbtype.get(fid);
            if (fb == undefined) {
                egret.error("can't find fb entity, id: " + fid);
                return;
            }
            Singleton.Get(LayerManager).getView(ui.InstanceNewBaseView).btnChapterName.text = Template.getGUIText(fb.Name);
            var arr = [];
            var idx = 0;
            var cur_ins_id = fb.Fbinitial;
            while (cur_ins_id > 0) {
                var instance = Template.instance.get(cur_ins_id);
                arr.push({
                    id: cur_ins_id,
                    ani_idx: idx,
                    ani: ani
                });
                cur_ins_id = instance.LowLevel;
                idx += 1;
            }
            this.m_arr_instance.source = arr;
        };
        InstanceNewListView.prototype.onClick_btnOpinion = function () {
            UtilsEffect.buttonEffect(this.btnOpinion, function () {
                RoleUtil.openHeroOpinion();
            }, this);
        };
        // region 挑战券相关内容
        /**
         * 设定挑战券
         * @param scroll_id
         */
        InstanceNewListView.prototype.setScroll = function () {
            var chapter_id = this.cur_fid;
            var chapter_info = Template.fbtype.get(chapter_id);
            if (chapter_info == undefined) {
                egret.error("no FbtypeId: " + chapter_id);
                return;
            }
            this.cur_scroll = chapter_info.Consume;
            // 显示挑战券图标
            var scroll_info = Template.scroll.get(this.cur_scroll);
            // ResManager.AsyncSetTexture(this.imgScrollIcon, scroll_info.Icon + "_png");
        };
        /**
         * 刷新挑战券信息
         */
        InstanceNewListView.prototype.onRefreshScroll = function () {
            var scroll_id = this.cur_scroll;
            if (scroll_id > 0) {
                var my_scroll = Singleton.Get(ScrollManager).getScrollActual(scroll_id);
                var scroll_info = Template.scroll.get(scroll_id);
                this.labScrollCount.text = Template.getGUIText("ui_pve_46") + my_scroll[0].toString() + "/" + scroll_info.UpperL.toString();
                this.labScrollRecovery.text = UtilsGame.timeToString(my_scroll[1]);
                if (this.last_scroll_num >= 0) {
                    if (this.last_scroll_num != my_scroll[0]) {
                        this.refresh();
                    }
                }
                this.last_scroll_num = my_scroll[0];
                if (scroll_info.Type == 1) {
                    this.labTextScrollRecovery.visible = true;
                    this.labScrollRecovery.visible = true;
                }
                else {
                    this.labTextScrollRecovery.visible = false;
                    this.labScrollRecovery.visible = false;
                }
            }
        };
        /**
         * 响应点击购买挑战券按钮
         * @param e
         */
        InstanceNewListView.prototype.onClick_btnAddScroll = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnAddScroll, function () {
                // 获取VIP信息
                var my_vip_lv = Singleton.Get(PlayerInfoManager).getVipLevel();
                var vip_info = Template.vip.get(my_vip_lv);
                if (vip_info == undefined) {
                    egret.error("no vipId: " + my_vip_lv);
                }
                // 获取挑战券信息
                var scroll_id = _this.cur_scroll;
                var scroll_info = Template.scroll.get(scroll_id);
                if (scroll_info == undefined) {
                    egret.error("no scrollId: " + scroll_id);
                    return;
                }
                // 获取玩家挑战券信息
                var my_scroll_base_info = Singleton.Get(ScrollManager).getScroll(scroll_id);
                var price = Singleton.Get(ScrollManager).getScrollPrice(scroll_id);
                var buy_cnt = my_scroll_base_info == undefined ? 0 : my_scroll_base_info.buy_cnt;
                var surplus_chance = Template.scroll.get(scroll_id).BuyTime[my_vip_lv] - buy_cnt;
                // 判断挑战券购买次数
                if (surplus_chance <= 0) {
                    Singleton.Get(DialogControler).showString(Template.getGUIText("append_31"));
                    return;
                }
                // 弹窗确认
                Singleton.Get(DialogControler).showBuy(UtilsGame.stringHander(Template.getGUIText("ui_pve_30"), price, scroll_info.ASpurchase, Template.getGUIText(scroll_info.Name), my_vip_lv, surplus_chance), "", price, DEFINE.UI_ALERT_INFO.diamond, function () {
                    Singleton.Get(ScrollManager).reqBuy(scroll_id);
                }, _this);
            }, this);
        };
        InstanceNewListView.prototype.initAgent = function (idx) {
            this.agent_ins_id = this.m_arr_instance.source[idx - 1].id;
            this.btnAgent.visible = true;
            this.btnAgent.y = 46 + 138 * (idx - 1);
        };
        InstanceNewListView.prototype.onClick_btnAgent = function (e) {
            Singleton.Get(InstanceManager).onHandleGo(this.agent_ins_id);
        };
        return InstanceNewListView;
    }(BaseUI));
    ui.InstanceNewListView = InstanceNewListView;
    __reflect(InstanceNewListView.prototype, "ui.InstanceNewListView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=InstanceNewListView.js.map