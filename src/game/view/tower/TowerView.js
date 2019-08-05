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
    var TowerView = (function (_super) {
        __extends(TowerView, _super);
        function TowerView() {
            var _this = _super.call(this, "yw.TowerSkin") || this;
            _this.cfg_stage_pos = [-532, -260, 12, 284, 556, 828];
            _this.cfg_stage_active_id = 3;
            _this.initEvent();
            return _this;
        }
        TowerView.prototype.componentCreated = function () {
        };
        TowerView.prototype.onDestroy = function () {
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnShop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnShop, this);
            this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRank, this);
            this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
            this.btnReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReset, this);
            this.btnAuto.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAuto, this);
            this.btnRaid.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRaid, this);
        };
        TowerView.prototype.onUpdate = function (time) {
        };
        TowerView.prototype.initEvent = function () {
            this.groupStage.mask = this.rectStageMask;
            this.sp_stages = [this.sp_stage_0, this.sp_stage_1, this.sp_stage_2, this.sp_stage_3, this.sp_stage_4];
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnShop, this);
            this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRank, this);
            this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReward, this);
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
            this.btnReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReset, this);
            this.btnRaid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRaid, this);
            this.btnAuto.setText(Template.getGUIText("ui_tower12"));
            this.btnAuto.setActive(false);
            this.btnAuto.setAvailable(true);
            this.btnAuto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAuto, this);
            this.labReset.text = Template.getGUIText("ui_ex_tower_7");
            this.labRaid.text = Template.getGUIText("ui_ex_tower_8");
            this.labBtnRank.text = Template.getGUIText("ui_ex_tower_1");
            this.labBtnShop.text = Template.getGUIText("ui_arena1");
            this.labBtnReward.text = Template.getGUIText("ui_tower2");
        };
        TowerView.prototype.open = function () {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            this.openSeniorMenu();
            layerManager.getView(ui.MainView).showSchoolSubPanel();
            layerManager.getView(ui.SchoolView).close();
            this.refresh();
            Singleton.Get(TowerManager).getFlowCtrl().setLock(false);
        };
        TowerView.prototype.refresh = function () {
            this.initContent();
            this.initFloorPos();
            this.setFloorMask(false);
            this.initStages();
        };
        TowerView.prototype.closeNotStop = function () {
            // 关闭当前界面
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        TowerView.prototype.close = function () {
            // 关闭当前界面
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            // 退出界面后触发打断爬塔
            Singleton.Get(TowerManager).getFlowCtrl().onInterrupt();
        };
        TowerView.prototype.openSeniorMenu = function () {
            this.groupBtnSenior.visible = true;
            Common.playStackAni(this.btnBack, []);
        };
        TowerView.prototype.initContent = function () {
            this.initHistory();
            this.initBtnStatus();
        };
        // region 基本信息控制
        TowerView.prototype.initHistory = function () {
            this.labHistoryText.text = Template.getGUIText("ui_tower6");
            this.labHistoryFloor.text = UtilsGame.stringHander(Template.getGUIText("ui_tower7"), Singleton.Get(TowerManager).getTowerInfo().history_box);
        };
        TowerView.prototype.initBtnStatus = function () {
            // 挑战按钮文字
            switch (Singleton.Get(TowerManager).getFlowCtrl().getCurStatus()) {
                case E_TOWER_FLOW.WAIT:
                    if (Singleton.Get(TowerManager).getTowerInfo().isCurLvBoss()) {
                        this.btnFight.setText(Template.getGUIText("ui_tower5"));
                    }
                    else {
                        this.btnFight.setText(Template.getGUIText("ui_tower4"));
                    }
                    break;
                default:
                    this.btnFight.setText(Template.getGUIText("ui_tower4"));
                    break;
            }
            // 自动按钮
            var flow = Singleton.Get(TowerManager).getFlowCtrl();
            this.btnAuto.setActive(flow.is_auto);
            // 重置按钮
            this.imgResetNew.visible = false;
            var scr_id = DEFINE.TOWER_SCROLL_ID;
            var scr_num = Singleton.Get(ScrollManager).getScrollActual(scr_id)[0];
            var cfg_scr = Template.scroll.get(scr_id);
            var scr_item_id = cfg_scr.Item;
            var cfg_scr_item = Template.item.get(scr_item_id);
            var scr_item_num = Singleton.Get(BagManager).getItemCount(scr_item_id);
            if (scr_num > 0 || scr_item_num <= 0 || !cfg_scr_item) {
                // ResManager.AsyncSetTexture(this.imgResetIcon, cfg_scr.Icon);
                this.imgResetIcon.visible = false;
                this.labResetCount.width = 70;
                this.labResetCount.text = scr_num.toString() + "/" + cfg_scr.UpperL.toString(); // 当前挑战券数量/最大恢复数量
                this.labResetCount.textColor = scr_num > 0 ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
                if (scr_num > 0) {
                    this.imgResetNew.visible = true;
                }
            }
            else {
                this.imgResetIcon.visible = true;
                this.labResetCount.width = 52;
                ResManager.AsyncSetTexture(this.imgResetIcon, cfg_scr_item.iIcon);
                this.labResetCount.text = scr_item_num.toString() + "/" + 1; // 当前道具数量/消耗的道具数量
                this.labResetCount.textColor = DEFINE_COLOR.TEXT_WHITE;
            }
            // 扫荡/挑战按钮
            if (Singleton.Get(TowerManager).getTowerInfo().isRaidAble()) {
                this.btnRaid.visible = true;
                this.btnAuto.visible = false;
                this.btnGo.visible = false;
                this.btnFight.visible = false;
                this.btnFight.setText(Template.getGUIText("ui_tower13"));
            }
            else {
                this.btnRaid.visible = false;
                this.btnAuto.visible = true;
                this.btnGo.visible = true;
                this.btnFight.setText(Template.getGUIText("ui_tower4"));
                if (flow.getCurStatus() != E_TOWER_FLOW.WAIT) {
                    this.btnFight.visible = false;
                }
                else {
                    if (flow.is_auto) {
                        this.btnFight.visible = false;
                    }
                    else {
                        this.btnFight.visible = true;
                    }
                }
            }
            // 红点提示
            this.initAlarm();
        };
        /**
         * 更新红点提示
         */
        TowerView.prototype.initAlarm = function () {
            this.imgAlarmReward.visible = Singleton.Get(TowerManager).getTowerInfo().alarm_reward;
        };
        // endregion
        // region 塔层滚动控制
        TowerView.prototype.initFloorPos = function () {
            // console.log("==================== initFloorPos()");
            for (var i = 0; i < this.sp_stages.length; i++) {
                this.sp_stages[i].y = this.cfg_stage_pos[i];
            }
        };
        TowerView.prototype.nextFloor = function (cb, thisObj) {
            // console.log("==================== nextFloor()");
            var _this = this;
            // 如果可扫荡则不上楼 (避免自动挑战时重置后进入第2层)
            if (Singleton.Get(TowerManager).getTowerInfo().isRaidAble()) {
                return;
            }
            var cfg_duration = 600; // TODO 配置
            for (var i = 0; i < this.sp_stages.length; i++) {
                var tw_stage = egret.Tween.get(this.sp_stages[i]);
                tw_stage.to({ y: this.cfg_stage_pos[i + 1] }, cfg_duration, egret.Ease.sineOut);
            }
            var tw_gs = egret.Tween.get(this.groupStage);
            tw_gs.wait(cfg_duration).call(function () {
                for (var i = 0; i < _this.sp_stages.length; i++) {
                    egret.Tween.removeTweens(_this.sp_stages[i]);
                }
                _this.initFloorPos();
                _this.initStages(0);
                if (cb) {
                    cb.call(thisObj);
                }
            }, this);
            this.sp_stages = [this.sp_stages[4], this.sp_stages[0], this.sp_stages[1], this.sp_stages[2], this.sp_stages[3]];
            this.setFloorMask(true);
            this.initContent();
        };
        TowerView.prototype.setFloorMask = function (dynamic) {
            this.sp_stage_active.setFloorActive(true, dynamic);
            var inactive_stages = this.sp_stages_inactive;
            for (var i = 0; i < inactive_stages.length; i++) {
                inactive_stages[i].setFloorActive(false, dynamic);
            }
        };
        Object.defineProperty(TowerView.prototype, "sp_stage_active", {
            get: function () {
                return this.sp_stages[this.cfg_stage_active_id];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TowerView.prototype, "sp_stage_last", {
            get: function () {
                return this.sp_stages[this.sp_stage_last_id];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TowerView.prototype, "sp_stage_last_id", {
            get: function () {
                return this.cfg_stage_active_id + 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TowerView.prototype, "sp_stages_inactive", {
            get: function () {
                var result = [];
                for (var i = 0; i < this.sp_stages.length; i++) {
                    if (i != this.cfg_stage_active_id) {
                        result.push(this.sp_stages[i]);
                    }
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        // endregion
        // region 塔层内容控制
        TowerView.prototype.initStages = function (id) {
            if (id === void 0) { id = -1; }
            var cur_floor = Singleton.Get(TowerManager).getTowerInfo().getCurLv();
            for (var i = 0; i < this.sp_stages.length; i++) {
                if (id >= 0) {
                    if (i != id) {
                        continue;
                    }
                }
                var i_floor = cur_floor + (this.cfg_stage_active_id - i);
                if (i_floor != cur_floor) {
                    // 不是当前层 判断未到达还是已通过
                    this.sp_stages[i].setFloor(i_floor, i_floor > cur_floor ? E_TOWER_FLOW.FUTURE : E_TOWER_FLOW.COMPLETED);
                }
                else {
                    // 是当前层
                    this.sp_stages[i].setFloor(i_floor, Singleton.Get(TowerManager).getFlowCtrl().getCurStatus());
                }
            }
        };
        // endregion
        // region 按钮响应
        TowerView.prototype.onClick_btnBack = function (e) {
            Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
            this.close();
        };
        TowerView.prototype.onClick_btnShop = function () {
            UtilsEffect.buttonEffect(this.btnShop, function () {
                // 商店按钮现在用作规则
                Singleton.Get(LayerManager).addPopup(ui.TowerRulePanelView);
                /**
                if (!ShopUtil.isShopUnlocked(DEFINE.TOWER_SHOP_ID)) {
                    return;
                }

                this.close();
                const es: Entity.Shop = Template.shop.get(DEFINE.TOWER_SHOP_ID);
                Singleton.Get(LayerManager).getView(ui.ShopListView).open(es, false, () => {
                    this.open();
                }, this);
                 */
            }, this);
        };
        TowerView.prototype.onClick_btnRank = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnRank, function () {
                _this.close();
                Singleton.Get(ui.RankTowerView).open();
            }, this);
        };
        TowerView.prototype.onClick_btnReward = function () {
            UtilsEffect.buttonEffect(this.btnReward, function () {
                Singleton.Get(ui.TowerRewardPanelView).open();
            }, this);
        };
        TowerView.prototype.onClick_btnReset = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnReset, function () {
                // 检查挑战券数量是否足够
                if (!Singleton.Get(ScrollManager).checkScrollNum(DEFINE.TOWER_SCROLL_ID, 1, function () { _this.initBtnStatus(); }, _this)) {
                    return;
                }
                // 二次确认
                Singleton.Get(DialogControler).showInfo(1176, _this, function () {
                    Singleton.Get(TowerManager).reqReset(function () {
                        _this.initContent();
                        _this.initFloorPos();
                        _this.setFloorMask(false);
                        _this.initStages();
                    }, _this);
                });
            }, this);
        };
        TowerView.prototype.onClick_btnGo = function () {
            Singleton.Get(GuideManager).hideGuide("MainView", "btnBattle");
            Singleton.Get(GuideManager).hideGuide("TowerView", "btnReward");
            UtilsEffect.buttonEffects([this.btnFight, this.sp_stage_active.btnBox, this.imgRaid], function () {
                Singleton.Get(TowerManager).getFlowCtrl().goNext();
            }, this);
        };
        TowerView.prototype.onClick_btnAuto = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnAuto, function () {
                var priv = Singleton.Get(PrivManager).getInfo();
                if (!priv.has_lifetime_card) {
                    Singleton.Get(DialogControler).showInfo(1185, _this, function () {
                        Singleton.Get(ui.PrivLifetimeView).open();
                    });
                    return;
                }
                var flow = Singleton.Get(TowerManager).getFlowCtrl();
                if (flow.is_auto) {
                    // Singleton.Get(DialogControler).showString("自动爬塔已关闭");
                    flow.setAuto(false);
                }
                else {
                    // Singleton.Get(DialogControler).showString("自动爬塔已开启");
                    flow.setAuto(true);
                    // 开启自动挑战时 如果没有正在进行的操作 则自动开始执行一次下一步
                    if (!Singleton.Get(TowerManager).getFlowCtrl().opr_lock) {
                        Singleton.Get(TowerManager).getFlowCtrl().goNext();
                    }
                }
                _this.initBtnStatus();
            }, this);
        };
        TowerView.prototype.onClick_btnRaid = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnFight, function () {
                // Singleton.Get(DialogControler).showInfo(1188, this, () => {
                _this.btnFight.visible = false;
                Singleton.Get(TowerManager).reqRaid(function () {
                    _this.initContent();
                    _this.initFloorPos();
                    _this.setFloorMask(false);
                    _this.initStages();
                }, _this);
                // }, this);
            });
        };
        return TowerView;
    }(BaseUI));
    ui.TowerView = TowerView;
    __reflect(TowerView.prototype, "ui.TowerView");
})(ui || (ui = {}));
//# sourceMappingURL=TowerView.js.map