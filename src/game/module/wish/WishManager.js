var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WishManager = (function () {
    function WishManager() {
        this.m_info = new PlayerWishInfo();
        // region 能量雕刻
        this.e_lv = 0;
        this.e_stamina = 0;
        this.e_exp = 0;
    }
    WishManager.prototype.onGameLoaded = function () {
        this.reqInfo();
        Singleton.Get(Schedule).register(this, Template.config.RTime * 60 * 60 * 1000);
    };
    WishManager.prototype.getInfo = function () {
        return this.m_info;
    };
    WishManager.prototype.onSchedule = function () {
        this.reqInfo();
    };
    /**
     * 请求基本信息
     * @param callback
     * @param thisObj
     */
    WishManager.prototype.reqInfo = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.WISH_INFO, send, this, function (rec_msg) {
            var rec = rec_msg.body.wish;
            if (!rec) {
                return;
            }
            if (rec.success) {
                _this.getInfo().setInfo(rec);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.WISH_CNT);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_WISH_LV);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, false);
    };
    /**
     * 请求选择角色
     * @param role_id 斗士id
     * @param callback
     * @param thisObj
     */
    WishManager.prototype.reqSelRole = function (role_id, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send = new msg.CommonMsg();
        send.body.wish = new msg.WishMsg();
        send.body.wish.role_id = role_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.WISH_SEL, send, this, function (rec_msg) {
            var rec = rec_msg.body.wish;
            if (!rec) {
                return;
            }
            if (rec.success) {
                _this.getInfo().setSelRole(role_id);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求许愿一次
     * @param callback
     * @param thisObj
     */
    WishManager.prototype.reqExec = function (callback, thisObj) {
        var _this = this;
        var cfg_role = Template.role.get(this.getInfo().role_id);
        if (!cfg_role) {
            Singleton.Get(DialogControler).showInfo(1192);
            return;
        }
        var stamina_cost = cfg_role.WishCost; // 许愿一次需要消耗的能量
        if (this.getInfo().stamina < stamina_cost) {
            Singleton.Get(DialogControler).showInfo(1190);
            return;
        }
        // 构造消息体
        var send = new msg.CommonMsg();
        send.body.wish = new msg.WishMsg();
        send.body.wish.role_id = this.getInfo().role_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.WISH_EXEC, send, this, function (rec_msg) {
            var rec = rec_msg.body.wish;
            if (!rec) {
                return;
            }
            if (rec.success) {
                _this.getInfo().setStamina(rec.stamina);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.WISH_CNT);
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec.r_gold, rec.r_diamond, rec.r_items);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求一键许愿
     * @param callback
     * @param thisObj
     */
    WishManager.prototype.reqExecOnekey = function (callback, thisObj) {
        var _this = this;
        var cfg_role = Template.role.get(this.getInfo().role_id);
        if (!cfg_role) {
            Singleton.Get(DialogControler).showInfo(1192);
            return;
        }
        var stamina_cost = cfg_role.WishCost; // 许愿一次需要消耗的能量
        if (this.getInfo().stamina < stamina_cost) {
            Singleton.Get(DialogControler).showInfo(1190);
            return;
        }
        // 构造消息体
        var send = new msg.CommonMsg();
        send.body.wish = new msg.WishMsg();
        send.body.wish.role_id = this.getInfo().role_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.WISH_EXEC_ONEKEY, send, this, function (rec_msg) {
            var rec = rec_msg.body.wish;
            if (!rec) {
                return;
            }
            if (rec.success) {
                _this.getInfo().setStamina(rec.stamina);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.WISH_CNT);
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec.r_gold, rec.r_diamond, rec.r_items);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求道具升级
     * @param callback
     * @param thisObj
     */
    WishManager.prototype.reqLvupItem = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send = new msg.CommonMsg();
        this.engraveWish();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.WISH_LVUP_ITEM, send, this, function (rec_msg) {
            var rec = rec_msg.body.wish;
            if (!rec) {
                return;
            }
            if (rec.success) {
                _this.getInfo().setLvExp(rec.lv, rec.exp, true);
                _this.getInfo().setStamina(rec.stamina);
                _this.releaseEngrave();
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_WISH_LV);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求钻石升级
     * @param callback
     * @param thisObj
     */
    WishManager.prototype.reqLvupDiamond = function (callback, thisObj) {
        var _this = this;
        // 判断VIP
        var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
        var need_vip = Template.config.WishVip;
        if (my_vip < need_vip) {
            return;
        }
        // 判断钻石足够
        var my_diamond = Singleton.Get(PlayerInfoManager).getDiamond();
        var need_diamond = Template.config.WishUpNum;
        if (my_diamond < need_diamond) {
            Singleton.Get(DialogControler).showInfo(1005, this, function () {
                Singleton.Get(LayerManager).getView(ui.PayView).open();
            });
            return;
        }
        // 构造消息体
        var send = new msg.CommonMsg();
        this.engraveWish();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.WISH_LVUP_DIAMOND, send, this, function (rec_msg) {
            var rec = rec_msg.body.wish;
            if (!rec) {
                return;
            }
            if (rec.success) {
                _this.getInfo().setLvExp(rec.lv, rec.exp, true);
                _this.getInfo().setStamina(rec.stamina);
                _this.releaseEngrave();
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_WISH_LV);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求一键升级
     * @param callback
     * @param thisObj
     */
    WishManager.prototype.reqLvupOnekey = function (callback, thisObj) {
        var _this = this;
        // 判断VIP
        var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
        var need_vip = Template.config.WishVip;
        if (my_vip < need_vip) {
            return;
        }
        // 构造消息体
        var send = new msg.CommonMsg();
        this.engraveWish();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.WISH_LVUP_ONEKEY, send, this, function (rec_msg) {
            var rec = rec_msg.body.wish;
            if (!rec) {
                return;
            }
            if (rec.success) {
                _this.getInfo().setLvExp(rec.lv, rec.exp, true);
                _this.getInfo().setStamina(rec.stamina);
                _this.releaseEngrave();
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_WISH_LV);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 刻下许愿
     */
    WishManager.prototype.engraveWish = function () {
        this.e_lv = this.getInfo().lv;
        this.e_stamina = this.getInfo().stamina;
        this.e_exp = this.getInfo().exp;
    };
    /**
     * 释放刻下的许愿
     */
    WishManager.prototype.releaseEngrave = function () {
        var delta_lv = this.getInfo().lv - this.e_lv;
        var delta_stamina = this.getInfo().stamina - this.e_stamina;
        var delta_exp = this.getInfo().exp - this.e_exp;
        if (delta_lv > 0) {
            Singleton.Get(LayerManager).getView(ui.WishLevelupView).playLevelup();
        }
        if (delta_stamina) {
            Singleton.Get(DialogControler).showString(UtilsGame.stringHander(Template.getGUIText("ui_wish2"), delta_stamina));
        }
        if (delta_exp) {
            Singleton.Get(DialogControler).showString(UtilsGame.stringHander(Template.getGUIText("ui_wish3"), delta_exp));
        }
    };
    return WishManager;
}());
__reflect(WishManager.prototype, "WishManager", ["ISchedule"]);
//# sourceMappingURL=WishManager.js.map