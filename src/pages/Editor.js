import React from 'react'
import { useState, useEffect, useRef } from "react";
import { hideContextMenu,wrapText, keepSelection, changeFontSize } from '../assets/function';
import { onContextMenu, handleChangeCommand } from '../assets/function';
import {options } from '../assets/data'
import Header from '../comps/layout/Header1';
import BtnByVerse2 from '../comps/layout/verse-buttons/BtnByVerse2';
import { BiSave } from 'react-icons/bi'
import { updateDocField, getSingleDoc } from '../assets/config/firebase';
import { useLocation } from 'react-router-dom';
import { editButtons } from '../assets/data';
import { BsFonts, BsCodeSlash } from 'react-icons/bs'
import { FiEdit2 } from 'react-icons/fi'
const Editor = () => {
  const [saveStatus, setSaveStatus] = useState("hide")
  const location = useLocation()
  const [html, setHtml] = useState("");
  const [editableDivContent, setEditableDivContent] = useState()
  const [book, setBook] = useState(null)
  const [styleDisplay, setStyleDisplay] = useState(false)
  const [editorView, setEditorView] = useState("page")
  const [editableDivChange, setEditableDivChange] = useState(0)
  const [dropDownButtonsDisplay, setDropDownButtonsDisplay] = useState(false)
  const editableDiv = useRef(null)
  let fontSizes = Array.from({length: 74}) // this array will us to display font sizes
  const docId = location.pathname.split("/")[2] // use to store doc id
  const pageNumber = location.pathname.split("=")[1] - 1 // use to store page number
  const savePage = () => { // this function use to save page content to firebase firestore
    setSaveStatus("proccessing")
    const newBookPages = () => { // this method return new Pages of the book by relpacing spasific page
      let tempAllPages = book.pages
      let TempCurrentPage = tempAllPages[pageNumber]
      const newPage = {
        visibility: TempCurrentPage.visibility,
        CreatedAt: TempCurrentPage.CreatedAt,
        lastEditAt: new Date(),
        content: html,
        otherUsers: TempCurrentPage.otherUsers,
        pageNumber: TempCurrentPage.pageNumber
      }
      tempAllPages[pageNumber] = newPage
      return tempAllPages

    } // ends newBookPages methods

    const obj = {
      "pages": newBookPages(),
      "lastEditAt": new Date()
    }
    updateDocField("books_array", docId, obj, setSaveStatus("success"))

  } // ends save page function
  useEffect(() => {
    getSingleDoc("books_array", docId, setBook)
  }, [])
  useEffect(() => {
    saveStatus == "success" && setTimeout(() => setSaveStatus("hide"), 1000)

  }, [saveStatus])
  useEffect(() => {
    if (book !== null) {
      setHtml(book.pages[pageNumber].content)
      setEditableDivContent(book.pages[pageNumber].content)
    }
  }, [book])
  useEffect(() => {
    editableDivChange > 0 && setHtml(editableDiv.current.innerHTML)
  }, [editableDivChange])
  useEffect(() => {
    document.addEventListener('click', function(event) {
      if (!event.target.matches('.context-menu')) {
        hideContextMenu()
      }
    });
  
    return () => {
      document.removeEventListener('click', function(event) {
        if (!event.target.matches('.context-menu')) {
          hideContextMenu()
        }
      });
    }
  }, [])
  
  return (<>
    <div className="editor-header">
      <Header />
      <div className="buttons-container">
        <div className="left-buttons">
          <span>Styles</span>
          <button className="style-button" onClick={() => {
            setStyleDisplay(!styleDisplay)
          }
          }>
            <BsFonts />
          </button>
          <span>
            Size
          </span>
          <select
            onChange={(e)=>{
              changeFontSize(e.target.value)
              setEditableDivChange((y) => y = y + 1)
            } 
          }
          >
            {
              fontSizes.map((_,index)=>{
                let  i = index + 1;
                return <option value={i}>{i}</option>
              })
            }
          </select>
          {
            editButtons.map((button) => {
              const { buttonIcon, classes, command } = button
              return (
                <>
                  <button class={classes} data-command={command} onClick={(event) => {
                    handleChangeCommand(event)
                    setEditableDivChange((y) => y = y + 1)
                  }}>{buttonIcon}</button>

                </>
              )
            })
          }

        </div>
        <div className={styleDisplay ? "style-container" : "style-container hide"}>
          {
            options.map((item) => {
              const { id, value, fontName, text } = item
              return <>
                <button
                  id={id}
                  className="urdu-marker style" onClick={() => {
                    wrapText(fontName)
                    setEditableDivChange((y) => y = y + 1)
                  }
                  }
                >
                  {value}
                  <div className={`demo ${fontName}`}>
                    {text}
                  </div>
                </button>
              </>
            })
          }
        </div>
        <div className="right-button">
          <div className="dropDownButtons" onClick={() => setDropDownButtonsDisplay(!dropDownButtonsDisplay)}>
            {
              editorView === "page" ? <><FiEdit2 />  Compose</> : <><BsCodeSlash /> html</>
            }
            <div className={dropDownButtonsDisplay ? "dropDown" : "dropDown hide"}>
              <button onClick={() => setEditorView("page")}><FiEdit2 />  Compose</button>
              <button onClick={() => setEditorView("text")}><BsCodeSlash /> html</button>
            </div>
          </div>
          <BtnByVerse2 text="Save it" icon={<BiSave />} clickAction={() => savePage()} />
          <div className="saving-msg" style={{ display: saveStatus === "hide" ? "none" : "block" }}>
            {saveStatus === "proccessing" ? "Saving..." : saveStatus === "success" && "Successfull"}

          </div>
        </div>
      </div>

    </div>
    <div className="App">

      <textarea
        className="text-area rtl"
        id={editorView === "page" ? "hiden" : "myTa"}
        value={html}
        onChange={(e) => {
          setHtml(e.target.value)
          setEditableDivContent(e.target.value)

        }}
        onContextMenu={onContextMenu}
        style={{
          display: editorView === "page" ? "none" : "block"
        }}
      ></textarea>



      <div className="single-page"
        style={{
          display: editorView === "page" ? "block" : "none"
        }}
      >
        <div className="page-div-container">
          <div
            ref={editableDiv}
            id={editorView === "page" ? "myTa" : "hiden"}
            onContextMenu={(event)=> onContextMenu(event) }
            className="page"
            dangerouslySetInnerHTML={{
              __html: editableDivContent
            }}
            contentEditable={true}
            onInput={(e) => setHtml(e.target.innerHTML)}
            onKeyDown={(event)=>{
              if (event.ctrlKey && event.key === "s") {
                event.preventDefault();
                // your custom save logic goes here
              }
            }}
          ></div>
          <div id="contextMenu" className="context-menu"
          onBlur={()=> hideContextMenu()}
          >
          {
            options.map((item) => {
              const { id, value, fontName, text } = item
              return <>
                <button
                  id={id}
                  className="urdu-marker style" onClick={() => {
                    wrapText(fontName)
                    setEditableDivChange((y) => y = y + 1)
                  }
                  }
                >
                  {value}
                  <div className={`demo urdu-marker`}>
                    {text}
                  </div>
                </button>
              </>
            })
          }
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Editor