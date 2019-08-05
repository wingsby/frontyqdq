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
    /**
     * 斗士阵容页面
     */
    var RoleLineupView = (function (_super) {
        __extends(RoleLineupView, _super);
        // endregion
        // region 初始化
        /**
         * 构造函数
         */
        function RoleLineupView() {
            var _this = _super.call(this, "yw.RoleLineupSkin") || this;
            // endregion
            // region 成员变量
            _this.m_avatar_max = 5;
            _this.m_backup_max = 3;
            _this.m_cur_lup = 0; // 当前选中的角色显示id
            _this.m_cur_pos = 0; // 当前选中的角色id
            _this.ani_active = true;
            _this.ani_backup_active = false;
            // endregion
            // region 主将卡牌
            _this.m_cards = [];
            _this.m_cur_card_id = 0;
            _this.m_card_offset_x = 22;
            _this.m_last_exit_lup = -1;
            _this.m_is_last_exit_resume = false;
            // endregion
            // region 卡牌滑动
            _this.slider_start = 0;
            _this.slider_active = false;
            // endregion
            // region 引导-主将列表
            _this.agent_lup_id = 0;
            // endregion
            // region 引导-副将列表
            _this.agent_bk_id = 1;
            _this.m_mgr = Singleton.Get(RoleManager);
            _this.m_arr_heros = new eui.ArrayCollection();
            _this.dgHero.itemRenderer = ui.RoleLineupHeroItemView;
            _this.dgHero.dataProvider = _this.m_arr_heros;
            _this.m_arr_backups = new eui.ArrayCollection();
            _this.dgBackup.itemRenderer = ui.RoleLineupBackupItemView;
            _this.dgBackup.dataProvider = _this.m_arr_backups;
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleLineupView.prototype.componentCreated = function () {
            this.labTxtBackup.text = "副将";
            this.labBackupPreview.text = Template.getGUIText("ui_role91");
            this.labChange.text = Template.getGUIText("ui_role60");
            this.btnOpinion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.btnLineupRec.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLineupRec, this);
            this.btnBackupPreview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackupPreview, this);
            this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
            this.btnOptimize.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOptimize, this);
            this.btnBond.touchEnabled = true;
            this.btnBond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBond, this);
            this.btnCardNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCardNext, this);
            this.btnCardPrev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCardPrev, this);
            this.groupCard.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch_groupCardSlider, this);
            this.groupCard.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin_groupCardSlider, this);
            this.groupCard.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd_groupCardSlider, this);
            this.btnAgent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
            this.btnAgentBackup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgentBackup, this);
        };
        /**
         * 帧更新
         * @param time
         */
        RoleLineupView.prototype.onUpdate = function (time) {
        };
        /**
         * 响应销毁
         */
        RoleLineupView.prototype.onDestroy = function () {
            this.btnOpinion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOpinion, this);
            this.btnLineupRec.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnLineupRec, this);
            this.btnBackupPreview.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBackupPreview, this);
            this.btnChange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChange, this);
            this.btnOptimize.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnOptimize, this);
            this.btnBond.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBond, this);
            this.btnCardNext.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCardNext, this);
            this.btnCardPrev.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnCardPrev, this);
            this.groupCard.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch_groupCardSlider, this);
            this.groupCard.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin_groupCardSlider, this);
            this.groupCard.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd_groupCardSlider, this);
            this.btnAgent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgent, this);
            this.btnAgentBackup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAgentBackup, this);
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleLineupView.prototype.open = function () {
            var _this = this;
            this.ani_active = true;
            this.initHeros();
            if (this.m_is_last_exit_resume) {
                this.m_cur_lup = this.m_last_exit_lup;
                this.cleanResume();
            }
            else {
                this.m_cur_lup = 0;
            }
            this.selHero(this.m_cur_lup);
            this.initCards();
            this.playOpenAni();
            this.updateAlarm();
            var tw = egret.Tween.get(this.btnBond);
            tw.wait(60).call(function () {
                _this.ani_active = false;
            }, this);
            Singleton.Get(LayerManager).addView(this);
        };
        /**
         * 关闭本界面
         */
        RoleLineupView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
            this.btnAgent.visible = false;
            this.btnAgentBackup.visible = false;
        };
        /**
         * 刷新界面
         */
        RoleLineupView.prototype.refresh = function () {
            this.initHeros();
            this.initCards();
            this.selHero(this.m_cur_lup);
            this.gotoCardStatic(this.m_cur_lup);
            this.updateAlarm();
        };
        RoleLineupView.prototype.updateAlarm = function () {
            this.imgLineupRecNew.visible = Singleton.Get(RoleLineupRecManager).getRecInfo().isAnyAlarm();
        };
        // endregion
        // region 主将列表
        /**
         * 初始化主将列表
         */
        RoleLineupView.prototype.initHeros = function () {
            var roles = this.m_mgr.getRolesInfo();
            var lineup_team = roles.lineup_team;
            var arr = [];
            for (var i = 0; i < lineup_team.length; i++) {
                arr.push({
                    lup: i,
                    role_id: lineup_team[i],
                    sel: false
                });
            }
            this.m_arr_heros.source = arr;
        };
        RoleLineupView.prototype.selHero = function (lup) {
            for (var i = 0; i < this.m_arr_heros.length; i++) {
                if (this.m_arr_heros.getItemAt(i).lup == lup) {
                    this.m_arr_heros.getItemAt(i).sel = true;
                    this.initBackups(lup, this.m_arr_heros.getItemAt(i).role_id); // 初始化副将信息
                }
                else {
                    this.m_arr_heros.getItemAt(i).sel = false;
                }
            }
            this.m_arr_heros.refresh();
            this.m_cur_lup = lup;
        };
        RoleLineupView.prototype.selCardEf = function (lup) {
            this.gotoCard(lup);
        };
        RoleLineupView.prototype.onClick_btnChange = function (e) {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnChange, function () {
                _this.onClickExec_btnChange();
            }, this);
        };
        RoleLineupView.prototype.onClickExec_btnChange = function () {
            Singleton.Get(ui.RoleSelectHeroAlertView).openByLineupId(this.m_cur_lup);
        };
        // endregion
        // region 副将列表
        RoleLineupView.prototype.initBackups = function (lup, role_id) {
            var backups = Singleton.Get(RoleManager).getRolesInfo().GetSomeoneBackupFull(role_id);
            var arr = [];
            for (var i = 0; i < backups.length; i++) {
                arr.push({
                    lup: lup,
                    bk_pos: i + 1,
                    hero_id: role_id,
                    role_id: backups[i],
                });
            }
            this.m_arr_backups.source = arr;
        };
        // endregion
        // region 更换阵形
        /**
         * 响应更换阵形点击事件
         */
        RoleLineupView.prototype.onClick_btnOpinion = function () {
            UtilsEffect.buttonEffect(this.btnOpinion, function () {
                RoleUtil.openHeroOpinion();
            }, this);
        };
        /**
         * 响应推荐阵容按钮点击事件
         */
        RoleLineupView.prototype.onClick_btnLineupRec = function () {
            UtilsEffect.buttonEffect(this.btnLineupRec, function () {
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).close();
                Singleton.Get(LayerManager).getView(ui.RoleLineupRecView).open();
            });
        };
        /**
         * 响应副将顶级属性按钮点击事件
         */
        RoleLineupView.prototype.onClick_btnBackupPreview = function () {
            UtilsEffect.buttonEffect(this.btnBackupPreview, function () {
                Singleton.Get(LayerManager).getView(ui.RoleBackupRecView).open();
            });
        };
        // endregion
        // region 羁绊
        /**
         * 响应点击羁绊按钮
         */
        RoleLineupView.prototype.onClick_btnBond = function () {
            UtilsEffect.buttonEffect(this.btnBond, function () {
                Singleton.Get(LayerManager).getView(ui.RoleBondPanelView).open();
            }, this);
        };
        /**
         * 响应点击提升按钮
         */
        RoleLineupView.prototype.onClick_btnOptimize = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnOptimize, function () {
                _this.setResume();
                Singleton.Get(LayerManager).getView(ui.RoleBaseView).openRole(Singleton.Get(RoleManager).getRolesInfo().getRoleByLup(_this.m_cur_lup));
                Singleton.Get(LayerManager).getView(ui.RoleLevelupView).playCardDynamicFromFather();
            }, this);
        };
        RoleLineupView.prototype.setResume = function () {
            this.m_is_last_exit_resume = true;
            this.m_last_exit_lup = this.m_cur_lup;
        };
        RoleLineupView.prototype.cleanResume = function () {
            this.m_is_last_exit_resume = false;
            this.m_last_exit_lup = -1;
        };
        RoleLineupView.prototype.initCards = function (set_pos) {
            if (set_pos === void 0) { set_pos = true; }
            for (var i = 0; i < this.m_cards.length; i++) {
                ObjectPool.getPool(ui.RoleLineupCardView).recycleObject(this.m_cards[i]);
                this.groupCard.removeChild(this.m_cards[i]);
            }
            this.m_cards = [];
            this.m_cur_card_id = 0;
            var max_hero_count = RoleUtil.GetMaxHeroCounts();
            var roles = this.m_mgr.getRolesInfo();
            var lineup_team = roles.lineup_team;
            for (var i = 0; i < lineup_team.length; i++) {
                if (i + 1 > max_hero_count) {
                    break;
                }
                var card = ObjectPool.getPool(ui.RoleLineupCardView).getObject();
                card.setActive(false);
                card.setRole(lineup_team[i]);
                this.groupCard.addChild(card);
                this.m_cards.push(card);
            }
            if (set_pos) {
                this.gotoCardStatic(this.m_cur_lup);
            }
        };
        RoleLineupView.prototype.gotoCard = function (lup, speed) {
            if (speed === void 0) { speed = 1; }
            for (var i = 0; i < this.m_cards.length; i++) {
                var tw = egret.Tween.get(this.m_cards[i]);
                if (i == lup) {
                    tw.to({ x: this.m_card_offset_x + 50, scaleX: 1, scaleY: 1 }, 200 * speed, egret.Ease.sineOut);
                    this.m_cards[i].setActive(true);
                    this.groupCard.setChildIndex(this.m_cards[i], this.groupCard.numChildren - 2);
                }
                else if (i < lup) {
                    if (i < lup - 1) {
                        tw.to({
                            x: this.m_card_offset_x + -20,
                            scaleX: 0.88,
                            scaleY: 0.88
                        }, 200 * speed, egret.Ease.sineOut);
                    }
                    else {
                        tw.to({
                            x: this.m_card_offset_x + -2,
                            scaleX: 0.88,
                            scaleY: 0.88
                        }, 200 * speed, egret.Ease.sineOut);
                    }
                    this.m_cards[i].setActive(false);
                    this.groupCard.setChildIndex(this.m_cards[i], i);
                }
                else if (i > lup) {
                    if (i > lup + 1) {
                        tw.to({
                            x: this.m_card_offset_x + 128,
                            scaleX: 0.88,
                            scaleY: 0.88
                        }, 200 * speed, egret.Ease.sineOut);
                    }
                    else {
                        tw.to({
                            x: this.m_card_offset_x + 102,
                            scaleX: 0.88,
                            scaleY: 0.88
                        }, 200 * speed, egret.Ease.sineOut);
                    }
                    this.m_cards[i].setActive(false);
                    this.groupCard.setChildIndex(this.m_cards[i], this.groupCard.numChildren - 3 - i);
                }
            }
            this.m_cur_card_id = lup;
            this.groupCard.setChildIndex(this.btnCardPrev, this.groupCard.numChildren - 1);
            this.groupCard.setChildIndex(this.btnCardNext, this.groupCard.numChildren);
        };
        RoleLineupView.prototype.gotoCardStatic = function (lup) {
            for (var i = 0; i < this.m_cards.length; i++) {
                if (i == lup) {
                    this.m_cards[i].x = this.m_card_offset_x + 50;
                    this.m_cards[i].scaleX = 1;
                    this.m_cards[i].scaleY = 1;
                    this.m_cards[i].setActive(true);
                    this.groupCard.setChildIndex(this.m_cards[i], this.groupCard.numChildren - 2);
                }
                else if (i < lup) {
                    if (i < lup - 1) {
                        this.m_cards[i].x = this.m_card_offset_x + -20;
                    }
                    else {
                        this.m_cards[i].x = this.m_card_offset_x + -2;
                    }
                    this.m_cards[i].scaleX = 0.88;
                    this.m_cards[i].scaleY = 0.88;
                    this.m_cards[i].setActive(false);
                    this.groupCard.setChildIndex(this.m_cards[i], i);
                }
                else if (i > lup) {
                    if (i > lup + 1) {
                        this.m_cards[i].x = this.m_card_offset_x + 128;
                    }
                    else {
                        this.m_cards[i].x = this.m_card_offset_x + 102;
                    }
                    this.m_cards[i].scaleX = 0.88;
                    this.m_cards[i].scaleY = 0.88;
                    this.m_cards[i].setActive(false);
                    this.groupCard.setChildIndex(this.m_cards[i], this.groupCard.numChildren - 3 - i);
                }
            }
            this.m_cur_card_id = lup;
            this.groupCard.setChildIndex(this.btnCardPrev, this.groupCard.numChildren - 1);
            this.groupCard.setChildIndex(this.btnCardNext, this.groupCard.numChildren);
        };
        RoleLineupView.prototype.onClick_btnCardPrev = function (e) {
            UtilsEffect.buttonEffect(this.imgCardPrev);
            if (this.slider_active) {
                return;
            }
            this.execCardPrev();
        };
        RoleLineupView.prototype.execCardPrev = function () {
            if (this.m_cur_card_id <= 0) {
                return;
            }
            this.gotoCard(this.m_cur_card_id - 1);
            this.selHero(this.m_cur_card_id);
        };
        RoleLineupView.prototype.onClick_btnCardNext = function (e) {
            UtilsEffect.buttonEffect(this.imgCardNext);
            if (this.slider_active) {
                return;
            }
            this.execCardNext();
        };
        RoleLineupView.prototype.execCardNext = function () {
            if (this.m_cur_card_id >= this.m_cards.length - 1) {
                return;
            }
            this.gotoCard(this.m_cur_card_id + 1);
            this.selHero(this.m_cur_card_id);
        };
        RoleLineupView.prototype.onTouchBegin_groupCardSlider = function (e) {
            this.slider_start = e.localX;
            this.slider_active = true;
        };
        RoleLineupView.prototype.onTouchEnd_groupCardSlider = function (e) {
            this.slider_start = 0;
            this.slider_active = false;
        };
        RoleLineupView.prototype.onTouch_groupCardSlider = function (e) {
            if (!this.slider_active) {
                return;
            }
            var x = e.localX;
            if (x + 60 < this.slider_start) {
                this.slider_active = false;
                this.execCardNext();
                return;
            }
            if (x - 60 > this.slider_start) {
                this.slider_active = false;
                this.execCardPrev();
                return;
            }
        };
        RoleLineupView.prototype.initAgent = function (idx) {
            this.agent_lup_id = this.m_arr_heros.source[idx - 1].lup;
            this.btnAgent.visible = true;
            this.btnAgent.x = 11 + (70 + 6) * (idx - 1);
        };
        RoleLineupView.prototype.onClick_btnAgent = function (e) {
            RoleUtil.handleLineupHeroGo(this.agent_lup_id, this.m_mgr.getRolesInfo().lineup_team[this.agent_lup_id]);
        };
        RoleLineupView.prototype.initAgentBackup = function (idx) {
            this.agent_bk_id = idx;
            this.btnAgentBackup.visible = true;
            this.btnAgentBackup.x = 52 + (70 + 62) * (idx - 1);
        };
        RoleLineupView.prototype.onClick_btnAgentBackup = function (e) {
            if (Singleton.Get(GuideManager).CouldYouPleaseWaitForMe("RoleLineupView", "btnAgentBackup", this.onClick_btnAgentBackup, this, e)) {
                return;
            }
            RoleUtil.handleLineupBackupGo(this.m_cur_lup, this.agent_bk_id, 0);
        };
        // endregion
        // region
        RoleLineupView.prototype.playOpenAni = function () {
            if (!this.m_cards || this.m_cards.length <= 0) {
                return;
            }
            /**
             for (let i = 0; i < this.m_cards.length; i++) {
                const cur_card: RoleLineupCardView = this.m_cards[this.m_cards.length - i - 1];
                egret.Tween.removeTweens(cur_card);
                const tw_card: egret.Tween = egret.Tween.get(cur_card);
                tw_card.wait(i * 100).call(() => {
                    this.gotoCard(this.m_cards.length - i, 3);
                });
            }
             */
        };
        return RoleLineupView;
    }(BaseUI));
    ui.RoleLineupView = RoleLineupView;
    __reflect(RoleLineupView.prototype, "ui.RoleLineupView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleLineupView.js.map