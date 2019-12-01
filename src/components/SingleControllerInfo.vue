<template>
<div>

    <Sidebar></Sidebar>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Type</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">MqttTopic</th>
                <th scope="col">DefaultValue</th>
                <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in props" v-bind:key="item.id">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.type }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.mqttTopic }}</td>
                    <td>{{ item.defaultValue }}</td>
                    <td>{{ item.Value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import Sidebar from '@/components/Sidebar'


export default{
    name :'SingleControllerInfo',
    components: {
        Sidebar
    },
    computed:{
        props: function() {
            return this.$route.query.item.properties
        }
    }
}
</script>


<style>

</style>
