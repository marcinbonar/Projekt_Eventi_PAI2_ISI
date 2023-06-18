export const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Statystyki sprzedaży biletów',
      font: {
        size: 20,
      },
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Liczba sprzedanych biletów',
      },
      beginAtZero: true,
      ticks: {
        stepSize: 20,
      },
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Wydarzenia',
      },
      grid: {
        display: false,
      },
    },
  },
};