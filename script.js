// Inisialisasi grafik Chart.js
const ctx = document.getElementById('interestRateChart').getContext('2d');
const labels = [];
const interestRates = [];

const interestRateChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Suku Bunga (%)',
            data: interestRates,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Pergerakan Suku Bunga Real-Time'
            }
        }
    }
});

// API Contoh untuk data real-time
function fetchInterestRateData() {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            const rate = data.rates.BRL;

            const now = new Date();
            const label = `${now.getHours()}:${now.getMinutes()}`;
            labels.push(label);
            interestRates.push(rate);

            if (interestRates.length > 10) {
                labels.shift();
                interestRates.shift();
            }

            interestRateChart.update();
        })
        .catch(error => console.error('Error:', error));
}

// Logika untuk simulasi cicilan
document.getElementById('calculateButton').addEventListener('click', function () {
    const calculationType = document.getElementById('calculationType').value; // KPR atau Subsidi
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;

    if (isNaN(loanAmount) || isNaN(loanTerm) || isNaN(interestRate)) {
        alert('Masukkan semua data dengan benar!');
        return;
    }

    // Menentukan faktor bunga berdasarkan jenis analisis
    const adjustmentFactor = calculationType === 'kpr' ? 1.0 : 0.9; // Subsidi 10% diskon bunga
    const adjustedInterestRate = interestRate * adjustmentFactor;

    const monthlyRate = adjustedInterestRate / 12;
    const numPayments = loanTerm * 12;
    const monthlyPayment = loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments));
    const totalPayment = monthlyPayment * numPayments;

    // Menampilkan hasil
    document.getElementById('selectedType').innerText = `Jenis Analisis: ${calculationType === 'kpr' ? 'KPR' : 'Subsidi'}`;
    document.getElementById('monthlyPayment').innerText = `Cicilan Bulanan: Rp ${monthlyPayment.toFixed(2)}`;
    document.getElementById('totalPayment').innerText = `Total Pembayaran: Rp ${totalPayment.toFixed(2)}`;
});

// Memperbarui data setiap 10 detik
setInterval(fetchInterestRateData, 10000);
fetchInterestRateData();
