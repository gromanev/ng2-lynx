import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, SimpleChange} from '@angular/core';
import {TableDataModel} from "../Models/table-data-model";
import {TableOptionsModel} from "../Models/table-options-model";
import {TableHeaderModel} from "../Models/header-model";
import {Cookie} from "ng2-cookies";
import {List} from "linqts/dist/linq";
import {SearchModel} from "../Models/search-model";

@Component({
  selector: 'lynx-table',
  templateUrl: './lynx-table.component.html',
  styleUrls: ['./lynx-table.component.css']
})
export class LynxTableComponent implements OnInit {

  /**
   * Данные для таблицы
   */
  @Input() public data?: TableDataModel = new TableDataModel();

  /**
   * Настройки таблицы
   */
  @Input() public options?: TableOptionsModel = new TableOptionsModel();

  @Output() universalPiper: EventEmitter<any> = new EventEmitter();
  @Output() dataUpdater = new EventEmitter(true);

  public isLoadingVisible: boolean = true;

  /**
   * СSS класс для загрузки кампаний
   * @type {string}
   */
  public LoadingClass: string = "normal-table";//"normal-table blur-table";
  public isFirstLoadingScreenVisible: boolean = true;

  constructor(private cdRef: ChangeDetectorRef) {
    this.isFirstLoadingScreenVisible = true;
    this.LoadingClass = "normal-table"; //"normal-table blur-table";
    this.isLoadingVisible = true;

    //this.ngOnInit();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

    for (let propName in changes) {

      if (propName != "data") continue;

      if (changes[propName].currentValue.tableData != null) {
        this.isFirstLoadingScreenVisible = false;
        this.LoadingClass = "normal-table";
        this.isLoadingVisible = false;

        //console.log(changes[propName]);
      }
    }
  }

  ngOnInit() {
    //console.log("ngOnInit");
    //this.data.tableData = this.data.tableData;

    // инициализация объекта с информацией о таблице

    this.data.dataInformation = {
      totalItems: 5,
      currentPage: 1,
      itemsPerPage: 5
    };


    // инициализация фильтра
    if (this.data.filter == null) {
      this.data.filter = {
        Page: 1,
        PerPage: this.GetItemsCountCookie(),
        OrderBy: [
          {Course: 'desc', Target: 'impressions'}
        ],
      };
    }else{
      this.data.filter.PerPage = this.GetItemsCountCookie();
    }

    this.Initialize();
  }

  private Initialize(): void {

    this.data.filter.Page = 1;

    this.DataUpdate();
  }

  /**
   * Получение данных
   * @constructor
   */
  private DataUpdate(): any {
    this.data.tableData = null;
    this.dataUpdater.emit();


  }

  public Sort(target: string, course?: string): void {
    //console.log(target);
    this.data.filter.OrderBy[0].Course = this.data.filter.OrderBy[0].Course == 'asc' ? 'desc' : 'asc';
    this.data.filter.OrderBy[0].Target = target;

    this.Initialize();
  }

  /**
   * Поиск
   * @param value
   * @param searchField
   * @constructor
   */
  public Search(value: any, searchField: string[]): void {

    let searchObj = new List<SearchModel>();

    searchField.forEach(x => {
      searchObj.Add({
        SearchField: x,
        SearchValue: value
      });
    });

    this.data.filter.Search = searchObj.ToArray();
    //console.log(this.data.filter.Search);

    //this.searchField = [{key: searchField, value: value}];
    this.Initialize();
  }

  /**
   * Обработчик события при переходе по страницам
   * @param event
   */
  public pageChanged(event: any): void {
    this.data.filter.Page = event.page;
    this.DataUpdate();
  };

  /**
   * Назначаем кол-во выводимых кампаний на страницу
   * @param num
   * @constructor
   */
  public ChangeCountViewItems(num: string): void {
    // устанавливаем в куки значение количества выводимых итемов

    Cookie.set('showItemsCount', num);

    // получаем куки и в той же функции устанавливаем значение
    // количества выводимых итемов равное установленному числу
    this.GetItemsCountCookie();

    // устанавливаем на первую страницу
    this.data.filter.Page = this.data.dataInformation.currentPage = 1;

    // вызываем повторное обновление кампаний
    this.DataUpdate();
  }

  /**
   * Получение кукисов со значениями для компонента с кампаниями
   * @constructor
   */
  private GetItemsCountCookie(): number {
    let perPageCount = +Cookie.get('showItemsCount');
    if (this.data.filter != null) {
      this.data.filter.PerPage = (perPageCount != 0 && perPageCount != null) ? perPageCount : 10;
    }
    return perPageCount;
  }

  private GetData(): void {

    // если элемент пустой - забиваем его тестовыми данными
    if (this.data == null) {

      this.data = {
        headers: [
          {
            key: "id",
            value: "ID",
            visible: true
          },
          {
            key: "name",
            value: "Название",
            visible: true
          },
          {
            key: "desc",
            value: "Описание",
            visible: true
          },
          {
            key: "count",
            value: "Кол-во",
            visible: true
          },
          {
            key: "ctr",
            value: "CTR",
            visible: false
          },
          {
            key: "author",
            value: "Создатель",
            visible: true
          }
        ],
        tableData: [
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
        ],
        dataInformation: {
          totalItems: 5,
          currentPage: 1,
          itemsPerPage: 5
        },
        filter: {
          Page: 1,
          PerPage: 5,
          OrderBy: [
            {Course: 'desc', Target: 'impressions'}
          ],
          //Filter: this.FilterCreator(),
          datePicker: {
            dateFieldName: 'date',
            //startTime: this.datePickerObject.startDateCurrent,
            //endTime: this.datePickerObject.endDateCurrent,
          },
          //Search: this.searchField
        }
      };
    }

    if (this.options == null) {
      this.options = {
        mainClass: "table-responsive",
        tableVisualization: {
          tableClass: "table table-striped table-hover",
          loadingTableClass: "table table-striped table-hover",
        },
        DatePicker: {
          enabled: false
        },
        tablePagination: {
          paginationEnabled: true,
          pagginationModuleVisible: true,
          disabledPagination: false,
          maxSize: 5,
          boundaryLinks: true,
          directionLinks: false,
        },
        changeCountList: {
          countList: [5, 10, 15, 25, 50, 100],
          labelOfSelecter: "Кол-во элементов на странице:"
        }

      };
    }

  }

  /**
   * Столбцы, которые стоит показывать
   * @param oldCols
   * @returns {TableHeaderModel[]}
   * @constructor
   */
  public VisibleFields(oldCols: TableHeaderModel[]): TableHeaderModel[] {
    let resultList = new List<TableHeaderModel>(oldCols)
      .Where(x => x.visible == true)
      .ToArray();

    return resultList;
  }

  /**
   * Получение высоты блока при загрузке
   * @returns {number}
   * @constructor
   */
  public GetHeightLoadScreen(): number {
    let tmp: number = 37;
    return (this.data.filter != null)
      ? this.data.filter.PerPage * tmp
      : 1 * tmp;
  }

  /**
   * Функция для "наружнего" пайпинга
   * @param value
   * @param key
   * @returns {any}
   * @constructor
   */
  public Piper(value: any, key: any): string {
    let result: any;
    let tmp = {value, key, result};
    this.universalPiper.emit(tmp);
    return tmp.result;
  }

}
