document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.querySelector('.typewriter-target');
    const originalText = typewriterElement.innerHTML;
    
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalText;
    const textToType = tempDiv.textContent;
    
    
    typewriterElement.innerHTML = '';
    
    let i = 0;
    let isTag = false;
    let currentTag = '';
    let tagContent = '';
    
    function typeWriter() {
      if (i < originalText.length) {
        
        if (originalText[i] === '<') {
          isTag = true;
          currentTag += originalText[i];
          i++;
          return typeWriter();
        } else if (originalText[i] === '>') {
          isTag = false;
          currentTag += originalText[i];
          typewriterElement.innerHTML += currentTag;
          currentTag = '';
          i++;
          return typeWriter();
        }
        
        if (isTag) {
          currentTag += originalText[i];
          i++;
          return typeWriter();
        }
        
        
        const currentText = originalText.substring(0, i + 1);
        typewriterElement.innerHTML = currentText;
        i++;
        setTimeout(typeWriter, 100); 
      } else {
        
        typewriterElement.classList.add('complete');
      }
    }
    
    
    setTimeout(typeWriter, 500);
  });