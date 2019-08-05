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
    var RoleGetTenView = (function (_super) {
        __extends(RoleGetTenView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleGetTenView() {
            var _this = _super.call(this, "yw.RoleGetTenSkin") || this;
            _this.touchEnabled = true;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleGetTenView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleGetTenView.prototype.onDestroy = function () {
        };
        /**
         * 帧更新
         * @param time
         */
        RoleGetTenView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleGetTenView.prototype.init = function () {
            this.btn_close.text = Template.getGUIText("info1");
            this.btn_again.text = Template.getGUIText("ui_card3");
            this.item_list.itemRenderer = ui.ItemBtnWithNameView;
            this.item_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_preview, this);
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn_Again, this);
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleGetTenView.prototype.open = function (types, ids, counts, rare, d_type) {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.draw_type = d_type;
            this.initRoleInfo(types, ids, counts, rare);
        };
        /**
         * 关闭本界面
         */
        RoleGetTenView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
        };
        // endregion
        // region 填充数据
        RoleGetTenView.prototype.initRoleInfo = function (types, ids, counts, rare) {
            var player = Singleton.Get(RoleManager);
            var data = [];
            this.item_list.dataProvider = new eui.ArrayCollection(data);
            //乱序
            var objs = [];
            for (var i = 0; i < ids.length; ++i) {
                objs.push({ t: types[i], i: ids[i], c: counts[i], r: rare[i] });
            }
            objs.sort(function (a, b) { return Math.random() > 0.5 ? 1 : -1; });
            types = [];
            ids = [];
            counts = [];
            rare = [];
            for (var i = 0; i < objs.length; ++i) {
                types.push(objs[i].t);
                ids.push(objs[i].i);
                counts.push(objs[i].c);
                rare.push(objs[i].r);
            }
            for (var i = 0; i < ids.length; ++i) {
                if (types[i] == DrawCardMsgType.Role || types[i] == DrawCardMsgType.RoleFrag) {
                    ui.ItemBtnWithNameView.fillRole(ids[i], data, rare[i] > 0, DEFINE.EFF_ITEM_FRAME_TOP, DEFINE.EFF_ITEM_FRAME_BOTTOM, i);
                }
                else if (types[i] == DrawCardMsgType.Item) {
                    var i_cfg = Template.item.get(ids[i]);
                    var eff = null;
                    if (i_cfg == null)
                        console.log("No Item id " + ids[i]);
                    // 只有4星以上斗士碎片显示边框特效
                    if (i_cfg.iType == ItemType.RoleFragment) {
                        if (i_cfg.iStar >= 4) {
                            eff = DEFINE.EFF_ITEM_FRAME_TOP;
                        }
                        if (i_cfg.iStar >= 6) {
                            eff = Common.getItemEffName(6);
                        }
                    }
                    ui.ItemBtnWithNameView.fillItem(ids[i], counts[i], data, eff, i);
                }
            }
            this.refreshAgain();
            this.initEffect();
        };
        /**
         * 初始化特效
         */
        RoleGetTenView.prototype.initEffect = function () {
            /*this.mcEffect1.clearMovieClip();
            this.mcEffect1.setMovieClip("effect_card2");
            this.mcEffect1.gotoAndPlay("effect_card2", -1);

            this.mcEffect0.clearMovieClip();
            this.mcEffect0.setMovieClip("effect_card1");
            this.mcEffect0.gotoAndPlay("effect_card1", 1);*/
        };
        RoleGetTenView.prototype.onClick_preview = function (e) {
            if (e.item.arg_is_role)
                Singleton.Get(LayerManager).getView(ui.RoleDetailView).open(e.item.arg_id);
        };
        RoleGetTenView.prototype.refreshAgain = function () {
            switch (this.draw_type) {
                case DrawCardType.Item:
                    {
                        var current_has = Singleton.Get(BagManager).getItemCount(Template.config.CardItem[0]);
                        var one_cost = Template.config.CardItem[1];
                        var ten_cost = one_cost * 10;
                        var item = Template.item.get(Template.config.CardItem[0]);
                        this.btn_again.cost = UtilsGame.numberToString(current_has) + "/" + UtilsGame.numberToString(ten_cost);
                        this.btn_again.enough = current_has >= ten_cost;
                        this.btn_again.icon = item.iIcon;
                    }
                    break;
                case DrawCardType.Dmd:
                    {
                        var current_has = Singleton.Get(PlayerInfoManager).getDiamond();
                        var ten_cost = Template.config.CardDiamondsTen;
                        this.btn_again.cost = UtilsGame.numberToString(ten_cost);
                        this.btn_again.enough = current_has >= ten_cost;
                        this.btn_again.icon = DEFINE.UI_ALERT_INFO.diamond.res;
                        var ten_item = Template.config.CardTenItem;
                        var cfg_ten_item = Template.item.get(ten_item);
                        if (!cfg_ten_item) {
                            console.error("no ten item: " + ten_item);
                        }
                        var cnt_ten_item = Singleton.Get(BagManager).getItemCount(ten_item);
                        if (cnt_ten_item > 0) {
                            this.btn_again.cost = UtilsGame.numberToString(cnt_ten_item) + "/" + 1;
                            this.btn_again.enough = true;
                            this.btn_again.icon = cfg_ten_item.iIcon;
                        }
                        else {
                            this.btn_again.cost = UtilsGame.numberToString(ten_cost);
                            this.btn_again.enough = current_has >= ten_cost;
                            this.btn_again.icon = DEFINE.UI_ALERT_INFO.diamond.res;
                        }
                    }
                    break;
                case DrawCardType.Lmt:
                    {
                        var current_has = Singleton.Get(PlayerInfoManager).getDiamond();
                        var ten_cost = Template.config.CardLimitedTen;
                        this.btn_again.cost = UtilsGame.numberToString(ten_cost);
                        this.btn_again.enough = current_has >= ten_cost;
                        this.btn_again.icon = DEFINE.UI_ALERT_INFO.diamond.res;
                    }
                    break;
            }
        };
        RoleGetTenView.prototype.onBtn_Again = function () {
            this.close();
            switch (this.draw_type) {
                case DrawCardType.Item:
                    Singleton.Get(DrawCardManager).onReqItemTen();
                    break;
                case DrawCardType.Dmd:
                    Singleton.Get(DrawCardManager).onReqDmdTen();
                    break;
                case DrawCardType.Lmt:
                    Singleton.Get(DrawCardManager).onReqLmtTen();
                    break;
            }
        };
        return RoleGetTenView;
    }(PopupUI));
    ui.RoleGetTenView = RoleGetTenView;
    __reflect(RoleGetTenView.prototype, "ui.RoleGetTenView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleGetTenView.js.map