'use client';

import type { PlaceReturnType } from '@/types/definitions';
import { LocationType } from '../types/location';
import MapNode from './MapObject/MapNode';
/**
 * 이 ts파일에는 구글지도 API를 사용하여 주소를 통해 맛집을 검색하는 함수가 포함되어 있습니다.
 * 검색은, 제일 먼저 "위치" Keyword를 통하여 좌표를 확보합니다.
 * 그리고 해당 좌표를 기반으로 반경내의 맛집을 검색합니다.
 * 이후, 검색된 맛집들의 정보를 통하여 MapNode 객체를 생성하여 활용합니다.
 */

function addMarker(coord: google.maps.LatLng, map: google.maps.Map) {
  const marker = new google.maps.Marker({
    map,
    position: coord,
  });
  return marker;
}

function addMarkers(coords : Array<google.maps.LatLng>, map: google.maps.Map) {
  const bounds = new google.maps.LatLngBounds();

  coords.forEach((coord) => {
    addMarker(coord, map);
    map.setCenter(coord);
    bounds.extend(coord);
  });

  // 다중 마커일 때 모두 보이도록 지도의 경계 변경
  if (coords.length > 1) {
    map.fitBounds(bounds);
  }
}

type AddressToPlaceIdsReturnType = {
  ret : boolean // 만약 추가로 검색할 필요가 없으면 true, 추가로 검색해야 한다면 false
  ids : Array<string> | null, // 추가로 검색할 필요가 없다면 장소 ID 배열
  location : google.maps.LatLng | null// 추가로 검색해야 한다면 좌표
  option?:{
    regin_tier? : RegionTier // 지역의 등급 -> 지역의 등급에 따라서 반경을 달리 검색
  }
};
const enum RegionTier {
  COUNTRY = 0,
  PROVINCE = 1,
  CITY = 2,
  DISTRICT = 3,
  POINT_OF_INTEREST = 4,
}

/**
 * 주소를 통하여 맛집으로 추정가능한 장소의 고유 ID를 얻음
 * @param address 대상 주소임
 * @returns 주소가 유효하여 탐색가능하였다면 장소 ID 배열을 반환, 그렇지 않다면 유효한 것으로 보이는 장소의 좌표 혹은 아예 없음을 리턴
 */
function addressToPlaceIds(address: string) : Promise<AddressToPlaceIdsReturnType> {
  const returns:AddressToPlaceIdsReturnType = {
    ret: false,
    ids: null,
    location: null,
  };

  const placeIds: Array<string> = [];
  const geocoder = new google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({
      address,
    }, (results, status) => {
      if (status === 'OK') {
        switch (results[0].geometry.location_type) {
          case google.maps.GeocoderLocationType.APPROXIMATE:
            returns.ret = false;
            returns.option = {};
            switch (results[0].types[0]) {
              case 'country':
                returns.option.regin_tier = RegionTier.COUNTRY;
                break;
              case 'administrative_area_level_1':
                returns.option.regin_tier = RegionTier.PROVINCE;
                break;
              case 'locality':
                returns.option.regin_tier = RegionTier.CITY;
                break;
              default:
                returns.option.regin_tier = RegionTier.DISTRICT;
            }
            break;
          case google.maps.GeocoderLocationType.ROOFTOP:
            if (results[0].types.includes('point_of_interest') === true) {
              returns.ret = false;
              returns.option = {
                regin_tier: RegionTier.POINT_OF_INTEREST,
              };
            }
            break;
          default:
            returns.ret = true;
            results.forEach((result) => {
              placeIds.push(result.place_id);
            });
            returns.ids = placeIds;
        }
        returns.location = results[0].geometry.location;

        resolve(returns);
      } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
        returns.ret = false;
        returns.location = null;
        resolve(returns);
      } else {
        reject(new Error('addressToPlaceIds failed'));
      }
    });
  });
}

/**
 * placeId를 통해 가게에 대한 검색결과를 얻음.
 * 기존의 분리된 이름 검색 및 좌표 불러오기 등을 이 함수에 모두 줄임.
 * * 필요시 template를 사용하여 필터를 사용하여도 됨.
 * 이때, 자바스크립트 내부에 캐싱을 통하여 검색량 줄임.
 * 저장된 데이터를 지우기 위해 브라우저에서 별도로 캐시지우기등은 할 필요 없음.
 * @param placeId 대상 placeId임
 * @param map 지도임.
 * @returns PlaceReturnType
 */
export function placeIdToObject(placeId: string, map: google.maps.Map) : Promise<PlaceReturnType> {
  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails({ placeId }, (result, status) => {
      if (status === 'OK') {
        const ret:PlaceReturnType = {
          name: result.name,
          rating: result.rating ?? 0,
          price_level: result.price_level ?? 0,
          coord: result.geometry?.location ?? null,
          types: result.types ?? [],
          reviews: result.reviews ?? [],
          photo: result.photos,
          isopen: result.opening_hours?.isOpen(),
          phone: result.formatted_phone_number,
          address: result.formatted_address,
        };
        resolve(ret);
      } else {
        reject(new Error('placeIdToName failed'));
      }
    });
  });
}

/**
 * 입력한 좌표애 대하여 지정된 반경안의 맛집의 고유 ID를 얻음
 * @param coord 중앙 좌표
 * @param map 구글 지도
 * @param types 검색 종류
 * @param radius 반경
 * @returns 검색된 맛집의 IDS
 */
function searchNearbyCoordsToId(
  coord: google.maps.LatLng,
  map: google.maps.Map,
  types:Array<string> = ['restaurant', 'bakery', 'bar', 'cafe'], // default 변수 존재 사유 : "최소한 음식점을 걸러내기 위하여"
  radius:number = 200.0,
  maxCount:number = 20,
): Promise<Array<{
    id: string;
    location: {
      latitude: number;
      longitude: number;
    };
  }>> {
  return new Promise((resolve, reject) => {
    // if (token === null) {
    //   reject(new Error('searchNearbyCoordsToId failed, credential is not set'));
    //   return;
    // }
    fetch( // 필요시 HTTP 에서 gGRPC로 변경 (사실 내 연구사항이라 우선순위 낮음)
      'https://places.googleapis.com/v1/places:searchNearby',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-FieldMask': 'places.id,places.location',
          'X-Goog-Api-Key': process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? '',
        },
        body: JSON.stringify({
          includedTypes: types, // ! unsupported type에 관한 처리 필요 !
          maxResultCount: maxCount,
          locationRestriction: {
            circle: {
              center: {
                latitude: coord.lat(),
                longitude: coord.lng(),
              },
              radius,
            },
          },
        }),
      },
    ).then((response) => response.json().then(
      (ret) => {
        if (ret.error !== undefined) {
          reject(new Error(ret.error.message));
        } else resolve(ret.places);
      },
    ))
      .catch((error) => {
        reject(error);
      });

  //   service.nearbySearch({
  //     location: coord,
  //     types,
  //     radius,
  //   }, (results, status) => {
  //     if (status === 'OK') {
  //       results.forEach((result) => {
  //         if (result.place_id) {
  //           placeIds.push({
  //             placeId: result.place_id,
  //             position: result.geometry?.location ?? new google.maps.LatLng(0, 0),
  //           });
  //         }
  //       });
  //       resolve(placeIds);
  //     } else {
  //       reject(new Error('searchNearbyCoordsToId failed'));
  //     }
  //   });
  });
}

// PK인 placeId를 통해 가게 Object를 얻음
const placeIdMap = new Map<string, MapNode>();

/**
 * 해당 장소 ID에 대하여 MapNode 객체를 반환
 */
export async function getMapNode(placeId: string, map: google.maps.Map) : Promise<MapNode> {
  if (placeIdMap.has(placeId)) {
    return placeIdMap.get(placeId) as MapNode;
  }
  const comment: Array<string> = [];
  const scores: Array<number> = [];

  const mapObject = await placeIdToObject(placeId, map);

  const location : LocationType = {
    latitude: mapObject.coord?.lat() ?? 0,
    longitude: mapObject.coord?.lng() ?? 0,
  };

  mapObject.reviews?.forEach((review) => {
    comment.push(review.text);
    scores.push(review.rating);
  });

  const score = {
    comment,
    scores,
  };
  const photoUrl = mapObject.photo !== undefined ? mapObject.photo[0].getUrl({ maxWidth: 500, maxHeight: 500 }) : '';

  const placeNode = new MapNode(placeId, mapObject.name, location, score, mapObject, photoUrl);
  placeIdMap.set(placeId, placeNode);
  return placeNode;
}

/**
 * 장소 ID 배열에 대하여 MapNode 객체 배열을 반환
 */
async function getMapNodes(placeIds: Array<string>, map: google.maps.Map)
  : Promise<Array<MapNode>> {
  const mapNodePromises : Array<Promise<MapNode | undefined>> = placeIds.map(async (placeId) => {
    try {
      return await getMapNode(placeId, map);
    } catch (error) {
      console.log(`${error} 해당 정보가 존재하지 않아 MapNode를 생성할 수 없습니다.`);
    }
  });

  const mapNodeResults = await Promise.all(mapNodePromises);
  const mapNodes = mapNodeResults.filter((result): result is MapNode => result !== undefined);
  return mapNodes;
}

/**
 * MapNode 객체 배열을 점수를 기준으로 내림차순 정렬
 */
function sortMapNodesByScore(mapNodes: Array<MapNode>) : Array<MapNode> {
  const sortedMapNodes = [...mapNodes];
  // TODO : 정렬기준 다중화
  sortedMapNodes.sort((left, right) => {
    const leftLocation = left.location;
    const rightLocation = right.location;
    return right.GetScore(leftLocation) - left.GetScore(rightLocation);
  });

  return sortedMapNodes;
}

const getValidCount = (count?:number) => {
  if (count === undefined) return 20;
  if (count <= 20 && count > 0) return count;
  return 20;
};
/**
 * 검색 옵션
 */
type SearchOption = {
  map?: google.maps.Map; // 지도
  types?: Array<string>; // 추가로 검색할 타입
  // https://developers.google.com/maps/documentation/javascript/supported_types?hl=ko&_gl=1*1yh6ynu*_up*MQ..*_ga*NTM5NjU1MTA5LjE3MTQ0ODc2MTM.*_ga_NRWSTWS78N*MTcxNDQ4NzYxMy4xLjAuMTcxNDQ4NzYxMy4wLjAuMA..
  radius?: number; // 검색할 반경
  negativeFilter?: Array<'restaurant' | 'bakery' | 'bar' | 'cafe'>; // 제외할 타입
  // 정렬함수 (이 함수가 0보다 작으면 left가 right보다 앞에 위치한다.)
  sortFunction?: (left: MapNode, right: MapNode) => number;
  filteringFunction?: (node: MapNode) => boolean; // 필터링 함수 (이 함수가 true인 node만 반환한다.)
  maxResultCount?:number // 최대 결과 수
};

/**
 * 사용자가 입력한 주소를 기반으로 근처 맛집들의 위치에 마커 추가
 * - 이 함수는 주소가 있다는 가정하에 발동하는 함수이다!
 * @param address 사용자가 입력한 주소, 정확하지 않은 주소로 가정한다.
 */

export default async function searchNearbyPlace(
  address: string,
  options?: SearchOption,
) : Promise<Array<MapNode>> {
  // 은총탄은 없지만 유저가 쓸수는 있어야한다...
  const center: google.maps.LatLng | google.maps.LatLngLiteral = options?.map?.getCenter()
  ?? { lat: 37.3595316, lng: 127.1052133 };
  const map = options?.map ?? new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center,
    zoom: 15,
  });
  const placeSearchResult = await addressToPlaceIds(address);
  if (placeSearchResult.location === null) {
    return [];
  }

  let radius = options?.radius;
  if (radius === undefined) {
    switch (placeSearchResult.option?.regin_tier) {
      case RegionTier.COUNTRY:
        radius = 1_000_000;
        break;
      case RegionTier.PROVINCE:
        radius = 100_000;
        break;
      case RegionTier.CITY:
        radius = 10_000;
        break;
      case RegionTier.DISTRICT:
        radius = 1_000;
        break;
      case RegionTier.POINT_OF_INTEREST:
        radius = 2_000;
        break;
      default:
        radius = 200.0;
    }
  }
  const searchingZone = placeSearchResult.location;
  let coord = placeSearchResult.location;
  if (coord === null) {
    coord = new google.maps.LatLng(0, 0);
  }
  const searchTypes:string[] = [];
  if (options?.negativeFilter !== undefined) {
    searchTypes.filter((type) => !options?.negativeFilter?.includes(type as 'restaurant' | 'bakery' | 'bar' | 'cafe'));
  }
  if (options?.types !== undefined) {
    searchTypes.push(...options.types); // 추가로 검색할 타입이 있다면 추가
  }
  try {
    const nearbyPlaceIds = await searchNearbyCoordsToId(
      searchingZone,
      map,
      searchTypes,
      radius,
      getValidCount(options?.maxResultCount), // 지정 안되있다면 20개.
    );
    const filteringFunction = options?.filteringFunction ?? ((a: MapNode) => true);
    const mapNodes = (await getMapNodes(nearbyPlaceIds.map((a) => a.id), map))
      .filter(filteringFunction);
    const sortedMapNodes = options?.sortFunction
      ? mapNodes.sort(options.sortFunction)
      : sortMapNodesByScore(mapNodes);

    const latLngs: Array<google.maps.LatLng> = [];
    sortedMapNodes.forEach((node) => {
      const latLng = new google.maps.LatLng(node.location.latitude, node.location.longitude);
      latLngs.push(latLng);
    });
    addMarkers(latLngs, map);

    return sortedMapNodes;
  } catch (error) {
    // !! 명백한 에러 !!
    // eslint-disable-next-line no-console
    console.error(error);
    return [];
  }
}
