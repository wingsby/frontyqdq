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
    var CloseupView = (function (_super) {
        __extends(CloseupView, _super);
        /**
         * 构造函数
         */
        function CloseupView() {
            var _this = _super.call(this) || this;
            /// 整体高度偏移
            _this.m_HeightOffset = 0;
            _this.m_dragonBone = null;
            _this.dragonbonesFactory = null;
            _this.m_textureAtlas = null;
            _this.dragonbonesData = null;
            _this.textureData = null;
            _this.ResName = ["glass_ske_json", "glass_tex_json", "glass_tex_png", "grass", "action"];
            _this.skinName = "yw.CloseupSkin";
            _this.touchEnabled = false; // TODO 临时关闭点击
            //this.touchEnabled = true; // 释放技能时屏蔽下层的点击事件
            _this.groupRoot.visible = false;
            _this.y += _this.m_HeightOffset;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        /**
         * 响应子对象创建完成
         */
        CloseupView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.InitDragonBone();
            this.initEffect();
        };
        CloseupView.prototype.onDragonBoneResLoaded = function (texture) {
            this.dragonbonesFactory = new dragonBones.EgretFactory();
            this.dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(this.dragonbonesData));
            this.m_textureAtlas = new dragonBones.EgretTextureAtlas(texture, this.textureData);
            this.dragonbonesFactory.addTextureAtlas(this.m_textureAtlas);
            this.m_dragonBone = this.dragonbonesFactory.buildArmature(this.ResName[3]);
            this.addChild(this.m_dragonBone.display);
            this.m_dragonBone.display.x = 240;
            this.m_dragonBone.display.y = 650 + this.m_HeightOffset;
            dragonBones.WorldClock.clock.add(this.m_dragonBone);
            this.m_dragonBone.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
            this.m_dragonBone.animation.reset();
            this.m_dragonBone.display.visible = false;
            egret.Ticker.getInstance().register(function (frameTime) { dragonBones.WorldClock.clock.advanceTime(0.01); }, this);
        };
        CloseupView.prototype.InitDragonBone = function () {
            ResManager.getResAsync(this.ResName[0], this.onLoadDragonbonesData, this);
        };
        CloseupView.prototype.onLoadDragonbonesData = function (res) {
            this.dragonbonesData = res;
            ResManager.getResAsync(this.ResName[1], this.onLoadTextureData, this);
        };
        CloseupView.prototype.onLoadTextureData = function (res) {
            this.textureData = res;
            ResManager.getResAsync(this.ResName[2], this.onDragonBoneResLoaded, this);
        };
        CloseupView.prototype.initEffect = function () {
            this.mcGlow.setMovieClip("effect_circle");
            this.mcStar.setMovieClip("effect_star");
            this.mcGlow.scaleX = this.mcGlow.scaleY = 2;
            this.mcStar.scaleX = this.mcStar.scaleY = 2;
            this.mcGlow.setCallback(this.onmcGlowEffectEnd, this);
            this.mcStar.setCallback(this.onmcStarEffectEnd, this);
        };
        /**
         * 响应特效播放完成
         */
        CloseupView.prototype.onmcGlowEffectEnd = function () {
            this.group_guangquan.visible = false;
            // this.mcGlow.visible = false;
        };
        CloseupView.prototype.onmcStarEffectEnd = function () {
            this.groupStar.visible = false;
            // this.mcStar.visible = false;
        };
        CloseupView.prototype.startPlay = function (evt) {
            // console.log("armature startPlay()");
        };
        CloseupView.prototype.loop_com = function (evt) {
            this.m_dragonBone.animation.reset();
        };
        /**
         * 响应添加到场景
         * @param e
         */
        CloseupView.prototype.onAddToStage = function (e) {
        };
        /**
         * 播放动画
         */
        CloseupView.prototype.play = function (skillId, callback, thisObj, params) {
            var _this = this;
            // 重置动画参数, 多次调用，直接reset
            this.reset();
            ///播放的速度
            var timePreFrame = 1000.0 / 20;
            // 读取技能信息
            var skill = Template.skill.get(skillId);
            if (skill == null) {
                egret.error("no roleId: " + skillId);
            }
            // skill.RoleRes 0表示字体，1表示head，2表示body的图
            if (skill.RoleRes.length < 2) {
                egret.error("no RoleRes, roleId: " + skillId);
                var twAll_1 = egret.Tween.get(this);
                twAll_1.wait(timePreFrame * 1).call(callback, thisObj, params).call(this.reset, this);
                return;
            }
            /// 播放特写音效
            if (skill.SkillSound != "") {
                Singleton.Get(SoundManager).play(skill.SkillSound);
            }
            this.groupRoot.visible = true;
            /// 特写图片改为异步加载
            this.img_role.texture = null;
            this.img_skill.texture = null;
            ResManager.AsyncSetTexture(this.img_role, skill.RoleRes[0] + "_png");
            if (skill.RoleRes[1] == "0") {
                this.img_skill.visible = false;
            }
            else {
                this.img_skill.visible = true;
                ResManager.AsyncSetTexture(this.img_skill, skill.RoleRes[1] + "_png");
            }
            /// 光效 第5帧时显示， 21时缩放，23时缩放消失
            {
                this.img_guangxiao.alpha = 0;
                this.img_guangxiao.visible = false;
                this.img_guangxiao.scaleX = 1.58;
                this.img_guangxiao.scaleY = 1.58;
                var tw = egret.Tween.get(this.img_guangxiao);
                tw
                    .to({ alpha: 1, visible: true }, 1)
                    .to({ scaleX: 1.45, scaleY: 1.45 }, timePreFrame * 16)
                    .to({ scaleX: 1.82, scaleY: 1.82, alpha: 0 }, timePreFrame * 2);
            }
            /// 波利1 第7的时候显示，第9消失,23帧播放波利
            {
                var tw = egret.Tween.get(this.imgboli1);
                this.imgboli1.visible = false;
                tw
                    .wait(timePreFrame * 2)
                    .to({ visible: true }, 1)
                    .to({ visible: false }, timePreFrame * 2)
                    .wait(timePreFrame * 15)
                    .call(this.playDragonBone, this);
            }
            /// 碎玻璃，第9显示 21消失
            {
                var tw = egret.Tween.get(this.imgboli0);
                this.imgboli0.visible = false;
                tw
                    .wait(timePreFrame * 4)
                    .to({ visible: true }, 1)
                    .to({ visible: false }, timePreFrame * 12);
            }
            /// 角色，5帧时放大显示，6时恢复
            {
                var tw = egret.Tween.get(this.img_role);
                this.img_role.x = -16;
                this.img_role.y = 326;
                this.img_role.scaleX = 2.078;
                this.img_role.scaleY = 2.078;
                this.img_role.visible = false;
                tw
                    .to({ alpha: 1, visible: true }, 1)
                    .to({ scaleX: 1, scaleY: 1, x: -2, y: 468 }, timePreFrame * 1)
                    .wait(timePreFrame * 15)
                    .to({ x: 22, alpha: 0 }, timePreFrame * 2);
            }
            {
                var tw = egret.Tween.get(this.groupSkillName);
                this.groupSkillName.visible = false;
                this.groupSkillName.x = -268;
                tw
                    .wait(timePreFrame * 1)
                    .to({ visible: true }, 1)
                    .to({ x: 0 }, timePreFrame * 3)
                    .to({ x: 16 }, timePreFrame * 13)
                    .to({ x: 354 }, timePreFrame * 2);
            }
            /// 星星
            {
                var tw = egret.Tween.get(this.groupStar);
                this.groupStar.visible = false;
                tw
                    .wait(timePreFrame * 1)
                    .to({ visible: true }, 1)
                    .call(function () {
                    _this.mcStar.gotoAndPlay("effect_star", 1);
                }, this);
            }
            /// 光圈
            {
                var tw = egret.Tween.get(this.group_guangquan);
                this.group_guangquan.visible = false;
                tw
                    .wait(timePreFrame * 17)
                    .to({ visible: true }, 1)
                    .call(function () {
                    _this.mcGlow.gotoAndPlay("effect_circle", 1);
                }, this);
            }
            var twAll = egret.Tween.get(this);
            twAll
                .wait(timePreFrame * 21)
                .call(callback, thisObj, params).call(this.reset, this);
        };
        CloseupView.prototype.playDragonBone = function () {
            if (this.m_dragonBone) {
                this.m_dragonBone.display.visible = true;
                this.m_dragonBone.animation.gotoAndPlay(this.ResName[4]);
                /// 碎玻璃的速度
                this.m_dragonBone.animation.timeScale = 0.8;
            }
        };
        /**
         * 重置资源位置
         */
        CloseupView.prototype.reset = function () {
            if (this.m_dragonBone) {
                this.m_dragonBone.animation.reset();
                this.m_dragonBone.display.visible = false;
            }
            egret.Tween.removeTweens(this.img_guangxiao);
            egret.Tween.removeTweens(this.imgboli1);
            egret.Tween.removeTweens(this.imgboli0);
            egret.Tween.removeTweens(this.img_role);
            egret.Tween.removeTweens(this.groupSkillName);
            egret.Tween.removeTweens(this.groupStar);
            this.groupStar.visible = false;
            egret.Tween.removeTweens(this.group_guangquan);
            this.group_guangquan.visible = false;
            egret.Tween.removeTweens(this);
            this.groupRoot.visible = false;
        };
        return CloseupView;
    }(eui.Component));
    ui.CloseupView = CloseupView;
    __reflect(CloseupView.prototype, "ui.CloseupView");
})(ui || (ui = {}));
//# sourceMappingURL=CloseupView.js.map