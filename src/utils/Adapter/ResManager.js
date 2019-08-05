var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/// 资源加载器
var ResManager = (function () {
    function ResManager() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    ResManager.getResAsync = function (source, compFunc, thisObject) {
        if (compFunc === void 0) { compFunc = null; }
        function onGetRes(data) {
            if (compFunc != null)
                compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    /// 同步加载资源
    ResManager.getResSync = function (source, compFunc, thisObject) {
        if (compFunc === void 0) { compFunc = null; }
        function onGetRes(data) {
            if (compFunc != null)
                compFunc.call(thisObject, data, source);
        }
        var data = RES.getRes(source);
        if (data) {
            onGetRes(data);
        }
        return data;
    };
    //// util function    
    /// 异步设置一张图给一个控件的通用函数 ResManager.AsyncSetTexture(this.imgEnemyAvatar.source, enemy.avatar_img);
    /// ResManager.AsyncSetTexture(this.imgTier.texture, Common.getItemTierBgRes(item_info.iStar));
    ResManager.AsyncSetTexture = function (source, resName, callback, thisObj, no_alpha) {
        // 无alpha变化
        ResManager.getResAsync(resName, function (res, resName) {
            this.texture = res;
            if (callback) {
                callback.call(thisObj);
            }
        }, source);
    };
    // async set texture
    ResManager.setTexture = function (source, resName) {
        return new Promise(function (resolve, reject) {
            ResManager.getResAsync(resName, function (res, resName) {
                source.texture = res;
                resolve(resName);
            }, source);
        });
    };
    /**
     * 设置头像（仅限头像Base64）
     */
    ResManager.asyncsetHeadImg = function (url, img, thisobj, callback) {
        if (url == null || url == "") {
            console.log("URL of avatar is empty.");
            return;
        }
        img.texture = null; // 清空
        if (UtilsGame.checkUrlIsLocal(url)) {
            if (UtilsGame.checkUrlIsNetUrl(url)) {
                UtilsGame.getCrossOriginImage(url, function (res) {
                    img.texture = res;
                    if (callback) {
                        callback.call(thisobj, res, url);
                    }
                }, this);
            }
            else {
                ResManager.getResAsync(url, function (res) {
                    img.texture = res;
                    if (callback) {
                        callback.call(thisobj, res, url);
                    }
                }, this);
            }
        }
        else {
            UtilsGame.getTextureByBase64(url, function (res) {
                img.texture = res;
                if (callback) {
                    callback.call(thisobj, res, url);
                }
            }, this);
        }
    };
    /**
     * 跨服设置头像
     */
    ResManager.setAvatarCrossServer = function (uid, zid, img, thisobj, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var send;
            return __generator(this, function (_a) {
                send = new msg.CommonMsg();
                send.body.send = new msg.SendMsg();
                send.body.send.uid = uid;
                send.body.send.zid = zid;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Singleton.Get(httpRequest).sendPostRequest(NetConst.SEND_UTIL_AVATAR, function (type, dat) {
                            // 解析消息
                            var temp = JSON.parse(dat);
                            // 处理特殊消息
                            Singleton.Get(MessageManager).handlerSpecialMsg(temp);
                            if (temp.header.rt == 0) {
                                if (temp.body.send.avatar && temp.body.send.avatar.length > 0) {
                                    ResManager.asyncsetHeadImg(temp.body.send.avatar, img, thisobj, callback);
                                }
                            }
                            resolve(temp);
                        }, JSON.stringify(send));
                    })];
            });
        });
    };
    return ResManager;
}());
__reflect(ResManager.prototype, "ResManager");
//# sourceMappingURL=ResManager.js.map