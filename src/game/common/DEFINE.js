var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DEFINE = (function () {
    function DEFINE() {
    }
    Object.defineProperty(DEFINE, "UI_ALERT_INFO", {
        get: function () {
            return {
                gold: {
                    res: "icon_gold_png",
                    resPNG: "icon_gold_png",
                    tierPNG: "PZBG_icon5_png",
                    name: Template.getGUIText("append_16"),
                },
                diamond: {
                    res: "icon_jewel_png",
                    resPNG: "icon_jewel_png",
                    tierPNG: "PZBG_icon5_png",
                    name: Template.getGUIText("append_17"),
                },
                exp: {
                    res: "icon_exp_png",
                    resPNG: "icon_exp_png",
                    tierPNG: "PZBG_icon5_png",
                    name: Template.getGUIText("append_18"),
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return DEFINE;
}());
/**
 * 游戏全局定义
 */
DEFINE.GAME_VERSION = "";
/**登陆服务器地址 */
// public static LOGIN_SERVER: string = "http://yq.gamesgiga.com";
DEFINE.LOGIN_SERVER = "http://192.168.1.252:9001";
// public static LOGIN_SERVER: string = "http://127.0.0.1";
DEFINE.GAME_LAYER_TOP = 0;
DEFINE.BATTLE_FIELD_WIDTH = 480; // 战场宽度
DEFINE.BATTLE_FIELD_HEIGHT = 260; // 战场高度
DEFINE.BATTLE_FIELD_TOP = 280; // 战场顶端距离
DEFINE.FRAME_TIME_TOLERANCE_LIMIT = 600; // 单帧渲染时间忍耐阀值
DEFINE.FRAME_TIME_TOLERANCE_REPLACE = 1000 / 30; // 单帧渲染时间超过阀值
DEFINE.CURRENT_FPS = 30;
DEFINE.FRAG_ICON = "icon_suipianb_png"; // 碎片图片
DEFINE.EFF_ITEM_FRAME_BOTTOM = "ui_xiyou"; // 底部
DEFINE.EFF_ITEM_FRAME_TOP = "ui_huanrao"; // 外框
DEFINE.EFF_JUEXING = "juexing1"; // 觉醒界面特效
DEFINE.EFF_JINGJI1 = "jingji1"; // 竞技1
DEFINE.EFF_JINGJI2 = "jingji2"; // 竞技2
DEFINE.EFF_BATTLE_CHALLENGE = "ui_battle_challenge"; // 挑战BOSS
DEFINE.GEAR_BTN_EFF = "ui_battle_encircle"; // 齿轮按钮激活特效
DEFINE.EFF_PRIV_BTN = "ui_deposit1"; // 豪华按钮特效
DEFINE.EFF_ITEM_ICON = ["ui_deposit4", "ui_deposit3", "ui_deposit2"];
/// 索敌时Y的距离不低于攻击距离的百分比
DEFINE.FOLLOW_DISTANCE_YPERCENT = 0.2;
/// 近战与远程的距离阈值，索敌时使用
DEFINE.FOLLOW_ROMOTE_DISTANCE = 130;
/**
 * 通用配置定义
 */
DEFINE.TIME_MILLISECOND_PER_SECOND = 1000;
DEFINE.TIME_SECOND_PER_MINUTE = 60;
DEFINE.TIME_MINUTE_PER_HOUR = 60;
DEFINE.TIME_HOUR_PER_DAY = 24;
DEFINE.TIME_DAY_PER_WEEK = 7;
/**
 * 网络相关定义，IP不再设置
 */
// // public static NET_MAIN_SERVER_IP = "120.132.77.134"; // 外网服务器IP
// public static NET_MAIN_SERVER_IP = "192.168.1.241"; // 内网服务器IP
// public static NET_MAIN_SERVER_PORT = 9302; // 外网服务器端口
// public static NET_MAIN_SERVER_LOCAL_IP = "127.0.0.1"; // 留空时默认服务器IP
// public static NET_MAIN_SERVER_LOCAL_PORT = 9302; // 留空时默认服务器端口
/**
 * 资源相关定义
 */
DEFINE.UI_FONT_FAMILY = "Microsoft Yahei"; // 默认字体
DEFINE.UI_FONT_SIZE_S = 12; // 默认字体大小S
DEFINE.UI_FONT_SIZE_M = 14; // 默认字体大小M
DEFINE.UI_FONT_SIZE_L = 16; // 默认字体大小L
DEFINE.UI_FONT_SIZE_XL = 18; // 默认字体大小XL
DEFINE.UI_FONT_SIZE_XXL = 20; // 默认字体大小XL
/**
 * 动画相关定义
 */
// Tween动画
DEFINE.TWEEN_BASE_DURATION = 200; // Tween动画基准时长
// 场景滚动
DEFINE.SCENE_BG_TOP = 0;
DEFINE.SCENE_BG_WIDTH = 480;
DEFINE.SCENE_BG_HEIGHT = 800;
// Battle坐标系中 左战斗区域特效播放位置
DEFINE.EFFECT_POSI_LEFT_BATTLE_FIELD = [120, 160];
DEFINE.EFFECT_POSI_RIGHT_BATTLE_FIELD = [360, 160];
/// 动画关键帧名称固定
DEFINE.g_ActionEventName = ["@attack_cast" // 播放施法特效，施法绑定点
    ,
    "@attack_hit" /// 集中特效
    ,
    "@attack_throw" /// 投掷物特效 ，运动速度，运动朝向
    ,
    "@skill_cast",
    "@skill_hit",
    "@skill_throw"];
/// 动画关键帧名称固定
DEFINE.g_ActionTypeName = ["wait",
    "move",
    "attack",
    "skill"
];
DEFINE.RES_ROLE_BG_SHADOW = "BG_role_shadow_png";
DEFINE.ALERTWINDOW = "alertSkin";
DEFINE.ROLE_SHOW_EFF = "roleshow"; // 出生特效名
DEFINE.ROLE_AFTERCLOSEUP_EFF = "roleskill"; // 特效后特效名称
DEFINE.RARE_CORNER = "ts_xiyou_png"; // 稀有角标
// 副本品质资源
DEFINE.RES_UI_INS_TIER = [
    { bg: "PZBG_icon1_png", hl: "BG_icon_no4_png" },
    { bg: "PZBG_icon2_png", hl: "BG_icon_no5_png" },
    { bg: "PZBG_icon3_png", hl: "BG_icon_no3_png" },
    { bg: "PZBG_icon4_png", hl: "BG_icon_no2_png" },
    { bg: "PZBG_icon5_png", hl: "BG_icon_no1_png" },
    { bg: "PZBG_icon6_png", hl: "BG_icon_no6_png" },
];
DEFINE.RES_UI_ITEM_TIER = [
    "PZBG_icon1_png",
    "PZBG_icon2_png",
    "PZBG_icon3_png",
    "PZBG_icon4_png",
    "PZBG_icon5_png",
    "PZBG_icon6_png"
];
// 角色头像边框品质资源
DEFINE.RES_UI_ROLE_TIER = [
    { bg: "PZBG_icon1_png", sub: "BG_icon1_1_png", super: "" },
    { bg: "PZBG_icon2_png", sub: "BG_icon2_1_png", super: "PZBG_icon2_1_png" },
    { bg: "PZBG_icon3_png", sub: "BG_icon3_1_png", super: "PZBG_icon3_1_png" },
    { bg: "PZBG_icon4_png", sub: "BG_icon4_1_png", super: "PZBG_icon4_1_png" },
    { bg: "PZBG_icon5_png", sub: "BG_icon5_1_png", super: "PZBG_icon5_1_png" },
    { bg: "PZBG_icon6_png", sub: "BG_icon6_1_png", super: "PZBG_icon6_1_png" },
];
// 角色头像边框品质资源
DEFINE.RES_UI_ROLE_TIER_EX = [
    { bg: "PZBG_icon3_png", sub: "BG_icon3_1_png", card: "BK_kapai_1B_png", list: "BK_dslb_1_png" },
    { bg: "PZBG_icon4_png", sub: "BG_icon4_1_png", card: "BK_kapai_2B_png", list: "BK_dslb_2_png" },
    { bg: "PZBG_icon5_png", sub: "BG_icon5_1_png", card: "BK_kapai_3B_png", list: "BK_dslb_3_png" },
    { bg: "PZBG_icon6_png", sub: "BG_icon6_1_png", card: "BK_kapai_4B_png", list: "BK_dslb_4_png" },
];
// 勾玉图片资源
DEFINE.RES_UI_ROLE_TAMA = [
    "icon_gouyu0_png",
    "icon_gouyu1_png",
    "icon_gouyu2_png",
    "icon_gouyu3_png",
    "icon_gouyu4_png",
    "icon_gouyu5_png",
    "icon_gouyu6_png",
];
// 单个勾玉资源
DEFINE.RES_UI_ROLE_TAMA_SINGLE = [
    "icon_gouyuliang_png",
    "icon_gouyuhua_png"
];
// 装备位背景图
DEFINE.RES_UI_EQUIP_POS = [
    "icon_wuqicao_png",
    "icon_yifucao_png",
    "icon_kuzucao_png",
    "icon_xiezicao_png",
    "icon_shoushicao_png",
    "icon_shoushicao_png"
];
// 装备位文字表索引
DEFINE.UI_EQUIP_WORD_CONFIG = [
    "ui_equip11",
    "ui_equip12",
    "ui_equip13",
    "ui_equip14",
    "ui_equip3",
    "ui_equip3" // TODO 替换成正式的饰品
];
// 一骑当千胜场奖励宝箱图标
DEFINE.UI_DUEL_WINS_ICON = [
    [
        "icon_BX1s_png",
        "icon_BX1_png",
        "icon_BX1o_png",
    ],
    [
        "icon_BX2s_png",
        "icon_BX2_png",
        "icon_BX2o_png",
    ],
    [
        "icon_BX3s_png",
        "icon_BX3_png",
        "icon_BX3o_png",
    ],
];
// 角色属性字典表索引
DEFINE.ROLE_WORD_CONFIG = {
    cur_hp: "Hp_1",
    max_hp: "Hp_1",
    atk: "Atk_1",
    def: "Def_1",
    skill_atk: "AtkSp_1",
    skill_def: "DefSp_1",
    move: "",
    atk_speed: "",
    crit_rate: "CritRate_1",
    crit_damage: "CritDamage_1",
    damage_reduce: "DamageReduce_1",
    vampire: "Vampire_1",
    combo: "Combo_1",
    sp_ignore: "SpIgnore_1",
    debuff_res: "DebuffRes_1"
};
/**
 * 模块逻辑定义
 */
DEFINE.ROLE_MAX_LINEUP_COUNT = 5; // 最大上阵人数
DEFINE.PVE_BOSS_LIMIT = 1; // 关卡多少场战斗可挑战BOSS
DEFINE.BATTLE_SKIP_MIN_WAIT = 1000; // 跳过战斗最短需要时间
DEFINE.BATTLE_TIMEOUT_SP = 1000; // 特殊战斗防重发丢弃时间间隔
DEFINE.BATTLE_LOCK_ID_MAX = 999999999; // 战斗锁随机ID最大值
DEFINE.BATTLE_LOCK_TIMEOUT = 3000; // 战斗抛弃时间
/**
 * 竞技场
 */
DEFINE.ARENA_ENEMY_REFRESH_DURATION = 5000; // 竞技场对手列表刷新间隔（毫秒）
DEFINE.ARENA_REWARD_REFRESH_DURATION = 5000; // 竞技场奖励列表刷新间隔（毫秒）
/**
 * 排行榜
 */
DEFINE.RANK_ARENA_REFRESH_DURATION = 5000; // 竞技场排行榜刷新时间
DEFINE.RANK_PVE_REFRESH_DURATION = 5000; // 关卡排行榜刷新时间
DEFINE.RANK_TOWER_REFRESH_DURATION = 5000; // 爬塔排行榜刷新时间
DEFINE.RANK_TEAM_LV_REFRESH_DURATION = 5000; // 战队等级排行榜刷新时间
DEFINE.RANK_GUILD_REFRESH_DURATION = 5000; // 公会排行榜刷新时间
/**
 * 邮件
 * @type {boolean}
 */
DEFINE.MAIL_LIST_REFRESH_DURATION = 5000; // 邮件列表刷新时间间隔
DEFINE.MAIL_CHECK_DURATION = 300000; // 自动检查新邮件时间（300 000 ms = 5 m）
/**
 * 装备
 */
DEFINE.EQUIP_RESOLVE_MAX_ONCE = 12; // 单次最大分解装备数量
DEFINE.EQUIP_RESOLVE_AUTO_STAR_MAX = 5; // 参与自动分解的最高装备品质
DEFINE.EQUIP_RESOLVE_WARN_STAR_MAX = 4; // 会触发分解二次确认的装备品质
/**
 * 爬塔
 */
DEFINE.TOWER_SHOP_ID = 7; // 爬塔商店ID
DEFINE.TOWER_SCROLL_ID = 501; // 爬塔重置券ID
/**
 * 支付
 */
DEFINE.PAY_CHECK_DURATION = 2000; // 支付后检查延迟时间
/**
 * 活动
 */
DEFINE.ACT_REFRESH_DURATION = 5000; // 活动界面切换请求间隔
DEFINE.ACT_PAY_WAIT = 30000; // 活动支付检查延迟时间
DEFINE.ACT_DURATION_UPDATE = 5 * 60 * 1000; // 累计在线自动更新请求间隔时间
/**
 * 登录
 */
DEFINE.LOGIN_MC_ROLE = "role1"; // Loading界面使用的角色形象资源名
/**
 * 界面
 */
DEFINE.ALARM_MAIN_UPDATE_DURATION = 1500; // 主界面红点检查时间间隔
DEFINE.ICON_MAIN_UPDATE_DURATION = 20000; // 主界面ICON状态检查时间间隔
DEFINE.SYNC_LOADING_DURATION = 300; // LOADING界面延迟打开时间
DEFINE.SYNC_BAG_DURATION = 1800000; // 背包手动同步最短间隔时间
/**
 * 剧情
 */
DEFINE.DRAMA_CLICK_WAIT = 3000; // 剧情按钮可点击等待时间
/**
 * 公会
 */
DEFINE.GUILD_SHOP_ID = 9; // 公会商店id
/**
 * 世界BOSS
 */
DEFINE.BOSS_REVIVE_CHECK_TIME = 15000; // 世界BOSS复活检查时间
/**
 * 斗士外派
 */
DEFINE.SEND_SCROLL_QUEST_REFRESH = 1000; // 外派任务刷新次数门票ID
DEFINE.SEND_SCROLL_ROB_REFRESH = 1001; // 外派掠夺对象刷新次数门票ID
DEFINE.SEND_SHOP_ID = 12; // 外派商店ID
/////////////////////////////SETTING GLOBAL
DEFINE.g_useBattlePause = false; // 是否允许战斗中暂停
DEFINE.AUDIO_HACKER_NAME = "audio_hacker_mp3";
DEFINE.MENU_STATUS_SAVE_KEY = "sub_menu_status"; // 首页子菜单状态保存Key
__reflect(DEFINE.prototype, "DEFINE");
var DEFINE_COLOR = (function () {
    function DEFINE_COLOR() {
    }
    return DEFINE_COLOR;
}());
// 通用提示文字
DEFINE_COLOR.WARN_RED = 0xe61919; // 通用错误红
DEFINE_COLOR.OK_GREEN = 0x2ce813; // 通用正确绿
DEFINE_COLOR.UP_GREEN = 0x12c900; // 通用提升绿
DEFINE_COLOR.DOWN_RED = 0xe61919; // 通用下降红
// 角色品质
DEFINE_COLOR.ROLE_NAME = [0x0094ff, 0x8c00ff, 0xffcf00, 0xfc1111];
DEFINE_COLOR.ROLE_NAME_LIST = [0x08c9ff, 0xf475ff, 0xffcf00, 0xfc1111];
// 道具品质
DEFINE_COLOR.ITEM_NAME = [0x9b9b9b, 0x00c700, 0x0094ff, 0x8c00ff, 0xff7800, 0xfc1111];
// 字体描边
DEFINE_COLOR.TEXT_STROKE = 0x090a23;
// 泛用字体
DEFINE_COLOR.TEXT_WHITE = 0xffffff;
DEFINE_COLOR.TEXT_BLUE = 0x5e3a17;
DEFINE_COLOR.TEXT_ORANGE = 0xff7800;
DEFINE_COLOR.TEXT_BLACK = 0x090A23;
DEFINE_COLOR.TEXT_GRAY = 0x9b9b9b;
// 功能性字体
DEFINE_COLOR.TEXT_EX_BUTTON = 0x242424;
DEFINE_COLOR.TEXT_EX_BUTTON_STROKE = 0xffffff;
// 资质标题字体
DEFINE_COLOR.TALENT_TITLE_STOKE = 0xbf484a;
DEFINE_COLOR.TALENT_TITLE_TEXT = 0xfff9c6;
// 角色布阵字体
DEFINE_COLOR.ROLE_OPINION_FRONT = 0x11f400;
DEFINE_COLOR.ROLE_OPINION_BACK = 0xf7e900;
__reflect(DEFINE_COLOR.prototype, "DEFINE_COLOR");
/**
 * 特殊道具枚举
 */
var SpecialItem;
(function (SpecialItem) {
    SpecialItem[SpecialItem["ArenaPoint"] = 1] = "ArenaPoint";
    SpecialItem[SpecialItem["Feats"] = 2] = "Feats";
    SpecialItem[SpecialItem["Charm"] = 3] = "Charm";
    SpecialItem[SpecialItem["Resolve"] = 4] = "Resolve"; // 锻造石
})(SpecialItem || (SpecialItem = {}));
//# sourceMappingURL=DEFINE.js.map