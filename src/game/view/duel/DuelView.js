var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ui;
(function (ui) {
    var DuelWinsType;
    (function (DuelWinsType) {
        DuelWinsType[DuelWinsType["Inactive"] = 0] = "Inactive";
        DuelWinsType[DuelWinsType["Active"] = 1] = "Active";
        DuelWinsType[DuelWinsType["Opened"] = 2] = "Opened";
    })(DuelWinsType = ui.DuelWinsType || (ui.DuelWinsType = {}));
    var DuelView = (function (_super) {
        __extends(DuelView, _super);
        function DuelView() {
            var _this = _super.call(this, "yw.DuelSkin") || this;
            _this.return_to_daily = false;
            return _this;
        }
        DuelView.prototype.componentCreated = function () {
            this.groupMain.touchThrough = true;
            /**
            this.imgBox = [this.imgBox1, this.imgBox2, this.imgBox3, this.imgBox4];
            this.labBox = [this.labBox1, this.labBox2, this.labBox3, this.labBox4];
            this.labTimes = [this.labTimes1, this.labTimes2, this.labTimes3, this.labTimes4];
            this.groupBox = [this.groupBox1, this.groupBox2, this.groupBox3, this.groupBox4];
            */
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
            this.btnScoreShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnScoreShop, this);
            this.btnScoreReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnScoreReward, this);
            this.btnLineup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLineup, this);
            this.btnAddScroll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAddScroll, this);
            this.btnKatsu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnKatsu, this);
            // this.dg.addEventListener(ShopView.event_shopClick, this.onClick_dg, this);
            /**
            for (let i = 0; i < this.imgBox.length; i++) {
                this.imgBox[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBox, this);
            }
            */
            this.btnTitle.text = "一骑当千";
            this.btnTitle.active = false;
            this.labScore.text = "下一张" + Template.getGUIText(Template.scroll.get(Template.duel.Consume).Name) + "恢复：";
            this.dgTeams.itemRenderer = ui.DuelTeamItemView;
            this.team_arr = new eui.ArrayCollection();
            this.team_arr.source = [0, 1, 2];
            this.katsu_arr = new eui.ArrayCollection();
            this.dgKatsu.itemRenderer = ui.CommonItemRenderer;
            this.dgKatsu.dataProvider = this.katsu_arr;
            this.imgBg.mask = this.imgBgMask;
            this.initView();
        };
        DuelView.prototype.onDestroy = function () {
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnGo, this);
            this.btnScoreShop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnScoreShop, this);
            this.btnScoreReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnScoreReward, this);
            this.btnLineup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLineup, this);
            this.btnAddScroll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAddScroll, this);
            this.btnKatsu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnKatsu, this);
            //this.dg.removeEventListener(ShopView.event_shopClick, this.onClick_dg, this);
        };
        DuelView.prototype.open = function () {
            var _this = this;
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            layerManager.getView(ui.MainView).showSchoolSubPanel();
            layerManager.getView(ui.SchoolView).close();
            Singleton.Get(DuelManager).onViewOpen(function () {
                _this.initView();
            }, this);
            Singleton.Get(RegisterUpdate).register(this);
            Common.playStackAni(this.btnBack, [this.btnTitle]);
            this.playInitAni();
        };
        DuelView.prototype.close = function () {
            this.return_to_daily = false;
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        DuelView.prototype.onUpdate = function (time) {
        };
        DuelView.prototype.update = function (time) {
            this.onRefreshScroll();
        };
        DuelView.prototype.refresh = function () {
            this.initView();
        };
        DuelView.prototype.playInitAni = function () {
            /**
            this.imgBg.alpha = 1;
            this.imgBg.scaleX = 1.2;
            this.imgBg.scaleY = 1.2;
            const tw_bg: egret.Tween = egret.Tween.get(this.imgBg);
            tw_bg.to({scaleX: 1, scaleY: 1}, 300, egret.Ease.sineOut);
            */
        };
        DuelView.prototype.initView = function () {
            this.initAlarm();
            this.initTeams();
            this.initCost();
            this.initScroll();
            this.initScore();
            this.initWins();
        };
        DuelView.prototype.initAlarm = function () {
            this.imgScoreRewardNew.visible = Singleton.Get(DuelManager).getDuels().checkScoreActive();
            this.imgGoNew.visible = Singleton.Get(DuelManager).getDuels().isScrollEnough();
        };
        DuelView.prototype.initTeams = function () {
            this.team_arr.refresh();
            this.dgTeams.dataProvider = this.team_arr;
        };
        DuelView.prototype.initCost = function () {
            var scroll_id = Template.duel.Consume;
            var cost_count = Template.duel.QuantityC;
            var scroll_info = Template.scroll.get(scroll_id);
            if (scroll_info == null) {
                console.error("Can't find scroll info, scroll id: " + scroll_id);
                return;
            }
            ResManager.AsyncSetTexture(this.imgCost, scroll_info.Icon + "_png");
            this.labCost.text = cost_count.toString();
        };
        DuelView.prototype.initScroll = function () {
            var scroll_id = Template.duel.Consume;
            var scroll_info = Template.scroll.get(scroll_id);
            if (scroll_info == null) {
                console.error("Can't find scroll info, scroll id: " + scroll_id);
                return;
            }
            ResManager.AsyncSetTexture(this.imgScrollIcon, scroll_info.Icon + "_png");
        };
        DuelView.prototype.initScore = function () {
            var score_id = Template.duel.FeatsID;
            var count = Singleton.Get(BagManager).getItemCount(score_id);
            this.labScore.text = count.toString();
        };
        DuelView.prototype.initWins = function () {
            var inf_duel = Singleton.Get(DuelManager).getDuels();
            var newest_katsu = inf_duel.getNewestKatsu();
            var cfg_katsu = Template.katsuji.get(newest_katsu);
            var avl = inf_duel.checkWinsRewardAvailable(cfg_katsu.ID);
            var rec = inf_duel.checkWinsRewardReceived(cfg_katsu.ID);
            this.labKatsuTitle.text = "今日胜利次数：" + inf_duel.wins + "（每日重置）";
            if (rec) {
                this.btnKatsu.visible = false;
                this.imgKatsuFin.visible = true;
            }
            else {
                this.btnKatsu.visible = true;
                this.imgKatsuFin.visible = false;
                if (avl) {
                    this.btnKatsu.text = "领 取";
                    this.btnKatsu.active = true;
                }
                else {
                    this.btnKatsu.text = "未达成";
                    this.btnKatsu.active = false;
                }
            }
            var source = [];
            if (cfg_katsu.Gold > 0) {
                source.push({
                    item_id: -2,
                    count: cfg_katsu.Gold,
                    size: ui.E_COMMON_ITEM_RENDERER_SIZE.XS
                });
            }
            if (cfg_katsu.Jewel > 0) {
                source.push({
                    item_id: -1,
                    count: cfg_katsu.Jewel,
                    size: ui.E_COMMON_ITEM_RENDERER_SIZE.XS
                });
            }
            this.labKatsuWins.text = cfg_katsu.ID + "";
            for (var i = 0; i < cfg_katsu.Item.length; i++) {
                source.push({
                    item_id: cfg_katsu.Item[i],
                    count: cfg_katsu.ItemN[i],
                    size: ui.E_COMMON_ITEM_RENDERER_SIZE.XS
                });
            }
            this.katsu_arr.source = source;
            /**
            let max_win_num: number = 4;
            let wins: number[] = Template.katsuji.keys;

            let duel: PlayerDuelInfo = Singleton.Get(DuelManager).getDuels();
            //let win_max: number = wins[max_win_num - 1];

            for(let i: number = 0; i < max_win_num; i++) {
                this.labTimes[i].text = wins[i] + "次";
                let is_received: boolean = duel.checkWinsRewardReceived(wins[i]);

                if(is_received) {
                    this.labBox[i].visible = false;
                    ResManager.AsyncSetTexture(this.imgBox[i], Common.getDuelWinsIcon(i, DuelWinsType.Opened));
                    continue;
                }

                let is_active: boolean = duel.checkWinsRewardAvailable(wins[i]);
                if(is_active) {
                    this.labBox[i].visible = true;
                    this.labBox[i].touchEnabled = false;
                    ResManager.AsyncSetTexture(this.imgBox[i], Common.getDuelWinsIcon(i, DuelWinsType.Active));
                    continue;
                }

                this.labBox[i].visible = false;
                ResManager.AsyncSetTexture(this.imgBox[i], Common.getDuelWinsIcon(i, DuelWinsType.Inactive));
            }

            this.progressWins.value = 100 * this.clacWinsPercentage(duel.wins, wins, max_win_num);
             */
        };
        /**
         * 计算胜利次数累计进度条百分比
         * @param cur_win 当前胜利次数
         * @param wins 胜利奖励阶段次数[]
         * @param max_win_num 最大奖励数量
         * @returns {number} 返回百分比，0-1
         */
        DuelView.prototype.clacWinsPercentage = function (cur_win, wins, max_win_num) {
            for (var i = 0; i < max_win_num; i++) {
                if (cur_win > wins[i]) {
                    continue;
                }
                if (i == 0) {
                    return 0.25 * cur_win / wins[i];
                }
                else {
                    return 0.25 * i + 0.25 * (cur_win - wins[i - 1]) / (wins[i] - wins[i - 1]);
                }
            }
            return 1;
        };
        /**
         * 刷新挑战券信息
         */
        DuelView.prototype.onRefreshScroll = function () {
            var scroll_id = Template.duel.Consume;
            if (scroll_id > 0) {
                var my_scroll = Singleton.Get(ScrollManager).getScrollActual(scroll_id);
                var scroll_info = Template.scroll.get(scroll_id);
                this.labScrollCount.text = my_scroll[0].toString() + "/" + scroll_info.UpperL.toString();
                this.labScrollRecovery.text = UtilsGame.timeToString(my_scroll[1]);
            }
        };
        // region 响应点击事件
        DuelView.prototype.onClick_btnClose = function (type) {
            if (type === void 0) { type = 0; }
            if (this.return_to_daily) {
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBattle(undefined, false);
                Singleton.Get(LayerManager).getView(ui.DailyTaskView).open();
                this.close();
                return;
            }
            Singleton.Get(LayerManager).getView(ui.SchoolSubView).close();
            Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
            this.close();
        };
        DuelView.prototype.onClick_btnGo = function (e) {
            UtilsEffect.buttonEffect(this.btnGo);
            if (Singleton.Get(DuelManager).getDuels().checkAnyTeamEmpty()) {
                Singleton.Get(DialogControler).showInfo(1141);
                return;
            }
            /*let is_cut_ready: boolean = Singleton.Get(PveManager).reqCutBattle();
            if(!is_cut_ready){
                return;
            }*/
            Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.DUEL, battle.E_BATTLE_BEHAVIOR.POSITIVE);
        };
        DuelView.prototype.onClick_btnScoreShop = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnScoreShop, function () {
                if (!ShopUtil.isShopUnlocked(5)) {
                    return;
                }
                _this.close();
                var es = Template.shop.get(5);
                Singleton.Get(LayerManager).getView(ui.ShopListView).open(es, false, function () {
                    _this.open();
                }, _this);
            }, this);
        };
        DuelView.prototype.onClick_btnScoreReward = function (e) {
            UtilsEffect.buttonEffect(this.btnScoreReward, function () {
                var layer = Singleton.Get(LayerManager);
                layer.getView(ui.DuelScorePanelView).open();
                // layer.getPopup().addPopup(layer.getView(ui.DuelScorePanelView));
            });
        };
        DuelView.prototype.onClick_btnLineup = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnLineup, function () {
                _this.close();
                Singleton.Get(LayerManager).getView(ui.DuelLineupView).open();
            }, this);
        };
        DuelView.prototype.onClick_btnAddScroll = function (e) {
            // 获取VIP信息
            var my_vip_lv = Singleton.Get(PlayerInfoManager).getVipLevel();
            var vip_info = Template.vip.get(my_vip_lv);
            if (vip_info == null) {
                egret.error("no vipId: " + my_vip_lv);
            }
            // 获取挑战券信息
            var scroll_id = Template.duel.Consume;
            var scroll_info = Template.scroll.get(scroll_id);
            if (scroll_info == null) {
                egret.error("no scrollId: " + scroll_id);
                return;
            }
            // 获取玩家挑战券信息
            var my_scroll_base_info = Singleton.Get(ScrollManager).getScroll(scroll_id);
            var price = Singleton.Get(ScrollManager).getScrollPrice(scroll_id);
            var buy_cnt = my_scroll_base_info == null ? 0 : my_scroll_base_info.buy_cnt;
            var surplus_chance = Template.scroll.get(scroll_id).BuyTime[my_vip_lv] - buy_cnt;
            // 判断挑战券购买次数
            if (surplus_chance <= 0) {
                Singleton.Get(DialogControler).showString("今日" + Template.getGUIText(scroll_info.Name) + "购买次数已全部用完");
                return;
            }
            // 弹窗确认
            Singleton.Get(DialogControler).showBuy(UtilsGame.stringHander(Template.getGUIText("ui_pve_31"), price, scroll_info.ASpurchase, Template.getGUIText(scroll_info.Name), my_vip_lv, surplus_chance), "", price, DEFINE.UI_ALERT_INFO.diamond, function () {
                Singleton.Get(ScrollManager).reqBuy(scroll_id);
            }, this);
        };
        /**
        private onClick_btnBox(e: egret.TouchEvent): void {
            let idx: number = 0;
            for(let i: number = 0; i < this.imgBox.length; i++){
                if(this.imgBox[i] == e.target){
                    idx = i;
                }
            }

            let wins: number[] = Template.katsuji.keys;

            const is_active: boolean = Singleton.Get(DuelManager).getDuels().checkWinsRewardAvailable(wins[idx]);
            if (!is_active) {
                // Singleton.Get(DialogControler).showString("胜利场次不足"); // TODO 添加到Info表
                this.onExec_Preview(wins[idx]);
                return;
            }

            let is_received: boolean = Singleton.Get(DuelManager).getDuels().checkWinsRewardReceived(wins[idx]);
            if(is_received){
                Singleton.Get(DialogControler).showString("已经领取过奖励"); // TODO 添加到Info表
                return;
            }

            Singleton.Get(DuelManager).reqWinsReward(wins[idx], () => {
                this.initView();
            }, this);

        }
         */
        /**
         * 奖励预览
         * @param id
         */
        DuelView.prototype.onExec_Preview = function (id) {
            var cfg_katsuji = Template.katsuji.get(id);
            Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_activity10"), 0, cfg_katsuji.Gold, cfg_katsuji.Jewel, Common.convArrayToBagItems(cfg_katsuji.Item, cfg_katsuji.ItemN));
        };
        /**
         * 领取一个胜场奖励
         */
        DuelView.prototype.onClick_btnKatsu = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var inf_duel, newest_katsu, is_active;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            inf_duel = Singleton.Get(DuelManager).getDuels();
                            newest_katsu = inf_duel.getNewestKatsu();
                            is_active = Singleton.Get(DuelManager).getDuels().checkWinsRewardAvailable(newest_katsu);
                            if (!is_active) {
                                Singleton.Get(DialogControler).showString("胜利场次不足");
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnKatsu)];
                        case 1:
                            _a.sent();
                            Singleton.Get(DuelManager).reqWinsReward(newest_katsu, function () {
                                _this.initView();
                            }, this);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return DuelView;
    }(BaseUI));
    ui.DuelView = DuelView;
    __reflect(DuelView.prototype, "ui.DuelView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=DuelView.js.map