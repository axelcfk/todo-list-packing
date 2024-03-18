function Form({ handleAddItems }) {
  const [input, setInput] = useState("");
  const [quantity, setQuantity] = useState(1);
  //items (array) is not actually needed anywhere else.
  //We only use it to render it to the items array. it is the packing list who renders the list

  function handleSubmit(e) {
    // e.preventDefault() förhindrar default beteende för submit
    e.preventDefault();
    // om ingen input - gör en early return
    if (!input) return;

    const newItem = { input, quantity, done: false, id: Date.now() };
    console.log(newItem);

    handleAddItems(newItem);

    setInput("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your trip? 😍 </h3>

      {/* {Controlled state === gör så att react "äger" värdet. Inte DOMen. 
          nedan anväder jag setQuantity med e.target.value på onChange för att göra detta"} */}
      <select
        // value={quantity} gör så att det blir en controlled state
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* skapar en slect option-lista med nummer 1 till 20. Array.from skapar en array som sedan loopas igenom från index(0) +1 till 20. 
            Jag mappar sedan genom arrayen och skapar en option för varje element. value och key får samma value */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add todo..."
        // value={input} gör så att det blir en controlled state
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
