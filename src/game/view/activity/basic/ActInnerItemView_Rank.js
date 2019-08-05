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
     * 活动条目视图
     */
    var ActInnerItemView_Rank = (function (_super) {
        __extends(ActInnerItemView_Rank, _super);
        /**
         * @constructor
         */
        function ActInnerItemView_Rank() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.ActInnerItemSkin_Rank";
            // 绑定基本事件
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            // 设定道具列表数据源
            _this.arr_items = new eui.ArrayCollection();
            _this.dgItems.dataProvider = _this.arr_items;
            _this.dgItems.itemRenderer = ui.ActInnerItemItemView;
            return _this;
        }
        /**
         * 响应添加到舞台
         */
        ActInnerItemView_Rank.prototype.onAddToStage = function () {
        };
        /**
         * 响应从舞台移除
         */
        ActInnerItemView_Rank.prototype.onRemoveFromStage = function () {
        };
        /**
         * 响应数据变更
         */
        ActInnerItemView_Rank.prototype.dataChanged = function () {
            // 数据判空
            if (!this.data) {
                return;
            }
            // 初始化内容
            this.initView();
            // 设定按钮回调
            this.setCallback(this.data.callback, this.data.thisObj);
        };
        /**
         * 初始化界面内容
         */
        ActInnerItemView_Rank.prototype.initView = function () {
            var _this = this;
            // 设定排名
            this.lbRank.text = this.data.context.title;
            var rank = this.data.context.rank;
            if (rank <= 3 && rank > 0) {
                ResManager.AsyncSetTexture(this.img_rank_bg_s, "icon_no" + rank + "_png");
                this.lbRank.visible = false;
                this.img_rank_bg_n.visible = false;
                Singleton.Get(RankManager).getRank(this.data.context.rank_type, function (rank_players, my_rank) {
                    if (rank_players.length >= rank) {
                        // 榜上有人
                        _this.img_rank_bg_s.visible = false;
                        _this.groupAvatar.visible = true;
                        _this.labPlayerName.visible = true;
                        _this.labMark.visible = true;
                        _this.imgRankS.visible = true;
                        var inf_player = rank_players[rank - 1];
                        ResManager.asyncsetHeadImg(inf_player.avatar_img, _this.img_head, _this);
                        ResManager.AsyncSetTexture(_this.imgRankS, "rank_icon_no" + rank + "_png");
                        _this.img_head.mask = _this.maskHead;
                        _this.labMark.text = "战力: " + inf_player.fighting;
                        _this.labPlayerName.text = inf_player.nickname + " Lv." + inf_player.team_lv;
                        if (inf_player.vip_lv > 0) {
                            _this.groupVip.visible = true;
                            _this.groupAvatar.y = 30;
                            _this.labVipLevel.text = inf_player.vip_lv.toString();
                        }
                        else {
                            _this.groupAvatar.y = 36;
                            _this.groupVip.visible = false;
                        }
                    }
                    else {
                        // 榜上无人时的显示状态
                        _this.img_rank_bg_s.visible = true;
                        _this.groupAvatar.visible = false;
                        _this.labPlayerName.visible = false;
                        _this.labMark.visible = false;
                        _this.imgRankS.visible = false;
                    }
                }, this);
            }
            else {
                this.lbRank.visible = true;
                this.img_rank_bg_s.visible = false;
                this.img_rank_bg_n.visible = true;
                this.groupAvatar.visible = false;
                this.labPlayerName.visible = false;
                this.labMark.visible = false;
                this.imgRankS.visible = false;
                if (this.data.item_id == 0) {
                    this.lbRank.text = "50名以外";
                }
            }
            // 设定道具
            this.setItem();
        };
        ActInnerItemView_Rank.prototype.setItem = function () {
            var items = [];
            // 金币
            if (this.data.gold > 0) {
                items.push({
                    item_id: -1,
                    count: this.data.gold,
                });
            }
            // 钻石
            if (this.data.diamond > 0) {
                items.push({
                    item_id: -2,
                    count: this.data.diamond,
                });
            }
            // 道具
            if (this.data.items && this.data.items.length > 0 && this.data.items[0].item_id > 0) {
                for (var i = 0; i < this.data.items.length; i++) {
                    items.push(this.data.items[i]);
                }
            }
            // 重新生成id
            for (var i = 0; i < items.length; i++) {
                items[i].id = i;
            }
            this.arr_items.source = items;
        };
        /**
         * 设定按钮回调
         */
        ActInnerItemView_Rank.prototype.setCallback = function (callback, thisObj) {
            this.btn_cb = callback;
            this.btn_cbt = thisObj;
        };
        return ActInnerItemView_Rank;
    }(eui.ItemRenderer));
    ui.ActInnerItemView_Rank = ActInnerItemView_Rank;
    __reflect(ActInnerItemView_Rank.prototype, "ui.ActInnerItemView_Rank");
})(ui || (ui = {}));
//# sourceMappingURL=ActInnerItemView_Rank.js.map