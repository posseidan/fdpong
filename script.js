const shuffleButton = document.getElementById("shuffleButton");

shuffleButton.addEventListener("click", shuffleCircles);

let draggedCircle = null;


// -----------------------
// Shuffle
// -----------------------

function shuffleCircles() {

    const circles = Array.from(
        document.querySelectorAll(".circle")
    );

    const slots = Array.from(
        document.querySelectorAll(".slot")
    );

    for (let i = circles.length - 1; i > 0; i--) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [circles[i], circles[j]] =
            [circles[j], circles[i]];
    }

    slots.forEach((slot, index) => {
        slot.appendChild(circles[index]);
    });
}


// -----------------------
// Drag & Drop
// -----------------------

const circles = document.querySelectorAll(".circle");
const slots = document.querySelectorAll(".slot");


circles.forEach(circle => {

    circle.addEventListener("dragstart", () => {

        draggedCircle = circle;

        circle.classList.add("dragging");

    });

    circle.addEventListener("dragend", () => {

        circle.classList.remove("dragging");

        draggedCircle = null;

    });

});


slots.forEach(slot => {

    // Erlaubt das Ablegen
    slot.addEventListener("dragover", event => {

        event.preventDefault();

        slot.classList.add("drag-over");

    });


    slot.addEventListener("dragleave", () => {

        slot.classList.remove("drag-over");

    });


    slot.addEventListener("drop", event => {

        event.preventDefault();

        slot.classList.remove("drag-over");

        if (!draggedCircle) {
            return;
        }


        const targetCircle = slot.querySelector(".circle");

        const oldSlot = draggedCircle.parentElement;


        // Wenn auf einen anderen Kreis gezogen wird:
        // Positionen tauschen
        if (targetCircle && targetCircle !== draggedCircle) {

            oldSlot.appendChild(targetCircle);

            slot.appendChild(draggedCircle);

        }

    });

});