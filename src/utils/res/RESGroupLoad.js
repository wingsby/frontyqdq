var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 加载组资源
 * RESGroupLoad
 */
var RESGroupLoad = (function () {
    function RESGroupLoad() {
        this.groupCount = 0;
        this.loadComplete = {};
        this.loadError = {};
        this.loadProgress = {};
        this.thisObject = {};
    }
    RESGroupLoad.getInstance = function () {
        if (this.instance == null) {
            this.instance = new RESGroupLoad();
        }
        return this.instance;
    };
    /**
     * 加载资源组
     * @param name 资源组名
     * @param thisObject 回调函数绑定的对象
     * @param loadComplete 加载完成回调函数
     * @param loadError 加载错误回调函数
     * @param loadProgress 加载进度回调函数
     */
    RESGroupLoad.prototype.loadGroup = function (name, thisObject, loadComplete, loadProgress, loadError) {
        if (loadComplete === void 0) { loadComplete = null; }
        if (loadProgress === void 0) { loadProgress = null; }
        if (loadError === void 0) { loadError = null; }
        this.loadComplete[name] = loadComplete;
        this.loadError[name] = loadError;
        this.loadProgress[name] = loadProgress;
        this.thisObject[name] = thisObject;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(name);
        this.groupCount++;
    };
    RESGroupLoad.prototype.loadGroupByList = function (name, res_list, thisObject, loadComplete, loadProgress, loadError) {
        if (loadComplete === void 0) { loadComplete = null; }
        if (loadProgress === void 0) { loadProgress = null; }
        if (loadError === void 0) { loadError = null; }
        if (res_list == undefined || res_list.length <= 0) {
            console.error("can't create resource group, res_list is empty: " + name);
            return;
        }
        var result = RES.createGroup(name, res_list, true);
        if (result) {
            this.loadGroup(name, thisObject, loadComplete, loadProgress, loadError);
        }
        else {
            console.error("create resource group failed.");
        }
    };
    /**资源组加载完成*/
    RESGroupLoad.prototype.onResourceLoadComplete = function (event) {
        var groupName = event.groupName;
        var fun = this.loadComplete[groupName];
        if (fun != null) {
            fun.call(this.thisObject[groupName], event);
        }
        this.clearCallBack(groupName);
    };
    /**资源组加载错误*/
    RESGroupLoad.prototype.onResourceLoadError = function (event) {
        var fun = this.loadError[event.groupName];
        if (fun != null) {
            fun.call(this.thisObject[event.groupName], event);
        }
        this.clearCallBack(event.groupName);
    };
    /**资源组加载进度*/
    RESGroupLoad.prototype.onResourceProgress = function (event) {
        var fun = this.loadProgress[event.groupName];
        if (fun != null) {
            fun.call(this.thisObject[event.groupName], event);
        }
    };
    /**清除指定资源组的回调函数*/
    RESGroupLoad.prototype.clearCallBack = function (name) {
        this.loadComplete[name] = null;
        this.loadError[name] = null;
        this.loadProgress[name] = null;
        this.groupCount--;
        if (this.groupCount <= 0) {
            this.loadComplete = {};
            this.loadError = {};
            this.loadProgress = {};
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        }
    };
    return RESGroupLoad;
}());
__reflect(RESGroupLoad.prototype, "RESGroupLoad");
//# sourceMappingURL=RESGroupLoad.js.map