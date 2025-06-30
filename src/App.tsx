import {useEffect, useState} from 'react'
import './App.css'
import {io} from "socket.io-client";

function App() {
    useEffect(() => {
        const socket = io("http://samurai-chat-back.herokuapp.com");
    }, []);

    const [messages, setMessages] = useState([
      {message: "Hello Victor", id: "123", user: {id: "3546", name: "Dimych"}},
      {message: "Hello Dimych", id: "1sdf23", user: {id: "35dsf46", name: "Victor"}},
  ])

  return (
    <div className={'App'}>
        <div style={{border: '1px solid black', padding: '10px', height:'300px', overflowY: 'scroll'}}>
            {messages.map((m, key) => {
                return <div key={key}>
                    <b>{m.user.name}:</b> {m.message}
                    <hr/>
                </div>
            })}
        </div>
        <textarea>

        </textarea>
        <button>Send</button>
    </div>
  )
}

export default App
