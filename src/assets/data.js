import {GrUndo} from 'react-icons/gr'
import {BsTypeBold} from 'react-icons/bs'
import {BiItalic} from 'react-icons/bi'
import {FaUnderline} from 'react-icons/fa'
import {AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineUnorderedList} from 'react-icons/ai'
import {BsJustify} from 'react-icons/bs'

const tehreer = "مثالی تحریر"
const english = "Lorem ipsum dolor sit amet consectetur "
export const options = [
    {
        id: 1,
        fontName: 'quran-marker',
        text: tehreer
    },
    {
        id: 2,
        fontName: 'quran-bold-marker',
        text: tehreer
    },
    {
        id: 3,
        fontName: 'quran-underline-marker',
        text: tehreer
    },
    
    {
        id: 4,
        fontName: 'hadees-marker',
        text: tehreer
    },
    {
        id: 5,
        fontName: 'hadees-bold-marker',
        text: tehreer
    },
    {
        id: 6,
        fontName: 'urdu-marker',
        text: tehreer
    },
    {
        id: 7,
        fontName: 'urdu-underline-marker',
        text: tehreer
    },
    {
        id: 8,
        fontName: 'urdu-bold-marker',
        text: tehreer
    },
    {
        id: 9,
        fontName: 'ref-urdu-marker',
        text: tehreer
    },
    {
        id: 10,
        fontName: 'ref-urdu',
        text: tehreer
    },
    {
        id: 11,
        fontName: 'arabic-marker',
        text: tehreer
    },
    {
        id: 12,
        fontName: 'arabic-underline-marker',
        text: tehreer
    },
    {
        id: 13,
        fontName: 'arabic-bold-marker',
        text: tehreer
    },
    {
        id: 14,
        fontName: 'ref-arabic-marker',
        text: tehreer
    },
    {
        id: 15,
        fontName: 'ref-arabic',
        text: english
    },
    {
        id: 16,
        fontName: 'english-marker',
        text: english
    },
    {
        id: 17,
        fontName: 'english-underline-marker',
        text: english
    },
    {
        id: 18,
        fontName: 'english-bold-marker',
        text: english
    },
    {
        id: 19,
        fontName: 'ref-english-marker',
        text: english
    },
    {
        id: 20,
        fontName: 'ref-english',
        text: english
    },
    {
        id: 21,
        fontName: 'heading-marker',
        text: tehreer
    },
    {
        id: 22,
        fontName: 'heading-marker',
        text: tehreer
    },
    {
        id: 23,
        fontName: 'heading-underline-marker',
        text: tehreer
    },
] // ends options 
// editor buttons
export const editButtons = [
          {
                    buttonIcon:<BsTypeBold/>,
                    classes: "my-text-btn",
                    command: "bold"
          },
          {
                    buttonIcon:<BiItalic/>,
                    classes: "my-text-btn",
                    command: "italic"
          },
          {
                    buttonIcon:<FaUnderline/>,
                    classes: "my-text-btn",
                    command: "underline"
          },
          {
                    buttonIcon:<AiOutlineAlignLeft/>,
                    classes: "my-text-btn",
                    command: "justifyLeft"
          },
          {
                    buttonIcon:<AiOutlineAlignCenter/>,
                    classes: "my-text-btn",
                    command: "justifyCenter"
          },
          {
                    buttonIcon:<AiOutlineAlignRight/>,
                    classes: "my-text-btn",
                    command: "justifyRight"
          },
          {
                    buttonIcon:<BsJustify/>,
                    classes: "my-text-btn",
                    command: "justifyFull"
          },
          
]