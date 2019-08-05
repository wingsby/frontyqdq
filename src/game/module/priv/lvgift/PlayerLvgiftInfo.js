var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerLvgiftInfo = (function () {
    function PlayerLvgiftInfo() {
        this.is_inited = false;
        this.lvgift_t = 0; // 限时礼包过期时间戳
        this.lvgift_id = []; // 已经激活的限时礼包id列表
        this.lvgift_st = []; // 已经激活的限时礼包id的状态
        this.lvgift_opened = []; // 本次登入已经查看过的限时礼包
        this.checker_id = 0;
    }
    PlayerLvgiftInfo.prototype.onSync = function (rec) {
        this.is_inited = true;
        this.lvgift_t = rec.lvgift_t;
        this.lvgift_id = rec.lvgift_id;
        this.lvgift_st = rec.lvgift_st;
        this.setChecker();
    };
    /**
     * 设定检查时钟
     */
    PlayerLvgiftInfo.prototype.setChecker = function () {
        var id = this.getActiveGift();
        if (id <= 0) {
            return;
        }
        var cfg_gift = Template.lvgift.get(id);
        if (!cfg_gift) {
            return;
        }
        if (cfg_gift.Time == 0) {
            return;
        }
        if (this.checker_id != id) {
            this.checker_id = id;
            Singleton.Get(UpdateTimer).addAndStart(this.lvgift_t - UtilsGame.Now() + 1000, Singleton.Get(LvgiftManager).reqInfoWithRefresh, Singleton.Get(LvgiftManager));
        }
    };
    /**
     * 获取激活的礼包id
     * @return {number}
     */
    PlayerLvgiftInfo.prototype.getActiveGift = function () {
        for (var i = 0; i < this.lvgift_st.length; i++) {
            switch (this.lvgift_st[i]) {
                case E_LVGIFT_STATUS.ONSALE:
                    var cfg_gift = Template.lvgift.get(this.lvgift_id[i]);
                    if (cfg_gift) {
                        if (UtilsGame.Now() < this.lvgift_t || cfg_gift.Time == 0) {
                            return this.lvgift_id[i];
                        }
                    }
                    break;
                case E_LVGIFT_STATUS.HOLDING:
                    return this.lvgift_id[i];
            }
        }
        return 0;
    };
    /**
     * 根据礼包id获取礼包状态
     * @param id
     * @return {E_LVGIFT_STATUS}
     */
    PlayerLvgiftInfo.prototype.getGiftStatus = function (id) {
        if (UtilsArray.contains(this.lvgift_id, id)) {
            for (var i = 0; i < this.lvgift_id.length; i++) {
                if (this.lvgift_id[i] == id) {
                    // 可购买礼包如果超过时间限制 自动变为超时状态
                    var st = this.lvgift_st[i];
                    if (st == E_LVGIFT_STATUS.ONSALE) {
                        var cfg_gift = Template.lvgift.get(this.lvgift_id[i]);
                        if (cfg_gift) {
                            if (UtilsGame.Now() >= this.lvgift_t && cfg_gift.Time != 0) {
                                return E_LVGIFT_STATUS.OUT;
                            }
                        }
                    }
                    return this.lvgift_st[i];
                }
            }
            return E_LVGIFT_STATUS.LOCKED;
        }
        else {
            return E_LVGIFT_STATUS.LOCKED;
        }
    };
    /**
     * 设定礼包状态
     * @param id
     * @param status
     */
    PlayerLvgiftInfo.prototype.setGiftStatus = function (id, status) {
        // TODO
    };
    /**
     * 将正在出售的礼包状态设为可领取
     */
    PlayerLvgiftInfo.prototype.setOnsaleGiftHoding = function () {
        for (var i = 0; i < this.lvgift_st.length; i++) {
            if (this.lvgift_st[i] == E_LVGIFT_STATUS.ONSALE) {
                this.lvgift_st[i] = E_LVGIFT_STATUS.HOLDING;
                break;
            }
        }
    };
    /**
     * 获取某一等级解锁的礼包
     * @param team_lv
     * @return {number}
     */
    PlayerLvgiftInfo.prototype.getLevelGift = function (team_lv) {
        var gifts = Template.lvgift.values;
        for (var i = 0; i < gifts.length; i++) {
            if (gifts[i].GiftLv == team_lv) {
                return gifts[i].ID;
            }
        }
        return 0;
    };
    /**
     * 获取礼包购买对象
     * @param id
     */
    PlayerLvgiftInfo.prototype.getGiftPayItem = function (id) {
        for (var i = 0; i < Template.payItem.length; i++) {
            if (Template.payItem[i].itemId == id) {
                return Template.payItem[i];
            }
        }
        return;
    };
    /**
     * 将礼包标记为打开过界面
     * @param id
     */
    PlayerLvgiftInfo.prototype.markGiftOpened = function (id) {
        if (this.checkGiftOpened(id)) {
            return;
        }
        this.lvgift_opened.push(id);
    };
    /**
     * 检查力保界面本次登入后是否已打开过
     * @param id
     */
    PlayerLvgiftInfo.prototype.checkGiftOpened = function (id) {
        return UtilsArray.contains(this.lvgift_opened, id);
    };
    return PlayerLvgiftInfo;
}());
__reflect(PlayerLvgiftInfo.prototype, "PlayerLvgiftInfo");
//# sourceMappingURL=PlayerLvgiftInfo.js.map