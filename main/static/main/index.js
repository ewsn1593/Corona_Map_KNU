var knu_coord = new naver.maps.LatLngBounds(
    new naver.maps.LatLng(35.884375, 128.603367),
    new naver.maps.LatLng(35.896619, 128.616585),
)
var infos = document.querySelectorAll('#bullet_info > p')
var button = document.querySelector('#bullet_info > h3');
var menu = document.querySelector('#icon');
var umenu = document.querySelector('#umenum');
var menu_fold = true;
icon.onclick = function(){
    if(menu_fold == true){
        icon.style.color = 'black';
        umenu.style.visibility = 'visible';
    }
    else{
        icon.style.color = 'white';
        umenu.style.visibility = 'hidden';
    }
    menu_fold = ~menu_fold;
};

var show = false;
button.onclick = function(){
    if(show == false){
        for(var i =0; i<infos.length; i++){
            infos[i].style.display = 'block';
        }
     }
     else{
        for(var i=0; i<infos.length; i++){
            infos[i].style.display = 'none';
        }
     }
     show = ~show;
}
button.onmouseover = function(){
    button.style.color = 'red';
}
button.onmouseout = function(){
    button.style.color = 'green';
}
var map = new naver.maps.Map('map');
map.fitBounds(knu_coord)
buildings = buil_list.replace(/&#39;/g, "\"");
buildings = buildings.replace(/False/g, "false");
buildings = buildings.replace(/True/g, "true");
var buildings = JSON.parse(buildings);//비로소 building이 배열
var infowindows = new Array();
var markers = new Array();
for(var i=0; i<buildings.length; i++){
    (function(m){
        var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(buildings[m].longitude, buildings[m].latitude),
            map:map,
            animation: 2,
            icon:{
                url: marker_img,
                size: new naver.maps.Size(35, 35),
            }
        });
        var contentString = [
            `<h2>${buildings[i].name}</h2>`,
            `    <p>확진자 발생 수: ${buildings[i].confirm}명</p>`,
            `    <p>의심환자 여부: ${buildings[i].suspicious}</p>`,
            `    <p>방역 여부: ${buildings[i].protection}</p>`,
            `    <p>건물 상태: ${buildings[i].status}</p>`,
            `    <p>기타 알림: ${buildings[i].text}</p>`,
        ].join('');

        var infowindow = new naver.maps.InfoWindow({
            content: contentString,
        });

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