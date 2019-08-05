var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DramaBattleSwitcher = (function () {
    function DramaBattleSwitcher() {
        this.type = battle.E_BATTLE_TYPE.DRAMA;
        this.cb_list = new Dictionary();
        this.cb_list.add(battle.E_BATTLE_TYPE.PVE, this.toPve);
        this.cb_list.add(battle.E_BATTLE_TYPE.DRAMA, this.toDrama);
        Singleton.Get(battle.BattleStateGateway).regSwitcher(this);
    }
    DramaBattleSwitcher.prototype.toPve = function () {
        Singleton.Get(PveManager).actBattlePve(false);
    };
    DramaBattleSwitcher.prototype.toDrama = function () {
        Singleton.Get(DramaManager).actDramaBattle(function () {
            Singleton.Get(LayerManager).getView(ui.DramaDialogView).setBg(false);
            Singleton.Get(LayerManager).getView(ui.DramaDialogView).setBlackBg(false);
            var drama_mgr = Singleton.Get(DramaManager);
            drama_mgr.getDialog().begin(E_DIALOG_TYPE.BATTLE, drama_mgr.getFlow().EndBattle, drama_mgr.getFlow());
        }, this);
    };
    return DramaBattleSwitcher;
}());
__reflect(DramaBattleSwitcher.prototype, "DramaBattleSwitcher", ["battle.IBattleSwitcher"]);
//# sourceMappingURL=DramaBattleSwitcher.js.map