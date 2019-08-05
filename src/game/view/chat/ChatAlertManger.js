var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 聊天弹框管理器
 */
var ChatAlertManger = (function () {
    function ChatAlertManger() {
        /**弹出Y坐标 */
        this.posY_min = 160;
        this.posY_max = 620;
        this.is_up = false; // 是否置顶弹幕
    }
    ChatAlertManger.prototype.initialize = function (root, root_up) {
        this.layer = root;
        this.layer_up = root_up;
        this.labsPool = ObjectPool.getPool(eui.Label);
        this.labs = [];
        this.labs_up = [];
        Singleton.Get(RegisterUpdate).register(this);
    };
    ChatAlertManger.prototype.update = function (time) {
        var fps = 1000 / (time - this._lastTime);
        this._lastTime = time;
        var speedOffset = 60 / fps;
        var labs = this.labs;
        var len = labs.length;
        if (len > 0) {
            for (var i = 0; i < len; ++i) {
                var lab = labs[i];
                if (lab) {
                    lab.x -= 2 * speedOffset;
                    if (lab.x + lab.width < 0) {
                        this.layer.removeChild(lab);
                        labs.splice(i, 1);
                        this.labsPool.recycleObject(lab);
                    }
                }
            }
        }
        var labs_up = this.labs_up;
        var len_up = labs_up.length;
        if (len_up > 0) {
            for (var i_1 = 0; i_1 < len_up; ++i_1) {
                var lab_1 = labs_up[i_1];
                if (lab_1) {
                    lab_1.x -= 2 * speedOffset;
                    if (lab_1.x + lab_1.width < 0) {
                        this.layer_up.removeChild(lab_1);
                        labs_up.splice(i_1, 1);
                        this.labsPool.recycleObject(lab_1);
                    }
                }
            }
        }
    };
    /**
     * 设定是否置顶
     */
    ChatAlertManger.prototype.setIsUp = function (is_up) {
        this.is_up = is_up;
    };
    /**添加弹框信息 */
    ChatAlertManger.prototype.addMsg = function (chat) {
        if (chat != null) {
            var cor = 0;
            if (chat.sender && chat.sender.uid == Singleton.Get(LoginManager).uid) {
                cor = 0x12F618;
            }
            else {
                if (chat.channel == E_ChatChannel.GUILD) {
                    cor = DEFINE_COLOR.TEXT_BLUE;
                }
                else {
                    if (chat.sender.vip > 0) {
                        cor = 0x16E1FF;
                    }
                    else {
                        cor = 0xFFFFFF;
                    }
                }
            }
            this.createAlertMsg(chat.sender.nickname + "：" + chat.context, cor);
        }
    };
    /**字符串弹框 */
    ChatAlertManger.prototype.addString = function (msg) {
        this.createAlertMsg(msg);
    };
    ChatAlertManger.prototype.createAlertMsg = function (msg, color, strokeColor) {
        if (color === void 0) { color = 0xFFFFFF; }
        if (strokeColor === void 0) { strokeColor = 0x000000; }
        var lab = this.labsPool.getObject();
        lab.text = msg;
        lab.textColor = color;
        lab.size = 18;
        lab.bold = true;
        lab.stroke = 2;
        lab.fontFamily = "Microsoft Yahei";
        lab.strokeColor = strokeColor;
        lab.multiline = false;
        lab.y = UtilsGame.getRandomInt(this.posY_min, this.posY_max);
        if (this.is_up) {
            lab.x = this.layer_up.width;
            this.layer_up.addChild(lab);
            this.labs_up.push(lab);
        }
        else {
            lab.x = this.layer.width;
            this.layer.addChild(lab);
            this.labs.push(lab);
        }
    };
    return ChatAlertManger;
}());
__reflect(ChatAlertManger.prototype, "ChatAlertManger", ["IUpdate"]);
//# sourceMappingURL=ChatAlertManger.js.map