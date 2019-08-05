var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var E_NOTICE_TYPE;
(function (E_NOTICE_TYPE) {
    E_NOTICE_TYPE[E_NOTICE_TYPE["NORMAL"] = 0] = "NORMAL";
    E_NOTICE_TYPE[E_NOTICE_TYPE["FBOSS"] = 1] = "FBOSS";
})(E_NOTICE_TYPE || (E_NOTICE_TYPE = {}));
var NoticeProcessor = (function () {
    function NoticeProcessor() {
        this.m_nls = new Dictionary();
    }
    NoticeProcessor.prototype.process = function (msg) {
        if (this.valMsgFBoss(msg)) {
            this.insertNotice(E_NOTICE_TYPE.FBOSS, msg);
            return;
        }
        DialogControler.getinstance().showAlertNotice(msg);
    };
    NoticeProcessor.prototype.insertNotice = function (type, msg) {
        if (!this.m_nls.get(type)) {
            this.m_nls.add(type, []);
        }
        this.m_nls.get(type).push(msg);
    };
    NoticeProcessor.prototype.releaseNotice = function (type) {
        var msgs = this.m_nls.get(type);
        if (!msgs) {
            return;
        }
        for (var i = 0; i < msgs.length; i++) {
            DialogControler.getinstance().showAlertNotice(msgs[i]);
        }
        this.m_nls.update(type, []);
    };
    // region 拦截验证
    /**
     * 世界BOSS公告拦截验证
     */
    NoticeProcessor.prototype.valMsgFBoss = function (msg) {
        var my_name = Singleton.Get(LoginManager).loginInfo.nickname;
        var cfgs_fboss = Template.fullBoss.values;
        var template = Template.getGUIText("notice9");
        for (var i = 0; i < cfgs_fboss.length; i++) {
            var cfg_fboss = cfgs_fboss[i];
            var compare = UtilsGame.stringHander(template, my_name, Template.getGUIText(cfg_fboss.Name));
            if (compare.trim() == msg.trim()) {
                return true;
            }
        }
        return false;
    };
    return NoticeProcessor;
}());
__reflect(NoticeProcessor.prototype, "NoticeProcessor");
//# sourceMappingURL=NoticeProcessor.js.map