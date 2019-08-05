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
    var GuildTechLevelupItemRenderer = (function (_super) {
        __extends(GuildTechLevelupItemRenderer, _super);
        function GuildTechLevelupItemRenderer() {
            return _super.call(this) || this;
        }
        GuildTechLevelupItemRenderer.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
            this.btnLevelup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLevelup, this);
        };
        GuildTechLevelupItemRenderer.prototype.onRemovedFromStage = function () {
            _super.prototype.onRemoveFromStage.call(this);
            this.btnLevelup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLevelup, this);
        };
        GuildTechLevelupItemRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.btnUpgrade.visible = false;
            this.setData(this.data.tech_id);
        };
        GuildTechLevelupItemRenderer.prototype.setData = function (tech_id) {
            var cfg_tech = Template.tech.get(tech_id);
            var g_tech_lv = Singleton.Get(GuildManager).getMyGuild().getTechLv(tech_id);
            var my_tech_lv = Singleton.Get(RoleManager).getRolesInfo().getTechLv(tech_id);
            var cfg_tup_g = Template.techUp.get(g_tech_lv);
            var cfg_tup_my = Template.techUp.get(my_tech_lv);
            if (!cfg_tup_g || !cfg_tup_my) {
                console.log("no techup: [ " + my_tech_lv + " or " + g_tech_lv + "]");
                return;
            }
            // 升级按钮显隐
            if (my_tech_lv >= GuildUtil.getTechMaxLv(tech_id)) {
                this.btnLevelup.visible = false;
                this.imgMax.visible = true;
            }
            else {
                this.btnLevelup.visible = true;
                this.imgMax.visible = false;
                // 价格和材料
                var cfg_item = Template.item.get(Template.config.Donate1);
                ResManager.setTexture(this.imgCostIcon, cfg_item.iIcon);
                this.labLevelupCost.text = UtilsGame.numberToString(cfg_tup_my.Money);
                this.labLevelupCost.textColor = Singleton.Get(BagManager).hasEnough(cfg_item.ID, cfg_tup_my.Money) ? DEFINE_COLOR.TEXT_WHITE : DEFINE_COLOR.WARN_RED;
            }
            // 等级要求
            this.labAttrTitle1.text = Template.getGUIText("ui_tech3");
            this.labAttr1.text = UtilsGame.stringHander("$1/$2", my_tech_lv, cfg_tup_g.TechLvUp);
            // 属性信息
            this.labAttrTitle2.text = RoleUtil.GetAttrPrefixString(cfg_tech.Tech[0]);
            this.labAttr2.text = "+" + Common.attrValueHandlerWithPct(GuildUtil.getTechAttr(tech_id, my_tech_lv), cfg_tech.Tech[0]);
        };
        GuildTechLevelupItemRenderer.prototype.onClick_btnLevelup = function () {
            return __awaiter(this, void 0, void 0, function () {
                var tech_id, cfg_tech, g_tech_lv, my_tech_lv, cfg_tup_g, cfg_tup_my;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnLevelup)];
                        case 1:
                            _a.sent();
                            tech_id = this.data.tech_id;
                            cfg_tech = Template.tech.get(tech_id);
                            if (!cfg_tech) {
                                console.error("no tech: " + tech_id);
                                return [2 /*return*/];
                            }
                            g_tech_lv = Singleton.Get(GuildManager).getMyGuild().getTechLv(tech_id);
                            my_tech_lv = Singleton.Get(RoleManager).getRolesInfo().getTechLv(tech_id);
                            cfg_tup_g = Template.techUp.get(g_tech_lv);
                            cfg_tup_my = Template.techUp.get(my_tech_lv);
                            if (!cfg_tup_g || !cfg_tup_my) {
                                console.log("no techup: [ " + my_tech_lv + " or " + g_tech_lv + "]");
                                return [2 /*return*/];
                            }
                            if (my_tech_lv >= GuildUtil.getTechMaxLv(tech_id)) {
                                Singleton.Get(MessageManager).handleRtSub(1111);
                                return [2 /*return*/];
                            }
                            if (my_tech_lv >= cfg_tup_g.TechLvUp) {
                                Singleton.Get(MessageManager).handleRtSub(1220);
                                return [2 /*return*/];
                            }
                            if (!Singleton.Get(BagManager).hasEnough(Template.config.Donate1, cfg_tup_my.Money)) {
                                Singleton.Get(MessageManager).handleRtSub(1221);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, Singleton.Get(GuildManager).reqTechLevelup(this.data.tech_id)];
                        case 2:
                            _a.sent();
                            this.setData(this.data.tech_id);
                            Singleton.Get(LayerManager).getView(ui.GuildTechView).initCost();
                            this.tgLevelup.stop();
                            this.tgLevelup.play(1);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return GuildTechLevelupItemRenderer;
    }(ui.GuildTechItemRenderer));
    ui.GuildTechLevelupItemRenderer = GuildTechLevelupItemRenderer;
    __reflect(GuildTechLevelupItemRenderer.prototype, "ui.GuildTechLevelupItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=GuildTechLevelupItemRenderer.js.map