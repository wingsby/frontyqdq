var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**启动初始化 */
var FrameInit = (function () {
    function FrameInit() {
        this.isThemeLoadEnd = false;
        this.isPreloadLoadEnd = false;
        this.isTableLoadEnd = false;
        this.isUILoadEnd = false;
        this.TableLoadCurrent = 0;
        this.TableLoadTotal = 0;
        this.UILoadCurrent = 0;
        this.UILoadTotal = 0;
    }
    FrameInit.prototype.registerComplate = function (finishFun, finishObj) {
        this.finishFun = finishFun;
        this.finishObj = finishObj;
    };
    /**
     * 初始化
     * @param main
     */
    FrameInit.prototype.initialize = function (main) {
        this.main = main;
        // 注入自定义的素材解析器
        this.main.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.main.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        // 初始化配置文件
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var ver = this.getVer();
        RES.loadConfig(ver + "resource/default.res.json", ver + "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     */
    FrameInit.prototype.onConfigComplete = function (event) {
        // 移除配置文件监听
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // 加载皮肤主题配置文件
        var ver = this.getVer();
        var theme = new eui.Theme(ver + "resource/default.thm.json", this.main.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        // 加载预载包
        RESGroupLoad.getInstance().loadGroup("preload", this, this.onPreloadLoadComplete, undefined);
    };
    /**
     * 主题文件加载完成
     */
    FrameInit.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.onThemeAndPreloadComplete();
    };
    /**
     * 预载包加载完成
     * @param e
     */
    FrameInit.prototype.onPreloadLoadComplete = function (e) {
        this.isPreloadLoadEnd = true;
        this.onThemeAndPreloadComplete();
    };
    /**
     * 预载内容全部完成
     */
    FrameInit.prototype.onThemeAndPreloadComplete = function () {
        // 只有全部加载完成时才触发
        if (!(this.isThemeLoadEnd && this.isPreloadLoadEnd)) {
            return;
        }
        this.loadingView = new ui.LoadingView();
        this.main.stage.addChild(this.loadingView);
        // 加载预载包
        // RESGroupLoad.getInstance().loadGroup("core", this, null, null);
        RESGroupLoad.getInstance().loadGroup("table", this, this.onTableLoadComplete, this.onTableLoadProgress);
        RESGroupLoad.getInstance().loadGroup("ui_login", this, this.onUILoadComplete, this.onUILoadProgress);
    };
    /**
     * 加载进度
     */
    FrameInit.prototype.onMainResLoadProgress = function (e) {
        if (!this.loadingView) {
            return;
        }
        this.loadingView.UpdateProgress(this.TableLoadCurrent + this.UILoadCurrent, this.TableLoadCurrent + this.UILoadTotal);
    };
    /**
     * Table加载进度
     * @param e
     */
    FrameInit.prototype.onTableLoadProgress = function (e) {
        if (!this.loadingView) {
            return;
        }
        this.TableLoadCurrent = e.itemsLoaded;
        this.TableLoadTotal = e.itemsTotal;
        this.loadingView.UpdateProgress(this.TableLoadCurrent + this.UILoadCurrent, this.TableLoadCurrent + this.UILoadTotal);
    };
    /**
     * UI加载进度
     * @param e
     */
    FrameInit.prototype.onUILoadProgress = function (e) {
        if (!this.loadingView) {
            return;
        }
        this.UILoadCurrent = e.itemsLoaded;
        this.UILoadTotal = e.itemsTotal;
        this.loadingView.UpdateProgress(this.TableLoadCurrent + this.UILoadCurrent, this.TableLoadCurrent + this.UILoadTotal);
    };
    /**
     * 表加载完成
     */
    FrameInit.prototype.onTableLoadComplete = function () {
        this.isTableLoadEnd = true;
        this.onMainResLoadComplate();
    };
    /**
     * UI加载完成
     */
    FrameInit.prototype.onUILoadComplete = function () {
        this.isUILoadEnd = true;
        this.onMainResLoadComplate();
    };
    /**
     * 主资源包加载完成
     */
    FrameInit.prototype.onMainResLoadComplate = function () {
        var _this = this;
        if (this.isUILoadEnd && this.isTableLoadEnd) {
            // 预载iOS音频Hacker
            Singleton.Get(AudioHacker).preloadRes(function () {
                _this.finishFun.call(_this.finishObj);
                _this.main.stage.removeChild(_this.loadingView);
            }, this);
        }
    };
    FrameInit.prototype.getVer = function () {
        var cfg = document.getElementById("v");
        if (cfg) {
            var cfg_data = cfg.getAttribute("data");
            if (cfg_data) {
                return cfg_data;
            }
        }
        return "";
    };
    return FrameInit;
}());
__reflect(FrameInit.prototype, "FrameInit");
//# sourceMappingURL=FrameInit.js.map