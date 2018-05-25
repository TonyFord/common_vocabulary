class PostalAddress {

  constructor(ValOptions){

    // set type of class
    var property='type';
    this[property]='PostalAddress';
    FreezeProperty(this, property);

    // create properties
    this.name       = '';
    this.road       = '';
    this.city       = '';
    this.postalCode = '';
    this.country    = '';

  }

}
