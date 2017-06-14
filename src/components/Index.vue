<template>
  <div>
    <div class="layout-padding">
      <img src="~assets/portal.png" style="width: 100%">
      <p class="light-paragraph">
        Estimado trabajador(a) en esta versión movil de Recursos Humanos usted podrá acceder los servicios que se muestran en la parte inferior; puede generar constancias de trabajo y revisar sus recibos de pago desde la comodidad de su teléfono inteligente.</p>
      <div class="card">
        <div class="card-title  bg-primary text-white">
          Servicios
        </div>
        <div class="list item-delimiter">
          <router-link tag="div" to="/constancia" class="item item-link">
            <i class="item-primary">description</i>
            <div class="item-content has-secondary">
              Constancia
            </div>
            <i class="item-secondary">keyboard_arrow_right</i>
          </router-link>
          <router-link tag="div" to="/recibos/2017" class="item item-link">
            <i class="item-primary">attach_money</i>
            <div class="item-content has-secondary">
              Recibos de pago 2017
            </div>
            <i class="item-secondary">keyboard_arrow_right</i>
          </router-link>
          <router-link tag="div" to="/recibos/2016" class="item item-link">
            <i class="item-primary">attach_money</i>
            <div class="item-content has-secondary">
              Recibos de pago 2016
            </div>
            <i class="item-secondary">keyboard_arrow_right</i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>
</style>
