/* class base functions and methods */

// input output html-tags-encoded property value
function FText( obj, target, property, value ){

  if( target == undefined ) return false;

  if( value == null ){
    return htmlEntities( target[property] );
  } else {
    target[property] = value.toString();
  }

}

// input output property value ( html allowed )
function FHtml( obj, target, property, value ){

  if( target == undefined ) return false;

  if( value == null ){
    return target[property];
  } else {
    target[property] = value.toString();
  }

}

// input output html-stripped property value
function FVal( obj, target, property, value ){

  if( target == undefined ) return false;

  if( value == null ){
    return stripHtml( target[property] );
  } else {
    target[property] = stripHtml( value.toString() );
  }

}

// input output numeric-formated property value
function FNumeric( obj, target, property, value, options ){

  if( target == undefined ) return false;

  if( value == null ){
    return target[property];
  } else {
    if( isNumeric(value) ){
      if( options.decimals != undefined ) value=value.toFixed(options.decimals);
      target[property]=value*1;
    } else {
      target[property]=0;
    }
  }
}

// input output date-formated property value
function FDate( obj, target, property, value ){

  if( target == undefined ) return false;

  if( value == null ){
    return target[property];
  } else {
    value=(( value instanceof Date && !isNaN(value.valueOf()) ) ? value : '' );
    target[property]=value;
  }

}

// freeze and secure property
function FreezeProperty(obj, property){
  Object.defineProperty(obj, property, { value: obj[property], configurable: false, writable: false });
}

// set validation options and return as object
function FValOptions(mandatory, unique, min, max, deflt, validValues, hidden, readonly){

  var OPTIONS={};
  OPTIONS['mandatory']  = (( mandatory == true || mandatory ==false ) ? mandatory : false );
  OPTIONS['unique']     = (( unique == true ||unique ==false ) ? unique : false );
  OPTIONS['min']        = (( min != undefined && isNumeric( min ) ) ? min : 0 );
  OPTIONS['max']        = (( max != undefined && isNumeric( max ) ) ? max : 255 );
  OPTIONS['default']    = (( deflt != undefined ) ? deflt : '' );
  OPTIONS['validValues']= (( validValues != undefined ) ? validValues : '' );
  OPTIONS['hidden']     = (( hidden == true || hidden ==false ) ? hidden : false );
  OPTIONS['readonly']   = (( readonly == true || readonly ==false ) ? readonly : false );
  return OPTIONS;

}

// validate new value and return invalid values
function FValidation( obj, property, value, options ){
  


}
