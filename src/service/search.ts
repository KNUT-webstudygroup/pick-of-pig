// 주소를 좌표로 변환하여 검색
function searchAddressToCoordinate(address : string) {
    naver.maps.Service.geocode({
        query: address
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
        }

        if (response.v2.meta.totalCount === 0) {
            return alert('검색된 주소의 개수: ' + response.v2.meta.totalCount);
        }

        const item = response.v2.addresses[0]; // 검색 결과의 배열 중 첫번째 주소

        insertMarker(Number(item.x), Number(item.y));
    });
}

// 새로운 좌표로 지도 이동 후 마커 삽입
function insertMarker(latitude : number, longitude : number){
    var map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(longitude, latitude),
        zoom: 15,
        mapTypeControl: true
    });
    var marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(longitude, latitude),
    });
}