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
    var BossSingleItemRenderer = (function (_super) {
        __extends(BossSingleItemRenderer, _super);
        function BossSingleItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.BossSingleItemRendererSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            _this.m_entities = new eui.ArrayCollection();
            _this.dgItems.itemRenderer = ui.CommonItemRenderer;
            _this.dgItems.dataProvider = _this.m_entities;
            return _this;
        }
        BossSingleItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.labTxtTimes.text = Template.getGUIText("ui_bosswar9");
            this.labTxtDrop.text = Template.getGUIText("ui_bosswar10");
            this.btnEnter.text = Template.getGUIText("ui_bosswar6");
        };
        BossSingleItemRenderer.prototype.onAddToStage = function () {
            this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEnter, this);
            this.onInitView();
        };
        BossSingleItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEnter, this);
        };
        BossSingleItemRenderer.prototype.dataChanged = function () {
            this.onInitView();
        };
        BossSingleItemRenderer.prototype.onInitView = function () {
            if (!this.data) {
                return;
            }
            var cfg_sgs = Template.singleBoss.get(this.data.id);
            if (!cfg_sgs) {
                console.log("no single boss cfg: " + this.data.id);
                return;
            }
            var inf_scroll = Singleton.Get(ScrollManager).getScrollActual(cfg_sgs.FBchallenge);
            ResManager.AsyncSetTexture(this.imgIcon, cfg_sgs.Icon);
            this.labLastTimes.text = UtilsGame.numberToString(inf_scroll[0]);
            if (inf_scroll[0] > 0) {
                this.imgFin.visible = false;
                this.btnEnter.visible = true;
            }
            else {
                this.imgFin.visible = true;
                this.btnEnter.visible = false;
            }
            this.labName.text = Template.getGUIText(cfg_sgs.Name);
            var source = [];
            for (var i = 0; i < cfg_sgs.ItemIcon.length; i++) {
                source.push({
                    item_id: cfg_sgs.ItemIcon[i],
                    count: 0,
                    size: ui.E_COMMON_ITEM_RENDERER_SIZE.S64
                });
            }
            this.m_entities.source = source;
            var inf_player = Singleton.Get(PlayerInfoManager);
            if (inf_player.getTeamLv() < cfg_sgs.OpenLv) {
                this.btnEnter.active = false;
                this.groupLock.visible = true;
                this.labLock.text = UtilsGame.stringHander(Template.getGUIText("ui_pve_44"), cfg_sgs.OpenLv);
            }
            else {
                this.btnEnter.active = true;
                this.groupLock.visible = false;
            }
        };
        BossSingleItemRenderer.prototype.onClick_btnEnter = function () {
            return __awaiter(this, void 0, void 0, function () {
                var cfg_sgs, inf_player;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cfg_sgs = Template.singleBoss.get(this.data.id);
                            if (!cfg_sgs) {
                                console.log("no single boss cfg: " + this.data.id);
                                return [2 /*return*/];
                            }
                            inf_player = Singleton.Get(PlayerInfoManager);
                            if (inf_player.getTeamLv() < cfg_sgs.OpenLv) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnEnter)];
                        case 1:
                            _a.sent();
                            Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.WORLD_SB, battle.E_BATTLE_BEHAVIOR.POSITIVE, undefined, undefined, this.data.id);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return BossSingleItemRenderer;
    }(eui.ItemRenderer));
    ui.BossSingleItemRenderer = BossSingleItemRenderer;
    __reflect(BossSingleItemRenderer.prototype, "ui.BossSingleItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=BossSingleItemRenderer.js.map