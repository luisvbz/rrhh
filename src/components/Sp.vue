<template>
  <div>
    <div class="layout-padding">
    <div v-if="showNominas">
      <p class="light-paragraph">
        Selecciona uno de los elemento de la lista para ver lo destalles de aignaciones y deducciones.
      </p>
      <div class="list striped">
        <div class="item item-link two-lines" v-for="n in nominas" @click="consultarSobre(n)">
          <div class="item-content has-secondary">
           <div><strong>{{ n.peractnom | mes }} {{ n.anocurnom }}</strong></div> 
           <div>{{ n.desnom }}</div>
          </div>
          <div class="item-secondary">
           <i class="item-primary">keyboard_arrow_right</i>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!showNominas">
    <div name="spinner" v-if="loading">
      <center><spinner color="#00796B" :size="60"></spinner></center>
      <center>Cargando...</center>
    </div>
    <div v-for="sp in sobresConsultados" v-else>
    <table>
      <tr>
        <td class="nombre" colspan="2">
        <h6>{{ sp.encabez[0].nomper }}, {{ sp.encabez[0].apeper }}</h6>
         </td>
      </tr>
      <tr>
        <td class="nombre" colspan="2">
         <h6>C.I.: {{ sp.encabez[0].cedper | currency('', 0) }}</h6>
         </td>
      </tr>
      <tr>
        <td class="nombre" colspan="2">
         Cargo: <h6>{{ sp.encabez[0].descar }}</h6>
         </td>
      </tr>
      <tr>
        <td class="nombre" colspan="2">
         Periodo: <h6>{{sp.encabez[0].peractnom}} - del {{ sp.encabez[0].fecdesper }} al {{ sp.encabez    [0].fechasper }}</h6>
         </td>
      </tr>
      <tr>
        <td class="desnom" colspan="2">
          {{ sp.encabez[0].desnom }}
        </td>
      </tr>
      <tr>
        <td class="asig" colspan="2">
          Asignaciones
        </td>
      </tr>
      <tr v-for="i in sp.ingresos">
        <td class="nom">
          {{ i.nomcon }}
        </td>
        <td class="monto">
          {{ i.valsal | currency('') }}
        </td>
      </tr>
      <tr>
        <td class="nom"><b>Total asignaciones</b></td>
        <td class="monto">{{ sp.total_ingresos | currency('') }}</td>
      </tr>
      <tr>
         <td class="asig" colspan="2">
          Deducciones
        </td>
      </tr>
      <tr v-for="i in sp.egresos">
        <td class="nom">
          {{ i.nomcon }}
        </td>
        <td class="monto">
          {{ Math.abs(i.valsal) | currency('') }}
        </td>
      </tr>
      <tr>
        <td class="nom"><b>Total deucciones</b></td>
        <td class="monto">{{ sp.total_egresos | currency('') }}</td>
      </tr>
      <tr>
        <td class="nom">
          <b>Neto a cobrar</b>
        </td>
        <td class="monto">
          <strong>{{ (sp.total_ingresos - sp.total_egresos) | currency('')  }}</strong>
        </td>
      </tr>
    </table>
    </div>

      <div class="group">
          <button  class="primary full-width" @click="showNominas = true" v-if="!showNominas">
         <i class="item-primary">keyboard_arrow_left</i>  Consultar otro recibo
          </button>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
import { Loading } from 'quasar'
export default {
  data () {
    return {
      cedper: auth.user.profile.username,
      auth: auth,
      nominas: [],
      showNominas: false,
      loading: false,
      sobresConsultados: [],
      total_ing: 0.00,
      total_eg: 0.00
    }
  },
  mounted () {
    auth.check()
    this.showNominas = true
    this.getNominas(this.cedper)
  },
  watch: {
    '$route' (to, from) {
      if (from.params.anio !== to.params.anio) {
        return this.getNominas(this.cedper)
      }
    }
  },
  methods: {
    getNominas (cedper) {
      this.nominas = []
      this.showNominas = true
      Loading.show({
        message: 'Carganado recibos de pago disponibles'
      })
      this.$http.get('api/sobrepagos/' + cedper + '/' + this.$route.params.anio).then(response => {
        for (var i = 0; i < response.body.length; i++) {
          this.nominas.push(response.body[i])
        }
        Loading.hide()
      })
    },
    consultarSobre (n) {
      let consultar = []
      this.sobresConsultados = []
      this.showNominas = false
      this.loading = true
      consultar.push(n.codemp + '-' + n.anocurnom + '-' + n.codnom + '-' + n.peractnom)
      this.$http.post('api/sobrepagos/buscarRecibos', {parametros: consultar, codper: this.nominas[0].codper, anio: this.nominas[0].anocurnom}).then(response => {
        for (var i = 0; i < response.body.length; i++) {
          this.sobresConsultados.push({encabez: response.body[i].encabz,
            ingresos: [],
            egresos: [],
            total_ingresos: 0.00,
            total_egresos: 0.00})

          let detalles = response.body[i].detalles
          let ingresos = []
          let egresos = []
          for (var j = 0; j < detalles.length; j++) {
            if (detalles[j].valsal > 0) {
              ingresos.push(detalles[j])
            }
            else {
              egresos.push(detalles[j])
            }
          }
          for (var k = 0; k < ingresos.length; k++) {
            this.sobresConsultados[i].ingresos.push(ingresos[k])
            this.total_ing = parseFloat(this.total_ing) + parseFloat(ingresos[k].valsal)
          };
          ingresos = []

          this.sobresConsultados[i].total_ingresos = this.total_ing
          this.total_ing = 0

          for (var l = 0; l < egresos.length; l++) {
            this.sobresConsultados[i].egresos.push(egresos[l])
            this.total_eg = parseFloat(this.total_eg) + parseFloat(Math.abs(egresos[l].valsal))
          }
          egresos = []
          this.sobresConsultados[i].total_egresos = this.total_eg
          this.total_eg = 0

          this.loading = false
        }
      })
    }
  }
}
</script>
<style>
table{
  width: 100%;
}
.nombre{
  text-align: right;
  border-bottom: 1px dotted #000;
}
.asig{
  text-transform: uppercase;
  text-align: center;
  background: rgba(183,222,237,1); 
}

.desnom{
  text-transform: uppercase;
  text-align: center;
  background: rgba(57,192,245,1); 
}

.nom{
  text-align: left;
  border-bottom: 1px dotted #000;
}

.monto{
text-align: right;
border-bottom: 1px dotted #000;
}
</style>
