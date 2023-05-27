import React, { useState } from 'react';
import './body.css';

const Body = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [mainInput, setMainInput] = useState('');
  const [subItemValues, setSubItemValues] = useState([]);
  const [subItemValuesEdit, setSubItemValuesEdit] = useState(
    items.map((item) => ({
      subTitle: '',
      subDesc: '',
    }))
  );
  const [editIndex, setEditIndex] = useState([-1, -1]);

  const handleAddItem = () => {
    if (mainInput.trim() !== '') {
      setItems([...items, { title: mainInput, subItems: [] }]);
      setMainInput('');
      setSubItemValues([...subItemValues, { subTitle: '', subDesc: '' }]);
      setEditIndex([-1, -1]);
      moveInputBox();
    }
  };

  const handleInputChange = (event) => {
    setMainInput(event.target.value);
  };

  const handleSubItemInputChange = (index, field) => (event) => {
    const updatedSubItemValues = [...subItemValues];
    updatedSubItemValues[index][field] = event.target.value;
    setSubItemValues(updatedSubItemValues);
  };
  const handleSubItemInputChangeEdit = (index, field) => (event) => {
    const updatedSubItemValuesEdit = [...subItemValuesEdit];
    
    // Check if the subItemValuesEdit array has a value for the specified index
    if (updatedSubItemValuesEdit[index]) {
      updatedSubItemValuesEdit[index][field] = event.target.value;
    } else {
      // If the value doesn't exist, create a new object for the index
      updatedSubItemValuesEdit[index] = {
        [field]: event.target.value,
      };
    }
    
    setSubItemValuesEdit(updatedSubItemValuesEdit);
  };

  const handleAddSubItem = (index) => {
    return () => {
      const subItemValue1 = subItemValues[index].subTitle;
      const subItemValue2 = subItemValues[index].subDesc;

      if (subItemValue1 !== '' || subItemValue2 !== '') {
        const updatedItems = [...items];
        updatedItems[index].subItems.push({ subTitle: subItemValue1, subDesc: subItemValue2 });
        setItems(updatedItems);

        const updatedSubItemValues = [...subItemValues];
        updatedSubItemValues[index] = { subTitle: '', subDesc: '' };
        setSubItemValues(updatedSubItemValues);
      }
    };
  };
 
  const handleEditSubItem = (index, subIndex) => {
    setEditIndex([index, subIndex]);
    const subItemValue = items[index].subItems[subIndex];
    setSubItemValuesEdit((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = {
        subTitle: subItemValue.subTitle,
        subDesc: subItemValue.subDesc,
      };
      return updatedState;
    });
 
  };

  const handleSaveEdit = (index, subIndex) => {
    return () => {
      const updatedItems = [...items];
      updatedItems[index].subItems[subIndex] = {
        subTitle: subItemValuesEdit[index]?.subTitle ||'',
        subDesc: subItemValuesEdit[index]?.subDesc ||'',
      };
      setItems(updatedItems);
      setEditIndex([-1, -1]);
    };
    
   
  };

  const handleCancelEdit = () => {
    setEditIndex([-1, -1]);
  };

  const moveInputBox = () => {
    const inputBox = document.querySelector('.main_body-body-input_box');
    const inputBuutonIcon = document.querySelector('.main_body-body-button_icon');

    const currentLeft = parseInt(getComputedStyle(inputBox).left, 10) || 0;
    const currentIconLeft = parseInt(getComputedStyle(inputBuutonIcon).left, 10) || 0;

    inputBox.style.left = `${currentLeft + 310}px`;
    inputBuutonIcon.style.left = `${currentIconLeft + 310}px`;
  };


  const editButtonSvg = <path d="M13.2189 0C12.8777 0 12.5365 0.130292 12.2761 0.390625L10.6667 2L14.0001 5.33333L15.6095 3.72396C16.1302 3.20329 16.1302 2.35921 15.6095 1.83854L14.1616 0.390625C13.9012 0.130292 13.56 0 13.2189 0ZM9.33341 3.33333L1.50652 11.1602C1.50652 11.1602 2.11837 11.1053 2.34637 11.3333C2.57437 11.5613 2.38669 13.0533 2.66669 13.3333C2.94669 13.6133 4.4293 13.4162 4.64196 13.6289C4.85463 13.8416 4.83988 14.4935 4.83988 14.4935L12.6668 6.66667L9.33341 3.33333ZM0.666672 13.3333L0.0377607 15.1146C0.013037 15.1849 0.000273226 15.2588 0 15.3333C0 15.5101 0.0702384 15.6797 0.195264 15.8047C0.320289 15.9298 0.489859 16 0.666672 16C0.741187 15.9997 0.815129 15.987 0.885424 15.9622C0.887598 15.9614 0.889768 15.9605 0.891934 15.9596L0.908861 15.9544L0.912768 15.9518L2.66669 15.3333L1.66668 14.3333L0.666672 13.3333Z" fill="#B0B1C8"/>
  const addButtonSvg = <path d="M13.4939 5.34077V8.73452H0V5.34077H13.4939ZM8.59931 0V14.3322H4.9081V0H8.59931Z" fill="white"/>
  
  
  

  return (
    <div className='main_body-body'>
    <div className='main_body-body-middle_part'>
      <input className='main_body-body-input_box' value={mainInput} onChange={handleInputChange} placeholder='Add Todo-List'/>
      <div className='main_body-body-button_icon'>
        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleAddItem}>{addButtonSvg}
        </svg>
      </div>
      <div className='main_body-body_outer'>
        {items.map((item, index) => (
          <div className='main_body-body-outer-todo_list' key={index}>
            <div className='main_body-body-outer-todo_list-text_content'><p>{item.title}</p></div>
            

            <div className='main_body-body_inner'>
              
                <div className='main_body-body_inner-input_box'>
                  <input className='main_body-body_inner-input_box1'
                    type='text' placeholder='Add Todo'
                    value={subItemValues[index].subTitle} 
                    onChange={handleSubItemInputChange(index, 'subTitle')}
                  />
                  <input className='main_body-body_inner-input_box2'
                    type='text' placeholder='Add Todo Description'
                    value={subItemValues[index].subDesc}
                    onChange={handleSubItemInputChange(index, 'subDesc')}
                  />
                  {/* add sub button */}
                  <div className='main_body-body_inner-input_box-button' >
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleAddSubItem(index)}>{addButtonSvg}
                    </svg>
                  </div>
                  <div className='money-bag_icon-back'>
                    <svg className='money-bag_icon' width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.9036 3.96558H2.67395C1.86398 4.89136 0.412354 6.76817 0.412354 8.342C0.412354 9.05266 0.728129 11.3718 4.78878 11.3718C8.84943 11.3718 9.1652 9.05266 9.1652 8.342C9.1652 6.76817 7.71357 4.89136 6.9036 3.96558Z" fill="white"/>
                      <path d="M4.4525 3.29478V1.94818H5.1258V3.29478H6.68044L8.02703 0.601593H1.55127L2.89786 3.29478H4.4525V3.29478Z" fill="white"/>
                    </svg>
                  </div>

                </div>
                
                {item.subItems.map((subItem, subIndex) => (
                  <div className='main_body-body_inner-content_box' key={subIndex}>
                    {(editIndex[0] === index && editIndex[1] === subIndex )?(
                            <>
                            <div className='main_body-body_inner-content_box-sublist'>
                          <div className='main_body-body_inner-content_box-sublist-title'>{subItem.subTitle}</div>
                          <div className='main_body-body_inner-content_box-sublist-desc'>{subItem.subDesc}</div>
                          {/* edit button */}
                          <svg className='main_body-body_inner-content_box-sublist-button' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleEditSubItem(index, subIndex)}>{editButtonSvg}</svg>
                          
                          </div>
                           <div className='main_body-body_inner-content_box-sublist_section'>
                             <input
                              className='main_body-body_inner-content_box-sublist_section-input1'
                               type='text'
                               value={subItemValuesEdit[index].subTitle}
                               placeholder={subItem.subTitle}
                              onChange={handleSubItemInputChangeEdit(index, 'subTitle')}
                              
                             />
                             <textarea
                             className='main_body-body_inner-content_box-sublist_section-input2'
                               type='text'
                               value={subItemValuesEdit[index].subDesc}
                               placeholder={subItem.subDesc}
                              onChange={handleSubItemInputChangeEdit(index, 'subDesc')}
                              
                             />

                             <button className='main_body-body_inner-content_box-sublist_section-save' onClick={handleSaveEdit(index, subIndex)}>Save</button>
                      
                             <svg className='main_body-body_inner-content_box-sublist_section-cancel' width="12" height="10" viewBox="0 0 12 10" fill="" xmlns="http://www.w3.org/2000/svg" onClick={handleCancelEdit}>
                              <path d="M0.147257 4.72344L4.02377 0.519623L4.735 1.2909L1.71708 4.56362H10.5626C10.8407 4.56362 11.0656 4.80799 11.0656 5.10908C11.0656 5.41017 10.8407 5.65453 10.5626 5.65453H1.71708L4.735 8.92726L4.02377 9.69853L0.147257 5.49471C-0.0494111 5.28144 -0.0494111 4.93671 0.147257 4.72344Z" fill="white"/>
                             </svg>

                           </div> 
                           </>
                       
                       ):( <div className='main_body-body_inner-content_box-sublist'>
                          <div className='main_body-body_inner-content_box-sublist-title'>{subItem.subTitle}</div>
                          <div className='main_body-body_inner-content_box-sublist-desc'>{subItem.subDesc}</div>
                          {/* edit button */}
                          <div className='main_body-body_inner-content_box-sublist-button'>
                          <svg className='main_body-body_inner-content_box-sublist-button_svg' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleEditSubItem(index, subIndex)}>{editButtonSvg}</svg>
                          
                          </div></div>
                        )
                    }
                      
                   
                  </div>
                ))}
              
            </div>
          </div>
        ))}
      </div>
    </div>
    
    </div>
  );
};


export default Body;
