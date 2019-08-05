var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpClient = (function () {
    function HttpClient() {
    }
    HttpClient.setLockActive = function (active) {
        this.m_lock_active = active;
    };
    /**
     * 发送HTTP请求
     * @param type 消息类型（URL）
     * @param params 参数（CommonMsg对象）
     * @param thisObj this
     * @param finished 回调函数
     * @param isLock 是否锁定（未使用）
     * @constructor
     */
    HttpClient.HandlRequestAsWait = function (type, params, thisObj, finished, isLock) {
        if (isLock === void 0) { isLock = false; }
        // 检查重复请求 同一请求返回结果前不允许重复发送
        if (this.CallBacks.get(type) != undefined && type != NetConst.SYS_WINDOW_ERROR) {
            YWLogger.info(Template.getGUIText("append_241") + type, LogType.Network);
            // Singleton.Get(ReportManager).reqReportObj("HTTP-REPEAT", {name: type, params: msg.CommonMsg}); // 重复请求发送日志
            return;
        }
        // 注册回调函数
        HttpClient.CallBacks.add(type, finished);
        if (isLock) {
            if (this.m_lock_active) {
                YWLogger.warn("A http request denied by lock, type: " + type, LogType.Network);
                return;
            }
            Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open(DEFINE.SYNC_LOADING_DURATION);
            HttpClient.setLockActive(true);
        }
        // 发送消息
        Singleton.Get(httpRequest).sendPostRequest(type, function (type, dat) {
            if (type.indexOf("send") >= 0) {
                YWLogger.info("====================");
                YWLogger.info(Template.getGUIText("append_119") + "[" + type + "] ", LogType.Network);
                YWLogger.info("发送数据：\r\n " + JSON.stringify(params), LogType.Network);
                YWLogger.info("收到数据：\r\n " + dat, LogType.Network);
                YWLogger.info("====================");
            }
            if (isLock) {
                Singleton.Get(LayerManager).getView(ui.SyncLoadingView).cancleOpen();
                HttpClient.setLockActive(false);
            }
            // TODO 错误判断
            if (dat == "error") {
                return;
            }
            // 解析消息
            var temp = JSON.parse(dat);
            // 处理特殊消息
            Singleton.Get(MessageManager).handlerSpecialMsg(temp);
            // 调用回调函数
            var fun = HttpClient.CallBacks.get(type);
            HttpClient.CallBacks.remove(type);
            if (fun != undefined) {
                if (temp.header.rt == 0) {
                    fun.call(thisObj, temp);
                }
            }
        }, JSON.stringify(params));
    };
    /**
     * 发送HTTP请求
     * @param type 消息类型（URL）
     * @param params 参数（CommonMsg对象）
     * @param thisObj this
     * @param finished 回调函数
     * @param isLock 是否锁定（未使用）
     * @constructor
     * @return string
     */
    HttpClient.HandlRequestString = function (type, params, thisObj, finished, isLock) {
        if (isLock === void 0) { isLock = true; }
        // 同意请求返回结果前不允许重复发送
        if (this.CallBacks[type] != null) {
            YWLogger.info("[Network] 重复请求" + type, LogType.Network);
            return;
        }
        HttpClient.CallBacks.add(type, finished);
        Singleton.Get(httpRequest).sendPostRequest(type, function (type, dat) {
            var fun = HttpClient.CallBacks.get(type);
            if (fun != null) {
                fun.call(thisObj, dat);
            }
            HttpClient.CallBacks.remove(type);
        }, JSON.stringify(params));
    };
    /**
     * url 请求
     */
    HttpClient.requestUrl = function (url, thisObj, callBack) {
        HttpClient.CallBacks.add(url, callBack);
        Singleton.Get(HttpRequestByURL).sendGetRequest(url, function (type, dat) {
            var fun = HttpClient.CallBacks.get(type);
            if (fun != null) {
                fun.call(thisObj, dat);
            }
            HttpClient.CallBacks.remove(type);
        });
    };
    /**
     * 清空回调
     */
    HttpClient.clearCallFunctions = function () {
        HttpClient.CallBacks.clear();
    };
    return HttpClient;
}());
HttpClient.CallBacks = new Dictionary();
HttpClient.m_lock_active = false;
__reflect(HttpClient.prototype, "HttpClient");
//# sourceMappingURL=HttpClient.js.map