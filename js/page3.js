/* ================================================
   page3.js
   1) 사진 슬라이더 (화살표 / 스와이프 / 점 / 첫·마지막 버튼 숨김)
   2) 일차 탭 (위·아래 탭 동시 동작, 5일차에서는 아래 탭 숨김)
   3) 5일차: 화면 터치 시 "이상입니다" 말풍선 등장
   ================================================ */

const screen = document.querySelector('.screen');
const tabs = document.querySelectorAll('.tab');
const days = document.querySelectorAll('.day');
const tabsBottom = document.querySelector('.tabs-bottom');
const endBubble = document.querySelector('.end-bubble');

/* 슬라이더마다 update 함수를 모아 둠 (탭 전환 때 다시 계산) */
const sliderUpdaters = [];

/* ---------- 사진 슬라이더 ---------- */
document.querySelectorAll('.slider').forEach((slider) => {
  const slides = slider.querySelector('.slides');
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  const dotsBox = slider.nextElementSibling;          // .dots
  const count = slides.children.length;

  // 사진 수만큼 점 만들기
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dotsBox.appendChild(dot);
  }
  const dots = dotsBox.querySelectorAll('.dot');

  // 숨겨진 일차는 폭이 0이라서 0으로 나누지 않게 막음
  const currentIndex = () =>
    slides.clientWidth ? Math.round(slides.scrollLeft / slides.clientWidth) : 0;

  // 점 표시 + 첫 사진이면 왼쪽 버튼, 마지막 사진이면 오른쪽 버튼 숨김
  const update = () => {
    const now = currentIndex();
    dots.forEach((dot, i) => dot.classList.toggle('active', i === now));
    prev.classList.toggle('hidden', now <= 0);
    next.classList.toggle('hidden', now >= count - 1);
  };

  const goTo = (i) => {
    const index = Math.max(0, Math.min(count - 1, i));
    slides.scrollTo({ left: slides.clientWidth * index, behavior: 'smooth' });
  };

  prev.addEventListener('click', () => goTo(currentIndex() - 1));
  next.addEventListener('click', () => goTo(currentIndex() + 1));
  slides.addEventListener('scroll', update);           // 스와이프도 반영
  window.addEventListener('resize', update);

  sliderUpdaters.push(update);
  update();                                            // 처음 로드 때 한 번
});

/* ---------- 일차 탭 ---------- */
function showDay(day) {
  // 위·아래 탭 모두 활성 표시 바꾸기
  tabs.forEach((t) => t.classList.toggle('active', t.dataset.day === day));

  // 해당 일차 내용만 보이기
  days.forEach((d) => d.classList.toggle('active', d.id === 'day' + day));

  // CSS에서 일차별 스타일에 쓸 수 있도록 기록
  screen.dataset.day = day;

  // 5일차에는 아래 탭 숨김, 다른 일차에서는 다시 보임
  if (tabsBottom) {
    tabsBottom.style.display = day === '5' ? 'none' : '';
  }

  // 일차를 바꾸면 말풍선은 다시 숨김 (5일차에 다시 오면 또 보여줄 수 있게)
  if (endBubble) {
    endBubble.classList.remove('show');
  }

  // 새로 보이게 된 일차의 슬라이더 버튼/점 상태를 다시 계산
  sliderUpdaters.forEach((update) => update());

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => showDay(tab.dataset.day));
});

/* ---------- 5일차: 터치하면 말풍선 올라옴 ---------- */
document.addEventListener('click', (e) => {
  if (screen.dataset.day !== '5') return;   // 5일차에서만
  if (e.target.closest('.tab')) return;     // 탭을 누를 때는 제외
  if (!endBubble) return;

  endBubble.classList.add('show');          // 한 번 나오면 계속 남아 있음
});

/* 처음엔 1일차 */
showDay('1');