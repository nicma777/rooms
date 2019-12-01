<template>
    <div class="float-left pt-5 pl-5" style="height: 500px; width: 250px;">
        <router-link class="btn btn-light mb-2 d-block" v-for="item in controllersList" v-bind:key="item.id" 
        v-bind:to="{ path: '/info/'+item.zone, query: { item }}">{{ item.name }}</router-link>
        <router-link class="btn btn-light mb-2 d-block"
        v-bind:to="{ path: '/'}">Home</router-link>
        <p class="text-white">Next holiday in Croatia is : {{ next_holiday }}</p>
    </div>
</template>

<script>
export default{
    mounted(){
        this.getRooms()
        this.getHoliday();
    },
    data(){
        return {
            proxyurl: "https://cors-anywhere.herokuapp.com/",
            rooms: {},
            controllersList: [],
            holiday_key: "f0bbf23643ce3fb936eb7e758f3c27427fcb3358", //.env 
            next_holiday: ""
        }
    },
    methods:{
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
        getHoliday(){
            let date = new Date();
            let year = date.getFullYear();
            this.$axios
                .get("https://calendarific.com/api/v2/holidays" + "?&api_key=" + this.holiday_key +"&country=HR&year=" + year)
                .then(response => {
                    response.data.response.holidays.some(element => {
                        if(Date.parse(element.date.iso) > Date.parse(date)){
                            this.next_holiday = element.name
                            return true
                        }
                        
                    })
                })
        }
    }

}
</script>


<style>

</style>