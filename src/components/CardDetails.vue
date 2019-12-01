<template>
<div class="row">
    <div class="row details-dim vertical-line box" id="border">
    
        <div class="col-3 mt-5 ml-5 text-white">
            <p>Ip Address: {{ room.ipAddress}}</p>
            <p>Ip Port: {{ room.ipPort}}</p>
            <p>Name: {{ room.name}}</p>
            <p>Address: {{ room.address}}</p>
            <p>Object: {{ room.object}}</p>
        </div>

        <div class="col-6 mt-5 text-white">
            <p>Set Temperature: {{ set_temp }}</p>
            <p>Current Temperature: {{ current_temp}}</p>
            <p v-show="dnd != '0'">DND</p>
            <p v-show="deponed_card != '0'">Occupied</p>
            <button type="button" class="btn btn-light float-right" data-toggle="modal" data-target="#exampleModal">Settings</button>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Settings Values</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                                <thead>
                                    <tr>
                                        <th v-for="value in room.settings" :key="value.settingName" scope="col">{{ value.settingName }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="value in room.settings" :key="value.settingValue">{{ value.settingValue }}</td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
        </div>


    </div>

    <div class="col-3 p-5">
        <img v-bind:src="'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + this.room.name"/>
    </div>

</div>
</template>

<script>
export default{
    props: ['room'],
    watch: { 
        room: function() { // watch it
            this.room['properties'].forEach(element => {
                        if(element.id == 11)
                            element.Value = this.set_temp
                        if(element.id == 12)
                            this.current_temp = element.Value
                        if(element.id == 27)
                            this.dnd = element.Value
                        if(element.id == 48)
                            this.deponed_card = element.Value
                    });
                }
  },
    mounted(){
        this.getProps();
    },
    data(){
        return{
        set_temp: 20,
        current_temp: null,
        dnd: null,
        deponed_card: null,
        }
    },
    computed:{

    },
    methods:{
        getProps(){
            this.room['properties'].forEach(element => {
                    if(element.id == 11)
                        element.Value = this.set_temp
                    if(element.id == 12)
                        this.current_temp = element.Value
                    if(element.id == 27)
                        this.dnd = element.Value
                    if(element.id == 48)
                        this.deponed_card = element.Value
                });
        },
    }

}
</script>

<style>

#border {
    border-left: 19px solid rgb(243, 231, 231);
    border-radius: 20px 0px 0px 19px;
    border-right: 1px solid white;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
}

.details-dim{
    width: 60%;
    height: 300px;
    background-color: #f29576;
}



.row.vertical-line [class*='col-']:not(:last-child):after{
    background: #e0e0e0;
    width: 1px;
    content: "";
    display:block;
    position: absolute;
    top:0;
    bottom: 0;
    right: 0;
    min-height: 180px;
}
</style>

