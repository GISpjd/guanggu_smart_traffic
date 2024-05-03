<template>
  <!-- 确保prototype上的map属性在其它组件使用之前就已挂载好 -->
  <BaseMap />
  <HomeHeader />
  <MapControl />
  <MapToggle />
  <GuangguMap />
  <DirectoryTreeCard />
</template>

<script setup>
import BaseMap from '@/components/BaseMap/BaseMap.vue';
import MapControl from '@/components/MapControl.vue';
import HomeHeader from '@/components/HomeHeader/HomeHeader.vue';
import MapToggle from '@/components/MapToggle.vue';
import GuangguMap from '@/components/GuangguMap.vue';
import DirectoryTreeCard from '@/components/DirectoryTreeCard/DirectoryTreeCard.vue';
</script>
