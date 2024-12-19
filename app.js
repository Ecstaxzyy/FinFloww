// Logika Grafik dan Simulasi
document.addEventListener("DOMContentLoaded", function () {
    // Grafik Suku Bunga
    const ctx = document.getElementById('interestRateChart')?.getContext('2d');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
                datasets: [{
                    label: 'Suku Bunga (%)',
                    data: [3.5, 3.8, 4.0, 4.2, 4.1, 4.3],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Simulasi Perhitungan Cicilan
    document.getElementById('calculateButton')?.addEventListener('click', function () {
        const loanAmount = parseFloat(document.getElementById('loanAmount').value);
        const loanTerm = parseInt(document.getElementById('loanTerm').value);
        const annualRate = parseFloat(document.getElementById('interestRate').value) / 100;

        if (loanAmount > 0 && loanTerm > 0 && annualRate > 0) {
            const monthlyRate = annualRate / 12;
            const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
            const totalPayment = monthlyPayment * loanTerm;

            document.getElementById('monthlyPayment').textContent = `Cicilan Bulanan: Rp ${monthlyPayment.toFixed(2)}`;
            document.getElementById('totalPayment').textContent = `Total Pembayaran: Rp ${totalPayment.toFixed(2)}`;
        } else {
            alert('Mohon masukkan data yang valid.');
        }
    });
});
