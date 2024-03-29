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
    var MainSubMenuItemRenderer = (function (_super) {
        __extends(MainSubMenuItemRenderer, _super);
        function MainSubMenuItemRenderer() {
            var _this = _super.call(this) || this;
            _this.m_last_tick = 0;
            _this.skinName = "yw.MainSubMenuItemRenderer";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        MainSubMenuItemRenderer.prototype.onAddToStage = function () {
            this.m_last_tick = 0;
            Singleton.Get(RegisterUpdate).register(this);
            this.btnRoot.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRoot, this);
        };
        MainSubMenuItemRenderer.prototype.onRemoveFromStage = function () {
            this.m_last_tick = 0;
            Singleton.Get(RegisterUpdate).unRegister(this);
            this.btnRoot.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRoot, this);
        };
        MainSubMenuItemRenderer.prototype.update = function () {
            var now = UtilsGame.Now();
            if (now - this.m_last_tick < DEFINE.ICON_MAIN_UPDATE_DURATION) {
                return;
            }
            var is_new = false;
            this.m_last_tick = now;
            switch (this.data.type) {
                case ui.E_MAIN_ICON.FOLLOW:
                    break;
                case ui.E_MAIN_ICON.INVITE:
                    break;
                case ui.E_MAIN_ICON.SHORTCUT:
                    is_new = Singleton.Get(login.LoginDataManager).loginData.pid == I_Platform.p_wanba && (Singleton.Get(LoginManager).loginInfo.qq_cut == E_QQCUT.CREATED);
                    break;
                case ui.E_MAIN_ICON.ACT_SEVEN:
                    is_new = Singleton.Get(ActivityManager).getAlarm().isAlarm(E_ACT_DESIGN_TYPE.Seven);
                    break;
            }
            this.imgNew.visible = is_new;
        };
        MainSubMenuItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.m_last_tick = 0;
            this.imgNew.visible = false;
            this.imgIcon.texture = null;
            var ib_id = this.data.type;
            var cfg_ib = Template.iconBtn.get(ib_id);
            if (!cfg_ib) {
                console.error("no ib: " + ib_id);
                return;
            }
            ResManager.setTexture(this.imgIcon, cfg_ib.Icon);
            this.labName.text = Template.getGUIText(cfg_ib.Name);
        };
        MainSubMenuItemRenderer.prototype.onClick_btnRoot = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffect(this.btnRoot)];
                        case 1:
                            _a.sent();
                            switch (this.data.type) {
                                case ui.E_MAIN_ICON.FOLLOW:
                                    Singleton.Get(LayerManager).getView(ui.SnsFollowView).open();
                                    break;
                                case ui.E_MAIN_ICON.INVITE:
                                    Singleton.Get(LayerManager).getView(ui.SnsInviteView).open();
                                    break;
                                case ui.E_MAIN_ICON.SHORTCUT:
                                    Singleton.Get(LayerManager).getView(ui.SnsQQShortcutView).open();
                                    break;
                                case ui.E_MAIN_ICON.ACT_SEVEN:
                                    Singleton.Get(LayerManager).getView(ui.ActSpSevenView).open();
                                    break;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MainSubMenuItemRenderer;
    }(eui.ItemRenderer));
    ui.MainSubMenuItemRenderer = MainSubMenuItemRenderer;
    __reflect(MainSubMenuItemRenderer.prototype, "ui.MainSubMenuItemRenderer", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=MainSubMenuItemRenderer.js.map