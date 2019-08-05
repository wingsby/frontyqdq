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
    var ChatItemRenderer = (function (_super) {
        __extends(ChatItemRenderer, _super);
        function ChatItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ChatItemRenderer";
            return _this;
        }
        ChatItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.img_head_l.addEventListener(egret.TouchEvent.TOUCH_TAP, this.headHander, this);
            this.img_head_l.mask = this.headMask_l;
            this.img_head_r.mask = this.headMask_r;
        };
        ChatItemRenderer.prototype.headHander = function (e) {
        };
        ChatItemRenderer.prototype.dataChanged = function () {
            var _this = this;
            this.chat = this.data;
            if (this.chat.sender && this.chat.sender.uid == Singleton.Get(LoginManager).uid) {
                this.g_left.visible = false;
                this.g_right.visible = true;
                this.img_head_r.texture = undefined;
                ResManager.asyncsetHeadImg(this.chat.sender.uImg, this.img_head_r, this);
                this.setContent(this.lb_content_r, 0x058902);
                this.setUserName(this.lb_name_r);
                this.setVip(this.labVipLevel_r, this.groupVip_r, this.groupAvatar_r);
                this.playAni(this.groupAvatar_r, this.groupVip_r, this.groupCnt_r);
            }
            else {
                this.g_left.visible = true;
                this.g_right.visible = false;
                if (this.chat.sender) {
                    this.img_head_l.texture = undefined;
                    ResManager.asyncsetHeadImg(this.chat.sender.uImg, this.img_head_l, this, function (res, resName) {
                        if (resName == _this.chat.sender.uImg) {
                            _this.img_head_l.texture = res;
                        }
                        else {
                            _this.img_head_l.texture = undefined;
                        }
                    });
                    this.setContent(this.lb_content_l, 0x5e3a17);
                    this.setUserName(this.lb_name_l);
                    this.setVip(this.labVipLevel_l, this.groupVip_l, this.groupAvatar_l);
                }
                else {
                    this.lb_name_l.text = "";
                    this.lb_content_l.text = "";
                }
                this.playAni(this.groupAvatar_l, this.groupVip_l, this.groupCnt_l);
            }
        };
        ChatItemRenderer.prototype.setContent = function (content, color) {
            try {
                content.textFlow = (new egret.HtmlTextParser).parser(this.chat.context);
            }
            catch (e) {
                content.textFlow = (new egret.HtmlTextParser).parser("");
                console.log(e);
            }
            content.textColor = color;
        };
        ChatItemRenderer.prototype.setUserName = function (useName) {
            useName.textFlow = (new egret.HtmlTextParser).parser("<font color='#ffffff'>" + this.chat.sender.nickname + (this.chat.channel == E_ChatChannel.ALL ? "<font color='#F2D03F'>(S" + this.chat.sender.zid + ")</font></font>" : ""));
        };
        ChatItemRenderer.prototype.setVip = function (vip, gvip, groupAvatar) {
            if (this.chat.sender.vip && this.chat.sender.vip > 0) {
                vip.text = this.chat.sender.vip.toString();
                gvip.visible = true;
                groupAvatar.y = 0;
            }
            else {
                gvip.visible = false;
                groupAvatar.y = 12;
            }
        };
        ChatItemRenderer.prototype.playAni = function (groupAvatar, groupVip, groupCnt) {
            /**
            groupAvatar.scaleX = 0;
            groupAvatar.scaleY = 0;
            groupVip.alpha = 0;
            groupCnt.scaleX = 0;
            groupCnt.scaleY = 0;
            const tw_avatar = egret.Tween.get(groupAvatar);
            tw_avatar.to({ scaleX: 1, scaleY: 1 }, 120, egret.Ease.sineOut).call(() => {
                groupVip.alpha = 1;
                UtilsEffect.buttonEffect(groupVip);

                const tw_cnt = egret.Tween.get(groupCnt);
                tw_cnt.to({ scaleX: 1, scaleY: 1 }, 160, egret.Ease.sineOut);
            }, this);
             */
        };
        return ChatItemRenderer;
    }(eui.ItemRenderer));
    ui.ChatItemRenderer = ChatItemRenderer;
    __reflect(ChatItemRenderer.prototype, "ui.ChatItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=ChatItemRenderer.js.map