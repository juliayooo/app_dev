<template>
  <TabView androidTabsPosition="bottom" :selectedIndex="selectedIndex" @selectedIndexChange="onTabChanged">
    <TabViewItem title="Today">
      <Frame>
        <TodayTab />
      </Frame>
    </TabViewItem>

    <TabViewItem title="Collection" >
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

function onTabChanged({ value }) {
  if (value === 1) {
    eventBus.notify({
      eventName: 'tabChangedToBrowse',
      object: eventBus
    });
  }
}


</script>
