<script setup lang="ts">
/*
 |--------------------------------------------
 |    フローティングラベルスロット
 |--------------------------------------------
 */
interface Props {
    label: string
}
defineProps<Props>()
</script>

<template>
    <div class="form-floating" data-testid="floating-label">
        <slot></slot>
        <label>{{ label }}</label>
    </div>
</template>