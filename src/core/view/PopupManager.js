var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PopupManager = (function () {
    function PopupManager() {
    }
    /**初始化*/
    PopupManager.prototype.initialize = function (root) {
        this.rootLayer = root;
        this.popLayer = new eui.UILayer();
        this.popLayer.touchEnabled = false;
        this.popLayer.visible = false;
        this.rootLayer.addChild(this.popLayer);
        this.popupMask = ObjectPool.getPool(eui.Rect).getObject();
        this.popupMask.width = root.width;
        this.popupMask.height = root.height;
        this.popupMask.fillAlpha = 0x000000;
        this.popupMask.fillAlpha = 0.8;
        this.popupMask.visible = true;
        this.popupMask.touchEnabled = true;
        this.popLayer.addChild(this.popupMask);
    };
    ////////////////////////////////////////PopupUI////////////////////////////////////////////////////////////
    /**
     * 添加弹出框
     * @param {PopupUI}  ui PopupUI
     * @param {boolean}  isClearCurrent 是否移除前一个（默认false）
     * */
    PopupManager.prototype.addPopup = function (ui, isClearCurrent) {
        if (isClearCurrent === void 0) { isClearCurrent = false; }
        if (ui == undefined)
            return;
        if (this.popLayer.contains(ui)) {
            console.log("Duplicated add PopupUI");
        }
        /**移除前一个 */
        if (isClearCurrent) {
            this.removePopup(this.getCurrentPopupUI());
            // 重绘子父级（待定是否需要添加）
            this.popLayer.validateDisplayList();
        }
        var childCount = this.popLayer.numChildren;
        if (childCount > 1) {
            // 已经有UI 遮罩置顶
            this.popLayer.setChildIndex(this.popupMask, childCount - 1);
        }
        this.popLayer.visible = true;
        this.popLayer.addChild(ui);
        Singleton.Get(GuideManager).onPopupAdded(Object.getPrototypeOf(ui).__class__);
        ui.alpha = 0;
        var tw = egret.Tween.get(ui);
        tw.to({ alpha: 0.8 }, 80, egret.Ease.sineIn)
            .to({ alpha: 0.9 }, 40, egret.Ease.sineIn)
            .to({ alpha: 1 }, 40, egret.Ease.sineIn)
            .call(function () {
            egret.Tween.removeTweens(ui);
        }, this);
        this.setMaskVisible(true);
    };
    /**
     * 移除UI
     */
    PopupManager.prototype.removePopup = function (ui) {
        if (ui == undefined) {
            console.log("PopupUI is null");
            return;
        }
        if (this.popLayer.contains(ui)) {
            this.setMaskVisible(false);
            this.popLayer.removeChild(ui);
            // 重绘子父级（待定是否需要添加）
            this.popLayer.validateDisplayList();
            var childCount = this.popLayer.numChildren;
            if (childCount > 1) {
                this.popLayer.setChildIndex(this.popupMask, childCount - 2);
            }
            else {
                this.popLayer.visible = false;
            }
            Singleton.Get(GuideManager).onPopupRemoved(Object.getPrototypeOf(ui).__class__);
        }
        // ui.onDestroy();
        // ui = null;
    };
    // private is_mask_visible = false;
    PopupManager.prototype.setMaskVisible = function (is_active) {
        /**
        if (is_active == this.is_mask_visible) {
            return;
        }

        this.is_mask_visible = is_active;

        if (is_active) {
            this.popupMask.alpha = is_active ? 0 : 1;
            const tw: egret.Tween = egret.Tween.get(this.popupMask);
            tw.to({alpha: is_active ? 1 : 0}, 100);
        } else {
            this.popupMask.alpha = is_active ? 1 : 0;
        }
         */
    };
    /**更新指定UI */
    PopupManager.prototype.updatePopupUI = function (target) {
        var count = this.popLayer.numChildren;
        for (var i = 0; i < count; i++) {
            var element = this.popLayer.getChildAt(i);
            if (element instanceof target) {
                element.onUpdate();
                break;
            }
        }
    };
    /**获取最上层popupUI */
    PopupManager.prototype.getCurrentPopupUI = function () {
        var num = this.popLayer.numChildren;
        if (this.popLayer != undefined && num > 0) {
            var index = num - 1;
            for (index; index >= 0; index--) {
                var element = this.popLayer.getChildAt(index);
                if (element == this.popupMask) {
                }
                else if (element instanceof PopupUI) {
                    return element;
                }
            }
        }
        return undefined;
    };
    /**清除最上层popupUI */
    PopupManager.prototype.ClearCurrentPopupUI = function () {
        var target = this.getCurrentPopupUI();
        if (target != undefined) {
            var pui = target;
            if (pui) {
                pui.dispose();
            }
        }
    };
    return PopupManager;
}());
__reflect(PopupManager.prototype, "PopupManager");
//# sourceMappingURL=PopupManager.js.map