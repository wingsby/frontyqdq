var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var E_BAG_ALARM_TYPE;
(function (E_BAG_ALARM_TYPE) {
    E_BAG_ALARM_TYPE[E_BAG_ALARM_TYPE["EQUIP_FRAG_COMPOSE"] = 0] = "EQUIP_FRAG_COMPOSE";
    E_BAG_ALARM_TYPE[E_BAG_ALARM_TYPE["GIFT"] = 1] = "GIFT";
})(E_BAG_ALARM_TYPE || (E_BAG_ALARM_TYPE = {}));
var BagAlarm = (function () {
    /**
     * @constructor
     */
    function BagAlarm() {
        this.als = new Dictionary();
    }
    /**
     * 检查是否有通知
     */
    BagAlarm.prototype.isAlarm = function (type) {
        var result = this.als.get(type);
        if (result == undefined) {
            return false;
        }
        return result;
    };
    /**
     * 检查是否存在任意通知
     */
    BagAlarm.prototype.hasAnyAlarm = function () {
        for (var i = 0; i < this.als.values.length; i++) {
            if (this.als.values[i]) {
                return true;
            }
        }
        return false;
    };
    /**
     * 响应任意通知更新
     */
    BagAlarm.prototype.onUpdate_Any = function () {
        if (!UtilsGame.isGameLoaded()) {
            return;
        }
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).refreshBtnBagNew();
        if (layer.isViewOnStage(layer.getView(ui.BagBaseView))) {
            layer.getView(ui.BagBaseView).refreshAlarm();
        }
    };
    /**
     * 响应背包装备碎片更新
     */
    BagAlarm.prototype.onUpdate_EquipFrag = function () {
        var bag = Singleton.Get(BagManager);
        for (var i = 0; i < bag.m_bag_dict.keys.length; i++) {
            var cfg_item = Template.item.get(bag.m_bag_dict.keys[i]);
            var count = bag.m_bag_dict.values[i];
            if (!cfg_item) {
                continue;
            }
            if (cfg_item.iType == ItemType.EquipFragment) {
                var need = cfg_item.Synthesis;
                if (count >= need) {
                    this.als.update(E_BAG_ALARM_TYPE.EQUIP_FRAG_COMPOSE, true);
                    this.onUpdate_Any();
                    return;
                }
            }
        }
        this.als.update(E_BAG_ALARM_TYPE.EQUIP_FRAG_COMPOSE, false);
        this.onUpdate_Any();
    };
    BagAlarm.prototype.onUpdate_Gift = function () {
        var bag = Singleton.Get(BagManager);
        var keys = bag.m_bag_dict.keys;
        var values = bag.m_bag_dict.values;
        for (var i = 0; i < keys.length; i++) {
            var cfg_item = Template.item.get(keys[i]);
            if (!cfg_item) {
                continue;
            }
            if (cfg_item.iType == ItemType.Gift || cfg_item.iType == ItemType.SimpleGift || cfg_item.iType == ItemType.RandomGift) {
                if (values[i] > 0) {
                    this.als.update(E_BAG_ALARM_TYPE.GIFT, true);
                    this.onUpdate_Any();
                    return;
                }
            }
        }
        this.als.update(E_BAG_ALARM_TYPE.GIFT, false);
        this.onUpdate_Any();
    };
    return BagAlarm;
}());
__reflect(BagAlarm.prototype, "BagAlarm");
//# sourceMappingURL=BagAlarm.js.map