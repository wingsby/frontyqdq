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
    var RoleLineupRecItemItemView = (function (_super) {
        __extends(RoleLineupRecItemItemView, _super);
        function RoleLineupRecItemItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleLineupRecItemItemSkin";
            return _this;
        }
        RoleLineupRecItemItemView.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.initView(this.data.item_id, this.data.count);
            this.playAni(this.data.id);
        };
        RoleLineupRecItemItemView.prototype.initView = function (item_id, count) {
            // 获取道具配置
            var cfg_item = Template.item.get(item_id);
            if (!cfg_item) {
                if (item_id == -1) {
                    ResManager.AsyncSetTexture(this.imgTier, DEFINE.UI_ALERT_INFO.gold.tierPNG);
                    ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.gold.resPNG);
                }
                else if (item_id == -2) {
                    ResManager.AsyncSetTexture(this.imgTier, DEFINE.UI_ALERT_INFO.diamond.tierPNG);
                    ResManager.AsyncSetTexture(this.imgIcon, DEFINE.UI_ALERT_INFO.diamond.resPNG);
                }
                else {
                    console.log("no item: " + item_id);
                }
                this.imgFrag.visible = false;
            }
            else {
                // 设定道具信息
                ResManager.AsyncSetTexture(this.imgTier, Common.getItemTierBgRes(cfg_item.iStar));
                ResManager.AsyncSetTexture(this.imgIcon, cfg_item.iIcon);
                // 设定碎片状态
                this.imgFrag.visible = (cfg_item.iType == ItemType.EquipFragment) || (cfg_item.iType == ItemType.RoleFragment);
            }
            // 设定道具数量
            if (this.data.count) {
                this.labCount.visible = true;
                this.labCount.text = UtilsGame.stringHander(Template.getGUIText("ui_activity1"), UtilsGame.numberToString(count));
            }
            else {
                this.labCount.visible = false;
            }
        };
        RoleLineupRecItemItemView.prototype.playAni = function (id) {
        };
        return RoleLineupRecItemItemView;
    }(eui.ItemRenderer));
    ui.RoleLineupRecItemItemView = RoleLineupRecItemItemView;
    __reflect(RoleLineupRecItemItemView.prototype, "ui.RoleLineupRecItemItemView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleLineupRecItemItemView.js.map