// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

function statusUpdate() {
   const launchStat = document.getElementById("launchStatus");
   document.getElementById("launchStatus").style.color = "green";
   launchStat.innerHTML = `Shuttle is ready for launch`;
}

function fuelUpdate(x) {
   x = Number(x);
   const fStat = document.getElementById("fuelStatus");
   const launchStat = document.getElementById("launchStatus");
   if (x < 10000) {
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("launchStatus").style.color = "red";
      launchStat.innerHTML = `Shuttle not ready for launch`;
      fStat.innerHTML = `Fuel level too low for launch.`;
   } 
}

function cargoUpdate(x) {
   x = Number(x);
   const cargoStat = document.getElementById("cargoStatus");
   const launchStat = document.getElementById("launchStatus");
   if (x > 10000) {
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("launchStatus").style.color = "red";
      launchStat.innerHTML = `Shuttle not ready for launch`;
      cargoStat.innerHTML = `Cargo mass too high for launch.`;
   } 
}

window.addEventListener("load", function() {
   let form = document.querySelector("form");

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
   response.json().then(function(json) {
      const destination = document.getElementById("missionTarget");
      destination.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[3].name}</li>
            <li>Diameter: ${json[3].diameter}</li>
            <li>Star: ${json[3].star}</li>
            <li>Distance from Earth: ${json[3].distance}</li>
            <li>Number of Moons: ${json[3].moons}</li>
         </ol>
         <img src="${json[3].image}">
         `;
      });
   });
   

   form.addEventListener("submit", function(event) {
      // document.getElementById("faultyItems").style.visibility = "visible";
      
      //Here are variable created at beginning of eventListener
      let pilotInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuelInput = document.querySelector("input[name=fuelLevel]");
      let cargoInput = document.querySelector("input[name=cargoMass]");
      let arr = [pilotInput, copilotInput, fuelInput, cargoInput];
      
      //Here we check to ensure the user entered something in every box
      for (let i = 0; i < arr.length; i++) {
         if (arr[i].value === "") {
            alert("All fields are required!");
            event.preventDefault();
         }
      }

      //Here we check if the user entered numbers and strings is proper boxes
      if (!isNaN(pilotInput.value)) {
         alert("Incorrect data type for Pilot's Name.");
         event.preventDefault();
      } else if (!isNaN(copilotInput.value)) {
         alert("Incorrect data type for Copilot's Name.");
         event.preventDefault();
      } else if (isNaN(fuelInput.value)) {
         alert("Incorrect data type for Fuel Input.")
         event.preventDefault();
      } else if (isNaN(cargoInput.value)) {
         alert("Incorrect data type for Cargo Mass.")
         event.preventDefault();
      }


      //Here the status section of HTML is updated
      statusUpdate();
      const pStat = document.getElementById("pilotStatus");
      pStat.innerHTML = `Pilot ${pilotInput.value} Ready`;
      const cStat = document.getElementById("copilotStatus");
      cStat.innerHTML = `Co-pilot ${copilotInput.value} Ready`;

      fuelUpdate(fuelInput.value);
      cargoUpdate(cargoInput.value);


      //alert("working")
      event.preventDefault();

   });

   
});