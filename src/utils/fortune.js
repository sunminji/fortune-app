// 생년월일 + 오늘 날짜 기반 결정론적 운세 계산

function hash(str) {
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i)
    h = h >>> 0
  }
  return h
}

function seededRandom(seed, index) {
  const h = hash(String(seed) + String(index))
  return (h % 1000) / 1000
}

// 운세 점수 (1~5)
const FORTUNE_DATA = {
  overall: [
    {
      score: 1, title: '안개 낀 날', icon: '🌫️',
      desc: '오늘은 에너지가 낮고 일이 잘 풀리지 않을 수 있습니다. 무리하게 새로운 일을 시작하기보다는 현상 유지에 집중하는 것이 좋습니다.',
      advice: '무리하지 말고, 충분한 휴식을 취하세요.'
    },
    {
      score: 2, title: '구름 낀 날', icon: '⛅',
      desc: '소소한 불편함과 장애물이 있지만, 차분하게 대처하면 충분히 극복할 수 있습니다. 급하게 결론을 내리지 마세요.',
      advice: '서두르지 말고 한 걸음씩 나아가세요.'
    },
    {
      score: 3, title: '맑은 날', icon: '🌤️',
      desc: '평온하고 안정적인 하루입니다. 크게 빛나지는 않아도 꾸준히 노력하면 좋은 결과가 쌓입니다. 오늘의 성실함이 내일을 만듭니다.',
      advice: '평소대로 성실하게 임하세요.'
    },
    {
      score: 4, title: '햇살 좋은 날', icon: '☀️',
      desc: '좋은 기운이 찾아오는 날입니다. 그동안 미뤄왔던 일에 도전하거나 새로운 사람을 만나보세요. 적극적인 행동이 빛을 발합니다.',
      advice: '자신감을 갖고 적극적으로 행동하세요.'
    },
    {
      score: 5, title: '최고의 날', icon: '✨',
      desc: '별들이 당신을 향해 빛나고 있습니다! 오늘은 모든 것이 순조롭게 풀리는 특별한 날입니다. 간절히 바라던 일이 이루어질 수 있습니다.',
      advice: '오늘의 기회를 절대 놓치지 마세요!'
    },
  ],
  love: [
    {
      score: 1, title: '냉각기', icon: '❄️',
      desc: '오해나 갈등이 생길 수 있는 날입니다. 말 한마디가 상대방에게 상처가 될 수 있으니 감정적인 대화는 자제하세요.',
      advice: '말보다 행동으로 사랑을 표현해 보세요.'
    },
    {
      score: 2, title: '설레는 시작', icon: '🌷',
      desc: '감정이 조금씩 무르익고 있습니다. 아직 확신은 없지만 용기를 내면 좋은 인연이 가까워질 수 있습니다.',
      advice: '작은 용기가 큰 변화를 만들어냅니다.'
    },
    {
      score: 3, title: '달콤한 일상', icon: '🍀',
      desc: '연인이 있다면 편안하고 안정적인 시간을 보낼 수 있습니다. 솔로라면 좋은 인연이 가까이에 있을 수 있으니 눈을 크게 뜨세요.',
      advice: '진심 어린 관심을 표현해 보세요.'
    },
    {
      score: 4, title: '핑크빛 설렘', icon: '💕',
      desc: '사랑하는 사람과 달콤한 시간이 기다리고 있습니다. 솔로에게는 운명 같은 만남의 기회가 올 수 있으니 밖에 나가 보세요.',
      advice: '마음을 열고 설레는 감정을 즐기세요.'
    },
    {
      score: 5, title: '운명적 인연', icon: '💖',
      desc: '깊은 사랑의 고백이나 운명적인 만남이 이루어질 수 있는 최고의 날입니다. 용기 있게 마음을 표현하면 반드시 좋은 결과가 기다립니다.',
      advice: '사랑에 용감해지세요. 오늘이 그 날입니다!'
    },
  ],
  money: [
    {
      score: 1, title: '지출 주의', icon: '📉',
      desc: '예상치 못한 지출이 생길 수 있는 날입니다. 충동구매나 큰 결정은 피하고, 지갑을 꼭 잠가 두세요.',
      advice: '오늘은 불필요한 소비를 최대한 자제하세요.'
    },
    {
      score: 2, title: '수지 균형', icon: '⚖️',
      desc: '작은 수입이 생길 수 있지만, 지출도 함께 따릅니다. 큰 투자나 거래는 신중하게 검토한 후 결정하세요.',
      advice: '수입과 지출의 균형을 잘 맞추세요.'
    },
    {
      score: 3, title: '안정적 흐름', icon: '💰',
      desc: '금전적으로 안정적인 날입니다. 큰 변화는 없지만, 꾸준한 노력이 재물을 모아줍니다.',
      advice: '작은 절약이 큰 재산이 됩니다.'
    },
    {
      score: 4, title: '행운의 기운', icon: '🍀',
      desc: '예상치 못한 수입이나 좋은 금전적 기회가 찾아올 수 있습니다. 오늘은 적극적으로 기회를 잡아보세요.',
      advice: '좋은 기회가 왔을 때 놓치지 마세요.'
    },
    {
      score: 5, title: '금전 대박', icon: '💎',
      desc: '재물운이 최고조에 달한 날입니다! 투자, 거래, 협상 등 금전과 관련된 모든 일에서 좋은 결과가 기대됩니다.',
      advice: '오늘 과감한 도전이 큰 결실을 맺습니다!'
    },
  ],
  health: [
    {
      score: 1, title: '충전 필요', icon: '😴',
      desc: '피로가 누적되어 몸 상태가 좋지 않을 수 있습니다. 오늘은 무리한 활동보다 충분한 휴식을 최우선으로 하세요.',
      advice: '일찍 잠자리에 들고 충분히 쉬세요.'
    },
    {
      score: 2, title: '주의 필요', icon: '🤧',
      desc: '가벼운 몸살이나 피로감이 올 수 있습니다. 과격한 운동은 피하고, 따뜻한 음식과 충분한 수분 섭취를 하세요.',
      advice: '몸의 신호에 귀를 기울이세요.'
    },
    {
      score: 3, title: '보통 컨디션', icon: '🙂',
      desc: '특별한 문제 없이 평범한 하루를 보낼 수 있습니다. 가벼운 스트레칭이나 산책으로 활력을 더해 보세요.',
      advice: '규칙적인 생활 패턴을 유지하세요.'
    },
    {
      score: 4, title: '활기찬 에너지', icon: '💪',
      desc: '몸과 마음이 활기에 넘치는 날입니다. 좋아하는 운동을 즐기거나 오래 미뤄온 운동을 시작하기 좋은 때입니다.',
      advice: '에너지를 긍정적인 활동에 발산하세요.'
    },
    {
      score: 5, title: '최상의 컨디션', icon: '🌟',
      desc: '몸과 마음이 최고 상태입니다! 원하는 무엇이든 할 수 있는 에너지가 넘칩니다. 이 좋은 기운을 마음껏 활용하세요.',
      advice: '오늘 하루 건강한 에너지를 마음껏 발산하세요!'
    },
  ],
  career: [
    {
      score: 1, title: '신중 모드', icon: '⚠️',
      desc: '직장이나 학업에서 마찰이나 오해가 생길 수 있습니다. 말 한마디, 행동 하나에 신중을 기하고 감정적 대응은 피하세요.',
      advice: '오늘은 낮은 자세로 신중하게 행동하세요.'
    },
    {
      score: 2, title: '인내의 시간', icon: '⏳',
      desc: '업무가 예상보다 지연되거나 생각대로 되지 않을 수 있습니다. 포기하지 말고 꾸준히 버텨나가면 반드시 빛이 옵니다.',
      advice: '지금은 씨앗을 뿌리는 시간입니다.'
    },
    {
      score: 3, title: '착실한 전진', icon: '📚',
      desc: '눈에 띄는 성과는 없어도 꾸준히 쌓이는 하루입니다. 성실하게 맡은 일을 해나가면 분명 좋은 결과가 따라옵니다.',
      advice: '평소보다 조금 더 집중해서 일해 보세요.'
    },
    {
      score: 4, title: '능력 발휘', icon: '🏆',
      desc: '오늘은 당신의 능력이 빛을 발하는 날입니다. 중요한 발표나 미팅이 있다면 적극적으로 임하세요. 좋은 평가를 받을 수 있습니다.',
      advice: '자신감을 갖고 적극적으로 나서세요!'
    },
    {
      score: 5, title: '커리어 전환점', icon: '🚀',
      desc: '승진, 이직, 프로젝트 성공 등 커리어의 큰 전환점이 될 수 있는 날입니다. 오랫동안 준비해온 일이 드디어 결실을 맺습니다.',
      advice: '오늘의 기회가 미래를 바꿀 수 있습니다!'
    },
  ],
}

const LUCKY_COLORS = ['빨강', '파랑', '초록', '노랑', '보라', '주황', '분홍', '흰색', '금색', '하늘색']
const LUCKY_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const LUCKY_ITEMS = ['거울', '책', '편지', '꽃', '반지', '동전', '열쇠', '수정', '향초', '리본']
const LUCKY_TIMES = ['오전 7시', '오전 10시', '오후 1시', '오후 3시', '오후 6시', '오후 9시']
const LUCKY_DIRECTIONS = ['동쪽', '서쪽', '남쪽', '북쪽', '동남쪽', '동북쪽']

export function getTodayFortune(birthdate) {
  const today = new Date().toISOString().split('T')[0]
  const seed = hash(birthdate + today)

  function pick(arr, offset) {
    return arr[Math.floor(seededRandom(seed, offset) * arr.length)]
  }

  function pickScore(offset) {
    const r = seededRandom(seed, offset)
    // 가중치: 1(10%), 2(20%), 3(30%), 4(25%), 5(15%)
    if (r < 0.10) return 0
    if (r < 0.30) return 1
    if (r < 0.60) return 2
    if (r < 0.85) return 3
    return 4
  }

  return {
    overall: FORTUNE_DATA.overall[pickScore(0)],
    love: FORTUNE_DATA.love[pickScore(10)],
    money: FORTUNE_DATA.money[pickScore(20)],
    health: FORTUNE_DATA.health[pickScore(30)],
    career: FORTUNE_DATA.career[pickScore(40)],
    lucky: {
      color: pick(LUCKY_COLORS, 50),
      number: pick(LUCKY_NUMBERS, 60),
      item: pick(LUCKY_ITEMS, 70),
      time: pick(LUCKY_TIMES, 80),
      direction: pick(LUCKY_DIRECTIONS, 90),
    },
  }
}
