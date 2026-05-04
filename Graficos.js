/* ==== Todos / Ninguno ==== */
document.querySelectorAll('.radio-input input[type="radio"]').forEach(radio => {

    radio.addEventListener('change', function () {

        const container = this.closest('.form-card');

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

document.querySelectorAll('.form-card input[type="checkbox"]').forEach(cb => {

    cb.addEventListener('change', function () {

        const container = this.closest('.form-card');
        const radios = container.querySelectorAll('.radio-input input[type="radio"]');

        radios.forEach(r => r.checked = false);

    });

});

document.querySelectorAll('.form-card').forEach(container => {

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    const radioTodos = container.querySelector('input[type="radio"][value*="todos"]');

    checkboxes.forEach(cb => cb.checked = true);

    if (radioTodos) radioTodos.checked = true;

});


/* ==== Graficos ==== */

/*Tipo de casos*/
const Tipo = document.getElementById('TipoCaso').getContext('2d');
const TipoCaso = new Chart(Tipo, {
    type: 'polarArea',
    data: {
        labels: ['Repuestos en garantia', 'Fallas de fabricación', 'Faltantes', 'Consultas', 'Compra de repuestos', 'Fallas de instalación', 'Disconformidad del cliente'],
        datasets: [{
            label: 'Casos acumulados',
            data: [22, 19, 32, 51, 79, 65, 25],
            backgroundColor: [
                'rgba(150, 99, 232, 0.6)',
                'rgba(150, 99, 232, 0.45)',
                'rgba(150, 99, 232, 0.35)',
                'rgba(150, 99, 232, 0.3)',
                'rgba(150, 99, 232, 0.25)',
                'rgba(150, 99, 232, 0.2)',
                'rgba(150, 99, 232, 0.15)'
            ],
            borderWidth: 4,
            hoverBorderColor: 'rgba(150, 99, 232, 0.8)',
            hoverOffset: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    color: '#555',
                    font: {
                        family: 'Montserrat',
                        size: 17
                    },
                    boxWidth: 12,
                    padding: 15
                }
            },

            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8
            },

        },

        scales: {
            r: {
                grid: {
                    color: 'rgba(0,0,0,0.05)'
                },
                angleLines: {
                    color: 'rgba(0,0,0,0.05)'
                },
                ticks: {
                    display: false
                },
                pointLabels: {
                    display: false
                },
            }
        }
    }
});

/*Top 10 por líneas*/
const ctx = document.getElementById('TopLineas').getContext('2d');

const data = [
    { nombre: "Match", valor: 8 },
    { nombre: "Smart", valor: 5 },
    { nombre: "Next", valor: 4 },
    { nombre: "Senior", valor: 3 },
    { nombre: "Giraffe", valor: 2 },
    { nombre: "Fox", valor: 2 },
    { nombre: "Sistema de bidet", valor: 2 },
    { nombre: "UP", valor: 1 },
    { nombre: "Wine Gourmet", valor: 1 },
    { nombre: "Klub", valor: 1 }
];

// ordenar
data.sort((a, b) => b.valor - a.valor);

// ranking dinámico
let rank = 1;
let lastValue = null;
const ranks = data.map((d, i) => {
    if (d.valor !== lastValue) {
        rank = i + 1;
        /*lastValue = d.valor;*/
    }
    return rank;
});

const labels = data.map(d => d.nombre);
const valores = data.map(d => d.valor);

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            data: valores,
            label: 'Cantidad',
            backgroundColor: 'rgba(150, 99, 232, 0.3)',
            borderRadius: 4,
            hoverBorderColor: 'rgba(150, 99, 232, 0.8)',
            borderWidth: 1,
            barThickness: 15
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: {
                left: 10,
                right: 40
            }
        },

        plugins: {
            legend: {
                display: false
            },

            title: {
                display: true,
                text: 'Top 10 de líneas con más fallas',
                align: 'start',
                color: '#4d4d4d',
                font: {
                    family: 'Alumni Sans Pinstripe',
                    size: 32
                },
                padding: {
                    bottom: 20
                }
            },

            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1
            }
        },

        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                display: false,
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#333',
                    font: {
                        family: 'Montserrat',
                        size: 12
                    }
                }
            }
        }
    },
    plugins: [{
        id: 'badges',

        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0);

            ctx.save();

            meta.data.forEach((bar, i) => {
                const x = bar.x;
                const y = bar.y;

                const badgeX = bar.base + 14;
                const badgeY = y;

                // círculo
                ctx.beginPath();
                ctx.arc(badgeX, badgeY, 14, 0, Math.PI * 2);
                ctx.fillStyle = '#9663e8';
                ctx.fill();
                ctx.shadowColor = 'rgba(0,0,0,0.15)';
                ctx.shadowBlur = 6;

                // número
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 13px Montserrat';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(ranks[i], badgeX, badgeY);

                ctx.fillStyle = '#333';
                ctx.font = '13px Montserrat';
                ctx.textAlign = 'left';
                ctx.fillText(valores[i], x + 15, y);
            });
            ctx.restore();
        }
    }]
});


/*Top 10 por falla*/
function wrapLabel(str, maxLength = 28) {
    const words = str.split(' ');
    let lines = [];
    let currentLine = '';

    words.forEach(word => {
        if ((currentLine + word).length > maxLength) {
            lines.push(currentLine.trim());
            currentLine = '';
        }
        currentLine += word + ' ';
    });

    if (currentLine) lines.push(currentLine.trim());

    return lines;
}

const ctxTopCasos = document.getElementById('TopCasos').getContext('2d');

const dataTopCasos = [
    { nombre: "Cierre ceramico", valor: 20 },
    { nombre: "Monocomando de cocina no enciende el calefon", valor: 15 },
    { nombre: "Aireador y llave", valor: 10 },
    { nombre: "Volante con falla en estria", valor: 5 },
    { nombre: "Base de volante erroneo en la caja", valor: 2 },
    { nombre: "Monocomando de cocina roto", valor: 2 },
    { nombre: "Consulta brazo de ducha desalineado", valor: 2 },
    { nombre: "Falta set de fijacion de monocomando", valor: 1 },
    { nombre: "Transferencia de SmartShower mal armada", valor: 1 },
    { nombre: "Falta flor", valor: 1 }
];

// ordenar
dataTopCasos.sort((a, b) => b.valor - a.valor);

// ranking dinámico
let rankTopCasos = 1;
let lastValueTopCasos = null;

const ranksTopCasos = dataTopCasos.map((d, i) => {
    if (d.valor !== lastValueTopCasos) {
        rankTopCasos = i + 1;
        /*lastValueTopCasos = d.valor;*/
    }
    return rankTopCasos;
});

const labelsTopCasos = dataTopCasos.map(d => wrapLabel(d.nombre));
const valoresTopCasos = dataTopCasos.map(d => d.valor);


new Chart(ctxTopCasos, {
    type: 'bar',
    data: {
        labels: labelsTopCasos,
        datasets: [{
            label: 'Cantidad',
            data: valoresTopCasos,
            backgroundColor: 'rgba(150, 99, 232, 0.3)',
            borderRadius: 4,
            hoverBorderColor: 'rgba(150, 99, 232, 0.8)',
            borderWidth: 1,
            barThickness: 20
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: {
                left: 10,
                right: 40
            }
        },

        plugins: {
            legend: { display: false },

            title: {
                display: true,
                text: 'Top 10 de fallas',
                align: 'start',
                color: '#4d4d4d',
                font: {
                    family: 'Alumni Sans Pinstripe',
                    size: 32
                },
                padding: { bottom: 20 }
            },

            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1
            }
        },

        scales: {
            x: {
                display: false,
                grid: { display: false }
            },
            y: {
                grid: { display: false },
                ticks: {
                    color: '#333',
                    font: {
                        family: 'Montserrat',
                        size: 11
                    },
                    padding: 10
                }
            }
        }
    },

    plugins: [{
        id: 'badgesTopCasos',

        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0);

            ctx.save();

            meta.data.forEach((bar, i) => {
                const x = bar.x;
                const y = bar.y;

                const badgeX = bar.base + 14;

                // círculo
                ctx.beginPath();
                ctx.arc(badgeX, y, 14, 0, Math.PI * 2);
                ctx.fillStyle = '#9663e8';
                ctx.fill();

                // número ranking
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 13px Montserrat';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(ranksTopCasos[i], badgeX, y);

                // valor
                ctx.fillStyle = '#333';
                ctx.font = '13px Montserrat';
                ctx.textAlign = 'left';
                ctx.fillText(valoresTopCasos[i], x + 15, y);
            });

            ctx.restore();
        }
    }]
});

/*Servicios técnicos por zona*/

const ctxSTZona = document.getElementById('STZona').getContext('2d');

const dataSTZona = [
    { nombre: "Patagonia", valor: 2 },
    { nombre: "Buenos Aires", valor: 10 },
    { nombre: "Capital Federal", valor: 7 },
    { nombre: "Litoral", valor: 3 },
];

// ordenar
dataSTZona.sort((a, b) => b.valor - a.valor);

// ranking dinámico
let rankSTZona = 1;
let lastValueSTZona = null;

const ranksSTZona = dataSTZona.map((d, i) => {
    if (d.valor !== lastValueSTZona) {
        rankSTZona = i + 1;
        /*lastValueSTZona = d.valor;*/
    }
    return rankSTZona;
});

const labelsSTZona = dataSTZona.map(d => wrapLabel(d.nombre));
const valoresSTZona = dataSTZona.map(d => d.valor);


new Chart(ctxSTZona, {
    type: 'bar',
    data: {
        labels: labelsSTZona,
        datasets: [{
            label: 'Cantidad',
            data: valoresSTZona,
            backgroundColor: 'rgba(150, 99, 232, 0.3)',
            borderRadius: 4,
            hoverBorderColor: 'rgba(150, 99, 232, 0.8)',
            borderWidth: 1,
            barThickness: 20
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: {
                left: 10,
                right: 40
            }
        },

        plugins: {
            legend: { display: false },

            title: {
                display: true,
                text: 'Top de servicios técnicos por zona',
                align: 'start',
                color: '#4d4d4d',
                font: {
                    family: 'Alumni Sans Pinstripe',
                    size: 32
                },
                padding: { bottom: 20 }
            },

            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1
            }
        },

        scales: {
            x: {
                display: false,
                grid: { display: false }
            },
            y: {
                grid: { display: false },
                ticks: {
                    color: '#333',
                    font: {
                        family: 'Montserrat',
                        size: 11
                    },
                    padding: 10
                }
            }
        }
    },

    plugins: [{
        id: 'badgesSTZona',

        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0);

            ctx.save();

            meta.data.forEach((bar, i) => {
                const x = bar.x;
                const y = bar.y;

                const badgeX = bar.base + 14;

                // círculo
                ctx.beginPath();
                ctx.arc(badgeX, y, 14, 0, Math.PI * 2);
                ctx.fillStyle = '#9663e8';
                ctx.fill();

                // número ranking
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 13px Montserrat';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(ranksSTZona[i], badgeX, y);

                // valor
                ctx.fillStyle = '#333';
                ctx.font = '13px Montserrat';
                ctx.textAlign = 'left';
                ctx.fillText(valoresSTZona[i], x + 15, y);
            });

            ctx.restore();
        }
    }]
});

/*Reclamos por clientes*/
const ctxRXC = document.getElementById('ReclamosXClientes').getContext('2d');

const dataRXC = [
    { nombre: "Blaisten", valor: 20 },
    { nombre: "Formella", valor: 10 },
    { nombre: "Sakura", valor: 17 },
    { nombre: "Cerrosud", valor: 13 },
    { nombre: "Foschia", valor: 2 },
    { nombre: "Unimaco", valor: 10 },
    { nombre: "Fedan", valor: 7 },
    { nombre: "Ceramisur", valor: 5 },
    { nombre: "VS Deco", valor: 16 },
    { nombre: "Estructurales Ranquel", valor: 3 },
];

// ordenar
dataRXC.sort((a, b) => b.valor - a.valor);

// ranking dinámico
let rankRXC = 1;
let lastValueRXC = null;

const ranksRXC = dataRXC.map((d, i) => {
    if (d.valor !== lastValueRXC) {
        rankRXC = i + 1;
        /*lastValueRXC = d.valor;*/
    }
    return rankRXC;
});

const labelsRXC = dataRXC.map(d => wrapLabel(d.nombre));
const valoresRXC = dataRXC.map(d => d.valor);


new Chart(ctxRXC, {
    type: 'bar',
    data: {
        labels: labelsRXC,
        datasets: [{
            label: 'Cantidad',
            data: valoresRXC,
            backgroundColor: 'rgba(150, 99, 232, 0.3)',
            borderRadius: 4,
            hoverBorderColor: 'rgba(150, 99, 232, 0.8)',
            borderWidth: 1,
            barThickness: 20
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: {
                left: 10,
                right: 40
            }
        },

        plugins: {
            legend: { display: false },

            title: {
                display: true,
                text: 'Top 10 de reclamos por clientes',
                align: 'start',
                color: '#4d4d4d',
                font: {
                    family: 'Alumni Sans Pinstripe',
                    size: 32
                },
                padding: { bottom: 20 }
            },

            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1
            }
        },

        scales: {
            x: {
                display: false,
                grid: { display: false }
            },
            y: {
                grid: { display: false },
                ticks: {
                    color: '#333',
                    font: {
                        family: 'Montserrat',
                        size: 11
                    },
                    padding: 10
                }
            }
        }
    },

    plugins: [{
        id: 'badgesRXC',

        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0);

            ctx.save();

            meta.data.forEach((bar, i) => {
                const x = bar.x;
                const y = bar.y;

                const badgeX = bar.base + 14;

                // círculo
                ctx.beginPath();
                ctx.arc(badgeX, y, 14, 0, Math.PI * 2);
                ctx.fillStyle = '#9663e8';
                ctx.fill();

                // número ranking
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 13px Montserrat';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(ranksRXC[i], badgeX, y);

                // valor
                ctx.fillStyle = '#333';
                ctx.font = '13px Montserrat';
                ctx.textAlign = 'left';
                ctx.fillText(valoresRXC[i], x + 15, y);
            });

            ctx.restore();
        }
    }]
});

/*Consultas por sector*/
const Sector = document.getElementById('ConsultasXSector').getContext('2d');
const CXS = new Chart(Sector, {
    type: 'doughnut',
    data: {
        labels: ['Postventa repuestos', 'Mecanizado', 'Armado', 'Galvanoplastía', 'Ingeniería', 'Marketing', 'Instalador', 'Disconformidad del cliente'],
        datasets: [{
            label: 'Cantidad',
            data: [22, 19, 32, 51, 79, 28, 65, 25],
            backgroundColor: [
                'rgba(150, 99, 232, 0.65)',
                'rgba(150, 99, 232, 0.55)',
                'rgba(150, 99, 232, 0.45)',
                'rgba(150, 99, 232, 0.35)',
                'rgba(150, 99, 232, 0.3)',
                'rgba(150, 99, 232, 0.25)',
                'rgba(150, 99, 232, 0.2)',
                'rgba(150, 99, 232, 0.15)'
            ],
            borderWidth: 4,
            hoverBorderColor: 'rgba(150, 99, 232, 0.8)',
            hoverOffset: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    color: '#555',
                    font: {
                        family: 'Montserrat',
                        size: 15
                    },
                    boxWidth: 12,
                    padding: 15
                }
            },

            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8
            },
        },
    }
});

/*Demora en primer contacto*/
const ctxDemora = document.getElementById('PromedioDemora').getContext('2d');

const dataDemora1 = [
    { nombre: "Enero", valor: 1.5 },
    { nombre: "Febrero", valor: 2 },
    { nombre: "Marzo", valor: 1.7 },
    { nombre: "Abril", valor: 1.5 },
    { nombre: "Mayo", valor: 1.3 },
    { nombre: "Junio", valor: 1.4 },
    { nombre: "Julio", valor: 2.3 },
    { nombre: "Agosto", valor: 1.2 },
    { nombre: "Septiembre", valor: 1.6 },
    { nombre: "Octubre", valor: 1.3 },
    { nombre: "Noviembre", valor: 1.6 },
    { nombre: "Diciembre", valor: 1.4 },
];

const dataDemora2 = [
    { nombre: "Enero", valor: 7.5 },
    { nombre: "Febrero", valor: 10 },
    { nombre: "Marzo", valor: 7.3 },
    { nombre: "Abril", valor: 8.6 },
    { nombre: "Mayo", valor: 9.2 },
    { nombre: "Junio", valor: 6.5 },
    { nombre: "Julio", valor: 5.7 },
    { nombre: "Agosto", valor: 5.9 },
    { nombre: "Septiembre", valor: 6.3 },
    { nombre: "Octubre", valor: 5.3 },
    { nombre: "Noviembre", valor: 6.2 },
    { nombre: "Diciembre", valor: 7.3 },
];

const labelsDemora = dataDemora1.map(d => d.nombre);

const valoresDemora1 = dataDemora1.map(d => d.valor);
const valoresDemora2 = dataDemora2.map(d => d.valor);

new Chart(ctxDemora, {
    type: 'bar',
    data: {
        labels: labelsDemora,
        datasets: [
            {
                label: '1er contacto',
                data: valoresDemora1,
                backgroundColor: 'rgba(150, 99, 232, 0.6)',
                hoverBorderColor: 'rgba(150, 99, 232, 0.8)',
                borderWidth: 3,
                borderRadius: 4,
                barThickness: 30
            },
            {
                label: 'Resolución',
                data: valoresDemora2,
                backgroundColor: 'rgba(59, 131, 153, 0.6)',
                hoverBorderColor: 'rgba(59, 131, 153, 0.8)',
                borderWidth: 3,
                borderRadius: 4,
                barThickness: 30
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: {
                top: 40,
                bottom: 40,
            }
        },

        plugins: {
            legend: {
                position: 'bottom',
                padding: { top: 10 },
                labels: {
                    color: '#555',
                    font: {
                        family: 'Montserrat',
                        size: 18
                    },
                }
            },

            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                grid: { display: false},
                ticks: { display: false}
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: '#333',
                    font: {
                        family: 'Montserrat',
                        size: 14
                    }
                }
            }
        }
    },

    plugins: [{
        id: 'labels',

        afterDatasetsDraw(chart) {
            const { ctx } = chart;

            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);

                if (meta.hidden) return;

                meta.data.forEach((bar, index) => {
                    const value = dataset.data[index];

                    if (!bar || bar.hidden || bar.skip) return;

                    ctx.save();

                    ctx.fillStyle = datasetIndex === 0 ? '#9663e8' : '#3b8399';
                    ctx.font = '13px Montserrat';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    const offset = datasetIndex === 0 ? -6 : -18;

                    ctx.fillText(value, bar.x, bar.y + offset);

                    ctx.restore();
                });
            });
        }
    }]
});

/*Facturación*/
const formatoMoneda = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
});

const ctxFacturacion = document.getElementById('Facturacion').getContext('2d');

const dataFacturacion = [
    { nombre: "Enero", valor: 802455 },
    { nombre: "Febrero", valor: 245689 },
    { nombre: "Marzo", valor: 105702 },
    { nombre: "Abril", valor: 0},
    { nombre: "Mayo", valor: 0},
    { nombre: "Junio", valor: 0},
    { nombre: "Julio", valor: 0 },
    { nombre: "Agosto", valor: 0 },
    { nombre: "Septiembre", valor: 0 },
    { nombre: "Octubre", valor: 0 },
    { nombre: "Noviembre", valor: 0 },
    { nombre: "Diciembre", valor: 0 },
];

const labelsFacturacion = dataFacturacion.map(d => d.nombre);
const valoresFacturacion = dataFacturacion.map(d => d.valor);


new Chart(ctxFacturacion, {
    type: 'line',
    data: {
        labels: labelsFacturacion,
        datasets: [
            {
                label: 'Facturación',
                data: valoresFacturacion,
                backgroundColor: 'rgba(150, 99, 232, 0.6)',
                hoverBorderColor: 'rgba(150, 99, 232, 0.8)',
                borderWidth: 3,
                borderRadius: 4,
                barThickness: 30
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: {
                top: 40,
                left:50,
                right: 50,
                bottom: 60
            }
        },

        plugins: {
            legend: {
                display:false
            },

            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        return formatoMoneda.format(context.raw);
                    }
                }
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                grid: { display: false},
                ticks: { display: false}
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: '#333',
                    font: {
                        family: 'Montserrat',
                        size: 14
                    }
                }
            }
        }
    },

    plugins: [{
        id: 'labels',
    
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
    
            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
    
                meta.data.forEach((bar, index) => {
                    const value = dataset.data[index];

                    if (value === 0) return;
    
                    ctx.save();
    
                    ctx.fillStyle = '#9663e8';
                    ctx.font = '14px Montserrat';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
    
                    ctx.fillText(formatoMoneda.format(value), bar.x, bar.y - 18);
    
                    ctx.restore();
                });
            });
        }
    }]
});