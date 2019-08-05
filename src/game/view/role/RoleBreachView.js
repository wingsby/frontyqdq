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
    var RoleBreachView = (function (_super) {
        __extends(RoleBreachView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleBreachView() {
            var _this = _super.call(this, "yw.RoleBreachSkin") || this;
            _this.touchEnabled = false;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleBreachView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleBreachView.prototype.onDestroy = function () {
            this.btnBreach.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBreach, this);
            this.compCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_compCard, this);
            this.listItems.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
        };
        /**
         * 帧更新
         * @param time
         */
        RoleBreachView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleBreachView.prototype.init = function () {
            this.initGuiText();
            this.initEvent();
            this.listItems.itemRenderer = ui.RoleItemView;
        };
        /**
         * 初始化GUI文字
         */
        RoleBreachView.prototype.initGuiText = function () {
            this.btnBreach.text = Template.getGUIText("ui_role12");
            // this.labCurAttrWord.text = Template.getGUIText("ui_role20");
            // this.labNextAttrWord.text = Template.getGUIText("ui_role21");
        };
        /**
         * 初始化事件
         */
        RoleBreachView.prototype.initEvent = function () {
            this.btnBreach.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnBreach, this);
            this.compCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_compCard, this);
            this.listItems.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleBreachView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.initRoleInfo();
        };
        /**
         * 关闭本界面
         */
        RoleBreachView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        RoleBreachView.prototype.refresh = function () {
            this.initRoleInfo();
        };
        // endregion
        // region 展示
        RoleBreachView.prototype.initRoleInfo = function () {
            // 获取当前选中的角色
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            // 获取角色信息
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (!my_info) {
                egret.error("no roleId: " + role_id);
                return;
            }
            // 获取角色基本配置
            var role_info = Template.role.get(role_id);
            if (!role_info) {
                egret.error("no roleId: " + role_id);
                return;
            }
            Common.fillRoleCard(role_id, this.compCard);
            // this.labCurHp.text = my_info.max_hp.toString();
            // this.labCurDef.text = my_info.def.toString();
            // this.labCurAtk.text = my_info.atk.toString();
            // this.labCurDefSp.text = my_info.skill_def.toString();
            // this.labCurAtkSp.text = my_info.skill_atk.toString();
            /**
            if (my_info.breach >= role_info.BreachId.length) {
                this.imgTrans.visible = false;
            } else {
                this.imgTrans.visible = true;
            }
             */
            this.labTxtCur.text = Template.getGUIText(role_info.Name) + "+" + my_info.breach;
            this.labTxtNext.text = Template.getGUIText(role_info.Name) + "+" + (my_info.breach + 1);
            var cur_attr_add = my_info.GetCurAllBreachAddition();
            this.labOffsetHp.text = "+" + Math.floor(cur_attr_add.hp).toString();
            this.labOffsetAtk.text = "+" + Math.floor(cur_attr_add.atk).toString();
            this.labOffsetDef.text = "+" + Math.floor(cur_attr_add.def).toString();
            this.labOffsetAtkSp.text = "+" + Math.floor(cur_attr_add.atk_sp).toString();
            this.labOffsetDefSp.text = "+" + Math.floor(cur_attr_add.def_sp).toString();
            // 检查是否是最高突破等级
            if (my_info.breach >= role_info.BreachId.length) {
                this.groupOper.visible = false;
                this.groupMax.visible = true;
                this.labEffect1.text = "天赋已经全部解锁";
                // this.groupNextAttr.visible = false;
                // this.labTipLv.visible = false;
                // this.labTipBreachAtt.visible = false;
                this.labOffsetHpNext.text = this.labOffsetHp.text;
                this.labOffsetAtkNext.text = this.labOffsetAtk.text;
                this.labOffsetDefNext.text = this.labOffsetDef.text;
                this.labOffsetAtkSpNext.text = this.labOffsetAtkSp.text;
                this.labOffsetDefSpNext.text = this.labOffsetDefSp.text;
                return;
            }
            else {
                this.groupOper.visible = true;
                this.groupMax.visible = false;
                // this.groupNextAttr.visible = true;
                // this.labTipLv.visible = true;
                // this.labTipBreachAtt.visible = true;
                var next_attr_add = my_info.GetNextBreachAddition();
                this.labOffsetHpNext.text = "+" + Math.floor(next_attr_add.hp).toString();
                this.labOffsetAtkNext.text = "+" + Math.floor(next_attr_add.atk).toString();
                this.labOffsetDefNext.text = "+" + Math.floor(next_attr_add.def).toString();
                this.labOffsetAtkSpNext.text = "+" + Math.floor(next_attr_add.atk_sp).toString();
                this.labOffsetDefSpNext.text = "+" + Math.floor(next_attr_add.def_sp).toString();
            }
            // let next_attr: number[] = my_info.GetNextBreachAttrDelta();
            // this.labNextHp.text = (my_info.max_hp + next_attr[0]).toString();
            // this.labNextAtk.text = (my_info.atk + next_attr[1]).toString();
            // this.labNextDef.text = (my_info.def + next_attr[2]).toString();
            // this.labNextAtkSp.text = (my_info.skill_atk + next_attr[3]).toString();
            // this.labNextDefSp.text = (my_info.skill_def + next_attr[4]).toString();
            // 计算突破价格
            var next_breach_ids = my_info.GetNextBreachId();
            if (!next_breach_ids) {
                egret.error("no roleId: " + role_id + ", curBreach: " + my_info.breach);
                return;
            }
            var next_breach_info = Template.breach.get(next_breach_ids);
            if (!next_breach_info) {
                egret.error("no roleId: " + role_id + ", nextBreach: " + next_breach_ids[0]);
                return;
            }
            this.btnBreach.cost = UtilsGame.numberToString(next_breach_info.BreachMoney);
            this.btnBreach.enough = next_breach_info.BreachMoney < Singleton.Get(PlayerInfoManager).getGold();
            var dict_id = (my_info.lv >= next_breach_info.RoleLv) ? "ui_role78" : "ui_role79";
            this.labNeedLv.textFlow = (new egret.HtmlTextParser).parser(UtilsGame.stringHander(Template.getGUIText(dict_id), my_info.breach, my_info.breach + 1, my_info.lv, next_breach_info.RoleLv));
            // 天赋等级
            var tianfu_str = "解锁天赋" + (my_info.breach + 1) + " ";
            // 天赋属性
            for (var i = 0; i < 3; i++) {
                if (i < next_breach_info.BreachAtt.length) {
                    tianfu_str += RoleUtil.GetAttrPrefixString(next_breach_info.BreachAtt[i]);
                    tianfu_str += "+" + Common.attrValueHandlerWithPct(next_breach_info.BreachAttvalue[i], next_breach_info.BreachAtt[i]) + " ";
                }
            }
            this.labEffect1.text = tianfu_str;
            // 初始化道具列表
            this.initItemList(next_breach_info);
        };
        /**
         * 初始化道具列表
         */
        RoleBreachView.prototype.initItemList = function (breach_info) {
            var item_ids = breach_info.BreachItem;
            var item_counts = breach_info.BreachCounts;
            var ds_list_item = [];
            this.listItems.dataProvider = new eui.ArrayCollection(ds_list_item);
            var mat_count = 0;
            for (var i = 0; i < item_ids.length; i++) {
                // 超过3个道具则不添加
                if (i >= 3) {
                    break;
                }
                mat_count = i;
                var item_id = item_ids[i];
                var item_info = Template.item.get(item_id);
                var item_need_count = item_counts[i];
                var item_have_count = Singleton.Get(BagManager).getItemCount(item_id);
                var item_enough = Singleton.Get(BagManager).hasEnough(item_id, item_need_count);
                ds_list_item.push({
                    item_id: item_id,
                    tierBg: Common.getItemTierBgRes(item_info.iStar),
                    icon: item_info.iIcon,
                    count: item_have_count + "/" + item_need_count,
                    textColor: item_enough ? DEFINE_COLOR.OK_GREEN : DEFINE_COLOR.WARN_RED,
                    frag: false
                });
            }
            if (mat_count < 3) {
                var role_id = Singleton.Get(ui.RoleBaseView).getCurActiveRoleId();
                var role_entity = Template.role.get(role_id);
                if (!role_entity) {
                    console.error("no role: " + role_id);
                    return;
                }
                var frag_entity = Template.item.get(role_entity.Fragment);
                if (!frag_entity) {
                    console.error("no frag: " + role_entity.Fragment);
                    return;
                }
                var need_count = breach_info.FragmentNum;
                var have_count = Singleton.Get(BagManager).getItemCount(frag_entity.ID);
                var item_enough = Singleton.Get(BagManager).hasEnough(frag_entity.ID, need_count);
                // 无角色碎片消耗 不显示
                if (!need_count || need_count <= 0) {
                    return;
                }
                ds_list_item.push({
                    item_id: frag_entity.ID,
                    tierBg: Common.getItemTierBgRes(frag_entity.iStar),
                    icon: frag_entity.iIcon,
                    count: have_count + "/" + need_count,
                    textColor: item_enough ? DEFINE_COLOR.OK_GREEN : DEFINE_COLOR.WARN_RED,
                    frag: true
                });
            }
        };
        RoleBreachView.prototype.playCardDynamic = function () {
            egret.Tween.removeTweens(this.groupCard);
            this.groupCard.rotation = -20;
            this.groupCard.x = 100;
            var tw_card = egret.Tween.get(this.groupCard);
            tw_card.to({ x: 142, rotation: 0 }, 240, egret.Ease.backOut);
        };
        RoleBreachView.prototype.playCardDynamicFromLevelup = function () {
            egret.Tween.removeTweens(this.groupCard);
            this.groupCard.x = 6;
            this.groupCard.y = 378;
            this.groupCard.scaleX = 1;
            this.groupCard.scaleY = 1;
            var tw_card = egret.Tween.get(this.groupCard);
            tw_card.to({ x: 142, y: 252, scaleX: 0.64, scaleY: 0.64, rotation: 0 }, 240, egret.Ease.sineOut);
        };
        RoleBreachView.prototype.playCardDynamicFromTalent = function () {
            egret.Tween.removeTweens(this.groupCard);
            this.groupCard.x = 36;
            this.groupCard.y = 264;
            this.groupCard.scaleX = 0.64;
            this.groupCard.scaleY = 0.64;
            var tw_card = egret.Tween.get(this.groupCard);
            tw_card.to({ x: 142, y: 252, scaleX: 0.64, scaleY: 0.64, rotation: 0 }, 240, egret.Ease.sineOut);
        };
        // endregion
        // region 点击事件
        /**
         * 响应突破按钮点击事件
         */
        RoleBreachView.prototype.onClick_btnBreach = function () {
            UtilsEffect.buttonEffect(this.btnBreach);
            // 获取当前选中的角色
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            // 获取角色信息
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (!my_info) {
                egret.error("no roleId: " + role_id);
                return;
            }
            // 计算突破价格
            var next_breach_ids = my_info.GetNextBreachId();
            if (!next_breach_ids) {
                egret.error("no breach roleId: " + role_id + ", curBreach: " + my_info.breach);
                return;
            }
            // 下级突破信息
            var next_breach_info = Template.breach.get(next_breach_ids);
            if (!next_breach_info) {
                egret.error("no breach, roleId: " + role_id + ", nextBreach: " + next_breach_ids[0]);
                return;
            }
            // 天赋等级
            var tianfu_str = "解锁天赋" + (my_info.breach + 1) + " ";
            // 天赋属性
            for (var i = 0; i < 3; i++) {
                if (i < next_breach_info.BreachAtt.length) {
                    tianfu_str += RoleUtil.GetAttrPrefixString(next_breach_info.BreachAtt[i]);
                    tianfu_str += "+" + Common.attrValueHandlerWithPct(next_breach_info.BreachAttvalue[i], next_breach_info.BreachAtt[i]) + " ";
                }
            }
            this.labEffect1.text = tianfu_str;
            Singleton.Get(LayerManager).getView(ui.RoleSuccessView).setOldData(role_id);
            Singleton.Get(LayerManager).getView(ui.RoleSuccessView).setTip1(UtilsGame.stringHander("解锁天赋：天赋$1", my_info.breach + 1));
            Singleton.Get(LayerManager).getView(ui.RoleSuccessView).setTip2(tianfu_str);
            Singleton.Get(RoleManager).onReqBreach(role_id);
        };
        /**
         * 响应点击卡牌
         */
        RoleBreachView.prototype.onClick_compCard = function () {
            var paint = Singleton.Get(LayerManager).getView(ui.RolePaintView);
            paint.open(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId());
        };
        /**
         * 响应点击消耗道具列表
         * @param e
         */
        RoleBreachView.prototype.onClick_listItems = function (e) {
            Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(e.item.item_id);
        };
        return RoleBreachView;
    }(BaseUI));
    ui.RoleBreachView = RoleBreachView;
    __reflect(RoleBreachView.prototype, "ui.RoleBreachView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleBreachView.js.map