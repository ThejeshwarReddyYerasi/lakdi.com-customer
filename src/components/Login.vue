<template>
    <div style="width:400px">
        <div style="margin:auto">
            <div>
                <p>email</p><input type="text" class="input" v-model="email">
            </div>
            <div>
                <p>password</p><input type="password" class="input" v-model="password">
            </div>
            <div>
                <v-btn @click="googleAuth">Google</v-btn>
                <v-btn @click="facebookAuth">facebook</v-btn>
                <v-btn @click="manualSignIn(email,password)">signup</v-btn>
                <v-btn @click="login(email,password)">login</v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import { googleProvider, facebookProvider, auth } from "../firebaseConfig";
    export default{
        data: function(){
            return {
                email:'',
                password: ''
                // manualLogIn(email,password){

                // }
            }
        },
        methods:{
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
                    window.console.log(id); 
                    }); 
                })
                .catch(err=>{
                    window.console.log(err);
                })
            },
            login(email,password){
                auth.signInWithEmailAndPassword(email,password)
                .then(function(){
                    auth.currentUser.getIdTokenResult(true).then(function(id){
                    window.console.log(id);
                })
            })
        }
    }
}

</script>
<style scoped>
.input{
       height:30px;
       width: 300px;
       border: 0.8px solid black;
       text-align: center
   }
</style>