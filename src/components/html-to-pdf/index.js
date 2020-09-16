import React, {useState} from 'react'
import ReactToPdf from 'react-to-pdf'
import PfdSection from './pdf-section'

import './index.css'

export default function PdfSection() {
  const [pdfSections, setPdfSections] = useState([])
  const [sectionIndex, setSectionIndex] = useState(0)
  const [sectionHeight, setSectionHeight] = useState(60)
  // let i = 0

  const [selectedSection, setSelectedSection] = useState(null)
  
  const addSection = (section) => {
    setPdfSections([...pdfSections, {
      data: {
        id: sectionIndex,
        col: section.data.col,
        height: section.data.height,
        selected: false
      }
    }])
    setSectionIndex(sectionIndex + 1)
  }

  const handleHeightChange = (event) => {
    setSectionHeight(event.target.value)
    console.log(sectionHeight)
  }

  const handleSelect = (id) => {
    let newPdfSectionsList = []

    pdfSections.map(s => {
      if(id === s.data.id){
        newPdfSectionsList.push({
          data: {
            id: s.data.id,
            col: s.data.col,
            height: s.data.height,
            selected: true
          }
        })
      } else {
        newPdfSectionsList.push({
          data: {
            id: s.data.id,
            col: s.data.col,
            height: s.data.height,
            selected: false
          }
        })
      }
    })

    setPdfSections(newPdfSectionsList)

    newPdfSectionsList.map(s => {
      if(s.data.selected === true) {
        setSelectedSection(s)
        console.log(s)
      }
    })
  }

  const handleDeleteSection = () => {
    let newPdfSectionsList = []
    
    pdfSections.map(s => {
      if(!s.data.selected){
        newPdfSectionsList.push({
          data: {
            id: s.data.id,
            col: s.data.col,
            height: s.data.height,
            selected: s.data.selected
          }
        })
      } 
    })

    setPdfSections(newPdfSectionsList)
  }

  const handleUpdateSection = (data) => {
    let newPdfSectionsList = []

    pdfSections.map(s => {
      if(s.data.selected){
        newPdfSectionsList.push({
          data: {
            id: s.data.id,
            col: data.col,
            height: data.height,
            selected: s.data.selected
          }
        })
      } else {
        newPdfSectionsList.push({
          data: {
            id: s.data.id,
            col: s.data.col,
            height: s.data.height,
            selected: false
          }
        })
      }
    })

    setPdfSections(newPdfSectionsList)
  }

  const ref = React.createRef();
  return (
    <div>
      <ReactToPdf targetRef={ref} filename="div-blue.pdf">
          {({toPdf}) => (
              <button onClick={toPdf}>Generate pdf</button>
          )}
      </ReactToPdf>

      <input type="text" value={sectionHeight} onChange={handleHeightChange}/>
      <button onClick={() => addSection({ data: { col: 1, height: sectionHeight}})}>Add Section</button>
      <button onClick={() => handleDeleteSection()}>Delete Section</button>
      <button onClick={() => handleUpdateSection( { col: 1, height: sectionHeight })}>Update Section</button>

      <div className="pdf-container">
        <div style={{width: '100%', height: '100%'}} ref={ref} className="">
          {pdfSections.map((i) => { 
            return (
              <PfdSection key={i.data.id} id={i.data.id} title={'hej'} height={i.data.height} selected={i.data.selected} handleSelected={handleSelect}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}
