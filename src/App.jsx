import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed , setnumberAllowed] = useState(false)
  const [charAllowed , setcharAllowed] = useState(false)
  const [pass , setpass] = useState()

  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(() =>{
    let password = "";
    let str = "ABCDEFGHIJKLMNOPURSTUVWXYZ,abcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%&*~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length +1)
      password += str.charAt(char)
    }
    setpass(password)

  } ,[length,numberAllowed,charAllowed,setpass])

  const copyPasswordToClibboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(pass)
  }, [pass])
  useEffect(() => {
    passwordgenerator()
  }, [length,numberAllowed,charAllowed, passwordgenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-10 text-orange-500 bg-gray-700'>
    <h1 className='text-center text-white my-3'>Password Generator</h1>
      <div className='flex shadow  rounded-lg overflow-hidden mb-4'>
        <input type='text'
          value={pass}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClibboard} className='outline-none bg-sky-500 text-white px-3 py-0.5 shrink-0 hover:bg-orange-700 '>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
        <input type='range'
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setlength(e.target.value)}} 
         />
        <label>length: {length}</label>

        </div>
        <div className='flex item-center gap-x-1'>
        <input
          type='checkbox'
          defaultValue={numberAllowed}
          id='numberInput'
          onChange={() =>{setnumberAllowed((prev) => !prev);
          }}
        />
        <label htmlFor='numberInput'>Number</label>

        </div>

      <div className='flex item-center gap-x-1'>
        <input
          type='checkbox'
          defaultValue={charAllowed}
          id='characterInput'
          onChange={() =>{setcharAllowed((prev) => !prev);
          }}
        />
        <label htmlFor='characterInput'>character</label>
      </div>
      
      </div>
    </div>
    </>
  )
}

export default App
