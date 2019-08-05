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
    var GuildWarView = (function (_super) {
        __extends(GuildWarView, _super);
        function GuildWarView() {
            var _this = _super.call(this, "yw.GuildWarSkin") || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        GuildWarView.prototype.componentCreated = function () { };
        GuildWarView.prototype.onDestroy = function () { };
        GuildWarView.prototype.onUpdate = function (time) { };
        GuildWarView.prototype.onAddToStage = function () {
            this.imgBg.mask = this.rectBgMask;
            this.tabTitle.text = "公会战";
            this.tabTitle.active = false;
            this.labDes1.text = Template.getGUIText("ui_guildwar1");
            this.labDes2.text = Template.getGUIText("ui_guildwar2");
            this.labDes3.text = Template.getGUIText("ui_guildwar3");
            this.labDes4.text = Template.getGUIText("ui_guildwar4");
            this.labEnter.text = Template.getGUIText("ui_guildwar6");
            this.labDes.text = Template.getGUIText("ui_guildwar5");
            this.labBtnReward.text = Template.getGUIText("ui_guildwar37");
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.btnRanking.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRanking, this);
            this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRule, this);
            this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEnter, this);
        };
        GuildWarView.prototype.onRemoveFromStage = function () {
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.btnRanking.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRanking, this);
            this.btnRule.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRule, this);
            this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEnter, this);
        };
        GuildWarView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            Common.playStackAni(this.btnBack, [this.tabTitle]);
            this.initView();
            Singleton.Get(RegisterUpdate).register(this);
        };
        GuildWarView.prototype.close = function () {
            Singleton.Get(LayerManager).removeView(this);
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        GuildWarView.prototype.update = function () {
            var now = UtilsGame.Now();
            var str_time = "";
            if (GuildWarUtil.isWarTime()) {
                // 在活动时间内 显示结束倒计时
                var delta = GuildWarUtil.getEndTime() - now;
                str_time = UtilsGame.stringHander(Template.getGUIText("ui_guildwar35"), UtilsGame.timeToString(delta));
            }
            else {
                if (now >= GuildWarUtil.getEndTime()) {
                    // 当日公会战已结束
                    str_time = Template.getGUIText("ui_guildwar36");
                }
                else {
                    // 当日公会战还未开始
                    var delta = GuildWarUtil.getStartTime() - now;
                    str_time = UtilsGame.stringHander(Template.getGUIText("ui_guildwar34"), UtilsGame.timeToString(delta));
                }
            }
            this.labDes.text = Template.getGUIText("ui_guildwar5") + "\r\n" + str_time;
        };
        GuildWarView.prototype.initView = function () {
            var _this = this;
            this.update();
            Singleton.Get(GuildWarManager).checkAlarm(function (is_alarm) {
                _this.imgEnterNew.visible = is_alarm;
            }, this);
        };
        GuildWarView.prototype.onClick_btnBack = function () {
            this.close();
            GuildWarViewHandler.backToGuild();
        };
        GuildWarView.prototype.onClick_btnReward = function () {
            UtilsEffect.buttonEffect(this.btnReward, function () {
                GuildWarViewHandler.openRewardPanel();
            }, this);
        };
        GuildWarView.prototype.onClick_btnRanking = function () {
            UtilsEffect.buttonEffect(this.btnRanking, function () {
                GuildWarViewHandler.openRankPanel();
            }, this);
        };
        GuildWarView.prototype.onClick_btnRule = function () {
            UtilsEffect.buttonEffect(this.btnRule, function () {
                GuildWarViewHandler.openRule();
            }, this);
        };
        GuildWarView.prototype.onClick_btnEnter = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnEnter, function () {
                Singleton.Get(GuildWarManager).reqInfo(function () {
                    // 时间条件不满足 直接返回
                    if (!GuildWarUtil.isWarTime()) {
                        Singleton.Get(DialogControler).showInfo(1206);
                        return;
                    }
                    // 公会在本次公会战期间新建 没有匹配过 直接返回
                    if (Singleton.Get(GuildManager).getMyGuild().creat_t >= GuildWarUtil.getMatchTime()) {
                        Singleton.Get(DialogControler).showInfo(1207);
                        return;
                    }
                    // 根据具体情况返回信息
                    var info = Singleton.Get(GuildWarManager).getInfo();
                    switch (info.status) {
                        case E_GUILD_WAR_STATUS.NOT_OPEN:
                            Singleton.Get(DialogControler).showInfo(1206);
                            break;
                        case E_GUILD_WAR_STATUS.NO_MAN:
                        case E_GUILD_WAR_STATUS.OTHER_ERR:
                            Singleton.Get(DialogControler).showInfo(1207);
                            break;
                        case E_GUILD_WAR_STATUS.NO_TURN:
                            Singleton.Get(DialogControler).showInfo(1208);
                            break;
                        case E_GUILD_WAR_STATUS.OPEN:
                            if (!info.isWarOpen()) {
                                Singleton.Get(DialogControler).showInfo(1208);
                                return;
                            }
                            Singleton.Get(GuildWarManager).reqListEnemy(true, function () {
                                Singleton.Get(GuildWarManager).reqListMy(function () {
                                    _this.close();
                                    GuildWarViewHandler.openList();
                                }, _this);
                            }, _this);
                            break;
                    }
                }, _this, true);
            }, this);
        };
        return GuildWarView;
    }(BaseUI));
    ui.GuildWarView = GuildWarView;
    __reflect(GuildWarView.prototype, "ui.GuildWarView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=GuildWarView.js.map