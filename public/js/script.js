document.addEventListener("DOMContentLoaded", () => {  
    const navLinks = document.querySelectorAll(".nav-links a");  
  
    // 클릭 시 스크롤 이동  
    navLinks.forEach(link => {  
      link.addEventListener("click", (event) => {  
        event.preventDefault();  
        const targetSection = document.querySelector(link.getAttribute("href"));  
        targetSection.scrollIntoView({ behavior: "smooth" });  
      });  
    });  
  });