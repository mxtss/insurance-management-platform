function PolicySearch({
  value,
  onChange,
  onAdd,
}) {
  return (
    <div className="flex justify-between mb-6">

      <input
        type="text"
        placeholder="Search Policy Number..."
        value={value}
        onChange={onChange}
        className="border rounded-lg px-4 py-2 w-96"
      />

      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-5 rounded-lg"
      >
        + Create Policy
      </button>

    </div>
  );
}

export default PolicySearch;