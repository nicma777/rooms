<template>
    <div>
      <div class="container text-white mt-5">
        <strong class="text-uppercase">Količina karbon monoksida u Rijeci:  {{ air.results[0].value }} µg/m³</strong>
      </div>
  
      <Sidebar></Sidebar>

        <div class="container mt-5">
          <div class="row position-relative dim">
              <Card v-for="item in controllersList" v-bind:key="item.id" v-bind:room="item" @clicked="activeRoom"></Card>
          </div>
  
          <transition name="fade">
            <div class="container" v-if="active_room">
                <CardDetails :room="active_room"></CardDetails>
  
          <button v-on:click="active_room = null" type="button" class="close text-white" aria-label="Close" style="margin-top: -300px; margin-right: 450px; font-size: 40px;">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
          </transition>
  
  
        </div>  
    </div>
  </template>
  
  <script>
import Card from '@/components/Card'
import CardDetails from './CardDetails'
import Sidebar from '@/components/Sidebar'
  
  export default {
    name: 'home',
    components: {
        Card,
        CardDetails,
        Sidebar
    },
    mounted() {
        this.getRooms();
        this.getAirQuality();
          },
          data() {
              return {
                  proxyurl: "https://cors-anywhere.herokuapp.com/",
                  rooms: {},
                  controllersList: [],
                  active_room: null,
                  air: null,
                  swaped: true,
              }
          },
          computed:{
  
          },
  
          methods:{
            activeRoom(value){
              this.active_room = value;
            },
              getRooms(){
                  this.$axios
                      .get(this.proxyurl + "http://ae.hr/rooms_status.json")
                      .then(response => {
                          this.rooms = response.data;
                          this.rooms['controllers'].forEach(element => {
                            this.controllersList.push(element);
                          });
                      })  
              },
              getAirQuality(){
                this.$axios
                      .get("https://api.openaq.org/v1/measurements?city=Primorsko-goranska&limit=1&parameter=co")
                      .then(response => {
                        this.air = response.data;
                      });
              },

          }
  }
  </script>
  
  <style>
  .dim{
    height: 400px;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.8s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  </style>
  