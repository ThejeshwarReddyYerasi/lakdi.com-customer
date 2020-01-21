<template>
    <div>
        <v-container>
            <v-card v-for="(item,i) in orders" :key="i" style="margin:20px 10px 30px 10px">
                <v-row>
                    <v-col lg="3">
                        <v-img
                        :src="item.image"
                        max-height="250"
                        max-width="200"
                        :contain="true"
                        >
                        </v-img>
                    </v-col>
                    <v-col lg="3">
                        <p>{{item.productName}}</p>
                        <p>quantity:{{item.quantity}}</p>
                        <p>price:{{item.price}}</p>
                    </v-col>
                    <v-col lg="3">
                        <input type="number" id="orderInput" v-model="item.quantity">
                        <v-btn @click="updateQuantity(item.productId,item.merchantId,i)">Update</v-btn>
                    </v-col>
                    <v-col lg="2" style="padding-top:30px">
                        <p>Total price:{{item.quantity*item.price}}</p>
                    </v-col>
                </v-row>
            </v-card>
            <v-row style="margin-bottom:30px"> 
                <v-btn @click="checkout">
                    Checkout                    
                </v-btn>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    export default{
        data: function(){
            return{
                orders:[
                    {
                        productName:"product name",
                        productId: 123,
                        merchantName: "merchant name",
                        merchantId: 123,
                        image: 'https://ii1.pepperfry.com/media/wysiwyg/banners/02_web_ns_Furniture_30122019.jpg',
                        price:234,
                        quantity: 2
                    },
                    {
                        productName:"product name",
                        productId: 123,
                        merchantName: "merchant name",
                        merchantId: 123,
                        image: 'https://ii1.pepperfry.com/media/wysiwyg/banners/02_web_ns_Furniture_30122019.jpg',
                        price:234,
                        quantity: 2
                    },
                    {
                        productName:"product name",
                        productId: 123,
                        merchantName: "merchant name",
                        merchantId: 123,
                        image: 'https://ii1.pepperfry.com/media/wysiwyg/banners/02_web_ns_Furniture_30122019.jpg',
                        price:234,
                        quantity: 2
                    }
                ]
            }
        },
        methods:{
            getOrderDetails(){
                window.console.log("clicked") //i have to send token and validate and backend will give me the data
            },
            updateQuantity(productId,merchantId,i){
                window.console.log(productId + "+" + merchantId+"+" + i);
                window.console.log(this.orders[i]);
            },
            checkout(){
                window.console.log(this.orders)
            }
        }
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
</style>