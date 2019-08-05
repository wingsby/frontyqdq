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
    var RoleKiraTamaFullView = (function (_super) {
        __extends(RoleKiraTamaFullView, _super);
        function RoleKiraTamaFullView() {
            var _this = _super.call(this) || this;
            _this.c_child_height = 58;
            _this.c_child_width = 42;
            _this.c_child_spacing = 0;
            _this.cur_active = 0;
            return _this;
        }
        RoleKiraTamaFullView.prototype.init = function (star) {
            if (star <= 0) {
                egret.error("Can't initialize kiraTama, because of no star.");
                return;
            }
            this.reset();
            this.m_childs = [];
            for (var i = 0; i < star; i++) {
                var child = ObjectPool.getPool(ui.RoleKiraTamaView).getObject();
                this.addChild(child);
                child.x = i * (this.c_child_width + this.c_child_spacing);
                child.y = 0;
                child.alpha = 0;
                if (this.m_childs) {
                    this.m_childs.push(child);
                }
            }
        };
        RoleKiraTamaFullView.prototype.play = function (active_count, callback, thisObj) {
            if (active_count === void 0) { active_count = 0; }
            if (callback === void 0) { callback = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (!this.m_childs || this.m_childs.length <= 0) {
                egret.error("Can't play kiraTama, because of no child initialized");
                return;
            }
            this.cur_active = active_count;
            this.playSingle(0, callback, thisObj);
        };
        RoleKiraTamaFullView.prototype.playSingle = function (child_idx, callback, thisObj) {
            var _this = this;
            if (!this.m_childs || this.m_childs.length <= 0) {
                return;
            }
            this.m_childs[child_idx].alpha = 1;
            var is_active = this.cur_active > 0;
            this.cur_active--;
            this.m_childs[child_idx].play(is_active, function () {
                if (!_this.m_childs) {
                    return;
                }
                if (_this.m_childs.length > child_idx + 1) {
                    _this.playSingle(child_idx + 1, callback, thisObj);
                }
                else {
                    if (callback != null) {
                        callback.call(thisObj);
                    }
                }
            }, this);
        };
        RoleKiraTamaFullView.prototype.reset = function () {
            if (this.m_childs) {
                for (var i = 0; i < this.m_childs.length; i++) {
                    egret.Tween.removeTweens(this.m_childs[i]);
                    this.removeChild(this.m_childs[i]);
                    this.m_childs[i].reset();
                    ObjectPool.getPool(ui.RoleKiraTamaView).recycleObject(this.m_childs[i]);
                }
                this.m_childs = [];
            }
        };
        return RoleKiraTamaFullView;
    }(eui.Component));
    ui.RoleKiraTamaFullView = RoleKiraTamaFullView;
    __reflect(RoleKiraTamaFullView.prototype, "ui.RoleKiraTamaFullView");
})(ui || (ui = {}));
//# sourceMappingURL=RoleKiraTamaFullView.js.map