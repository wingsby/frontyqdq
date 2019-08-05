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
var ActivityManager = (function () {
    /**
     * @constructor
     */
    function ActivityManager() {
        this.is_game_loaded = false;
        // endregion
        // region 累计充值
        /**
         * 延迟请求累计充值基本信息
         */
        this.last_time_acc_rmb = 0;
        // endregion  
        // region 累计消费
        /**
         * 延迟请求累计消费基本信息
         */
        this.last_time_acc_spend = 0;
        // endregion
        // region 日充值
        /**
         * 延迟请求日充值基本信息
         */
        this.last_time_day_pay = 0;
        /**
         * 延迟请求累计在线基本信息
         */
        this.last_time_duration = 0;
        this.data = new PlayerActivityInfo();
        this.alarm = new ActivityAlarm();
    }
    /**
     * 响应游戏载入完成
     */
    ActivityManager.prototype.onGameLoaded = function () {
        // 注册每日00：01计划任务
        Singleton.Get(Schedule).register(this, UtilsGame.getRandomInt(0, 1000 * 30 * 1));
        // 请求首次获取信息
        this.reqInfoDelay_AccRmb();
        this.reqInfo_Seven();
        this.reqInfo_LimitSeven();
        this.reqInfo_LvGrow();
        this.reqInfo_GkGrow();
        this.reqInfo_Invest();
        this.reqInfo_CheckIn();
        this.reqInfo_Gift();
        this.reqInfoDelay_AccSpend();
        this.reqInfoDelay_DayPay();
        this.updateInfo_Duration();
        this.reqInfo_DmdPlate();
        this.reqInfo_VipBenefit();
        this.reqInfo_VipWeekly();
        this.reqInfo_RoleInvest();
        this.reqInfo_EnchantInvest();
        this.reqInfo_JewelryInvest();
        this.reqInfo_ExRole();
        // 注册特殊日程
        Singleton.Get(ActDayPayChecker).regSchedule(Template.config.RTime * 60 * 60 * 1000 + UtilsGame.getRandomInt(0, 1000 * 60 * 1));
        // 设定活动图标激活状态
        Singleton.Get(LayerManager).getView(ui.MainView).menu1.setActActive(true);
        Singleton.Get(LayerManager).getView(ui.MainView).menu1.setActExActive(true);
        // 设定红点初始状态
        this.is_game_loaded = true;
        this.refreshActive();
        /**
         console.log("cur time: " + UtilsGame.dateToStr(UtilsGame.Now()) + "(" + UtilsGame.Now() + ")");
         console.log("Validating New-Server Activities: " + UtilsGame.dateToStr(UtilsGame.getServerStart()) + "(" + UtilsGame.getServerStart() + ")");
         for (let i = 0; i < Template.beginActivity.values.length; i++) {
            const act_id: number = Template.beginActivity.keys[i];
            console.log("[New-Server Activities: " + act_id + "] " + ActivityUtil.isActOpen(act_id).open + " 开启：" + UtilsGame.dateToStr(ActivityUtil.getActStartTime(act_id, E_ACT_TYPE.BEGIN)) + ", 结束：" + UtilsGame.dateToStr(ActivityUtil.getActEndTime(act_id, E_ACT_TYPE.BEGIN)));
        }

         for (let i = 0; i < Template.basicActivity.values.length; i++) {
            const act_id: number = Template.basicActivity.keys[i];
            console.log("[Normal Activities: " + act_id + "] " + ActivityUtil.isActOpen(act_id).open + " 开启：" + UtilsGame.dateToStr(ActivityUtil.getActStartTime(act_id, E_ACT_TYPE.BASIC)) + ", 结束：" + UtilsGame.dateToStr(ActivityUtil.getActEndTime(act_id, E_ACT_TYPE.BASIC)));
        }
         */
    };
    /**
     * 响应每日刷新
     */
    ActivityManager.prototype.onSchedule = function () {
        this.reqInfo_Seven();
        this.reqInfo_LimitSeven();
        this.reqInfo_CheckIn();
        this.reqInfo_Duration();
        this.reqInfo_VipWeekly();
        this.reqInfo_ExRole();
    };
    // region 数据操作
    /**
     * 获取活动数据对象
     */
    ActivityManager.prototype.getInfo = function () {
        return this.data;
    };
    /**
     * 获取通知对象
     * @returns {ActivityAlarm}
     */
    ActivityManager.prototype.getAlarm = function () {
        return this.alarm;
    };
    /**
     * 执行支付回调
     */
    ActivityManager.prototype.onPayExec = function () {
        Singleton.Get(ActivityManager).reqInfo_AccRmb();
        Singleton.Get(ActivityManager).reqInfo_Invest(function () {
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.ActivityView).refresh();
        }, Singleton.Get(ActivityManager));
        Singleton.Get(ActivityManager).reqInfo_DayPay();
    };
    /**
     * 刷新激活状态
     */
    ActivityManager.prototype.refreshActive = function () {
        if (!this.is_game_loaded) {
            return;
        }
        Singleton.Get(LayerManager).getView(ui.MainView).menu1.setActNew(this.getAlarm().hasTypeAlarm(E_ACT_TYPE.BASIC, [E_ACT_DESIGN_TYPE.Seven]));
        Singleton.Get(LayerManager).getView(ui.MainView).menu1.setActExNew(this.getAlarm().hasTypeAlarm(E_ACT_TYPE.BEGIN));
    };
    ActivityManager.prototype.reqInfoDelay_AccRmb = function (callback, thisObj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (UtilsGame.Now() - this.last_time_acc_rmb < DEFINE.ACT_REFRESH_DURATION) {
            if (callback != undefined) {
                callback.call(thisObj, args);
            }
        }
        else {
            this.last_time_acc_rmb = UtilsGame.Now();
            this.reqInfo_AccRmb.apply(this, [callback, thisObj].concat(args));
        }
    };
    /**
     * 请求累计充值基本信息
     */
    ActivityManager.prototype.reqInfo_AccRmb = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_ACC_RMB_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新累计充值数据
                _this.getInfo().update_AccRmb(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求领取累计充值奖励
     */
    ActivityManager.prototype.reqReward_AccRmb = function (id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.reward_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_ACC_RMB_REWARD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新累计充值数据
                _this.getInfo().setRewardReceived_AccRmb(id);
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    // endregion
    // region 7日登入
    /**
     * 请求7日登入基本信息
     */
    ActivityManager.prototype.reqInfo_Seven = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_SEVEN_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新7日登入数据
                _this.getInfo().update_Seven(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求7日登入充值奖励
     */
    ActivityManager.prototype.reqReward_Seven = function (id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.reward_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_SEVEN_REWARD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新7日登入数据
                _this.getInfo().setRewardReceived_Seven(id);
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    // endregion
    // region 限时7日登入
    /**
     * 请求7日登入基本信息
     */
    ActivityManager.prototype.reqInfo_LimitSeven = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_LIMIT_SEVEN_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新限时7日登入数据
                _this.getInfo().update_LimitSeven(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求7日登入充值奖励
     */
    ActivityManager.prototype.reqReward_LimitSeven = function (id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.reward_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_LIMIT_SEVEN_REWARD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新7日登入数据
                _this.getInfo().setRewardReceived_LimitSeven(id);
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    // endregion
    // region 等级成长
    /**
     * 请求等级成长基本信息
     */
    ActivityManager.prototype.reqInfo_LvGrow = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_LV_GROW_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新等级成长数据
                _this.getInfo().update_LvGrow(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求等级成长充值奖励
     */
    ActivityManager.prototype.reqReward_LvGrow = function (id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.reward_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_LV_GROW_REWARD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新等级成长数据
                _this.getInfo().setRewardReceived_LvGrow(id);
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    // endregion
    // region 关卡成长
    /**
     * 请求关卡成长基本信息
     */
    ActivityManager.prototype.reqInfo_GkGrow = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_GK_GROW_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新关卡成长数据
                _this.getInfo().update_GkGrow(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求关卡成长充值奖励
     */
    ActivityManager.prototype.reqReward_GkGrow = function (id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.reward_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_GK_GROW_REWARD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新关卡成长数据
                _this.getInfo().setRewardReceived_GkGrow(id);
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    // endregion
    // region 等级成长
    /**
     * 请求等级成长基本信息
     */
    ActivityManager.prototype.reqInfo_Invest = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_INVEST_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新等级成长数据
                _this.getInfo().update_Invest(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求等级成长充值奖励
     */
    ActivityManager.prototype.reqReward_Invest = function (id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.reward_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_INVEST_REWARD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新等级成长数据
                _this.getInfo().setRewardReceived_Invest(id);
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    // endregion
    // region 签到
    /**
     * 请求签到基本信息
     */
    ActivityManager.prototype.reqInfo_CheckIn = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_CHECK_IN_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新等级成长数据
                _this.getInfo().update_CheckIn(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求进行签到或补签
     */
    ActivityManager.prototype.reqExec_CheckIn = function (remedy, id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.check_in_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_CHECK_IN_EXEC, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新等级成长数据
                _this.getInfo().setCheckIn(id);
                // 更新补签数据
                if (remedy) {
                    _this.getInfo().check_in_re++;
                }
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    /**
     * 请求领取累计签到奖励
     */
    ActivityManager.prototype.reqReward_CheckIn = function (id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.reward_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_CHECK_IN_REWARD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新等级成长数据
                _this.getInfo().setRewardReceived_CheckIn(id);
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    // endregion
    // region 超值礼包
    /**
     * 请求超值礼包基本信息
     */
    ActivityManager.prototype.reqInfo_Gift = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_GIFT_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新超值礼包数据
                _this.getInfo().update_Gift(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求购买超值礼包
     */
    ActivityManager.prototype.reqBuy_Gift = function (id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.gift_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_GIFT_BUY, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新超值礼包数据
                _this.getInfo().setItemBuy_Gift(id);
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    // endregion
    // region 限时超值礼包
    /**
     * 请求限时超值礼包基本信息
     */
    ActivityManager.prototype.reqInfo_LimitGift = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_LIMIT_GIFT_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新限时超值礼包数据
                _this.getInfo().update_LimitGift(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求购买限时超值礼包
     */
    ActivityManager.prototype.reqBuy_LimitGift = function (id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.gift_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_LIMIT_GIFT_BUY, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新限时超值礼包数据
                _this.getInfo().setItemBuy_LimitGift(id);
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    ActivityManager.prototype.reqInfoDelay_AccSpend = function (callback, thisObj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (UtilsGame.Now() - this.last_time_acc_spend < DEFINE.ACT_REFRESH_DURATION) {
            if (callback != undefined) {
                callback.call(thisObj, args);
            }
        }
        else {
            this.last_time_acc_spend = UtilsGame.Now();
            this.reqInfo_AccSpend.apply(this, [callback, thisObj].concat(args));
        }
    };
    /**
     * 请求累计消费基本信息
     */
    ActivityManager.prototype.reqInfo_AccSpend = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_ACC_SPEND_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新累计消费数据
                _this.getInfo().update_AccSpend(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求领取累计消费奖励
     */
    ActivityManager.prototype.reqReward_AccSpend = function (id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.reward_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_ACC_SPEND_REWARD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新累计消费数据
                _this.getInfo().setRewardReceived_AccSpend(id);
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    ActivityManager.prototype.reqInfoDelay_DayPay = function (callback, thisObj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (UtilsGame.Now() - this.last_time_day_pay < DEFINE.ACT_REFRESH_DURATION) {
            if (callback != undefined) {
                callback.call(thisObj, args);
            }
        }
        else {
            this.last_time_day_pay = UtilsGame.Now();
            this.reqInfo_DayPay.apply(this, [callback, thisObj].concat(args));
        }
    };
    /**
     * 请求日充值基本信息
     */
    ActivityManager.prototype.reqInfo_DayPay = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_DAY_PAY_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新日充值数据
                _this.getInfo().update_DayPay(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求领取日充值奖励
     */
    ActivityManager.prototype.reqReward_DayPay = function (id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.reward_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_DAY_PAY_REWARD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新日充值数据
                _this.getInfo().setRewardReceived_DayPay(id);
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    // endregion
    // region 幸运转盘
    /**
     * 请求抽取幸运转盘奖励
     */
    ActivityManager.prototype.reqExec_Turnplate = function (callback, thisObj) {
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_TURN_PLATE_EXEC, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                if (callback != undefined) {
                    callback.call(thisObj, rec.turn_id);
                }
            }
        }, true);
    };
    // endregion
    // region 激活码
    /**
     * 请求使用激活码
     */
    ActivityManager.prototype.reqExec_CDKey = function (cdkey, callback, thisObj) {
        var login_mgr = Singleton.Get(login.LoginDataManager);
        if (!login_mgr || !login_mgr.loginData) {
            return;
        }
        var params = [
            "gid=" + login_mgr.loginData.gid,
            "pid=" + login_mgr.loginData.pid,
            "zid=" + login_mgr.zid,
            "uid=" + Singleton.Get(LoginManager).uid,
            "cdkey=" + cdkey
        ];
        var url = DEFINE.LOGIN_SERVER + NetConst.ACT_CDKEY_USE + "?";
        for (var i = 0; i < params.length; i++) {
            url += params[i] + "&";
        }
        HttpClient.requestUrl(url, this, function (data) {
            var rec = JSON.parse(data);
            if (!rec) {
                return;
            }
            if (rec.rt == msg.MsgCode.SUCCESS) {
                // 兑换成功提示
                Singleton.Get(DialogControler).showInfo(1187);
                Singleton.Get(MailManager).reqCheck();
                if (callback) {
                    callback.call(thisObj);
                }
            }
            else {
                Singleton.Get(DialogControler).showInfo(rec.rt);
            }
        });
    };
    // endregion
    // region 累计在线
    /**
     * 不断更新累计在线基本信息
     */
    ActivityManager.prototype.updateInfo_Duration = function () {
        var _this = this;
        this.reqInfo_Duration(function () {
            Singleton.Get(UpdateTimer).addAndStart(DEFINE.ACT_DURATION_UPDATE, _this.updateInfo_Duration, _this);
        }, this);
    };
    ActivityManager.prototype.reqInfoDelay_Duration = function (callback, thisObj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (UtilsGame.Now() - this.last_time_duration < DEFINE.ACT_REFRESH_DURATION) {
            if (callback != undefined) {
                callback.call(thisObj, args);
            }
        }
        else {
            this.last_time_duration = UtilsGame.Now();
            this.reqInfo_Duration.apply(this, [callback, thisObj].concat(args));
        }
    };
    /**
     * 请求累计在线基本信息
     */
    ActivityManager.prototype.reqInfo_Duration = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_DURATION_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新累计在线数据
                _this.getInfo().update_Duration(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, false);
    };
    /**
     * 请求累计在线奖励
     */
    ActivityManager.prototype.reqReward_Duration = function (id, callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.activity = new msg.ActivityMsg();
        send_msg.body.activity.reward_id = id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_DURATION_REWARD, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                // 更新累计在线数据
                _this.getInfo().setRewardReceived_Duration(id);
                // 提示奖励
                _this.handleReward(rec);
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
            }
        }, true);
    };
    // endregion
    // region 一元夺宝
    /**
     * 请求一元夺宝基本信息
     */
    ActivityManager.prototype.reqInfo_DmdPlate = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_DMD_PLATE_INFO, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                _this.getInfo().update_DmdPlate(rec);
                if (callback != undefined) {
                    callback.call(thisObj);
                }
            }
        }, false);
    };
    /**
     * 请求转动一元夺宝转盘
     */
    ActivityManager.prototype.reqExec_DmdPlate = function (callback, thisObj) {
        var _this = this;
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.ACT_DMD_PLATE_EXEC, send_msg, this, function (rec_msg) {
            var rec = rec_msg.body.activity;
            if (rec && rec.success) {
                if (callback != undefined) {
                    _this.getInfo().setDmdPlateExeced();
                    callback.call(thisObj, rec.turn_id);
                }
            }
        }, true);
    };
    // endregion
    // region VIP福利
    /**
     * 请求VIP福利基本信息
     */
    ActivityManager.prototype.reqInfo_VipBenefit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_VIP_BENEFIT_INFO, false)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().update_VipBenefit(rec);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 请求领取VIP福利礼包
     */
    ActivityManager.prototype.reqExec_VipBenefit = function (callback, thisObj) {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_VIP_BENEFIT_EXEC, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().setVipBenefitExeced();
                        this.handleReward(rec);
                        if (callback) {
                            callback.call(thisObj);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // endregion
    // region VIP周礼包
    /**
     * 请求VIP周礼包基本信息
     */
    ActivityManager.prototype.reqInfo_VipWeekly = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_VIP_WEEKLY_INFO)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().update_VipWeekly(rec);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 请求购买VIP周礼包
     */
    ActivityManager.prototype.reqBuy_VipWeekly = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.activity = new msg.ActivityMsg();
                        send.body.activity.gift_id = id;
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_VIP_WEEKLY_BUY, true, send)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        // 更新礼包数据
                        this.getInfo().setItemBuy_VipWeekly(id);
                        // 提示奖励
                        this.handleReward(rec);
                        return [2 /*return*/];
                }
            });
        });
    };
    // endregion
    // region 斗士投资计划
    /**
     * 请求斗士投资计划基本信息
     */
    ActivityManager.prototype.reqInfo_RoleInvest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_INVEST_ROLE_INFO)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().update_RoleInvest(rec);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 购买斗士投资计划
     */
    ActivityManager.prototype.reqBuy_RoleInvest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_INVEST_ROLE_BUY, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().setBuy_RoleInvest();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 领取斗士投资计划收益
     */
    ActivityManager.prototype.reqReward_RoleInvest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.activity = new msg.ActivityMsg();
                        send.body.activity.reward_id = id;
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_INVEST_ROLE_REWARD, true, send)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().setRewardReceived_RoleInvest(id);
                        this.handleReward(rec);
                        return [2 /*return*/];
                }
            });
        });
    };
    // endregion
    // region 附魔投资计划
    /**
     * 请求附魔投资计划基本信息
     */
    ActivityManager.prototype.reqInfo_EnchantInvest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_INVEST_ENCHANT_INFO)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().update_EnchantInvest(rec);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 购买附魔投资计划
     */
    ActivityManager.prototype.reqBuy_EnchantInvest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_INVEST_ENCHANT_BUY, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().setBuy_EnchantInvest();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 领取附魔投资计划收益
     */
    ActivityManager.prototype.reqReward_EnchantInvest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.activity = new msg.ActivityMsg();
                        send.body.activity.reward_id = id;
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_INVEST_ENCHANT_REWARD, true, send)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().setRewardReceived_EnchantInvest(id);
                        this.handleReward(rec);
                        return [2 /*return*/];
                }
            });
        });
    };
    // endregion
    // region 饰品投资计划
    /**
     * 请求饰品投资计划基本信息
     */
    ActivityManager.prototype.reqInfo_JewelryInvest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_INVEST_JEWELRY_INFO)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().update_JewelryInvest(rec);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 购买饰品投资计划
     */
    ActivityManager.prototype.reqBuy_JewelryInvest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_INVEST_JEWELRY_BUY, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().setBuy_JewelryInvest();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 领取饰品投资计划收益
     */
    ActivityManager.prototype.reqReward_JewelryInvest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.activity = new msg.ActivityMsg();
                        send.body.activity.reward_id = id;
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_INVEST_JEWELRY_REWARD, true, send)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().setRewardReceived_JewelryInvest(id);
                        this.handleReward(rec);
                        return [2 /*return*/];
                }
            });
        });
    };
    // endregion
    // region EX角色乱入活动
    /**
     * 请求EX角色礼包基本信息
     */
    ActivityManager.prototype.reqInfo_ExRole = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_EX_ROLE_INFO)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        this.getInfo().update_ExRole(rec);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 请求购买EX角色礼包
     */
    ActivityManager.prototype.reqBuy_ExRole = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var send, rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        send = new msg.CommonMsg();
                        send.body.activity = new msg.ActivityMsg();
                        send.body.activity.gift_id = id;
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.ACT_EX_ROLE_BUY, true, send)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "activity"])];
                    case 2:
                        rec = _d.sent();
                        // 更新礼包数据
                        this.getInfo().setItemBuy_ExRole(id);
                        // 提示奖励
                        this.handleReward(rec);
                        return [2 /*return*/];
                }
            });
        });
    };
    // endregion
    // region 通用方法
    ActivityManager.prototype.handleReward = function (rec) {
        Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("ui_tower11"), 0, rec.r_gold, rec.r_diamond, rec.r_items);
    };
    return ActivityManager;
}());
__reflect(ActivityManager.prototype, "ActivityManager", ["ISchedule"]);
//# sourceMappingURL=ActivityManager.js.map