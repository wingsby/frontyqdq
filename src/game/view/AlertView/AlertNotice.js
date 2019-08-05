var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 滚屏公告
 */
var AlertNotice = (function (_super) {
    __extends(AlertNotice, _super);
    function AlertNotice() {
        return _super.call(this) || this;
    }
    /**创建背景 */
    AlertNotice.prototype.initialize = function () {
        this.touchEnabled = false;
        this.touchChildren = false;
        this.msgs = [];
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x0, 0.6);
        bg.graphics.drawRect(0, 0, 480, 20);
        bg.graphics.endFill();
        this.addChild(bg);
        this.labMsg = new eui.Label();
        this.labMsg.size = 16;
        this.labMsg.height = 20;
        this.labMsg.stroke = 1;
        this.labMsg.fontFamily = "simhei";
        this.labMsg.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.labMsg);
        // var noticemask: egret.Shape = new egret.Shape();
        // noticemask.graphics.beginFill(0x000000, 1);
        // noticemask.graphics.drawRect(40, 0, 480, 20);
        // noticemask.graphics.endFill();
        // this.addChild(noticemask);
        //this.labMsg.mask = noticemask;
        var img = new eui.Image();
        img.x = 0;
        img.y = -8;
        this.addChild(img);
        ResManager.AsyncSetTexture(img, "gonggao_png");
        this.visible = false;
    };
    AlertNotice.prototype.addNotice = function (notoce) {
        this.msgs.push(notoce);
        this.visible = true;
        Singleton.Get(RegisterUpdate).register(this);
    };
    AlertNotice.prototype.update = function (time) {
        var fps = 1000 / (time - this._lastTime);
        this._lastTime = time;
        var speedOffset = 60 / fps;
        var lab = this.labMsg;
        lab.x -= 1 * speedOffset;
        if (lab.x + lab.width < 0) {
            //超出屏幕
            if (this.msgs.length > 0) {
                this.showMsg(this.msgs.shift());
            }
            else {
                Singleton.Get(RegisterUpdate).unRegister(this);
                this.visible = false;
            }
        }
    };
    AlertNotice.prototype.showMsg = function (msg) {
        this.labMsg.textFlow = (new egret.HtmlTextParser).parser(msg);
        this.labMsg.x = 480;
    };
    return AlertNotice;
}(eui.Component));
__reflect(AlertNotice.prototype, "AlertNotice", ["IUpdate"]);
//# sourceMappingURL=AlertNotice.js.map