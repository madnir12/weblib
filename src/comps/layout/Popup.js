import React, {useState} from 'react'
import InputByVerse from './InputByVerse/InputByVerse'
import Select from './Select'
import { addNewDoc } from '../../assets/config/firebase'
import { newBook } from '../../assets/firebaseStucture'
const Popup = ({modelActive,cancel}) => {
  const [bookName, setBookName] = useState("")
  const [visibility, setVisibility] = useState("")
  const options = [
    {
      name: "visibility",
      value: "public",
      setValue: setVisibility
    },
    {
      name: "visibility",
      value: "private",
      setValue: setVisibility
    }
  ]
  return (
<div className={modelActive ? "model-background show" : "model-background hide"}>
  <div className="model-container">
    <h3>Add A New Book</h3>
    <br />
    <InputByVerse labelText="Book Name" setInputValue={setBookName} inputValue={bookName}/>
    <br /><br /><br />
    <h4>Visibility</h4>
    <Select currentSelection={visibility} options={options}/>
    <div className="button-container">
    <button onClick={()=> cancel(false)} className="cancel">Cancel</button>
    <button onClick={()=> {
      if(bookName !== "" && visibility !== "" ) {
        addNewDoc("books_array",newBook(bookName,visibility))
        setVisibility("")
        setBookName("")
        cancel(false)
        
      }
    }
      } className={bookName !== "" && visibility !== "" ? "active" : "disable" }>Add</button>
    </div>
  </div>
</div>
  )
}

export default Popup