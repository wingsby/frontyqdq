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
var BagOperManager = (function () {
    function BagOperManager() {
    }
    /**
     * 请求使用选择礼包
     * @param item_id
     * @param sel_id
     * @param callback
     * @param thisObj
     */
    BagOperManager.prototype.reqUseGiftSwitch = function (item_id, sel_id, callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.item_id = item_id;
        send_msg.body.role_equip.sel_id = sel_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_BAG_GIFT_USE_SWITCH, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                var rec = rec_msg.body.role_equip;
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec.r_gold, rec.r_diamond, rec.r_items);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求使用普通礼包
     * @param item_id
     * @param count
     * @param callback
     * @param thisObj
     */
    BagOperManager.prototype.reqUseGiftNormal = function (item_id, count, callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.item_id = item_id;
        send_msg.body.role_equip.count = count;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_BAG_GIFT_USE_NORMAL, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                var rec = rec_msg.body.role_equip;
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec.r_gold, rec.r_diamond, rec.r_items);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求使用随机礼包
     * @param item_id
     * @param count
     * @param callback
     * @param thisObj
     */
    BagOperManager.prototype.reqUseGiftRandom = function (item_id, count, callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.item_id = item_id;
        send_msg.body.role_equip.count = count;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_BAG_GIFT_USE_RANDOM, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                var rec = rec_msg.body.role_equip;
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec.r_gold, rec.r_diamond, rec.r_items);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求进行一次道具合成
     * @param comp_id
     * @param count
     */
    BagOperManager.prototype.reqComposeItem = function (comp_id, count) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.role_equip = new msg.RoleEquipMsg();
                        send.body.role_equip.comp_id = comp_id;
                        send.body.role_equip.count = count;
                        return [4 /*yield*/, HttpAsync.req(NetConst.EQUIP_BAG_ITEM_COMPOSE, true, send)];
                    case 1:
                        rec = _a.sent();
                        return [4 /*yield*/, HttpAsync.assert(rec, "role_equip")];
                    case 2:
                        _a.sent();
                        // Singleton.Get(DialogControler).showAlertRewardByMsg(Template.getGUIText("ui_tower11"), rec.body.reward);
                        Singleton.Get(DialogControler).showFloatRewardByMsg(rec.body.reward);
                        return [2 /*return*/];
                }
            });
        });
    };
    return BagOperManager;
}());
__reflect(BagOperManager.prototype, "BagOperManager");
//# sourceMappingURL=BagOperManager.js.map