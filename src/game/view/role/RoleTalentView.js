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
    var RoleTalentView = (function (_super) {
        __extends(RoleTalentView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleTalentView() {
            var _this = _super.call(this, "yw.RoleTalentSkin") || this;
            _this.touchEnabled = false;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleTalentView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleTalentView.prototype.onDestroy = function () {
            this.btnTalent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTalent, this);
            this.compCurCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_compCard, this);
            this.listItems.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
        };
        /**
         * 帧更新
         * @param time
         */
        RoleTalentView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleTalentView.prototype.init = function () {
            this.listItems.itemRenderer = ui.RoleItemView;
            this.btnTalent.text = Template.getGUIText("ui_role13");
            /**
            var lab:eui.Label[] = [this.labCurAttrWord, this.labNextAttrWord];
            for (var i = 0; i < lab.length; ++i)
            {
                lab[i].text = Template.getGUIText(lab[i].text);
            }
             */
            this.btnTalent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnTalent, this);
            this.compCurCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_compCard, this);
            this.listItems.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick_listItems, this);
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleTalentView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.initRoleInfo();
        };
        /**
         * 关闭本界面
         */
        RoleTalentView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        RoleTalentView.prototype.refresh = function () {
            this.initRoleInfo();
        };
        // endregion
        // region 显示角色信息
        /**
         * 初始化角色信息
         */
        RoleTalentView.prototype.initRoleInfo = function () {
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            // 判空
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
            // 获取本级天赋信息
            var role_talent = Template.talent.get(my_info.talent);
            if (!role_talent) {
                egret.error("no roleId: " + role_id + ", talentId: " + my_info.talent);
                return;
            }
            Common.fillRoleCard(role_id, this.compCurCard);
            this.labTxtCur.text = "进阶 " + my_info.talent;
            var cur_attr = my_info.GetCurTalentAddition();
            this.labCurHp.text = Math.floor(cur_attr.hp).toString();
            this.labCurDef.text = Math.floor(cur_attr.def).toString();
            this.labCurAtk.text = Math.floor(cur_attr.atk).toString();
            this.labCurDefSp.text = Math.floor(cur_attr.def_sp).toString();
            this.labCurAtkSp.text = Math.floor(cur_attr.atk_sp).toString();
            // 获取角色技能信息
            var skill_info = Template.skill.get(role_info.Skill);
            if (!skill_info) {
                egret.error("no roleId: " + role_id + ", skillId: " + role_info.Skill);
                return;
            }
            this.labOffsetSkill.text = Template.getGUIText(skill_info.Name);
            // 获取下级天赋信息
            var next_talent = Template.talent.get(my_info.talent + 1);
            if (!next_talent || next_talent == role_talent) {
                this.groupMax.visible = true;
                this.groupOper.visible = false;
                this.groupLvMax.visible = true;
                this.groupLvNotMax.visible = false;
                this.labTalentCurMax.text = my_info.getTalentNum() + "（已最高）";
                this.labTalCurMax.text = my_info.talent.toString();
                this.labSkillLvCurMax.text = "Lv." + my_info.skill_lv.toString();
                this.labNextHp.text = Math.floor(cur_attr.hp).toString();
                this.labNextAtk.text = Math.floor(cur_attr.atk).toString();
                this.labNextDef.text = Math.floor(cur_attr.def).toString();
                this.labNextAtkSp.text = Math.floor(cur_attr.atk_sp).toString();
                this.labNextDefSp.text = Math.floor(cur_attr.def_sp).toString();
            }
            else {
                this.groupMax.visible = false;
                this.groupOper.visible = true;
                this.groupLvMax.visible = false;
                this.groupLvNotMax.visible = true;
                this.labTalentCur.text = my_info.getTalentNum().toString();
                this.labTalentNext.text = my_info.getTalentNumNext().toString();
                this.labTalCur.text = my_info.talent.toString();
                this.labTalNext.text = (my_info.talent + 1).toString();
                this.labSkillLvCur.text = "Lv." + my_info.skill_lv.toString();
                this.labSkillLvNext.text = "Lv." + (my_info.skill_lv + 1).toString();
                this.labTxtNext.text = "进阶 " + (my_info.talent + 1);
                var next_attr = my_info.GetNextTalentAddition();
                this.labNextHp.text = "+" + Math.floor(next_attr.hp - cur_attr.hp).toString();
                this.labNextAtk.text = "+" + Math.floor(next_attr.atk - cur_attr.atk).toString();
                this.labNextDef.text = "+" + Math.floor(next_attr.def - cur_attr.def).toString();
                this.labNextAtkSp.text = "+" + Math.floor(next_attr.atk_sp - cur_attr.atk_sp).toString();
                this.labNextDefSp.text = "+" + Math.floor(next_attr.def_sp - cur_attr.def_sp).toString();
                // 显示价格
                var my_gold_count = Singleton.Get(PlayerInfoManager).getGold();
                this.btnTalent.cost = UtilsGame.numberToString(role_talent.TalentMoney);
                this.btnTalent.enough = (role_talent.TalentMoney < my_gold_count);
                // this.labSubmitDes.text = UtilsGame.stringHander(Template.getGUIText("ui_role84"), role_talent.TalentID, next_talent.TalentID);
                // 初始化道具列表
                this.initItemList(role_talent);
            }
            var skill_attrs = RoleUtil.getSkillValueDes(my_info);
            this.labSkillInfo.textFlow = new egret.HtmlTextParser().parser(UtilsGame.stringHanderEx(Template.getGUIText(skill_info.Des), skill_attrs));
            // Common.fillRoleCardNextTalent(role_id, this.compNextCard);
            // this.labNextHp.text = (my_info.max_hp + next_attr[0]).toString();
            // this.labNextDef.text = (my_info.def + next_attr[2]).toString()
            // this.labNextAtk.text = (my_info.atk + next_attr[1]).toString();
            // this.labNextDefSp.text = (my_info.skill_def + next_attr[4]).toString();
            // this.labNextAtkSp.text = (my_info.skill_atk + next_attr[3]).toString();
            // this.lanCurTalent.text = UtilsGame.stringHander("资质：$1", role_talent.TalentNum);
            // this.labNextTalent.text = UtilsGame.stringHander("资质：$1", next_talent.TalentNum);
            // this.labCurSkill.text = UtilsGame.stringHander("技能：$1 Lv.$2", Template.getGUIText(skill_info.Name), role_talent.TalentSkill);
            // this.labNextSkill.text = UtilsGame.stringHander("技能：$1 Lv.$2", Template.getGUIText(skill_info.Name), next_talent.TalentSkill);
        };
        /**
         * 初始化道具列表
         */
        RoleTalentView.prototype.initItemList = function (talent_info) {
            var item_ids = talent_info.TalentItem;
            var item_counts = talent_info.TalentCounts;
            // TODO 下半部分和突破一样，考虑抽函数
            // 2017/3/24 reply 还是算了
            var ds_list_item = [];
            this.listItems.dataProvider = new eui.ArrayCollection(ds_list_item);
            if (!item_ids || item_ids[0] == 0) {
                return;
            }
            for (var i = 0; i < item_ids.length; i++) {
                // 超过3个道具则不添加
                if (i >= 3) {
                    break;
                }
                var item_id = item_ids[i];
                var item_info = Template.item.get(item_id);
                var item_need_count = item_counts[i];
                var item_have_count = Singleton.Get(BagManager).getItemCount(item_id);
                var item_enough = Singleton.Get(BagManager).hasEnough(item_id, item_need_count);
                // console.log("item_enough: " + item_enough);
                ds_list_item.push({
                    item_id: item_id,
                    tierBg: Common.getItemTierBgRes(item_info.iStar),
                    icon: item_info.iIcon,
                    count: item_have_count + "/" + item_need_count,
                    textColor: item_enough ? DEFINE_COLOR.OK_GREEN : DEFINE_COLOR.WARN_RED
                });
            }
        };
        RoleTalentView.prototype.playCardDynamic = function () {
            egret.Tween.removeTweens(this.groupCard);
            this.groupCard.rotation = -20;
            this.groupCard.x = 10;
            var tw_card = egret.Tween.get(this.groupCard);
            tw_card.to({ x: 36, rotation: 0 }, 240, egret.Ease.backOut);
        };
        RoleTalentView.prototype.playCardDynamicFromLevelup = function () {
            egret.Tween.removeTweens(this.groupCard);
            this.groupCard.x = 6;
            this.groupCard.y = 378;
            this.groupCard.scaleX = 1;
            this.groupCard.scaleY = 1;
            var tw_card = egret.Tween.get(this.groupCard);
            tw_card.to({ x: 36, y: 264, scaleX: 0.64, scaleY: 0.64, rotation: 0 }, 240, egret.Ease.sineOut);
        };
        RoleTalentView.prototype.playCardDynamicFromBreach = function () {
            egret.Tween.removeTweens(this.groupCard);
            this.groupCard.x = 142;
            this.groupCard.y = 252;
            this.groupCard.scaleX = 0.64;
            this.groupCard.scaleY = 0.64;
            var tw_card = egret.Tween.get(this.groupCard);
            tw_card.to({ x: 36, y: 264, scaleX: 0.64, scaleY: 0.64, rotation: 0 }, 240, egret.Ease.sineOut);
        };
        // endregion
        // region 按钮事件
        /**
         * 响应升阶按钮点击事件
         */
        RoleTalentView.prototype.onClick_btnTalent = function () {
            UtilsEffect.buttonEffect(this.btnTalent);
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            // 获取我的角色信息
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            if (!my_info) {
                egret.error("no player roleId: " + role_id);
                return;
            }
            // 获取角色基本配置
            var role_info = Template.role.get(role_id);
            if (!role_info) {
                egret.error("no roleId: " + role_id);
                return;
            }
            // 获取本级天赋信息
            var role_talent = Template.talent.get(my_info.talent);
            if (!role_talent) {
                egret.error("no roleId: " + role_id + ", talentId: " + my_info.talent);
                return;
            }
            // 获取下一级天赋信息
            var next_talent = Template.talent.get(my_info.talent + 1);
            // 获取角色技能信息
            var skill_info = Template.skill.get(role_info.Skill);
            if (!skill_info) {
                egret.error("no skill, roleId: " + role_id + ", skillId: " + role_info.Skill);
                return;
            }
            Singleton.Get(LayerManager).getView(ui.RoleSuccessView).setOldData(role_id);
            Singleton.Get(LayerManager).getView(ui.RoleSuccessView).setTalent(my_info.getTalentNum(), (role_info.Talent + next_talent.TalentNum));
            var skill_str = UtilsGame.stringHander("技能：$1 等级+$2", Template.getGUIText(skill_info.Name), next_talent.TalentSkill - role_talent.TalentSkill);
            Singleton.Get(LayerManager).getView(ui.RoleSuccessView).setTip1(skill_str);
            Singleton.Get(LayerManager).getView(ui.RoleSuccessView).setTip2("");
            Singleton.Get(RoleManager).onReqTalent(role_id);
        };
        /**
         * 响应点击卡牌
         */
        RoleTalentView.prototype.onClick_compCard = function () {
            var paint = Singleton.Get(LayerManager).getView(ui.RolePaintView);
            paint.open(Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId());
        };
        /**
         * 响应点击消耗道具列表
         * @param e
         */
        RoleTalentView.prototype.onClick_listItems = function (e) {
            Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(e.item.item_id);
        };
        return RoleTalentView;
    }(BaseUI));
    ui.RoleTalentView = RoleTalentView;
    __reflect(RoleTalentView.prototype, "ui.RoleTalentView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleTalentView.js.map