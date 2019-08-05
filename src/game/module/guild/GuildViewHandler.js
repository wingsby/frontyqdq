var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildViewHandler = (function () {
    function GuildViewHandler() {
    }
    /**
     * 打开公会主界面
     */
    GuildViewHandler.openMain = function () {
        var info = Singleton.Get(GuildManager).getInfo();
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.MainView).showSchoolSubPanel();
        layer.getView(ui.SchoolView).close();
        Singleton.Get(GuildManager).reqInfoLazy(false, function () {
            if (info.hasGuild()) {
                // 有公会时打开公会主界面
                layer.getView(ui.GuildView).open();
            }
            else {
                // 无公会时打开公会列表
                layer.getView(ui.GuildListView).open();
            }
        }, this);
    };
    /**
     * 刷新公会主界面
     */
    GuildViewHandler.refreshMain = function () {
        Singleton.Get(LayerManager).getView(ui.GuildView).refresh();
    };
    /**
     * 关闭公会界面
     */
    GuildViewHandler.closeAll = function () {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.GuildView).close();
        layer.getView(ui.GuildListView).close();
        layer.getView(ui.GuildDonationView).close();
        layer.getView(ui.GuildWarView).close();
        layer.getView(ui.GuildWarListView).close();
        layer.getView(ui.GuildTechView).close();
    };
    /**
     * 关闭公会主界面
     */
    GuildViewHandler.closeMain = function () {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.GuildView).close();
    };
    /**
     * 公会界面关闭后操作
     */
    GuildViewHandler.closeAfter = function () {
        Singleton.Get(LayerManager).getView(ui.SchoolSubView).close();
        Singleton.Get(LayerManager).getView(ui.MainView).showSchoolPanel();
    };
    /**
     * 打开创建界面
     */
    GuildViewHandler.openCreate = function () {
        Singleton.Get(LayerManager).getView(ui.GuildCreateView).open();
    };
    /**
     * 响应公会创建完成
     */
    GuildViewHandler.onCreateCompleted = function () {
        GuildViewHandler.closeAll();
        GuildViewHandler.openMain();
    };
    /**
     * 刷新公会列表
     */
    GuildViewHandler.refreshList = function (renew) {
        Singleton.Get(LayerManager).getView(ui.GuildListView).refresh(renew);
    };
    /**
     * 打开公会成员列表
     */
    GuildViewHandler.openMembers = function () {
        Singleton.Get(LayerManager).getView(ui.GuildMemberListView).open();
    };
    /**
     * 刷新公会成员列表
     */
    GuildViewHandler.refreshMembers = function (verbose, force) {
        Singleton.Get(LayerManager).getView(ui.GuildMemberListView).refresh(verbose, force);
    };
    /**
     * 打开入会申请界面
     */
    GuildViewHandler.openApplies = function () {
        Singleton.Get(LayerManager).getView(ui.GuildApplyView).open();
    };
    /**
     * 打开公会捐献界面
     */
    GuildViewHandler.openDonation = function () {
        Singleton.Get(LayerManager).getView(ui.GuildView).close();
        Singleton.Get(LayerManager).getView(ui.GuildDonationView).open();
    };
    /**
     * 打开公会成员操作界面
     */
    GuildViewHandler.openMemberOper = function (uid) {
        Singleton.Get(LayerManager).getView(ui.GuildMemberOperView).open(uid);
    };
    /**
     * 打开公会科技界面
     */
    GuildViewHandler.openTech = function () {
        Singleton.Get(LayerManager).getView(ui.GuildTechView).open();
    };
    /**
     * 打开公会排行榜界面
     */
    GuildViewHandler.openGuildRank = function () {
        Singleton.Get(LayerManager).getView(ui.RankView).open(RankListType.GUILD);
        Singleton.Get(LayerManager).getView(ui.RankView).return_to_guild = true;
    };
    return GuildViewHandler;
}());
__reflect(GuildViewHandler.prototype, "GuildViewHandler");
//# sourceMappingURL=GuildViewHandler.js.map