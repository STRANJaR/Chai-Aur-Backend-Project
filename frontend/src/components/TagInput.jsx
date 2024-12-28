import React, { useState } from 'react'
import { Input } from './ui/input';

const TagInput = ({onDataReceived}) => {

    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');


    const handleTagSend = () => {onDataReceived(inputValue)}

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };

    const handleKeyDown = (e) => {
        if(e.key === ',' || e.key === 'Enter'){
            e.preventDefault();

            if(inputValue.trim()!== ''){
                setTags([...tags, inputValue.trim()]);
                handleTagSend()
                setInputValue('');
            }
        }
    }


    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index)=> index !== indexToRemove))
    }


    return (
        
            <div className="flex flex-wrap items-center rounded-sm">
                <ul className="flex flex-wrap gap-3 py-3">
                    {tags.map((tag, index) => (
                        <li key={index} className="bg-zinc-200 text-slate-900 dark:bg-zinc-900 dark:text-gray-300 px-4 py-2 rounded-sm flex justify-center gap-1">
                            {tag}
                            <span className=" cursor-pointer text-red-500" onClick={() => removeTag(index)}>
                                &times;
                            </span>
                        </li>
                    ))}
                </ul>

                <Input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a tag and press ',' or Enter"
                    className="tag-input"
                />
            </div>
    )
}

export default TagInput