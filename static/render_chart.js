function createRadarChart(labels_var, data_var, chart_title, element_id)
{
    const data = {
      labels: labels_var,
      datasets: [{
        label: chart_title,
        data: data_var,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    };

    const config = {
      type: 'radar',
      data: data,
      options: {
        elements: {
          line: {
            borderWidth: 2
          }
        }
      },
    };

    const ctx = document.getElementById(element_id).getContext('2d');
    new Chart(ctx, config);
}