const nextBtn = document.querySelector('.next-btn');
const bubble = document.querySelector('.bubble');

let shown = false;   // 말풍선을 한 번 보여줬는지

nextBtn.addEventListener('click', () => {
  // 두 번째 클릭부터: 다음 페이지로 이동
  if (shown) {
    location.href = 'page3.html';   // ← 다음 페이지 파일명으로 바꾸세요
    return;
  }

  // 첫 번째 클릭: 말풍선만 보여주고 이동하지 않음
  shown = true;
  bubble.classList.add('show');
});

// 애니메이션이 끝나면 다시 숨김
bubble.addEventListener('animationend', () => {
  bubble.classList.remove('show');
});