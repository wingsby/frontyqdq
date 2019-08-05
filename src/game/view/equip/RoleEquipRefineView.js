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
    var RoleEquipRefineView = (function (_super) {
        __extends(RoleEquipRefineView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleEquipRefineView() {
            var _this = _super.call(this, "yw.RoleEquipRefineSkin") || this;
            _this.cur_pos = EquipPos.Null; // 当前选中的装备槽位
            _this.touchEnabled = false;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleEquipRefineView.prototype.componentCreated = function () {
        };
        /**
         * 初始化
         */
        RoleEquipRefineView.prototype.init = function () {
            this.initGuiText();
            this.initEvent();
        };
        /**
         * 初始化UI文字
         */
        RoleEquipRefineView.prototype.initGuiText = function () {
            this.btnSubmit.text = Template.getGUIText("ui_equip2");
        };
        /**
         * 初始化事件绑定
         */
        RoleEquipRefineView.prototype.initEvent = function () {
            this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
            this.posWeapon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posWeapon, this);
            this.posChest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posChest, this);
            this.posLeg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posLeg, this);
            this.posShoe.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posShoe, this);
            this.listItems.itemRenderer = ui.RoleItemView;
            this.listItems.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
            this.mcSelected.setCallback(this.onEffectEnd, this);
        };
        /**
         * 响应销毁
         */
        RoleEquipRefineView.prototype.onDestroy = function () {
            this.btnSubmit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
            this.posWeapon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posWeapon, this);
            this.posChest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posChest, this);
            this.posLeg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posLeg, this);
            this.posShoe.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_posShoe, this);
        };
        /**
         * 帧更新
         * @param time
         */
        RoleEquipRefineView.prototype.onUpdate = function (time) {
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleEquipRefineView.prototype.open = function () {
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
        RoleEquipRefineView.prototype.openPos = function (pos) {
            Singleton.Get(LayerManager).addView(this);
            this.initEquipInfo();
            this.initCurPos(pos);
            this.playOpenAni();
        };
        /**
         * 关闭本界面
         */
        RoleEquipRefineView.prototype.close = function () {
            this.clearEffect();
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**
         * 刷新
         */
        RoleEquipRefineView.prototype.refresh = function (reset) {
            if (reset === void 0) { reset = true; }
            if (Singleton.Get(LayerManager).isViewOnStage(this)) {
                this.initEquipInfo();
                if (reset || this.cur_pos <= 0) {
                    this.initCurPos(EquipPos.Weapon);
                    this.playOpenAni();
                }
                else {
                    this.playEffect();
                    this.initCurPos(this.cur_pos);
                }
            }
        };
        /**
         * 播放开启动画
         */
        RoleEquipRefineView.prototype.playOpenAni = function () {
            // Common.playStackAni(undefined, [this.posSelected, this.posWeapon, this.posChest, this.posLeg, this.posShoe], undefined, undefined, 2);
        };
        // endregion
        // region 展示
        /**
         * 初始化装备Info
         */
        RoleEquipRefineView.prototype.initEquipInfo = function () {
            // 获取当前选中的角色
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            // 判空
            if (my_info == null) {
                egret.error("no roleId: " + role_id);
                return;
            }
            // 获取角色基本配置
            var role_info = Template.role.get(role_id);
            // 判空
            if (role_info == null) {
                egret.error("no roleId: " + role_id);
                return;
            }
            // 展示已有的装备
            var my_weapon = my_info.getEquipByPos(EquipPos.Weapon);
            this.labWeaponStar.text = my_weapon.rfn_lv.toString();
            this.imgWeaponNew.visible = my_weapon.isRefineAble();
            if (my_weapon.equip_id > 0) {
                this.groupWeaponItem.visible = true;
                ResManager.AsyncSetTexture(this.imgWeaponIcon, my_weapon.item_info.iIcon);
                ResManager.AsyncSetTexture(this.imgWeaponTier, Common.getItemTierBgRes(my_weapon.item_info.iStar));
            }
            else {
                this.groupWeaponItem.visible = false;
            }
            var my_chest = my_info.getEquipByPos(EquipPos.Chest);
            this.labChestStar.text = my_chest.rfn_lv.toString();
            this.imgChestNew.visible = my_chest.isRefineAble();
            if (my_chest.equip_id > 0) {
                this.groupChestItem.visible = true;
                ResManager.AsyncSetTexture(this.imgChestIcon, my_chest.item_info.iIcon);
                ResManager.AsyncSetTexture(this.imgChestTier, Common.getItemTierBgRes(my_chest.item_info.iStar));
            }
            else {
                this.groupChestItem.visible = false;
            }
            var my_leg = my_info.getEquipByPos(EquipPos.Leg);
            this.labLegStar.text = my_leg.rfn_lv.toString();
            this.imgLegNew.visible = my_leg.isRefineAble();
            if (my_leg.equip_id > 0) {
                this.groupLegItem.visible = true;
                ResManager.AsyncSetTexture(this.imgLegIcon, my_leg.item_info.iIcon);
                ResManager.AsyncSetTexture(this.imgLegTier, Common.getItemTierBgRes(my_leg.item_info.iStar));
            }
            else {
                this.groupLegItem.visible = false;
            }
            var my_shoe = my_info.getEquipByPos(EquipPos.Shoe);
            this.labShoeStar.text = my_shoe.rfn_lv.toString();
            this.imgShoeNew.visible = my_shoe.isRefineAble();
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
        RoleEquipRefineView.prototype.initCurPos = function (pos) {
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
            this.labSelectedStar.text = Common.getEquipPosWord(pos) + "+" + my_equip.rfn_lv;
            var max_lv = Singleton.Get(EquipManager).getMaxRefineLv();
            this.labCurLv.text = my_equip.rfn_lv + "/" + max_lv;
            this.labNextLv.text = (my_equip.rfn_lv + 1).toString();
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
                */
                this.groupAttrs.visible = true;
                this.groupSelectedItem.visible = true;
                ResManager.AsyncSetTexture(this.imgSelectedIcon, my_equip.item_info.iIcon);
                ResManager.AsyncSetTexture(this.imgSelectedTier, Common.getItemTierBgRes(my_equip.item_info.iStar));
                this.labSelectedStr.text = "Lv." + my_equip.stg_lv.toString();
                this.labSelectedRefine.text = my_equip.rfn_lv.toString();
                // 计算属性
                var refine_attr = my_equip.refine_attr;
                var next_refine_attr = my_equip.next_refine_attr;
                this.labTxtCurAttr1.text = RoleUtil.GetAttrPrefixString(refine_attr[0][0]);
                this.labCurAttr1.text = Common.attrValueHandlerWithPct(refine_attr[0][1], refine_attr[0][0]);
                this.labTxtNextAttr1.text = RoleUtil.GetAttrPrefixString(next_refine_attr[0][0]);
                this.labNextAttr1.text = Common.attrValueHandlerWithPct(next_refine_attr[0][1], next_refine_attr[0][0]);
                if (refine_attr.length >= 2) {
                    this.labTxtCurAttr2.text = RoleUtil.GetAttrPrefixString(refine_attr[1][0]);
                    this.labCurAttr2.text = Common.attrValueHandlerWithPct(refine_attr[1][1], refine_attr[1][0]);
                    this.labTxtNextAttr2.text = RoleUtil.GetAttrPrefixString(next_refine_attr[1][0]);
                    this.labNextAttr2.text = Common.attrValueHandlerWithPct(next_refine_attr[1][1], next_refine_attr[1][0]);
                }
            }
            // 已达最高等级
            if (my_equip.is_refine_max) {
                this.groupOper.visible = false;
                this.groupMax.visible = true;
                this.labNextLv.visible = false;
                this.labTxtNextLv.visible = false;
                this.labNextAttr1.visible = false;
                this.labNextAttr2.visible = false;
                this.labTxtNextAttr1.visible = false;
                this.labTxtNextAttr2.visible = false;
                this.imgTrans.visible = false;
                var ds_list_item = [];
                this.listItems.dataProvider = new eui.ArrayCollection(ds_list_item);
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
                var ds_list_item = [];
                this.listItems.dataProvider = new eui.ArrayCollection(ds_list_item);
                var cost_items = my_equip.refine_cost;
                for (var i = 0; i < cost_items.length; i++) {
                    // 超过3个道具则不添加
                    if (i >= 3) {
                        break;
                    }
                    var item_id = cost_items[i][0];
                    var item_info = Template.item.get(item_id);
                    if (item_info == null) {
                        egret.error("no itemId: " + item_id);
                        continue;
                    }
                    var item_need_count = cost_items[i][1];
                    var item_have_count = Singleton.Get(BagManager).getItemCount(item_id);
                    var item_enough = Singleton.Get(BagManager).hasEnough(item_id, item_need_count);
                    ds_list_item.push({
                        item_id: item_id,
                        tierBg: Common.getItemTierBgRes(item_info.iStar),
                        icon: item_info.iIcon,
                        count: item_have_count + "/" + item_need_count,
                        textColor: item_enough ? DEFINE_COLOR.OK_GREEN : DEFINE_COLOR.WARN_RED
                    });
                }
                // 设定第二条属性显隐
                if (my_equip.equip_info != null) {
                    // console.log(my_equip);
                    this.setAttr2Visible(my_equip.refine_attr);
                }
            }
        };
        /**
         * 设定第二条属性显隐
         * @param str_attr
         */
        RoleEquipRefineView.prototype.setAttr2Visible = function (attrs) {
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
        /**
         * 播放强化成功特效
         */
        RoleEquipRefineView.prototype.playEffect = function () {
            this.mcSelected.touchEnabled = false;
            this.mcSelected.visible = true;
            this.groupSuccess.visible = true;
            this.mcSelected.clearMovieClip();
            this.mcSelected.setMovieClip("ui_jinglian");
            this.mcSelected.gotoAndPlay("ui_jinglian", 1);
        };
        /**
         * 清空强化成功特效
         */
        RoleEquipRefineView.prototype.clearEffect = function () {
            this.groupSuccess.visible = false;
            this.mcSelected.visible = false;
            this.mcSelected.clearMovieClip();
        };
        /**
         * 响应特效播放完成
         */
        RoleEquipRefineView.prototype.onEffectEnd = function () {
            this.groupSuccess.visible = false;
            this.mcSelected.visible = false;
        };
        // endregion
        // region 响应部位点击
        RoleEquipRefineView.prototype.onClick_posWeapon = function () {
            this.initCurPos(EquipPos.Weapon);
        };
        RoleEquipRefineView.prototype.onClick_posChest = function () {
            this.initCurPos(EquipPos.Chest);
        };
        RoleEquipRefineView.prototype.onClick_posLeg = function () {
            this.initCurPos(EquipPos.Leg);
        };
        RoleEquipRefineView.prototype.onClick_posShoe = function () {
            this.initCurPos(EquipPos.Shoe);
        };
        RoleEquipRefineView.prototype.activatePos = function (pos) {
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
        // region 强化请求
        /**
         * 响应强化按钮点击事件
         */
        RoleEquipRefineView.prototype.onClick_btnSubmit = function () {
            // 读取基本信息
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            var my_equip = my_info.getEquipByPos(this.cur_pos);
            // 检查是否有装备
            if (my_equip.equip_id <= 0) {
                Singleton.Get(DialogControler).showInfo(1122);
                return;
            }
            // 检查满级
            if (my_equip.is_refine_max) {
                Singleton.Get(DialogControler).showInfo(1117);
                return;
            }
            // 发送精炼请求
            Singleton.Get(EquipManager).onReqRefine(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId(), this.cur_pos);
        };
        /**
         * 响应点击消耗道具列表
         * @param e
         */
        RoleEquipRefineView.prototype.onClick_listItems = function (e) {
            Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(e.item.item_id);
        };
        return RoleEquipRefineView;
    }(BaseUI));
    ui.RoleEquipRefineView = RoleEquipRefineView;
    __reflect(RoleEquipRefineView.prototype, "ui.RoleEquipRefineView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleEquipRefineView.js.map