let chart;

document.getElementById("loadData").addEventListener("click", async function() {
    const state = document.getElementById("stateSelect").value;
    const branch = document.getElementById("branchSelect").value;

    const response = await fetch("data/admissions.csv");
    const csvText = await response.text();

    const rows = csvText.split("\n").slice(1);
    const years = [];
    const admissions = [];

    rows.forEach(row => {
        const cols = row.split(",");
        if (cols[1] === state && cols[3] === branch) {
            years.push(cols[0]);
            admissions.push(parseInt(cols[5]));
        }
    });

    if (chart) chart.destroy();

    const ctx = document.getElementById("admissionsChart").getContext("2d");
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: years,
            datasets: [{
                label: `${branch} Admissions (${state})`,
                data: admissions,
                borderColor: "#003366",
                backgroundColor: "rgba(0, 51, 102, 0.2)",
                fill: true,
                borderWidth: 3,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Admissions Trend Over the Years",
                    font: { size: 18 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "Number of Admissions" }
                },
                x: {
                    title: { display: true, text: "Year" }
                }
            }
        }
    });
});
