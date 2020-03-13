var knu_coord = new naver.maps.LatLngBounds(
    new naver.maps.LatLng(35.884375, 128.603367),
    new naver.maps.LatLng(35.896619, 128.616585),
);
var infos = document.querySelectorAll('#bullet_info > p');
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
var current_c = 'green';
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
};

button.ontouchstart = function(){
    button.style.color = 'red';
    current_c = 'green';
};

button.ontouchend = function(){
    button.style.color = 'green';
    current_C = 'green'
};

button.onmouseover = function(){
    button.style.color = 'red';
    current_c = 'red';
};
button.onmouseout = function(){
    button.style.color = 'green';
    current_c = 'green';
};
var map = new naver.maps.Map('map');
map.fitBounds(knu_coord);
buildings = buil_list.replace(/&#39;/g, "\"");
buildings = buildings.replace(/False/g, "false");
buildings = buildings.replace(/True/g, "true");


pbuils = pbuil_list.replace(/&#39;/g, "\"");


/* for quarantine */
var quarantine = new naver.maps.Polygon({
    map: map,
    paths: [
        [
            new naver.maps.LatLng(35.8916097, 128.6141757),
            new naver.maps.LatLng(35.8914696, 128.6142381),
            new naver.maps.LatLng(35.8915717, 128.6145506),
            new naver.maps.LatLng(35.8912142, 128.6147276),
            new naver.maps.LatLng(35.8912827, 128.6149368),
            new naver.maps.LatLng(35.8909633, 128.6150977),
            new naver.maps.LatLng(35.8910904, 128.6154974),
            new naver.maps.LatLng(35.8912153, 128.6154357),
            new naver.maps.LatLng(35.8911241, 128.6151474),
            new naver.maps.LatLng(35.8913251, 128.6150468),
            new naver.maps.LatLng(35.8914174, 128.6153284),
            new naver.maps.LatLng(35.8915597, 128.6152573),
            new naver.maps.LatLng(35.8914717, 128.6149717),
            new naver.maps.LatLng(35.8916879, 128.6148577),
            new naver.maps.LatLng(35.8917846, 128.6151353),
            new naver.maps.LatLng(35.8919107, 128.6150696),
        ]
    ],
    fillColor: '#ff0000',
    fillOpacity: 0.6,
    strokeColor: '#ff0000',
    strokeOpacity:0.6,
    strokeWeight: 1
});

var quarantineCoord = new naver.maps.LatLng(35.8914527, 128.61479);

var changeString;
if(qchange > 0){
    changeString = `<p>인원변동: <font color="red">+${qchange}</font> </p>`;
}
else if(qchange<0){
    changeString = `<p>인원변동: <font color="blue">${qchange}</font> </p>`;
}

else{
    changeString = `<p>인원변동: ${qchange} </p>`;
}

var quaranContent = [
            `<h2>첨성관</h2>`,
            `<h4 class = "red">!생활치료센터 지정!</h4>`,
            `<p>현원: ${qnum} 명</p>`,
            changeString,
            `<p>입소: ${qin} 명</p>`,
            `<p>전원: ${qtoHos} 명</p>`,
            `<p>퇴소: ${qout} 명</p>`,
        ].join('');

var quaranInfo = new naver.maps.InfoWindow({
            content: quaranContent,
        });

var qmarker = new naver.maps.Marker({
            position: quarantineCoord,
            map:map,
            animation: 2,
            icon:{
                url: marker_img,
                size: new naver.maps.Size(35, 35),
            }
        });

naver.maps.Event.addListener(qmarker, 'mouseover', function(){
    quarantine.setOptions({
        fillOpacity : 1
    });
    quaranInfo.open(map, qmarker);
});
naver.maps.Event.addListener(qmarker, 'click', function(){
    quarantine.setOptions({
        fillOpacity : 1
    });
    quaranInfo.open(map, qmarker);
});
naver.maps.Event.addListener(qmarker, 'mouseout', function(){
    quarantine.setOptions({
        fillOpacity : 0.6
    });
    quaranInfo.close()
});


var pbuils = JSON.parse(pbuils);
var pbuil_info = new Array();
var pbuil_markers = new Array();
for(var i=0; i<pbuils.length; i++){
    (function(m){
        var position = new naver.maps.LatLng(pbuils[m].longitude, pbuils[m].latitude);
        var marker = new naver.maps.Marker({
            map: map,
            position: position,
            icon: {
                path: naver.maps.SymbolPath.CIRCLE,
                center: position,
                radius: 8,
                anchor: naver.maps.Position.CENTER,
                fillColor:'yellowgreen',
                fillOpacity:1,
                strokeOpacity: 1,
                strokeWeight:1,
            }
        });
        var contentString = [
            `<h2>${pbuils[i].name}</h2>`,
            `    <p>${pbuils[i].date} 방역</p>`,
        ].join('');

        var info = new naver.maps.InfoWindow({
            content: contentString,
        });

        naver.maps.Event.addListener(marker, 'mouseover', function(){
            info.open(map, marker);
        })
        naver.maps.Event.addListener(marker, 'click', function(){
            info.open(map, marker);
        });
        naver.maps.Event.addListener(marker, 'mouseout', function(){
            info.close()
        });
    })(i);
}

/*=========================================================================*/

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
            `    <p>확진자 발생 수: ${buildings[i].confirm}명</p>`,
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
        naver.maps.Event.addListener(marker, 'click', function(){
            infowindow.open(map, marker);
        });
        naver.maps.Event.addListener(marker, 'mouseout', function(){
            infowindow.close()
        });
        markers.push(marker);
        })(i);
}