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
    var SendLogItemRenderer = (function (_super) {
        __extends(SendLogItemRenderer, _super);
        function SendLogItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.SendLogItemRenderer";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        SendLogItemRenderer.prototype.onAddToStage = function () {
            this.btnReplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReplay, this);
        };
        SendLogItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnReplay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReplay, this);
        };
        SendLogItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var log_id = this.data.log_id;
            var inf_log = Singleton.Get(SendManager).getInfo().getRobLog(log_id);
            if (!inf_log) {
                console.error("no inf log: " + log_id);
                return;
            }
            var cfg_send = Template.send.get(inf_log.send_id);
            if (!cfg_send) {
                console.error("no send: " + inf_log.send_id);
                return;
            }
            var is_atk = inf_log.atk_uid == Singleton.Get(LoginManager).loginInfo._id;
            if (is_atk) {
                var is_win = inf_log.result == BattleResult.LEFT_WIN;
                if (is_win) {
                    var temp = Template.getGUIText("ui_send17");
                    this.labTitle.textFlow = new egret.HtmlTextParser().parser("<font color=\"" + DEFINE_COLOR.OK_GREEN + "\">" + Template.getGUIText("ui_send19") + "</font>");
                    this.labDes.textFlow = new egret.HtmlTextParser().parser(UtilsGame.stringHander(temp, inf_log.def_name, inf_log.def_zid, this.genReward(inf_log.send_id, inf_log.type)));
                }
                else {
                    var temp = Template.getGUIText("ui_send18");
                    this.labTitle.textFlow = new egret.HtmlTextParser().parser("<font color=\"" + DEFINE_COLOR.WARN_RED + "\">" + Template.getGUIText("ui_send20") + "</font>");
                    this.labDes.textFlow = new egret.HtmlTextParser().parser(UtilsGame.stringHander(temp, inf_log.def_name, inf_log.def_zid));
                }
            }
            else {
                var is_win = inf_log.result != BattleResult.LEFT_WIN;
                if (is_win) {
                    var temp = Template.getGUIText("ui_send15");
                    this.labTitle.textFlow = new egret.HtmlTextParser().parser("<font color=\"" + DEFINE_COLOR.OK_GREEN + "\">" + Template.getGUIText("ui_send21") + "</font>");
                    this.labDes.textFlow = new egret.HtmlTextParser().parser(UtilsGame.stringHander(temp, inf_log.atk_name, inf_log.atk_zid, cfg_send.Quality, Template.getGUIText(Template.role.get(SendUtil.getValidRoles(inf_log.atk_roles)[0]).Name)));
                }
                else {
                    var temp = Template.getGUIText("ui_send16");
                    this.labTitle.textFlow = new egret.HtmlTextParser().parser("<font color=\"" + DEFINE_COLOR.WARN_RED + "\">" + Template.getGUIText("ui_send22") + "</font>");
                    this.labDes.textFlow = new egret.HtmlTextParser().parser(UtilsGame.stringHander(temp, inf_log.atk_name, inf_log.atk_zid, cfg_send.Quality, Template.getGUIText(Template.role.get(SendUtil.getValidRoles(inf_log.def_roles)[0]).Name), this.genReward(inf_log.send_id, inf_log.type))); // TODO 奖励内容
                }
            }
        };
        SendLogItemRenderer.prototype.genReward = function (send_id, type) {
            var rate = type == E_SEND_RUN_TYPE.EXTREME ? 2 : 1;
            var cfg_send = Template.send.get(send_id);
            if (!cfg_send) {
                console.error("no send: " + send_id);
                return;
            }
            // 设定任务奖励
            var source = [];
            var cfg_max_reward = 2; // 最多显示2个道具
            for (var i = 0; i < cfg_send.Item.length; i++) {
                if (source.length >= cfg_max_reward) {
                    break;
                }
                var cfg_item = Template.item.get(cfg_send.Item[i]);
                if (!cfg_item) {
                    console.error("no item: " + cfg_send.Item[i]);
                    continue;
                }
                if (cfg_send.RobItem[i] > 0) {
                    source.push(Template.getGUIText(cfg_item.iName) + "x" + cfg_send.RobItem[i] * rate);
                }
            }
            // if (source.length < cfg_max_reward) {
            if (cfg_send.Jewel[1] > 0) {
                source.push(DEFINE.UI_ALERT_INFO.diamond.name + "x" + cfg_send.Jewel[1] * rate);
            }
            // }
            // if (source.length < cfg_max_reward) {
            if (cfg_send.Gold[1] > 0) {
                source.push(DEFINE.UI_ALERT_INFO.gold.name + "x" + cfg_send.Gold[1] * rate);
            }
            // }
            // if (source.length < cfg_max_reward) {
            if (cfg_send.Exp[1] > 0) {
                source.push(DEFINE.UI_ALERT_INFO.exp.name + "x" + cfg_send.Exp[1] * rate);
            }
            // }
            var result = "";
            for (var i = 0; i < source.length; i++) {
                result += source[i];
                if (i != source.length - 1) {
                    result += "、";
                }
            }
            return result;
        };
        SendLogItemRenderer.prototype.onClick_btnReplay = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnReplay)];
                        case 1:
                            _a.sent();
                            Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.SEND_LOG, battle.E_BATTLE_BEHAVIOR.POSITIVE, function () { }, this, this.data.log_id);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return SendLogItemRenderer;
    }(eui.ItemRenderer));
    ui.SendLogItemRenderer = SendLogItemRenderer;
    __reflect(SendLogItemRenderer.prototype, "ui.SendLogItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=SendLogItemRenderer.js.map