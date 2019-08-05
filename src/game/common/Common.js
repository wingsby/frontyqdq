var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Common = (function () {
    function Common() {
    }
    /**
     * 道具是否是碎片
     * @param item_type
     */
    Common.isItemFrag = function (item_type) {
        return item_type == ItemType.EquipFragment || item_type == ItemType.RoleFragment;
    };
    /**
     * 获取道具名称颜色
     * @param talent_star
     * @constructor
     */
    Common.getItemNameColor = function (tier) {
        if (tier > 100) {
            tier = tier - 100;
        }
        if (tier < 1 || tier > 6) {
            console.log("Can't get color of item name, wrong tier, talent_star: " + tier);
            return;
        }
        return DEFINE_COLOR.ITEM_NAME[tier - 1];
    };
    /**
     * 获取道具特效名
     * @param tier
     * @returns {any}
     */
    Common.getItemEffName = function (tier) {
        if (tier > 100) {
            tier = tier - 100;
        }
        if (tier < 4 || tier > 6) {
            return "";
        }
        return DEFINE.EFF_ITEM_ICON[tier - 3 - 1];
    };
    /**
     * 获取装备ITEM品质边框背景资源
     * @param tier 道具品质，对应道具表iStar
     * @returns {any}
     */
    Common.getItemTierBgRes = function (tier) {
        if (tier > 100) {
            tier = tier - 100;
            return DEFINE.RES_UI_ROLE_TIER[tier - 1].super;
        }
        if (tier > 6 || tier < 1) {
            console.error(UtilsGame.stringHander("can't fetch itemTierBgRes, tier: $1", tier));
            return undefined;
        }
        return DEFINE.RES_UI_ROLE_TIER[tier - 1].bg;
    };
    /**
     * 获取装备ITEM品质边框背景资源
     * @param tier 道具品质，对应道具表iStar
     * @returns {any}
     */
    Common.getJewTierBgRes = function (tier) {
        switch (tier) {
            case 0:
                return DEFINE.RES_UI_ROLE_TIER[0].bg;
            case 1:
                return DEFINE.RES_UI_ROLE_TIER[1].bg;
            case 2:
                return DEFINE.RES_UI_ROLE_TIER[1].super;
            case 3:
                return DEFINE.RES_UI_ROLE_TIER[2].bg;
            case 4:
                return DEFINE.RES_UI_ROLE_TIER[2].super;
            case 5:
                return DEFINE.RES_UI_ROLE_TIER[3].bg;
            case 6:
                return DEFINE.RES_UI_ROLE_TIER[3].super;
            case 7:
                return DEFINE.RES_UI_ROLE_TIER[4].bg;
            case 8:
                return DEFINE.RES_UI_ROLE_TIER[4].super;
            case 9:
                return DEFINE.RES_UI_ROLE_TIER[5].bg;
            case 10:
                return DEFINE.RES_UI_ROLE_TIER[5].super;
            default:
                return DEFINE.RES_UI_ROLE_TIER[0].bg;
        }
    };
    /**
     * 获取副本品质资源
     * @param tier
     * @returns {any}
     */
    Common.getInstanceTierRes = function (tier) {
        if (tier > 6 || tier < 1) {
            console.error(UtilsGame.stringHander("Can't fetch InstanceTierRes, tier: $1", tier));
            return DEFINE.RES_UI_INS_TIER[0].hl;
        }
        return DEFINE.RES_UI_INS_TIER[tier - 1].hl;
    };
    /**
     * 获取角色品质边框背景资源（旧：根据角色资质）
     * @param tier 角色品质，对应角色资质表Star
     * @returns {any}
     */
    Common.getRoleTierBgRes = function (tier) {
        if (tier > 6 || tier < 1) {
            console.error(UtilsGame.stringHander("Can't fetch RoleTierBgRes, tier: $1", tier));
            return undefined;
        }
        return DEFINE.RES_UI_ROLE_TIER[tier - 1].bg;
    };
    /**
     * 获取角色品质边框角标资源（旧：根据角色资质）
     * @param tier 角色品质，对应角色资质表Star
     * @returns {any}
     */
    Common.getRoleTierSubRes = function (tier) {
        if (tier > 6 || tier < 1) {
            console.error(UtilsGame.stringHander("Can't fetch RoleTierSubRes, tier: $1", tier));
            return undefined;
        }
        return DEFINE.RES_UI_ROLE_TIER[tier - 1].sub;
    };
    /**
     * 获取角色品质边框背景资源
     * @param tier 角色品质，对应角色资质表Star
     * @returns {any}
     */
    Common.getRoleTierBgResEx = function (tier) {
        if (tier > 4 || tier < 1) {
            console.error(UtilsGame.stringHander("Can't fetch RoleTierBgResEx, tier: $1", tier));
            return undefined;
        }
        return DEFINE.RES_UI_ROLE_TIER_EX[tier - 1].bg;
    };
    /**
     * 获取角色品质边框角标资源
     * @param tier 角色品质，对应角色资质表Star
     * @returns {any}
     */
    Common.getRoleTierSubResEx = function (tier) {
        if (tier > 4 || tier < 1) {
            console.error(UtilsGame.stringHander("Can't fetch RoleTierSubResEx, tier: $1", tier));
            return undefined;
        }
        return DEFINE.RES_UI_ROLE_TIER_EX[tier - 1].sub;
    };
    /**
     * 获取角色卡牌边框资源
     * @param tier
     * @returns {any}
     */
    Common.getRoleTierCardBorderRes = function (tier) {
        /**
        if (tier > 10 || tier < 1) {
            console.error(UtilsGame.stringHander("Can't fetch RoleTierCardBorderRes, tier: $1", tier));
            return undefined;
        }

        return DEFINE.RES_UI_ROLE_CARD[tier - 1];
         */
        var talent = Template.talent.get(tier);
        if (talent == null) {
            console.error(UtilsGame.stringHander("Can't fetch RoleTierCardBorderRes, tier: $1", tier));
            return undefined;
        }
        return talent.TalentFrame;
    };
    /**
     * 获取角色卡牌边框资源
     * @param tier
     * @returns {any}
     */
    Common.getRoleTierCardBorderResEx = function (tier) {
        if (tier > 4 || tier < 1) {
            console.error(UtilsGame.stringHander("Can't fetch RoleTierCardBorderResEx, tier: $1", tier));
            return undefined;
        }
        return DEFINE.RES_UI_ROLE_TIER_EX[tier - 1].card;
    };
    /**
     * 获取对应勾玉数量的资源
     * @param count 勾玉数量
     */
    Common.getRoleTamaRes = function (count) {
        if (count < 0 || count > 6) {
            console.error("Can't fetch RoleTamaRes, count: " + count);
            return undefined;
        }
        return DEFINE.RES_UI_ROLE_TAMA[count];
    };
    /**
     * 填充斗士卡牌
     * @param role_id
     * @param view
     * @returns {boolean}
     */
    Common.fillRoleCard = function (role_id, view) {
        var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
        if (my_role == null) {
            console.error("can't fillRoleCard, because of player no role, roleId: " + role_id);
            return;
        }
        var role_info = Template.role.get(role_id);
        var my_awaken = Template.awaken.get(my_role.awaken);
        view.role_lv = my_role.lv.toString();
        view.setTama(my_role.getAwakenStar(), my_role.getAwakenActiveStar());
        view.role_breach = my_role.breach.toString();
        view.role_tier = my_role.getTier();
        view.role_fighting = my_role.fighting.toString();
        view.role_name = Template.getGUIText(role_info.Name);
        view.role_res = Common.getCardResByRole(my_role);
    };
    /**
     * 填充斗士卡牌
     * @param role_id
     * @param view
     * @returns {boolean}
     */
    Common.fillRoleCardAnyone = function (role_id, view, roles) {
        var my_role = roles.GetRole(role_id);
        if (my_role == null) {
            console.error("can't fillRoleCardAnyone, because of player no role, roleId: " + role_id);
            return;
        }
        var role_info = Template.role.get(role_id);
        var my_awaken = Template.awaken.get(my_role.awaken);
        view.role_lv = my_role.lv.toString();
        view.setTama(my_role.getAwakenStar(), my_role.getAwakenActiveStar());
        view.role_breach = my_role.breach.toString();
        view.role_tier = my_role.getTier();
        view.role_fighting = my_role.fighting.toString();
        view.role_name = Template.getGUIText(role_info.Name);
        view.role_res = Common.getCardResByRole(my_role);
    };
    /**
     * 填充未获得的斗士卡牌
     * @param role_id
     * @param view
     * @returns {boolean}
     */
    Common.fillRoleCardLocked = function (role_id, view) {
        var my_role = new RoleInfo();
        my_role.InitByRoleConfigIdAndLv(role_id, 1);
        var role_info = Template.role.get(role_id);
        var my_awaken = Template.awaken.get(my_role.awaken);
        view.role_lv = my_role.lv.toString();
        view.setTama(my_role.getAwakenStar(), my_role.getAwakenActiveStar());
        view.role_breach = my_role.breach.toString();
        view.role_tier = my_role.getTier();
        view.role_fighting = my_role.fighting.toString();
        view.role_name = Template.getGUIText(role_info.Name);
        view.role_res = Common.getCardResByRole(my_role);
    };
    /**
     * 填充下一阶级斗士卡牌
     * @param role_id
     * @param view
     */
    Common.fillRoleCardNextTalent = function (role_id, view) {
        var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
        if (my_role == null) {
            console.error("can't fillRoleCardNextTalent, because of player no role, roleId: " + role_id);
            return;
        }
        var next_talent = my_role.GetNextTalentLevelAttrDeltaList();
        if (next_talent == null) {
            console.error("Talent has been max.");
            return;
        }
        var role_info = Template.role.get(role_id);
        var my_awaken = Template.awaken.get(my_role.awaken);
        view.role_lv = my_role.lv.toString();
        view.setTama(my_role.getAwakenStar(), my_role.getAwakenActiveStar());
        view.role_breach = my_role.breach.toString();
        view.role_tier = my_role.getTier();
        view.role_fighting = (my_role.fighting + next_talent[5]).toString();
        view.role_name = Template.getGUIText(role_info.Name);
        view.role_res = Common.getCardResByRole(my_role);
    };
    /**
     * 填充下一觉醒等级斗士卡牌
     * @param role_id
     * @param view
     */
    Common.fillRoleCardNextAwaken = function (role_id, view) {
        var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
        if (my_role == null) {
            console.error("can't fillRoleCard, because of player no role, roleId: " + role_id);
            return;
        }
        var next_talent = my_role.GetNextTalentLevelAttrDeltaList();
        if (next_talent == null) {
            console.error("Awaken has benn max.");
            return;
        }
        var role_info = Template.role.get(role_id);
        var my_awaken = Template.awaken.get(my_role.awaken);
        view.role_lv = my_role.lv.toString();
        view.setTama(my_role.getAwakenStar(), my_role.getAwakenActiveStar());
        view.role_breach = my_role.breach.toString();
        view.role_tier = my_role.getTier();
        view.role_fighting = (my_role.fighting + next_talent[5]).toString();
        view.role_name = Template.getGUIText(role_info.Name);
        view.role_res = Common.getCardResByRole(my_role, true);
    };
    /**
     * 填充斗士头像
     * @param role_id
     * @param view
     */
    Common.fillRoleAvatar = function (role_id, view) {
        var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
        var role_info = Template.role.get(role_id);
        if (role_info == null) {
            console.error("can't fillRoleAvatar, roleId: " + role_id);
            return;
        }
        view.role_head = role_info.Icon;
        if (my_role != null) {
            // 等级
            view.role_lv = my_role.lv.toString();
            // 勾玉
            var awaken_info = Template.awaken.get(my_role.awaken);
            if (awaken_info == null) {
                console.error("no awaken cfg, roleId: " + role_id + ", awakenId: " + my_role.awaken);
                return;
            }
            view.setTama(my_role.getAwakenStar(), my_role.getAwakenActiveStar());
            // 资质
            var talent_info = Template.talent.get(my_role.talent);
            if (talent_info == null) {
                console.error("no talent cfg, roleId: " + role_id + ", talentId: " + my_role.talent);
                return;
            }
            view.role_tier = my_role.getTier();
        }
        else {
            // 等级
            view.role_lv = "1";
            // 勾玉
            var awaken_info = Template.awaken.get(role_info.AwakenID);
            if (awaken_info == null) {
                console.error("no awaken cfg, roleId: " + role_id + ", awakenId: " + role_info.AwakenID);
                return;
            }
            view.setTama(awaken_info.AwakenStar, 0);
            // 资质
            view.role_tier = role_info.Star;
        }
    };
    /**
     * 获取角色卡牌资源
     * @param my_role
     * @returns {string}
     */
    Common.getCardResByRole = function (my_role, next) {
        if (next === void 0) { next = false; }
        var role_info = Template.role.get(my_role.role_id);
        return role_info.Resources[Common.getRoleResIdx(my_role, next)];
    };
    /**
     * 获取角色大图资源
     * @param my_role
     * @returns {string}
     */
    Common.getPaintResByRole = function (my_role, next) {
        if (next === void 0) { next = false; }
        var role_info = Template.role.get(my_role.role_id);
        return role_info.Resources2[Common.getRoleResIdx(my_role, next)];
    };
    /**
     * 获取角色资源索引
     * @param my_role
     * @param next
     * @returns {number}
     */
    Common.getRoleResIdx = function (my_role, next) {
        if (next === void 0) { next = false; }
        var role_info = Template.role.get(my_role.role_id);
        var my_awaken_lv = my_role.awaken;
        var res_lv = 0;
        for (var i = 0; i < role_info.RoleCard.length; i++) {
            if (my_awaken_lv >= role_info.RoleCard[i]) {
                res_lv = i;
            }
        }
        if (next) {
            res_lv += 1;
        }
        return res_lv;
    };
    /**
     * 获取装备槽背景资源
     * @param pos 装备槽位置
     * @returns {any}
     */
    Common.getEquipPosRes = function (pos) {
        if (pos <= 0 || pos >= 7) {
            console.error(UtilsGame.stringHander("cant getEquipPosRes, incorrect pos, itemType: $1", pos));
            return undefined;
        }
        return DEFINE.RES_UI_EQUIP_POS[pos - 1];
    };
    /**
     * 获取装备槽名称
     * @param pos 装备槽位置
     * @returns {any}
     */
    Common.getEquipPosWord = function (pos) {
        if (pos <= 0 || pos >= 7) {
            console.error(UtilsGame.stringHander("can't getEquipPosWord, incorrect pos, itemType: $1", pos));
            return undefined;
        }
        return Template.getGUIText(DEFINE.UI_EQUIP_WORD_CONFIG[pos - 1]);
    };
    /**
     * 将数组转换成服务器传来的背包物品信息
     * @param arr
     * @param arr_num
     */
    Common.convArrayToBagItems = function (arr, arr_num) {
        var items = [];
        for (var i = 0; i < arr.length; i++) {
            var it = new msg.SyncBagItem();
            it.id = arr[i];
            it.count = arr_num[i];
            items.push(it);
        }
        return items;
    };
    /**
     * 将服务器传来的背包物品展示信息转化成 {道具id: 道具数量} 格式的字典
     * @param items
     * @returns {any}
     */
    Common.convBagItemsToDict = function (items) {
        // 生成字典
        var result = new Dictionary();
        // 判空
        if (!items) {
            // console.error("can't conv null to BagItemDict");
            return result;
        }
        if (items.length <= 0) {
            return result;
        }
        for (var i = 0; i < items.length; i++) {
            if (!items[i]) {
                continue;
            }
            if (!result.containsKey(items[i].id)) {
                result.add(items[i].id, items[i].count);
            }
            else {
                result.update(items[i].id, result.get(items[i].id) + items[i].count); // 合并同类物品
            }
        }
        return result;
    };
    /**
     * 将服务器传来的背包物品同步信息转化成 {道具id: 道具数量} 格式的字典
     * @param items
     * @returns {any}
     */
    Common.convBagSyncToDict = function (items) {
        // 判空
        if (!items) {
            console.error("cant conv null to bag sync dict");
            return null;
        }
        var result = Common.convObjectToDictNumberNumber(items);
        return result;
    };
    /**
     * 将Object转换为Dictionary<number, number>
     * @param rec_msg
     * @returns {Dictionary<number, number>}
     */
    Common.convObjectToDictNumberNumber = function (rec_msg) {
        var result = new Dictionary();
        if (rec_msg != null) {
            for (var prop in rec_msg) {
                if (prop == "__proto__") {
                    continue;
                }
                result.add(parseInt(prop), rec_msg[prop]);
            }
        }
        return result;
    };
    /**
     * 获取本次（上次）重置时间
     */
    Common.getTodayResetTime = function () {
        var r_time = Template.config.RTime * 60 * 60 * 1000;
        var d = new Date(UtilsGame.Now());
        d.setHours(r_time, 0, 0, 0);
        if (d.getTime() > UtilsGame.Now()) {
            return d.getTime() - 24 * 60 * 60 * 1000;
        }
        else {
            return d.getTime();
        }
    };
    /**
     * 获取下次重置时间
     */
    Common.getNextResetTime = function () {
        return Common.getTodayResetTime() + 24 * 60 * 60 * 1000;
    };
    /**
     * 获取明天某小时整点时间戳
     * @param hour
     * @returns {number}
     */
    Common.getHourTimeNextDay = function (hour) {
        return Common.getHourTimeToday(hour) + 1000 * 60 * 60 * 24;
    };
    /**
     * 获取今天某小时整点时间戳
     */
    Common.getHourTimeToday = function (hour) {
        var d = new Date(UtilsGame.Now());
        d.setHours(hour, 0, 0, 0);
        return d.getTime();
    };
    /**
     * 获取关卡名称
     * @param level_id
     * @returns {string}
     */
    Common.getLevelName = function (level_id) {
        var levelInfo = Template.level.get(level_id);
        if (levelInfo == null) {
            console.error("can't set level info, Incorrect levelId: " + level_id);
            return;
        }
        return Template.getGUIText(levelInfo.Name) + level_id;
    };
    /**
     * 道具排序
     * @param a
     * @param b
     */
    Common.sortItems = function (a, b) {
        var a_info = Template.item.get(a);
        var b_info = Template.item.get(b);
        if (a_info == null || b_info == null) {
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
     * 计算显示用的属性值
     * @param value
     * @param type
     */
    Common.attrValueHandler = function (value, type) {
        var result = "";
        switch (type) {
            case RoleAttrType.Crit_Rate:
            case RoleAttrType.Crit_Damage:
            case RoleAttrType.Crit_Res:
            case RoleAttrType.Damage_Reduce:
                result = UtilsGame.toOptionalFixed(value / 10.0, 1);
                break;
            default:
                result = value.toString();
                break;
        }
        return result;
    };
    /**
     * 计算显示用的属性值
     * @param value
     * @param type
     */
    Common.attrValueHandlerWithPct = function (value, type) {
        var result = "";
        switch (type) {
            case RoleAttrType.Crit_Rate:
            case RoleAttrType.Crit_Damage:
            case RoleAttrType.Crit_Res:
            case RoleAttrType.Damage_Reduce:
                result = UtilsGame.toOptionalFixed(value / 10.0, 1) + "%";
                break;
            default:
                result = value.toFixed(0).toString();
                break;
        }
        return result;
    };
    /**
     * 获取单个勾玉UI资源
     * @param is_ex 是否是彩色勾玉
     * @returns {string|string}
     */
    Common.getTamaSingleRes = function (is_ex) {
        return DEFINE.RES_UI_ROLE_TAMA_SINGLE[is_ex ? 0 : 1];
    };
    /**
     * 播放勾玉动画
     */
    Common.playTamaEffect = function (role_id, tamaEffectObj, active_count) {
        if (active_count === void 0) { active_count = 0; }
        var role_info = Template.role.get(role_id);
        if (role_info == null) {
            console.error("cant play tama animation, roleId: " + role_id);
            return;
        }
        var awaken_info = Template.awaken.get(role_info.AwakenID);
        if (awaken_info == null) {
            console.error("cant play tama animation, roleId: " + role_id);
            return;
        }
        var horizonalCenter = -96;
        switch (awaken_info.AwakenStar) {
            case 3:
                horizonalCenter = -88;
                break;
            case 4:
                horizonalCenter = -82;
                break;
            case 5:
                horizonalCenter = -74;
                break;
        }
        tamaEffectObj.visible = true;
        tamaEffectObj.scaleX = 1;
        tamaEffectObj.scaleY = 1;
        tamaEffectObj.horizontalCenter = 0;
        tamaEffectObj.bottom = 72;
        tamaEffectObj.init(awaken_info.AwakenStar);
        tamaEffectObj.play(active_count, function () {
            var tw_tama_effect = egret.Tween.get(tamaEffectObj);
            tw_tama_effect.wait(416).to({ scaleX: 0.48, scaleY: 0.48, bottom: 338, horizontalCenter: horizonalCenter }, 200);
        }, this);
    };
    Common.playDrawCardEffect = function (role_id, compCard, imgCardBorder, tamaEffectObj, cardBack, active_count) {
        if (active_count === void 0) { active_count = 0; }
        if (cardBack != null) {
            cardBack.visible = true;
            cardBack.alpha = 0;
            var tw_back = egret.Tween.get(cardBack);
            tw_back.to({ alpha: 1 }, 180);
        }
        compCard.alpha = 0;
        compCard.tama_visible = false;
        tamaEffectObj.visible = false;
        var tw_card = egret.Tween.get(compCard);
        tw_card.wait(650).to({ alpha: 1 }, 60).call(function () {
            imgCardBorder.alpha = 1;
            if (cardBack != null)
                cardBack.visible = false;
        }, this).wait(516).call(function () {
            Common.playTamaEffect(role_id, tamaEffectObj, active_count);
        }, this);
    };
    /**
     * 获取角色勾玉资源（New）
     * @param count
     * @param active
     */
    Common.getRoleTamaResEx = function (count, active) {
        var res_id = 0;
        switch (count) {
            case 3:
                res_id = 1 + active;
                break;
            case 4:
                res_id = 5 + active;
                break;
            case 5:
                res_id = 10 + active;
                break;
        }
        return "icon_gouyu" + res_id + "_png";
    };
    /**
     * 获取角色列表中不同数量的勾玉应所在的位置
     * @param tama
     * @returns {number}
     */
    Common.getRoleListTamaHorizontalCenter = function (tama) {
        if (tama == 3) {
            return 16;
        }
        if (tama == 4) {
            return 8;
        }
        return 0;
    };
    /**
     * 获取角色列表中不同数量的勾玉应所在的位置
     * @param tama
     * @returns {number}
     */
    Common.getRoleListTamaLeft = function (tama) {
        if (tama == 3) {
            return 20;
        }
        if (tama == 4) {
            return 13;
        }
        return 0;
    };
    /**
     * 获取角色列表图片资源
     * @param my_role
     * @returns {string}
     */
    Common.getRoleListRes = function (role_id) {
        var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
        var role_info = Template.role.get(role_id);
        var my_awaken_lv = (my_role == null) ? role_info.AwakenID : my_role.awaken;
        var res_lv = 0;
        for (var i = 0; i < role_info.RoleCard.length; i++) {
            if (my_awaken_lv >= role_info.RoleCard[i]) {
                res_lv = i;
            }
        }
        return role_info.Resources1[res_lv] + "_png";
    };
    /**
     * 获取角色列表已锁定角色的图片资源
     * @param role_id
     */
    Common.getRoleListLockedRes = function (role_id) {
        var cfg_role = Template.role.get(role_id);
        if (!cfg_role) {
            console.log("can't get role list locked res, roleId: " + role_id);
            return;
        }
        if (cfg_role.Hidden && cfg_role.Hidden != "0") {
            return cfg_role.Hidden + "_png";
        }
        else {
            return cfg_role.Resources1[0] + "_png";
        }
    };
    /**
     * 获取角色卡牌边框资源
     * @param tier
     * @returns {any}
     */
    Common.getRoleListBorderRes = function (tier) {
        if (tier > 4 || tier < 1) {
            console.error(UtilsGame.stringHander("cant getRoleListBorderRes, tier: $1", tier));
            return undefined;
        }
        return DEFINE.RES_UI_ROLE_TIER_EX[tier - 1].list;
    };
    /**
     * 获取角色卡牌角标资源
     * @param tier
     * @returns {any}
     */
    Common.getRoleListCornerRes = function (tier) {
        return "BK_dslb_" + tier + "_1_png";
    };
    /**
     * 获取一骑当千胜场图标
     * @param idx
     * @param type
     */
    Common.getDuelWinsIcon = function (idx, type) {
        if (idx >= 4 || idx < 0) {
            console.error("Can't get duel wins, wins id: " + idx);
            return;
        }
        if (idx > 2) {
            idx = 2;
        }
        switch (type) {
            case ui.DuelWinsType.Inactive:
                return DEFINE.UI_DUEL_WINS_ICON[idx][0];
            case ui.DuelWinsType.Active:
                return DEFINE.UI_DUEL_WINS_ICON[idx][1];
            case ui.DuelWinsType.Opened:
                return DEFINE.UI_DUEL_WINS_ICON[idx][2];
        }
    };
    /**
     * 获取奖励胜场图标
     * @param idx
     * @param type
     */
    Common.getRewardBoxIcon = function (idx, type) {
        if (idx < 0) {
            console.error("Can't get reward box, id: " + idx);
            return;
        }
        if (idx > 2) {
            idx = 2;
        }
        switch (type) {
            case E_REWARD_STATUS.DISABLE:
                return DEFINE.UI_DUEL_WINS_ICON[idx][0];
            case E_REWARD_STATUS.AVAILABLE:
                return DEFINE.UI_DUEL_WINS_ICON[idx][1];
            case E_REWARD_STATUS.RECEIVED:
                return DEFINE.UI_DUEL_WINS_ICON[idx][2];
        }
    };
    /**
     * 获取一骑当千队伍名
     * @param team_id
     * @returns {string|string|string}
     */
    Common.getDuelTeamName = function (team_id) {
        if (team_id < 0 || team_id > 2) {
            console.error("Can't get duel team name, team id: " + team_id);
            return;
        }
        var team_name = [
            Template.getGUIText("append_267"),
            Template.getGUIText("append_268"),
            Template.getGUIText("append_269"),
        ];
        return team_name[team_id];
    };
    Common.playStackAni = function (btn_back, btn_tabs, callback, thisObj, type) {
        if (type === void 0) { type = 0; }
        var ani_idx = 0;
        if (btn_tabs) {
            var _loop_1 = function (i) {
                var tw_tab = egret.Tween.get(btn_tabs[i]);
                switch (type) {
                    case 0:
                        btn_tabs[i].alpha = 0;
                        btn_tabs[i].scaleY = 0.4;
                        tw_tab.wait(60 * ani_idx).to({ scaleY: 1, alpha: 1 }, 100, egret.Ease.sineIn);
                        break;
                    case 1:
                        btn_tabs[i].alpha = 0;
                        tw_tab.wait(100 * ani_idx).call(function () {
                            UtilsEffect.buttonEffect(btn_tabs[i]);
                        }, this_1).to({ alpha: 1 }, 120, egret.Ease.sineIn);
                        break;
                    case 2:
                        btn_tabs[i].alpha = 0;
                        btn_tabs[i].scaleX = 1.5;
                        btn_tabs[i].scaleY = 1.5;
                        tw_tab.wait(60 * ani_idx).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100, egret.Ease.sineOut);
                        break;
                }
                ani_idx++;
            };
            var this_1 = this;
            for (var i = 0; i < btn_tabs.length; i++) {
                _loop_1(i);
            }
        }
        if (btn_back) {
            btn_back.x = 480;
            var tw_back = egret.Tween.get(btn_back);
            tw_back.wait(60 * ani_idx).to({ x: 414 }, 100, egret.Ease.sineIn).call(function () {
                if (callback) {
                    callback.call(thisObj);
                }
            }, this);
        }
        else {
            if (callback) {
                callback.call(thisObj);
            }
        }
    };
    return Common;
}());
__reflect(Common.prototype, "Common");
//# sourceMappingURL=Common.js.map