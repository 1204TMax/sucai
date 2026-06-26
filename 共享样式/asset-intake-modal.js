(function() {
  if (window.__ccAssetIntakeModalLoaded) return;
  window.__ccAssetIntakeModalLoaded = true;

  var DEFAULT_VISIBLE_COUNT = 3;
  var TRASH_ICON = '<svg class="lucide lucide-trash-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>';
  var PLUS_ICON = '<svg class="lucide lucide-plus" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg>';
  var EDIT_ICON = '<svg class="lucide lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>';
  var DESIGNERS = ['大山', '周玥', '张宁', '李想', '陈晨', '王敏'];
  var PLATFORMS = ['头条', '快手', '广点通', 'OPPO', 'VIVO', '华为 Ads', '百度'];
  var SEARCH_ALIASES = {
    '步数赚金币':['bushuzhuanjinbi', 'bszjb'],
    '走路赚金币':['zouluzhuanjinbi', 'zlzjb'],
    '成语赚钱':['chengyuzhuanqian', 'cyzq'],
    '欢乐消消':['huanlexiaoxiao', 'hlxx'],
    '红包短剧':['hongbaoduanju', 'hbdj'],
    '清理大师':['qinglidashi', 'qlds'],
    '电池管家':['dianchiguanjia', 'dcgj'],
    '心动聊天':['xindongliaotian', 'xdlt'],
    '星语陪伴':['xingyupeiban', 'xypb'],
    '方块传奇':['fangkuaichuanqi', 'fkcq'],
    '农场大亨':['nongchangdaheng', 'ncdh'],
    '通用素材':['tongyongsucai', 'tysc'],
    'IAA':['iaa'],
    '网赚':['wangzhuan', 'wz'],
    '工具':['gongju', 'gj'],
    '社交':['shejiao', 'sj'],
    '游戏':['youxi', 'yx'],
    '品牌':['pinpai', 'pp'],
    '大山':['dashan', 'ds'],
    '周玥':['zhouyue', 'zy'],
    '张宁':['zhangning', 'zn'],
    '李想':['lixiang', 'lx'],
    '陈晨':['chenchen', 'cc'],
    '王敏':['wangmin', 'wm']
  };
  var FOLDERS = [
    { id:'f001', name:'IAA / 步数赚金币 / 信息流图片', product:'步数赚金币', series:'IAA', pinned:true },
    { id:'f002', name:'IAA / 步数赚金币 / 视频片段', product:'步数赚金币', series:'IAA' },
    { id:'f003', name:'IAA / 走路赚金币 / 封面素材', product:'走路赚金币', series:'IAA' },
    { id:'f004', name:'IAA / 走路赚金币 / 激励视频', product:'走路赚金币', series:'IAA' },
    { id:'f005', name:'IAA / 成语赚钱 / 成品图', product:'成语赚钱', series:'IAA', favorite:true },
    { id:'f006', name:'IAA / 成语赚钱 / 竖版视频', product:'成语赚钱', series:'IAA' },
    { id:'f007', name:'网赚 / 欢乐消消 / 入口图', product:'欢乐消消', series:'网赚' },
    { id:'f008', name:'网赚 / 欢乐消消 / 原生视频', product:'欢乐消消', series:'网赚' },
    { id:'f009', name:'网赚 / 红包短剧 / 剧情切片', product:'红包短剧', series:'网赚' },
    { id:'f010', name:'网赚 / 红包短剧 / 落地页配图', product:'红包短剧', series:'网赚' },
    { id:'f011', name:'工具 / 清理大师 / 功能演示', product:'清理大师', series:'工具', pinned:true },
    { id:'f012', name:'工具 / 清理大师 / 图标素材', product:'清理大师', series:'工具' },
    { id:'f013', name:'工具 / 电池管家 / 对比图', product:'电池管家', series:'工具' },
    { id:'f014', name:'工具 / 电池管家 / 视频素材', product:'电池管家', series:'工具' },
    { id:'f015', name:'社交 / 心动聊天 / 角色图', product:'心动聊天', series:'社交', favorite:true },
    { id:'f016', name:'社交 / 心动聊天 / 开场视频', product:'心动聊天', series:'社交' },
    { id:'f017', name:'社交 / 星语陪伴 / 场景图', product:'星语陪伴', series:'社交' },
    { id:'f018', name:'社交 / 星语陪伴 / 口播视频', product:'星语陪伴', series:'社交' },
    { id:'f019', name:'游戏 / 方块传奇 / 试玩图', product:'方块传奇', series:'游戏' },
    { id:'f020', name:'游戏 / 方块传奇 / 试玩视频', product:'方块传奇', series:'游戏' },
    { id:'f021', name:'游戏 / 农场大亨 / 场景图', product:'农场大亨', series:'游戏' },
    { id:'f022', name:'游戏 / 农场大亨 / 奖励视频', product:'农场大亨', series:'游戏' },
    { id:'f023', name:'品牌 / 通用素材 / Logo 演绎', product:'通用素材', series:'品牌' },
    { id:'f024', name:'品牌 / 通用素材 / 节日活动', product:'通用素材', series:'品牌' },
    { id:'f025', name:'未分组物料', product:'', series:'' }
  ];

  var state = createInitialState([]);
  var toastTimer = null;

  function createInitialState(items) {
    return {
      items: buildMockIntakeItems(normalizeItems(items), 100),
      target: '素材库',
      selectedFolders: new Set(),
      filterMode: 'product',
      nameSearchMode: 'folder',
      nameQuery: '',
      productQuery: '',
      seriesQuery: '',
      filterSearchQuery: '',
      expandedTree: defaultExpandedTree(),
      designer: '大山',
      designerSearchQuery: '',
      platformQuery: '',
      selectedPlatforms: new Set(),
      aiCheck: true,
      remark: '',
      renameVisible: false,
      archiveName: '',
      draftArchiveName: '',
      folderEditorVisible: false,
      folderEditorMode: 'create',
      folderEditorTargetId: '',
      folderEditorTreeNodeId: '',
      folderEditorName: '',
      folderEditorError: '',
      subMode: '',
      previewIndex: -1
    };
  }

  function normalizeItems(items) {
    var list = Array.isArray(items) ? items : [];
    return list.map(function(item, index) {
      if (typeof item === 'string') item = { url:item };
      item = item || {};
      var url = item.url || item.src || item.thumb || '';
      var type = item.type || item.assetType || inferType(url);
      var name = item.name || item.fileName || item.filename || (type === 'video' ? '视频素材-' : '图片素材-') + (index + 1);
      return {
        id: item.id || 'asset-' + index + '-' + Math.random().toString(16).slice(2),
        type: type,
        url: url,
        thumb: item.thumb || item.poster || item.url || '',
        name: name,
        meta: item.meta || '',
        archived: isArchivedItem(item)
      };
    });
  }

  function buildMockIntakeItems(items, count) {
    var base = items.length ? items : [{ id:'mock-base', type:'image', url:'', thumb:'', name:'图片素材' }];
    var result = [];
    for (var i = 0; i < count; i++) {
      var source = base[i % base.length];
      var type = source.type || 'image';
      result.push({
        id: 'mock-intake-' + (i + 1),
        type: type,
        url: source.url,
        thumb: source.thumb || source.url,
        name: (type === 'video' ? '视频素材-' : '图片素材-') + String(i + 1).padStart(3, '0'),
        meta: source.meta || '',
        archived: isArchivedItem(source) || i % 9 === 0
      });
    }
    return result;
  }

  function isArchivedItem(item) {
    return !!(item && (item.archived || item.isArchived || item.inLibrary || item.hasArchived || item.storageStatus === 'archived'));
  }

  function inferType(url) {
    if (/\.(mp4|mov|webm|m4v)(\?|#|$)/i.test(String(url || ''))) return 'video';
    return 'image';
  }

  function isImageOnly() {
    return state.items.length === 0 || state.items.every(function(item) { return item.type !== 'video'; });
  }

  function defaultExpandedTree() {
    var expanded = new Set(['root', 'section:pinned', 'section:favorite', 'section:all']);
    var sections = ['pinned', 'favorite', 'all'];
    FOLDERS.forEach(function(folder) {
      sections.forEach(function(sectionId) {
        if ((sectionId === 'pinned' && !folder.pinned) || (sectionId === 'favorite' && !folder.favorite)) return;
        expanded.add('tree:' + sectionId + ':album:' + getFolderAlbum(folder));
      });
    });
    return expanded;
  }

  function escHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch];
    });
  }

  function escJsString(value) {
    return String(value == null ? '' : value).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '');
  }

  function ensureModal() {
    if (document.getElementById('aiIntakeMask')) return;
    var html = ''
      + '<div class="ai-intake-mask" id="aiIntakeMask" onclick="if(event.target===this)ccAssetIntakeClose()">'
      + '  <div class="ai-intake-dialog" role="dialog" aria-modal="true" aria-labelledby="aiIntakeTitle">'
      + '    <div class="ai-intake-head">'
      + '      <div class="ai-intake-title-wrap">'
      + '        <div class="ai-intake-title" id="aiIntakeTitle">批量素材入库</div>'
      + '        <div class="ai-intake-subtitle" id="aiIntakeSubtitle"></div>'
      + '      </div>'
      + '      <button class="ai-intake-close" type="button" onclick="ccAssetIntakeClose()" aria-label="关闭">×</button>'
      + '    </div>'
      + '    <div class="ai-intake-body">'
      + '      <div class="ai-intake-main">'
      + '        <section class="ai-intake-section ai-intake-folder-section">'
      + '          <div class="ai-intake-section-head ai-intake-folder-head">'
      + '            <div class="ai-intake-folder-title-row">'
      + '              <div class="ai-intake-section-title">入库位置 <span class="ai-intake-required">*</span></div>'
      + '              <div class="ai-intake-targets" id="aiIntakeTargets"></div>'
      + '            </div>'
      + '            <div class="ai-intake-section-actions">'
      + '              <button class="ai-intake-btn ai-intake-btn-link" type="button" onclick="ccAssetIntakeClearFolders()">清空</button>'
      + '              <button class="ai-intake-btn ai-intake-btn-link" type="button" onclick="ccAssetIntakeOpenSub(\'folders\')">展开全部</button>'
      + '            </div>'
      + '          </div>'
      + '          <div class="ai-intake-section-body">'
      + '            <div class="ai-intake-hint" id="aiIntakeTargetHint"></div>'
      + '            <div class="ai-intake-name-search-control">'
      + '              <div class="ai-intake-name-search-tabs" id="aiIntakeNameSearchTabs"></div>'
      + '              <input class="ai-intake-input ai-intake-name-search-input" id="aiIntakeNameSearchInput" autocomplete="off" placeholder="搜索文件夹名称" oninput="ccAssetIntakeSetNameSearch(this.value)">'
      + '            </div>'
      + '            <div class="ai-intake-filter-control" id="aiIntakeFilterControl">'
      + '              <span class="ai-intake-filter-label">筛选</span>'
      + '              <div class="ai-intake-filter-tabs" id="aiIntakeFilterTabs"></div>'
      + '              <div class="ai-intake-combobox" id="aiIntakeFilterSelect">'
      + '                <button class="ai-intake-select-trigger ai-intake-combobox-trigger" id="aiIntakeFilterTrigger" type="button" onclick="ccAssetIntakeOpenFilterDropdown()">'
      + '                  <span id="aiIntakeFilterText"></span><span>⌄</span>'
      + '                </button>'
      + '                <div class="ai-intake-combobox-panel">'
      + '                  <input class="ai-intake-input ai-intake-combobox-search" id="aiIntakeFilterSearch" autocomplete="off" placeholder="搜索产品" oninput="ccAssetIntakeSetFilterSearch(this.value)">'
      + '                  <div id="aiIntakeFilterOptions"></div>'
      + '                </div>'
      + '              </div>'
      + '            </div>'
      + '            <div class="ai-intake-folder-list" id="aiIntakeFolderList"></div>'
      + '            <div class="ai-intake-error" id="aiIntakeFolderError"></div>'
      + '          </div>'
      + '        </section>'
      + '      </div>'
      + '      <div class="ai-intake-side">'
      + '        <section class="ai-intake-section ai-intake-assets-section">'
      + '          <div class="ai-intake-section-head">'
      + '            <div class="ai-intake-section-title">选中文件</div>'
      + '            <div class="ai-intake-section-actions">'
      + '              <button class="ai-intake-btn ai-intake-btn-link" type="button" onclick="ccAssetIntakeShowRename()">修改名称</button>'
      + '              <button class="ai-intake-btn ai-intake-btn-link" id="aiIntakeAssetExpandBtn" type="button" onclick="ccAssetIntakeOpenSub(\'assets\')">展开全部</button>'
      + '            </div>'
      + '          </div>'
      + '          <div class="ai-intake-section-body">'
      + '            <div class="ai-intake-assets-grid" id="aiIntakeAssetsGrid"></div>'
      + '          </div>'
      + '        </section>'
      + '        <section class="ai-intake-section ai-intake-basic-section">'
      + '          <div class="ai-intake-section-head">'
      + '            <div class="ai-intake-section-title">基础信息</div>'
      + '          </div>'
      + '          <div class="ai-intake-section-body">'
      + '            <label class="ai-intake-field">'
      + '              <span class="ai-intake-label">设计师 <span class="ai-intake-required">*</span></span>'
      + '              <div class="ai-intake-combobox" id="aiIntakeDesignerSelect">'
      + '                <button class="ai-intake-select-trigger ai-intake-combobox-trigger" id="aiIntakeDesignerTrigger" type="button" onclick="ccAssetIntakeOpenDesignerDropdown()">'
      + '                  <span id="aiIntakeDesignerText"></span><span>⌄</span>'
      + '                </button>'
      + '                <div class="ai-intake-combobox-panel">'
      + '                  <input class="ai-intake-input ai-intake-combobox-search" id="aiIntakeDesignerSearch" autocomplete="off" placeholder="搜索设计师" oninput="ccAssetIntakeSetDesignerSearch(this.value)">'
      + '                  <div id="aiIntakeDesignerOptions"></div>'
      + '                </div>'
      + '              </div>'
      + '            </label>'
      + '            <div class="ai-intake-error" id="aiIntakeDesignerError"></div>'
      + '            <label class="ai-intake-field">'
      + '              <span class="ai-intake-label">推广平台</span>'
      + '            <div class="ai-intake-multiselect" id="aiIntakePlatformSelect">'
      + '              <button class="ai-intake-select-trigger" type="button" onclick="ccAssetIntakeTogglePlatforms()">'
      + '                <span id="aiIntakePlatformText"></span><span>⌄</span>'
      + '              </button>'
      + '              <div class="ai-intake-select-panel">'
      + '                <input class="ai-intake-input" id="aiIntakePlatformSearch" placeholder="搜索平台" oninput="ccAssetIntakeSetPlatformQuery(this.value)">'
      + '                <div class="ai-intake-option-list" id="aiIntakePlatformOptions"></div>'
      + '              </div>'
      + '            </div>'
      + '            </label>'
      + '            <div class="ai-intake-switch-row">'
      + '              <span class="ai-intake-label">AI 同质化检测</span>'
      + '              <button class="ai-intake-switch" id="aiIntakeAiSwitch" type="button" onclick="ccAssetIntakeToggleAiCheck()" aria-label="AI 同质化检测"></button>'
      + '            </div>'
      + '            <label class="ai-intake-field">'
      + '              <span class="ai-intake-label">备注</span>'
      + '            <textarea class="ai-intake-textarea" id="aiIntakeRemark" placeholder="填写本次入库说明" oninput="ccAssetIntakeSetRemark(this.value)"></textarea>'
      + '            </label>'
      + '          </div>'
      + '        </section>'
      + '      </div>'
      + '    </div>'
      + '    <div class="ai-intake-footer">'
      + '      <div class="ai-intake-footer-left">'
      + '        <div class="ai-intake-hint" id="aiIntakeFooterHint"></div>'
      + '        <div class="ai-intake-selected-summary">'
      + '          <span class="ai-intake-selected-summary-label">已选文件夹</span>'
      + '          <div class="ai-intake-selected-folders" id="aiIntakeSelectedFolders"></div>'
      + '        </div>'
      + '      </div>'
      + '      <div class="ai-intake-footer-actions">'
      + '        <button class="ai-intake-btn" type="button" onclick="ccAssetIntakeReset()">重置</button>'
      + '        <button class="ai-intake-btn ai-intake-btn-primary" type="button" onclick="ccAssetIntakeSubmit()">确认</button>'
      + '      </div>'
      + '    </div>'
      + '    <div class="ai-intake-name-mask" id="aiIntakeNameMask" onclick="if(event.target===this)ccAssetIntakeCloseRename()">'
      + '      <div class="ai-intake-name-dialog" role="dialog" aria-modal="true" aria-labelledby="aiIntakeNameTitle">'
      + '        <div class="ai-intake-name-head">'
      + '          <div class="ai-intake-subtitle-main" id="aiIntakeNameTitle">修改名称</div>'
      + '          <button class="ai-intake-close" type="button" onclick="ccAssetIntakeCloseRename()" aria-label="关闭">×</button>'
      + '        </div>'
      + '        <div class="ai-intake-name-body">'
      + '          <label class="ai-intake-name-field">'
      + '            <span class="ai-intake-label">入库后名称</span>'
      + '            <input class="ai-intake-input" id="aiIntakeArchiveNameInput" placeholder="输入入库后的文件名称" oninput="ccAssetIntakeSetArchiveName(this.value)" onkeydown="if(event.key===\'Enter\')ccAssetIntakeConfirmRename()">'
      + '          </label>'
      + '          <div class="ai-intake-name-preview" id="aiIntakeArchiveNamePreview"></div>'
      + '        </div>'
      + '        <div class="ai-intake-name-footer">'
      + '          <button class="ai-intake-btn" type="button" onclick="ccAssetIntakeCloseRename()">取消</button>'
      + '          <button class="ai-intake-btn ai-intake-btn-primary" type="button" onclick="ccAssetIntakeConfirmRename()">确认</button>'
      + '        </div>'
      + '      </div>'
      + '    </div>'
      + '    <div class="ai-intake-folder-edit-mask" id="aiIntakeFolderEditMask" onclick="if(event.target===this)ccAssetIntakeCloseFolderEditor()">'
      + '      <div class="ai-intake-folder-edit-dialog" role="dialog" aria-modal="true" aria-labelledby="aiIntakeFolderEditTitle">'
      + '        <div class="ai-intake-name-head">'
      + '          <div class="ai-intake-subtitle-main" id="aiIntakeFolderEditTitle"></div>'
      + '          <button class="ai-intake-close" type="button" onclick="ccAssetIntakeCloseFolderEditor()" aria-label="关闭">×</button>'
      + '        </div>'
      + '        <div class="ai-intake-name-body">'
      + '          <label class="ai-intake-name-field">'
      + '            <span class="ai-intake-label">文件夹名字</span>'
      + '            <input class="ai-intake-input" id="aiIntakeFolderNameInput" placeholder="输入文件夹名字" oninput="ccAssetIntakeSetFolderName(this.value)" onkeydown="if(event.key===\'Enter\')ccAssetIntakeConfirmFolderEditor()">'
      + '          </label>'
      + '          <div class="ai-intake-folder-default" id="aiIntakeFolderDefault">'
      + '            <span>素材归属</span><strong>通用</strong><em>每次新增默认回填</em>'
      + '          </div>'
      + '          <div class="ai-intake-error" id="aiIntakeFolderNameError"></div>'
      + '        </div>'
      + '        <div class="ai-intake-name-footer">'
      + '          <button class="ai-intake-btn" type="button" onclick="ccAssetIntakeCloseFolderEditor()">取消</button>'
      + '          <button class="ai-intake-btn ai-intake-btn-primary" type="button" onclick="ccAssetIntakeConfirmFolderEditor()">确认</button>'
      + '        </div>'
      + '      </div>'
      + '    </div>'
      + '  </div>'
      + '</div>'
      + '<div class="ai-intake-submask" id="aiIntakeSubMask" onclick="if(event.target===this)ccAssetIntakeCloseSub()">'
      + '  <div class="ai-intake-subdialog">'
      + '    <div class="ai-intake-subhead">'
      + '      <div class="ai-intake-subtitle-main" id="aiIntakeSubTitle"></div>'
      + '      <button class="ai-intake-close" type="button" onclick="ccAssetIntakeCloseSub()" aria-label="关闭">×</button>'
      + '    </div>'
      + '    <div class="ai-intake-subbody" id="aiIntakeSubBody"></div>'
      + '  </div>'
      + '</div>'
      + '<div class="ai-intake-submask" id="aiIntakePreviewMask" onclick="if(event.target===this)ccAssetIntakeClosePreview()">'
      + '  <button class="ai-intake-close ai-intake-preview-close" type="button" onclick="ccAssetIntakeClosePreview()" aria-label="关闭">×</button>'
      + '  <div class="ai-intake-preview-stage" id="aiIntakePreviewStage"></div>'
      + '</div>'
      + '<div class="ai-intake-toast" id="aiIntakeToast"></div>';
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function unique(values) {
    var seen = new Set();
    return values.filter(function(value) {
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }

  function openModal(input) {
    ensureModal();
    var items = input && Array.isArray(input.items) ? input.items : (Array.isArray(input) ? input : []);
    state = createInitialState(items);
    renderAll();
    document.getElementById('aiIntakeMask').classList.add('show');
  }

  function closeModal() {
    var mask = document.getElementById('aiIntakeMask');
    if (mask) mask.classList.remove('show');
    closeSub();
    closePreview();
    closePlatformPanel();
    closeFilterDropdown();
    closeDesignerDropdown();
    closeRenameEditor();
    closeFolderEditor();
  }

  function renderAll() {
    renderSummary();
    renderTargets();
    renderNameSearchControls();
    renderFilterControls();
    renderInputs();
    renderDesignerOptions();
    renderFolders();
    renderNameEditor();
    renderFolderEditor();
    renderAssets();
    renderPlatforms();
    renderAiSwitch();
    clearErrors();
  }

  function renderSummary() {
    var imageCount = state.items.filter(function(item) { return item.type !== 'video'; }).length;
    var videoCount = state.items.filter(function(item) { return item.type === 'video'; }).length;
    var parts = [];
    if (imageCount) parts.push(imageCount + ' 张图片');
    if (videoCount) parts.push(videoCount + ' 个视频');
    document.getElementById('aiIntakeSubtitle').textContent = '本次将入库 ' + (parts.join('、') || '0 个素材');
    document.getElementById('aiIntakeFooterHint').textContent = '已选位置 ' + state.selectedFolders.size + ' 个，素材 ' + state.items.length + ' 个';
    renderSelectedFolders();
  }

  function renderTargets() {
    var imageOnly = isImageOnly();
    if (imageOnly) state.target = '素材库';
    document.getElementById('aiIntakeTargets').innerHTML = ['素材库', '物料库'].map(function(target) {
      var disabled = imageOnly && target === '物料库';
      return '<label class="ai-intake-target-choice' + (state.target === target ? ' on' : '') + (disabled ? ' disabled' : '') + '">'
        + '<input type="radio" name="aiIntakeTarget" value="' + target + '" ' + (state.target === target ? 'checked' : '') + ' '
        + (disabled ? 'disabled title="图片内容只能入库到素材库"' : 'onchange="ccAssetIntakeSetTarget(\'' + target + '\')"')
        + '>'
        + '<span>' + target + '</span>'
        + '</label>';
    }).join('');
    document.getElementById('aiIntakeTargetHint').textContent = '';
  }

  function renderFilterControls() {
    var filterControl = document.getElementById('aiIntakeFilterControl');
    if (filterControl) filterControl.style.display = state.nameSearchMode === 'album' ? 'none' : '';
    var tabs = document.getElementById('aiIntakeFilterTabs');
    if (tabs) {
      tabs.innerHTML = ['product', 'series'].map(function(mode) {
        var label = mode === 'product' ? '产品' : '系列';
        return '<button class="ai-intake-filter-tab' + (state.filterMode === mode ? ' on' : '') + '" type="button" onclick="ccAssetIntakeSetFilterMode(\'' + mode + '\')">' + label + '</button>';
      }).join('');
    }
    var text = document.getElementById('aiIntakeFilterText');
    var trigger = document.getElementById('aiIntakeFilterTrigger');
    var search = document.getElementById('aiIntakeFilterSearch');
    var activeValue = getActiveFilterValue();
    if (text) text.textContent = activeValue || (state.filterMode === 'product' ? '请选择产品' : '请选择系列');
    if (trigger) trigger.classList.toggle('placeholder', !activeValue);
    if (search) {
      search.placeholder = state.filterMode === 'product' ? '搜索产品' : '搜索系列';
      if (search.value !== state.filterSearchQuery) search.value = state.filterSearchQuery;
    }
    renderFilterOptions();
  }

  function renderNameSearchControls(scope) {
    var prefix = scope === 'sub' ? 'aiIntakeSub' : 'aiIntake';
    var tabs = document.getElementById(prefix + 'NameSearchTabs');
    var input = document.getElementById(prefix + 'NameSearchInput');
    if (tabs) {
      tabs.innerHTML = ['folder', 'album'].map(function(mode) {
        var label = mode === 'folder' ? '搜文件夹' : '搜专辑';
        return '<button class="ai-intake-name-search-tab' + (state.nameSearchMode === mode ? ' on' : '') + '" type="button" onclick="ccAssetIntakeSetNameSearchMode(\'' + mode + '\')">' + label + '</button>';
      }).join('');
    }
    if (input) {
      input.placeholder = state.nameSearchMode === 'folder' ? '搜索文件夹名称' : '搜索专辑名称';
      if (input.value !== state.nameQuery) input.value = state.nameQuery;
    }
  }

  function getActiveFilterOptions() {
    if (state.filterMode === 'series') {
      return unique(FOLDERS.map(function(f) { return f.series; }).filter(Boolean));
    }
    return unique(FOLDERS.map(function(f) { return f.product; }).filter(Boolean));
  }

  function getActiveFilterValue() {
    return state.filterMode === 'product' ? state.productQuery : state.seriesQuery;
  }

  function isExactOptionValue(value, options) {
    var keyword = normalizeSearchText(value);
    if (!keyword) return false;
    return options.some(function(option) {
      return normalizeSearchText(option) === keyword;
    });
  }

  function normalizeSearchText(value) {
    return String(value || '').toLowerCase().replace(/[\s/\\|,，、_-]+/g, '');
  }

  function getSearchTargets(value) {
    return unique([value].concat(SEARCH_ALIASES[value] || [])).map(normalizeSearchText).filter(Boolean);
  }

  function isSubsequence(query, target) {
    var cursor = 0;
    for (var i = 0; i < target.length && cursor < query.length; i++) {
      if (target.charAt(i) === query.charAt(cursor)) cursor++;
    }
    return cursor === query.length;
  }

  function getFuzzyScore(value, query) {
    var keyword = normalizeSearchText(query);
    if (!keyword) return 0;
    var targets = getSearchTargets(value);
    var best = Infinity;
    targets.forEach(function(target) {
      if (target === keyword) best = Math.min(best, 0);
      else if (target.indexOf(keyword) === 0) best = Math.min(best, 1);
      else if (target.indexOf(keyword) > -1) best = Math.min(best, 2);
      else if (isSubsequence(keyword, target)) best = Math.min(best, 3);
    });
    return best;
  }

  function fuzzyMatches(value, query) {
    return getFuzzyScore(value, query) < Infinity;
  }

  function filterOptions(values, query) {
    var keyword = normalizeSearchText(query);
    if (!keyword) return values;
    return values
      .filter(function(value) { return fuzzyMatches(value, keyword); })
      .sort(function(a, b) {
        var scoreDiff = getFuzzyScore(a, keyword) - getFuzzyScore(b, keyword);
        return scoreDiff || a.localeCompare(b, 'zh-Hans-CN');
      });
  }

  function renderComboboxOptions(containerId, values, activeValue, selectHandler) {
    var container = document.getElementById(containerId);
    if (!container) return;
    if (!values.length) {
      container.innerHTML = '<div class="ai-intake-combobox-empty">没有匹配选项</div>';
      return;
    }
    var active = String(activeValue || '').trim().toLowerCase();
    container.innerHTML = '<div class="ai-intake-combobox-list">'
      + values.map(function(value) {
        var selected = value.toLowerCase() === active;
        return '<button class="ai-intake-combobox-option' + (selected ? ' on' : '') + '" type="button" onclick="' + selectHandler + '(\'' + escJsString(value) + '\')">'
          + '<span>' + escHtml(value) + '</span>'
          + '</button>';
      }).join('')
      + '</div>';
  }

  function renderFilterOptions() {
    var activeValue = getActiveFilterValue();
    var values = filterOptions(getActiveFilterOptions(), state.filterSearchQuery);
    renderComboboxOptions('aiIntakeFilterOptions', values, activeValue, 'ccAssetIntakeSelectFilterOption');
  }

  function renderDesignerOptions() {
    var values = filterOptions(DESIGNERS, state.designerSearchQuery);
    renderComboboxOptions('aiIntakeDesignerOptions', values, state.designer, 'ccAssetIntakeSelectDesigner');
  }

  function getFolderById(id) {
    return FOLDERS.find(function(folder) { return folder.id === id; }) || null;
  }

  function getFolderAlbum(folder) {
    if (!folder) return '';
    if (folder.album) return folder.album;
    if (folder.series) return folder.series + ' 专辑';
    return '未分组专辑';
  }

  function getFolderLeafName(folder) {
    if (!folder) return '';
    return folder.name.split(' / ').pop();
  }

  function getFolderDisplayName(folder) {
    if (!folder) return '';
    return [getFolderAlbum(folder)].concat(getFolderPathParts(folder)).filter(Boolean).join(' / ');
  }

  function renderSelectedFolders() {
    var container = document.getElementById('aiIntakeSelectedFolders');
    if (!container) return;
    var ids = Array.from(state.selectedFolders);
    if (!ids.length) {
      container.innerHTML = '<span class="ai-intake-selected-empty">未选择入库位置</span>';
      return;
    }
    container.innerHTML = ids.map(function(id) {
      var folder = getFolderById(id);
      var label = folder ? getFolderDisplayName(folder) : id;
      var title = folder ? getFolderDisplayName(folder) : id;
      return '<span class="ai-intake-selected-folder" title="' + escHtml(title) + '">'
        + '<span>' + escHtml(label) + '</span>'
        + '<button type="button" aria-label="移除入库位置" onclick="ccAssetIntakeRemoveSelectedFolder(\'' + escJsString(id) + '\')">×</button>'
        + '</span>';
    }).join('');
  }

  function renderInputs() {
    var filterSearch = document.getElementById('aiIntakeFilterSearch');
    var nameSearch = document.getElementById('aiIntakeNameSearchInput');
    var subNameSearch = document.getElementById('aiIntakeSubNameSearchInput');
    var designerSearch = document.getElementById('aiIntakeDesignerSearch');
    var designerText = document.getElementById('aiIntakeDesignerText');
    var designerTrigger = document.getElementById('aiIntakeDesignerTrigger');
    var remark = document.getElementById('aiIntakeRemark');
    if (filterSearch && filterSearch.value !== state.filterSearchQuery) filterSearch.value = state.filterSearchQuery;
    if (nameSearch && nameSearch.value !== state.nameQuery) nameSearch.value = state.nameQuery;
    if (subNameSearch && subNameSearch.value !== state.nameQuery) subNameSearch.value = state.nameQuery;
    if (designerSearch && designerSearch.value !== state.designerSearchQuery) designerSearch.value = state.designerSearchQuery;
    if (designerText) designerText.textContent = state.designer || '请选择设计师';
    if (designerTrigger) designerTrigger.classList.toggle('placeholder', !state.designer);
    if (remark && remark.value !== state.remark) remark.value = state.remark;
  }

  function filteredFolders() {
    var nameQuery = state.nameQuery.trim();
    var productQuery = state.productQuery.trim();
    var seriesQuery = state.seriesQuery.trim();
    return FOLDERS.filter(function(folder) {
      if (nameQuery) {
        if (state.nameSearchMode === 'album') {
          if (!fuzzyMatches(getFolderAlbum(folder), nameQuery)) return false;
        } else if (!folderNameMatches(folder, nameQuery)) {
          return false;
        }
      }
      if (state.nameSearchMode !== 'album') {
        if (productQuery && !fuzzyMatches(folder.product, productQuery)) return false;
        if (seriesQuery && !fuzzyMatches(folder.series, seriesQuery)) return false;
      }
      return true;
    });
  }

  function folderNameMatches(folder, query) {
    var parts = getFolderPathParts(folder);
    var names = parts.concat([parts.join(' / '), getFolderLeafName(folder)]);
    return names.some(function(name) { return fuzzyMatches(name, query); });
  }

  function renderFolders(targetId) {
    var container = document.getElementById(targetId || 'aiIntakeFolderList');
    if (!container) return;
    var list = filteredFolders();
    if (!list.length) {
      container.innerHTML = '<div class="ai-intake-empty">没有匹配的入库位置</div>';
      renderSummary();
      return;
    }
    container.innerHTML = renderFolderTree(buildFolderTree(list));
    renderSummary();
  }

  function ensureTreeChild(parent, id, type, label) {
    if (!parent.childMap) parent.childMap = {};
    if (!parent.childMap[id]) {
      parent.childMap[id] = { id:id, type:type, label:label, children:[] };
      parent.children.push(parent.childMap[id]);
    }
    return parent.childMap[id];
  }

  function ensureScopedTreeChild(parent, sectionId, rawId, type, label) {
    var child = ensureTreeChild(parent, 'tree:' + sectionId + ':' + rawId, type, label);
    child.contextId = rawId;
    return child;
  }

  function getFolderPathParts(folder) {
    var parts = folder.name.split(' / ').filter(Boolean);
    if (parts[0] === getFolderAlbum(folder)) parts.shift();
    if (folder.series && parts[0] === folder.series) parts.shift();
    return parts.length ? parts : [folder.name];
  }

  function buildFolderPathIndex(folders) {
    var index = {};
    folders.forEach(function(folder) {
      index[getFolderAlbum(folder) + ' / ' + getFolderPathParts(folder).join(' / ')] = folder.id;
    });
    return index;
  }

  function cleanupFolderTree(node) {
    delete node.childMap;
    node.children.forEach(cleanupFolderTree);
    return node;
  }

  function buildTreeSection(sectionId, label, folders) {
    var root = { id:'section:' + sectionId, label:label, type:'section', count:folders.length, children:[] };
    var albumMap = {};
    var folderPathIndex = buildFolderPathIndex(folders);
    folders.forEach(function(folder) {
      var albumName = getFolderAlbum(folder);
      if (!albumMap[albumName]) {
        albumMap[albumName] = { id:'tree:' + sectionId + ':album:' + albumName, contextId:'album:' + albumName, type:'album', label:albumName, children:[] };
        root.children.push(albumMap[albumName]);
      }
      var folderParent = albumMap[albumName];
      var folderParts = getFolderPathParts(folder);
      folderParts.forEach(function(part, index) {
        var fullPath = albumName + ' / ' + folderParts.slice(0, index + 1).join(' / ');
        var mappedFolderId = folderPathIndex[fullPath];
        var nodeId = mappedFolderId ? 'folder:' + mappedFolderId : 'folderPath:' + albumName + ':' + folderParts.slice(0, index + 1).join(' / ');
        var child = ensureScopedTreeChild(folderParent, sectionId, nodeId, 'folder', part);
        if (index === folderParts.length - 1) child.folder = folder;
        folderParent = child;
      });
    });
    return cleanupFolderTree(root);
  }

  function buildFolderTree(folders) {
    var root = { id:'root', label:'全部', type:'root', children:[] };
    var pinnedFolders = folders.filter(function(folder) { return folder.pinned; });
    var favoriteFolders = folders.filter(function(folder) { return folder.favorite; });
    root.children.push(buildTreeSection('pinned', '置顶', pinnedFolders));
    root.children.push(buildTreeSection('favorite', '收藏', favoriteFolders));
    root.children.push(buildTreeSection('all', '全部文件夹', folders));
    return cleanupFolderTree(root);
  }

  function renderFolderTree(node, depth) {
    depth = depth || 0;
    var isFolder = node.type === 'folder';
    var hasChildren = node.children && node.children.length;
    var expanded = state.expandedTree.has(node.id);
    var html = '<div class="ai-intake-tree-row depth-' + depth + (isFolder ? ' is-leaf' : ' is-branch') + ' type-' + escHtml(node.type || '') + '">';
    if (hasChildren) {
      html += '<button class="ai-intake-tree-toggle' + (expanded ? ' open' : '') + '" type="button" onclick="ccAssetIntakeToggleTreeNode(\'' + escJsString(node.id) + '\')">›</button>';
    } else {
      html += '<span class="ai-intake-tree-spacer"></span>';
    }
    html += '<span class="ai-intake-folder-icon"></span>';
    if (isFolder && node.folder) {
      var checked = state.selectedFolders.has(node.folder.id);
      html += '<label class="ai-intake-tree-label">'
        + '<input type="checkbox" ' + (checked ? 'checked' : '') + ' onchange="ccAssetIntakeToggleFolder(\'' + escJsString(node.folder.id) + '\', this.checked)">'
        + '<span>' + escHtml(node.label) + '</span>'
        + '</label>';
    } else {
      html += '<button class="ai-intake-tree-branch-label" type="button" onclick="ccAssetIntakeToggleTreeNode(\'' + escJsString(node.id) + '\')">'
        + '<span>' + escHtml(node.label) + '</span>'
        + (node.type === 'section' ? '<span class="ai-intake-tree-count">' + (node.count || 0) + '</span>' : '')
        + '</button>';
    }
    if (node.id !== 'root' && node.type !== 'section') {
      var actionNodeId = node.contextId || node.id;
      html += '<span class="ai-intake-tree-actions">';
      html += '<button class="ai-intake-tree-action" type="button" title="新增子文件夹" aria-label="新增子文件夹" onclick="event.stopPropagation();ccAssetIntakeOpenCreateFolder(\'' + escJsString(actionNodeId) + '\', \'' + escJsString(node.id) + '\')">' + PLUS_ICON + '</button>';
      if (node.folder) {
        html += '<button class="ai-intake-tree-action" type="button" title="编辑文件夹名字" aria-label="编辑文件夹名字" onclick="event.stopPropagation();ccAssetIntakeOpenEditFolder(\'' + escJsString(node.folder.id) + '\')">' + EDIT_ICON + '</button>';
        html += '<button class="ai-intake-tree-action danger" type="button" title="删除文件夹" aria-label="删除文件夹" onclick="event.stopPropagation();ccAssetIntakeConfirmDeleteFolder(\'' + escJsString(node.folder.id) + '\')">' + TRASH_ICON + '</button>';
      }
      html += '</span>';
    }
    html += '</div>';
    if (hasChildren && expanded) {
      html += '<div class="ai-intake-tree-children">';
      html += node.children.map(function(child) { return renderFolderTree(child, depth + 1); }).join('');
      html += '</div>';
    }
    return html;
  }

  function renderAssets(targetId, all) {
    var container = document.getElementById(targetId || 'aiIntakeAssetsGrid');
    if (!container) return;
    var items = all ? state.items : state.items.slice(0, DEFAULT_VISIBLE_COUNT);
    if (!items.length) {
      container.innerHTML = '<div class="ai-intake-empty">暂无素材</div>';
    } else {
      container.innerHTML = items.map(function(item, index) {
        var realIndex = all ? index : index;
        return renderAssetItem(item, realIndex);
      }).join('');
    }
    var btn = document.getElementById('aiIntakeAssetExpandBtn');
    if (btn) btn.style.display = state.items.length > DEFAULT_VISIBLE_COUNT ? '' : 'none';
  }

  function assetKeyHandler(event, index) {
    if (!event || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    previewAsset(index);
  }

  function formatArchiveName(baseName, item, index) {
    if (!baseName) return item ? item.name : '';
    if (!item) return baseName;
    if (state.items.length <= 1) return baseName;
    return baseName + (index + 1);
  }

  function getArchiveName(item, index) {
    return formatArchiveName(state.archiveName.trim(), item, index);
  }

  function getArchiveNamePreview(value) {
    var baseName = String(value == null ? state.archiveName : value).trim();
    if (!baseName) return '';
    if (!state.items.length) return '';
    if (state.items.length <= 1) return '入库后名称：' + formatArchiveName(baseName, state.items[0], 0);
    var sample = state.items.slice(0, 3).map(function(item, index) {
      return formatArchiveName(baseName, item, index);
    }).join('、');
    if (state.items.length > 3) sample += '、...';
    return '入库后名称：' + sample;
  }

  function renderNameEditor() {
    var mask = document.getElementById('aiIntakeNameMask');
    var input = document.getElementById('aiIntakeArchiveNameInput');
    if (!mask || !input) return;
    mask.classList.toggle('show', state.renameVisible);
    if (input.value !== state.draftArchiveName) input.value = state.draftArchiveName;
    renderArchiveNamePreview();
  }

  function renderArchiveNamePreview() {
    var preview = document.getElementById('aiIntakeArchiveNamePreview');
    if (!preview) return;
    preview.textContent = getArchiveNamePreview(state.draftArchiveName);
  }

  function renderFolderEditor() {
    var mask = document.getElementById('aiIntakeFolderEditMask');
    var title = document.getElementById('aiIntakeFolderEditTitle');
    var input = document.getElementById('aiIntakeFolderNameInput');
    var error = document.getElementById('aiIntakeFolderNameError');
    var defaultValue = document.getElementById('aiIntakeFolderDefault');
    if (!mask || !input) return;
    mask.classList.toggle('show', state.folderEditorVisible);
    if (title) title.textContent = state.folderEditorMode === 'edit' ? '编辑文件夹名字' : '新增子文件夹';
    if (input.value !== state.folderEditorName) input.value = state.folderEditorName;
    if (error) error.textContent = state.folderEditorError;
    if (defaultValue) defaultValue.style.display = state.folderEditorMode === 'create' ? 'flex' : 'none';
  }

  function getFolderEditorParentContext(nodeId) {
    if (nodeId === 'root') return { album:'未分组专辑', series:'', product:'', namePrefix:'' };
    if (nodeId.indexOf('album:') === 0) {
      return { album:nodeId.slice('album:'.length), series:'', product:'', namePrefix:'' };
    }
    if (nodeId.indexOf('series:') === 0) {
      var series = nodeId.slice('series:'.length);
      return { album:series + ' 专辑', series:series, product:'', namePrefix:'' };
    }
    if (nodeId.indexOf('product:') === 0) {
      var productParts = nodeId.slice('product:'.length).split(':');
      return { album:(productParts[0] || '未分组') + ' 专辑', series:productParts[0] || '', product:productParts[1] || '', namePrefix:productParts[1] || '' };
    }
    if (nodeId.indexOf('folder:') === 0) {
      var folder = getFolderById(nodeId.slice('folder:'.length));
      return folder ? { album:getFolderAlbum(folder), series:folder.series, product:folder.product, namePrefix:folder.name } : null;
    }
    if (nodeId.indexOf('folderPath:') === 0) {
      var pathParts = nodeId.slice('folderPath:'.length).split(':');
      var album = pathParts[0] || '未分组专辑';
      var folderPath = pathParts.slice(1).join(':');
      return { album:album, series:'', product:'', namePrefix:folderPath };
    }
    return null;
  }

  function getNewFolderId() {
    return 'f' + Date.now().toString(36) + Math.random().toString(16).slice(2, 6);
  }

  function refreshFolderViews() {
    renderNameSearchControls();
    renderFilterControls();
    renderFolders();
    if (state.subMode === 'folders') renderSub();
  }

  function openCreateFolder(nodeId, treeNodeId) {
    state.folderEditorVisible = true;
    state.folderEditorMode = 'create';
    state.folderEditorTargetId = nodeId;
    state.folderEditorTreeNodeId = treeNodeId || nodeId;
    state.folderEditorName = '';
    state.folderEditorError = '';
    renderFolderEditor();
    setTimeout(function() {
      var input = document.getElementById('aiIntakeFolderNameInput');
      if (input) input.focus();
    }, 0);
  }

  function openEditFolder(folderId) {
    var folder = getFolderById(folderId);
    if (!folder) return;
    state.folderEditorVisible = true;
    state.folderEditorMode = 'edit';
    state.folderEditorTargetId = folderId;
    state.folderEditorTreeNodeId = '';
    state.folderEditorName = getFolderLeafName(folder);
    state.folderEditorError = '';
    renderFolderEditor();
    setTimeout(function() {
      var input = document.getElementById('aiIntakeFolderNameInput');
      if (input) {
        input.focus();
        input.select();
      }
    }, 0);
  }

  function setFolderName(value) {
    state.folderEditorName = value;
    state.folderEditorError = '';
    var error = document.getElementById('aiIntakeFolderNameError');
    if (error) error.textContent = '';
  }

  function closeFolderEditor() {
    state.folderEditorVisible = false;
    state.folderEditorTargetId = '';
    state.folderEditorTreeNodeId = '';
    state.folderEditorName = '';
    state.folderEditorError = '';
    renderFolderEditor();
  }

  function createChildFolder(name) {
    var parent = getFolderEditorParentContext(state.folderEditorTargetId);
    if (!parent) return false;
    var cleanName = name.trim();
    var fullName = parent.namePrefix ? parent.namePrefix + ' / ' + cleanName : cleanName;
    var newFolder = { id:getNewFolderId(), album:parent.album || '未分组专辑', name:fullName, product:parent.product || '', series:parent.series || '', materialScope:'通用' };
    FOLDERS.push(newFolder);
    if (state.folderEditorTreeNodeId) state.expandedTree.add(state.folderEditorTreeNodeId);
    state.selectedFolders.add(newFolder.id);
    return true;
  }

  function deleteFolder(folderId) {
    var folder = getFolderById(folderId);
    if (!folder) return false;
    var prefix = folder.name + ' / ';
    var album = getFolderAlbum(folder);
    var removeIds = new Set();
    for (var i = FOLDERS.length - 1; i >= 0; i--) {
      if (getFolderAlbum(FOLDERS[i]) === album && (FOLDERS[i].id === folderId || FOLDERS[i].name.indexOf(prefix) === 0)) {
        removeIds.add(FOLDERS[i].id);
        FOLDERS.splice(i, 1);
      }
    }
    removeIds.forEach(function(id) {
      state.selectedFolders.delete(id);
      state.expandedTree.delete('folder:' + id);
    });
    return true;
  }

  function confirmDeleteFolder(folderId) {
    var folder = getFolderById(folderId);
    if (!folder) return;
    var leafName = getFolderLeafName(folder);
    var runDelete = function() {
      if (!deleteFolder(folderId)) return;
      refreshFolderViews();
      showArchiveToast('删除成功');
    };
    if (typeof window.openConfirmModal === 'function') {
      window.openConfirmModal({
        title:'删除文件夹',
        description:'确认删除「' + leafName + '」及其下级内容？此操作不可恢复。',
        cancelText:'取消',
        confirmText:'确定',
        variant:'danger',
        maskClosable:false,
        onConfirm:runDelete
      });
      return;
    }
    if (window.confirm('确认删除「' + leafName + '」及其下级内容？此操作不可恢复。')) runDelete();
  }

  function renameFolder(folderId, name) {
    var folder = getFolderById(folderId);
    if (!folder) return false;
    var cleanName = name.trim();
    var oldName = folder.name;
    var album = getFolderAlbum(folder);
    var parts = oldName.split(' / ');
    parts[parts.length - 1] = cleanName;
    var newName = parts.join(' / ');
    FOLDERS.forEach(function(item) {
      if (getFolderAlbum(item) !== album) return;
      if (item.id === folderId) {
        item.name = newName;
        return;
      }
      if (item.name.indexOf(oldName + ' / ') === 0) {
        item.name = newName + item.name.slice(oldName.length);
      }
    });
    return true;
  }

  function confirmFolderEditor() {
    var name = state.folderEditorName.trim();
    if (!name) {
      state.folderEditorError = '请输入文件夹名字';
      renderFolderEditor();
      return;
    }
    var isEdit = state.folderEditorMode === 'edit';
    var ok = isEdit
      ? renameFolder(state.folderEditorTargetId, name)
      : createChildFolder(name);
    if (!ok) return;
    closeFolderEditor();
    refreshFolderViews();
    showArchiveToast(isEdit ? '文件夹名字已更新' : '已新增子文件夹');
  }

  function renderAssetItem(item, index) {
    var mediaHtml = '';
    if (item.type === 'video') {
      mediaHtml = item.thumb && item.thumb !== item.url
        ? '<img src="' + escHtml(item.thumb) + '" alt="" loading="lazy" onerror="ccAssetIntakeMediaError(this)">'
        : '<span class="ai-intake-asset-placeholder">视频素材</span>';
    } else if (item.thumb || item.url) {
      mediaHtml = '<img src="' + escHtml(item.thumb || item.url) + '" alt="" loading="lazy" onerror="ccAssetIntakeMediaError(this)">';
    } else {
      mediaHtml = '<span class="ai-intake-asset-placeholder">图片素材</span>';
    }
    return '<div class="ai-intake-asset" role="button" tabindex="0" onclick="ccAssetIntakePreview(' + index + ')" onkeydown="ccAssetIntakeAssetKey(event, ' + index + ')">'
      + '<button class="ai-intake-asset-delete" type="button" title="删除" aria-label="删除文件" onclick="ccAssetIntakeDeleteAsset(event, ' + index + ')">' + TRASH_ICON + '</button>'
      + (item.archived ? '<span class="ai-intake-asset-status">已入库</span>' : '')
      + '<span class="ai-intake-asset-media">' + mediaHtml + '</span>'
      + '<span class="ai-intake-asset-info">'
      + '  <span class="ai-intake-asset-name" title="' + escHtml(item.name) + '">' + escHtml(item.name) + '</span>'
      + '  <span class="ai-intake-asset-type">' + (item.type === 'video' ? '视频' : '图片') + '</span>'
      + '</span>'
      + '</div>';
  }

  function renderPlatforms() {
    var text = '请选择推广平台';
    var selected = Array.from(state.selectedPlatforms);
    if (selected.length === 1) text = selected[0];
    if (selected.length === 2) text = selected.join('、');
    if (selected.length > 2) text = selected.slice(0, 2).join('、') + ' +' + (selected.length - 2);
    document.getElementById('aiIntakePlatformText').textContent = text;
    var query = state.platformQuery.trim().toLowerCase();
    var list = PLATFORMS.filter(function(platform) { return !query || platform.toLowerCase().indexOf(query) > -1; });
    document.getElementById('aiIntakePlatformOptions').innerHTML = list.length ? list.map(function(platform) {
      return '<label class="ai-intake-option">'
        + '<input type="checkbox" ' + (state.selectedPlatforms.has(platform) ? 'checked' : '') + ' onchange="ccAssetIntakeTogglePlatform(\'' + platform + '\', this.checked)">'
        + '<span>' + platform + '</span>'
        + '</label>';
    }).join('') : '<div class="ai-intake-empty">没有匹配的平台</div>';
  }

  function renderAiSwitch() {
    var el = document.getElementById('aiIntakeAiSwitch');
    if (!el) return;
    el.classList.toggle('on', state.aiCheck);
    el.setAttribute('aria-pressed', state.aiCheck ? 'true' : 'false');
  }

  function clearErrors() {
    var folderError = document.getElementById('aiIntakeFolderError');
    var designerError = document.getElementById('aiIntakeDesignerError');
    if (folderError) folderError.textContent = '';
    if (designerError) designerError.textContent = '';
  }

  function setTarget(target) {
    if (target === '物料库' && isImageOnly()) return;
    state.target = target;
    renderTargets();
    renderSummary();
  }

  function clearFolders() {
    state.selectedFolders.clear();
    renderFolders();
    if (state.subMode === 'folders') renderSub();
  }

  function setNameSearchMode(mode) {
    state.nameSearchMode = mode === 'album' ? 'album' : 'folder';
    renderNameSearchControls();
    renderFilterControls();
    renderFolders();
    if (state.subMode === 'folders') renderSub();
  }

  function setNameSearch(value) {
    state.nameQuery = value;
    renderNameSearchControls();
    renderFolders();
    if (state.subMode === 'folders') renderSub();
  }

  function setFilterMode(mode) {
    state.filterMode = mode === 'series' ? 'series' : 'product';
    state.productQuery = '';
    state.seriesQuery = '';
    state.filterSearchQuery = '';
    renderFilterControls();
    renderFolders();
    if (state.subMode === 'folders') renderSub();
  }

  function setFilterSearch(value) {
    state.filterSearchQuery = value;
    renderFilterOptions();
  }

  function selectFilterOption(value) {
    state.filterSearchQuery = '';
    if (state.filterMode === 'product') {
      state.productQuery = value;
      state.seriesQuery = '';
    } else {
      state.seriesQuery = value;
      state.productQuery = '';
    }
    renderFilterControls();
    renderFolders();
    if (state.subMode === 'folders') renderSub();
    closeFilterDropdown();
  }

  function openFilterDropdown() {
    closeDesignerDropdown();
    closePlatformPanel();
    state.filterSearchQuery = '';
    renderFilterControls();
    var el = document.getElementById('aiIntakeFilterSelect');
    if (el) el.classList.add('open');
    setTimeout(function() {
      var search = document.getElementById('aiIntakeFilterSearch');
      if (search) search.focus();
    }, 0);
  }

  function closeFilterDropdown() {
    var el = document.getElementById('aiIntakeFilterSelect');
    if (el) el.classList.remove('open');
    state.filterSearchQuery = '';
    renderFilterOptions();
    renderInputs();
  }

  function toggleTreeNode(id) {
    if (state.expandedTree.has(id)) state.expandedTree.delete(id);
    else state.expandedTree.add(id);
    renderFolders();
    if (state.subMode === 'folders') renderSub();
  }

  function toggleFolder(id, checked) {
    if (checked) state.selectedFolders.add(id);
    else state.selectedFolders.delete(id);
    clearErrors();
    renderFolders();
    if (state.subMode === 'folders') renderSub();
  }

  function removeSelectedFolder(id) {
    state.selectedFolders.delete(id);
    clearErrors();
    renderFolders();
    if (state.subMode === 'folders') renderSub();
  }

  function setDesignerSearch(value) {
    state.designerSearchQuery = value;
    closeFilterDropdown();
    closePlatformPanel();
    renderDesignerOptions();
    var el = document.getElementById('aiIntakeDesignerSelect');
    if (el) el.classList.add('open');
  }

  function selectDesigner(value) {
    state.designer = value;
    state.designerSearchQuery = '';
    clearErrors();
    renderInputs();
    renderDesignerOptions();
    closeDesignerDropdown();
  }

  function openDesignerDropdown() {
    closeFilterDropdown();
    closePlatformPanel();
    state.designerSearchQuery = '';
    renderDesignerOptions();
    renderInputs();
    var el = document.getElementById('aiIntakeDesignerSelect');
    if (el) el.classList.add('open');
    setTimeout(function() {
      var search = document.getElementById('aiIntakeDesignerSearch');
      if (search) search.focus();
    }, 0);
  }

  function closeDesignerDropdown() {
    var el = document.getElementById('aiIntakeDesignerSelect');
    if (el) el.classList.remove('open');
    state.designerSearchQuery = '';
    renderDesignerOptions();
    renderInputs();
  }

  function togglePlatforms() {
    var el = document.getElementById('aiIntakePlatformSelect');
    if (el) el.classList.toggle('open');
  }

  function closePlatformPanel() {
    var el = document.getElementById('aiIntakePlatformSelect');
    if (el) el.classList.remove('open');
  }

  function setPlatformQuery(value) {
    state.platformQuery = value;
    renderPlatforms();
  }

  function togglePlatform(platform, checked) {
    if (checked) state.selectedPlatforms.add(platform);
    else state.selectedPlatforms.delete(platform);
    renderPlatforms();
  }

  function toggleAiCheck() {
    state.aiCheck = !state.aiCheck;
    renderAiSwitch();
  }

  function deleteAsset(event, index) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (index < 0 || index >= state.items.length) return;
    state.items.splice(index, 1);
    renderSummary();
    renderTargets();
    renderNameEditor();
    renderAssets();
    if (state.subMode === 'assets') renderSub();
    closePreview();
    showArchiveToast('删除成功');
  }

  function setRemark(value) {
    state.remark = value;
  }

  function showRenameEditor() {
    state.draftArchiveName = state.archiveName;
    state.renameVisible = true;
    renderNameEditor();
    setTimeout(function() {
      var input = document.getElementById('aiIntakeArchiveNameInput');
      if (input) {
        input.focus();
        input.select();
      }
    }, 0);
  }

  function setArchiveName(value) {
    state.draftArchiveName = value;
    renderArchiveNamePreview();
  }

  function closeRenameEditor() {
    state.renameVisible = false;
    state.draftArchiveName = state.archiveName;
    renderNameEditor();
  }

  function confirmRenameEditor() {
    state.archiveName = state.draftArchiveName.trim();
    state.renameVisible = false;
    renderNameEditor();
  }

  function resetForm() {
    var items = state.items;
    state = createInitialState(items);
    renderAll();
  }

  function openSub(mode) {
    state.subMode = mode;
    renderSub();
    document.getElementById('aiIntakeSubMask').classList.add('show');
  }

  function renderSub() {
    var title = document.getElementById('aiIntakeSubTitle');
    var body = document.getElementById('aiIntakeSubBody');
    if (!title || !body) return;
    if (state.subMode === 'folders') {
      title.textContent = '全部入库位置';
      body.innerHTML = '<div class="ai-intake-name-search-control ai-intake-name-search-control-sub">'
        + '<div class="ai-intake-name-search-tabs" id="aiIntakeSubNameSearchTabs"></div>'
        + '<input class="ai-intake-input ai-intake-name-search-input" id="aiIntakeSubNameSearchInput" autocomplete="off" placeholder="搜索文件夹名称" oninput="ccAssetIntakeSetNameSearch(this.value)">'
        + '</div>'
        + '<div class="ai-intake-folder-list" id="aiIntakeAllFolderList"></div>';
      renderNameSearchControls('sub');
      renderFolders('aiIntakeAllFolderList');
      return;
    }
    if (state.subMode === 'assets') {
      title.textContent = '全部选中文件';
      body.innerHTML = '<div class="ai-intake-assets-grid" id="aiIntakeAllAssetsGrid"></div>';
      renderAssets('aiIntakeAllAssetsGrid', true);
    }
  }

  function closeSub() {
    var mask = document.getElementById('aiIntakeSubMask');
    if (mask) mask.classList.remove('show');
    state.subMode = '';
  }

  function previewAsset(index) {
    var item = state.items[index];
    if (!item) return;
    var stage = document.getElementById('aiIntakePreviewStage');
    if (!stage) return;
    if (item.type === 'video') {
      stage.innerHTML = item.url
        ? '<video src="' + escHtml(item.url) + '" controls autoplay playsinline></video>'
        : '<div class="ai-intake-empty">暂无视频地址</div>';
    } else {
      stage.innerHTML = item.url || item.thumb
        ? '<img src="' + escHtml(item.url || item.thumb) + '" alt="">'
        : '<div class="ai-intake-empty">暂无图片地址</div>';
    }
    document.getElementById('aiIntakePreviewMask').classList.add('show');
  }

  function mediaError(node) {
    if (!node || !node.parentElement) return;
    node.style.display = 'none';
    node.parentElement.classList.add('is-broken');
  }

  function closePreview() {
    var mask = document.getElementById('aiIntakePreviewMask');
    var stage = document.getElementById('aiIntakePreviewStage');
    if (mask) mask.classList.remove('show');
    if (stage) stage.innerHTML = '';
  }

  function submit() {
    clearErrors();
    var valid = true;
    if (!state.selectedFolders.size) {
      document.getElementById('aiIntakeFolderError').textContent = '请选择至少一个入库位置';
      valid = false;
    }
    if (!state.designer.trim()) {
      document.getElementById('aiIntakeDesignerError').textContent = '请选择设计师';
      valid = false;
    }
    if (!valid) return;

    window.__lastAssetIntakePayload = {
      target: state.target,
      folderIds: Array.from(state.selectedFolders),
      designer: state.designer.trim(),
      platforms: Array.from(state.selectedPlatforms),
      aiSimilarityCheck: state.aiCheck,
      remark: state.remark,
      archiveName: state.archiveName.trim(),
      assets: state.items.map(function(item, index) {
        return { id:item.id, type:item.type, name:item.name, archiveName:getArchiveName(item, index), url:item.url };
      })
    };
    closeModal();
    showArchiveToast('已开始入库，您可在素材管理系统-我的任务中查看。');
  }

  function showArchiveToast(message) {
    ensureModal();
    var toast = document.getElementById('aiIntakeToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      toast.classList.remove('show');
    }, 3200);
  }

  document.addEventListener('click', function(e) {
    if (!e.target.closest('#aiIntakePlatformSelect')) closePlatformPanel();
    if (!e.target.closest('#aiIntakeFilterSelect')) closeFilterDropdown();
    if (!e.target.closest('#aiIntakeDesignerSelect')) closeDesignerDropdown();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;
    var preview = document.getElementById('aiIntakePreviewMask');
    var sub = document.getElementById('aiIntakeSubMask');
    var main = document.getElementById('aiIntakeMask');
    if (state.folderEditorVisible) return closeFolderEditor();
    if (state.renameVisible) return closeRenameEditor();
    if (preview && preview.classList.contains('show')) return closePreview();
    if (sub && sub.classList.contains('show')) return closeSub();
    if (main && main.classList.contains('show')) closeModal();
  });

  window.openAssetArchiveModal = openModal;
  window.openAssetIntakeModal = openModal;
  window.ccAssetIntakeClose = closeModal;
  window.ccAssetIntakeSetTarget = setTarget;
  window.ccAssetIntakeClearFolders = clearFolders;
  window.ccAssetIntakeSetNameSearchMode = setNameSearchMode;
  window.ccAssetIntakeSetNameSearch = setNameSearch;
  window.ccAssetIntakeSetFilterMode = setFilterMode;
  window.ccAssetIntakeSetFilterSearch = setFilterSearch;
  window.ccAssetIntakeSetFilter = setFilterSearch;
  window.ccAssetIntakeOpenFilterDropdown = openFilterDropdown;
  window.ccAssetIntakeSelectFilterOption = selectFilterOption;
  window.ccAssetIntakeToggleTreeNode = toggleTreeNode;
  window.ccAssetIntakeToggleFolder = toggleFolder;
  window.ccAssetIntakeRemoveSelectedFolder = removeSelectedFolder;
  window.ccAssetIntakeOpenCreateFolder = openCreateFolder;
  window.ccAssetIntakeOpenEditFolder = openEditFolder;
  window.ccAssetIntakeConfirmDeleteFolder = confirmDeleteFolder;
  window.ccAssetIntakeSetFolderName = setFolderName;
  window.ccAssetIntakeCloseFolderEditor = closeFolderEditor;
  window.ccAssetIntakeConfirmFolderEditor = confirmFolderEditor;
  window.ccAssetIntakeSetDesignerSearch = setDesignerSearch;
  window.ccAssetIntakeSetDesigner = setDesignerSearch;
  window.ccAssetIntakeOpenDesignerDropdown = openDesignerDropdown;
  window.ccAssetIntakeSelectDesigner = selectDesigner;
  window.ccAssetIntakeTogglePlatforms = togglePlatforms;
  window.ccAssetIntakeSetPlatformQuery = setPlatformQuery;
  window.ccAssetIntakeTogglePlatform = togglePlatform;
  window.ccAssetIntakeToggleAiCheck = toggleAiCheck;
  window.ccAssetIntakeSetRemark = setRemark;
  window.ccAssetIntakeShowRename = showRenameEditor;
  window.ccAssetIntakeSetArchiveName = setArchiveName;
  window.ccAssetIntakeCloseRename = closeRenameEditor;
  window.ccAssetIntakeConfirmRename = confirmRenameEditor;
  window.ccAssetIntakeReset = resetForm;
  window.ccAssetIntakeOpenSub = openSub;
  window.ccAssetIntakeCloseSub = closeSub;
  window.ccAssetIntakePreview = previewAsset;
  window.ccAssetIntakeAssetKey = assetKeyHandler;
  window.ccAssetIntakeDeleteAsset = deleteAsset;
  window.ccAssetIntakeMediaError = mediaError;
  window.ccAssetIntakeClosePreview = closePreview;
  window.ccAssetIntakeSubmit = submit;
})();
