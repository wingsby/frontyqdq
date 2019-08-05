var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 特效显示对象
 */
var battle;
(function (battle) {
    var EffectBase = (function (_super) {
        __extends(EffectBase, _super);
        function EffectBase(mcName, mcJson, textureName) {
            var _this = _super.call(this, mcName) || this;
            _this.m_bSetMaxZorder = false;
            _this.ZOREDER_ROLE_MAX = 480;
            _this.m_callback = null;
            _this.m_thisObj = null;
            _this.m_params = null;
            return _this;
        }
        EffectBase.prototype.onAddToStage = function (e) {
            _super.prototype.onAddToStage.call(this, e);
            this.m_callback = null;
            this.m_thisObj = null;
            this.m_params = null;
        };
        EffectBase.prototype.SetMaxZOrder = function (b) {
            this.m_bSetMaxZorder = b;
        };
        /**获取zorder排序值 */
        EffectBase.prototype.getZorder = function () {
            if (this.m_bSetMaxZorder) {
                return this.y + SORT_CONST.ZOREDER_ROLE_MAX;
            }
            return this.y;
        };
        /**
        * 响应从舞台移除
        * @param e
        */
        EffectBase.prototype.onRemoveFromStage = function (e) {
            _super.prototype.onRemoveFromStage.call(this, e);
            if (this.m_callback) {
                this.m_callback.call(this.m_thisObj, this.m_params);
            }
        };
        EffectBase.prototype.SetRemoveFromStageFunc = function (callback, thisObj, params) {
            this.m_callback = callback;
            this.m_thisObj = thisObj;
            this.m_params = params;
        };
        EffectBase.prototype.Pause = function (bPause) {
            if (bPause) {
                this.stop();
            }
            else {
                this.play();
            }
        };
        return EffectBase;
    }(BaseMovieClip));
    battle.EffectBase = EffectBase;
    __reflect(EffectBase.prototype, "battle.EffectBase");
})(battle || (battle = {}));
//# sourceMappingURL=EffectBase.js.map