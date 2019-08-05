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
    var SendLogView = (function (_super) {
        __extends(SendLogView, _super);
        function SendLogView() {
            return _super.call(this, "yw.SendLogSkin") || this;
        }
        SendLogView.prototype.componentCreated = function () {
            this.m_entries = new eui.ArrayCollection();
            this.dgItems.itemRenderer = ui.SendLogItemRenderer;
            this.dgItems.dataProvider = this.m_entries;
        };
        ;
        SendLogView.prototype.onDestroy = function () { };
        ;
        SendLogView.prototype.onUpdate = function () { };
        ;
        SendLogView.prototype.open = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.refresh();
        };
        SendLogView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        SendLogView.prototype.refresh = function () {
            this.initView();
        };
        SendLogView.prototype.onAddToStage = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        SendLogView.prototype.onRemoveFromStage = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        SendLogView.prototype.initView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var logs, source, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Singleton.Get(SendManager).reqLogList()];
                        case 1:
                            _a.sent();
                            logs = Singleton.Get(SendManager).getInfo().rob_logs;
                            source = [];
                            for (i = 0; i < logs.length; i++) {
                                source.push({
                                    log_id: i
                                });
                            }
                            this.m_entries.source = source;
                            this.checkEmpty();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SendLogView.prototype.onClick_btnClose = function () {
            this.close();
        };
        SendLogView.prototype.checkEmpty = function () {
            if (this.m_entries.source.length <= 0) {
                this.compEmpty.visible = true;
                this.compEmpty.text = Template.getGUIText("ui_send47");
                this.compEmpty.playAni();
            }
            else {
                this.compEmpty.visible = false;
            }
        };
        return SendLogView;
    }(PopupUI));
    ui.SendLogView = SendLogView;
    __reflect(SendLogView.prototype, "ui.SendLogView");
})(ui || (ui = {}));
//# sourceMappingURL=SendLogView.js.map