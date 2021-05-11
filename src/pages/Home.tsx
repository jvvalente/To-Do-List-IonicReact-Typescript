import { IonContent, IonHeader, IonPage,IonTitle, IonToolbar, IonItem, IonList, IonLabel, IonInput, IonButton, IonIcon, IonListHeader, useIonPopover, IonCheckbox, IonPopover } from '@ionic/react';
import './Home.css';
import React, { useState, useEffect } from 'react';
import { trashOutline, pencilOutline, ellipseOutline, checkmarkCircle } from 'ionicons/icons';

var indexToEdit = 0;

const Home: React.FC = () => {

  const setEditIndex = (index: number) => {
    indexToEdit = index;
  }

  const [items, setItems] = useState([
		{itemName: "Take out trash", isSelected: false},
    {itemName: "Do Calculus homework", isSelected: true},
    {itemName: "Write Grocery List", isSelected: false}
	]);

  const [inputValue, setInputValue] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleAddButtonClick = () => {
		const newItem = {
			itemName: inputValue,
      isSelected: false,
		};

		const newItems = [...items, newItem];

		setItems(newItems);
		setInputValue('');
		
	};

  const handleDeleteButton = (index: number) => {

    // first we make a copy of the array
    const arrayCopy = [...items];

    //we remove the element from the copy
    arrayCopy.splice(index, 1);

    //set the new state
    setItems(arrayCopy);

  }

  const handleEditButton = () => {

    // first we make a copy of the array
    const arrayCopy = [...items];

    const newItem = {
			itemName: editValue,
      isSelected: false,
		};

    //we remove the element from the copy
    arrayCopy[indexToEdit] = newItem;

    //set the new state
    setItems(arrayCopy);

    //closes popover
    closePopover();

    //clears input on popover
    setEditValue('');

  }

  const closePopover = () => {
    setShowPopover({ showPopover: false})
  }

  const handleToggleComplete = (index: number) => {
		const newItems = [...items];

		newItems[index].isSelected = !newItems[index].isSelected;

		setItems(newItems);
	};

  const [popoverState, setShowPopover] = useState({ showPopover: false});

  

  return (
    <>
    <IonPopover
      cssClass='my-custom-class'
      
      isOpen={popoverState.showPopover}
      onDidDismiss={() => setShowPopover({ showPopover: false})}
      >
      <IonHeader className="edit-task-header" >Edit Task</IonHeader>
      <IonInput type="text" value={editValue} className='edit-item-input' onIonChange={e => setEditValue(e.detail.value!)} placeholder='Edit this item...' slot="end" ></IonInput>
      <IonItem>
        <IonButton className="editValue" color="success" onClick={() => handleEditButton()}>Save</IonButton>
        <IonButton className="cancel-button" color="transparent" onClick={() => closePopover()}>Cancel</IonButton>
      </IonItem>
    </IonPopover>

    <IonToolbar>
      <IonTitle className="titleBar">My To-do List
        <IonItem className="add-item">
          <IonInput type="text" value={inputValue} className='add-item-input' onIonChange={e => setInputValue(e.detail.value!)} placeholder='Add an item...'></IonInput>
          <button className="add-button" onClick={() => handleAddButtonClick()} slot="end"> Add To List </button>
        </IonItem>
      </IonTitle>
    </IonToolbar>
    <IonContent>

    <IonList className="item-list">
        {items.map((item, index) => (
						<div className='item-container'>
							<div className='item-name' >
									<>
                  <IonItem lines="none" color="black" className="list-item">
                    
                    
                    {item.isSelected ? (
									    <>
										  <IonIcon className="item-selected" icon={checkmarkCircle} onClick={() => handleToggleComplete(index)}></IonIcon>
                      <span><del>{item.itemName}</del></span>
									    </>
								    ) : (
									    <>
										  <IonIcon className="item-single-name" icon={ellipseOutline} onClick={() => handleToggleComplete(index)}></IonIcon>
										  <span>{item.itemName}</span>
									    </>
								    )}
                    <IonButton className="edit-button" color="black" onClick={(e: any) => {e.persist();setShowPopover({ showPopover: true});setEditIndex(index)}} slot="end">
                      <IonIcon icon={pencilOutline}  ></IonIcon>
                    </IonButton>
                    <IonButton className="delete-button" color="black" onClick={() => handleDeleteButton(index)} slot="end">
                      <IonIcon icon={trashOutline} ></IonIcon>  
                    </IonButton>
                    
                  </IonItem>
                    
									</>
							</div>
						
						</div>
					))}
        
    </IonList>
    </IonContent>
    </>
  );
};

export default Home;
