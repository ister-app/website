import { ImageEntity, ImageEntityTypeEnum } from "@/generated-sources/openapi";

export default class ImageUtilService {
    private static BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

    public static getCoverImageUrl(imageEntities: ImageEntity[]): string {
        var imageEntitiesCover = imageEntities.filter((imageEntity) => imageEntity.type === ImageEntityTypeEnum.Cover);
        if (imageEntitiesCover.length !== 0) {
            return ImageUtilService.BACKEND_URL + '/images/' + imageEntitiesCover[0].id + '/download';
        } else {
            console.log(imageEntitiesCover);
            return '';
        }
    }

    public static getBackgroundImageUrl(imageEntities: ImageEntity[]): string {
        var imageEntitiesCover = imageEntities.filter((imageEntity) => imageEntity.type === ImageEntityTypeEnum.Background);
        if (imageEntitiesCover.length !== 0) {
            return ImageUtilService.BACKEND_URL + '/images/' + imageEntitiesCover[0].id + '/download';
        } else {
            console.log(imageEntitiesCover);
            return '';
        }
    }
}