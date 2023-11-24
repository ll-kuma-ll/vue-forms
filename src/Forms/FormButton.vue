<script setup lang="ts">
import { computed, inject } from 'vue'
import { providerIconKey } from '../keys'

/*
 |----------------------------------
 |    ボタンコンポーネント
 |----------------------------------
 */

interface Props {
    label: string
    type?: 'button' | 'submit' | 'reset'
    isSmall?: boolean
    // 見た目の種類 (bootstrap button class type)
    viewType?: string
    // アイコン利用の場合はアイコンクラス名
    icon?: string
    testid?: string
}
const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    viewType: 'primary',
    testid: 'form-button',
})
/** アイコン提供者クラス(bi,fas,...) */
const providerIcon = inject(providerIconKey, 'bi')
defineEmits<{
    (e: 'click'): void
}>()
const attrClassButton = computed(() => [
    'btn',
    `btn-${props.viewType}`,
    props.isSmall ? 'btn-sm' : '',
])
const attrClassIcon = computed(() => [
    providerIcon,
    props.icon,
])
</script>

<template>
    <button :type="type" :class="attrClassButton" :data-testid="testid" @click="$emit('click')">
        <i v-if="!!icon" :class="attrClassIcon"></i>{{ label }}
    </button>
</template>