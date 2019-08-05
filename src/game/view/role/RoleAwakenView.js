var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ui;
(function (ui) {
    var RoleAwakenView = (function (_super) {
        __extends(RoleAwakenView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleAwakenView() {
            var _this = _super.call(this, "yw.RoleAwakenSkin") || this;
            _this.conf_max_display_stellas = 5;
            _this.touchEnabled = false;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleAwakenView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleAwakenView.prototype.onDestroy = function () {
        };
        /**
         * 帧更新
         * @param time
         */
        RoleAwakenView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleAwakenView.prototype.init = function () {
            this.btnAwaken.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAwaken, this);
            this.btnDrop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDrop, this);
            this.btnFrag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnDrop, this);
            this.groupPreviewAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_compAvatarPreview, this);
            this.btnReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnReset, this);
            this.labPreview.touchEnabled = false;
            this.btnReset.text = Template.getGUIText("ui_role98");
            this.btnAwaken.text = Template.getGUIText("ui_role14");
            this.btnDrop.text = Template.getGUIText("ui_role44");
            var lab = [this.labWordAttrUp, this.labWordFaceUp, this.labWordFaceUp2, this.labWordGouYuNum];
            for (var i = 0; i < lab.length; ++i) {
                lab[i].text = Template.getGUIText(lab[i].text);
            }
            this.initDisplayStars();
        };
        /**
         * 初始化显示星数
         */
        RoleAwakenView.prototype.initDisplayStars = function () {
            this.display_stars = [];
            this.display_stars.push(new RoleAwakenDisplayGroup(this.groupLv1, this.imgLv1Inactive, this.imgLv1Active, this.labLv1, this.fxLv1Active));
            this.display_stars.push(new RoleAwakenDisplayGroup(this.groupLv2, this.imgLv2Inactive, this.imgLv2Active, this.labLv2, this.fxLv2Active));
            this.display_stars.push(new RoleAwakenDisplayGroup(this.groupLv3, this.imgLv3Inactive, this.imgLv3Active, this.labLv3, this.fxLv3Active));
            this.display_stars.push(new RoleAwakenDisplayGroup(this.groupLv4, this.imgLv4Inactive, this.imgLv4Active, this.labLv4, this.fxLv4Active));
            this.display_stars.push(new RoleAwakenDisplayGroup(this.groupLv5, this.imgLv5Inactive, this.imgLv5Active, this.labLv5, this.fxLv5Active));
            this.display_stars_line_active = [];
            this.display_stars_line_active.push(this.imgStarLineLv2Active);
            this.display_stars_line_active.push(this.imgStarLineLv3Active);
            this.display_stars_line_active.push(this.imgStarLineLv4Active);
            this.display_stars_line_active.push(this.imgStarLineLv5Active);
            this.display_stars_line_inactive = [];
            this.display_stars_line_inactive.push(this.imgStarLineLv2Inactive);
            this.display_stars_line_inactive.push(this.imgStarLineLv3Inactive);
            this.display_stars_line_inactive.push(this.imgStarLineLv4Inactive);
            this.display_stars_line_inactive.push(this.imgStarLineLv5Inactive);
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleAwakenView.prototype.open = function () {
            Singleton.Get(LayerManager).addView(this);
            this.initRoleInfo();
            this.playInitAni();
        };
        /**
         * 关闭本界面
         */
        RoleAwakenView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        /**
         * 响应刷新内容
         */
        RoleAwakenView.prototype.refresh = function () {
            this.initRoleInfo();
        };
        RoleAwakenView.prototype.playInitAni = function () {
            this.groupStella.alpha = 0;
            var tw_stella = egret.Tween.get(this.groupStella);
            tw_stella.to({ alpha: 1 }, 280, egret.Ease.sineOut);
        };
        // endregion
        // region 角色信息展示
        /**
         * 初始化角色信息
         */
        RoleAwakenView.prototype.initRoleInfo = function () {
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            //console.log(my_info);
            // 判空
            if (my_info == null) {
                egret.error("no player roleId: " + role_id);
                return;
            }
            // 获取角色基本配置
            var role_info = Template.role.get(role_id);
            if (role_info == null) {
                egret.error("no roleId: " + role_id);
                return;
            }
            // 获取角色觉醒信息
            var awaken_info = Template.awaken.get(my_info.awaken);
            if (awaken_info == null) {
                egret.error("no awaken, roleId: " + role_id + ", awakenId: " + my_info.awaken);
                return;
            }
            // 获取角色天赋信息
            var talent_info = Template.talent.get(my_info.talent);
            if (talent_info == null) {
                egret.error("no talent, roleId: " + role_id + ", talentId: " + my_info.talent);
                return;
            }
            // 填充角色当前状态信息
            ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(my_info.getAwakenStar(), my_info.getAwakenActiveStar()));
            switch (my_info.getAwakenStar()) {
                case 3:
                    this.imgTama.x = 36;
                    break;
                case 4:
                    this.imgTama.x = 25;
                    break;
                case 5:
                    this.imgTama.x = 14;
                    break;
            }
            // console.log("cur awaken Star: " + my_info.getAwakenStar() + ", imgTama.x: " + this.imgTama.x);
            // 计算下个角色形象改变等级
            var next_sp_lv = -1;
            for (var i = 0; i < role_info.RoleCard.length; i++) {
                if (role_info.RoleCard[i] > my_info.awaken) {
                    next_sp_lv = role_info.RoleCard[i];
                    break;
                }
            }
            // 填充星图
            this.initStellas(my_info.awaken + 1, next_sp_lv);
            // 达到了最高等级
            if (my_info.awaken >= role_info.AwakenMax) {
                // this.groupAttr.visible = false;
                this.groupCtrl.visible = false;
                this.groupMax.visible = true;
                this.groupPreview.visible = false;
                this.initFullStellas();
                var attr_cur = my_info.GetCurAwakenAttrDeltaList();
                this.labHp.text = "+" + attr_cur[0].toString();
                this.labAtk.text = "+" + attr_cur[1].toString();
                this.labDef.text = "+" + attr_cur[2].toString();
                this.labAtkSp.text = "+" + attr_cur[3].toString();
                this.labDefSp.text = "+" + attr_cur[4].toString();
                return;
            }
            // 获取角色下级觉醒信息
            var next_awaken_info = Template.awaken.get(my_info.awaken + 1);
            if (next_awaken_info == null) {
                console.error("no awaken, roleId: " + role_id + ", nextAwakenId: " + my_info.awaken + 1);
                return;
            }
            this.groupAttr.visible = true;
            this.groupCtrl.visible = true;
            this.groupMax.visible = false;
            // 判断是否有新形象
            var is_new_stand = false;
            for (var i = 0; i < role_info.RoleCard.length; i++) {
                if (role_info.RoleCard[i] == next_awaken_info.AwakenID) {
                    is_new_stand = true;
                }
            }
            // 显示隐藏预览按钮
            //this.groupPreview.visible = is_new_stand;
            if (next_sp_lv > 0) {
                // 还有可以解锁的新形象
                this.groupPreview.visible = true;
                var next_sp_times = next_sp_lv - role_info.AwakenID;
                var my_awaken_times = my_info.getAwakenTimes();
                var sp_offset_times = next_sp_times - my_awaken_times;
                //this.labWordFaceUpOffset.text = UtilsGame.stringHander(Template.getGUIText("ui_role88"), sp_offset_times) + my_awaken_times + "/" + next_sp_times;
                this.labWordFaceUpOffset.text = UtilsGame.stringHander(Template.getGUIText("ui_role88"), next_sp_times / 5) + Math.floor(my_awaken_times / 5) + "/" + next_sp_times / 5;
            }
            else {
                this.groupPreview.visible = false;
            }
            // 填充角色觉醒信息
            ResManager.AsyncSetTexture(this.imgRoleStandAvatarBg, Common.getRoleTierBgRes(talent_info.Star));
            ResManager.AsyncSetTexture(this.imgRoleStandAvatar, role_info.Icon);
            Common.fillRoleAvatar(role_id, this.compAvatarS);
            var attr_delta = my_info.GetNextAwakenAttrDeltaList();
            this.labHp.text = "+" + attr_delta[0].toString();
            this.labAtk.text = "+" + attr_delta[1].toString();
            this.labDef.text = "+" + attr_delta[2].toString();
            this.labAtkSp.text = "+" + attr_delta[3].toString();
            this.labDefSp.text = "+" + attr_delta[4].toString();
            // 碎片信息
            var frag_count = Singleton.Get(BagManager).getItemCount(role_info.Fragment);
            var frag_need = RoleUtil.getAwakenFragment(awaken_info, role_id);
            var is_frag_enough = Singleton.Get(BagManager).hasEnough(role_info.Fragment, frag_need);
            this.labProgress.text = frag_count + "/" + frag_need;
            this.progressBar.value = frag_count / frag_need * 100;
            // 碎片图标
            var frag_item_info = Template.item.get(role_info.Fragment);
            if (frag_item_info == null) {
                egret.error("no roleId: " + role_id + ", itemId: " + role_info.Fragment);
                return;
            }
            ResManager.AsyncSetTexture(this.imgFragIcon, frag_item_info.iIcon);
            ResManager.AsyncSetTexture(this.imgFragTierBg, Common.getItemTierBgRes(frag_item_info.iStar));
            //ResManager.AsyncSetTexture(this.imgFragTierSub, Common.getItemTierSubRes(frag_item_info.iStar));
            //this.labFragNum.text = frag_count.toString();
            // 显示所需金币数量
            this.btnAwaken.cost = UtilsGame.numberToString(awaken_info.AwakenMoney);
            this.btnAwaken.enough = Singleton.Get(PlayerInfoManager).getGold() >= awaken_info.AwakenMoney;
            // 初始化重置按钮
            this.initResetButton();
        };
        /**
         * 初始化星图
         */
        RoleAwakenView.prototype.initStellas = function (next_awaken_id, next_sp_lv) {
            var st_lv = 0;
            if (next_awaken_id >= 0) {
                st_lv = Math.floor((next_awaken_id - 1) / this.conf_max_display_stellas);
            }
            if (next_awaken_id >= Template.awaken.size()) {
                st_lv = st_lv - 1;
            }
            var is_sp_active = false;
            for (var i = 0; i < this.display_stars.length; i++) {
                var cur_st_lv = (i + 1) + st_lv * this.conf_max_display_stellas;
                this.display_stars[i].labLv.text = "Lv." + cur_st_lv;
                var is_active = cur_st_lv < next_awaken_id;
                this.display_stars[i].setActive(is_active);
                if (i > 0) {
                    this.display_stars_line_active[i - 1].visible = is_active;
                    this.display_stars_line_inactive[i - 1].visible = !is_active;
                }
                if (cur_st_lv == next_sp_lv && next_sp_lv >= 0) {
                    this.display_stars[i].groupRoot.visible = false;
                    this.groupLvSp.x = this.display_stars[i].groupRoot.x;
                    this.groupLvSp.y = this.display_stars[i].groupRoot.y;
                    this.groupLvSp.top = this.display_stars[i].groupRoot.top;
                    this.groupLvSp.top = this.display_stars[i].groupRoot.top;
                    this.groupLvSp.anchorOffsetX = this.display_stars[i].groupRoot.anchorOffsetX;
                    this.groupLvSp.anchorOffsetY = this.display_stars[i].groupRoot.anchorOffsetY;
                    this.groupLvSp.horizontalCenter = this.display_stars[i].groupRoot.horizontalCenter;
                    this.groupLvSp.verticalCenter = this.display_stars[i].groupRoot.verticalCenter;
                    this.labLvSp.text = "Lv." + cur_st_lv;
                    this.imgLvSpInactive.visible = !(cur_st_lv < next_awaken_id);
                    this.imgLvSpActive.visible = cur_st_lv < next_awaken_id;
                    is_sp_active = true;
                }
                else {
                    this.display_stars[i].groupRoot.visible = true;
                }
            }
            this.groupLvSp.visible = is_sp_active;
        };
        /**
         * 初始化全满星图
         */
        RoleAwakenView.prototype.initFullStellas = function () {
            for (var i = 0; i < this.display_stars.length; i++) {
                this.display_stars[i].labLv.text = "";
                this.display_stars[i].groupRoot.visible = true;
                this.display_stars[i].setActive(true);
                this.imgLv5Inactive.visible = true;
                this.imgLv5Active.visible = false;
                for (var i_1 = 0; i_1 < this.display_stars_line_active.length; i_1++) {
                    this.display_stars_line_active[i_1].visible = true;
                    this.display_stars_line_inactive[i_1].visible = false;
                }
            }
        };
        /**
         * 初始化重置按钮状态
         */
        RoleAwakenView.prototype.initResetButton = function () {
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            var inf_role = Singleton.Get(RoleManager).getRolesInfo().GetRole(role_id);
            var cfg_role = Template.role.get(role_id);
            if (!inf_role || !cfg_role) {
                this.btnReset.visible = false;
                return;
            }
            // 仅在 觉醒等级 > 1 时显示重置按钮
            this.btnReset.visible = inf_role.awaken > cfg_role.AwakenID;
            // this.btnReset.icon = DEFINE.UI_ALERT_INFO.diamond.resPNG;
            // this.btnReset.cost = UtilsGame.numberToString(Template.config.AwakenReset);
            // this.btnReset.enough = Singleton.Get(PlayerInfoManager).getDiamond() >= Template.config.AwakenReset;
        };
        // endregion
        // region 响应点击事件
        /**
         * 响应觉醒按钮点击事件
         */
        RoleAwakenView.prototype.onClick_btnAwaken = function () {
            UtilsEffect.buttonEffect(this.btnAwaken);
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            Singleton.Get(LayerManager).getView(ui.RoleSuccessView).setOldData(role_id);
            Singleton.Get(RoleManager).onReqAwaken(role_id);
        };
        /**
         * 响应掉落按钮点击事件
         */
        RoleAwakenView.prototype.onClick_btnDrop = function () {
            UtilsEffect.buttonEffect(this.btnDrop);
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            // 获取角色基本配置
            var role_info = Template.role.get(role_id);
            if (role_info == null) {
                egret.error("no roleId: " + role_id);
                return;
            }
            Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openRoleFrag(role_info.Fragment);
        };
        /**
         * 响应预览头像图标点击事件
         */
        RoleAwakenView.prototype.onClick_compAvatarPreview = function () {
            UtilsEffect.buttonEffect(this.groupPreviewAvatar);
            var role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
            Singleton.Get(LayerManager).getView(ui.RoleSuccessView).openPreview(role_id);
        };
        /**
         * 响应觉醒重置按钮点击事件
         */
        RoleAwakenView.prototype.onClick_btnReset = function () {
            return __awaiter(this, void 0, void 0, function () {
                var role_id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UtilsEffect.buttonEffectAsync(this.btnReset)];
                        case 1:
                            _a.sent();
                            role_id = Singleton.Get(LayerManager).getView(ui.RoleBaseView).getCurActiveRoleId();
                            Singleton.Get(DialogControler).showInfo(1212, this, function () {
                                if (Singleton.Get(PlayerInfoManager).getDiamond() < Template.config.AwakenReset) {
                                    Singleton.Get(MessageManager).handleRtSub(1005);
                                    return;
                                }
                                Singleton.Get(RoleManager).onReqAwakenReset(role_id);
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        return RoleAwakenView;
    }(BaseUI));
    ui.RoleAwakenView = RoleAwakenView;
    __reflect(RoleAwakenView.prototype, "ui.RoleAwakenView");
})(ui || (ui = {}));
/**
 * 角色觉醒显示对象组
 */
var RoleAwakenDisplayGroup = (function () {
    function RoleAwakenDisplayGroup(groupRoot, imgInactive, imgActive, labLv, fxActiv) {
        this.groupRoot = groupRoot;
        this.imgInactive = imgInactive;
        this.imgActive = imgActive;
        this.labLv = labLv;
        this.fxActiv = fxActiv;
    }
    RoleAwakenDisplayGroup.prototype.setActive = function (isActive) {
        //this.imgActive.visible = isActive;
        this.imgInactive.visible = !isActive;
        if (isActive) {
            this.fxActiv.visible = true;
            this.fxActiv.clearMovieClip();
            this.fxActiv.setMovieClip(DEFINE.EFF_JUEXING);
            this.fxActiv.gotoAndPlay(DEFINE.EFF_JUEXING, -1);
            this.fxActiv.scaleX = 1 / 0.7;
            this.fxActiv.scaleY = 1 / 0.7;
        }
        else {
            this.fxActiv.clearMovieClip();
            this.fxActiv.visible = false;
        }
    };
    return RoleAwakenDisplayGroup;
}());
__reflect(RoleAwakenDisplayGroup.prototype, "RoleAwakenDisplayGroup");
//# sourceMappingURL=RoleAwakenView.js.map