import { useState } from "react";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);

  //callback functions -> async functions för nmär man exempelvis ska läsa en fil (data i array)

  function handleAddItems(item) {
    console.log(item);
    setItems((currentItems) => [...currentItems, item]);
  }

  function handleDeleteItems(id) {
    console.log(id);
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    console.log(id);
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Header />
      <Form handleAddItems={handleAddItems} />
      <TodoList
        items={items}
        handleDeleteItems={handleDeleteItems}
        handleToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Header() {
  return <h1> Packing List </h1>;
}
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
      <h3> What do you need for your trip? </h3>

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
        placeholder="Item..."
        // value={input} gör så att det blir en controlled state
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function TodoList({ items, handleDeleteItems, handleToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleDeleteItems={handleDeleteItems}
            handleToggleItem={handleToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, handleDeleteItems, handleToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          handleToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {""}
        {item.input}
      </span>
      <button onClick={() => handleDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  //early return om inget item finns i arrayen
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding todos</em>
      </p>
    );

  //Annars detta
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed === true).length;
  const numPercent = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {numPercent === 100
          ? "Nice! You have no more todos."
          : `
        You have ${numItems} items on your list, and you already packed
        ${numPacked} (${numPercent} %)`}
      </em>
    </footer>
  );
}
