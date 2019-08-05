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
    var RoleEquipStrengthView = (function (_super) {
        __extends(RoleEquipStrengthView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleEquipStrengthView() {
            var _this = _super.call(this, "yw.RoleEquipStrengthSkin") || this;
            _this.cur_pos = EquipPos.Null; // 当前选中的装备槽位
            _this.touchEnabled = false;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleEquipStrengthView.prototype.componentCreated = function () {
        };
        /**
         * 初始化
         */
        RoleEquipStrengthView.prototype.init = function () {
            this.initGuiText();
            this.initEvent();
        };
        /**
         * 初始化UI文字
         */
        RoleEquipStrengthView.prototype.initGuiText = function () {
            this.btnSubmit.text = Template.getGUIText("ui_equip16");
            this.btnSubmitEx.text = Template.getGUIText("ui_equip15");
        };
        /**
         * 初始化事件绑定
         */
        RoleEquipStrengthView.prototype.initEvent = function () {
            this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
            this.btnSubmitEx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmitEx, this);
            this.posWeapon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posWeapon, this);
            this.posChest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posChest, this);
            this.posLeg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posLeg, this);
            this.posShoe.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posShoe, this);
            this.mcSelectedBack.setCallback(this.onEffectEnd, this);
            this.mcWeaponBack.setCallback(this.onEffectEnd, this);
            this.mcChestBack.setCallback(this.onEffectEnd, this);
            this.mcLegBack.setCallback(this.onEffectEnd, this);
            this.mcShoeBack.setCallback(this.onEffectEnd, this);
        };
        /**
         * 响应销毁
         */
        RoleEquipStrengthView.prototype.onDestroy = function () {
            this.btnSubmit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
            this.btnSubmitEx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmitEx, this);
            this.posWeapon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posWeapon, this);
            this.posChest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posChest, this);
            this.posLeg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posLeg, this);
            this.posShoe.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posShoe, this);
        };
        /**
         * 帧更新
         * @param time
         */
        RoleEquipStrengthView.prototype.onUpdate = function (time) {
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleEquipStrengthView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.initEquipInfo();
            this.initCurPos(EquipPos.Weapon);
            this.playOpenAni();
            Singleton.Get(LayerManager).getView(ui.RoleBaseView).initAvatars();
        };
        /**
         * 打开并直接选中某一位置
         * @param pos
         */
        RoleEquipStrengthView.prototype.openPos = function (pos) {
            Singleton.Get(LayerManager).addView(this);
            this.initEquipInfo();
            this.initCurPos(pos);
            this.playOpenAni();
        };
        /**
         * 关闭本界面
         */
        RoleEquipStrengthView.prototype.close = function () {
            this.clearEffect();
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**
         * 刷新
         */
        RoleEquipStrengthView.prototype.refresh = function (reset) {
            if (reset === void 0) { reset = true; }
            if (Singleton.Get(LayerManager).isViewOnStage(this)) {
                this.initEquipInfo();
                if (reset || this.cur_pos <= 0) {
                    this.initCurPos(EquipPos.Weapon);
                    this.playOpenAni();
                }
                else {
                    this.initCurPos(this.cur_pos);
                }
            }
        };
        /**
         * 播放开启动画
         */
        RoleEquipStrengthView.prototype.playOpenAni = function () {
            // Common.playStackAni(undefined, [this.posSelected, this.posWeapon, this.posChest, this.posLeg, this.posShoe], undefined, undefined, 2);
        };
        // endregion
        // region 展示
        /**
         * 初始化装备Info
         */
        RoleEquipStrengthView.prototype.initEquipInfo = function () {
            // 获取当前选中的角色
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            // 判空
            if (!my_info) {
                egret.error("no player roleId: " + role_id);
                return;
            }
            // 获取角色基本配置
            var role_info = Template.role.get(role_id);
            // 判空
            if (!role_info) {
                egret.error("no roleId: " + role_id);
                return;
            }
            // 具体逻辑
            var my_weapon = my_info.getEquipByPos(EquipPos.Weapon);
            this.labWeaponStar.text = "Lv." + my_weapon.stg_lv.toString();
            this.imgWeaponNew.visible = my_weapon.isStrengthAble();
            if (my_weapon.equip_id > 0) {
                this.groupWeaponItem.visible = true;
                ResManager.AsyncSetTexture(this.imgWeaponIcon, my_weapon.item_info.iIcon);
                ResManager.AsyncSetTexture(this.imgWeaponTier, Common.getItemTierBgRes(my_weapon.item_info.iStar));
            }
            else {
                this.groupWeaponItem.visible = false;
            }
            var my_chest = my_info.getEquipByPos(EquipPos.Chest);
            this.labChestStar.text = "Lv." + my_chest.stg_lv.toString();
            this.imgChestNew.visible = my_chest.isStrengthAble();
            if (my_chest.equip_id > 0) {
                this.groupChestItem.visible = true;
                ResManager.AsyncSetTexture(this.imgChestIcon, my_chest.item_info.iIcon);
                ResManager.AsyncSetTexture(this.imgChestTier, Common.getItemTierBgRes(my_chest.item_info.iStar));
            }
            else {
                this.groupChestItem.visible = false;
            }
            var my_leg = my_info.getEquipByPos(EquipPos.Leg);
            this.labLegStar.text = "Lv." + my_leg.stg_lv.toString();
            this.imgLegNew.visible = my_leg.isStrengthAble();
            if (my_leg.equip_id > 0) {
                this.groupLegItem.visible = true;
                ResManager.AsyncSetTexture(this.imgLegIcon, my_leg.item_info.iIcon);
                ResManager.AsyncSetTexture(this.imgLegTier, Common.getItemTierBgRes(my_leg.item_info.iStar));
            }
            else {
                this.groupLegItem.visible = false;
            }
            var my_shoe = my_info.getEquipByPos(EquipPos.Shoe);
            this.labShoeStar.text = "Lv." + my_shoe.stg_lv.toString();
            this.imgShoeNew.visible = my_shoe.isStrengthAble();
            if (my_shoe.equip_id > 0) {
                this.groupShoeItem.visible = true;
                ResManager.AsyncSetTexture(this.imgShoeIcon, my_shoe.item_info.iIcon);
                ResManager.AsyncSetTexture(this.imgShoeTier, Common.getItemTierBgRes(my_shoe.item_info.iStar));
            }
            else {
                this.groupShoeItem.visible = false;
            }
        };
        /**
         * 初始化选中槽位的装备
         */
        RoleEquipStrengthView.prototype.initCurPos = function (pos) {
            if (pos === void 0) { pos = EquipPos.Null; }
            if (pos == EquipPos.Null) {
                pos = this.cur_pos;
            }
            if (pos == EquipPos.Null) {
                egret.error("select a null pos");
                return;
            }
            this.activatePos(pos);
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            var my_equip = my_info.getEquipByPos(pos);
            this.cur_pos = pos;
            ResManager.AsyncSetTexture(this.imgSelected, Common.getEquipPosRes(pos));
            this.labSelectedStar.text = Common.getEquipPosWord(pos) + "+" + my_equip.stg_lv;
            this.labSelectedStr.text = "Lv." + my_equip.stg_lv.toString();
            this.labSelectedRefine.text = my_equip.rfn_lv.toString();
            //let max_lv: number = Singleton.Get(EquipManager).getMaxStrengthLv();
            var max_lv = Singleton.Get(EquipManager).getCurMaxStrengthLv();
            this.labCurLv.text = my_equip.stg_lv + "/" + max_lv;
            this.labNextLv.text = (my_equip.stg_lv + 1).toString();
            // 位置上没有装备
            if (my_equip.equip_id <= 0) {
                /*
                this.labCurAttr1.visible = false;
                this.labCurAttr2.visible = false;
                this.labTxtCurAttr1.visible = false;
                this.labTxtCurAttr2.visible = false;
                this.labNextAttr1.visible = false;
                this.labNextAttr2.visible = false;
                this.labTxtNextAttr1.visible = false;
                this.labTxtNextAttr2.visible = false;
                this.imgTrans.visible = false;
                */
                this.groupAttrs.visible = false;
                this.groupSelectedItem.visible = false;
            }
            else {
                /*
                this.labCurAttr1.visible = true;
                this.labCurAttr2.visible = true;
                this.labTxtCurAttr1.visible = true;
                this.labTxtCurAttr2.visible = true;
                this.labNextAttr1.visible = true;
                this.labNextAttr2.visible = true;
                this.labTxtNextAttr1.visible = true;
                this.labTxtNextAttr2.visible = true;
                this.imgTrans.visible = true;
                 **/
                this.groupAttrs.visible = true;
                this.groupSelectedItem.visible = true;
                ResManager.AsyncSetTexture(this.imgSelectedIcon, my_equip.item_info.iIcon);
                ResManager.AsyncSetTexture(this.imgSelectedTier, Common.getItemTierBgRes(my_equip.item_info.iStar));
                // 计算属性
                var str_attr = my_equip.str_attr;
                var next_str_attr = my_equip.next_str_attr;
                this.labTxtCurAttr1.text = RoleUtil.GetAttrPrefixString(str_attr[0][0]);
                this.labCurAttr1.text = Common.attrValueHandlerWithPct(str_attr[0][1], str_attr[0][0]);
                this.labTxtNextAttr1.text = RoleUtil.GetAttrPrefixString(next_str_attr[0][0]);
                this.labNextAttr1.text = Common.attrValueHandlerWithPct(next_str_attr[0][1], next_str_attr[0][0]);
                if (str_attr.length >= 2) {
                    this.labTxtCurAttr2.text = RoleUtil.GetAttrPrefixString(str_attr[1][0]);
                    this.labCurAttr2.text = Common.attrValueHandlerWithPct(str_attr[1][1], str_attr[1][0]);
                    this.labTxtNextAttr2.text = RoleUtil.GetAttrPrefixString(next_str_attr[1][0]);
                    this.labNextAttr2.text = Common.attrValueHandlerWithPct(next_str_attr[1][1], next_str_attr[0][0]);
                }
            }
            // 已达最高等级
            if (my_equip.is_str_finally_max) {
                this.groupOper.visible = false;
                this.groupMax.visible = true;
                this.labNextLv.visible = false;
                this.labTxtNextLv.visible = false;
                this.labNextAttr1.visible = false;
                this.labNextAttr2.visible = false;
                this.labTxtNextAttr1.visible = false;
                this.labTxtNextAttr2.visible = false;
                this.imgTrans.visible = false;
            }
            else {
                this.groupOper.visible = true;
                this.groupMax.visible = false;
                this.labNextLv.visible = true;
                this.labTxtNextLv.visible = true;
                this.labNextAttr1.visible = true;
                this.labNextAttr2.visible = true;
                this.labTxtNextAttr1.visible = true;
                this.labTxtNextAttr2.visible = true;
                this.imgTrans.visible = true;
                var my_gold = Singleton.Get(PlayerInfoManager).getGold();
                var levelup_cost = my_equip.levelup_cost;
                this.btnSubmit.cost = UtilsGame.numberToString(levelup_cost);
                this.btnSubmit.enough = my_gold >= levelup_cost;
                if (my_equip.equip_info != null) {
                    this.setAttr2Visible(my_equip.str_attr);
                }
            }
            // this.setAutoLevelupPrice();
        };
        /**
         * 生成一键强化价格
         */
        RoleEquipStrengthView.prototype.setAutoLevelupPrice = function () {
            /**
            let price: number = 0;
            let role_id: number = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            let my_info: RoleInfo = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);

            for (let i: number = EquipPos.Weapon; i < EquipPos.Shoe + 1; i++) {
                let my_equip: EquipInfo = my_info.getEquipByPos(i);
                if (!my_equip.is_str_max && my_equip.equip_id > 0) {
                    price += my_equip.levelup_cost;
                }
            }

            let my_gold: number = Singleton.Get(PlayerInfoManager).getGold();

            this.btnSubmitEx.cost = price.toString();
            this.btnSubmitEx.enough = my_gold >= price;

            return price;
             **/
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var r_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            var has_up = false;
            var team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
            var all_money = 0;
            for (var i = EquipPos.Weapon; i <= EquipPos.Shoe; ++i) {
                var e_info = r_info.getEquipByPos(i);
                if (null == e_info)
                    continue;
                if (e_info.equip_id == 0)
                    continue;
                var cur_up_cfg = Template.equipup.get(e_info.stg_lv);
                if (null == cur_up_cfg)
                    continue;
                var target_lv = team_lv * 2;
                var up_cfg = Template.equipup.get(target_lv);
                if (up_cfg == null)
                    continue;
                if (target_lv <= e_info.stg_lv)
                    continue;
                for (var t = e_info.stg_lv; t < target_lv; ++t) {
                    var t_cfg = Template.equipup.get(t);
                    all_money += t_cfg.BasicsGold;
                }
                has_up = true;
            }
            if (!has_up) {
                all_money = 0;
            }
            var my_gold = Singleton.Get(PlayerInfoManager).getGold();
            //this.btnSubmitEx.cost = all_money.toString();
            //this.btnSubmitEx.enough = my_gold >= all_money;
            return all_money;
        };
        /**
         * 设定第二条属性显隐
         * @param str_attr
         */
        RoleEquipStrengthView.prototype.setAttr2Visible = function (attrs) {
            if (attrs.length < 2) {
                this.labCurAttr2.visible = false;
                this.labTxtCurAttr2.visible = false;
                this.labNextAttr2.visible = false;
                this.labTxtNextAttr2.visible = false;
            }
            else {
                this.labCurAttr2.visible = true;
                this.labTxtCurAttr2.visible = true;
                this.labNextAttr2.visible = true;
                this.labTxtNextAttr2.visible = true;
            }
        };
        // endregion
        // region 响应部位点击
        RoleEquipStrengthView.prototype.onClick_posWeapon = function () {
            this.initCurPos(EquipPos.Weapon);
        };
        RoleEquipStrengthView.prototype.onClick_posChest = function () {
            this.initCurPos(EquipPos.Chest);
        };
        RoleEquipStrengthView.prototype.onClick_posLeg = function () {
            this.initCurPos(EquipPos.Leg);
        };
        RoleEquipStrengthView.prototype.onClick_posShoe = function () {
            this.initCurPos(EquipPos.Shoe);
        };
        RoleEquipStrengthView.prototype.activatePos = function (pos) {
            this.imgWeaponActive.visible = false;
            this.imgChestActive.visible = false;
            this.imgLegActive.visible = false;
            this.imgShoeActive.visible = false;
            switch (pos) {
                case EquipPos.Weapon:
                    this.imgWeaponActive.visible = true;
                    break;
                case EquipPos.Chest:
                    this.imgChestActive.visible = true;
                    break;
                case EquipPos.Leg:
                    this.imgLegActive.visible = true;
                    break;
                case EquipPos.Shoe:
                    this.imgShoeActive.visible = true;
                    break;
            }
        };
        // endregion
        // region 特效
        /**
         * 播放强化成功特效
         */
        RoleEquipStrengthView.prototype.playEffect = function (multi, pos_ex) {
            if (multi === void 0) { multi = false; }
            if (pos_ex === void 0) { pos_ex = []; }
            this.groupSuccess.visible = true;
            if (!multi) {
                this.playEffectBack(this.mcSelectedBack);
                this.playEffectFront(this.mcSelectedFront);
                return;
            }
            for (var i = 0; i < pos_ex.length; i++) {
                switch (pos_ex[i]) {
                    case EquipPos.Weapon:
                        this.playEffectBack(this.mcWeaponBack);
                        this.playEffectFront(this.mcWeaponFront);
                        break;
                    case EquipPos.Chest:
                        this.playEffectBack(this.mcChestBack);
                        this.playEffectFront(this.mcChestFront);
                        break;
                    case EquipPos.Leg:
                        this.playEffectBack(this.mcLegBack);
                        this.playEffectFront(this.mcLegFront);
                        break;
                    case EquipPos.Shoe:
                        this.playEffectBack(this.mcShoeBack);
                        this.playEffectFront(this.mcShoeFront);
                        break;
                }
            }
        };
        /**
         * 清空强化成功特效
         */
        RoleEquipStrengthView.prototype.clearEffect = function () {
            this.onEffectEnd();
            this.mcSelectedBack.clearMovieClip();
            this.mcSelectedFront.clearMovieClip();
            this.mcWeaponBack.clearMovieClip();
            this.mcWeaponFront.clearMovieClip();
            this.mcChestBack.clearMovieClip();
            this.mcChestFront.clearMovieClip();
            this.mcLegBack.clearMovieClip();
            this.mcLegFront.clearMovieClip();
            this.mcShoeBack.clearMovieClip();
            this.mcShoeFront.clearMovieClip();
        };
        /**
         * 响应特效播放完成
         */
        RoleEquipStrengthView.prototype.onEffectEnd = function () {
            this.groupSuccess.visible = false;
            this.mcSelectedBack.visible = false;
            this.mcSelectedFront.visible = false;
            this.mcWeaponBack.visible = false;
            this.mcWeaponFront.visible = false;
            this.mcChestBack.visible = false;
            this.mcChestFront.visible = false;
            this.mcLegBack.visible = false;
            this.mcLegFront.visible = false;
            this.mcShoeBack.visible = false;
            this.mcShoeFront.visible = false;
        };
        RoleEquipStrengthView.prototype.playEffectBack = function (mc) {
            mc.visible = true;
            mc.clearMovieClip();
            mc.setMovieClip("ui_ten");
            mc.gotoAndPlay("ui_ten", 1);
        };
        RoleEquipStrengthView.prototype.playEffectFront = function (mc) {
            mc.visible = true;
            mc.clearMovieClip();
            mc.setMovieClip("ui_ten1");
            mc.gotoAndPlay("ui_ten1", 1);
        };
        // endregion
        // region 强化请求
        /**
         * 响应强化按钮点击事件
         */
        RoleEquipStrengthView.prototype.onClick_btnSubmit = function () {
            // 读取基本信息
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            var my_equip = my_info.getEquipByPos(this.cur_pos);
            // 检查是否有装备
            if (my_equip.equip_id <= 0) {
                Singleton.Get(DialogControler).showInfo(1121);
                return;
            }
            // 检查满级
            if (my_equip.is_str_max) {
                //Singleton.Get(DialogControler).showString(Template.getGUIText("prompt1"));
                Singleton.Get(DialogControler).showInfo(1142);
                return;
            }
            // 检查金钱是否足够
            var my_gold = Singleton.Get(PlayerInfoManager).getGold();
            if (my_gold <= my_equip.levelup_cost) {
                Singleton.Get(DialogControler).showInfo(1004);
                return;
            }
            // 发送强化请求
            Singleton.Get(EquipManager).onReqStrength(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId(), this.cur_pos);
        };
        /**
         * 响应一键强化按钮点击事件
         */
        RoleEquipStrengthView.prototype.onClick_btnSubmitEx = function () {
            UtilsEffect.buttonEffect(this.btnSubmitEx);
            var price = this.setAutoLevelupPrice();
            if (price <= 0) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_139"));
                return;
            }
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (my_role == null) {
                MessageManager.handleDisconnect(984);
                return;
            }
            // 检查是否存在已装备的装备
            var equips = my_role.equips;
            var has_equiped = false;
            for (var i = 0; i < equips.length; i++) {
                if (equips[i].equip_id > 0) {
                    has_equiped = true;
                    break;
                }
            }
            if (!has_equiped) {
                Singleton.Get(DialogControler).showInfo(1121);
                return;
            }
            // 发送一键强化请求
            Singleton.Get(EquipManager).onReqStrengthAuto(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId());
        };
        return RoleEquipStrengthView;
    }(BaseUI));
    ui.RoleEquipStrengthView = RoleEquipStrengthView;
    __reflect(RoleEquipStrengthView.prototype, "ui.RoleEquipStrengthView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleEquipStrengthView.js.map