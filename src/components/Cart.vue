<template>
    <div>
        <v-container>
            <v-row>
                <v-snackbar :top="true" color="#F44336"
                :multi-line="true"
                  v-model="snackbar"
                  :timeout="2000">
                    <span style="color:white;font-size:30px">{{string}}</span>
                </v-snackbar>
            </v-row>
            <v-row>
                <v-col lg="10">
                    <p>Shopping Cart</p>
                </v-col>
                <v-col lg="2">
                    Sub Total:{{subTotalVariable}}
                </v-col>
            </v-row>
            <v-row v-if="check">
                <v-col lg="6" v-for="(item,n) in orders.data" :key="n">
                    <v-card>
                        <v-row>
                            <v-col>
                                <v-img 
                                :src="item.imageUrl"
                                max-width="250"
                                max-height="250"
                                style="margin-left:10px"
                                >
                                </v-img>
                            </v-col>
                            <v-col>
                                <p class="textOfCard"><span>{{item.productName}}</span></p>
                                <p class="textOfCard"><span>Price:</span> {{item.productPrice}}</p>
                                <div>
                                   <span style="padding-right:10px"
                                    class="textOfCard"
                                   >Quantity:</span>
                                   <select v-model="item.quantityBrought" class="classic">
                                       <option v-for="(item,n) in items" :disabled="validation" 
                                       :key="n">
                                            <div>{{item}}</div>
                                       </option>
                                   </select>
                                   <!-- <p v-else>{{item.quantityBrought}}</p> -->
                                </div>
                                <p class="textOfCard" style="margin-top:20px">Total:{{item.productPrice * item.quantityBrought}}</p>
                                <div style="margin-top:30px">
                                    <v-col class="d-flex" cols="12" sm="6">
                                        <v-btn text style="background-color:#F2CC5E"
                                          @click="removeProduct(item.productId,item.merchantId)"
                                        >
                                            Remove Product
                                        </v-btn>
                                    </v-col>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row style="margin-bottom:30px">
                <v-col lg="10"></v-col> 
                <v-col>
                    <v-btn @click="checkout" style="background-color:#F2CC5E" :disabled="orders.data.length==0">
                        Checkout                    
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'
    export default{
        data: function(){
            return{
                items: ['1','2','3','4','5','6','7','8','9','10'],
                quantity:'2',
                orders:{},
                length:'',
                subTotalVariable: '',
                snackbar:'',
                string:''
            }
        },
        methods:{
            checkout(){
                let that = this
                if(localStorage.getItem('user-token')==null){
                    this.$router.push({path:'/login'})
                }else{
                    let payload = {
                        customerId: '',
                        orderedItemDto:[]
                    }
                    for(let i =0;i<this.orders.data.length;i++){
                        let pay = {
                            productId: this.orders.data[i].productId,
                            merchantId: this.orders.data[i].merchantId,
                            quantityBrought: this.orders.data[i].quantityBrought,
                            productPrice: this.orders.data[i].productPrice
                        }
                        payload.orderedItemDto.push(pay)
                    }
                    window.console.log(payload)
                    axios({
                        url: '/backend/cartandorder/order',
                        method: 'post',
                        data: payload,
                        headers: {token:localStorage.getItem('user-token')}

                    }).then(function(response){
                        if(response.data.success==true){
                            that.$router.push({path:'/orders'})
                        }else{
                            that.string = 'checkout failed'
                            that.snackbar = true
                        }
                    })
                    .catch(function(error){
                        window.console.log(error)
                    })
                }
            },
            subTotal(){
                if(this.orders.data.length==0){
                    this.subTotalVariable = 0
                }else{
                    window.console.log("subtotal")
                    let sum = 0;
                    for(let i=0;i<this.length;i++){
                        sum = sum + this.orders.data[i].productPrice*this.orders.data[i].quantityBrought;
                    }
                    this.subTotalVariable = sum;
                }
            },
            removeProduct(productId,merchantId){
                let that  = this
                if(localStorage.getItem('user-token')==null){
                    let cartDtoList = JSON.parse(localStorage.getItem('cartDtoList'));
                    if(localStorage.getItem('user-token')==null){
                        for( var i = 0; i < cartDtoList.cartDtoList.length; i++){ 
                            if ( cartDtoList.cartDtoList[i].productId == productId) {
                                cartDtoList.cartDtoList.splice(i, 1); 
                            }
                        }
                    }
                    this.orders.data = cartDtoList.cartDtoList
                    this.length = this.orders.data.length;
                    this.subTotal();
                    localStorage.setItem("cartDtoList",JSON.stringify(cartDtoList))

                    let temporary = JSON.parse(localStorage.getItem('cartDtoList'))
                    window.console.log(temporary)
                    if(temporary.cartDtoList.length==0){
                        localStorage.removeItem('cartDtoList')
                    }
                }
                else{
                    let payload = {
                        customerId:'',
                        productId: productId,
                        merchantId: merchantId
                    }
                    window.console.log(payload)
                    axios({
                        url: '/backend/cartandorder/cart',
                        method: 'delete',
                        data: payload,
                        headers: {token:localStorage.getItem('user-token')}
                    })
                    .then(function(response){
                        if(response.data.success==true){
                            for(let i=0;i<that.orders.data.length;i++){
                                if(that.orders.data[i].productId==productId){
                                    that.orders.data.splice(i,1);
                                    that.length = that.orders.data.length;
                                    that.subTotal();
                                }
                            }
                        }
                        window.console.log(response)
                    })
                }
            }
        },
        created(){
            let that = this
            let temp = ''
             if(localStorage.getItem('user-token')==null && localStorage.getItem('cartDtoList')!=null){
                window.console.log("no token cart")
                temp = JSON.parse(localStorage.getItem('cartDtoList'));
                that.orders.data = temp.cartDtoList;
                // window.console.log(that.orders)
                that.length = that.orders.data.length;
                that.subTotal();
                // window.console.log(temp.cartDtoList)
            }
            else if(localStorage.getItem('user-token')!=null){
                window.console.log(localStorage.getItem('user-token'))
                axios.get('/backend/cartandorder/cart',{
                    headers:{
                        token:localStorage.getItem('user-token')
                    }
                })
                .then(function(response){
                    window.console.log(response.data)
                    that.orders = response.data
                    that.length = that.orders.data.length;
                    that.subTotal();
                })
                .catch(function(response){
                    window.console.log(response)
                })
            }
        },
        computed:{
            check(){
                if(this.orders.data.length>0){
                    return true
                }else{
                    return false
                }
            },
            validation(){
                if(localStorage.getItem('user-token')==null){
                    return true
                }else{
                    return false
                }
            }
        },
    }
</script>
<style scoped>
#orderInput{
       height:40px;
       width: 40px;
       border: 0.8px solid black;
       text-align: center;
       margin-right: 30px
   }
.textOfCard{
    padding: 5px
}
select {
  /* styling */
  background-color: white;
  border: thin solid black;
  border-radius: 4px;
  display: inline;
  line-height: 1.5em;
  padding: 0.5em 3em 0.5em 0.5em;
  margin-top: 10px;
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
</style>