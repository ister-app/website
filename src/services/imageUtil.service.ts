import {ImageEntity, ImageEntityTypeEnum} from "@/generated-sources/openapi";

export default class ImageUtilService {
    public static getCoverImageId(imageEntities: ImageEntity[]): string {
        var imageEntitiesCover = imageEntities.filter((imageEntity) => imageEntity.type === ImageEntityTypeEnum.Cover);
        if (imageEntitiesCover.length !== 0) {
            return imageEntitiesCover[0].id!.toString();
        } else {
            return '';
        }
    }

    public static getBackgroundImageId(imageEntities: ImageEntity[]): string {
        var imageEntitiesCover = imageEntities.filter((imageEntity) => imageEntity.type === ImageEntityTypeEnum.Background);
        if (imageEntitiesCover.length !== 0) {
            return imageEntitiesCover[0].id!.toString();
        } else {
            return '';
        }
    }
}
