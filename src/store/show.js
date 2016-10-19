import {observable} from 'mobx';

class ShowData {

    @observable id;
    @observable name;
    @observable startDate;
    @observable endDate;
    @observable postcode;
    @observable notes;

    constructor({id, name, startDate, endDate, postcode, notes}){
    	this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.postcode = postcode;
        this.notes = notes;
    }

}

export default ShowData;
