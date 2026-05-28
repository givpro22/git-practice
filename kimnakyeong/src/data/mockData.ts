// 한국어 가짜 데이터 — Moabit (모아빗)

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
  isVerified: boolean;
  isOnline: boolean;
  hasStory: boolean;
}

export interface Post {
  id: string;
  user: User;
  images: string[];
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  location?: string;
  isLiked: boolean;
  isSaved: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Story {
  id: string;
  user: User;
  items: StoryItem[];
  isViewed: boolean;
}

export interface StoryItem {
  id: string;
  image: string;
  timestamp: string;
  duration: number;
}

export interface Reel {
  id: string;
  user: User;
  videoThumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  music: string;
  isLiked: boolean;
}

export interface Message {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isTyping: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  type: 'text' | 'image' | 'voice';
  image?: string;
}

export interface Notification {
  id: string;
  user: User;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'tag';
  text: string;
  timestamp: string;
  postImage?: string;
  isRead: boolean;
}

// ── 사용자 데이터 ──────────────────────────────────────────────

export const users: User[] = [
  {
    id: '1',
    username: 'minji_daily',
    displayName: '김민지 ✨',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: '일상을 예쁘게 담는 중 🌸\n서울 | 사진 | 카페투어',
    posts: 342,
    followers: 12400,
    following: 485,
    isVerified: true,
    isOnline: true,
    hasStory: true,
  },
  {
    id: '2',
    username: 'chef_junhoo',
    displayName: '박준후 🍳',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: '요리하는 남자 👨‍🍳\n오늘도 맛있는 하루!',
    posts: 156,
    followers: 8900,
    following: 320,
    isVerified: false,
    isOnline: true,
    hasStory: true,
  },
  {
    id: '3',
    username: 'travel_soyeon',
    displayName: '이소연 🌍',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: '세계 여행 중 ✈️\n현재 위치: 파리 🇫🇷',
    posts: 523,
    followers: 45200,
    following: 892,
    isVerified: true,
    isOnline: false,
    hasStory: true,
  },
  {
    id: '4',
    username: 'fit_dongwook',
    displayName: '최동욱 💪',
    avatar: 'https://i.pravatar.cc/150?img=7',
    bio: '피트니스 트레이너 🏋️\n건강한 라이프스타일',
    posts: 278,
    followers: 23100,
    following: 156,
    isVerified: true,
    isOnline: true,
    hasStory: false,
  },
  {
    id: '5',
    username: 'artist_yuna',
    displayName: '정유나 🎨',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: '그림 그리는 사람 🖌️\n일러스트 | 수채화 | 디지털아트',
    posts: 189,
    followers: 15600,
    following: 445,
    isVerified: false,
    isOnline: false,
    hasStory: true,
  },
  {
    id: '6',
    username: 'music_hyunwoo',
    displayName: '강현우 🎵',
    avatar: 'https://i.pravatar.cc/150?img=11',
    bio: '음악이 있는 삶 🎸\n인디 뮤지션 | 작곡가',
    posts: 97,
    followers: 6700,
    following: 234,
    isVerified: false,
    isOnline: true,
    hasStory: true,
  },
  {
    id: '7',
    username: 'bookworm_jieun',
    displayName: '한지은 📚',
    avatar: 'https://i.pravatar.cc/150?img=16',
    bio: '책 읽는 시간이 좋아 📖\n북스타그램 | 독서기록',
    posts: 412,
    followers: 9800,
    following: 567,
    isVerified: false,
    isOnline: false,
    hasStory: true,
  },
  {
    id: '8',
    username: 'dev_seungmin',
    displayName: '윤승민 💻',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: '개발하는 일상 🖥️\n프론트엔드 | React | Next.js',
    posts: 63,
    followers: 4200,
    following: 312,
    isVerified: false,
    isOnline: true,
    hasStory: false,
  },
];

export const currentUser: User = {
  id: 'me',
  username: 'moabit_user',
  displayName: '나 🦋',
  avatar: 'https://i.pravatar.cc/150?img=32',
  bio: '모아빗에서 소중한 순간을 모으는 중 💜\n#일상 #감성 #모아빗',
  posts: 48,
  followers: 1234,
  following: 567,
  isVerified: false,
  isOnline: true,
  hasStory: true,
};

// ── 게시물 데이터 ──────────────────────────────────────────────

export const posts: Post[] = [
  {
    id: 'p1',
    user: users[0],
    images: [
      'https://picsum.photos/seed/moabit1/800/1000',
      'https://picsum.photos/seed/moabit1b/800/1000',
    ],
    caption: '오늘 카페에서 발견한 작은 행복 ☕✨ 이런 날이 좋아요\n\n#카페투어 #일상 #소확행 #모아빗',
    likes: 1247,
    comments: [
      { id: 'c1', user: users[1], text: '분위기 너무 좋다! 여기 어디예요? 😍', timestamp: '2시간 전', likes: 12 },
      { id: 'c2', user: users[4], text: '저도 가보고 싶어요~', timestamp: '1시간 전', likes: 5 },
    ],
    timestamp: '3시간 전',
    location: '서울 연남동',
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'p2',
    user: users[1],
    images: ['https://picsum.photos/seed/moabit2/800/800'],
    caption: '오늘의 홈쿠킹 🍝 크림 파스타 만들어봤어요!\n레시피는 하이라이트에 저장해뒀어요 👆\n\n#요리 #홈쿠킹 #파스타 #먹스타그램',
    likes: 892,
    comments: [
      { id: 'c3', user: users[0], text: '맛있겠다!! 레시피 공유해주세요 🙏', timestamp: '5시간 전', likes: 8 },
      { id: 'c4', user: users[3], text: '단백질 추가하면 완벽하겠는데 💪', timestamp: '4시간 전', likes: 3 },
    ],
    timestamp: '6시간 전',
    location: '집',
    isLiked: true,
    isSaved: true,
  },
  {
    id: 'p3',
    user: users[2],
    images: [
      'https://picsum.photos/seed/moabit3/800/1200',
      'https://picsum.photos/seed/moabit3b/800/1200',
      'https://picsum.photos/seed/moabit3c/800/1200',
    ],
    caption: '파리의 석양 🌅 에펠탑이 이렇게 아름다울 줄이야...\n매일매일이 꿈같은 시간 ✨\n\n#파리 #여행 #에펠탑 #sunset #travel',
    likes: 5621,
    comments: [
      { id: 'c5', user: users[6], text: '와... 진짜 영화 같다 🎬', timestamp: '8시간 전', likes: 45 },
      { id: 'c6', user: users[0], text: '너무 부럽다ㅠㅠ 나도 가고 싶어!!', timestamp: '7시간 전', likes: 22 },
      { id: 'c7', user: users[5], text: '배경음악이 들리는 사진이네요 🎵', timestamp: '6시간 전', likes: 15 },
    ],
    timestamp: '12시간 전',
    location: '파리, 프랑스',
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'p4',
    user: users[4],
    images: ['https://picsum.photos/seed/moabit4/800/1000'],
    caption: '새로운 수채화 작업 완성! 🎨\n이번에는 봄 꽃을 주제로 그려봤어요 🌷\n\n#일러스트 #수채화 #아트 #그림스타그램',
    likes: 2340,
    comments: [
      { id: 'c8', user: users[6], text: '와 색감 진짜 예쁘다...!! 판매하시나요?', timestamp: '1일 전', likes: 18 },
    ],
    timestamp: '1일 전',
    location: '작업실',
    isLiked: false,
    isSaved: true,
  },
  {
    id: 'p5',
    user: users[3],
    images: ['https://picsum.photos/seed/moabit5/800/800'],
    caption: '오늘 운동 루틴 끝! 🔥\n스쿼트 5세트 완료 💪 포기하지 않으면 결과는 따라온다!\n\n#운동 #헬스 #피트니스 #동기부여',
    likes: 3120,
    comments: [
      { id: 'c9', user: users[7], text: '동기부여 받고 갑니다!! 🔥', timestamp: '2일 전', likes: 9 },
      { id: 'c10', user: users[1], text: '대박... 존경합니다 형 ㅋㅋ', timestamp: '2일 전', likes: 6 },
    ],
    timestamp: '2일 전',
    isLiked: true,
    isSaved: false,
  },
  {
    id: 'p6',
    user: users[5],
    images: [
      'https://picsum.photos/seed/moabit6/800/1000',
      'https://picsum.photos/seed/moabit6b/800/1000',
    ],
    caption: '새 앨범 작업 중 🎶 이번 곡은 좀 다른 느낌으로!\n기대해주세요 🙏\n\n#음악 #인디음악 #작곡 #신곡',
    likes: 1580,
    comments: [
      { id: 'c11', user: users[4], text: '벌써부터 기대돼요!! 언제 나와요? 🎵', timestamp: '3일 전', likes: 14 },
    ],
    timestamp: '3일 전',
    location: '녹음실',
    isLiked: false,
    isSaved: false,
  },
];

// ── 스토리 데이터 ──────────────────────────────────────────────

export const stories: Story[] = [
  {
    id: 's1',
    user: currentUser,
    items: [
      { id: 'si1', image: 'https://picsum.photos/seed/story_me1/1080/1920', timestamp: '1시간 전', duration: 5 },
    ],
    isViewed: true,
  },
  {
    id: 's2',
    user: users[0],
    items: [
      { id: 'si2', image: 'https://picsum.photos/seed/story1/1080/1920', timestamp: '30분 전', duration: 5 },
      { id: 'si3', image: 'https://picsum.photos/seed/story1b/1080/1920', timestamp: '25분 전', duration: 5 },
      { id: 'si4', image: 'https://picsum.photos/seed/story1c/1080/1920', timestamp: '20분 전', duration: 5 },
    ],
    isViewed: false,
  },
  {
    id: 's3',
    user: users[1],
    items: [
      { id: 'si5', image: 'https://picsum.photos/seed/story2/1080/1920', timestamp: '1시간 전', duration: 5 },
      { id: 'si6', image: 'https://picsum.photos/seed/story2b/1080/1920', timestamp: '45분 전', duration: 5 },
    ],
    isViewed: false,
  },
  {
    id: 's4',
    user: users[2],
    items: [
      { id: 'si7', image: 'https://picsum.photos/seed/story3/1080/1920', timestamp: '2시간 전', duration: 5 },
    ],
    isViewed: true,
  },
  {
    id: 's5',
    user: users[4],
    items: [
      { id: 'si8', image: 'https://picsum.photos/seed/story4/1080/1920', timestamp: '3시간 전', duration: 5 },
      { id: 'si9', image: 'https://picsum.photos/seed/story4b/1080/1920', timestamp: '2시간 전', duration: 5 },
    ],
    isViewed: false,
  },
  {
    id: 's6',
    user: users[5],
    items: [
      { id: 'si10', image: 'https://picsum.photos/seed/story5/1080/1920', timestamp: '4시간 전', duration: 5 },
    ],
    isViewed: false,
  },
  {
    id: 's7',
    user: users[6],
    items: [
      { id: 'si11', image: 'https://picsum.photos/seed/story6/1080/1920', timestamp: '5시간 전', duration: 5 },
      { id: 'si12', image: 'https://picsum.photos/seed/story6b/1080/1920', timestamp: '4시간 전', duration: 5 },
    ],
    isViewed: true,
  },
];

// ── 릴스 데이터 ──────────────────────────────────────────────

export const reels: Reel[] = [
  {
    id: 'r1',
    user: users[0],
    videoThumbnail: 'https://picsum.photos/seed/reel1/1080/1920',
    caption: '서울 야경 브이로그 🌃✨ #서울 #야경 #브이로그',
    likes: 12400,
    comments: 342,
    shares: 89,
    music: '잔나비 - 주저하는 연인들을 위해',
    isLiked: false,
  },
  {
    id: 'r2',
    user: users[1],
    videoThumbnail: 'https://picsum.photos/seed/reel2/1080/1920',
    caption: '3분 완성! 초간단 떡볶이 레시피 🍜🔥',
    likes: 8900,
    comments: 567,
    shares: 234,
    music: 'NewJeans - Super Shy',
    isLiked: true,
  },
  {
    id: 'r3',
    user: users[2],
    videoThumbnail: 'https://picsum.photos/seed/reel3/1080/1920',
    caption: '파리에서 가장 예쁜 골목 발견! 🇫🇷🌸',
    likes: 34200,
    comments: 1200,
    shares: 567,
    music: 'IVE - Love Dive',
    isLiked: false,
  },
  {
    id: 'r4',
    user: users[3],
    videoThumbnail: 'https://picsum.photos/seed/reel4/1080/1920',
    caption: '이 운동 하나면 복근 완성! 💪🔥',
    likes: 19800,
    comments: 890,
    shares: 456,
    music: 'Eminem - Lose Yourself',
    isLiked: false,
  },
  {
    id: 'r5',
    user: users[4],
    videoThumbnail: 'https://picsum.photos/seed/reel5/1080/1920',
    caption: '30초 만에 그리는 귀여운 고양이 🐱🎨',
    likes: 7600,
    comments: 234,
    shares: 123,
    music: '볼빨간사춘기 - 여행',
    isLiked: true,
  },
];

// ── 메시지 데이터 ──────────────────────────────────────────────

export const messages: Message[] = [
  {
    id: 'm1',
    user: users[0],
    lastMessage: '내일 카페 갈래? ☕',
    timestamp: '방금',
    unread: 2,
    isTyping: true,
  },
  {
    id: 'm2',
    user: users[1],
    lastMessage: '레시피 보내줄게! 잠깐만~',
    timestamp: '15분 전',
    unread: 1,
    isTyping: false,
  },
  {
    id: 'm3',
    user: users[2],
    lastMessage: '사진 보냈어요 📸',
    timestamp: '1시간 전',
    unread: 0,
    isTyping: false,
  },
  {
    id: 'm4',
    user: users[5],
    lastMessage: '새 곡 들어봐! 🎵',
    timestamp: '3시간 전',
    unread: 0,
    isTyping: false,
  },
  {
    id: 'm5',
    user: users[4],
    lastMessage: '그림 완성했어요! 확인해주세요 🎨',
    timestamp: '어제',
    unread: 0,
    isTyping: false,
  },
  {
    id: 'm6',
    user: users[6],
    lastMessage: '이 책 추천해요 📚',
    timestamp: '어제',
    unread: 3,
    isTyping: false,
  },
  {
    id: 'm7',
    user: users[3],
    lastMessage: '운동 루틴 공유할게요 💪',
    timestamp: '2일 전',
    unread: 0,
    isTyping: false,
  },
];

export const chatMessages: ChatMessage[] = [
  { id: 'cm1', senderId: '1', text: '안녕! 오늘 뭐 해? 😊', timestamp: '오후 2:30', isMe: false, type: 'text' },
  { id: 'cm2', senderId: 'me', text: '안녕~ 지금 카페에 있어!', timestamp: '오후 2:31', isMe: true, type: 'text' },
  { id: 'cm3', senderId: '1', text: '오 어디? 나도 갈까?', timestamp: '오후 2:31', isMe: false, type: 'text' },
  { id: 'cm4', senderId: 'me', text: '', timestamp: '오후 2:32', isMe: true, type: 'image', image: 'https://picsum.photos/seed/chat1/400/300' },
  { id: 'cm5', senderId: '1', text: '와 분위기 좋다!! 😍', timestamp: '오후 2:33', isMe: false, type: 'text' },
  { id: 'cm6', senderId: 'me', text: '응 여기 완전 예뻐~ 연남동이야', timestamp: '오후 2:33', isMe: true, type: 'text' },
  { id: 'cm7', senderId: '1', text: '내일 카페 갈래? ☕', timestamp: '오후 2:35', isMe: false, type: 'text' },
];

// ── 알림 데이터 ──────────────────────────────────────────────

export const notifications: Notification[] = [
  {
    id: 'n1',
    user: users[0],
    type: 'like',
    text: '님이 회원님의 게시물을 좋아합니다',
    timestamp: '방금',
    postImage: 'https://picsum.photos/seed/notif1/100/100',
    isRead: false,
  },
  {
    id: 'n2',
    user: users[2],
    type: 'follow',
    text: '님이 회원님을 팔로우하기 시작했습니다',
    timestamp: '5분 전',
    isRead: false,
  },
  {
    id: 'n3',
    user: users[1],
    type: 'comment',
    text: '님이 댓글을 남겼습니다: "맛있겠다! 🤤"',
    timestamp: '30분 전',
    postImage: 'https://picsum.photos/seed/notif2/100/100',
    isRead: false,
  },
  {
    id: 'n4',
    user: users[4],
    type: 'mention',
    text: '님이 댓글에서 회원님을 언급했습니다',
    timestamp: '1시간 전',
    postImage: 'https://picsum.photos/seed/notif3/100/100',
    isRead: true,
  },
  {
    id: 'n5',
    user: users[3],
    type: 'like',
    text: '님이 회원님의 게시물을 좋아합니다',
    timestamp: '2시간 전',
    postImage: 'https://picsum.photos/seed/notif4/100/100',
    isRead: true,
  },
  {
    id: 'n6',
    user: users[5],
    type: 'follow',
    text: '님이 회원님을 팔로우하기 시작했습니다',
    timestamp: '3시간 전',
    isRead: true,
  },
  {
    id: 'n7',
    user: users[6],
    type: 'tag',
    text: '님이 게시물에 회원님을 태그했습니다',
    timestamp: '5시간 전',
    postImage: 'https://picsum.photos/seed/notif5/100/100',
    isRead: true,
  },
  {
    id: 'n8',
    user: users[7],
    type: 'like',
    text: '님이 회원님의 릴스를 좋아합니다',
    timestamp: '어제',
    postImage: 'https://picsum.photos/seed/notif6/100/100',
    isRead: true,
  },
];

// ── 탐색 페이지 데이터 ──────────────────────────────────────────────

export const exploreImages = Array.from({ length: 24 }, (_, i) => ({
  id: `exp${i + 1}`,
  image: `https://picsum.photos/seed/explore${i + 1}/${300 + (i % 3) * 100}/${400 + (i % 4) * 100}`,
  likes: Math.floor(Math.random() * 10000) + 500,
  isReel: i % 5 === 0,
}));

export const trendingTags = [
  { tag: '#봄나들이', posts: '12.3만' },
  { tag: '#카페투어', posts: '8.7만' },
  { tag: '#오늘의코디', posts: '6.2만' },
  { tag: '#먹스타그램', posts: '15.1만' },
  { tag: '#감성사진', posts: '9.4만' },
  { tag: '#홈카페', posts: '4.8만' },
  { tag: '#일상기록', posts: '7.6만' },
  { tag: '#여행스타그램', posts: '11.2만' },
];

// ── 유틸리티 함수 ──────────────────────────────────────────────

export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '만';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + '천';
  }
  return num.toString();
}
