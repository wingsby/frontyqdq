var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BossFullInfo = (function () {
    function BossFullInfo() {
        this.m_status = [];
    }
    /**
     * 更新数据
     */
    BossFullInfo.prototype.updateStatus = function (status) {
        if (!status) {
            return;
        }
        this.m_status = status;
    };
    /**
     * 获取BOSS相关信息
     */
    BossFullInfo.prototype.getBossById = function (id) {
        for (var i = 0; i < this.m_status.length; i++) {
            if (this.m_status[i].id == id) {
                var status_1 = this.processBossInf(this.m_status[i]);
                return status_1;
            }
        }
        return undefined;
    };
    /**
     * 处理世界BOSS信息
     */
    BossFullInfo.prototype.processBossInf = function (origin) {
        var status = new msg.BossStatusMsg();
        status.atk_t = origin.atk_t;
        status.dead_t = origin.dead_t;
        status.id = origin.id;
        status.curhp = origin.curhp;
        status.maxhp = origin.maxhp;
        status.participant = origin.participant;
        // BOSS 是死亡状态并且现在超过了复活时间
        var now = UtilsGame.Now();
        if (status.dead_t > 0 && now > this.getBossReviveByDead(status.id, status.dead_t)) {
            status.participant = 0;
            status.dead_t = 0;
            status.curhp = status.maxhp;
        }
        return status;
    };
    /**
     * 获取BOSS相关信息
     */
    BossFullInfo.prototype.getBossByIdOrigin = function (id) {
        for (var i = 0; i < this.m_status.length; i++) {
            if (this.m_status[i].id == id) {
                return this.m_status[i];
            }
        }
        return undefined;
    };
    /**
     * 获取BOSS冷却时间倒计时
     */
    BossFullInfo.prototype.getBossCountdown = function (id) {
        var status = this.getBossById(id);
        if (!status) {
            console.log("no status: " + id);
            return 0;
        }
        var next_time = status.atk_t + Template.config.BossCd * 1000;
        var now = UtilsGame.Now();
        if (now > next_time) {
            return 0;
        }
        else {
            return next_time - now;
        }
    };
    /**
     * Boss是否存活
     */
    BossFullInfo.prototype.isBossAlive = function (id) {
        // console.log("isBossAlive(" + id + ") offset: " + (UtilsGame.Now() - this.getBossRevive(id)) + ", revive: " + UtilsGame.dateToStr(this.getBossRevive(id)));
        return UtilsGame.Now() >= this.getBossRevive(id);
    };
    /**
     * BOSS是否正死亡且可复活
     */
    BossFullInfo.prototype.isBossShouldAliveButNot = function (id) {
        var inf_fls = this.getBossByIdOrigin(id);
        if (inf_fls.dead_t <= 0) {
            return false;
        }
        return this.getBossById(id).dead_t <= 0;
    };
    /**
     * 获取BOSS未复活前理应复活时间
     */
    BossFullInfo.prototype.getBossShouldRevive = function (id) {
        var inf_fls = this.getBossByIdOrigin(id);
        return this.getBossReviveByDead(id, inf_fls.dead_t);
    };
    /**
     * 获取BOSS复活时间
     */
    BossFullInfo.prototype.getBossRevive = function (id) {
        var inf_fls = this.getBossById(id);
        return this.getBossReviveByDead(id, inf_fls.dead_t);
    };
    /**
     * 获取BOSS复活时间
     */
    BossFullInfo.prototype.getBossReviveByDead = function (id, dead_t) {
        var cfg_fls = Template.fullBoss.get(id);
        return dead_t + cfg_fls.Revive * 1000;
    };
    /**
     * 更新BOSS复活信息
     */
    BossFullInfo.prototype.validateRevive = function () {
        var now = UtilsGame.Now();
        var cfgs_fls = Template.fullBoss.values;
        for (var i = 0; i < cfgs_fls.length; i++) {
            var id = cfgs_fls[i].ID;
            if (this.isBossShouldAliveButNot(id)) {
                var revive_time = this.getBossShouldRevive(id);
                if (now - revive_time > 0 && now - revive_time < DEFINE.BOSS_REVIVE_CHECK_TIME) {
                    // 更新数据状态
                    for (var i_1 = 0; i_1 < this.m_status.length; i_1++) {
                        if (this.m_status[i_1].id == id) {
                            this.m_status[i_1] = this.getBossById(id);
                            break;
                        }
                    }
                    var name_1 = Template.getGUIText(cfgs_fls[i].Name);
                    // 通知界面复活
                    Singleton.Get(LayerManager).getView(ui.BattleView).setWorldBossTip(name_1);
                    // 发送复活通知
                    DialogControler.getinstance().showAlertNotice(UtilsGame.stringHander(Template.getGUIText("notice10"), name_1));
                }
            }
        }
    };
    return BossFullInfo;
}());
__reflect(BossFullInfo.prototype, "BossFullInfo");
//# sourceMappingURL=BossFullInfo.js.map