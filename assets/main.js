// sub nav 버튼 이동
document.querySelectorAll("#sub_nav ul li a").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector(elem.getAttribute("href")).scrollIntoView({
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
  "#about, #profile, #works, #contact",
);

// active 변경
function setHeaderActive(id) {
  headerLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
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
const initialScrollPosition = window.scrollY + window.innerHeight / 2;

let initialSection = "";

headerSections.forEach((section) => {
  if (initialScrollPosition >= section.offsetTop) {
    initialSection = section.id;
  }
});

if (initialSection) {
  setHeaderActive(initialSection);
}

// index 구분
const currentParams = new URLSearchParams(window.location.search);
const currentVersion = currentParams.get("v") || "ent";

// index → subpage
document.querySelectorAll("#works a").forEach((link) => {
  if (currentVersion === "kids") {
    const href = link.getAttribute("href");
    link.href = `${href}?v=kids`;
  }
});

// subpage → index
const logoLink = document.querySelector(".logo a");

if (logoLink && currentVersion === "kids") {
  logoLink.href = "../../index.html?v=kids";
}

// subpage → index의 각 section
document.querySelectorAll("#mNav a, #header .lnb a").forEach((link) => {
  if (currentVersion === "kids") {
    const href = link.getAttribute("href");
    link.href = href.replace("../../index.html", "../../index.html?v=kids");
  }
});

// commercial insight
const commercialInsightData = {
  ent: `
    최근 엔터테인먼트 산업에서 그룹별 캐릭터 IP 활용이 활발하게 이루어지는 흐름 속에서, 캐릭터 기반 콘텐츠를 직접 활용해볼 수 있었던 의미 있는 작업. 캐릭터의 움직임과 표정, 장면 전환의 흐름을 자연스럽게 연결하는 과정 속에서 애니메이션 연출과 모션 표현 방식에 대한 이해를 넓힐 수 있었으며, 직접 녹음한 내레이션을 더해 영상의 분위기와 전달력을 조율하는 경험까지 함께 할 수 있었음. 또한 어린이부터 다양한 연령대까지 고려하며 영상의 속도감과 시각적 흐름을 구성해보며, 콘텐츠 대상에 따라 연출 방식과 분위기가 달라진다는 점에 대해 배우게 된 작업.
  `,

  kids: `
    캐릭터의 움직임을 구현하는 과정에서 단순히 동작을 추가하는 것보다 캐릭터의 표정과 움직임이 장면의 분위기와 자연스럽게 연결되는 것이 중요하다는 점을 경험함. 특히 캐릭터가 등장하는 순서와 움직임의 크기, 화면 내 요소들의 배치를 조절하며 시선이 자연스럽게 다음 장면으로 이어지도록 구성하는 과정에서 영상의 흐름을 설계하는 방법을 배울 수 있었음. 이를 통해 키즈 콘텐츠는 시각적인 재미뿐만 아니라 캐릭터의 행동과 화면 구성이 하나의 흐름으로 연결될 때 더욱 효과적으로 메시지를 전달할 수 있다는 점을 이해하게 된 작업.
  `,
};

const commercialInsight = document.querySelector(".commercial_insight");

if (commercialInsight) {
  commercialInsight.textContent = commercialInsightData[currentVersion];
}
