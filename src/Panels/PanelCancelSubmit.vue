<script setup lang="ts">
import FormButton from '../Forms/FormButton.vue'

/*
 |--------------------------------------------------------
 |    キャンセル・登録ボタンパネルコンポーネント
 |--------------------------------------------------------
 */

interface Props {
    labelCancel?: string
    labelSubmit?: string
    viewTypeCancel?: string
    viewTypeSubmit?: string
    iconCancel?: string
    iconSubmit?: string
}
withDefaults(defineProps<Props>(), {
    labelCancel: 'キャンセル',
    labelSubmit: '登録',
    viewTypeCancel: 'outline-secondary',
    viewTypeSubmit: 'primary'
})
defineEmits<{
    (e: 'cancel'): void
    (e: 'submit'): void
}>()
</script>

<template>
    <div class="panel-cancel-submit" data-testid="panel-cancel-submit">
        <FormButton
            :label="labelCancel"
            :view-type="viewTypeCancel"
            :is-small="true"
            :icon="iconCancel"
            testid="btn-cancel"
            @click="$emit('cancel')"
        />
        <FormButton
            :label="labelSubmit"
            :view-type="viewTypeSubmit"
            :icon="iconSubmit"
            testid="btn-submit"
            @click="$emit('submit')"
        />
    </div>
</template>