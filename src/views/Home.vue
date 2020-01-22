<template>
  <div class="home">
     <v-row>
      <v-col lg="2"></v-col>
      <v-col lg="8" class="mx-auto">
        <v-carousel hide-delimiters :cycle="true" :continuous="true" :show-arrows="false" :show-arrows-on-hover="true"
         height="400"
        >
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            @click.stop="call(i)"
          ></v-carousel-item>
        </v-carousel>
       </v-col>
       <v-col lg="2"></v-col>
     </v-row>
     <br>
      <div>
        <v-col lg="4" style="margin:auto;text-align:center">
          WHAT'S POPULAR IN FURNITURE
        </v-col>
      </div>
      <v-row style="padding:25px">
        <v-col v-for="(item,i) in recommendations"
          :key="i"
          lg="3"
          @click="product(item.productId)"
          >
          <div>
            <v-img :src="item.imageUrl"
              aspect-ratio="1"
              class="grey lighten-2"
               max-width="350"
               max-height="250"
               :content="true">
           </v-img>
           <div style="text-align:center">
             <p>{{item.productName}}</p>
             <p>{{item.productPrice}}</p>
              <v-rating v-model="item.productRatings"></v-rating>
              <!-- <p>{{item.merchantName}}</p> -->
           </div>
          </div>
        </v-col>
      </v-row>


  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function(){
    return {
        items: [
          {
            src: 'https://ii2.pepperfry.com/media/wysiwyg/banners/04_1012020.jpg',
            name: "mattress",
            categoryId: 1
          },
          {
            src: 'https://www.ulcdn.net/media/slideshow/newdelhi/RDS2020_slideshow-NCR.jpg?1579322422',
            name: "sofa",
            categoryId: 2 
          },
          {
            src: 'https://www.mobelhomestore.com/banner3v1_ver2.jpg',
            name: "table",
            categoryId: 3
          },
          {
            src: 'https://i1.wp.com/reclinerlife.com/wp-content/uploads/2018/08/3pc-recliner-set-with-5-recliners-in-black-gl08-6538-116-dallas-color-black-213.jpg?resize=641%2C350&ssl=1',
            name: "recliner",
            categoryId: 4
          },
          {
            src: 'https://bradsknutson.com/wp-content/uploads/2018/03/Wardrobe-Design-4-Sliding-Door-Wardrobe.jpg',
            name: "wardrobe",
            categoryId: 5
          },
        ],
        recommendations:[]
      // recommendations:[
      //   {
      //     productId:123,
      //     productName:'name',
      //     src:'https://ii3.pepperfry.com/media/wysiwyg/banners/01_wmyhah_web_06012020.jpg',
      //     ratings:3,
      //     price:124,
      //   },
      //   {
      //     productId:124,
      //     productName:'name',
      //     src:'https://ii2.pepperfry.com/media/wysiwyg/banners/02_fc_web_06012020.jpg',
      //     ratings:3,
      //     price:124,
      //   },
      //   {
      //     productId:122,
      //     productName:'name',
      //     src:'https://ii2.pepperfry.com/media/wysiwyg/banners/03_wpif__wap_06012020_new16.jpg',
      //     ratings:3,
      //     price:124,
      //   },
      //   {
      //     productId:1233,
      //     productName:'name',
      //     src:'https://ii1.pepperfry.com/media/wysiwyg/banners/05_wpif_web_06012020.jpg',
      //     ratings:3,
      //     price:124,
      //   },
      // ]
    }
  },
  methods:{
    call(i){
      window.console.log(i);
    },
    product(productId){
      this.$router.push({path:`/product/${productId}`})
    }
  },
  created(){
    let that = this
    axios.get('https://1b17cfc0-f477-4711-9773-a7a9339d2ff2.mock.pstmn.io/client/recommendations').then(response=>{
      window.console.log(response.data)
      that.recommendations = response.data
    })
  }
}
</script>
