// src/data/data.js
import bike from "../assets/bike.png";
import bike2 from "../assets/bike2.png";
import bike3 from "../assets/bike3.png";
import bike4 from "../assets/bike4.png";
import bike5 from "../assets/bike5.png";
// import spare1 from "../assets/spare1.png";
import spare2 from "../assets/spare2.png";
import spare3 from "../assets/spare3.png";
import spare4 from "../assets/spare4.png";
import spare5 from "../assets/spare5.png";
import spare6 from "../assets/spare6.png";
import spare8 from "../assets/spare8.png";
import spare9 from "../assets/spare9.png";

export const data = [
  { id: 1, name: "Electric Mountain Bike", type: "bike", category: "AKEZ", image: bike2, price: "1800", description: "High power electric mountain bike for rough terrains." },
  { id: 2, name: "Bycycle hub", type: "spare", category: "Bycyclehub", image: spare4, price: "155", description: "Ebikeling waterproof ebike conversion kit with battery." },
  { id: 3, name: "Electric Dirt Bike", type: "bike", category: "Surron", image: bike4, price: "3200", description: "Off-road dirt bike with excellent suspension for uneven tracks." },
  { id: 4, name: "Ebikeling", type: "spare", category: "Ebikeling", image: spare3, price: "1400", description: "Ebikeling waterproof ebike conversion kit with battery." },
  { id: 5, name: "Electric Motors", type: "bike", category: "OUXI GT-2000 electric dirt bike", image: bike3, price: "1599", description: "It features a 2000W high-torque motor, offering a top speed of up to 37 mph (60 km/h)." },
  { id: 6, name: "Headlight", type: "spare", category: "Headlight", image: spare5, price: "200", description: "Ebikeling waterproof ebike conversion kit with battery." },
  { id: 7, name: "OUXI E-Bike", type: "bike", category: "OUXI", image: bike5, price: "1800", description: "Comfortable urban electric bicycle for daily commuting." },
  { id: 8, name: "Rear hub", type: "spare", category: "Rear Hub", image: spare6, price: "1200", description: "1500W electric ebike conversion kit." },
  { id: 9, name: "Trail Explorer E-Bike", type: "bike", category: "AKEZ", image: bike, price: "2500", description: "Lightweight trail explorer e-bike with long battery life." },
  { id: 10, name: "lithium-ion battery", type: "spare", category: "Misc", image: spare2, price: "90", description: "This is a team 48v electric bike lithium-ion battery." },
  { id: 11, name: "FidgerGear", type: "spare", category: "Misc", image: spare8, price: "110", description: "This is a fidgetGear Hi speed 1500W Electric bicycle conversion kit" },
  { id: 12, name: "BikeHub", type: "spare", category: "BikeHub", image: spare9, price: "95", description: "This is an 8000W electric bike hub motor conversion kit" },
];

export const priceFilters = ["155", "200", "90", "95", "110", "1200", "1400", "1800", "2500", "3200", "12990"];
