<template>
<div>
    <div class="carcare">
        <img src="../assets/imgs/car_care.jpg" class="banner">
    </div>
    <ListSort/>
    <div class="carcare">

    </div>
</div>
</template>

<script>
import ListSort from '../components/ListSort';
export default {
    components:{
        ListSort
    },
    created() {
        this.$store.state.wherego=3;
        this.$store.commit('searchDataTypeMut',3);
    },
}
</script>

<style scoped>
.carcare{
    margin: 0 100px;
    min-width: 1200px;
    background: pink
}
.banner{
    width: 100%;
}
</style>