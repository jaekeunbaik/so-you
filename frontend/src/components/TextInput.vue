<template>
  <div class="text-input">
    <label for="text-input" class="label">
      당신의 이야기를 들려주세요
    </label>
    <textarea
      id="text-input"
      v-model="localValue"
      @input="handleInput"
      class="textarea"
      placeholder="오늘 하루 정말 힘들어..."
      rows="6"
      maxlength="1000"
    ></textarea>
    <div class="char-count">
      {{ localValue.length }} / 1000
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});

const handleInput = () => {
  emit('update:modelValue', localValue.value);
};
</script>

<style scoped>
.text-input {
  width: 100%;
}

.label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 400;
  color: var(--color-text-soft);
  margin-bottom: var(--spacing-sm);
  text-align: center;
}

.textarea {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-white);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--font-size-base);
  font-weight: 300;
  line-height: 1.7;
  resize: vertical;
  min-height: 150px;
  box-shadow: 0 4px 20px var(--color-shadow);
  transition: all var(--transition-base);
}

.textarea::placeholder {
  color: var(--color-text-soft);
  opacity: 0.5;
}

.textarea:hover {
  box-shadow: 0 6px 24px var(--color-shadow);
}

.textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 6px 24px var(--color-shadow),
              0 0 0 3px var(--color-primary-soft);
  outline: none;
}

.char-count {
  margin-top: var(--spacing-xs);
  text-align: right;
  font-size: var(--font-size-sm);
  color: var(--color-text-soft);
  font-weight: 300;
}

@media (max-width: 768px) {
  .textarea {
    font-size: var(--font-size-sm);
    padding: var(--spacing-sm);
  }
}
</style>
