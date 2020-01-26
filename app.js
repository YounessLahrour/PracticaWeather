window.addEventListener("load", ()=>{
    let lat;
    let long;
    let temperatureDescription= document.querySelector('.temperature-description');
    let temperatureDegree= document.querySelector('.temperature-degree');
    let timezone= document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector('.temperature span');
    //let icono= document.querySelector('icon1');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            let proxy="https://cors-anywhere.herokuapp.com/";
            let url=`${proxy}https://api.darksky.net/forecast/427ef2428b19379273138cba08a5ae17/${lat},${long}`;
            
            fetch(url)
            .then(response=>{ return response.json();})
            .then(datos=>{
                const {temperature, summary, icon}= datos.currently;
                //Cambiar los elementos del Dom con la API
                temperatureDescription.textContent=summary;
                temperatureDegree.textContent=temperature;
                timezone.textContent=datos.timezone;
                //Formula para Celsius
                let celsius = (temperature - 32) * (5/9);
                //cambiar el Icono
                setIcons(icon, document.querySelector(".icon"));

                //Cambio de temperatura de Celsius/Farenheit
                temperatureSection.addEventListener("click", ()=>{
                    if(temperatureSpan.textContent ==="F"){
                        temperatureSpan.textContent = "Cº";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent= "F";
                        temperatureDegree.textContent= temperature;
                    }
                });

            });
        });

    }else{
        alert("Amigo, activa la geolocalizacion!!");
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        const currentIcon= icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});