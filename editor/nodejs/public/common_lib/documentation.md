### Instructions for Usage

#### AgentCollection methods

##### Agent object methods


| method | description |
|------|-------|
| ```AgentCollection.AddItem(subclass)```      | add new Agent(object) to collection<br><br>subclass = Person OR Organization     |
| ```AgentCollection.GetItem(index)```  | get agent in collection by index
| ```AgentCollection.RemoveItem(index)``` | remove agent in collection by index<br> if index is not set then remove current item |
| ```AgentCollection.Length()``` | get current length of agent collection |

##### Agent object values

| method | description |
|-----| ----- |
| ```AgentCollection.id.StringValue(newValue)``` | set new value  Agent.id<br>(if newValue is not set then get value) |
| ```AgentCollection.name.StringValue(newValue)``` | set new value  Agent.name<br>(if newValue is not set then get value) |
| ```AgentCollection.existenceDate.DateValue(newValue)``` | set new value  Agent.existenceDate<br>(if newValue is not set then get value) |


##### Agent object [location] methods

| method | description |
|------|-------|
| ```AgentCollection.location.AddItem()```      | add new Location(object) to agent.location    |
| ```AgentCollection.location.GetItem(index)```  | get Location(object) by index
| ```AgentCollection.location.RemoveItem(index)``` | remove Location(object) by index<br> if index is not set then remove current item |
| ```AgentCollection.location.Length()``` | get current length of Agent.location |


##### Agent object [location] values

| method | description |
|-----| ----- |
| ```AgentCollection.location.latitude.NumericValue(newValue)``` | set new value  Agent.location.latitude<br>(if newValue is not set then get value) |
| ```AgentCollection.location.longitude.NumericValue(newValue)``` | set new value  Agent.location.longitude<br>(if newValue is not set then get value) |


##### Agent object [location][postalAddress] methods

| method | description |
|------|-------|
| ```AgentCollection.location.postalAddress.AddItem()```      | add new PostalAddress(object) to agent.location    |
| ```AgentCollection.location.postalAddress.GetItem(index)```  | get PostalAddress(object) by index
| ```AgentCollection.location.postalAddress.RemoveItem(index)``` | remove PostalAddress(object) by index<br> if index is not set then remove current item |
| ```AgentCollection.location.postalAddress.Length()``` | get current length of Agent.location.postalAddress |


##### Agent object [location][postalAddress] values

| method | description |
|-----| ----- |
| ```AgentCollection.location.postalAddress.name.StringValue(newValue)``` | set new value  Agent.location.postalAddress.name<br>(if newValue is not set then get value) |
| ```AgentCollection.location.postalAddress.road.StringValue(newValue)``` | set new value  Agent.location.postalAddress.road<br>(if newValue is not set then get value) |
| ```AgentCollection.location.postalAddress.city.StringValue(newValue)``` | set new value  Agent.location.postalAddress.city<br>(if newValue is not set then get value) |
| ```AgentCollection.location.postalAddress.postalCode.StringValue(newValue)``` | set new value  Agent.location.postalAddress.postalCode<br>(if newValue is not set then get value) |
| ```AgentCollection.location.postalAddress.country.StringValue(newValue)``` | set new value  Agent.location.postalAddress.country<br>(if newValue is not set then get value) |


##### Agent object [location][umap] methods

| method | description |
|------|-------|
| ```AgentCollection.location.umap.AddItem()```      | add new Umap(object) to agent.location    |
| ```AgentCollection.location.umap.GetItem(index)```  | get Umap(object) by index
| ```AgentCollection.location.umap.RemoveItem(index)``` | remove Umap(object) by index<br> if index is not set then remove current item |
| ```AgentCollection.location.umap.Length()``` | get current length of Agent.location.umap |


##### Agent object [location][umap] values

| method | description |
|-----| ----- |
| ```AgentCollection.location.umap.umapType.StringValue(newValue)``` | set new value  Agent.location.umap.umapType<br>(if newValue is not set then get value) |
| ```AgentCollection.location.umap.color.StringValue(newValue)``` | set new value  Agent.location.umap.color<br>(if newValue is not set then get value) |
| ```AgentCollection.location.umap.icon.StringValue(newValue)``` | set new value  Agent.location.umap.icon<br>(if newValue is not set then get value) |
| ```AgentCollection.location.umap.uri.StringValue(newValue)``` | set new value  Agent.location.umap.uri<br>(if newValue is not set then get value) |


##### Agent object [contact] methods

| method | description |
|------|-------|
| ```AgentCollection.contact.AddItem()```      | add new Contact(object) to agent.contact    |
| ```AgentCollection.contact.GetItem(index)```  | get Contact(object) by index
| ```AgentCollection.contact.RemoveItem(index)``` | remove Contact(object) by index<br> if index is not set then remove current item |
| ```AgentCollection.contact.Length()``` | get current length of Agent.contact |


##### Agent object [contact] values

| method | description |
|-----| ----- |
| ```AgentCollection.contact.contactOption.StringValue(newValue)``` | set new value  Agent.contact.contactOption<br>(if newValue is not set then get value) |
| ```AgentCollection.contact.contactDetails.StringValue(newValue)``` | set new value  Agent.contact.contactDetails<br>(if newValue is not set then get value) |


##### Agent object [contact][contactAvailability] methods

| method | description |
|------|-------|
| ```AgentCollection.contact.contactAvailability.AddItem()```      | add new ContactAvailability(object) to agent.contact    |
| ```AgentCollection.contact.contactAvailability.GetItem(index)```  | get ContactAvailability(object) by index
| ```AgentCollection.contact.contactAvailability.RemoveItem(index)``` | remove ContactAvailability(object) by index<br> if index is not set then remove current item |
| ```AgentCollection.contact.contactAvailability.Length()``` | get current length of Agent.contact.contactAvailability |

##### Agent object [contact][contactAvailability][{weekDay}] methods

| method | description |
|------|-------|
| ```weekday = Mo,Tu,We,Th,Fr,Sa,Su``` | possible weekDay values |
| ```AgentCollection.contact.contactAvailability[weekDay].AddItem()```      | add new AvailableHours(object) to agent.contact.contactAvailability[weekDay]    |
| ```AgentCollection.contact.contactAvailability[weekDay].GetItem(index)```  | get AvailableHours(object) by index
| ```AgentCollection.contact.contactAvailability[weekDay].RemoveItem(index)``` | remove AvailableHours(object) by index<br> if index is not set then remove current item |
| ```AgentCollection.contact.contactAvailability[weekDay].Length()``` | get current length of Agent.contact.contactAvailability |


##### Agent object [contact][contactAvailability][{weekDay}] values

| method | description |
|-----| ----- |
| ```AgentCollection.contact.contactAvailability.open.StringValue(newValue)``` | set new value  Agent.contact.contactAvailability.open<br>(if newValue is not set then get value) |
| ```AgentCollection.contact.contactAvailability.close.StringValue(newValue)``` | set new value  Agent.contact.contactAvailability.close<br>(if newValue is not set then get value) |


##### Agent object [web] methods

| method | description |
|------|-------|
| ```AgentCollection.web.AddItem()```      | add new Web(object) to agent.web    |
| ```AgentCollection.web.GetItem(index)```  | get Web(object) by index
| ```AgentCollection.web.RemoveItem(index)``` | remove Web(object) by index<br> if index is not set then remove current item |
| ```AgentCollection.web.Length()``` | get current length of Agent.web |


##### Agent object [web] values

| method | description |
|-----| ----- |
| ```AgentCollection.web.webOption.StringValue(newValue)``` | set new value  Agent.web.webOption<br>(if newValue is not set then get value) |
| ```AgentCollection.web.uri.StringValue(newValue)``` | set new value  Agent.web.uri<br>(if newValue is not set then get value) |
| ```AgentCollection.web.date.DateValue(newValue)``` | set new value  Agent.web.date<br>(if newValue is not set then get value) The value must be a js date object |
| ```AgentCollection.web.note.Text(newValue)```<br>```AgentCollection.web.note.Html(newValue)``` | set new value  Agent.web.note<br>(if newValue is not set then get value)<br>.val = strip html tags<br>.text = encode html tags<br>.html = include html tags  |
