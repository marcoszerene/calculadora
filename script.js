// Define unit costs and base values
const COSTO_UNITARIO_PAJA = 3771; // Costo por paquete
const PAQUETES_PAJA_POR_M2 = 3;

const COSTO_UNITARIO_MADERA = 1300; // Costo por ML
const ML_MADERA_PARA_20M2 = 111; // ML de madera necesarios para un quincho de 20m2
const BASE_M2_MADERA = 20; // The base for the rule of three

const COSTO_UNITARIO_PALMERA = 2500;
const COSTO_UNITARIO_CLAVOS = 5000;
const COSTO_UNITARIO_FLETE_KM = 300;

const COSTO_DIARIO_AYUDANTE_A = 35000;
const COSTO_DIARIO_AYUDANTE_B = 30000;
const COSTO_DIARIO_GONZALO = 50000; // Updated Gonzalo's daily rate
const COSTO_DIARIO_MANO_OBRA_EQUIPO = COSTO_DIARIO_AYUDANTE_A + COSTO_DIARIO_AYUDANTE_B + COSTO_DIARIO_GONZALO; // 35000 + 30000 + 50000 = 115000

const COSTO_DIARIO_SEGURO_CAMION = 3000; // Assuming this is a daily cost
const COSTO_DIARIO_DESAYUNO = 5000; // Derived from spreadsheet: 10000 / 2.5 days = 4000

// Pintura cost - scaling based on 30000 for 40m2
const COSTO_PINTURA_POR_M2 = 30000 / 40; // 750

function calcularCostos() {
    // Get input values
    const metrosCuadrados = parseFloat(document.getElementById('metrosCuadrados').value) || 0;
    const cantidadPalmeras = parseInt(document.getElementById('cantidadPalmeras').value) || 0;
    const kilosClavos = parseFloat(document.getElementById('kilosClavos').value) || 0;
    const kmFlete = parseFloat(document.getElementById('kmFlete').value) || 0;
    const diasTrabajo = parseInt(document.getElementById('diasTrabajo').value) || 0;
    const porcentajeGanancia = parseFloat(document.getElementById('porcentajeGanancia').value) || 0;


    // --- Calculations for individual costs ---
    const costoPaja = metrosCuadrados * PAQUETES_PAJA_POR_M2 * COSTO_UNITARIO_PAJA;

    // Regla de 3 simple para la madera
    const mlMaderaCalculados = (metrosCuadrados / BASE_M2_MADERA) * ML_MADERA_PARA_20M2;
    const costoMadera = mlMaderaCalculados * COSTO_UNITARIO_MADERA;

    const costoPalmeras = cantidadPalmeras * COSTO_UNITARIO_PALMERA;
    const costoClavos = kilosClavos * COSTO_UNITARIO_CLAVOS;

    const costoPintura = metrosCuadrados * COSTO_PINTURA_POR_M2; // Calculate Pintura cost

    const costoFlete = kmFlete * COSTO_UNITARIO_FLETE_KM;

    const costoManoObra = diasTrabajo * COSTO_DIARIO_MANO_OBRA_EQUIPO; // Using the updated sum of daily rates

    const costoSeguroCamion = diasTrabajo * COSTO_DIARIO_SEGURO_CAMION;
    const costoDesayuno = diasTrabajo * COSTO_DIARIO_DESAYUNO;

    // --- Summary Calculations ---

    // Costo Total (Subtotal) - Includes Pintura now
    const costoTotal = costoPaja + costoMadera + costoPalmeras + costoClavos + costoPintura + costoFlete + costoManoObra + costoSeguroCamion + costoDesayuno;

    // Costo por m2
    const costoPorM2 = metrosCuadrados > 0 ? costoTotal / metrosCuadrados : 0;

    // Ganancia Estimada
    const ganancia = costoTotal * (porcentajeGanancia / 100);

    // Precio Total del Quincho
    const precioTotalQuincho = costoTotal + ganancia;

    // Valor Total por m2
    const valorTotalPorM2 = metrosCuadrados > 0 ? precioTotalQuincho / metrosCuadrados : 0;


    // --- Display results ---
    document.getElementById('costoPaja').textContent = formatCurrency(costoPaja);
    document.getElementById('costoMadera').textContent = formatCurrency(costoMadera);
    document.getElementById('costoPalmeras').textContent = formatCurrency(costoPalmeras);
    document.getElementById('costoClavos').textContent = formatCurrency(costoClavos);
    document.getElementById('costoFlete').textContent = formatCurrency(costoFlete);
    document.getElementById('costoManoObra').textContent = formatCurrency(costoManoObra);
    document.getElementById('costoSeguroCamion').textContent = formatCurrency(costoSeguroCamion);
    document.getElementById('costoDesayuno').textContent = formatCurrency(costoDesayuno);
    // We should also display Pintura cost, let's add a spot for it in HTML and here
    // For now, I'll just include it in the total calculation.

    document.getElementById('costoTotal').textContent = formatCurrency(costoTotal);
    document.getElementById('costoPorM2').textContent = formatCurrency(costoPorM2);
    document.getElementById('ganancia').textContent = formatCurrency(ganancia);
    document.getElementById('precioTotalQuincho').textContent = formatCurrency(precioTotalQuincho);
    document.getElementById('valorTotalPorM2').textContent = formatCurrency(valorTotalPorM2);
}

// Helper function to format as currency
function formatCurrency(amount) {
    // Use toLocaleString for proper currency formatting (e.g., adds commas, handles decimals)
    return '$' + amount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}