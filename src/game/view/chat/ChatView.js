var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var ChatView = (function (_super) {
        __extends(ChatView, _super);
        function ChatView() {
            var _this = _super.call(this, "yw.ChatSkin") || this;
            // 世界聊天数据
            _this.arry_all = new eui.ArrayCollection();
            // 公会聊天数据
            _this.arry_guild = new eui.ArrayCollection();
            _this.curIndex = 0;
            _this.isOPen = false;
            return _this;
        }
        /**创建界面时执行*/
        ChatView.prototype.componentCreated = function () {
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.btnTap_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHander, this);
            this.btnTap_0.name = "0";
            this.btnTap_0.text = "世界";
            this.btnTap_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHander, this);
            this.btnTap_1.name = "1";
            this.btnTap_1.text = "公会";
            this.btn_send.text = "发送";
            // 暂时隐藏公会频道 modified by WYM 2017/3/2
            // this.btnTap_1.visible = false;
            this.btn_Barrage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBarrage, this);
            this.btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendHander, this);
            this.dg_data_area.dataProvider = this.arry_all;
            this.dg_data_area.itemRenderer = ui.ChatItemRenderer;
            this.scroller_area.viewport = this.dg_data_area;
            this.dg_data_guild.dataProvider = this.arry_guild;
            this.dg_data_guild.itemRenderer = ui.ChatItemRenderer;
            this.scroller_guild.viewport = this.dg_data_guild;
            this.input_msg.maxChars = Singleton.Get(ChatManager).maxChar;
            this.updateTap();
        };
        ChatView.prototype.updateTap = function () {
            if (this.curIndex == 0) {
                this.btnTap_0.isNew = false;
                this.btnTap_0.active = true;
                this.btnTap_1.active = false;
                this.scroller_area.visible = true;
                this.scroller_guild.visible = false;
                this.scrollBottom(this.scroller_area);
            }
            else {
                GuildWarViewHandler.setGuildChatNew(false);
                this.btnTap_1.isNew = false;
                this.btnTap_0.active = false;
                this.btnTap_1.active = true;
                this.scroller_area.visible = false;
                this.scroller_guild.visible = true;
                this.scrollBottom(this.scroller_guild);
            }
        };
        /**
         * 添加信息
         */
        ChatView.prototype.addChat = function (chat) {
            if (!this.isOPen) {
                Singleton.Get(ui.MainView).updateChatHasNew(true);
                if (chat.channel == E_ChatChannel.ALL) {
                    if (this.curIndex != 0) {
                        this.btnTap_0.isNew = true;
                    }
                }
                else if (chat.channel == E_ChatChannel.GUILD) {
                    if (this.curIndex != 1) {
                        this.btnTap_1.isNew = true;
                    }
                    GuildWarViewHandler.setGuildChatNew(true);
                }
            }
            if (chat.channel == E_ChatChannel.AREEA || chat.channel == E_ChatChannel.ALL) {
                this.arry_all.addItem(chat);
                this.checkMaxCount(this.arry_all);
                if (this.checkIsBotton(this.scroller_area))
                    this.scrollBottom(this.scroller_area);
            }
            else if (chat.channel == E_ChatChannel.GUILD) {
                this.arry_guild.addItem(chat);
                this.checkMaxCount(this.arry_guild);
                if (this.checkIsBotton(this.scroller_guild))
                    this.scrollBottom(this.scroller_guild);
            }
        };
        /**检测是否在底部 */
        ChatView.prototype.checkIsBotton = function (scroller) {
            var pos = scroller.viewport.contentHeight - scroller.height;
            var invh = pos - scroller.viewport.scrollV;
            return (invh - 10) < 0;
        };
        /**滚动到底部 */
        ChatView.prototype.scrollBottom = function (scroller) {
            scroller.stopAnimation();
            scroller.viewport.validateNow();
            var pos = scroller.viewport.contentHeight - scroller.height;
            if (pos < 0)
                pos = 0;
            scroller.viewport.scrollV = pos;
        };
        /**检测最大长度 */
        ChatView.prototype.checkMaxCount = function (receive) {
            while (receive.length > Singleton.Get(ChatManager).maxChatCount) {
                receive.removeItemAt(0);
            }
        };
        /**更新弹幕设置 */
        ChatView.prototype.updateBarrage = function (dynamic) {
            if (dynamic === void 0) { dynamic = false; }
            // this.img_select.visible = Singleton.Get(ChatManager).barrage;
            var barrage = Singleton.Get(ChatManager).barrage;
            if (!dynamic) {
                this.groupBarrageSwitch.x = barrage ? 3 : 40;
            }
            else {
                this.groupBarrageSwitch.x = barrage ? 40 : 3;
                var tw = egret.Tween.get(this.groupBarrageSwitch);
                tw.to({ x: 43 - this.groupBarrageSwitch.x }, 300, egret.Ease.sineOut);
            }
        };
        ChatView.prototype.tapHander = function (e) {
            UtilsEffect.tabEffect(e.currentTarget);
            var e_idx = parseInt(e.currentTarget.name);
            if (e_idx != 0) {
                if (!Singleton.Get(GuildManager).getInfo().hasGuild()) {
                    Singleton.Get(DialogControler).showInfo(1136);
                    return;
                }
            }
            this.curIndex = e_idx;
            this.updateTap();
        };
        ChatView.prototype.sendHander = function (e) {
            UtilsEffect.buttonEffect(e.currentTarget);
            var msg = this.input_msg.text.trim();
            if (msg == "") {
                return;
            }
            var chatmanger = Singleton.Get(ChatManager);
            if (egret.getTimer() - chatmanger.lastSendTime < chatmanger.sendInterval) {
                //CD中
                DialogControler.getinstance().showInfo(1135);
                return;
            }
            // 等级限制
            if (!OpenManager.CheckOpenWithInfo(OpenType.Chat)) {
                return;
            }
            //////////////////测试///////////////////////////
            // var chat: ws.ChatMsg = new ws.ChatMsg();
            // chat.context = msg;
            // chat.channel = E_ChatChannel.AREEA;
            // this.addChat(chat);
            // Singleton.Get(ChatAlertManger).addMsg(chat);
            // DialogControler.getinstance().showAlertNotice(msg);
            ///////////////////////正式//////////////////////
            var send = chatmanger.chatSend.getObject();
            send.msgType = E_WsMsg.MESSAGE;
            send.context = msg;
            if (this.curIndex == 0)
                send.channel = E_ChatChannel.ALL;
            else
                send.channel = E_ChatChannel.GUILD;
            WsClient.sendChat(send);
            chatmanger.lastSendTime = egret.getTimer();
            chatmanger.chatSend.recycleObject(send);
            this.input_msg.text = "";
        };
        ChatView.prototype.open = function (channel) {
            this.isOPen = true;
            Singleton.Get(ui.MainView).updateChatHasNew(false);
            Singleton.Get(PopupManager).addPopup(this);
            this.updateBarrage();
            //默认滚动到底部
            this.scrollBottom(this.scroller_area);
            this.scrollBottom(this.scroller_guild);
            switch (channel) {
                case E_ChatChannel.GUILD:
                    this.curIndex = 1;
                    this.updateTap();
                    break;
                default:
                    this.curIndex = 0;
                    this.updateTap();
                    break;
            }
        };
        /**
         * 清理公会聊天
         */
        ChatView.prototype.cleanGuild = function () {
            this.arry_guild.removeAll();
        };
        ChatView.prototype.close = function () {
            Singleton.Get(PopupManager).removePopup(this);
            this.isOPen = false;
        };
        /**销毁界面时执行*/
        ChatView.prototype.onDestroy = function () { };
        /**更新UI */
        ChatView.prototype.onUpdate = function (time) { };
        ChatView.prototype.onClick_btnBarrage = function () {
            Singleton.Get(ChatManager).barrage = !Singleton.Get(ChatManager).barrage;
            this.updateBarrage(true);
        };
        return ChatView;
    }(PopupUI));
    ui.ChatView = ChatView;
    __reflect(ChatView.prototype, "ui.ChatView");
})(ui || (ui = {}));
//# sourceMappingURL=ChatView.js.map