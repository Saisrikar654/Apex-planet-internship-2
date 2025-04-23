
document.addEventListener('DOMContentLoaded', function() {

    const alertButton = document.getElementById('alertButton');
    const demoParagraph = document.getElementById('demo');
    

    alertButton.addEventListener('click', function() {
       
        alert('Hello! You clicked the button!');
        

        demoParagraph.textContent = 'Button was clicked!';
    });
    

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
