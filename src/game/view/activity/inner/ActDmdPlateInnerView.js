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
    var ActDmdPlateInnerView = (function (_super) {
        __extends(ActDmdPlateInnerView, _super);
        /**
         * @constructor
         */
        function ActDmdPlateInnerView() {
            var _this = _super.call(this) || this;
            _this.is_playing = false; // 是否正在播放转盘动画
            _this.last_reward = 0; // 待展示的奖励信息
            _this.gis = [];
            _this.skinName = "yw.ActInnerBasicSkin_Turnplate";
            _this.initGis();
            return _this;
        }
        /**
         * 刷新界面
         */
        ActDmdPlateInnerView.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
        };
        /**
         * 初始化轮盘物品控件
         */
        ActDmdPlateInnerView.prototype.initGis = function () {
            this.gis = [{
                    id: 0,
                    group: this.gi1,
                    lab: this.labGi1,
                    img: this.imgGi1,
                    bg: this.imgGiBg1,
                    frag: this.imgGiFrag1
                }, {
                    id: 1,
                    group: this.gi2,
                    lab: this.labGi2,
                    img: this.imgGi2,
                    bg: this.imgGiBg2,
                    frag: this.imgGiFrag2
                }, {
                    id: 2,
                    group: this.gi3,
                    lab: this.labGi3,
                    img: this.imgGi3,
                    bg: this.imgGiBg3,
                    frag: this.imgGiFrag3
                }, {
                    id: 3,
                    group: this.gi4,
                    lab: this.labGi4,
                    img: this.imgGi4,
                    bg: this.imgGiBg4,
                    frag: this.imgGiFrag4
                }, {
                    id: 4,
                    group: this.gi5,
                    lab: this.labGi5,
                    img: this.imgGi5,
                    bg: this.imgGiBg5,
                    frag: this.imgGiFrag5
                }, {
                    id: 5,
                    group: this.gi6,
                    lab: this.labGi6,
                    img: this.imgGi6,
                    bg: this.imgGiBg6,
                    frag: this.imgGiFrag6
                }, {
                    id: 6,
                    group: this.gi7,
                    lab: this.labGi7,
                    img: this.imgGi7,
                    bg: this.imgGiBg7,
                    frag: this.imgGiFrag7
                }, {
                    id: 7,
                    group: this.gi8,
                    lab: this.labGi8,
                    img: this.imgGi8,
                    bg: this.imgGiBg8,
                    frag: this.imgGiFrag8
                }];
        };
        /**
         * 设定视图数据
         */
        ActDmdPlateInnerView.prototype.initView = function () {
            _super.prototype.initView.call(this);
            // 初始化背景图
            this.initDecos();
            // 初始化按钮状态
            this.initBtn();
            // 初始化轮盘奖励
            this.initRewards();
            this.imgPointer.rotation = 0;
        };
        /**
         * 初始化背景图
         */
        ActDmdPlateInnerView.prototype.initDecos = function () {
            var res_bg_b = "bg_zhuanpan_1_png";
            var res_bg_f = "bg_zhuanpan2_1_png";
            var res_pointer = "bg_zhuanpan1_1_png";
            ResManager.AsyncSetTexture(this.imgBgb1, res_bg_b);
            ResManager.AsyncSetTexture(this.imgBgb2, res_bg_b);
            ResManager.AsyncSetTexture(this.imgBgb3, res_bg_b);
            ResManager.AsyncSetTexture(this.imgBgb4, res_bg_b);
            ResManager.AsyncSetTexture(this.imgBgf1, res_bg_f);
            ResManager.AsyncSetTexture(this.imgBgf2, res_bg_f);
            ResManager.AsyncSetTexture(this.imgBgf3, res_bg_f);
            ResManager.AsyncSetTexture(this.imgBgf4, res_bg_f);
            ResManager.AsyncSetTexture(this.imgPointer, res_pointer);
        };
        /**
         * 更新按钮状态
         */
        ActDmdPlateInnerView.prototype.initBtn = function () {
            // 文字内容
            this.btnGo.text = "抽 取";
            this.labCountdown.text = "转动次数越多 钻石奖励额度越大";
            // 按钮状态
            var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
            var cost = Template.config.DialDiamond;
            this.btnGo.icon = DEFINE.UI_ALERT_INFO.diamond.resPNG;
            this.btnGo.cost = UtilsGame.numberToString(cost);
            this.btnGo.enough = my_diamond >= cost;
            // 消耗物当前状态
            this.groupCost.visible = false;
            ResManager.AsyncSetTexture(this.imgCost, DEFINE.UI_ALERT_INFO.diamond.resPNG);
            this.labCost.text = "x" + my_diamond;
            this.labCost.textColor = (my_diamond >= cost) ? 0xE9AA17 : DEFINE_COLOR.WARN_RED;
            // 剩余次数状态
            var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
            var cfg_vip = Template.vip.get(my_vip);
            var cur_times = Singleton.Get(ActivityManager).getInfo().dmd_plate_cnt;
            this.labDes.text = UtilsGame.stringHander("VIP剩余次数：$1/$2", cfg_vip.Plate - cur_times, cfg_vip.Plate);
            this.labDes.textColor = (cur_times >= cfg_vip.Plate) ? DEFINE_COLOR.WARN_RED : 0xFFAC00;
        };
        /**
         * 初始化轮盘奖励
         */
        ActDmdPlateInnerView.prototype.initRewards = function () {
            // 读取配置
            var cfg_dps = UtilsGame.cloneObject(Template.turnplate.values);
            // 乱序
            // cfg_dps.sort((a, b) => {
            //     return UtilsGame.getRandomInt(0, 1) == 0 ? -1 :  1;
            // });
            var act_info = Singleton.Get(ActivityManager).getInfo();
            // 填充显示对象
            for (var i = 0; i < this.gis.length; i++) {
                var cfg_dp = cfg_dps[i];
                this.gis[i].id = cfg_dp.ID;
                ResManager.AsyncSetTexture(this.gis[i].bg, DEFINE.UI_ALERT_INFO.diamond.tierPNG);
                ResManager.AsyncSetTexture(this.gis[i].img, DEFINE.UI_ALERT_INFO.diamond.resPNG);
                this.gis[i].lab.text = "x" + UtilsGame.numberToString(act_info.getActualDiamond(i));
                this.gis[i].frag.visible = false;
            }
        };
        /**
         * 响应添加到舞台
         */
        ActDmdPlateInnerView.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
            this.initView();
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
        };
        /**
         * 响应从舞台移除
         */
        ActDmdPlateInnerView.prototype.onRemoveFromStage = function () {
            _super.prototype.onRemoveFromStage.call(this);
            this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
            if (this.is_playing) {
                this.is_playing = false;
                this.handleReward();
            }
        };
        /**
         * 相应点击抽取按钮
         */
        ActDmdPlateInnerView.prototype.onClick_btnGo = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnGo, function () {
                if (_this.is_playing) {
                    return;
                }
                // 剩余次数状态
                var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
                var cfg_vip = Template.vip.get(my_vip);
                var cur_times = Singleton.Get(ActivityManager).getInfo().dmd_plate_cnt;
                if (cfg_vip.Plate - cur_times <= 0) {
                    Singleton.Get(LayerManager).getView(ui.ActivityView).close();
                    Singleton.Get(LayerManager).getView(ui.VipView).open();
                    return;
                }
                // 钻石状态
                var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
                var cost = Template.config.DialDiamond;
                if (my_diamond < cost) {
                    Singleton.Get(DialogControler).showString(Template.getGUIText("append_76") + DEFINE.UI_ALERT_INFO.diamond.name);
                    return;
                }
                // 发送请求 回调
                Singleton.Get(ActivityManager).reqExec_DmdPlate(function (turn_id) {
                    var idx = _this.getRewardIdx(turn_id);
                    _this.is_playing = true;
                    _this.last_reward = Singleton.Get(ActivityManager).getInfo().getActualDiamond(turn_id, -1);
                    var offset = idx * (360 / 8) + UtilsGame.getRandomInt((360 / 8 / 2 / 2), (360 / 8 / 2) + (360 / 8 / 2 / 2));
                    var tw = egret.Tween.get(_this.imgPointer);
                    tw.to({ rotation: 1080 }, 1000, egret.Ease.circIn)
                        .to({ rotation: 1080 + 2520 }, 1500)
                        .to({ rotation: 1080 + 2520 + 1080 + offset }, 1750, egret.Ease.circOut).wait(1000).call(function () {
                        _this.is_playing = false;
                        _this.handleReward();
                    }, _this);
                    _this.initBtn();
                    Singleton.Get(LayerManager).getView(ui.ActivityView).refreshMenu();
                }, _this);
            }, this);
        };
        // region 轮盘转动控制
        /**
         * 展示奖励
         */
        ActDmdPlateInnerView.prototype.handleReward = function () {
            if (!this.last_reward) {
                return;
            }
            egret.Tween.removeTweens(this.imgPointer);
            if (this.last_reward && this.last_reward > 0) {
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, 0, this.last_reward);
            }
            this.last_reward = undefined;
            this.imgPointer.rotation = 0;
            this.initRewards();
        };
        /**
         * 获取奖励idx
         * @param id
         * @returns {number}
         */
        ActDmdPlateInnerView.prototype.getRewardIdx = function (id) {
            for (var i = 0; i < this.gis.length; i++) {
                if (this.gis[i].id == id) {
                    return i;
                }
            }
            return 0;
        };
        return ActDmdPlateInnerView;
    }(ui.ActInnerBasicView));
    ui.ActDmdPlateInnerView = ActDmdPlateInnerView;
    __reflect(ActDmdPlateInnerView.prototype, "ui.ActDmdPlateInnerView");
})(ui || (ui = {}));
//# sourceMappingURL=ActDmdPlateInnerView.js.map