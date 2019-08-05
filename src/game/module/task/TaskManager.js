var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TaskManager = (function () {
    /**
     * @constructor
     */
    function TaskManager() {
        this.m_task = undefined;
        this.m_update = undefined;
        this.m_task = new PlayerTaskInfo();
        this.m_update = new TaskUpdateController();
    }
    // region 数据操作
    /**
     * 获取任务信息
     * @returns {PlayerTaskInfo}
     */
    TaskManager.prototype.getTaskInfo = function () {
        return this.m_task;
    };
    /**
     * 获取更新控制器
     * @returns {TaskUpdateController}
     */
    TaskManager.prototype.getUpdateCtrl = function () {
        return this.m_update;
    };
    // endregion
    // region 本地请求
    /**
     * 懒惰请求Info
     * @param callback
     * @param thisObj
     * @param args
     */
    TaskManager.prototype.reqInfoLazy = function (callback, thisObj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 如果已完成且未领取 不再检查
        if (this.getTaskInfo().is_finish) {
            if (callback != undefined) {
                callback.call(thisObj, args);
            }
            return;
        }
        // 如果未初始化 或者 符合需要重新请求的条件 则请求
        if (this.getTaskInfo().getCurTaskType() <= 0 || this.getUpdateCtrl().checkUpdate(this.getTaskInfo().getCurTaskType())) {
            this.reqInfo(callback, thisObj, args);
            return;
        }
        // 默认情况下直接触发回调
        if (callback != undefined) {
            callback.call(thisObj, args);
        }
    };
    /**
     * 注册每次收到Info时的更新函数
     * @param callback
     * @param thisObj
     */
    TaskManager.prototype.regInfoCallback = function (callback, thisObj) {
        this.info_callback = callback;
        this.info_callback_this = thisObj;
    };
    /**
     * 反注册Info回调
     */
    TaskManager.prototype.unRegInfoCallback = function () {
        this.info_callback = undefined;
        this.info_callback_this = undefined;
    };
    /**
     * 注册每次收到Info时的更新函数
     * @param callback
     * @param thisObj
     */
    TaskManager.prototype.regInfoCallback2 = function (callback, thisObj) {
        this.info_callback2 = callback;
        this.info_callback_this2 = thisObj;
    };
    /**
     * 反注册Info回调
     */
    TaskManager.prototype.unRegInfoCallback2 = function () {
        this.info_callback2 = undefined;
        this.info_callback_this2 = undefined;
    };
    /**
     * 触发Info回调
     */
    TaskManager.prototype.callInfoCallback = function () {
        if (this.info_callback != undefined) {
            this.info_callback.call(this.info_callback_this);
        }
        if (this.info_callback2 != undefined) {
            this.info_callback2.call(this.info_callback_this2);
        }
    };
    // endregion
    // region 网络请求
    /**
     * 请求任务基本信息
     * @param callback
     * @param thisObj
     * @param args
     */
    TaskManager.prototype.reqInfo = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.TASK_INFO, send_msg, this, function (rec_msg) {
            var rec_task = rec_msg.body.task;
            if (rec_task == undefined)
                return;
            if (rec_task.success) {
                // 更新消息
                _this.getTaskInfo().updateData(rec_task);
                // 回调
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
                // 更新默认callback
                _this.callInfoCallback();
                // 重置更新计数器
                _this.getUpdateCtrl().resetUpdate();
            }
        });
    };
    /**
     * 请求领取任务奖励（完成任务）
     * @param callback
     * @param thisObj
     * @param args
     */
    TaskManager.prototype.reqReward = function (callback, thisObj) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 构造消息体
        var send_msg = new msg.CommonMsg();
        send_msg.body.task = new msg.TaskMsg();
        send_msg.body.task.cur_id = this.getTaskInfo().cur_id;
        // 发送请求消息
        HttpClient.HandlRequestAsWait(NetConst.TASK_REWARD, send_msg, this, function (rec_msg) {
            var rec_task = rec_msg.body.task;
            if (rec_task == undefined)
                return;
            if (rec_task.success) {
                // 更新消息
                _this.getTaskInfo().updateData(rec_task);
                // 弹出奖励
                Singleton.Get(DialogControler).showAlertReward(Template.getGUIText("append_66"), 0, rec_task.r_gold, rec_task.r_diamond, rec_task.r_items);
                // 回调
                if (callback != undefined) {
                    callback.call(thisObj, args);
                }
                // 更新默认callback
                _this.callInfoCallback();
            }
        }, true);
    };
    return TaskManager;
}());
__reflect(TaskManager.prototype, "TaskManager");
//# sourceMappingURL=TaskManager.js.map