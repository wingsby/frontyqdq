var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 玩家背包模块
 *
 */
var BagManager = (function () {
    // endregion
    // region 初始化
    /**
     * 构造函数
     */
    function BagManager() {
        this.alarm_gift = false;
        this.last_sync_rewrite = 0;
        this.init();
    }
    /**
     * 初始化
     */
    BagManager.prototype.init = function () {
        this.m_bag_dict = new Dictionary();
        this.m_equip_bag = [];
        this.m_resolve_equips = [];
        this.alarm = new BagAlarm;
        MessageManager.registeSync(this.onSync, this);
        MessageManager.registeSync(this.onEquipSync, this);
    };
    /**
     * 响应游戏加载完成
     */
    BagManager.prototype.onGameLoaded = function () {
        // 单机版
        if (Singleton.Get(MainManager).m_is_single) {
            return;
        }
    };
    /**
     * 获取通知器
     */
    BagManager.prototype.getAlarm = function () {
        return this.alarm;
    };
    /**
     * 获取礼包通知状态
     */
    BagManager.prototype.getGiftAlarm = function () {
        return this.alarm_gift;
    };
    // endregion
    // region 信息同步
    /**
     * 覆写道具背包信息
     * @param rec_msg
     */
    BagManager.prototype.onSyncRewrite = function (rec_msg) {
        if (rec_msg == null) {
            YWLogger.error("bag data from login is not existed.", LogType.Sync);
            return;
        }
        // 记录刷新时间
        this.last_sync_rewrite = UtilsGame.Now();
        // 初始化背包字典
        var sync_dict = Common.convBagSyncToDict(rec_msg.items);
        // 如果是完整消息，直接覆写
        YWLogger.info("[Bag]道具背包初始化完成", LogType.Sync);
        this.m_bag_dict = sync_dict;
        this.alarm.onUpdate_EquipFrag();
        this.onItemUpdate();
        return;
    };
    /**
     * 同步道具背包信息
     * @param rec_msg
     */
    BagManager.prototype.onSync = function (e) {
        var _this = this;
        //　检查是否需要更新
        var rec_msg = e._bag;
        if (rec_msg == null) {
            return;
        }
        // 初始化背包字典
        var sync_dict = Common.convBagSyncToDict(rec_msg.items);
        // 如果是完整消息，直接覆写
        if (rec_msg.is_refresh) {
            this.onSyncRewrite(rec_msg);
            this.updateEquipFullNotify();
            Singleton.Get(EquipManager).onNotifyAlarm();
            return;
        }
        // 不是完整消息，逐一检查
        sync_dict.foreachKey(function (key) {
            YWLogger.info("[Bag]更新了背包中的道具", LogType.Sync);
            var value = sync_dict.get(key);
            // 检查装备信息，如果是装备，入装备背包
            var item_info = Template.item.get(key);
            if (item_info != null) {
                if (item_info.iType == ItemType.Equip) {
                    _this.setEquipCount(key, value);
                    return;
                }
            }
            // 更新普通背包信息
            if (!_this.m_bag_dict.containsKey(key)) {
                if (value > 0) {
                    _this.m_bag_dict.add(key, value);
                }
            }
            else {
                if (value > 0) {
                    _this.m_bag_dict.update(key, value);
                }
                else {
                    _this.m_bag_dict.remove(key);
                }
            }
        }, this);
        this.updateEquipFullNotify();
        Singleton.Get(EquipManager).onNotifyAlarm();
        this.alarm.onUpdate_EquipFrag();
        this.onItemUpdate();
    };
    // endregion
    // region 装备背包信息同步
    /**
     * 覆写装备背包
     * @param rec_msg
     */
    BagManager.prototype.onEquipSyncRewrite = function (rec_msg) {
        if (rec_msg == null) {
            YWLogger.error("bag data from login is not existed.", LogType.Sync);
            return;
        }
        // 如果是完整消息，直接覆写
        YWLogger.info("[Bag]装备背包初始化完成", LogType.Sync);
        this.m_equip_bag = rec_msg.add;
        this.updateEquipFullNotify();
        //Singleton.Get(EquipManager).onNotifyAlarm();
    };
    /**
     * 同步装备背包
     * @param rec_msg
     */
    BagManager.prototype.onEquipSync = function (e) {
        //　检查是否需要更新
        var rec_msg = e._equip_bag;
        if (rec_msg == null) {
            return;
        }
        // 如果是完整消息，直接覆写
        if (rec_msg.is_refresh) {
            this.onEquipSyncRewrite(rec_msg);
            return;
        }
        // 添加装备
        if (rec_msg.add) {
            if (rec_msg.add.length > 0) {
                for (var i = 0; i < rec_msg.add.length; i++) {
                    if (rec_msg.add[i] <= 0) {
                        continue;
                    }
                    this.m_equip_bag.push(rec_msg.add[i]);
                }
            }
        }
        // 扣减装备
        if (rec_msg.sub) {
            if (rec_msg.sub.length > 0) {
                for (var i = 0; i < rec_msg.sub.length; i++) {
                    for (var j = 0; j < this.m_equip_bag.length; j++) {
                        if (this.m_equip_bag[j] == rec_msg.sub[i]) {
                            this.m_equip_bag.splice(j, 1);
                            break;
                        }
                    }
                }
            }
        }
        Singleton.Get(EquipManager).onNotifyAlarm();
        this.updateEquipFullNotify();
    };
    // endregion
    // region 外部读取背包数据
    /**
     * 获取道具数量
     * @param item_id
     * @returns {number}
     */
    BagManager.prototype.getItemCount = function (item_id) {
        if (this.m_bag_dict.containsKey(item_id)) {
            return this.m_bag_dict.get(item_id);
        }
        else {
            return this.getEquipCount(item_id);
        }
    };
    /**
     * 是否有足够的item
     * @param item_id
     * @param count
     */
    BagManager.prototype.hasEnough = function (item_id, count) {
        return this.getItemCount(item_id) >= count;
    };
    /**
     * 外部获取背包字典
     * @returns {Dictionary<number, number>}
     */
    BagManager.prototype.getbagDict = function () {
        return this.m_bag_dict;
    };
    /**
     * 是否有某种类型的任意道具
     */
    BagManager.prototype.hasAnyOfType = function (type) {
        var keys = this.m_bag_dict.keys;
        for (var i = 0; i < keys.length; i++) {
            var item_id = keys[i];
            var cfg_item = Template.item.get(item_id);
            if (!cfg_item) {
                continue;
            }
            if (cfg_item.iType == type) {
                if (this.getItemCount(item_id) > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    // endregion
    // region 外部读取装备背包数据
    BagManager.prototype.onItemUpdate = function () {
        Singleton.Get(ActivityManager).getAlarm().onUpdate_Turnplate();
        this.alarm.onUpdate_Gift();
    };
    /**
     * 更新背包将满提示
     */
    BagManager.prototype.updateEquipFullNotify = function () {
        Singleton.Get(LayerManager).getView(ui.TopFloatView).showNotifyEquip((this.getEquipBagCapacity() - this.m_equip_bag.length) < 10);
    };
    /**
     * 检查是否有装备
     * @param item_id
     */
    BagManager.prototype.hasEquip = function (item_id) {
        for (var i = 0; i < this.m_equip_bag.length; i++) {
            if (item_id == this.m_equip_bag[i]) {
                return true;
            }
        }
        return false;
    };
    /**
     * 获取装备数量
     * @param item_id
     */
    BagManager.prototype.getEquipCount = function (item_id) {
        var result = 0;
        for (var i = 0; i < this.m_equip_bag.length; i++) {
            if (item_id == this.m_equip_bag[i]) {
                result++;
            }
        }
        return result;
    };
    /**
     * 获取装备背包容量
     * @returns {number}
     */
    BagManager.prototype.getEquipBagCapacity = function () {
        return Template.config.EquipNum;
    };
    /**
     * 检查装备背包是否已满
     * @returns {boolean}
     */
    BagManager.prototype.checkEquipBagFull = function () {
        return this.m_equip_bag.length >= this.getEquipBagCapacity();
    };
    /**
     * 获取装备背包内容
     * @returns {number[]}
     */
    BagManager.prototype.getEquipBag = function () {
        return this.m_equip_bag;
    };
    /**
     * 获取装备背包中指定槽位的道具列表
     * @param pos
     */
    BagManager.prototype.getEquipBagByPos = function (pos) {
        var result = [];
        var equip_bag = this.m_equip_bag;
        for (var i = 0; i < equip_bag.length; i++) {
            var equip_info = Template.equip.get(equip_bag[i]);
            if (equip_info == null) {
                continue;
            }
            if (equip_info.Position == pos) {
                result.push(equip_bag[i]);
            }
        }
        return result;
    };
    /**
     * 设定装备数量
     */
    BagManager.prototype.setEquipCount = function (item_id, count) {
        var cur_count = this.getEquipCount(item_id);
        // 数量相同 不变化
        if (count == cur_count) {
            return;
        }
        // 新数量比已有数量大，添加差值部分
        if (count > cur_count) {
            var add = count - cur_count;
            for (var i = 0; i < add; i++) {
                this.m_equip_bag.push(item_id);
            }
            return;
        }
        // 新数量比已有数量小，移除差值数量的装备
        if (count < cur_count) {
            var sub = cur_count - count;
            for (var i = 0; i < sub; i++) {
                for (var j = 0; j < this.m_equip_bag.length; j++) {
                    if (this.m_equip_bag[j] == item_id) {
                        this.m_equip_bag.splice(j, 1);
                        break;
                    }
                }
            }
        }
    };
    /**
     * 是否有任意空闲装备
     */
    BagManager.prototype.hasAnyEquip = function () {
        return this.m_equip_bag.length > 0;
    };
    /**
     * 是否有指定位置的空闲装备
     */
    BagManager.prototype.hasAnyEquipPos = function (pos) {
        for (var i = 0; i < this.m_equip_bag.length; i++) {
            var cfg_equip = Template.equip.get(this.m_equip_bag[i]);
            if (!cfg_equip) {
                continue;
            }
            if (cfg_equip.Position == pos) {
                return true;
            }
        }
        return false;
    };
    /**
     * 获取可分解的装备列表
     */
    /**
    public getEquipResolvable(count: number = -1): number[] {

        let equips: number[] = this.m_equip_bag.slice();
        equips = equips.sort(this.sortEquipResolvable);

        // 获取所有可分解装备
        if(count < 0) {
            return equips;
        }

        // 获取指定数量的可分解装备
        if(this.m_equip_bag.length <= count) {
            return equips;
        } else {
            return equips.slice(0, count);
        }

    }
     */
    /**
     * 获取可自动分解的装备列表
     * @param count 最大获取数量
     * @returns {number[]}
     */
    /**
    public getEquipResolvableWithoutEpic(count: number = -1): number[] {
        let equips: number[] = [];
        let options: number[] = this.getEquipResolvable();

        for(let i: number = 0; i < options.length; i++) {
            let item_id: number = options.length[i];
            let item: Entity.Item = Template.item.get(item_id);

            if(item.iStar <= DEFINE.EQUIP_RESOLVE_AUTO_STAR_MAX) {
                equips.push(item_id);
            }
        }

        if(count < 0) {
            return equips;
        }

        if(equips.length <= count) {
            return equips;
        } else {
            return equips.slice(0, count);
        }
    }
     */
    BagManager.prototype.getEquipIdByResolveId = function (resolve_id) {
        return this.m_equip_bag[this.m_resolve_equips[resolve_id]];
    };
    /**
     * 根据装备id查询其在装备背包中的索引
     * @param equip_id 装备id
     * @param eliminate 要排除的id
     * @returns {number}
     */
    BagManager.prototype.getEquipInBagId = function (equip_id, eliminate) {
        if (eliminate === void 0) { eliminate = []; }
        for (var i = 0; i < this.m_equip_bag.length; i++) {
            // 检查是否命中装备id
            if (this.m_equip_bag[i] == equip_id) {
                // 检查是否应该被排除
                var is_in_eli = false;
                for (var j = 0; j < eliminate.length; j++) {
                    if (i == eliminate[i]) {
                        is_in_eli = true;
                        break;
                    }
                }
                // 如果不在排除列表中 则返回当前数组索引
                if (!is_in_eli) {
                    return i;
                }
            }
        }
        // 所有装备都未命中
        return -1;
    };
    /**
     * 获取一键添加分解装备的列表
     * @returns {number[]} 装备背包数组索引列表
     */
    BagManager.prototype.getEquipResolvableOnekey = function () {
        var equip_bag = this.m_equip_bag;
        var equip_bag_clone = equip_bag;
        equip_bag_clone = equip_bag_clone.sort(this.sortEquipResolvable);
        var result_eqids = [];
        for (var i = 0; i < equip_bag_clone.length; i++) {
            var item_id = equip_bag_clone[i];
            var item_entity = Template.item.get(item_id);
            var star = item_entity.iStar > 100 ? item_entity.iStar - 100 : item_entity.iStar;
            if (star > DEFINE.EQUIP_RESOLVE_AUTO_STAR_MAX) {
                break;
            }
            if (result_eqids.length >= DEFINE.EQUIP_RESOLVE_MAX_ONCE) {
                break;
            }
            result_eqids.push(equip_bag_clone[i]);
        }
        var result = [];
        for (var i = 0; i < result_eqids.length; i++) {
            var equip_id = result_eqids[i];
            var eq_bag_id = this.getEquipInBagId(equip_id, result);
            if (eq_bag_id < 0) {
                egret.error("Incorrect eq_bag_id, please check getEquipResolvableOnekey().");
                continue;
            }
            result.push(eq_bag_id);
        }
        return result;
    };
    /**
     * 对可分解的装备列表进行排序
     */
    BagManager.prototype.sortEquipResolvable = function (a, b) {
        var a_info = Template.item.get(a);
        var b_info = Template.item.get(b);
        if (a_info == null || b_info == null) {
            egret.error("Can't sort resolvable equips, no item id: " + a + " or " + b);
            return 0;
        }
        var a_star = a_info.iStar > 100 ? a_info.iStar - 100 : a_info.iStar;
        var b_star = b_info.iStar > 100 ? b_info.iStar - 100 : b_info.iStar;
        if (a_star > b_star) {
            return 1;
        }
        else if (a_star < b_star) {
            return -1;
        }
        if (a_info.iStar > b_info.iStar) {
            return 1;
        }
        else if (a_info.iStar < b_info.iStar) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        else if (a < b) {
            return -1;
        }
        return 0;
    };
    /**
     * 根据装备背包id数组获取装备id数组
     * @param equip_bag_ids
     * @returns {number[]}
     */
    BagManager.prototype.getEquipIdsByEqBagIds = function (equip_bag_ids) {
        var result = [];
        for (var i = 0; i < equip_bag_ids.length; i++) {
            result.push(this.m_equip_bag[equip_bag_ids[i]]);
        }
        return result;
    };
    /**
     * 检查分解列表是否需要二次确认
     * @returns {boolean}
     */
    BagManager.prototype.checkResolveListWarn = function () {
        for (var i = 0; i < this.m_resolve_equips.length; i++) {
            var equip_id = this.m_equip_bag[this.m_resolve_equips[i]];
            var equip_entity = Template.item.get(equip_id);
            if (equip_entity.iStar >= DEFINE.EQUIP_RESOLVE_WARN_STAR_MAX) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检查分解列表是否为空
     * @returns {boolean}
     */
    BagManager.prototype.checkResolveListEmpty = function () {
        if (this.m_resolve_equips == null || this.m_resolve_equips.length <= 0) {
            return true;
        }
        return false;
    };
    // endregion
    // region 网络请求
    BagManager.prototype.tryReqSyncBag = function (callback, thisObj) {
        if (UtilsGame.Now() - this.last_sync_rewrite < DEFINE.SYNC_BAG_DURATION) {
            if (callback) {
                callback.call(thisObj);
            }
            return;
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_BAG_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.role_equip;
            if (!rec) {
                return;
            }
            if (rec.success) {
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, false);
    };
    return BagManager;
}());
__reflect(BagManager.prototype, "BagManager");
//# sourceMappingURL=BagManager.js.map