# KMG (K-MISSION) 웹사이트 퍼블리싱

블록체인 기반 디지털 선교 플랫폼 KMG의 메인 · 서브 페이지를 퍼블리싱한 외주 작업물입니다.
하나의 마크업으로 PC와 모바일을 모두 지원하는 **반응형 웹**으로 제작했고, GSAP 스크롤 인터랙션을 중심으로 구성했습니다.

> 페이지 내 텍스트는 일부 더미 콘텐츠(선교사 목록, 공지사항 등)이며, 실제 운영 시 교체됩니다.

<br>

## 작업 목록

| 페이지                                       | 구분           | 설명                                                                    | 기여도        |
| -------------------------------------------- | -------------- | ----------------------------------------------------------------------- | ------------- |
| [메인](index.html)                           | 반응형 (PC/MO) | 원형 마스크 비주얼, 비전 아코디언, 서비스 소개, 안내도 진입, 공지 목록 | 퍼블리싱 100% |
| [KMG TV](sub/kmgTv.html)                     | 반응형 (PC/MO) | KMG TV 개요, 차별성, 선교 맞춤형 OTT, 운영 프로세스                     | 퍼블리싱 100% |
| [MISSION DAO](sub/missionStudy.html)         | 반응형 (PC/MO) | Mission DAO 개요, 단계별 활동, 참여자 구조                              | 퍼블리싱 100% |
| [KMG CHAIN](sub/kmgCoin.html)                | 반응형 (PC/MO) | K-ENA 스토리, RWA 프로젝트, 실증사업, 자산 운용                         | 퍼블리싱 100% |
| [BUSINESS AREA](sub/whitePaper.html)         | 반응형 (PC/MO) | 사단법인 소개, 디지털자산 교육 · 자격인증, 백서 다운로드               | 퍼블리싱 100% |
| [공지 목록](sub/noticeList.html)             | 반응형 (PC/MO) | News & Media 목록, 페이지네이션                                         | 퍼블리싱 100% |
| [공지 상세](sub/noticeView.html)             | 반응형 (PC/MO) | 본문, 첨부파일, 이전 · 다음 글                                          | 퍼블리싱 100% |
| [SOUL THERAPY 안내도](sub/guide.html)        | PC 전용        | 이미지맵 기반 인터랙티브 지도, 확대/축소, 장소별 슬라이드               | 퍼블리싱 100% |
| [SOUL THERAPY 안내도 (MO)](sub/guide_mo.html) | MO 전용        | 모바일용 장소 목록 메뉴 + 세로 스크롤형 이미지 상세                     | 퍼블리싱 100% |

<br>

## 사용 기술

- **HTML5 / CSS3 / JavaScript (ES6)**
- **GSAP 3.12.5** (ScrollTrigger, ScrollToPlugin): 메인 비주얼 원형 확장, 서브 비주얼 텍스트 애니메이션, 앵커 스크롤 이동
- **Swiper 9**: 메인 비주얼 페이드 슬라이더, PC 안내도 장소별 이미지 슬라이더
- **AOS 2.3.4**: 섹션 진입 시 fade · zoom 애니메이션
- **Image Map Resizer 1.0.10**: 반응형 이미지맵 좌표 자동 보정
- **Pretendard** 웹폰트

<br>

## 반응형 구성

### 브레이크포인트

| 구간     | 기준                       | 설계 기준 폭 |
| -------- | -------------------------- | ------------ |
| PC       | `min-width: 769px`         | 1920px       |
| 모바일   | `max-width: 768px`         | 393px        |

### 크기 단위

- 모든 크기를 `vw` 단위로 작성해 화면 폭에 비례해 레이아웃이 그대로 확대 · 축소되도록 했습니다.
  (PC는 1920px, 모바일은 393px 시안 기준으로 환산)
- 모바일의 풀스크린 영역은 `dvh`를 사용해 주소창이 나타나거나 사라져도 높이가 흔들리지 않도록 했습니다.

### PC / 모바일 분기

- 문구 줄바꿈이나 구성이 디바이스마다 다른 곳은 `.only_pc` / `.only_mo` 클래스로 분기합니다.
  - 줄바꿈만 다를 때: `<br class="only_pc" />`, `<br class="only_mo" />`
  - 구성이 다를 때: 블록 단위로 PC용 · 모바일용 마크업을 따로 작성
- GSAP 애니메이션은 `gsap.matchMedia()`로 PC와 모바일을 분리해, 화면 크기가 바뀌면 애니메이션이 자동으로 정리되도록 했습니다.
- 헤더는 PC에서 GNB 드롭다운으로, 모바일에서 메뉴 버튼 + 옆에서 밀려 들어오는 전체 화면 메뉴로 바뀝니다. 언어 선택은 PC에서 드롭다운, 모바일에서 아래에서 올라오는 시트 형태입니다.
- SOUL THERAPY 안내도는 지도 클릭 방식이 모바일에 맞지 않아, 모바일 전용 페이지(`guide_mo.html`)를 따로 만들었습니다.

<br>

## 주요 인터랙션

### 메인 ([js/common.js](js/common.js))

- **비주얼**: 작은 원형 마스크(`clip-path: circle()`) 안의 슬라이드가 스크롤하면 화면 전체로 커지고, 텍스트 색상 · 크기도 함께 바뀝니다. 슬라이드 순서는 접속할 때마다 랜덤으로 섞입니다.
- **헤더**: 아래로 스크롤하면 숨고, 위로 스크롤하면 다시 나타납니다.
- **비전 아코디언**: 항목을 클릭하면 펼쳐지면서 큰 이미지로 교체되고, PC에서는 마우스를 따라다니는 커스텀 커서(View / Close)가 표시됩니다.
- **안내도 진입**: PC에서는 안내도 페이지를 iframe 전체화면으로 띄우고, 모바일에서는 모바일 전용 안내도 페이지로 이동합니다.

### 서브 ([js/sub.js](js/sub.js))

- **비주얼 텍스트**: 글자 단위로 분리해 블러 · 자간 애니메이션을 적용합니다. 스크린리더는 `aria-label`로 원문을 읽습니다.
- **상단 고정 메뉴**: 스크롤 방향에 따라 헤더와 함께 숨거나 나타나며, 클릭하면 해당 섹션으로 부드럽게 이동합니다.
- **어두운 섹션 감지**: 헤더가 어두운 섹션(`.dark-section`) 위에 오면 헤더 · 팝업 색상이 자동으로 바뀝니다.

### 안내도 ([js/guide.js](js/guide.js), [js/guide_mo.js](js/guide_mo.js))

- 장소 데이터(제목, 설명, 이미지 수)는 [data/guide_slide.js](data/guide_slide.js), [data/guide_slide_mo.js](data/guide_slide_mo.js)에 분리해 두어, 마크업을 수정하지 않고 데이터만 바꿔서 장소를 추가하거나 수정할 수 있습니다.
- 이미지 경로는 `guide_slide_{장소번호}_{순번}.jpg` 규칙으로 자동 생성합니다.

<br>

## 작업하며 신경 쓴 점

### 웹 접근성

- 텍스트가 없는 아이콘 버튼은 `.blind` 텍스트로 대체 텍스트 제공
- 이미지맵 영역(`area`)마다 장소명 `alt` 지정
- 팝업은 ESC 키로 닫을 수 있고, 키보드로 이동할 때 `:focus-visible` 포커스 테두리 표시
- 사용자가 화면을 확대할 수 있도록 viewport 확대 제한 없음
- 문서 언어 `lang="ko"` 지정

### 성능

- 외부 라이브러리 스크립트는 `defer`로 불러와 화면 렌더링을 막지 않도록 처리
- 스크롤 이벤트는 `requestAnimationFrame`으로 프레임당 한 번만 실행
- PC 안내도 iframe은 버튼을 눌렀을 때 처음 불러오도록 처리
- 웹폰트는 `font-display: swap`으로 텍스트를 먼저 표시

### 팝업

- 언어 선택, 사이트맵, 준비중 안내 팝업을 하나의 `setupModal()` 함수로 공통 처리
- 팝업 위에 팝업이 열린 상태에서 하나를 닫아도 배경 스크롤 잠금이 유지되도록 처리

<br>

## 폴더 구조

```
KMG/
├── index.html              # 메인
├── index_intro.html        # 서비스 준비중 안내 (오픈 전 임시 페이지)
├── sub/
│   ├── kmgTv.html          # KMG TV
│   ├── missionStudy.html   # MISSION DAO
│   ├── kmgCoin.html        # KMG CHAIN
│   ├── whitePaper.html     # BUSINESS AREA
│   ├── noticeList.html     # 공지 목록
│   ├── noticeView.html     # 공지 상세
│   ├── guide.html          # 안내도 (PC, 메인에서 iframe으로 열림)
│   └── guide_mo.html       # 안내도 (모바일)
├── css/
│   ├── reset.css           # reset, .blind, 포커스 스타일
│   ├── common.css          # 헤더, 푸터, 팝업, PC/MO 분기 클래스
│   ├── main.css            # 메인
│   ├── style.css           # 서브 공통 + 페이지별
│   ├── guide.css           # 안내도 (PC)
│   └── guide_mo.css        # 안내도 (모바일)
├── js/
│   ├── common.js           # 메인 인터랙션
│   ├── sub.js              # 서브 공통 인터랙션
│   ├── guide.js            # 안내도 (PC)
│   └── guide_mo.js         # 안내도 (모바일)
├── data/
│   ├── guide_slide.js      # 안내도 장소 데이터 (PC)
│   └── guide_slide_mo.js   # 안내도 장소 데이터 (모바일)
├── fonts/                  # Pretendard 웹폰트
├── img/
│   ├── guide/              # 안내도 이미지 (PC)
│   ├── sub/                # 서브 이미지 (PC)
│   └── mo/                 # 모바일 이미지
└── pdf/whitePaper/         # 백서 PDF (현재 미포함, 버튼은 준비중 팝업으로 연결)
```
