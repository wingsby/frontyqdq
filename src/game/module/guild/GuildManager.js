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
var GuildManager = (function () {
    function GuildManager() {
        /**
         * 懒惰请求个人公会信息
         */
        this.m_last_info = 0;
        /**
         * 懒惰请求可申请和已申请公会列表
         */
        this.m_last_req_intended = 0;
        /**
         * 懒惰请求公会成员列表
         */
        this.m_last_member_refresh = 0;
        /**
         * 懒惰请求入会申请列表
         */
        this.m_last_hr_refresh = 0;
        this.m_info = new PlayerGuildInfo();
        this.m_guild_info = new GuildInfo();
    }
    GuildManager.prototype.onGameLoaded = function () {
        var _this = this;
        this.m_info.gd_id = Singleton.Get(LoginManager).loginInfo.guild_id;
        this.reqInfo(function () {
            if (_this.m_info.hasGuild()) {
                var mgr_gw_1 = Singleton.Get(GuildWarManager);
                mgr_gw_1.reqInfo(function () {
                    mgr_gw_1.reqMyself();
                }, mgr_gw_1);
            }
        }, this);
    };
    GuildManager.prototype.getMyGuild = function () {
        return this.m_guild_info;
    };
    GuildManager.prototype.getInfo = function () {
        return this.m_info;
    };
    GuildManager.prototype.reqInfoLazy = function (verbose, callback, thisObj) {
        var dura = 2000;
        var delta = UtilsGame.Now() - this.m_last_info;
        if (delta < dura) {
            if (verbose) {
                Singleton.Get(DialogControler).showInfo(1172, this, undefined, undefined, ((dura - delta) / 1000 >> 0) + 1);
            }
            if (callback) {
                callback.call(thisObj);
            }
        }
        else {
            this.reqInfo(callback, thisObj, true);
        }
    };
    /**
     * 获取公会基本信息
     */
    GuildManager.prototype.reqInfo = function (callback, thisObj, sync) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        this.m_last_info = UtilsGame.Now();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                // 更新公会信息
                _this.getInfo().updateData(rec.my_info);
                _this.getMyGuild().updateData(rec.g_info);
                // 无工会时清空公会聊天
                if (!_this.getInfo().hasGuild()) {
                    Singleton.Get(LayerManager).getView(ui.ChatView).cleanGuild();
                }
                if (callback != undefined) {
                    callback.call(thisObj);
                }
            }
        }, sync);
    };
    /**
     * 请求创建公会
     */
    GuildManager.prototype.reqCreate = function (name, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild = new msg.GuildMsg();
        send_msg.body.guild.name = name;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_CREATE, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.reqInfo(callback, thisObj);
            }
        }, true);
    };
    GuildManager.prototype.reqInfoListIntededLazy = function (verbose, callback, thisObj) {
        if (this.getInfo().hasAppliesData()) {
            var dura = 2000;
            var delta = UtilsGame.Now() - this.m_last_req_intended;
            if (delta < dura) {
                if (verbose) {
                    Singleton.Get(DialogControler).showInfo(1172, this, undefined, undefined, ((dura - delta) / 1000 >> 0) + 1);
                }
                if (callback) {
                    callback.call(thisObj);
                }
            }
            else {
                this.m_last_req_intended = UtilsGame.Now();
                this.reqInfoListIntended(callback, thisObj);
            }
        }
        else {
            this.m_last_req_intended = UtilsGame.Now();
            this.reqInfoListIntended(callback, thisObj);
        }
    };
    /**
     * 获取可申请和已申请的公会列表
     */
    GuildManager.prototype.reqInfoListIntended = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_INFO_LIST_INT, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getInfo().updateApplies(rec);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 发送加入公会申请
     */
    GuildManager.prototype.reqHrApply = function (gid, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild = new msg.GuildMsg();
        send_msg.body.guild.gid = gid;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_HR_APPLY, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getInfo().handleGuildApply(gid);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 撤回加入工会申请
     */
    GuildManager.prototype.reqHrRevoke = function (gid, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild = new msg.GuildMsg();
        send_msg.body.guild.gid = gid;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_HR_REVOKE, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getInfo().handleGuildRevoke(gid);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    GuildManager.prototype.reqInfoMembersLazy = function (verbose, callback, thisObj) {
        var duration = 3000;
        if (this.getMyGuild().hasMembersData()) {
            var delta = UtilsGame.Now() - this.m_last_member_refresh;
            if (delta < duration) {
                if (verbose) {
                    Singleton.Get(DialogControler).showInfo(1172, this, undefined, undefined, ((duration - delta) / 1000 >> 0) + 1);
                }
                if (callback) {
                    callback.call(thisObj);
                }
            }
            else {
                this.m_last_member_refresh = UtilsGame.Now();
                this.reqInfoMembers(callback, thisObj);
            }
        }
        else {
            this.m_last_member_refresh = UtilsGame.Now();
            this.reqInfoMembers(callback, thisObj);
        }
    };
    /**
     * 请求工会成员列表
     */
    GuildManager.prototype.reqInfoMembers = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_INFO_MEMBERS, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getMyGuild().updateMembers(rec.user_list);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    GuildManager.prototype.reqInfoHrListLazy = function (verbose, callback, thisObj) {
        var duration = 2000;
        var delta = UtilsGame.Now() - this.m_last_hr_refresh;
        if (this.getMyGuild().hasAppliesData()) {
            if (delta < duration) {
                if (verbose) {
                    Singleton.Get(DialogControler).showInfo(1172, this, undefined, undefined, ((duration - delta) / 1000 >> 0) + 1);
                }
                if (callback) {
                    callback.call(thisObj);
                }
            }
            else {
                this.m_last_hr_refresh = UtilsGame.Now();
                this.reqHrList(callback, thisObj);
            }
        }
        else {
            this.m_last_hr_refresh = UtilsGame.Now();
            this.reqHrList(callback, thisObj);
        }
    };
    /**
     * 获取入会申请名单
     */
    GuildManager.prototype.reqHrList = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_HR_LIST, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getMyGuild().updateApplies(rec.user_list);
                if (callback) {
                    callback.call(thisObj);
                }
            }
            else {
                console.log("reqHrList() failed");
            }
        }, true);
    };
    /**
     * 批准加入公会
     */
    GuildManager.prototype.reqHrHandle = function (uid, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild = new msg.GuildMsg();
        send_msg.body.guild.uid = uid;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_HR_HANDLE, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                // 操作别人公会后置操作
                _this.onChangeOtherGuild([uid]);
                _this.getMyGuild().removeApply(uid);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 拒绝加入公会
     */
    GuildManager.prototype.reqHrReject = function (uid, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild = new msg.GuildMsg();
        send_msg.body.guild.uid = uid;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_HR_REJECT, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getMyGuild().removeApply(uid);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 一键批准加入公会
     */
    GuildManager.prototype.reqHrHandleAll = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_HR_HANDLE_ALL, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                // 操作别人公会后置操作
                _this.onChangeOtherGuild(rec.uid_list);
                _this.getMyGuild().removeApplies(rec.uid_list);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 一键拒绝加入公会
     */
    GuildManager.prototype.reqHrRejectAll = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_HR_REJECT_ALL, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getMyGuild().removeAllApply();
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求金币捐赠一次
     */
    GuildManager.prototype.reqDntGold = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_DNT_GOLD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getMyGuild().updateExp(rec);
                _this.getInfo().dntGoldOnce();
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, 0, 0, rec.r_items);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求钻石捐赠一次
     */
    GuildManager.prototype.reqDntDmd = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_DNT_DMD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getMyGuild().updateExp(rec);
                _this.getInfo().dntDmdOnce();
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, 0, 0, rec.r_items);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 请求退出公会
     */
    GuildManager.prototype.reqHrExit = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_HR_EXIT, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getInfo().onExitGuild();
                _this.getMyGuild().onExitGuild();
                _this.reqInfo(function () {
                    if (callback) {
                        callback.call(thisObj);
                    }
                }, _this);
            }
        }, true);
    };
    /**
     * 请求解散公会
     */
    GuildManager.prototype.reqDissolve = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild = new msg.GuildMsg();
        send_msg.body.guild.gid = this.getInfo().gd_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_DISSOLVE, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                // 操作别人公会后置操作
                var uids = [];
                if (_this.getMyGuild().members) {
                    for (var i = 0; i < _this.getMyGuild().members.length; i++) {
                        uids.push(_this.getMyGuild().members[i].uid);
                    }
                }
                _this.onChangeOtherGuild(uids);
                _this.getInfo().onExitGuild();
                _this.getMyGuild().onExitGuild();
                _this.reqInfo(function () {
                    if (callback) {
                        callback.call(thisObj);
                    }
                }, _this);
            }
        }, true);
    };
    /**
     * 转让会长
     */
    GuildManager.prototype.reqHrLeaderSet = function (uid, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild = new msg.GuildMsg();
        send_msg.body.guild.uid = uid;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_HR_LEADER_SET, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getMyGuild().setLeader(uid);
                _this.reqInfo(function () {
                    if (callback) {
                        callback.call(thisObj);
                    }
                }, _this);
            }
        }, true);
    };
    /**
     * 设为副会长
     */
    GuildManager.prototype.reqHrRulerSet = function (uid, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild = new msg.GuildMsg();
        send_msg.body.guild.uid = uid;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_HR_RULER_SET, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getMyGuild().addRuler(uid);
                _this.reqInfo(function () {
                    if (callback) {
                        callback.call(thisObj);
                    }
                }, _this);
            }
        }, true);
    };
    /**
     * 撤销副会长
     */
    GuildManager.prototype.reqHrRulerRelieve = function (uid, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild = new msg.GuildMsg();
        send_msg.body.guild.uid = uid;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_HR_RULER_RELIEVE, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getMyGuild().removeRuler(uid);
                _this.reqInfo(function () {
                    if (callback) {
                        callback.call(thisObj);
                    }
                }, _this);
            }
        }, true);
    };
    /**
     * 开除成员
     */
    GuildManager.prototype.reqHrDismiss = function (uid, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild = new msg.GuildMsg();
        send_msg.body.guild.uid = uid;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_HR_DISMISS, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                // 操作别人公会后置操作
                _this.onChangeOtherGuild([uid]);
                _this.getMyGuild().removeMember(uid);
                _this.reqInfo(function () {
                    if (callback) {
                        callback.call(thisObj);
                    }
                }, _this);
            }
        }, true);
    };
    /**
     * 编辑公告
     */
    GuildManager.prototype.reqAnnounce = function (text, callback, thisObj) {
        var _this = this;
        // 过滤文字内容
        var words = UtilsGame.replaceFilter(text);
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild = new msg.GuildMsg();
        send_msg.body.guild.words = words;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_ANNOUNCE, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getMyGuild().updateAnnounce(words);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 搜索公会
     */
    GuildManager.prototype.reqSearch = function (gid, callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.guild = new msg.GuildMsg();
        send_msg.body.guild.gid = gid;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.GUILD_SEARCH, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.guild;
            if (rec && rec.success) {
                _this.getInfo().updateSearch(rec.guild_list);
                if (callback) {
                    callback.call(thisObj);
                }
            }
        }, true);
    };
    /**
     * 改变他人公会后置操作
     */
    GuildManager.prototype.onChangeOtherGuild = function (uids) {
        WsClient.sendChangeGuildOther(uids, this.getInfo().gd_id);
    };
    // region 公会科技
    /**
     * 提升个人公会科技等级
     */
    GuildManager.prototype.reqTechLevelup = function (tech_id) {
        return __awaiter(this, void 0, void 0, function () {
            var send, mgr_pinfo, rec, _a, _b, _c, cur_lv, offset, cfg_tech, str;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.guild = new msg.GuildMsg();
                        send.body.guild.tech_id = tech_id;
                        mgr_pinfo = Singleton.Get(PlayerInfoManager);
                        mgr_pinfo.engrave();
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.GUILD_TECH_LEVELUP, true, send)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "guild"])];
                    case 2:
                        rec = _d.sent();
                        Singleton.Get(RoleManager).getRolesInfo().levelupTech(tech_id);
                        mgr_pinfo.releaseFighting();
                        cur_lv = this.getMyGuild().getTechLv(tech_id);
                        offset = GuildUtil.getTechAttr(tech_id, cur_lv) - GuildUtil.getTechAttr(tech_id, cur_lv - 1);
                        if (offset > 0) {
                            cfg_tech = Template.tech.get(tech_id);
                            if (!cfg_tech) {
                                console.error("no tech: " + tech_id);
                                return [2 /*return*/];
                            }
                            str = UtilsGame.stringHander(Template.getGUIText("ui_tech8"), RoleUtil.GetAttrNameString(cfg_tech.Tech[0]), Common.attrValueHandlerWithPct(offset, cfg_tech.Tech[0]));
                            Singleton.Get(DialogControler).showString_2(str);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 提升公会科技等级上限
     */
    GuildManager.prototype.reqTechUpgrade = function (tech_id, cost) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.guild = new msg.GuildMsg();
                        send.body.guild.tech_id = tech_id;
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.GUILD_TECH_UPGRADE, true, send)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "guild"])];
                    case 2:
                        rec = _d.sent();
                        this.getMyGuild().upgradeTech(tech_id);
                        this.getMyGuild().funds -= cost;
                        Singleton.Get(LayerManager).getView(ui.EffectUpView).open();
                        Singleton.Get(LayerManager).getView(ui.EffectUpView).play(Template.getGUIText("ui_tech9"));
                        return [2 /*return*/];
                }
            });
        });
    };
    return GuildManager;
}());
__reflect(GuildManager.prototype, "GuildManager");
//# sourceMappingURL=GuildManager.js.map