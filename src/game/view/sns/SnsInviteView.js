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
    var SnsInviteView = (function (_super) {
        __extends(SnsInviteView, _super);
        function SnsInviteView() {
            var _this = _super.call(this, "yw.SnsInviteSkin") || this;
            _this.m_is_invite = false;
            _this.m_last_tick = 0;
            _this.m_entities = new eui.ArrayCollection();
            _this.dgItems.dataProvider = _this.m_entities;
            _this.dgItems.itemRenderer = ui.SnsInviteItemView;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        SnsInviteView.prototype.componentCreated = function () { };
        ;
        SnsInviteView.prototype.onDestroy = function () { };
        ;
        SnsInviteView.prototype.onUpdate = function (time) { };
        ;
        SnsInviteView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            Singleton.Get(RegisterUpdate).register(this);
            this.m_is_invite = false;
            this.refresh();
        };
        SnsInviteView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        SnsInviteView.prototype.refresh = function () {
            this.tabInvitee.visible = false;
            this.initTabs();
            this.initView();
            this.initShare();
            this.initShareCountdown();
        };
        SnsInviteView.prototype.update = function () {
            if (UtilsGame.Now() - this.m_last_tick > 1000) {
                this.initShareCountdown();
            }
        };
        SnsInviteView.prototype.onAddToStage = function () {
            this.labTitle.text = Template.getGUIText("ui_invite1");
            // this.tabTask.text = Template.getGUIText("ui_invite2");
            this.tabTask.text = Template.getGUIText("ui_ex_sns_1");
            this.tabShare.text = Template.getGUIText("ui_ex_sns_2");
            this.tabInvitee.text = Template.getGUIText("ui_invite3");
            this.btnTcInvite.text = Template.getGUIText("ui_invite4");
            this.labTcRewardText.text = Template.getGUIText("ui_invite5");
            this.labDes.text = Template.getGUIText("ui_invite6") + "\r\n" + Template.getGUIText("ui_invite7");
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnTcInvite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTcInvite, this);
            this.tabTask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabTask, this);
            this.tabShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabShare, this);
        };
        SnsInviteView.prototype.onRemoveFromStage = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnTcInvite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTcInvite, this);
            this.tabTask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabTask, this);
            this.tabShare.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tabShare, this);
        };
        SnsInviteView.prototype.onClick_btnClose = function () {
            this.close();
        };
        // region 每日分享
        SnsInviteView.prototype.initTabs = function () {
            this.tabTask.active = !this.m_is_invite;
            this.tabShare.active = this.m_is_invite;
            this.tabInvitee.active = false;
            this.currentState = this.m_is_invite ? SnsInviteView.STATUS_INVITE : SnsInviteView.STATUS_SHARE;
            switch (Singleton.Get(login.LoginDataManager).loginData.pid) {
                case I_Platform.p_wanba:
                case I_Platform.p_xjh5:
                    this.tabShare.visible = true;
                    break;
                default:
                    this.tabTask.active = false; // 只有一个切页 默认不显示激活状态
                    this.tabShare.visible = false;
                    break;
            }
        };
        SnsInviteView.prototype.initShare = function () {
            var inf_ivt = Singleton.Get(SnsInviteManager).getInfo();
            var share_cnt = inf_ivt.share_cnt;
            this.labTcDiamond.text = UtilsGame.numberToString(Template.config.InviteReward);
            this.labTcTitle.text = Template.getGUIText("ui_invite8") + share_cnt + "/" + Template.config.InviteNum;
        };
        SnsInviteView.prototype.initShareCountdown = function () {
            var inf_ivt = Singleton.Get(SnsInviteManager).getInfo();
            var cd = inf_ivt.getShareCD();
            var times = inf_ivt.getLastShareToday();
            if (times <= 0) {
                this.setCountdownStyle(true);
                this.labTcCountdown.text = Template.getGUIText("ui_invite9");
            }
            else {
                if (cd > 0) {
                    this.setCountdownStyle(true);
                    this.labTcCountdown.text = UtilsGame.timeToString(Singleton.Get(SnsInviteManager).getInfo().getShareCD());
                }
                else {
                    this.setCountdownStyle(false);
                    this.labTcCountdown.text = "";
                }
            }
        };
        SnsInviteView.prototype.onClick_btnTcInvite = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnTcInvite)];
                        case 1:
                            _a.sent();
                            Singleton.Get(PlatformSDK).inviteFun(function () {
                                _this.refresh();
                            }, this);
                            return [2 /*return*/];
                    }
                });
            });
        };
        SnsInviteView.prototype.onClick_tabTask = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.tabEffectAsync(this.tabTask)];
                        case 1:
                            _a.sent();
                            this.m_is_invite = false;
                            this.refresh();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SnsInviteView.prototype.onClick_tabShare = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.tabEffectAsync(this.tabShare)];
                        case 1:
                            _a.sent();
                            this.m_is_invite = true;
                            this.refresh();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SnsInviteView.prototype.setCountdownStyle = function (show) {
            if (show) {
                this.labTcTitle.y = 16;
                this.labTcRewardText.y = 40;
                this.labTcJewel.y = 37;
                this.labTcDiamond.y = 40;
                this.labTcCountdown.y = 66;
                this.labTcCountdown.visible = true;
            }
            else {
                this.labTcTitle.y = 28;
                this.labTcRewardText.y = 59;
                this.labTcJewel.y = 56;
                this.labTcDiamond.y = 59;
                this.labTcCountdown.visible = false;
            }
        };
        // endregion
        SnsInviteView.prototype.initView = function () {
            var ivts = Template.invite.values;
            var source = [];
            for (var i = 0; i < ivts.length; i++) {
                source.push({
                    id: ivts[i].ID
                });
            }
            this.m_entities.source = source;
        };
        return SnsInviteView;
    }(PopupUI));
    SnsInviteView.STATUS_SHARE = "share";
    SnsInviteView.STATUS_INVITE = "invite";
    ui.SnsInviteView = SnsInviteView;
    __reflect(SnsInviteView.prototype, "ui.SnsInviteView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=SnsInviteView.js.map