import React from "react";
import { Pie } from "react-chartjs-2";
import './AdminPageStats.css'
const AdminPageStats = ({ proizvodi, narudzbine, ocene }) => {
    console.log(narudzbine)
    console.log(ocene)

  const najprodavanijiProizvodi = proizvodi.map((proizvod) => {
    let prodato = 0;
    for (const narudzba of narudzbine) {
        let items=narudzba.items;
         if(items.includes(proizvod.id)){
            prodato++;
         }
    }
 
    return { ...proizvod, prodato };
  });

  najprodavanijiProizvodi.sort((a, b) => b.prodato - a.prodato);
  najprodavanijiProizvodi.length = 5;

  const najboljeOcenjeniProizvodi = proizvodi.map((proizvod) => {
    let sumaOcena = 0;
    let brojOcena = 0;
    for (const ocena of ocene) {
      if (ocena.product.id === proizvod.id) {
        sumaOcena += ocena.rating;
        brojOcena++;
      }
    }
    const avgRating = brojOcena > 0 ? sumaOcena / brojOcena : 0;
    return { ...proizvod, avgRating };
  });

  najboljeOcenjeniProizvodi.sort((a, b) => b.avgRating - a.avgRating);
  najboljeOcenjeniProizvodi.length = 5;

  const pieChartData = {
    labels: najprodavanijiProizvodi.map((proizvod) => proizvod.name),
    datasets: [
      {
        data: najprodavanijiProizvodi.map((proizvod) => proizvod.prodato),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };
  const pieChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 2, // podešava odnos širine i visine grafikona, 2 je primer vrednosti
  };
  return (
     <div className="admin-page-stats">
      <h1>Statistika</h1>
      <h2>Najprodavaniji proizvodi</h2>
      <ul>
        {najprodavanijiProizvodi.map((proizvod) => (
          <li key={proizvod.id}>
            {proizvod.name} - {proizvod.prodato} prodatih jedinica
          </li>
        ))}
      </ul>
      <h2>Najbolje ocenjeni proizvodi</h2>
      <ul>
        {najboljeOcenjeniProizvodi.map((proizvod) => (
          <li key={proizvod.id}>
            {proizvod.name} - Prosečna ocena: {proizvod.avgRating.toFixed(2)}
          </li>
        ))}
      </ul>
      <h2>Grafikon najprodavanijih proizvoda</h2>
      <div className={"pie-container"}>
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
    </div>
  );
};

export default AdminPageStats;
