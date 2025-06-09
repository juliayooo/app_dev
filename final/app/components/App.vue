<template>
  <TabView androidTabsPosition="bottom" :selectedIndex="selectedIndex" @selectedIndexChange="onTabChanged">
    <TabViewItem title="Today" class="tab-item">
      <Frame>
        <TodayTab />
      </Frame>
    </TabViewItem>

    <TabViewItem title="Collection" class="tab-item" >
      <Frame>
        <Browse />
      </Frame>
    </TabViewItem>
  </TabView>
</template>

<script setup>
import TodayTab from './Today.vue'
import Browse from './Browse.vue'
import { eventBus } from './bus';
import { ref, onMounted } from 'nativescript-vue'


const selectedIndex = ref(0);

onMounted(() => {
  eventBus.on('tabChangedToBrowse', onTabChanged);
});
function onTabChanged({ value }) {
  if (value === 1) {
    eventBus.notify({
      eventName: 'tabChangedToBrowse',
      object: eventBus
    });
  }
}


</script>
<style lang="scss">
.tab-item {
  font-family: 'monospace';
  font-size: 20px;
  color: #333;
}
</style>