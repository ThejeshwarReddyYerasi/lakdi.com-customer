<template>
    <div>
        {{getSearch}}

    </div>
</template>
<script>
export default{
    data:function(){
        return{
            
        }
    },
    computed:{
        getSearch(){
            return this.$store.state.productListForSearch;
        }
    },
}
</script>