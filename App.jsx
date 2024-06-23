import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(true);
  const [Password, setPassword] = useState("");

  const Passref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) str += "0123456789";
    if (charAllow) str += "@#$%&*";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllow, charAllow]);

  const copyToClipboard = useCallback(() => {
    if (Passref.current) {
      Passref.current.select();
      document.execCommand('copy');
    }
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, charAllow, passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-8 my-8 text-orange-400 bg-gray-800'>
        <h1 className='text-4xl text-center text-white mb-6'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-6'>
          <input
            type="text"
            value={Password}
            className='outline-none w-full py-3 px-4 text-black'
            placeholder='password'
            readOnly
            ref={Passref}
          />
          <button
            onClick={copyToClipboard}
            className='outline-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 shrink-0'
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <input
              type="range"
              min={6}
              max={16}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className='text-white'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              id='numberInput'
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput' className='text-white'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id='charcterInput'
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label htmlFor='charcterInput' className='text-white'>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
