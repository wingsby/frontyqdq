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
    var MainSubMenuComponent = (function (_super) {
        __extends(MainSubMenuComponent, _super);
        function MainSubMenuComponent() {
            var _this = _super.call(this) || this;
            _this.m_refresh_rate = -1;
            _this.m_entries = new eui.ArrayCollection();
            _this.itemRenderer = ui.MainSubMenuItemRenderer;
            _this.dataProvider = _this.m_entries;
            return _this;
        }
        MainSubMenuComponent.prototype.getEntries = function () {
            return this.m_entries;
        };
        MainSubMenuComponent.prototype.setLists = function (list) {
            this.m_list = list;
        };
        MainSubMenuComponent.prototype.refresh = function () {
            var source = [];
            var inf_login = Singleton.Get(LoginManager).loginInfo;
            var inf_act = Singleton.Get(ActivityManager).getInfo();
            var list = this.m_list;
            if (!list) {
                list = [];
            }
            for (var i = 0; i < list.length; i++) {
                var add = true;
                switch (list[i]) {
                    case ui.E_MAIN_ICON.FOLLOW:
                        if (!((inf_login.need_fl ? true : false) && (!(inf_login.is_fl ? true : false) || !(inf_login.fl_award ? true : false)))) {
                            add = false;
                        }
                        break;
                    case ui.E_MAIN_ICON.INVITE:
                        if (Singleton.Get(login.LoginDataManager).loginData.pid == I_Platform.p_wanba) {
                            var open_data = window["OPEN_DATA"];
                            if (open_data) {
                                add = (open_data.platform == 1 && open_data.qua.app.toLowerCase() == "QZ".toLowerCase()) ? false : (inf_login.share_on ? true : false);
                            }
                        }
                        else {
                            add = (inf_login.share_on ? true : false);
                        }
                        break;
                    case ui.E_MAIN_ICON.SHORTCUT:
                        if (!(Singleton.Get(login.LoginDataManager).loginData.pid == I_Platform.p_wanba)) {
                            add = false;
                        }
                        break;
                    case ui.E_MAIN_ICON.ACT_SEVEN:
                        if (inf_act.isAllRewardReceived_Seven()) {
                            add = false;
                        }
                        break;
                }
                if (add) {
                    source.push({
                        type: list[i]
                    });
                }
            }
            /**
            if (this.m_entries && this.m_entries.source.length == source.length) {
                const all_same = (() => {
                        for (let i = 0; i < source.length; i++) {
                            const type = source[i].type;
                            if (source[i].type != this.m_entries.source[i].type) {
                                return false;
                            }
                        }
                        return true;
                })();

                if (all_same) {
                    return;
                }
            }
            */
            this.dataProvider = this.m_entries;
            this.m_entries.source = source;
        };
        return MainSubMenuComponent;
    }(eui.DataGroup));
    ui.MainSubMenuComponent = MainSubMenuComponent;
    __reflect(MainSubMenuComponent.prototype, "ui.MainSubMenuComponent");
})(ui || (ui = {}));
//# sourceMappingURL=MainSubMenuComponent.js.map