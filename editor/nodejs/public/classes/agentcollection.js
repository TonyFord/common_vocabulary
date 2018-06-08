class AgentCollection {

  constructor(ValOptions) {

    var This=this;

    // set type of class
    var property='type';
    this[property]='AgentCollection';
    FreezeProperty(this, property);

    // create validation options id all related classes and subclasses

    /* FValOptions(mandatory,unique,min,max,default,validValues,hidden,readonly) */
    this._properties={};

    var property='Agent';
    this._properties[property]=Object.freeze({
      'id'            : FValOptions(true ,1,128 ,'','' ),
      'name'          : FValOptions(false,0,256 ,'',''),
      'existenceDate' : FValOptions(false,0,253370764800000 ,new Date().getTime(),''),
      'image'         : FValOptions(false,0,1024,'',''),
      'note'          : FValOptions(false,0,10000,'','')
    });
    FreezeProperty(this._properties, property);

    var property='Location';
    this._properties[property]=Object.freeze({
      'longitude'     : FValOptions(false,-180,180 ,'',''),
      'latitude'      : FValOptions(false,-90 ,90  ,'','')
    });
    FreezeProperty(this._properties, property);

    var property='PostalAddress';
    this._properties[property]=Object.freeze({
      'name'       : FValOptions(false,0,256 ,'',''),
      'road'       : FValOptions(false,0,256 ,'',''),
      'city'       : FValOptions(false,0,256 ,'',''),
      'postalCode' : FValOptions(false,0,256 ,'',''),
      'country'    : FValOptions(false,0,256 ,'','')
    });
    FreezeProperty(this._properties, property);

    var property='AgentRelationship';
    this._properties[property]=Object.freeze({
      'startDate'     : FValOptions(false,0,253370764800000 ,new Date().getTime(),''),
      'endDate'       : FValOptions(false,0,253370764800000 ,new Date().getTime(),'')
    });
    FreezeProperty(this._properties, property);

    var property='AgentRelationshipRole';
    this._properties[property]=Object.freeze({
      'label'        : FValOptions(false,0,256 ,'',''),
      'reverseLabel' : FValOptions(false,0,256 ,'','')
    });
    FreezeProperty(this._properties, property);

    var property='Umap';
    var umapType_validValues=['Point','LineString','Polygon'];
    this._properties[property]=Object.freeze({
      'umapType': FValOptions(true ,5,10 ,'Point',umapType_validValues),
      'color'   : FValOptions(false,3,32 ,'',''),
      'icon'    : FValOptions(false,0,256,'',''),
      'uri'     : FValOptions(false,0,1024,'','')
    });
    FreezeProperty(this._properties, property);

    var property='Web';
    var webOption_validValues=['LandingPage','Blog','Wiki','Forum','Event','EventNotes','Facebook','Twitter'];
    this._properties[property]=Object.freeze({
      'webOption': FValOptions(true ,5,32 ,'LandingPage',webOption_validValues),
      'uri'      : FValOptions(false,0,1024,'',''),
      'note'     : FValOptions(false,0,10000,'',''),
      'date'     : FValOptions(false,0,253370764800000 ,0,'')
    });
    FreezeProperty(this._properties, property);

    var property='Contact';
    var contactOption_validValues=['Mail','Telegram'];
    this._properties[property]=Object.freeze({
      'contactOption'       : FValOptions(true ,0,64 ,'',contactOption_validValues),
      'contactDetails'      : FValOptions(true ,0,255,'','')
    });
    FreezeProperty(this._properties, property);

    var property='AvailableHours';
    this._properties[property]=Object.freeze({
      'open'  : FValOptions(true ,5,5,'00:00','/(([0-1][0-9])|(2[0-4])):[0-5][0-9]/g'),
      'close' : FValOptions(true ,5,5,'24:00','/(([0-1][0-9])|(2[0-4])):[0-5][0-9]/g')
    });
    FreezeProperty(this._properties, property);

    // create collection
    this._collection=[];

    // create relationships
    this._relationships=[];

    // create indizes list
    var property='_indizes';
    this[property]={
      'collection'          : 0,
      'location'            : 0,
      'postalAddress'       : 0,
      'umap'                : 0,
      'contact'             : 0,
      'contactAvailability' : 0,
      'availableHours'      : 0,
      'web'                 : 0,
      'relationship'        : 0,
      'relationship_role'   : 0
    };
    FreezeProperty(this, property);

    // create collection methods
    var property='AddItem';
    this[property]=function(subclass){
      if( this._collection.length > 0 ) return false;
      if( subclass == 'Person' ){
        this._collection.push( new Person() );
      } else if( subclass == 'Organization' ){
        this._collection.push( new Organization() );
      }
      this._indizes._collection=this._collection.length-1;
      FDefault(this, this._collection[this._indizes._collection].parent );
      return this;
    };
    FreezeProperty(this, property);

    var property='GetItem';
    this[property]=function(index){
      if(!isNumeric(index)) return false;
      if(index > this._collection.length ) return false;
      this._indizes._collection=index;
      this._indizes.location=0;
      this._indizes.postalAddress=0;
      return this;
    };
    FreezeProperty(this, property);

    var property='RemoveItem';
    this[property]=function(index){
      if( this._collection.length < 1 ) return false;
      if( index == undefined ) index = this._indizes._collection;
      if(!isNumeric(index)) return false;
      if(index > this._collection.length ) return false;
      this._collection.splice(index,1);
      this._indizes._collection=( index-1 < 0 ) ? 0 : index;
      return this;
    };
    FreezeProperty(this, property);

    var property='Length';
    this[property]=function(){
      return this._collection.length;
    };
    FreezeProperty(this, property);

    this.relationship={};
    this.relationship={
      'AddItem' : function() {
        This._relationships.push( new AgentRelationship );
        This._indizes.relationship = This._relationships.length-1;
        //FDefault(This, This._collection[This._indizes._collection].parent.location[This._indizes.location] );
        return This._indizes.relationship;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.relationship;
        if(!isNumeric(index)) return false;
        if(index > This._indizes.relationship.length ) return false;
        This._indizes.relationship=index;
        return This.relationship;
      },
      'RemoveItem' : function(index) {
        if( This._indizes.relationship.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.relationship;
        if(!isNumeric(index)) return false;
        if(index > This._indizes.relationship.length ) return false;
        This._relationships.splice(index,1);
        This._indizes.relationship=( index-1 < 0 ) ? 0 : index;
        return This.relationship;
      },
      'Length' : function() {
        return This._relationships.length;
      }
    };

    this.relationship.startDate=Object.freeze({
      'DateValue': function( value ){ return FDate( This, This._relationships[This._indizes.relationship], 'startDate' , value ); }
    });

    this.relationship.endDate=Object.freeze({
      'DateValue': function( value ){ return FDate( This, This._relationships[This._indizes.relationship], 'endDate' , value ); }
    });

    this.relationship.subject={};
    this.relationship.subject.id=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._relationships[This._indizes.relationship].subject, 'id' , value ); }
    });

    this.relationship.object={};
    this.relationship.object.id=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._relationships[This._indizes.relationship].object, 'id' , value ); }
    });

    this.relationship.object.postURI=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._relationships[This._indizes.relationship].object, 'postURI' , value ); }
    });

    this.relationship.relationshipRole={};
    this.relationship.relationshipRole={
      'AddItem' : function() {
        This._relationships[This._indizes.relationship].relationshipRole.push( new AgentRelationshipRole );
        This._indizes.relationship_role = This._relationships[This._indizes.relationship].relationshipRole.length-1;
        //FDefault(This, This._collection[This._indizes._collection].parent.location[This._indizes.location] );
        return This._indizes.relationship_role;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.relationship_role;
        if(!isNumeric(index)) return false;
        if(index > This._relationships[This._indizes.relationship].relationshipRole.length ) return false;
        This._indizes.relationship_role=index;
        return This.relationship.relationshipRole;
      },
      'RemoveItem' : function(index) {
        if( This._relationships[This._indizes.relationship].relationshipRole.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.relationship_role;
        if(!isNumeric(index)) return false;
        if(index > This._relationships[This._indizes.relationship].relationshipRole.length ) return false;
        This._relationships[This._indizes.relationship].relationshipRole.splice(index,1);
        This._indizes.relationship_role=( index-1 < 0 ) ? 0 : index;
        return This.relationship.relationshipRole;
      },
      'Length' : function() {
        return This._relationships[This._indizes.relationship].relationshipRole.length;
      }
    };

    this.relationship.relationshipRole.label=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._relationships[This._indizes.relationship].relationshipRole[This._indizes.relationship_role], 'label' , value ); }
    });

    this.relationship.relationshipRole.reverseLabel=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._relationships[This._indizes.relationship].relationshipRole[This._indizes.relationship_role], 'reverseLabel' , value ); }
    });


    FreezeProperty(this.relationship, 'AddItem');
    FreezeProperty(this.relationship, 'GetItem');
    FreezeProperty(this.relationship, 'RemoveItem');
    FreezeProperty(this.relationship, 'Length');
    FreezeProperty(this.relationship, 'startDate');
    FreezeProperty(this.relationship, 'endDate');
    FreezeProperty(this.relationship, 'subject');
    FreezeProperty(this.relationship, 'object');
    FreezeProperty(this.relationship.subject, 'id');
    FreezeProperty(this.relationship.object, 'id');
    FreezeProperty(this.relationship.object, 'postURI');
    FreezeProperty(this.relationship.relationshipRole, 'AddItem');
    FreezeProperty(this.relationship.relationshipRole, 'GetItem');
    FreezeProperty(this.relationship.relationshipRole, 'RemoveItem');
    FreezeProperty(this.relationship.relationshipRole, 'Length');
    FreezeProperty(this.relationship.relationshipRole, 'label');
    FreezeProperty(this.relationship.relationshipRole, 'reverseLabel');

    // create property methods
    var property='id';
    this[property]=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent, 'id' , value ); }
    });
    FreezeProperty(this, property);

    var property='name';
    this[property]=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent, 'name' , value ); }
    });
    FreezeProperty(this, property);

    var property='existenceDate';
    this[property]=Object.freeze({
      'DateValue': function( value ){ return FDate( This, This._collection[This._indizes._collection].parent, 'existenceDate' , value ); }
    });
    FreezeProperty(this, property);

    var property='image';
    this[property]=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent, 'image' , value ); }
    });
    FreezeProperty(this, property);

    var property='note';
    this[property]=Object.freeze({
      'Text': function( value ){ return FText( This, This._collection[This._indizes._collection].parent, 'note' , value ); },
      'Html': function( value ){ return FHtml( This, This._collection[This._indizes._collection].parent, 'note' , value ); }
    });
    FreezeProperty(this, property);

    this.location={};
    this.location={
      'AddItem' : function() {
        This._collection[This._indizes._collection].parent.location.push( new Location );
        This._indizes.location = This._collection[This._indizes._collection].parent.location.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.location[This._indizes.location] );
        return This._indizes.location;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.location;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.location.length ) return false;
        This._indizes.location=index;
        return This.location;
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.location.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.location;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.location.length ) return false;
        This._collection[This._indizes._collection].parent.location.splice(index,1);
        This._indizes.location=( index-1 < 0 ) ? 0 : index;
        return This.location;
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.location.length;
      }
    };

    this.location.latitude=Object.freeze({
      'NumericValue': function( value ){ return FNumeric( This, This._collection[This._indizes._collection].parent.location[This._indizes.location], 'latitude' , value, { 'decimals': 6 } ); }
    });

    this.location.longitude=Object.freeze({
      'NumericValue': function( value ){ return FNumeric( This, This._collection[This._indizes._collection].parent.location[This._indizes.location], 'longitude' , value, { 'decimals': 6 } ); }
    });

    this.location.postalAddress={};
    this.location.postalAddress={
      'AddItem' : function() {
        if( This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress.length > 0 ) return false;
        This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress.push( new PostalAddress );
        This._indizes.postalAddress = This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress[This._indizes.postalAddress] );
        return This._indizes.postalAddress;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.postalAddress;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress.length ) return false;
        This._indizes.postalAddress=index;
        return This.location.postalAddress;
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.postalAddress;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress.length ) return false;
        This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress.splice(index,1);
        This._indizes.postalAddress=( index-1 < 0 ) ? 0 : index;
        return This.location.postalAddress;
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress.length;
      }
    };

    this.location.postalAddress.name=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress[This._indizes.postalAddress], 'name' , value ); }
    });

    this.location.postalAddress.road=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress[This._indizes.postalAddress], 'road' , value ); }
    });

    this.location.postalAddress.city=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress[This._indizes.postalAddress], 'city' , value ); }
    });

    this.location.postalAddress.postalCode=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress[This._indizes.postalAddress], 'postalCode' , value ); }
    });

    this.location.postalAddress.country=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.location[This._indizes.location].postalAddress[This._indizes.postalAddress], 'country' , value ); }
    });

    this.location.umap={};
    this.location.umap={
      'AddItem' : function() {
        This._collection[This._indizes._collection].parent.location[This._indizes.location].umap.push( new Umap );
        This._indizes.umap = This._collection[This._indizes._collection].parent.location[This._indizes.location].umap.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.location[This._indizes.location].umap[This._indizes.umap] );
        return This._indizes.umap;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.umap;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.location[This._indizes.location].umap.length ) return false;
        This._indizes.umap=index;
        return This.location.umap;
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.location[This._indizes.location].umap.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.umap;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.location[This._indizes.location].umap.length ) return false;
        This._collection[This._indizes._collection].parent.location[This._indizes.location].umap.splice(index,1);
        This._indizes.umap=( index-1 < 0 ) ? 0 : index;
        return This.location.umap;
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.location[This._indizes.location].umap.length;
      }
    };

    this.location.umap.umapType=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.location[This._indizes.location].umap[This._indizes.umap], 'umapType' , value ); }
    });

    this.location.umap.color=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.location[This._indizes.location].umap[This._indizes.umap], 'color' , value ); }
    });

    this.location.umap.icon=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.location[This._indizes.location].umap[This._indizes.umap], 'icon' , value ); }
    });

    this.location.umap.uri=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.location[This._indizes.location].umap[This._indizes.umap], 'uri' , value ); }
    });

    FreezeProperty(this.location.umap, 'AddItem');
    FreezeProperty(this.location.umap, 'GetItem');
    FreezeProperty(this.location.umap, 'RemoveItem');
    FreezeProperty(this.location.umap, 'Length');
    FreezeProperty(this.location.umap, 'umapType');
    FreezeProperty(this.location.umap, 'color');
    FreezeProperty(this.location.umap, 'icon');
    FreezeProperty(this.location.umap, 'uri');

    FreezeProperty(this.location.postalAddress, 'AddItem');
    FreezeProperty(this.location.postalAddress, 'GetItem');
    FreezeProperty(this.location.postalAddress, 'RemoveItem');
    FreezeProperty(this.location.postalAddress, 'Length');
    FreezeProperty(this.location.postalAddress, 'name');
    FreezeProperty(this.location.postalAddress, 'road');
    FreezeProperty(this.location.postalAddress, 'city');
    FreezeProperty(this.location.postalAddress, 'postalCode');
    FreezeProperty(this.location.postalAddress, 'country');

    FreezeProperty(this.location, 'AddItem');
    FreezeProperty(this.location, 'GetItem');
    FreezeProperty(this.location, 'RemoveItem');
    FreezeProperty(this.location, 'Length');
    FreezeProperty(this.location, 'latitude');
    FreezeProperty(this.location, 'longitude');
    FreezeProperty(this, 'location');

    this.contact={};
    this.contact={
      'AddItem' : function() {
        This._collection[This._indizes._collection].parent.contact.push( new Contact );
        This._indizes.contact = This._collection[This._indizes._collection].parent.contact.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact] );
        return This._indizes.contact;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.contact;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact.length ) return false;
        This._indizes.contact=index;
        return This.contact;
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.contact.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.contact;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact.length ) return false;
        This._collection[This._indizes._collection].parent.contact.splice(index,1);
        This._indizes.contact=( index-1 < 0 ) ? 0 : index;
        return This.contact;
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.contact.length;
      }
    };

    this.contact.contactOption=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact], 'contactOption' , value ); }
    });

    this.contact.contactDetails=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact], 'contactDetails' , value ); }
    });

    this.contact.contactAvailability={};
    this.contact.contactAvailability={
      'AddItem' : function() {
        if( This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.length > 0 ) return false;
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.push( new ContactAvailability );
        This._indizes.contactAvailability = This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability] );
        return This._indizes.contactAvailability;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.contactAvailability;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.length ) return false;
        This._indizes.contactAvailability=index;
        return This.contact.contactAvailability;
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.contactAvailability;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.length ) return false;
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.splice(index,1);
        This._indizes.contactAvailability=( index-1 < 0 ) ? 0 : index;
        return This.contact.contactAvailability;
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.length;
      }
    };

    this.contact.contactAvailability.Mo={};
    this.contact.contactAvailability.Mo={
      'AddItem' : function() {
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Mo.push( new AvailableHours );
        This._indizes.availableHours = This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Mo.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Mo[This._indizes.availableHours] );
        return This._indizes.contactAvailability.Mo;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Mo.length ) return false;
        This._indizes.availableHours=index;
        return This._indizes.contactAvailability.Mo
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].length < 1 ) return false;
        if( index == undefined ) index = This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Mo.length ) return false;
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Mo.splice(index,1);
        This._indizes.availableHours=( index-1 < 0 ) ? 0 : index;
        return This._indizes.contactAvailability.Mo
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Mo.length;
      }
    }

    this.contact.contactAvailability.Mo.open=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Mo[This._indizes.availableHours], 'open' , value ); }
    });

    this.contact.contactAvailability.Mo.close=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Mo[This._indizes.availableHours], 'close' , value ); }
    });



    this.contact.contactAvailability.Tu={};
    this.contact.contactAvailability.Tu={
      'AddItem' : function() {
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Tu.push( new AvailableHours );
        This._indizes.availableHours = This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Tu.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Tu[This._indizes.availableHours] );
        return This._indizes.contactAvailability.Tu;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Tu.length ) return false;
        This._indizes.availableHours=index;
        return This._indizes.contactAvailability.Tu
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Tu.length ) return false;
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Tu.splice(index,1);
        This._indizes.availableHours=( index-1 < 0 ) ? 0 : index;
        return This._indizes.contactAvailability.Tu
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Tu.length;
      }
    }

    this.contact.contactAvailability.Tu.open=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Tu[This._indizes.availableHours], 'open' , value ); }
    });

    this.contact.contactAvailability.Tu.close=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Tu[This._indizes.availableHours], 'close' , value ); }
    });

    this.contact.contactAvailability.We={};
    this.contact.contactAvailability.We={
      'AddItem' : function() {
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].We.push( new AvailableHours );
        This._indizes.availableHours = This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].We.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].We[This._indizes.availableHours] );
        return This._indizes.contactAvailability.We;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].We.length ) return false;
        This._indizes.availableHours=index;
        return This._indizes.contactAvailability.We
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].We.length ) return false;
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].We.splice(index,1);
        This._indizes.availableHours=( index-1 < 0 ) ? 0 : index;
        return This._indizes.contactAvailability.We
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].We.length;
      }
    }

    this.contact.contactAvailability.We.open=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].We[This._indizes.availableHours], 'open' , value ); }
    });

    this.contact.contactAvailability.We.close=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].We[This._indizes.availableHours], 'close' , value ); }
    });

    this.contact.contactAvailability.Th={};
    this.contact.contactAvailability.Th={
      'AddItem' : function() {
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Th.push( new AvailableHours );
        This._indizes.availableHours = This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Th.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Th[This._indizes.availableHours] );
        return This._indizes.contactAvailability.Th;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Th.length ) return false;
        This._indizes.availableHours=index;
        return This._indizes.contactAvailability.Th
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Th.length ) return false;
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Th.splice(index,1);
        This._indizes.availableHours=( index-1 < 0 ) ? 0 : index;
        return This._indizes.contactAvailability.Th
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Th.length;
      }
    }

    this.contact.contactAvailability.Th.open=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Th[This._indizes.availableHours], 'open' , value ); }
    });

    this.contact.contactAvailability.Th.close=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Th[This._indizes.availableHours], 'close' , value ); }
    });

    this.contact.contactAvailability.Fr={};
    this.contact.contactAvailability.Fr={
      'AddItem' : function() {
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Fr.push( new AvailableHours );
        This._indizes.availableHours = This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Fr.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Fr[This._indizes.availableHours] );
        return This._indizes.contactAvailability.Fr;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Fr.length ) return false;
        This._indizes.availableHours=index;
        return This._indizes.contactAvailability.Fr
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Fr.length ) return false;
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Fr.splice(index,1);
        This._indizes.availableHours=( index-1 < 0 ) ? 0 : index;
        return This._indizes.contactAvailability.Fr
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Fr.length;
      }
    }

    this.contact.contactAvailability.Fr.open=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Fr[This._indizes.availableHours], 'open' , value ); }
    });

    this.contact.contactAvailability.Fr.close=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Fr[This._indizes.availableHours], 'close' , value ); }
    });

    this.contact.contactAvailability.Sa={};
    this.contact.contactAvailability.Sa={
      'AddItem' : function() {
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Sa.push( new AvailableHours );
        This._indizes.availableHours = This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Sa.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Sa[This._indizes.availableHours] );
        return This._indizes.contactAvailability.Sa;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Sa.length ) return false;
        This._indizes.availableHours=index;
        return This._indizes.contactAvailability.Sa
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Sa.length ) return false;
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Sa.splice(index,1);
        This._indizes.availableHours=( index-1 < 0 ) ? 0 : index;
        return This._indizes.contactAvailability.Sa
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Sa.length;
      }
    }

    this.contact.contactAvailability.Sa.open=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Sa[This._indizes.availableHours], 'open' , value ); }
    });

    this.contact.contactAvailability.Sa.close=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Sa[This._indizes.availableHours], 'close' , value ); }
    });

    this.contact.contactAvailability.Su={};
    this.contact.contactAvailability.Su={
      'AddItem' : function() {
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Su.push( new AvailableHours );
        This._indizes.availableHours = This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Su.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Su[This._indizes.availableHours] );
        return This._indizes.contactAvailability.Su;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Su.length ) return false;
        This._indizes.availableHours=index;
        return This._indizes.contactAvailability.Su
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.availableHours;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Su.length ) return false;
        This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Su.splice(index,1);
        This._indizes.availableHours=( index-1 < 0 ) ? 0 : index;
        return This._indizes.contactAvailability.Su
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Su.length;
      }
    }

    this.contact.contactAvailability.Su.open=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Su[This._indizes.availableHours], 'open' , value ); }
    });

    this.contact.contactAvailability.Su.close=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.contact[This._indizes.contact].contactAvailability[This._indizes.contactAvailability].Su[This._indizes.availableHours], 'close' , value ); }
    });

    FreezeProperty(this.contact.contactAvailability.Mo, 'AddItem');
    FreezeProperty(this.contact.contactAvailability.Mo, 'GetItem');
    FreezeProperty(this.contact.contactAvailability.Mo, 'RemoveItem');
    FreezeProperty(this.contact.contactAvailability.Mo, 'Length');
    FreezeProperty(this.contact.contactAvailability.Mo, 'open');
    FreezeProperty(this.contact.contactAvailability.Mo, 'close');

    FreezeProperty(this.contact.contactAvailability.Tu, 'AddItem');
    FreezeProperty(this.contact.contactAvailability.Tu, 'GetItem');
    FreezeProperty(this.contact.contactAvailability.Tu, 'RemoveItem');
    FreezeProperty(this.contact.contactAvailability.Tu, 'Length');
    FreezeProperty(this.contact.contactAvailability.Tu, 'open');
    FreezeProperty(this.contact.contactAvailability.Tu, 'close');

    FreezeProperty(this.contact.contactAvailability.We, 'AddItem');
    FreezeProperty(this.contact.contactAvailability.We, 'GetItem');
    FreezeProperty(this.contact.contactAvailability.We, 'RemoveItem');
    FreezeProperty(this.contact.contactAvailability.We, 'Length');
    FreezeProperty(this.contact.contactAvailability.We, 'open');
    FreezeProperty(this.contact.contactAvailability.We, 'close');

    FreezeProperty(this.contact.contactAvailability.Th, 'AddItem');
    FreezeProperty(this.contact.contactAvailability.Th, 'GetItem');
    FreezeProperty(this.contact.contactAvailability.Th, 'RemoveItem');
    FreezeProperty(this.contact.contactAvailability.Th, 'Length');
    FreezeProperty(this.contact.contactAvailability.Th, 'open');
    FreezeProperty(this.contact.contactAvailability.Th, 'close');

    FreezeProperty(this.contact.contactAvailability.Fr, 'AddItem');
    FreezeProperty(this.contact.contactAvailability.Fr, 'GetItem');
    FreezeProperty(this.contact.contactAvailability.Fr, 'RemoveItem');
    FreezeProperty(this.contact.contactAvailability.Fr, 'Length');
    FreezeProperty(this.contact.contactAvailability.Fr, 'open');
    FreezeProperty(this.contact.contactAvailability.Fr, 'close');

    FreezeProperty(this.contact.contactAvailability.Sa, 'AddItem');
    FreezeProperty(this.contact.contactAvailability.Sa, 'GetItem');
    FreezeProperty(this.contact.contactAvailability.Sa, 'RemoveItem');
    FreezeProperty(this.contact.contactAvailability.Sa, 'Length');
    FreezeProperty(this.contact.contactAvailability.Sa, 'open');
    FreezeProperty(this.contact.contactAvailability.Sa, 'close');

    FreezeProperty(this.contact.contactAvailability.Su, 'AddItem');
    FreezeProperty(this.contact.contactAvailability.Su, 'GetItem');
    FreezeProperty(this.contact.contactAvailability.Su, 'RemoveItem');
    FreezeProperty(this.contact.contactAvailability.Su, 'Length');
    FreezeProperty(this.contact.contactAvailability.Su, 'open');
    FreezeProperty(this.contact.contactAvailability.Su, 'close');

    FreezeProperty(this.contact.contactAvailability, 'AddItem');
    FreezeProperty(this.contact.contactAvailability, 'GetItem');
    FreezeProperty(this.contact.contactAvailability, 'RemoveItem');
    FreezeProperty(this.contact.contactAvailability, 'Length');
    FreezeProperty(this.contact.contactAvailability, 'Mo');
    FreezeProperty(this.contact.contactAvailability, 'Tu');
    FreezeProperty(this.contact.contactAvailability, 'We');
    FreezeProperty(this.contact.contactAvailability, 'Th');
    FreezeProperty(this.contact.contactAvailability, 'Fr');
    FreezeProperty(this.contact.contactAvailability, 'Sa');
    FreezeProperty(this.contact.contactAvailability, 'Su');

    FreezeProperty(this.contact, 'AddItem');
    FreezeProperty(this.contact, 'GetItem');
    FreezeProperty(this.contact, 'RemoveItem');
    FreezeProperty(this.contact, 'Length');
    FreezeProperty(this.contact, 'contactOption');
    FreezeProperty(this.contact, 'contactDetails');
    FreezeProperty(this.contact, 'contactAvailability');

    FreezeProperty(this, 'contact');

    this.web={};
    this.web={
      'AddItem' : function() {
        This._collection[This._indizes._collection].parent.web.push( new Web );
        This._indizes.web = This._collection[This._indizes._collection].parent.web.length-1;
        FDefault(This, This._collection[This._indizes._collection].parent.web[This._indizes.contact] );
        return This._indizes.web;
      },
      'GetItem' : function(index) {
        if( index == undefined ) index=This._indizes.web;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.web.length ) return false;
        This._indizes.web=index;
        return This.web;
      },
      'RemoveItem' : function(index) {
        if( This._collection[This._indizes._collection].parent.web.length < 1 ) return false;
        if( index == undefined ) index = This._indizes.web;
        if(!isNumeric(index)) return false;
        if(index > This._collection[This._indizes._collection].parent.web.length ) return false;
        This._collection[This._indizes._collection].parent.web.splice(index,1);
        This._indizes.web=( index-1 < 0 ) ? 0 : index;
        return This.web;
      },
      'Length' : function() {
        return This._collection[This._indizes._collection].parent.web.length;
      }
    };

    this.web.webOption=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.web[This._indizes.web], 'webOption' , value ); }
    });

    this.web.uri=Object.freeze({
      'StringValue': function( value ){ return FVal( This, This._collection[This._indizes._collection].parent.web[This._indizes.web], 'uri' , value ); }
    });

    this.web.date=Object.freeze({
      'DateValue': function( value ){ return FDate( This, This._collection[This._indizes._collection].parent.web[This._indizes.web], 'date' , value ); }
    });

    this.web.note=Object.freeze({
      'Text': function( value ){ return FText( This, This._collection[This._indizes._collection].parent.web[This._indizes.web], 'note' , value ); },
      'Html': function( value ){ return FHtml( This, This._collection[This._indizes._collection].parent.web[This._indizes.web], 'note' , value ); }
    });

    FreezeProperty(this.web, 'AddItem');
    FreezeProperty(this.web, 'GetItem');
    FreezeProperty(this.web, 'RemoveItem');
    FreezeProperty(this.web, 'Length');

    FreezeProperty(this.web, 'webOption');
    FreezeProperty(this.web, 'uri');
    FreezeProperty(this.web, 'date');
    FreezeProperty(this.web, 'note');

    FreezeProperty(this, 'web');

  }

}
