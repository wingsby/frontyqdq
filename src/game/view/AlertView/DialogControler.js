var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 提示信息管理器, 单键
 * 使用方法：Singleton.Get(DialogControler).showString("xxxxxxxxxxxxxxxxx");
 *          Singleton.Get(DialogControler).showInfo( infoid );
 *        DialogControler._instance.showString("xxxxxxxxxxxxxxxxx");
 */
var DialogControler = (function () {
    function DialogControler() {
        this.alertMsg = null;
        this.alertTextInitHeight = 320;
        this.alertOneButton = new AlertWindow(2);
        this.alertTwoButton = new AlertWindow(3);
        this.alertText = new AlertTextWindow();
        this.alertText.horizontalCenter = 0;
        this.alertText.y = this.alertTextInitHeight;
        Singleton.Get(LayerManager).GetAlertLayer().addChild(this.alertText);
        this.alertText_2 = new AlertTextWindow();
        this.alertText_2.horizontalCenter = 0;
        this.alertText_2.y = this.alertTextInitHeight + 37;
        Singleton.Get(LayerManager).GetAlertLayer().addChild(this.alertText_2);
        this.m_alertItem = new AlertItem();
        this.m_alertItem.horizontalCenter = 0;
        this.m_alertItem.y = this.alertTextInitHeight;
        Singleton.Get(LayerManager).GetAlertLayer().addChild(this.m_alertItem);
        this.m_alert_strength = new AlertStrength();
        this.m_alert_strength.horizontalCenter = 0;
        this.m_alert_strength.y = this.alertTextInitHeight;
        Singleton.Get(LayerManager).GetAlertLayer().addChild(this.m_alert_strength);
        this.alertNotice = new AlertNotice();
        this.alertNotice.initialize();
        this.alertNotice.y = 85;
        Singleton.Get(LayerManager).GetAlertLayer().addChild(this.alertNotice);
        this.alertMsg = new AlertMessage();
    }
    DialogControler.getinstance = function () {
        if (DialogControler._instance == null)
            DialogControler._instance = Singleton.Get(DialogControler);
        return DialogControler._instance;
    };
    /**
     * 提示消息
     * @param infoId {number} 消息Id
     * @param thisObj {any}   回调调用 对象
     * @param sureCallBack {Function} 确定回调方法
     * @param cancelCallBackta {Function} 取消回调方法
     * @param args {Array<any>} 显示参数
     * @param params {Array<any>} 传递参数,会自动按顺序替换字符串中的$加下标的内容
     */
    DialogControler.prototype.showInfo = function (infoId, thisObj, sureCallBack, cancelCallBack) {
        if (thisObj === void 0) { thisObj = null; }
        if (sureCallBack === void 0) { sureCallBack = null; }
        if (cancelCallBack === void 0) { cancelCallBack = null; }
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        //console.log("info ID " + infoId);
        var info = Template.info.get(infoId);
        if (info != null) {
            if (info.Type == 1) {
                this.alertText.showInfo(info, args);
            }
            else if (info.Type == 2) {
                this.alertOneButton.initData(info, thisObj, sureCallBack, cancelCallBack, args);
                Singleton.Get(LayerManager).GetAlertLayer().addChild(this.alertOneButton);
                Singleton.Get(LayerManager).GetAlertLayer().touchEnabled = true;
            }
            else if (info.Type == 3) {
                this.alertTwoButton.initData(info, thisObj, sureCallBack, cancelCallBack, args);
                Singleton.Get(LayerManager).GetAlertLayer().addChild(this.alertTwoButton);
                Singleton.Get(LayerManager).GetAlertLayer().touchEnabled = true;
            }
        }
        else {
            console.log("info [" + infoId + "] not existed.");
        }
    };
    /**
     * 购买提示
     * @param desc {string}   说明
     * @param price {number} 价格
     * @param callBack {Function} 确定回调
     * @param thisObj {any>} 回调调用 对象
     */
    // public showbuy(desc: string, price: number, type: ResourceType, callBack: Function, thisObj: any, isBag:boolean = false,buttonName?:string): void {
    //     Singleton.Get(LayerManager).getPopup().addPopup(new BuyItemView(desc, price, type, callBack, thisObj,isBag,buttonName));
    // }
    DialogControler.prototype.showString = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.alertText.showString(value, args);
    };
    DialogControler.prototype.showString_2 = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.alertText_2.showString(value, args);
    };
    DialogControler.prototype.showAlertItem = function (itemID, itemCount) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.m_alertItem.showAlertItem(itemID, itemCount.toString(), args);
    };
    /// iconName统一不增加_png后缀，用于弹出金币经验次数等通用“道具”
    DialogControler.prototype.showCommonAlert = function (name, count, icon) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        this.m_alertItem.onShowAlertItem(name, count.toString(), icon, args);
    };
    /**添加滚屏公告 */
    DialogControler.prototype.showAlertNotice = function (msg) {
        this.alertNotice.addNotice(msg);
    };
    /**
     * 弹框提示
     */
    DialogControler.prototype.showAlertMsg = function (msg, thisObj, backFun) {
        this.alertMsg.initData(msg, thisObj, backFun);
        Singleton.Get(LayerManager).GetAlertLayer().addChild(this.alertMsg);
        Singleton.Get(LayerManager).GetAlertLayer().touchEnabled = true;
    };
    /**
     * 显示获取物品
     */
    DialogControler.prototype.showAlertReward = function (title, exp, gold, diamond, items) {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.RewardAlertView).initContent(title, exp, gold, diamond, Common.convBagItemsToDict(items));
        layer.getView(ui.RewardAlertView).open();
    };
    /**
     * 根据消息显示获取物品
     */
    DialogControler.prototype.showAlertRewardByMsg = function (title, reward) {
        if (!reward || (!reward.exp && !reward.gold && !reward.diamond && !reward.items)) {
            return;
        }
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.RewardAlertView).initContent(title, reward.exp, reward.gold, reward.diamond, Common.convBagItemsToDict(reward.items));
        layer.getView(ui.RewardAlertView).open();
    };
    /**
     * 根据消息显示获取物品（飘字提示）
     */
    DialogControler.prototype.showFloatRewardByMsg = function (reward) {
        if (!reward || (!reward.exp && !reward.gold && !reward.diamond && !reward.items)) {
            return;
        }
        if (reward.gold > 0) {
            this.showCommonAlert(DEFINE.UI_ALERT_INFO.gold.name, reward.gold, DEFINE.UI_ALERT_INFO.gold.res);
        }
        if (reward.diamond > 0) {
            this.showCommonAlert(DEFINE.UI_ALERT_INFO.diamond.name, reward.diamond, DEFINE.UI_ALERT_INFO.diamond.res);
        }
        var items = new Dictionary();
        for (var i = 0; i < reward.items.length; i++) {
            var item = reward.items[i];
            var count = items.get(item.id);
            if (count == null) {
                items.update(item.id, item.count);
            }
            else {
                items.update(item.id, count + item.count);
            }
        }
        for (var i = 0; i < items.keys.length; i++) {
            var item_id = items.keys[i];
            this.showAlertItem(item_id, items.get(item_id));
        }
    };
    /**
     * 设定获取物品弹框状态为失败
     */
    DialogControler.prototype.setAlertRewardDusty = function () {
        Singleton.Get(LayerManager).getView(ui.RewardAlertView).setDusty(true);
    };
    /**
     * 显示失败弹窗
     */
    DialogControler.prototype.showAlertLose = function () {
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.AlertLoseView).open();
    };
    /**
     * 显示购买弹窗
     * @param desc
     * @param tip
     * @param price
     * @param costType
     * @param callBack
     * @param thisObj
     * @param isBag
     * @param buttonName
     */
    DialogControler.prototype.showBuy = function (desc, tip, price, costType, callBack, thisObj, isBag, buttonName) {
        if (isBag === void 0) { isBag = false; }
        if (buttonName === void 0) { buttonName = null; }
        var layer = Singleton.Get(LayerManager);
        layer.getView(ui.AlertBuyView).initContent(desc, tip, price, costType, callBack, thisObj, isBag, buttonName);
        layer.getView(ui.AlertBuyView).open();
    };
    /**
     * 显示提升提示
     * @param str 文字描述内容
     */
    DialogControler.prototype.showStrength = function (str) {
        this.m_alert_strength.showString(str);
    };
    return DialogControler;
}());
__reflect(DialogControler.prototype, "DialogControler");
//# sourceMappingURL=DialogControler.js.map