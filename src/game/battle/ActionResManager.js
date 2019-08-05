///SingleTon
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActionResManager = (function () {
    function ActionResManager() {
        // this.loadList = [];
        this.BaseMovieClipMap = new HashMap();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.loadComplete, this);
    }
    /// 预加载
    ActionResManager.prototype.init = function () {
        // this.loadActionRes("role01");
    };
    ActionResManager.prototype.getAcFactory = function (mcName, mcJson, textureName) {
        var acFactory = this.BaseMovieClipMap.get(mcName);
        if (!acFactory) {
            /// 必加载过了
            var jsonData = ResManager.getResSync((mcJson == undefined ? mcName : mcJson) + "_json");
            var texture = ResManager.getResSync((textureName == undefined ? mcName : textureName) + "_png");
            acFactory = new egret.MovieClipDataFactory(jsonData, texture);
            this.BaseMovieClipMap.put(mcName, acFactory);
        }
        return acFactory;
    };
    //同步的时候获取modelname的资源
    ActionResManager.prototype.getAcData = function (mcName) {
        var mcf = this.getAcFactory(mcName);
        return mcf.generateMovieClipData(mcName);
    };
    //获取替代模型
    ActionResManager.prototype.getAcASData = function (acCache) {
        return null;
    };
    //动画是否加载过
    ActionResManager.prototype.isResLoaded = function (name) {
        var acFactory = this.BaseMovieClipMap.get(name);
        return (acFactory != null);
    };
    //加载动画资源
    ActionResManager.prototype.loadActionRes = function (name) {
        if (!RES.hasRes(name)) {
        }
        RES.loadGroup(name);
    };
    //播放动画
    ActionResManager.prototype.play = function (acCache) {
    };
    //异步播放动画
    ActionResManager.prototype.playAsync = function (acCache) {
    };
    ActionResManager.prototype.loadComplete = function (e) {
    };
    ActionResManager.prototype.clear = function () {
    };
    return ActionResManager;
}());
__reflect(ActionResManager.prototype, "ActionResManager");
//# sourceMappingURL=ActionResManager.js.map