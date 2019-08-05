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
     * 载入界面
     */
    var LoadingView = (function (_super) {
        __extends(LoadingView, _super);
        function LoadingView() {
            var _this = _super.call(this) || this;
            // TODO 通知策划配置
            _this.m_des = [
                "加载过程中不消耗流量",
                "加载中.",
                "加载中..",
                "加载中...",
                "加载中....",
                "加载中.....",
                "加载中......",
            ];
            _this.skinName = "yw.LoadingSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        LoadingView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.labVersion.text = "版本：" + DEFINE.GAME_VERSION; // TODO 加到字典表
            this.labDes.text = this.m_des[0];
        };
        LoadingView.prototype.onAddToStage = function () {
            this.mcLoading.setMovieClip(DEFINE.LOGIN_MC_ROLE);
            this.mcLoading.gotoAndPlay(DEFINE.g_ActionTypeName[battle.ActionType.AT_move]);
        };
        LoadingView.prototype.onRemoveFromStage = function () {
            this.mcLoading.clearMovieClip();
        };
        /**
         * 更新加载状态
         */
        LoadingView.prototype.UpdateProgress = function (current, total) {
            var percent = current / total;
            this.progressBar.value = percent * 100;
            this.labProgress.text = "加载" + Math.floor(percent * 100) + "%..."; // TODO 加到字典表
            var pct_rank = Math.floor(percent * 100 / (100 / this.m_des.length));
            if (pct_rank > this.m_des.length - 1) {
                pct_rank = this.m_des.length - 1;
            }
            this.labDes.text = this.m_des[pct_rank];
        };
        return LoadingView;
    }(ui.UIView));
    ui.LoadingView = LoadingView;
    __reflect(LoadingView.prototype, "ui.LoadingView");
})(ui || (ui = {}));
//# sourceMappingURL=LoadingView.js.map