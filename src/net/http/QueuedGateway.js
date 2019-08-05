var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var QueuedGatewayTimer = (function () {
    function QueuedGatewayTimer() {
        this.m_last_tick = 0;
        Singleton.Get(RegisterUpdate).register(this);
    }
    QueuedGatewayTimer.prototype.update = function (time) {
        var now = UtilsGame.Now();
        if (!now) {
            return;
        }
        if (now - this.m_last_tick > 1000) {
            this.m_last_tick = now;
            var queue_active = QueuedGateway.queue_active;
            var battle_param_obj = queue_active.get(QueuedGatewayType.BATTLE);
            if (battle_param_obj) {
                if (battle_param_obj.type == NetConst.PVE_REQ_BATTLE) {
                    if (now - battle_param_obj.start > 10000) {
                        MessageManager.handleDisconnect(328);
                    }
                }
            }
        }
    };
    return QueuedGatewayTimer;
}());
__reflect(QueuedGatewayTimer.prototype, "QueuedGatewayTimer", ["IUpdate"]);
/**
 * 请求队列网关
 */
var QueuedGateway = (function () {
    function QueuedGateway() {
    }
    /**
     * 将请求加入队列
     * @param queue_id 队列类型 同一类型的请求会排队
     * @param type 请求URI
     * @param params 请求参数
     * @param thisObj 回调this对象
     * @param finished 回调函数
     * @param isLock 界面锁开关
     */
    QueuedGateway.addRequest = function (queue_id, type, params, thisObj, finished, isLock) {
        if (isLock === void 0) { isLock = false; }
        // 获取已有队列 没有则创建新队列
        var queue = QueuedGateway.queue.get(queue_id);
        if (!queue) {
            queue = [];
        }
        // 检查现有队列是否存在同类请求 如果存在则放弃追加
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].type == type) {
                console.log("Duplicated request in QueuedGateway." + type);
                return;
            }
        }
        // 构造新的请求参数对象
        var param_obj = {
            unid: UtilsGame.getRandomInt(0, 999999999),
            type: type,
            params: params,
            thisObj: thisObj,
            finished: finished,
            isLock: isLock
        };
        // 更新队列状态
        queue.push(param_obj);
        QueuedGateway.queue.update(queue_id, queue);
        // 初始化检查时钟
        Singleton.Get(QueuedGatewayTimer);
        // 如果只有一条请求 则直接执行
        if (queue.length == 1) {
            QueuedGateway.execRequest(queue_id);
        }
    };
    /**
     * 执行请求
     * @param queue_id 队列类型
     */
    QueuedGateway.execRequest = function (queue_id) {
        var _this = this;
        // 获取已有队列 没有请求则返回
        var queue = QueuedGateway.queue.get(queue_id);
        if (!queue || queue.length <= 0) {
            return;
        }
        // 获取并移除队列首个元素
        var param_obj = queue.shift();
        if (!param_obj) {
            console.log("QueuedGateway param_obj not existed.");
            return;
        }
        // 记录请求开始时间
        param_obj.start = UtilsGame.Now();
        QueuedGateway.queue_active.update(queue_id, param_obj);
        // 发送请求
        HttpClient.HandlRequestAsWait(param_obj.type, param_obj.params, this, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // 清空请求时间
            QueuedGateway.queue_active.update(queue_id, undefined);
            // 执行原始回调
            if (param_obj.finished) {
                (_a = param_obj.finished).call.apply(_a, [param_obj.thisObj].concat(args));
            }
            // 更新队列状态
            QueuedGateway.queue.update(queue_id, queue);
            // 执行下一队列中的请求
            if (queue.length > 0) {
                _this.execRequest(queue_id);
            }
            var _a;
        }, param_obj.isLock);
    };
    return QueuedGateway;
}());
QueuedGateway.queue = new Dictionary();
QueuedGateway.queue_active = new Dictionary();
__reflect(QueuedGateway.prototype, "QueuedGateway");
/**
 * 网关类型
 */
var QueuedGatewayType = (function () {
    function QueuedGatewayType() {
    }
    return QueuedGatewayType;
}());
QueuedGatewayType.BATTLE = "BATTLE";
__reflect(QueuedGatewayType.prototype, "QueuedGatewayType");
//# sourceMappingURL=QueuedGateway.js.map