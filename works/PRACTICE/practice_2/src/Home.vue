<template>
    <div>
        <p>Status: {{ status }}</p>
        <button @click="changeStatus">Change Status</button>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                status: 'loaded'
            }
        },
        methods: {
            changeStatus(){
                this.status = 'changed';
            }
        }
    }
</script>