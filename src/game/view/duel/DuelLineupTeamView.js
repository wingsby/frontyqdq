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
    var DuelLineupTeamView = (function (_super) {
        __extends(DuelLineupTeamView, _super);
        function DuelLineupTeamView() {
            var _this = _super.call(this) || this;
            _this.team_id = 0;
            _this.skinName = "yw.DuelLineupTeamSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            _this.labOpinion.text = "布 阵";
            _this.labDrop.text = "下 阵";
            _this.roles_arr = new eui.ArrayCollection();
            _this.dgRoles.dataProvider = _this.roles_arr;
            _this.dgRoles.itemRenderer = ui.DuelLineupAvatarView;
            return _this;
        }
        DuelLineupTeamView.prototype.dataChanged = function () {
            if (this.data == undefined) {
                return;
            }
            this.initView(this.data);
        };
        DuelLineupTeamView.prototype.initView = function (team_id) {
            this.team_id = team_id;
            // 初始化角色
            this.initRoles(team_id);
            var fighting = Singleton.Get(DuelManager).getDuels().getTeamFighting(team_id);
            this.labName.text = Common.getDuelTeamName(team_id);
            this.labFighting.text = fighting.toString();
        };
        DuelLineupTeamView.prototype.initRoles = function (team_id) {
            var data_arr = [];
            var team = Singleton.Get(DuelManager).getDuels().getTeam(team_id);
            for (var i = 0; i < team.length; i++) {
                data_arr.push(team[i]);
            }
            this.roles_arr.source = data_arr;
            this.roles_arr.refresh();
        };
        DuelLineupTeamView.prototype.onAddToStage = function (e) {
            this.btnOpinion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.btnDrop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDrop, this);
            this.dgRoles.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_btnRoles, this);
        };
        DuelLineupTeamView.prototype.onRemoveFromStage = function (e) {
            this.btnOpinion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.btnDrop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDrop, this);
            this.dgRoles.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_btnRoles, this);
        };
        DuelLineupTeamView.prototype.onClick_btnOpinion = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var duel, team;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnOpinion)];
                        case 1:
                            _a.sent();
                            duel = Singleton.Get(DuelManager).getDuels();
                            if (duel.checkTeamEmpty(this.team_id)) {
                                Singleton.Get(DialogControler).showString("队伍为空 不能布阵"); // TODO 加到Info表
                                return [2 /*return*/];
                            }
                            team = duel.getTeamInDict(this.team_id);
                            Singleton.Get(LayerManager).getView(ui.RoleOpinionView).open();
                            Singleton.Get(LayerManager).getView(ui.RoleOpinionView).initRoles(team, function (result) {
                                Singleton.Get(DuelManager).reqTeamOpinion(_this.team_id, result, function () {
                                    Singleton.Get(LayerManager).getView(ui.DuelLineupView).refresh();
                                }, _this);
                            }, this);
                            return [2 /*return*/];
                    }
                });
            });
        };
        DuelLineupTeamView.prototype.onClick_btnDrop = function () {
            return __awaiter(this, void 0, void 0, function () {
                var duel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnDrop)];
                        case 1:
                            _a.sent();
                            duel = Singleton.Get(DuelManager).getDuels();
                            if (duel.checkTeamEmpty(this.team_id)) {
                                return [2 /*return*/];
                            }
                            Singleton.Get(DuelManager).reqTeamDrop(this.team_id, function () {
                                Singleton.Get(LayerManager).getView(ui.DuelLineupView).refresh();
                            }, this);
                            return [2 /*return*/];
                    }
                });
            });
        };
        DuelLineupTeamView.prototype.onClick_btnRoles = function (e) {
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.DuelSelectHeroView).open();
            layer.getView(ui.DuelSelectHeroView).initView(this.team_id, e.itemIndex + 1);
        };
        return DuelLineupTeamView;
    }(eui.ItemRenderer));
    ui.DuelLineupTeamView = DuelLineupTeamView;
    __reflect(DuelLineupTeamView.prototype, "ui.DuelLineupTeamView");
})(ui || (ui = {}));
//# sourceMappingURL=DuelLineupTeamView.js.map