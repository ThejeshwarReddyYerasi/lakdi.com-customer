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
    created(){
        window.console.log(this.$route.query.searchString);
    }
}
</script>