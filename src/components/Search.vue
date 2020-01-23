<template>
    <div>
        <v-row>
            <v-col v-for="(item,n) in productListForSearch" 
              :key="n"
              lg="3"
              style="margin-top:2%"
            >
                <v-card style="margin:auto;text-align:center;max-width:300px">
                    <div>
                        <div style="margin:auto;width:300px">
                            <v-img :src="item.imageUrl"
                            :max-height="300"
                            :max-width="250"
                            :contain="true"
                            style="margin:auto"
                            >
                            </v-img>
                        </div>
                        <div style="text-align:left;margin-left:20px;margin-top:10px">
                          <p class="textOfCard"><span>{{item.productName}}</span></p>
                          <p class="textOfCard"><span>Price:</span> {{item.productPrice}}</p>
                          <p v-for="(value,name) in item.productAttributes" :key="name"
                          class="textOfCard">
                              {{name}} : {{value}}
                          </p>
                          <p class="textOfCard" style="text-align:center">
                              <v-rating v-model="item.productRating"></v-rating>
                              </p>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default{
    data:function(){
        return{
            
        }
    },
    computed:{
        productListForSearch(){
            return this.$store.state.productListForSearch;
        },
        getRoute(){
            return this.$route.query.searchString
        }
    },
    created(){
        // window.console.log(this.$route.query.searchString);
        this.$store.dispatch('search',this.$route.query.searchString);
    },
    watch: {
      getRoute: function(){
        this.$store.dispatch('search',this.$route.query.searchString);
      }
    }
}
</script>
<style scoped>
.textOfCard{
    padding: 5px
}
</style>