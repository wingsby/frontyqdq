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
    var RoleEquipEnchantConstItemRenderer = (function (_super) {
        __extends(RoleEquipEnchantConstItemRenderer, _super);
        function RoleEquipEnchantConstItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.comp.RoleEquipEnchantConstItemRendererSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        RoleEquipEnchantConstItemRenderer.prototype.onAddToStage = function () {
            this.btnCb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCb, this);
        };
        RoleEquipEnchantConstItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnCb.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCb, this);
        };
        RoleEquipEnchantConstItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.setItem(this.data.item_id);
            this.setSel(this.data.item_id, this.data.sel_item);
        };
        RoleEquipEnchantConstItemRenderer.prototype.setItem = function (item_id) {
            var cfg_item = Template.item.get(item_id);
            if (!cfg_item) {
                console.error("no item: " + item_id);
                return;
            }
            ResManager.setTexture(this.imgTier, Common.getItemTierBgRes(cfg_item.iStar));
            ResManager.setTexture(this.imgIcon, cfg_item.iIcon);
            this.labCount.text = UtilsGame.numberToString(Singleton.Get(BagManager).getItemCount(item_id));
            this.labContent.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText(cfg_item.itemTxt));
            var p_data = Singleton.Get(LayerManager).getView(ui.RoleEquipEnchantConstView).data;
            var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(p_data.role_id);
            if (!inf_role) {
                console.error("no inf role: " + p_data.role_id);
                return;
            }
            var inf_equip = inf_role.getEquipByPos(p_data.pos);
            if (!inf_equip) {
                console.log("no inf equip, role: " + p_data.role_id + ", pos: " + p_data.pos);
                return;
            }
            var val_eht = inf_equip.getAttrValueEnchantBasic(p_data.target_id, cfg_item.EnchantId);
            var cfg_eht = Template.enchant.get(cfg_item.EnchantId);
            if (!cfg_eht) {
                console.error("no enchant: " + cfg_item.EnchantId);
                return;
            }
            this.labTitle.text = RoleUtil.GetAttrPrefixString(cfg_eht.EnchantBasics) + "+"
                + Common.attrValueHandlerWithPct(val_eht, cfg_eht.EnchantBasics);
            this.labTitle.textColor = Common.getItemNameColor(cfg_eht.EnchantStar);
        };
        RoleEquipEnchantConstItemRenderer.prototype.setSel = function (item_id, sel_item) {
            this.imgCbS.visible = sel_item == item_id;
        };
        RoleEquipEnchantConstItemRenderer.prototype.onClick_btnCb = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.imgCbS)];
                        case 1:
                            _a.sent();
                            Singleton.Get(LayerManager).getView(ui.RoleEquipEnchantConstView).setItemId(this.data.item_id);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return RoleEquipEnchantConstItemRenderer;
    }(eui.ItemRenderer));
    ui.RoleEquipEnchantConstItemRenderer = RoleEquipEnchantConstItemRenderer;
    __reflect(RoleEquipEnchantConstItemRenderer.prototype, "ui.RoleEquipEnchantConstItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=RoleEquipEnchantConstItemRenderer.js.map