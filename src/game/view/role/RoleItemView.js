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
    var RoleItemView = (function (_super) {
        __extends(RoleItemView, _super);
        /**
         * 构造函数
         */
        function RoleItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RoleItemSkin";
            return _this;
        }
        /**
         * 响应创建子对象
         */
        RoleItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        RoleItemView.prototype.dataChanged = function () {
            this.imgFrag.visible = false;
            if (!this.data) {
                return;
            }
            var cfg_it = Template.item.get(this.data.item_id);
            if (!cfg_it) {
                return;
            }
            this.imgFrag.visible = (cfg_it.iType == ItemType.RoleFragment) || (cfg_it.iType == ItemType.EquipFragment);
        };
        return RoleItemView;
    }(eui.ItemRenderer));
    ui.RoleItemView = RoleItemView;
    __reflect(RoleItemView.prototype, "ui.RoleItemView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleItemView.js.map