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
    var GuildWarResultView = (function (_super) {
        __extends(GuildWarResultView, _super);
        function GuildWarResultView() {
            var _this = _super.call(this, "yw.GuildWarResultSkin") || this;
            _this.m_stars = [];
            return _this;
        }
        GuildWarResultView.prototype.componentCreated = function () {
            this.m_stars = [this.imgStar0, this.imgStar1, this.imgStar2];
        };
        GuildWarResultView.prototype.onDestroy = function () { };
        GuildWarResultView.prototype.onUpdate = function (time) { };
        GuildWarResultView.prototype.open = function () {
            Singleton.Get(LayerManager).getPopup().addPopup(this);
            this.btnHandler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        GuildWarResultView.prototype.close = function () {
            Singleton.Get(LayerManager).getPopup().removePopup(this);
            this.btnHandler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_btnHandler, this);
        };
        GuildWarResultView.prototype.onClick_btnHandler = function () {
            var _this = this;
            UtilsEffect.buttonEffect(this.btnHandler, function () {
                _this.close();
            }, this);
        };
        GuildWarResultView.prototype.initView = function (is_win, star, my_dead, item_count) {
            console.log("initGuildWarResultView, is_win: " + is_win + ", star: " + star + ", my_dead: " + my_dead + ", item_count: " + item_count);
            this.setItem(item_count);
            this.setStar(is_win, star, my_dead);
            this.setWin(is_win);
        };
        GuildWarResultView.prototype.setWin = function (is_win) {
            this.groupFailed.visible = !is_win;
            this.groupTitleGrey.visible = !is_win;
            this.groupWin.visible = is_win;
            this.groupTitleColorful.visible = is_win;
        };
        GuildWarResultView.prototype.setItem = function (count) {
            var cfg_it = Template.item.get(Template.config.Donate1);
            if (!cfg_it) {
                console.log("no item: " + Template.config.Donate1);
                return;
            }
            if (!count) {
                count = 0;
            }
            ResManager.AsyncSetTexture(this.imgItemIcon, cfg_it.iIcon);
            ResManager.AsyncSetTexture(this.imgItemTier, Common.getItemTierBgRes(cfg_it.iStar));
            this.labItemCount.text = "x" + count;
        };
        GuildWarResultView.prototype.setStar = function (is_win, star, my_dead) {
            if (star < 0) {
                star = 0;
            }
            else if (star > 3) {
                star = 3;
            }
            // 设定星数
            for (var i = 0; i < this.m_stars.length; i++) {
                if (star > i) {
                    ResManager.AsyncSetTexture(this.m_stars[i], "gonghuizhan_xing1_png");
                }
                else {
                    ResManager.AsyncSetTexture(this.m_stars[i], "gonghuizhan_xing3_png");
                }
            }
            // 设定文字提示
            if (is_win) {
                if (my_dead > 0) {
                    this.labDesWin.text = UtilsGame.stringHander(Template.getGUIText("ui_guildwar20"), my_dead, star);
                }
                else {
                    this.labDesWin.text = UtilsGame.stringHander(Template.getGUIText("ui_guildwar21"), star);
                }
            }
            else {
                this.labDesFailed.text = UtilsGame.stringHander(Template.getGUIText("ui_guildwar30"));
            }
        };
        return GuildWarResultView;
    }(PopupUI));
    ui.GuildWarResultView = GuildWarResultView;
    __reflect(GuildWarResultView.prototype, "ui.GuildWarResultView");
})(ui || (ui = {}));
//# sourceMappingURL=GuildWarResultView.js.map