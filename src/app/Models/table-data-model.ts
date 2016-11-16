import {TableHeaderModel} from "./header-model";
import {DataInformationModel} from "./data-information-model";
import {QueryFilterProps} from "../../Models/query-filter-props";

export class TableDataModel {
    public headers?: TableHeaderModel[];
    public tableData?: any[] = [
        {
            id: 1,
            name: "Запись 1",
            desc: "Обычная тестовая запись",
            count: 10,
            ctr: 2,
            author: "Глебов Роман"
        },
        {
            id: 2,
            name: "Запись 2",
            desc: "Обычная тестовая запись 2",
            count: 10,
            ctr: 2,
            author: "Корольков Макс"
        },
        {
            id: 3,
            name: "Запись 3",
            desc: "Обычная тестовая запись 3",
            count: 10,
            ctr: 2,
            author: "Байсиев Руслан"
        }
    ];
    public dataInformation?: DataInformationModel = {
        totalItems: 5,
        currentPage: 1,
        itemsPerPage: 5
    };
    public filter: QueryFilterProps;
}
