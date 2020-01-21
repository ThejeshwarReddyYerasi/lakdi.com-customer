<template>
    <div>
        {{getCategory}}
        <v-container>
            <v-row>
                <v-col lg="4" v-for="(item,i) in productList" :key="i" class="mt-3">
                    <div class="elevation:3">
                        <v-img
                      :src="item.image"
                      max-height="300"
                      max-width="250"
                      :contain="true"
                    >
                    </v-img>
                    <div >
                        <p>{{item.productName}}</p>
                        <p>price: <span>{{item.price}}</span></p>
                        <p>seller: <span>{{item.merchantName}}</span></p>
                        <v-rating v-model="item.rating"></v-rating>
                    </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default{
    data: function(){
        return{
            productList:[
                {
                    productName:'product name',
                    productId: 123,
                    image:'https://ii1.pepperfry.com/media/wysiwyg/banners/02_web_ns_Furniture_30122019.jpg',
                    price:124,
                    merchantName:'merchant name',
                    rating:3,
                    merchantId:432
                },
                {
                    productName:'product name',
                    productId: 123,
                    image:'https://ii1.pepperfry.com/media/wysiwyg/banners/02_web_ns_Furniture_30122019.jpg',
                    price:124,
                    merchantName:'merchant name',
                    rating:4,
                    merchantId:432
                },
                {
                    productName:'product name',
                    productId: 123,
                    image:'https://ii1.pepperfry.com/media/wysiwyg/banners/02_web_ns_Furniture_30122019.jpg',
                    price:124,
                    merchantName:'merchant name',
                    rating:2,
                    merchantId:432
                },
                {
                    productName:'product name',
                    productId: 123,
                    image:'https://ii1.pepperfry.com/media/wysiwyg/banners/02_web_ns_Furniture_30122019.jpg',
                    price:124,
                    merchantName:'merchant name',
                    rating:1,
                    merchantId:432
                },
                {
                    productName:'product name',
                    productId: 123,
                    image:'https://ii1.pepperfry.com/media/wysiwyg/banners/02_web_ns_Furniture_30122019.jpg',
                    price:124,
                    merchantName:'merchant name',
                    rating:4,
                    merchantId:432
                },
                {
                    productName:'product name',
                    productId: 123,
                    image:'https://ii1.pepperfry.com/media/wysiwyg/banners/02_web_ns_Furniture_30122019.jpg',
                    price:124,
                    merchantName:'merchant name',
                    rating:2,
                    merchantId:432
                }
                
            ]
        }
    },
    computed:{
        getCategory() {
            return this.$store.state.category;
        }
    },
    created(){
        this.$store.dispatch('updateCategory',this.$route.query.category);
    }
}
</script>