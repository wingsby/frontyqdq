var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DmgItemRender = (function (_super) {
    __extends(DmgItemRender, _super);
    function DmgItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "yw.DmgItemRenderSkin";
        return _this;
    }
    DmgItemRender.prototype.dataChanged = function () {
        if (!this.data) {
            return;
        }
        this.setRole(this.data.role_id);
        this.setDmg(this.data.dps, this.data.t_dmg, this.data.d_rate);
        this.playAni(this.data.idx);
    };
    DmgItemRender.prototype.setRole = function (id) {
        var cfg_role = Template.role.get(id);
        var my_info = Singleton.Get(RoleManager).getRolesInfo().GetRole(id);
        if (!cfg_role || !my_info) {
            return;
        }
        this.labName.text = RoleUtil.GetFullRoleName(id);
        this.labName.textColor = RoleUtil.GetRoleNameColor(my_info.getTier());
        this.labLv.text = my_info.lv.toString();
        ResManager.AsyncSetTexture(this.imgAvatar, cfg_role.Icon);
        ResManager.AsyncSetTexture(this.imgTama, Common.getRoleTamaResEx(my_info.getAwakenStar(), my_info.getAwakenActiveStar()));
        ResManager.AsyncSetTexture(this.imgTierBg, Common.getRoleTierBgResEx(my_info.getTier()));
        ResManager.AsyncSetTexture(this.imgTierSub, Common.getRoleTierSubResEx(my_info.getTier()));
    };
    DmgItemRender.prototype.setDmg = function (dps, t_dmg, d_rate) {
        this.labDmgSec.text = UtilsGame.stringHander(Template.getGUIText("ui_damage8"), dps);
        this.labDmgCount.text = UtilsGame.stringHander(Template.getGUIText("ui_damage9"), t_dmg);
        var pct = d_rate / 100;
        this.labPct.text = UtilsGame.stringHander(Template.getGUIText("ui_damage10"), pct);
        this.projPct.value = pct;
    };
    DmgItemRender.prototype.playAni = function (id) {
        /**
        if (id < 0) {
            return;
        }

        this.groupRoot.alpha = 0;
        this.groupRoot.scaleY = 1.4;
        this.groupRoot.y = 70;
        const tw: egret.Tween = egret.Tween.get(this.groupRoot);
        tw.wait((1 + id) * 20).to({alpha: 1, scaleY: 1, y: 0}, 100, egret.Ease.sineOut);
        */
    };
    return DmgItemRender;
}(eui.ItemRenderer));
__reflect(DmgItemRender.prototype, "DmgItemRender");
//# sourceMappingURL=DmgItemRender.js.map