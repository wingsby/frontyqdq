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
     * 创建角色界面
     */
    var CreateRoleView = (function (_super) {
        __extends(CreateRoleView, _super);
        /**
         * 构造函数
         */
        function CreateRoleView() {
            var _this = _super.call(this) || this;
            _this.maxNicknameLength = 8;
            _this.selectedAvatarIdx = 0;
            _this.skinName = "yw.CreateRoleSkin";
            _this.init();
            return _this;
        }
        /**
         * 析构函数
         */
        CreateRoleView.prototype.dispose = function () {
            // 移除事件侦听
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        };
        /**
         * 响应初始化完成
         */
        CreateRoleView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 初始化
         */
        CreateRoleView.prototype.init = function () {
            // 绑定事件侦听
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.btnRandom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnRandom, this);
            this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnSubmit, this);
        };
        /**
         * 响应添加到场景
         */
        CreateRoleView.prototype.onAddToStage = function (e) {
            // 设置版本号
            this.labVersion.text = DEFINE.GAME_VERSION;
            // 设置角色名
            this.inputNickname.text = LoginManager.getRandomName();
            // 初始化头像按钮
            this.initAvButton();
            this.setActiveAvatar(UtilsGame.getRandomInt(0, this.avButtons.length - 1));
            // UI动画
            this.groupSelect.alpha = 0;
            var twSelect = egret.Tween.get(this.groupSelect);
            twSelect.to({ alpha: 1 }, 300);
            this.groupSubmit.alpha = 0;
            var twSubmit = egret.Tween.get(this.groupSubmit);
            twSubmit.wait(100).to({ alpha: 1 }, 500);
        };
        /**
         * 响应随机按钮点击事件
         * @param e
         */
        CreateRoleView.prototype.onClick_btnRandom = function (e) {
            UtilsEffect.buttonEffect(this.btnRandom);
            this.inputNickname.text = LoginManager.getRandomName();
        };
        /**
         * 响应注册按钮点击事件
         * @param e
         */
        CreateRoleView.prototype.onClick_btnSubmit = function (e) {
            UtilsEffect.buttonEffect(this.btnSubmit);
            if (this.inputNickname.text.length <= 0) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("ui_login_1"));
                return;
            }
            if (this.inputNickname.text.length < 2) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("ui_login_2"));
                return;
            }
            if (this.inputNickname.text.length > this.maxNicknameLength) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("ui_login_3"));
                return;
            }
            // 检测通过，发起创建角色请求
            Singleton.Get(LoginManager).reqCreateRole(this.inputNickname.text, this.avButtons[this.selectedAvatarIdx].getResNmae());
        };
        /**
         * 初始化头像按钮
         */
        CreateRoleView.prototype.initAvButton = function () {
            this.avButtons = [];
            this.regAvButton(0, Template.config.Head[0] + "_png", this.btnAvatar_1, this.imgAvatar_1_avatar, this.imgAvatar_1_normal, this.imgAvatar_1_selected);
            this.regAvButton(1, Template.config.Head[1] + "_png", this.btnAvatar_2, this.imgAvatar_2_avatar, this.imgAvatar_2_normal, this.imgAvatar_2_selected);
            this.regAvButton(2, Template.config.Head[2] + "_png", this.btnAvatar_3, this.imgAvatar_3_avatar, this.imgAvatar_3_normal, this.imgAvatar_3_selected);
            this.regAvButton(3, Template.config.Head[3] + "_png", this.btnAvatar_4, this.imgAvatar_4_avatar, this.imgAvatar_4_normal, this.imgAvatar_4_selected);
            this.regAvButton(4, Template.config.Head[4] + "_png", this.btnAvatar_5, this.imgAvatar_5_avatar, this.imgAvatar_5_normal, this.imgAvatar_5_selected);
            this.regAvButton(5, Template.config.Head[5] + "_png", this.btnAvatar_6, this.imgAvatar_6_avatar, this.imgAvatar_6_normal, this.imgAvatar_6_selected);
        };
        /**
         * 注册头像按钮
         * @param resName 资源名
         * @param btnAvatar 按钮本体
         * @param imgAvatar 头像图片组件
         * @param imgNormal 未选定背景图片
         * @param imgSelected 选定背景图片
         * @returns {number} 当前已注册的头像按钮数量
         */
        CreateRoleView.prototype.regAvButton = function (id, resName, btnAvatar, imgAvatar, imgNormal, imgSelected) {
            var avBtn = new RoleAvatarButton(id, btnAvatar, imgAvatar, imgNormal, imgSelected);
            avBtn.setAvatar(resName);
            return this.avButtons.push(avBtn);
        };
        /**
         * 设置选中的头像
         * @param id
         */
        CreateRoleView.prototype.setActiveAvatar = function (id) {
            // 设置所有头像选中状态
            for (var i = 0; i < this.avButtons.length; i++) {
                this.avButtons[i].setActive(i == id ? true : false);
            }
            this.selectedAvatarIdx = id;
        };
        return CreateRoleView;
    }(ui.UIView));
    ui.CreateRoleView = CreateRoleView;
    __reflect(CreateRoleView.prototype, "ui.CreateRoleView");
    /**
     * 角色头像按钮
     */
    var RoleAvatarButton = (function () {
        /**
         * 构造函数
         * @param btnAvatar 头像按钮本体
         * @param imgAvatar 头像图片
         * @param imgNormal 背景图非选中状态
         * @param imgSelected 背景图选中状态
         */
        function RoleAvatarButton(btnId, btnAvatar, imgAvatar, imgNormal, imgSelected) {
            this.btnId = btnId;
            this.btnAvatar = btnAvatar;
            this.imgAvatar = imgAvatar;
            this.imgNormal = imgNormal;
            this.imgSelected = imgSelected;
            // 初始化为未激活状态
            this.setActive(false);
            this.btnAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnAvatar, this);
        }
        /**
         * 析构置空
         */
        RoleAvatarButton.prototype.dispose = function () {
            this.btnAvatar = undefined;
            this.imgAvatar = undefined;
            this.imgNormal = undefined;
            this.imgSelected = undefined;
        };
        /**
         * 设定激活（选定）状态
         * @param isActive 状态
         */
        RoleAvatarButton.prototype.setActive = function (isActive) {
            if (isActive === void 0) { isActive = true; }
            this.isActive = isActive;
            this.imgNormal.alpha = isActive ? 0 : 1;
            this.imgSelected.alpha = isActive ? 1 : 0;
        };
        /**
         * 设定头像资源
         * @param resName 头像资源名
         */
        RoleAvatarButton.prototype.setAvatar = function (resName) {
            this.resName = resName;
            ResManager.AsyncSetTexture(this.imgAvatar, this.resName);
        };
        /**
         * 获取资源名
         * @returns {string}
         */
        RoleAvatarButton.prototype.getResNmae = function () {
            return this.resName;
        };
        /**
         * 响应头像按钮的点击事件
         * @param e
         */
        RoleAvatarButton.prototype.onClick_btnAvatar = function (e) {
            UtilsEffect.buttonEffect(this.btnAvatar);
            Singleton.Get(LayerManager).getView(CreateRoleView).setActiveAvatar(this.btnId);
        };
        return RoleAvatarButton;
    }());
    __reflect(RoleAvatarButton.prototype, "RoleAvatarButton");
})(ui || (ui = {}));
//# sourceMappingURL=CreateRoleView.js.map