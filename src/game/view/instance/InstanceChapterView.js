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
    var InstanceChapterView = (function (_super) {
        __extends(InstanceChapterView, _super);
        // region 事件绑定
        /**
         * 构造函数
         */
        function InstanceChapterView() {
            var _this = _super.call(this, "yw.InstanceChapterSkin") || this;
            _this.initEvent();
            return _this;
        }
        /**
         * 响应创建子对象
         */
        InstanceChapterView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 相应对象创建完成
         */
        InstanceChapterView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        InstanceChapterView.prototype.onDestroy = function () {
            this.disposeEvent();
        };
        /**
         * 帧更新
         * @param time
         */
        InstanceChapterView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化事件
         */
        InstanceChapterView.prototype.initEvent = function () {
            // 基本事件
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            // 列表初始化
            this.listChapter.itemRendererSkinName = "yw.InstanceChapterItemSkin";
            this.listChapter.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listChapter, this);
        };
        /**
         * 回收事件
         */
        InstanceChapterView.prototype.disposeEvent = function () {
            // 基本事件
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        InstanceChapterView.prototype.onAddToStage = function (e) {
            this.initGuiText();
        };
        /**
         * 响应从舞台删除
         * @param e
         */
        InstanceChapterView.prototype.onRemoveFromStage = function (e) {
        };
        /**
         * 初始化UI文字
         * TODO 加到字典表
         */
        InstanceChapterView.prototype.initGuiText = function () {
        };
        /**
         * 打开界面
         */
        InstanceChapterView.prototype.open = function (type) {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            this.initChapters(type);
        };
        /**
         * 关闭界面
         */
        InstanceChapterView.prototype.close = function () {
            // 关闭当前界面
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**
         * 刷新界面
         */
        InstanceChapterView.prototype.refresh = function () {
            // TODO
        };
        // endregion
        // region 显示数据
        InstanceChapterView.prototype.initChapters = function (type) {
            // 初始化数据源
            var ds_list_chapters = [];
            this.listChapter.dataProvider = new eui.ArrayCollection(ds_list_chapters);
            var chapters = Template.fbtype;
            chapters.foreachKey(function (chapter_id) {
                // 获取副本章节信息
                var chapter_info = Template.fbtype.get(chapter_id);
                // 只筛选符合类型的章节
                if (chapter_info.Type != type) {
                    return;
                }
                // 计算解锁情况
                var my_team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
                var is_unlocked = my_team_lv >= chapter_info.OpenLv;
                // 获取封面图片
                //let boss_info: Entity.Role = Template.role.get(chapter_info.BossIcon);
                //if(boss_info == null){
                //    egret.error("no roleId: " + chapter_info.BossIcon);
                //    return;
                //}
                ds_list_chapters.push({
                    chapterId: chapter_id,
                    title: Template.getGUIText(chapter_info.Name),
                    //icon: boss_info.Resources[2] + "_png",
                    lockVisible: !is_unlocked,
                    lockDes: UtilsGame.stringHander(Template.getGUIText("append_163"), chapter_info.OpenLv) // TODO 加到字典表
                });
            }, this);
        };
        // endregion
        // region 响应按钮点击
        /**
         * 响应点击副本列表
         * @param e
         */
        InstanceChapterView.prototype.onClick_listChapter = function (e) {
            // TODO 检查玩家当前等级
            // 获取副本章节信息
            var chapter_info = Template.fbtype.get(e.item.chapterId);
            // 计算解锁情况
            var my_team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
            var is_unlocked = my_team_lv >= chapter_info.OpenLv;
            if (!is_unlocked) {
                Singleton.Get(DialogControler).showString(chapter_info.OpenLv + "级解锁");
                return;
            }
            Singleton.Get(ui.InstanceBaseView).openChapter(e.item.chapterId);
        };
        return InstanceChapterView;
    }(BaseUI));
    ui.InstanceChapterView = InstanceChapterView;
    __reflect(InstanceChapterView.prototype, "ui.InstanceChapterView");
})(ui || (ui = {}));
//# sourceMappingURL=InstanceChapterView.js.map