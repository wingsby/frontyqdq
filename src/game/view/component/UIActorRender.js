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
     * 用于UI的ActorRender
     */
    var UIActorRender = (function (_super) {
        __extends(UIActorRender, _super);
        /**
         * 构造函数
         */
        function UIActorRender() {
            var _this = _super.call(this) || this;
            _this.m_clip = null;
            _this.m_isOnStage = false;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        /**
         * 响应添加到舞台
         * @param e
         */
        UIActorRender.prototype.onAddToStage = function (e) {
            if (this.m_clip != null) {
                this.addChild(this.m_clip);
            }
            this.m_isOnStage = true;
        };
        /**
         * 响应从舞台移除
         * @param e
         */
        UIActorRender.prototype.onRemoveFromStage = function (e) {
            if (this.m_clip != null) {
                this.removeChild(this.m_clip);
            }
            this.m_isOnStage = false;
        };
        /**
         * 设置动画
         * @param mcName
         */
        UIActorRender.prototype.setMovieClip = function (mcName, at) {
            this.clearMovieClip();
            if (!this.m_clip) {
                this.m_clip = new battle.ActorRender(mcName);
            }
            else {
                this.m_clip.ReloadRes(mcName);
            }
            if (at == undefined || at >= battle.ActionType.AT_NULL) {
                this.m_clip.play(-1);
            }
            else {
                this.m_clip.DoAction(battle.ActionType.AT_wait);
            }
            this.addChild(this.m_clip);
        };
        /**
         * 清理现有的动画
         */
        UIActorRender.prototype.clearMovieClip = function () {
            if (this.m_clip != null && this.m_isOnStage) {
                this.removeChild(this.m_clip);
                this.m_clip = null;
            }
        };
        /**
         * 设置动作
         * @param at
         */
        UIActorRender.prototype.doAction = function (at) {
            this.m_clip.DoAction(at, undefined, true);
        };
        /**
         * 析构函数（手动调用）
         */
        UIActorRender.prototype.dispose = function () {
            this.m_clip = null;
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        return UIActorRender;
    }(eui.Component));
    ui.UIActorRender = UIActorRender;
    __reflect(UIActorRender.prototype, "ui.UIActorRender");
})(ui || (ui = {}));
//# sourceMappingURL=UIActorRender.js.map