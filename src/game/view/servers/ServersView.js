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
    var ServersView = (function (_super) {
        __extends(ServersView, _super);
        /**当前选中 */
        function ServersView() {
            var _this = _super.call(this, "yw.ServersSkin") || this;
            ///////////////////////////////////////
            /**当前选中 */
            _this.curSelectPage = 0;
            return _this;
        }
        /**创建界面时执行*/
        ServersView.prototype.componentCreated = function () {
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTapHander, this);
            this.arr_serbtn = new eui.ArrayCollection();
            this.dg_serverButton.dataProvider = this.arr_serbtn;
            this.dg_serverButton.itemRenderer = ui.ServerButtonItemRenderer;
            this.scroller_serverButton.viewport = this.dg_serverButton;
            this.dg_serverButton.addEventListener(ServersView.event_btnSelect, this.selectBtnHander, this);
            this.arr_ser_recent = new eui.ArrayCollection();
            this.dg_Recent.dataProvider = this.arr_ser_recent;
            this.dg_Recent.itemRenderer = ui.ServerItemRenderer;
            this.scroller_Recent.viewport = this.dg_Recent;
            this.dg_Recent.addEventListener(ServersView.event_serSelect, this.selectSerHander, this);
            this.arr_ser = new eui.ArrayCollection();
            this.dg_serverls.dataProvider = this.arr_ser;
            this.dg_serverls.itemRenderer = ui.ServerItemRenderer;
            this.scroller_serverls.viewport = this.dg_serverls;
            this.dg_serverls.addEventListener(ServersView.event_serSelect, this.selectSerHander, this);
            this.initSerLs();
            this.updateData();
        };
        ServersView.prototype.initSerLs = function () {
            var loginM = Singleton.Get(login.LoginDataManager);
            ServersView.serMaxCount = loginM.serls.keys.length;
            this.serPageMaxSize = Math.floor(ServersView.serMaxCount / ServersView.serPageSize);
            if (ServersView.serMaxCount % ServersView.serPageSize != 0)
                this.serPageMaxSize++;
            //初始化服务器按钮列表
            var serBtnArray = [];
            var maxPage = this.serPageMaxSize;
            for (var i = maxPage; i > 0; --i) {
                serBtnArray.push(i);
            }
            this.arr_serbtn.source = serBtnArray;
            this.curSelectPage = serBtnArray[0];
            //初始化玩过的列表
            var result = [];
            if (loginM.loginData.logZid) {
                loginM.loginData.logZid.forEach(function (zid) {
                    loginM.serls.values.forEach(function (server) {
                        if (server.zid == zid) {
                            result.push(zid);
                        }
                    });
                });
            }
            this.arr_ser_recent.source = result;
        };
        ServersView.prototype.selectBtnHander = function (e) {
            //服务器列表
            console.log(e.data);
            this.curSelectPage = e.data;
            this.updateData();
        };
        /**选中服务器信息 */
        ServersView.prototype.selectSerHander = function (e) {
            this.dispatchEventWith(ServersView.event_changeSer, false, e.data);
            this.close();
        };
        /**
         * 更新服务器列表
         */
        ServersView.prototype.updateData = function () {
            this.scroller_serverls.stopAnimation();
            this.arr_ser.removeAll();
            //初始化服务器列表
            var serCount = ServersView.serMaxCount;
            var min = ServersView.serPageSize * (this.curSelectPage - 1);
            var max = ServersView.serPageSize * this.curSelectPage;
            max = Math.min(serCount, max);
            var arr = Singleton.Get(login.LoginDataManager).serls.keys.slice(min, max);
            this.arr_ser.source = arr.sort(function (a, b) { return b - a; });
        };
        ServersView.prototype.closeTapHander = function (e) {
            this.close();
        };
        ServersView.prototype.open = function () {
            Singleton.Get(PopupManager).addPopup(this);
        };
        ServersView.prototype.close = function () {
            Singleton.Get(PopupManager).removePopup(this);
        };
        /**销毁界面时执行*/
        ServersView.prototype.onDestroy = function () {
            this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTapHander, this);
            this.dg_serverButton.removeEventListener(ServersView.event_btnSelect, this.selectBtnHander, this);
            this.dg_Recent.removeEventListener(ServersView.event_serSelect, this.selectSerHander, this);
            this.dg_serverls.removeEventListener(ServersView.event_serSelect, this.selectSerHander, this);
        };
        /**更新UI */
        ServersView.prototype.onUpdate = function (time) {
        };
        return ServersView;
    }(PopupUI));
    ////////////////////////////exml2class:结束替换声明区域///////////////////////////////
    //更换服务器
    ServersView.event_changeSer = "event_changeSer";
    //选择服务器
    ServersView.event_serSelect = "event_serSelect";
    //服务器选择列表
    ServersView.event_btnSelect = "event_btnSelect";
    /**分页大小*/
    ServersView.serPageSize = 20;
    /**服务器数量 */
    ServersView.serMaxCount = 100;
    ui.ServersView = ServersView;
    __reflect(ServersView.prototype, "ui.ServersView");
})(ui || (ui = {}));
//# sourceMappingURL=ServersView.js.map