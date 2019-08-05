var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 层级管理器
 */
var LayerManager = (function () {
    /**
     * 构造函数
     */
    function LayerManager() {
        // Game 层级
        this.gameLayer = undefined;
        // UI 层级
        this.uiLayer = undefined; // UI Root
        this.chatLayer = undefined; // 聊天弹出层
        this.chatLayer_up = undefined; // 聊天上层弹出层
        this.baseUiLayer = undefined; // UI基础层
        this.popupUiLayer = undefined; // UI弹出层
        this.alertLayer = undefined; // UI弹幕层
        this.topFloatLayer = undefined; // 置顶提示层
        this.guideLayer = undefined; // 新手引导层
        this.guideTempLayer = undefined; // 新手引导临时层
        this.maskLayer = undefined; // 通用顶层黑幕
        // 前置特效层
        this._closeupLayer = undefined;
        this._closeupView = undefined;
        // 弹出层管理器
        this.popup = undefined;
        this.refresh_dict = [];
        this.popup = Singleton.Get(PopupManager);
        this.view_dict = new Dictionary();
        this.view_prams = new Dictionary();
    }
    /**
     * 初始化
     */
    LayerManager.prototype.init = function (main) {
        var that = this;
        that.main = main;
        // 黑色底层
        var rect_bg = new eui.Rect(480, 800, 0x000000);
        rect_bg.top = 0;
        that.main.addChild(rect_bg);
        // 战斗内容层
        that.gameLayer = ObjectPool.getPool(eui.UILayer).getObject();
        that.gameLayer.touchEnabled = false;
        that.gameLayer.name = "gameLayer";
        that.main.addChild(that.gameLayer);
        // UI基础层
        that.uiLayer = ObjectPool.getPool(eui.UILayer).getObject();
        that.uiLayer.touchEnabled = false;
        that.uiLayer.name = "uiLayer";
        that.main.addChild(that.uiLayer);
        // 聊天弹出层
        that.chatLayer = ObjectPool.getPool(eui.UILayer).getObject();
        that.chatLayer.touchEnabled = false;
        that.chatLayer.name = "chatLayer";
        that.uiLayer.addChild(that.chatLayer);
        // UI普通层
        that.baseUiLayer = ObjectPool.getPool(eui.UILayer).getObject();
        that.baseUiLayer.touchEnabled = false;
        that.baseUiLayer.name = "baseUiLayer";
        that.uiLayer.addChild(that.baseUiLayer);
        // 聊天弹出层（上层）
        that.chatLayer_up = ObjectPool.getPool(eui.UILayer).getObject();
        that.chatLayer_up.touchEnabled = false;
        that.chatLayer_up.name = "chatLayer_up";
        that.uiLayer.addChild(that.chatLayer_up);
        Singleton.Get(ChatAlertManger).initialize(that.chatLayer, that.chatLayer_up);
        // 新特写层，要在MainView和BattleView之间
        that._closeupLayer = ObjectPool.getPool(eui.UILayer).getObject();
        that._closeupLayer.name = "_closeupLayer";
        that._closeupLayer.touchEnabled = false;
        that.addView(that._closeupLayer);
        // 置顶提示层
        that.topFloatLayer = that.getView(ui.TopFloatView);
        that.topFloatLayer.touchEnabled = false;
        that.uiLayer.addChild(that.topFloatLayer);
        // UI弹框层
        that.popupUiLayer = ObjectPool.getPool(eui.UILayer).getObject();
        that.popupUiLayer.touchEnabled = false;
        that.popupUiLayer.name = "popupUiLayer";
        that.uiLayer.addChild(that.popupUiLayer);
        that.popup.initialize(that.popupUiLayer);
        // UI弹幕层
        that.alertLayer = ObjectPool.getPool(eui.UILayer).getObject();
        that.alertLayer.name = "alertLayer";
        that.alertLayer.touchEnabled = false;
        that.uiLayer.addChild(that.alertLayer);
        // 新手引导层
        that.guideLayer = that.getView(ui.GuideView);
        that.guideLayer.touchEnabled = false;
        that.uiLayer.addChild(that.guideLayer);
        // UI弹框层
        that.guideTempLayer = ObjectPool.getPool(eui.UILayer).getObject();
        that.guideTempLayer.touchEnabled = false;
        that.guideTempLayer.name = "guideTempLayer";
        that.uiLayer.addChild(that.guideTempLayer);
        // 最上黑幕层
        that.maskLayer = that.getView(ui.CommonMaskView);
    };
    /**
     * 释放资源
     */
    LayerManager.prototype.dispose = function () {
        this.gameLayer = undefined;
        this.uiLayer = undefined;
        this.baseUiLayer = undefined;
        this.popupUiLayer = undefined;
        this.popup = undefined;
        this.alertLayer = undefined;
    };
    /**
     * 外部获取弹框层级管理器
     */
    LayerManager.prototype.getPopup = function () {
        return this.popup;
    };
    LayerManager.prototype.addPopup = function (pui) {
        this.getPopup().addPopup(new pui());
    };
    LayerManager.prototype.removePopup = function (pui) {
        this.getPopup().removePopup(pui);
    };
    /**
     * 外部获取游戏表现层
     */
    LayerManager.prototype.getGameLayer = function () {
        return this.gameLayer;
    };
    /**
     * 设定游戏战斗层显隐
     * @param active
     */
    LayerManager.prototype.setGameLayerActive = function (active) {
        this.gameLayer.visible = active;
    };
    LayerManager.prototype.GetAlertLayer = function () {
        return this.alertLayer;
    };
    LayerManager.prototype.GetCloseUpLayer = function () {
        return this._closeupLayer;
    };
    LayerManager.prototype.GetGuideTempLayer = function () {
        return this.guideTempLayer;
    };
    /**
     * 获取View
     */
    LayerManager.prototype.getView = function (target) {
        return Singleton.Get(target);
    };
    /**
     * 卸载View
     */
    LayerManager.prototype.destoryView = function (target) {
        Singleton.Destroy(target);
    };
    /**
     * 添加基础UI
     */
    LayerManager.prototype.addView = function (view, callback, thisObj) {
        // 注册加入舞台完成的回调 注册回调信息
        if (callback) {
            view.once(egret.Event.ADDED_TO_STAGE, this.onViewAdded, this);
            this.view_prams.update(view, { callback: callback, thisObj: thisObj });
        }
        // 添加到舞台 注册到索引
        this.baseUiLayer.addChild(view);
        this.view_dict.update(view, true);
        // 添加到刷新索引
        if (this.isRefreshable(view)) {
            this.addRefreshable(view);
        }
        // 覆盖式黑幕置顶
        if (Singleton.Exist(ui.CommonMaskView)) {
            var cm_view = Singleton.Get(LayerManager).getView(ui.CommonMaskView);
            if (view != cm_view && this.isViewOnStage(cm_view)) {
                this.swapView(view, cm_view);
            }
        }
        // MainView置顶
        if (Singleton.Exist(ui.MainView)) {
            var main_view = Singleton.Get(LayerManager).getView(ui.MainView);
            if (view != main_view && this.isViewOnStage(main_view)) {
                this.swapView(view, main_view);
            }
            var battle_view = this.getView(ui.BattleView);
            if (view == battle_view) {
                this.swapView(this._closeupLayer, battle_view);
            }
        }
        // 剧情黑幕置顶
        if (Singleton.Exist(ui.DramaDialogView)) {
            var drama_dia_view = Singleton.Get(LayerManager).getView(ui.DramaDialogView);
            if (view != drama_dia_view && this.isViewOnStage(drama_dia_view)) {
                this.swapView(view, drama_dia_view);
            }
        }
        // Loading置顶
        if (Singleton.Exist(ui.LoadingView)) {
            var loading_view = Singleton.Get(LayerManager).getView(ui.LoadingView);
            if (view != loading_view && this.isViewOnStage(loading_view)) {
                this.swapView(view, loading_view);
            }
        }
    };
    /**
     * 响应UI添加完成
     */
    LayerManager.prototype.onViewAdded = function (e) {
        var params = this.view_prams.get(e.currentTarget);
        if (!params) {
            return;
        }
        this.view_prams.remove(e.currentTarget);
        if (params.callback) {
            params.callback.call(params.thisObj);
        }
    };
    /**
     * 添加BaseUI
     * @param view
     */
    LayerManager.prototype.addViewEx = function (view) {
        this.baseUiLayer.addChild(view);
        this.view_dict.update(view, true);
    };
    /**
     * 移除基础UI
     */
    LayerManager.prototype.removeView = function (view) {
        if (this.baseUiLayer.contains(view))
            this.baseUiLayer.removeChild(view);
        this.view_dict.update(view, false);
        // 从刷新索引移除
        if (this.isRefreshable(view)) {
            this.removeRefreshable(view);
        }
    };
    /**
     * 移除基础UI
     */
    LayerManager.prototype.removeViewEx = function (view) {
        this.baseUiLayer.removeChild(view);
        this.view_dict.remove(view);
    };
    /**
     * 交换基础UI位置
     */
    LayerManager.prototype.swapView = function (view1, view2) {
        this.baseUiLayer.swapChildren(view1, view2);
    };
    /**
     * 获取UI是否在舞台上
     */
    LayerManager.prototype.isViewOnStage = function (view) {
        if (!this.view_dict.containsKey(view)) {
            return false;
        }
        return this.view_dict.get(view);
    };
    /**
     * 获取指定UI是否有任意一个在舞台上
     */
    LayerManager.prototype.isAnyViewOnStage = function (views) {
        for (var i = 0; i < views.length; i++) {
            if (this.isViewOnStage(views[i])) {
                return true;
            }
        }
        return false;
    };
    // region 界面刷新
    LayerManager.prototype.isRefreshable = function (view) {
        return view && view.refresh && typeof (view.refresh) === "function";
    };
    LayerManager.prototype.addRefreshable = function (view) {
        if (this.refresh_dict.indexOf(view) < 0) {
            this.refresh_dict.push(view);
        }
    };
    LayerManager.prototype.removeRefreshable = function (view) {
        var idx = this.refresh_dict.indexOf(view);
        if (idx >= 0) {
            this.refresh_dict.splice(idx, 1);
        }
    };
    LayerManager.prototype.refreshAll = function () {
        var refs = this.refresh_dict;
        for (var i = 0; i < refs.length; i++) {
            refs[i].refresh();
        }
    };
    // endregion
    /**
     * 显示技能特写
     */
    LayerManager.prototype.playCloseup = function (skillId, callback, thisObj, params) {
        if (!this._closeupView) {
            this._closeupView = Singleton.Get(LayerManager).getView(ui.CloseupView);
            this._closeupLayer.addChild(this._closeupView);
        }
        if (this._closeupView.visible)
            this._closeupView.play(skillId, callback, thisObj, params);
        else if (callback != undefined) {
            callback.call(thisObj, params);
        }
    };
    /**
     * 预加载界面
     */
    LayerManager.prototype.preloadView = function () {
        this.getView(ui.RoleLineupView).initCards(false);
        this.getView(ui.RoleLineupView).initHeros();
    };
    /**
     * 切换覆盖式黑幕
     */
    LayerManager.prototype.CutCoverMask = function (cb_enter, cb_leave, thisObj) {
        var _this = this;
        this.uiLayer.addChild(this.maskLayer);
        this.maskLayer.cutMask(function () {
            if (cb_enter) {
                cb_enter.call(thisObj);
            }
        }, function () {
            if (cb_leave) {
                cb_leave.call(thisObj);
            }
            _this.uiLayer.removeChild(_this.maskLayer);
        }, this);
    };
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map