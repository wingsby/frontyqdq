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
    /**
     * 活动条目视图
     */
    var ActInnerItemView_Gift = (function (_super) {
        __extends(ActInnerItemView_Gift, _super);
        /**
         * @constructor
         */
        function ActInnerItemView_Gift() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ActInnerItemSkin_Gift";
            // 绑定基本事件
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            // 设定道具列表数据源
            _this.arr_items = new eui.ArrayCollection();
            _this.dgItems.dataProvider = _this.arr_items;
            _this.dgItems.itemRenderer = ui.ActInnerItemItemView;
            // 设定文字
            _this.btnRec.text = "购 买";
            return _this;
        }
        /**
         * 响应添加到舞台
         */
        ActInnerItemView_Gift.prototype.onAddToStage = function () {
            this.btnRec.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRec, this);
        };
        /**
         * 响应从舞台移除
         */
        ActInnerItemView_Gift.prototype.onRemoveFromStage = function () {
            this.btnRec.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRec, this);
        };
        /**
         * 响应数据变更
         */
        ActInnerItemView_Gift.prototype.dataChanged = function () {
            // 数据判空
            if (!this.data) {
                return;
            }
            // 初始化内容
            this.initView();
            // 设定按钮回调
            this.setCallback(this.data.callback, this.data.thisObj);
            // 播放入场动画
            this.playAni();
        };
        /**
         * 初始化界面内容
         */
        ActInnerItemView_Gift.prototype.initView = function () {
            // 设定标题
            this.labTitle.text = this.data.context.title;
            if (this.data.context.title_color) {
                this.labTitle.textColor = this.data.context.title_color;
            }
            else {
                this.labMark.textColor = DEFINE_COLOR.TEXT_WHITE;
            }
            // 设定Mark
            this.labMark.text = this.data.context.mark;
            if (this.data.context.mark_color) {
                this.labMark.textColor = this.data.context.mark_color;
            }
            else {
                this.labMark.textColor = DEFINE_COLOR.TEXT_WHITE;
            }
            if (this.data.context.price_orig) {
                this.currentState = "show_origin";
                this.labOrigCost.text = UtilsGame.numberToString(this.data.context.price_orig);
                ResManager.AsyncSetTexture(this.imgOrigIcon, this.data.context.cost_icon);
            }
            else {
                this.currentState = "no_origin";
            }
            this.btnRec.icon = this.data.context.cost_icon;
            this.btnRec.cost = UtilsGame.numberToString(this.data.context.price);
            this.btnRec.enough = this.data.context.cost_enough;
            // 设定道具
            this.setItem();
            // 设定领取按钮状态
            switch (this.data.status) {
                case E_REWARD_STATUS.AVAILABLE:
                    this.btnRec.visible = true;
                    this.labRecEd.visible = false;
                    break;
                case E_REWARD_STATUS.RECEIVED:
                    this.btnRec.visible = false;
                    this.labRecEd.visible = true;
                    break;
            }
            if (this.data.context.hide_btn) {
                this.btnRec.visible = false;
                this.labRecEd.visible = false;
            }
        };
        ActInnerItemView_Gift.prototype.setItem = function () {
            var items = [];
            // 金币
            if (this.data.gold > 0) {
                items.push({
                    item_id: -1,
                    count: this.data.gold,
                });
            }
            // 钻石
            if (this.data.diamond > 0) {
                items.push({
                    item_id: -2,
                    count: this.data.diamond,
                });
            }
            // 道具
            if (this.data.items && this.data.items.length > 0 && this.data.items[0].item_id > 0) {
                for (var i = 0; i < this.data.items.length; i++) {
                    items.push(this.data.items[i]);
                }
            }
            // 重新生成id
            for (var i = 0; i < items.length; i++) {
                items[i].id = i;
            }
            this.arr_items.source = items;
        };
        /**
         * 设定按钮回调
         */
        ActInnerItemView_Gift.prototype.setCallback = function (callback, thisObj) {
            this.btn_cb = callback;
            this.btn_cbt = thisObj;
        };
        /**
         * 播放入场动画
         */
        ActInnerItemView_Gift.prototype.playAni = function () {
        };
        /**
         * 响应点击领取按钮
         */
        ActInnerItemView_Gift.prototype.onClick_btnRec = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnRec, function () {
                if (_this.btn_cb) {
                    _this.btn_cb.call(_this, _this.data.item_id);
                }
            }, this);
        };
        return ActInnerItemView_Gift;
    }(eui.ItemRenderer));
    ui.ActInnerItemView_Gift = ActInnerItemView_Gift;
    __reflect(ActInnerItemView_Gift.prototype, "ui.ActInnerItemView_Gift");
})(ui || (ui = {}));
//# sourceMappingURL=ActInnerItemView_Gift.js.map