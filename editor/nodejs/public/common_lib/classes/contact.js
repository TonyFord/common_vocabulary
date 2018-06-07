class Contact {

  constructor(ValOptions){

    // set type of class
    var property='type';
    this[property]='Contact';
    FreezeProperty(this, property);

    // create properties
    this.contactOption       = '';
    this.contactDetails      = '';
    this.contactAvailability = [/*ContactAvailability*/];

  }

}


class ContactAvailability {

  constructor(ValOptions){

    // set type of class
    var property='type';
    this[property]='ContactAvailability';
    FreezeProperty(this, property);

    // create properties
    this.Mo       = [/*AvailableHours*/];
    this.Tu       = [/*AvailableHours*/];
    this.We       = [/*AvailableHours*/];
    this.Th       = [/*AvailableHours*/];
    this.Fr       = [/*AvailableHours*/];
    this.Sa       = [/*AvailableHours*/];
    this.Su       = [/*AvailableHours*/];

  }

}

class AvailableHours {

  constructor(ValOptions){

    // set type of class
    var property='type';
    this[property]='AvailableHours';
    FreezeProperty(this, property);

    // create properties
    this.open  = '';
    this.close = '';

  }

}
