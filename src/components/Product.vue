<template>
    <div>
        <v-row v-if="check">
            <v-col style="background-color:#F5F5F5;text-align:center;margin-top:25px;margin-bottom:25px">
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
                        <p class="textOfCard">Price: <span>{{productDetails.data.product.productPrice}}</span></p>
                        <p class="textOfCard">Details:</p>
                        <p class="textOfCard">Description: <span>{{productDetails.data.product.productDescription}}</span></p>
                        <p class="textOfCard">Rating: <v-rating v-model="productDetails.data.product.productRating"></v-rating></p>
                        <p v-for="(value,name) in productDetails.data.product.productAttributes" :key="name"
                        class="textOfCard">
                            {{name}}:{{value}}
                        </p>
                    </v-col>
                    <v-col lg="6" v-if="productDetails.data.merchantList">
                        Sellers:
                        <v-row v-for="(item,n) in productDetails.data.merchantList" :key="n">
                            <v-col lg="2">
                                <input type="radio" name="merchant" :value="item.merchantId" v-model="merchantId"
                                  id="stylingRadio"
                                >
                            </v-col>
                            <v-col>
                                <p>{{item.merchantName}}</p>
                                <p>{{item.productPrice}}</p>
                            </v-col>
                        </v-row>
                        {{merchantId}}
                    </v-col>
                </v-row>
                <v-row style="margin-top:15px">
                    <v-col lg="2">
                        <p class="textOfCard">
                            Select Quantity:
                        </p>
                    </v-col>
                    <v-col>
                        <select class="classic">
                            <option v-for="(item,n) in items" 
                            :key="n">
                                <div>{{item}}</div>
                            </option>
                        </select>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-row lg="10"></v-row>
            <v-col lg="2">
                <v-btn :disabled="merchantId==''" color="#E75A34" @click="addToCart">
                        <span style="color:white" >Add To Cart</span>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import axios from 'axios'
    export default{
        data: function(){
           return{
             merchantId: '',
             quantity:1,
             productDetails: {},
             items: ['1','2','3','4','5','6','7','8','9','10'],
           }
        },
        methods:{
            addToCart(){
                let payload = {
                    cartDtoList:[
                        {
                            customerId: 'cus1',
                            productId: this.$route.params.productId,
                            merchantId: this.merchantId,
                            quantityBrought: this.quantity
                        }
                    ]
                }
                axios({
                    url: 'http://10.177.69.50:8762/spring-cloud-eureka-client-cartandorder/cart/',
                    method: 'post',
                    data: payload.cartDtoList

                }).then(function(response){
                    window.console.log(response)
                })
                .catch(function(error){
                    window.console.log(error)
                })
            }
        },
        created(){
            let that = this;
            axios.get(`http://10.177.69.50:8762/spring-cloud-eureka-client-product/product/getProductDetails/${this.$route.params.productId}`)
            .then(function(response){
                // window.console.log(response.data)
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
   select {
  /* styling */
  background-color: white;
  border: thin solid black;
  border-radius: 4px;
  display: inline;
  line-height: 1.5em;
  padding: 0.5em 3em 0.5em 0.5em;
  /* margin-top: 10px; */
}
select.classic {
  background-image:
    linear-gradient(45deg, transparent 50%, black 50%),
    linear-gradient(135deg, grey 50%, transparent 50%),
    linear-gradient(to right, lightgrey, lightgrey);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    100% 0;
  background-size:
    5px 5px,
    5px 5px,
    2.5em 2.5em;
  background-repeat: no-repeat;
}
.textOfCard{
    padding: 5px
}
</style>