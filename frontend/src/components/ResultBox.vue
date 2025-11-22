<template>
  <transition name="fade">
    <div v-if="result" class="result-box">
      <p class="label">당신의 이야기가 조용히 정리되었어요</p>
      <div class="result-content">
        <p class="result-text">{{ result }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  result: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.result-box {
  width: 100%;
  margin-top: var(--spacing-xl);
  animation: fadeInUp 0.5s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.label {
  font-size: var(--font-size-sm);
  font-weight: 400;
  color: var(--color-text-soft);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.result-content {
  background: linear-gradient(135deg, var(--color-white) 0%, var(--color-primary-soft) 100%);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px var(--color-shadow);
  border: 2px solid var(--color-primary-soft);
  position: relative;
  overflow: hidden;
}

.result-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    var(--color-primary) 0%, 
    var(--color-secondary) 50%, 
    var(--color-accent) 100%);
}

.result-text {
  font-size: var(--font-size-lg);
  font-weight: 300;
  line-height: 1.9;
  color: var(--color-text);
  text-align: center;
  word-break: keep-all;
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .result-content {
    padding: var(--spacing-lg);
  }
  
  .result-text {
    font-size: var(--font-size-base);
  }
}
</style>
