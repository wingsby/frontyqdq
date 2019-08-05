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
    var BossRewardView = (function (_super) {
        __extends(BossRewardView, _super);
        function BossRewardView() {
            var _this = _super.call(this, "yw.BossRewardSkin") || this;
            _this.data = {
                text: {
                    title: "",
                    subtitle: ""
                }
            };
            return _this;
        }
        BossRewardView.prototype.componentCreated = function () {
            this.m_entries = new eui.ArrayCollection();
            this.dgItems.itemRendererSkinName = "yw.BossListItemSkin";
            this.dgItems.dataProvider = this.m_entries;
            this.data.text.title = Template.getGUIText("ui_bosswar20");
            this.data.text.subtitle = Template.getGUIText("ui_bosswar21");
        };
        BossRewardView.prototype.onDestroy = function () { };
        BossRewardView.prototype.onUpdate = function (time) { };
        BossRewardView.prototype.open = function (id) {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initView(id);
            this.btnDmg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDmg, this);
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        BossRewardView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.btnDmg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDmg, this);
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        BossRewardView.prototype.initView = function (id) {
            var _this = this;
            this.m_entries.source = [];
            var inf_boss = Singleton.Get(BossManager).getFullInfo().getBossById(id);
            Singleton.Get(BossManager).reqFullDamage(id, function (players, damage) {
                var source = [];
                source.push({
                    col1: Template.getGUIText("ui_bosswar14"),
                    col2: Template.getGUIText("ui_bosswar15"),
                    col3: Template.getGUIText("ui_bosswar16")
                });
                for (var i = 0; i < players.length; i++) {
                    source.push({
                        col1: i + 1,
                        col2: players[i].nickname,
                        col3: UtilsGame.numberToString(players[i].damage) + "(" + UtilsGame.toOptionalFixed(players[i].damage / inf_boss.maxhp * 100, 2) + "%)"
                    });
                }
                if (players.length > 0 && players[0].uid == Singleton.Get(LoginManager).loginInfo._id) {
                    _this.labDes.textFlow = new egret.HtmlTextParser().parser(UtilsGame.stringHander(Template.getGUIText("ui_bosswar23"), UtilsGame.numberToString(damage), UtilsGame.toOptionalFixed(damage / inf_boss.maxhp * 100, 2)));
                }
                else {
                    _this.labDes.textFlow = new egret.HtmlTextParser().parser(UtilsGame.stringHander(Template.getGUIText("ui_bosswar22"), UtilsGame.numberToString(damage), UtilsGame.toOptionalFixed(damage / inf_boss.maxhp * 100, 2)));
                }
                _this.m_entries.source = source;
            }, this);
        };
        BossRewardView.prototype.onClick_btnDmg = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffect(this.btnDmg)];
                        case 1:
                            _a.sent();
                            this.close();
                            Singleton.Get(LayerManager).getView(ui.DmgView).open(E_DMG_STAT_TYPE.WORLD);
                            return [2 /*return*/];
                    }
                });
            });
        };
        BossRewardView.prototype.onClick_btnHandler = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffect(this.btnHandler)];
                        case 1:
                            _a.sent();
                            this.close();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return BossRewardView;
    }(PopupUI));
    ui.BossRewardView = BossRewardView;
    __reflect(BossRewardView.prototype, "ui.BossRewardView");
})(ui || (ui = {}));
//# sourceMappingURL=BossRewardView.js.map