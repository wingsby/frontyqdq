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
    var SendView = (function (_super) {
        __extends(SendView, _super);
        function SendView() {
            var _this = _super.call(this, "yw.SendSkin") || this;
            _this.m_is_shop = false;
            return _this;
        }
        SendView.prototype.componentCreated = function () {
            this.m_entries = new eui.ArrayCollection();
            this.dgQuests.itemRenderer = ui.SendItemRenderer;
            this.dgQuests.dataProvider = this.m_entries;
            this.dgQuests.useVirtualLayout = false;
        };
        ;
        SendView.prototype.onDestroy = function () { };
        ;
        SendView.prototype.onUpdate = function () { };
        ;
        SendView.prototype.open = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            Singleton.Get(LayerManager).addView(this);
            this.m_is_shop = false;
            this.refresh();
        };
        SendView.prototype.close = function () {
            this.currentState = "";
            Singleton.Get(LayerManager).removeView(this);
            Singleton.Get(LayerManager).getView(ui.ShopListInnerView).close();
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        SendView.prototype.refresh = function () {
            this.initTabs();
        };
        SendView.prototype.onAddToStage = function () {
            this.tabTitle.text = Template.getGUIText("ui_send1");
            this.tabShop.text = Template.getGUIText("ui_shop28");
            this.labTxtLog.text = Template.getGUIText("ui_send13");
            this.labTxtRefresh.text = Template.getGUIText("ui_send24");
            this.tabTitle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabSend, this);
            this.tabShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabShop, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnLog.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLog, this);
            this.btnRefresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRefresh, this);
        };
        SendView.prototype.onRemoveFromStage = function () {
            this.tabTitle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabSend, this);
            this.tabShop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTabShop, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnLog.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLog, this);
            this.btnRefresh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRefresh, this);
            this.m_entries.source = [];
        };
        SendView.prototype.initTabs = function () {
            // 当前状态不是任务列表时 重置任务列表
            if (!this.m_is_shop && this.currentState != SendView.STATUS_SEND) {
                this.initEntities();
            }
            if (!this.m_is_shop) {
                this.currentState = SendView.STATUS_SEND;
                this.tabTitle.active = true;
                this.tabShop.active = false;
                this.initView();
                Singleton.Get(LayerManager).getView(ui.ShopListInnerView).close();
            }
            else {
                this.currentState = SendView.STATUS_SHOP;
                this.tabTitle.active = false;
                this.tabShop.active = true;
                Singleton.Get(LayerManager).getView(ui.ShopListInnerView).open(DEFINE.SEND_SHOP_ID);
            }
        };
        SendView.prototype.initView = function () {
            var cfg_scr = Template.scroll.get(Template.config.Send);
            if (!cfg_scr) {
                console.log("no scr: " + Template.config.Send);
                return;
            }
            this.labDailyLimit.text = UtilsGame.stringHander(Template.getGUIText("ui_send23"), Singleton.Get(ScrollManager).getScrollActual(cfg_scr.ID)[0], cfg_scr.UpperL);
            var cfg_scr_ref = Template.scroll.get(DEFINE.SEND_SCROLL_QUEST_REFRESH);
            if (!cfg_scr_ref) {
                console.log("no scr: " + DEFINE.SEND_SCROLL_QUEST_REFRESH);
                return;
            }
            var inf_scr_ref = Singleton.Get(ScrollManager).getScrollActual(DEFINE.SEND_SCROLL_QUEST_REFRESH);
            this.labRefreshCost.text = inf_scr_ref[0] + "/" + cfg_scr_ref.UpperL;
            this.labRefreshCost.textColor = inf_scr_ref[0] > 0 ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
        };
        SendView.prototype.initEntities = function () {
            return __awaiter(this, void 0, void 0, function () {
                var source, quests, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            source = [];
                            return [4 /*yield*/, Singleton.Get(SendManager).reqQuestInfo(true)];
                        case 1:
                            _a.sent();
                            // 如果请求完成后界面已被关闭 则不刷新了
                            if (!Singleton.Get(LayerManager).isViewOnStage(this)) {
                                return [2 /*return*/];
                            }
                            quests = Singleton.Get(SendManager).getInfo().quests;
                            for (i = 0; i < quests.length; i++) {
                                source.push({
                                    quest_id: i
                                });
                            }
                            source.sort(function (a, b) {
                                var inf_a = quests[a.quest_id];
                                var inf_b = quests[b.quest_id];
                                // 如果有任务不存在 有任务的在前
                                if (!inf_a || !inf_b) {
                                    if (!inf_a) {
                                        return 1;
                                    }
                                    else {
                                        return -1;
                                    }
                                }
                                // 按 已完成、进行中、未开始 排序
                                var st_a = inf_a.getStatus();
                                var st_b = inf_b.getStatus();
                                if (st_a != st_b) {
                                    if (st_a == E_SEND_STATUS.END && st_b != E_SEND_STATUS.END) {
                                        return -1;
                                    }
                                    else if (st_b == E_SEND_STATUS.END && st_a != E_SEND_STATUS.END) {
                                        return 1;
                                    }
                                    if (st_a == E_SEND_STATUS.ONGOING && st_b != E_SEND_STATUS.ONGOING) {
                                        return -1;
                                    }
                                    else if (st_b == E_SEND_STATUS.ONGOING && st_a != E_SEND_STATUS.ONGOING) {
                                        return 1;
                                    }
                                }
                                // 按任务id排序
                                if (a.quest_id > b.quest_id) {
                                    return 1;
                                }
                                else {
                                    return -1;
                                }
                            });
                            this.m_entries.source = source;
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendView.prototype.onClick_btnClose = function () {
            SendViewHandler.closeAll();
            SendViewHandler.closeAfter();
        };
        SendView.prototype.onClick_btnLog = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    UtilsEffect.buttonEffectAsync(this.btnLog);
                    SendViewHandler.openLog();
                    return [2 /*return*/];
                });
            });
        };
        SendView.prototype.onClick_btnRefresh = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            UtilsEffect.buttonEffectAsync(this.btnRefresh);
                            return [4 /*yield*/, Singleton.Get(SendManager).reqQuestRefresh(function () {
                                    _this.initView();
                                }, this)];
                        case 1:
                            _a.sent();
                            this.onQuestsRefresh();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendView.prototype.onQuestsRefresh = function () {
            var _this = this;
            this.initView();
            var refreshed = Singleton.Get(SendManager).getInfo().getPrepareQuests();
            var _loop_1 = function (i) {
                Singleton.Get(UpdateTimer).addAndStart(200 * i, function () {
                    var target = _this.dgQuests.getElementAt(refreshed[i]);
                    target.playRefresh();
                    Singleton.Get(UpdateTimer).addAndStart(200, function () {
                        if (target) {
                            _this.m_entries.itemUpdated(_this.m_entries.getItemAt(refreshed[i]));
                        }
                    }, _this);
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < refreshed.length; i++) {
                _loop_1(i);
            }
        };
        SendView.prototype.onClick_btnTabSend = function () {
            UtilsEffect.tabEffect(this.tabTitle);
            this.m_is_shop = false;
            this.initTabs();
        };
        SendView.prototype.onClick_btnTabShop = function () {
            UtilsEffect.tabEffect(this.tabShop);
            this.m_is_shop = true;
            this.initTabs();
        };
        /**
         * 刷新子对象
         * @param quest_id
         */
        SendView.prototype.refreshItem = function (quest_id) {
            this.m_entries.itemUpdated(this.m_entries.getItemAt(quest_id));
            this.refresh();
        };
        return SendView;
    }(BaseUI));
    SendView.STATUS_SEND = "send";
    SendView.STATUS_SHOP = "shop";
    ui.SendView = SendView;
    __reflect(SendView.prototype, "ui.SendView");
})(ui || (ui = {}));
//# sourceMappingURL=SendView.js.map