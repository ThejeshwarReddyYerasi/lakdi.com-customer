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
            invert(){
                this.temporary = !this.temporary;
            },
            googleAuth(){
                auth.signInWithPopup(googleProvider)
                .then(function(result){
                    let token = result.credential.accessToken;
                    let user = result.user;
                    window.console.log("user:" + user);
                    window.console.log("Token:" + token);
                    localStorage.setItem('user-token', token)
                })
                .catch(err =>{
                    localStorage.removeItem('user-token');
                    window.console.log(err);
                })
            },
            facebookAuth(){
                auth.signInWithPopup(facebookProvider)
                .then(function(result){
                    let token = result.credential.accessToken;
                    let user = result.user;
                    window.console.log("user:" + user);
                    window.console.log("Token:" + token);
                    localStorage.setItem('user-token', token)
                })
                .catch(err=>{
                    localStorage.removeItem('user-token');
                    window.console.log(err);
                })
            },
            manualSignIn(email,password){
                auth.createUserWithEmailAndPassword(email,password)
                .then(function(){
                    auth.currentUser.getIdTokenResult(true).then(function(id){
                    localStorage.removeItem('user-token');
                    window.console.log(id); 
                    }); 
                })
                .catch(err=>{
                    localStorage.removeItem('user-token');
                    window.console.log(err);
                })
            },
            login(email,password){
                auth.signInWithEmailAndPassword(email,password)
                .then(function(){
                    auth.currentUser.getIdTokenResult(true).then(function(id){
                    localStorage.removeItem('user-token');
                    window.console.log(id);
                })
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