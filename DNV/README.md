# DNV Korea 웹사이트 퍼블리싱

DNV Korea Energy Systems 사이트의 메인 · 서브 페이지를 **템플릿 형식**으로 퍼블리싱한 외주 작업물입니다.
공통 레이아웃(헤더 · 푸터 · 퀵메뉴)과 카드 컴포넌트를 재사용해 서브 페이지를 계속 추가할 수 있도록 구성했습니다.

> 페이지 내 텍스트는 일부 더미 콘텐츠이며, 실제 운영 시 교체됩니다.

<br>

## 작업 목록

| 페이지                              | 구분 | 설명                                                      | 기여도        |
| ----------------------------------- | ---- | --------------------------------------------------------- | ------------- |
| [메인](index.html)                  | PC   | 비주얼 슬라이더, 공지 카드, 서비스 소개 카드 3개 섹션     | 퍼블리싱 100% |
| [서브 타입 1](html/sub.html)        | PC   | 상단 비주얼 + 본문 텍스트형 상세 + 자료 카드 + 배너       | 퍼블리싱 100% |
| [서브 타입 2](html/sub_type02.html) | PC   | 타입 1 + 좌측 이미지 · 소제목 · 강조 박스가 추가된 상세형 | 퍼블리싱 100% |

<br>

## 사용 기술

- **HTML5 / CSS3**
- **jQuery 3.7.0**: 서브 페이지 퀵메뉴(aside) 스크롤 추적, 맨 위로 이동
- **Swiper 9**: 메인 비주얼 슬라이더, 접수중인 세미나 갤러리 슬라이더
- **DNV Display** 웹폰트 (Light / Medium / Regular)

<br>

## 템플릿 구성

### 공통 레이아웃

| 영역   | 파일                                       | 설명                                            |
| ------ | ------------------------------------------ | ----------------------------------------------- |
| 헤더   | [include/header.html](include/header.html) | 로고, GNB, 사이트맵 버튼, 로그인/로그아웃       |
| 푸터   | [include/footer.html](include/footer.html) | 분야별 담당자 연락처, 카피라이트                |
| 퀵메뉴 | [include/aside.html](include/aside.html)   | 서브 페이지 우측 플로팅 메뉴 (스크롤 따라 이동) |

`include/` 폴더의 파일은 각 페이지에 들어간 마크업과 동일한 원본입니다.
개발 단계에서 서버 사이드 인클루드(JSP, PHP 등)로 분리해 사용할 수 있도록 따로 정리해 두었습니다.

### 카드 컴포넌트 ([css/card.css](css/card.css))

`.cardWrap`에 열 개수 클래스를, `.cardItem`에 타입 클래스를 붙여 조합합니다.

| 클래스                      | 용도                        | 사용 위치          |
| --------------------------- | --------------------------- | ------------------ |
| `.cardWrap.row-3`           | 3열 그리드 (간격 30px)      | 메인               |
| `.cardWrap.row-4`           | 4열 그리드 (간격 20px)      | 서브 하단          |
| `.cardItem.list`            | 컬러 배경 + 텍스트 목록형   | 메인 공지 영역     |
| `.cardItem.swiperGallery`   | 썸네일 슬라이더형           | 메인 공지 영역     |
| `.cardItem.gallery`         | 썸네일 + 제목 + 설명 + 버튼 | 메인 서비스 소개   |
| `.cardItem.gallery.card-sm` | 작은 갤러리형               | 서브 자료 다운로드 |
| `.cardItem.bdNone`          | 테두리 · 그림자 제거        | 메인 sec02         |

버튼은 `.btn`에 `.btn-view`(자세히보기), `.btn-down`(다운로드), `.btn-video`(영상보기)를 조합합니다.

```html
<div class="cardWrap row-3">
  <div class="cardItem gallery">
    <div class="itemThumb"><img src="..." alt="" /></div>
    <div class="itemInfo">
      <span class="subject">ISRS</span>
      <p class="title">국제안전등급시스템</p>
      <p class="desc">설명 텍스트</p>
    </div>
    <a href="#" class="btn btn-view">자세히보기</a>
  </div>
</div>
```

### 서브 상세 영역 ([css/sub.css](css/sub.css))

서브 타입 2는 `.descType01` 안에 아래 블록을 추가해 사용합니다.

- `.descImg`: 본문 좌측 이미지 (있으면 본문 폭이 자동으로 줄어듦)
- `.descTitle`: 본문 소제목
- `.descBox`: 강조 목록 박스
- `.detailInfo`: 담당자 연락처 박스

<br>

## 작업하며 신경 쓴 점

### 웹 접근성

- 로고, 홈 버튼 등 텍스트가 없는 링크는 `.blind` 텍스트로 대체 텍스트 제공
- 연락처는 `tel:`, `mailto:` 링크로 작성해 바로 전화 · 메일 연결
- 문서 언어 `lang="ko"` 지정

### 마크업 · 스타일

- 페이지별 진입 CSS(`main.css`, `sub.css`)에서 공통 · 컴포넌트 CSS를 불러오는 구조로 분리
- 카드 목록은 음수 마진 + `calc()` 방식의 flex 그리드로 열 개수만 바꿔 재사용
- 긴 제목은 `text-overflow: ellipsis`로 한 줄 말줄임 처리
- 메인 비주얼 텍스트는 활성 슬라이드에만 `@keyframes` 애니메이션을 순차 적용

<br>

## 폴더 구조

```
DNV/
├── index.html          # 메인
├── html/
│   ├── sub.html        # 서브 타입 1
│   └── sub_type02.html # 서브 타입 2
├── include/            # 공통 레이아웃 원본 (header, footer, aside)
├── css/
│   ├── main.css        # 메인 진입 CSS
│   ├── sub.css         # 서브 진입 CSS
│   ├── common.css      # 폰트, reset, .blind
│   ├── header.css
│   ├── footer.css
│   ├── aside.css
│   └── card.css        # 카드 컴포넌트
├── js/
│   └── ui.js           # 퀵메뉴 스크롤, Swiper 초기화
├── font/               # DNV Display 웹폰트
└── images/
    ├── main/
    └── sub/
```
