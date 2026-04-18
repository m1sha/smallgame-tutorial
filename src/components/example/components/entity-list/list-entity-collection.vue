<script setup lang="ts">
import { computed } from 'vue';
import { IListEntityCollection } from '../../code/enity-list/collections';

const props = defineProps<{ collection: IListEntityCollection}>()

const entities = computed(() => props.collection.objs.map(p => props.collection.map(p)))

</script>

<template>
  <div v-for="value in entities">
    {{  value.caption }}
  </div>
</template>