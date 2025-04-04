let calendar;


document.addEventListener('DOMContentLoaded', async function() {
  
  // Fetch Date 

  fetch("/tasks")
    .then(response => response.json())  // Parse the response as JSON
    .then(tasks => {
      tasks_dict = tasks;  // Store the fetched tasks

      // Initialize the calendar
      const calendarEl = document.getElementById('calendar');
      calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        
        events: tasks_dict.map(task => ({
          title: task.content,
          start: task.taskDate,
        })),

      });
      calendar.render();
    })
})
