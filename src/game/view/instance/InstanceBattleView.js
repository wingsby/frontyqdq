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
     * 副本类战斗界面模式
     */
    var E_INS_BATTLE_TYPE;
    (function (E_INS_BATTLE_TYPE) {
        E_INS_BATTLE_TYPE[E_INS_BATTLE_TYPE["INSTANCE"] = 0] = "INSTANCE";
        E_INS_BATTLE_TYPE[E_INS_BATTLE_TYPE["TOWER"] = 1] = "TOWER";
        E_INS_BATTLE_TYPE[E_INS_BATTLE_TYPE["WORLD_SB"] = 2] = "WORLD_SB";
        E_INS_BATTLE_TYPE[E_INS_BATTLE_TYPE["WORLD_FB"] = 3] = "WORLD_FB"; // 世界BOSS-全服
    })(E_INS_BATTLE_TYPE = ui.E_INS_BATTLE_TYPE || (ui.E_INS_BATTLE_TYPE = {}));
    /**
     * 副本类战斗界面
     */
    var InstanceBattleView = (function (_super) {
        __extends(InstanceBattleView, _super);
        // region 事件绑定
        /**
         * 构造函数
         */
        function InstanceBattleView() {
            var _this = _super.call(this, "yw.InstanceBattleSkin") || this;
            _this.cur_mode = E_INS_BATTLE_TYPE.INSTANCE; // 当前的界面模式
            _this.enter_time = 0; // 进入战斗界面的时间
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        /**
         * 响应对象创建完成
         */
        InstanceBattleView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        InstanceBattleView.prototype.onDestroy = function () {
        };
        /**
         * 帧更新
         * @param time
         */
        InstanceBattleView.prototype.onUpdate = function (time) {
        };
        InstanceBattleView.prototype.onAddToStage = function () {
            this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExit, this);
            Singleton.Get(RegisterUpdate).register(this);
        };
        InstanceBattleView.prototype.onRemoveFromStage = function () {
            this.btnExit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnExit, this);
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        /**
         * 打开界面
         */
        InstanceBattleView.prototype.open = function (instance_id) {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            this.cur_mode = E_INS_BATTLE_TYPE.INSTANCE;
            var instance_info = Template.instance.get(instance_id);
            this.labTitle.text = Template.getGUIText(instance_info.Name);
            Singleton.Get(LayerManager).getView(ui.GuideView).setShow(false);
            this.btnExit.visible = true;
            this.setExitActive(true);
            this.labExit.text = "退出战斗";
            this.enter_time = UtilsGame.Now();
            this.playOpenAni();
        };
        /**
         * 打开爬塔战斗界面
         * @param floor
         */
        InstanceBattleView.prototype.openTower = function () {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            this.cur_mode = E_INS_BATTLE_TYPE.TOWER;
            this.labTitle.text = Template.getGUIText(TowerUtil.getFloorCfg(Singleton.Get(TowerManager).getTowerInfo().out_cur_lv).name);
            Singleton.Get(LayerManager).getView(ui.GuideView).setShow(false);
            this.btnExit.visible = true;
            this.setExitActive(true);
            this.labExit.text = Template.getGUIText("ui_arena20");
            this.enter_time = UtilsGame.Now();
            this.playOpenAni();
        };
        InstanceBattleView.prototype.openBossSingle = function (id) {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            this.cur_mode = E_INS_BATTLE_TYPE.WORLD_SB;
            var cfg_sgs = Template.singleBoss.get(id);
            this.labTitle.text = Template.getGUIText(cfg_sgs.Name);
            Singleton.Get(LayerManager).getView(ui.GuideView).setShow(false);
            this.btnExit.visible = true;
            this.setExitActive(true);
            this.labExit.text = "跳过战斗";
            this.enter_time = UtilsGame.Now();
            this.playOpenAni();
        };
        InstanceBattleView.prototype.openBossFull = function (id) {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            this.cur_mode = E_INS_BATTLE_TYPE.WORLD_FB;
            var cfg_fbs = Template.fullBoss.get(id);
            this.labTitle.text = Template.getGUIText(cfg_fbs.Name);
            Singleton.Get(LayerManager).getView(ui.GuideView).setShow(false);
            this.btnExit.visible = true;
            this.setExitActive(false);
            this.labExit.text = "跳过战斗";
            this.enter_time = UtilsGame.Now();
            this.playOpenAni();
        };
        /**
         * 关闭界面
         */
        InstanceBattleView.prototype.close = function () {
            // 关闭当前界面
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            Singleton.Get(LayerManager).getView(ui.GuideView).setShow(true);
        };
        InstanceBattleView.prototype.update = function () {
            switch (this.cur_mode) {
                case E_INS_BATTLE_TYPE.WORLD_SB:
                case E_INS_BATTLE_TYPE.WORLD_FB:
                    // 终生卡用户可直接跳过个人BOSS战斗
                    if (Singleton.Get(PrivManager).getInfo().has_lifetime_card && this.cur_mode == E_INS_BATTLE_TYPE.WORLD_SB) {
                        this.labExit.text = "跳过战斗";
                        this.setExitActive(true);
                    }
                    else {
                        var now = UtilsGame.Now();
                        var duration = now - this.enter_time;
                        var delta = Template.config.SkipCd * 1000 - duration;
                        if (delta > 0) {
                            this.labExit.text = "\u8DF3\u8FC7\u6218\u6597(" + Math.floor(delta / 1000) + ")";
                            this.setExitActive(false);
                        }
                        else {
                            this.labExit.text = "跳过战斗";
                            this.setExitActive(true);
                        }
                    }
                    break;
            }
        };
        // endregion
        // region 响应按钮点击
        /**
         * 响应点击退出战斗
         */
        InstanceBattleView.prototype.onClick_btnExit = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnExit, function () {
                switch (_this.cur_mode) {
                    case E_INS_BATTLE_TYPE.INSTANCE:
                        if (UtilsGame.Now() - _this.enter_time < DEFINE.BATTLE_SKIP_MIN_WAIT) {
                            return;
                        }
                        Singleton.Get(InstanceManager).handleExitBattle();
                        _this.close();
                        break;
                    case E_INS_BATTLE_TYPE.TOWER:
                        var priv = Singleton.Get(PrivManager).getInfo();
                        if (priv.has_lifetime_card) {
                            if (UtilsGame.Now() - _this.enter_time < DEFINE.BATTLE_SKIP_MIN_WAIT) {
                                return;
                            }
                            Singleton.Get(TowerManager).getBattleCtrl().handleExitBattle();
                            // Singleton.Get(TowerManager).getFlowCtrl().goNext();
                            _this.close();
                        }
                        else {
                            Singleton.Get(DialogControler).showInfo(1186);
                            return;
                        }
                        break;
                    case E_INS_BATTLE_TYPE.WORLD_SB:
                    case E_INS_BATTLE_TYPE.WORLD_FB:
                        // 终生卡用户可直接跳过个人BOSS战斗
                        if (_this.cur_mode == E_INS_BATTLE_TYPE.WORLD_SB && Singleton.Get(PrivManager).getInfo().has_lifetime_card) {
                            Singleton.Get(BossManager).handleBattleEndSingle(_this.params);
                        }
                        else {
                            var now = UtilsGame.Now();
                            var duration = now - _this.enter_time;
                            var delta = Template.config.SkipCd * 1000 - duration;
                            if (delta > 0) {
                                Singleton.Get(DialogControler).showString(UtilsGame.stringHander(Template.getGUIText("skip"), Math.floor(delta / 1000)));
                                return;
                            }
                            if (_this.cur_mode == E_INS_BATTLE_TYPE.WORLD_SB) {
                                Singleton.Get(BossManager).handleBattleEndSingle(_this.params);
                            }
                            else {
                                Singleton.Get(BossManager).handleBattleEndFull(_this.params);
                            }
                        }
                        break;
                }
            }, this);
        };
        InstanceBattleView.prototype.setExitActive = function (active) {
            if (active) {
                this.imgExitActive.visible = true;
                this.imgExitInactive.visible = false;
            }
            else {
                this.imgExitActive.visible = false;
                this.imgExitInactive.visible = true;
            }
        };
        // endregion
        // region 动态效果
        InstanceBattleView.prototype.playOpenAni = function () {
            egret.Tween.removeTweens(this.groupTop);
            this.groupTop.alpha = 0;
            var tw_top = egret.Tween.get(this.groupTop);
            tw_top.to({ alpha: 1 }, 1200, egret.Ease.sineOut);
        };
        return InstanceBattleView;
    }(BaseUI));
    ui.InstanceBattleView = InstanceBattleView;
    __reflect(InstanceBattleView.prototype, "ui.InstanceBattleView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=InstanceBattleView.js.map