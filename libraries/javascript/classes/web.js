class Web {

  constructor(ValOptions){

    // set type of class
    var property='type';
    this[property]='Web';
    FreezeProperty(this, property);

    // create properties
    this.webOption = '';
    this.uri       = '';
    this.date      = '';
    this.note      = '';

  }

}
