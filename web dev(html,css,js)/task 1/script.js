// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get the button element
    const alertButton = document.getElementById('alertButton');
    const demoParagraph = document.getElementById('demo');
    
    // Add click event listener to the button
    alertButton.addEventListener('click', function() {
        // Show an alert when the button is clicked
        alert('Hello! You clicked the button!');
        
        // Also update the paragraph text
        demoParagraph.textContent = 'Button was clicked!';
    });
    
    // Bonus: Change background color on mouseover
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#f9f9f9';
        });
        
        section.addEventListener('mouseout', function() {
            this.style.backgroundColor = 'white';
        });
    });
});