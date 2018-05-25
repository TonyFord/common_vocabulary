class Agent {

  constructor(ValOptions) {

    // set type of class
    var property='type';
    this[property]='Agent';
    FreezeProperty(this, property);

    // create properties
    this.id            = '';
    this.name          = '';
    this.existenceDate = '';
    this.image         = '';
    this.note          = '';
    this.location      = [/*[Location]*/];
    this.web           = [/*[Web]     */];
    this.contact       = [/*[Contact] */];

  }
}

// subclasses of Agent
class Person {

  constructor() {

    var property='type';
    this[property]='Person';
    FreezeProperty(this, property);

    var property='parent';
    this[property] = new Agent();
    Object.defineProperty(this, property, { value: this[property], configurable: false, writable: false });

  }

}

class Organization {

  constructor() {

    var property='type';
    this[property]='Organization';
    FreezeProperty(this, property);

    var property='parent';
    this[property] = new Agent();
    Object.defineProperty(this, property, { value: this[property], configurable: false, writable: false });

  }

}


class AgentRelationship {

  constructor(ValOptions) {

    // set type of class
    var property='type';
    this[property]='AgentRelationship';
    FreezeProperty(this, property);

    // create properties
    this.startDate    = '';
    this.endDate      = '';
    this.subject      = [/*Agent                */];
    this.object       = [/*Agent                */];
    this.relationship = [/*AgentRelationshipRole*/];

  }
}


class AgentRelationshipRole {

  constructor(ValOptions) {

    // set type of class
    var property='type';
    this[property]='AgentRelationshipRole';
    FreezeProperty(this, property);

    // create properties
    this.label        = '';
    this.reverseLabel = '';

  }

}
