<template>
    <div>
        <v-row>
            <v-col style="background-color:#F5F5F5;text-align:center">
                {{productDetails.productName}}
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col lg="6" class="center">
                <v-img style="margin:auto"
                :src="productDetails.image"
                max-height="500"
                max-width="450"
                >
                   
                </v-img>
            </v-col>
            <v-col lg="6">
                <v-row>
                    <v-col lg="6">
                        <p>Price: <span>{{productDetails.price}}</span></p>
                        <p>Details:</p>
                        <p>Brand: <span>{{productDetails.brand}}</span></p>
                        <p>Material: <span>{{productDetails.material}}</span></p>
                        <p>Color: <span>{{productDetails.color}}</span></p>
                        <p>Description: <span>{{productDetails.description}}</span></p>
                        <p>Rating: <v-rating v-model="productDetails.productRating"></v-rating></p>
                        <p v-for="(value,name) in productDetails.attributes" :key="name">
                            {{name}}:{{value}}
                        </p>
                    </v-col>
                    <v-col lg="6">
                        By Other Sellers:
                        <div v-for="(item,i) in productDetails.otherMerchants" :key="i">
                            <p>merchant name: <span>{{item.merchantName}}</span></p>
                            <p>price: <span>{{item.price}}</span></p>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="d-flex" cols="12" sm="6">
                        <v-select
                            :items="it"
                            label="Outlined style"
                            dense
                            outlined
                        ></v-select>
                    </v-col>
                    <v-col>
                        <v-btn color="#E75A34" @click="addToCart"><span style="color:white">Add To Cart</span></v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>
<script>
    export default{
        data: function(){
           return{
             it: ['Foo', 'Bar', 'Fizz', 'Buzz'],
             productDetails:{
               productName:'product name',
               productId: '',
               merchantName: 'merchant name',
               merchantId: '',
               price:1123,
               description:'description',
               image:'https://ii1.pepperfry.com/media/catalog/product/y/u/494x544/yukio-4-door-wardrobe-in-walnut-finish-by-mintwud-yukio-4-door-wardrobe-in-walnut-finish-by-mintwud-4znggr.jpg',
               attributes:{
                   attribute1: 'gh',
                   attribute2: 'ftyughi',
                   attribute3: 'tfyguhij'
               },
               brand:'godrej',
               material:'leather',
               color: 'red',
               productRating:3,
               otherMerchants:[
                  {
                      merchantName:'merchant name',
                      merchantId: 123,
                      price: 1234
                  },
                  {
                      merchantName:'merchant name',
                      merchantId: 123,
                      price: 1234
                  },
                  {
                      merchantName:'merchant name',
                      merchantId: 123,
                      price: 1234
                  } 
               ]
             }
           }
        },
        methods:{
            addToCart(){
                window.console.log("cart")  // send data to back end
                //quantity,productId,merchantId,customerId
            }
        },
        created(){
            //get the request form backend
            this.productDetails.productId = this.$route.params.productId,
            this.productDetails.merchantId = this.$route.params.merchantId
        }
    }
</script>
<style scoped>
   .btn{
     background-color: #E75A34
   }
   #option{
       border:1px solid black;
       height: 40px;
       width: 60px;
       text-align: center
   }
</style>