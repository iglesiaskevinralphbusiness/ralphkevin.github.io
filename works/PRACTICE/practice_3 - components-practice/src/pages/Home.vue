<template>
    <div class="container">
        <cmp-header></cmp-header>
        <hr>
        <div class="row">
            <cmp-items></cmp-items>
            <div class="col-xs-12 col-sm-6">
                <p>Server Details are currently not updated</p>
            </div>
        </div>
        <hr>
        <cmp-footer></cmp-footer>
    </div>
</template>

<script>
    import Item from '../components/Item.vue';

    export default {
        components: {
            'cmp-items': Item
        }
    }
</script>