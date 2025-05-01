
document.addEventListener('DOMContentLoaded', function() {
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          
          entry.target.classList.add('reveal');
          
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1, 
      rootMargin: '0px 0px -50px 0px' 
    });
  
    
    const socialContainers = document.querySelectorAll('.social-container, .social-container2');
    socialContainers.forEach(container => {
      observer.observe(container);
    });
  });