<script setup lang="ts" generic="T extends string | number">
import { ref, watch } from 'vue'
import { useChoiceModalState, resolveChoiceModal } from './use-choice-modal'

const state = useChoiceModalState<T>()
const dialogRef = ref<HTMLDialogElement | null>(null)

watch(
  () => state.isOpen,
  (isOpen) => {
    if (isOpen) {
      dialogRef.value?.showModal()
    } else {
      dialogRef.value?.close()
    }
  }
)

function choose(item: T) {
  resolveChoiceModal({ ok: true, chosen: item })
}

function cancel() {
  resolveChoiceModal({ ok: false })
}

function onNativeCancel(e: Event) {
  e.preventDefault()
  cancel()
}

function onDialogClick(e: MouseEvent) {
  if (e.target === dialogRef.value) {
    cancel()
  }
}
</script>

<template>
  <dialog
    ref="dialogRef"
    class="choice-modal"
    @cancel="onNativeCancel"
    @click="onDialogClick"
  >
    <div class="choice-modal__content" @click.stop>
      <h2 v-if="state.title" class="choice-modal__title">{{ state.title }}</h2>

      <ul class="choice-modal__list">
        <li v-for="item in state.items" :key="item">
          <button type="button" class="choice-modal__item" @click="choose(item)">
            {{ item }}
          </button>
        </li>
        <li>
          <button
            type="button"
            class="choice-modal__item choice-modal__item--cancel"
            @click="cancel"
          >
            Отмена
          </button>
        </li>
      </ul>
    </div>
  </dialog>
</template>

<style scoped>
.choice-modal {
  border: none;
  border-radius: 8px;
  padding: 0;
  min-width: 240px;
  background: #282828;
  color: #bbb;
}

.choice-modal::backdrop {
  background: rgba(0, 0, 0, 0.6);
}

.choice-modal__content {
  padding: 8px;
}

.choice-modal__title {
  font-size: 14px;
  font-weight: 600;
  color: #bbb;
  margin: 4px 6px 8px;
}

.choice-modal__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.choice-modal__item {
  width: 100%;
  font-size: 14px;
  text-align: left;
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #bbb;
  cursor: pointer;
  transition: background-color 0.1s ease, color 0.1s ease;
}

.choice-modal__item:hover,
.choice-modal__item:focus-visible {
  background: #3a7bd5;
  color: #fff;
  outline: none;
}

.choice-modal__item:active {
  background: #2f63ab;
}

.choice-modal__item--cancel {
  margin-top: 12px;
}
</style>