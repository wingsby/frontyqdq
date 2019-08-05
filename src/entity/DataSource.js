var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    var DataSource = (function () {
        function DataSource() {
        }
        return DataSource;
    }());
    Model.DataSource = DataSource;
    __reflect(DataSource.prototype, "Model.DataSource");
})(Model || (Model = {}));
//# sourceMappingURL=DataSource.js.map