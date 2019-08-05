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
    var RoleEquipEnchantConstView = (function (_super) {
        __extends(RoleEquipEnchantConstView, _super);
        function RoleEquipEnchantConstView() {
            var _this = _super.call(this, "yw.RoleEquipEnchantConstSkin") || this;
            _this.resetData();
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
            return _this;
        }
        RoleEquipEnchantConstView.prototype.componentCreated = function () {
            this.m_entries = new eui.ArrayCollection();
            this.dgItems.dataProvider = this.m_entries;
            this.dgItems.itemRenderer = ui.RoleEquipEnchantConstItemRenderer;
        };
        ;
        RoleEquipEnchantConstView.prototype.onDestroy = function () { };
        ;
        RoleEquipEnchantConstView.prototype.onUpdate = function (time) { };
        ;
        RoleEquipEnchantConstView.prototype.onAddToStage = function () {
            this.labTitle.text = Template.getGUIText("ui_fumo20");
            this.labTitleItem.text = Template.getGUIText("ui_fumo21");
            this.labDes.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText("ui_fumo22"));
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
            this.btnCb0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCb0, this);
            this.btnCb1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCb1, this);
        };
        RoleEquipEnchantConstView.prototype.onRemovedFromStage = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnSubmit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
            this.btnCb0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCb0, this);
            this.btnCb1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCb1, this);
        };
        RoleEquipEnchantConstView.prototype.open = function (role_id, pos) {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.data.role_id = role_id;
            this.data.pos = pos;
            this.refresh();
        };
        RoleEquipEnchantConstView.prototype.close = function () {
            this.resetData();
            Singleton.Get(LayerManager).getPopup().removePopup(this);
        };
        RoleEquipEnchantConstView.prototype.refresh = function () {
            this.initView();
            this.initItemList();
            this.initCbs();
        };
        RoleEquipEnchantConstView.prototype.resetData = function () {
            this.data = {
                role_id: 0,
                pos: 0,
                item_id: 0,
                target_id: 0
            };
        };
        RoleEquipEnchantConstView.prototype.initView = function () {
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(this.data.role_id);
            var my_equip = my_info.getEquipByPos(this.data.pos);
            // 装备槽位
            ResManager.setTexture(this.imgPos, Common.getEquipPosRes(this.data.pos));
            this.labPosLv.text = "Lv." + my_equip.eht_full_lv;
            // 附魔属性1
            var cfg_attr0 = Template.enchant.get(my_equip.eht_ids[0]);
            this.labAttr0.text = RoleUtil.GetAttrPrefixString(cfg_attr0.EnchantBasics) + "+"
                + Common.attrValueHandlerWithPct(my_equip.getAttrValueEnchant(0), cfg_attr0.EnchantBasics);
            this.labAttr0.textColor = Common.getItemNameColor(cfg_attr0.EnchantStar);
            // 附魔属性2
            var cfg_attr1 = Template.enchant.get(my_equip.eht_ids[1]);
            this.labAttr1.text = RoleUtil.GetAttrPrefixString(cfg_attr1.EnchantBasics) + "+"
                + Common.attrValueHandlerWithPct(my_equip.getAttrValueEnchant(1), cfg_attr1.EnchantBasics);
            this.labAttr1.textColor = Common.getItemNameColor(cfg_attr1.EnchantStar);
        };
        RoleEquipEnchantConstView.prototype.initItemList = function () {
            var lst_bag = Singleton.Get(BagManager).getbagDict();
            var lst_it_eht = [];
            for (var i = 0; i < lst_bag.keys.length; i++) {
                var cfg_item = Template.item.get(lst_bag.keys[i]);
                if (!cfg_item) {
                    console.error("no item: " + lst_bag.keys[i]);
                    continue;
                }
                if (cfg_item.iType == ItemType.EnchantConst) {
                    lst_it_eht.push(lst_bag.keys[i]);
                }
            }
            var source = [];
            for (var i = 0; i < lst_it_eht.length; i++) {
                var item_id = lst_it_eht[i];
                var cfg_item = Template.item.get(item_id);
                if (RoleUtil.isEnchentForPos(this.data.pos, cfg_item.EnchantId)) {
                    source.push({
                        item_id: item_id,
                        sel_item: this.data.item_id
                    });
                }
            }
            this.m_entries.source = source;
            this.initEmpty();
        };
        RoleEquipEnchantConstView.prototype.initCbs = function () {
            this.imgCbS0.visible = this.data.target_id == 0;
            this.imgCbS1.visible = this.data.target_id == 1;
        };
        RoleEquipEnchantConstView.prototype.initEmpty = function () {
            if (this.m_entries.length <= 0) {
                this.compEmpty.text = Template.getGUIText("ui_fumo23");
                this.compEmpty.playAni();
                this.compEmpty.visible = true;
            }
            else {
                this.compEmpty.visible = false;
            }
        };
        RoleEquipEnchantConstView.prototype.onClick_btnCb0 = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.cb0)];
                        case 1:
                            _a.sent();
                            this.data.target_id = 0;
                            this.data.item_id = 0;
                            this.initCbs();
                            this.initItemList();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RoleEquipEnchantConstView.prototype.onClick_btnCb1 = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.cb1)];
                        case 1:
                            _a.sent();
                            this.data.target_id = 1;
                            this.data.item_id = 0;
                            this.initCbs();
                            this.initItemList();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RoleEquipEnchantConstView.prototype.onClick_btnSubmit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var inf_equip, ori_id, cfg_item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnSubmit)];
                        case 1:
                            _a.sent();
                            if (this.data.item_id <= 0) {
                                Singleton.Get(DialogControler).showInfo(1216);
                                return [2 /*return*/];
                            }
                            inf_equip = Singleton.Get(RoleManager).getRolesInfo().GetRole(this.data.role_id).getEquipByPos(this.data.pos);
                            if (inf_equip) {
                                ori_id = inf_equip.eht_ids[this.data.target_id];
                                cfg_item = Template.item.get(this.data.item_id);
                                if (cfg_item.EnchantId == ori_id) {
                                    Singleton.Get(DialogControler).showInfo(1222);
                                    return [2 /*return*/];
                                }
                            }
                            return [4 /*yield*/, Singleton.Get(EquipManager).onReqEnchantChangeConst(this.data.role_id, this.data.pos, this.data.item_id, this.data.target_id)];
                        case 2:
                            _a.sent();
                            this.data.item_id = 0;
                            this.refresh();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RoleEquipEnchantConstView.prototype.onClick_btnClose = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.close();
                    return [2 /*return*/];
                });
            });
        };
        RoleEquipEnchantConstView.prototype.setItemId = function (item_id) {
            this.data.item_id = item_id;
            for (var i = 0; i < this.m_entries.source.length; i++) {
                this.m_entries.getItemAt(i).sel_item = item_id;
                this.m_entries.itemUpdated(this.m_entries.getItemAt(i));
            }
        };
        return RoleEquipEnchantConstView;
    }(PopupUI));
    ui.RoleEquipEnchantConstView = RoleEquipEnchantConstView;
    __reflect(RoleEquipEnchantConstView.prototype, "ui.RoleEquipEnchantConstView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleEquipEnchantConstView.js.map