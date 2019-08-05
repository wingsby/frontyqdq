var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 加载进度界面
     * loading process interface
     */
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initVersion();
        this.frameinit = new FrameInit();
        this.frameinit.registerComplate(this.startCreateScene, this);
        this.frameinit.initialize(this);
        // var param: egret.URLVariables = new egret.URLVariables(location.search);
    };
    Main.prototype.initVersion = function () {
        var vc = new RES.VersionController();
        vc.getVirtualUrl = function (url) {
            return url + UtilsGame.getVersionPostfix();
        };
        RES.registerVersionController(vc);
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.startCreateScene = function () {
        // 加载登录
        // Singleton.Get(LoginManager).onGameInit();
        // 加载主管理器
        Singleton.Get(MainManager).init(this);
        this.stage.addEventListener(egret.Event.ACTIVATE, function () {
            // console.log("ACTIVATE");
        }, this);
        this.stage.addEventListener(egret.Event.DEACTIVATE, function () {
            // console.log("DEACTIVATE");
        }, this);
        // /// 优化参数设置 "auto","webgl","canvas"
        // if (DEBUG)
        //     console.error(egret.Capabilities.renderMode);
        // if (egret.Capabilities.renderMode == "canvas") {
        //     this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.ON;
        // } else {
        //     this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.OFF;
        // }
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map