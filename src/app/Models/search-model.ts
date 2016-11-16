export class SearchModel {
    constructor(key: string, value: string) {
        this.SearchField = key;
        this.SearchValue = value;
    }

    public SearchField: string;
    public SearchValue: string;
}
