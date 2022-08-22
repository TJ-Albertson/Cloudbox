import { React } from "react";

import "../CSS/TestDrag.css";
import "../CSS/CloudBox.css";

export default function TestDrag() {

    const draggables = document.querySelectorAll('.draggable')
    const containers = document.querySelectorAll('.container')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
          draggable.classList.add('dragging')
        })
      
        draggable.addEventListener('dragend', () => {
          draggable.classList.remove('dragging')
        })
      })
      
      containers.forEach(container => {
        container.addEventListener('dragover', e => {
          e.preventDefault()
          const afterElement = getDragAfterElement(container, e.clientY)
          const draggable = document.querySelector('.dragging')
          if (afterElement == null) {
            container.appendChild(draggable)
          } else {
            container.insertBefore(draggable, afterElement)
          }
        })
      })
      
      function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
      
        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect()
          const offset = y - box.top - box.height / 2
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
          } else {
            return closest
          }
        }, { offset: Number.NEGATIVE_INFINITY }).element
      }

  return (
    <div className="Grid">
      <div class="container">
        <p class="draggable" draggable="true">1</p>
        <p class="draggable" draggable="true">2</p>
      </div>
      <div class="container">
        <p class="draggable" draggable="true">3</p>
        <p class="draggable" draggable="true">4</p>
      </div>
    </div>
  );
}
