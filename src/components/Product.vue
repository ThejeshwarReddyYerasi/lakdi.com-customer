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
                :src="productDetails.imageUrl"
                max-height="500"
                max-width="450"
                >
                   
                </v-img>
            </v-col>
            <v-col lg="6">
                <v-row>
                    <v-col lg="6">
                        <p>Price: <span>{{productDetails.productPrice}}</span></p>
                        <p>Details:</p>
                        <p>Description: <span>{{productDetails.productDescription}}</span></p>
                        <p>Rating: <v-rating v-model="productDetails.productRating"></v-rating></p>
                        <p v-for="(value,name) in productDetails.productAttributes" :key="name">
                            {{name}}:{{value}}
                        </p>
                    </v-col>
                    <v-col lg="6">
                        Sellers:
                        <v-row v-for="(item,n) in productDetails.merchantList" :key="n">
                            <v-col lg="2">
                                <input type="radio" name="merchant" :value="item.merchantId" v-model="radioGroup"
                                  id="stylingRadio"
                                >
                            </v-col>
                            <v-col>
                                <p>{{item.merchantName}}</p>
                                <p>{{item.productPrice}}</p>
                            </v-col>
                        </v-row>
                        {{radioGroup}}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="d-flex" cols="12" sm="6" style="text-align:right">
                        <input type="number" id="orderInput" min="1" value="1" v-model="quantity">
                    </v-col>
                    <v-col style="margin-left:20px">
                        <v-btn color="#E75A34" @click="addToCart"><span style="color:white" 
                         :disabled="radioGroup">Add To Cart</span></v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import axios from 'axios'
    export default{
        data: function(){
           return{
             radioGroup: null,
             quantity:1,
             productDetails: {}
            // productDetails:{
            //    productName:'productName',
            //    productId: 123,
            //    productPrice:1123,
            //    productDescription:'description',
            //   imageUrl:'https://ii1.pepperfry.com/media/catalog/product/y/u/494x544/yukio-4-door-wardrobe-in-walnut-finish-by-mintwud-yukio-4-door-wardrobe-in-walnut-finish-by-mintwud-4znggr.jpg',
            //    productAttributes:{
            //        attribute1: 'gh',
            //        attribute2: 'ftyughi',
            //        attribute3: 'tfyguhij'
            //    },
            //    productRating:3,
            //    merchantList:[
            //       {
            //           merchantName:'merchant name',
            //           merchantId: 1273,
            //           productPrice: 1234
            //       },
            //       {
            //           merchantName:'merchant name',
            //           merchantId: 123,
            //           productPrice: 1234
            //       }
            //    ]
            //  }
           }
        },
        methods:{
            addToCart(){
                window.console.log("cart")
                //quantity,productId,merchantId,customerId and set quantity back to 1
            }
        },
        created(){
            let that = this;
            // this.productDetails.productId = this.$route.params.productId;
            axios.get('https://1b17cfc0-f477-4711-9773-a7a9339d2ff2.mock.pstmn.io/client/product',{
                params:{
                    productId: 123
                }
            }).then(function(response){
                window.console.log(response.data)
                that.productDetails = response.data
            }).catch(function(err){
                window.console.log(err);
            })
        },
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
   #orderInput{
       height:40px;
       width: 40px;
       border: 0.8px solid black;
       text-align: center
   }
</style>