import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './DragItem';
import DropZone from './DropZone';

const CreateProject = () => {
    const [droppedItems, setDroppedItems] = useState([]);

    const handleDrop = (item) => {
        setDroppedItems((prevItems) => [...prevItems, item]);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...droppedItems];
        updatedItems.splice(index, 1);
        setDroppedItems(updatedItems);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div style={{
                    border: '1px solid #ccc',
                    padding: '20px',
                    borderRadius: '5px'
                }}>
                    <h1>Create Your Project</h1>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}>
                        <div style={{
                            border: '1px solid #ccc',
                            padding: '10px', borderRadius: '5px'
                        }}>
                            <h2>Drag Items</h2>
                            <DragItem name="Jeff Smith" />
                            <DragItem name="Harry Simmons" />
                            <DragItem name="Sarah Likely" />
                        </div>
                        <div style={{
                            border: '1px solid #ccc',
                            padding: '10px', borderRadius: '5px'
                        }}>
                            <h2>Drop Zone</h2>
                            <DropZone onDrop={handleDrop} />
                            {droppedItems.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        marginTop: '10px',
                                        backgroundColor: 'lightblue',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <p>{item.name}</p>
                                    <button onClick={() => handleRemoveItem(index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default CreateProject;
