var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var battle;
(function (battle) {
    var StateAgent = (function () {
        function StateAgent() {
        }
        StateAgent.setBossCountdown = function (elapsedMs, maxMs) {
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.BattleView).setBossCountdown(elapsedMs, maxMs);
        };
        StateAgent.setEnemyHpMax = function (v) {
            StateAgent.enemy_max = v;
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.BattleView).setBossHpMax(v);
            layer.getView(ui.ArenaBattleView).setEnemyHpMax(v);
            if (layer.isViewOnStage(layer.getView(ui.DramaBattleView))) {
                layer.getView(ui.DramaBattleView).setEnemyHpMax(v);
            }
        };
        StateAgent.setEnemyHp = function (cur) {
            StateAgent.enemy_cur = cur;
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.BattleView).setBossHp(cur, this.enemy_max);
            layer.getView(ui.ArenaBattleView).setEnemyHp(cur);
            if (layer.isViewOnStage(layer.getView(ui.DramaBattleView))) {
                layer.getView(ui.DramaBattleView).setEnemyHp(cur);
            }
        };
        StateAgent.setPlayerHpMax = function (v) {
            this.player_max = v;
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.ArenaBattleView).setPlayerHpMax(v);
            if (layer.isViewOnStage(layer.getView(ui.DramaBattleView))) {
                layer.getView(ui.DramaBattleView).setPlayerHpMax(v);
            }
        };
        StateAgent.setPlayerHp = function (cur) {
            this.player_cur = cur;
            var layer = Singleton.Get(LayerManager);
            layer.getView(ui.ArenaBattleView).setPlayerHp(cur);
            if (layer.isViewOnStage(layer.getView(ui.DramaBattleView))) {
                layer.getView(ui.DramaBattleView).setPlayerHp(cur);
            }
        };
        StateAgent.getBossHpPct = function () {
            if (this.enemy_max <= 0) {
                return 0;
            }
            return StateAgent.enemy_cur / StateAgent.enemy_max;
        };
        return StateAgent;
    }());
    StateAgent.enemy_cur = 0;
    StateAgent.enemy_max = 0;
    StateAgent.player_cur = 0;
    StateAgent.player_max = 0;
    battle.StateAgent = StateAgent;
    __reflect(StateAgent.prototype, "battle.StateAgent");
})(battle || (battle = {}));
//# sourceMappingURL=StateAgent.js.map