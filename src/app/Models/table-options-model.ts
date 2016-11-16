import {TableVisualizationModel} from "./table-visualization-model";
import {TablePaginationModel} from "./table-pagination-model";
import {ItemsPerPageModel} from "./select-list-page-model";
import {DatePickerModel} from "./date-picker-model";
import {SearchConfigModel} from "./search-config-model";

export class TableOptionsModel {
    public mainClass: string = "table-responsive";
    public DatePicker: DatePickerModel;
    public tableVisualization: TableVisualizationModel;
    public tablePagination: TablePaginationModel;
    public changeCountList: ItemsPerPageModel;
    public SearchConfig?: SearchConfigModel = new SearchConfigModel();
}
