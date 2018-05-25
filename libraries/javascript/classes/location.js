class Location {

  constructor(){

    // set type of class
    var property='type';
    this[property]='Location';
    FreezeProperty(this, property);

    // create properties
    this.longitude     = '';
    this.latitude      = '';
    this.postalAddress = [/*PostalAddress*/];
    this.umap          = [/*[Umap]       */];

  }

}
