// Analytics Charts
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('analyticsChart');
    if(ctx){
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mobile', 'Laptop', 'Audio'],
                datasets: [{
                    label: 'Products Scraped',
                    data: [12, 8, 5],
                    backgroundColor: ['#4f46e5', '#06b6d4', '#8b5cf6']
                }]
            }
        });
    }
});