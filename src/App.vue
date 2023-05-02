<template v-bind:="needReload" class="main" >
  <img alt="Vue logo" src="./assets/logo.png">
  <Demo msg="Welcome to Your Vue.js App"/>
</template>

<script setup>
import {nextTick, provide, ref} from "vue";
import Demo from "@/components/Demo";
const needReload=ref(false);
async function reload(){
  needReload.value=true;
  await nextTick(()=>{
    needReload.value=false;
  })
}
provide('reload',reload);
</script>
