var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏工具类
 */
var UtilsGame = (function () {
    function UtilsGame() {
    }
    /**
     * 数字显示转换
     */
    UtilsGame.numberToString_Old = function (_value) {
        var num = _value;
        var len = 0;
        while (num >= 100000) {
            num = num / 1000;
            len++;
        }
        num = num >> 0;
        // return num + UtilsGame.numberUnit[len];
        return UtilsGame.numberNormat(num) + UtilsGame.numberUnit[len];
    };
    /**
     * 获取类名
     * @param target
     * @returns {any}
     */
    UtilsGame.GetClassName = function (target) {
        return target.prototype.__class__;
    };
    /**
     * 保留指定位小数 没有小数则直接返回整数
     * @param num
     * @param fix
     * @returns {string}
     */
    UtilsGame.toOptionalFixed = function (num, fix) {
        var after_int = parseInt(num.toString());
        if (after_int == num) {
            return num.toString();
        }
        return num.toFixed(fix);
    };
    /**
     * 科学计数
     * @param value
     */
    UtilsGame.numberNormat = function (value) {
        var remainder = value % 1;
        var num = Math.floor(value).toString();
        if (num.length > 3) {
            var totalDelim = Math.floor(num.length / 3);
            var totalRemain = num.length % 3;
            var numSplit = num.split("");
            var i = -1;
            while (++i < totalDelim)
                numSplit.splice(totalRemain + (4 * i), 0, ",");
            if (totalRemain == 0)
                numSplit.shift();
            num = numSplit.join("");
        }
        if (remainder != 0)
            num += remainder.toString().substr(1);
        return num;
    };
    UtilsGame.numberToString = function (_value) {
        var num = _value;
        var len = 0;
        if (num >= 100000) {
            num = num / 10000;
            len++;
            while (num >= 10000) {
                num = num / 10000;
                len++;
            }
        }
        return UtilsGame.toDecimal(num) + Template.getGUIText(UtilsGame.number_unit_cn[len]);
    };
    UtilsGame.toDecimal = function (x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 10) / 10;
        return f;
    };
    UtilsGame.isUndefined = function (data) {
        return typeof (data) == "undefined";
    };
    UtilsGame.isboolean = function (data) {
        return typeof (data) == "boolean";
    };
    UtilsGame.isnumber = function (data) {
        return typeof (data) == "number";
    };
    UtilsGame.isString = function (data) {
        return typeof (data) == "string";
    };
    UtilsGame.isclass = function (data) {
        return typeof (data) == "object";
    };
    UtilsGame.GetCurrentTime = function () {
        var date = new Date();
        return date.getTime();
    };
    /**
     * 字符串参数处理
     */
    UtilsGame.stringHander = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args != undefined) {
            for (var i = 1; i <= args.length; ++i) {
                value = value.replace("$" + i, args[i - 1]);
            }
        }
        return value;
    };
    /**
     * 字符串参数处理
     */
    UtilsGame.stringHanderEx = function (value, args) {
        if (args != undefined) {
            for (var i = 1; i <= args.length; ++i) {
                value = value.replace("$" + i, args[i - 1]);
            }
        }
        return value;
    };
    /**
     * 获取小数点后几位,四舍五入
     * @param value
     * @param count
     * @returns {number}
     */
    UtilsGame.roundDecimalToPlace = function (value, count) {
        if (count === void 0) { count = 0; }
        var p = Math.pow(10, count);
        return Math.round(value * p) / p;
    };
    /**
     * 日期字符串转时间戳
     * 格式：20170625
     */
    UtilsGame.timeStrToStamp = function (str) {
        if (str == "0" || str == "") {
            return 0;
        }
        var d = new Date();
        var year_str = str.substr(0, 4);
        var month_str = str.substr(4, 2);
        var day_str = str.substr(6, 2);
        var hour_str = str.substr(8, 2);
        var min_str = str.substr(10, 2);
        var sec_str = str.substr(12, 2);
        d.setFullYear(parseInt(year_str), parseInt(month_str) - 1, parseInt(day_str)); // 月份从0起计，所以要-1
        d.setHours(parseInt(hour_str), parseInt(min_str), parseInt(sec_str));
        // console.log("y: " + parseInt(year_str) + ", m: " + parseInt(month_str) + ", d: " + parseInt(day_str));
        // console.log("parse date: " + str + " | " + UtilsGame.dateToStr(d.getTime()));
        return d.getTime();
    };
    /**
     * 将毫秒数转为字符串
     * 格式： 00:00:00
     */
    UtilsGame.timeToString = function (time, chn) {
        if (chn === void 0) { chn = false; }
        var milliscond = (time / 1000) >> 0;
        var sec = milliscond % 60 >> 0;
        var min = (milliscond / 60) % 60 >> 0;
        var hour = (milliscond / 60 / 60) >> 0;
        if (!chn) {
            return (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        }
        else {
            return (hour < 10 ? "0" + hour : hour) + Template.getGUIText("ui_ex_time_6") + (min < 10 ? "0" + min : min) + Template.getGUIText("ui_ex_time_7") + (sec < 10 ? "0" + sec : sec) + Template.getGUIText("ui_ex_time_8");
        }
    };
    /**
     * 将毫秒数转为字符串
     * 格式： 00:00 (分:秒)
     */
    UtilsGame.timeToString_MS = function (time) {
        var milliscond = (time / 1000) >> 0;
        var sec = milliscond % 60 >> 0;
        var min = (milliscond / 60) % 60 >> 0;
        var hour = (milliscond / 60 / 60) >> 0;
        return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
    };
    /**
     * 天。。小时。。分钟(最多2位)
     * @params{time}毫秒
     */
    UtilsGame.timeToStringDate = function (time) {
        var milliscond = (time / 1000) >> 0;
        var sec = milliscond % 60 >> 0;
        var min = Math.floor((milliscond / 60) % 60);
        var hour = Math.floor(milliscond / 60 / 60);
        var day = Math.floor(milliscond / 60 / 60 / 24);
        if (day != 0) {
            if (hour % 24 == 0) {
                return day + Template.getGUIText("ui_ex_time_1");
            }
            else {
                if (hour != 0)
                    return day + Template.getGUIText("ui_ex_time_1") + (hour % 24) + Template.getGUIText("ui_ex_time_2");
                else
                    return day + Template.getGUIText("ui_ex_time_1");
            }
        }
        else if (hour != 0)
            if (min != 0)
                return hour + Template.getGUIText("ui_ex_time_2") + min + Template.getGUIText("ui_ex_time_3");
            else
                return hour + Template.getGUIText("ui_ex_time_2");
        else if (min != 0)
            if (sec != 0)
                return min + Template.getGUIText("ui_ex_time_3") + sec + Template.getGUIText("ui_ex_time_4");
            else
                return min + Template.getGUIText("ui_ex_time_3");
        else
            return sec + Template.getGUIText("ui_ex_time_4");
    };
    /**
     * 时间戳转天
     * @params{time}毫秒
     */
    UtilsGame.timeToDay = function (time) {
        var milliscond = (time / 1000) >> 0;
        var day = Math.floor(milliscond / 60 / 60 / 24);
        return day + Template.getGUIText("ui_ex_time_1");
    };
    /**
     * 时间戳转小时
     * @params{time}毫秒
     */
    UtilsGame.timeToHour = function (time) {
        var milliscond = (time / 1000) >> 0;
        var hour = Math.floor(milliscond / 60 / 60);
        return hour + Template.getGUIText("ui_ex_time_2");
    };
    /**
     * 时间戳转小时
     * @params{time}毫秒
     */
    UtilsGame.timeToHourNumber = function (time) {
        var milliscond = (time / 1000) >> 0;
        var hour = Math.floor(milliscond / 60 / 60);
        return hour;
    };
    /**
     * 全日期
     * @params{time}秒
     */
    UtilsGame.timeToStringFullDate = function (time) {
        var milliscond = time;
        var sec = Math.floor(milliscond % 60);
        var min = Math.floor((milliscond / 60) % 60);
        var hour = Math.floor(milliscond / 60 / 60);
        var day = Math.floor(milliscond / 60 / 60 / 24);
        return day + Template.getGUIText("ui_ex_time_1") + (hour % 24) + Template.getGUIText("ui_ex_time_2") + min + Template.getGUIText("ui_ex_time_3");
    };
    /**
     * 全日期
     * @params{time}秒
     */
    UtilsGame.timeToStringFullDate_MS = function (time) {
        var milliscond = time / 1000;
        var sec = Math.floor(milliscond % 60);
        var min = Math.floor((milliscond / 60) % 60);
        var hour = Math.floor(milliscond / 60 / 60);
        var day = Math.floor(milliscond / 60 / 60 / 24);
        return day + Template.getGUIText("ui_ex_time_5") + (hour % 24) + Template.getGUIText("ui_ex_time_6") + min + Template.getGUIText("ui_ex_time_7") + sec + Template.getGUIText("ui_ex_time_8");
    };
    /**
     * 时间戳转时间
     */
    UtilsGame.getDateTime = function (time) {
        var date = new Date(time);
        var sec = date.getSeconds();
        var min = date.getMinutes();
        var hour = date.getHours();
        return (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
    };
    /**
     * 年 月 日
     * @param time
     */
    UtilsGame.getDataString_YMD = function (time) {
        var data = new Date(time);
        return data.getFullYear() + Template.getGUIText("ui_ex_time_9") + (data.getMonth() + 1) + Template.getGUIText("ui_ex_time_10") + data.getDate() + Template.getGUIText("ui_ex_time_11") + data.getUTCHours() + Template.getGUIText("ui_ex_time_6");
    };
    /**
    * 月 日
    * @param date
    */
    UtilsGame.getDataString_MD = function (date) {
        return (date.getMonth() + 1) + Template.getGUIText("ui_ex_time_10") + date.getDate() + Template.getGUIText("ui_ex_time_11");
    };
    /**
     * 格式化日期时间字符串
     * @param t
     * @param y
     * @returns {string}
     */
    UtilsGame.dateToStr = function (t, y) {
        var temp = Template.getGUIText("ui_ex_time_12");
        y = y ? y : (temp ? temp : "yyyy-MM-dd hh:mm:ss");
        var x = new Date(t);
        var z = {
            y: x.getFullYear(),
            M: x.getMonth() + 1,
            d: x.getDate(),
            h: x.getHours(),
            m: x.getMinutes(),
            s: x.getSeconds()
        };
        return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function (v) {
            return ((v.length > 1 ? "0" : "") + eval("z." + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2));
        });
    };
    /**
     * 转换为可读的时间
     * @param t
     */
    UtilsGame.dateToReadable = function (t) {
        var st = t / 1000;
        if (st < 60 * 60) {
            return ((st / 60 >> 0) + 1) + Template.getGUIText("ui_ex_time_17");
        }
        else if (st < 60 * 60 * 24) {
            return (st / 60 / 60 >> 0) + Template.getGUIText("ui_ex_time_16");
        }
        else if (st < 60 * 60 * 24 * 30) {
            return (st / 60 / 60 / 24 >> 0) + Template.getGUIText("ui_ex_time_15");
        }
        else if (st < 60 * 60 * 24 * 30 * 12) {
            return (st / 60 / 60 / 24 / 30 >> 0) + Template.getGUIText("ui_ex_time_14");
        }
        else {
            return Template.getGUIText("ui_ex_time_13");
        }
    };
    /**
     * 创建一个遮罩
     * @param cloneObj 遮罩对象
     */
    UtilsGame.createMask = function (cloneObj) {
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x000000, 1);
        mask.graphics.drawRect(0, 0, cloneObj.width, cloneObj.height);
        return mask;
    };
    /**
     * 创建bitMap
     * @param texture
     */
    UtilsGame.createBitMap = function (texture) {
        var bit = new egret.Bitmap();
        if (texture == undefined) {
            egret.error("bitmap create texure is Null");
        }
        bit.texture = texture;
        return bit;
    };
    /**
     * 获取随机数,(1,3) 返回1 2 3
     */
    UtilsGame.getRandomInt = function (start, end) {
        return Math.round(Math.random() * (end - start)) + start;
    };
    /**
     * 求两点距离
     */
    UtilsGame.getDistance = function (x1, y1, x2, y2) {
        var _x = Math.abs(x1 - x2);
        var _y = Math.abs(y1 - y2);
        return Math.sqrt(_x * _x + _y * _y);
    };
    /**
     * 求两点角度
     */
    UtilsGame.getAngle = function (x1, y1, x2, y2) {
        var x = x2 - x1;
        var y = y2 - y1;
        var hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var radian = Math.acos(x / hypotenuse);
        // 求出弧度
        var angle = 180 / (Math.PI / radian);
        // 用弧度算出角度
        if (y < 0) {
            angle = -angle;
        }
        else if ((y == 0) && (x < 0)) {
            angle = 180;
        }
        return angle;
    };
    UtilsGame.getRadian = function (x1, y1, x2, y2) {
        var x = x2 - x1;
        var y = y2 - y1;
        var hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var radian = Math.acos(x / hypotenuse);
        return radian;
    };
    // 检查是否包含敏感词
    UtilsGame.containsFilter = function (value) {
        var filters = Template.filter;
        var words = filters.split("|");
        for (var i = 0; i < words.length; i++) {
            if (value.indexOf(words[i]) >= 0) {
                return true;
            }
        }
        return false;
    };
    UtilsGame.replaceFilter = function (value) {
        var filters = Template.filter;
        return value.replace(new RegExp(filters, "g"), function (arg) {
            // 后续修改
            var str = "";
            var len = arg.length;
            for (var i = 0; i < len; ++i)
                str += "*";
            return str;
        });
    };
    /**去除空格 */
    UtilsGame.removeBlank = function (value) {
        return value.replace(/\s+/g, "");
    };
    /**获取字符串长度（字节数） */
    UtilsGame.getStringBitsLength = function (value) {
        return value.replace(/[^\x00-\xff]/g, "00").length;
    };
    /**
     * 克隆对象
     */
    UtilsGame.cloneObject = function (fromObj) {
        var co = cloneAll(fromObj);
        function cloneAll(obj) {
            function Clone() { }
            Clone.prototype = obj;
            var o = new Clone();
            for (var a in o) {
                if (typeof o[a] == "object") {
                    o[a] = cloneAll(o[a]);
                }
            }
            return o;
        }
        return co;
    };
    /**
     * @param base64 字符串
     */
    UtilsGame.getTextureByBase64 = function (base64, back, thisobj) {
        try {
            var img = new Image();
            img.src = base64;
            img.onload = function () {
                var texture = new egret.Texture();
                var bitmapdata = new egret.BitmapData(img);
                texture._setBitmapData(bitmapdata);
                back.call(thisobj, texture);
            };
        }
        catch (error) {
            egret.warn("pic conv base64 failed.");
        }
    };
    /**
     * 获取跨域图片
     *
     * @static
     * @param {string} url 图片地址
     * @param {Function} back 回调地址
     * @param {*} thisobj 回调对象
     *
     * @author Only
     * @version
     */
    UtilsGame.getCrossOriginImage = function (url, back, thisobj) {
        var imageLoader = new egret.ImageLoader();
        imageLoader.crossOrigin = "anonymous";
        imageLoader.addEventListener(egret.Event.COMPLETE, function (event) {
            var imageLoader = event.currentTarget;
            var texture = new egret.Texture();
            texture.bitmapData = imageLoader.data;
            back.call(thisobj, texture);
        }, this);
        imageLoader.load(url);
    };
    /**
     * 判断是否是本地图片
     */
    UtilsGame.checkUrlIsLocal = function (url) {
        if (url)
            return url.indexOf("data:image/jpg;base64") >= 0 ? false : true;
        else
            return true;
    };
    /**
     * 检测是否是网络图片
     */
    UtilsGame.checkUrlIsNetUrl = function (url) {
        if (url)
            return (url.indexOf("http://") >= 0 || url.indexOf("https://") >= 0) ? true : false;
        else
            return false;
    };
    /**
     * 是否是当前刷新日（今天RTime - 明天RTime）
     */
    UtilsGame.isRToday = function (dateline) {
        var rline = Template.config.RTime * 1000 * 60 * 60;
        var today_r = UtilsGame.TodayStart() + rline;
        if (UtilsGame.Now() < today_r) {
            today_r -= 1000 * 60 * 60 * 24;
        }
        var next_r = today_r + 1000 * 60 * 60 * 24;
        return dateline >= today_r && dateline < next_r;
    };
    /**
     * 是否是当前自然日（今天RTime - 明天RTime）
     */
    UtilsGame.isToday = function (dateline) {
        var today_r = UtilsGame.TodayStart();
        var next_r = today_r + 1000 * 60 * 60 * 24;
        return dateline >= today_r && dateline < next_r;
    };
    UtilsGame.TodayStart = function () {
        if (UtilsGame.Now()) {
            return UtilsGame.SomeDayStart(UtilsGame.Now());
        }
        else {
            return UtilsGame.SomeDayStart(new Date().getTime());
        }
    };
    UtilsGame.SomeDayStart = function (dateline) {
        var t = new Date(dateline);
        t.setHours(0, 0, 0, 0);
        return t.getTime();
    };
    UtilsGame.SetServerNowAtLogin = function (now) {
        UtilsGame.server_now = now;
        UtilsGame.login_stamp = Date.now();
    };
    UtilsGame.getLoginStamp = function () {
        return UtilsGame.login_stamp;
    };
    UtilsGame.Now = function () {
        return UtilsGame.server_now + (Date.now() - UtilsGame.login_stamp);
    };
    UtilsGame.SetServerStartAtLogin = function (start) {
        UtilsGame.server_start = start;
    };
    UtilsGame.getServerStart = function () {
        return this.server_start;
    };
    UtilsGame.getNowDate = function () {
        var date = new Date(UtilsGame.Now());
        return {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            mm: date.getMinutes(),
            s: date.getSeconds(),
            ms: date.getMilliseconds()
        };
    };
    UtilsGame.SetPlayerLifetimeStartAtLogin = function (start) {
        UtilsGame.player_lifetime_start = start;
    };
    UtilsGame.getPlayerLifetimeStart = function () {
        return this.player_lifetime_start;
    };
    // 玩家创角经历了多少天，从0开始
    UtilsGame.getPlayerLifetimeDays = function () {
        var start = UtilsGame.getPlayerLifetimeStart();
        var start_zero = UtilsGame.SomeDayStart(start);
        return Math.ceil((UtilsGame.Now() - start_zero) / 1000 / 60 / 60 / 24);
    };
    // endregion
    /**
     * 获取追加资源
     */
    UtilsGame.getAddtionalRes = function () {
        var result = [];
        var login_msg = Singleton.Get(LoginManager).loginInfo;
        if (login_msg && login_msg.login_1st && !login_msg.is_new && !login_msg.need_create) {
            result.push("xt_shouchong_png");
        }
        return result;
    };
    /**
     * 获取队伍角色资源
     */
    UtilsGame.getTeamActorRes = function () {
        var pve_team = Singleton.Get(RoleManager).getRolesInfo().getPveTeamArray();
        var res_list = [];
        for (var i = 0; i < pve_team.length; i++) {
            if (pve_team[i] <= 0) {
                continue;
            }
            var role_id = pve_team[i];
            UtilsGame.getActorRes(role_id, res_list);
        }
        // 资源组去重
        var final_list = [];
        for (var i = 0; i < res_list.length; i++) {
            var is_contain = false;
            for (var j = 0; j < final_list.length; j++) {
                if (final_list[j] == res_list[i]) {
                    is_contain = true;
                    break;
                }
            }
            if (is_contain) {
                continue;
            }
            if (res_list[i].trim() == "") {
                continue;
            }
            final_list.push(res_list[i]);
        }
        return final_list;
    };
    /**
     * 获取剧情角色资源
     */
    UtilsGame.getDramaActorRes = function () {
        var result = [];
        for (var i = 0; i < Template.drama.Friend.length; i++) {
            var cfg_role = Template.role.get(Template.drama.Friend[i]);
            if (!cfg_role) {
                continue;
            }
            UtilsGame.getActorRes(cfg_role.ID, result);
        }
        for (var i = 0; i < Template.drama.Enemy.length; i++) {
            var cfg_role = Template.role.get(Template.drama.Enemy[i]);
            if (!cfg_role) {
                continue;
            }
            UtilsGame.getActorRes(cfg_role.ID, result);
        }
        return result;
    };
    /**
     * 游戏是否加载完成
     */
    UtilsGame.isGameLoaded = function () {
        return Singleton.Get(PlayerInfoManager).is_game_loaded;
    };
    // region 角色Resources
    /**
     * 获取当前角色依赖的资源列表
     */
    UtilsGame.getActorRes = function (role_id, reslist) {
        var role_config = Template.role.get(role_id);
        if (!role_config) {
            return;
        }
        /// 角色贴图和json
        var roleResName = role_config.Res;
        this.getMovieclipResList(roleResName, reslist);
        /// 响应特效
        var skillid = role_config.Skill;
        this.getSkillResList(skillid, reslist);
    };
    /**
    * 获取当前技能依赖的资源列表
    */
    UtilsGame.getSkillResList = function (currentSkillID, reslist) {
        var pSkillData = Template.skill.get(currentSkillID);
        if (!pSkillData) {
            YWLogger.error("can't found skill: " + LogType.Battle);
        }
        // 预加载不包括音效
        // reslist.push(pSkillData.HitSound);
        // reslist.push(pSkillData.SkillSound);
        if (pSkillData.HitE.length > 1) {
            this.getMovieclipResList(pSkillData.HitE[0], reslist);
        }
        if (pSkillData.CastE.length > 1) {
            this.getMovieclipResList(pSkillData.CastE[0], reslist);
        }
        if (pSkillData.Throw.length > 1) {
            this.getMovieclipResList(pSkillData.Throw[0], reslist);
        }
        // skill.RoleRes 0表示字体，1表示head，2表示body的图
        if (pSkillData.RoleRes.length > 2) {
            reslist.push(pSkillData.RoleRes[0] + "_png");
            reslist.push(pSkillData.RoleRes[1] + "_png");
        }
    };
    /**
     * 获取当前MovieClip依赖的资源列表
     */
    UtilsGame.getMovieclipResList = function (resName, reslist) {
        reslist.push(resName + "_png");
        reslist.push(resName + "_json");
    };
    // endregion
    // region 获取版本号
    UtilsGame.getVersionPostfix = function () {
        var v_str = "";
        var cfg = document.getElementById("ver");
        if (cfg) {
            var cfg_data = cfg.getAttribute("data");
            if (cfg_data) {
                v_str = cfg_data;
            }
        }
        return "?v=" + v_str;
    };
    return UtilsGame;
}());
/**
 * 数字后缀
 */
UtilsGame.numberUnit = ["", "K", "M", "B", "T", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az", "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz", "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz", "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dv", "dw", "dx", "dy", "dz"];
/**
 * 中文货币转换
 */
UtilsGame.number_unit_cn = ["ui_ex_currency_1", "ui_ex_currency_2", "ui_ex_currency_3", "ui_ex_currency_4", "ui_ex_currency_5", "ui_ex_currency_6"];
UtilsGame.server_now = 0;
UtilsGame.login_stamp = 0;
// region 服务器启动时间
UtilsGame.server_start = 0;
// endregion
// region 玩家时间
UtilsGame.player_lifetime_start = 0;
__reflect(UtilsGame.prototype, "UtilsGame");
//# sourceMappingURL=UtilsGame.js.map