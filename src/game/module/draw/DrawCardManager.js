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
var DrawCardType;
(function (DrawCardType) {
    DrawCardType[DrawCardType["Item"] = 0] = "Item";
    DrawCardType[DrawCardType["Dmd"] = 1] = "Dmd";
    DrawCardType[DrawCardType["Lmt"] = 2] = "Lmt"; // 限量抽
})(DrawCardType || (DrawCardType = {}));
var CardItemType;
(function (CardItemType) {
    CardItemType[CardItemType["Item"] = 0] = "Item";
    CardItemType[CardItemType["Role"] = 1] = "Role"; // 奖励人物
})(CardItemType || (CardItemType = {}));
var DrawCardManager = (function () {
    function DrawCardManager() {
        this.m_last_point = 0;
    }
    /**
     * 响应登陆完成
     */
    DrawCardManager.prototype.onGameLoaded = function () {
        // console.log("DrawCardManager Loaded");
    };
    DrawCardManager.prototype.getInfo = function () {
        return this.m_draw_info;
    };
    DrawCardManager.prototype.onLogin = function (cm) {
        if (cm.body.draw_card)
            this.m_draw_info = cm.body.draw_card.current;
    };
    DrawCardManager.prototype.onReqItemOne = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.engravePoint();
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.DRAW_CARD_ITEM_ONE, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "draw_card"])];
                    case 2:
                        rec = _d.sent();
                        this.releasePoint();
                        if (rec) {
                            if (rec.current) {
                                this.m_draw_info = rec.current;
                            }
                            if (rec.types.length > 0) {
                                if (rec.types[0] == DrawCardMsgType.Item) {
                                    Singleton.Get(ui.RoleGetNewItemSingleView).open(rec.ids[0], rec.counts[0], DrawCardType.Item);
                                }
                                else if (rec.types[0] == DrawCardMsgType.Role) {
                                    this.preloadRoleRes(rec.ids[0], function () {
                                        Singleton.Get(ui.RoleGetSingleView).open(rec.ids[0], 0, DrawCardType.Item);
                                    }, this);
                                    // 任务：注册任务更新
                                    Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_ID);
                                }
                                else if (rec.types[0] == DrawCardMsgType.RoleFrag) {
                                    this.preloadRoleRes(rec.ids[0], function () {
                                        Singleton.Get(ui.RoleGetSingleView).open(rec.ids[0], rec.counts[0], DrawCardType.Item);
                                    }, this);
                                }
                                this.refreshCardList();
                                // 任务：注册任务更新
                                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.DMD_DRAW_FREE_CNT);
                                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_FIRST_DMD_DRAW);
                                Singleton.Get(RoleLineupRecManager).getRecInfo().updateAlarm();
                            }
                        }
                        Singleton.Get(ui.RoleGetFaceView).refreshAll();
                        return [2 /*return*/];
                }
            });
        });
    };
    DrawCardManager.prototype.onReqItemTen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.engravePoint();
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.DRAW_CARD_ITEM_TEN, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "draw_card"])];
                    case 2:
                        rec = _d.sent();
                        this.releasePoint();
                        if (rec) {
                            if (rec.current) {
                                this.m_draw_info = rec.current;
                            }
                            if (rec.types.length > 0) {
                                this.temp_type = rec.types;
                                this.temp_id = rec.ids;
                                this.temp_rare = rec.rare;
                                this.temp_count = rec.counts;
                                this.processTen(0, DrawCardType.Item);
                                this.refreshCardList();
                                // 任务：注册任务更新
                                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_ID);
                                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.DMD_DRAW_FREE_CNT);
                                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_FIRST_DMD_DRAW);
                                Singleton.Get(RoleLineupRecManager).getRecInfo().updateAlarm();
                            }
                        }
                        Singleton.Get(ui.RoleGetFaceView).refreshAll();
                        return [2 /*return*/];
                }
            });
        });
    };
    DrawCardManager.prototype.onReqDmdOne = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.engravePoint();
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.DRAW_CARD_DIAMOND_ONE, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "draw_card"])];
                    case 2:
                        rec = _d.sent();
                        this.releasePoint();
                        if (rec) {
                            if (rec.current) {
                                this.m_draw_info = rec.current;
                            }
                            if (rec.types.length > 0) {
                                if (rec.types[0] == DrawCardMsgType.Item) {
                                    Singleton.Get(ui.RoleGetNewItemSingleView).open(rec.ids[0], rec.counts[0], DrawCardType.Dmd);
                                }
                                else if (rec.types[0] == DrawCardMsgType.Role) {
                                    this.preloadRoleRes(rec.ids[0], function () {
                                        Singleton.Get(ui.RoleGetSingleView).open(rec.ids[0], 0, DrawCardType.Dmd);
                                    }, this);
                                    // 任务：注册任务更新
                                    Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_ID);
                                }
                                else if (rec.types[0] == DrawCardMsgType.RoleFrag) {
                                    this.preloadRoleRes(rec.ids[0], function () {
                                        Singleton.Get(ui.RoleGetSingleView).open(rec.ids[0], rec.counts[0], DrawCardType.Dmd);
                                    }, this);
                                }
                                this.refreshCardList();
                                // 任务：注册任务更新
                                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_FIRST_DMD_DRAW);
                                Singleton.Get(RoleLineupRecManager).getRecInfo().updateAlarm();
                            }
                        }
                        Singleton.Get(ui.RoleGetFaceView).refreshAll();
                        return [2 /*return*/];
                }
            });
        });
    };
    DrawCardManager.prototype.onReqDmdTen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.engravePoint();
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.DRAW_CARD_DIAMOND_TEN, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "draw_card"])];
                    case 2:
                        rec = _d.sent();
                        this.releasePoint();
                        if (rec) {
                            if (rec.current) {
                                this.m_draw_info = rec.current;
                            }
                            if (rec.types.length > 0) {
                                this.temp_type = rec.types;
                                this.temp_id = rec.ids;
                                this.temp_rare = rec.rare;
                                this.temp_count = rec.counts;
                                this.processTen(0, DrawCardType.Dmd);
                                this.refreshCardList();
                                // 任务：注册任务更新
                                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_ID);
                                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_FIRST_DMD_DRAW);
                                Singleton.Get(RoleLineupRecManager).getRecInfo().updateAlarm();
                            }
                        }
                        Singleton.Get(ui.RoleGetFaceView).refreshAll();
                        return [2 /*return*/];
                }
            });
        });
    };
    DrawCardManager.prototype.onReqLmtOne = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.engravePoint();
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.DRAW_CARD_LIMIT_ONE, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "draw_card"])];
                    case 2:
                        rec = _d.sent();
                        this.releasePoint();
                        if (rec) {
                            if (rec.current) {
                                this.m_draw_info = rec.current;
                            }
                            if (rec.types.length > 0) {
                                if (rec.types[0] == DrawCardMsgType.Item) {
                                    Singleton.Get(ui.RoleGetNewItemSingleView).open(rec.ids[0], rec.counts[0], DrawCardType.Lmt);
                                }
                                else if (rec.types[0] == DrawCardMsgType.Role) {
                                    this.preloadRoleRes(rec.ids[0], function () {
                                        Singleton.Get(ui.RoleGetSingleView).open(rec.ids[0], 0, DrawCardType.Lmt);
                                    }, this);
                                    // 任务：注册任务更新
                                    Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_ID);
                                }
                                else if (rec.types[0] == DrawCardMsgType.RoleFrag) {
                                    this.preloadRoleRes(rec.ids[0], function () {
                                        Singleton.Get(ui.RoleGetSingleView).open(rec.ids[0], rec.counts[0], DrawCardType.Lmt);
                                    }, this);
                                }
                                this.refreshCardList();
                                Singleton.Get(RoleLineupRecManager).getRecInfo().updateAlarm();
                            }
                        }
                        Singleton.Get(ui.RoleGetFaceView).refreshAll();
                        return [2 /*return*/];
                }
            });
        });
    };
    DrawCardManager.prototype.onReqLmtTen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rec, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.engravePoint();
                        _b = (_a = HttpAsync).assert;
                        return [4 /*yield*/, HttpAsync.req(NetConst.DRAW_CARD_LIMIT_TEN, true)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent(), "draw_card"])];
                    case 2:
                        rec = _d.sent();
                        this.releasePoint();
                        if (rec) {
                            if (rec.current) {
                                this.m_draw_info = rec.current;
                            }
                            if (rec.types.length > 0) {
                                this.temp_type = rec.types;
                                this.temp_id = rec.ids;
                                this.temp_rare = rec.rare;
                                this.temp_count = rec.counts;
                                this.processTen(0, DrawCardType.Lmt);
                                this.refreshCardList();
                                // 任务：注册任务更新
                                Singleton.Get(TaskManager).getUpdateCtrl().regUpdate(TaskType.HAS_ROLE_ID);
                                Singleton.Get(RoleLineupRecManager).getRecInfo().updateAlarm();
                            }
                        }
                        Singleton.Get(ui.RoleGetFaceView).refreshAll();
                        return [2 /*return*/];
                }
            });
        });
    };
    DrawCardManager.prototype.processTen = function (index, d_type) {
        var _this = this;
        if (index < this.temp_type.length) {
            if (this.temp_type[index] == DrawCardMsgType.Role) {
                this.preloadRoleRes(this.temp_id[index], function () {
                    Singleton.Get(ui.RoleGetNewView).open(_this.temp_id[index], 0, _this.processTen, _this, index + 1, d_type);
                }, this);
            }
            else if (this.temp_type[index] == DrawCardMsgType.RoleFrag) {
                this.preloadRoleRes(this.temp_id[index], function () {
                    Singleton.Get(ui.RoleGetNewView).open(_this.temp_id[index], _this.temp_count[index], _this.processTen, _this, index + 1, d_type);
                }, this);
            }
            else {
                this.processTen(index + 1, d_type);
            }
        }
        else {
            Singleton.Get(ui.RoleGetTenView).open(this.temp_type, this.temp_id, this.temp_count, this.temp_rare, d_type);
        }
    };
    DrawCardManager.prototype.refreshCardList = function () {
        Singleton.Get(LayerManager).getView(ui.RoleListView).reqRefresh();
    };
    /**
     * 预加载角色卡牌资源
     * @param role_id
     */
    DrawCardManager.prototype.preloadRoleRes = function (role_id, callback, thisObj) {
        var cfg_role = Template.role.get(role_id);
        if (!cfg_role) {
            if (callback) {
                callback.call(thisObj);
            }
            return;
        }
        Singleton.Get(LayerManager).getView(ui.SyncLoadingView).open();
        var res_name = cfg_role.Resources[0] + "_png";
        ResManager.getResAsync(res_name, function (res, resName) {
            Singleton.Get(LayerManager).getView(ui.SyncLoadingView).cancleOpen();
            if (callback) {
                callback.call(thisObj);
            }
        }, this);
    };
    DrawCardManager.prototype.engravePoint = function () {
        this.m_last_point = Singleton.Get(BagManager).getItemCount(Template.config.PointItem);
    };
    DrawCardManager.prototype.releasePoint = function () {
        var cur_point = Singleton.Get(BagManager).getItemCount(Template.config.PointItem);
        var delta = cur_point - this.m_last_point;
        if (delta > 0) {
            var my_vip = Template.vip.get(Singleton.Get(PlayerInfoManager).getVipLevel());
            var str = Template.getGUIText(my_vip.VipPoint == 1 ? "ui_card11" : "ui_card12");
            Singleton.Get(DialogControler).showString(str, delta);
        }
    };
    return DrawCardManager;
}());
DrawCardManager.FREE_ITEM_SCROLL_ID = 601;
__reflect(DrawCardManager.prototype, "DrawCardManager");
//# sourceMappingURL=DrawCardManager.js.map