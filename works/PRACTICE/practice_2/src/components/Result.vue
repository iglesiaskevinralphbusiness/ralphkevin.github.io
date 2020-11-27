<template>
    <div>
        <p>Counter is: {{ doubleCounter }}</p>
        <p>Total: {{ stringCounter }}</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'; //add this

    export default {
        computed: {
            ...mapGetters([  //use this
                'doubleCounter',
                'stringCounter',
            ])
        }
    }
</script>