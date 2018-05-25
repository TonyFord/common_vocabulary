# Common Vocabulary for App Devs

#### V0.1_dev

Here you can find a common vocabulary for app devs to make collaboration easier.

It is an initiative of fair.coop members.

### Directory of Classes and Subclasses

+ Agent
+ Agent.Person
+ Agent.Organization


+ AgentRelationship
+ AgentRelationshipRole


+ Web
	+ WebOption


+ Contact
	+ ContactOption
	+ ContactAvailability
		+ AvailableHours


+ Location
  + PostalAddress
  + Umap
    + UmapType



-----


#### Agent
    {
      type: 'Agent',
      id: String!,
      name: String!,
			existenceDate: Date,
      location: [ Location ],
      image: String,
      note: String,
      web: [ Web ],
      contact: [ Contact ]
    }

>Note: Every Agent can have more than one Location(s) and a list of contact possibilities.

#### Agent.Person
    {
      type: 'Person',
      subclassOf: Agent
    }


#### Agent.Organization
    {
      type: 'Organization',
      subclassOf: Agent
    }

>Note: Agent is an abstract class. An agent should be instantiated as either a Person or an Organization.  When something refers to Agent, it should include both Persons and Organizations.   If people would like different types of organizations, we can add an OrganizationClassification or something similar when needed.

#### AgentRelationship
    {
      type: 'AgentRelationship',
      subject: Agent!,
      object: Agent!,
      startDate: Date,
      endDate: Date,
      relationship: AgentRelationshipRole!    
    }


#### AgentRelationshipRole
    {
        type: 'AgentRelationshipRole',
        label: String!,
        reverseLabel: String!
    }

#### Web
    {
      type: 'Web',
      webOption: WebOption!,
      uri: String!,
      note: String,
      date: Date
    }


#### Web.WebOption
    enum WebOption {
		LandingPage
        Blog
        Wiki
        Forum
        Event
        EventNotes
        Facebook
        Twitter
    }


#### Contact
    {
      type: 'Contact',
      contactOption: ContactOption!,
      contactDetails: String!,
      contactAvailability: ContactAvailability
    }


#### Contact.ContactOption
    enum ContactOption {
      local
      phone.home
      phone.office
      phone.mobile
      email.home
      email.office
      messenger.fairchat
      messenger.telegram
    }

#### Contact.ContactAvailability
    {
      type: 'ContactAvailability',
      Mo: [ AvailableHours ],
      Tu: [ AvailableHours ],
      We: [ AvailableHours ],
      Th: [ AvailableHours ],
      Fr: [ AvailableHours ],
      Sa: [ AvailableHours ],
      Su: [ AvailableHours ]
    }


#### Contact.ContactAvailability.AvailableHours
    {
    	open: '00:00',
    	close: '24:00'
    }


#### Location
    {
      type: 'Location',
      longitude: Decimal!,
      latitude: Decimal!,
      postalAddress: PostalAddress,
      umap: [Umap]
    }

#### Location.PostalAddress
    {
      name: String,
      road: String,
      city: String,
      postalCode: String,
      country: String
    }

#### Location.Umap
    {
      type: 'Umap',
      umapType: UmapType!,
      color: String,
      icon: String,
      uri: String
    }

#### Location.Umap.UmapType
	enum UmapType {
    	LineString
        Polygon
        Point
    }
>Note: UmapType default value = Point
