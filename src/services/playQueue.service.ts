import { PlayQueueControllerApi, PlayQueueEntity, PlayQueueItemEntity } from "@/generated-sources/openapi";

export default class PlayQueueService {
    playQueueControllerApi: PlayQueueControllerApi;
    /** The UUID of the current playing item */
    currentItem: string | undefined;
    currentQueue: PlayQueueEntity | undefined;

    constructor(api: PlayQueueControllerApi) {
        this.playQueueControllerApi = api;
    }

    public async createPlayQueueForShow(showId: string, itemId: string) {
        this.currentQueue = await this.playQueueControllerApi.createNewForShow({ showId: showId });
        this.setCurrentItem(itemId);
    }

    public setCurrentItem(itemId: string) {
        this.currentItem = this.currentQueue?.items.find(item => item.itemId === itemId)?.id;
        console.log(this.currentItem);
    }

    public getNextItem(): PlayQueueItemEntity | undefined {
        if (this.currentQueue?.items) {
            const currentIndex = this.currentQueue.items.findIndex(item => item.id === this.currentItem);
            if (currentIndex !== -1 && this.currentQueue.items.length > currentIndex + 1) {
                return this.currentQueue.items[currentIndex + 1];
            }
        }
    }
}