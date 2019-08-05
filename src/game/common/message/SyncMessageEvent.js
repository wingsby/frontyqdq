var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by user on 2016/11/23.
 */
var msg;
(function (msg) {
    var SyncMessageEvent = (function (_super) {
        __extends(SyncMessageEvent, _super);
        function SyncMessageEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            _this._player_info = null;
            _this._bag = null;
            _this._equip_bag = null;
            _this._roles = null;
            _this._scroll = null;
            _this._instance = null;
            return _this;
        }
        return SyncMessageEvent;
    }(egret.Event));
    SyncMessageEvent.SYNC_MESSAGE = "SYNC_MESSAGE_" + DEFINE_COLOR.TEXT_STROKE;
    msg.SyncMessageEvent = SyncMessageEvent;
    __reflect(SyncMessageEvent.prototype, "msg.SyncMessageEvent");
})(msg || (msg = {}));
//# sourceMappingURL=SyncMessageEvent.js.map