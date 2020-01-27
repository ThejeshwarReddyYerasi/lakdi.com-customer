<template>
    <div>
        <v-card id="outerDiv" v-if="temporary">
            <div class="headerText">
                <p>
                    <b>Sign In With</b>
                </p>
            </div>
            <div class="inner">
                <v-row> 
                    <v-col lg="6">
                        <v-btn @click="googleAuth" color="#DB4437" style="color:white">
                            <v-icon style="padding-right:7px">fab fa-google</v-icon>
                            Google</v-btn>
                    </v-col>
                    <v-col lg="6">
                        <v-btn @click="facebookAuth" color="#4267B2" style="color:white">
                           <v-icon style="padding-right:5px">fab fa-facebook </v-icon> 
                            facebook</v-btn>
                    </v-col>
                </v-row>
            </div>
            <div class="inner">
                <p class="label">Email</p><input type="text" class="input" v-model="email">
            </div>
            <div class="inner">
                <p class="label">Password</p><input type="password" class="input" v-model="password">
            </div>
            <div class="inner">
                <v-btn @click="login(email,password)" class="button" color="#212121">sign in</v-btn>
            </div>
            <div class="inner">
                <v-btn @click="invert" class="button" color="#212121">{{temporaryVariable}}</v-btn> 
            </div>
        </v-card>
        <v-card v-else id="outerDiv">
            <div class="headerText" style="margin-top:20px">
                <p>
                    <b>Create Account</b>
                </p>
            </div>
            <div class="inner" style="margin-top:30px">
                <p class="label">Email:</p><input type="text" class="input" v-model="email">
            </div>
            <div class="inner"  style="margin-top:30px">
                <p class="label">Password</p><input type="password" class="input" v-model="password">
            </div>
            <div class="inner" style="margin-top:50px">
                <v-btn @click="manualSignIn(email,password)"
                class="button" color="#212121"
                >sign up</v-btn>
            </div>
            <div class="inner" style="margin-top:30px">
                <v-btn
                class="button" color="#212121"
                 @click="invert">log in</v-btn>
            </div>
        </v-card>
    </div>
</template>
<script>
import { googleProvider, facebookProvider, auth } from "../firebaseConfig";
import axios from 'axios'
    export default{
        data: function(){
            return {
                email:'',
                password: '',
                // manualLogIn(email,password){
                temporary:true,
                temporaryVariable: 'Create Account'
                // }
            }
        },
        methods:{
            send(){
                this.$router.push({path:'/'})
            },
            sendLocalStorageData(){
                let that = this
                if(localStorage.getItem('cartDtoList')!=null){
                    let payload={
                        customerId: '',
                        cartDtoList:[]
                    }
                    let temp = JSON.parse(localStorage.getItem('cartDtoList'));
                    for(let i=0;i<temp.cartDtoList.length;i++){
                        let pay = {
                            productId: temp.cartDtoList[i].productId,
                            merchantId: temp.cartDtoList[i].merchantId,
                            quantityBrought: temp.cartDtoList[i].quantityBrought
                        }
                        payload.cartDtoList.push(pay)
                    }
                    // window.console.log(payload)
                    axios({
                        url: '/backend/cartandorder/cart',
                        method: 'post',
                        data: payload,
                        headers: {token:localStorage.getItem('user-token')}
                    }).then(function(response){
                        if(response.data.success==true){
                            localStorage.removeItem('cartDtoList')
                            that.send();
                        }
                        window.console.log(response)
                    })
                    .catch(function(error){
                        window.console.log(error)
                    })
                }else{
                    that.send()
                }
            },
            createUser(token){
                let that = this
                let payload={
                    customerId:'',
                    name:'',
                    address:'',
                    contactNo:'',
                    email: '',
                    imageUrl: ''
                }
                axios({
                    url:'/backend/login/',
                    method: 'post',
                    data: payload,
                    headers:{ token: token }
                }).then(function(response){
                    if(response.data.success==true){
                        localStorage.setItem('user-token',token)
                        that.sendLocalStorageData()
                    }else{
                        window.console.log("error login")
                    }
                    window.console.log(response)
                })
            },
            getTokenFirebase(){
                let that = this;
                auth.currentUser.getIdTokenResult(true).then(function(token){
                    // localStorage.setItem('user-token',token.token);
                    window.console.log(token.token);
                    that.createUser(token.token);
                    // that.send();
                }); 
            },
            invert(){
                this.temporary = !this.temporary;
            },
            googleAuth(){
                let that = this
                auth.signInWithPopup(googleProvider)
                .then(function(){
                    that.getTokenFirebase();
                    
                })
                .catch(err =>{
                    localStorage.removeItem('user-token');
                    window.console.log(err);
                })
            },
            facebookAuth(){
                let that = this
                auth.signInWithPopup(facebookProvider)
                .then(function(){
                    that.getTokenFirebase();
                })
                .catch(err=>{
                    localStorage.removeItem('user-token');
                    window.console.log(err);
                })
            },
            manualSignIn(email,password){
                let that = this
                auth.createUserWithEmailAndPassword(email,password)
                .then(function(){
                     that.getTokenFirebase(); 
                })
                .catch(err=>{
                    localStorage.removeItem('user-token');
                    window.console.log(err);
                })
            },
            login(email,password){
                let that = this;
                auth.signInWithEmailAndPassword(email,password)
                .then(function(){
                    that.getTokenFirebase();
                }).catch(err=>{
                localStorage.removeItem('user-token');
                window.console.log(err);
            })
        }
    }
}

</script>
<style scoped>
.input{
       height:30px;
       width: 100%;
       border: 0.8px solid black;
       background-color:#F8F8F8;
       text-align: center
   }
#outerDiv{
    margin:auto;
    width:400px;
    /* height:450px; */
    border: 0.8px solid black;
    margin-top: 10%;
}
.inner{
    margin:auto;
    width:300px;
    margin-top:20px;
    margin-bottom: 20px;
}
.button{
    width:100%;
    color:white;
    /* background-color:black; */
}
.label{
    font-size: 18px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    padding-bottom: 5px;
}
.headerText{
    text-align:center;
    margin-top:10px;
    color:grey;
    font-size:24px;
    font-family:cursive
}
</style>