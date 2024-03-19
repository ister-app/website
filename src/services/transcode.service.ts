
import { ref } from 'vue'
import type { Ref } from 'vue'
import { MediaFile } from '@/generated-sources/openapi/models/MediaFile';
import ApiService from './api.service';


export default class TranscodeService {
    public loaded: Ref<boolean> = ref(false);
    public currentMediaFileId: Ref<string | undefined> = ref();
    public transcodeSesionId: Ref<string | undefined> = ref();
    public stopped: Ref<boolean> = ref(false);

    private apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }



    public async start(mediaFileEntity: MediaFile, startTimeInSeconds: number, audioIndex: string | undefined, subtitleIndex: string | undefined | null): Promise<string> {
        this.loaded.value = false;
        this.stopped.value = false;
        if (subtitleIndex === null) {
            subtitleIndex = undefined;
        }

        var id: string = mediaFileEntity.id!;
        // episodeEntity.mediaFiles?.forEach((file: MediaFile) => { if (file.path?.endsWith("mkv")) { id = file.id } });

        const posts: Promise<string> = (await this.apiService.getTranscoderControllerApi()).start({ mediaFileId: id, startTimeInSeconds: startTimeInSeconds, audioId: audioIndex, subtitleId: subtitleIndex });
        return await posts.then(async (response: string) => {
            this.currentMediaFileId.value = id;
            this.transcodeSesionId.value = response;
            return await this.waitReady().then(() => response)
        })
    }

    public async stop(): Promise<void> {
        this.loaded.value = false;
        this.stopped.value = true;
        return (await this.apiService.getTranscoderControllerApi()).stop({id: this.transcodeSesionId.value!});
    }

    public getStreamUrl(): string {
        return import.meta.env.VITE_BACKEND_URL + '/transcode/download/' + this.transcodeSesionId.value + '/index.m3u8';
    }

    private async waitReady(): Promise<void> {
        var ready = false;
        while (!(ready || this.stopped.value)) {
            await this.checkReady().then(async (result) => {
                if (result === true) {
                    ready = true;
                    this.loaded.value = true;
                } else {
                    await this.pause();
                }
            });

        }
    }

    private async checkReady(): Promise<boolean> {
        const posts: Promise<boolean> = (await this.apiService.getTranscoderControllerApi()).ready({id: this.transcodeSesionId.value!});
        return await posts.then(async (response: boolean) => response);
    }

    private pause() {
        return new Promise((resolve, reject) => setTimeout(() => {
          resolve(1);
        }, 1500));
      }
}
