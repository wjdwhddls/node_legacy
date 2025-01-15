document.addEventListener("DOMContentLoaded", () => {  
    // 네비게이션 스크롤 기능  
    const navLinks = document.querySelectorAll(".nav-links a");  
    
    navLinks.forEach(link => {  
      link.addEventListener("click", (event) => {  
        event.preventDefault();  
        const targetSection = document.querySelector(link.getAttribute("href"));  
        targetSection.scrollIntoView({ behavior: "smooth" });  
      });  
    });  
  
    // 이미지 슬라이더 기능  
    const slides = document.querySelectorAll(".slide");  
    const dots = document.querySelectorAll(".dot");  
    let currentSlide = 0;  
  
    function showSlide(index) {  
      slides.forEach(slide => slide.classList.remove("active"));  
      dots.forEach(dot => dot.classList.remove("active"));  
      
      slides[index].classList.add("active");  
      dots[index].classList.add("active");  
    }  
  
    function nextSlide() {  
      currentSlide = (currentSlide + 1) % slides.length;  
      showSlide(currentSlide);  
    }  
  
    // 도트 클릭 이벤트  
    dots.forEach((dot, index) => {  
      dot.addEventListener("click", () => {  
        currentSlide = index;  
        showSlide(currentSlide);  
      });  
    });  
  
    // 자동 슬라이드  
    setInterval(nextSlide, 5000);  
  });
  window.addEventListener('scroll', () => {  
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;  
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;  
    const scrolled = (winScroll / height) * 100;  
    document.querySelector('.scroll-progress').style.width = scrolled + '%';  
});  