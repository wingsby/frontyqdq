var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 音频问题Hacker
 * 针对iOS需要用户交互才能触发音频的特性进行修复
 *
 * 资源加载过程中调用preloadRes()
 * 确认回调完成后，执行一次inject()
 * 完成上述操作后，即可在iOS浏览器中正常播放音频
 */
var AudioHacker = (function () {
    function AudioHacker() {
        this.m_is_loaded = false;
    }
    AudioHacker.prototype.preloadRes = function (callback, thisObj) {
        this.cb = callback;
        this.cb_t = thisObj;
        if (egret.Capabilities.os == "iOS" || egret.Capabilities.os == "Mac OS") {
            ResManager.getResAsync(DEFINE.AUDIO_HACKER_NAME, this.onLoadCompleted, this);
        }
        else {
            this.cb.call(this.cb_t);
        }
        // sound.load(DEFINE.AUDIO_HACKER_NAME);
        // console.log("Load Audio: " + DEFINE.AUDIO_HACKER_NAME);
    };
    AudioHacker.prototype.onLoadCompleted = function (snd, soundName) {
        this.m_is_loaded = true;
        this.m_hack_audio = snd;
        // console.log("Load Audio: " + DEFINE.AUDIO_HACKER_NAME);
        if (this.cb) {
            this.cb.call(this.cb_t);
            // 清空回调
            this.cb = undefined;
            this.cb_t = undefined;
        }
    };
    AudioHacker.prototype.onLoadFailed = function () {
        MessageManager.handleDisconnect(296);
    };
    AudioHacker.prototype.inject = function () {
        if (egret.Capabilities.os == "iOS" || egret.Capabilities.os == "Mac OS") {
            if (this.m_hack_audio && this.m_is_loaded) {
                // console.log("AudioHacker Completed.");
                this.m_hack_audio.play(0, 1);
                return;
            }
            else {
                MessageManager.handleDisconnect(297);
            }
        }
    };
    return AudioHacker;
}());
__reflect(AudioHacker.prototype, "AudioHacker");
//# sourceMappingURL=AudioHacker.js.map