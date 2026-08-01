function SearchBar({
  value,
  onChange,
  onAdd,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">

      <input
        type="text"
        placeholder="Search customer by name or email..."
        value={value}
        onChange={onChange}
        className="border rounded-lg px-4 py-2 w-full md:w-96"
      />

      <button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        + Add Customer
      </button>

    </div>
  );
}

export default SearchBar;