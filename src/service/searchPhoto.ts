/**
 * 장소 고유 ID로 가게 사진을 얻음
 */
export function placeIdToPhoto(placeId: string, map: google.maps.Map) : Promise<string> {
  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails({ placeId }, (result, status) => {
      if (status === 'OK' && result.photos) {
        resolve(result.photos[0].getUrl({ maxWidth: 500, maxHeight: 500 }));
      } else {
        reject(new Error('placeIdToPhoto failed'));
      }
    });
  });
}

/**
 * 장소 고유 ID로 가게 사진 복수개를 얻음
 */
export function placeIdToPhotos(placeId: string, map: google.maps.Map) : Promise<Array<string>> {
  const photoUrls : Array<string> = [];
  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails({ placeId }, (result, status) => {
      if (status === 'OK' && result.photos) {
        result.photos.forEach((photo) => {
          photoUrls.push(photo.getUrl({ maxWidth: 500, maxHeight: 500 }));
        });
        resolve(photoUrls);
      } else {
        reject(new Error('placeIdToPhotos failed'));
      }
    });
  });
}
