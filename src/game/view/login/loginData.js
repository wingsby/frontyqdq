var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var login;
(function (login) {
    /**
     * 服务器信息
     */
    var Servers = (function () {
        function Servers() {
        }
        return Servers;
    }());
    login.Servers = Servers;
    __reflect(Servers.prototype, "login.Servers");
    /**
     * 登陆数据
     */
    var LoginServerData = (function () {
        function LoginServerData() {
        }
        return LoginServerData;
    }());
    login.LoginServerData = LoginServerData;
    __reflect(LoginServerData.prototype, "login.LoginServerData");
    /**
     * 登陆数据
     */
    var LoginDataManager = (function () {
        function LoginDataManager() {
        }
        /**初始化服务器列表信息 */
        LoginDataManager.prototype.initServerInfo = function (logindata) {
            this.loginData = logindata;
            //初始化服务器数据
            this.serls = new Dictionary();
            if (logindata != null && logindata.svList != null) {
                logindata.svList.forEach(function (ser) {
                    this.serls.add(ser.zid, ser);
                }, this);
                var contains_last_zid = false;
                for (var i = 0; i < logindata.svList.length; i++) {
                    if (logindata.svList[i].zid == this.loginData.lastZid) {
                        contains_last_zid = true;
                        break;
                    }
                }
                // 如果所选区服不存在 自动选择最新的区服
                if (!contains_last_zid) {
                    this.loginData.lastZid = logindata.svList[logindata.svList.length - 1].zid;
                }
            }
            else {
                // 没有找到任何游戏服务器则断线
                MessageManager.handleDisconnect(185);
            }
        };
        return LoginDataManager;
    }());
    //public return_url: string = "";
    /**服务器状态 */
    LoginDataManager.serStatus = ["dl_weihu_png", "dl_baoman_png", "dl_yongji_png", "dl_lianghao_png"];
    login.LoginDataManager = LoginDataManager;
    __reflect(LoginDataManager.prototype, "login.LoginDataManager");
})(login || (login = {}));
//# sourceMappingURL=loginData.js.map