function Header() {
    return (
      <header className="flex items-center justify-between p-4 bg-gray-100">
        <h1 className="text-lg font-bold">Vista previa </h1>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded p-2"
        />
      </header>
    );
  }
  
  export default Header;