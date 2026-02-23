async function Clicked(section, event) {
  event.preventDefault();
  console.log("Clicked on section:", section);

  const target = document.getElementById(section);

  if (target) {
    target.style.display = target.style.display === "none" ? "block" : "none";
    target.style.transition = "all 0.3s ease";
    target.style.opacity = target.style.opacity === "0" ? "1" : "0";
  } else {
    console.warn(`Element with id "${section}" not found.`);
  }
}

const Events = {
  eventClick: Clicked,
};

export default Events;
