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
    var ActVipBenefitInnerView = (function (_super) {
        __extends(ActVipBenefitInnerView, _super);
        /**
         * @constructor
         */
        function ActVipBenefitInnerView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ActInnerBasicSkin_VipBenefit";
            _this.m_entries_pv = new eui.ArrayCollection();
            _this.m_entries_bf = new eui.ArrayCollection();
            return _this;
        }
        ActVipBenefitInnerView.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
        };
        ActVipBenefitInnerView.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
            this.initView();
            this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
        };
        ActVipBenefitInnerView.prototype.onRemoveFromStage = function () {
            _super.prototype.onRemoveFromStage.call(this);
            this.btnSubmit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
        };
        /**
         * 设定视图数据
         */
        ActVipBenefitInnerView.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.labDes.text = Template.getGUIText("ui_activity26");
            this.labSubmit.text = Template.getGUIText("ui_activity27");
            this.dgPreview.dataProvider = this.m_entries_pv;
            this.dgPreview.itemRenderer = ui.CommonItemRenderer;
            this.dgBenefits.dataProvider = this.m_entries_bf;
            this.dgBenefits.itemRenderer = ui.ActInnerItemView_ItemWithName;
            var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
            var cfg_vb = Template.vipBonus.get(my_vip);
            if (!cfg_vb) {
                console.error("no vip_bonus: " + my_vip);
                return;
            }
            this.labTitle.text = UtilsGame.stringHander(Template.getGUIText("ui_activity28"), my_vip);
            // 下级预览
            var cfg_vb_next = Template.vipBonus.get(my_vip + 1);
            if (cfg_vb_next) {
                this.groupPreview.visible = true;
                this.labNextLv.text = (my_vip + 1).toString();
            }
            else {
                this.groupPreview.visible = false;
            }
            this.m_entries_pv.source = this.genItemData(my_vip + 1);
            this.m_entries_bf.source = this.genItemData(my_vip);
            // 是否已领取过
            this.currentState = Singleton.Get(ActivityManager).getInfo().getVipBenefitExeced() ? "complete" : "active";
        };
        ActVipBenefitInnerView.prototype.genItemData = function (vip) {
            var result = [];
            var cfg_vb = Template.vipBonus.get(vip);
            if (cfg_vb) {
                if (cfg_vb.VIPGold > 0) {
                    result.push({
                        item_id: -2,
                        count: cfg_vb.VIPGold,
                        size: ui.E_COMMON_ITEM_RENDERER_SIZE.S64
                    });
                }
                if (cfg_vb.VIPDiamond > 0) {
                    result.push({
                        item_id: -1,
                        count: cfg_vb.VIPDiamond,
                        size: ui.E_COMMON_ITEM_RENDERER_SIZE.S64
                    });
                }
                for (var i = 0; i < cfg_vb.VIPItem.length; i++) {
                    result.push({
                        item_id: cfg_vb.VIPItem[i],
                        count: cfg_vb.Counts[i],
                        size: ui.E_COMMON_ITEM_RENDERER_SIZE.S64
                    });
                }
            }
            return result;
        };
        ActVipBenefitInnerView.prototype.onClick_btnSubmit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnSubmit)];
                        case 1:
                            _a.sent();
                            Singleton.Get(ActivityManager).reqExec_VipBenefit(function () {
                                _this.refresh();
                            }, this);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ActVipBenefitInnerView;
    }(ui.ActInnerBasicView));
    ui.ActVipBenefitInnerView = ActVipBenefitInnerView;
    __reflect(ActVipBenefitInnerView.prototype, "ui.ActVipBenefitInnerView");
})(ui || (ui = {}));
//# sourceMappingURL=ActVipBenefitInnerView.js.map