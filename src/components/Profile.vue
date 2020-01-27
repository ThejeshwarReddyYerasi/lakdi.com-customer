<template>
    <div>
        <v-container>
            <v-card style="margin-top:50px">
                <v-row style="padding-top:20px">
                    <v-col>
                        <div style="margin:auto;width:300px;height:300px;padding-top:30px">
                            <v-avatar v-if="imageUrl!=''"
                        width="200"
                        height="200"
                        >   
                            <v-img :src="imageUrl"
                                :contain="true"
                                width="200"
                                height="200"
                            >
                            </v-img>
                        </v-avatar>
                        <v-avatar v-else color="#F3983E" width="200" height="200">
                             <v-icon dark size="150">mdi-account-circle</v-icon>
                            </v-avatar>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="label">
                            <p>Name:</p><input type="text" class="inputField" :disabled="value" v-model="profile.name">
                        </div>
                        <div class="label">
                            <p>Email:</p><input type="text" class="inputField" disabled v-model="profile.email">
                        </div>
                        <div class="label">
                            <p>Contact Number:</p><input type="number" class="inputField" :disabled="value" v-model="profile.contactNo">
                        </div>
                        <div class="label">
                            <p>Address:</p><input type="text" class="inputField" :disabled="value" v-model="profile.address">
                        </div>
                    </v-col>
                </v-row>
                <v-row style="margin-top:50px">
                    <v-col lg="6" style="text-align:center">
                        <v-btn style="margin-right:80px;margin-bottom:40px;color:white"
                         @click="signOut" color="#D85430"
                        >Sign Out</v-btn>
                    </v-col>
                    <v-col lg="6">
                        <v-btn style="margin-bottom:40px;color:white" v-if="this.value==true"
                            @click="edit" color="#D85430" 
                        >Edit</v-btn>
                        <v-btn   style="margin-bottom:40px;color:white" v-if="this.value==false"
                            @click="Save" :disabled="validation" color="#D85430"
                        >Save</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>
<script>
// import Axios from 'axios';
import axios from 'axios' 
    export default{
        data: function(){
            return{
                value:true,
                imageUrl:'',
                isDis: true,
                profile: {
                    name:'',
                    email: '',
                    contactNo: '',
                    address:''
                }

            }
        },
        methods:{
            signOut(){
                localStorage.removeItem('user-token')
                this.$router.push({path:'/'})
            },
            edit(){
                if(this.value==true){
                    this.value = false;
                }
            },
            Save(){
                let that = this
                    let payload={
                        customerId:'',
                        name:that.profile.name,
                        address:that.profile.address,
                        contactNo: that.profile.contactNo,
                        email: '',
                        imageUrl: ''
                    }
                    window.console.log(payload)
                    axios({
                        url: '/backend/login/update',
                        method: 'post',
                        data: payload,
                        headers: {token:localStorage.getItem('user-token')}
                    })
                    .then(function(response){
                        that.value = true;
                        window.console.log(response)
                    })
                }
        },
        created(){
            let that = this
            if(localStorage.getItem('user-token')==null){
                this.$router.push({path:'/login'})
            }
            axios.get('/backend/login/',{
                headers:{
                    token:localStorage.getItem('user-token')
                }
            })
            .then(function(response){
                // that.profile = response.data;
                that.profile.name = response.data.data.name
                that.profile.email = response.data.data.email
                that.profile.contactNo = response.data.data.contactNo
                that.profile.address = response.data.data.address
            })
        },
        computed:{
            validation(){
                let phoneno = /^\d{10}$/
                let phoneValidation = false;
                if( this.profile.contactNo!=null && this.profile.contactNo.match(phoneno) && this.profile.address!=null){
                    phoneValidation = true
                }
                if(phoneValidation == true){
                    return false
                }else{
                    return true
                }
            }
        }
    }
</script>
<style scoped>
.inputField{
    width: 300px;
    height: 40px;
    border: thin solid black
}
.label{
    padding:10px
}
</style>