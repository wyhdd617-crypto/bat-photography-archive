const photoPath = (fileName) => `${import.meta.env.BASE_URL}photos/${fileName}`;

const basePhotos = [
  ['bat-01', 'bat01', 'bat-1.jpg', 5373, 3984],
  ['bat-02', 'bat02', 'bat-2.jpg', 5310, 3920],
  ['bat-03', 'bat03', 'bat-3.jpg', 5549, 4000],
  ['bat-04', 'bat04', 'bat-4.jpg', 4000, 6000],
  ['bat-05', 'bat05', 'bat-5.jpg', 4000, 6000],
  ['bat-06', 'bat06', 'bat-6.jpg', 6000, 4000],
  ['bat-07', 'bat07', 'bat-7.jpg', 960, 576],
  ['bat-08', 'bat08', 'bat-8.jpg', 960, 570],
  ['bat-09', 'bat09', 'bat-9.jpg', 960, 581],
  ['bat-10', 'bat10', 'bat-10.jpg', 2700, 3375],
  ['bat-11', 'bat11', 'bat-11.jpg', 2700, 3375],
  ['bat-12', 'bat12', 'bat-12.jpg', 2700, 3375],
  ['bat-13', 'bat13', 'bat-13.jpg', 2700, 3375],
  ['bat-14', 'bat14', 'bat-14.jpg', 2700, 3375],
  ['bat-15', 'bat15', 'bat-15.jpg', 6000, 4000],
  ['bat-16', 'bat16', 'bat-16.jpg', 6000, 4000],
  ['bat-17', 'bat17', 'bat-17.jpg', 6000, 4000],
  ['bat-18', 'bat18', 'bat-18.jpg', 6000, 4000],
  ['bat-19', 'bat19', 'bat-19.jpg', 6000, 4000],
  ['bat-20', 'bat20', 'bat-20.jpg', 6000, 4000],
  ['bat-21', 'bat21', 'bat-21.jpg', 6000, 4000],
  ['bat-22', 'bat22', 'bat-22.jpg', 6000, 4000],
  ['bat-23', 'bat23', 'bat-23.jpg', 6000, 4000],
  ['bat-24', 'bat24', 'bat-24.jpg', 6000, 4000],
];

const seasidePhotoIds = new Set([
  'bat-15',
  'bat-16',
  'bat-17',
  'bat-18',
  'bat-19',
  'bat-20',
  'bat-21',
  'bat-22',
  'bat-23',
  'bat-24',
]);

export const photos = basePhotos.map(([id, title, file, width, height], index) => {
  const isSeaside = seasidePhotoIds.has(id);

  return {
    id,
    title,
    src: photoPath(file),
    width,
    height,
    archiveNo: `BAT / ${String(index + 1).padStart(3, '0')}`,
    time: isSeaside ? '2026 / 海边纪实' : '2026 / 时间待记',
    year: '2026',
    location: isSeaside ? '海边' : '南宁',
    method: isSeaside ? '数字摄影 / 海边纪实' : '数字摄影 / 个人档案',
    note: isSeaside
      ? '潮水、人群、遮挡与失焦共同保留现场的温度。'
      : index % 3 === 0
        ? '光线先于人物离开现场。'
        : index % 3 === 1
          ? '在经过时停下，没有等待事情发生。'
          : '距离、噪点，以及没有被解释的部分。',
    context: isSeaside
      ? '一组关于海边、观看和经过的连续记录。'
      : '一则尚未完成的现场记录。具体拍摄背景待补记。',
  };
});

export const projects = [
  {
    id: 'city-distance',
    number: '01',
    title: '城市与距离',
    years: '2026—',
    description: '关于街道、边界和人如何消失在空间中的持续记录。',
    photoIds: ['bat-01', 'bat-03', 'bat-04', 'bat-06', 'bat-11'],
  },
  {
    id: 'after-dark',
    number: '02',
    title: '天黑以后',
    years: '2026—',
    description: '微弱照明、偶然相遇，以及夜晚重新分配的城市表面。',
    photoIds: ['bat-07', 'bat-08', 'bat-13', 'bat-05'],
  },
  {
    id: 'failed-images',
    number: '03',
    title: '失败的图像',
    years: '2026—',
    description: '保留失焦、遮挡与错误时机，让照片停止充当证据。',
    photoIds: ['bat-02', 'bat-09', 'bat-10', 'bat-12', 'bat-14'],
  },
  {
    id: 'seaside-documentary',
    number: '04',
    title: '海边纪实',
    years: '2026—',
    description: '海水、岸线、人群与偶然遮挡构成的连续现场。',
    photoIds: ['bat-15', 'bat-16', 'bat-17', 'bat-18', 'bat-19', 'bat-20', 'bat-21', 'bat-22', 'bat-23', 'bat-24'],
  },
];
