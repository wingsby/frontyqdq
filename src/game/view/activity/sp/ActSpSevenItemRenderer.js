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
    var ActSpSevenItemRenderer = (function (_super) {
        __extends(ActSpSevenItemRenderer, _super);
        function ActSpSevenItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ActSpSevenItemRenderer";
            // 绑定基本事件
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        /**
         * 响应添加到舞台
         */
        ActSpSevenItemRenderer.prototype.onAddToStage = function () {
            // 设定道具列表数据源
            this.arr_items = new eui.ArrayCollection();
            this.dgItems.dataProvider = this.arr_items;
            this.dgItems.itemRenderer = ui.ActSpSevenItemItemRenderer;
            this.btnRec.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRec, this);
        };
        /**
         * 响应从舞台移除
         */
        ActSpSevenItemRenderer.prototype.onRemoveFromStage = function () {
            this.btnRec.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRec, this);
        };
        /**
         * 响应数据变更
         */
        ActSpSevenItemRenderer.prototype.dataChanged = function () {
            // 数据判空
            if (!this.data) {
                return;
            }
            // 初始化内容
            this.initView();
            // 设定按钮回调
            this.setCallback(this.data.callback, this.data.thisObj);
        };
        /**
         * 初始化界面内容
         */
        ActSpSevenItemRenderer.prototype.initView = function () {
            // 设定标题
            this.labTitle.text = this.data.context.title;
            if (this.data.context.title_color) {
                this.labTitle.textColor = this.data.context.title_color;
            }
            else {
            }
            // 设定Mark
            // this.labMark.text = this.data.context.mark;
            // if (this.data.context.mark_color) {
            //     this.labMark.textColor = this.data.context.mark_color;
            // } else {
            //     this.labMark.textColor = DEFINE_COLOR.TEXT_WHITE;
            // }
            // 设定道具
            this.setItem();
            // 设定领取按钮状态
            switch (this.data.status) {
                case E_REWARD_STATUS.AVAILABLE:
                    this.currentState = ActSpSevenItemRenderer.STATUS_AVALIABLE;
                    break;
                case E_REWARD_STATUS.RECEIVED:
                    this.currentState = ActSpSevenItemRenderer.STATUS_RECEIVED;
                    break;
                default:
                    this.currentState = ActSpSevenItemRenderer.STATUS_DISABLE;
                    break;
            }
            // if (this.data.context.hide_btn) {
            //     this.btnRec.visible = false;
            //     this.imgRecEd.visible = false;
            // }
        };
        ActSpSevenItemRenderer.prototype.setItem = function () {
            var items = [];
            // 道具
            if (this.data.items && this.data.items.length > 0 && this.data.items[0].item_id > 0) {
                for (var i = 0; i < this.data.items.length; i++) {
                    items.push(this.data.items[i]);
                }
            }
            // 钻石
            if (this.data.diamond > 0) {
                items.push({
                    item_id: -1,
                    count: this.data.diamond,
                });
            }
            // 金币
            if (this.data.gold > 0) {
                items.push({
                    item_id: -2,
                    count: this.data.gold,
                });
            }
            // 重新生成id
            for (var i = 0; i < items.length; i++) {
                items[i].id = i;
                items[i].size = ui.E_ActSpSevenItemItemRenderer_SIZE.S;
            }
            var first = items.splice(0, 1)[0];
            first.size = ui.E_ActSpSevenItemItemRenderer_SIZE.M;
            this.compItem.data = first;
            this.arr_items.source = items;
        };
        /**
         * 设定按钮回调
         */
        ActSpSevenItemRenderer.prototype.setCallback = function (callback, thisObj) {
            this.btn_cb = callback;
            this.btn_cbt = thisObj;
        };
        /**
         * 响应点击领取按钮
         */
        ActSpSevenItemRenderer.prototype.onClick_btnRec = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnRec, function () {
                if (_this.btn_cb) {
                    _this.btn_cb.call(_this, _this.data.item_id);
                }
            }, this);
        };
        return ActSpSevenItemRenderer;
    }(eui.ItemRenderer));
    ActSpSevenItemRenderer.STATUS_DISABLE = "disable";
    ActSpSevenItemRenderer.STATUS_AVALIABLE = "avaliable";
    ActSpSevenItemRenderer.STATUS_RECEIVED = "received";
    ui.ActSpSevenItemRenderer = ActSpSevenItemRenderer;
    __reflect(ActSpSevenItemRenderer.prototype, "ui.ActSpSevenItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=ActSpSevenItemRenderer.js.map