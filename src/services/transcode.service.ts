
import { ref } from 'vue'
import type { Ref } from 'vue'
import { Configuration, Episode, MediaFile, TranscoderControllerApi } from '@/generated-sources/openapi';


export default class TranscodeService {
    public loaded: Ref<boolean> = ref(false);
    public currentMediaFileId: Ref<string | undefined> = ref();
    public transcodeSesionId: Ref<string | undefined> = ref();
    public stopped: Ref<boolean> = ref(false);



    private configuration = new Configuration({
        basePath: 'http://localhost:8080',
    });

    private postsApi = new TranscoderControllerApi(this.configuration);



    public async start(mediaFileEntity: MediaFile, startTimeInSeconds: number, audioIndex: number | undefined, subtitleIndex: number | undefined | null): Promise<string> {
        this.loaded.value = false;
        this.stopped.value = false;
        if (subtitleIndex === null) {
            subtitleIndex = undefined;
        }

        var id: string = mediaFileEntity.id!;
        // episodeEntity.mediaFiles?.forEach((file: MediaFile) => { if (file.path?.endsWith("mkv")) { id = file.id } });

        const posts: Promise<string> = this.postsApi.start({ mediaFileId: id, startTimeInSeconds: startTimeInSeconds, audioIndex: audioIndex, subtitleIndex: subtitleIndex });
        return await posts.then(async (response: string) => {
            this.currentMediaFileId.value = id;
            this.transcodeSesionId.value = response;
            return await this.waitReady().then(() => response)
        })
    }

    public stop(): Promise<void> {
        this.loaded.value = false;
        this.stopped.value = true;
        return this.postsApi.stop({id: this.transcodeSesionId.value!});
    }

    public getStreamUrl(): string {
        return 'http://localhost:8080/transcode/download/' + this.transcodeSesionId.value + '/index.m3u8';
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
        const postsApi = new TranscoderControllerApi(this.configuration);
        const posts: Promise<boolean> = postsApi.ready({id: this.transcodeSesionId.value!});
        return await posts.then(async (response: boolean) => response);
    }

    private pause() {
        return new Promise((resolve, reject) => setTimeout(() => {
          resolve(1);
        }, 1500));
      }
}
