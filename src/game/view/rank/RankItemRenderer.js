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
    var RankItemRenderer = (function (_super) {
        __extends(RankItemRenderer, _super);
        ////////////////////////////exml2class:结束替换声明区域///////////////////////////////
        function RankItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "yw.RankItemRendererSkin";
            return _this;
        }
        RankItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHander, this);
            // this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
        };
        RankItemRenderer.prototype.tapHander = function (e) {
            // TODO 关联到详情页面
            if (!this.data) {
                return;
            }
            if (this.data.info.type == ArenaPlayerType.Robot) {
                Singleton.Get(DialogControler).showString(Template.getGUIText("append_195"));
                return;
            }
            Singleton.Get(RankManager).reqPlayerInfo(this.data.info.uid, function (info, roles) {
                Singleton.Get(LayerManager).getView(ui.SeeRoleDetailView).open();
                Singleton.Get(LayerManager).getView(ui.SeeRoleDetailView).initContent(info, roles);
            }, this);
        };
        RankItemRenderer.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            this.setInfo(this.data.type, this.data.info);
        };
        RankItemRenderer.prototype.setInfo = function (type, info) {
            var rp_info = UtilsGame.cloneObject(info);
            if (rp_info.type == ArenaPlayerType.Robot) {
                var robot_id_pure = info.uid.replace("Rbt", "");
                var robot_id = parseInt(robot_id_pure);
                var robot_info = Template.robot.get(robot_id);
                if (!robot_info) {
                    console.log("rank no robot_id: " + robot_id);
                    return;
                }
                // 计算战斗力
                var fighting = 0;
                for (var i = 0; i < robot_info.Teams.length; i++) {
                    var robot_role = new RoleInfo();
                    robot_role.InitByRoleConfigIdAndLv(robot_info.Teams[i], robot_info.Lv[i]);
                    fighting += robot_role.fighting;
                }
                rp_info.level = 0;
                rp_info.avatar_img = robot_info.Icon;
                rp_info.fighting = fighting;
                rp_info.nickname = Template.getGUIText(robot_info.Name);
                rp_info.team_lv = robot_info.Lv[0];
            }
            this.setRank(rp_info.ranking);
            this.setType(type, rp_info);
            ResManager.AsyncSetTexture(this.imgBg, Singleton.Get(LoginManager).uid == rp_info.uid ? "BG_itemzj_png" : "BG_item_png");
            ResManager.asyncsetHeadImg(rp_info.avatar_img, this.img_head, this);
            this.labUsername.text = rp_info.nickname;
            this.labLv.text = "Lv." + rp_info.team_lv.toString();
            this.labTxtGuild.text = Template.getGUIText("ui_ex_rank_5");
            this.labGuild.text = (!rp_info.guard_name || rp_info.guard_name.length <= 0) ? Template.getGUIText("ui_pve_38") : rp_info.guard_name;
            // this.lb_guild.text = (!rp_info.guard_name || rp_info.guard_name.length <= 0) ? Template.getGUIText("ui_pve_38") : UtilsGame.stringHander(Template.getGUIText("ui_pve_39"), rp_info.guard_name);
            // this.lb_userInfo.text = rp_info.nickname + " " + "Lv." + rp_info.team_lv;
            // VIP等级
            if (!rp_info.vip_lv) {
                this.groupVip.visible = false;
            }
            else {
                this.groupVip.visible = true;
                this.labVipLevel.text = rp_info.vip_lv.toString();
            }
            // var my_mask: egret.Shape = new egret.Shape();
            // this.img_head.parent.addChild(my_mask);
            // my_mask.x = this.img_head.x + this.img_head.width / 2;
            // my_mask.y = this.img_head.y + this.img_head.height / 2;
            // my_mask.graphics.beginFill(0x000000, 1);
            // my_mask.graphics.drawCircle(0, 0, this.img_head.width / 2);
            // my_mask.graphics.endFill();
            // this.img_head.mask = my_mask;
        };
        RankItemRenderer.prototype.setType = function (type, info) {
            switch (type) {
                case RankListType.PVE:
                    this.labTxtFighting.text = Template.getGUIText("ui_ex_rank_6");
                    this.labFighting.text = Common.getLevelName(info.level); // UtilsGame.stringHander(Template.getGUIText("ui_pve_40"), Common.getLevelName(info.level));
                    break;
                case RankListType.TEAM_LV:
                case RankListType.ARENA:
                    this.labTxtFighting.text = Template.getGUIText("ui_ex_rank_7");
                    this.labFighting.text = info.fighting.toString(); // UtilsGame.stringHander(Template.getGUIText("ui_pve_41"), info.fighting);
                    break;
                case RankListType.TOWER:
                    this.labTxtFighting.text = Template.getGUIText("ui_ex_rank_12");
                    this.labFighting.text = UtilsGame.stringHander(Template.getGUIText("ui_ex_rank_13"), info.tower); // TODO 爬塔
                    break;
            }
        };
        RankItemRenderer.prototype.setRank = function (rank) {
            if (rank >= 1 && rank <= 3) {
                /// source的写法改为
                // this.img_rank.source = "icon_no" + rank + "_png";
                ResManager.AsyncSetTexture(this.img_rank, "icon_no" + rank + "_png");
                ResManager.AsyncSetTexture(this.imgRankBgS, "BG_icon_no" + rank + "_png", undefined, this, true);
                this.img_rank.visible = true;
                this.imgRankBgS.visible = true;
                this.labRank.visible = false;
            }
            else if (rank > 3) {
                this.img_rank.visible = false;
                this.imgRankBgS.visible = false;
                this.labRank.visible = true;
                this.labRank.text = rank.toString();
            }
            else {
                this.img_rank.visible = false;
                this.labRank.text = "-";
            }
        };
        RankItemRenderer.prototype.dispose = function (e) {
            // this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHander, this);
        };
        return RankItemRenderer;
    }(eui.ItemRenderer));
    ui.RankItemRenderer = RankItemRenderer;
    __reflect(RankItemRenderer.prototype, "ui.RankItemRenderer");
})(ui || (ui = {}));
//# sourceMappingURL=RankItemRenderer.js.map