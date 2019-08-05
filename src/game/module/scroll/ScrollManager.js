var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 挑战券管理器
 */
var ScrollManager = (function () {
    // endregion
    // region 初始化
    /**
     * 构造函数
     */
    function ScrollManager() {
        // region 成员变量
        this.scrolls_info = null;
        this.init();
        MessageManager.registeSync(this.onSync, this);
    }
    /**
     * 初始化
     */
    ScrollManager.prototype.init = function () {
    };
    /**
     * 响应游戏加载完成
     */
    ScrollManager.prototype.onGameLoaded = function () {
    };
    // endregion
    // region 响应同步
    /**
     * 响应强制写入
     * @param rec_msg
     */
    ScrollManager.prototype.onSyncRewrite = function (rec_msg) {
        if (rec_msg == null) {
            YWLogger.error("cant conv null to PlayerScrollInfo", LogType.Sync);
            return;
        }
        this.scrolls_info = rec_msg;
        YWLogger.info("PlayerScrollInfo inited.", LogType.Sync);
        YWLogger.info(this.scrolls_info, LogType.Sync);
    };
    /**
     * 响应数据同步
     * @param e
     */
    ScrollManager.prototype.onSync = function (e) {
        // 检查是否需要更新
        var rec_msg = e._scroll;
        if (e._scroll == null) {
            return;
        }
        // 更新uid信息 TODO 是否有必要？
        if (rec_msg.uid) {
            this.scrolls_info.uid = rec_msg.uid;
        }
        // 更新挑战券信息 TODO 优化
        if (rec_msg.scroll_list != null) {
            if (rec_msg.scroll_list.length > 0) {
                for (var i = 0; i < rec_msg.scroll_list.length; i++) {
                    var is_replaced = false;
                    for (var j = 0; j < this.scrolls_info.scroll_list.length; j++) {
                        if (rec_msg.scroll_list[i].id == this.scrolls_info.scroll_list[j].id) {
                            this.scrolls_info.scroll_list[j] = rec_msg.scroll_list[i];
                            is_replaced = true;
                            break;
                        }
                    }
                    if (!is_replaced) {
                        this.scrolls_info.scroll_list.push(rec_msg.scroll_list[i]);
                    }
                }
            }
        }
        YWLogger.info("[Scroll]更新了挑战券信息", LogType.Sync);
        YWLogger.info(this.scrolls_info, LogType.Sync);
    };
    // endregion
    // region 获取方法
    /**
     * 获取原始数量
     * @param scroll_id
     */
    ScrollManager.prototype.getOriCount = function (scroll_id) {
        var scroll = this.getScroll(scroll_id);
        // 玩家没有该挑战券
        if (scroll == null) {
            return 0;
        }
        return scroll.count;
    };
    /**
     * 获取挑战券剩余购买次数
     */
    ScrollManager.prototype.getScrollPrice = function (scroll_id) {
        var scroll_info = Template.scroll.get(scroll_id);
        if (scroll_info == null) {
            egret.error("no scrollId: " + scroll_id);
            return;
        }
        var my_scroll_info = this.getScroll(scroll_id);
        if (my_scroll_info == null) {
            return scroll_info.InitialP;
        }
        return scroll_info.InitialP + my_scroll_info.buy_cnt * scroll_info.PriceM;
    };
    /**
     * 获取挑战券信息
     * @param scroll_id
     * @returns {any}
     */
    ScrollManager.prototype.getScroll = function (scroll_id) {
        var scroll_list = this.scrolls_info.scroll_list;
        for (var i = 0; i < scroll_list.length; i++) {
            if (scroll_list[i].id == scroll_id) {
                return scroll_list[i];
            }
        }
        return null;
    };
    /**
     * 获取挑战券当前信息
     * @param scroll_id
     * @returns {number[真实数量, 下次恢复时间差(毫秒)]}
     */
    ScrollManager.prototype.getScrollActual = function (scroll_id) {
        // 获取挑战券配置
        var scroll_info = Template.scroll.get(scroll_id);
        if (!scroll_info) {
            egret.error("no scroll cfg, scrollId: " + scroll_id);
            return;
        }
        // 获取玩家挑战券信息
        var my_scroll_info = this.getScroll(scroll_id);
        if (!my_scroll_info) {
            return [scroll_info.UpperL, 0];
        }
        // 获取时间
        var now = UtilsGame.Now();
        var last_time = my_scroll_info.last_time;
        var actual_count = 0;
        var actual_next_offset = 0;
        switch (scroll_info.Type) {
            case ScrollRecoverType.Recover:
                actual_count = my_scroll_info.count + Math.floor((now - last_time) / scroll_info.CSRTime);
                actual_next_offset = scroll_info.CSRTime - ((now - last_time) % scroll_info.CSRTime);
                if (actual_count >= scroll_info.UpperL) {
                    if (my_scroll_info.count >= scroll_info.UpperL) {
                        actual_count = my_scroll_info.count;
                    }
                    else {
                        actual_count = scroll_info.UpperL;
                    }
                    actual_next_offset = 0;
                }
                break;
            case ScrollRecoverType.Reset:
                actual_count = my_scroll_info.count;
                actual_next_offset = Common.getNextResetTime();
                if (actual_count <= scroll_info.UpperL && my_scroll_info.last_time < Common.getTodayResetTime()) {
                    actual_count = scroll_info.UpperL;
                }
                break;
            default:
                break;
        }
        return [actual_count, actual_next_offset];
    };
    // endregion
    // region 网络通信
    ScrollManager.prototype.reqBuy = function (scroll_id, callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.scroll = new msg.ScrollMsg();
        send_msg.body.scroll.scroll_id = scroll_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.SCROLL_BUY, send_msg, this, function (data) {
            var rec_msg = data.body.scroll;
            if (rec_msg == null) {
                console.log("buy scroll msg is null.");
                return;
            }
            if (rec_msg.success) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_62"));
                if (callback != null) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    // endregion
    // region 相关方法
    /**
     * 检查挑战券或道具是否有指定数量
     * 如果不足弹出购买
     */
    ScrollManager.prototype.checkScrollNum = function (scr_id, count, cb, thisObj) {
        var scr_num = this.getScrollActual(scr_id)[0];
        var cfg_scr = Template.scroll.get(scr_id);
        var scr_item_id = cfg_scr.Item;
        var cfg_scr_item = Template.item.get(scr_item_id);
        var scr_item_num = Singleton.Get(BagManager).getItemCount(scr_item_id);
        if (scr_num > 0 || scr_item_num <= 0 || !cfg_scr_item) {
            // 消耗挑战券
            if (scr_num <= 0) {
                // 获取VIP信息
                var my_vip_lv = Singleton.Get(PlayerInfoManager).getVipLevel();
                var cfg_vip = Template.vip.get(my_vip_lv);
                var scr_base_info = this.getScroll(scr_id);
                var price = this.getScrollPrice(scr_id);
                var buy_cnt = scr_base_info == undefined ? 0 : scr_base_info.buy_cnt;
                var surplus_chance = cfg_scr.BuyTime[my_vip_lv] - buy_cnt;
                // 判断挑战券购买次数
                if (surplus_chance <= 0) {
                    Singleton.Get(DialogControler).showInfo(1116);
                }
                else {
                    // 弹窗确认
                    Singleton.Get(DialogControler).showBuy(UtilsGame.stringHander(Template.getGUIText("ui_pve_30"), price, cfg_scr.ASpurchase, Template.getGUIText(cfg_scr.Name), my_vip_lv, surplus_chance), "", price, DEFINE.UI_ALERT_INFO.diamond, function () {
                        Singleton.Get(ScrollManager).reqBuy(scr_id, cb, thisObj);
                    }, this);
                    return;
                }
                return false;
            }
            return true;
        }
        else {
            // 消耗道具
            return true;
        }
    };
    return ScrollManager;
}());
__reflect(ScrollManager.prototype, "ScrollManager");
//# sourceMappingURL=ScrollManager.js.map