const cards = document.querySelectorAll('.kanban-card');
const columns = document.querySelectorAll('.kanban-cards');

let draggedCard = null;

cards.forEach(card => {
    card.addEventListener('dragstart', () => {
        draggedCard = card;
        setTimeout(() => {
            card.style.display = 'none';
        }, 0);
    });

    card.addEventListener('dragend', () => {
        draggedCard.style.display = 'block';
        draggedCard = null;
    });
});

columns.forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault();
    });

    column.addEventListener('dragenter', e => {
        e.preventDefault();
    });

    column.addEventListener('drop', e => {
        e.preventDefault();
        if (draggedCard) {
            column.appendChild(draggedCard);
        }
    });
});