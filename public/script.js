// let register1 = document.querySelector("#register-alt");
// register1.addEventListener("click", () => {
//     registerContainer.style.display = "flex";
//     registerContainer.style.display.justifyContent = "center";
//     registerContainer.style.display.alignItems = "center";
// });

// const registerContainer = document.getElementById("registerContainer");
// const registerAlt = document.getElementById("register-alt");


// //Book-trains
// const book_train = document.querySelector(".opt_1");
// const booking = document.querySelector(".booking");

// book_train.addEventListener("click", () => {
//     if (booking) {
//         book_train.style.borderBottom = "3px solid #ED5B25";
//         booking.style.display = "flex";
//     }
// });

// document.addEventListener("click", (event) => {
//     if (event.target !== book_train && !booking.contains(event.target)) {
//         book_train.style.borderBottom = "none";
//         booking.style.display = "none";
//     }
// });


// //PNR status
// const pnr_status = document.querySelector(".opt_2");
// const check = document.querySelector(".pnr_status");
// pnr_status.addEventListener("click", () => {
//     if (check) {
//         pnr_status.style.borderBottom = "3px solid #ED5B25";
//         check.style.display = "flex";
//     }
// });

// document.addEventListener("click", (event) => {
//     if (event.target !== pnr_status && !check.contains(event.target)) {
//         pnr_status.style.borderBottom = "none";
//         check.style.display = "none";
//     }
// });

// //Running status
// const run_status = document.querySelector(".opt_3")
// const check2 = document.querySelector(".running_status")
// run_status.addEventListener("click", () => {
//     if (check2) {
//         run_status.style.borderBottom = "3px solid #ED5B25";
//         check2.style.display = "flex";
//     }
// });

// document.addEventListener("click", (event) => {
//     if (event.target !== run_status && !check2.contains(event.target)) {
//         run_status.style.borderBottom = "none";
//         check2.style.display = "none";
//     }
// })

// //Train details
// const train_detail = document.querySelector(".opt_4")
// const check3 = document.querySelector(".train_details")
// train_detail.addEventListener("click", () => {
//     if (check3) {
//         train_detail.style.borderBottom = "3px solid #ED5B25";
//         check3.style.display = "flex";
//     }
// });

// document.addEventListener("click", (event) => {
//     if (event.target !== train_detail && !check3.contains(event.target)) {
//         train_detail.style.borderBottom = "none";
//         check3.style.display = "none";
//     }
// })

// Dummy train details for testing
const dummyTrainDetailsArray = [
    {
        trainName: "Express 123",
        departure: "CityA",
        arrival: "CityB",
        arrival_time: "2:00",
        departure_time: "6:00",
        duration: "4 hours",
        stops: ["StationX", "StationY", "StationZ"],
        // Add more details as needed
    },
    {
        trainName: "SuperFast 456",
        departure: "CityC",
        arrival: "CityD",
        arrival_time: "3:00",
        departure_time: "6:00",
        duration: "3 hours",
        stops: ["StationA", "StationB", "StationC"],
        // Add more details as needed
    },
    {
        trainName: "SuperFast 789",
        departure: "CityE",
        arrival: "CityF",
        arrival_time: "2:30",
        departure_time: "4:30",
        duration: "2 hours",
        stops: ["StationM", "StationN", "StationO"],
        // Add more details as needed
    },
    

    // Add more train details as needed
];

function closeTrainDetailsModal() {
    // Hide the modal
    const modal = document.getElementById("trainDetailsModal");
    modal.style.display = "none";
}

function displayTrainDetails(trainDetailsArray) {
    // Set the HTML content of the modal
    const modalContent = document.getElementById("trainDetailsModalContent");
    modalContent.innerHTML = " "; // Clear existing content

    trainDetailsArray.forEach((train) => {
        let trainDetailsHtml = `
        <div class="train" style="width: 100vw; height: 100%; background-color: #f0f0f0; padding: 10px; display: flex;
        justify-content: center;
        align-items: center; flex-direction: row; margin-bottom: 10px;">
        <div class="train_info" style="width: 40%; height: 100%; padding: 10px; display: flex;
           justify-content: center;
           align-items: center; flex-direction: column;">
           <h3>${train.trainName}</h3>
           <div class="from-to" style="height:100%; width:50%; display: flex; justify-content: space-between;
              align-items: center; flex-direction: row;">
              <p>Departure: ${train.departure}</p>
              <p>Arrival: ${train.arrival}</p>
           </div>
        </div>
        <div class="time-info" style=" width:50%;height:100%;  display:flex; justify-content:space-evenly; allign-items:center;flex-direction: row;">
           <p style="font-size:30px; padding-top:20px;"> ${train.arrival_time}</p>
           <span style="padding-top:30px;"  >------</span>
           <p style="padding-top:30px;">Duration: ${train.duration}</p>
           <span style="padding-top:30px;"  >------</span>
           <p style="font-size:30px; padding-top:20px;"> ${train.departure_time}</p>
        </div>
     </div>
        `;

        modalContent.innerHTML += trainDetailsHtml;
    });

    // Show the modal
    const modal = document.getElementById("trainDetailsModal");
    modal.style.display = "flex";
}

// Event listener for the "Search Trains" button
const showTrainDetails = document.querySelector(".search_train");
showTrainDetails.addEventListener("click", function () {
    // Call the displayTrainDetails function when the button is clicked
    // displayTrainDetails(dummyTrainDetailsArray);
    localStorage.setItem('dummyTrainDetailsArray',JSON.stringify(dummyTrainDetailsArray))
    window.location.href = 'book_train_result.html';
});