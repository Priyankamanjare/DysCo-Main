import React, { useState, useRef } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Summary.css'
const apiURL = import.meta.env.VITE_BACKEND_URL;

const Summary = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState("")
  const summaryRef = useRef();

  const { user } = useAuthContext();

  const handleSummary = async() => {
    try {
      if(!user) {
        toast.error('Please log in to use this feature');
        return;
      }

      if(!text || text.trim().length === 0) {
        toast.error('Please enter some text to summarize');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`
        }
      };
      const response = await axios.post(`${apiURL}/summary/`, {text}, config);
      if(response && response.status == 200 && response.data) {
        setSummary(response.data.summary)
        toast.success('Text summarized successfully!');
      }
    } catch(error) {
      console.error('Summary error:', error);
      // Get error message from backend response or use default
      const errorMessage = error?.response?.data?.message 
        || error?.response?.data?.error 
        || error?.message 
        || 'Failed to summarize text. Please try again.';
      toast.error(errorMessage);
    }
  }

  const handleCopyClick = async () => {
    try {
      const textToCopy = summaryRef.current.textContent;
      await navigator.clipboard.writeText(textToCopy);
      toast.success('Text copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy text to clipboard');
    }
  };
  
  return (
    <div className='summary__page__container'>
      <h1>Summary</h1>
      <textarea
        placeholder="Enter text to summarize"
        value={text}
        onChange={(e) => {setText(e.target.value)}}
      />
      <button className="primary__btn" onClick={handleSummary}>Summarize</button>
      <div className='summary__content'>
        <div ref={summaryRef}>
          {summary}
        </div>
        {(summary?.length) > 0 && 
          (<button className="secondary__btn" onClick={handleCopyClick}>Copy</button>)
        }
      </div>
    </div>
  )
}

export default Summary
