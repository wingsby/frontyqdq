var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var EquipManager = (function () {
    function EquipManager() {
    }
    /**
     * 获取最高强化等级
     * @returns {number}
     */
    EquipManager.prototype.getMaxStrengthLv = function () {
        return (Template.equipup.size() - 1);
    };
    /**
     * 获取当前可达到的最高强化等级
     * @returns {number}
     */
    EquipManager.prototype.getCurMaxStrengthLv = function () {
        var team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
        return team_lv * 2;
    };
    /**
     * 获取最高精炼等级
     * @returns {number}
     */
    EquipManager.prototype.getMaxRefineLv = function () {
        return Template.config.RefineMax;
    };
    // region 消息处理
    /**
     * 请求合成装备
     * @param equip_id
     */
    EquipManager.prototype.onReqCompose = function (item_id, callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.equip_id = item_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_COMPOSE, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                Singleton.Get(LayerManager).getView(ui.BagBaseView).refresh();
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_56"), 0, 0, 0, rec_msg.body.role_equip.bag_items);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求穿戴/更换装备
     * @param role_id
     * @param equip_id
     */
    EquipManager.prototype.onReqChange = function (role_id, equip_id) {
        var role_mgr = Singleton.Get(RoleManager);
        role_mgr.engraveRole(role_id);
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        send_msg.body.role_equip.equip_id = equip_id;
        send_msg.body.role_equip.pos = Template.equip.get(equip_id).Position;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_CHANGE, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                role_mgr.releaseFighting(role_id);
                Singleton.Get(LayerManager).getView(ui.RoleLevelupView).refresh();
                Singleton.Get(LayerManager).getView(ui.RoleLevelupView).onAlarm();
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_EQUIP_CNT);
            }
        }, true);
    };
    /**
     * 请求一键装备
     * @param role_id
     */
    EquipManager.prototype.onReqChangeAuto = function (role_id, callback, thisObj) {
        var role_mgr = Singleton.Get(RoleManager);
        role_mgr.engraveRole(role_id);
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_CHANGE_AUTO, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                role_mgr.releaseFighting(role_id);
                Singleton.Get(LayerManager).getView(ui.RoleLevelupView).refresh();
                Singleton.Get(LayerManager).getView(ui.RoleLevelupView).onAlarm();
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_EQUIP_CNT);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求卸下装备
     * @param role_id
     * @param pos
     */
    EquipManager.prototype.onReqUnload = function (role_id, pos) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        send_msg.body.role_equip.pos = pos;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_UNLOAD, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                Singleton.Get(LayerManager).getView(ui.RoleLevelupView).refresh();
                Singleton.Get(LayerManager).getView(ui.RoleLevelupView).onAlarm();
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
            }
        }, true);
    };
    /**
     * 请求强化
     * @param role_id
     * @param pos
     */
    EquipManager.prototype.onReqStrength = function (role_id, pos, callback, thisObj) {
        var role_mgr = Singleton.Get(RoleManager);
        role_mgr.engraveRole(role_id);
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        send_msg.body.role_equip.pos = pos;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_STRENGTH, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                role_mgr.releaseFighting(role_id);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.EQUIP_STR);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_EQUIP_STR);
                Singleton.Get(LayerManager).getView(ui.RoleEquipStrengthView).refresh(false);
                Singleton.Get(LayerManager).getView(ui.RoleEquipStrengthView).playEffect(false);
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).onAlarmEquip();
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求一键强化
     * @param role_id
     */
    EquipManager.prototype.onReqStrengthAuto = function (role_id) {
        var role_mgr = Singleton.Get(RoleManager);
        role_mgr.engraveRole(role_id);
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_STRENGTH_AUTO, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                role_mgr.releaseFighting(role_id);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.EQUIP_STR);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_EQUIP_STR);
                Singleton.Get(LayerManager).getView(ui.RoleEquipStrengthView).refresh(false);
                Singleton.Get(LayerManager).getView(ui.RoleEquipStrengthView).playEffect(true, rec_msg.body.role_equip.pos_ex);
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).onAlarmEquip();
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
            }
        }, true);
    };
    /**
     * 请求精炼
     * @param equip_id
     */
    EquipManager.prototype.onReqRefine = function (role_id, pos) {
        var role_mgr = Singleton.Get(RoleManager);
        role_mgr.engraveRole(role_id);
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        send_msg.body.role_equip.pos = pos;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_REFINE, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                role_mgr.releaseFighting(role_id);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.EQUIP_REFINE);
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_EQUIP_REFINE);
                Singleton.Get(LayerManager).getView(ui.RoleEquipRefineView).refresh(false);
                Singleton.Get(LayerManager).getView(ui.RoleEquipRefineView).playEffect();
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).onAlarmEquip();
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).refreshAlarmSecoundary();
            }
        }, true);
    };
    /**
     * 请求分解装备
     * @param equips
     */
    EquipManager.prototype.onReqResolve = function (equips, callback, thisObj) {
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.equips = equips;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_RESOLVE, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                // 扣掉已分解装备
                var bag_mgr = Singleton.Get(BagManager);
                for (var i = 0; i < equips.length; i++) {
                    var equip_id = equips[i];
                    bag_mgr.setEquipCount(equip_id, bag_mgr.getEquipCount(equip_id) - 1);
                    var equip_entity = Template.equip.get(equip_id);
                    Singleton.Get(DialogControler).showAlertItem(Template.config.ResolveItem, equip_entity.Resolve); // 弹出获得锻造石提示
                }
                // 清空待分解装备列表
                bag_mgr.m_resolve_equips = [];
                bag_mgr.updateEquipFullNotify();
                Singleton.Get(LayerManager).getView(ui.BagBaseView).refresh();
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    // endregion
    // region 装备附魔
    /**
     * 请求提升附魔等级
     * @param role_id
     * @param pos
     * @param callback
     * @param thisObj
     */
    EquipManager.prototype.onReqEnchantLv = function (role_id, pos, callback, thisObj) {
        var role_mgr = Singleton.Get(RoleManager);
        role_mgr.engraveRole(role_id);
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        send_msg.body.role_equip.pos = pos;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_ENCHANT_LV, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                role_mgr.releaseFighting(role_id);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ENCHANT_ROLE);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求一键附魔（一键提升附魔等级至最大）
     * @param role_id
     * @param pos
     * @param callback
     * @param thisObj
     */
    EquipManager.prototype.onReqEnchantOneKey = function (role_id, pos, callback, thisObj) {
        var role_mgr = Singleton.Get(RoleManager);
        role_mgr.engraveRole(role_id);
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        send_msg.body.role_equip.pos = pos;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_ENCHANT_ONE_KEY, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                role_mgr.releaseFighting(role_id);
                // 任务：注册任务更新
                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ENCHANT_ROLE);
            }
            if (callback) {
                callback.call(thisObj, rec_msg.body.role_equip.success);
            }
        }, true);
    };
    /**
     * 请求附魔突破
     * @param role_id
     * @param pos
     * @param callback
     * @param thisObj
     */
    EquipManager.prototype.onReqEnchantBreach = function (role_id, pos, callback, thisObj) {
        var role_mgr = Singleton.Get(RoleManager);
        role_mgr.engraveRole(role_id);
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        send_msg.body.role_equip.pos = pos;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_ENCHANT_BREACH, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                role_mgr.releaseFighting(role_id);
                var role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
                role.getEquipByPos(pos).eht_breach += 1;
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求附魔钻石突破
     * @param role_id
     * @param pos
     * @param callback
     * @param thisObj
     */
    EquipManager.prototype.onReqEnchantBreachDmd = function (role_id, pos, callback, thisObj) {
        var role_mgr = Singleton.Get(RoleManager);
        role_mgr.engraveRole(role_id);
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        send_msg.body.role_equip.pos = pos;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_ENCHANT_BREACH_DMD, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                role_mgr.releaseFighting(role_id);
                var role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
                role.getEquipByPos(pos).eht_breach += 1;
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求洗练附魔属性
     * @param role_id
     * @param pos
     * @param callback
     * @param thisObj
     */
    EquipManager.prototype.onReqEnchantWash = function (role_id, pos, callback, thisObj) {
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        send_msg.body.role_equip.pos = pos;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_ENCHANT_WASH, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                console.log("EQUIP_ENCHANT_WASH");
                console.log(rec_msg.body);
                var role = Singleton.Get(RoleManager).getRolesInfo();
                var my_role = role.GetRole(role_id);
                var my_equip = my_role.getEquipByPos(pos);
                if (rec_msg.body.role_equip.eht_temp) {
                    my_equip.eht_temp = rec_msg.body.role_equip.eht_temp;
                }
                else {
                    my_equip.eht_temp = [0, 0];
                }
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求确认改变附魔属性
     * @param role_id
     * @param pos
     * @param callback
     * @param thisObj
     */
    EquipManager.prototype.onReqEnchantChange = function (role_id, pos, callback, thisObj) {
        var role_mgr = Singleton.Get(RoleManager);
        role_mgr.engraveRole(role_id);
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        send_msg.body.role_equip.pos = pos;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_ENCHANT_CHANGE, send_msg, this, function (rec_msg) {
            if (!rec_msg.body.role_equip)
                return;
            if (rec_msg.body.role_equip.success) {
                console.log("EQUIP_ENCHANT_CHANGE");
                console.log(rec_msg.body);
                role_mgr.releaseFighting(role_id);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    EquipManager.prototype.onReqExchange = function (role_id, target_id, callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.role_equip = new msg.RoleEquipMsg();
        send_msg.body.role_equip.role_id = role_id;
        send_msg.body.role_equip.target_id = target_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.EQUIP_EXCHANGE_LV, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.role_equip;
            if (rec && rec.success) {
                if (callback != undefined) {
                    callback.call(thisObj);
                }
            }
        }, false);
    };
    EquipManager.prototype.onReqEnchantChangeConst = function (role_id, pos, item_id, target_id) {
        return __awaiter(this, void 0, void 0, function () {
            var send, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.role_equip = new msg.RoleEquipMsg();
                        send.body.role_equip.role_id = role_id;
                        send.body.role_equip.pos = pos;
                        send.body.role_equip.item_id = item_id;
                        send.body.role_equip.target_id = target_id;
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.EQUIP_ENCHANT_CHANGE_CONST, true, send)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "role_equip"])];
                    case 2:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 响应通知红点更新
     */
    EquipManager.prototype.onNotifyAlarm = function () {
        this.alarm_roles_upable = new Dictionary();
        this.alarm_roles_better = new Dictionary();
        var roles = Singleton.Get(RoleManager).getRolesInfo().roles;
        for (var i = 0; i < roles.length; i++) {
            this.alarm_roles_upable.add(roles[i].role_id, roles[i].checkEquipUpAble());
            this.alarm_roles_better.add(roles[i].role_id, roles[i].checkHasBetterEquip());
        }
        Singleton.Get(RoleManager).getRolesInfo().updateAlarm();
        Singleton.Get(RoleManager).getRolesInfo().updateAlarmList();
    };
    /**
     * 检查某个角色（或所有角色）是否有可成长装备
     * @param role_id 为0则计算所有角色
     */
    EquipManager.prototype.checkAlarmRoleEquipUp = function (role_id) {
        var _this = this;
        if (role_id === void 0) { role_id = 0; }
        if (role_id > 0) {
            this.alarm_roles_upable.foreachKey(function (role_id) {
                if (_this.alarm_roles_upable.get(role_id)) {
                    return;
                }
            }, this);
            return false;
        }
        return this.alarm_roles_upable.get(role_id);
    };
    /**
     * 检查某个角色（或所有角色）是否有更好的装备可以穿戴
     * @param role_id
     */
    EquipManager.prototype.checkAlarmRoleBetterEquip = function (role_id) {
        var _this = this;
        if (role_id === void 0) { role_id = 0; }
        if (role_id > 0) {
            this.alarm_roles_better.foreachKey(function (role_id) {
                if (_this.alarm_roles_better.get(role_id)) {
                    return;
                }
            }, this);
            return false;
        }
        return this.alarm_roles_better.get(role_id);
    };
    return EquipManager;
}());
__reflect(EquipManager.prototype, "EquipManager");
//# sourceMappingURL=EquipManager.js.map