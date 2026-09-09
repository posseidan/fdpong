const shuffleButton = document.getElementById("shuffleButton");

shuffleButton.addEventListener("click", shuffleCircles);

let draggedCircle = null;


// -----------------------
// Shuffle
// -----------------------

function shuffleCircles() {

    const slots = Array.from(
        document.querySelectorAll("#game .rack .row:not(.hidden) .slot")
    ).filter(slot => {
        return !slot.querySelector(".circle.white");
    });

    const circles = slots.map(slot => {
        return slot.querySelector(".circle");
    });

    let shuffleCount = 0;
    const maxShuffles = 6;

    const interval = setInterval(() => {

        for (let i = circles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [circles[i], circles[j]] =
                [circles[j], circles[i]];
        }

        slots.forEach((slot, index) => {
            slot.appendChild(circles[index]);
        });

        shuffleCount++;

        if (shuffleCount >= maxShuffles) {
            clearInterval(interval);
        }

    }, 60);
}
const toggleRow5Checkbox = document.getElementById("toggleRow5Checkbox");

toggleRow5Checkbox.addEventListener("change", () => {
    swapRow5();
});

function swapRow5() {

    const row5Slots = Array.from(
        document.querySelectorAll(".rack .row5 .slot")
    );

    const extraArea = document.querySelector(".extra-circles");

    const row5Circles = row5Slots.map(slot =>
        slot.querySelector(".circle")
    );

    const extraCircles = Array.from(
        extraArea.querySelectorAll(".circle")
    );

    // Anzahl muss übereinstimmen
    if (row5Circles.length !== extraCircles.length) {
        console.error(
            "Row5 und Extra-Area müssen gleich viele Kreise enthalten!"
        );
        return;
    }

    // Zuerst Kreise aus row5 merken / herausnehmen
    row5Circles.forEach(circle => {
        extraArea.appendChild(circle);
    });

    // Danach die vorherigen Extra-Kreise in row5 einsetzen
    row5Slots.forEach((slot, index) => {
        slot.appendChild(extraCircles[index]);
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

    slot.addEventListener("dragover", event => {

        const targetCircle = slot.querySelector(".circle");

        // Auf weiße Kreise darf nicht gedroppt werden
        if (targetCircle?.classList.contains("white")) {
            return;
        }

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

        // White komplett sperren
        if (
            draggedCircle.classList.contains("white") ||
            targetCircle?.classList.contains("white")
        ) {
            return;
        }

        const oldSlot = draggedCircle.parentElement;

        if (targetCircle && targetCircle !== draggedCircle) {

            oldSlot.appendChild(targetCircle);
            slot.appendChild(draggedCircle);

        }
    });

});
const infoButton = document.getElementById("infoButton");
const infoModal = document.getElementById("infoModal");
const closeInfo = document.getElementById("closeInfo");


infoButton.addEventListener("click", () => {
    infoModal.style.display = "flex";
});


closeInfo.addEventListener("click", () => {
    infoModal.style.display = "none";
});
infoModal.addEventListener("click", event => {

    if (event.target === infoModal) {
        infoModal.style.display = "none";
    }

});
shuffleCircles();