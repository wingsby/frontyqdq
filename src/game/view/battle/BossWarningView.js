var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 警告界面
 */
var ui;
(function (ui) {
    var BossWarningView = (function (_super) {
        __extends(BossWarningView, _super);
        function BossWarningView() {
            var _this = _super.call(this) || this;
            _this.topScroll = [];
            _this.bottomScroll = [];
            _this.textureW = 490;
            _this.defY = 300;
            _this.height = 800;
            _this.width = 480;
            // this.initView();
            ResManager.getResAsync("warning_png", _this.initView, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        BossWarningView.prototype.initView = function (res) {
            var mask = new egret.Shape();
            mask.graphics.beginFill(0x000000, 0.4);
            mask.graphics.drawRect(0, 0, 480, 800);
            mask.graphics.endFill();
            this.addChild(mask);
            // 创建滚动图片
            var bitMap;
            for (var i = 0; i < 2; ++i) {
                bitMap = createBitMap();
                bitMap.y = this.defY;
                bitMap.x = i * this.textureW;
                this.addChild(bitMap);
                this.topScroll.push(bitMap);
                bitMap = createBitMap();
                bitMap.x = i * this.textureW;
                bitMap.y = this.height - bitMap.height - this.defY;
                this.addChild(bitMap);
                this.bottomScroll.push(bitMap);
            }
            function createBitMap() {
                var bitMap = new egret.Bitmap();
                bitMap.texture = res;
                bitMap.fillMode = egret.BitmapFillMode.REPEAT;
                bitMap.width = this.textureW;
                return bitMap;
            }
            // 绘制矩形框
            var rec = new egret.Shape();
            rec.graphics.lineStyle(3, 0xff0000, 1);
            rec.graphics.lineTo(0, 0);
            rec.graphics.lineTo(460, 0);
            rec.graphics.lineTo(460, 65);
            rec.graphics.lineTo(0, 65);
            rec.graphics.lineTo(0, 0);
            rec.graphics.endFill();
            rec.anchorOffsetX = rec.width / 2;
            rec.anchorOffsetY = rec.height / 2;
            rec.x = this.width / 2;
            rec.y = this.height / 2;
            this.addChild(rec);
            this.rec = rec;
            // 创建文本
            var text = new egret.TextField();
            text.text = "BOSS出现";
            text.fontFamily = DEFINE.UI_FONT_FAMILY;
            text.textColor = 0xff0000;
            text.bold = true;
            text.size = 60;
            text.width = rec.width;
            text.height = rec.height;
            text.textAlign = egret.HorizontalAlign.CENTER;
            text.verticalAlign = egret.VerticalAlign.MIDDLE;
            text.anchorOffsetX = text.width / 2;
            text.anchorOffsetY = text.height / 2;
            text.x = rec.x;
            text.y = rec.y;
            this.addChild(text);
            this.lbText = text;
            egret.Tween.get(text, { loop: true }).to({ scaleX: 0.8, scaleY: 0.8, alpha: 0.6 }, 900).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 900);
            //重置size（绘图显示异常，强制刷新，待续....）
            for (var i = 0; i < 2; i++) {
                var img = this.topScroll[i];
                img.width = this.textureW;
                img = this.bottomScroll[i];
                img.width = this.textureW;
            }
        };
        BossWarningView.prototype.setText = function (str) {
            this.lbText.text = str;
        };
        BossWarningView.prototype.onAddToStage = function () {
            Singleton.Get(RegisterUpdate).register(this);
        };
        BossWarningView.prototype.onRemoveFromStage = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        BossWarningView.prototype.update = function () {
            if (this.topScroll.length < 2)
                return;
            for (var i = 0; i < 2; i++) {
                var img = this.topScroll[i];
                img.x += 2;
                if (img.x >= this.textureW) {
                    img.x = img.x - this.textureW * 2;
                }
                img = this.bottomScroll[i];
                img.x -= 4;
                if (img.x <= -this.textureW) {
                    img.x = img.x + this.textureW * 2;
                }
            }
        };
        return BossWarningView;
    }(egret.Sprite));
    ui.BossWarningView = BossWarningView;
    __reflect(BossWarningView.prototype, "ui.BossWarningView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=BossWarningView.js.map