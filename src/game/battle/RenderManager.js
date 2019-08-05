var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var battle;
(function (battle) {
    /**
     * 战斗绘制管理器
     */
    var RenderManager = (function (_super) {
        __extends(RenderManager, _super);
        /**
         * 构造函数
         */
        function RenderManager() {
            var _this = _super.call(this) || this;
            _this._is_inited = false;
            _this._gameLayer = null;
            _this._scene = null;
            _this._battle = null;
            // 漂浮物层
            _this._popLayer = null;
            _this._popLayerDepth = 70;
            // 前置特效层
            _this._closeupLayer = null;
            _this._closeupLayerDepth = 80;
            _this._closeupView = null;
            _this._closeupBossView = null;
            _this._bossWarningView = null;
            // 遮罩层
            _this._maskLayer = null;
            _this._maskLayerDepth = 90;
            _this._enableCutBlack = true;
            return _this;
        }
        /**
         * 初始化
         * 必须在LayerManager加载完成后调用
         */
        RenderManager.prototype.init = function (scene_id) {
            var _this = this;
            this._is_inited = true;
            // 获取战斗层
            this._gameLayer = Singleton.Get(LayerManager).getGameLayer();
            this._gameLayer.top = DEFINE.GAME_LAYER_TOP;
            if (this._gameLayer == null) {
                egret.error("Can't initialize RenderManager, gameLayer not exist.");
                return;
            }
            // 初始化战斗背景
            this._scene = Singleton.Get(battle.SceneRender);
            if (!scene_id) {
                this.setSceneByLevel(Singleton.Get(PveManager).getCurLevel()); // 默认加载当前关背景
            }
            else {
                this.setScene(scene_id);
            }
            this.addGameLayerChild(this._scene);
            // 初始化战斗内容层
            this._battle = ObjectPool.getPool(battle.BattleRender).getObject();
            this.addGameLayerChild(this._battle);
            // 初始化飘字层
            this._popLayer = ObjectPool.getPool(eui.UILayer).getObject();
            this._popLayer.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                _this._popLayer.y = Template.config.battleWalkZoneY;
                _this._popLayer.width = Template.config.battleWalkSize[0];
                _this._popLayer.height = Template.config.battleWalkSize[1];
            }, this);
            this.addGameLayerChild(this._popLayer);
            this._gameLayer.setChildIndex(this._popLayer, this._popLayerDepth);
            // 初始化前置特效层
            this._closeupLayer = ObjectPool.getPool(eui.UILayer).getObject();
            this.addGameLayerChild(this._closeupLayer);
            this._gameLayer.setChildIndex(this._closeupLayer, this._closeupLayerDepth);
            // 初始化遮罩层
            this._maskLayer = ObjectPool.getPool(egret.Shape).getObject();
            this._maskLayer.graphics.beginFill(0x000000);
            this._maskLayer.graphics.drawRect(0, 0, this._scene.width, this._scene.height);
            this._maskLayer.alpha = 0;
            this.addGameLayerChild(this._maskLayer);
            this._gameLayer.setChildIndex(this._maskLayer, this._maskLayerDepth);
            this._maskLayer.y = -80;
        };
        RenderManager.prototype.isInited = function () {
            return this._is_inited;
        };
        /**
         * 帧更新
         * @param time
         */
        RenderManager.prototype.update = function (time) {
        };
        /**
         * 为战斗渲染层添加显示对象
         * @param child
         */
        RenderManager.prototype.addGameLayerChild = function (child, depth) {
            this._gameLayer.addChild(child);
            if (depth) {
                this._gameLayer.setChildIndex(child, depth);
            }
        };
        /**
         * 为战斗渲染层移除显示对象
         */
        RenderManager.prototype.removeGameLayerChild = function (child) {
            if (this._gameLayer.contains(child)) {
                this._gameLayer.removeChild(child);
            }
        };
        /**
         * 获取战斗渲染器
         */
        RenderManager.prototype.getBattle = function () {
            return this._battle;
        };
        /**
         * 获取背景图
         */
        RenderManager.prototype.getBackground = function () {
            return this._scene;
        };
        /**
         * 切换
         */
        /**
        public cutMask(callback?: Function, thisObj?: Object, args?: any[]): void {
            if (!this._maskLayer) {
                callback.call(thisObj);
                return;
            }

            let tw = egret.Tween.get(this._maskLayer);
            tw.to({ alpha: 0 }, 800).call(callback, thisObj, args).wait(400).to({ alpha: 0 }, 800); // 临时禁用遮罩层
        }
         */
        /**
         * 切换黑幕
         */
        RenderManager.prototype.cutBlackMask = function (callback, thisObj, args) {
            if (!this._maskLayer) {
                callback.call(thisObj);
                return;
            }
            if (this._enableCutBlack) {
                var tw = egret.Tween.get(this._maskLayer);
                tw.to({ alpha: 1 }, 400).call(callback, thisObj, args).wait(400).to({ alpha: 0 }, 400); // 临时禁用遮罩层
            }
            else {
                if (callback) {
                    callback.call(thisObj, args);
                }
            }
        };
        /**
         * 切换黑幕
         */
        RenderManager.prototype.cutBlackMaskInstantly = function (callback, thisObj, args) {
            if (!this._maskLayer) {
                callback.call(thisObj);
                return;
            }
            this._maskLayer.alpha = 1;
            var tw = egret.Tween.get(this._maskLayer);
            tw.wait(500).call(callback, thisObj, args).to({ alpha: 0 }, 800);
        };
        /**
         * 弹出文字
         */
        RenderManager.prototype.DoAddFloatLabel = function (x, y, text, type) {
            var _this = this;
            var lab = null;
            // 选择不同的文字类型
            switch (type) {
                case ui.FloatLabelType.Attack:
                    lab = ObjectPool.getPool(ui.AttackLabel).getObject();
                    break;
                case ui.FloatLabelType.Critical:
                    lab = ObjectPool.getPool(ui.CriticalLabel).getObject();
                    break;
                case ui.FloatLabelType.Heal:
                    lab = ObjectPool.getPool(ui.HealLabel).getObject();
                    break;
                case ui.FloatLabelType.Damage:
                    lab = ObjectPool.getPool(ui.DamageLabel).getObject();
                    break;
                case ui.FloatLabelType.Pursued:
                    lab = ObjectPool.getPool(ui.PursuedLabel).getObject();
                    break;
                case ui.FloatLabelType.Skill:
                    lab = ObjectPool.getPool(ui.SkillLabel).getObject();
                    break;
            }
            // 判断label类型错误
            if (lab == null) {
                egret.error("Can't create float label, incorrect FloatLabelType.");
                return;
            }
            // 弹出文字
            lab.text = text;
            this._popLayer.addChild(lab);
            lab.pop(x, y - 50, text, function () {
                _this._popLayer.removeChild(lab);
            }, this);
            lab.x = x;
            lab.y = y;
        };
        /// 弹出次数
        RenderManager.prototype.addFloatLabel = function (x, y, text, type, count) {
            if (count == undefined) {
                count = 1;
            }
            for (var i = 0; i < count; ++i) {
                this.DoAddFloatLabel(x, y - i * 30, text, type);
            }
        };
        /// 保证接口参数统一 追击的飘字要在正常飘字30以下，30表示偏移高度
        RenderManager.prototype.addPursuedFloatLabel = function (x, y, text, type, count) {
            if (count == undefined) {
                count = 1;
            }
            for (var i = 0; i < count; ++i) {
                this.DoAddFloatLabel(x, y + (i + 1) * 30, text, type);
            }
        };
        // 技能Label
        RenderManager.prototype.addSkillFloatLabel = function (x, y, skill_id) {
            var _this = this;
            var cfg_skill = Template.skill.get(skill_id);
            if (!cfg_skill || !cfg_skill.EffectName || cfg_skill.EffectName == "0" || cfg_skill.EffectName == "-1") {
                console.log("Incorrect skill id: " + skill_id);
                return;
            }
            // 技能名
            var res_name = cfg_skill.EffectName;
            // 弹出文字
            var lab = ObjectPool.getPool(ui.UISkillLabel).getObject();
            lab.text = res_name;
            this._popLayer.addChild(lab);
            lab.pop(x, y - 50, res_name, function () {
                _this._popLayer.removeChild(lab);
            }, this);
            lab.x = x;
            lab.y = y;
        };
        /**
         * 显示技能特写 , 移动到LayerManger中
         */
        // public playCloseup(skillId: number, callback: Function, thisObj?: Object, params?: Array<any>) {
        //     if (!this._closeupView) {
        //         this._closeupView = Singleton.Get(LayerManager).getView(ui.CloseupView);
        //         this._closeupLayer.addChild(this._closeupView);
        //         this._closeupLayer.setChildIndex(this._closeupView, 1);
        //     }
        //     this._closeupView.play(skillId, callback, thisObj, params);
        // }
        /**
         * 显示BOSS来袭特写
         */
        RenderManager.prototype.playCloseupBoss = function (type, callback, thisObj, params) {
            /*
            if(!this._closeupBossView){
                this._closeupBossView = Singleton.Get(LayerManager).getView(ui.CloseupBossView);
                this._closeupLayer.addChild(this._closeupBossView);
                this._closeupLayer.setChildIndex(this._closeupBossView, 2);
            }
            */
            if (!this._bossWarningView) {
                this._bossWarningView = Singleton.Get(LayerManager).getView(ui.BossWarningView);
            }
            switch (type) {
                case battle.BattleType.LEVEL_BOSS:
                    this._bossWarningView.setText("BOSS出现");
                    break;
                case battle.BattleType.DUEL:
                    this._bossWarningView.setText(Template.getGUIText("append_4"));
                    break;
                default:
                    return;
            }
            if (!this._closeupLayer.contains(this._bossWarningView)) {
                this._closeupLayer.addChild(this._bossWarningView);
                this._bossWarningView.y = 0;
                this._closeupLayer.setChildIndex(this._bossWarningView, 2);
            }
            //this._closeupBossView.play(callback, thisObj, params);
        };
        /**
         * 隐藏BOSS来袭特写
         */
        RenderManager.prototype.hideCloseupBoss = function () {
            if (!this._bossWarningView) {
                egret.error("Boss warning not existed.");
                return;
            }
            if (this._closeupLayer.contains(this._bossWarningView)) {
                this._closeupLayer.removeChild(this._bossWarningView);
            }
        };
        /**
         * 根据关卡设定场景
         */
        RenderManager.prototype.setSceneByLevel = function (stageId) {
            this._scene.setSceneByLevel(stageId, this._gameLayer);
        };
        /**
         * 直接设定场景
         */
        RenderManager.prototype.setScene = function (sceneId) {
            this._scene.setScene(sceneId, this._gameLayer);
        };
        RenderManager.prototype.setSceneDirectly = function (sceneId) {
            this._enableCutBlack = false;
            this.setScene(sceneId);
            this._enableCutBlack = true;
        };
        RenderManager.getConfigPosX = function (pos, side) {
            if (side == battle.BattleSide.Left)
                return Template.config.battlePosX[pos - 1];
            else if (side == battle.BattleSide.Right)
                return Template.config.battlePosX[pos - 1 + 5];
            else
                return 0;
        };
        RenderManager.getConfigPosY = function (pos, side) {
            if (side == battle.BattleSide.Left)
                return Template.config.battlePosY[pos - 1];
            else if (side == battle.BattleSide.Right)
                return Template.config.battlePosY[pos - 1 + 5];
            else
                return 0;
        };
        return RenderManager;
    }(egret.EventDispatcher));
    battle.RenderManager = RenderManager;
    __reflect(RenderManager.prototype, "battle.RenderManager", ["IUpdate"]);
})(battle || (battle = {}));
//# sourceMappingURL=RenderManager.js.map