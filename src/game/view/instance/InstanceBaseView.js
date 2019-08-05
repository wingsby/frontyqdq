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
    var InstanceBaseView = (function (_super) {
        __extends(InstanceBaseView, _super);
        // region 事件绑定
        /**
         * 构造函数
         */
        function InstanceBaseView() {
            var _this = _super.call(this, "yw.InstanceBaseSkin") || this;
            _this.cur_chapter_idx = 0; // 当前选中的章节id
            _this.cur_instance_idx = 0; // 当前选中的副本id
            _this.cur_ins_type_idx = 0; // 当前选中的关卡类型
            _this.cur_scroll_idx = 0; // 当前展示的挑战券id
            _this.initEvent();
            return _this;
        }
        /**
         * 响应创建子对象
         */
        InstanceBaseView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 相应对象创建完成
         */
        InstanceBaseView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        InstanceBaseView.prototype.onDestroy = function () {
            this.disposeEvent();
        };
        /**
         * 帧更新
         * @param time
         */
        InstanceBaseView.prototype.onUpdate = function (time) {
        };
        /**
         * 帧更新
         * @param time
         */
        InstanceBaseView.prototype.update = function (time) {
            this.onRefreshScroll();
        };
        /**
         * 初始化事件
         */
        InstanceBaseView.prototype.initEvent = function () {
            // 基本事件
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            // 一级切页按钮
            this.btnPrincipal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnPrincipal, this);
            this.btnMaterial.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMaterial, this);
            // 回退按钮
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnBackSecondary.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackSecondary, this);
            // 购买挑战券按钮
            this.btnAddScroll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAddScroll, this);
        };
        /**
         * 回收事件
         */
        InstanceBaseView.prototype.disposeEvent = function () {
            // 基本事件
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            // 一级切页按钮
            this.btnPrincipal.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnPrincipal, this);
            this.btnMaterial.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMaterial, this);
            // 回退按钮
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnBackSecondary.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackSecondary, this);
            // 购买挑战券按钮
            this.btnAddScroll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAddScroll, this);
        };
        /**
         * 响应添加到舞台
         * @param e
         */
        InstanceBaseView.prototype.onAddToStage = function (e) {
            this.initGuiText();
            Singleton.Get(RegisterUpdate).register(this);
        };
        /**
         * 响应从舞台删除
         * @param e
         */
        InstanceBaseView.prototype.onRemoveFromStage = function (e) {
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        /**
         * 初始化UI文字
         * TODO 加到字典表
         */
        InstanceBaseView.prototype.initGuiText = function () {
            this.btnMaterial.text = Template.getGUIText("ui_pve_43");
            this.btnPrincipal.text = Template.getGUIText("ui_pve_42");
            this.labTextScrollRecovery.text = "下一张挑战券回复：";
        };
        /**
         * 打开界面
         */
        InstanceBaseView.prototype.open = function (type) {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            layerManager.getView(ui.MainView).showSchoolSubPanel();
            layerManager.getView(ui.SchoolView).close();
            this.openSeniorMenu(type);
            Common.playStackAni(this.btnBack, [this.btnPrincipal, this.btnMaterial]);
        };
        /**
         * 打开主线副本
         */
        InstanceBaseView.prototype.openWithPrincipal = function () {
            //this.open(InstanceType.Principal);
        };
        /**
         * 打开材料副本
         */
        InstanceBaseView.prototype.openWithMaterial = function () {
            this.open(InstanceType.Material);
        };
        /**
         * 关闭界面
         */
        InstanceBaseView.prototype.close = function () {
            // 关闭当前界面
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            this.hideAllSubPanel();
        };
        /**
         * 刷新界面
         */
        InstanceBaseView.prototype.refresh = function () {
            // TODO
        };
        // endregion
        // region 切页按钮切换
        /**
         * 打开一级菜单
         */
        InstanceBaseView.prototype.openSeniorMenu = function (type) {
            this.groupBtnSenior.visible = true;
            this.groupBtnSecondary.visible = false;
            this.groupScroll.visible = false;
            // TODO 优化逻辑
            if (type == undefined) {
                if (this.cur_ins_type_idx == 0) {
                    this.hideAllbutMeSenior(this.btnPrincipal);
                    this.openPrincipalPanel();
                }
                else {
                    if (this.cur_ins_type_idx == InstanceType.Material) {
                        this.hideAllbutMeSenior(this.btnMaterial);
                        this.openMaterialPanel();
                    }
                    else {
                        this.hideAllbutMeSenior(this.btnPrincipal);
                        this.openPrincipalPanel();
                    }
                }
            }
            else {
                if (type == InstanceType.Material) {
                    this.hideAllbutMeSenior(this.btnMaterial);
                    this.openMaterialPanel();
                }
                else {
                    this.hideAllbutMeSenior(this.btnPrincipal);
                    this.openPrincipalPanel();
                }
            }
        };
        /**
         * 打开二级菜单
         */
        InstanceBaseView.prototype.openSecondaryMenu = function () {
            this.groupBtnSenior.visible = false;
            this.groupBtnSecondary.visible = true;
            this.groupScroll.visible = true;
        };
        // endregion
        // region 显示数据
        /**
         * 设定章节名
         * @param text
         */
        InstanceBaseView.prototype.setChapterName = function (text) {
            this.labChapterName.text = text;
        };
        // endregion
        // region 切换
        /**
         * 打开主线副本面板
         */
        InstanceBaseView.prototype.openPrincipalPanel = function () {
            //this.cur_ins_type_idx = InstanceType.Principal;
            Singleton.Get(LayerManager).getView(ui.InstanceChapterView).open(this.cur_ins_type_idx);
        };
        /**
         * 打开材料副本面板
         */
        InstanceBaseView.prototype.openMaterialPanel = function () {
            this.cur_ins_type_idx = InstanceType.Material;
            Singleton.Get(LayerManager).getView(ui.InstanceChapterView).open(this.cur_ins_type_idx);
        };
        /**
         * 关闭副本章节面板
         */
        InstanceBaseView.prototype.closeChapterPanel = function () {
            Singleton.Get(LayerManager).getView(ui.InstanceChapterView).close();
        };
        /**
         * 关闭副本列表面板
         */
        InstanceBaseView.prototype.closeListPanel = function () {
            Singleton.Get(LayerManager).getView(ui.InstanceListView).close();
        };
        /**
         * 关闭所有
         * @param me
         */
        InstanceBaseView.prototype.hideAllbutMeSenior = function (me) {
            // 隐藏所有子界面
            this.hideAllSubPanel();
            // 设定切页按钮状态
            this.btnPrincipal.active = me == this.btnPrincipal;
            this.btnMaterial.active = me == this.btnMaterial;
        };
        /**
         * 打开副本章节
         * @param chapter_id
         */
        InstanceBaseView.prototype.openChapter = function (chapter_id) {
            // 设定副本章节名称
            var chapter_info = Template.fbtype.get(chapter_id);
            if (chapter_info == null) {
                egret.error("no FbTypeId: " + chapter_id);
            }
            this.setChapterName(Template.getGUIText(chapter_info.Name));
            // 打开副本章节
            this.cur_chapter_idx = chapter_id;
            this.setScroll();
            this.openSecondaryMenu();
            Singleton.Get(LayerManager).getView(ui.InstanceListView).open(chapter_id);
            this.closeChapterPanel();
        };
        /**
         * 从副本页面返回
         */
        InstanceBaseView.prototype.returnChapter = function () {
            this.openSeniorMenu();
            Singleton.Get(LayerManager).getView(ui.InstanceChapterView).open(this.cur_ins_type_idx);
            this.closeListPanel();
        };
        /**
         * 隐藏所有子界面
         */
        InstanceBaseView.prototype.hideAllSubPanel = function () {
            var layer = Singleton.Get(LayerManager);
            // 关闭章节列表
            layer.getView(ui.InstanceChapterView).close();
            // 关闭副本列表
            layer.getView(ui.InstanceListView).close();
        };
        /**
         * 战斗开始时打开战斗界面
         */
        InstanceBaseView.prototype.onBattleBegin = function (instance_id) {
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.MainView).hide();
            layer.getView(ui.MainView).showBattlePanel();
            layer.getView(ui.BattleView).showInstanceMode();
            layer.getView(ui.InstanceBattleView).open(instance_id);
            Singleton.Get(PveManager).cleanRewardHash();
            this.close();
        };
        /**
         * 战斗结束后打开界面
         */
        InstanceBaseView.prototype.onBattleEnd = function () {
            Singleton.Get(LayerManager).getView(ui.InstanceBattleView).close();
            Singleton.Get(LayerManager).getView(ui.MainView).show();
            Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnCastle(null);
            this.open();
            this.hideAllbutMeSenior(this.btnPrincipal);
            this.openChapter(this.cur_chapter_idx);
        };
        // endregion
        // region 响应按钮点击
        /**
         * 响应点击主线副本按钮
         * @param e
         */
        InstanceBaseView.prototype.onClick_btnPrincipal = function (e) {
            this.hideAllbutMeSenior(this.btnPrincipal);
            this.openPrincipalPanel();
        };
        /**
         * 响应点击材料副本按钮
         * @param e
         */
        InstanceBaseView.prototype.onClick_btnMaterial = function (e) {
            this.hideAllbutMeSenior(this.btnMaterial);
            this.openMaterialPanel();
        };
        /**
         * 响应点击主界面回退按钮
         * @param e
         */
        InstanceBaseView.prototype.onClick_btnBack = function (e) {
            Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
            this.close();
        };
        /**
         * 响应点击内页回退按钮
         * @param e
         */
        InstanceBaseView.prototype.onClick_btnBackSecondary = function (e) {
            this.returnChapter();
        };
        /**
         * 响应点击购买挑战券按钮
         * @param e
         */
        InstanceBaseView.prototype.onClick_btnAddScroll = function (e) {
            // 获取VIP信息
            var my_vip_lv = Singleton.Get(PlayerInfoManager).getVipLevel();
            var vip_info = Template.vip.get(my_vip_lv);
            if (vip_info == null) {
                egret.error("no vipId: " + my_vip_lv);
            }
            // 获取挑战券信息
            var scroll_id = this.cur_scroll_idx;
            var scroll_info = Template.scroll.get(scroll_id);
            if (scroll_info == null) {
                egret.error("no scrollId: " + scroll_id);
                return;
            }
            // 获取玩家挑战券信息
            var my_scroll_base_info = Singleton.Get(ScrollManager).getScroll(scroll_id);
            var price = Singleton.Get(ScrollManager).getScrollPrice(scroll_id);
            var buy_cnt = my_scroll_base_info == null ? 0 : my_scroll_base_info.buy_cnt;
            var surplus_chance = Template.scroll.get(scroll_id).BuyTime[my_vip_lv] - buy_cnt;
            // 判断挑战券购买次数
            if (surplus_chance <= 0) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_161"));
                return;
            }
            // 弹窗确认
            Singleton.Get(DialogControler).showBuy(UtilsGame.stringHander(Template.getGUIText("ui_pve_30"), price, scroll_info.ASpurchase, Template.getGUIText(scroll_info.Name), my_vip_lv, surplus_chance), "", price, DEFINE.UI_ALERT_INFO.diamond, function () {
                Singleton.Get(ScrollManager).reqBuy(scroll_id);
            }, this);
        };
        // endregion
        // region 挑战券相关内容
        /**
         * 设定挑战券
         * @param scroll_id
         */
        InstanceBaseView.prototype.setScroll = function () {
            var scroll_id = 0;
            var chapter_id = this.cur_chapter_idx;
            var chapter_info = Template.fbtype.get(chapter_id);
            if (chapter_info == null) {
                egret.error("no FbtypeId: " + chapter_id);
                return;
            }
            this.cur_scroll_idx = chapter_info.Consume;
            // 显示挑战券图标
            var scroll_info = Template.scroll.get(this.cur_scroll_idx);
            ResManager.AsyncSetTexture(this.imgScrollIcon, scroll_info.Icon + "_png");
        };
        /**
         * 刷新挑战券信息
         */
        InstanceBaseView.prototype.onRefreshScroll = function () {
            var scroll_id = this.cur_scroll_idx;
            if (scroll_id > 0) {
                var my_scroll = Singleton.Get(ScrollManager).getScrollActual(scroll_id);
                var scroll_info = Template.scroll.get(scroll_id);
                this.labScrollCount.text = my_scroll[0].toString() + "/" + scroll_info.UpperL.toString();
                this.labScrollRecovery.text = UtilsGame.timeToString(my_scroll[1]);
            }
        };
        // endregion
        // region 外部获取数据接口
        InstanceBaseView.prototype.getCurInstanceType = function () {
            return this.cur_ins_type_idx;
        };
        InstanceBaseView.prototype.getCurChapterId = function () {
            return this.cur_chapter_idx;
        };
        return InstanceBaseView;
    }(BaseUI));
    ui.InstanceBaseView = InstanceBaseView;
    __reflect(InstanceBaseView.prototype, "ui.InstanceBaseView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=InstanceBaseView.js.map