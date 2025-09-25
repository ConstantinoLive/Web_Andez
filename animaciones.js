document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        },
        {
            threshold: 0.6,
            //rootMargin: '0px 0px -10% 0px'
        }
    );

    document.querySelectorAll(".content").forEach((el) => {
        observer.observe(el);
    });
    document.querySelectorAll(".fraseFooter").forEach((el) => {
        observer.observe(el);
    });
    document.querySelectorAll(".listaFooter").forEach((el) => {
        observer.observe(el);
    });
});




function getSwatchColor(swatch) {
    // 1) prefer data-color si existe
    if (swatch.dataset && swatch.dataset.color) return swatch.dataset.color.trim();
    // 2) si no, buscar segunda clase (ej: "color-swatch negro")
    const classes = Array.from(swatch.classList).filter(c => c !== 'color-swatch');
    return classes[0] || null;
}
document.querySelectorAll('.card').forEach(card => {
    const swatches = card.querySelectorAll('.color-swatch');

    swatches.forEach(swatch => {
        const color = getSwatchColor(swatch);
        if (!color) return;

        // hover (temporal)
        swatch.addEventListener('mouseenter', () => {
            // si color === 'cromo' (tu base), removemos el atributo para que base quede visible
            if (color === 'cromo') {
                card.removeAttribute('data-color');
            } else {
                card.setAttribute('data-color', color);
            }
        });

        swatch.addEventListener('mouseleave', () => {
            // al salir del hover quitamos el atributo solo si no hay "fijado" por click
            // si querés hover exclusivamente, siempre quitar:
            // card.removeAttribute('data-color');

            // Para distinguir click (fijado) de hover, usamos una bandera:
            if (!card.__lockedColor) {
                card.removeAttribute('data-color');
            }
        });

        // click (prefijo / toggle) — útil en móviles
        swatch.addEventListener('click', (e) => {
            e.preventDefault();
            if (card.__lockedColor === color) {
                // desactivar
                card.__lockedColor = null;
                card.removeAttribute('data-color');
            } else {
                // activar / fijar
                card.__lockedColor = color === 'cromo' ? null : color;
                if (card.__lockedColor) card.setAttribute('data-color', card.__lockedColor);
                else card.removeAttribute('data-color');
            }
        });
    });

    // click fuera de la tarjeta desactiva el lock
    document.addEventListener('click', (ev) => {
        if (!card.contains(ev.target) && card.__lockedColor) {
            card.__lockedColor = null;
            card.removeAttribute('data-color');
        }
    });
});

