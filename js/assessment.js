'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
const commentarea = document.getElementById('input_text');
const input_akane = document.getElementById('input_akane');
const input_fukidasi = document.getElementById('input_fukidasi');
const input_area = document.getElementById('input-area');
const input_screen = document.getElementById('input-screen');
const moji_1 = document.getElementById('moji1');
const moji_2 = document.getElementById('moji2');
const moji_3 = document.getElementById('moji3');
const moji_4 = document.getElementById('moji4');
const moji_5 = document.getElementById('moji5');
const think_akane = document.getElementById('think_akane');
const result = document.getElementById('result');

const BGM = {
  music: new Audio('./audio/m_set_103.mp3'),
  piko: new Audio('./audio/decision22.mp3')
}


function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

var opa = 1;
function opa_to_0() {
  if (opa >= 0) {
    opa = opa - 0.1;
    input_akane.style.opacity = `${opa}`;
    input_fukidasi.style.opacity = `${opa}`;
    input_area.style.opacity = `${opa}`;
  } else {
    clearInterval(opa_to_0);
  }
}

function kaiseki() {
  moji_1.style.display = "block";
  moji_2.style.display = "block";
  moji_3.style.display = "block";
  moji_4.style.display = "block";
  moji_5.style.display = "block";
  think_akane.style.display = "block";
}

function kekka() {
  BGM.music.pause();
  BGM.piko.volume = 0.2;
  BGM.piko.play();
  input_screen.style.display = "none";
  result.style.display = "block";
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    commentarea.innerHTML = "<br>名前がなきゃ<br>はじまらんでー"
    return;
  }
  BGM.music.volume = 0.2;
  BGM.music.play();
  setInterval(opa_to_0, 200);
  setTimeout(kaiseki, 3000);
  setTimeout(kekka, 10000);

  commentarea.innerHTML = "<br>いいとこ、<br>あるかなー？"

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // TODO ツイートエリアの作成
};

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

function assessment(userName) {
  let sumOfcharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
  }

  const index = sumOfcharCode % answers.length;
  let result = answers[index];


  //標準語　→　関西語変換機能
  result = result.replace(/{userName}/g, userName);
  result = result.replace(/です/g, "やで");
  result = result.replace(/ます/g, "そうやな");
  return result;
}
