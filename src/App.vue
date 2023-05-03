<template v-bind:="needReload" class="main" >
  <img alt="Vue logo" src="./assets/logo.png">
  <SimpleDemo msg="Welcome to Your Vue.js App"/>
</template>

<script setup>
import {nextTick, provide, ref} from "vue";
import SimpleDemo from "@/components/SimpleDemo";
const needReload=ref(false);
async function reload(){
  needReload.value=true;
  await nextTick(()=>{
    needReload.value=false;
  })
}
provide('reload',reload);
</script>