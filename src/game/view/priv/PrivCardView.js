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
    var PrivCardView = (function (_super) {
        __extends(PrivCardView, _super);
        function PrivCardView() {
            return _super.call(this, "") || this;
        }
        PrivCardView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            Singleton.Get(RegisterUpdate).register(this);
            this.m_card_type = E_PRIV_CARD_TYPE.MONTH;
        };
        PrivCardView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        PrivCardView.prototype.refresh = function () {
            this.initView();
        };
        PrivCardView.prototype.update = function (time) {
            switch (this.m_card_type) {
                case E_PRIV_CARD_TYPE.MONTH:
                    this.updateMonthView();
                    break;
                case E_PRIV_CARD_TYPE.LIFETIME:
                    this.updateLifetimeView();
                    break;
            }
        };
        PrivCardView.prototype.componentCreated = function () {
        };
        PrivCardView.prototype.onDestroy = function () {
        };
        PrivCardView.prototype.onUpdate = function (time) {
        };
        PrivCardView.prototype.switchType = function (type) {
            this.m_card_type = type;
            this.initView();
        };
        PrivCardView.prototype.initView = function () {
            switch (this.m_card_type) {
                case E_PRIV_CARD_TYPE.MONTH:
                    this.initMonthView();
                    break;
                case E_PRIV_CARD_TYPE.LIFETIME:
                    this.initLifetimeView();
                    break;
            }
        };
        PrivCardView.prototype.initMonthView = function () {
        };
        PrivCardView.prototype.initLifetimeView = function () {
        };
        PrivCardView.prototype.updateMonthView = function () {
        };
        PrivCardView.prototype.updateLifetimeView = function () {
        };
        PrivCardView.prototype.onClick_btnMonth = function () {
            this.switchType(E_PRIV_CARD_TYPE.MONTH);
        };
        PrivCardView.prototype.onClick_btnLifetime = function () {
            this.switchType(E_PRIV_CARD_TYPE.LIFETIME);
        };
        return PrivCardView;
    }(PopupUI));
    ui.PrivCardView = PrivCardView;
    __reflect(PrivCardView.prototype, "ui.PrivCardView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=PrivCardView.js.map