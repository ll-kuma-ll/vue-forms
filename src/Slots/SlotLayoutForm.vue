<script setup lang="ts">
import { computed } from 'vue';

/*
 |----------------------------------
 |    入力欄レイアウトスロット
 |----------------------------------
 */
interface Props {
    required?: boolean
    invalid?: string
    text?: string
    horizontal?: { label: number, input: number }
}
const props = withDefaults(defineProps<Props>(), {
    required: false,
})

/** ラベルクラス属性値 */
const attrClassLabel = computed(() => !!props.horizontal
    ? [`col-sm-${props.horizontal.label}`, 'col-form-label']
    : ['form-label']
)

/** 入力欄クラス属性値 */
const attrClassInput = computed(() => !!props.horizontal
    ? [`col-sm-${props.horizontal.input}`]
    : []
)
</script>

<template>
    <div data-testid="slot-form">
        <label :class="attrClassLabel" data-testid="slot-form-label">
            <slot name="label"></slot>
            <small v-if="required" class="form-mark-required">*</small>
        </label>
        <div :class="attrClassInput" data-testid="slot-form-input">
            <slot></slot>
            <div v-if="!!invalid" class="invalid-feedback">{{ invalid }}</div>
            <div v-if="!!text" class="form-text">{{ text }}</div>
        </div>
    </div>
</template>