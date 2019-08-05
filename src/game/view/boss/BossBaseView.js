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
    var E_BOSS_TYPE = (function () {
        function E_BOSS_TYPE() {
        }
        return E_BOSS_TYPE;
    }());
    E_BOSS_TYPE.Single = "single";
    E_BOSS_TYPE.Full = "full";
    ui.E_BOSS_TYPE = E_BOSS_TYPE;
    __reflect(E_BOSS_TYPE.prototype, "ui.E_BOSS_TYPE");
    var BossBaseView = (function (_super) {
        __extends(BossBaseView, _super);
        function BossBaseView() {
            var _this = _super.call(this, "yw.BossBaseSkin") || this;
            _this.m_last_tick = 0;
            _this.m_last_full_y = 0;
            _this.m_last_single_y = 0;
            _this.data = {
                text: {
                    tab_single: "",
                    tab_full: "",
                    opinion: "",
                    scroll_recover: "",
                    scroll_count: "",
                }
            };
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        BossBaseView.prototype.componentCreated = function () {
            this.m_entities_single = new eui.ArrayCollection();
            this.dgSingle.itemRenderer = ui.BossSingleItemRenderer;
            this.dgSingle.dataProvider = this.m_entities_single;
            this.m_entities_full = new eui.ArrayCollection();
            this.dgFull.itemRenderer = ui.BossFullItemRenderer;
            this.dgFull.dataProvider = this.m_entities_full;
        };
        ;
        BossBaseView.prototype.onDestroy = function () { };
        ;
        BossBaseView.prototype.onUpdate = function (time) { };
        ;
        BossBaseView.prototype.onAddToStage = function () {
            this.data.text.tab_single = Template.getGUIText("ui_bosswar7");
            this.data.text.tab_full = Template.getGUIText("ui_bosswar8");
            this.data.text.opinion = Template.getGUIText("append_88");
            this.btnOpinion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.tabFull.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabFull, this);
            this.tabSingle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabSingle, this);
        };
        BossBaseView.prototype.onRemoveFromStage = function () {
            this.btnOpinion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.tabFull.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabFull, this);
            this.tabSingle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabSingle, this);
        };
        BossBaseView.prototype.open = function (type) {
            if (type === void 0) { type = E_BOSS_TYPE.Single; }
            Singleton.Get(LayerManager).addView(this);
            this.initView(type);
            Common.playStackAni(this.btnBack, [this.tabSingle, this.tabFull]);
            Singleton.Get(LayerManager).getView(ui.GuideView).visible = false;
            Singleton.Get(RegisterUpdate).register(this);
        };
        BossBaseView.prototype.close = function () {
            this.m_last_single_y = this.scrSingle.viewport.scrollV;
            this.m_last_full_y = this.scrFull.viewport.scrollV;
            Singleton.Get(LayerManager).removeView(this);
            Singleton.Get(LayerManager).getView(ui.GuideView).visible = true;
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        BossBaseView.prototype.refresh = function () {
            this.initView(this.currentState);
        };
        BossBaseView.prototype.update = function () {
            var now = UtilsGame.Now();
            if (now - this.m_last_tick > 1000) {
                this.m_last_tick = now;
                if (this.currentState == "full") {
                    var inf_scr = Singleton.Get(ScrollManager).getScrollActual(801);
                    this.data.text.scroll_recover = Template.getGUIText("append_160") + UtilsGame.timeToString(inf_scr[1]);
                    this.data.text.scroll_count = inf_scr[0] + "/" + Template.scroll.get(801).UpperL;
                }
            }
        };
        BossBaseView.prototype.onClick_btnBack = function () {
            this.close();
            BossViewHandler.closeAfter();
        };
        BossBaseView.prototype.onClick_tabSingle = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.tabEffectAsync(this.tabSingle)];
                        case 1:
                            _a.sent();
                            this.initView(E_BOSS_TYPE.Single);
                            this.m_last_full_y = this.scrFull.viewport.scrollV;
                            return [2 /*return*/];
                    }
                });
            });
        };
        BossBaseView.prototype.onClick_tabFull = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.tabEffectAsync(this.tabFull)];
                        case 1:
                            _a.sent();
                            this.initView(E_BOSS_TYPE.Full);
                            this.m_last_single_y = this.scrSingle.viewport.scrollV;
                            return [2 /*return*/];
                    }
                });
            });
        };
        BossBaseView.prototype.initView = function (type) {
            this.currentState = type;
            this.initAlarm();
            switch (this.currentState) {
                case E_BOSS_TYPE.Single:
                    // if (this.m_entities_single.length <= 0) {
                    //     this.initSingle();
                    // } else {
                    //     this.refreshSingle();
                    // }
                    this.initSingle();
                    this.tabSingle.active = true;
                    this.tabFull.active = false;
                    break;
                case E_BOSS_TYPE.Full:
                    // if (this.m_entities_full.length <= 0) {
                    //     this.initFull();
                    // } else {
                    //     this.refreshFull();
                    // }
                    this.initFull();
                    this.tabSingle.active = false;
                    this.tabFull.active = true;
                    break;
            }
        };
        BossBaseView.prototype.initSingle = function () {
            var _this = this;
            var source = [];
            var cfg_sgs = Template.singleBoss.values;
            for (var i = 0; i < cfg_sgs.length; i++) {
                source.push({
                    id: cfg_sgs[i].ID
                });
            }
            source.sort(this.sortSingle);
            this.m_entities_single.source = source;
            egret.callLater(function () {
                _this.scrSingle.validateNow();
                _this.scrSingle.viewport.scrollV = _this.m_last_single_y;
            }, this);
        };
        BossBaseView.prototype.refreshSingle = function () {
            for (var i = 0; i < this.m_entities_single.length; i++) {
                this.m_entities_full.itemUpdated(this.m_entities_full.getItemAt(i));
            }
            this.m_entities_single.source.sort(this.sortSingle);
            this.m_entities_single.refresh();
        };
        BossBaseView.prototype.sortSingle = function (a, b) {
            var mgr_scroll = Singleton.Get(ScrollManager);
            var cfg_a = Template.singleBoss.get(a.id);
            var cfg_b = Template.singleBoss.get(b.id);
            var a_num = mgr_scroll.getScrollActual(cfg_a.FBchallenge)[0];
            var b_num = mgr_scroll.getScrollActual(cfg_b.FBchallenge)[0];
            if (a_num == 0 || b_num == 0) {
                if (a_num > b_num) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            if (a.id != b.id) {
                if (a.id < b.id) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            return 0;
        };
        BossBaseView.prototype.initFull = function () {
            var _this = this;
            Singleton.Get(BossManager).reqFullInfo(function () {
                var source = [];
                var cfg_fls = Template.fullBoss.values;
                for (var i = 0; i < cfg_fls.length; i++) {
                    source.push({
                        id: cfg_fls[i].ID,
                    });
                }
                source.sort(_this.sortFull);
                _this.m_entities_full.source = source;
                egret.callLater(function () {
                    _this.scrFull.validateNow();
                    _this.scrFull.viewport.scrollV = _this.m_last_full_y;
                }, _this);
            }, this);
        };
        BossBaseView.prototype.refreshFull = function () {
            var _this = this;
            Singleton.Get(BossManager).reqFullInfo(function () {
                for (var i = 0; i < _this.m_entities_full.length; i++) {
                    _this.m_entities_full.itemUpdated(_this.m_entities_full.getItemAt(i));
                }
            }, this);
        };
        BossBaseView.prototype.sortFull = function (a, b) {
            var cfg_a = Template.fullBoss.get(a.id);
            var cfg_b = Template.fullBoss.get(b.id);
            // 解锁在前 未解锁在后
            var team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
            var unlocked_a = team_lv >= cfg_a.OpenLv;
            var unlocked_b = team_lv >= cfg_b.OpenLv;
            if (unlocked_a != unlocked_b) {
                if (unlocked_a) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            // 存活在前 非存活在后
            var inf_boss = Singleton.Get(BossManager).getFullInfo();
            var inf_a = inf_boss.getBossById(cfg_a.ID);
            var inf_b = inf_boss.getBossById(cfg_b.ID);
            if (inf_a && inf_b) {
                var alive_a = inf_a.curhp > 0;
                var alive_b = inf_b.curhp > 0;
                if (alive_a != alive_b) {
                    if (alive_a) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
            }
            // ID 顺序
            if (cfg_a.ID != cfg_b.ID) {
                if (cfg_a.ID < cfg_b.ID) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            return 0;
        };
        BossBaseView.prototype.onClick_btnOpinion = function () {
            UtilsEffect.buttonEffect(this.btnOpinion, function () {
                RoleUtil.openHeroOpinion();
            }, this);
        };
        BossBaseView.prototype.initAlarm = function () {
            this.tabSingle.isNew = BossAlarm.isSingle();
            this.tabFull.isNew = BossAlarm.isFull();
        };
        return BossBaseView;
    }(BaseUI));
    ui.BossBaseView = BossBaseView;
    __reflect(BossBaseView.prototype, "ui.BossBaseView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=BossBaseView.js.map