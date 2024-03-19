<template>
</template>
  
<script lang="ts" setup>
import { useApiService } from '@/plugins/api';
import { useRouter } from 'vue-router/auto';

const router = useRouter()

useApiService()?.authService?.userManager.signinCallback()
    .finally(() => {
        console.log("callback handled");
        router.replace({ name: '/' });
    });
</script>
