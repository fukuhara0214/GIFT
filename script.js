(() => {
  // デモ用：擬似的にギフトイベントを生成し、テーブルに集計表示
  const accounts = new Set();
  const totals = {}; // key: streamer -> { gifter -> coins }
  const $ = (sel) => document.querySelector(sel);

  function renderAccounts(){
    const div = $('#account-list');
    div.textContent = [...accounts].map(a=>'@'+a).join('、') || '（未追加）';
  }
  function renderTable(){
    const tbody = $('#table-body'); tbody.innerHTML = '';
    for(const streamer of Object.keys(totals)){
      for(const [gifter, coins] of Object.entries(totals[streamer])){
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>@${streamer}</td><td>${gifter}</td><td>${coins}</td>`;
        tbody.appendChild(tr);
      }
    }
  }
  function updateTotals(streamer, gifter, coins){
    totals[streamer] ||= {};
    totals[streamer][gifter] ||= 0;
    totals[streamer][gifter] += coins;
    renderTable();
  }
  function addAccount(raw){
    const id = String(raw||'').trim().replace(/^@/,'');
    if(!id) return;
    accounts.add(id);
    renderAccounts();
  }
  function clearAll(){
    accounts.clear();
    for (const k in totals) delete totals[k];
    renderAccounts(); renderTable();
  }
  // デモ：5秒ごとにランダムに増える
  setInterval(() => {
    if(accounts.size === 0) return;
    const streamers = [...accounts];
    const streamer = streamers[Math.floor(Math.random()*streamers.length)];
    const gifter = 'ユーザー' + (1 + Math.floor(Math.random()*5));
    updateTotals(streamer, gifter, 3 + Math.floor(Math.random()*30));
  }, 5000);

  $('#add-account').addEventListener('click', () => {
    addAccount($('#account-input').value);
    $('#account-input').value = '';
  });
  $('#clear').addEventListener('click', clearAll);

  // 初期デモ
  addAccount('demo');
})();
