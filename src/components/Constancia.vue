<template>
<div>
    <div class="layout-padding">
    <div v-if="adv.show">
    <center><i class="warning" >warning</i></center>
     <p class="light-paragraph">{{ adv.msj }}</p>
    </div>
      <q-transition name="slide">
        <q-stepper @finish="generarConstancia()" ref="stepper" v-if="!adv.show" v-show="!finished" class="teal" finish-label="Generar" back-label="Atras" next-label="Siguiente">
          <q-step title="Verifique sus datos">
          <div class="list">
             <div class="item two-lines">
               <div class="item-content has-secondary">
                 <div>{{ constancia.encabezado.nomper }}, {{ constancia.encabezado.apeper }}</div>
                 <div>C.I: {{ constancia.encabezado.cedper | currency('', 0) }}</div>
               </div>
             </div>
           </div>
           <div class="list"  v-for="n in constancia.nominas">
              <p class="caption">{{ n.desnom }}<hr>
              {{ n.fecing }}<br>
              <span class="sub">Fecha de Ingreso</span><hr>
              {{ n.cargo }}<br>
              <span class="sub">Cargo</span><hr>
              {{ n.sueldo_base | currency('')}}<br>
              <span class="sub">Sueldo básico</span><hr>
              {{ n.sueldo_integral | currency('') }}<br>
              <span class="sub">Sueldo integral</span>
              </p>
           </div>
          </q-step>
          <q-step title="A quien va dirigida" :ready="cadivi || embajada || otro || nadie || banco">
            Seleccione a quien va dirigida la cosntancia.
            <br><br>
            <label>
              <q-checkbox v-model="banco" :disable="cadivi || embajada || otro || nadie"></q-checkbox>
              Banco
            </label><br><br>
             <label>
              <q-checkbox v-model="cadivi" :disable="banco || embajada || otro || nadie"></q-checkbox>
              Cadivi
            </label><br><br>
             <label>
              <q-checkbox  v-model="embajada" :disable="cadivi || banco || otro || nadie"></q-checkbox>
              Embajada
            </label><br><br>
             <label>
              <q-checkbox  v-model="otro" :disable="cadivi || embajada || banco || nadie"></q-checkbox>
              Otro
            </label><br><br>
             <label>
              <q-checkbox  v-model="nadie" :disable="cadivi || embajada || otro || banco"></q-checkbox>
              Nadie
            </label><br><br>
            <div v-if="banco">
              <q-dialog-select class="full-width" type="radio"
               :options="bancos" v-model="banco_select"   ok-label="Ok" 
                cancel-label="Cerrar" title="Bancos"
                ></q-dialog-select><br>
            </div>
             <div v-if="embajada">
              <q-dialog-select class="full-width" type="radio"
               :options="paises" v-model="embajada_select"  ok-label="Ok" 
                cancel-label="Cerrar" title="Bancos"
                ></q-dialog-select><br>
            </div>
            <div class="stacked-label" v-if="otro">
              <input v-model="otro_select">
              <label>Otro</label>
            </div>
          </q-step>
          <q-step title="Tipo se sueldo" :ready="tipo_sueldo.ss || tipo_sueldo.sb || tipo_sueldo.si">
             <label>
              <q-checkbox v-model="tipo_sueldo.ss" :disable="tipo_sueldo.sb || tipo_sueldo.si"></q-checkbox>
              Sin sueldo
            </label><br><br>
             <label>
              <q-checkbox v-model="tipo_sueldo.sb" :disable="tipo_sueldo.ss || tipo_sueldo.si"></q-checkbox>
              Sueldo basico
            </label><br><br>
             <label>
              <q-checkbox v-model="tipo_sueldo.si" :disable="tipo_sueldo.sb || tipo_sueldo.ss"></q-checkbox>
              Sueldo integral
            </label><br><br>
          </q-step>
        </q-stepper>
      </q-transition>

      <div v-show="finished" class="items-center column justify-center full-width full-height">
        <p class="caption">
          <i class="text-primary" style="font-size: 2rem; margin-right: 1rem;">check</i>
          <h5>Constancia</h5>
          <span style="line-height: 2.3; font-size: 14px; text-align: justify; width: 100%; height: 100%" >
              Quien suscribe, <b>DIRECTORA DE RECURSOS HUMANOS</b>, de la Universidad Nacional Experimental <b>“RAFAEL MARÍA BARALT”</b>, por medio de la presente hace constar que el (la) ciudadano (a): <b>{{ constancia.encabezado.apeper }}, {{ constancia.encabezado.nomper }}, </b> titular de la cédula de identidad <b>{{ constancia.encabezado.cedper}}</b>; <span id="content"></span></b>
              .<br><br>
              {{ printConstancia.dia }}.
            </span>
          <span></span>
        </p>
         <p class="group">
        <button class="circular primary" @click="$refs.correo.open()"><i>mail</i></button>
        <button class="circular secondary" @click="getPdf()"><i>vertical_align_bottom</i></button>
        <button class="circular secondary" @click="reset()"><i class="animate-blink">restore</i></button>
        </p>
        <q-modal ref="correo" class="minimized" :content-css="{padding: '40px'}">
            <h6>Enviar a: </h6>
              <h6>{{ auth.user.profile.email }}</h6>
              <hr>
              <p>Si no esta usando este correo, pueden cambiarlo haciendo click <a @click="change = true">AQUI</a></p>
              <div class="stacked-label" v-if="change">
              <input class="full-width" v-model="email">
              <label>Correo electronico</label>
              <button  class="primary full-width" @click="actDatos()" :disabled="email == null">Cambiar correo</button>
            </div>
            <br><br>
            <button class="blue" @click="getPdfMail()">Enviar</button>
            <button class="red" @click="$refs.correo.close()">Cerrar</button>
        </q-modal>
      </div>
    </div>
</div>
</template>

<script>
import auth from '../auth'
import { Loading, Toast } from 'quasar'
export default {
  data () {
    return {
      auth: auth,
      codper: null,
      constancia: {
        encabezado: {
          cedper: null,
          nomper: null,
          apeper: null
        },
        nominas: []
      },
      printConstancia: {
        content: '',
        oficio: '',
        dia: '',
        id: ''
      },
      ready: false,
      banco: false,
      cadivi: false,
      embajada: false,
      nadie: false,
      otro: false,
      finished: false,
      bancos: [],
      paises: [],
      banco_select: '100% Banco',
      embajada_select: 'AFGANISTAN',
      dira: false,
      tipo_sueldo: {
        ss: false,
        sb: false,
        si: false
      },
      otro_select: null,
      email: null,
      change: false,
      adv: {
        show: false,
        msj: null
      }
    }
  },
  mounted () {
    auth.check()
    this.codper = this.auth.user.profile.username
    this.getConstancia(this.codper)
    this.getBancos()
  },
  methods: {
    getConstancia (codper) {
      Loading.show({
        message: 'Cargando datos'
      })
      let fecha1 = ''
      let fecha2 = ''
      let fecing = ''
      this.$http.get('api/constancia/' + codper).then(response => {
        let data = response.body.busquedacn
        this.constancia.encabezado.cedper = data[0].detalle[0].cedper
        this.constancia.encabezado.nomper = data[0].detalle[0].nomper
        this.constancia.encabezado.apeper = data[0].detalle[0].apeper
        if (data.length > 1) {
          if (data[0].codnom === '0301' && data[1].codnom === '0101') {
            fecha1 = data[0].detalle[0].fecjubper
            fecha2 = data[0].detalle[0].fecreingper
          }
          else if (data[0].codnom === '0101' && data[1].codnom === '0301') {
            fecha1 = data[0].detalle[0].fecreingper
            fecha2 = data[0].detalle[0].fecjubper
          }
          else if (data[0].codnom === '0301' && data[1].codnom === '0601') {
            fecha1 = data[0].detalle[0].fecjubper
            fecha2 = data[0].detalle[0].fecreingper
          }
          else if (data[0].codnom === '0601' && data[1].codnom === '0301') {
            fecha1 = data[0].detalle[0].fecreingper
            fecha2 = data[0].detalle[0].fecjubper
          }
          else if (data[0].codnom === '1401' && data[1].codnom === '1101') {
            fecha1 = data[0].detalle[0].fecreingper
            fecha2 = data[0].detalle[0].fecingper
          }
          else if (data[0].codnom === '1101' && data[1].codnom === '1401') {
            fecha1 = data[0].detalle[0].fecingper
            fecha2 = data[0].detalle[0].fecreingper
          }
          else if (data[0].codnom === '1401' && data[1].codnom === '2101') {
            fecha1 = data[0].detalle[0].fecreingper
            fecha2 = data[0].detalle[0].fecingper
          }
          else if (data[0].codnom === '2101' && data[1].codnom === '1401') {
            fecha1 = data[0].detalle[0].fecingper
            fecha2 = data[0].detalle[0].fecreingper
          }
          else {
            fecha1 = data[0].detalle[0].fecingper
            fecha2 = data[0].detalle[0].fecreingper
          }
        // Evaluacion
          if (data[0].codnom === '0301' || data[1].codnom === '0301') {
            if (data[0].detalle[0].obsegrper === '' || data[1].detalle[0].obsegrper === '') {
              this.adv.show = true
              this.adv.msj = 'Usted presenta errores en su número de resolucion, comuniquese al siguiente numero 0264-2415704, o dirijase a la Dirección de Recursos Humanos'
            }
          }

          if (fecha1 === '1900-01-01' || fecha2 === '1900-01-01') {
            this.adv.show = true
            this.adv.msj = 'Usted presenta errores en su fecha de ingreso o jubilación en caso de ser jubilado, comuniquese al siguiente numero 0264-2415704, o dirijase a la Dirección de Recursos Humanos'
          }
        }
        else {
          if (data[0].codnom === '0301') {
            fecha1 = data[0].detalle[0].fecjubper
          }
          else {
            fecha1 = data[0].detalle[0].fecingper
          }

        //
          if (data[0].codnom === '0301') {
            if (data[0].detalle[0].obsegrper === '') {
              this.adv.show = true
              this.adv.msj = 'Usted presenta errores en su <b>número de resolucion</b>, comuniquese al siguiente numero 0264-2415704, o dirijase a la Dirección de Recursos Humanos'
            }
          }

          if (fecha1 === '1900-01-01') {
            this.adv.show = true
            this.adv.msj = 'Usted presenta errores en su fecha de ingreso o jubilación en caso de ser jubilado, comuniquese al siguiente numero 0264-2415704, o dirijase a la Dirección de Recursos Humanos'
          }
          // Loading.hide()
        }

        for (var i = 0; i < data.length; i++) {
          let detalle = data[i].detalle[0]
          if (data.length > 1) {
            if (i === 0) {
              fecing = fecha1
            }
            else {
              fecing = fecha2
            }
          }
          else {
            fecing = fecha1
          }

          this.constancia.nominas.push({codnom: data[i].codnom,
            desnom: data[i].desnom,
            fecing: fecing,
            cargo: detalle.cargo,
            dedicacion: detalle.dedicacion,
            tipper: detalle.tipper,
            sueldo_integral: detalle.sueldo_integral,
            sueldo_base: detalle.sueldo_base,
            numexpper: detalle.obsegrper,
            esjubnue: detalle.esjubnue})
        }

        Loading.hide()
      })
    },
    getBancos () {
      this.$http.get('api/constancia/bancosPaises').then(response => {
        for (let i = 0; i < response.body.bancos.length; i++) {
          this.bancos.push({
            label: response.body.bancos[i].nombanco,
            value: response.body.bancos[i].nombanco
          })
        }
        for (let i = 0; i < response.body.paises.length; i++) {
          this.paises.push({
            label: response.body.paises[i].nompai,
            value: response.body.paises[i].nompai
          })
        }
      })
    },
    generarConstancia () {
      let dira = ''
      let para = ''
      if (this.banco) {
        dira = this.banco_select
        para = 'da_ban'
      }
      else if (this.embajada) {
        dira = this.embajada_select
        para = 'da_emb'
      }
      else if (this.otro) {
        dira = this.otro_select
        para = 'da_otr'
      }
      else if (this.cadivi) {
        dira = 'CENCOEX'
        para = 'da_cad'
      }
      else {
        dira = ''
        para = ''
      }
      // Tipo de Sueldo
      let sueldo = ''
      if (this.tipo_sueldo.ss) {
        sueldo = 'men_ss'
      }
      else if (this.tipo_sueldo.sb) {
        sueldo = 'men_sb'
      }
      else {
        sueldo = 'men_si'
      }
      Loading.show({
        message: 'Generando la cosntancia, espere por favor...'
      })
      // Pasando los datos para generar la consancia
      this.$http.post('api/constancia', {constancia: this.constancia, dira: dira, para: para, tipo_sueldo: sueldo}).then(response => {
        this.printConstancia.content = response.body.cadena
        document.getElementById('content').innerHTML += response.body.cadena
        this.printConstancia.oficio = response.body.oficio
        this.printConstancia.dia = response.body.dia
        this.printConstancia.id = response.body.id
        Loading.hide()
      })
      this.finished = true
    },
    getPdf () {
      let dira = ''
      let para = ''
      if (this.banco) {
        dira = this.banco_select
        para = 'da_ban'
      }
      else if (this.embajada) {
        dira = this.embajada_select
        para = 'da_emb'
      }
      else if (this.otro) {
        dira = this.otro_select
        para = 'da_otr'
      }
      else if (this.cadivi) {
        dira = 'CENCOEX'
        para = 'da_cad'
      }
      else {
        dira = ''
        para = ''
      }
      // Generando pdf
      Loading.show({
        message: 'Descargando constancia en formato pdf, espere por favor...'
      })
      this.$http.post('api/constancia/pdf', {data: this.printConstancia, dira: dira, para: para, encabezado: this.constancia.encabezado}, {responseType: 'arraybuffer'}).then(function (response) {
        // let headers = response.headers
        let blob = new Blob([response.data], {type: response.bodyBlob.type})
        let link = document.createElement('a')
        document.body.appendChild(link)
        link.href = window.URL.createObjectURL(blob)
        link.download = 'Constancia.pdf'
        link.click()
        document.body.removeChild(link)
        Loading.hide()
      })
    },
    getPdfMail () {
      let dira = ''
      let para = ''
      if (this.banco) {
        dira = this.banco_select
        para = 'da_ban'
      }
      else if (this.embajada) {
        dira = this.embajada_select
        para = 'da_emb'
      }
      else if (this.otro) {
        dira = this.otro_select
        para = 'da_otr'
      }
      else if (this.cadivi) {
        dira = 'CENCOEX'
        para = 'da_cad'
      }
      else {
        dira = ''
        para = ''
      }
      // Generando pdf
      /* Loading.show({
        message: 'Enviando su constancia a su correo, espere por favor...'
      }) */
      // eslint-disable-next-line
      this.$http.post('api/constancia/pdfmail', {data: this.printConstancia, dira: dira, para: para, encabezado: this.constancia.encabezado }, {responseType: 'arraybuffer'}).then(function (response) {
        // let headers = response.headers
        this.$refs.correo.close()
        Loading.hide()
      })

      Toast.create.positive({
        html: 'Su constancia sera enviada a su correo en breves minutos!'
      })
      this.$refs.correo.close()
    },
    finish () {
      this.finished = true
    },
    reset () {
      this.$refs.stepper.reset()
      this.finished = false
    },
    actDatos () {
      let password = ''
      this.$http.post('api/usuarios/cambiarClave', {password: password, email: this.email}).then(response => {
        if (response.body.save === true) {
          this.auth.user.profile.email = this.email
          this.change = false
          Toast.create.positive({
            html: 'Sus correo fue actualizado exitosamente, puede proceder a enviar su constancia'
          })
        }
        else {
          Toast.create.negative({
            html: 'Ocurrio un error al actualizar su correo'
          })
        }
      })
    }
  }
}
</script>

<style>
.sub{
  color: #2c3e50;
  font-size: 13px;
}
.nomina{
  background-color: red;
}

.warning{
  font-size: 50px;
  color: #d35400;
  text-align: right;
}
</style>
