/*filtro por columna*/
const tableBody = document.querySelector("#Table tbody");
const originalRows = Array.from(tableBody.querySelectorAll("tr"));

const filters = document.querySelectorAll("thead input, thead select");
const rows = document.querySelectorAll("tbody tr");

filters.forEach(el => {
    el.addEventListener("input", filterTable);
    el.addEventListener("change", filterTable);
});

function filterTable() {

    rows.forEach(row => {

        let visible = true;

        filters.forEach(filter => {

            const colIndex = filter.dataset.filter;
            const filterValue = filter.value.toLowerCase().trim();

            if (!filterValue) return;

            const cell = row.children[colIndex];
            const text = cell.textContent.toLowerCase();

            if (!text.includes(filterValue)) {
                visible = false;
            }
        });
        row.style.display = visible ? "" : "none";
    });
}

document.querySelectorAll(".filtro").forEach(btn => {

    btn.addEventListener("click", function () {

        const th = this.closest("th");

        document.querySelectorAll("th").forEach(header => {
            if (header !== th) {
                header.classList.remove("active-filter");
            }
        });

        th.classList.toggle("active-filter");

        const input = th.querySelector("input");
        if (input && th.classList.contains("active-filter")) {
            input.focus();
        }
    });

});

document.addEventListener("click", function (e) {

    if (!e.target.closest("th")) {
        document.querySelectorAll("th").forEach(th => {
            th.classList.remove("active-filter");
        });
    }

});

/*Ordenamiento*/
const sortButtons = document.querySelectorAll(".sort-btn");

let currentSort = {
    column: null,
    direction: null
};

//FECHA (dd/mm/yyyy)
function parseDate(dateString) {
    const [day, month, year] = dateString.split("/");
    return new Date(year, month - 1, day);
}

sortButtons.forEach((btn, index) => {
    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        let direction = "asc";

        if (currentSort.column == index) {
            direction = currentSort.direction === "asc" ? "desc" : "asc";
        }

        currentSort = {
            column: index,
            direction: direction
        };

        const th = btn.closest("th");
        const type = th.dataset.type || "text";

        sortTable(index, direction, type);
        updateSortIcons(btn, direction);
    });

});

//ORDEN DE LA TABLA
function sortTable(columnIndex, direction, type) {

    const rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.sort((a, b) => {

        let A = a.children[columnIndex].textContent.trim();
        let B = b.children[columnIndex].textContent.trim();

        //FECHA
        if (type === "date") {
            const dateA = parseDate(A);
            const dateB = parseDate(B);

            return direction === "asc"
                ? dateA - dateB
                : dateB - dateA;
        }

        //NÚMEROS
        const numA = parseFloat(A.replace(/[^\d]/g, ""));
        const numB = parseFloat(B.replace(/[^\d]/g, ""));

        if (!isNaN(numA) && !isNaN(numB)) {
            return direction === "asc" ? numA - numB : numB - numA;
        }

        //TEXTO
        A = A.toLowerCase();
        B = B.toLowerCase();

        if (A < B) return direction === "asc" ? -1 : 1;
        if (A > B) return direction === "asc" ? 1 : -1;

        return 0;
    });

    rows.forEach(row => tableBody.appendChild(row));
}

//ICONOS
function updateSortIcons(activeBtn, direction) {

    document.querySelectorAll(".sort-btn").forEach(btn => {
        btn.classList.remove("active");
        btn.textContent = "▲";
    });

    activeBtn.classList.add("active");
    activeBtn.textContent = direction === "asc" ? "▲" : "▼";
}

//LIMPIAR FILTROS
const deleteFilter = document.getElementById("deleteFilter");
deleteFilter.addEventListener("change", function () {

    if (!this.checked) return;

    document.querySelectorAll("thead input, thead select").forEach(el => {
        el.value = "";
    });

    tableBody.innerHTML = "";
    originalRows.forEach(row => {
        row.style.display = "";
        tableBody.appendChild(row);
    });

    currentSort = { column: null, direction: null };

    document.querySelectorAll(".sort-btn").forEach(btn => {
        btn.classList.remove("active");
        btn.textContent = "▲";
    });

});


/* ==== Todos / Ninguno ==== */
document.querySelectorAll('.radio-input input[type="radio"]').forEach(radio => {

    radio.addEventListener('change', function () {

        const container = this.closest('.mbody2');

        if (!container) return;

        const checkboxes = container.querySelectorAll('input[type="checkbox"]');

        if (this.value.includes('todos')) {
            checkboxes.forEach(cb => cb.checked = true);
        }

        if (this.value.includes('ninguno')) {
            checkboxes.forEach(cb => cb.checked = false);
        }

    });

});

document.querySelectorAll('.mbody2 input[type="checkbox"]').forEach(cb => {

    cb.addEventListener('change', function () {

        const container = this.closest('.mbody2');
        const radios = container.querySelectorAll('.radio-input input[type="radio"]');

        radios.forEach(r => r.checked = false);

    });

});

document.querySelectorAll('.mbody2').forEach(container => {

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    const radioTodos = container.querySelector('input[type="radio"][value*="todos"]');

    checkboxes.forEach(cb => cb.checked = true);

    if (radioTodos) radioTodos.checked = true;

});


/* ===== Modal Columnas ====== */
const btnMostrarColumnas = document.getElementById("btnMostrarColumnas");

btnMostrarColumnas.addEventListener("click", function () {

    const checks = document.querySelectorAll(
        "#Modalcolumnas input[type='checkbox']"
    );

    checks.forEach(check => {

        const columna = check.value;

        const elementos = document.querySelectorAll(
            `[data-column="${columna}"]`
        );

        elementos.forEach(el => {
            el.style.display = check.checked ? "" : "none";
        });

        localStorage.setItem(`col_${columna}`, check.checked);
    });
});

window.addEventListener("load", function () {

    const checks = document.querySelectorAll(
        "#Modalcolumnas input[type='checkbox']"
    );

    checks.forEach(check => {

        const saved = localStorage.getItem(`col_${check.value}`);

        if (saved !== null) {
            check.checked = saved === "true";
        }
    });

    document.getElementById("btnMostrarColumnas").click();
});
