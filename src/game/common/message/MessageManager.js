var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 网络管理器
 */
var E_DISCONNECT_TYPE = (function () {
    function E_DISCONNECT_TYPE() {
    }
    return E_DISCONNECT_TYPE;
}());
__reflect(E_DISCONNECT_TYPE.prototype, "E_DISCONNECT_TYPE");
var MessageManager = (function (_super) {
    __extends(MessageManager, _super);
    /**
     * 构造函数
     */
    function MessageManager() {
        return _super.call(this) || this;
    }
    /**
     * 处理特殊消息
     */
    MessageManager.prototype.handlerSpecialMsg = function (rec_msg) {
        // 消息码处理
        var rt = rec_msg.header.rt; // 返回码
        var rt_msg = rec_msg.header.rt_msg; // 通用消息码
        var rt_sub = rec_msg.header.rt_sub; // 子系统消息码
        // console.log("rt: " + rt + ", rt_msg: " + rt_msg + ", rt_sub: " + rt_sub);
        // 整理消息
        var s_player_info = rec_msg.body.sync_player_info; // 玩家信息同步消息
        var s_bag = rec_msg.body.sync_bag; // 背包同步消息
        var s_roles = rec_msg.body.sync_roles; // 斗士信息同步
        // 处理返回码
        if (rt) {
            this.handleRt(rt);
        }
        // 处理通用消息码
        if (rt_msg) {
            Singleton.Get(DialogControler).showInfo(rt_msg);
        }
        // 处理子系统消息码
        if (rt_sub) {
            this.handleRtSub(rt_sub);
        }
        // console.log("++++++++++++++++++");
        // console.log(rec_msg.body);
        // 分发事件
        var evt = new msg.SyncMessageEvent(msg.SyncMessageEvent.SYNC_MESSAGE);
        evt._player_info = rec_msg.body.sync_player_info;
        evt._bag = rec_msg.body.sync_bag;
        evt._equip_bag = rec_msg.body.sync_equip_bag;
        evt._roles = rec_msg.body.sync_roles;
        evt._instance = rec_msg.body.sync_instance;
        evt._scroll = rec_msg.body.sync_scroll;
        this.dispatchEvent(evt);
    };
    /**
     * 处理rt顶级返回码
     * @param rt
     */
    MessageManager.prototype.handleRt = function (rt) {
        if (rt != 0) {
            console.error(UtilsGame.stringHander("Error Code: $1", rt));
            switch (rt) {
                case msg.MsgCode.HTTP_MKEY_ERROR:
                    MessageManager.handleDisconnect(msg.MsgCode.HTTP_MKEY_ERROR);
                case msg.MsgCode.MSG_INCORRECT_PARAM:
                    MessageManager.handleCheat(msg.MsgCode.MSG_INCORRECT_PARAM);
                    break;
                default:
                    break;
            }
        }
    };
    MessageManager.prototype.handleRtSub = function (rt_sub) {
        if (rt_sub <= 0) {
            return;
        }
        switch (rt_sub) {
            case 1168:
                Singleton.Get(DialogControler).showInfo(rt_sub, this, function () {
                    Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBag(undefined);
                    Singleton.Get(LayerManager).getView(ui.EquipResolveView).open();
                });
                break;
            case 1004:
                Singleton.Get(DialogControler).showInfo(rt_sub, this, function () {
                    Singleton.Get(ui.ShopGoldBuyPanelView).open();
                });
                break;
            case 1005:
                Singleton.Get(DialogControler).showInfo(rt_sub, this, function () { Singleton.Get(ui.PayView).open(); }, null);
                break;
            case msg.MsgCode.MSG_INCORRECT_PARAM:
                MessageManager.handleCheat(msg.MsgCode.MSG_INCORRECT_PARAM);
            default:
                Singleton.Get(DialogControler).showInfo(rt_sub);
                break;
        }
    };
    /**
     * 注册同步监听
     */
    MessageManager.registeSync = function (callback, thisObj) {
        Singleton.Get(MessageManager).addEventListener(msg.SyncMessageEvent.SYNC_MESSAGE, callback, thisObj);
    };
    /**
     * 处理掉线
     */
    MessageManager.handleDisconnect = function (id) {
        if (MessageManager.is_disconnect) {
            return;
        }
        MessageManager.is_disconnect = true;
        Singleton.Get(LayerManager).getView(ui.AlertDisconnectView).open(id);
    };
    /**
     * 处理作弊
     */
    MessageManager.handleCheat = function (id) {
        if (MessageManager.is_disconnect) {
            return;
        }
        MessageManager.is_disconnect = true;
        Singleton.Get(LayerManager).getView(ui.AlertDisconnectView).openCheat(id);
    };
    return MessageManager;
}(egret.EventDispatcher));
MessageManager.is_disconnect = false;
__reflect(MessageManager.prototype, "MessageManager");
//# sourceMappingURL=MessageManager.js.map