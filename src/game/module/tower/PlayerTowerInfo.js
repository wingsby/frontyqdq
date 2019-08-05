var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 玩家爬塔信息
 */
var PlayerTowerInfo = (function () {
    function PlayerTowerInfo() {
        this.cur_lv = 0; // 当前停留层；
        this.win = false; // 当前层是否已胜利；
        this.history_open = 0; // 历史达到最远层
        this.history_box = 0; // 历史领取最远层
        this.first_award = []; // 首次通关奖励领取情况
        this.alarm_reward = false;
    }
    /**
     * 更新数据内容
     * @param data
     */
    PlayerTowerInfo.prototype.updateData = function (data) {
        this.out_cur_lv = data.cur_lv;
        this.win = data.win;
        this.history_open = data.history_open;
        this.history_box = data.history_box;
        this.first_award = data.first_award;
        this.updateAlarm();
    };
    /**
     * 设定最远到达层
     * @param floor
     */
    PlayerTowerInfo.prototype.setHistoryOpen = function (floor) {
        if (floor > this.history_open) {
            this.history_open = floor;
            this.updateAlarm();
        }
    };
    /**
     * 设定最远领取层
     * @param floor
     */
    PlayerTowerInfo.prototype.setHistoryBox = function (floor) {
        if (floor > this.history_box) {
            this.history_box = floor;
            this.updateAlarm();
        }
    };
    /**
     * 设定首通奖励已领取
     */
    PlayerTowerInfo.prototype.setAwardReceived = function (id) {
        for (var i = 0; i < this.first_award.length; i++) {
            if (this.first_award[i] == id) {
                return;
            }
        }
        this.first_award.push(id);
        this.updateAlarm();
    };
    /**
     * 检查首通奖励是否已领取
     * @param id
     * @returns {boolean}
     */
    PlayerTowerInfo.prototype.checkRewardReceived = function (id) {
        for (var i = 0; i < this.first_award.length; i++) {
            if (this.first_award[i] == id) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检查首通奖励是否可领取
     * @param id
     * @returns {boolean}
     */
    PlayerTowerInfo.prototype.checkRewardAvailable = function (id) {
        return this.history_box >= id;
    };
    /**
     * 根据数据获取当前流程
     */
    PlayerTowerInfo.prototype.getCurFlowStatus = function () {
        return this.fake_win ? E_TOWER_FLOW.REWARD : E_TOWER_FLOW.WAIT;
    };
    /**
     * 获取当前等级
     * @returns {number}
     */
    PlayerTowerInfo.prototype.getCurLv = function () {
        if (this.out_cur_lv > 0) {
            return this.out_cur_lv;
        }
        else {
            return 1;
        }
    };
    /**
     * 当前关是否是BOSS关
     * @returns {boolean}
     */
    PlayerTowerInfo.prototype.isCurLvBoss = function () {
        return this.getCurLv() % 10 === 0;
    };
    /**
     * 前往下一层
     */
    PlayerTowerInfo.prototype.goNextLv = function () {
        this.out_cur_lv += 1;
        if (this.history_box < this.out_cur_lv - 1) {
            this.history_box = this.out_cur_lv - 1;
        }
        if (this.history_open < this.out_cur_lv) {
            this.history_open = this.out_cur_lv;
        }
        this.updateAlarm();
    };
    /**
     * 重置层数
     */
    PlayerTowerInfo.prototype.resetFloor = function () {
        this.out_cur_lv = 0;
    };
    /**
     * 返回历史最高层数
     */
    PlayerTowerInfo.prototype.backHisFloor = function () {
        this.out_cur_lv = this.history_open;
    };
    /**
     * 是否可扫荡
     */
    PlayerTowerInfo.prototype.isRaidAble = function () {
        if (this.out_cur_lv < this.history_open) {
            return true;
        }
        return false;
    };
    Object.defineProperty(PlayerTowerInfo.prototype, "fake_win", {
        /**
         * 获取当前层是否胜利
         */
        get: function () {
            if (this.out_cur_lv != this.history_open && this.out_cur_lv <= 1) {
                return false;
            }
            else {
                return this.win;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerTowerInfo.prototype, "out_cur_lv", {
        /**
         * 获取当前关
         */
        get: function () {
            return this.cur_lv;
        },
        /**
         * 设定当前关
         */
        set: function (value) {
            this.cur_lv = value;
            this.updateAlarm();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerTowerInfo.prototype, "alarm_scroll", {
        /**
         * 挑战券scroll
         */
        get: function () {
            return Singleton.Get(ScrollManager).getScrollActual(DEFINE.TOWER_SCROLL_ID)[0] > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 更新提示状态
     */
    PlayerTowerInfo.prototype.updateAlarm = function () {
        var cfg_rewards = Template.towerAward.values;
        for (var i = 0; i < cfg_rewards.length; i++) {
            if (this.checkRewardAvailable(cfg_rewards[i].ID) && !this.checkRewardReceived(cfg_rewards[i].ID)) {
                this.alarm_reward = true;
                return;
            }
        }
        this.alarm_reward = false;
    };
    Object.defineProperty(PlayerTowerInfo.prototype, "alarm_tower", {
        get: function () {
            return this.alarm_scroll || this.alarm_reward;
        },
        enumerable: true,
        configurable: true
    });
    return PlayerTowerInfo;
}());
__reflect(PlayerTowerInfo.prototype, "PlayerTowerInfo");
//# sourceMappingURL=PlayerTowerInfo.js.map