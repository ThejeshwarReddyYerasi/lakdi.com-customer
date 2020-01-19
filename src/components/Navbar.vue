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
        <router-link to="/">Pepperfry</router-link> 
      </v-toolbar-title>
        </v-col>
        <v-col lg="6">
           <input type="text" id="input">
        </v-col>
        <v-col lg="1">
          <v-btn icon>
            <v-icon large>
              search
            </v-icon>
          </v-btn>
        </v-col>
        <v-col lg="1">
          <v-btn icon>
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
          <v-btn text >Sofas</v-btn>
        </v-col>
        <v-col lg="1">
          <v-btn text>Recliners</v-btn>
        </v-col>
        <v-col lg="1">
          <v-btn text>Tables</v-btn>
        </v-col>
        <v-col lg="1">
          <v-btn text>Wardrobe</v-btn>
        </v-col>
        <v-col lg="1">
          <v-btn text>Chairs</v-btn>
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
      
    }),
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