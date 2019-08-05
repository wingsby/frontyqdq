var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var E_DIALOG_TYPE;
(function (E_DIALOG_TYPE) {
    E_DIALOG_TYPE[E_DIALOG_TYPE["DRAMA"] = 1] = "DRAMA";
    E_DIALOG_TYPE[E_DIALOG_TYPE["BATTLE"] = 2] = "BATTLE";
    E_DIALOG_TYPE[E_DIALOG_TYPE["BLACK"] = 3] = "BLACK";
})(E_DIALOG_TYPE || (E_DIALOG_TYPE = {}));
var DramaDialogController = (function () {
    /**
     * @constructor
     */
    function DramaDialogController() {
        this.cur_id = 0;
        this.cur_seq = 0;
    }
    /**
     * 进入一段剧情
     * @param type
     */
    DramaDialogController.prototype.begin = function (type, callback, thisObj) {
        this.cb = callback;
        this.cb_this = thisObj;
        var fisrt_id = this.getFirstDialog(type);
        this.cur_id = fisrt_id;
        this.cur_seq = 1;
        Singleton.Get(LayerManager).getView(ui.DramaDialogView).open();
        this.updateView();
    };
    /**
     * 进入下一句对话
     */
    DramaDialogController.prototype.goNext = function () {
        var cfg_dialog_cur = Template.dialogue.get(this.cur_id);
        if (!cfg_dialog_cur) {
            return;
        }
        var cfg_dialog_next = Template.dialogue.get(this.getIdxDialog(cfg_dialog_cur.Type, cfg_dialog_cur.Sequential + 1));
        if (!cfg_dialog_next) {
            if (cfg_dialog_cur.Type != E_DIALOG_TYPE.BLACK) {
                Singleton.Get(LayerManager).getView(ui.DramaDialogView).close();
            }
            this.cur_id = 0;
            this.cur_seq = 0;
            if (this.cb) {
                this.cb.call(this.cb_this);
            }
            return;
        }
        // 进入下一句
        this.cur_id = cfg_dialog_next.ID;
        this.updateView();
    };
    /**
     * 执行界面更新
     */
    DramaDialogController.prototype.updateView = function () {
        Singleton.Get(LayerManager).getView(ui.DramaDialogView).setDialog(this.cur_id);
    };
    /**
     * 获取某类剧情对话的第一句
     * @param type
     */
    DramaDialogController.prototype.getFirstDialog = function (type) {
        return this.getIdxDialog(type, 1);
    };
    /**
     * 获取某类剧情对话的第idx句
     * @returns {number}
     */
    DramaDialogController.prototype.getIdxDialog = function (type, idx) {
        var dialogs = Template.dialogue.values;
        for (var i = 0; i < dialogs.length; i++) {
            if (dialogs[i].Type == type && dialogs[i].Sequential == idx) {
                return dialogs[i].ID;
            }
        }
        return 0;
    };
    return DramaDialogController;
}());
__reflect(DramaDialogController.prototype, "DramaDialogController");
//# sourceMappingURL=DramaDialogController.js.map