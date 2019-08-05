/**
 * 声音控制 背景音乐
 * @author
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MUSICTYPE;
(function (MUSICTYPE) {
    MUSICTYPE[MUSICTYPE["MT_LOGIN"] = 0] = "MT_LOGIN";
    MUSICTYPE[MUSICTYPE["MT_INGAME"] = 1] = "MT_INGAME";
    MUSICTYPE[MUSICTYPE["MT_BOSSBATTLE"] = 2] = "MT_BOSSBATTLE";
    MUSICTYPE[MUSICTYPE["MT_END"] = 3] = "MT_END";
})(MUSICTYPE || (MUSICTYPE = {}));
var MusicManager = (function () {
    function MusicManager() {
        /// 游戏背景音乐
        this.GAMEMUSIC_RES = [
            "background_mp3",
            "battlewar_mp3",
            "battleBOSS_mp3"
        ];
        this.m_currentSoundType = undefined;
        var s = egret.localStorage.getItem(MusicManager.SAVE_KEY);
        if (s != null) {
            if (s == "true") {
                this.m_bPlayMusic = true;
            }
            else if (s == "false") {
                this.m_bPlayMusic = false;
            }
        }
        else {
            this.m_bPlayMusic = true;
        }
    }
    // //播放背景音乐, 会自动停止当前的背景音乐
    MusicManager.prototype.play = function (musicType, loops) {
        if (musicType === void 0) { musicType = MUSICTYPE.MT_END; }
        if (loops === void 0) { loops = -1; }
        try {
            if (musicType == this.m_currentSoundType) {
                return;
            }
            // 静音时不播放BGM
            if (!this.m_bPlayMusic) {
                return;
            }
            this.stop();
            this.m_currentSoundType = musicType;
            if (this.m_bPlayMusic && this.m_currentSoundType != MUSICTYPE.MT_END) {
                Singleton.Get(SoundManager).play(this.GAMEMUSIC_RES[this.m_currentSoundType], loops);
            }
        }
        catch (e) {
            this.m_bPlayMusic = false;
            console.log(e);
        }
    };
    MusicManager.prototype.stop = function () {
        if (this.m_currentSoundType != MUSICTYPE.MT_END) {
            Singleton.Get(SoundManager).stop(this.GAMEMUSIC_RES[this.m_currentSoundType]);
        }
    };
    MusicManager.prototype.GetPlaySound = function () {
        return this.m_bPlayMusic;
    };
    MusicManager.prototype.SetPlaySound = function (b) {
        this.m_bPlayMusic = b;
        egret.localStorage.setItem(MusicManager.SAVE_KEY, b ? "true" : "false");
        if (this.m_bPlayMusic) {
            this.play(MUSICTYPE.MT_INGAME);
        }
        else {
            this.stop();
            this.m_currentSoundType = undefined;
        }
    };
    return MusicManager;
}());
MusicManager.SAVE_KEY = "MUSIC_ON";
__reflect(MusicManager.prototype, "MusicManager");
//# sourceMappingURL=MusicManager.js.map