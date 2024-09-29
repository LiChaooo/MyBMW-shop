<template>
<div>
    <div class="originalfit">
        <img src="../assets/imgs/originalfit.jpg" class="banner">
    </div>
    <ListSort/>
    <div class="originalfit">

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
        this.$store.state.wherego=2;
        this.$store.commit('searchDataTypeMut',2);
    },
}
</script>

<style scoped>
.originalfit{
    margin: 0 100px;
    min-width: 1200px;
    background: pink
}
.banner{
    width: 100%;
}
</style>