import { useState } from "react";
import "./App.css";

const categorias = ["comida", "transporte", "entretenimiento"];

function App() {
  const [gastos, setGastos] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState({
    titulo: "",
    monto: "",
    categoria: "",
  });

  const crearGasto = (datosFormulario) => {
    if (
      datosFormulario.titulo.trim() !== "" &&
      datosFormulario.monto.trim() !== ""
    ) {
      const gastoNuevo = {
        id: crypto.randomUUID(),
        titulo: datosFormulario.titulo,
        monto: datosFormulario.monto,
        categoria: datosFormulario.categoria,
      };
      setGastos((prevGastos) => [...prevGastos, gastoNuevo]);
      setDatosFormulario({
        titulo: "",
        monto: "",
        categoria: "",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-teal-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          crearGasto(datosFormulario);
        }}
        className="bg-teal-950 border border-teal-800 rounded-2xl p-5 flex flex-col gap-3 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-teal-50">Agregar gasto</h2>
        <input
          value={datosFormulario.titulo}
          onChange={(e) =>
            setDatosFormulario((prev) => ({
              ...prev,
              titulo: e.target.value,
            }))
          }
          type="text"
          placeholder="Escribe tu gasto"
          className="bg-teal-900/40 border border-teal-800 rounded-lg px-3 py-2 text-sm text-teal-50 placeholder:text-teal-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          value={datosFormulario.monto}
          onChange={(e) =>
            setDatosFormulario((prev) => ({
              ...prev,
              monto: e.target.value,
            }))
          }
          type="number"
          placeholder="00"
          className="bg-teal-900/40 border border-teal-800 rounded-lg px-3 py-2 text-sm text-teal-50 placeholder:text-teal-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <select
          name="categoria"
          value={datosFormulario.categoria}
          onChange={(e) =>
            setDatosFormulario((prev) => ({
              ...prev,
              categoria: e.target.value,
            }))
          }
          className="bg-teal-900/40 border border-teal-800 rounded-lg px-3 py-2 text-sm text-teal-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="self-end bg-emerald-500 hover:bg-emerald-400 transition-colors rounded-lg px-4 py-2 text-sm font-medium text-teal-950"
        >
          Agregar gasto
        </button>
      </form>
      <h1 className="text-2xl font-bold mt-10 mb-4 text-teal-50">Mis gastos</h1>
      <div className="flex flex-col gap-3">
        {gastos.map((gasto) => (
          <div
            key={gasto.id}
            className="flex justify-between items-center bg-teal-950 border border-teal-800 rounded-2xl p-4 shadow-lg"
          >
            <div>
              <p className="font-semibold text-teal-50">{gasto.titulo}</p>
              <p className="text-xs text-teal-400 capitalize">
                {gasto.categoria}
              </p>
            </div>
            <p className="font-semibold text-emerald-400">${gasto.monto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
