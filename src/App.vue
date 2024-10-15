<script setup>
  import { ref, computed, onMounted, nextTick } from 'vue';

  let timeoutId = null;

  const content = {
    id: 5,
    title: '수풀누리와 캠핑장 도슨트',
    image: 'https://cdn.jsdelivr.net/gh/HEOJUNFO/paju/main_content_44.jpg',
    location: null,
    tts: 'https://cdn.jsdelivr.net/gh/HEOJUNFO/paju/peace-KOR-02-05-01.mp3',
    docent: `수풀누리는 시민들의 습지체험원으로 조성된
공간으로, 메타세콰이아 길, 관찰데크,
창포섬, DMZ 정원, 잔디동산, 잔디광장으로
구성되어 있으며, 바로 옆에는 평화누리
캠핑장이 자리해 있습니다.
또한 야간에 임진각과 비무장지대의
정취를 즐길 수 있도록 하기 위해
야간관광 시설을 조성했는데,
가장 주요한 콘텐츠는 13m 높이의 조형물인
하나그루 나무입니다.
저녁에는 하나그루를 중심으로
희망의 꽃씨가 모여 하나의 나무가 된다는
영상쇼가 펼쳐지니 꼭 구경하시고 가시는 걸
추천드립니다. 수풀누리 야간관광 콘텐츠는
6개의 코스로 이루어져 있습니다.
희망의 꽃씨, promirose no2맥동, 하나그루,
하나의메아리, 화합의 길, 평화의 꽃가루 등으로 이루어져 있어요.
하나의 메아리는 데크 주변의 수변공간에 고강도
레이저를 쏴서 빛의 파장이 물결처럼 잔잔하게
퍼지는 신비한 느낌을 표현한 곳입니다.
동선을 따라 데크가 설치되어 있어
천천히 걸으며 감상할 수 있어서 좋습니다.
수풀누리의 메인이라고 할 수 있는
13m의 초대형 나무인 하나그루에는 무궁화와
함박꽃이 함께 피어나고 있어요.
참고로 함박꽃은 북한의 꽃이라고 하네요.
남북이 하나가 되는 염원을
담아서 만들었다고 해요.
하나그루 앞에는 벤치도
설치되어 있어서 편하게 앉아서 관람할 수 있고,
이곳의 미디어 스토리 역시 남북평화의 메시지를
담았다고 합니다. 여러분께서는 하나그루를 즐기는
8분이라는 짧은 시간 안에 긴장감, 평온함, 행복감을
다 느껴볼 수 있습니다.
또한 평화의 꽃가루는 하나그루의
꽃가루로 물든 습지를 표현한 레이저아트를 만나볼 수
있어요. 마치 여러 마리의 반딧불을 보는 것처럼
아름다우니 꼭 놓치지 마세요.
희망의 꽃씨는 북쪽에서
날아온 평화의 꽃씨가 모여드는 곳이라는 의미를 가진
곳으로 메타세쿼이아를 따라 이어진 곳이에요. 평화의
꽃가루를 배경으로 하고 민들레씨를 모티브로 만든
조형물이 있습니다.
Promirose_no2 맥동은 사람이 다가가면
센서가 작동해서 꽃이 활짝 피는 조명물입니다. 그리고
화합의 길에는 남자 얼굴과 여자 얼굴 조형물이 마주보고
있는데, 남과 북을 표현했다고 하네요.
수풀누리를 즐기셨다면 평화누리 캠핑장도 
가보시고 즐거운 캠핑과
함께 DMZ의 자연을 즐겨 보세요.`,
  };
  //   const content = {
  //     id: 1,
  //     title: '임진각 소개 도슨트',
  //     image: 'https://cdn.jsdelivr.net/gh/HEOJUNFO/paju/main_content_00.png',
  //     tts: 'https://cdn.jsdelivr.net/gh/HEOJUNFO/paju/peace-KOR-02-02.mp3',
  //     docent: `캠프그리브스에 오신 여러분을 환영합니다.
  // 캠프그리브스는 1953년 7월 27일 한국전쟁 정전협정
  // 이후부터 2004년 8월까지 50여 년간 6개의 미군 부대가 주둔했던 공간입니다.
  // 마지막으로 주둔했던 미 육군 2사단 506연대가 2004년 이라크 파병을 계기로
  // 미군은 철수하게 되었고, 그 후 캠프그리브스는 2007년 한국 정부에 반환되었습니다.
  // 그리고 2012년 경기도, 1사단, 파주시, 경기관광공사의 노력으로,
  // 2013년부터는 국내 유일한 민통선 내 유스호스텔과 전시관으로 운영되고 있습니다.
  // 캠프그리브스는 국내에서 가장 오래된 미군기지 중 하나로,
  // 1950년대부터 1990년대까지 미군의 다양한 건축양식과 생활의 흔적을 만나 보실 수 있습니다.
  // 또한 여러 전시관에서 한국전쟁 역사와 예술작품을 관람하실 수 있어
  // DMZ의 역사, 문화, 예술이 집약된 숙박형 문화예술 체험 공간으로
  // DMZ 평화 관광 활성화를 위한 거점 시설로 활용되고 있습니다.
  // 잠시 캠프그리브스의 어원을 소개하자면
  // 미군은 해외파병 부대의 부대명에 '캠프(Camp)'를 붙이며,
  // 전쟁이나 훈련 중 공로를 세운 군인의 이름을 사용합니다.
  // 캠프그리브스의 '그리브스(Greaves)'는 클린턴 그리브스라는 인물의 이름에서 유래했습니다.
  // 미국 남북전쟁 시기에 동료 기병을 구하기 위해
  // 아파치(인디언) 부족을 물리친 클린턴 그리브스 하사를 기리기 위함입니다.
  // 그럼 지금부터 캠프그리브스의 첫관문인 갤러리 그리브스에 대해서 소개해 드릴께요.
  // 잘 들어주세요!
  // 갤러리 그리브스는 미군 주둔 당시 볼링장으로 사용되었던 공간을
  // 2020년에 리모델링하여 현재와 같이 파주임진각평화곤돌라를
  // 방문하는 관람객을 위한 전시 및 휴게 공간으로 리뉴얼 되었습니다.
  // 전시 주제인 ‘젊은 날의 초상, 우리들의 젊은 날’은 한국전쟁에서 젊은 날들을 보냈던
  // UN 파병 용사, 종군기자에 대한 이야기와 우리나라 학도병의 이야기를 담고 있습니다.
  // 또한 중립국감독위원회 스위스로부터 제공받은 정전협정서 사본을 제공받아
  // 정전 70년 특별전시 ‘세 개의 선’이 전시를 진행하고 있습니다.
  // 갤러리 그리브스는 경기관광공사가 중립국 감독위원회 스위스로부터 정전협정서
  // 사본을 제공받아 특별전을 진행하고 있는데,
  // 협정문과 지도, DMZ 포토존으로 구성되어 정전협정에 대한 내용을 보실 수 있습니다.
  // 그리고 안으로 들어가면 육이오 전쟁때 활약한
  // 다양한 인물과 전투 그에 관련된 전시물들을 보실 수 있습니다.
  // 특히 존리치가 찍은 한국전쟁에 대한 생생한 컬러사진들,
  // 종군기자로써 한국전쟁을 전세계에 알린
  // 마거릿 하긴스 이야기등 생생한 사진과 인물정보를 만나보실수 있으며,
  // 미국 스미스 부대를 포함한 전세계 21개국의 파병 장병에 대한 자료로 관람 하실 수 있습니다.
  // 그리고 군인 신분도 아닌 학도병 신분으로 전쟁에서 국가를 위해 헌신한 학도병에 대한 자료도 보실 수 있는데,
  // 이들에 대한 자료를 자녀들과 함께 보면서 학도병들의 국가에 대한 희생과 헌신을 기려봤으면 좋겠습니다.
  // 그럼 갤러리 그리브스에 들어가셔서 각 전시물들을 의미있게 관람하셨으면 좋겠습니다!
  // 참고로 각 전시물 소개에 대한 내용을 전시물 옆에 QR로도 확인할 수 있으니 꼭 한번 들어보세요!`,
  //   };
  const KO_DELAY = 0.14;

  const lyrics = [];

  const scriptList = content.docent
    .split('\n')
    .filter((line) => line.trim() !== '');

  scriptList.forEach((el, i) => {
    const script = el.replace(/[.'a-zA-Z]/g, '');
    if (i === 0) {
      const timeStemp = Math.round(script.length * KO_DELAY);
      const lyric = {
        script: el,
        timeStemp: timeStemp,
      };
      lyrics.push(lyric);
    } else {
      const currentTimeStemp = script.length * KO_DELAY;
      const prevTimeStemp = lyrics[i - 1].timeStemp;
      const timeStemp = Math.round(currentTimeStemp + prevTimeStemp);
      const lyric = {
        script: el,
        timeStemp: timeStemp,
      };
      lyrics.push(lyric);
    }
  });

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  const audio = ref(new Audio(content.tts));
  const currentTime = ref(0);
  const totalTime = ref(0);

  const progress = computed(() => {
    if (totalTime.value > 0) {
      return (currentTime.value / totalTime.value) * 100;
    } else {
      return 0;
    }
  });

  const currentIndex = ref(0);
  const isPlay = ref(false);

  const displayedLyrics = computed(() => {
    const start = Math.max(0, currentIndex.value - 1);
    const end = Math.min(lyrics.length, start + 3);

    return lyrics.slice(start, end).map((el, idx) => ({
      text: el.script,
      index: start + idx,
    }));
  });

  const playAudio = async () => {
    isPlay.value = true;

    if (audio.value) {
      audio.value.play();
    }
  };

  const pauseAudio = () => {
    isPlay.value = false;
    if (audio.value) {
      audio.value.pause();

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }
  };

  const stopAudio = () => {
    if (audio.value) {
      audio.value.pause();
      audio.value.currentTime = 0;
      currentIndex.value = 0;
      isPlay.value = false;

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }
  };
  const updateCurrentIndex = () => {
    const updateIndex = lyrics.findIndex((lyric, index) => {
      const currentTimeStemp = lyric.timeStemp;
      const nextTimeStemp = lyrics[index + 1]?.timeStemp;

      return (
        currentTime.value >= currentTimeStemp &&
        currentTime.value < nextTimeStemp
      );
    });

    currentIndex.value = updateIndex === -1 ? 0 : updateIndex;
  };

  const handleTimeUpdate = () => {
    currentTime.value = audio.value.currentTime;
    const currentTimeStemp = lyrics[currentIndex.value]?.timeStemp;
    if (!currentTimeStemp) return null;
    if (currentTime.value > currentTimeStemp) {
      currentIndex.value++;
    }
  };

  const handleLoadedMetadata = () => {
    if (audio.value) {
      totalTime.value = audio.value.duration;
    }
  };

  const handleProgressClick = async (event) => {
    if (!audio.value || totalTime.value === 0) return;

    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();

    const clickX = event.clientX - rect.left;
    const clickRatio = clickX / rect.width;

    audio.value.currentTime = clickRatio * totalTime.value;
    currentTime.value = audio.value.currentTime;

    updateCurrentIndex();
  };

  const handleEnded = () => {
    isPlay.value = false;
    currentIndex.value = 0;
    currentTime.value = 0;
  };

  onMounted(async () => {
    await nextTick();
    if (audio.value) {
      totalTime.value = audio.value.duration;
    }
    audio.value.addEventListener('timeupdate', handleTimeUpdate);
    audio.value.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.value.addEventListener('ended', handleEnded);
  });
</script>
<template>
  <div>
    <h2>{{ content.title }}</h2>
    <img :src="content.image" alt="Content Image" />

    <article class="audio-container">
      <div class="bar-container" @click="handleProgressClick">
        <div class="total-bar" />
        <div class="current-bar" :style="{ width: progress + '%' }" />
      </div>

      <div class="time-container">
        <p class="current-time">{{ formatTime(currentTime) }}</p>
        <p class="total-time">{{ formatTime(totalTime) }}</p>
      </div>

      <div class="script-container">
        <TransitionGroup name="play">
          <div
            class="script"
            v-for="(lineObj, index) in displayedLyrics"
            :key="index"
            :class="[lineObj.index === currentIndex && 'script-active']"
          >
            {{ lineObj.text }}
          </div>
        </TransitionGroup>
      </div>
    </article>

    <button v-show="!isPlay" @click="playAudio">Play</button>
    <button v-show="isPlay" @click="pauseAudio">Pause</button>
    <button @click="stopAudio">Stop</button>
  </div>
</template>

<style scoped>
  img {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
  audio {
    width: 100%;
    background-color: white;
  }
  button {
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }

  .time-container {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }

  .script-container {
    margin-top: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    text-align: center;
  }

  .script {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
    transition: transform 0.3s ease, color 0.3s ease;
  }

  .script-active {
    color: #007bff;
    font-weight: bold;
    transform: scale(1.05);
  }
  .bar-container {
    position: relative;
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .total-bar {
    width: 100%;
    height: 100%;
    background-color: #e0e0e0; /* 전체 진행 바 색상 */
    border-radius: 5px;
  }

  .current-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #007bff; /* 현재 진행된 부분의 색상 */
    border-radius: 5px;
    transition: width 0.2s; /* 부드러운 애니메이션 */
  }
</style>
