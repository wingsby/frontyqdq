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
    var SendSelectHeroItemRenderer = (function (_super) {
        __extends(SendSelectHeroItemRenderer, _super);
        function SendSelectHeroItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.SendSelectHeroItemRenderer";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        SendSelectHeroItemRenderer.prototype.onAddToStage = function () {
            this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
        };
        SendSelectHeroItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnSubmit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
        };
        SendSelectHeroItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            var cfg_role = Template.role.get(this.data.role_id);
            var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(this.data.role_id);
            if (!cfg_role || !inf_role) {
                console.error("no cfg or inf role: " + this.data.role_id);
                return;
            }
            this.imgIcon.texture = null;
            this.imgTama.texture = null;
            this.imgTierBg.texture = null;
            this.imgTierSub.texture = null;
            ResManager.setTexture(this.imgIcon, cfg_role.Icon);
            ResManager.setTexture(this.imgTama, Common.getRoleTamaResEx(inf_role.getAwakenStar(), inf_role.getAwakenActiveStar()));
            ResManager.setTexture(this.imgTierBg, Common.getRoleTierBgResEx(cfg_role.Star));
            ResManager.setTexture(this.imgTierSub, Common.getRoleTierSubResEx(cfg_role.Star));
            this.labLv.text = "" + inf_role.lv;
            this.labName.text = RoleUtil.GetFullRoleName(cfg_role.ID);
            this.labName.textColor = RoleUtil.GetRoleNameColor(cfg_role.Star);
            this.labFight.text = "\u6218\u529B\uFF1A" + inf_role.fighting;
            var inf_quest = Singleton.Get(SendManager).getInfo();
            var quest_id = inf_quest.roleInQuest(cfg_role.ID);
            if (quest_id < 0) {
                this.currentState = SendSelectHeroItemRenderer.STATUS_NORMAL;
                this.btnSubmit.text = "上 阵";
            }
            else {
                this.currentState = SendSelectHeroItemRenderer.STATUS_OCCUPIED;
                var cfg_send = Template.send.get(inf_quest.getQuest(quest_id).send_id);
                this.labOccupied.text = "\u6B63\u5728\u6267\u884C" + cfg_send.Quality + "\u661F\u4EFB\u52A1";
            }
        };
        SendSelectHeroItemRenderer.prototype.onClick_btnSubmit = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffect(this.btnSubmit)];
                        case 1:
                            _a.sent();
                            Singleton.Get(LayerManager).getView(ui.SendSelectHeroView).close();
                            Singleton.Get(LayerManager).getView(ui.SendTeamView).changeRole(this.data.pos, this.data.role_id);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return SendSelectHeroItemRenderer;
    }(eui.ItemRenderer));
    SendSelectHeroItemRenderer.STATUS_NORMAL = "normal";
    SendSelectHeroItemRenderer.STATUS_OCCUPIED = "occupied";
    ui.SendSelectHeroItemRenderer = SendSelectHeroItemRenderer;
    __reflect(SendSelectHeroItemRenderer.prototype, "ui.SendSelectHeroItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=SendSelectHeroItemRenderer.js.map