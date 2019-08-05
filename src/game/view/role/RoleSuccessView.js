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
    var RoleSuccessView = (function (_super) {
        __extends(RoleSuccessView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleSuccessView() {
            var _this = _super.call(this, "yw.RoleSuccessSkin") || this;
            _this.card_highlight = true;
            _this.touchEnabled = true;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleSuccessView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleSuccessView.prototype.onDestroy = function () {
        };
        /**
         * 帧更新
         * @param time
         */
        RoleSuccessView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleSuccessView.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_this, this);
            this.btnClose.text = "确定";
        };
        // endregion
        // region 显示控制
        /**
         * 打开进阶成功
         * @param role_id
         */
        RoleSuccessView.prototype.openTalent = function (role_id) {
            this.hideAllTitles();
            this.labTalent.visible = true;
            this.groupTip.visible = false;
            this.groupAttr.visible = true;
            this.mcEffect.visible = true;
            this.mcEffect0.visible = true;
            this.open(role_id);
            this.initTalentFX();
            this.playTalentFX();
        };
        /**
         * 打开突破成功
         * @param role_id
         */
        RoleSuccessView.prototype.openBreach = function (role_id) {
            this.hideAllTitles();
            this.labBreach.visible = true;
            this.groupTip.visible = true;
            this.groupAttr.visible = true;
            this.mcEffect.visible = true;
            this.mcEffect0.visible = true;
            this.open(role_id);
        };
        /**
         * 打开觉醒成功
         * @param role_id
         */
        RoleSuccessView.prototype.openAwaken = function (role_id, active_count) {
            this.hideAllTitles();
            this.labAwake.visible = true;
            this.groupTip.visible = false;
            this.groupAttr.visible = true;
            this.mcEffect.visible = true;
            this.mcEffect0.visible = true;
            this.open(role_id);
            if (active_count > 0) {
                this.effectKiraTama.reset();
                Common.playDrawCardEffect(role_id, this.compCard, this.imgCardBorder, this.effectKiraTama, null, active_count);
            }
        };
        /**
         * 打开预览界面
         * @param role_id
         */
        RoleSuccessView.prototype.openPreview = function (role_id) {
            this.hideAllTitles();
            this.groupTip.visible = false;
            this.groupAttr.visible = false;
            this.mcEffect.visible = false;
            this.mcEffect0.visible = false;
            Common.fillRoleCardNextAwaken(role_id, this.compCard);
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.labTalentFrom.alpha = 0;
            this.labTalentTo.alpha = 0;
            this.imgTalentTrans.alpha = 0;
            this.imgCardBorder.alpha = 0;
        };
        /**
         * 打开本界面
         */
        RoleSuccessView.prototype.open = function (role_id) {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.cleanTalentFX();
            this.initRoleInfo(role_id);
            this.initEffect();
        };
        /**
         * 关闭本界面
         */
        RoleSuccessView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
            this.tw_img_card_border = null;
            egret.Tween.removeTweens(this.imgCardBorder);
        };
        /**
         * 隐藏全部标题
         */
        RoleSuccessView.prototype.hideAllTitles = function () {
            this.labAwake.visible = false;
            this.labTalent.visible = false;
            this.labBreach.visible = false;
        };
        // endregion
        // region 填充数据
        /**
         * 填充角色数据
         * @param role_id
         */
        RoleSuccessView.prototype.initRoleInfo = function (role_id) {
            Common.fillRoleCard(role_id, this.compCard);
            var my_role_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (my_role_info == null) {
                egret.error("no player roleId: " + role_id);
                return;
            }
            //this.labNextLv.text = my_role_info.awaken + "星" + my_role_info.lv + "级";
            this.labNextHp.text = my_role_info.max_hp.toString();
            this.labNextDef.text = my_role_info.def.toString();
            this.labNextAtk.text = my_role_info.atk.toString();
            this.labNextDefSp.text = my_role_info.skill_def.toString();
            this.labNextAtkSp.text = my_role_info.skill_atk.toString();
        };
        /**
         * 设定旧数据
         * @param hp
         * @param def
         * @param atk
         * @param def
         * @param atk
         */
        RoleSuccessView.prototype.setOldData = function (role_id) {
            var my_role_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (my_role_info == null) {
                egret.error("no player roleId: " + role_id);
                return;
            }
            //this.labCurLv.text = my_role_info.awaken + "星" + my_role_info.lv + "级";
            this.labCurHp.text = my_role_info.max_hp.toString();
            this.labCurDef.text = my_role_info.def.toString();
            this.labCurAtk.text = my_role_info.atk.toString();
            this.labCurDefSp.text = my_role_info.skill_def.toString();
            this.labAtkSp.text = my_role_info.skill_atk.toString(); // TODO 改个名
        };
        RoleSuccessView.prototype.setTip1 = function (text) {
            this.labTip1.textFlow = new egret.HtmlTextParser().parser(text);
        };
        RoleSuccessView.prototype.setTip2 = function (text) {
            this.labTip2.textFlow = new egret.HtmlTextParser().parser(text);
        };
        /**
         * 初始化特效
         */
        RoleSuccessView.prototype.initEffect = function () {
            //this.mcEffect.clearMovieClip();
            //this.mcEffect.setMovieClip("effect_card2");
            //this.mcEffect.gotoAndPlay("effect_card2", -1);
            //this.mcEffect.setMovieClip("card");
            //this.mcEffect.gotoAndPlay("card", -1);
            //this.mcEffect0.setMovieClip("effect_card1");
            //this.mcEffect0.gotoAndPlay("effect_card1", 1);
            this.mcEffect0.clearMovieClip();
            this.mcEffect0.setMovieClip("ui_cardshow");
            this.mcEffect0.gotoAndPlay("ui_cardshow", 1);
            this.mcEffect0.setScale(3.33);
            this.tw_img_card_border = egret.Tween.get(this.imgCardBorder);
            this.imgCardBorder.alpha = 0;
            this.playCardBorder();
        };
        RoleSuccessView.prototype.playCardBorder = function () {
            var _this = this;
            if (this.tw_img_card_border == null) {
                return;
            }
            var tw = egret.Tween.get(this.imgCardBorder);
            tw.to({ alpha: this.card_highlight ? 0.5 : 1 }, 1000).call(function () {
                _this.card_highlight = !_this.card_highlight;
                _this.playCardBorder();
            }, this);
        };
        // endregion
        // region 资质特效
        RoleSuccessView.prototype.setTalent = function (from, to) {
            this.labTalentFrom.text = "资质" + from;
            this.labTalentTo.text = "资质" + to;
        };
        RoleSuccessView.prototype.initTalentFX = function () {
            this.groupTalent.visible = true;
            this.groupTalent.verticalCenter = 0;
            this.groupTalent.scaleX = 1;
            this.groupTalent.scaleY = 1;
            this.imgTalentTrans.visible = false;
            this.labTalentFrom.alpha = 0;
            this.labTalentTo.alpha = 0;
            //this.labTalentFrom.alpha = 0;
            //this.labTalentTo.alpha = 0;
            //this.imgTalentTrans.visible = false;
        };
        RoleSuccessView.prototype.playTalentFX = function () {
            var _this = this;
            var tw_groupTalent = egret.Tween.get(this.groupTalent);
            this.groupTalent.scaleX = 1;
            this.groupTalent.scaleY = 1;
            tw_groupTalent.wait(1166).call(function () {
                _this.labTalentFrom.scaleX = 5;
                _this.labTalentFrom.scaleY = 5;
                //this.mcTalentRF.setMovieClip("ui_jinglian");
                //this.mcTalentRF.gotoAndPlay("ui_jinglian", 1);
                _this.mcTalentRB.setMovieClip("ui_ten1");
                _this.mcTalentRB.gotoAndPlay("ui_ten1", 1);
                var tw_labTalentFrom = egret.Tween.get(_this.labTalentFrom);
                tw_labTalentFrom.to({ alpha: 1, scaleX: 1, scaleY: 1 }, 250).call(function () {
                    _this.imgTalentTrans.visible = true;
                }, _this).wait(400).call(function () {
                    //this.mcTalentLF.setMovieClip("ui_jinglian");
                    //this.mcTalentLF.gotoAndPlay("ui_jinglian", 1);
                    _this.mcTalentLB.setMovieClip("ui_ten1");
                    _this.mcTalentLB.gotoAndPlay("ui_ten1", 1);
                    _this.labTalentTo.scaleX = 5;
                    _this.labTalentTo.scaleY = 5;
                    var tw_labTalentTo = egret.Tween.get(_this.labTalentTo);
                    tw_labTalentTo.to({ alpha: 1, scaleX: 1, scaleY: 1 }, 250);
                }, _this).wait(250).wait(580).call(function () {
                    var tw_groupTalent = egret.Tween.get(_this.groupTalent);
                    tw_groupTalent.to({ verticalCenter: 142, scaleX: 0.8, scaleY: 0.8 }, 250);
                });
            }, this);
        };
        RoleSuccessView.prototype.cleanTalentFX = function () {
            this.groupTalent.visible = false;
            egret.Tween.removeTweens(this.groupTalent);
            egret.Tween.removeTweens(this.labTalentFrom);
            egret.Tween.removeTweens(this.labTalentTo);
        };
        // endregion
        // region 按钮事件
        /**
         * 响应关闭按钮
         * @param e
         */
        RoleSuccessView.prototype.onClick_this = function (e) {
            this.close();
        };
        return RoleSuccessView;
    }(PopupUI));
    ui.RoleSuccessView = RoleSuccessView;
    __reflect(RoleSuccessView.prototype, "ui.RoleSuccessView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleSuccessView.js.map