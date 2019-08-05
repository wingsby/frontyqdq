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
    var E_GUILD_TECH_VIEW_STATUS;
    (function (E_GUILD_TECH_VIEW_STATUS) {
        E_GUILD_TECH_VIEW_STATUS[E_GUILD_TECH_VIEW_STATUS["LEVELUP"] = 0] = "LEVELUP";
        E_GUILD_TECH_VIEW_STATUS[E_GUILD_TECH_VIEW_STATUS["UPGRADE"] = 1] = "UPGRADE";
    })(E_GUILD_TECH_VIEW_STATUS || (E_GUILD_TECH_VIEW_STATUS = {}));
    var GuildTechView = (function (_super) {
        __extends(GuildTechView, _super);
        function GuildTechView() {
            var _this = _super.call(this, "yw.GuildTechSkin") || this;
            _this.m_cur_status = E_GUILD_TECH_VIEW_STATUS.LEVELUP;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        GuildTechView.prototype.onDestroy = function () { };
        GuildTechView.prototype.onUpdate = function (time) { };
        GuildTechView.prototype.componentCreated = function () {
            this.m_entities_levelup = new eui.ArrayCollection();
            this.dgLevelup.dataProvider = this.m_entities_levelup;
            this.dgLevelup.itemRenderer = ui.GuildTechLevelupItemRenderer;
            this.m_entities_upgrade = new eui.ArrayCollection();
            this.dgUpgrade.dataProvider = this.m_entities_upgrade;
            this.dgUpgrade.itemRenderer = ui.GuildTechUpgradeItemRenderer;
        };
        GuildTechView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.refresh(true);
        };
        GuildTechView.prototype.close = function () {
            Singleton.Get(LayerManager).removeView(this);
        };
        GuildTechView.prototype.refresh = function (reset) {
            if (reset === void 0) { reset = false; }
            if (reset) {
                this.setStatus(E_GUILD_TECH_VIEW_STATUS.LEVELUP);
            }
            // 只有会长和副会长显示研究标签页
            var my_place = Singleton.Get(GuildManager).getMyGuild().getMyPlace();
            this.tabUpgrade.visible = (my_place == E_GUILD_PLACE.LEADER || my_place == E_GUILD_PLACE.RULER);
            this.initCost();
            this.initView();
        };
        GuildTechView.prototype.onAddToStage = function () {
            this.tabLevelup.text = Template.getGUIText("ui_tech1");
            this.tabUpgrade.text = Template.getGUIText("ui_tech2");
            this.tabLevelup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabLevelup, this);
            this.tabUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabUpgrade, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
        };
        GuildTechView.prototype.onRemoveFromStage = function () {
            this.tabLevelup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabLevelup, this);
            this.tabUpgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabUpgrade, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.m_entities_levelup.source = [];
            this.m_entities_upgrade.source = [];
        };
        GuildTechView.prototype.setStatus = function (status) {
            this.m_cur_status = status;
        };
        GuildTechView.prototype.initCost = function () {
            switch (this.m_cur_status) {
                case E_GUILD_TECH_VIEW_STATUS.LEVELUP:
                    var item_id = Template.config.Donate1;
                    this.labCostCount.text = "公会贡献：" + UtilsGame.numberToString(Singleton.Get(BagManager).getItemCount(item_id));
                    this.labCostDes.text = Template.getGUIText("ui_tech10");
                    break;
                case E_GUILD_TECH_VIEW_STATUS.UPGRADE:
                    this.labCostCount.text = Template.getGUIText("ui_tech4") + UtilsGame.numberToString(Singleton.Get(GuildManager).getMyGuild().funds);
                    this.labCostDes.text = Template.getGUIText("ui_tech11");
                    break;
            }
        };
        GuildTechView.prototype.initView = function () {
            var source = [];
            var cfg_techs = Template.tech.values;
            for (var i = 0; i < cfg_techs.length; i++) {
                source.push({
                    tech_id: cfg_techs[i].ID
                });
            }
            switch (this.m_cur_status) {
                case E_GUILD_TECH_VIEW_STATUS.LEVELUP:
                    this.tabLevelup.active = true;
                    this.dgLevelup.visible = true;
                    this.dgUpgrade.visible = false;
                    this.tabUpgrade.active = false;
                    this.m_entities_levelup.source = source;
                    break;
                case E_GUILD_TECH_VIEW_STATUS.UPGRADE:
                    this.tabLevelup.active = false;
                    this.dgLevelup.visible = false;
                    this.dgUpgrade.visible = true;
                    this.tabUpgrade.active = true;
                    this.m_entities_upgrade.source = source;
                    break;
            }
        };
        GuildTechView.prototype.onClick_tabLevelup = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    UtilsEffect.tabEffect(this.tabLevelup);
                    if (this.m_cur_status != E_GUILD_TECH_VIEW_STATUS.LEVELUP) {
                        this.setStatus(E_GUILD_TECH_VIEW_STATUS.LEVELUP);
                        this.refresh();
                    }
                    return [2 /*return*/];
                });
            });
        };
        GuildTechView.prototype.onClick_tabUpgrade = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    UtilsEffect.tabEffect(this.tabUpgrade);
                    if (this.m_cur_status != E_GUILD_TECH_VIEW_STATUS.UPGRADE) {
                        this.setStatus(E_GUILD_TECH_VIEW_STATUS.UPGRADE);
                        this.refresh();
                    }
                    return [2 /*return*/];
                });
            });
        };
        GuildTechView.prototype.onClick_btnBack = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.close();
                    GuildViewHandler.openMain();
                    return [2 /*return*/];
                });
            });
        };
        return GuildTechView;
    }(BaseUI));
    ui.GuildTechView = GuildTechView;
    __reflect(GuildTechView.prototype, "ui.GuildTechView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildTechView.js.map