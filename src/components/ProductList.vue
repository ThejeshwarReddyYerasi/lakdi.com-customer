<template>
    <div>
        <v-row>
        <v-col v-for="(item,n) in productListForCategory.data" 
              :key="n"
              @click="product(item.productId)"
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
                              <v-rating v-model="item.productRating" :readonly="true"></v-rating>
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
    data: function(){
        return{
        }
    },
    computed:{
        productListForCategory() {
            return this.$store.state.productListForCategory;
        },
        watchCategory(){
            return this.$route.query.categoryId
        }
    },
    methods:{
        product(productId){
            this.$router.push({path:`/product/${productId}`})
        }
    },
    created(){
        this.$store.dispatch('getProductsOfParticularCategory',this.$route.query.categoryId);
    },
    watch:{
        watchCategory: function(){
            this.$store.dispatch('getProductsOfParticularCategory',this.$route.query.categoryId);
        }
    }
}
</script>
<style scoped>
.textOfCard{
    padding: 5px
}
</style>