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
     * 动态加载界面
     */
    var SyncLoadingView = (function (_super) {
        __extends(SyncLoadingView, _super);
        function SyncLoadingView() {
            var _this = _super.call(this, yw.SyncLoadingSkin) || this;
            _this.m_open_time = 0;
            _this.m_dot_num = 0;
            _this.m_last_tick = 0;
            _this.m_is_open = false;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        SyncLoadingView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        SyncLoadingView.prototype.onAddToStage = function () {
            this.mcLoading.setMovieClip(DEFINE.LOGIN_MC_ROLE);
            this.mcLoading.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_move]);
            Singleton.Get(RegisterUpdate).register(this);
        };
        SyncLoadingView.prototype.onRemoveFromStage = function () {
            this.mcLoading.clearMovieClip();
            Singleton.Get(RegisterUpdate).unRegister(this);
        };
        SyncLoadingView.prototype.open = function (wait) {
            if (wait === void 0) { wait = 0; }
            this.m_open_time = UtilsGame.Now() + wait;
            if (wait > 0) {
                Singleton.Get(UpdateTimer).addAndStart(wait, this.execOpen, this);
            }
            else {
                this.execOpen();
            }
        };
        SyncLoadingView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.m_open_time = 0;
            this.m_dot_num = 0;
            this.m_last_tick = 0;
            this.m_is_open = false;
        };
        SyncLoadingView.prototype.execOpen = function () {
            if (UtilsGame.Now() >= this.m_open_time && this.m_open_time > 0) {
                if (!this.m_is_open) {
                    Singleton.Get(LayerManager).getPopup().addPopup(this);
                    this.m_is_open = true;
                }
            }
        };
        SyncLoadingView.prototype.cancleOpen = function () {
            this.m_open_time = 0;
            if (this.m_is_open) {
                this.close();
            }
        };
        SyncLoadingView.prototype.update = function (time) {
            if (UtilsGame.Now() - this.m_last_tick > 500) {
                this.m_last_tick = UtilsGame.Now();
                this.m_dot_num += 1;
                if (this.m_dot_num > 6) {
                    this.m_dot_num = 0;
                }
                var proj_text = "请求中";
                for (var i = 0; i < this.m_dot_num + 1; i++) {
                    proj_text += ".";
                }
                this.labProgress.text = proj_text;
            }
        };
        SyncLoadingView.prototype.componentCreated = function () {
        };
        SyncLoadingView.prototype.onDestroy = function () {
        };
        SyncLoadingView.prototype.onUpdate = function (time) {
        };
        return SyncLoadingView;
    }(PopupUI));
    ui.SyncLoadingView = SyncLoadingView;
    __reflect(SyncLoadingView.prototype, "ui.SyncLoadingView", ["IUpdate"]);
})(ui || (ui = {}));
//# sourceMappingURL=SyncLoadingView.js.map