import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createConnection, sendMessage, setClientName, typeMessage} from './chat-reducer';
import type {AppStateType} from './main.tsx';


function App() {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const typingUsers = useSelector((state: AppStateType) => state.chat.typingUsers);
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');
    const [name, setName] = useState('Dimych');
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const messagesBlockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // @ts-ignore
        dispatch(createConnection());

        return () => {
        };
    }, [dispatch]);

    useEffect(() => {
        if (isAutoScrollActive && messagesBlockRef.current) {
            messagesBlockRef.current.scrollTo({
                top: messagesBlockRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isAutoScrollActive]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        const maxScrollPosition = element.scrollHeight - element.clientHeight;

        if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 10) {
            setIsAutoScrollActive(true);
        } else {
            setIsAutoScrollActive(false);
        }
        setLastScrollTop(element.scrollTop);
    };

    return (
        <div className="App">
            <div
                style={{
                    border: '1px solid black',
                    padding: '10px',
                    width: '300px',
                    height: '300px',
                    overflowY: 'scroll'
                }}
                onScroll={handleScroll}
                ref={messagesBlockRef}
            >
                {messages.map((m:any) => (
                    <div key={m.id}>
                        <b>{m.user.name}:</b> {m.message}
                        <hr/>
                    </div>
                ))}
                {typingUsers.map((m:any) => (
                    <div key={m.id}>
                        <b>{m.name}</b>
                        ...печатает
                        <hr/>
                    </div>
                ))}
                <div ref={messagesBlockRef} /> {/* Анкор для автоскролла */}
            </div>

            <div style={{display: 'flex', flexDirection: 'column', width: '320px',}}>
                <input
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                <button onClick={() => {
                    // @ts-ignore
                    dispatch(setClientName(name));
                }}>
                    Send name
                </button>

                <textarea
                    style={{height: '50px'}}
                    value={message}
                    onKeyDown={() => {
                        // @ts-ignore
                        dispatch(typeMessage())
                    }}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                />
                <button onClick={() => {
                    // @ts-ignore
                    dispatch(sendMessage(message));
                    setMessage('');
                }}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default App;