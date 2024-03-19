import { App, inject } from 'vue'
import type { InjectionKey } from 'vue'
import ApiService from '@/services/api.service';

const apiServiceKey = Symbol() as InjectionKey<ApiService>

export const ApiPlugin = {
    install: (app: App) => {
        app.provide(apiServiceKey, new ApiService());
    }
}

export function useApiService(): ApiService | undefined {
    return inject(apiServiceKey)
}
