var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 声音控制
 * @author
 *
 * public SkillSound: string;   特写时音效
 * public HitSound: string; 被击时音效
 */
var SoundAsyncOperator;
(function (SoundAsyncOperator) {
    SoundAsyncOperator[SoundAsyncOperator["play"] = 0] = "play";
    SoundAsyncOperator[SoundAsyncOperator["stop"] = 1] = "stop";
})(SoundAsyncOperator || (SoundAsyncOperator = {}));
var SoundManager = (function () {
    function SoundManager() {
        this.soundList = {}; //声音列表
        this.channelList = {}; //声道列表
        /// 声音异步操作序列
        this.operatorList = new Dictionary();
        var s = egret.localStorage.getItem(SoundManager.SAVE_KEY);
        if (s != null) {
            if (s == "true") {
                this.m_turn_on = true;
            }
            else if (s == "false") {
                this.m_turn_on = false;
            }
        }
        else {
            this.m_turn_on = false;
        }
    }
    SoundManager.prototype.AddAsyncOperator = function (soundName, res) {
        var value = this.operatorList.get(soundName);
        if (value != null) {
            value.length = 0;
            value = res;
        }
        else {
            this.operatorList.add(soundName, res);
        }
    };
    // 播放声音
    SoundManager.prototype.play = function (soundName, loops) {
        if (loops === void 0) { loops = 1; }
        if (Singleton.Get(login.LoginDataManager).loginData.pid == I_Platform.p_wanba && (egret.Capabilities.os == "Android" || egret.Capabilities.os == "Unknown")) {
            return;
        }
        try {
            if (!this.m_turn_on)
                return;
            var snd = this.soundList[soundName];
            if (snd == null) {
                this.AddAsyncOperator(soundName, [SoundAsyncOperator.play, loops]);
                ResManager.getResAsync(soundName, this.onRes, this);
                return;
            }
            if (snd) {
                this.channelList[soundName] = snd.play(0, loops);
            }
        }
        catch (e) {
            this.TurnOn(false);
            console.log(e);
        }
    };
    /// 异步加载回调
    SoundManager.prototype.onRes = function (snd, soundName) {
        if (snd == null) {
            return;
        }
        this.soundList[soundName] = snd;
        var element = this.operatorList.get(soundName);
        if (element != null) {
            var op = element[0];
            switch (op) {
                case SoundAsyncOperator.play:
                    this.channelList[soundName] = snd.play(0, element[1]);
                    break;
                case SoundAsyncOperator.stop:
                    this.channelList[soundName] = snd.play(0, -1);
                    var channel = this.channelList[soundName];
                    if (channel) {
                        channel.stop();
                    }
                    break;
                default:
                    /// error
                    // this.channelList[soundName] = snd.play(0, -1);
                    break;
            }
            element.length = 0;
        }
    };
    // 停止声音
    SoundManager.prototype.stop = function (soundName) {
        if (Singleton.Get(login.LoginDataManager).loginData.pid == I_Platform.p_wanba && (egret.Capabilities.os == "Android" || egret.Capabilities.os == "Unknown")) {
            return;
        }
        var channel = this.channelList[soundName];
        if (channel) {
            channel.stop();
        }
        else {
            this.AddAsyncOperator(soundName, [SoundAsyncOperator.stop]);
        }
    };
    SoundManager.prototype.getSoundChannel = function (soundName) {
        return this.channelList[soundName];
    };
    SoundManager.prototype.TurnOn = function (on) {
        this.m_turn_on = on;
        egret.localStorage.setItem(SoundManager.SAVE_KEY, on ? "true" : "false");
    };
    SoundManager.prototype.getIsTurnOn = function () {
        return this.m_turn_on;
    };
    SoundManager.prototype.mute = function (value) {
        for (var soundName in this.channelList) {
            if (typeof soundName != undefined) {
                try {
                    if (value) {
                        this.stop(soundName);
                    }
                    else {
                        this.play(soundName);
                    }
                }
                catch (e) {
                    console.error("uncaught error: " + e);
                }
            }
        }
    };
    SoundManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new SoundManager();
        }
        return this.instance;
    };
    return SoundManager;
}());
SoundManager.SAVE_KEY = "SOUND_ON";
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map