import React,{ useState } from 'react';
import './Table_Button.css'
const Table_Buttons = ({setcurrentPage,currentPage,indexOfFirstPage,indexOfLastPost,totalData,listPerpage}) => {
   
  
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1);
        }
      };
      
      const goToNextPage = () => {
        // Assuming you have a totalPageCount variable representing the total number of pages
        if (currentPage < totalData) {
            setcurrentPage(currentPage + 1);
        }
      };
  
   
    return ( 
        <div className="Table_Buttons d-flex flex-row align-items-center">
            <button className="tablebtn bg-white px-6 py-2" 
            onClick={()=>{
                setcurrentPage(1)
            }}
            >First</button>
            <button className="tablebtn bg-white px-6 py-2"
            onClick={()=> goToPreviousPage()}
            
            >Prev</button>
            <p className='px-4 py-2 h-color m-0 fs-5 bg-pp'>{currentPage}</p>
            <button className="tablebtn bg-white px-6 py-2"
            onClick={()=> goToNextPage() }
          
            >Next</button>
            <button className="tablebtn bg-white px-6 py-2"
            onClick={()=>{
                setcurrentPage(Math.ceil(totalData/listPerpage));
            }}
            >Last</button>
        </div>
     );
}
 
export default Table_Buttons;