var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WanbaChecker = (function () {
    function WanbaChecker() {
        this.m_is_background = false;
    }
    WanbaChecker.prototype.run = function () {
        Singleton.Get(RegisterUpdate).register(this);
    };
    WanbaChecker.prototype.update = function () {
        var now = Date.now();
        var is_background = window["appInBackground"];
        if (this.m_is_background != is_background) {
            if (this.m_is_background) {
                this.onLeaveBackground();
            }
            else {
                this.onEnterBackground();
            }
            this.m_is_background = is_background;
        }
    };
    WanbaChecker.prototype.onEnterBackground = function () {
        SoundManager.getInstance().mute(true);
    };
    WanbaChecker.prototype.onLeaveBackground = function () {
        SoundManager.getInstance().mute(false);
    };
    return WanbaChecker;
}());
__reflect(WanbaChecker.prototype, "WanbaChecker", ["IUpdate"]);
//# sourceMappingURL=WanbaChecker.js.map