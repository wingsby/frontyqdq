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
    var ActJewelryInvestInnerView = (function (_super) {
        __extends(ActJewelryInvestInnerView, _super);
        function ActJewelryInvestInnerView() {
            var _this = _super.call(this) || this;
            _this.m_act_id = E_ACT_DESIGN_TYPE.JewelryInvest;
            return _this;
        }
        ActJewelryInvestInnerView.prototype.initInfo = function () {
            _super.prototype.initInfo.call(this);
            // 标题图片
            ResManager.AsyncSetTexture(this.imgInvest, "new_pidda2_png");
            // 消耗按钮内容
            this.initPrice(Template.config.InvestJewelry[1]);
            // 是否已购买显示状态
            this.initBuy(Singleton.Get(ActivityManager).getInfo().jewelry_has_invest);
        };
        ActJewelryInvestInnerView.prototype.initView = function () {
            var _this = this;
            _super.prototype.initView.call(this);
            var info = Singleton.Get(ActivityManager).getInfo();
            var entries = [];
            var tab_invest_vip = info.getEntities_JewelryInvest();
            var cfg_inv = tab_invest_vip.values;
            var _loop_1 = function (i) {
                var cfg = cfg_inv[i];
                // 基本信息
                var n = new ui.ActInnerItemData();
                n.id = i;
                n.item_id = cfg.ID;
                // 领取按钮状态
                var status_1 = info.getRewardStatus_JewelryInvest(cfg.ID);
                n.status = status_1;
                // 数据信息
                if (cfg.type == E_ACT_INVEST_TYPE.TEAM_LV) {
                    var my_team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
                    n.context = {
                        title: UtilsGame.stringHander(Template.getGUIText("ui_activity13"), cfg.value),
                        mark: (status_1 != E_REWARD_STATUS.RECEIVED) ? UtilsGame.stringHander(Template.getGUIText("ui_activity12"), my_team_lv, cfg.value) : "",
                    };
                }
                else {
                    var my_login_days = UtilsGame.getPlayerLifetimeDays();
                    n.context = {
                        title: UtilsGame.stringHander(Template.getGUIText("ui_activity14"), cfg.value + 1),
                        mark: (status_1 != E_REWARD_STATUS.RECEIVED) ? UtilsGame.stringHander(Template.getGUIText("ui_activity12"), my_login_days, cfg.value + 1) : "",
                    };
                }
                // 设置回调
                n.callback = function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!info.jewelry_has_invest) {
                                    Singleton.Get(DialogControler).showInfo(1178);
                                    return [2 /*return*/];
                                }
                                if (!(info.getRewardStatus_JewelryInvest(cfg.ID) == E_REWARD_STATUS.AVAILABLE))
                                    return [3 /*break*/, 2];
                                return [4 /*yield*/, Singleton.Get(ActivityManager).reqReward_JewelryInvest(cfg.ID)];
                            case 1:
                                _a.sent();
                                this.refresh();
                                Singleton.Get(LayerManager).getView(ui.ActivityView).refreshMenu();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); };
                n.thisObj = this_1;
                // 道具信息
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
            for (var i = 0; i < cfg_inv.length; i++) {
                _loop_1(i);
            }
            // 只有已投资才进行排序
            if (info.jewelry_has_invest) {
                // 列表排序
                entries.sort(ActivityUtil.sortList);
                // 重置排序后的id
                for (var i = 0; i < entries.length; i++) {
                    entries[i].id = i;
                }
            }
            this.arr_entries.source = entries;
        };
        ActJewelryInvestInnerView.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuy, this);
        };
        ActJewelryInvestInnerView.prototype.onRemoveFromStage = function () {
            _super.prototype.onRemoveFromStage.call(this);
            this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBuy, this);
        };
        ActJewelryInvestInnerView.prototype.onClick_btnBuy = function () {
            return __awaiter(this, void 0, void 0, function () {
                var inf_p, need_vip, price;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffect(this.btnBuy)];
                        case 1:
                            _a.sent();
                            inf_p = Singleton.Get(PlayerInfoManager);
                            need_vip = Template.config.InvestJewelry[0];
                            price = Template.config.InvestJewelry[1];
                            if (inf_p.getVipLevel() < need_vip) {
                                Singleton.Get(MessageManager).handleRtSub(1129);
                                return [2 /*return*/];
                            }
                            if (inf_p.getDiamond() < price) {
                                Singleton.Get(MessageManager).handleRtSub(1005);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, Singleton.Get(ActivityManager).reqBuy_JewelryInvest()];
                        case 2:
                            _a.sent();
                            Singleton.Get(DialogControler).showString(Template.getGUIText("ui_activity33"));
                            this.refresh();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ActJewelryInvestInnerView;
    }(ui.ActInnerInvestBasicView));
    ui.ActJewelryInvestInnerView = ActJewelryInvestInnerView;
    __reflect(ActJewelryInvestInnerView.prototype, "ui.ActJewelryInvestInnerView");
})(ui || (ui = {}));
//# sourceMappingURL=ActJewelryInvestInnerView.js.map