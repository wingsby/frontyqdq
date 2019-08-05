var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var msg;
(function (msg) {
    /**
     * 玩家信息同步消息
     * Created by WYM on 2016/11/7.
     */
    var SyncPlayerInfoMsg = (function () {
        function SyncPlayerInfoMsg() {
            this.is_refresh = undefined; // 是否刷新（false则下发差异值，true则完全刷新。首次为true，一般为false。）
            this.team_lv = undefined; // 战队等级
            this.gold = undefined; // 金币
            this.diamond = undefined; // 钻石
            this.exp = undefined; // 经验值
            this.team_current_fighting = undefined; // 战力值（不随is_refresh，固定下发全值）
            this.team_history_max_fighting = undefined; // 战队的历史最高战斗力（不随is_refresh，固定下发全值）
            this.vip_level = undefined; // VIP等级（不随is_refresh，固定下发全值）
            this.acc_rmb = 0; // 累计冲的钱数（必定全值）
            this.vip_award = []; // vip奖励（必定全值）
            this.last_gold_time = undefined; // 上一次回复金币购买次数的时间
            this.gold_buy_cnt = undefined; // 当天金币已经购买次数
        }
        return SyncPlayerInfoMsg;
    }());
    msg.SyncPlayerInfoMsg = SyncPlayerInfoMsg;
    __reflect(SyncPlayerInfoMsg.prototype, "msg.SyncPlayerInfoMsg");
})(msg || (msg = {}));
//# sourceMappingURL=SyncPlayerInfoMsg.js.map