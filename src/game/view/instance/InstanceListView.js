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
    var InstanceListView = (function (_super) {
        __extends(InstanceListView, _super);
        // region 事件绑定
        /**
         * 构造函数
         */
        function InstanceListView() {
            var _this = _super.call(this, "yw.InstanceListSkin") || this;
            _this.initEvent();
            return _this;
        }
        /**
         * 响应创建子对象
         */
        InstanceListView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 相应对象创建完成
         */
        InstanceListView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        InstanceListView.prototype.onDestroy = function () {
            this.disposeEvent();
        };
        /**
         * 帧更新
         * @param time
         */
        InstanceListView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化事件
         */
        InstanceListView.prototype.initEvent = function () {
            // 基本事件
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            // 列表初始化
            this.listList.itemRenderer = ui.InstanceListItemView;
        };
        /**
         * 回收事件
         */
        InstanceListView.prototype.disposeEvent = function () {
            // 基本事件
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        InstanceListView.prototype.onAddToStage = function (e) {
            this.initGuiText();
        };
        /**
         * 响应从舞台删除
         * @param e
         */
        InstanceListView.prototype.onRemoveFromStage = function (e) {
        };
        /**
         * 初始化UI文字
         * TODO 加到字典表
         */
        InstanceListView.prototype.initGuiText = function () {
        };
        /**
         * 打开界面
         */
        InstanceListView.prototype.open = function (chapter_id) {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            this.initList(chapter_id);
        };
        /**
         * 关闭界面
         */
        InstanceListView.prototype.close = function () {
            // 关闭当前界面
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**
         * 刷新界面
         */
        InstanceListView.prototype.refresh = function () {
            if (Singleton.Get(LayerManager).isViewOnStage(this)) {
                this.initList(Singleton.Get(LayerManager).getView(ui.InstanceBaseView).getCurChapterId());
            }
        };
        // endregion
        // region 显示数据
        InstanceListView.prototype.initList = function (chapter_id) {
            // 初始化数据源
            var ds_list_instance = [];
            this.listList.dataProvider = new eui.ArrayCollection(ds_list_instance);
            // 读取章节信息
            var chapter_info = Template.fbtype.get(chapter_id);
            if (chapter_info == null) {
                egret.error("no fbtypeId: " + chapter_id);
                return;
            }
            // 读取首关信息
            var cur_instance_id = chapter_info.Fbinitial;
            while (cur_instance_id > 0) {
                var instance_info = Template.instance.get(cur_instance_id);
                if (instance_info == null) {
                    egret.error("no instanceId: " + cur_instance_id);
                }
                ds_list_instance.push({
                    instanceId: cur_instance_id
                });
                cur_instance_id = instance_info.LowLevel;
            }
        };
        return InstanceListView;
    }(BaseUI));
    ui.InstanceListView = InstanceListView;
    __reflect(InstanceListView.prototype, "ui.InstanceListView");
})(ui || (ui = {}));
//# sourceMappingURL=InstanceListView.js.map