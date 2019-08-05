var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var E_DIALOG_POS;
    (function (E_DIALOG_POS) {
        E_DIALOG_POS[E_DIALOG_POS["LEFT"] = 1] = "LEFT";
        E_DIALOG_POS[E_DIALOG_POS["RIGHT"] = 2] = "RIGHT";
        E_DIALOG_POS[E_DIALOG_POS["CENTER"] = 3] = "CENTER";
    })(E_DIALOG_POS = ui.E_DIALOG_POS || (ui.E_DIALOG_POS = {}));
    var DramaDialogView = (function (_super) {
        __extends(DramaDialogView, _super);
        function DramaDialogView() {
            var _this = _super.call(this, "yw.DramaDialogSkin") || this;
            _this.m_cur_id = 0;
            _this.m_last_set = 0;
            _this.m_set_block = 0;
            _this.cur_text = "";
            _this.text_speed = 0;
            _this.no_next_text = false;
            _this.no_next_text_fin = false;
            _this.m_is_enter_black = false;
            return _this;
        }
        DramaDialogView.prototype.componentCreated = function () {
        };
        DramaDialogView.prototype.onDestroy = function () {
        };
        DramaDialogView.prototype.onUpdate = function (time) {
        };
        DramaDialogView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            Singleton.Get(RegisterUpdate).register(this);
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
            this.btnSkip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSkip, this);
        };
        DramaDialogView.prototype.close = function () {
            if (Singleton.Get(LayerManager).isViewOnStage(this)) {
                Singleton.Get(LayerManager).removeView(this);
            }
            Singleton.Get(RegisterUpdate).unRegister(this);
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
            this.btnSkip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSkip, this);
        };
        DramaDialogView.prototype.setBg = function (visible) {
            this.imgBg.visible = visible;
        };
        DramaDialogView.prototype.setBlackBg = function (visible) {
            var _this = this;
            if (visible) {
                this.imgDialog_c.visible = false;
                egret.Tween.removeTweens(this.imgBlackBg);
                this.imgBlackBg.visible = true;
                this.imgBlackBg.alpha = 0;
                this.m_is_enter_black = true;
                var tw = egret.Tween.get(this.imgBlackBg);
                tw.to({ alpha: 1 }, 800).call(function () {
                    _this.m_is_enter_black = false;
                    _this.setDialog(_this.m_cur_id, true);
                }, this);
            }
            else {
                this.imgDialog_c.visible = true;
                this.imgBlackBg.visible = false;
            }
        };
        DramaDialogView.prototype.setDialog = function (dialog_id, mask) {
            if (mask === void 0) { mask = false; }
            this.m_cur_id = dialog_id;
            if (this.m_is_enter_black) {
                this.groupLeft.visible = false;
                this.groupRight.visible = false;
                this.groupCenter.visible = false;
                this.btnSkip.visible = false;
                return;
            }
            this.m_last_set = UtilsGame.Now();
            this.groupLeft.visible = false;
            this.groupRight.visible = false;
            this.groupCenter.visible = false;
            this.btnSkip.visible = false;
            var cfg_dialog = Template.dialogue.get(dialog_id);
            if (!cfg_dialog) {
                console.log("no dialogue id: " + dialog_id);
                return;
            }
            // 设定显示内容
            var stand = cfg_dialog.Icon;
            this.cur_text = Template.getGUIText(cfg_dialog.CharacterID);
            // 多少毫秒出一个字
            this.text_speed = cfg_dialog.Speed;
            // 多少秒内不允许点击
            this.m_set_block = cfg_dialog.Time;
            // 播放遮罩
            if (mask) {
                this.no_next_text = true;
                this.playMask();
            }
            else {
                this.no_next_text = false;
            }
            this.no_next_text_fin = false;
            switch (cfg_dialog.Location) {
                case E_DIALOG_POS.LEFT:
                    this.groupLeft.visible = true;
                    this.labDialog_l.text = "";
                    if (stand != "0") {
                        this.imgStand_l.visible = true;
                        ResManager.AsyncSetTexture(this.imgStand_l, stand);
                    }
                    else {
                        this.imgStand_l.visible = false;
                    }
                    break;
                case E_DIALOG_POS.RIGHT:
                    this.groupRight.visible = true;
                    this.labDialog_r.text = "";
                    if (stand != "0") {
                        this.imgStand_r.visible = true;
                        ResManager.AsyncSetTexture(this.imgStand_r, stand);
                    }
                    else {
                        this.imgStand_r.visible = false;
                    }
                    break;
                case E_DIALOG_POS.CENTER:
                    this.groupCenter.visible = true;
                    this.labDialog_c.text = "";
                    this.btnSkip.visible = (cfg_dialog.Type != E_DIALOG_TYPE.BLACK);
                    break;
            }
        };
        DramaDialogView.prototype.playMask = function () {
            this.text_speed = 0;
            this.imgCentermask.filters = UtilsEffect.blackFilters();
            egret.Tween.removeTweens(this.imgCentermask);
            this.imgCentermask.x = -120;
            var tw = egret.Tween.get(this.imgCentermask);
            tw.wait(200).to({ x: 450 }, this.m_set_block * 0.4, egret.Ease.sineOut);
            this.labDialog_c.alpha = 1;
            var tw_dialog = egret.Tween.get(this.labDialog_c);
            tw_dialog.wait(this.m_set_block * 0.8).to({ alpha: 0 }, this.m_set_block * 0.2, egret.Ease.sineOut);
        };
        DramaDialogView.prototype.update = function (time) {
            var elapsed = UtilsGame.Now() - this.m_last_set;
            // elapsed / (count_sec / this.cur_text.length)
            var chara_num = this.cur_text.length;
            if (this.text_speed > 0) {
                chara_num = elapsed / this.text_speed;
            }
            var text = this.cur_text;
            if (chara_num <= this.cur_text.length) {
                text = this.cur_text.slice(0, chara_num);
            }
            this.labDialog_l.text = text;
            this.labDialog_r.text = text;
            this.labDialog_c.text = text;
            var next_enable = (UtilsGame.Now() - this.m_last_set > this.m_set_block);
            if (this.no_next_text && next_enable && !this.no_next_text_fin) {
                this.no_next_text_fin = true;
                Singleton.Get(DramaManager).getDialog().goNext();
                return;
            }
            if (this.no_next_text) {
                next_enable = false;
            }
            // 可点击时显示下一步
            this.imgNext_l.visible = next_enable;
            this.imgNext_r.visible = next_enable;
            this.imgNext_c.visible = next_enable;
        };
        DramaDialogView.prototype.onClick_btnHandler = function () {
            if (UtilsGame.Now() - this.m_last_set > this.m_set_block) {
                Singleton.Get(DramaManager).getDialog().goNext();
            }
        };
        DramaDialogView.prototype.onClick_btnSkip = function () {
            Singleton.Get(DramaManager).getFlow().handleSkip();
        };
        return DramaDialogView;
    }(BaseUI));
    ui.DramaDialogView = DramaDialogView;
    __reflect(DramaDialogView.prototype, "ui.DramaDialogView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=DramaDialogView.js.map