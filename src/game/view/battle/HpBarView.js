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
    var HpBarView = (function (_super) {
        __extends(HpBarView, _super);
        /**
         * 构造函数
         */
        function HpBarView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.BattleHpSkin";
            return _this;
        }
        /**
         * 响应创建子对象
         */
        HpBarView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        Object.defineProperty(HpBarView.prototype, "isEnemy", {
            /**
             * 设置血条样式是否是敌人
             * @param value
             */
            set: function (value) {
                this.progressHp.skinName = value ? "yw.comp.ProgressBarSkin_Hp_Enemy" : "yw.comp.ProgressBarSkin_Hp";
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化血条蓝条
         */
        HpBarView.prototype.initBar = function () {
            this.progressHp.value = 100;
            this.progressMp.value = 100;
        };
        /**
         * 获取Hp进度条对象
         * @returns {ui.UIProgressBar}
         */
        HpBarView.prototype.getHpBar = function () {
            return this.progressHp;
        };
        /**
         * 获取Mp进度条对象
         * @returns {ui.UIProgressBar}
         */
        HpBarView.prototype.getMpBar = function () {
            return this.progressMp;
        };
        /**
         * 设置Hp百分比
         * @param hp
         */
        HpBarView.prototype.setHpPct = function (hp) {
            this.progressHp.value = hp;
        };
        /**
         * 设置Hp
         * @param hp
         * @param maxHp
         */
        HpBarView.prototype.setHp = function (hp, maxHp) {
            this.setHpPct(hp / maxHp * 100);
            hp = Math.min(hp, maxHp);
            hp = Math.max(0, hp);
            this.cur_hp = hp;
        };
        /**
         * 设置Mp
         * @param mp
         */
        HpBarView.prototype.setMpPct = function (mp) {
            this.progressMp.value = mp;
        };
        /**
         * 设置Mp
         * @param mp
         * @param maxMp
         */
        HpBarView.prototype.setMp = function (mp, maxMp) {
            this.setMpPct(mp / maxMp * 100);
            mp = Math.min(mp, maxMp);
            mp = Math.max(0, mp);
            this.cur_mp = mp;
        };
        /**
         * 隐藏
         */
        HpBarView.prototype.hide = function () {
            this.groupRoot.visible = false;
        };
        /**
         * 显示
         */
        HpBarView.prototype.show = function () {
            this.groupRoot.visible = true;
            ;
        };
        /**
         * 隐藏Mp条
         */
        HpBarView.prototype.hideMpBar = function () {
            this.getMpBar().visible = false;
        };
        /**
         * 显示Mp条
         */
        HpBarView.prototype.showMpBar = function () {
            this.getMpBar().visible = true;
        };
        /**
         * 重置血条
         */
        HpBarView.prototype.reset = function () {
            this.y = 0;
        };
        return HpBarView;
    }(eui.Component));
    ui.HpBarView = HpBarView;
    __reflect(HpBarView.prototype, "ui.HpBarView");
})(ui || (ui = {}));
//# sourceMappingURL=HpBarView.js.map