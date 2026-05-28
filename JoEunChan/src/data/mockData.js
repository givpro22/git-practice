/* ============================
   Universities
   ============================ */
export const universities = [
  { name: '서울대학교', domain: 'snu.ac.kr' },
  { name: '연세대학교', domain: 'yonsei.ac.kr' },
  { name: '고려대학교', domain: 'korea.ac.kr' },
  { name: '성균관대학교', domain: 'skku.edu' },
  { name: '한양대학교', domain: 'hanyang.ac.kr' },
  { name: 'KAIST', domain: 'kaist.ac.kr' },
  { name: '포항공과대학교', domain: 'postech.ac.kr' },
  { name: '서강대학교', domain: 'sogang.ac.kr' },
  { name: '중앙대학교', domain: 'cau.ac.kr' },
  { name: '경희대학교', domain: 'khu.ac.kr' },
];

/* ============================
   Mock User Profiles
   ============================ */
export const mockProfiles = [
  {
    id: 1,
    name: '김민수',
    university: '서울대학교',
    department: '컴퓨터공학과',
    year: 3,
    gender: '남',
    avatar: '👨‍💻',
    sleepTime: '00:00',
    wakeTime: '08:00',
    cleaningFreq: '주 2-3회',
    smoking: false,
    noiseSensitivity: 4,
    tempPreference: 23,
    mbti: 'INTJ',
    bio: '코딩과 게임을 좋아하는 컴공 3학년입니다. 밤에 주로 활동하지만 소음에는 민감해요.',
    tags: ['🌙 야행성', '🚭 비흡연', '🧹 정돈형', '🎮 게이머'],
    preferences: '조용한 환경을 선호하고, 개인 공간을 존중해주는 룸메이트를 원해요.',
  },
  {
    id: 2,
    name: '이서연',
    university: '연세대학교',
    department: '경영학과',
    year: 2,
    gender: '여',
    avatar: '👩‍🎓',
    sleepTime: '23:00',
    wakeTime: '07:00',
    cleaningFreq: '매일',
    smoking: false,
    noiseSensitivity: 3,
    tempPreference: 25,
    mbti: 'ENFP',
    bio: '활발하고 사교적인 성격이에요! 깔끔한 환경을 좋아하고 아침형 인간입니다.',
    tags: ['☀️ 아침형', '🚭 비흡연', '✨ 깔끔형', '💬 사교적'],
    preferences: '함께 대화하며 지낼 수 있는 밝은 룸메이트를 찾고 있어요.',
  },
  {
    id: 3,
    name: '박준혁',
    university: '고려대학교',
    department: '전자공학과',
    year: 4,
    gender: '남',
    avatar: '👨‍🔬',
    sleepTime: '01:00',
    wakeTime: '09:00',
    cleaningFreq: '주 1회',
    smoking: false,
    noiseSensitivity: 2,
    tempPreference: 22,
    mbti: 'ISTP',
    bio: '취준 중인 전자공학 4학년입니다. 조용히 각자 생활하는 걸 선호해요.',
    tags: ['🌙 야행성', '🚭 비흡연', '🔇 조용한', '📚 독서형'],
    preferences: '서로 간섭하지 않고 편하게 지낼 수 있는 룸메이트를 원합니다.',
  },
  {
    id: 4,
    name: '최유나',
    university: '성균관대학교',
    department: '디자인학과',
    year: 2,
    gender: '여',
    avatar: '👩‍🎨',
    sleepTime: '00:30',
    wakeTime: '08:30',
    cleaningFreq: '주 2-3회',
    smoking: false,
    noiseSensitivity: 3,
    tempPreference: 24,
    mbti: 'INFP',
    bio: '그림 그리고 음악 듣는 걸 좋아해요. 감성적이지만 깔끔한 편이에요.',
    tags: ['🎨 예술적', '🚭 비흡연', '🎵 음악파', '🌙 야행성'],
    preferences: '예술이나 문화에 관심이 있는 조용한 룸메이트를 원해요.',
  },
  {
    id: 5,
    name: '정태현',
    university: '한양대학교',
    department: '체육학과',
    year: 3,
    gender: '남',
    avatar: '🏋️',
    sleepTime: '22:30',
    wakeTime: '06:00',
    cleaningFreq: '매일',
    smoking: false,
    noiseSensitivity: 2,
    tempPreference: 21,
    mbti: 'ESTP',
    bio: '매일 운동하는 체육학과 학생입니다. 아침 일찍 일어나서 활동적으로 생활해요.',
    tags: ['☀️ 아침형', '🚭 비흡연', '💪 운동파', '✨ 깔끔형'],
    preferences: '건강한 생활습관을 가진 활동적인 룸메이트를 찾고 있어요.',
  },
  {
    id: 6,
    name: '한소영',
    university: 'KAIST',
    department: '수학과',
    year: 1,
    gender: '여',
    avatar: '👩‍🔬',
    sleepTime: '23:30',
    wakeTime: '07:30',
    cleaningFreq: '주 2-3회',
    smoking: false,
    noiseSensitivity: 5,
    tempPreference: 23,
    mbti: 'INTP',
    bio: '수학 문제 풀기를 좋아하는 신입생입니다. 매우 조용한 환경을 선호해요.',
    tags: ['📐 학구적', '🚭 비흡연', '🔇 조용한', '🌙 올빼미'],
    preferences: '공부할 때 방해받지 않는 환경을 원합니다. 서로 존중해주는 룸메이트 구해요.',
  },
];

/* ============================
   Match Results
   ============================ */
export const matchResults = [
  {
    userId: 1,
    score: 95,
    reasons: [
      { icon: '🌙', text: '취침 시간대가 거의 같아요' },
      { icon: '🚭', text: '둘 다 비흡연자예요' },
      { icon: '🧹', text: '청소 주기가 잘 맞아요' },
      { icon: '🌡️', text: '선호 온도가 비슷해요' },
    ],
  },
  {
    userId: 4,
    score: 88,
    reasons: [
      { icon: '🌙', text: '야행성 생활 패턴이 같아요' },
      { icon: '🔇', text: '조용한 환경을 선호해요' },
      { icon: '🎨', text: '창의적 취미가 비슷해요' },
    ],
  },
  {
    userId: 6,
    score: 82,
    reasons: [
      { icon: '📚', text: '학업 중심 생활 패턴이에요' },
      { icon: '🚭', text: '둘 다 비흡연자예요' },
      { icon: '🌡️', text: '선호 온도가 비슷해요' },
    ],
  },
  {
    userId: 3,
    score: 76,
    reasons: [
      { icon: '🌙', text: '비슷한 시간에 잠들어요' },
      { icon: '🔇', text: '서로 간섭하지 않는 스타일' },
    ],
  },
  {
    userId: 2,
    score: 65,
    reasons: [
      { icon: '🚭', text: '둘 다 비흡연자예요' },
      { icon: '🧹', text: '깔끔한 환경을 좋아해요' },
    ],
  },
  {
    userId: 5,
    score: 52,
    reasons: [
      { icon: '🚭', text: '둘 다 비흡연자예요' },
      { icon: '⏰', text: '생활 패턴 차이가 좀 있어요' },
    ],
  },
];

/* ============================
   Chatbot Conversation Flow
   ============================ */
export const chatbotFlow = [
  {
    id: 'welcome',
    bot: '안녕하세요! 🏠 RoomieMatch AI 어시스턴트예요.\n이상적인 룸메이트를 찾기 위해 당신에 대해 좀 더 알고 싶어요. 편하게 대화하듯 답해주세요!',
    nextId: 'q1',
    delay: 800,
  },
  {
    id: 'q1',
    bot: '먼저 평소 생활 패턴이 궁금해요! 🌙☀️\n아침형인가요, 야행성인가요? 보통 몇 시에 자고 일어나시나요?',
    suggestions: ['야행성이에요, 보통 1시에 자요', '아침형이에요, 11시에 자고 7시에 일어나요', '불규칙한 편이에요'],
    nextId: 'q2',
    delay: 1200,
  },
  {
    id: 'q2',
    bot: '좋아요! 이해했어요 👍\n그러면 청소나 정리정돈은 어떤 편이세요? 🧹',
    suggestions: ['매일 깔끔하게 정리해요', '주 1-2회 정도 청소해요', '좀 지저분한 편이에요...'],
    nextId: 'q3',
    delay: 1000,
  },
  {
    id: 'q3',
    bot: '알겠어요! 🧹\n방에서 주로 어떤 활동을 하시나요? 공부, 게임, 음악 감상 등 편하게 말씀해주세요! 🎮📚',
    suggestions: ['주로 공부해요', '게임이나 유튜브 봐요', '음악 듣거나 그림 그려요'],
    nextId: 'q4',
    delay: 1000,
  },
  {
    id: 'q4',
    bot: '그렇군요! 😊\n룸메이트에게 가장 중요하게 생각하는 조건이 뭐예요? 예를 들어 소음, 흡연, 청결 등이요. 🤔',
    suggestions: ['소음에 민감해서 조용한 사람이 좋아요', '흡연은 절대 안 돼요', '청결이 가장 중요해요'],
    nextId: 'q5',
    delay: 1100,
  },
  {
    id: 'q5',
    bot: '마지막으로! 🚫\n절대 양보할 수 없는 기피사항이 있다면 알려주세요!',
    suggestions: ['흡연하는 사람은 안 돼요', '너무 시끄러운 건 힘들어요', '청소 안 하는 건 참을 수 없어요', '특별히 없어요'],
    nextId: 'done',
    delay: 1000,
  },
  {
    id: 'done',
    bot: '감사합니다! 🎉\n입력하신 정보를 분석 중이에요...\n\n✅ 생활 패턴 분석 완료\n✅ 선호도 매칭 준비 완료\n✅ AI 매칭 알고리즘 적용 완료\n\n매칭 결과 페이지에서 나와 잘 맞는 룸메이트를 확인해보세요! 🚀',
    delay: 1500,
  },
];

/* ============================
   Chat Messages (Demo)
   ============================ */
export const demoChatMessages = [
  {
    id: 1,
    senderId: 'other',
    text: '안녕하세요! 매칭되어서 반갑습니다 😊',
    time: '오후 2:30',
  },
  {
    id: 2,
    senderId: 'me',
    text: '안녕하세요! 저도 반가워요! 프로필 보니까 생활 패턴이 비슷한 것 같아서 좋네요 ㅎㅎ',
    time: '오후 2:31',
  },
  {
    id: 3,
    senderId: 'other',
    text: '맞아요! 저도 야행성이라 밤에 주로 활동하거든요. 혹시 기숙사 신청하셨나요?',
    time: '오후 2:32',
  },
  {
    id: 4,
    senderId: 'me',
    text: '네! 2인실 신청해놨어요. 같이 방 쓰면 좋을 것 같은데 어떠세요?',
    time: '오후 2:33',
  },
  {
    id: 5,
    senderId: 'other',
    text: '좋아요! 한번 만나서 이야기해볼까요? ☕',
    time: '오후 2:35',
  },
];

/* ============================
   Survey Questions
   ============================ */
export const surveyQuestions = [
  {
    id: 'sleepTime',
    title: '보통 몇 시에 주무세요?',
    subtitle: '평일 기준으로 알려주세요',
    icon: '🌙',
    type: 'select',
    options: ['21:00 이전', '21:00 ~ 22:00', '22:00 ~ 23:00', '23:00 ~ 00:00', '00:00 ~ 01:00', '01:00 이후'],
  },
  {
    id: 'wakeTime',
    title: '보통 몇 시에 일어나세요?',
    subtitle: '평일 기준으로 알려주세요',
    icon: '☀️',
    type: 'select',
    options: ['06:00 이전', '06:00 ~ 07:00', '07:00 ~ 08:00', '08:00 ~ 09:00', '09:00 ~ 10:00', '10:00 이후'],
  },
  {
    id: 'cleaning',
    title: '청소는 얼마나 자주 하세요?',
    subtitle: '솔직하게 답해주세요 😄',
    icon: '🧹',
    type: 'select',
    options: ['매일', '주 3-4회', '주 1-2회', '2주에 1회', '거의 안 해요'],
  },
  {
    id: 'smoking',
    title: '흡연 여부를 알려주세요',
    subtitle: '실내/실외 모두 포함',
    icon: '🚬',
    type: 'select',
    options: ['비흡연', '가끔 (사교적 흡연)', '흡연 (실외만)', '흡연 (실내 포함)'],
  },
  {
    id: 'noise',
    title: '소음에 얼마나 민감하세요?',
    subtitle: '1(전혀 안 민감) ~ 5(매우 민감)',
    icon: '🔊',
    type: 'range',
    min: 1,
    max: 5,
    labels: ['전혀 안 민감', '약간', '보통', '민감', '매우 민감'],
  },
  {
    id: 'temperature',
    title: '선호하는 실내 온도는?',
    subtitle: '에어컨/난방 설정 기준',
    icon: '🌡️',
    type: 'range',
    min: 18,
    max: 28,
    unit: '°C',
  },
  {
    id: 'guests',
    title: '친구 초대에 대해 어떻게 생각하세요?',
    subtitle: '방에 친구를 데려오는 것에 대해',
    icon: '👥',
    type: 'select',
    options: ['언제든 환영!', '미리 말해주면 OK', '가끔은 괜찮아요', '별로 선호하지 않아요'],
  },
  {
    id: 'personality',
    title: '성격 유형을 선택해주세요',
    subtitle: '가장 가까운 것을 골라주세요',
    icon: '🧠',
    type: 'multiSelect',
    options: ['내향적', '외향적', '계획적', '즉흥적', '활동적', '차분한', '사교적', '독립적'],
  },
];
