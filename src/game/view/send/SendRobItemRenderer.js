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
    var SendRobItemRenderer = (function (_super) {
        __extends(SendRobItemRenderer, _super);
        function SendRobItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.SendRobItemRenderer";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        SendRobItemRenderer.prototype.onAddToStage = function () {
            this.labTxtDouble.text = Template.getGUIText("ui_send11");
            this.labTxtFighting.text = Template.getGUIText("append_118");
            this.labTxtRob.text = Template.getGUIText("ui_send2");
            this.m_star_entries = new eui.ArrayCollection();
            this.dgStars.itemRenderer = ui.SendStarItemRenderer;
            this.dgStars.dataProvider = this.m_star_entries;
            this.m_reward_entries = new eui.ArrayCollection();
            this.dgRewards.itemRenderer = ui.CommonItemRenderer;
            this.dgRewards.dataProvider = this.m_reward_entries;
            this.btnRob.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRob, this);
        };
        SendRobItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnRob.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRob, this);
        };
        SendRobItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var info = Singleton.Get(SendManager).getInfo();
            var inf_quest = info.getQuest(this.data.quest_id);
            if (!inf_quest) {
                console.error("no inf quest: " + this.data.quest_id);
                return;
            }
            var inf_team;
            if (this.data.rob_type == E_SEND_ROB_TYPE.REVENGE) {
                inf_team = info.getRevTeam(this.data.rob_team_id);
            }
            else {
                inf_team = info.getRobTeam(this.data.rob_team_id);
            }
            if (!inf_team) {
                console.error("no team: " + this.data.rob_team_id + ", type: " + this.data.rob_type);
                return;
            }
            // 玩家信息
            this.labPlayerName.text = inf_team.username + " (S" + inf_team.zid + ")";
            this.labFighting.text = "" + inf_team.fighting;
            this.imgAvatar.texture = null;
            ResManager.setAvatarCrossServer(inf_team.uid, inf_team.zid, this.imgAvatar, this);
            this.groupVip.visible = inf_team.vip > 0;
            this.labVipLv.text = "" + inf_team.vip;
            // 任务信息
            var cfg_send = Template.send.get(inf_team.quest.send_id);
            if (!cfg_send) {
                console.log("no send: " + inf_team.quest.send_id);
                return;
            }
            // 设定任务星级
            var source_stars = [];
            for (var i = 0; i < cfg_send.Quality; i++) {
                source_stars.push(0);
            }
            this.m_star_entries.source = source_stars;
            // 设定任务奖励            
            var source_rewards = [];
            var cfg_max_reward = 2; // 最多显示2个道具
            var rate = inf_team.quest.type == E_SEND_RUN_TYPE.EXTREME ? 2 : 1;
            for (var i = 0; i < cfg_send.Item.length; i++) {
                if (source_rewards.length >= cfg_max_reward) {
                    break;
                }
                if (cfg_send.RobItem[i] > 0) {
                    source_rewards.push({
                        item_id: cfg_send.Item[i],
                        count: cfg_send.RobItem[i] * rate,
                        size: ui.E_COMMON_ITEM_RENDERER_SIZE.LEFT_M
                    });
                }
            }
            if (source_rewards.length < cfg_max_reward) {
                if (cfg_send.Jewel[1] > 0) {
                    source_rewards.push({
                        item_id: -1,
                        count: cfg_send.Jewel[1] * rate,
                        size: ui.E_COMMON_ITEM_RENDERER_SIZE.LEFT_M
                    });
                }
            }
            if (source_rewards.length < cfg_max_reward) {
                if (cfg_send.Gold[1] > 0) {
                    source_rewards.push({
                        item_id: -2,
                        count: cfg_send.Gold[1] * rate,
                        size: ui.E_COMMON_ITEM_RENDERER_SIZE.LEFT_M
                    });
                }
            }
            if (source_rewards.length < cfg_max_reward) {
                if (cfg_send.Exp[1] > 0) {
                    source_rewards.push({
                        item_id: -3,
                        count: cfg_send.Exp[1] * rate,
                        size: ui.E_COMMON_ITEM_RENDERER_SIZE.LEFT_M
                    });
                }
            }
            this.m_reward_entries.source = source_rewards;
            this.groupDouble.visible = inf_team.quest.type == E_SEND_RUN_TYPE.EXTREME;
        };
        SendRobItemRenderer.prototype.onClick_btnRob = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffect(this.btnRob)];
                        case 1:
                            _a.sent();
                            Singleton.Get(battle.BattleStateMachine).change(battle.E_BATTLE_TYPE.SEND_ROB, battle.E_BATTLE_BEHAVIOR.POSITIVE, function () { }, this, this.data.quest_id, this.data.rob_team_id, this.data.rob_type);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return SendRobItemRenderer;
    }(eui.ItemRenderer));
    ui.SendRobItemRenderer = SendRobItemRenderer;
    __reflect(SendRobItemRenderer.prototype, "ui.SendRobItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=SendRobItemRenderer.js.map