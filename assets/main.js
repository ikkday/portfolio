// sub nav 버튼 이동
document.querySelectorAll("#sub_nav ul li a").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();

    document
      .querySelector(elem.getAttribute("href"))
      .scrollIntoView({
        behavior: "smooth",
      });
  });
});


// 스크롤 이벤트
let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  let scrollTop2 = window.scrollY;

  const subNav = document.querySelector("#sub_nav");

  if (subNav) {
    if (scrollTop2 > lastScrollTop) {
      subNav.classList.add("hide");
    } else {
      subNav.classList.remove("hide");
    }
  }

  lastScrollTop = scrollTop2;
});


// 모바일 메뉴
const button = document.querySelector("#mNav i");
const nav = document.querySelector("#mNav ul");

if (button && nav) {
  button.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}


// header 현재 section active
const headerLinks = document.querySelectorAll("#header .lnb a");
const headerSections = document.querySelectorAll(
  "#about, #profile, #works, #contact"
);


// active 변경
function setHeaderActive(id) {
  headerLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${id}`
    );
  });
}


// header 메뉴 클릭
headerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.getAttribute("href");

    if (target && target.startsWith("#")) {
      const id = target.substring(1);

      // 클릭한 메뉴를 바로 active
      setHeaderActive(id);
    }
  });
});


// 스크롤에 따른 active 변경
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  let currentSection = "";

  headerSections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentSection = section.id;
    }
  });


  // 페이지 가장 아래에서는 CONTACT
  const pageBottom =
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 5;

  if (pageBottom) {
    currentSection = "contact";
  }


  if (currentSection) {
    setHeaderActive(currentSection);
  }
});


// 페이지 처음 들어왔을 때 active 확인
const initialScrollPosition =
  window.scrollY + window.innerHeight / 2;

let initialSection = "";

headerSections.forEach((section) => {
  if (initialScrollPosition >= section.offsetTop) {
    initialSection = section.id;
  }
});

if (initialSection) {
  setHeaderActive(initialSection);
}