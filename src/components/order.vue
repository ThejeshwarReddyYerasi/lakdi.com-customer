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
            clas:'',
            orders:{},
            orderDetails:{}
            // orders: [
            //     {
            //     orderId:1,
            //     date: 12,
            //     totalPrice:12345
            //     },
            //     {
            //     orderId:2,
            //     date: 1223,
            //     totalPrice:1224345
            //     },
            //     {
            //     orderId:3,
            //     date: 1322,
            //     totalPrice:122345
            //     }
            // ],
        //      orderDetails:[
        //          {
        //             orderId: 123,
		// 			customerId: 231,
		// 			productId: 321,
		// 			merchantId: 42,
		// 			productName: 'how to win friends and influence people',
        //             quantityBrought: 214,
		// 			productPrice: 213,
        //             imageUrl: 'data:image/webp;base64,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'
        //         },
        //         {
        //             orderId: 123,
		// 			customerId: 231,
		// 			productId: 321,
		// 			merchantId: 42,
		// 			productName: 'how to win friends and influence people',
        //             quantityBrought: 214,
		// 			productPrice: 213,
        //             imageUrl: 'data:image/webp;base64,UklGRrIUAABXRUJQVlA4IKYUAACwXQCdASquAAoBPw12rE0nJCIhKnO7eOghieJu/FbPBT2dq9/RHTYiFAAL6MdBHo5/zPqG86XzAebT/yv3A92PoAf1X/M+s56qv7rewh5dftB/4LJLfOv817dP9R0uvvT225PfXnmp/Kfvf+09df8v30/MT/G9Qj23/r96fAF+gf2z/X+GbqR+I/YA/WT0m/6virUBP6b/ofRU/6v9p6HvrD2E/Lc9kP7n+yx+3jG2bmnYrm3/3Q2Tx56TaSsG8a51HN0V8PavOafoSscj/dOPKiFeNKnlcgx+BYks+DrsS+88RNP7SVyVHJTsr6zkTNCCuEB+1dB2PTnWDVMzK+9PRmo96PQ+kgr7NGr31wQaIm9lczBB9Ad1IlhN2PNJQbl0GGhBInQglgZw48CYopJQYwH0MiNflcn4CMzhfRjv5zCkKt4wGf3EZigNYTKXm4NxeZuqFtY76GuRQOIr4Aide5A/AHxp1EwCe3w/rnRElm664gQFvr5u4WLU4+L95wCPHPdWbImiscdriOa0jnLRDJdLykaXjXtCeSM8XLYU5iyod3zV9RLi72Cxs9ZrZpGQSdTTQLgZeTPh5HO9NljRPNRRWugv76yxUgQckDVeia4pT7x8GVSNYd4KpxU3SBuQ/uLJ3dULJLgJ9g0jfKDAh8HPMjmnPOf25/UfSNG8txnPfjaAC8lLxH9doYOQkx/kfHg9w9Mo9j556DQHn6cCFfVjn5Qx8pm/ocPeZOxT3tQSz05oOf+FDfKDrm1NGC895ut80XCEVpGrwpu91qQb3iK4JRgIU1gC6W3UOkIWEDbPyWN8JAaxnqp76vKsqOEzqT0ptpQ/dXxlSl/J61WgEZcOByuLzWKbCmh5Tl/1J3KBrR3qho+ysXeE0vyK6qp0lWL7vETu2FnrfEDDjxXxMUs7IqkxpiZ/CmqBIhKbzIQEicc6b4+NRjGaTzd/kjntV4N7TTQu/lKOXc7IRGiCFu0Q/DVuJEghFen328IsJpFeu1ksAAD+xX4wwIbDWVM4X2OEMvC9UdaxseZV+tiDfxu6T/2+4gAlLubsvbTGUi2C0IB+39KftQIuyrydgsPRhFKsbzpM67BczPB+gjU6DGr/246e7XxFk5/HdddtPj4MjMNBA/QBZ8VgO6LvlYGDP8O7tGkQPL/Xg1deQNKFuD+Lv7hvWj2shzd23dEeLo5H1I4vF4OvQGnFQDw08LT+OwN10KOKBmlamjmSTg0G/Q8aQ3DoU2ZY+A75BdC6Qn3FIhkLX+q/Tj0Ry+lY3AzE3nwK4L5xUq7EIc8WX/IcgVg4+UbtZXN25ict+6Q994J10WyAXLyl11xFq9e1pY2HKzE1UXEASGzg+C1CmH5FOh24SXAw9Srf9koj88zxp34cW/t8Zj7d3j5+pYScM8aclaC2Sdl+708anDvXYDjkL12YpY1Gb+8154NyN9KoUwh95wJkc/nbQm389ktjMsAtRxs37MC2FOVBdounTCxeQke4wKiQhHvdFfDpkq5KyVVfSSY0n7j3dnAD1YPkZFTYkRLogbn6FCpHzKzfAZ/5EbEetdx5258QZcwWyt1mq6lQcj3qGSgKrFIy3jFDdYqllxHZITAHvvYKQYJIJ+U6py6GfpgU4zbQxQEnrPMlIA3vvgm6kCA/Lz5BquSpsY3CdwDaaMA2wsaEyfFgI6jKQc4sh4UlpmEXTg36yaCC6Qs8MgcjT9m9qLLYvQkyDyr2lUqHXZ2azzb44NlX9XlyZWFjO3Gdlkxap1tX6YO78h7zH5iZ7CN1UXZ48xO1b4gdjNwxn40ltuDgFJSYqb2UB8SxoJh3hK3b9jW2Gels9/mHhsn4/vHZjRjwTNmH+9V2VvdzZr32K8NKAirzgoN08vpJiM/CFAiyK1TobZshetrjzPq0FwSmLJfBB6xchmljLf5/E45pJcC1hA8KnPZIA+vL3Z/196e1LDQgcu7fkaeIS7qiVZ6of/qtSwdUenphPh63znwAashauz01lvL9ZpO5T9FE1ZSC8WFaRYFDaQ4WX6n66cSXBYAAxkR6hmnvepunH6HJC3M34a4r0nHEbrYTlpRkyOAN8VlL8v8KOv0bQeD7M5lnuZPl8NrcCfICbrsCJwO742BA91R++k4M4mv9wa16gRZxxIcCVkwVVQianQXHC7+cm1aY252P6LtvrGB5LFm2WBHVkUxXOSSw3qvhqqyKNt4so6RcOlLunqsZC2HF0VWXa/+dlHEMXP8MGWlgRBvK8/bblk4DzOBJpdxpIJp9Gd9m98PG/5eQij65ZAAdJLYSVTSDwu4LTA6G2IL+lVXkO0Fqg8vRyb9Q0hhrEfoPL+p6WT6k9MTUukg92IkxJufdjjI0wv9IpRfDyBpP9N+cmw8p+my84Fux4hYLIcFR1rMQ2MNJQgp2b0YTiuZuvHTnAXQy1cG69B8CoYbxvJ57QYtd9BxasgvL3WatPWwBX2KV/fjQS0En57rfsCpC/zTnrZFBMFabAoFOM9V0LL1jC81p03BG+AuvIzsh3vOUiPgAk0PkQlyMgXSmJ+IPtsobo1UlBhzgdvp8Cx0y5SfUW4ReF+2kBZ3OU8CjL0/Q0YKyoG7d4DKaBB0EqSUCySR7xao9zQYlhAR5lRVbuoiwNQIZfVvh6i+WgJyGN/b4TsCH1DX5R1SCoXgyhYeHfbALjuxRPB06/LvFL2rtGit5TJRk8V4P0m6BHOICQKLrCVFyYLcWP7eft+nbKfEpVK70hTR5X9mDWtiNqGz0fiJFZZ0ANGEC/k+at4VOEUMQqI42Pg+xKBreLbx7/pK7ftKU58zKSD9K34Mh6RPv2OzcIENgEpyYUhBRM9rBOhWGFbb0bd8dPMj7BaR34SkHpr7K+4sTRqHFvJI2vdvHJCvhpBsad4/PaTArnvn8T2XKxYoPnlcRYs1R1n9EDUjQnQVC0pceeB4YS8mLi3FD3KSjkBa5UiU6Q+UIStNcco4pPCU+F37L6B6eRKnmwojUM/6c+0eaWFAV8oxXgi8AJ9mGf3ARYhhKyEPdYinCnrsvF+QMdfdBnyHTXbynIM5O2yWUj/X1fcKqhOPXfUUAOE0FqFmergCG4TgcEAb4d1SXhQ89xWubzErmpJoWP+s7yhRU/F+Fc/rKxmnM7b8D5trB6i9HLOBuxsXC3CroCgQzpXUaWv8vBaJtnafAAm8BELcl4YFIBhwc/OIjsUOJI64t0/48w7cg6G/NnsUD5gc6VvEo7EVKkqe1D/zzWKry2oWQmvs8QCID3tN6OQzkenFAQkZGMuVdg/xDonaGpJiUqHSlCEih6bAvGuEF7ymlDYkTNckSp/A4qGz9KyuwHFkeQUQMHalWpxIuWzfy/+25yYWhbmnl3NSkvKr7jyf5v0RDLrqPkcazvmXYk8bXBohSIhV0rmlpn6J6ftJYYBcokJrNI2sI72+j47jxGDjO/1KWfdBds1cDBICeYRe5ljZbavOmENDHyID/H9AJ0/MPEHNXeMv2lz1ZPuHFc9P8/zIfJahpMQgwUw7ycbQCWcqoU4TFAfN5wt6fkCeCalXyWsp4ko2LSzfeWdt6DVGctfP61kEn+eFIJG2nZC0YOBv7KmUkYgDPS7Dha8A7rTgtQMmVsu85I5aqeoW0XGf6HN9Tz+rAAPo15p5hm2+tUaUqIpSxMFhSokc5K2wLXkKgrZ08TvkszuoEDjXQ9V71Orj8J6sRTLZAE2BOi4MbwrzCglCT+XRgmHu2YVqvXLBu69XLU6EwCr3UvuEVb3vOTUeiynhKPWNy2CjLY2ixb7f23QejG+O/UIYq9P8KznQtDgDoxEM4mQw7Dfu13ur6PL89+n03EGLM+N4U/NGMeKJwghY1VCsV7zNl0Y/mQ3mrvwM1uUGCJP/kZ7U3/DDn2s5i89CVjlmzzbtSgiMsK8xH7eEdc7f7zljQL8cuOlXv0SMacQ/OhsgjrkhXqT+SAV5fNObpzz24tN5Qur+84TelQYf5QpuzNebtObDF0JV2gjI+zt5QX2O9JYxLaveht3UNzQo5qukB70n+Njn61k+R7EGQgDkERqda5AkswN5RQEQ7FO3Pwfe5N5jHvSGJxQSzj/+0Hj8ChT9iXYa/UHch0yf5f3rBULvnBnxN2IPM/btcGW+9vqgolL37A+6ZNwNh/b2/lyKllx/tQpATNIa01jVdgL2mhFl0DMi6uix02BmHahQ2J4tYL/O04PFKi+XCy31QbPzhDmMzYjb4JBqfqaqN1UHOHiPjDdqBWwUGytSN2cOjfRRYxqV7IZD07ePW8DdHnIg4NhtnZVVTM/GvigTYmQEr61JgJBzzKLu0zC2H9X0hdHbhD2Ulg/iTB4wlyNFTtztavwp+9evr1I5bmGQhOD1Zhqd7aWfzwYAeejt4c2RCizm73jFjtiqJWj1p7nc9LimscFb2wEDStEKrB1IUKZY5MLOrfAmwSDnzgagtM/30sriuOAow01Bl6RIdq1OsKQGb19kmSXsvITFt6Eosndm/Ea5RlDLW05R3VN/qUleIAsO5PHh3wtPlQ1UIAzcOppuYqU152afxeayhz5mYgaphkYoChwZEu2Hhqv021W7tDJIECAFYtuO4F8khb3fipP+StaziattJ6N4cU/zpfgUZDU5RFgrFnBkH0VPZhveaVlRx40z9OXI0Dw6l8ztm8EkdIBGiMNyfu+kG3KGNfGABznEJVM95NTOgSt13qlFmiuPj0IVFDIVCS5c55r1BjSDLB18pIlaCIRK84j6nnwikGsBwq2WZ4gShJUOpCVghllutp5m5RXmVcpxxXXFgHS13ze0u84kK0KVvTO7Rne14u7WTcnmwuMpul2tLEC8kJqOgnq+krvoM0uYXV28TQQZtqhmUQeu8T1umW6w1nu7nlW9BtwV4Lj80Q8cPqT9kcgnO/qZhon8T3ed0evWOKxZFgjtzZr+tfSwrH2P74jGImWQpQE+zvHYccQM0pSZN+rczvi0NTynJo1xh2VFaG/z4TZtcfoUSQK3M9k8nlGeelmu/nNJ8gH7SUkJ1Svi24H177tXlmhrEs5Olw3Grawp1lsgndyyzZrHLPow5h0i9doEcMrqIE/rZnBdtEQFWz3iln0EuapmFNyzCCG8lCyAoZsq9wlTpz+HcEMS96phP4xkqhyEaCpZLKYAF9H4IwafbaZ39Q9wk8MHA0lPLeL+qHZ/4YvuS8n7XVOVFbK6R2+/lD9I1t5R2p2mXmWZ6c5k/TvMAurwu0SZcx66K/CNqkaxMkFfHNRSPUvN5C7jIvcbA3lU7ZKj1ggQ9AwjjR1mVyAsW71oU3EZeNbNv7YiH9m84QVDx3uRfV5E2MYf9vwvZdfFAFmGL4OYw+JXBqJis4mkiDTBtcm/zzRL4g/G7lF1Sp6/jbKY905ze4uELxG0n8PmXWeDD+clzptaImFeYnFVQTO1KfcJuWy7alOuBUNuYASay9tiem5EuFBH5hKrldJ2gKyKwNHS7rhv1PdrAcct0+t1Qj46yEwcft+yL+FTE4zTbXUhNcl1L8vn7DwXwYTzg608z0PfGp/V9GrBq5fTWHRV4HSB9za/tsPLxiY3UqP5ZALEoqRvs14RNso/nHfUn1V7U+1yvETIExuTozhuKXiw4oE/RiALokiaVFIc++VZHw8YeXkyA/fYczcaArPzBpu2zvHUPCqBblSnSMfgaTRG/IEZ/8DwG643kqqZ2e9pRD0I5vIUM4E0ZlbHmtIsDkGTVERJH+YgAHDP7vq4qYM8CTnqbbZGRX828fNXz62kY2IcLkTK94vS3KSdDVv09uZIYOsR6ZTWXA16G0f6FCu+Sya93TjLnDSt9ljxVqnbqyff0bwhOzONFTWCO/9XWS70xKf2QWMWo4ZEM1MXJu7ip+VtFt+rynH2dBfpPxhr/9XRJrTu2S+SehfEwqBW807LBWddoatt39n2aZHyBWdewvBgz6Nk70fJMcqvwibl9nz1QSFPvdQfubhLcnkamQN8hJiuHijwMEVbelHUqyiu7K8lmIRP+deMy27eZ97mze0nr7xQMXZLhJeAP3kLdQvueI/wr6N6bJfdQzHVKdSdoZeHV9XaoApnVVOq07MlDgSe7qqmN10IbtA/gGKh5/a2e2mAy56/1USKEkiH383WMZ/toP/ovmPMDtIjoXh4ja88MLO4gtrB/K4KH5shRC/2wMcSXbKRnM7Vi5IPfVvpVJNGH6KT7q6P7IzEMWeDp3re3M7WD4QlhQHOfVUqBfhd0zCacCGp0oxw4Nuf6NAAj1RbGSzUbWw0sGhXCuZY7yVp4uG2DwfQl1CuS+/NtMqKxdUEUu7jxsz7Rxt9RWHFrzdTve39nyIhG6hwv5rbhx1/o3bAvYSvBwxBgUeHKEJUnMuHmPHoc6D+w4RpLbGqP74jm4VtvTTeCFoIgYrFPva0Y5jH4A+5/zPzv4phChX1iEfX4HzCteAjYaSPaAE8Cej0eeD76Owr0EUeC4eZZDqEXdmi7z0W4QFoUCC4frTIbrjBii9ws+588DNoVoV2V2KNQYu3r4UPR3krI5hcrhnYgXuFTGssTMQBVIH56bAtm6kZ5fELfIaDA5fJlvFTxejNHjO+bYAj0U8TSm5S23QbcCZBS7JQjUfJmJd7ruX1bQIDOYOzgLpwju1QEJXmVB5z2+tr01pyuOTmr1PNc/DlGr/WY+0EZ1im907Ic/e+pKjSqNf4L68olgLrlO80/C4ZQMLNIHhaS29ksd9v76AIN1B88VhvOHK2V948qBggjQHqxeSmokLr1o8Eg/UmMKH85YbXinWCwUQ9MDwqic310tlwI+GxdlynsVytG93SNXTmzDJR8hzN/m/kkiwEg2xJVGP4XnoMNJPt/FNsdTHK2JDMLocejsppMP94O6u9LNRo6cBav06MOiNasEjvC+BcUXGg8a3vIRutECHm5P5WFndQYh1pD/dxYOFPfpGib/aWidrns3KcKijWjYHkxFfgxaIDzhaw02h/hWM0A5U/ngI5RCjqzRRqfwfPbvIoCLhgurITIRokfIEmwX8rdXs6fUuG7/SP8y1u2e+N8gAA='
        //         }
        //    ]
        }
    },
    created(){
        let that = this
        axios.get('http://10.177.69.78:8085/order/cus1')
        .then(function(response){
            // window.console.log(response.data)
            that.orders = response.data;
            if(that.orders.data.length>0){
                that.getOrderDetails(that.orders.data[0].orderId);
            }
        })
        .catch(function(error){
            window.console.log(error)
        })
    },
    methods:{
        getOrderDetails(orderId){
            let that = this;
            axios.get(`http://10.177.69.78:8085/orderedItem/${orderId}`)
            .then(function(response){
                that.orderDetails = response.data;
                // window.console.log(response.data);
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
</style>