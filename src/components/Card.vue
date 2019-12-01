<template>
    <div class="card border position-absolute order" style="background-image:url('vue.jpg'); background-size:400px 267px"
    @mouseover="hover = true" @mouseleave="hover = false" @click="isClicked" :class="[{ active: hover}, { clicked: click}]" :style="cssVars">
        <div class="card-body">
            <h4 class="card-title text-center mb-5 text-white">Zone {{ room.zone }}</h4>
            <h6 class="card-subtitle mb-2 text-center text-white">Name: {{ room.name}}</h6>
            <h6 class="card-subtitle mb-2 text-center text-white">Address: {{ room.address}}</h6>
      </div>
    </div>
</template>


<script>
export default {
  props: ['room'],

  mounted() {
      
        },
        data() {
            return {
              hover: false,
              click: false
            }
        },
        computed: {
          cssVars() {
            return {
                '--left': ((this.room.id-1) % 5) * 20 + '%',
                '--top': (parseInt((this.room.id-1)/5) * 1) * 12 + 'em', 
                '--width': '18%',
                '--height': '10em',
          }
        }},
        methods:{
          isClicked(){
            this.$emit('clicked', this.room)
            this.hover = false;
            this.click = !this.click;
          }
        }
}
</script>

<style>

.order{
  left: var(--left);
  top: var(--top);
  width: var(--width);
  height: var(--height);
}

.active{
  width: calc(18% + 4%) !important;
  height: calc(10em + 4em) !important;
  margin-left: -2%;
  margin-right: 2%;
  margin-top: -2em;
  margin-bottom: 2em;
  z-index: 1 !important;
  -webkit-box-shadow: 10px 10px 10px rgb(0,0,0);
  -moz-box-shadow: 10px 10px 10px rgb(0,0,0);
  transition: 1s;
  cursor: pointer;
}

.clicked{
  color: red;
}
</style>
