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
    var GuideView = (function (_super) {
        __extends(GuideView, _super);
        function GuideView() {
            var _this = _super.call(this) || this;
            _this.last_update = 0;
            _this.skinName = "yw.GuideSkin";
            _this.groupTip.visible = false;
            // this.mcHandler.visible = false;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        GuideView.prototype.setTip = function () {
            var guide = Singleton.Get(GuideManager).getGuideInfo();
            var entity = guide.getCurEntity();
            if (entity == undefined) {
                return;
            }
            if (entity.des == "0" || entity.des == "-1") {
                this.labTxtTip.textFlow = new egret.HtmlTextParser().parser("");
            }
            else {
                this.labTxtTip.textFlow = new egret.HtmlTextParser().parser(Template.getGUIText(entity.des));
            }
            var view = GuideUtil.getView(entity.guideID);
            var handler = GuideUtil.getHandler(entity.guideID);
            // 引导对象判空
            if (!view || !handler) {
                console.error("no Guide component");
                this.activateTip(false);
                return;
            }
            view.validateNow();
            handler.validateNow();
            switch (entity.position) {
                case 1:
                    this.groupTip.y = handler.localToGlobal().y - this.groupTip.height - 40;
                    break;
                case 2:
                    this.groupTip.y = handler.localToGlobal().y + handler.height + 40;
                    break;
                default:
                    break;
            }
            switch (entity.effectP) {
                case 1:
                    this.handler.rotation = 180;
                    break;
                default:
                    this.handler.rotation = 0;
                    break;
            }
        };
        GuideView.prototype.activateTip = function (active) {
            var guide = Singleton.Get(GuideManager).getGuideInfo();
            var entity = guide.getCurEntity();
            // console.log("active[" + active + "] " + GuideUtil.getView(entity.guideID));
            if (this.labTxtTip.text == "") {
                this.groupTip.visible = false;
            }
            else {
                this.groupTip.visible = active;
            }
            if (active) {
                this.handler.setVisible(true);
            }
            else {
                this.handler.setVisible(false);
            }
        };
        GuideView.prototype.setMcHandler = function () {
            var guide = Singleton.Get(GuideManager).getGuideInfo();
            var entity = guide.getCurEntity();
            if (entity == undefined) {
                return;
            }
            var view = GuideUtil.getView(entity.guideID);
            var handler = GuideUtil.getHandler(entity.guideID);
            var fx_size = new egret.Point(0, 0);
            var fx_pos = new egret.Point(0, 0);
            view.validateNow();
            handler.validateNow();
            // this.mcHandler.x = handler.localToGlobal().x + (handler.width - fx_size.x) / 2 + entity.xy[0];
            // this.mcHandler.y = handler.localToGlobal().y + (handler.height - fx_size.y) / 2 + entity.xy[1];
            this.handler.x = fx_pos.x + handler.localToGlobal().x + (handler.width - fx_size.x) / 2 + entity.xy[0];
            this.handler.y = fx_pos.y + handler.localToGlobal().y + (handler.height - fx_size.y) / 2 + entity.xy[1];
            // this.handler.rotation = is_rotate ? 180 : 0;
        };
        GuideView.prototype.guideVaildateNow = function () {
            var entity = Singleton.Get(GuideManager).getGuideInfo().getCurEntity();
            if (entity) {
                this.setTip();
                this.setMcHandler();
            }
        };
        GuideView.prototype.setShow = function (is_show) {
            this.visible = is_show;
        };
        GuideView.prototype.update = function (time) {
            if (!this.visible) {
                return;
            }
            this.last_update = UtilsGame.Now();
            this.guideVaildateNow();
        };
        GuideView.prototype.onAddToStage = function () {
            Singleton.Get(RegisterUpdate).register(this);
        };
        GuideView.prototype.onRemoveFromStage = function () {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        return GuideView;
    }(eui.Component));
    ui.GuideView = GuideView;
    __reflect(GuideView.prototype, "ui.GuideView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=GuideView.js.map