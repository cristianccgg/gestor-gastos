const FormularioAgregar = ({
  crearGasto,
  datosFormulario,
  setDatosFormulario,
  setErrorTitulo,
  setErrorMonto,
  categorias,
  errorTitulo,
  errorMonto,
}) => {
  return (
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
        <p className="text-red-300 text-xs">Escribe un titulo para tu gasto</p>
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
  );
};

export default FormularioAgregar;
