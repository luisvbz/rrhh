/*eslint-disable */
import Vue from 'vue'

Vue.filter('mes', function (mes) {
  switch (mes) {
    case '001':
      return 'ENERO'
      break
    case '002':
      return 'FEBRERO'
      break
    case '003':
      return 'MARZO'
      break
    case '004':
      return 'ABRIL'
      break
    case '005':
      return 'MAYO'
      break
    case '006':
      return 'JUNIO'
      break
    case '007':
      return 'JULIO'
      break
    case '008':
      return 'AGOSTO'
      break
    case '009':
      return 'SEPTIEMBRE'
      break
    case '010':
      return 'OCTUBRE'
      break
    case '011':
      return 'NOVIEMBRE'
      break
    case '012':
      return 'DICIEMBRE'
      break
	 }
})

Vue.filter('currency', function (value, currency, decimals){
  var digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? '.' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals).replace('.', ',')
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1.') +
    _float
})

//Nominas
Vue.filter('nomina', function(nomina){
 switch ( nomina ) {
   case '001':
     return 'ADMIN'
    break;
   case '002 ': 
     return 'ADMINCONT'
    break;
   case '003':
     return 'ADMINJUB'
    break;
   case '004':
     return 'DOCENTE'
    break;
   case '005':
     return 'DOCCONT'
    break;
   case '006':
     return 'DOCNUE'
    break;
   case '007':
     return 'DOCJUB'
    break;
   case '008':
     return 'OBRERO'
    break;
   case '009':
     return 'OBRCONT'
    break;
   case '010':
     return 'OBRJUB'
    break;
   case '011':
     return 'ADMINDOC'
    break;
   case '012':
     return 'ADMINNUE'
    break;
   case '013':
     return 'OBRNUE'
    break;
   case '014':
     return 'Jubilado y Pensionado'
    break;
   default: 
     return 'Nomina'
    break;
 }
})

Vue.filter('anio', function(anio) {
	var parts = anio.split('-')
  return parts[0]
})