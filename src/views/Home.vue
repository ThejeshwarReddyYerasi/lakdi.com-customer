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
        >
          <div>
            <v-img :src="item.src"
              aspect-ratio="1"
              class="grey lighten-2"
               max-width="350"
               max-height="250">
           </v-img>
           <div style="text-align:center">
             <p>{{item.productName}}</p>
             <p>{{item.price}}</p>
              <v-rating v-model="item.ratings"></v-rating>
           </div>
          </div>
        </v-col>
      </v-row>


  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
    // HelloWorld
  },
  data: function(){
    return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
        ],
      recommendations:[
        {
          productId:123,
          productName:'name',
          src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          ratings:3,
          price:124
        },
        {
          productId:123,
          productName:'name',
          src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          ratings:3,
          price:124
        },
        {
          productId:123,
          productName:'name',
          src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          ratings:3,
          price:124
        },
        {
          productId:123,
          productName:'name',
          src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          ratings:3,
          price:124
        },
      ]
    }
  },
  methods:{
    call(i){
      window.console.log(i);
    }
  }
}
</script>
