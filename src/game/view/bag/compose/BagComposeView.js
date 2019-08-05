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
    var BagComposeView = (function (_super) {
        __extends(BagComposeView, _super);
        function BagComposeView() {
            var _this = _super.call(this, "yw.BagComposeSkin") || this;
            _this.m_comp_id = 0;
            return _this;
        }
        BagComposeView.prototype.onDestroy = function () { };
        ;
        BagComposeView.prototype.onUpdate = function (time) { };
        ;
        BagComposeView.prototype.componentCreated = function () {
            this.m_entries = new eui.ArrayCollection();
            this.dgItems.dataProvider = this.m_entries;
            this.dgItems.itemRenderer = ui.BagComposeItemRenderer;
        };
        ;
        BagComposeView.prototype.open = function (comp_id) {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.m_comp_id = comp_id;
            this.refresh();
        };
        BagComposeView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        BagComposeView.prototype.refresh = function () {
            this.initView();
        };
        BagComposeView.prototype.onAddToStage = function () {
            this.labTitle.text = "合成";
            this.labTxtCompose.text = "合成";
            this.labTxtComposeTen.text = "合成十次";
            this.labTxtCost.text = "合成费用";
            this.btnCompose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCompose, this);
            this.btnComposeTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnComposeTen, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        BagComposeView.prototype.onRemoveFromStage = function () {
            this.m_comp_id = 0;
            this.m_entries.source = [];
            this.btnCompose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCompose, this);
            this.btnComposeTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnComposeTen, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        BagComposeView.prototype.initView = function () {
            var comp_id = this.m_comp_id;
            var cfg_craft = Template.craft.get(comp_id);
            if (!cfg_craft) {
                console.error("no craft: " + comp_id);
                return;
            }
            var cfg_item = Template.item.get(cfg_craft.Icon);
            if (!cfg_item) {
                console.error("no item: " + cfg_craft.Icon);
                return;
            }
            this.imgTier.source = null;
            this.imgIcon.source = null;
            this.labName.text = Template.getGUIText(cfg_item.iName);
            this.labName.textColor = Common.getItemNameColor(cfg_item.iStar);
            ResManager.setTexture(this.imgTier, Common.getItemTierBgRes(cfg_item.iStar));
            ResManager.setTexture(this.imgIcon, cfg_item.iIcon);
            this.labCost.text = UtilsGame.numberToString(cfg_craft.Gold);
            this.labCost.textColor = Singleton.Get(PlayerInfoManager).getGold() >= cfg_craft.Gold ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
            if (cfg_craft.Require.length != cfg_craft.Counts.length || cfg_craft.Item.length != cfg_craft.Itemvalue.length) {
                Singleton.Get(DialogControler).showInfo(1224);
                return;
            }
            var source = [];
            for (var i = 0; i < cfg_craft.Require.length; i++) {
                source.push({
                    item_id: cfg_craft.Require[i],
                    count: cfg_craft.Counts[i]
                });
            }
            this.m_entries.source = source;
        };
        BagComposeView.prototype.onClick_btnClose = function () {
            this.close();
            Singleton.Get(LayerManager).refreshAll();
        };
        BagComposeView.prototype.checkCost = function (count) {
            var comp_id = this.m_comp_id;
            var cfg_craft = Template.craft.get(comp_id);
            if (!cfg_craft) {
                console.error("no craft: " + comp_id);
                return;
            }
            for (var i = 0; i < cfg_craft.Require.length; i++) {
                var my_count = Singleton.Get(BagManager).getItemCount(cfg_craft.Require[i]);
                if (my_count < cfg_craft.Counts[i] * count) {
                    Singleton.Get(DialogControler).showInfo(1223);
                    return false;
                }
            }
            if (Singleton.Get(PlayerInfoManager).getGold() < cfg_craft.Gold) {
                Singleton.Get(DialogControler).showInfo(1004);
                return false;
            }
            return true;
        };
        BagComposeView.prototype.onClick_btnCompose = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnCompose)];
                        case 1:
                            _a.sent();
                            if (!this.checkCost(1))
                                return [3 /*break*/, 3];
                            return [4 /*yield*/, Singleton.Get(BagOperManager).reqComposeItem(this.m_comp_id, 1)];
                        case 2:
                            _a.sent();
                            this.refresh();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        BagComposeView.prototype.onClick_btnComposeTen = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnComposeTen)];
                        case 1:
                            _a.sent();
                            if (!this.checkCost(10))
                                return [3 /*break*/, 3];
                            return [4 /*yield*/, Singleton.Get(BagOperManager).reqComposeItem(this.m_comp_id, 10)];
                        case 2:
                            _a.sent();
                            this.refresh();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return BagComposeView;
    }(PopupUI));
    ui.BagComposeView = BagComposeView;
    __reflect(BagComposeView.prototype, "ui.BagComposeView");
})(ui || (ui = {}));
//# sourceMappingURL=BagComposeView.js.map