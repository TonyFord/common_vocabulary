var Obj;
var Id;

$( document ).ready(function() {
    GetLocalPublicKey();

    $('#PassphraseModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus');
    });;

});


function updateObj(){
  //$("#obj").val(JSON.stringify( Obj._collection ));
  $("#obj").html( createTable(Obj._collection,"_collection","Obj") + createTable(Obj._relationships,"_relationships","Obj.relationship") );

  $("[contenteditable]").keyup(
    function(){

      if( eval( $(this)[0].id + ".StringValue" ) != undefined ){
        eval( $(this)[0].id + ".StringValue('" + $($(this)[0]).text() + "')");
      } else if( eval( $(this)[0].id + ".DateValue" ) != undefined ){
        eval( $(this)[0].id + ".DateValue('" + $($(this)[0]).text() + "')");
      } else if( eval( $(this)[0].id + ".NumericValue" ) != undefined ){
        eval( $(this)[0].id + ".NumericValue(" + parseFloat( $($(this)[0]).text() ) + ")");
      } else if( eval( $(this)[0].id + ".Html" ) != undefined ){
        eval( $(this)[0].id + ".Html('" + $($(this)[0]).text() + "')");
      }
    }
  );

  $('[data-toggle="tooltip"]').tooltip();
}

function createTable(obj,property,objpath){

  if( isNumeric(property) ){
    //eval( objpath + ".GetItem(" + property + ")" );
  }
  var t="";
  t+="<table class='table table-bordered table-sm'>";
  t+="<thead><tr class='bg-info'><th colspan='2'>object" + checkObject(obj, property, objpath) + "</th></tr></thead>";
  t+="<tbody>";

  $.each(obj, function(i,v){

    t+="<tr>";
    if( typeof v === 'object' && !( v instanceof Date) ){
      t+="<td>" + i + "</td><td>" + createTable(v,i,objpath + (( isNumeric(i)) ? ".GetItem(" + i + ")" : (( i != "parent") ? "." + i : ""))) + "</td>";
    } else {
      t+="<td>";
      var format="";
      if( Obj._properties[obj.type] != undefined ){
        if( Obj._properties[obj.type][i] != undefined ){
          $.each( eval( objpath + "." + i ), function(j,w){
            format=j;
          });
          if( format == undefined ){
            format="";
          } else {
            format=" [" + format + "]";
          }
          t+="<a href='#' data-toggle='tooltip' data-html='true' title='" + JSON.stringify(Obj._properties[obj.type][i]).replace(/(\{|\}|\")/g,"").replace(/,/g,"<br>") + "'>";
        }
      }

      t+= i + "</a><font size='0.8em'>" + format + "</font>";

      if( i == "id" ){
        t+=" <button class='btn btn-default btn-sm' onclick='$($(this).parent().parent().children()[1]).attr(\"contenteditable\",true)'>[]</button>";
      } else if(  i == "postURI" ){
        t+=" <button class='btn btn-default btn-sm' onclick='GetPublicKey($($(this).parent().parent().children()[1]).text(), \"" + i + "\", \"" + objpath + "\");'>Get id</button>";
      }

      t+="</td>";

      if( i == "type" || i == "id" ){
        t+="<td>" + v + "</td>";
      } else if( typeof( eval( objpath + "." + i + ".StringValue") ) === "function" ){
        t+="<td id='" + objpath + "." + i + "' contenteditable>" + eval( objpath + "." + i + ".StringValue()") + "</td>";
      } else if( typeof( eval( objpath + "." + i + ".DateValue") ) === "function" ){
        var d=new Date( eval( objpath + "." + i + ".DateValue()" ) ).toJSON();
        if( d == null ) d="";
        t+="<td id='" + objpath + "." + i + "' contenteditable>" + d + "</td>";
      } else if( typeof( eval( objpath + "." + i + ".NumericValue") ) === "function" ){
        t+="<td id='" + objpath + "." + i + "' contenteditable>" + eval( objpath + "." + i + ".NumericValue()") + "</td>";
      } else if( typeof( eval( objpath + "." + i + ".Text") ) === "function" ){
        t+="<td id='" + objpath + "." + i + "' contenteditable>" + eval( objpath + "." + i + ".Text()") + "</td>";
      } else {
        t+="<td id='" + objpath + "." + i + "' contenteditable>" + v + "</td>";
      }
    }
    t+="</tr>";
  });
  t+="</tbody>";
  t+="</table>";
  return t;
}

function checkObject(obj, property, objpath){

  if( property == "parent" ) return "";

  console.log( obj, property, objpath );

  if( obj.type != undefined && isNumeric(property) && property != "_collection" && property != "_relationships" ){

    var btn="";

    if( typeof( eval( objpath + ".RemoveItem") ) === "function" ){
      btn+=" <button class='btn btn-sm btn-dark' onclick='" + objpath + ".RemoveItem(); updateObj();'>Remove</button>";
    }

    if( objpath.match(/GetItem/g).length == 1 ){
      btn+=" <button class='btn btn-sm btn-dark' onclick='PostToRemote(0)'>PostToRemote</button>";
    }

    return btn;
  }


  if( typeof( eval( objpath + ".AddItem") ) === "function" ){

    if( objpath == "Obj" ){
      if( Obj.Length() > 0 ) return "";
      return " <button class='btn btn-sm btn-dark' onclick='" + objpath + ".AddItem(\"Person\"); " + objpath + ".id.StringValue(\"" + Id + "\"); updateObj();'>Add Person</button> <button class='btn btn-sm btn-dark' onclick='" + objpath + ".AddItem(\"Organization\"); " + objpath + ".id.StringValue(\"" + Id + "\"); updateObj();'>Add Organization</button>";
    } else if( objpath == "Obj.relationship" ){
      if( Obj.relationship.Length() > 0 ) return "";
      return " <button class='btn btn-sm btn-dark' onclick='" + objpath + ".AddItem(); " + objpath + ".subject.id.StringValue(\"" + Id + "\"); updateObj();'>Add AgentRelationship</button>";
    } else {
      if( property.match(/(Mo|Tu|We|Th|Fr|Sa|Su)/g) != null ) property="AvailableHours";
      return " <button class='btn btn-sm btn-dark' onclick='" + objpath + ".AddItem(); updateObj();'>Add " + property.capitalize() + "</button>";

    }
  }

  return "";

}

function CreateNewAgentCollection(){

  Obj=new AgentCollection();
  updateObj();
  $("#createNewAgentCollection").toggleClass('d-none');
  $("#storeToLocal").toggleClass('d-none',false);
  $("#postToRemote").toggleClass('d-none',false);

}


function StoreToLocal(){

  $.post("http://127.0.0.1:3000",{"action": "StoreToLocal", "_collection" : JSON.stringify( Obj._collection ), "_relationships" : JSON.stringify( Obj._relationships ) } , function(result){
    alert("Stored!");
  } );

}
function GetLocalPublicKey(){

  $.post("http://127.0.0.1:3000",{"action": "GetLocalPublicKey" } , function(result){
    Id = result;
  } );

}

function LoadFromLocal(){

  var passphrase = $("#passphrase").val();
   $('#passphrase').val("");
   
  $.post("http://127.0.0.1:3000",{"action": "LoadFromLocal", "passphrase" : passphrase } , function(result){

    if(result != "" ){
      Obj=new AgentCollection();
      var DATA=JSON.parse(result);
      // get public key hashed
      Obj._collection=DATA._collection;
      Obj._relationships=DATA._relationships;
    } else {
      alert("Passphrase NOK!");
    }
    updateObj();
    $("#createNewAgentCollection").toggleClass("d-none",true);
    $("#storeToLocal").toggleClass('d-none',false);
    $("#postToRemote").toggleClass('d-none',false);
  } );

}

function PostToRemote(index){

  var uri=prompt("enter postURL");
  var passphrase = prompt("Enter private keys passphrase:");

  $.post("http://127.0.0.1:3000",{"action": "PrepareForPost", "index" : index } , function(result){
    var DATA=JSON.parse(result);
    $.post(uri,{"action": "post", "data" : DATA.data, "id" : DATA.id, "signature" : DATA.signature, "passphrase" : passphrase } , function(resultt){
      alert("Stored Remote!");
    } );

  });

}


function GetPublicKey(uri, property, objpath){

  $.post(uri,{"action": "getpublickey" } , function(result){
    eval( objpath + ".id.StringValue('" + result + "')");
    updateObj();
  } );

}
