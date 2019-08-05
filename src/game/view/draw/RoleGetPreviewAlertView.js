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
    var RoleGetPreviewAlertView = (function (_super) {
        __extends(RoleGetPreviewAlertView, _super);
        /**
         * 构造函数
         */
        function RoleGetPreviewAlertView() {
            var _this = _super.call(this, "yw.RoleGetPreviewAlertSkin") || this;
            _this.item_list.itemRenderer = ui.ItemBtnWithNameView;
            _this.initGuiText();
            _this.initEvent();
            return _this;
        }
        /**
         * 相应对象创建完成
         */
        RoleGetPreviewAlertView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleGetPreviewAlertView.prototype.onDestroy = function () {
            // todo this.releaseEvent();
        };
        /**
         * 帧更新
         * @param time
         */
        RoleGetPreviewAlertView.prototype.onUpdate = function (time) {
        };
        /**
         * 打开本界面
         */
        RoleGetPreviewAlertView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(Singleton.Get(LayerManager).getView(ui.RoleGetPreviewAlertView));
            this.initContent();
        };
        /**
         * 关闭本界面
         */
        RoleGetPreviewAlertView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(Singleton.Get(LayerManager).getView(ui.RoleGetPreviewAlertView));
        };
        RoleGetPreviewAlertView.prototype.initGuiText = function () {
            this.labBackupWord0.text = Template.getGUIText(this.labBackupWord0.text);
        };
        RoleGetPreviewAlertView.prototype.initEvent = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        RoleGetPreviewAlertView.prototype.releaseEvent = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
        };
        RoleGetPreviewAlertView.prototype.initContent = function () {
            var card_cfgs = [];
            for (var i_1 = 0; i_1 < Template.card.values.length; ++i_1) {
                var cfg = Template.card.values[i_1];
                if (cfg.CardType == RoleGetPreviewAlertView.PREVIEW_TYPE && cfg.type == CardItemType.Role) {
                    card_cfgs.push(cfg);
                }
                else {
                }
            }
            card_cfgs.sort(this.SortRoleDec);
            var data = [];
            this.item_list.dataProvider = new eui.ArrayCollection(data);
            for (var i = 0; i < card_cfgs.length; ++i) {
                var r_cfg = Template.role.get(card_cfgs[i].CardPet);
                // var is_rare = card_cfgs[i].CardTen > 0;
                // var is_rare = r_cfg.AwakenID >= 20;
                var is_rare = r_cfg.Star >= 3;
                ui.ItemBtnWithNameView.fillRole(card_cfgs[i].CardPet, data, is_rare, is_rare ? DEFINE.EFF_ITEM_FRAME_TOP : undefined, undefined, undefined, true);
            }
        };
        RoleGetPreviewAlertView.prototype.SortRoleDec = function (a, b) {
            if (!a && b) {
                return 1;
            }
            if (a && !b) {
                return -1;
            }
            if (!a && !b) {
                return 0;
            }
            var a_cfg = Template.role.get(a.CardPet);
            var b_cfg = Template.role.get(b.CardPet);
            if (!a_cfg && b_cfg) {
                return 1;
            }
            if (a_cfg && !b_cfg) {
                return -1;
            }
            if (!a_cfg && !b_cfg) {
                return 0;
            }
            if (a_cfg.Star < b_cfg.Star) {
                return 1;
            }
            if (a_cfg.Star > b_cfg.Star) {
                return -1;
            }
            if (a.CardPet < b.CardPet) {
                return -1;
            }
            if (a.CardPet > b.CardPet) {
                return 1;
            }
            return 0;
        };
        RoleGetPreviewAlertView.prototype.onClick_btnClose = function () {
            this.close();
        };
        return RoleGetPreviewAlertView;
    }(PopupUI));
    ui.RoleGetPreviewAlertView = RoleGetPreviewAlertView;
    __reflect(RoleGetPreviewAlertView.prototype, "ui.RoleGetPreviewAlertView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleGetPreviewAlertView.js.map