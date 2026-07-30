import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import "./App.css";
import Gasto from "./components/Gasto";

const categorias = ["comida", "transporte", "entretenimiento"];

function App() {
  const [gastos, setGastos] = useState(() => {
    const guardados = localStorage.getItem("gastos");
    return guardados ? JSON.parse(guardados) : [];
  });
  const [datosFormulario, setDatosFormulario] = useState({
    titulo: "",
    monto: "",
    fecha: new Date().toISOString().split("T")[0],
    categoria: "",
  });
  const [abrirEditor, setAbrirEditor] = useState(null);
  const [tituloEditar, setTituloEditar] = useState("");
  const [montoEditar, setMontoEditar] = useState("");
  const [fechaEditar, setFechaEditar] = useState("");
  const [categoriaEditar, setCategoriaEditar] = useState("");
  const [abrirConfirmacion, setAbrirConfirmacion] = useState(null);
  const [errorTitulo, setErrorTitulo] = useState("");
  const [errorMonto, setErrorMonto] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  const crearGasto = (datosFormulario) => {
    if (
      datosFormulario.titulo.trim() !== "" &&
      datosFormulario.monto.trim() !== ""
    ) {
      const gastoNuevo = {
        id: crypto.randomUUID(),
        titulo: datosFormulario.titulo,
        monto: Number(datosFormulario.monto),
        fecha: datosFormulario.fecha,
        categoria: datosFormulario.categoria,
      };
      setErrorTitulo(false);
      setErrorMonto(false);
      setGastos((prevGastos) => [...prevGastos, gastoNuevo]);
      setDatosFormulario({
        titulo: "",
        monto: "",
        fecha: "",
        categoria: "",
      });
    } else {
      setErrorTitulo(true);
      setErrorMonto(true);
    }
  };

  const eliminarGasto = (id) => {
    setGastos((prevGastos) => prevGastos.filter((gasto) => gasto.id !== id));
  };

  const editarGasto = (
    idGasto,
    tituloNuevo,
    montoNuevo,
    categoriaNueva,
    fechaNueva,
  ) => {
    setGastos((prevGastos) =>
      prevGastos.map((gasto) =>
        gasto.id === idGasto
          ? {
              ...gasto,
              titulo: tituloNuevo,
              monto: Number(montoNuevo),
              fecha: fechaNueva,
              categoria: categoriaNueva,
            }
          : gasto,
      ),
    );
  };

  const total = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);
  const gastosMostrados = categoriaFiltro
    ? gastos
        .filter((gasto) => gasto.categoria === categoriaFiltro)
        .sort((a, b) => (a.fecha > b.fecha ? 1 : -1))
    : gastos.sort((a, b) => (a.fecha > b.fecha ? 1 : -1));

  const totalCategoria = gastosMostrados.reduce(
    (acc, gasto) => acc + gasto.monto,
    0,
  );

  return (
    <div className="min-h-screen bg-teal-700">
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
            onChange={(e) => {
              setDatosFormulario((prev) => ({
                ...prev,
                titulo: e.target.value,
              }));
              if (e.target.value.trim() !== "") {
                setErrorTitulo(false);
              }
            }}
            type="text"
            placeholder="Escribe tu gasto"
            className="bg-teal-900/40 border border-teal-800 rounded-lg px-3 py-2 text-sm text-teal-50 placeholder:text-teal-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            value={datosFormulario.monto}
            onChange={(e) => {
              setDatosFormulario((prev) => ({
                ...prev,
                monto: e.target.value,
              }));
              if (e.target.value.trim() !== "") {
                setErrorMonto(false);
              }
            }}
            type="number"
            placeholder="00"
            className="bg-teal-900/40 border border-teal-800 rounded-lg px-3 py-2 text-sm text-teal-50 placeholder:text-teal-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <div className="flex gap-3">
            <input
              value={datosFormulario.fecha}
              onChange={(e) =>
                setDatosFormulario((prev) => ({
                  ...prev,
                  fecha: e.target.value,
                }))
              }
              type="date"
              className="flex-1 min-w-0 bg-teal-900/40 border border-teal-800 rounded-lg px-3 py-2 text-sm text-teal-50 placeholder:text-teal-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
              className="flex-1 min-w-0 bg-teal-900/40 border border-teal-800 rounded-lg px-3 py-2 text-sm text-teal-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>
          {errorTitulo && (
            <p className="text-red-300 text-xs">
              Escribe un titulo para tu gasto
            </p>
          )}
          {errorMonto && (
            <p className="text-red-300 text-xs">
              Escribe un monto para tu gasto
            </p>
          )}

          <button
            type="submit"
            className="self-end bg-emerald-500 hover:bg-emerald-400 transition-colors rounded-lg px-4 py-2 text-sm font-medium text-teal-950"
          >
            Agregar gasto
          </button>
        </form>
        <h1 className="text-2xl font-bold mt-10 mb-4 text-teal-50">
          Mis gastos
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setCategoriaFiltro("")}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              categoriaFiltro === ""
                ? "bg-emerald-500 text-teal-950"
                : "bg-teal-900/40 border border-teal-800 text-teal-300 hover:text-teal-100"
            }`}
          >
            Todas
          </button>
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaFiltro(categoria)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                categoriaFiltro === categoria
                  ? "bg-emerald-500 text-teal-950"
                  : "bg-teal-900/40 border border-teal-800 text-teal-300 hover:text-teal-100"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
        {gastosMostrados.length === 0 ? (
          <p className="text-sm text-teal-400 text-center bg-teal-950 border border-teal-800 rounded-2xl p-6">
            Aún no tienes gastos registrados
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {gastosMostrados.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                abrirEditor={abrirEditor}
                tituloEditar={tituloEditar}
                montoEditar={montoEditar}
                fechaEditar={fechaEditar}
                categoriaEditar={categoriaEditar}
                categorias={categorias}
                abrirConfirmacion={abrirConfirmacion}
                editarGasto={editarGasto}
                eliminarGasto={eliminarGasto}
                setAbrirEditor={setAbrirEditor}
                setCategoriaEditar={setCategoriaEditar}
                setMontoEditar={setMontoEditar}
                setFechaEditar={setFechaEditar}
                setTituloEditar={setTituloEditar}
                setAbrirConfirmacion={setAbrirConfirmacion}
              />
            ))}
          </div>
        )}
        {categoriaFiltro !== "" && (
          <div className="flex justify-between items-center bg-teal-950 border border-teal-800 rounded-2xl p-4 shadow-lg mt-4">
            <h2 className="font-semibold text-teal-50">
              Gastos {categoriaFiltro}
            </h2>
            <p className="font-semibold text-emerald-400">
              ${totalCategoria.toLocaleString("es-CO")}
            </p>
          </div>
        )}
        <div className="flex justify-between items-center bg-teal-950 border border-teal-800 rounded-2xl p-4 shadow-lg mt-4">
          <h2 className="font-semibold text-teal-50">Gastos totales</h2>
          <p className="font-semibold text-emerald-400">
            ${total.toLocaleString("es-CO")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
