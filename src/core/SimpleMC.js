var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 简单序列帧动画
 */
var SimpleMC = (function (_super) {
    __extends(SimpleMC, _super);
    /**
     * @param {string} mcName 动画名称
     * @param {string} mcJson 动画JSON
     * @param {string} textureName 动画图集
     */
    function SimpleMC(mcName, mcJson, textureName) {
        var _this;
        var data = RES.getRes((mcJson == undefined ? mcName : mcJson) + "_json");
        var tex = RES.getRes((textureName == undefined ? mcName : textureName) + "_png");
        var mcf = new egret.MovieClipDataFactory(data, tex);
        _this = _super.call(this, mcf.generateMovieClipData(mcName)) || this;
        _this.name = mcName;
        return _this;
    }
    return SimpleMC;
}(egret.MovieClip));
__reflect(SimpleMC.prototype, "SimpleMC");
//# sourceMappingURL=SimpleMC.js.map