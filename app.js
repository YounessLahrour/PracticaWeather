window.addEventListener("load", ()=>{
    let lat;
    let long;
    let temperatureDescription= document.querySelector('.temperature-description');
    let temperatureDegree= document.querySelector('.temperature-degree');
    let timezone= document.querySelector('.location-timezone');
    let icono= document.querySelector('icon1');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(`Latitud: ${lat} - Longitud: ${long}`);
            let proxy="https://cors-anywhere.herokuapp.com/";
            let url=`${proxy}https://api.darksky.net/forecast/427ef2428b19379273138cba08a5ae17/${lat},${long}`;
            
            fetch(url)
            .then(response=>{ return response.json();})
            .then(datos=>{
                const {temperature, summary, icon}= datos.currently;
                temperatureDescription.textContent=summary;
                temperatureDegree.textContent=temperature;
                timezone.textContent=datos.timezone;

                setIcons(icon, icono);

            });
        })

        function setIcons(icon, iconID){
            const skycons = new Skycons({"color": "pink"});
            const currentIcon= icon.replace(/-/g,"_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }
    }else{
        alert("Amigo, activa la geolocalizacion!!");
    }
})