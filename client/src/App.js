import JoinRoom from "./components/JoinRoom"
import io from "socket.io-client"

const socket = io.connect('http://localhost:3001')

function App() {
  return (
    <div className="App">
      <JoinRoom socket={socket} />
    </div>
  );
}

export default App;
