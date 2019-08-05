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
    var SnsInviteItemView = (function (_super) {
        __extends(SnsInviteItemView, _super);
        function SnsInviteItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.SnsInviteItemSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        SnsInviteItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.setInfo(this.data.id);
        };
        SnsInviteItemView.prototype.onAddToStage = function () {
            this.btnInvite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnInvite, this);
        };
        SnsInviteItemView.prototype.onRemoveFromStage = function () {
            this.btnInvite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnInvite, this);
        };
        SnsInviteItemView.prototype.setInfo = function (id) {
            var cfg_ivt = Template.invite.get(id);
            if (!cfg_ivt) {
                console.error("no invite cfg: " + id);
                return;
            }
            ResManager.AsyncSetTexture(this.imgIcon, "icon_yjbaoxiang");
            this.labTitle.text = UtilsGame.stringHander(Template.getGUIText("ui_invite10"), cfg_ivt.People);
            this.labDiamond.text = UtilsGame.numberToString(cfg_ivt.Jewel);
            var inf_ivt = Singleton.Get(SnsInviteManager).getInfo();
            var is_rec = inf_ivt.isRewardRec(id);
            var is_enable = inf_ivt.isRewardEnable(id);
            if (is_rec) {
                this.imgRec.visible = true;
                this.btnInvite.visible = false;
            }
            else {
                this.imgRec.visible = false;
                this.btnInvite.visible = true;
                if (is_enable) {
                    this.btnInvite.active = true;
                    this.btnInvite.text = Template.getGUIText("ui_invite11");
                }
                else {
                    this.btnInvite.active = false;
                    this.btnInvite.text = Template.getGUIText("ui_invite12");
                }
            }
        };
        SnsInviteItemView.prototype.onClick_btnInvite = function () {
            Singleton.Get(SnsInviteManager).reqReward(this.data.id, function () {
                Singleton.Get(ui.SnsInviteView).refresh();
            });
        };
        return SnsInviteItemView;
    }(eui.ItemRenderer));
    ui.SnsInviteItemView = SnsInviteItemView;
    __reflect(SnsInviteItemView.prototype, "ui.SnsInviteItemView");
})(ui || (ui = {}));
//# sourceMappingURL=SnsInviteItemView.js.map