var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerWishInfo = (function () {
    function PlayerWishInfo() {
        this.lv = 0; // 当前许愿等级
        this.exp = 0; // 当前许愿经验
        this.stamina = 0; // 当前能量
        this.stamina_rec = 0; // 上次能量恢复时间
        this.role_id = 0; // 当前选择的斗士id
    }
    PlayerWishInfo.prototype.setInfo = function (rec) {
        this.setLvExp(rec.lv, rec.exp);
        this.setStamina(rec.stamina);
        this.stamina_rec = rec.stamina_rec;
        this.setSelRole(rec.role_id);
    };
    PlayerWishInfo.prototype.setLvExp = function (lv, exp, canLevelUp) {
        if (canLevelUp === void 0) { canLevelUp = false; }
        if (lv > this.lv) {
            var cfg_ori = Template.wish.get(this.lv);
            if (cfg_ori) {
                this.stamina += cfg_ori.WishRe;
            }
        }
        this.lv = lv;
        this.exp = exp;
    };
    PlayerWishInfo.prototype.setStamina = function (stamina) {
        this.stamina = stamina;
    };
    PlayerWishInfo.prototype.setSelRole = function (role_id) {
        this.role_id = role_id;
    };
    /**
     * 获取钻石直升一级价格
     */
    PlayerWishInfo.prototype.getOnekeyLvupDiamondPrice = function () {
        var cfg_cur = Template.wish.get(this.lv);
        var cfg_next = Template.wish.get(this.lv + 1);
        if (!cfg_next) {
            return 0;
        }
        var need_exp = cfg_cur.Exp;
        var delta_exp = need_exp - this.exp;
        var final_price = 0;
        while (delta_exp > 0) {
            delta_exp -= Template.config.WishUpExp;
            final_price += Template.config.WishUpNum;
        }
        return final_price;
    };
    /**
     * 获取一键许愿消耗能量
     */
    PlayerWishInfo.prototype.getOnekeyWishStaminaPrice = function () {
        var cfg_role = Template.role.get(this.role_id);
        if (!cfg_role || cfg_role.WishCost <= 0) {
            return 0;
        }
        var cur_stamina = this.stamina;
        var cost_once = cfg_role.WishCost;
        while (cur_stamina >= cost_once) {
            cur_stamina -= cost_once;
        }
        var final_price = this.stamina - cur_stamina;
        if (final_price <= 0) {
            final_price = cost_once;
        }
        return final_price;
    };
    /**
     * 许愿是否有通知提示
     * 条件：许愿能量全满
     */
    PlayerWishInfo.prototype.hasAlarm = function () {
        var cfg_wish = Template.wish.get(this.lv);
        if (!cfg_wish) {
            return false;
        }
        return this.stamina == cfg_wish.WishMax;
    };
    return PlayerWishInfo;
}());
__reflect(PlayerWishInfo.prototype, "PlayerWishInfo");
//# sourceMappingURL=PlayerWishInfo.js.map