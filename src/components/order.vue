<template>
    <div>
        <v-row v-if="check">
            <v-col lg="5">
                <p style="margin-left:30px;margin-top:20px">Your Order History</p>
                <v-card class="leftMargin" v-for="(item,n) in orders.data" :key="n"
                  @click="getOrderDetails(item.orderId)"
                >
                    <v-row style="">
                        <v-col><p class="text">orderId:#{{item.orderId}}</p></v-col>
                        <v-col><p class="text">orderDate:{{item.date}}</p></v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col><p class="text">Sub Total:{{item.totalPrice}}</p></v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col lg="7">
                <p style="margin-left:30px;margin-top:20px">Details</p>
               <v-card id="rightMargin">
                   <v-row style="margin:30px" v-for="(item,n) in orderDetails.data"
                    :key="n"
                   >
                        <v-col lg="12">
                            <v-row>
                                <v-col><p>OrderId:#{{item.orderId}}</p></v-col>
                                <v-col><p>orderDate:</p></v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-img
                                    :src="item.imageUrl"
                                    max-height="200"
                                    height="200"
                                    widtth="200"
                                    max-width="200"
                                    :contain="true"
                                    ></v-img>
                                </v-col>
                                <v-col>
                                    <p class="text">Item:{{item.productName}}</p>
                                    <p class="text">price: {{item.productPrice}}</p>
                                    <p class="text">quantity: {{item.quantityBrought}}</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col><p> Rate: <v-rating v-model="rating"></v-rating></p></v-col>
                                <v-col>
                                    <p>Review:</p><input type="textarea" id="inputField" v-model="review">
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn @click="submitReview(item.productId,item.orderId)">Submit</v-btn>
                                </v-col>
                            </v-row>
                        <v-divider></v-divider>
                        </v-col>
                    </v-row>
               </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data: function(){
        return{
            orders:{},
            orderDetails:{},
            rating:0,
            review:''
        }
    },
    created(){
        // window.console.log(localStorage.getItem('user-token'))
        let that = this
        axios.get('/backend/cartandorder/order',{
            headers:{
                token: localStorage.getItem('user-token')
                // token:'we'
            }
        })
        .then(function(response){
            window.console.log(response)
            that.orders = response.data;
            if(that.orders.data.length>0){
                that.getOrderDetails(that.orders.data[0].orderId);
            }
        })
        .catch(function(error){
            window.console.log(error.response)
            // if(error.response.data.status==400){
            //     window.console.log("400")
            // }
        })
    },
    methods:{
        getOrderDetails(orderId){
            let that = this;
            axios.get(`backend/cartandorder/orderedItem/${orderId}`)
            .then(function(response){
                that.orderDetails = response.data;
                window.console.log(response.data);
            })
        },
        submitReview(productId,orderId){
            let that = this
            let payload = {
                orderId:orderId,
                productId:productId,
                review:this.review,
                rating:this.rating
            }
            window.console.log(payload)
            axios({
                url: '/backend/review/add',
                method: 'post',
                data: payload
            })
            .then(function(response){
                window.console.log(response)
                that.rating = 0;
                that.review = ''
            })
        }
    },
    computed:{
        check(){
            if(Object.keys(this.orders)<1){
                return false;
            }else{
                return true;
            }
        }
    }
}
</script>
<style scoped>
.text{
    padding:5px
}
.leftMargin{
    margin-top: 20px;
    margin-left: 20px
}
#rightMargin{
    margin-right: 20px
}
#inputField{
    border: thin solid black;
    width: 80%;
    height: 100px;

}
</style>