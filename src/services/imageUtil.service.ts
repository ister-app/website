export interface Image {
    language?: string | null | undefined;
    id: string;
    type: string;
}

export default class ImageUtilService {
    public static getCoverImageId(imageEntities: Image[]): string {
        const imageEntitiesCover = imageEntities.filter((image) => image.type === "COVER");
        if (imageEntitiesCover.length !== 0) {
            return imageEntitiesCover[0].id!.toString();
        } else {
            return '';
        }
    }

    public static getBackgroundImageId(imageEntities: Image[]): string {
        const imageEntitiesCover = imageEntities.filter((image) => image.type === "BACKGROUND");
        if (imageEntitiesCover.length !== 0) {
            return imageEntitiesCover[0].id!.toString();
        } else {
            return '';
        }
    }
}
