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
     * 活动条目视图
     */
    var ActInnerItemView_CheckIn = (function (_super) {
        __extends(ActInnerItemView_CheckIn, _super);
        /**
         * @constructor
         */
        function ActInnerItemView_CheckIn() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ActInnerItemSkin_CheckIn";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
            return _this;
        }
        /**
         * 响应数据变更
         */
        ActInnerItemView_CheckIn.prototype.dataChanged = function () {
            // 数据判空
            if (!this.data) {
                return;
            }
            // 初始化内容
            this.initView();
        };
        /**
         * 初始化界面内容
         */
        ActInnerItemView_CheckIn.prototype.initView = function () {
            var data = this.data;
            var cfg_reg = Template.registration.get(data.item_id);
            if (!cfg_reg) {
                console.error("no registration: " + data.item_id);
                return;
            }
            // 日期
            var month = Math.floor(cfg_reg.ID / 100);
            var day = cfg_reg.ID % 100;
            this.labDate.text = UtilsGame.stringHander(Template.getGUIText("ui_activity7"), month, day);
            // 指定VIP等级双倍
            if (cfg_reg.VIPGrade > 0) {
                this.groupVip.visible = true;
                this.labVip.text = UtilsGame.stringHander(Template.getGUIText("ui_activity9"), cfg_reg.VIPGrade);
            }
            else {
                this.groupVip.visible = false;
            }
            // 处理已领取状态
            switch (data.status) {
                case E_REWARD_STATUS.AVAILABLE:
                    var date = UtilsGame.getNowDate();
                    // console.log("cur time: " + date.y + "-" + date.m + "-" + date.d + " " + date.h + ":" + date.mm + ":" + date.s + "." + date.ms);
                    if (day == date.d) {
                        this.groupToday.visible = true;
                        this.groupSp.visible = false;
                    }
                    else if (day < date.d) {
                        this.groupToday.visible = false;
                        this.groupSp.visible = true;
                        this.imgOk.visible = false;
                        this.labRemedy.visible = true;
                    }
                    else {
                        this.groupToday.visible = false;
                        this.groupSp.visible = false;
                    }
                    break;
                case E_REWARD_STATUS.RECEIVED:
                    this.groupToday.visible = false;
                    this.groupSp.visible = true;
                    this.imgOk.visible = true;
                    this.labRemedy.visible = false;
                    break;
            }
            // 设定奖励道具信息
            this.setItem(cfg_reg);
        };
        /**
         * 设定道具信息
         * @param cfg_reg
         */
        ActInnerItemView_CheckIn.prototype.setItem = function (cfg_reg) {
            // this.mcEff.clearMovieClip();
            // 金币
            if (cfg_reg.Gold > 0) {
                ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.gold.resPNG);
                ResManager.AsyncSetTexture(this.imgTier, DEFINE.UI_ALERT_INFO.gold.tierPNG);
                this.labCount.text = UtilsGame.stringHander(Template.getGUIText("ui_activity1"), cfg_reg.Gold);
                return;
            }
            // 钻石
            if (cfg_reg.Jewel > 0) {
                ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.diamond.resPNG);
                ResManager.AsyncSetTexture(this.imgTier, DEFINE.UI_ALERT_INFO.diamond.tierPNG);
                this.labCount.text = UtilsGame.stringHander(Template.getGUIText("ui_activity1"), cfg_reg.Jewel);
                return;
            }
            // 道具
            if (cfg_reg.Item > 0) {
                var cfg_item = Template.item.get(cfg_reg.Item);
                ResManager.AsyncSetTexture(this.imgIcon, cfg_item.iIcon);
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(cfg_item.iStar));
                this.labCount.text = UtilsGame.stringHander(Template.getGUIText("ui_activity1"), cfg_reg.Quantity);
            }
        };
        /**
         * 响应点击
         */
        ActInnerItemView_CheckIn.prototype.onClick = function () {
            var _this = this;
            if (this.data.status != E_REWARD_STATUS.AVAILABLE) {
                return;
            }
            var cfg_reg = Template.registration.get(this.data.item_id);
            if (!cfg_reg) {
                return;
            }
            var day = cfg_reg.ID % 100;
            var date = UtilsGame.getNowDate();
            if (day > date.d) {
                return;
            }
            UtilsEffect.buttonEffect(this.groupRoot, function () {
                var re = Singleton.Get(ActivityManager).getInfo().check_in_re;
                if (re == null)
                    re = 0;
                // 日期非当日 补签
                if (day != date.d) {
                    // 弹窗确认
                    Singleton.Get(DialogControler).showBuy(UtilsGame.stringHander(Template.getGUIText("ui_pve_48"), Template.config.Retroactive * (re + 1)), UtilsGame.stringHander(Template.getGUIText("ui_pve_51"), re), Template.config.Retroactive * (re + 1), DEFINE.UI_ALERT_INFO.diamond, function () {
                        _this.execClick(true);
                    }, _this);
                    return;
                }
                // 正常签到
                _this.execClick(false);
            }, this);
        };
        ActInnerItemView_CheckIn.prototype.execClick = function (remedy) {
            Singleton.Get(ActivityManager).reqExec_CheckIn(remedy, this.data.item_id, function () {
                var check_in_view = Singleton.Get(LayerManager).getView(ui.ActCheckInInnerView);
                var act_view = Singleton.Get(LayerManager).getView(ui.ActivityView);
                check_in_view.refresh();
                act_view.refreshMenu();
            }, this);
        };
        return ActInnerItemView_CheckIn;
    }(eui.ItemRenderer));
    ui.ActInnerItemView_CheckIn = ActInnerItemView_CheckIn;
    __reflect(ActInnerItemView_CheckIn.prototype, "ui.ActInnerItemView_CheckIn");
})(ui || (ui = {}));
//# sourceMappingURL=ActInnerItemView_CheckIn.js.map