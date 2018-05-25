class Umap {

  constructor(ValOptions){

    // set type of class
    var property='type';
    this[property]='Umap';
    FreezeProperty(this, property);

    // create properties
    this.umapType = '';
    this.color    = '';
    this.icon     = '';
    this.uri      = '';

  }

}
