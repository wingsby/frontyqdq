var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
var JewelryManager = (function () {
    function JewelryManager() {
    }
    /**
     * 强化饰品
     */
    JewelryManager.prototype.reqStr = function (role_id, pos, callback, thisObj) {
        return __awaiter(this, void 0, void 0, function () {
            var role_mgr, rec_msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        role_mgr = Singleton.Get(RoleManager);
                        role_mgr.engraveRole(role_id);
                        return [4 /*yield*/, HttpAsync.req(NetConst.JEWELRY_STR, true, this.genMsg(role_id, pos))];
                    case 1:
                        rec_msg = _a.sent();
                        this.hanCallback(rec_msg, callback, thisObj);
                        role_mgr.releaseFighting(role_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 一键强化饰品
     */
    JewelryManager.prototype.reqStrAuto = function (role_id, pos, callback, thisObj) {
        return __awaiter(this, void 0, void 0, function () {
            var role_mgr, rec_msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        role_mgr = Singleton.Get(RoleManager);
                        role_mgr.engraveRole(role_id);
                        return [4 /*yield*/, HttpAsync.req(NetConst.JEWELRY_STR_AUTO, true, this.genMsg(role_id, pos))];
                    case 1:
                        rec_msg = _a.sent();
                        this.hanCallback(rec_msg, callback, thisObj);
                        role_mgr.releaseFighting(role_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 提升饰品进阶经验
     */
    JewelryManager.prototype.reqEvo = function (role_id, pos, callback, thisObj) {
        return __awaiter(this, void 0, void 0, function () {
            var role_mgr, rec_msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        role_mgr = Singleton.Get(RoleManager);
                        role_mgr.engraveRole(role_id);
                        return [4 /*yield*/, HttpAsync.req(NetConst.JEWELRY_EVO, true, this.genMsg(role_id, pos))];
                    case 1:
                        rec_msg = _a.sent();
                        this.hanCallback(rec_msg, callback, thisObj);
                        role_mgr.releaseFighting(role_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 饰品进阶一键直升
     */
    JewelryManager.prototype.reqEvoAuto = function (role_id, pos, callback, thisObj) {
        return __awaiter(this, void 0, void 0, function () {
            var role_mgr, rec_msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        role_mgr = Singleton.Get(RoleManager);
                        role_mgr.engraveRole(role_id);
                        return [4 /*yield*/, HttpAsync.req(NetConst.JEWELRY_EVO_AUTO, true, this.genMsg(role_id, pos))];
                    case 1:
                        rec_msg = _a.sent();
                        this.hanCallback(rec_msg, callback, thisObj);
                        role_mgr.releaseFighting(role_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 生成发送的消息
     */
    JewelryManager.prototype.genMsg = function (role_id, pos) {
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        send_msg.body.role_equip.sel_id = RoleUtil.getJewIdxByPos(role_id, pos);
        return send_msg;
    };
    /**
     * 处理收到消息
     */
    JewelryManager.prototype.hanCallback = function (rec_msg, callback, thisObj) {
        var rec = rec_msg.body.role_equip;
        if (rec.success && callback) {
            callback.call(thisObj);
        }
    };
    return JewelryManager;
}());
__reflect(JewelryManager.prototype, "JewelryManager");
//# sourceMappingURL=JewelryManager.js.map