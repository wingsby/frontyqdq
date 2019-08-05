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
    var GuildTechUpgradeItemRenderer = (function (_super) {
        __extends(GuildTechUpgradeItemRenderer, _super);
        function GuildTechUpgradeItemRenderer() {
            return _super.call(this) || this;
        }
        GuildTechUpgradeItemRenderer.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
            this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnUpgrade, this);
        };
        GuildTechUpgradeItemRenderer.prototype.onRemovedFromStage = function () {
            _super.prototype.onRemoveFromStage.call(this);
            this.btnUpgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnUpgrade, this);
        };
        GuildTechUpgradeItemRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.btnLevelup.visible = false;
            this.setData(this.data.tech_id);
        };
        GuildTechUpgradeItemRenderer.prototype.setData = function (tech_id) {
            var cfg_tech = Template.tech.get(tech_id);
            this.labUpgrade.text = Template.getGUIText("ui_tech2");
            var g_tech_lv = Singleton.Get(GuildManager).getMyGuild().getTechLv(tech_id);
            var cfg_tup_g = Template.techUp.get(g_tech_lv);
            if (!cfg_tup_g) {
                console.log("no techup: " + g_tech_lv);
                return;
            }
            var cfg_tup_g_next = Template.techUp.get(g_tech_lv + 1);
            var next_max_lv = cfg_tup_g_next ? cfg_tup_g_next.TechLvUp : 0;
            // 升级按钮显隐
            if (g_tech_lv >= cfg_tech.LvMax) {
                this.btnUpgrade.visible = false;
                this.imgMax.visible = true;
            }
            else {
                this.btnUpgrade.visible = true;
                this.imgMax.visible = false;
            }
            // 等级要求
            this.labAttrTitle1.text = UtilsGame.stringHander(Template.getGUIText("ui_tech7"), cfg_tup_g.TechLvUp);
            this.labAttr1.text = "";
            // 属性信息
            var funds = Singleton.Get(GuildManager).getMyGuild().funds;
            this.labAttrTitle2.text = Template.getGUIText("ui_tech5");
            this.labAttr2.text = UtilsGame.numberToString(cfg_tup_g.TechResearch);
            this.labAttr2.textColor = funds >= cfg_tup_g.TechResearch ? DEFINE_COLOR.OK_GREEN : DEFINE_COLOR.WARN_RED;
        };
        GuildTechUpgradeItemRenderer.prototype.onClick_btnUpgrade = function () {
            return __awaiter(this, void 0, void 0, function () {
                var inf_my_g, tech_id, cfg_tech, my_place, g_tech_lv, cfg_tup_g, funds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnUpgrade)];
                        case 1:
                            _a.sent();
                            inf_my_g = Singleton.Get(GuildManager).getMyGuild();
                            tech_id = this.data.tech_id;
                            cfg_tech = Template.tech.get(tech_id);
                            if (!cfg_tech) {
                                console.error("no tech: " + tech_id);
                                return [2 /*return*/];
                            }
                            my_place = inf_my_g.getMyPlace();
                            if (my_place != E_GUILD_PLACE.LEADER && my_place != E_GUILD_PLACE.RULER) {
                                // 无权操作
                                return [2 /*return*/];
                            }
                            g_tech_lv = inf_my_g.getTechLv(tech_id);
                            if (g_tech_lv >= cfg_tech.LvMax) {
                                Singleton.Get(MessageManager).handleRtSub(1111);
                                return [2 /*return*/];
                            }
                            cfg_tup_g = Template.techUp.get(g_tech_lv);
                            if (!cfg_tup_g) {
                                console.log("no techup: " + g_tech_lv);
                                return [2 /*return*/];
                            }
                            funds = inf_my_g.funds;
                            if (funds < cfg_tup_g.TechResearch) {
                                Singleton.Get(MessageManager).handleRtSub(1219);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, Singleton.Get(GuildManager).reqTechUpgrade(this.data.tech_id, cfg_tup_g.TechResearch)];
                        case 2:
                            _a.sent();
                            this.setData(this.data.tech_id);
                            Singleton.Get(LayerManager).getView(ui.GuildTechView).initCost();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return GuildTechUpgradeItemRenderer;
    }(ui.GuildTechItemRenderer));
    ui.GuildTechUpgradeItemRenderer = GuildTechUpgradeItemRenderer;
    __reflect(GuildTechUpgradeItemRenderer.prototype, "ui.GuildTechUpgradeItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=GuildTechUpgradeItemRenderer.js.map