<template>
  <div class="home">
     <v-row>
      <v-col lg="8" sm="12" style="margin:auto">
        <v-carousel hide-delimiters :cycle="true" :continuous="true" :show-arrows="false" :show-arrows-on-hover="true"
         height="400"
        >
          <v-carousel-item
            v-for="(item,n) in getCategoriesListObject.data"
            :key="n"
            :src="item.categoryImageUrl"
            @click.stop="getProductsOfParticularCategory(item.categoryId)"
          ></v-carousel-item>
        </v-carousel>
       </v-col>
     </v-row>
      <v-row style="margin-top:15px">
        <v-col lg="4" style="margin:auto;text-align:center">
          WHAT'S POPULAR IN FURNITURE
        </v-col>
      </v-row>
      <v-row>
          <v-col v-for="(item,n) in recommendations.data" 
            :key="n"
            lg="3"
            style="margin-top:2%"
            @click="product(item.productId)"
          >
            <v-card style="margin:auto;text-align:center;max-width:300px;">
              <div style="padding-top:15px">
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
import axios from 'axios'
export default {
  data: function(){
    return {
        recommendations:''
    }
  },
  methods:{
    getProductsOfParticularCategory(categoryId){
      this.$router.push({path:'/productList',query:{categoryId:categoryId}})
    },
    product(productId){
      this.$router.push({path:`/product/${productId}`})
    }
  },
  created(){
    let that = this
    axios.get('/backend/product/recommendations')
    .then(response=>{
      // window.console.log(response.data)
      that.recommendations = response.data
    })
  },
  computed:{
    getCategoriesListObject(){
      return this.$store.state.categoryListObject;
    }
  }
}
</script>
<style scoped>
.textOfCard{
    padding: 5px
}
</style>