var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LogType;
(function (LogType) {
    LogType[LogType["Default"] = 0] = "Default";
    LogType[LogType["System"] = 1] = "System";
    LogType[LogType["Battle"] = 2] = "Battle";
    LogType[LogType["Network"] = 3] = "Network";
    LogType[LogType["WebSocket"] = 4] = "WebSocket";
    LogType[LogType["Sync"] = 5] = "Sync";
    LogType[LogType["Instance"] = 6] = "Instance";
    LogType[LogType["Pve"] = 7] = "Pve";
})(LogType || (LogType = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["INFO"] = 0] = "INFO";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
})(LogLevel || (LogLevel = {}));
var YWLogger = (function () {
    function YWLogger() {
    }
    YWLogger.info = function (text, type) {
        if (type === void 0) { type = LogType.Default; }
        YWLogger.log(text, LogLevel.INFO, type);
    };
    YWLogger.warn = function (text, type) {
        if (type === void 0) { type = LogType.Default; }
        YWLogger.log(text, LogLevel.WARN, type);
    };
    YWLogger.error = function (text, type) {
        if (type === void 0) { type = LogType.Default; }
        YWLogger.log(text, LogLevel.ERROR, type);
    };
    YWLogger.log = function (text, level, type) {
        if (level != LogLevel.ERROR) {
            // 关闭未经允许的非error log
            var is_baned = true;
            for (var i = 0; i < YWLogger.ALLOW_LOG_TYPE.length; i++) {
                if (type == YWLogger.ALLOW_LOG_TYPE[i]) {
                    is_baned = false;
                    break;
                }
            }
            if (is_baned) {
                return;
            }
        }
        switch (type) {
            case LogType.System:
                text = "[System] " + text;
                break;
            case LogType.Battle:
                text = "[Battle] " + text;
                break;
            case LogType.Network:
                text = "[Network] " + text;
                break;
            case LogType.Instance:
                text = "[Instance] " + text;
                break;
        }
        text = UtilsGame.dateToStr(UtilsGame.Now()) + " " + text;
        switch (level) {
            case LogLevel.ERROR:
                egret.error(text);
                break;
            case LogLevel.WARN:
                console.warn(text);
                break;
            case LogLevel.INFO:
                console.log(text);
                break;
        }
    };
    return YWLogger;
}());
// log类型白名单
YWLogger.ALLOW_LOG_TYPE = [LogType.Default, LogType.System];
__reflect(YWLogger.prototype, "YWLogger");
//# sourceMappingURL=YWLogger.js.map