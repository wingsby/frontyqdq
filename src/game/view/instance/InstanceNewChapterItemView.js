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
    var InstanceNewChapterItemView = (function (_super) {
        __extends(InstanceNewChapterItemView, _super);
        function InstanceNewChapterItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.InstanceNewChapterItemSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        InstanceNewChapterItemView.prototype.onAddToStage = function (e) {
            this.labTxtEnter.text = Template.getGUIText("ui_ex_instance_2");
            this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEnter, this);
            Singleton.Get(RegisterUpdate).register(this);
        };
        InstanceNewChapterItemView.prototype.onRemoveFromStage = function (e) {
            this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEnter, this);
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        InstanceNewChapterItemView.prototype.update = function (time) {
            this.setScroll();
        };
        InstanceNewChapterItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.setData(this.data.id);
            this.playAni(this.data.ani_idx);
        };
        InstanceNewChapterItemView.prototype.setData = function (id) {
            var fb = Template.fbtype.get(id);
            if (!fb) {
                console.error("Can't get fbtype, id: " + id);
                return;
            }
            ResManager.AsyncSetTexture(this.imgBg, fb.BossIcon + "_png");
            var my_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
            var open_lv = fb.OpenLv;
            this.labLock.text = UtilsGame.stringHander(Template.getGUIText("append_163"), open_lv);
            this.groupLock.visible = (my_lv < open_lv);
        };
        InstanceNewChapterItemView.prototype.setScroll = function () {
            var fb = Template.fbtype.get(this.data.id);
            var cfg_scroll = Template.scroll.get(fb.Consume);
            var my_scroll = Singleton.Get(ScrollManager).getScrollActual(fb.Consume);
            this.labScroll.text = Template.getGUIText("ui_pve_46") + my_scroll[0].toString() + "/" + cfg_scroll.UpperL.toString();
            this.labScroll.visible = !this.groupLock.visible;
            // 红点提示
            this.imgNew.visible = Singleton.Get(PlayerInfoManager).getTeamLv() >= fb.OpenLv && my_scroll[0] > 0;
        };
        InstanceNewChapterItemView.prototype.playAni = function (id) {
            /**
            this.alpha = 0;
            const tw: egret.Tween = egret.Tween.get(this);
            tw.wait(80 * id).to({alpha: 1}, 120, egret.Ease.sineOut);
            */
        };
        InstanceNewChapterItemView.prototype.onClick_btnEnter = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnEnter, function () {
                if (Singleton.Get(GuideManager).CouldYouPleaseWaitForMe("InstanceNewChapterView", "listChapter", _this.onClick_btnEnter, _this, e)) {
                    return;
                }
                Singleton.Get(LayerManager).getView(ui.InstanceNewBaseView).openSecondaryMenu();
                Singleton.Get(LayerManager).getView(ui.InstanceNewListView).open(_this.data.id);
            }, this);
        };
        return InstanceNewChapterItemView;
    }(eui.ItemRenderer));
    ui.InstanceNewChapterItemView = InstanceNewChapterItemView;
    __reflect(InstanceNewChapterItemView.prototype, "ui.InstanceNewChapterItemView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=InstanceNewChapterItemView.js.map