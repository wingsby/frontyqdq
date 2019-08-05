var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuideUtil = (function () {
    function GuideUtil() {
    }
    /**
     * 获取新手引导对应的视图
     * @param guide_id 引导id
     * @returns {any}
     */
    GuideUtil.getView = function (guide_id) {
        var entity = Template.guide.get(guide_id);
        var layer = Singleton.Get(LayerManager);
        if (entity.typevalue[0].trim() == "" || entity.typevalue[0].trim() == "") {
            egret.error("guide target is not existed (view or controls), guide id: " + guide_id + ", view: " + entity.typevalue[0]);
            return null;
        }
        var view = eval("layer.getView(ui." + entity.typevalue[0] + ")");
        if (view == null) {
            egret.error("can't get the view of guide, guide id: " + guide_id + ", view: " + entity.typevalue[0]);
            return null;
        }
        return view;
    };
    /**
     * 获取新手引导对应按钮
     * @param guide_id 引导id
     * @returns {any}
     */
    GuideUtil.getHandler = function (guide_id) {
        var entity = Template.guide.get(guide_id);
        var view = GuideUtil.getView(guide_id);
        var handler = eval("view." + entity.typevalue[1]);
        if (handler == null) {
            egret.error("cant get the controls of guide, guide id: " + guide_id + ", view: " + entity.typevalue[0] + ", handler: " + entity.typevalue[1]);
            return null;
        }
        return handler;
    };
    /**
     * 根据任务id获取引导id
     * @param task_id
     * @returns {number}
     */
    GuideUtil.getGuideIdByTask = function (task_id) {
        var task_entity = Template.task.get(task_id);
        var guide_group_id = task_entity.Guide;
        var guides = Template.guide.values;
        for (var i = 0; i < guides.length; i++) {
            if (guides[i].part == guide_group_id) {
                return guides[i].backID;
            }
        }
    };
    return GuideUtil;
}());
__reflect(GuideUtil.prototype, "GuideUtil");
//# sourceMappingURL=GuideUtil.js.map