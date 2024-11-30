import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './DragItem';
import DropZone from './DropZone';
import './CreateProject.css';

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
            <div className="create-project-container">
                <div className="create-project-box">
                    <h1>Create Your Project</h1>
                    <div className="create-project-content">
                        <div className="drag-items">
                            <h2>Employees</h2>
                            <DragItem name="Jeff Smith" />
                            <DragItem name="Harry Simmons" />
                            <DragItem name="Sarah Likely" />
                        </div>
                        <div className="drop-zone">
                            <h2>Project Assignment</h2>
                            <DropZone onDrop={handleDrop} />
                            {droppedItems.map((item, index) => (
                                <div key={index} className="dropped-item">
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