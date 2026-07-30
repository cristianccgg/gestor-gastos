import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import "./App.css";

const categorias = ["comida", "transporte", "entretenimiento"];

function App() {
  const [gastos, setGastos] = useState(() => {
    const guardados = localStorage.getItem("gastos");
    return guardados ? JSON.parse(guardados) : [];
  });
  const [datosFormulario, setDatosFormulario] = useState({
    titulo: "",
    monto: "",
    categoria: "",
  });
  const [abrirEditor, setAbrirEditor] = useState(null);
  const [tituloEditar, setTituloEditar] = useState("");
  const [montoEditar, setMontoEditar] = useState("");
  const [categoriaEditar, setCategoriaEditar] = useState("");
  const [abrirConfirmacion, setAbrirConfirmacion] = useState(null);
  const [errorTitulo, setErrorTitulo] = useState("");
  const [errorMonto, setErrorMonto] = useState("");

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
        categoria: datosFormulario.categoria,
      };
      setErrorTitulo(false);
      setErrorMonto(false);
      setGastos((prevGastos) => [...prevGastos, gastoNuevo]);
      setDatosFormulario({
        titulo: "",
        monto: "",
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

  const editarGasto = (idGasto, tituloNuevo, montoNuevo, categoriaNueva) => {
    setGastos((prevGastos) =>
      prevGastos.map((gasto) =>
        gasto.id === idGasto
          ? {
              ...gasto,
              titulo: tituloNuevo,
              monto: Number(montoNuevo),
              categoria: categoriaNueva,
            }
          : gasto,
      ),
    );
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
        {errorTitulo && (
          <p className="text-red-300 text-xs">
            Escribe un titulo para tu gasto
          </p>
        )}
        {errorMonto && (
          <p className="text-red-300 text-xs">Escribe un monto para tu gasto</p>
        )}

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
            {abrirEditor === gasto.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editarGasto(
                    gasto.id,
                    tituloEditar,
                    montoEditar,
                    categoriaEditar,
                  );
                  setAbrirEditor(null);
                  setCategoriaEditar("");
                  setMontoEditar("");
                  setTituloEditar("");
                }}
                className="flex flex-col gap-3 w-full"
              >
                <input
                  value={tituloEditar}
                  onChange={(e) => setTituloEditar(e.target.value)}
                  type="text"
                  placeholder="Escribe tu gasto"
                  className="bg-teal-900/40 border border-teal-800 rounded-lg px-3 py-2 text-sm text-teal-50 placeholder:text-teal-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <input
                  value={montoEditar}
                  onChange={(e) => setMontoEditar(e.target.value)}
                  type="number"
                  placeholder="00"
                  className="bg-teal-900/40 border border-teal-800 rounded-lg px-3 py-2 text-sm text-teal-50 placeholder:text-teal-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <select
                  value={categoriaEditar}
                  onChange={(e) => setCategoriaEditar(e.target.value)}
                  name="categoria"
                  className="bg-teal-900/40 border border-teal-800 rounded-lg px-3 py-2 text-sm text-teal-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setAbrirEditor(null)}
                    type="button"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-teal-300 hover:text-teal-100 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 transition-colors rounded-lg px-4 py-2 text-sm font-medium text-teal-950"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div>
                  <p className="font-semibold text-teal-50">{gasto.titulo}</p>
                  <p className="text-xs text-teal-400 capitalize">
                    {gasto.categoria}
                  </p>
                </div>
                <p className="font-semibold text-emerald-400">
                  ${gasto.monto.toLocaleString("es-CO")}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setAbrirEditor(gasto.id);
                      setCategoriaEditar(gasto.categoria);
                      setTituloEditar(gasto.titulo);
                      setMontoEditar(gasto.monto);
                    }}
                    type="button"
                    className="text-teal-400 hover:text-emerald-400 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setAbrirConfirmacion(gasto.id)}
                    className="text-teal-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {abrirConfirmacion === gasto.id && (
                  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-teal-950 border border-teal-800 rounded-2xl p-6 shadow-lg max-w-sm w-full">
                      <h2 className="text-lg font-semibold text-teal-50">
                        Eliminar gasto
                      </h2>
                      <p className="text-sm text-teal-400 mt-1">
                        Esta acción no se puede deshacer.
                      </p>

                      <div className="flex justify-end gap-2 mt-5">
                        <button
                          onClick={() => setAbrirConfirmacion(null)}
                          type="button"
                          className="rounded-lg px-4 py-2 text-sm font-medium text-teal-300 hover:text-teal-100 transition-colors"
                        >
                          Cancelar
                        </button>

                        <button
                          onClick={() => {
                            eliminarGasto(gasto.id);
                            setAbrirConfirmacion(null);
                          }}
                          type="button"
                          className="bg-red-500 hover:bg-red-400 transition-colors rounded-lg px-4 py-2 text-sm font-medium text-teal-950"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
