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
    var InstanceNewChapterView = (function (_super) {
        __extends(InstanceNewChapterView, _super);
        function InstanceNewChapterView() {
            var _this = _super.call(this, "yw.InstanceNewChapterSkin") || this;
            _this.m_arr_chapter = null;
            _this.initEvent();
            return _this;
        }
        InstanceNewChapterView.prototype.componentCreated = function () {
        };
        InstanceNewChapterView.prototype.onDestroy = function () {
        };
        InstanceNewChapterView.prototype.onUpdate = function (time) {
        };
        InstanceNewChapterView.prototype.open = function () {
            var _this = this;
            this.initTextures(function () {
                _this.execOpen();
            }, this);
        };
        InstanceNewChapterView.prototype.execOpen = function () {
            var layerManager = Singleton.Get(LayerManager);
            layerManager.addView(this);
            this.initContent();
        };
        InstanceNewChapterView.prototype.close = function () {
            // 关闭当前界面
            var layer = Singleton.Get(LayerManager);
            if (layer.isViewOnStage(this)) {
                layer.removeView(this);
            }
        };
        InstanceNewChapterView.prototype.initEvent = function () {
            this.m_arr_chapter = new eui.ArrayCollection();
            this.listChapter.itemRenderer = ui.InstanceNewChapterItemView;
            this.listChapter.dataProvider = this.m_arr_chapter;
        };
        InstanceNewChapterView.prototype.initTextures = function (callback, thisObj) {
            Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open(DEFINE.SYNC_LOADING_DURATION);
            this.asyncLoadChapter(0, callback, thisObj);
        };
        InstanceNewChapterView.prototype.asyncLoadChapter = function (idx, callback, thisObj) {
            var _this = this;
            var fbs = Template.fbtype.values;
            if (fbs.length > idx) {
                ResManager.getResAsync(fbs[idx].BossIcon + "_png", function () {
                    _this.asyncLoadChapter(idx + 1, callback, thisObj);
                }, this);
            }
            else {
                Singleton.Get(LayerManager).getView(ui.SyncLoadingView).cancleOpen();
                if (callback) {
                    callback.call(thisObj);
                }
            }
        };
        InstanceNewChapterView.prototype.initContent = function () {
            var arr = [];
            var fbs = Template.fbtype.values;
            for (var i = 0; i < fbs.length; i++) {
                /**
                if (fbs[i].Type != InstanceType.Hero) {
                    arr.push({
                        id: fbs[i].ID,
                    });
                }
                */
                // 只显示策划允许开放的副本
                if (fbs[i].Switch > 0) {
                    arr.push({
                        id: fbs[i].ID,
                    });
                }
            }
            arr.sort(this.sortFbtype);
            this.m_arr_chapter.source = arr;
        };
        InstanceNewChapterView.prototype.sortFbtype = function (a, b) {
            var cfg_fb_a = Template.fbtype.get(a.id);
            var cfg_fb_b = Template.fbtype.get(b.id);
            // 开放的在前
            var team_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
            var open_a = team_lv >= cfg_fb_a.OpenLv;
            var open_b = team_lv >= cfg_fb_b.OpenLv;
            if (open_a != open_b) {
                if (open_a) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            // 排序标志小的在前
            if (cfg_fb_a.Order != cfg_fb_b.Order) {
                if (cfg_fb_a.Order > cfg_fb_b.Order) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            return 0;
        };
        return InstanceNewChapterView;
    }(BaseUI));
    ui.InstanceNewChapterView = InstanceNewChapterView;
    __reflect(InstanceNewChapterView.prototype, "ui.InstanceNewChapterView");
})(ui || (ui = {}));
//# sourceMappingURL=InstanceNewChapterView.js.map