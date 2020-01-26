<template>
    <div>
        <v-row>
            <v-col style="background-color:#F5F5F5;text-align:center;margin-top:25px;margin-bottom:25px">
                {{productDetails.productName}}
            </v-col>
        </v-row>
        <v-row align="center" >
            <v-col lg="6" class="center">
                <v-img style="margin:auto"
                :src="productDetails.imageUrl"
                max-height="400"
                max-width="450"
                :contain="true"
                >         
                </v-img>
            </v-col>
            <v-col lg="6">
                <v-row>
                    <v-col lg="6">
                        <p class="textOfCard">Price: <span>{{productDetails.productPrice}}</span></p>
                        <p class="textOfCard">Details:</p>
                        <p class="textOfCard">Description: <span>{{productDetails.productDescription}}</span></p>
                        <p class="textOfCard">Rating: <v-rating v-model="productDetails.productRating" :readonly="true"></v-rating></p>
                        <p v-for="(value,name) in productDetails.productAttributes" :key="name"
                        class="textOfCard">
                            {{name}}:{{value}}
                        </p>
                    </v-col>
                    <v-col lg="6" v-if="merchantList">
                        Sellers:
                        <v-row v-for="(item,n) in merchantList" :key="n">
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
                        <select class="classic" v-model="quantity">
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
            <v-col lg="10">
                <p style="padding-bottom:5px">Customer Reviews:</p>
                <v-card style="display:inline-block;width:400px;margin:10px;border: 1px solid black;padding:5px"
                    v-for="(item,n) in reviewDetails" :key="n"
                >
                    <p>rating: <v-rating v-model="item.rating" :readonly="true"></v-rating></p>
                    <p>review:<span>{{item.review}}</span></p>
                </v-card>
            </v-col>
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
             errorCode: false,
             productDetails: {
                 productId:'',
                 categoryId:'',
                 productName:'',
                 imageUrl:'',
                 productAttributes:{},
                 productPrice:'',
                 productRating:0,
                 productDescription:''
             },
             merchantList:[],
            //  merchantList
             reviewDetails:{},
             items: ['1','2','3','4','5','6','7','8','9','10'],
           }
        },
        methods:{
            getFromsSearch(){
                axios.get(`/backend/search/get/${this.$route.params.productId}`)
                .then(function(response){
                this.productDetails.productId = response.data.data.product.productId
                this.productDetails.productName =  response.data.data.product.productName
                this.productDetails.categoryId =  response.data.data.product.categoryId
                this.productDetails.imageUrl =  response.data.data.product.imageUrl
                this.productDetails.productAttributes =  response.data.data.product.productAttributes
                this.productDetails.productPrice =  response.data.data.product.productPrice
                this.productDetails.productRating =  response.data.data.product.productRating
                this.productDetails.productDescription =  response.data.data.product.productDescription

                this.merchantList = response.data.data.merchantList

                    window.console.log(this.productDetails)
                    // that.productDetails = response.data
            })
            },
            addToCart(){
                let that = this
                if(localStorage.getItem('user-token')==null){
                    let payload = {
                        productId: this.$route.params.productId,
                        merchantId: this.merchantId,
                        quantityBrought: this.quantity,
                        productName: this.productDetails.productName,
                        imageUrl: this.productDetails.imageUrl,
                        productPrice: this.productDetails.productPrice
                    }
                    if(localStorage.getItem('cartDtoList')==null){
                        var temp = {customerId:'',cartDtoList:[]};
                        temp.cartDtoList.push(payload)
                        localStorage.setItem("cartDtoList", JSON.stringify(temp));
                    }else{
                        var cartDtoList =JSON.parse(localStorage.getItem('cartDtoList'));
                        cartDtoList.cartDtoList.push(payload);
                        localStorage.setItem("cartDtoList", JSON.stringify(cartDtoList));
                    }

                }else{
                    let payload = {
                        customerId: '',
                        cartDtoList:[
                            {
                                productId: this.$route.params.productId,
                                merchantId: this.merchantId,
                                quantityBrought: this.quantity
                            }
                        ]
                    }
                    window.console.log(payload)
                    axios({
                        url: '/backend/cartandorder/cart',
                        method: 'post',
                        data: payload,
                        headers: {token:localStorage.getItem('user-token')}

                    }).then(function(response){
                        window.console.log(response)
                        that.$router.push({path:'/cart'})
                    })
                    .catch(function(error){
                        window.console.log(error)
                    })
                }
            }
        },
        created(){
            let that = this;
            axios.get(`/backend/product/getProductDetails/${this.$route.params.productId}`)
            .then(function(response){
                that.productDetails.productId = response.data.data.product.productId
                that.productDetails.productName =  response.data.data.product.productName
                that.productDetails.categoryId =  response.data.data.product.categoryId
                that.productDetails.imageUrl =  response.data.data.product.imageUrl
                that.productDetails.productAttributes =  response.data.data.product.productAttributes
                that.productDetails.productPrice =  response.data.data.product.productPrice
                that.productDetails.productRating =  response.data.data.product.productRating
                that.productDetails.productDescription =  response.data.data.product.productDescription

                that.merchantList = response.data.data.merchantList
                window.console.log(that.productDetails)

                if(response.data.success==false){
                    that.getFromsSearch();
                }
            }).catch(function(err){
                that.getFromsSearch();
                window.console.log(err);
            })
            axios.get(`/backend/review/get/${this.$route.params.productId}`)
            .then(function(response){
                that.reviewDetails = response.data.data
            })
            
        },
        computed:{
            check(){
                if(this.productDetails.success==true){
                return true;
                }
                else{
                    return false
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