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
    var GuildWarListView = (function (_super) {
        __extends(GuildWarListView, _super);
        function GuildWarListView() {
            var _this = _super.call(this, "yw.GuildWarListSkin") || this;
            _this.m_last_tick = 0;
            _this.m_last_countdown = 0;
            _this.m_cur_ene_team = false;
            _this.m_cur_swt = 0;
            _this.m_list_items = [];
            _this.m_btn_swts = [];
            _this.m_img_swts = [];
            _this.m_list_pos = [[152, 56], [0, 130], [302, 130], [152, 206], [0, 281], [302, 281], [152, 356]];
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            _this.m_btn_swts = [_this.btnSwt1, _this.btnSwt2, _this.btnSwt3];
            _this.m_img_swts = [_this.imgSwt1, _this.imgSwt2, _this.imgSwt3];
            return _this;
        }
        GuildWarListView.prototype.componentCreated = function () { };
        GuildWarListView.prototype.onDestroy = function () { };
        GuildWarListView.prototype.onUpdate = function (time) { };
        GuildWarListView.prototype.onAddToStage = function () {
            this.tabTitle.text = "公会战";
            this.tabTitle.active = false;
            this.imgGroundBg.mask = this.rectGroundMask;
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnEneTeam.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEneTeam, this);
            this.btnMyTeam.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMyTeam, this);
            this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRule, this);
            this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChat, this);
            for (var i = 0; i < this.m_btn_swts.length; i++) {
                this.m_btn_swts[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSwt, this);
            }
            Singleton.Get(RegisterUpdate).register(this);
            // 设定弹幕置顶
            Singleton.Get(ChatAlertManger).setIsUp(true);
        };
        GuildWarListView.prototype.onRemoveFromStage = function () {
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBack, this);
            this.btnEneTeam.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnEneTeam, this);
            this.btnMyTeam.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnMyTeam, this);
            this.btnRule.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRule, this);
            this.btnChat.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnChat, this);
            for (var i = 0; i < this.m_btn_swts.length; i++) {
                this.m_btn_swts[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSwt, this);
            }
            Singleton.Get(RegisterUpdate).unRegister(this);
            // 取消弹幕置顶
            Singleton.Get(ChatAlertManger).setIsUp(false);
        };
        GuildWarListView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            // Common.playStackAni(this.btnBack, [this.tabTitle]);
            this.initView();
        };
        GuildWarListView.prototype.close = function () {
            this.recycleList();
            Singleton.Get(LayerManager).removeView(this);
        };
        GuildWarListView.prototype.update = function () {
            var _this = this;
            var now = UtilsGame.Now();
            if (now - this.m_last_tick > 15000) {
                this.m_last_tick = now;
                Singleton.Get(GuildWarManager).reqScore(function (my_score, ene_score) {
                    _this.labScoreL.text = my_score.toString();
                    _this.labScoreR.text = ene_score.toString();
                }, this);
            }
            if (now - this.m_last_countdown > 1000) {
                this.m_last_countdown = now;
                if (GuildWarUtil.isWarTime()) {
                    this.labCountdown.text = UtilsGame.timeToString(GuildWarUtil.getEndTime() - now, true);
                }
                else {
                    this.labCountdown.text = "已结束";
                }
            }
        };
        GuildWarListView.prototype.onClick_btnBack = function () {
            this.close();
            GuildWarViewHandler.openGuildWar();
        };
        GuildWarListView.prototype.initView = function () {
            this.m_cur_ene_team = true;
            this.m_cur_swt = 0;
            this.initCompite();
            this.initContent();
            // 暂时不开放战报功能 隐藏按钮
            this.btnLog.visible = false;
        };
        GuildWarListView.prototype.initCompite = function () {
            // 初始化对战双方公会信息
            var inf_gw = Singleton.Get(GuildWarManager).getInfo();
            var inf_guild = Singleton.Get(GuildManager).getMyGuild();
            var serls = Singleton.Get(login.LoginDataManager).serls;
            var cfg_my_hub = serls.get(Singleton.Get(login.LoginDataManager).zid);
            var cfg_ene_hub = serls.get(inf_gw.g_info.zid);
            this.labNameL.text = inf_guild.name;
            if (cfg_my_hub) {
                this.labZidL.text = cfg_my_hub.name + " (S" + cfg_my_hub.zid + ")";
            }
            else {
                this.labZidL.text = "(S" + cfg_my_hub.zid + ")";
            }
            this.labNameR.text = inf_gw.g_info.name;
            if (cfg_ene_hub) {
                this.labZidR.text = cfg_ene_hub.name + " (S" + cfg_ene_hub.zid + ")";
            }
            else {
                this.labZidR.text = "(S" + cfg_ene_hub.zid + ")";
            }
        };
        // region 队伍信息
        GuildWarListView.prototype.onClick_btnEneTeam = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnEneTeam, function () {
                _this.m_cur_ene_team = true;
                _this.m_cur_swt = 0;
                _this.initContent();
            });
        };
        GuildWarListView.prototype.onClick_btnMyTeam = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnMyTeam, function () {
                _this.m_cur_ene_team = false;
                _this.m_cur_swt = 0;
                _this.initContent();
            });
        };
        GuildWarListView.prototype.initTeamStatus = function () {
            this.btnEneTeam.visible = !this.m_cur_ene_team;
            this.btnMyTeam.visible = this.m_cur_ene_team;
        };
        // endregion
        // region 列表生成
        /**
         * 更新状态
         */
        GuildWarListView.prototype.initContent = function () {
            if (this.m_cur_ene_team) {
                Singleton.Get(GuildWarManager).reqListEnemy(false, this.execInitContent, this);
            }
            else {
                Singleton.Get(GuildWarManager).reqListMy(this.execInitContent, this);
            }
        };
        /**
         * 执行状态更新
         */
        GuildWarListView.prototype.execInitContent = function () {
            this.initList(this.m_cur_ene_team, this.m_cur_swt);
            this.initSwtView(this.m_cur_swt);
            this.initTeamStatus();
        };
        /**
         * 初始化敌人列表
         */
        GuildWarListView.prototype.initList = function (is_enemy, swt) {
            if (swt === void 0) { swt = 0; }
            this.recycleList();
            // 根据分页计算当前应获取的数据内容
            var item_per_page = 7;
            var offset = swt * item_per_page;
            // 获取队伍玩家UID列表
            var uids = [];
            if (!is_enemy) {
                uids = Singleton.Get(GuildWarManager).getInfo().getMyWarriorList(offset, item_per_page);
            }
            else {
                uids = Singleton.Get(GuildWarManager).getInfo().getEneWarriorList(offset, item_per_page);
            }
            var items = [];
            for (var i = 0; i < uids.length; i++) {
                // 生成敌人对象
                var item = ObjectPool.getPool(ui.GuildWarListItemView).getObject();
                item.init();
                item.data = {
                    uid: uids[i],
                    is_enemy: is_enemy
                };
                // 添加到索引和舞台
                items.push(item);
                this.groupScene.addChild(item);
                // 根据序号设定位置
                if (i < this.m_list_pos.length) {
                    var pos = this.m_list_pos[i];
                    item.x = pos[0];
                    item.y = pos[1];
                }
                item.touchChildren = false;
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_item, this);
            }
            this.m_list_items = items;
        };
        /**
         * 清空当前敌人列表
         */
        GuildWarListView.prototype.recycleList = function () {
            var items = this.m_list_items;
            for (var i = 0; i < items.length; i++) {
                this.groupScene.removeChild(items[i]);
                items[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_item, this);
                items[i].recycle();
                ObjectPool.getPool(ui.GuildWarListItemView).recycleObject(items[i]);
            }
            this.m_list_items = [];
        };
        // endregion
        // region 分页切换
        /**
         * 切换分页数据状态
         */
        GuildWarListView.prototype.switchSwt = function (swt) {
            if (swt === void 0) { swt = 0; }
            if (swt < 0) {
                swt = 0;
            }
            else if (swt >= 3) {
                swt = 2;
            }
            this.m_cur_swt = swt;
            this.initContent();
        };
        /**
         * 刷新目标页显示状态
         */
        GuildWarListView.prototype.initSwtView = function (swt) {
            if (swt === void 0) { swt = 0; }
            for (var i = 0; i < this.m_img_swts.length; i++) {
                ResManager.AsyncSetTexture(this.m_img_swts[i], i == swt ? "btn_sfengyuan2_png" : "btn_sfengyuan1_png");
            }
            var inf_gw = Singleton.Get(GuildWarManager).getInfo();
            var inf_guild = Singleton.Get(GuildManager).getMyGuild();
            this.labSwtName.text = UtilsGame.stringHander("$1 分校$2", this.m_cur_ene_team ? inf_gw.g_info.name : inf_guild.name, swt + 1);
            this.groupSwtName.width = this.labSwtName.width + 28;
            this.initSwtNum();
        };
        /**
         * 目标页是否有内容
         */
        GuildWarListView.prototype.hasSwt = function (is_enemy, swt) {
            // 根据分页计算应获取的数据内容
            var item_per_page = 7;
            var offset = swt * item_per_page;
            // 获取队伍玩家UID列表
            var uids = [];
            if (!is_enemy) {
                uids = Singleton.Get(GuildWarManager).getInfo().getMyWarriorList(offset, item_per_page);
            }
            else {
                uids = Singleton.Get(GuildWarManager).getInfo().getEneWarriorList(offset, item_per_page);
            }
            return !(!uids || uids.length <= 0);
        };
        /**
         * 初始化分页数量 1 2 3
         */
        GuildWarListView.prototype.initSwtNum = function () {
            if (this.hasSwt(this.m_cur_ene_team, 2)) {
                this.groupSwt.width = 222;
                this.btnSwt1.x = 44.5;
                this.btnSwt1.visible = true;
                this.btnSwt2.x = 111.5;
                this.btnSwt2.visible = true;
                this.btnSwt3.x = 177.5;
                this.btnSwt3.visible = true;
            }
            else if (this.hasSwt(this.m_cur_ene_team, 1)) {
                this.groupSwt.width = 155;
                this.btnSwt1.x = 44.5;
                this.btnSwt1.visible = true;
                this.btnSwt2.x = 111.5;
                this.btnSwt2.visible = true;
                this.btnSwt3.visible = false;
            }
            else {
                this.groupSwt.width = 88;
                this.btnSwt1.x = 44.5;
                this.btnSwt1.visible = true;
                this.btnSwt2.visible = false;
                this.btnSwt3.visible = false;
            }
        };
        // endregion
        /**
         * 点击规则说明按钮
         */
        GuildWarListView.prototype.onClick_btnRule = function () {
            UtilsEffect.buttonEffect(this.btnRule, function () {
                GuildWarViewHandler.openRule();
            }, this);
        };
        /**
         * 点击打开公会聊天界面
         */
        GuildWarListView.prototype.onClick_btnChat = function () {
            UtilsEffect.buttonEffect(this.btnChat, function () {
                Singleton.Get(LayerManager).getView(ui.ChatView).open(E_ChatChannel.GUILD);
            });
        };
        /**
         * 点击分院切换按钮
         */
        GuildWarListView.prototype.onClick_btnSwt = function (e) {
            var target = e.target;
            UtilsEffect.buttonEffect(target);
            // 找出当前切换的目标页
            var swt = 0;
            for (var i = 0; i < this.m_btn_swts.length; i++) {
                if (this.m_btn_swts[i] == target) {
                    swt = i;
                }
            }
            // 检查是否存在目标页
            if (this.hasSwt(this.m_cur_ene_team, swt)) {
                // 执行分页切换
                this.switchSwt(swt);
            }
            else {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_155"));
                return;
            }
        };
        /**
         * 响应点击元素
         */
        GuildWarListView.prototype.onClick_item = function (e) {
            var _this = this;
            var target = e.target;
            if (!target) {
                return;
            }
            target.playClickAni(function () {
                // Singleton.Get(DialogControler).showString("[" + target.data.uid + "]");
                GuildWarViewHandler.openPlayer(_this.m_cur_ene_team, target.data.uid);
            }, this);
        };
        /**
         * 设定是否有新的公会聊天
         */
        GuildWarListView.prototype.setChatNew = function (is_new) {
            this.imgChatNew.visible = is_new;
        };
        return GuildWarListView;
    }(BaseUI));
    ui.GuildWarListView = GuildWarListView;
    __reflect(GuildWarListView.prototype, "ui.GuildWarListView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=GuildWarListView.js.map