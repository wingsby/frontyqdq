var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 剧情资源加载器
 */
var DramaResLoader = (function () {
    function DramaResLoader() {
        this.m_progress_base = 0;
        this.m_progress_actor = 0;
        this.m_base_ok = false;
        this.m_actor_ok = false;
        // endregion
    }
    /**
     * 响应加载
     */
    DramaResLoader.prototype.init = function (cb, cbt) {
        this.m_cb = cb;
        this.m_cbt = cbt;
        Singleton.Get(LayerManager).addView(Singleton.Get(LayerManager).getView(ui.LoadingView));
        RESGroupLoad.getInstance().loadGroup("drama_basic", this, this.onLoadComplete, this.onLoadProgress, this.onLoadError);
        RESGroupLoad.getInstance().loadGroupByList("drama_actor", UtilsGame.getDramaActorRes(), this, this.onActorLoadComplete, this.onActorLoadProgress, this.onLoadError);
    };
    /**
     * 响应加载出错
     */
    DramaResLoader.prototype.onLoadError = function () {
        MessageManager.handleDisconnect(5);
        return;
    };
    /**
     * 更新进度条
     */
    DramaResLoader.prototype.updateProgress = function () {
        Singleton.Get(LayerManager).getView(ui.LoadingView).UpdateProgress(this.m_progress_base + this.m_progress_actor, 2);
    };
    /**
     * 响应全部完成
     */
    DramaResLoader.prototype.onAllFinish = function () {
        if (this.m_base_ok && this.m_actor_ok) {
            Singleton.Get(LayerManager).removeView(Singleton.Get(LayerManager).getView(ui.LoadingView));
            if (this.m_cb) {
                this.m_cb.call(this.m_cbt);
            }
        }
    };
    // region 剧情资源
    /**
     * 响应加载进度
     * @param e
     */
    DramaResLoader.prototype.onLoadProgress = function (e) {
        this.m_progress_base = e.itemsLoaded / e.itemsTotal;
        this.updateProgress();
    };
    /**
     * 响应资源加载完成
     * @param e
     */
    DramaResLoader.prototype.onLoadComplete = function (e) {
        this.m_base_ok = true;
        this.onAllFinish();
    };
    // endregion
    // region 剧情角色
    /**
     * 响应加载进度
     * @param e
     */
    DramaResLoader.prototype.onActorLoadProgress = function (e) {
        this.m_progress_actor = e.itemsLoaded / e.itemsTotal;
        this.updateProgress();
    };
    /**
     * 响应资源加载完成
     * @param e
     */
    DramaResLoader.prototype.onActorLoadComplete = function (e) {
        this.m_actor_ok = true;
        this.onAllFinish();
    };
    return DramaResLoader;
}());
__reflect(DramaResLoader.prototype, "DramaResLoader");
//# sourceMappingURL=DramaResLoader.js.map