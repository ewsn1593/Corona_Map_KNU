var mapOptions = {
    center: new naver.maps.LatLng(35.888984, 128.610300),
    zoom: 15
};

var map = new naver.maps.Map('map', mapOptions);

buildings = buil_list.replace(/&#39;/g, "\"");
buildings = buildings.replace(/False/g, "false");
var buildings = JSON.parse(buildings);//비로소 building이 배열
var infowindows = new Array();
var markers = new Array();
for(var i=0; i<buildings.length; i++){
    (function(m){
        var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(buildings[m].longitude, buildings[m].latitude),
            map:map,
            animation: 2,
        });
        var contentString = [
            `<h2>${buildings[i].name}</h2>`,
            `    <p>다녀간 인원 중 확진자 발생 수: ${buildings[i].confirm}명</p>`,
            `    <p>의심환자 여부: ${buildings[i].suspicious}</p>`,
            `   <p>방역 여부: ${buildings[i].protection}</p>`,
            `    <p>건물 상태: ${buildings[i].status}</p>`,
            `    <p>기타 알림: ${buildings[i].text}</p>`,
        ].join('');

        var infowindow = new naver.maps.InfoWindow({
            content: contentString
        });
        /*
        marker.onmouseover = function(){
            infowindow.open(map, marker);
        }
        marker.onmouseout = function(){
            infowindow.close();
        }
        */
        infowindows.push(infowindow);
        naver.maps.Event.addListener(marker, 'mouseover', function(){
            infowindow.open(map, marker);
        });
        naver.maps.Event.addListener(marker, 'mouseout', function(){
            infowindow.close()
        });
        markers.push(marker);
        })(i);
}