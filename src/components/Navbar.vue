<template>
  <v-card>
    <v-toolbar flat>
      <v-row style="margin-top:10px;margin-bottom:10px">
        <v-col lg="1"></v-col>
        <!-- <v-col lg="1"></v-col> -->
        <v-col lg="1">
          <v-toolbar-title>
            <router-link to="/">
                <v-img src="../assets/logo.png"></v-img>
            </router-link> 
          </v-toolbar-title>
        </v-col>
        <!-- <v-col lg="1"></v-col> -->
        <v-col lg="6" style="margin-left:3%">
           <input type="text" id="input" v-model="searchString">
        </v-col>
        <v-col>
          <v-btn icon @click="search" :disabled="searchString==''">
              <v-icon large>
              search
              </v-icon>
          </v-btn>
        </v-col>
        <v-col lg="3">
          <div style="text-align:right">
            <v-btn icon @click="cart" class="headerButtons">
             <v-icon x-large>add_shopping_cart</v-icon>
            </v-btn>
            <v-btn icon @click="orders" class="headerButtons">
             <v-icon large>
              fas fa-truck
             </v-icon>
            </v-btn>
            <v-btn icon @click="profile" class="headerButtons">
             <v-icon  x-large>
              account_circle
             </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider></v-divider>
    <v-system-bar height="40" color="#ffffff">
      <v-row>
        <v-col lg="1">
          Shop By Category
        </v-col>
        <v-row style="margin:auto">
            <v-col v-for="(item,n) in getCategoriesListObject.data" :key="n">
              <v-btn text  @click="productList(item.categoryId)">{{item.categoryName}}</v-btn>
            </v-col>
        </v-row>
      </v-row>
    </v-system-bar>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      searchString:''
    }),
    methods: {
      productList(categoryId){
        if(this.$route.query.categoryId!=categoryId){
        this.$router.push({path:'/productList',query:{categoryId:categoryId}})
        // this.$store.dispatch('updateCategory',category)
        }
      },
      cart(){
        this.$router.push({path:'/cart'})
      },
      orders(){
        this.$router.push({path:'/orders'})
      },
      profile(){
        this.$router.push({path:'/profile'})
      },
      search(){
      if(this.$route.query.searchString!=this.searchString){
          this.$router.push({path:'/search',query:{searchString:this.searchString}});
          }
      },
    },
    created(){
      this.$store.dispatch('getCategories')
      this.searchString = this.$route.query.searchString
    },
    computed:{
      getCategoriesListObject(){
      return this.$store.state.categoryListObject;
    }
    }
  }
</script>
<style scoped>
#input{
  border: 1px solid black!important;
  background-color: #F8F8F8;
  height:30px;
  width:100%;
  margin-top:8px 
}
#logo{
  font-size: 20px;
}
a {
  text-decoration: none;
}
.headerButtons{
  margin-right: 25px
}
</style>