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
import axios from 'axios'
export default {
  data: function(){
    return {
        // categoryListObject:'',
        // items: [
        //   {
        //     src: 'https://ii2.pepperfry.com/media/wysiwyg/banners/04_1012020.jpg',
        //     name: "mattress",
        //     categoryId: 1
        //   },
        //   {
        //     src: 'https://www.ulcdn.net/media/slideshow/newdelhi/RDS2020_slideshow-NCR.jpg?1579322422',
        //     name: "sofa",
        //     categoryId: 2 
        //   },
        //   {
        //     src: 'https://www.mobelhomestore.com/banner3v1_ver2.jpg',
        //     name: "table",
        //     categoryId: 3
        //   },
        //   {
        //     src: 'https://i1.wp.com/reclinerlife.com/wp-content/uploads/2018/08/3pc-recliner-set-with-5-recliners-in-black-gl08-6538-116-dallas-color-black-213.jpg?resize=641%2C350&ssl=1',
        //     name: "recliner",
        //     categoryId: 4
        //   },
        //   {
        //     src: 'https://bradsknutson.com/wp-content/uploads/2018/03/Wardrobe-Design-4-Sliding-Door-Wardrobe.jpg',
        //     name: "wardrobe",
        //     categoryId: 5
        //   },
        // ],
        recommendations:''
      // recommendations:[
      //   {
      //     productId:123,
      //     productName:'name',
      //     imageUrl:'https://ii3.pepperfry.com/media/wysiwyg/banners/01_wmyhah_web_06012020.jpg',
      //     productRatings:3,
      //     productPrice:124,
      //   },
      //   {
      //     productId:124,
      //     productName:'name',
      //     imageUrl:'https://ii2.pepperfry.com/media/wysiwyg/banners/02_fc_web_06012020.jpg',
      //     productRatings:3,
      //     productPrice:124,
      //   },
      //   {
      //     productId:122,
      //     productName:'name',
      //     imageUrl:'https://ii2.pepperfry.com/media/wysiwyg/banners/03_wpif__wap_06012020_new16.jpg',
      //     productRatings:3,
      //     productPrice:124,
      //   },
      //   {
      //     productId:1233,
      //     productName:'name',
      //     imageUrl:'https://ii1.pepperfry.com/media/wysiwyg/banners/05_wpif_web_06012020.jpg',
      //     productRatings:3,
      //     productPrice:124,
      //   },
      // ]
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
    axios.get('http://10.177.68.26:8111/product/recommendations').then(response=>{
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