<template>
  <v-card>
    <v-toolbar flat>
      <v-row>
        <v-col lg="2">
      <v-avatar>
        P
      </v-avatar>
        </v-col>
        <v-col lg="1">
      <v-toolbar-title style="margin-top:8px">
        <router-link to="/">Lakdi.Com</router-link> 
      </v-toolbar-title>
        </v-col>
        <v-col lg="6">
           <input type="text" id="input" v-model="searchString">
        </v-col>
        <v-col lg="1">
          <v-btn icon @click="search" :disabled="searchString==''">
            <!-- <router-link :to="`/search/${searchString}`"> -->
              <v-icon large>
              search
              </v-icon>
            <!-- </router-link> -->
          </v-btn>
        </v-col>
        <v-col lg="1">
          <v-btn icon @click="cart">
            <v-icon large>add_shopping_cart</v-icon>
          </v-btn>
        </v-col>
        <v-col lg="1" >
          <v-btn text>profile</v-btn>
        </v-col>
      </v-row>
      <!-- <input type="text" id="input"> -->
      <!-- <v-text-field label="Outlined" single-line outlined height="3"></v-text-field> -->
    </v-toolbar>
    <v-divider></v-divider>
    <v-system-bar height="40" color="#ffffff">
      <v-row>
        <v-col lg="1"></v-col>
        <v-col lg="1"></v-col>
        <v-col lg="1"></v-col>
        <v-col lg="1">
          Shop By Category
        </v-col>
        <v-col lg="1">
          <v-btn text  @click="productList('sofa')">Sofas</v-btn>
        </v-col>
        <v-col lg="1">
          <v-btn text @click="productList('recliner')">Recliners</v-btn>
        </v-col>
        <v-col lg="1">
          <v-btn text @click="productList('table')">Tables</v-btn>
        </v-col>
        <v-col lg="1">
          <v-btn text @click="productList('wradrobe')">Wardrobe</v-btn>
        </v-col>
        <v-col lg="1">
          <v-btn text @click="productList('mattress')">Mattress</v-btn>
        </v-col>
        <v-col lg="1"></v-col>
        <v-col lg="1"></v-col>
        <v-col lg="1"></v-col>
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
      productList(category){
        if(this.$route.query.category!=category){
        this.$router.push({path:'/productList',query:{category:category}})
        this.$store.dispatch('updateCategory',category)
        }
      },
      cart(){
        this.$router.push({path:'/cart'})
      },
      search(){
      if(this.$route.query.searchString!=this.searchString){
          this.$router.push({path:'/search',query:{searchString:this.searchString}});
          this.$store.dispatch('search',this.searchString);
          }
      },
    },
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
</style>