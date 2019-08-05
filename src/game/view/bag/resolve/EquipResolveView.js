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
    var EquipResolveView = (function (_super) {
        __extends(EquipResolveView, _super);
        function EquipResolveView() {
            var _this = _super.call(this, "yw.EquipResolveSkin") || this;
            _this.m_arr_mc = [];
            _this.m_fx_name = "ui_ten1";
            _this.groupEffects.visible = false;
            _this.m_arr_mc = [_this.mc1, _this.mc2, _this.mc3, _this.mc4, _this.mc5, _this.mc6, _this.mc7, _this.mc8, _this.mc9, _this.mc10, _this.mc11, _this.mc12];
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        EquipResolveView.prototype.componentCreated = function () {
        };
        EquipResolveView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        EquipResolveView.prototype.onUpdate = function (time) {
        };
        EquipResolveView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.initView();
        };
        EquipResolveView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            Singleton.Get(BagManager).m_resolve_equips = [];
        };
        EquipResolveView.prototype.onAddToStage = function (e) {
            this.labTxtShop.text = Template.getGUIText("ui_shop23");
            this.labTxtResolve.text = Template.getGUIText("ui_fenjie1");
            this.labTxtAuto.text = Template.getGUIText("ui_fenjie2");
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnShop, this);
            this.btnAuto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAuto, this);
            this.btnResolve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnResolve, this);
            this.m_arr_equips = new eui.ArrayCollection();
            this.dgEquips.dataProvider = this.m_arr_equips;
            this.dgEquips.itemRenderer = ui.EquipResolveItemView;
        };
        EquipResolveView.prototype.onRemoveFromStage = function (e) {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnClose, this);
            this.btnShop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnShop, this);
            this.btnAuto.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAuto, this);
            this.btnResolve.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnResolve, this);
        };
        EquipResolveView.prototype.refresh = function () {
            this.initView();
        };
        EquipResolveView.prototype.initView = function () {
            // 设定锻造石数量、名称和icon
            var mat_id = Template.config.ResolveItem;
            this.labMat.text = UtilsGame.numberToString(Singleton.Get(BagManager).getItemCount(mat_id));
            this.labTxtMat.text = Template.getGUIText(Template.item.get(mat_id).iName);
            ResManager.AsyncSetTexture(this.imgIconMat, Template.item.get(mat_id).iIcon);
            var resolve_list = Singleton.Get(BagManager).m_resolve_equips;
            var once_count = DEFINE.EQUIP_RESOLVE_MAX_ONCE;
            var arr = [];
            for (var i = 0; i < once_count; i++) {
                arr.push({
                    idx: i,
                    bag_equip_idx: (resolve_list.length > i) ? resolve_list[i] : -1,
                });
            }
            this.m_arr_equips.source = arr;
        };
        EquipResolveView.prototype.onClick_btnClose = function (e) {
            this.close();
        };
        EquipResolveView.prototype.onClick_btnShop = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnShop);
            this.close();
            Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnCastle(null);
            var es = Template.shop.get(Template.config.EquipShop);
            Singleton.Get(LayerManager).getView(ui.ShopListView).open(es, false, function () {
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnBag(null);
                _this.open();
            }, this);
        };
        EquipResolveView.prototype.onClick_btnAuto = function (e) {
            UtilsEffect.buttonEffect(this.btnAuto);
            var bag_mgr = Singleton.Get(BagManager);
            bag_mgr.m_resolve_equips = bag_mgr.getEquipResolvableOnekey();
            this.refresh();
            if (bag_mgr.checkResolveListEmpty()) {
                Singleton.Get(DialogControler).showInfo(1143);
            }
        };
        EquipResolveView.prototype.onClick_btnResolve = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnResolve);
            var bag_mgr = Singleton.Get(BagManager);
            if (bag_mgr.checkResolveListWarn()) {
                Singleton.Get(DialogControler).showInfo(1144, this, function () {
                    _this.execResolve();
                }, function () {
                    // 取消分解
                });
                return;
            }
            this.execResolve();
        };
        EquipResolveView.prototype.execResolve = function () {
            var _this = this;
            var bag_mgr = Singleton.Get(BagManager);
            var resolve_equips = bag_mgr.getEquipIdsByEqBagIds(bag_mgr.m_resolve_equips);
            var resolve_count = resolve_equips.length;
            Singleton.Get(EquipManager).onReqResolve(resolve_equips, function () {
                // 播放特效
                _this.playEffects(resolve_count, function () {
                    _this.initView();
                }, _this);
            }, this);
        };
        EquipResolveView.prototype.playEffects = function (num, callback, thisObj) {
            var _this = this;
            var tw = egret.Tween.get(this.labTitle);
            tw.call(function () {
                _this.groupEffects.visible = true;
                for (var i = 0; i < _this.m_arr_mc.length; i++) {
                    var mc = _this.m_arr_mc[i];
                    if (i < num) {
                        mc.visible = true;
                        mc.clearMovieClip();
                        mc.setMovieClip(_this.m_fx_name);
                        mc.gotoAndPlay(_this.m_fx_name, 1);
                    }
                    else {
                        mc.visible = false;
                    }
                }
            }, this).wait(83).call(function () {
                if (callback != null) {
                    callback.call(thisObj);
                }
            }, this).wait(664).call(function () {
                _this.groupEffects.visible = false;
            });
        };
        return EquipResolveView;
    }(PopupUI));
    ui.EquipResolveView = EquipResolveView;
    __reflect(EquipResolveView.prototype, "ui.EquipResolveView");
})(ui || (ui = {}));
//# sourceMappingURL=EquipResolveView.js.map