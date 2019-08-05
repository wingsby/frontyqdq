var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 客户端主对象
 */
var MainManager = (function () {
    /**
     * 构造函数
     */
    function MainManager() {
        this.m_is_single = false;
        this.m_is_login_clean = false;
    }
    /**
     * 初始化游戏
     * @param stage
     */
    MainManager.prototype.init = function (stage) {
        // 注册舞台
        this._stage = stage;
        // 初始化配置
        this.initConfig();
        this.initProloadManager();
        this.initBattleSwitcher();
        // 初始化界面
        Singleton.Get(LayerManager).init(stage);
        this.initStage();
    };
    /**
     * 初始化配置
     */
    MainManager.prototype.initConfig = function () {
        Singleton.Get(AnalyzeConfig).initConfig();
    };
    /**
     * 初始化预载阶段管理器
     */
    MainManager.prototype.initProloadManager = function () {
        Singleton.Get(LayerManager);
        Singleton.Get(NetManager);
        Singleton.Get(LoginManager);
    };
    /**
     * 初始化管理器
     * 需要在进入游戏后才加载的管理器
     */
    MainManager.prototype.initManager = function () {
        // 战斗引用
        Singleton.Get(ActionResManager);
        // 核心战斗
        Singleton.Get(battle.RoundManager);
        Singleton.Get(battle.RenderManager);
        Singleton.Get(battle.ScriptManager);
        Singleton.Get(battle.ActorManager);
        // 周边系统
        Singleton.Get(PlayerInfoManager);
        Singleton.Get(PveManager);
        Singleton.Get(BagManager);
        Singleton.Get(ScrollManager);
        Singleton.Get(DrawCardManager);
    };
    /**
     * 初始化场景
     */
    MainManager.prototype.initStage = function () {
        // 获取LayerManager
        var layer = Singleton.Get(LayerManager);
        var url;
        //////////////////////////////检测  玩吧////////////////////////////////
        var w = window;
        if (w.getOpenKey) {
            url = w.OPEN_DATA.appurl.split("?")[1];
        }
        else {
            url = location.search;
        }
        //////////////////////////////////////////////////////////////
        // 解析URL参数
        var param = new egret.URLVariables(url);
        var mkurl = param.variables["mkey"];
        var plat_id = param.variables["plat_id"];
        var game_id = param.variables["game_id"];
        var extend = param.variables["extend"];
        if (mkurl == undefined) {
            layer.addView(Singleton.Get(ui.LoginView));
        }
        else {
            // 发送服务器连接区服列表
            var parms = mkurl.split("|");
            var mk = parms[0];
            Singleton.Get(login.LoginDataManager).mkey = mk;
            Singleton.Get(login.LoginDataManager).extend = extend;
            DEFINE.LOGIN_SERVER = parms[1]; // 登陆服务器地址
            //////////////检测分享fuid/////////////////
            Singleton.Get(PlatformSDK).invitID = param.variables["fuid"];
            //////////////////////////////////////////
            HttpClient.requestUrl(DEFINE.LOGIN_SERVER + "/info/svlist?mkey=" + mk + "&plat_id=" + plat_id + "&game_id=" + game_id, this, function (data) {
                // console.log(data);
                var serData = JSON.parse(data);
                if (serData.rt != 0) {
                    switch (plat_id) {
                        case I_Platform.p_xx:
                            parent.location.reload();
                            break;
                        case I_Platform.p_4177:
                            loadJs(plat_id, "http://passport.4177.com/game/h5sdk", function () {
                                var open_id = egret.localStorage.getItem(PlatformSDK.yqdq_4177_open);
                                console.log("4177重新登陆！ open_id:" + open_id);
                                SDK_4177.logout(open_id);
                            });
                            return;
                        default:
                            window.location.href = serData.msg;
                            break;
                    }
                }
                //-----------------------------------------------
                var logindata = serData.msg;
                Singleton.Get(login.LoginDataManager).initServerInfo(logindata);
                layer.addView(Singleton.Get(ui.LoginNewView));
                // 显示公告
                Singleton.Get(ui.NoticeView).open(logindata.notice);
                Singleton.Get(PlatformSDK).init_SDK(logindata.pid, logindata.gid, extend);
                // 隐藏加载界面
                var dLoad = document.getElementById('div-load');
                if (dLoad) {
                    var obj_class = dLoad.className;
                    var blank = (obj_class != "") ? " " : "";
                    var added = obj_class + blank + "hidden";
                    dLoad.className = added;
                }
            });
        }
    };
    /**
     * 初始化战斗切换器
     */
    MainManager.prototype.initBattleSwitcher = function () {
        // 添加新战斗步骤：
        // 1、完成 BattleSwitcher 逻辑并在此处注册
        // 2、完善有切换关系的BattleSwitcher的相关切换方法
        Singleton.Get(DramaBattleSwitcher);
        Singleton.Get(PveBattleSwitcher);
        Singleton.Get(BossBattleSwitcher);
        Singleton.Get(InstanceBattleSwitcher);
        Singleton.Get(ArenaBattleSwitcher);
        Singleton.Get(TowerBattleSwitcher);
        Singleton.Get(DuelBattleSwitcher);
        Singleton.Get(GuildWarBattleSwitcher);
        Singleton.Get(GuildWarLogBattleSwitcher);
        Singleton.Get(WorldSingleBattleSwitcher);
        Singleton.Get(WorldFullBattleSwitcher);
        Singleton.Get(SendRobBattleSwitcher);
        Singleton.Get(SendLogBattleSwitcher);
    };
    /**
     * 清理登录界面
     */
    MainManager.cleanLogin = function () {
        // 移除加载界面
        Singleton.Get(LayerManager).removeView(Singleton.Get(LayerManager).getView(ui.LoadingView));
        // 移除登录界面（仅一次）
        if (Singleton.Get(MainManager).m_is_login_clean) {
            return;
        }
        Singleton.Get(MainManager).m_is_login_clean = true;
        var layer = Singleton.Get(LayerManager);
        layer.removeView(layer.getView(ui.LoginView));
        var loginView = Singleton.Get(ui.LoginNewView);
        loginView.onDestroy();
        layer.removeView(loginView);
        var serlsView = Singleton.Get(ui.ServersView);
        serlsView.onDestroy();
        layer.removeView(serlsView);
    };
    /**
     * 加载游戏内容
     */
    MainManager.prototype.loadGame = function (cb, cbt) {
        var _this = this;
        // 初始化游戏相关的管理器
        this.initManager();
        // 初始化战斗层
        if (!Singleton.Get(battle.RenderManager).isInited()) {
            Singleton.Get(battle.RenderManager).init();
        }
        // 调用管理器初始化方法
        Singleton.Get(PlayerInfoManager).onGameLoaded();
        Singleton.Get(PveManager).onGameLoaded(function () {
            Singleton.Get(BagManager).onGameLoaded();
            Singleton.Get(ScrollManager).onGameLoaded();
            Singleton.Get(RoleManager).onGameLoaded();
            Singleton.Get(DrawCardManager).onGameLoaded();
            Singleton.Get(PrivManager).onGameLoaded();
            Singleton.Get(InstanceManager).onGameLoaded();
            Singleton.Get(ArenaManager).onGameLoaded();
            Singleton.Get(MailManager).onGameLoaded();
            Singleton.Get(DuelManager).onGameLoaded();
            Singleton.Get(DailyTaskManager).onGameLoaded();
            Singleton.Get(GoldBuyManager).onGameLoaded();
            Singleton.Get(GuideManager).onGameLoaded();
            Singleton.Get(ActivityManager).onGameLoaded();
            Singleton.Get(TowerManager).onGameLoaded();
            Singleton.Get(DmgManager).onGameLoaded();
            Singleton.Get(RoleLineupRecManager).onGameLoaded();
            Singleton.Get(WishManager).onGameLoaded();
            Singleton.Get(LvgiftManager).onGameLoaded();
            Singleton.Get(GuildManager).onGameLoaded();
            Singleton.Get(GuildWarManager).onGameLoaded();
            Singleton.Get(SnsFollowManager).onGameLoaded();
            Singleton.Get(SnsInviteManager).onGameLoaded();
            Singleton.Get(BossManager).onGameLoaded();
            Singleton.Get(SendManager).onGameLoaded();
            // 预载关键界面
            Singleton.Get(LayerManager).preloadView();
            // 清理登录界面
            MainManager.cleanLogin();
            // 初始化UI
            var layer = Singleton.Get(LayerManager);
            layer.addView(layer.GetCloseUpLayer());
            layer.addView(layer.getView(ui.BgView));
            layer.addView(layer.getView(ui.MainView), function () {
                if (cb) {
                    cb.call(cbt);
                }
                Singleton.Get(PveManager).onSceneLoaded();
            }, _this);
            layer.addView(layer.getView(ui.BattleView));
            layer.getView(ui.TopFloatView).visible = true; // 打开置顶提示层
            // 数据上报
            Singleton.Get(ReportManager).engrave("ENTER_MAIN", new Date().getTime());
            Singleton.Get(ReportManager).onGameLoaded();
        }, this);
    };
    MainManager.OnWindowError = function (message, filename, lineno, colno, error) {
        var log_str = "OnWindowError " + message;
        var send = new msg.SysMsg();
        send.message = message;
        if (filename) {
            send.filename = filename;
            log_str += " file:" + filename;
        }
        if (lineno) {
            send.lineno = lineno;
            log_str += " line:" + lineno;
        }
        if (colno) {
            send.colno = colno;
            log_str += " col:" + colno;
        }
        console.error(log_str);
        if (!HttpClient.httpId) {
            var params = [
                "info=" + send,
            ];
            var url = DEFINE.LOGIN_SERVER + NetConst.ERROR_LOG + "?";
            for (var i = 0; i < params.length; i++) {
                url += params[i] + "&";
            }
            HttpClient.requestUrl(url, this, function (data) { });
        }
        else {
            var cm_msg = new msg.CommonMsg();
            cm_msg.body.systemMsg = send;
            HttpClient.HandlRequestAsWait(NetConst.SYS_WINDOW_ERROR, cm_msg, this, function () { }, false);
        }
    };
    return MainManager;
}());
__reflect(MainManager.prototype, "MainManager");
//# sourceMappingURL=MainManager.js.map