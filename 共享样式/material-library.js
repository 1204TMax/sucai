(function() {
  if (window.CCMaterialLibrary) return;

  var tags = [
    '跑量素材', '爆款逆向', '脚本', '演员', '卖点', '口播', '工具类',
    '网赚', 'IAA', 'IAP', '首帧', '封面', '信息流', '三视图', '可复用'
  ];

  var tagGroups = {
    image: [
      { id: 'age', name: '年龄', multiple: false, tags: ['青年', '中年', '老年'] },
      { id: 'gender', name: '性别', multiple: false, tags: ['男性', '女性', '不限'] },
      { id: 'scene', name: '场景', multiple: true, tags: ['封面', '首帧', '信息流', '三视图'] }
    ],
    video: [
      { id: 'clipType', name: '片段类型', multiple: false, tags: ['口播', '演示', '剧情'] },
      { id: 'format', name: '画幅', multiple: true, tags: ['9:16', '16:9', '1:1'] },
      { id: 'source', name: '来源', multiple: true, tags: ['跑量素材', '爆款逆向', '我的任务'] }
    ],
    copy: [
      { id: 'copyType', name: '文案类型', multiple: false, tags: ['脚本', '卖点', '口播'] },
      { id: 'business', name: '业务方向', multiple: true, tags: ['网赚', '工具类', 'IAA', 'IAP'] },
      { id: 'reuse', name: '复用状态', multiple: true, tags: ['可复用', '爆款逆向'] }
    ],
    actor: [
      { id: 'actorAge', name: '年龄', multiple: false, tags: ['青年', '中年', '老年'] },
      { id: 'actorGender', name: '性别', multiple: false, tags: ['男性', '女性', '不限'] }
    ],
    script: [
      { id: 'scriptPurpose', name: '用途', multiple: true, tags: ['口播', '剧情', '爆款逆向'] },
      { id: 'scriptBusiness', name: '业务方向', multiple: true, tags: ['网赚', '工具类', 'IAA', 'IAP'] }
    ],
    bgm: [{ id: 'bgmMood', name: '氛围', multiple: true, tags: ['轻快', '紧张', '治愈'] }],
    sound: [{ id: 'soundScene', name: '场景', multiple: true, tags: ['转场', '点击', '提示'] }],
    caption: [{ id: 'captionStyle', name: '样式', multiple: true, tags: ['醒目', '信息流', '口播'] }],
    sticker: [{ id: 'stickerScene', name: '场景', multiple: true, tags: ['引导', '气氛', '提示'] }]
  };

  var materialTypes = [
    { key: 'image', label: '图片', format: 'image', formatLabel: '图片', system: true, enabled: true },
    { key: 'video', label: '视频', format: 'video', formatLabel: '视频', system: true, enabled: true },
    { key: 'copy', label: '文案', format: 'copy', formatLabel: '文本', system: true, enabled: true },
    { key: 'actor', label: '演员', format: 'image', formatLabel: '图片', system: false, enabled: true },
    { key: 'script', label: '脚本库', format: 'copy', formatLabel: '文本', system: true, enabled: false },
    { key: 'bgm', label: 'BGM', format: 'audio', formatLabel: '音频', system: false, enabled: true },
    { key: 'sound', label: '音效', format: 'audio', formatLabel: '音频', system: true, enabled: false },
    { key: 'caption', label: '花字', format: 'image', formatLabel: '图片', system: true, enabled: false },
    { key: 'sticker', label: '贴纸', format: 'image', formatLabel: '图片', system: true, enabled: false }
  ];

  var materialCategories = [
    { key: 'actor', label: '演员', formats: ['image', 'video', 'copy'], tagGroup: 'actor', enabled: true }
  ];

  var currentUser = {
    id: 'dashan',
    name: '大山'
  };

  function previewSvg(bg, accent, title, subtitle) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="960" viewBox="0 0 960 960">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="' + bg + '"/><stop offset="100%" stop-color="#ffffff"/></linearGradient></defs>' +
      '<rect width="960" height="960" fill="url(#g)"/>' +
      '<rect x="72" y="72" width="816" height="816" rx="34" fill="rgba(255,255,255,.72)" stroke="rgba(20,30,50,.1)"/>' +
      '<circle cx="780" cy="180" r="72" fill="' + accent + '" opacity=".2"/>' +
      '<text x="118" y="430" fill="#1f2937" font-size="54" font-family="Arial, sans-serif" font-weight="800">' + title + '</text>' +
      '<text x="118" y="496" fill="#526070" font-size="28" font-family="Arial, sans-serif">' + subtitle + '</text>' +
      '<rect x="118" y="568" width="268" height="16" rx="8" fill="' + accent + '" opacity=".45"/>' +
      '<rect x="118" y="604" width="430" height="16" rx="8" fill="#111827" opacity=".12"/>' +
      '</svg>';
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  var localVideoUrl = '../icon/步数1-1.mp4';

  var materials = [
    {
      id: 'mat-copy-001',
      name: '步数打卡激励脚本组',
      type: 'copy',
      materialType: 'copy',
      format: '文案',
      content: '今天多走 1000 步，金币就多一点。把每天通勤路上的步数变成小奖励。通勤、遛弯、买菜都能累积，完成目标后立刻看到奖励变化。开头用「每天走路也能领金币」抓注意力，中段解释步数如何累计，结尾提示今天先完成一个小目标。',
      tags: ['脚本', '爆款逆向', '网赚', 'IAA'],
      source: '工作流',
      workflowName: '爆款二创工作流',
      owner: 'Kiki',
      createdAt: '2026-07-02',
      visibility: '全部',
      downloads: 33,
      references: 18,
      status: '可用'
    },
    {
      id: 'mat-copy-004',
      name: '清理加速口播短脚本',
      type: 'copy',
      materialType: 'copy',
      format: '文案',
      content: '手机卡到点不开应用，先别急着换新机。打开清理工具，先扫缓存，再关掉后台占用，最后把长期不用的大文件挪走。三步做完，旧手机也能顺很多。',
      tags: ['脚本', '工具类', '口播', '可复用'],
      source: '我的任务',
      owner: '大山',
      createdAt: '2026-07-04',
      visibility: '全部',
      downloads: 14,
      references: 9,
      status: '可用'
    },
    {
      id: 'mat-copy-005',
      name: '走路金币首帧文案',
      type: 'copy',
      materialType: 'copy',
      format: '文案',
      content: '每天走路也能攒金币。上班路上多走几百步，晚上散步再补一点，完成目标后奖励马上刷新。今天先从 1000 步开始，不用额外花时间，也能把日常动作变成小收益。',
      tags: ['卖点', '网赚', 'IAA', '爆款逆向'],
      source: '工作流',
      workflowName: 'LibTV 批量生产工作流',
      owner: '大山',
      createdAt: '2026-07-03',
      visibility: '全部',
      downloads: 22,
      references: 16,
      status: '可用'
    },
    {
      id: 'mat-copy-006',
      name: '提现演示信息流文案',
      type: 'copy',
      materialType: 'copy',
      format: '文案',
      content: '很多人以为提现很复杂，其实三步就能看懂。先完成今日任务，再进入收益页查看金币，最后点提现到账。画面里直接展示到账过程，比单纯讲规则更容易让用户相信。',
      tags: ['脚本', '网赚', '口播', '可复用'],
      source: '手动',
      owner: '大山',
      createdAt: '2026-07-01',
      visibility: '全部',
      downloads: 11,
      references: 7,
      status: '可用'
    },
    {
      id: 'mat-image-001',
      name: '阿澈三视图',
      type: 'image',
      materialType: 'actor',
      format: '图片',
      url: previewSvg('#e8f1ff', '#2f6fed', '阿澈三视图', '演员 / 工具类 / 跑量素材'),
      thumb: previewSvg('#e8f1ff', '#2f6fed', '阿澈三视图', '演员 / 工具类 / 跑量素材'),
      tags: ['演员', '三视图', '跑量素材', '工具类'],
      source: '数据中台',
      owner: '晨越',
      createdAt: '2026-07-01',
      visibility: '全部',
      downloads: 21,
      references: 14,
      status: '可用'
    },
    {
      id: 'mat-video-actor-001',
      name: '阿澈口播表演片段.mp4',
      type: 'video',
      materialType: 'actor',
      format: '视频',
      url: localVideoUrl,
      thumb: previewSvg('#eef6ff', '#1677ff', '阿澈口播片段', '演员 / 青年 / 男性'),
      tags: ['演员', '青年', '男性', '口播'],
      source: '我的任务',
      owner: '大山',
      createdAt: '2026-07-05',
      visibility: '全部',
      downloads: 8,
      references: 6,
      status: '可用'
    },
    {
      id: 'mat-copy-actor-001',
      name: '阿澈演员设定',
      type: 'copy',
      materialType: 'actor',
      format: '文案',
      content: '青年男性演员，短发，表情自然有亲和力，适合工具类产品口播和教程演示。说话节奏干脆，镜头前动作克制，服装以浅色休闲风为主。',
      tags: ['演员', '青年', '男性', '工具类'],
      source: '手动',
      owner: '大山',
      createdAt: '2026-07-05',
      visibility: '全部',
      downloads: 5,
      references: 4,
      status: '可用'
    },
    {
      id: 'mat-video-001',
      name: '清理加速爆款片段',
      type: 'video',
      format: '视频',
      url: localVideoUrl,
      thumb: previewSvg('#e9fbf4', '#16a36a', '清理加速片段', '信息流 / 爆款逆向'),
      tags: ['跑量素材', '工具类', '信息流', '爆款逆向'],
      source: '我的任务',
      owner: '大山',
      createdAt: '2026-06-30',
      visibility: '全部',
      downloads: 12,
      references: 9,
      status: '可用'
    },
    {
      id: 'mat-image-002',
      name: '金币奖励封面图',
      type: 'image',
      format: '图片',
      url: previewSvg('#fff3d9', '#f59e0b', '金币奖励封面', '封面 / 首帧 / IAA'),
      thumb: previewSvg('#fff3d9', '#f59e0b', '金币奖励封面', '封面 / 首帧 / IAA'),
      tags: ['封面', '网赚', '首帧', 'IAA'],
      source: '手动',
      owner: '大山',
      createdAt: '2026-06-29',
      visibility: '全部',
      downloads: 6,
      references: 4,
      status: '可用'
    },
    {
      id: 'mat-image-003',
      name: '清理加速首帧',
      type: 'image',
      format: '图片',
      url: previewSvg('#e0f7fa', '#0891b2', '清理加速首帧', '首帧 / 信息流 / 工具类'),
      thumb: previewSvg('#e0f7fa', '#0891b2', '清理加速首帧', '首帧 / 信息流 / 工具类'),
      tags: ['首帧', '信息流', '工具类', '青年'],
      source: '工作流',
      workflowName: '图片批量生成工作流',
      owner: '大山',
      createdAt: '2026-06-27',
      visibility: '全部',
      downloads: 10,
      references: 8,
      status: '可用'
    },
    {
      id: 'mat-image-004',
      name: '女性角色封面候选',
      type: 'image',
      materialType: 'actor',
      format: '图片',
      url: previewSvg('#fde7f3', '#db2777', '女性角色封面', '青年 / 女性 / 封面'),
      thumb: previewSvg('#fde7f3', '#db2777', '女性角色封面', '青年 / 女性 / 封面'),
      tags: ['青年', '女性', '封面'],
      source: '手动',
      owner: '大山',
      createdAt: '2026-06-26',
      visibility: '全部',
      downloads: 5,
      references: 3,
      status: '可用'
    },
    {
      id: 'mat-copy-002',
      name: '清理加速卖点组',
      type: 'copy',
      format: '文案',
      content: '手机越用越慢，先清理缓存和后台占用。三步完成加速，旧手机也能顺一点。',
      tags: ['卖点', '工具类', '口播', '可复用'],
      source: '手动',
      owner: '李想',
      createdAt: '2026-06-28',
      visibility: '全部',
      downloads: 18,
      references: 11,
      status: '可用'
    },
    {
      id: 'mat-video-002',
      name: '提现到账演示视频',
      type: 'video',
      format: '视频',
      url: localVideoUrl,
      thumb: previewSvg('#f3e8ff', '#8b5cf6', '提现到账演示', '网赚 / 信息流'),
      tags: ['网赚', '信息流', '跑量素材'],
      source: '数据中台',
      owner: '陈晨',
      createdAt: '2026-06-27',
      visibility: '全部',
      downloads: 9,
      references: 7,
      status: '可用'
    }
  ];

  var taskItems = [
    {
      id: 'task-ref-001',
      name: '护肤品春季推广素材',
      type: 'image',
      format: '图片',
      thumb: previewSvg('#fce7f3', '#db2777', '春季推广素材', '我的任务 / 已完成'),
      url: previewSvg('#fce7f3', '#db2777', '春季推广素材', '我的任务 / 已完成'),
      tags: ['我的任务', '图片生成'],
      source: '我的任务',
      owner: '大山',
      visibility: '仅自己',
      createdAt: '2026-07-03'
    },
    {
      id: 'task-ref-002',
      name: '618 主图候选 04',
      type: 'image',
      format: '图片',
      thumb: previewSvg('#eef2ff', '#4f46e5', '618 主图候选', '我的任务 / 已完成'),
      url: previewSvg('#eef2ff', '#4f46e5', '618 主图候选', '我的任务 / 已完成'),
      tags: ['我的任务', '已完成'],
      source: '我的任务',
      owner: '大山',
      visibility: '仅自己',
      createdAt: '2026-07-02'
    },
    {
      id: 'task-ref-003',
      name: '爆款视频拆解结果',
      type: 'video',
      format: '视频',
      thumb: previewSvg('#fee2e2', '#ef4444', '爆款拆解结果', '我的任务 / 已完成'),
      url: localVideoUrl,
      tags: ['我的任务', '视频生成'],
      source: '我的任务',
      owner: '大山',
      visibility: '仅自己',
      createdAt: '2026-07-01'
    },
    {
      id: 'task-ref-004',
      name: '文案生成结果：金币激励',
      type: 'copy',
      format: '文案',
      content: '把每天走路这件小事变成即时奖励，完成目标就能看到金币增长。',
      tags: ['我的任务', '文案生成'],
      source: '我的任务',
      owner: '大山',
      visibility: '仅自己',
      createdAt: '2026-07-01'
    }
  ];

  var tasks = [
    {
      id: 'task-20260703-001',
      name: '护肤品春季推广素材',
      createdAt: '2026-07-03 18:26',
      status: '已完成',
      resultTypes: ['image'],
      results: [taskItems[0], taskItems[1]]
    },
    {
      id: 'task-20260701-002',
      name: '爆款视频拆解结果',
      createdAt: '2026-07-01 21:10',
      status: '已完成',
      resultTypes: ['video', 'copy'],
      results: [taskItems[2], taskItems[3]]
    },
    {
      id: 'task-20260630-003',
      name: '清理加速素材补量',
      createdAt: '2026-06-30 16:42',
      status: '已完成',
      resultTypes: ['image', 'video'],
      results: [
        {
          id: 'task-ref-005',
          name: '清理加速封面候选',
          type: 'image',
          format: '图片',
          thumb: previewSvg('#e9fbf4', '#16a36a', '清理加速封面', '我的任务 / 已完成'),
          url: previewSvg('#e9fbf4', '#16a36a', '清理加速封面', '我的任务 / 已完成'),
          tags: ['我的任务', '图片生成', '工具类'],
          source: '我的任务',
          owner: '大山',
          visibility: '仅自己',
          createdAt: '2026-06-30'
        },
        {
          id: 'task-ref-006',
          name: '清理加速视频候选',
          type: 'video',
          format: '视频',
          thumb: previewSvg('#e0f2fe', '#0284c7', '清理加速视频', '我的任务 / 已完成'),
          url: localVideoUrl,
          tags: ['我的任务', '视频生成', '工具类'],
          source: '我的任务',
          owner: '大山',
          visibility: '仅自己',
          createdAt: '2026-06-30'
        }
      ]
    }
  ];

  function typeLabel(type) {
    var option = materialTypes.find(function(item) { return item.key === type; });
    return option ? option.label : (type === 'copy' ? '文案' : type === 'video' ? '视频' : '图片');
  }

  function isMine(item) {
    return (item && (item.owner === currentUser.name || item.owner === '我' || item.source === '我的任务'));
  }

  function ownershipLabel(item) {
    if (isMine(item)) return '我的';
    if (item && item.visibility !== '仅自己') return '全部';
    return '他人';
  }

  function matchOwnership(item, scope) {
    if (!scope || scope === 'all') return true;
    if (scope === 'mine') return isMine(item);
    if (scope === 'others') return !isMine(item);
    if (scope === 'team') return item && item.visibility !== '仅自己';
    return true;
  }

  function allItems(source) {
    if (source === 'task') return taskItems.slice();
    if (source === 'library') return materials.slice();
    return materials.concat(taskItems);
  }

  function filterItems(options) {
    options = options || {};
    var allowed = options.allowedTypes || [];
    var query = String(options.query || '').trim().toLowerCase();
    var tag = options.tag || '';
    var ownership = options.ownership || 'all';
    return allItems(options.source).filter(function(item) {
      if (allowed.length && allowed.indexOf(item.type) === -1) return false;
      if (tag && !(item.tags || []).includes(tag)) return false;
      if (!matchOwnership(item, ownership)) return false;
      if (!query) return true;
      var haystack = [item.name, item.format, item.source, item.owner, (item.tags || []).join(' '), item.content || ''].join(' ').toLowerCase();
      return haystack.indexOf(query) > -1;
    });
  }

  function selectableTypes() {
    return materialTypes.filter(function(item) {
      return item.enabled !== false && ['image', 'video', 'copy'].indexOf(item.format) > -1;
    });
  }

  function groupsForType(type) {
    return (tagGroups[type] || []).map(function(group) {
      return {
        id: group.id,
        name: group.name,
        multiple: group.multiple,
        tags: (group.tags || []).slice()
      };
    });
  }

  function pickerCategories(format) {
    return materialCategories.filter(function(item) {
      return item.enabled !== false && (!format || item.formats.indexOf(format) > -1);
    }).map(function(item) {
      return {
        key: item.key,
        label: item.label,
        formats: item.formats.slice(),
        tagGroup: item.tagGroup
      };
    });
  }

  function matchTagSelections(item, selections) {
    var groups = selections || {};
    return Object.keys(groups).every(function(groupId) {
      var selected = groups[groupId] || [];
      if (!selected.length) return true;
      return selected.some(function(tag) { return (item.tags || []).indexOf(tag) > -1; });
    });
  }

  window.CCMaterialLibrary = {
    currentUser: currentUser,
    tags: tags,
    tagGroups: tagGroups,
    materialTypes: materialTypes,
    materialCategories: materialCategories,
    materials: materials,
    taskItems: taskItems,
    tasks: tasks,
    typeLabel: typeLabel,
    isMine: isMine,
    ownershipLabel: ownershipLabel,
    matchOwnership: matchOwnership,
    selectableTypes: selectableTypes,
    groupsForType: groupsForType,
    pickerCategories: pickerCategories,
    matchTagSelections: matchTagSelections,
    filterItems: filterItems
  };
})();
