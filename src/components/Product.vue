<template>
    <div>
        <v-row v-if="check">
            <v-col style="background-color:#F5F5F5;text-align:center">
                {{productDetails.data.product.productName}}
            </v-col>
        </v-row>
        <v-row align="center" v-if="check">
            <v-col lg="6" class="center">
                <v-img style="margin:auto"
                :src="productDetails.data.product.imageUrl"
                max-height="500"
                max-width="450"
                >         
                </v-img>
            </v-col>
            <v-col lg="6">
                <v-row>
                    <v-col lg="6">
                        <p>Price: <span>{{productDetails.data.product.productPrice}}</span></p>
                        <p>Details:</p>
                        <p>Description: <span>{{productDetails.data.product.productDescription}}</span></p>
                        <p>Rating: <v-rating v-model="productDetails.data.product.productRating"></v-rating></p>
                        <p v-for="(value,name) in productDetails.data.product.productAttributes" :key="name">
                            {{name}}:{{value}}
                        </p>
                    </v-col>
                    <v-col lg="6" v-if="productDetails.data.merchantList">
                        Sellers:
                        <v-row v-for="(item,n) in productDetails.data.merchantList" :key="n">
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
                        <!-- <input type="number" id="orderInput" min="1" value="1" v-model="quantity"> -->
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
            axios.get(`http://10.177.68.26:8080/product/getProductDetails/${this.$route.params.productId}`)
            .then(function(response){
                window.console.log(response.data)
                that.productDetails = response.data
            }).catch(function(err){
                window.console.log(err);
            })
        },
        computed:{
            check(){
                if(Object.keys(this.productDetails)<1){
                return false;
                }
                else{
                    return true
                }
            }
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
   #orderInput{
       height:40px;
       width: 40px;
       border: 0.8px solid black;
       text-align: center
   }
</style>