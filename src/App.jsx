import Glider from "./webGl/Glider";
import Navbar from "./jsx_comp/Navbar/Navbar";
import Introduction from "./jsx_comp/Main_Body/Introduction/Introduction";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <div className="header" style={{ margin_bottom: "0px" }}>
          <Navbar />
          <Glider width={20} height={6} />
        </div>
        <div className="main_body">          
          <Introduction />
        </div>
      </div>
    </>
  );
}

export default App;
