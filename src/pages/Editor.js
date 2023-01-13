import React from 'react'
import { useState } from "react";
import { wrapText } from '../assets/function';
import { onContextMenu } from '../assets/function';
import { options } from '../assets/data'
import Header from '../comps/layout/Header1';
import BtnByVerse2 from '../comps/layout/verse-buttons/BtnByVerse2';
import {BiSave} from 'react-icons/bi'
import { updateDocField } from '../assets/config/firebase';
import { useLocation } from 'react-router-dom';
const Editor = () => {
  const location = useLocation()
  const [html, setHtml] = useState("");
  const savePage = ()=>{ // this function use to save page content to firebase firestore
    const docId = location.pathname.split("/")[2]
    const pageNumber = location.pathname.split("=")[1]-1
    console.log(pageNumber)
    const obj = {
      "`pages.${pageNumber}.content`": html
    }
    updateDocField("books_array",docId,obj)

  } // ends save page function
  return (<>
      <Header/>
    <div className="App">
      <div className="buttons-container">
        <div className="left-buttons">
        {
        options.map((item) => {
          const { id, value, fontName } = item
          return <>
            <button
              id={id}
              className={fontName}
              onClick={() => {
                wrapText("myTa", `<span class=${fontName} >`, "</span>", setHtml)
              }
              }
            >
              {value}
            </button>
          </>
        })
      }
        </div>
        <div className="right-button">
          <BtnByVerse2 text="Save it" icon={<BiSave/>} clickAction={()=> savePage()}/>
        </div>
      </div>
      <textarea
        className="text-area rtl"
        id="myTa"
        value={html}
        onChange={(e)=> setHtml(e.target.value)}
        onContextMenu={onContextMenu}
      ></textarea>



      <div className="single-page">
        <div className="page-div-container">
        <div
        id="edit-div"
        className="rtl page"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      ></div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Editor