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
    var RoleOpinionView = (function (_super) {
        __extends(RoleOpinionView, _super);
        // region 事件管理
        /**
         * 构造函数
         */
        function RoleOpinionView() {
            var _this = _super.call(this, "yw.RoleOpinionSkin") || this;
            _this.selected_pos = 0; // 正在交换的座位号
            _this.callbackArgs = [];
            _this.touchEnabled = false;
            _this.init();
            return _this;
        }
        /**
         * 响应组件创建完成
         */
        RoleOpinionView.prototype.componentCreated = function () {
        };
        /**
         * 响应销毁
         */
        RoleOpinionView.prototype.onDestroy = function () {
        };
        /**
         * 帧更新
         * @param time
         */
        RoleOpinionView.prototype.onUpdate = function (time) {
        };
        /**
         * 初始化
         */
        RoleOpinionView.prototype.init = function () {
            this.btnSubmit.text = "保存并退出";
            this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
            this.initPosList();
        };
        /**
         * 初始化座位表
         */
        RoleOpinionView.prototype.initPosList = function () {
            this.posList = [];
            this.posList.push(new RoleOpinionItem(1, this.groupPos1, this.imgNormalPos1, this.imgActivePos1, this.mcPos1, this.labPos1, this.btnHandler1, this.labDesPos1, this.labDesType1));
            this.posList.push(new RoleOpinionItem(2, this.groupPos2, this.imgNormalPos2, this.imgActivePos2, this.mcPos2, this.labPos2, this.btnHandler2, this.labDesPos2, this.labDesType2));
            this.posList.push(new RoleOpinionItem(3, this.groupPos3, this.imgNormalPos3, this.imgActivePos3, this.mcPos3, this.labPos3, this.btnHandler3, this.labDesPos3, this.labDesType3));
            this.posList.push(new RoleOpinionItem(4, this.groupPos4, this.imgNormalPos4, this.imgActivePos4, this.mcPos4, this.labPos4, this.btnHandler4, this.labDesPos4, this.labDesType4));
            this.posList.push(new RoleOpinionItem(5, this.groupPos5, this.imgNormalPos5, this.imgActivePos5, this.mcPos5, this.labPos5, this.btnHandler5, this.labDesPos5, this.labDesType5));
        };
        // endregion
        // region 显示控制
        /**
         * 打开本界面
         */
        RoleOpinionView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
        };
        /**
         * 关闭本界面
         */
        RoleOpinionView.prototype.close = function () {
            var layer = Singleton.Get(LayerManager);
            layer.getPopup().removePopup(this);
        };
        // endregion
        // region 交换阵容
        /**
         * 初始化斗士Mc播放
         */
        RoleOpinionView.prototype.initRoles = function (pve_team, callback, thisObj) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            this.posDict = pve_team;
            this.callback = callback;
            this.callbackThisObj = thisObj;
            this.callbackArgs = args;
            this.refreshAllMc();
        };
        /**
         * 刷新所有Mc
         */
        RoleOpinionView.prototype.refreshAllMc = function () {
            for (var i = 0; i < this.posList.length; i++) {
                this.refreshMc(i + 1);
            }
        };
        /**
         * 刷新单个斗士Mc
         * @param pos_id
         */
        RoleOpinionView.prototype.refreshMc = function (pos_id) {
            var role_id = this.posDict.get(pos_id);
            if (role_id <= 0) {
                this.posList[pos_id - 1].labDesPos.visible = false;
                this.posList[pos_id - 1].labDesType.visible = false;
                this.posList[pos_id - 1].mcRole.clearMovieClip();
                return;
            }
            var role_info = Template.role.get(role_id);
            this.posList[pos_id - 1].mcRole.setMovieClip(role_info.Res);
            this.posList[pos_id - 1].labDesPos.visible = true;
            this.posList[pos_id - 1].labDesType.visible = true;
            var str_type = Template.getGUIText(role_info.Position);
            var str_location = Template.getGUIText(role_info.Location);
            var str_pos = str_location.search(Template.getGUIText("buzhe2")) > 0 ? Template.getGUIText("buzhe2") : Template.getGUIText("buzhe3");
            this.posList[pos_id - 1].labDesPos.text = UtilsGame.stringHander(Template.getGUIText("buzhe1"), str_type, str_pos);
            this.posList[pos_id - 1].labDesPos.textColor = str_location.search(Template.getGUIText("buzhe2")) > 0 ? DEFINE_COLOR.ROLE_OPINION_FRONT : DEFINE_COLOR.ROLE_OPINION_BACK;
            this.posList[pos_id - 1].labDesType.text = Template.getGUIText(role_info.Name);
            this.posList[pos_id - 1].labDesType.textColor = RoleUtil.GetRoleNameColor(role_info.Star);
        };
        // endregion
        // region 按钮事件
        /**
         * 响应提交
         * @param e
         */
        RoleOpinionView.prototype.onClick_btnSubmit = function (e) {
            /**
            let result: Object = {};

            for(let i: number = 0; i < this.posDict.size(); i++){
                let role_id: number = this.posDict.get(i + 1);
                if(role_id > 0){
                    result[i + 1] = role_id;
                }
            }
             */
            var result = [0, 0, 0, 0, 0];
            for (var i = 0; i < this.posDict.size(); i++) {
                var role_id = this.posDict.get(i + 1);
                if (role_id > 0) {
                    result[i] = role_id;
                }
            }
            if (this.callback) {
                this.callback.call(this.callbackThisObj, result, this.callbackArgs);
            }
            UtilsEffect.buttonEffect(this.btnSubmit, this.close, this);
        };
        /**
         * 响应角色动画点击事件
         * @param pos
         */
        RoleOpinionView.prototype.onClick_roleMc = function (pos) {
            if (this.selected_pos != 0) {
                // 已有选中的，进行交换
                var ex_pos_o = this.selected_pos;
                var ex_pos_t = pos;
                var ex_role_o = this.posDict.get(ex_pos_o);
                var ex_role_t = this.posDict.get(ex_pos_t);
                this.posDict.update(ex_pos_t, ex_role_o);
                this.posDict.update(ex_pos_o, ex_role_t);
                this.refreshMc(ex_pos_o);
                this.refreshMc(ex_pos_t);
                // 恢复原先被选中的状态
                this.posList[ex_pos_o - 1].setActive(false);
                this.selected_pos = 0;
            }
            else {
                // 没有选中的，选择当前位置
                this.selected_pos = pos;
                this.posList[pos - 1].setActive(true);
            }
        };
        return RoleOpinionView;
    }(PopupUI));
    ui.RoleOpinionView = RoleOpinionView;
    __reflect(RoleOpinionView.prototype, "ui.RoleOpinionView");
})(ui || (ui = {}));
/**
 * 角色阵形更换单个显示对象
 */
var RoleOpinionItem = (function () {
    /**
     * 构造函数
     * @param idx
     * @param groupRoot
     * @param imgNormal
     * @param imgActive
     * @param mcRole
     * @param labDisplay
     */
    function RoleOpinionItem(idx, groupRoot, imgNormal, imgActive, mcRole, labDisplay, btnHandler, labDesPos, labDesType) {
        this.idx = idx;
        this.groupRoot = groupRoot;
        this.imgNormal = imgNormal;
        this.imgActive = imgActive;
        this.mcRole = mcRole;
        this.labDisplay = labDisplay;
        this.btnHandler = btnHandler;
        this.labDesPos = labDesPos;
        this.labDesType = labDesType;
        this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
    /**
     * 响应点击事件
     */
    RoleOpinionItem.prototype.onClick = function () {
        UtilsEffect.buttonEffect(this.imgActive);
        Singleton.Get(LayerManager).getView(ui.RoleOpinionView).onClick_roleMc(this.idx);
    };
    /**
     * 设定激活状态
     * @param isActive
     */
    RoleOpinionItem.prototype.setActive = function (isActive) {
        this.imgNormal.visible = !isActive;
        this.imgActive.visible = isActive;
    };
    return RoleOpinionItem;
}());
__reflect(RoleOpinionItem.prototype, "RoleOpinionItem");
//# sourceMappingURL=RoleOpinionView.js.map