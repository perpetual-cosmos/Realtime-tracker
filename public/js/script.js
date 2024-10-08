const socket =io();
if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude, longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude});
    }),
    (error)=>{
        console.log("error while navigation geolocation");
    },
    {
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0,
    }
    
}

const map=L.map("map").setView([0,0],16);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    atrribution:"openStreetMap"
}).addTo(map)

const markers={};

socket.on("recieve-location",(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }
})

//project is done
