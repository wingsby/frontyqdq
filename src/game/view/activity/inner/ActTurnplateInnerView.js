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
    var ActTurnplateInnerView = (function (_super) {
        __extends(ActTurnplateInnerView, _super);
        /**
         * @constructor
         */
        function ActTurnplateInnerView() {
            var _this = _super.call(this) || this;
            _this.is_playing = false; // 是否正在播放转盘动画
            _this.gis = [];
            _this.skinName = "yw.ActInnerBasicSkin_Turnplate";
            _this.initGis();
            return _this;
        }
        /**
         * 刷新界面
         */
        ActTurnplateInnerView.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
        };
        /**
         * 初始化轮盘物品控件
         */
        ActTurnplateInnerView.prototype.initGis = function () {
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
        ActTurnplateInnerView.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.initBtn();
            // 初始化轮盘奖励
            this.initRewards();
            this.imgPointer.rotation = 0;
        };
        /**
         * 初始化轮盘奖励
         */
        ActTurnplateInnerView.prototype.initRewards = function () {
            // 读取配置
            var cfg_tps = UtilsGame.cloneObject(Template.turnplate.values);
            // 乱序
            cfg_tps.sort(function (a, b) {
                return UtilsGame.getRandomInt(0, 1) == 0 ? -1 : 1;
            });
            // 填充显示对象
            for (var i = 0; i < this.gis.length; i++) {
                var cfg_item = Template.item.get(cfg_tps[i].Item);
                this.gis[i].id = cfg_tps[i].ID;
                ResManager.AsyncSetTexture(this.gis[i].bg, Common.getItemTierBgRes(cfg_item.iStar));
                ResManager.AsyncSetTexture(this.gis[i].img, cfg_item.iIcon);
                this.gis[i].lab.text = "x" + cfg_tps[i].Quantity;
                this.gis[i].frag.visible = cfg_item.Synthesis > 0;
            }
        };
        /**
         * 更新按钮状态
         */
        ActTurnplateInnerView.prototype.initBtn = function () {
            // 文字内容
            this.btnGo.text = "抽 取";
            // 按钮状态
            var cfg_cost = Template.item.get(Template.config.DialItem);
            this.btnGo.icon = cfg_cost.iIcon;
            this.btnGo.cost = "1";
            this.btnGo.enough = Singleton.Get(BagManager).hasEnough(cfg_cost.ID, 1);
            // 消耗物当前状态
            var free_it = Singleton.Get(BagManager).getItemCount(cfg_cost.ID);
            ResManager.AsyncSetTexture(this.imgCost, cfg_cost.iIcon);
            this.labCost.text = "x" + free_it;
            this.labCost.textColor = (free_it > 0) ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
        };
        /**
         * 响应添加到舞台
         */
        ActTurnplateInnerView.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
            this.initView();
            Singleton.Get(RegisterUpdate).register(this);
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
        };
        /**
         * 响应从舞台移除
         */
        ActTurnplateInnerView.prototype.onRemoveFromStage = function () {
            _super.prototype.onRemoveFromStage.call(this);
            Singleton.Get(RegisterUpdate).unRegister(this);
            this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
            if (this.is_playing) {
                this.is_playing = false;
                this.handleReward();
            }
        };
        /**
         * 帧更新
         */
        ActTurnplateInnerView.prototype.update = function () {
            var type = ActivityUtil.isActOpenNoMutex(E_ACT_DESIGN_TYPE.Turnplate, E_ACT_TYPE.BEGIN) ? E_ACT_TYPE.BEGIN : E_ACT_TYPE.BASIC;
            this.labCountdown.text = "离活动结束还有：" + ActivityUtil.getCountdownStr(E_ACT_DESIGN_TYPE.Turnplate, type);
        };
        /**
         * 相应点击抽取按钮
         */
        ActTurnplateInnerView.prototype.onClick_btnGo = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnGo, function () {
                if (_this.is_playing) {
                    return;
                }
                var cfg_cost = Template.item.get(Template.config.DialItem);
                if (!Singleton.Get(BagManager).hasEnough(cfg_cost.ID, 1)) {
                    Singleton.Get(DialogControler).showString(Template.getGUIText("append_76") + Template.getGUIText(cfg_cost.iName));
                    return;
                }
                // 发送请求 回调
                Singleton.Get(ActivityManager).reqExec_Turnplate(function (turn_id) {
                    var idx = _this.getRewardIdx(turn_id);
                    var cfg_tp = Template.turnplate.get(turn_id);
                    var sync_item = new msg.SyncBagItem();
                    sync_item.id = cfg_tp.Item;
                    sync_item.count = cfg_tp.Quantity;
                    _this.is_playing = true;
                    _this.last_reward = sync_item;
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
        ActTurnplateInnerView.prototype.handleReward = function () {
            if (!this.last_reward) {
                return;
            }
            egret.Tween.removeTweens(this.imgPointer);
            Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, 0, 0, [this.last_reward]);
            this.last_reward = undefined;
            this.imgPointer.rotation = 0;
        };
        /**
         * 获取奖励idx
         * @param id
         * @returns {number}
         */
        ActTurnplateInnerView.prototype.getRewardIdx = function (id) {
            for (var i = 0; i < this.gis.length; i++) {
                if (this.gis[i].id == id) {
                    return i;
                }
            }
            return 0;
        };
        return ActTurnplateInnerView;
    }(ui.ActInnerBasicView));
    ui.ActTurnplateInnerView = ActTurnplateInnerView;
    __reflect(ActTurnplateInnerView.prototype, "ui.ActTurnplateInnerView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=ActTurnplateInnerView.js.map