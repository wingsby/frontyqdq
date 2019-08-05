var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DropUtil = (function () {
    function DropUtil() {
    }
    DropUtil.gotoDrop = function (type, arg) {
        var layer = Singleton.Get(LayerManager);
        // 关闭不需要的界面
        Singleton.Get(LayerManager).getPopup().removePopup(Singleton.Get(LayerManager).getView(ui.VipView));
        Singleton.Get(LayerManager).getView(ui.PrivSpayView).close();
        Singleton.Get(LayerManager).getView(ui.ActivityView).close();
        layer.getView(ui.BagEquipDetailPanelView).close();
        layer.getView(ui.BagComposeView).close();
        layer.getView(ui.BagComposeListView).close();
        switch (type) {
            case ItemWayType.Instance:
                var instance_id = parseInt(arg);
                var is_open = Singleton.Get(InstanceManager).getInstanceInfo().getInstanceInfo(instance_id).is_open;
                console.log(Singleton.Get(InstanceManager).getInstanceInfo().getInstanceInfo(instance_id));
                var fbtype = Template.fbtype.get(Template.instance.get(instance_id).Type);
                var my_lv = Singleton.Get(PlayerInfoManager).getTeamLv();
                if (!is_open || my_lv <= fbtype.OpenLv) {
                    Singleton.Get(DialogControler).showString(Template.getGUIText("append_32"));
                    return;
                }
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                layer.getView(ui.InstanceNewBaseView).open();
                layer.getView(ui.InstanceNewBaseView).openSecondaryMenu();
                layer.getView(ui.InstanceNewListView).open(Template.instance.get(instance_id).Type);
                /**
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                layer.getView(ui.SchoolView).onClick_btnTower();

                const instance_id: number = parseInt(arg);
                const instance: Entity.Instance = Template.instance.get(instance_id);
                if (instance == undefined) {
                    return;
                }

                const is_open: boolean = Singleton.Get(InstanceManager).getInstanceInfo().getInstanceInfo(instance_id).is_open;
                if (!is_open) {
                    Singleton.Get(DialogControler).showString(Template.getGUIText("append_32"));
                    return;
                }

                Singleton.Get(ui.InstanceNewBaseView).open();
                Singleton.Get(LayerManager).getView(ui.InstanceNewBaseView).openSecondaryMenu();
                Singleton.Get(ui.InstanceNewListView).open(instance.Type);
                 */
                break;
            case ItemWayType.Shop:
                var shop_id = parseInt(arg);
                var shop_entity = Template.shop.get(shop_id);
                if (shop_entity == undefined) {
                    return;
                }
                switch (shop_id) {
                    case 3:
                        if (false == OpenManager.CheckOpenWithInfo(OpenType.Arena))
                            return;
                        break;
                    case 5:
                        if (false == OpenManager.CheckOpenWithInfo(OpenType.Duel))
                            return;
                        break;
                }
                switch (shop_entity.TellType) {
                    case 1:
                        var my_vip = Singleton.Get(PlayerInfoManager).getVipLevel();
                        if (my_vip < shop_entity.TellPar) {
                            Singleton.Get(DialogControler).showString("VIP" + shop_entity.TellPar + "\u89E3\u9501\u8BE5\u5546\u5E97");
                            return;
                        }
                        break;
                    case 2:
                        if (!ShopUtil.isShopUnlocked(shop_entity.Id)) {
                            return;
                        }
                        break;
                }
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                layer.getView(ui.ShopListView).open(shop_entity);
                break;
            case ItemWayType.DrawCard:
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                Singleton.Get(LayerManager).getView(ui.MainView).onClick_btnShop(undefined);
                break;
            case ItemWayType.Arena:
                if (false == OpenManager.CheckOpenWithInfo(OpenType.Arena))
                    return;
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                layer.getView(ui.SchoolView).open();
                layer.getView(ui.SchoolView).onClick_btnArena(undefined);
                break;
            case ItemWayType.Duel:
                if (false == OpenManager.CheckOpenWithInfo(OpenType.Duel))
                    return;
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                layer.getView(ui.SchoolView).open();
                layer.getView(ui.SchoolView).onClick_btnDuel(undefined);
                break;
            case ItemWayType.Resolve:
                // layer.getView(ui.MainView).onClick_btnBag(undefined);
                Singleton.Get(LayerManager).getView(ui.EquipResolveView).open();
                break;
            case ItemWayType.Tower:
                if (false == OpenManager.CheckOpenWithInfo(OpenType.Tower))
                    return;
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                layer.getView(ui.SchoolView).open();
                layer.getView(ui.SchoolView).onClick_btnTower(undefined);
                break;
            case ItemWayType.Boss:
                layer.getView(ui.MainView).onClick_btnBattle(undefined);
                BossViewHandler.open();
                break;
            case ItemWayType.Compose:
                Singleton.Get(LayerManager).getView(ui.BagComposeView).open(parseInt(arg));
                break;
            case ItemWayType.Send:
                if (false == OpenManager.CheckOpenWithInfo(OpenType.Send))
                    return;
                layer.getView(ui.MainView).onClick_btnCastle(undefined);
                layer.getView(ui.SchoolView).open();
                layer.getView(ui.SchoolView).onClick_btnSend(undefined);
                break;
            default:
                egret.error("incorrect itemWayType: " + type);
                break;
        }
    };
    DropUtil.getDes = function (type, arg, temp) {
        switch (type) {
            case ItemWayType.Instance:
                var instance_id = parseInt(arg);
                var instance = Template.instance.get(instance_id);
                if (instance == undefined) {
                    return Template.getGUIText(temp);
                }
                return UtilsGame.stringHander(Template.getGUIText(temp), Template.getGUIText(instance.Name));
            case ItemWayType.Shop:
                var shop_id = parseInt(arg);
                var shop_entity = Template.shop.get(shop_id);
                if (shop_entity == undefined) {
                    return Template.getGUIText(temp);
                }
                return UtilsGame.stringHander(Template.getGUIText(temp), Template.getGUIText(shop_entity.ShopName));
            default:
                return Template.getGUIText(temp);
        }
    };
    DropUtil.openDrop = function (item_id, options) {
        if (options === void 0) { options = {}; }
        var cfg_item = Template.item.get(item_id);
        if (!cfg_item) {
            return;
        }
        switch (cfg_item.iType) {
            case ItemType.Gift:
            case ItemType.SimpleGift:
            case ItemType.RandomGift:
            case ItemType.EnchantConst:
            case ItemType.Coin:
            case ItemType.Material:
                Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openMaterial(item_id);
                break;
            case ItemType.Equip:
                Singleton.Get(LayerManager).getView(ui.BagEquipDetailPanelView).open(item_id);
                break;
            case ItemType.EquipFragment:
                if (options.ignore_equip_frag) {
                    Singleton.Get(LayerManager).getView(ui.BagEquipDetailPanelView).open(cfg_item.EquipId);
                }
                else {
                    Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openEquipFrag(item_id, true);
                }
                break;
            case ItemType.RoleFragment:
                if (options.ignore_equip_frag) {
                    var roles = Template.role.values;
                    for (var i = 0; i < roles.length; i++) {
                        var cfg_role = roles[i];
                        if (cfg_role.Type != RoleType.Player) {
                            continue;
                        }
                        if (cfg_role.Fragment == item_id) {
                            Singleton.Get(LayerManager).getView(ui.RoleDetailView).open(cfg_role.ID, true, true);
                            return;
                        }
                    }
                }
                Singleton.Get(LayerManager).getView(ui.BagDropPanelView).openRoleFrag(item_id);
                break;
        }
    };
    return DropUtil;
}());
__reflect(DropUtil.prototype, "DropUtil");
//# sourceMappingURL=DropUtil.js.map