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
// GitHub 링크 클릭 이벤트 핸들러  
document.querySelector('.github-link').addEventListener('click', function(e) {  
  e.preventDefault();  
  window.open(this.href, '_blank');  
});  
// 소셜 링크 클릭 이벤트 핸들러  
document.querySelectorAll('.social-link').forEach(link => {  
  link.addEventListener('click', function(e) {  
      e.preventDefault();  
      window.open(this.href, '_blank');  
  });  
}); 
document.addEventListener('DOMContentLoaded', function() {  
  // 프로그레스 바 애니메이션  
  const progressBars = document.querySelectorAll('.progress-bar');  
  progressBars.forEach(bar => {  
      setTimeout(() => {  
          bar.style.transform = 'scaleX(1)';  
      }, 500);  
  });  

  // AOS 초기화 (AOS 라이브러리를 사용중인 경우)  
  if (typeof AOS !== 'undefined') {  
      AOS.init({  
          duration: 1000,  
          once: false,  
          mirror: true  
      });  
  }  
});  