var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerGuideInfo = (function () {
    function PlayerGuideInfo() {
        this.cur_guide_id = 0;
        this.last_update_task = 0;
    }
    /**
     * 获取当前引导的Entity
     * @returns {Entity.Guide}
     */
    PlayerGuideInfo.prototype.getCurEntity = function () {
        return Template.guide.get(this.cur_guide_id);
    };
    /**
     * 重置引导
     */
    PlayerGuideInfo.prototype.resetGuide = function () {
        var entity = this.getCurEntity();
        if (entity == null) {
            this.cur_guide_id = 0;
            return;
        }
        this.cur_guide_id = entity.backID;
    };
    /**
     * 下一步引导
     * @returns {boolean} 本组引导是否结束
     */
    PlayerGuideInfo.prototype.nextGuide = function () {
        var entity = this.getCurEntity();
        if (entity == null) {
            this.cur_guide_id = 0;
            return true;
        }
        if (entity.nextID <= 0) {
            this.cur_guide_id = 0;
            return true;
        }
        this.cur_guide_id = entity.nextID;
        return false;
    };
    /**
     * 设定当前引导
     * @param guide_id
     */
    PlayerGuideInfo.prototype.setGuide = function (guide_id) {
        this.cur_guide_id = guide_id;
    };
    return PlayerGuideInfo;
}());
__reflect(PlayerGuideInfo.prototype, "PlayerGuideInfo");
//# sourceMappingURL=PlayerGuideInfo.js.map