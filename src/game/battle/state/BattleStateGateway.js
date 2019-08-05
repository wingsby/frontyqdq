var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var battle;
(function (battle) {
    /**
     * 战斗状态切换通知代理
     */
    var BattleStateGateway = (function () {
        /**
         * @constructor
         */
        function BattleStateGateway() {
            this.m_cb_list = new Dictionary();
        }
        /**
         * 注册一个切换方法
         * @param type
         * @param callback
         * @param thisObj
         */
        BattleStateGateway.prototype.register = function (from, to, callback, thisObj) {
            // 检查合法性
            if (from == undefined || to == undefined) {
                console.log("can't register BattleStateGateway, from: " + from + ", to: " + to);
                return;
            }
            // 获取来源列表
            var dict = this.m_cb_list.get(from);
            if (!dict) {
                dict = new Dictionary();
                this.m_cb_list.update(from, dict);
            }
            // 记录回调方法
            dict.update(to, {
                callback: callback,
                thisObj: thisObj
            });
        };
        /**
         * 注册一个切换方法列表
         * @param from
         * @param thisObj
         */
        BattleStateGateway.prototype.regList = function (from, list, thisObj) {
            if (!list) {
                return;
            }
            for (var i = 0; i < list.values.length; i++) {
                var to = list.keys[i];
                var callback = list.values[i];
                this.register(from, to, callback, thisObj);
            }
        };
        /**
         * 注册一个切换器
         */
        BattleStateGateway.prototype.regSwitcher = function (switcher) {
            var from = switcher.type;
            var list = switcher.cb_list;
            this.regList(from, list, switcher);
        };
        /**
         * 移除一个切换方法
         * @param type
         */
        BattleStateGateway.prototype.unRegister = function (from, to) {
            // 检查存在性 不存在则直接跳过
            if (!this.cbExist(from, to)) {
                return;
            }
            // 执行移除
            var dict = this.m_cb_list.get(from);
            dict.remove(to);
        };
        /**
         * 检查一个切换方法是否存在
         * @param from
         * @param to
         * @return {boolean}
         */
        BattleStateGateway.prototype.cbExist = function (from, to) {
            // 检查合法性
            if (from == undefined || to == undefined) {
                console.log("can't register BattleStateGateway, from: " + from + ", to: " + to);
                return false;
            }
            // 获取来源列表
            var dict = this.m_cb_list.get(from);
            if (!dict) {
                return false;
            }
            return !(!dict.get(to));
        };
        /**
         * 触发切换
         * @param from
         * @param to
         * @param args
         */
        BattleStateGateway.prototype.callGateway = function (from, to) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            // 检查存在性 不存在则直接跳过
            if (!this.cbExist(from, to)) {
                return false;
            }
            // 检查回调方法体存在性
            var dict = this.m_cb_list.get(from);
            var par = dict.get(to);
            if (!par || !par.callback) {
                console.error("can't callGateway(), from: " + from + ", type: " + to + " is not existed.");
                return false;
            }
            // 回调并返回
            (_a = par.callback).call.apply(_a, [par.thisObj].concat(args));
            return true;
            var _a;
        };
        return BattleStateGateway;
    }());
    battle.BattleStateGateway = BattleStateGateway;
    __reflect(BattleStateGateway.prototype, "battle.BattleStateGateway");
})(battle || (battle = {}));
//# sourceMappingURL=BattleStateGateway.js.map