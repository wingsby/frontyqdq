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
    /**
     * 普通活动界面
     */
    var DmgView = (function (_super) {
        __extends(DmgView, _super);
        function DmgView() {
            var _this = _super.call(this, "yw.DmgSkin") || this;
            _this.m_cur_type = E_DMG_STAT_TYPE.BOSS;
            _this.arr_entries = new eui.ArrayCollection();
            return _this;
        }
        DmgView.prototype.componentCreated = function () {
            this.dgDmg.itemRenderer = DmgItemRender;
            this.dgDmg.dataProvider = this.arr_entries;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.tabBoss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
            this.tabIns.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
            this.tabTower.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
            this.tabArena.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
            this.tabWorld.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
        };
        DmgView.prototype.onDestroy = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.tabBoss.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
            this.tabIns.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
            this.tabTower.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
            this.tabArena.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
            this.tabWorld.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabs, this);
        };
        DmgView.prototype.onUpdate = function (time) {
        };
        // region 显示控制
        DmgView.prototype.open = function (type) {
            var _this = this;
            if (type === void 0) { type = E_DMG_STAT_TYPE.BOSS; }
            Singleton.Get(PopupManager).addPopup(this);
            this.m_cur_type = type;
            this.compEmpty.visible = false;
            this.initGuiText();
            this.refresh();
            this.playAni();
            egret.callLater(function () {
                _this.scrMenu.validateNow();
                _this.scrMenu.viewport.scrollH = _this.tabWorld.active ? 94 : 0;
            }, this);
        };
        DmgView.prototype.close = function () {
            Singleton.Get(PopupManager).removePopup(this);
        };
        DmgView.prototype.refresh = function () {
            this.initMenu();
            this.initView();
        };
        DmgView.prototype.refreshNew = function () {
            var dmg_info = Singleton.Get(DmgManager).getDmgInfo();
            this.imgRewardNew.visible = dmg_info.al_rewards;
        };
        // endregion
        // region 数据初始化
        DmgView.prototype.initMenu = function () {
            this.tabBoss.active = this.getTypeByTab(this.tabBoss) == this.m_cur_type;
            this.tabIns.active = this.getTypeByTab(this.tabIns) == this.m_cur_type;
            this.tabTower.active = this.getTypeByTab(this.tabTower) == this.m_cur_type;
            this.tabArena.active = this.getTypeByTab(this.tabArena) == this.m_cur_type;
            this.tabWorld.active = this.getTypeByTab(this.tabWorld) == this.m_cur_type;
        };
        DmgView.prototype.initView = function () {
            this.arr_entries.removeAll();
            var dmg_info = Singleton.Get(DmgManager).getDmgInfo();
            this.refreshNew();
            var dmg_data = dmg_info.getDmg(this.m_cur_type);
            if (!dmg_data || dmg_data.length <= 0) {
                if (!this.compEmpty.visible) {
                    this.playEmpty();
                }
                this.compEmpty.visible = true;
                return;
            }
            this.compEmpty.visible = false;
            var result = [];
            // console.log(dmg_data);
            for (var i = 0; i < dmg_data.length; i++) {
                if (dmg_data[i].role_id > 0) {
                    result.push(dmg_data[i]);
                }
            }
            result.sort(this.sortDmgItems);
            for (var i = 0; i < result.length; i++) {
                result[i].idx = i;
            }
            this.arr_entries.source = result;
        };
        DmgView.prototype.initGuiText = function () {
            this.labRewardDes.text = Template.getGUIText("ui_damage6");
            this.labTitle.text = Template.getGUIText("ui_damage5");
            this.labRewardTxt.text = Template.getGUIText("ui_damage7");
            this.compEmpty.text = Template.getGUIText("ui_damage11");
            this.tabBoss.text = Template.getGUIText("ui_damage1");
            this.tabIns.text = Template.getGUIText("ui_damage2");
            this.tabTower.text = Template.getGUIText("ui_damage3");
            this.tabArena.text = Template.getGUIText("ui_damage4");
            this.tabWorld.text = Template.getGUIText("ui_damage15");
        };
        DmgView.prototype.sortDmgItems = function (a, b) {
            if (a.d_rate > b.d_rate) {
                return -1;
            }
            else if (a.d_rate < b.d_rate) {
                return 1;
            }
            return 0;
        };
        DmgView.prototype.playAni = function () {
            Common.playStackAni(undefined, [this.tabBoss, this.tabWorld, this.tabIns, this.tabTower, this.tabArena]);
        };
        DmgView.prototype.playEmpty = function () {
            this.compEmpty.playAni();
        };
        // endregion
        // region 点击响应
        DmgView.prototype.onClick_btnClose = function () {
            this.close();
        };
        DmgView.prototype.onClick_btnReward = function () {
            UtilsEffect.buttonEffect(this.btnReward, function () {
                Singleton.Get(ui.DmgRewardPanelView).open();
            }, this);
        };
        DmgView.prototype.onClick_btnTabs = function (e) {
            UtilsEffect.tabEffect(e.currentTarget);
            this.m_cur_type = this.getTypeByTab(e.currentTarget);
            this.refresh();
        };
        DmgView.prototype.getTypeByTab = function (tab) {
            switch (tab) {
                case this.tabBoss:
                    return E_DMG_STAT_TYPE.BOSS;
                case this.tabIns:
                    return E_DMG_STAT_TYPE.INS;
                case this.tabTower:
                    return E_DMG_STAT_TYPE.TOWER;
                case this.tabArena:
                    return E_DMG_STAT_TYPE.ARENA;
                case this.tabWorld:
                    return E_DMG_STAT_TYPE.WORLD;
                default:
                    return E_DMG_STAT_TYPE.BOSS;
            }
        };
        return DmgView;
    }(PopupUI));
    ui.DmgView = DmgView;
    __reflect(DmgView.prototype, "ui.DmgView");
})(ui || (ui = {}));
//# sourceMappingURL=DmgView.js.map