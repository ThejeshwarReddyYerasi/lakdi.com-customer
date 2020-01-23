<template>
  <v-card>
    <v-toolbar flat>
      <v-row>
        <v-col lg="1"></v-col>
        <v-col lg="1">
      <v-toolbar-title style="margin-top:8px">
        <router-link to="/"><p><span id="logo">Lakdi.Com</span></p></router-link> 
      </v-toolbar-title>
        </v-col>
        <v-col lg="6">
           <input type="text" id="input" v-model="searchString">
        </v-col>
        <v-col lg="1">
          <v-btn icon @click="search" :disabled="searchString==''">
              <v-icon large>
              search
              </v-icon>
          </v-btn>
        </v-col>
        <v-col lg="1">
          <v-btn icon @click="cart">
            <v-icon large>add_shopping_cart</v-icon>
          </v-btn>
        </v-col>
        <v-col lg="1">order</v-col>
        <v-col lg="1" >
          <v-btn text>profile</v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider></v-divider>
    <v-system-bar height="40" color="#ffffff">
      <v-row>
        <v-col lg="1">
          Shop By Category
        </v-col>
        <v-col lg="1" v-for="(item,n) in getCategoriesListObject.data" :key="n">
          <v-btn text  @click="productList(item.categoryId)">{{item.categoryName}}</v-btn>
        </v-col>
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
.logo{
  text-decoration: none
}
</style>