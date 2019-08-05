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
    var ActSpExRoleView = (function (_super) {
        __extends(ActSpExRoleView, _super);
        function ActSpExRoleView() {
            var _this = _super.call(this, "yw.ActSpExRoleSkin") || this;
            _this.last_tick_time = 0;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        ActSpExRoleView.prototype.componentCreated = function () {
            this.m_entries = new eui.ArrayCollection();
            this.dgItems.itemRenderer = ui.ActInnerItemView_Gift;
            this.dgItems.dataProvider = this.m_entries;
        };
        ActSpExRoleView.prototype.onDestroy = function () { };
        ActSpExRoleView.prototype.onUpdate = function (time) { };
        ActSpExRoleView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.refresh();
        };
        ActSpExRoleView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.last_tick_time = 0;
        };
        ActSpExRoleView.prototype.refresh = function () {
            this.initView();
        };
        ActSpExRoleView.prototype.update = function () {
            var now = UtilsGame.Now();
            if (now - this.last_tick_time > 30000) {
                this.last_tick_time = now;
                var type = ActivityUtil.isActOpenNoMutex(E_ACT_DESIGN_TYPE.ExRole, E_ACT_TYPE.BEGIN) ? E_ACT_TYPE.BEGIN : E_ACT_TYPE.BASIC;
                var str_cd = ActivityUtil.getCountdownStr(E_ACT_DESIGN_TYPE.ExRole, type);
                str_cd = str_cd.replace(Template.getGUIText("ui_activity35"), "");
                eval("str_cd = str_cd.replace(/" + Template.getGUIText("ui_activity39") + "/, '')"); // is evil, but useful.
                this.labCountdown.text = str_cd;
            }
        };
        ActSpExRoleView.prototype.onAddToStage = function () {
            this.labTxtCountdown.text = Template.getGUIText("ui_activity35") + Template.getGUIText("ui_activity36");
            this.labTxtSubTitle.text = Template.getGUIText("ui_activity37");
            this.labChallenge.text = Template.getGUIText("ui_activity38");
            this.labCountdown.text = "";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnChallenge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChallenge, this);
            this.imgChara.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_imgChara, this);
            Singleton.Get(RegisterUpdate).register(this);
        };
        ActSpExRoleView.prototype.onRemoveFromStage = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnChallenge.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChallenge, this);
            this.imgChara.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_imgChara, this);
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        ActSpExRoleView.prototype.initView = function () {
            var _this = this;
            this.imgChara.source = undefined;
            ResManager.setTexture(this.imgChara, Template.config.ExRole + "_png");
            var info = Singleton.Get(ActivityManager).getInfo();
            var entries = [];
            var cfg_exr = Template.exRole.values;
            var _loop_1 = function (i) {
                var cfg = cfg_exr[i];
                // 基本信息
                var n = new ui.ActInnerItemData();
                n.id = i;
                n.item_id = cfg.ID;
                // 数据信息
                var discount = cfg.Off;
                var cfg_item = Template.item.get(cfg.Item[0]);
                if (!cfg_item) {
                    console.error("no item: " + cfg.Item[0]);
                    return "continue";
                }
                var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
                n.status = info.getItemStatus_ExRole(cfg.ID);
                n.context = {
                    title: Template.getGUIText(cfg_item.iName) + UtilsGame.stringHander(Template.getGUIText("ui_activity29"), discount),
                    mark: UtilsGame.stringHander(Template.getGUIText("ui_activity30"), cfg.VIP),
                    mark_color: Singleton.Get(PlayerInfoManager).getVipLevel() >= cfg.VIP ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED,
                    cost_icon: DEFINE.UI_ALERT_INFO.diamond.resPNG,
                    price: cfg.Diamond,
                    cost_enough: (my_diamond >= cfg.Diamond),
                    need_vip: cfg.VIP
                };
                // 设置回调
                n.callback = function () { return __awaiter(_this, void 0, void 0, function () {
                    var mgr_info;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(info.getItemStatus_ExRole(cfg.ID) == E_REWARD_STATUS.AVAILABLE))
                                    return [3 /*break*/, 2];
                                mgr_info = Singleton.Get(PlayerInfoManager);
                                if (mgr_info.getVipLevel() < cfg.VIP) {
                                    Singleton.Get(MessageManager).handleRtSub(1129);
                                    return [2 /*return*/];
                                }
                                if (mgr_info.getDiamond() < cfg.Diamond) {
                                    Singleton.Get(MessageManager).handleRtSub(1005);
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, Singleton.Get(ActivityManager).reqBuy_ExRole(cfg.ID)];
                            case 1:
                                _a.sent();
                                this.refresh();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); };
                n.thisObj = this_1;
                // 道具信息
                n.gold = cfg.Gold;
                n.items = [];
                for (var j = 0; j < cfg.Item.length; j++) {
                    n.items.push({
                        id: j,
                        item_id: cfg.Item[j],
                        count: cfg.Counts[j]
                    });
                }
                // 加入列表
                entries.push(n);
            };
            var this_1 = this;
            for (var i = 0; i < cfg_exr.length; i++) {
                _loop_1(i);
            }
            // 列表排序
            entries.sort(ActivityUtil.sortList);
            // 重置排序后的id
            for (var i = 0; i < entries.length; i++) {
                entries[i].id = i;
            }
            this.m_entries.source = entries;
        };
        ActSpExRoleView.prototype.onClick_btnClose = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.close();
                    return [2 /*return*/];
                });
            });
        };
        ActSpExRoleView.prototype.onClick_btnChallenge = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnChallenge)];
                        case 1:
                            _a.sent();
                            this.close();
                            Singleton.Get(LayerManager).getView(ui.ShopListView).open(Template.shop.get(Template.config.ExRoleID[1]), false, function () {
                                _this.open();
                            }, this);
                            return [2 /*return*/];
                    }
                });
            });
        };
        ActSpExRoleView.prototype.onClick_imgChara = function () {
            Singleton.Get(LayerManager).getView(ui.RoleDetailView).open(Template.config.ExRoleID[0], true, true);
        };
        return ActSpExRoleView;
    }(PopupUI));
    ui.ActSpExRoleView = ActSpExRoleView;
    __reflect(ActSpExRoleView.prototype, "ui.ActSpExRoleView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=ActSpExRoleView.js.map