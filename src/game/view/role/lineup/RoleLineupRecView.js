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
    var RoleLineupRecView = (function (_super) {
        __extends(RoleLineupRecView, _super);
        function RoleLineupRecView() {
            var _this = _super.call(this, "yw.RoleLineupRecSkin") || this;
            _this.m_tabs = [];
            _this.m_cur_type = E_ROLE_LINEUP_REC_TYPE.ROOKIE;
            // endregion
            // region 引导
            _this.agent_reward_id = 0;
            _this.m_tabs = [_this.tab1, _this.tab2, _this.tab3, _this.tab4];
            return _this;
        }
        RoleLineupRecView.prototype.componentCreated = function () {
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            for (var i = 0; i < this.m_tabs.length; i++) {
                this.m_tabs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Tabs, this);
            }
            this.m_entries = new eui.ArrayCollection();
            this.dgList.dataProvider = this.m_entries;
            this.dgList.itemRenderer = ui.RoleLineupRecItemRender;
            this.initGuiText();
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        RoleLineupRecView.prototype.onDestroy = function () {
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            for (var i = 0; i < this.m_tabs.length; i++) {
                this.m_tabs[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_Tabs, this);
            }
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
        };
        RoleLineupRecView.prototype.onUpdate = function (time) {
        };
        RoleLineupRecView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.showTab();
            this.switchTab(E_ROLE_LINEUP_REC_TYPE.ROOKIE);
            this.initView();
            this.initAlarm();
            this.playStackAni();
        };
        RoleLineupRecView.prototype.close = function () {
            if (Singleton.Get(LayerManager).isViewOnStage(this)) {
                Singleton.Get(LayerManager).removeView(this);
            }
            this.btnAgent.visible = false;
        };
        RoleLineupRecView.prototype.refresh = function () {
            this.switchTab(this.m_cur_type);
            this.initView();
            this.initAlarm();
        };
        RoleLineupRecView.prototype.initGuiText = function () {
            this.m_tabs[0].richText = Template.getGUIText("ui_zhenrong3");
            this.m_tabs[1].richText = Template.getGUIText("ui_zhenrong4");
            this.m_tabs[2].richText = Template.getGUIText("ui_zhenrong5");
            this.m_tabs[3].richText = Template.getGUIText("ui_zhenrong6");
        };
        RoleLineupRecView.prototype.initAlarm = function () {
            var info = Singleton.Get(RoleLineupRecManager).getRecInfo();
            for (var i = 0; i < this.m_tabs.length; i++) {
                this.m_tabs[i].isNew = info.isTypeAlarm(i);
            }
        };
        RoleLineupRecView.prototype.initView = function () {
            var cfg_lups = Template.lineup.values;
            var holy_i = 0;
            var result = [];
            for (var i = 0; i < cfg_lups.length; i++) {
                var cfg_lup = cfg_lups[i];
                if (cfg_lup.Type != (this.m_cur_type + 1)) {
                    continue;
                }
                result.push({
                    id: holy_i,
                    lup_id: cfg_lup.ID
                });
                holy_i++;
            }
            this.m_entries.source = result;
        };
        RoleLineupRecView.prototype.playStackAni = function () {
            Common.playStackAni(this.btnBack, this.m_tabs);
        };
        RoleLineupRecView.prototype.onClick_btnBack = function () {
            this.close();
            Singleton.Get(LayerManager).getView(ui.RoleBaseView).open();
        };
        // region 页面切换
        RoleLineupRecView.prototype.switchTab = function (type) {
            this.m_cur_type = type;
            for (var i = 0; i < this.m_tabs.length; i++) {
                this.m_tabs[i].active = i == type;
            }
        };
        RoleLineupRecView.prototype.showTab = function () {
            var info = Singleton.Get(RoleLineupRecManager).getRecInfo();
            for (var i = 0; i < this.m_tabs.length; i++) {
                this.m_tabs[i].visible = info.hasAnyTypeCfg(i);
            }
        };
        RoleLineupRecView.prototype.onClick_Tabs = function (e) {
            UtilsEffect.tabEffect(e.currentTarget);
            for (var i = 0; i < this.m_tabs.length; i++) {
                if (e.currentTarget == this.m_tabs[this.getTabIdByType(i)]) {
                    this.switchTab(i);
                    this.initView();
                    this.initAlarm();
                    break;
                }
            }
        };
        RoleLineupRecView.prototype.getTabIdByType = function (type) {
            switch (type) {
                case E_ROLE_LINEUP_REC_TYPE.ROOKIE:
                    return 0;
                case E_ROLE_LINEUP_REC_TYPE.MIDDLE:
                    return 1;
                case E_ROLE_LINEUP_REC_TYPE.OLDASS:
                    return 2;
                case E_ROLE_LINEUP_REC_TYPE.MASTER:
                    return 3;
            }
            return 0;
        };
        RoleLineupRecView.prototype.initAgent = function (idx) {
            this.initView();
            this.agent_reward_id = this.m_entries.source[idx - 1].lup_id;
            this.btnAgent.visible = true;
            this.btnAgent.y = 216 + (236 + 8) * (idx - 1);
        };
        RoleLineupRecView.prototype.onClick_btnAgent = function (e) {
            Singleton.Get(RoleLineupRecManager).reqReward(this.agent_reward_id, function () {
                Singleton.Get(LayerManager).getView(ui.RoleLineupRecView).refresh();
            }, this);
        };
        return RoleLineupRecView;
    }(BaseUI));
    ui.RoleLineupRecView = RoleLineupRecView;
    __reflect(RoleLineupRecView.prototype, "ui.RoleLineupRecView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleLineupRecView.js.map